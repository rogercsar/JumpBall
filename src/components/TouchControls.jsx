import React from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';

export function TouchControls({ onTouchLeft, onTouchRight, onTouchJump, onRelease, boostEnergy = 100 }) {
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

  const isFull = boostEnergy >= 95;
  const isCharging = boostEnergy > 15 && !isFull;

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

      {/* Botão Central de Impulso / Super Salto Dinâmico */}
      <button
        type="button"
        onPointerDown={handleJumpDown}
        onContextMenu={(e) => e.preventDefault()}
        className={`px-4 sm:px-5 h-12 sm:h-13 rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 touch-none transition-all ${
          isFull
            ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-rose-500/30 border border-rose-400/40 animate-pulse'
            : isCharging
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs border border-cyan-400/40 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800/90 text-slate-400 font-semibold text-xs border border-slate-700/60 shadow'
        }`}
        aria-label="Super Salto"
      >
        <div className="flex items-center gap-1.5">
          <Zap className={`w-4 h-4 fill-current ${isFull ? 'text-yellow-200' : isCharging ? 'text-cyan-200' : 'text-slate-500'}`} />
          <span>{isFull ? 'Super Pulo' : isCharging ? `Impulso (${Math.round(boostEnergy)}%)` : 'Pulo Normal'}</span>
        </div>
        <span className="text-[9px] text-slate-300/80 font-mono hidden sm:block">
          {isFull ? '100% Carga' : isCharging ? 'Força Parcial' : 'Recarregando'}
        </span>
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

