import React, { useState } from 'react';
import { Camera, ChevronUp, ChevronDown, Zap, Eye, EyeOff } from 'lucide-react';

export function CameraPreview({ canvasRef, isCameraActive, gestureDetected, error, enabled }) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!enabled) {
    return null;
  }

  return (
    <div className="fixed top-16 right-2 sm:top-20 sm:right-6 z-30 flex flex-col items-end transition-all select-none">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5 shadow-xl backdrop-blur-md hover:border-cyan-400 transition-all active:scale-95"
          title="Expandir Câmera IA"
        >
          <Camera className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>Visão IA</span>
        </button>
      ) : (
        /* Box Compacto do PiP */
        <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 bg-slate-950/95 w-32 sm:w-40 animate-fade-in">
          {/* Cabeçalho do PiP */}
          <div className="px-2.5 py-1 bg-slate-900/90 flex items-center justify-between border-b border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-1 font-semibold text-cyan-300">
              <Camera className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Visão IA</span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-0.5 text-slate-400 hover:text-white rounded transition-colors"
              title="Minimizar Câmera"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Conteúdo do Canvas da Câmera */}
          <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={320}
              height={240}
              className="w-full h-full object-cover"
            />

            {/* Overlay de Status de Câmera em Inicialização */}
            {!isCameraActive && (
              <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-2 text-center">
                <Camera className="w-5 h-5 text-slate-500 mb-1 animate-pulse" />
                <span className="text-[10px] text-slate-400 leading-tight">
                  {error || 'Conectando câmera...'}
                </span>
              </div>
            )}

            {/* Alerta de Pulo por Gesto em Tempo Real */}
            {gestureDetected && (
              <div className="absolute inset-0 bg-cyan-500/30 backdrop-blur-xs flex items-center justify-center animate-bounce">
                <div className="px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] flex items-center gap-1 shadow-lg shadow-cyan-500/50">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>{gestureDetected === 'fist' ? 'PUNHO! 👊' : 'PULO! 🚀'}</span>
                </div>
              </div>
            )}

            {/* Dica de Gesto no rodapé do frame */}
            {isCameraActive && !gestureDetected && (
              <div className="absolute bottom-1 inset-x-1 text-center pointer-events-none">
                <span className="text-[8px] bg-slate-900/90 text-cyan-300 px-1.5 py-0.5 rounded-full backdrop-blur-xs border border-cyan-500/20">
                  Punho 👊 = Salto
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
