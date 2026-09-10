import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook para MediaPipe Hands via CDN oficial
 * Roda na câmera frontal (modo selfie) e detecta gestos para salto:
 * 1. Punho Fechado (Closed Fist) - detecção por distância euclidiana invariante a rotação
 * 2. Impulso Rápido para Cima (Quick Upward Push)
 */
export function useMediaPipeHands({ enabled = true, onJumpTrigger } = {}) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [gestureDetected, setGestureDetected] = useState(null); // 'fist' | 'upward' | null
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsInstanceRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastWristYRef = useRef(null);
  const lastJumpTimeRef = useRef(0);
  const isInitializingRef = useRef(false);

  // Mantém a referência do callback sempre atualizada sem recriar onResults
  const onJumpTriggerRef = useRef(onJumpTrigger);
  useEffect(() => {
    onJumpTriggerRef.current = onJumpTrigger;
  }, [onJumpTrigger]);

  // Carrega apenas o script CDN oficial do MediaPipe Hands (sem dependência do camera_utils.js externo)
  const loadMediaPipeScripts = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.Hands) {
        return resolve();
      }

      const existingScript = document.querySelector('script[src*="mediapipe/hands"]');
      if (existingScript) {
        if (window.Hands) return resolve();
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', () => reject(new Error('Falha ao carregar script do MediaPipe Hands')));
        return;
      }

      const scriptHands = document.createElement('script');
      scriptHands.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
      scriptHands.crossOrigin = 'anonymous';
      scriptHands.onload = () => resolve();
      scriptHands.onerror = () => {
        // Fallback para unpkg caso jsDelivr tenha oscilação
        const fallback = document.createElement('script');
        fallback.src = 'https://unpkg.com/@mediapipe/hands/hands.js';
        fallback.crossOrigin = 'anonymous';
        fallback.onload = () => resolve();
        fallback.onerror = () => reject(new Error('Falha ao carregar script do MediaPipe Hands'));
        document.body.appendChild(fallback);
      };

      document.body.appendChild(scriptHands);
    });
  }, []);

  // Processamento de resultados das landmarks
  const onResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Espelhar preview para efeito de espelho natural
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      if (results.image) {
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      }

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
          // Desenhar pontos da mão com estilo neon
          ctx.fillStyle = '#06b6d4';
          ctx.strokeStyle = '#22d3ee';
          ctx.lineWidth = 2;

          for (const point of landmarks) {
            ctx.beginPath();
            ctx.arc(point.x * canvas.width, point.y * canvas.height, 3.5, 0, 2 * Math.PI);
            ctx.fill();
          }

          // Lógica de Detecção de Gestos
          // Pulso: 0
          const wrist = landmarks[0];
          const dist = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

          // Dedos principais: Base (MCP), Meio (PIP), Ponta (Tip)
          const fingers = [
            { tip: landmarks[8], pip: landmarks[6], mcp: landmarks[5] },    // Indicador
            { tip: landmarks[12], pip: landmarks[10], mcp: landmarks[9] },  // Médio
            { tip: landmarks[16], pip: landmarks[14], mcp: landmarks[13] }, // Anelar
            { tip: landmarks[20], pip: landmarks[18], mcp: landmarks[17] }  // Mindinho
          ];

          let curledCount = 0;
          for (const f of fingers) {
            const tipToWrist = dist(f.tip, wrist);
            const pipToWrist = dist(f.pip, wrist);
            const mcpToWrist = dist(f.mcp, wrist);
            if (tipToWrist < pipToWrist * 1.08 || tipToWrist < mcpToWrist * 1.18) {
              curledCount++;
            }
          }

          // Se 3 ou mais dedos estiverem recolhidos -> Punho Fechado
          const isFist = curledCount >= 3;

          // 2. Movimento Rápido para Cima (Wrist subindo rapidamente)
          const currentWristY = wrist.y;
          let isMovingUpFast = false;
          if (lastWristYRef.current !== null) {
            const dy = currentWristY - lastWristYRef.current;
            if (dy < -0.06) {
              isMovingUpFast = true;
            }
          }
          lastWristYRef.current = currentWristY;

          const now = Date.now();
          const cooldownPassed = now - lastJumpTimeRef.current > 380; // Cooldown ágil de 380ms

          if ((isFist || isMovingUpFast) && cooldownPassed) {
            lastJumpTimeRef.current = now;
            const detectedType = isFist ? 'fist' : 'upward';
            setGestureDetected(detectedType);

            if (onJumpTriggerRef.current) {
              onJumpTriggerRef.current();
            }

            setTimeout(() => setGestureDetected(null), 280);
          }
        }
      }
      ctx.restore();
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (isInitializingRef.current || streamRef.current) return;
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Câmera não suportada neste navegador.');
      return;
    }

    try {
      isInitializingRef.current = true;
      setError(null);

      await loadMediaPipeScripts();

      if (!videoRef.current) {
        const video = document.createElement('video');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('muted', 'true');
        video.muted = true;
        video.style.position = 'fixed';
        video.style.top = '-9999px';
        video.style.left = '-9999px';
        video.style.width = '320px';
        video.style.height = '240px';
        video.style.opacity = '0.01';
        video.style.pointerEvents = 'none';
        document.body.appendChild(video);
        videoRef.current = video;
      }

      // Conexão nativa com a câmera
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 240 },
            facingMode: 'user'
          }
        });
      } catch (e) {
        // Fallback para qualquer câmera disponível caso facingMode: 'user' seja restrito
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 240 }
          }
        });
      }

      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      const hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0, // 0 = Modo rápido otimizado para navegadores e mobile
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.45
      });

      hands.onResults(onResults);
      handsInstanceRef.current = hands;

      // Loop nativo otimizado de processamento via requestAnimationFrame
      let isRunning = true;
      const processFrame = async () => {
        if (!isRunning || !streamRef.current) return;
        if (videoRef.current && videoRef.current.readyState >= 2 && handsInstanceRef.current) {
          try {
            await handsInstanceRef.current.send({ image: videoRef.current });
          } catch (e) {
            // Ignora descarte normal de frame
          }
        }
        if (isRunning && streamRef.current) {
          animFrameIdRef.current = requestAnimationFrame(processFrame);
        }
      };

      animFrameIdRef.current = requestAnimationFrame(processFrame);
      setIsCameraActive(true);
      setIsModelLoaded(true);
    } catch (err) {
      console.warn('Aviso ao inicializar MediaPipe:', err);
      setError('Câmera indisponível ou permissão não concedida.');
      setIsCameraActive(false);
    } finally {
      isInitializingRef.current = false;
    }
  }, [loadMediaPipeScripts, onResults]);

  const stopCamera = useCallback(() => {
    if (animFrameIdRef.current) {
      cancelAnimationFrame(animFrameIdRef.current);
      animFrameIdRef.current = null;
    }
    if (streamRef.current) {
      try {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      } catch (e) { /* ignore */ }
      streamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  useEffect(() => {
    if (enabled) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [enabled, startCamera, stopCamera]);

  return {
    isCameraActive,
    isModelLoaded,
    gestureDetected,
    error,
    canvasRef,
    startCamera,
    stopCamera
  };
}
