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
  onClick = null
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    // Espaço com padding para o glow externo
    const glowPadding = shadow ? 8 : 2;
    const totalLogicalSize = size + glowPadding * 2;

    canvas.width = totalLogicalSize * dpr;
    canvas.height = totalLogicalSize * dpr;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, totalLogicalSize, totalLogicalSize);

    const radius = size / 2;
    const centerX = totalLogicalSize / 2;
    const centerY = totalLogicalSize / 2;

    drawBallSkin(ctx, skinId, centerX, centerY, radius, {
      shadow,
      shadowBlur: shadow ? Math.min(14, radius * 0.7) : 0,
      angle: 0,
      stretchX: 1,
      stretchY: 1
    });

    ctx.restore();
  }, [skinId, size, shadow]);

  const glowPadding = shadow ? 8 : 2;
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
