import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Layers, 
  Zap, 
  Check, 
  Palette, 
  Edit3, 
  Save, 
  Sparkles,
  History as HistoryIcon,
  Skull,
  CheckCircle2,
  ArrowUp,
  RotateCw,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useDialog } from '../contexts/DialogContext';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';
import { BALL_SKINS, STAGES } from '../game/stages';

const PAGE_SIZE = 10;

export function Profile({ onNavigate, initialTab = 'skins' }) {
  const { user, profile, updateProfile, isGuest } = useAuth();
  const { showAlert } = useDialog();
  const [activeTab, setActiveTab] = useState(initialTab); // 'skins' | 'history'
  const [isEditingName, setIsEditingName] = useState(false);
  const [usernameInput, setUsernameInput] = useState(profile?.username || '');
  const [fullNameInput, setFullNameInput] = useState(profile?.full_name || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Estados do Histórico de Partidas
  const [matches, setMatches] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all', 'completed', 'game_over'
  const [currentPage, setCurrentPage] = useState(1);

  const currentSkinId = profile?.ball_skin || 'neon-cyan';
  const activeSkin = BALL_SKINS.find(s => s.id === currentSkinId) || BALL_SKINS[0];
  const stagesCompleted = Math.max(profile?.stages_completed || 0, localStore.getProfile()?.stages_completed || 0);
  const [skinCategory, setSkinCategory] = useState('all'); // 'all' | 'heroes' | 'army' | 'space' | 'starter'

  const fetchHistory = async () => {
    setHistoryLoading(true);
    const isRemoteUser = Boolean(
      isSupabaseConfigured && 
      supabase && 
      user && 
      !user.id?.startsWith('offline-') && 
      !user.id?.startsWith('guest-')
    );

    if (isRemoteUser) {
      try {
        const { data, error } = await supabase
          .from('game_history')
          .select('*')
          .eq('user_id', user.id)
          .order('played_at', { ascending: false })
          .limit(100);

        if (!error && data && data.length > 0) {
          setMatches(data);
          setHistoryLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Erro ao carregar histórico do Supabase, usando local:', err);
      }
    }

    // Fallback localStore
    const localData = localStore.getHistory();
    setMatches(localData);
    setHistoryLoading(false);
  };

  useEffect(() => {
    fetchHistory();

    const isRemoteUser = Boolean(
      isSupabaseConfigured && 
      supabase && 
      user && 
      !user.id?.startsWith('offline-') && 
      !user.id?.startsWith('guest-')
    );

    if (isRemoteUser) {
      const channel = supabase
        .channel(`game_history_realtime_${user.id}`)
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
  }, [user?.id]);

  const handleSaveProfile = async () => {
    if (!usernameInput.trim()) {
      showAlert({
        title: 'Nome Inválido',
        message: 'O apelido de piloto não pode ficar em branco.',
        variant: 'warning',
        confirmText: 'Entendido'
      });
      return;
    }
    await updateProfile({
      username: usernameInput.trim(),
      full_name: fullNameInput.trim()
    });
    setIsEditingName(false);
    showAlert({
      title: 'Perfil Atualizado',
      message: `Seu nome de piloto foi alterado para "${usernameInput.trim()}" com sucesso!`,
      variant: 'success'
    });
  };

  const handleSelectSkin = async (skinId) => {
    const chosenSkin = BALL_SKINS.find(s => s.id === skinId);
    if (!chosenSkin) return;

    const isUnlocked = !chosenSkin.unlockStage || stagesCompleted >= chosenSkin.unlockStage;
    if (!isUnlocked) {
      showAlert({
        title: '🔒 Skin Bloqueada',
        message: `A skin "${chosenSkin.name}" é desbloqueada ao vencer a Fase ${chosenSkin.unlockStage}! Conquiste as fases no modo solo para liberar essa esfera especial.`,
        variant: 'warning',
        confirmText: 'Entendido'
      });
      return;
    }

    await updateProfile({ ball_skin: skinId });
    showAlert({
      title: 'Esfera Equipada',
      message: `A skin "${chosenSkin.name}" foi equipada na sua bola de salto!`,
      variant: 'success',
      confirmText: 'Jogar com ela'
    });
  };

  const handleFilterChange = (newFilter) => {
    setHistoryFilter(newFilter);
    setCurrentPage(1);
  };

  const filteredMatches = matches.filter((m) => {
    if (historyFilter === 'completed') return m.status === 'completed';
    if (historyFilter === 'game_over') return m.status === 'game_over';
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredMatches.length / PAGE_SIZE));
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedMatches = filteredMatches.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Notificação de Sucesso */}
      {saveSuccess && (
        <div className="fixed top-20 right-6 z-50 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-bounce">
          <Check className="w-4 h-4" />
          <span>Perfil atualizado com sucesso!</span>
        </div>
      )}

      {/* 1. CARD PRINCIPAL DE PERFIL */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar com a Skin da Bola Ativa */}
          <div className="relative group">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${activeSkin.primary} 45%, ${activeSkin.trail} 100%)`,
                boxShadow: `0 0 30px ${activeSkin.glow}`
              }}
            >
              <div className="w-4 h-4 rounded-full bg-white/40 blur-xs absolute top-3 left-5" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Dados do Usuário */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="px-3 py-1.5 bg-slate-900 border border-cyan-500 rounded-xl text-lg font-bold text-white focus:outline-none"
                    placeholder="Seu Apelido"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                    title="Salvar"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {profile?.username || 'Piloto'}
                  </h1>
                  <button
                    onClick={() => {
                      setUsernameInput(profile?.username || '');
                      setFullNameInput(profile?.full_name || '');
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    title="Editar Nome"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {isGuest && (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                  Modo Convidado
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{user?.email || 'convidado@jumpball.app'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  Piloto desde {new Date(profile?.created_at || Date.now()).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ESTATÍSTICAS GERAIS DO PILOTO */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Recorde</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {(profile?.high_score || 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Pontuação máxima</p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Fases</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            {profile?.stages_completed || 0} <span className="text-xs text-slate-500 font-bold">/ {STAGES.length}</span>
          </div>
          <p className="text-[11px] text-slate-500">Fases liberadas</p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Saltos</span>
            <Zap className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">
            {(profile?.total_jumps || 0).toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500">Impulsos totais</p>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Partidas</span>
            <HistoryIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">
            {matches.length}
          </div>
          <p className="text-[11px] text-slate-500">Sessões registradas</p>
        </div>
      </div>

      {/* 3. SELETOR DE ABAS INTERNAS (GARAGEM DE SKINS / HISTÓRICO DE PARTIDAS) */}
      <div className="flex p-1 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab('skins')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'skins'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Garagem de Esferas ({BALL_SKINS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-black shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HistoryIcon className="w-4 h-4" />
          <span>Histórico de Partidas ({matches.length})</span>
        </button>
      </div>

      {/* 4. ABA 1: GARAGEM DE SKINS */}
      {activeTab === 'skins' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Garagem de Esferas ({BALL_SKINS.length})</h2>
                <p className="text-xs text-slate-400">Desbloqueie visuais de heróis, forças táticas e cosmonautas avançando pelas fases!</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-black text-xs shadow-sm">
                {BALL_SKINS.filter(s => !s.unlockStage || stagesCompleted >= s.unlockStage).length} / {BALL_SKINS.length} Liberadas
              </span>
            </div>
          </div>

          {/* Filtros de Categoria de Skins */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            {[
              { id: 'all', label: 'Todas', count: BALL_SKINS.length },
              { id: 'heroes', label: 'Heróis', count: BALL_SKINS.filter(s => s.category === 'heroes').length },
              { id: 'army', label: 'Militar & Tática', count: BALL_SKINS.filter(s => s.category === 'army').length },
              { id: 'space', label: 'Espaço', count: BALL_SKINS.filter(s => s.category === 'space').length },
              { id: 'starter', label: 'Iniciais', count: BALL_SKINS.filter(s => s.category === 'starter').length }
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSkinCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  skinCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  skinCategory === cat.id ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-slate-400 font-semibold'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Grid de Skins */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
            {BALL_SKINS.filter(s => skinCategory === 'all' || s.category === skinCategory).map((skin) => {
              const isSelected = activeSkin.id === skin.id;
              const isUnlocked = !skin.unlockStage || stagesCompleted >= skin.unlockStage;

              return (
                <button
                  key={skin.id}
                  onClick={() => handleSelectSkin(skin.id)}
                  className={`flex flex-col items-center gap-2.5 p-3.5 rounded-2xl border transition-all text-center relative overflow-hidden group ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105 ring-2 ring-cyan-400/40'
                      : !isUnlocked
                        ? 'bg-slate-950/50 border-slate-800/80 opacity-70 hover:opacity-90 hover:border-amber-500/40'
                        : 'glass-card border-slate-800 hover:border-slate-700 hover:scale-[1.02]'
                  }`}
                >
                  {/* Badge de Bloqueio com Fase Requerida */}
                  {!isUnlocked && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-bold flex items-center gap-0.5 shadow-sm">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Fase {skin.unlockStage}</span>
                    </div>
                  )}

                  {/* Visual da Bola com Gradiente Fiel */}
                  <div className="relative mt-1">
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                        !isUnlocked ? 'filter grayscale-[30%] brightness-90' : 'group-hover:scale-105'
                      }`}
                      style={{
                        background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${skin.primary} 45%, ${skin.trail} 100%)`,
                        boxShadow: isUnlocked ? `0 0 18px ${skin.glow}` : '0 0 8px rgba(0,0,0,0.5)'
                      }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white/40 blur-xs absolute top-2 left-3" />
                      {!isUnlocked && (
                        <div className="w-7 h-7 rounded-full bg-slate-950/80 backdrop-blur-xs border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-md">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="w-full">
                    <span className="text-xs font-bold text-slate-200 block truncate" title={skin.name}>
                      {skin.name}
                    </span>
                    <span className={`text-[10px] font-semibold block mt-0.5 ${
                      isSelected 
                        ? 'text-cyan-400 font-bold' 
                        : !isUnlocked 
                          ? 'text-amber-400/90' 
                          : 'text-slate-500'
                    }`}>
                      {isSelected ? 'Equipado' : !isUnlocked ? `🔒 Fase ${skin.unlockStage}` : 'Selecionar'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. ABA 2: HISTÓRICO COMPLETO DE PARTIDAS */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-fade-in">
          {/* Cabeçalho do Histórico com Filtros */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <HistoryIcon className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">Registro de Partidas Realizadas</h2>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Pontuações, alturas alcançadas e desfechos de cada fase jogada
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={fetchHistory}
                className="p-2 rounded-xl glass-card text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-slate-700 transition-colors"
                title="Recarregar histórico"
              >
                <RotateCw className={`w-4 h-4 ${historyLoading ? 'animate-spin text-cyan-400' : ''}`} />
              </button>

              <div className="flex p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    historyFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => handleFilterChange('completed')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    historyFilter === 'completed' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Vitórias
                </button>
                <button
                  onClick={() => handleFilterChange('game_over')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    historyFilter === 'game_over' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
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
                Jogue para começar a acumular estatísticas e pontuações no seu histórico pessoal!
              </p>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('game')}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
                >
                  Jogar Agora
                </button>
              )}
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
                            <span>
                              {new Date(match.played_at).toLocaleDateString('pt-BR')} às{' '}
                              {new Date(match.played_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </span>
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
                            {(match.score || 0).toLocaleString()} pts
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

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="glass-panel rounded-2xl p-4 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Mostrando <span className="text-white font-semibold">{startIndex + 1}</span> a{' '}
                    <span className="text-white font-semibold">{Math.min(startIndex + PAGE_SIZE, filteredMatches.length)}</span> de{' '}
                    <span className="text-cyan-400 font-bold">{filteredMatches.length}</span> partidas
                  </div>

                  <div className="flex items-center gap-1.5">
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

                    <div className="flex items-center gap-1 px-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
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
      )}
    </div>
  );
}
