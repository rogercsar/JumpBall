import React, { useState, useEffect } from 'react';
import { 
  History as HistoryIcon, 
  Trophy, 
  Skull, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ArrowUp, 
  Filter, 
  RotateCw,
  Gamepad2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext.jsx';
import { STAGES } from '../game/stages';

const PAGE_SIZE = 10;

export function History({ onNavigate }) {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'game_over'
  const [currentPage, setCurrentPage] = useState(1);

  const fetchHistory = async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase && user) {
      try {
        const { data, error } = await supabase
          .from('game_history')
          .select('*')
          .eq('user_id', user.id)
          .order('played_at', { ascending: false })
          .limit(100);

        if (data && data.length > 0) {
          setMatches(data);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Erro ao carregar histórico do Supabase, usando local:', err);
      }
    }

    // Fallback localStore
    const localData = localStore.getHistory();
    setMatches(localData);
    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();

    // Sincronização em tempo real com o Supabase Realtime
    if (isSupabaseConfigured && supabase && user) {
      const channel = supabase
        .channel('game_history_realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'game_history', filter: `user_id=eq.${user.id}` },
          (payload) => {
            setMatches((prev) => [payload.new, ...prev]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const filteredMatches = matches.filter((m) => {
    if (filter === 'completed') return m.status === 'completed';
    if (filter === 'game_over') return m.status === 'game_over';
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredMatches.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedMatches = filteredMatches.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HistoryIcon className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">Histórico de Partidas</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Registro de todas as suas tentativas, alturas e pontuações alcançadas
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão de Atualizar */}
          <button
            onClick={fetchHistory}
            className="p-2 rounded-xl glass-card text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 transition-colors"
            title="Atualizar lista"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>

          {/* Filtros */}
          <div className="flex p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => handleFilterChange('completed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'completed' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Vitórias
            </button>
            <button
              onClick={() => handleFilterChange('game_over')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'game_over' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Quedas
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Partidas */}
      {filteredMatches.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 space-y-4">
          <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-300">Nenhuma partida registrada</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Jogue a primeira fase para começar a acumular estatísticas e pontuações no seu histórico!
          </p>
          <button
            onClick={() => onNavigate('game')}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
          >
            Jogar Fase 1
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {paginatedMatches.map((match) => {
              const stageId = match.stage_id || match.stageId || 1;
              const stage = STAGES.find((s) => s.number === stageId) || STAGES[0];
              const isWin = match.status === 'completed';
              const maxHeight = match.max_height ?? match.maxHeight ?? 0;
              const jumps = match.jumps_count ?? match.jumps ?? 0;
              const controlMode = match.control_mode || match.controlMode || 'híbrido';

              return (
                <div
                  key={match.id}
                  className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 hover:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                >
                  {/* Ícone e Nome da Fase */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isWin 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isWin ? <CheckCircle2 className="w-5 h-5" /> : <Skull className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">
                          Fase {stage.number}: {stage.title}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isWin
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {isWin ? 'Concluída' : 'Game Over'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                        <span>{new Date(match.played_at).toLocaleDateString('pt-BR')} às {new Date(match.played_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>•</span>
                        <span className="capitalize">{controlMode}</span>
                      </div>
                    </div>
                  </div>

                  {/* Métricas da Partida */}
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Pontuação</span>
                      <span className="text-lg font-black text-amber-400">
                        {match.score?.toLocaleString()} pts
                      </span>
                    </div>

                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Altura Máx.</span>
                      <span className="text-sm font-bold text-cyan-300 flex items-center justify-end gap-0.5">
                        <ArrowUp className="w-3 h-3" />
                        {maxHeight}m
                      </span>
                    </div>

                    <div className="text-right hidden md:block">
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">Saltos</span>
                      <span className="text-sm font-bold text-slate-300 flex items-center justify-end gap-1">
                        <Zap className="w-3 h-3 text-rose-400" />
                        {jumps}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Barra de Controles de Paginação (10 em 10) */}
          {totalPages > 1 && (
            <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                Mostrando <span className="text-white font-semibold">{startIndex + 1}</span> a{' '}
                <span className="text-white font-semibold">{Math.min(startIndex + PAGE_SIZE, filteredMatches.length)}</span> de{' '}
                <span className="text-cyan-400 font-bold">{filteredMatches.length}</span> partidas
              </div>

              <div className="flex items-center gap-1.5">
                {/* Botão Anterior */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    currentPage === 1
                      ? 'border-slate-800/50 text-slate-600 cursor-not-allowed'
                      : 'border-slate-700 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                {/* Páginas numeradas */}
                <div className="flex items-center gap-1 px-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    // Se houver muitas páginas, exibe página 1, última, e vizinhas da atual
                    if (
                      totalPages > 6 &&
                      pageNum !== 1 &&
                      pageNum !== totalPages &&
                      Math.abs(pageNum - currentPage) > 1
                    ) {
                      if (pageNum === 2 || pageNum === totalPages - 1) {
                        return (
                          <span key={pageNum} className="text-slate-600 px-1 text-xs">
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    const isActive = pageNum === currentPage;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Botão Próxima */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
                    currentPage === totalPages
                      ? 'border-slate-800/50 text-slate-600 cursor-not-allowed'
                      : 'border-slate-700 bg-slate-800/70 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <span>Próxima</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
