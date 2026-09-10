import React from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

export function TouchControls({ onTouchLeft, onTouchRight, onTouchJump, onRelease }) {
  return (
    <div className="w-full max-w-[440px] px-3 mt-3 flex items-center justify-between select-none">
      {/* Botão Esquerda */}
      <button
        onPointerDown={() => onTouchLeft()}
        onPointerUp={() => onRelease()}
        onPointerLeave={() => onRelease()}
        className="w-16 h-14 rounded-2xl glass-card flex items-center justify-center text-cyan-300 active:scale-95 active:bg-cyan-500/30 border border-cyan-500/20 shadow-lg shadow-black/40 touch-none"
        aria-label="Mover para a Esquerda"
      >
        <ArrowLeft className="w-7 h-7" />
      </button>

      {/* Botão Central de Super Salto */}
      <button
        onPointerDown={() => onTouchJump()}
        className="px-6 h-14 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 shadow-lg shadow-rose-500/20 touch-none"
        aria-label="Super Salto"
      >
        <Zap className="w-5 h-5 fill-current" />
        <span>Pular</span>
      </button>

      {/* Botão Direita */}
      <button
        onPointerDown={() => onTouchRight()}
        onPointerUp={() => onRelease()}
        onPointerLeave={() => onRelease()}
        className="w-16 h-14 rounded-2xl glass-card flex items-center justify-center text-cyan-300 active:scale-95 active:bg-cyan-500/30 border border-cyan-500/20 shadow-lg shadow-black/40 touch-none"
        aria-label="Mover para a Direita"
      >
        <ArrowRight className="w-7 h-7" />
      </button>
    </div>
  );
}
