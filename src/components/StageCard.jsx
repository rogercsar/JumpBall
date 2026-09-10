import React from 'react';
import { 
  Play, 
  Lock, 
  CheckCircle2, 
  TreePine, 
  Sun, 
  Waves, 
  Zap, 
  Flame, 
  Snowflake, 
  Gem, 
  Cloud, 
  Cpu, 
  Sparkles,
  ArrowUp
} from 'lucide-react';

const ICON_MAP = {
  TreePine,
  Sun,
  Waves,
  Zap,
  Flame,
  Snowflake,
  Gem,
  Cloud,
  Cpu,
  Sparkles
};

export function StageCard({ stage, isUnlocked, isCompleted, onSelect }) {
  const IconComponent = ICON_MAP[stage.icon] || Sparkles;

  return (
    <div
      onClick={() => isUnlocked && onSelect(stage)}
      className={`relative rounded-3xl p-5 border transition-all select-none overflow-hidden ${
        !isUnlocked
          ? 'opacity-60 bg-slate-900/40 border-slate-800 cursor-not-allowed'
          : 'glass-card border-slate-800/80 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      {/* Fundo temático com gradiente sutil */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${stage.bgGradient[0]} 0%, ${stage.bgGradient[2]} 100%)`
        }}
      />

      <div className="relative z-10 flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-md"
            style={{
              background: `linear-gradient(135deg, ${stage.platformColor}, ${stage.platformBorder})`
            }}
          >
            <IconComponent className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Fase {stage.number}
            </span>
            <h3 className="text-base font-bold text-white leading-tight">
              {stage.title}
            </h3>
          </div>
        </div>

        {/* Status de Conclusão / Bloqueio */}
        <div>
          {!isUnlocked ? (
            <span className="p-1.5 rounded-lg bg-slate-800 text-slate-500 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </span>
          ) : isCompleted ? (
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center" title="Fase Concluída">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          ) : (
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
              <Play className="w-4 h-4 fill-current" />
            </span>
          )}
        </div>
      </div>

      {/* Descrição e Mecânica */}
      <p className="relative z-10 text-xs text-slate-400 line-clamp-2 mb-3 min-h-[32px]">
        {stage.description}
      </p>

      {/* Meta e Obstáculos */}
      <div className="relative z-10 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-cyan-300 font-semibold">
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Meta: {stage.targetHeight}m</span>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
          Velocidade {stage.speedFactor}x
        </span>
      </div>
    </div>
  );
}
