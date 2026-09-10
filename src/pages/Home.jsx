import React from 'react';
import { 
  Play, 
  Smartphone, 
  Camera, 
  Trophy, 
  Sparkles, 
  Compass, 
  ArrowRight,
  UserPlus,
  LogIn,
  Zap,
  Palette,
  History,
  CheckCircle2,
  Lock,
  LayoutDashboard,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { STAGES, BALL_SKINS } from '../game/stages';

export function Home({ onNavigate, hasOrientation, isCameraActive }) {
  const { user, profile } = useAuth();
  const currentSkin = BALL_SKINS.find(s => s.id === (profile?.ball_skin || 'neon-cyan')) || BALL_SKINS[0];

  const stagesCompleted = profile?.stages_completed || 0;
  const highScore = profile?.high_score || 0;
  const totalJumps = profile?.total_jumps || 0;
  const gamesPlayed = profile?.games_played || 0;
  const progressPercent = Math.min(100, Math.round((stagesCompleted / STAGES.length) * 100));

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Cabeçalho do Dashboard */}
      <section className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/80 bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-slate-900/90">
        {/* Glow de fundo */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Painel de Controle do Piloto</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              {user ? (
                <>
                  Olá, <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">{profile?.username || 'Piloto'}</span>!
                </>
              ) : (
                <>
                  JumpBall <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">Pro Runner</span>
                </>
              )}
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {user 
                ? 'Monitore seu progresso cósmico, configure seus sensores e alcance novas altitudes nos saltos verticais.'
                : 'Conecte-se para registrar seus recordes na nuvem, destravar esferas personalizadas e subir pelas 10 fases temáticas.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              {!user ? (
                <>
                  <button
                    onClick={() => onNavigate('register')}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>CRIAR CONTA GRÁTIS</span>
                  </button>

                  <button
                    onClick={() => onNavigate('login')}
                    className="px-5 py-3.5 rounded-2xl glass-card text-slate-200 hover:text-white font-bold text-sm flex items-center gap-2 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/80 transition-all"
                  >
                    <LogIn className="w-4 h-4 text-cyan-400" />
                    <span>Entrar no Sistema</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('game')}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base flex items-center gap-2 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>JOGAR AGORA</span>
                  </button>

                  <button
                    onClick={() => onNavigate('history')}
                    className="px-5 py-3.5 rounded-2xl glass-card text-slate-200 hover:text-white font-bold text-sm flex items-center gap-2 border border-slate-700 hover:border-slate-600 hover:bg-slate-800/80 transition-all"
                  >
                    <History className="w-4 h-4 text-cyan-400" />
                    <span>Histórico de Partidas</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Hangar da Esfera / Skin Preview */}
          <div className="relative flex flex-col items-center justify-center p-4">
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: `radial-gradient(circle, ${currentSkin.glow} 0%, rgba(6,182,212,0.1) 70%, transparent 100%)`
                }}
              />

              <div 
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-2xl flex items-center justify-center transform transition-transform hover:scale-110 cursor-pointer"
                onClick={() => onNavigate('profile')}
                title="Clique para trocar a Skin no Perfil"
                style={{
                  background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${currentSkin.primary} 45%, ${currentSkin.trail} 100%)`,
                  boxShadow: `0 0 40px ${currentSkin.glow}, inset -5px -5px 15px rgba(0,0,0,0.5)`
                }}
              >
                <div className="w-6 h-6 rounded-full bg-white/40 blur-xs absolute top-4 left-6" />
              </div>
            </div>

            <div className="mt-3 text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800/70 border border-slate-700 text-xs">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-slate-300">Skin Equipada:</span>
                <span className="font-bold text-cyan-400">{currentSkin.name}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métricas Principais do Jogador (KPI Cards) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Recorde */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Recorde Máximo</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              {highScore.toLocaleString()} <span className="text-xs font-bold text-amber-400/70">pts</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Sua maior pontuação alcançada</p>
          </div>
        </div>

        {/* Fases Cósmicas */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Fases Concluídas</span>
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
                className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Total de Saltos */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-sky-500/30 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total de Saltos</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-sky-400">
              {totalJumps.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Impulsos computados</p>
          </div>
        </div>

        {/* Partidas Jogadas */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 hover:border-purple-500/30 transition-all flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Partidas Realizadas</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-400">
              {gamesPlayed.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Sessões iniciadas</p>
          </div>
        </div>
      </section>

      {/* Ações Rápidas do Dashboard */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div 
          onClick={() => onNavigate('game')}
          className="group cursor-pointer glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-cyan-500/50 bg-gradient-to-br from-slate-900/60 to-cyan-950/20 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">Iniciar Corrida Vertical</h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Entre na arena agora. Suba plataformas, colete estrelas e sobreviva aos obstáculos de cada fase.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('profile')}
          className="group cursor-pointer glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-sky-500/50 bg-gradient-to-br from-slate-900/60 to-sky-950/20 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors">Hangar de Personalização</h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Escolha entre diferentes estilos e cores de esferas com efeitos especiais de rastro e iluminação.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('settings')}
          className="group cursor-pointer glass-card rounded-2xl p-6 border border-slate-800/90 hover:border-emerald-500/50 bg-gradient-to-br from-slate-900/60 to-emerald-950/20 transition-all hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </div>
          <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">Calibração de Sensores</h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            Ajuste a sensibilidade do giroscópio do celular e teste a detecção de gestos na câmera selfie.
          </p>
        </div>
      </section>

      {/* Visão Geral das 10 Fases Cósmicas */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">Trajetória Cósmica (10 Fases)</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Cada fase apresenta física ajustada, gravidade diferenciada e novos desafios dinâmicos.
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 self-start sm:self-auto">
            Progresso Geral: <span className="text-cyan-400 font-bold">{progressPercent}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {STAGES.map((stage) => {
            const isUnlocked = stage.number <= (stagesCompleted + 1);
            const isFinished = stage.number <= stagesCompleted;
            return (
              <div 
                key={stage.id}
                className={`p-3.5 rounded-2xl border transition-all text-left relative overflow-hidden ${
                  isFinished 
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                    : isUnlocked 
                      ? 'bg-slate-900/80 border-cyan-500/50 shadow-sm shadow-cyan-500/10'
                      : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
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
                <h4 className="text-xs font-bold text-white truncate">{stage.title}</h4>
                <p className="text-[10px] text-slate-400 mt-1 truncate">{stage.mechanic}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Monitor de Sensores & Controles */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-slate-800/90 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">Giroscópio & Acelerômetro</h3>
                <p className="text-[11px] text-slate-400">Controle de inclinação lateral</p>
              </div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              hasOrientation ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {hasOrientation ? 'Sensor Pronto' : 'Em Espera / Desktop'}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            No celular, incline para os lados para movimentar a esfera. No computador, utilize as setas do teclado ou as teclas A / D.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800/90 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-200">MediaPipe Vision AI</h3>
                <p className="text-[11px] text-slate-400">Reconhecimento gestual de pulo</p>
              </div>
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              isCameraActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
            }`}>
              {isCameraActive ? 'Visão Ativa' : 'Pronto p/ Ativar'}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Salte fechando a mão diante da câmera frontal ou utilize a barra de espaço / toque na tela para acionar os saltos manuais.
          </p>
        </div>
      </section>
    </div>
  );
}
