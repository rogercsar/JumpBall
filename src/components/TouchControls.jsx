import React from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

export function TouchControls({ onTouchLeft, onTouchRight, onTouchJump, onRelease }) {
  return (
    <div className="w-full max-w-[420px] px-2 mt-1.5 flex items-center justify-between select-none">
      {/* Botão Esquerda */}
      <button
        onPointerDown={() => onTouchLeft()}
        onPointerUp={() => onRelease()}
        onPointerLeave={() => onRelease()}
        className="w-14 h-11 sm:w-16 sm:h-12 rounded-xl glass-card flex items-center justify-center text-cyan-300 active:scale-95 active:bg-cyan-500/30 border border-cyan-500/25 shadow-lg shadow-black/40 touch-none"
        aria-label="Mover para a Esquerda"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Botão Central de Super Salto */}
      <button
        onPointerDown={() => onTouchJump()}
        className="px-5 h-11 sm:h-12 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 active:scale-95 shadow-lg shadow-rose-500/25 touch-none"
        aria-label="Super Salto"
      >
        <Zap className="w-4 h-4 fill-current" />
        <span>Pular</span>
      </button>

      {/* Botão Direita */}
      <button
        onPointerDown={() => onTouchRight()}
        onPointerUp={() => onRelease()}
        onPointerLeave={() => onRelease()}
        className="w-14 h-11 sm:w-16 sm:h-12 rounded-xl glass-card flex items-center justify-center text-cyan-300 active:scale-95 active:bg-cyan-500/30 border border-cyan-500/25 shadow-lg shadow-black/40 touch-none"
        aria-label="Mover para a Direita"
      >
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}
