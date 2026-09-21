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
  ArrowUp,
  Droplets,
  Feather,
  CloudRain,
  Wind,
  Compass,
  Landmark,
  SunMedium,
  Orbit,
  Atom,
  Crown,
  Trophy,
  Anchor,
  Flower2,
  Leaf,
  Shield,
  Music,
  Globe,
  Shapes,
  Boxes,
  Cookie,
  Gamepad2,
  Building2,
  Ticket,
  Pyramid,
  Cog,
  Infinity,
  Pickaxe,
  Anvil,
  Axe
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
  Sparkles,
  Droplets,
  Feather,
  CloudRain,
  Wind,
  Compass,
  Landmark,
  SunMedium,
  Orbit,
  Atom,
  Crown,
  Trophy,
  Anchor,
  Flower2,
  Leaf,
  Shield,
  Music,
  Globe,
  Shapes,
  Boxes,
  Cookie,
  Gamepad2,
  Building2,
  Ticket,
  Pyramid,
  Cog,
  Infinity,
  Pickaxe,
  Anvil,
  Axe
};

export function StageCard({ stage, isUnlocked, isCompleted, onSelect, journeyMode = 'hero' }) {
  const IconComponent = ICON_MAP[stage.icon] || Sparkles;
  const isBoss = Boolean(stage.isBossStage);
  const isHorizontal = stage.layout === 'horizontal';
  const showBossStyle = isBoss && journeyMode !== 'free';

  return (
    <div
      onClick={() => isUnlocked && onSelect(stage)}
      className={`relative rounded-3xl p-5 border transition-all select-none overflow-hidden ${
        !isUnlocked
          ? 'opacity-60 bg-slate-900/40 border-slate-800 cursor-not-allowed'
          : showBossStyle
            ? 'glass-card border-amber-500/60 bg-gradient-to-br from-amber-950/25 via-slate-900/95 to-slate-950 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
            : isBoss && journeyMode === 'free'
              ? 'glass-card border-emerald-500/50 bg-gradient-to-br from-emerald-950/20 via-slate-900/95 to-slate-950 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/15 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
              : 'glass-card border-slate-800/80 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      {/* Fundo temático com gradiente sutil */}
      <div 
        className={`absolute inset-0 pointer-events-none ${showBossStyle ? 'opacity-25' : 'opacity-15'}`}
        style={{
          background: `linear-gradient(135deg, ${stage.bgGradient[0]} 0%, ${stage.bgGradient[2]} 100%)`
        }}
      />

      {/* Badge de Percurso Horizontal */}
      {isHorizontal && (
        <div className="relative z-10 flex items-center justify-between mb-2 pb-1 border-b border-sky-500/20">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 text-sky-300 text-[10px] font-black uppercase tracking-wider">
            <span>🏃‍♂️</span>
            <span>PERCURSO HORIZONTAL</span>
          </div>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sky-900/40 border border-sky-500/30 text-sky-400">
            {(stage.targetDistance / 1000).toFixed(1)}km
          </span>
        </div>
      )}

      {isBoss && (
        <div className={`relative z-10 flex items-center justify-between mb-2 pb-1 border-b ${
          showBossStyle ? 'border-amber-500/20' : 'border-emerald-500/20'
        }`}>
          {showBossStyle ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black uppercase tracking-wider animate-pulse">
              <span>👑</span>
              <span>BATALHA DE CHEFÃO</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider">
              <span>🏔️</span>
              <span>CUME DO MUNDO • ESCALADA PURA</span>
            </div>
          )}
          {showBossStyle && stage.hasParallelUniverseAttack && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/30 text-purple-300">
              🌌 Universo Paralelo
            </span>
          )}
        </div>
      )}

      <div className="relative z-10 flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-950 font-black shadow-md shrink-0"
            style={{
              background: showBossStyle
                ? 'linear-gradient(135deg, #f59e0b, #ef4444)'
                : isBoss && journeyMode === 'free'
                  ? 'linear-gradient(135deg, #34d399, #059669)'
                  : `linear-gradient(135deg, ${stage.platformColor}, ${stage.platformBorder})`
            }}
          >
            <IconComponent className={`w-5 h-5 ${showBossStyle ? 'text-white' : 'text-slate-950'}`} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Fase {stage.number}
            </span>
            <h3 className={`text-base font-bold leading-tight ${showBossStyle ? 'text-amber-200' : 'text-white'}`}>
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
            <span className={`p-1.5 rounded-lg border flex items-center justify-center ${isBoss ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'}`}>
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
        {isHorizontal ? (
          <div className="flex items-center gap-1 text-sky-300 font-semibold">
            <span>🏁</span>
            <span>Meta: {(stage.targetDistance).toLocaleString()}m</span>
          </div>
        ) : isBoss ? (
          <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
            <span>⚔️ Subida Infinita · {stage.bossHP} HP</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-cyan-300 font-semibold">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Meta: {stage.targetHeight}m</span>
          </div>
        )}

        {isBoss ? (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            💎 +{stage.rewardGems} Gemas
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            Velocidade {stage.speedFactor}x
          </span>
        )}
      </div>
    </div>
  );
}
