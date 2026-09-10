import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook para integração com a DeviceOrientation API (Acelerômetro e Giroscópio)
 * Suporta permissão no iOS 13+ (DeviceOrientationEvent.requestPermission) e calibração de centro
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
  const [error, setError] = useState(null);

  // Offset para calibração do ângulo neutro de apoio das mãos
  const centerOffsetRef = useRef({ gamma: 0, beta: 0 });
  const smoothedGammaRef = useRef(0);

  useEffect(() => {
    // Verifica suporte
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setIsSupported(true);

      // iOS 13+ requer solicitação explícita acionada por clique do usuário
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        setNeedsPermissionPrompt(true);
      } else {
        // Android e navegadores desktop compatíveis
        setPermissionGranted(true);
      }
    } else {
      setIsSupported(false);
    }
  }, []);

  const handleOrientation = useCallback((event) => {
    if (event.gamma === null) return;

    // Filtro passa-baixa simples (smoothing) para estabilidade
    const rawGamma = (event.gamma || 0) - centerOffsetRef.current.gamma;
    smoothedGammaRef.current = smoothedGammaRef.current * 0.7 + rawGamma * 0.3;

    setOrientation({
      gamma: Math.round(smoothedGammaRef.current * 10) / 10,
      beta: Math.round(((event.beta || 0) - centerOffsetRef.current.beta) * 10) / 10,
      alpha: Math.round(event.alpha || 0)
    });
  }, []);

  useEffect(() => {
    if (!permissionGranted) return;

    window.addEventListener('deviceorientation', handleOrientation, true);
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [permissionGranted, handleOrientation]);

  // Função acionada por botão para o iOS
  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          setNeedsPermissionPrompt(false);
          return true;
        } else {
          setError('Permissão do giroscópio foi negada pelo usuário.');
          return false;
        }
      } catch (err) {
        setError('Erro ao solicitar permissão de orientação: ' + err.message);
        return false;
      }
    } else {
      setPermissionGranted(true);
      return true;
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
    error,
    requestOrientationPermission,
    calibrate
  };
}
