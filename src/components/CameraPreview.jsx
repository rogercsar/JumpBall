import React, { useState } from 'react';
import { Camera, ChevronUp, ChevronDown, Zap, Eye, EyeOff } from 'lucide-react';

export function CameraPreview({ canvasRef, isCameraActive, gestureDetected, error, onToggleCamera, enabled }) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!enabled) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-30 flex flex-col items-end transition-all">
      {/* Box do PiP (Picture in Picture) */}
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30 bg-slate-950/90 w-44 md:w-52">
        {/* Cabeçalho do PiP */}
        <div className="px-3 py-2 bg-slate-900/90 flex items-center justify-between border-b border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
            <Camera className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Visão IA</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 text-slate-400 hover:text-white rounded transition-colors"
              title={isMinimized ? 'Expandir' : 'Minimizar'}
            >
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Conteúdo do Canvas da Câmera */}
        {!isMinimized && (
          <div className="relative aspect-[4/3] bg-slate-950 flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              width={320}
              height={240}
              className="w-full h-full object-cover"
            />

            {/* Overlay de Status de Câmera Desligada / Erro */}
            {!isCameraActive && (
              <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-2 text-center">
                <Camera className="w-6 h-6 text-slate-600 mb-1" />
                <span className="text-[11px] text-slate-400 leading-tight">
                  {error || 'Iniciando MediaPipe Hands...'}
                </span>
              </div>
            )}

            {/* Alerta de Pulo por Gesto em Tempo Real */}
            {gestureDetected && (
              <div className="absolute inset-0 bg-cyan-500/30 backdrop-blur-xs flex items-center justify-center animate-bounce">
                <div className="px-2.5 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-lg shadow-cyan-500/50">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>{gestureDetected === 'fist' ? 'PUNHO! 👊' : 'PULO! 🚀'}</span>
                </div>
              </div>
            )}

            {/* Dica de Gesto no rodapé do frame */}
            {isCameraActive && !gestureDetected && (
              <div className="absolute bottom-1 inset-x-1 text-center">
                <span className="text-[9px] bg-slate-900/80 text-cyan-300/80 px-2 py-0.5 rounded-full backdrop-blur-xs border border-cyan-500/20">
                  Feche o punho para saltar
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
