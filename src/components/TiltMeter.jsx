import React from 'react';
import { Smartphone, Target } from 'lucide-react';

export function TiltMeter({ gamma = 0, onSimulateTilt, isSupported, onCalibrate }) {
  // Limita valor visual entre -45 e 45 graus para a barra
  const clampedGamma = Math.max(-45, Math.min(45, gamma));
  const percentOffset = (clampedGamma / 45) * 50; // -50% a +50%

  return (
    <div className="glass-card rounded-2xl p-3 sm:p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-cyan-400" />
          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            Nível de Inclinação (Giroscópio)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700">
            {gamma > 0 ? `+${gamma}°` : `${gamma}°`}
          </span>
          {onCalibrate && (
            <button
              onClick={onCalibrate}
              title="Calibrar Centro Neutro"
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <Target className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Barra de Nível Visual */}
      <div className="relative w-full h-5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/60 flex items-center justify-center">
        {/* Marcador Central */}
        <div className="absolute w-1 h-full bg-slate-600 z-10" />
        
        {/* Zona Neutra (Deadzone) */}
        <div className="absolute w-10 h-full bg-cyan-500/10 border-x border-cyan-500/20" />

        {/* Bolha / Cursor do Giroscópio */}
        <div
          className="absolute w-6 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 shadow-md shadow-cyan-400/50 transition-all duration-75"
          style={{
            left: `calc(50% + ${percentOffset}% - 12px)`
          }}
        />
      </div>

      {/* Slider de Simulação para Desktop */}
      {!isSupported && onSimulateTilt && (
        <div className="mt-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>Simular inclinação (Desktop):</span>
            <button
              onClick={() => onSimulateTilt(0)}
              className="text-cyan-400 hover:underline"
            >
              Centralizar
            </button>
          </div>
          <input
            type="range"
            min="-35"
            max="35"
            value={gamma}
            onChange={(e) => onSimulateTilt(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>
      )}
    </div>
  );
}
