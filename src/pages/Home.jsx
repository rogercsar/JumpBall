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
  ChevronRight,
  Swords,
  PartyPopper,
  Feather,
  Rocket,
  Compass,
  Users
} from 'lucide-react';
import { useAuth, resolveInterestsList } from '../contexts/AuthContext.jsx';
import { STAGES, BALL_SKINS, WORLDS } from '../game/stages';
import { getActiveCommemorativeStages } from '../game/events';
import SkinPreviewCanvas from '../components/SkinPreviewCanvas';

export function Home({ onNavigate }) {
  const { user, profile, updateProfile } = useAuth();
  const currentSkin = BALL_SKINS.find(s => s.id === (profile?.ball_skin || 'neon-cyan')) || BALL_SKINS[0];

  const stagesCompleted = profile?.stages_completed || 0;
  const stagesHeroCompleted = profile?.stages_completed_hero || 0;
  const stagesFreeCompleted = profile?.stages_completed_free || 0;
  const highScore = profile?.high_score || 0;
  const totalJumps = profile?.total_jumps || 0;
  const gamesPlayed = profile?.games_played || 0;
  const progressPercent = Math.min(100, Math.round((stagesCompleted / STAGES.length) * 100));
  const userInterests = resolveInterestsList(profile?.user_interests);

  // Eventos comemorativos ativos na data atual
  const activeEvents = React.useMemo(() => getActiveCommemorativeStages(profile), [profile]);

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

  // Amostras de skins por categoria para o showcase
  const heroineSkins = BALL_SKINS.filter(s => s.category === 'heroines').slice(0, 4);
  const heroSkins = BALL_SKINS.filter(s => s.category === 'heroes').slice(0, 4);
  const spaceSkins = BALL_SKINS.filter(s => s.category === 'space' || s.category === 'army').slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* 1. HERO BANNER PRINCIPAL DO JOGO (MINIMALISTA & CLEAN) */}
      <section className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/80 bg-slate-950/60 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-4 max-w-xl flex-1">
            {/* Indicador de Status Discreto */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">
                {rank.title} • Nv. {playerLevel}
              </span>
              <span className="text-slate-700">•</span>
              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                title="Ver saldo na Garagem"
              >
                💎 {profile?.gems ?? 100}
              </button>
            </div>

            {/* Título & Subtítulo Elegantes */}
            <div className="space-y-1.5">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                {user ? (
                  <>
                    Olá, <span className={`bg-gradient-to-r ${rank.gradient} bg-clip-text text-transparent`}>{profile?.username || 'Piloto'}</span>
                  </>
                ) : (
                  <>
                    JumpBall <span className="text-cyan-400">Titan</span>
                  </>
                )}
              </h1>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Desafie {STAGES.length} fases em 10 mundos épicos, jogue no Modo Herói ou Modo Livre, colecione mais de {BALL_SKINS.length} esferas e domine o topo do ranking.
              </p>
            </div>

            {/* Botões de Ação Principais e Links Secundários */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 w-full max-w-lg">
                <button
                  onClick={() => onNavigate('game')}
                  className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                  <span>MODO HERÓI</span>
                </button>

                <button
                  onClick={() => onNavigate('game')}
                  className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>MODO LIVRE</span>
                </button>

                <button
                  onClick={() => onNavigate('game')}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-orange-400 hover:text-orange-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-orange-500/30 hover:border-orange-500/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                  <span>INFINITO</span>
                </button>

                <button
                  onClick={() => onNavigate('game')}
                  className="py-2.5 px-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-800 hover:border-slate-700 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>DUELO 1V1</span>
                </button>
              </div>

              {/* Links de Acesso Rápido Discretos */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-400 pt-1">
                <button
                  onClick={() => onNavigate('ranking')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400/80" />
                  <span>Ranking</span>
                </button>
                <span className="text-slate-700">•</span>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <Palette className="w-3.5 h-3.5 text-cyan-400/80" />
                  <span>Garagem ({BALL_SKINS.length} Esferas)</span>
                </button>
                <span className="text-slate-700">•</span>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1"
                >
                  <Award className="w-3.5 h-3.5 text-purple-400/80" />
                  <span>Missões</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. ESFERA ATIVA (ANIMADA COM LEVITAÇÃO & AURA CÓSMICA) */}
          <div className="flex flex-col items-center justify-center p-5 bg-slate-900/30 rounded-2xl border border-slate-800/60 shrink-0 w-full sm:w-56 relative overflow-hidden">
            {/* Aura cósmica suave com a cor de glow da esfera */}
            <div
              className="absolute w-28 h-28 rounded-full blur-2xl opacity-25 pointer-events-none animate-pulse-glow"
              style={{ backgroundColor: currentSkin.glow || '#06b6d4' }}
            />

            <div
              className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 my-2 animate-float-ball"
              onClick={() => onNavigate('profile')}
              title="Personalizar Esfera na Loja"
            >
              <SkinPreviewCanvas skinId={currentSkin.id} size={84} shadow={true} animated={true} />
            </div>

            <div className="text-center mt-2 space-y-1 relative z-10">
              <span className="text-xs font-bold text-white block truncate max-w-[160px]">
                {currentSkin.name}
              </span>
              <button
                onClick={() => onNavigate('profile')}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer"
              >
                Trocar Esfera
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER DE EVENTO COMEMORATIVO ATIVO (QUANDO HOUVER) */}
      {activeEvents.length > 0 && (
        <section className="relative overflow-hidden rounded-3xl p-5 sm:p-6 border border-pink-500/40 bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-slate-950 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center text-3xl shadow-lg shadow-pink-500/30 shrink-0 animate-bounce">
                {activeEvents[0].celebrationIcon || '🎉'}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                    Evento Festivo Ativo • {activeEvents[0].daysRemaining} {activeEvents[0].daysRemaining === 1 ? 'dia restante' : 'dias restantes'}
                  </span>
                  <span className="text-xs font-black text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded-lg border border-amber-500/30">
                    +{activeEvents[0].rewardGems} 💎 Recompensa
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-black text-white">
                  {activeEvents[0].name}
                </h2>
                <p className="text-xs text-slate-300 max-w-xl">
                  {activeEvents[0].celebrationSubtitle} Conquiste o topo nesta semana antes que o evento se encerre!
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('game')}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              <PartyPopper className="w-4 h-4" />
              <span>JOGAR FASE FESTIVA</span>
            </button>
          </div>
        </section>
      )}

      {/* 2.5 DESTAQUE DOS MODOS DE JORNADA SOLO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Modo Herói */}
        <div
          onClick={() => onNavigate('game')}
          className="group relative rounded-3xl p-5 border border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900/90 to-slate-950 hover:border-amber-400/60 shadow-xl shadow-amber-500/5 transition-all cursor-pointer overflow-hidden flex flex-col justify-between space-y-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-amber-500/30 shrink-0 group-hover:scale-105 transition-transform">
              <Crown className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Desafio Supremo
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>Modo Herói</span>
              <span className="text-xs text-amber-400 font-bold">({stagesHeroCompleted}/50)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jornada linear épica: complete cada fase para desbloquear a próxima. Enfrente chefões titânicos a cada 5 fases e prove sua habilidade suprema!
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-amber-300 font-bold">
            <span>Iniciar Desafio</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Modo Livre */}
        <div
          onClick={() => onNavigate('game')}
          className="group relative rounded-3xl p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 hover:border-emerald-400/60 shadow-xl shadow-emerald-500/5 transition-all cursor-pointer overflow-hidden flex flex-col justify-between space-y-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shadow-emerald-500/30 shrink-0 group-hover:scale-105 transition-transform">
              <Feather className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Acesso Total
            </span>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <span>Modo Livre</span>
              <span className="text-xs text-emerald-400 font-bold">({stagesFreeCompleted}/50)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Todas as 50 fases e 10 mundos liberados desde o início. Escolha qualquer bioma para treinar, explorar e quebrar recordes sem restrições de bloqueio.
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-emerald-300 font-bold">
            <span>Explorar Fases</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* BANNER DE CONVITE PARA O QUIZ DE INTERESSES (SE AINDA NÃO SELECIONOU) */}
      {userInterests.length === 0 && (
        <section className="relative overflow-hidden rounded-3xl p-5 border border-pink-500/30 bg-gradient-to-r from-pink-950/25 via-purple-950/25 to-slate-950 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-2xl shadow-md shadow-pink-500/20 shrink-0 animate-pulse">
              ✨
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white">
                Descubra suas Heroínas e Skins Favoritas!
              </h3>
              <p className="text-xs text-slate-300">
                Responda ao Quiz de Interesses na Garagem para desbloquear recomendações sob medida para o seu estilo.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('profile')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            RESPONDER QUIZ
          </button>
        </section>
      )}

      {/* 3. CARDS DE ESTATÍSTICAS (MINIMALISTAS) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Recorde */}
        <div 
          onClick={() => onNavigate('ranking')}
          className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2 cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Recorde Solo</span>
            <Trophy className="w-3.5 h-3.5 text-amber-400/80" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-400">
            {highScore.toLocaleString()} <span className="text-xs font-normal text-amber-400/70">pts</span>
          </div>
        </div>

        {/* Fases Cósmicas */}
        <div 
          onClick={() => onNavigate('game')}
          className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2 cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Fases</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/80" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400">
              {stagesCompleted} <span className="text-xs font-normal text-cyan-400/70">/ {STAGES.length}</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modo Infinito */}
        <div 
          onClick={() => onNavigate('game')}
          className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2 cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Modo Infinito</span>
            <Flame className="w-3.5 h-3.5 text-orange-400/80" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-orange-400">
            {profile?.endless_high_score || 0} <span className="text-xs font-normal text-orange-400/70">m</span>
          </div>
        </div>

        {/* Saldo de Gemas */}
        <div 
          onClick={() => onNavigate('profile')}
          className="glass-card rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2 cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Gemas</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300">
            {profile?.gems ?? 100} <span className="text-xs font-normal text-amber-400/70">💎</span>
          </div>
        </div>
      </section>

      {/* 3.5 SHOWCASE DOS 10 MUNDOS TEMÁTICOS */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Os 30 Mundos Temáticos
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              150 fases por modo (300 fases totais), distribuídas em 30 mundos temáticos até 150.000m!
            </p>
          </div>
          <button
            onClick={() => onNavigate('game')}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Ver Fases no Jogo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-h-[580px] overflow-y-auto pr-1">
          {WORLDS.map((w) => (
            <div
              key={w.id}
              onClick={() => onNavigate('game')}
              className={`p-3.5 rounded-2xl border transition-all text-left relative overflow-hidden bg-gradient-to-br ${w.gradient} ${w.border} hover:scale-[1.02] cursor-pointer flex flex-col justify-between space-y-2`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Mundo {w.id}
                  </span>
                  <span className="text-[10px] font-bold text-amber-400">
                    Fases {w.stageRange[0]}-{w.stageRange[1]}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white truncate">{w.shortName}</h4>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 leading-snug">
                  {w.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-rose-400 font-semibold truncate max-w-[120px]">
                  👹 {w.bossName}
                </span>
                <span className="text-slate-400">Chefe #{w.bossStageNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3.8 SHOWCASE DE SKINS E COLEÇÕES */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <h2 className="text-base sm:text-lg font-bold text-white">
                Garagem de Esferas ({BALL_SKINS.length}+ Colecionáveis)
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Personalize sua esfera com skins exclusivas de Heroínas, Heróis, Ficção Científica e Forças Especiais.
            </p>
          </div>
          <button
            onClick={() => onNavigate('profile')}
            className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Ver Toda a Loja</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[...heroineSkins.slice(0, 3), ...heroSkins.slice(0, 3)].map((skin) => {
            const isEquipped = skin.id === currentSkin.id;
            return (
              <div
                key={skin.id}
                onClick={() => onNavigate('profile')}
                className={`p-3 rounded-2xl border transition-all text-center flex flex-col items-center justify-between space-y-2 cursor-pointer hover:scale-105 ${
                  isEquipped
                    ? 'border-cyan-400 bg-cyan-950/20 shadow-lg shadow-cyan-500/10'
                    : 'glass-card border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="relative py-1">
                  <SkinPreviewCanvas skinId={skin.id} size={50} shadow={false} animated={false} />
                </div>
                <div className="w-full">
                  <span className="text-[11px] font-bold text-white block truncate">
                    {skin.name}
                  </span>
                  <span className="text-[10px] text-amber-400 font-semibold block mt-0.5">
                    {skin.priceGems === 0 ? 'Gratuita' : `💎 ${skin.priceGems}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. MISSÕES DO PILOTO (CLEAN & DIRETAS) */}
      <section className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Missões de Treinamento</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Missão 1 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${stagesCompleted >= 1
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'glass-card border-slate-800/80'
            }`}>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-bold text-white">Conquistar Fase 1</h4>
              {stagesCompleted >= 1 ? (
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Concluída
                </span>
              ) : (
                <span className="text-[11px] text-slate-500 font-medium">0 / 1</span>
              )}
            </div>
            <p className="text-xs text-slate-400">Vença a Floresta Esmeralda atingindo 1.800m.</p>
          </div>

          {/* Missão 2 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${totalJumps >= 100
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'glass-card border-slate-800/80'
            }`}>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-bold text-white">Mestre dos Saltos</h4>
              {totalJumps >= 100 ? (
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Concluída
                </span>
              ) : (
                <span className="text-[11px] text-slate-500 font-medium">{Math.min(100, totalJumps)} / 100</span>
              )}
            </div>
            <p className="text-xs text-slate-400">Acumule 100 saltos ao longo das partidas.</p>
          </div>

          {/* Missão 3 */}
          <div className={`p-3.5 rounded-2xl border transition-all ${highScore >= 5000
              ? 'bg-emerald-950/20 border-emerald-500/30'
              : 'glass-card border-slate-800/80'
            }`}>
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-bold text-white">Super Recordista</h4>
              {highScore >= 5000 ? (
                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Concluída
                </span>
              ) : (
                <span className="text-[11px] text-slate-500 font-medium">{highScore} / 5.000 pts</span>
              )}
            </div>
            <p className="text-xs text-slate-400">Supere 5.000 pontos em qualquer fase.</p>
          </div>
        </div>
      </section>

      {/* 5. VISÃO GERAL DAS FASES CÓSMICAS (MAPA DE FASES) */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Trajetória Cósmica Completa
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {STAGES.length} fases com físicas, temas e mecânicas próprias até {maxAltitude.toLocaleString('pt-BR')}m.
            </p>
          </div>
          <button
            onClick={() => onNavigate('game')}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <span>Ver no Jogo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {STAGES.map((stage) => {
            const isUnlocked = stage.number <= (stagesCompleted + 1);
            const isFinished = stage.number <= stagesCompleted;
            return (
              <div
                key={stage.id}
                onClick={() => isUnlocked && onNavigate('game')}
                className={`p-3 rounded-2xl border transition-all text-left relative overflow-hidden ${isFinished
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200 hover:scale-[1.02] cursor-pointer'
                    : isUnlocked
                      ? 'glass-card border-cyan-500/40 hover:scale-[1.02] cursor-pointer'
                      : 'bg-slate-950/40 border-slate-800/40 opacity-50 cursor-not-allowed'
                  }`}
              >
                <div className="flex items-center justify-between mb-1.5 relative z-10">
                  <span className="text-[10px] font-semibold text-slate-400">
                    #{stage.number}
                  </span>
                  {isFinished ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isUnlocked ? (
                    <Play className="w-3 h-3 text-cyan-400 fill-current" />
                  ) : (
                    <Lock className="w-3 h-3 text-slate-600" />
                  )}
                </div>
                <h4 className="text-xs font-bold text-white truncate relative z-10">{stage.title}</h4>
                <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-slate-800/60 text-[10px] text-slate-400 relative z-10">
                  <span className="text-cyan-300 font-medium">{stage.targetHeight}m</span>
                  <span>{stage.speedFactor}x</span>
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
