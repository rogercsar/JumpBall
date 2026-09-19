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
  Lock,
  Flame,
  Award,
  Target,
  Coins
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useDialog } from '../contexts/DialogContext';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';
import { BALL_SKINS, BALL_TRAILS, ACHIEVEMENTS, getDailyQuests, STAGES } from '../game/stages';
import SkinPreviewCanvas from '../components/SkinPreviewCanvas';

const PAGE_SIZE = 10;

const TRAIL_ICONS = {
  Sparkles: '✨',
  Flame: '🔥',
  Palette: '🌈',
  Star: '⭐',
  Zap: '⚡',
  Music: '🎵',
  Flower2: '🌸'
};

const ACH_ICONS = {
  ArrowUp: '🚀',
  Compass: '🧭',
  Award: '🎖️',
  Crown: '👑',
  Gem: '💎',
  Shield: '🛡️',
  RotateCw: '🌀',
  Flame: '🔥'
};

export function Profile({ onNavigate, initialTab = 'skins' }) {
  const { 
    user, 
    profile, 
    updateProfile, 
    isGuest,
    buySkin,
    buyTrail,
    setSelectedTrail,
    claimDailyQuest,
    unlockAchievement
  } = useAuth();
  const { showAlert } = useDialog();
  const [activeTab, setActiveTab] = useState(initialTab); // 'skins' | 'trails' | 'quests' | 'history'
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

    const isUnlocked = chosenSkin.priceGems === 0 || profile?.unlocked_skins?.includes(skinId);
    if (isUnlocked) {
      await updateProfile({ ball_skin: skinId });
      showAlert({
        title: 'Esfera Equipada',
        message: `A skin "${chosenSkin.name}" foi equipada na sua bola de salto!`,
        variant: 'success',
        confirmText: 'Jogar com ela'
      });
      return;
    }

    // Se estiver bloqueada, o jogador adquire na loja com gemas
    const cost = chosenSkin.priceGems || 500;
    const currentGems = profile?.gems ?? 100;

    if (currentGems < cost) {
      showAlert({
        title: '💎 Gemas Insuficientes',
        message: `A skin "${chosenSkin.name}" custa ${cost} 💎 Gemas (Seu saldo: ${currentGems} 💎). Colete mais gemas jogando para comprá-la na loja!`,
        variant: 'warning',
        confirmText: 'Entendido'
      });
      return;
    }

    if (buySkin) {
      const res = await buySkin(skinId, cost);
      if (res?.success) {
        showAlert({
          title: '🎉 Skin Desbloqueada!',
          message: `Você adquiriu "${chosenSkin.name}" por ${cost} gemas e ela já está equipada!`,
          variant: 'success'
        });
      } else {
        showAlert({
          title: 'Não foi possível adquirir',
          message: res?.reason || 'Verifique seu saldo de gemas.',
          variant: 'warning'
        });
      }
    }
  };

  const handleSelectTrail = async (trailId) => {
    const chosenTrail = BALL_TRAILS.find(t => t.id === trailId);
    if (!chosenTrail) return;

    const isUnlocked = !chosenTrail.priceGems || chosenTrail.priceGems === 0 || profile?.unlocked_trails?.includes(trailId);
    if (isUnlocked) {
      if (setSelectedTrail) {
        await setSelectedTrail(trailId);
      }
      showAlert({
        title: 'Rastro Equipado',
        message: `O rastro "${chosenTrail.name}" foi ativado para suas partidas!`,
        variant: 'success'
      });
      return;
    }

    const cost = chosenTrail.priceGems;
    const currentGems = profile?.gems ?? 100;

    if (currentGems < cost) {
      showAlert({
        title: '💎 Gemas Insuficientes',
        message: `O rastro "${chosenTrail.name}" custa ${cost} 💎 Gemas (Seu saldo: ${currentGems} 💎). Jogue para acumular mais gemas!`,
        variant: 'warning'
      });
      return;
    }

    if (buyTrail) {
      const ok = await buyTrail(trailId, cost);
      if (ok) {
        showAlert({
          title: '🎉 Rastro Desbloqueado!',
          message: `Você adquiriu o rastro "${chosenTrail.name}" por ${cost} gemas e ele já está equipado!`,
          variant: 'success'
        });
      }
    }
  };

  const handleClaimQuest = async (quest) => {
    if (claimDailyQuest) {
      const ok = await claimDailyQuest(quest.id, quest.rewardGems);
      if (ok) {
        showAlert({
          title: '🎁 Recompensa Resgatada!',
          message: `Você recebeu +${quest.rewardGems} 💎 Gemas pela missão "${quest.title}"!`,
          variant: 'success'
        });
      }
    }
  };

  const handleClaimAchievement = async (ach) => {
    if (unlockAchievement) {
      const ok = await unlockAchievement(ach.id, ach.rewardGems);
      if (ok) {
        showAlert({
          title: '🏆 Conquista Desbloqueada!',
          message: `Parabéns! Você resgatou +${ach.rewardGems} 💎 Gemas pelo troféu "${ach.title}"!`,
          variant: 'success'
        });
      }
    }
  };

  const checkAchievementProgress = (ach) => {
    const isUnlocked = Boolean(
      profile?.achievements?.includes(ach.id) || 
      localStore.getProfile()?.achievements?.includes(ach.id)
    );
    let current = 0;
    let target = 1;

    if (ach.id === 'first_jump') {
      current = Math.min(1, profile?.total_jumps || 0);
      target = 1;
    } else if (ach.id === 'stage_10') {
      current = Math.min(10, stagesCompleted);
      target = 10;
    } else if (ach.id === 'stage_25') {
      current = Math.min(25, stagesCompleted);
      target = 25;
    } else if (ach.id === 'stage_50') {
      current = Math.min(50, stagesCompleted);
      target = 50;
    } else if (ach.id === 'gem_hunter') {
      current = Math.min(500, profile?.gems || 0);
      target = 500;
    } else if (ach.id === 'skin_collector') {
      const unlockedCount = BALL_SKINS.filter(s => s.priceGems === 0 || profile?.unlocked_skins?.includes(s.id)).length;
      current = Math.min(6, unlockedCount);
      target = 6;
    } else if (ach.id === 'portal_master') {
      const portalCount = (profile?.daily_quests_progress?.progress?.portals || 0) + (profile?.total_jumps ? Math.floor(profile.total_jumps / 7) : 0);
      current = Math.min(30, portalCount);
      target = 30;
    } else if (ach.id === 'endless_1000') {
      current = Math.min(1000, profile?.endless_high_score || 0);
      target = 1000;
    }

    const canClaim = !isUnlocked && current >= target;
    return { isUnlocked, current, target, canClaim };
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
            <div className="flex items-center justify-center transition-transform group-hover:scale-105">
              <SkinPreviewCanvas skinId={activeSkin.id} size={88} shadow={true} />
            </div>
            <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 shadow-md">
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

              {/* Saldo de Gemas em Destaque */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/15 via-yellow-500/20 to-amber-500/15 px-3.5 py-1 rounded-xl border border-amber-500/40 text-amber-300 shadow-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-xs font-bold">Saldo:</span>
                <span className="text-sm sm:text-base font-black text-amber-400">{profile?.gems ?? 100} 💎</span>
              </div>
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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="glass-card rounded-2xl p-3.5 sm:p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Recorde</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-400">
            {(profile?.high_score || 0).toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500">Pontuação máxima</p>
        </div>

        <div className="glass-card rounded-2xl p-3.5 sm:p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Fases</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-400">
            {profile?.stages_completed || 0} <span className="text-[10px] text-slate-500 font-bold">/ {STAGES.length}</span>
          </div>
          <p className="text-[10px] text-slate-500">Fases liberadas</p>
        </div>

        <div className="glass-card rounded-2xl p-3.5 sm:p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Modo Infinito</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-orange-400">
            {profile?.endless_high_score || 0}m
          </div>
          <p className="text-[10px] text-slate-500">Recorde no magma</p>
        </div>

        <div className="glass-card rounded-2xl p-3.5 sm:p-4 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Gemas</span>
            <Coins className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-yellow-400">
            {profile?.gems ?? 100}
          </div>
          <p className="text-[10px] text-slate-500">Saldo acumulado</p>
        </div>

        <div className="glass-card rounded-2xl p-3.5 sm:p-4 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Partidas</span>
            <HistoryIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-400">
            {matches.length}
          </div>
          <p className="text-[10px] text-slate-500">Sessões registradas</p>
        </div>
      </div>

      {/* 3. SELETOR DE ABAS INTERNAS (SKINS / RASTROS / MISSÕES / HISTÓRICO) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner">
        <button
          type="button"
          onClick={() => setActiveTab('skins')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all truncate ${
            activeTab === 'skins'
              ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4 shrink-0" />
          <span>Esferas ({BALL_SKINS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('trails')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all truncate ${
            activeTab === 'trails'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black shadow-md shadow-purple-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Rastros FX ({BALL_TRAILS.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quests')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all truncate ${
            activeTab === 'quests'
              ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 shrink-0" />
          <span>Missões & Troféus</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all truncate ${
            activeTab === 'history'
              ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black shadow-md shadow-rose-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <HistoryIcon className="w-4 h-4 shrink-0" />
          <span>Histórico ({matches.length})</span>
        </button>
      </div>

      {/* 4. ABA 1: GARAGEM DE SKINS */}
      {activeTab === 'skins' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-cyan-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Garagem e Loja de Esferas ({BALL_SKINS.length})</h2>
                <p className="text-xs text-slate-400">Adquira novas esferas e heróis lendários utilizando suas Gemas 💎!</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-black text-xs shadow-sm">
                {BALL_SKINS.filter(s => s.priceGems === 0 || profile?.unlocked_skins?.includes(s.id)).length} / {BALL_SKINS.length} Liberadas
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
              const isUnlocked = skin.priceGems === 0 || profile?.unlocked_skins?.includes(skin.id);

              return (
                <button
                  key={skin.id}
                  onClick={() => handleSelectSkin(skin.id)}
                  className={`flex flex-col items-center gap-2.5 p-3.5 rounded-2xl border transition-all text-center relative overflow-hidden group ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/25 scale-105 ring-2 ring-cyan-400/40'
                      : !isUnlocked
                        ? 'bg-slate-950/50 border-slate-800/80 opacity-80 hover:opacity-100 hover:border-amber-500/40'
                        : 'glass-card border-slate-800 hover:border-slate-700 hover:scale-[1.02]'
                  }`}
                >
                  {/* Badge de Bloqueio com Preço em Gemas */}
                  {!isUnlocked && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-bold flex items-center gap-0.5 shadow-sm">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{skin.priceGems} 💎</span>
                    </div>
                  )}

                  {/* Visual Vetorial da Bola com Emblema Real e Glow */}
                  <div className="relative mt-1 flex items-center justify-center">
                    <div className={`transition-transform ${!isUnlocked ? 'filter grayscale-[20%] opacity-85' : 'group-hover:scale-105'}`}>
                      <SkinPreviewCanvas skinId={skin.id} size={54} shadow={isUnlocked} />
                    </div>
                    {!isUnlocked && (
                      <div className="w-7 h-7 rounded-full bg-slate-950/85 backdrop-blur-xs border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-lg absolute">
                        <Lock className="w-3.5 h-3.5" />
                      </div>
                    )}
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
                      {isSelected ? 'Equipado' : !isUnlocked ? `${skin.priceGems} 💎` : 'Selecionar'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4.5. ABA 2: LOJA DE RASTROS FX */}
      {activeTab === 'trails' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Loja de Rastros e Efeitos (Trail FX)</h2>
                <p className="text-xs text-slate-400">Personalize o rastro de partículas da sua esfera durante os saltos e subidas!</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 font-black text-xs shadow-sm">
                Rastro Ativo: {BALL_TRAILS.find(t => t.id === (profile?.selected_trail || 'default'))?.name || 'Padrão'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BALL_TRAILS.map((trail) => {
              const isSelected = (profile?.selected_trail || 'default') === trail.id;
              const isUnlocked = trail.priceGems === 0 || profile?.unlocked_trails?.includes(trail.id);

              return (
                <div
                  key={trail.id}
                  className={`p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'bg-purple-500/10 border-purple-400 ring-2 ring-purple-400/40 shadow-lg shadow-purple-500/20'
                      : 'glass-card border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{TRAIL_ICONS[trail.icon] || '✨'}</span>
                        <h3 className="font-bold text-white text-sm">{trail.name}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{trail.description}</p>
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[10px] font-black border border-purple-500/30">
                        EM USO
                      </span>
                    )}
                  </div>

                  {/* Demonstração da Cor do Rastro */}
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="text-[10px] text-slate-500 font-medium">Cor do Efeito:</span>
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-4 h-4 rounded-full shadow-md border border-white/30"
                        style={{ backgroundColor: trail.color || '#38bdf8' }}
                      />
                      <span className="text-[10px] font-bold text-slate-400 font-mono">{trail.color || '#38bdf8'}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">
                      {isUnlocked ? 'Desbloqueado' : `${trail.priceGems} 💎`}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleSelectTrail(trail.id)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800 text-slate-400 cursor-default'
                          : isUnlocked
                            ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-md shadow-cyan-500/20 active:scale-95'
                            : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black shadow-md shadow-amber-500/20 active:scale-95'
                      }`}
                    >
                      {isSelected ? 'Equipado' : isUnlocked ? 'Equipar' : `Comprar (${trail.priceGems} 💎)`}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4.7. ABA 3: MISSÕES DIÁRIAS & CONQUISTAS */}
      {activeTab === 'quests' && (
        <div className="space-y-6 animate-fade-in">
          {/* Missões Diárias */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                <div>
                  <h2 className="text-lg font-bold text-white">Missões Diárias</h2>
                  <p className="text-xs text-slate-400">Complete as 3 tarefas de hoje para encher o bolso de gemas!</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold self-start sm:self-auto">
                Atualiza todo dia à meia-noite 🕛
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {getDailyQuests(new Date().toISOString().slice(0, 10)).map((quest) => {
                const progObj = profile?.daily_quests_progress?.progress || {};
                const currentProgress = progObj[quest.id] ?? progObj[quest.metric] ?? profile?.daily_quests_progress?.[quest.id] ?? 0;
                const isClaimed = Boolean(
                  profile?.daily_quests_progress?.claimed?.[quest.id] || 
                  profile?.daily_quests_progress?.[`${quest.id}_claimed`]
                );
                const isComplete = currentProgress >= quest.target;
                const progressPct = Math.min(100, Math.round((currentProgress / quest.target) * 100));

                return (
                  <div
                    key={quest.id}
                    className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col justify-between gap-3 relative overflow-hidden"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-2xl">{ACH_ICONS[quest.icon] || '🎯'}</span>
                        <span className="px-2 py-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-black">
                          +{quest.rewardGems} 💎
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm mt-2">{quest.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{quest.desc || quest.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                        <span>Progresso</span>
                        <span className="text-slate-200">{currentProgress} / {quest.target}</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      <button
                        type="button"
                        disabled={!isComplete || isClaimed}
                        onClick={() => handleClaimQuest(quest)}
                        className={`w-full py-2 rounded-xl text-xs font-black transition-all ${
                          isClaimed
                            ? 'bg-slate-800 text-slate-500 cursor-default'
                            : isComplete
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer'
                              : 'bg-slate-800/50 text-slate-500 border border-slate-700/40 cursor-not-allowed'
                        }`}
                      >
                        {isClaimed ? 'Resgatado ✅' : isComplete ? `Resgatar +${quest.rewardGems} 💎` : 'Em Progresso'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mural de Conquistas */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <div>
                <h2 className="text-lg font-bold text-white">Mural de Troféus & Conquistas</h2>
                <p className="text-xs text-slate-400">Marcos de honra permanentes para celebrar sua jornada cósmica!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ACHIEVEMENTS.map((ach) => {
                const { isUnlocked, current, target, canClaim } = checkAchievementProgress(ach);
                const isClaimed = isUnlocked || profile?.achievements?.includes(ach.id) || localStore.getProfile()?.achievements?.includes(ach.id);
                const pct = Math.min(100, Math.round((current / target) * 100));

                return (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isClaimed
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'glass-card border-slate-800'
                    }`}
                  >
                    <div className="text-3xl shrink-0 p-2 rounded-2xl bg-slate-900 border border-slate-800">
                      {ACH_ICONS[ach.icon] || '🏆'}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-white text-sm truncate">{ach.title}</h3>
                        <span className="px-2 py-0.5 rounded-md bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 text-[11px] font-black shrink-0">
                          +{ach.rewardGems} 💎
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{ach.desc || ach.description}</p>

                      <div className="pt-1 space-y-1">
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Progresso</span>
                          <span>{current.toLocaleString()} / {target.toLocaleString()}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {canClaim && (
                        <button
                          type="button"
                          onClick={() => handleClaimAchievement(ach)}
                          className="mt-2 w-full py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
                        >
                          Coletar +{ach.rewardGems} 💎
                        </button>
                      )}
                      {isClaimed && (
                        <span className="inline-block text-[11px] text-emerald-400 font-bold mt-1">
                          ✓ Conquistado
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
