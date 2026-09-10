import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook para integração com sensores de movimento:
 * - DeviceOrientation API (Giroscópio: gamma / beta)
 * - DeviceMotion API (Acelerômetro físico: accelerationIncludingGravity fallback)
 * - Suporte iOS 13+ (DeviceOrientationEvent/DeviceMotionEvent.requestPermission)
 * - Modo Retrato e Paisagem dinâmico
 * - Calibração de centro neutro
 */
export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState({
    gamma: 0, // Inclinação lateral (esquerda < 0 < direita)
    beta: 0,  // Inclinação frente/trás
    alpha: 0
  });
  const [isSupported, setIsSupported] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [needsPermissionPrompt, setNeedsPermissionPrompt] = useState(false);
  const [hasReceivedData, setHasReceivedData] = useState(false);
  const [error, setError] = useState(null);

  // Offset para calibração do ângulo neutro de apoio das mãos
  const centerOffsetRef = useRef({ gamma: 0, beta: 0 });
  const smoothedGammaRef = useRef(0);
  const hasReceivedDataRef = useRef(false);
  const lastOrientationTimeRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasOrientation = 'DeviceOrientationEvent' in window;
    const hasMotion = 'DeviceMotionEvent' in window;

    if (hasOrientation || hasMotion) {
      setIsSupported(true);

      // iOS 13+ requer solicitação explícita por clique do usuário
      if (
        (hasOrientation && typeof DeviceOrientationEvent.requestPermission === 'function') ||
        (hasMotion && typeof DeviceMotionEvent.requestPermission === 'function')
      ) {
        setNeedsPermissionPrompt(true);
      } else {
        setPermissionGranted(true);
      }
    } else {
      setIsSupported(false);
    }
  }, []);

  // Handler para DeviceOrientation (Giroscópio)
  const handleOrientation = useCallback((event) => {
    if (!event) return;
    if (event.gamma === null && event.beta === null) return;

    lastOrientationTimeRef.current = Date.now();

    let rawGamma = event.gamma ?? 0;
    let rawBeta = event.beta ?? 0;

    // Tratamento de orientação de tela (Retrato vs Paisagem)
    const screenType = window.screen?.orientation?.type;
    const windowOrient = typeof window.orientation !== 'undefined' ? window.orientation : 0;

    if (
      (screenType && screenType.includes('landscape')) ||
      windowOrient === 90 ||
      windowOrient === -90
    ) {
      rawGamma = windowOrient === -90 || (screenType && screenType.includes('secondary')) 
        ? -rawBeta 
        : rawBeta;
    }

    if (!hasReceivedDataRef.current && (rawGamma !== 0 || rawBeta !== 0)) {
      hasReceivedDataRef.current = true;
      setHasReceivedData(true);
      setPermissionGranted(true);
    }

    // Filtro passa-baixa para estabilidade
    const adjustedGamma = rawGamma - centerOffsetRef.current.gamma;
    smoothedGammaRef.current = smoothedGammaRef.current * 0.6 + adjustedGamma * 0.4;

    setOrientation({
      gamma: Math.round(smoothedGammaRef.current * 10) / 10,
      beta: Math.round((rawBeta - centerOffsetRef.current.beta) * 10) / 10,
      alpha: Math.round((event.alpha || 0) * 10) / 10
    });
  }, []);

  // Handler para DeviceMotion (Acelerômetro como fallback se orientation não estiver emitindo dados)
  const handleMotion = useCallback((event) => {
    // Se deviceorientation já está enviando dados recentes, prioriza o giroscópio
    if (Date.now() - lastOrientationTimeRef.current < 500) return;

    const acc = event.accelerationIncludingGravity || event.acceleration;
    if (!acc || acc.x === null) return;

    // acc.x é positivo quando inclinado para a esquerda e negativo para a direita (ou vice-versa dependendo do SO)
    // Em modo retrato: inclinação lateral converte ~9.8 m/s² para ângulo equivalente (-45 a +45 graus)
    let calcGamma = -(acc.x || 0) * 4.5;

    const screenType = window.screen?.orientation?.type;
    const windowOrient = typeof window.orientation !== 'undefined' ? window.orientation : 0;
    if (
      (screenType && screenType.includes('landscape')) ||
      windowOrient === 90 ||
      windowOrient === -90
    ) {
      calcGamma = (acc.y || 0) * 4.5;
      if (windowOrient === -90) calcGamma = -calcGamma;
    }

    if (!hasReceivedDataRef.current && Math.abs(calcGamma) > 0.5) {
      hasReceivedDataRef.current = true;
      setHasReceivedData(true);
      setPermissionGranted(true);
    }

    const adjustedGamma = calcGamma - centerOffsetRef.current.gamma;
    smoothedGammaRef.current = smoothedGammaRef.current * 0.6 + adjustedGamma * 0.4;

    setOrientation(prev => ({
      ...prev,
      gamma: Math.round(smoothedGammaRef.current * 10) / 10
    }));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    window.addEventListener('devicemotion', handleMotion, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
      window.removeEventListener('devicemotion', handleMotion, true);
    };
  }, [handleOrientation, handleMotion]);

  // Função acionada por clique/toque (obrigatória para iOS Safari)
  const requestOrientationPermission = async () => {
    let granted = true;

    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response !== 'granted') granted = false;
      } catch (err) {
        console.warn('Erro requestPermission orientation:', err);
      }
    }

    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        const responseMotion = await DeviceMotionEvent.requestPermission();
        if (responseMotion !== 'granted') granted = false;
      } catch (err) {
        console.warn('Erro requestPermission motion:', err);
      }
    }

    if (granted) {
      setPermissionGranted(true);
      setNeedsPermissionPrompt(false);
      setError(null);
      return true;
    } else {
      setError('Permissão do giroscópio / acelerômetro foi recusada.');
      return false;
    }
  };

  // Calibrar centro neutro atual
  const calibrate = () => {
    centerOffsetRef.current = {
      gamma: orientation.gamma,
      beta: orientation.beta
    };
  };

  return {
    orientation,
    isSupported,
    permissionGranted,
    needsPermissionPrompt,
    hasReceivedData,
    error,
    requestOrientationPermission,
    calibrate
  };
}
