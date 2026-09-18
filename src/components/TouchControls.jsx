import React from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

export function TouchControls({ onTouchLeft, onTouchRight, onTouchJump, onRelease }) {
  const handleLeftDown = (e) => {
    e.preventDefault();
    onTouchLeft?.();
  };

  const handleRightDown = (e) => {
    e.preventDefault();
    onTouchRight?.();
  };

  const handleJumpDown = (e) => {
    e.preventDefault();
    onTouchJump?.();
  };

  const handleUp = (e) => {
    e.preventDefault();
    onRelease?.();
  };

  return (
    <div className="w-full max-w-[440px] px-3 mt-2 flex items-center justify-between gap-3 select-none touch-none shrink-0 z-10">
      {/* Botão Esquerda */}
      <button
        type="button"
        onPointerDown={handleLeftDown}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        onPointerLeave={handleUp}
        onContextMenu={(e) => e.preventDefault()}
        className="flex-1 h-12 sm:h-13 rounded-2xl glass-card flex flex-col items-center justify-center text-cyan-300 active:scale-95 active:bg-cyan-500/25 active:border-cyan-400 border border-cyan-500/30 shadow-lg shadow-black/40 touch-none transition-transform"
        aria-label="Mover para a Esquerda"
      >
        <div className="flex items-center gap-1">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[11px] font-bold uppercase tracking-wider">Esq</span>
        </div>
        <span className="text-[9px] text-slate-400 font-mono hidden sm:block">A / ←</span>
      </button>

      {/* Botão Central de Super Salto */}
      <button
        type="button"
        onPointerDown={handleJumpDown}
        onContextMenu={(e) => e.preventDefault()}
        className="px-5 h-12 sm:h-13 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-black text-xs uppercase tracking-wider flex flex-col items-center justify-center gap-0.5 active:scale-95 shadow-xl shadow-rose-500/30 border border-rose-400/40 touch-none transition-transform"
        aria-label="Super Salto"
      >
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 fill-current text-yellow-200" />
          <span>Super Pulo</span>
        </div>
        <span className="text-[9px] text-rose-200 font-mono hidden sm:block">Espaço / W</span>
      </button>

      {/* Botão Direita */}
      <button
        type="button"
        onPointerDown={handleRightDown}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
        onPointerLeave={handleUp}
        onContextMenu={(e) => e.preventDefault()}
        className="flex-1 h-12 sm:h-13 rounded-2xl glass-card flex flex-col items-center justify-center text-cyan-300 active:scale-95 active:bg-cyan-500/25 active:border-cyan-400 border border-cyan-500/30 shadow-lg shadow-black/40 touch-none transition-transform"
        aria-label="Mover para a Direita"
      >
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider">Dir</span>
          <ArrowRight className="w-5 h-5" />
        </div>
        <span className="text-[9px] text-slate-400 font-mono hidden sm:block">D / →</span>
      </button>
    </div>
  );
}

