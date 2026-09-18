import React from 'react';
import { 
  Play, 
  Trophy, 
  Sparkles, 
  ArrowRight,
  UserPlus,
  LogIn,
  Zap,
  Palette,
  History,
  CheckCircle2,
  Lock,
  Gamepad2,
  Target,
  Award,
  Shield,
  Flame,
  Star,
  Crown,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { STAGES, BALL_SKINS } from '../game/stages';

export function Home({ onNavigate }) {
  const { user, profile, updateProfile } = useAuth();
  const currentSkin = BALL_SKINS.find(s => s.id === (profile?.ball_skin || 'neon-cyan')) || BALL_SKINS[0];

  const stagesCompleted = profile?.stages_completed || 0;
  const highScore = profile?.high_score || 0;
  const totalJumps = profile?.total_jumps || 0;
  const gamesPlayed = profile?.games_played || 0;
  const progressPercent = Math.min(100, Math.round((stagesCompleted / STAGES.length) * 100));

  // Sistema de Nível e Patente Gamer calibrado dinamicamente para todas as fases
  const maxAltitude = STAGES[STAGES.length - 1]?.targetHeight || 43000;
  const playerXP = stagesCompleted * 1200 + Math.floor(highScore / 4) + totalJumps * 2;
  const playerLevel = Math.max(1, Math.floor(playerXP / 1800) + 1);
  const currentLevelProgress = Math.min(100, Math.round(((playerXP % 1800) / 1800) * 100));

  const getRankData = (lvl) => {
    if (lvl >= 30) return { title: 'Divindade Cósmica', gradient: 'from-amber-300 via-rose-500 to-violet-600', icon: Crown, border: 'border-amber-400 shadow-amber-500/20' };
    if (lvl >= 24) return { title: 'Titã Dimensional', gradient: 'from-fuchsia-400 via-rose-400 to-amber-300', icon: Sparkles, border: 'border-fuchsia-500/40' };
    if (lvl >= 18) return { title: 'Soberano Elemental', gradient: 'from-indigo-400 via-purple-400 to-pink-500', icon: Shield, border: 'border-indigo-500/40' };
    if (lvl >= 13) return { title: 'Lorde Cósmico', gradient: 'from-amber-400 via-orange-400 to-rose-500', icon: Crown, border: 'border-amber-500/40' };
    if (lvl >= 9) return { title: 'Mestre da Gravidade', gradient: 'from-purple-400 via-indigo-400 to-cyan-400', icon: Sparkles, border: 'border-purple-500/40' };
    if (lvl >= 5) return { title: 'Salteador Estelar', gradient: 'from-cyan-400 via-sky-400 to-blue-500', icon: Zap, border: 'border-cyan-500/40' };
    if (lvl >= 2) return { title: 'Piloto Veterano', gradient: 'from-emerald-400 to-teal-400', icon: Award, border: 'border-emerald-500/40' };
    return { title: 'Cadete Espacial', gradient: 'from-slate-300 to-slate-400', icon: Star, border: 'border-slate-700' };
  };

  const rank = getRankData(playerLevel);
  const RankIcon = rank.icon;

  const handleQuickEquipSkin = async (skinId) => {
    if (updateProfile) {
      await updateProfile({ ball_skin: skinId });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* 1. HERO BANNER PRINCIPAL DO JOGO */}
      <section className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/90 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 shadow-2xl">
        {/* Efeitos de iluminação cósmica no fundo */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-4 max-w-xl">
            {/* Tag da Temporada e Patente */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase tracking-wider shadow-sm">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                TEMPORADA 1: RUMO AOS {maxAltitude.toLocaleString()}M
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border ${rank.border} text-xs font-bold text-slate-200 shadow-sm`}>
                <RankIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>{rank.title} • Nível {playerLevel}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              {user ? (
                <>
                  Pronto para o salto, <span className={`bg-gradient-to-r ${rank.gradient} bg-clip-text text-transparent`}>{profile?.username || 'Piloto'}</span>?
                </>
              ) : (
                <>
                  JUMPBALL <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">TITAN {Math.round(maxAltitude / 1000)}K</span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Desafie {STAGES.length} biomas cósmicos extremos, salte sobre plataformas móveis, desvie de perigos e alcance o ápice da jornada a {maxAltitude.toLocaleString()} metros de altitude!
            </p>

            {/* Barra de XP do Nível Gamer */}
            <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800/80 max-w-md">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-400">Progresso de Patente</span>
                <span className="font-bold text-cyan-400">{playerXP.toLocaleString()} XP • {currentLevelProgress}%</span>
              </div>
              <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-rose-500 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </div>

            {/* Botões de Ação Principais */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('game')}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base flex items-center gap-2.5 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>INICIAR JOGO</span>
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className="px-5 py-4 rounded-2xl glass-card text-slate-200 hover:text-white font-bold text-sm flex items-center gap-2 border border-slate-700/80 hover:border-cyan-500/40 hover:bg-slate-800/80 transition-all active:scale-95 shadow-md"
              >
                <Palette className="w-4 h-4 text-cyan-400" />
                <span>Mudar Esfera</span>
              </button>

              {!user && (
                <button
                  onClick={() => onNavigate('login')}
                  className="px-5 py-4 rounded-2xl bg-slate-900 text-slate-300 hover:text-white font-bold text-sm flex items-center gap-2 border border-slate-800 hover:border-slate-700 transition-all active:scale-95"
                >
                  <LogIn className="w-4 h-4 text-slate-400" />
                  <span>Entrar / Salvar</span>
                </button>
              )}
            </div>
          </div>

          {/* 2. HANGAR DA ESFERA (PREVIEW INTERATIVO) */}
          <div className="relative flex flex-col items-center justify-center p-4 bg-slate-900/40 rounded-3xl border border-slate-800/60 shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400/80 mb-2">
              ESFERA ATIVA NO HANGAR
            </span>

            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full flex items-center justify-center">
              {/* Aura pulsante de energia */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: `radial-gradient(circle, ${currentSkin.glow} 0%, rgba(6,182,212,0.12) 70%, transparent 100%)`
                }}
              />

              {/* Esfera 3D com sombra e iluminação interna */}
              <div 
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-2xl flex items-center justify-center transform transition-transform hover:scale-110 cursor-pointer active:scale-95"
                onClick={() => onNavigate('profile')}
                title="Personalizar Esfera no Hangar"
                style={{
                  background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${currentSkin.primary} 45%, ${currentSkin.trail} 100%)`,
                  boxShadow: `0 0 45px ${currentSkin.glow}, inset -6px -6px 18px rgba(0,0,0,0.6)`
                }}
              >
                <div className="w-7 h-7 rounded-full bg-white/45 blur-xs absolute top-4 left-6" />
              </div>
            </div>

            <div className="mt-2 text-center space-y-2">
              <h3 className="text-base font-black text-white">{currentSkin.name}</h3>

              {/* Mini Seletor Rápido de Skins no Próprio Dashboard */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
                {BALL_SKINS.map((skin) => (
                  <button
                    key={skin.id}
                    onClick={() => handleQuickEquipSkin(skin.id)}
                    title={skin.name}
                    className={`w-6 h-6 rounded-full transition-transform ${
                      currentSkin.id === skin.id 
                        ? 'scale-125 ring-2 ring-white shadow-lg' 
                        : 'opacity-60 hover:opacity-100 hover:scale-110'
                    }`}
                    style={{
                      background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${skin.primary} 50%, ${skin.trail} 100%)`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CARDS DE ESTATÍSTICAS GAMER (BATTLE STATS) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recorde */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 bg-gradient-to-b from-slate-900/80 to-amber-950/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Recorde Máximo</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {highScore.toLocaleString()} <span className="text-xs font-bold text-amber-400/70">pts</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Pontuação mais alta</p>
          </div>
        </div>

        {/* Fases Cósmicas */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 bg-gradient-to-b from-slate-900/80 to-cyan-950/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Fases Concluídas</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">
              {stagesCompleted} <span className="text-xs font-bold text-cyan-400/70">/ {STAGES.length}</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="bg-cyan-500 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Total de Saltos */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-3 bg-gradient-to-b from-slate-900/80 to-sky-950/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total de Saltos</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-400">
              {totalJumps.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Impulsos verticais</p>
          </div>
        </div>

        {/* Partidas Jogadas */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3 bg-gradient-to-b from-slate-900/80 to-purple-950/10 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Partidas Realizadas</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">
              {gamesPlayed.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Sessões completadas</p>
          </div>
        </div>
      </section>

      {/* 4. MISSÕES & DESAFIOS DO PILOTO (QUEST LOG) */}
      <section className="glass-panel rounded-3xl p-6 border border-slate-800/90 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white">Missões do Piloto Cósmico</h2>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
            Recompensas Ativas
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Missão 1 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            stagesCompleted >= 1 
              ? 'bg-emerald-950/20 border-emerald-500/40' 
              : 'glass-card border-slate-800/80'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">PRIMEIRA VITÓRIA</span>
              {stagesCompleted >= 1 ? (
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Concluída
                </span>
              ) : (
                <span className="text-[10px] font-bold text-slate-400">0 / 1</span>
              )}
            </div>
            <h4 className="text-sm font-bold text-white">Conquistar Fase 1</h4>
            <p className="text-xs text-slate-400 mt-1">Vença a Floresta Esmeralda atingindo 1.800 metros de altura.</p>
          </div>

          {/* Missão 2 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            totalJumps >= 100 
              ? 'bg-emerald-950/20 border-emerald-500/40' 
              : 'glass-card border-slate-800/80'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-400">SALTEADOR DE ELITE</span>
              {totalJumps >= 100 ? (
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Concluída
                </span>
              ) : (
                <span className="text-[10px] font-bold text-slate-400">{Math.min(100, totalJumps)} / 100</span>
              )}
            </div>
            <h4 className="text-sm font-bold text-white">Mestre das Molas</h4>
            <p className="text-xs text-slate-400 mt-1">Acumule 100 saltos ao longo das suas partidas cósmicas.</p>
          </div>

          {/* Missão 3 */}
          <div className={`p-4 rounded-2xl border transition-all ${
            highScore >= 5000 
              ? 'bg-emerald-950/20 border-emerald-500/40' 
              : 'glass-card border-slate-800/80'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">PONTUAÇÃO DE OURO</span>
              {highScore >= 5000 ? (
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Concluída
                </span>
              ) : (
                <span className="text-[10px] font-bold text-slate-400">{highScore} / 5.000 pts</span>
              )}
            </div>
            <h4 className="text-sm font-bold text-white">Super Recordista</h4>
            <p className="text-xs text-slate-400 mt-1">Supere a marca dos 5.000 pontos em qualquer uma das fases.</p>
          </div>
        </div>
      </section>

      {/* 5. VISÃO GERAL DAS 20 FASES CÓSMICAS (MAPA DE FASES) */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Trajetória Cósmica ({STAGES.length} Fases até 43.000m)</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Olimpo, Futebol, Piratas, Heróis, Música, Rocha, Ferro, Madeira e muito mais!
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('game')}
              className="px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <span>Ver no Jogo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {STAGES.map((stage) => {
            const isUnlocked = stage.number <= (stagesCompleted + 1);
            const isFinished = stage.number <= stagesCompleted;
            return (
              <div 
                key={stage.id}
                onClick={() => isUnlocked && onNavigate('game')}
                className={`p-3.5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                  isFinished 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200 hover:scale-[1.02] cursor-pointer'
                    : isUnlocked 
                      ? 'glass-card border-cyan-500/50 shadow-sm shadow-cyan-500/10 hover:scale-[1.02] cursor-pointer'
                      : 'bg-slate-950/40 border-slate-800/50 opacity-60 cursor-not-allowed'
                }`}
              >
                {/* Gradiente temático sutil */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${stage.bgGradient[0]} 0%, ${stage.bgGradient[2]} 100%)`
                  }}
                />

                <div className="flex items-center justify-between mb-2 relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Fase {stage.number}
                  </span>
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isUnlocked ? (
                    <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-600" />
                  )}
                </div>
                <h4 className="text-xs font-bold text-white truncate relative z-10">{stage.title}</h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 relative z-10">
                  <span className="text-cyan-300 font-semibold">{stage.targetHeight}m</span>
                  <span className="font-bold">{stage.speedFactor}x</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. GUIA DE MANOBRAS E GAMEPLAY GAMER */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Gamepad2 className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Controle de Toque Direto</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Toque na metade esquerda ou direita da tela para manobrar a esfera. Você também pode arrastar o dedo de forma analógica suave.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-rose-400">
            <Zap className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Super Salto Rápido</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dê um toque duplo rápido na tela ou deslize o dedo para cima (*swipe up*) para disparar um impulso explosivo para o alto!
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Shield className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Sistema de 3 Vidas</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Você começa cada fase com 3 vidas. Ao cair, você renasce imediatamente na última plataforma com um escudo protetor temporário!
          </p>
        </div>
      </section>
    </div>
  );
}
