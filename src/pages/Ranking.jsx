import React, { useState, useEffect, useCallback } from 'react';
import {
  Trophy,
  Medal,
  Crown,
  Flame,
  RefreshCw,
  Gamepad2,
  Zap,
  CheckCircle2,
  User,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  Swords
} from 'lucide-react';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext.jsx';
import { BALL_SKINS, STAGES } from '../game/stages';
import SkinPreviewCanvas from '../components/SkinPreviewCanvas';

export function Ranking({ onNavigate }) {
  const { user, profile } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('high_score'); // 'high_score' | 'stages_completed'
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchLeaderboard = useCallback(async (showIndicator = false) => {
    if (showIndicator) setIsRefreshing(true);

    try {
      let remoteData = [];

      if (isSupabaseConfigured && supabase) {
        const orderColumn = filter === 'stages_completed' ? 'stages_completed' : 'high_score';
        const { data, error } = await supabase
          .from('profiles')
          .select('id, username, full_name, avatar_url, high_score, total_jumps, stages_completed, ball_skin, updated_at')
          .order(orderColumn, { ascending: false })
          .limit(10);

        if (!error && data) {
          remoteData = data;
        }
      }

      // Se o usuário logado / local tiver dados válidos e não estiver no top 10 remoto, mescla com segurança
      const local = localStore.getProfile();
      const currentUserId = user?.id || local.id;
      const currentUserScore = profile?.high_score || local.high_score || 0;
      const currentUserStages = profile?.stages_completed || local.stages_completed || 0;

      let merged = [...remoteData];

      // Se o banco remoto estiver vazio (ou offline), cria uma lista contendo pelo menos o jogador atual
      if (merged.length === 0) {
        merged = [
          {
            id: currentUserId,
            username: profile?.username || local.username || 'Piloto',
            full_name: profile?.full_name || local.full_name || '',
            avatar_url: profile?.avatar_url || null,
            high_score: currentUserScore,
            total_jumps: profile?.total_jumps || local.total_jumps || 0,
            stages_completed: currentUserStages,
            ball_skin: profile?.ball_skin || local.ball_skin || 'neon-cyan'
          }
        ];
      } else {
        // Atualiza a linha do jogador atual na lista caso o score local seja mais recente
        const userIdx = merged.findIndex(p => p.id === currentUserId);
        if (userIdx !== -1) {
          merged[userIdx] = {
            ...merged[userIdx],
            high_score: Math.max(merged[userIdx].high_score || 0, currentUserScore),
            stages_completed: Math.max(merged[userIdx].stages_completed || 0, currentUserStages)
          };
        }
      }

      // Ordena rigorosamente pelo critério selecionado
      merged.sort((a, b) => {
        if (filter === 'stages_completed') {
          return (b.stages_completed || 0) - (a.stages_completed || 0) || (b.high_score || 0) - (a.high_score || 0);
        }
        return (b.high_score || 0) - (a.high_score || 0);
      });

      setLeaderboard(merged.slice(0, 10));
      setLastUpdated(new Date());
    } catch (err) {
      console.warn('Aviso ao carregar ranking:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [filter, user?.id, profile?.high_score, profile?.stages_completed, profile?.username, profile?.ball_skin]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Encontra a posição do jogador atual no ranking exibido
  const currentUserId = user?.id || localStore.getProfile()?.id;
  const userRankIndex = leaderboard.findIndex(p => p.id === currentUserId);
  const userRank = userRankIndex !== -1 ? userRankIndex + 1 : null;
  const topPlayer = leaderboard[0];

  const getSkinDetails = (skinId) => {
    return BALL_SKINS.find(s => s.id === skinId) || BALL_SKINS[0];
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* 1. HEADER DO PAINEL DE RANKING */}
      <section className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 border border-slate-800/90 bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/90 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              Top 10 Global
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Ranking dos Pilotos
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              As 10 pontuações mais altas registradas em tempo real entre todos os jogadores cadastrados no JumpBall.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-stretch sm:self-auto">
            <button
              onClick={() => fetchLeaderboard(true)}
              disabled={isRefreshing}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all active:scale-95 shadow-md disabled:opacity-50"
              title="Recarregar pontuações mais recentes"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isRefreshing ? 'Atualizando...' : 'Atualizar'}</span>
            </button>

            {onNavigate && (
              <button
                onClick={() => onNavigate('game')}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all active:scale-95"
              >
                <Gamepad2 className="w-4 h-4 fill-current" />
                <span>Superar Recorde</span>
              </button>
            )}
          </div>
        </div>

        {/* CARDS DE RESUMO RÁPIDO */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="glass-card p-3 sm:p-4 rounded-2xl border border-slate-800/80 bg-slate-900/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sua Posição</span>
            <div className="text-lg sm:text-2xl font-black text-cyan-400 mt-0.5 flex items-center gap-1.5">
              {userRank ? (
                <>
                  <span>#{userRank}</span>
                  {userRank <= 3 && <Trophy className="w-4 h-4 text-amber-400" />}
                </>
              ) : (
                <span className="text-sm font-semibold text-slate-500">Sem rank</span>
              )}
            </div>
          </div>

          <div className="glass-card p-3 sm:p-4 rounded-2xl border border-slate-800/80 bg-slate-900/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Seu Recorde</span>
            <div className="text-lg sm:text-2xl font-black text-amber-400 mt-0.5">
              {(profile?.high_score || localStore.getProfile()?.high_score || 0).toLocaleString()} <span className="text-[10px] text-amber-400/70 font-bold">pts</span>
            </div>
          </div>

          <div className="glass-card p-3 sm:p-4 rounded-2xl border border-slate-800/80 bg-slate-900/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Líder Atual</span>
            <div className="text-sm sm:text-base font-black text-white mt-1 truncate">
              {topPlayer ? topPlayer.username : '---'}
            </div>
            <div className="text-[10px] font-bold text-amber-400 truncate">
              {topPlayer ? `${(topPlayer.high_score || 0).toLocaleString()} pts` : ''}
            </div>
          </div>

          <div className="glass-card p-3 sm:p-4 rounded-2xl border border-slate-800/80 bg-slate-900/50">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Fase Mais Alta</span>
            <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-0.5">
              {topPlayer ? topPlayer.stages_completed : 0} <span className="text-[10px] text-slate-500 font-bold">/ {STAGES.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTROS E ABAS DE CLASSIFICAÇÃO */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
        <div className="flex p-1 bg-slate-900/90 rounded-2xl border border-slate-800 w-full sm:w-auto shadow-inner">
          <button
            type="button"
            onClick={() => setFilter('high_score')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${filter === 'high_score'
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
              }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Maiores Pontuações</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('stages_completed')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${filter === 'stages_completed'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
              }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mais Fases ({STAGES.length})</span>
          </button>
        </div>

        {lastUpdated && (
          <span className="text-[11px] text-slate-500 self-end sm:self-auto">
            Sincronizado: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* 3. PODIUM VISUAL TOP 3 (QUANDO HOUVER PELO MENOS 3 JOGADORES) */}
      {!loading && leaderboard.length >= 3 && (
        <section className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-8 pb-4">
          {/* 2º Lugar - Prata */}
          {leaderboard[1] && (
            <div className="flex flex-col items-center animate-fade-in order-1">
              <div className="relative mb-2 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <SkinPreviewCanvas skinId={leaderboard[1].ball_skin} size={54} />
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                    2
                  </span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-200 mt-2 truncate max-w-[90px] sm:max-w-[140px] text-center">
                  {leaderboard[1].username}
                </h3>
                <span className="text-[11px] font-black text-slate-300 font-mono">
                  {(leaderboard[1].high_score || 0).toLocaleString()} pts
                </span>
              </div>
              <div className="w-full h-24 sm:h-32 rounded-t-2xl bg-gradient-to-t from-slate-900 to-slate-800/80 border-t-2 border-slate-400/50 flex flex-col items-center justify-center p-2 shadow-xl">
                <Medal className="w-6 h-6 text-slate-300 mb-1" />
                <span className="text-[10px] font-black text-slate-400 uppercase">2º Lugar</span>
              </div>
            </div>
          )}

          {/* 1º Lugar - Ouro (Centro / Mais alto) */}
          {leaderboard[0] && (
            <div className="flex flex-col items-center animate-fade-in order-2">
              <div className="relative mb-2 flex flex-col items-center">
                <Crown className="w-6 h-6 text-amber-400 animate-bounce mb-1 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <div className="relative flex items-center justify-center">
                  <SkinPreviewCanvas skinId={leaderboard[0].ball_skin} size={70} />
                  <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg">
                    1
                  </span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-amber-300 mt-2 truncate max-w-[110px] sm:max-w-[160px] text-center drop-shadow-sm">
                  {leaderboard[0].username}
                </h3>
                <span className="text-xs sm:text-sm font-black text-amber-400 font-mono drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                  {(leaderboard[0].high_score || 0).toLocaleString()} pts
                </span>
              </div>
              <div className="w-full h-32 sm:h-44 rounded-t-2xl bg-gradient-to-t from-slate-900 via-amber-950/30 to-amber-500/20 border-t-4 border-amber-400 flex flex-col items-center justify-center p-2 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-radial from-amber-400/10 to-transparent pointer-events-none" />
                <Trophy className="w-8 h-8 text-amber-400 mb-1 animate-pulse" />
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider">Campeão</span>
                <span className="text-[10px] font-bold text-amber-400/80 mt-0.5">
                  {leaderboard[0].stages_completed} / {STAGES.length} Fases
                </span>
              </div>
            </div>
          )}

          {/* 3º Lugar - Bronze */}
          {leaderboard[2] && (
            <div className="flex flex-col items-center animate-fade-in order-3">
              <div className="relative mb-2 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <SkinPreviewCanvas skinId={leaderboard[2].ball_skin} size={54} />
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                    3
                  </span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-200 mt-2 truncate max-w-[90px] sm:max-w-[140px] text-center">
                  {leaderboard[2].username}
                </h3>
                <span className="text-[11px] font-black text-amber-500 font-mono">
                  {(leaderboard[2].high_score || 0).toLocaleString()} pts
                </span>
              </div>
              <div className="w-full h-20 sm:h-28 rounded-t-2xl bg-gradient-to-t from-slate-900 to-slate-800/80 border-t-2 border-amber-700/50 flex flex-col items-center justify-center p-2 shadow-xl">
                <Medal className="w-6 h-6 text-amber-600 mb-1" />
                <span className="text-[10px] font-black text-amber-600 uppercase">3º Lugar</span>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 4. LISTA COMPLETA DAS 10 MELHORES PONTUAÇÕES */}
      <section className="glass-panel rounded-3xl border border-slate-800/90 overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm sm:text-base font-bold text-white">Tabela de Classificação</h2>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Top {leaderboard.length} de 10
          </span>
        </div>

        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span className="text-xs font-bold text-slate-400">Carregando placar global...</span>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Award className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-slate-300">Nenhum recorde registrado ainda</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Seja o primeiro a jogar uma partida para registrar seu nome no topo do placar!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {leaderboard.map((item, index) => {
              const position = index + 1;
              const isCurrentUser = item.id === currentUserId;
              const skin = getSkinDetails(item.ball_skin);

              return (
                <div
                  key={item.id || index}
                  className={`px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 transition-all ${isCurrentUser
                    ? 'bg-cyan-950/25 border-l-4 border-l-cyan-400'
                    : position === 1
                      ? 'bg-amber-950/15'
                      : 'hover:bg-slate-900/40'
                    }`}
                >
                  {/* Posição + Avatar / Skin + Nome */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Badge de Posição */}
                    <div className="w-8 flex items-center justify-center shrink-0">
                      {position === 1 ? (
                        <div className="w-7 h-7 rounded-xl bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md shadow-amber-400/30">
                          1º
                        </div>
                      ) : position === 2 ? (
                        <div className="w-7 h-7 rounded-xl bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-md">
                          2º
                        </div>
                      ) : position === 3 ? (
                        <div className="w-7 h-7 rounded-xl bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                          3º
                        </div>
                      ) : (
                        <span className="font-mono text-xs font-bold text-slate-400">
                          #{position}
                        </span>
                      )}
                    </div>

                    {/* Preview da Esfera / Skin equipada */}
                    <div className="shrink-0 flex items-center justify-center" title={`Skin: ${skin.name}`}>
                      <SkinPreviewCanvas skinId={item.ball_skin} size={36} shadow={false} />
                    </div>

                    {/* Identificação do Jogador */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-xs sm:text-sm truncate ${isCurrentUser ? 'text-cyan-300 font-black' : 'text-slate-100'
                          }`}>
                          {item.username || 'Piloto'}
                        </span>
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase border border-cyan-500/40">
                            Você
                          </span>
                        )}
                        {position === 1 && (
                          <span className="hidden sm:inline-block text-[10px] font-black text-amber-400 uppercase px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                            Líder
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Layers className="w-3 h-3 text-cyan-400" />
                          <span>{item.stages_completed || 0}/{STAGES.length} fases</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1">
                          <Zap className="w-3 h-3 text-sky-400" />
                          <span>{(item.total_jumps || 0).toLocaleString()} saltos</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pontuação Recorde e Botão de Desafio */}
                  <div className="flex items-center gap-3 shrink-0">
                    {!isCurrentUser && onNavigate && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('game');
                        }}
                        className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 hover:border-rose-500/50 text-rose-300 hover:text-white font-bold text-xs transition-all active:scale-95 shadow-sm"
                        title={`Desafiar ${item.username || 'Piloto'} para um Duelo 1v1`}
                      >
                        <Swords className="w-3.5 h-3.5 text-rose-400" />
                        <span>Desafiar</span>
                      </button>
                    )}
                    <div className="text-right">
                      <div className={`text-sm sm:text-base font-black font-mono tracking-tight ${position === 1
                        ? 'text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]'
                        : position === 2
                          ? 'text-slate-200'
                          : position === 3
                            ? 'text-amber-500'
                            : isCurrentUser
                              ? 'text-cyan-300 font-extrabold'
                              : 'text-slate-300'
                        }`}>
                        {(item.high_score || 0).toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-bold ml-1">pts</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block">
                        Recorde pessoal
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
