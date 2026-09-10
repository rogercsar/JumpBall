import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook para MediaPipe Hands via CDN oficial
 * Roda na câmera frontal (modo selfie) e detecta:
 * 1. Punho Fechado (Closed Fist)
 * 2. Movimento Rápido para Cima (Fast Upward Push)
 */
export function useMediaPipeHands({ enabled = true, onJumpTrigger } = {}) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [gestureDetected, setGestureDetected] = useState(null); // 'fist' | 'upward' | null
  const [error, setError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraInstanceRef = useRef(null);
  const handsInstanceRef = useRef(null);
  const lastWristYRef = useRef(null);
  const lastJumpTimeRef = useRef(0);

  // Carrega scripts CDN do MediaPipe sob demanda
  const loadMediaPipeScripts = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.Hands && window.Camera) {
        return resolve();
      }

      const scriptHands = document.createElement('script');
      scriptHands.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js';
      scriptHands.crossOrigin = 'anonymous';

      const scriptCamera = document.createElement('script');
      scriptCamera.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js';
      scriptCamera.crossOrigin = 'anonymous';

      let loadedCount = 0;
      const checkDone = () => {
        loadedCount++;
        if (loadedCount === 2) resolve();
      };

      scriptHands.onload = checkDone;
      scriptHands.onerror = () => reject(new Error('Falha ao carregar script do MediaPipe Hands'));
      scriptCamera.onload = checkDone;
      scriptCamera.onerror = () => reject(new Error('Falha ao carregar script de CameraUtils'));

      document.body.appendChild(scriptHands);
      document.body.appendChild(scriptCamera);
    });
  }, []);

  // Processamento de resultados das landmarks
  const onResults = useCallback((results) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Espelhar preview para parecer um espelho natural
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      if (results.image) {
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
      }

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (const landmarks of results.multiHandLandmarks) {
          // Desenhar pontos da mão
          ctx.fillStyle = '#06b6d4';
          ctx.strokeStyle = '#22d3ee';
          ctx.lineWidth = 2;

          for (const point of landmarks) {
            ctx.beginPath();
            ctx.arc(point.x * canvas.width, point.y * canvas.height, 3, 0, 2 * Math.PI);
            ctx.fill();
          }

          // Lógica de Detecção de Gestos
          // 1. Punho Fechado: Dicas dos 4 dedos principais abaixo das juntas PIP
          const isIndexCurled = landmarks[8].y > landmarks[6].y;
          const isMiddleCurled = landmarks[12].y > landmarks[10].y;
          const isRingCurled = landmarks[16].y > landmarks[14].y;
          const isPinkyCurled = landmarks[20].y > landmarks[18].y;
          const isFist = isIndexCurled && isMiddleCurled && isRingCurled && isPinkyCurled;

          // 2. Movimento Rápido para Cima (Wrist subindo rapidamente no eixo Y)
          const currentWristY = landmarks[0].y;
          let isMovingUpFast = false;
          if (lastWristYRef.current !== null) {
            const dy = currentWristY - lastWristYRef.current;
            if (dy < -0.09) { // Deslocamento vertical súbito para cima
              isMovingUpFast = true;
            }
          }
          lastWristYRef.current = currentWristY;

          const now = Date.now();
          const cooldownPassed = now - lastJumpTimeRef.current > 450; // Cooldown de 450ms

          if ((isFist || isMovingUpFast) && cooldownPassed) {
            lastJumpTimeRef.current = now;
            const detectedType = isFist ? 'fist' : 'upward';
            setGestureDetected(detectedType);

            if (onJumpTrigger) {
              onJumpTrigger();
            }

            setTimeout(() => setGestureDetected(null), 300);
          }
        }
      }
      ctx.restore();
    }
  }, [onJumpTrigger]);

  const startCamera = useCallback(async () => {
    if (!enabled) return;
    if (typeof navigator === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Câmera não suportada neste navegador.');
      return;
    }

    try {
      setError(null);
      // Checa se há pelo menos um dispositivo de entrada de vídeo
      const devices = await navigator.mediaDevices.enumerateDevices().catch(() => []);
      const hasVideoInput = devices.some(d => d.kind === 'videoinput');
      if (devices.length > 0 && !hasVideoInput) {
        setError('Nenhuma câmera conectada ao dispositivo.');
        setIsCameraActive(false);
        return;
      }

      await loadMediaPipeScripts();

      if (!videoRef.current) {
        const video = document.createElement('video');
        video.setAttribute('playsinline', 'true');
        video.setAttribute('autoplay', 'true');
        video.setAttribute('muted', 'true');
        video.style.display = 'none';
        document.body.appendChild(video);
        videoRef.current = video;
      }

      const hands = new window.Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0, // 0 = Modo rápido otimizado para dispositivos móveis
        minDetectionConfidence: 0.55,
        minTrackingConfidence: 0.5
      });

      hands.onResults(onResults);
      handsInstanceRef.current = hands;

      const camera = new window.Camera(videoRef.current, {
        onFrame: async () => {
          if (videoRef.current && handsInstanceRef.current) {
            await handsInstanceRef.current.send({ image: videoRef.current });
          }
        },
        width: 320,
        height: 240,
        facingMode: 'user'
      });

      await camera.start();
      cameraInstanceRef.current = camera;
      setIsCameraActive(true);
      setIsModelLoaded(true);
    } catch (err) {
      console.error('Erro ao inicializar MediaPipe:', err);
      setError('Câmera indisponível ou permissão não concedida.');
      setIsCameraActive(false);
    }
  }, [enabled, loadMediaPipeScripts, onResults]);

  const stopCamera = useCallback(() => {
    if (cameraInstanceRef.current) {
      try {
        cameraInstanceRef.current.stop();
      } catch (e) { /* ignore */ }
      cameraInstanceRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
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
