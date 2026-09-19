import React, { useRef, useEffect } from 'react';
import { drawBallSkin } from '../game/skinRenderer';

/**
 * SkinPreviewCanvas — Renderiza a esfera vetorial personalizada com alta nitidez (DPR)
 * e todos os detalhes do emblema (Homem de Ferro, Aranha, Batman, Astronauta, etc.)
 */
export default function SkinPreviewCanvas({
  skinId = 'neon-cyan',
  size = 56,
  className = '',
  shadow = true,
  animated = false,
  onClick = null
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Espaço com padding para o glow externo
    const glowPadding = shadow ? 10 : 2;
    const totalLogicalSize = size + glowPadding * 2;

    canvas.width = totalLogicalSize * dpr;
    canvas.height = totalLogicalSize * dpr;

    const radius = size / 2;
    const centerX = totalLogicalSize / 2;
    const centerY = totalLogicalSize / 2;

    if (!animated) {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, totalLogicalSize, totalLogicalSize);

      drawBallSkin(ctx, skinId, centerX, centerY, radius, {
        shadow,
        shadowBlur: shadow ? Math.min(14, radius * 0.7) : 0,
        angle: 0,
        stretchX: 1,
        stretchY: 1
      });

      ctx.restore();
      return;
    }

    let startTime = null;

    const renderFrame = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, totalLogicalSize, totalLogicalSize);

      // Oscilação suave de ângulo e pulso de respiração
      const angle = Math.sin(elapsed * 0.0012) * 0.12;
      const pulse = Math.sin(elapsed * 0.0028);
      const stretchX = 1 + pulse * 0.02;
      const stretchY = 1 - pulse * 0.02;
      const shadowBlur = shadow ? (radius * 0.6 + pulse * 4) : 0;

      drawBallSkin(ctx, skinId, centerX, centerY, radius, {
        shadow,
        shadowBlur,
        angle,
        stretchX,
        stretchY
      });

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(renderFrame);
    };

    animFrameRef.current = requestAnimationFrame(renderFrame);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [skinId, size, shadow, animated]);

  const glowPadding = shadow ? 10 : 2;
  const totalLogicalSize = size + glowPadding * 2;

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: `${totalLogicalSize}px`,
        height: `${totalLogicalSize}px`
      }}
      className={`select-none pointer-events-none ${className}`}
      onClick={onClick}
    />
  );
}
