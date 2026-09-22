import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './authInstance';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';

const LOCAL_SESSION_KEY = 'jumpball_active_session';

/**
 * Normaliza e resolve interesses do usuário de forma robusta e segura,
 * aceitando arrays, strings serializadas JSON ou listas separadas por vírgula.
 */
export const resolveInterestsList = (...candidates) => {
  for (const cand of candidates) {
    if (!cand) continue;
    if (Array.isArray(cand) && cand.length > 0) {
      return cand.filter(item => typeof item === 'string' && item.trim().length > 0);
    }
    if (typeof cand === 'string' && cand.trim().length > 0) {
      try {
        const parsed = JSON.parse(cand);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.filter(item => typeof item === 'string' && item.trim().length > 0);
        }
      } catch (e) {
        const parts = cand.split(',').map(s => s.trim()).filter(Boolean);
        if (parts.length > 0) return parts;
      }
    }
  }
  return [];
};


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  // Carregar sessão inicial de forma ultra-resiliente
  useEffect(() => {
    let isMounted = true;
    let authListener = null;

    async function initAuth() {
      try {
        if (isSupabaseConfigured && supabase) {
          // Timeout de segurança de 1.2s para nunca travar a tela em "Carregando"
          const sessionPromise = supabase.auth.getSession();
          const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve({ data: { session: null } }), 1200));
          const { data } = await Promise.race([sessionPromise, timeoutPromise]);
          const session = data?.session;

          if (!isMounted) return;

          if (session?.user) {
            setUser(session.user);
            setIsGuest(false);
            fetchProfile(session.user.id);
          } else {
            checkLocalSession();
          }

          const { data: subData } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (!isMounted) return;
            if (newSession?.user) {
              setUser(newSession.user);
              setIsGuest(false);
              fetchProfile(newSession.user.id);
            } else if (event === 'SIGNED_OUT') {
              // Só encerra a sessão se o usuário realmente clicou em Sair (onde LOCAL_SESSION_KEY é apagada)
              // Se LOCAL_SESSION_KEY ainda existe no localStorage, trata-se de falha de conexão de rede,
              // projeto Supabase pausado ou erro temporário de refresh do token. NUNCA desloga o jogador!
              const savedSession = localStorage.getItem(LOCAL_SESSION_KEY);
              if (!savedSession) {
                setUser(null);
                setProfile(null);
                setIsGuest(false);
              } else {
                console.warn('[JumpBall Auth] Supabase desconectado ou inacessível. Mantendo sessão local ativa.');
              }
            }
          });
          authListener = subData?.subscription;
        } else {
          checkLocalSession();
        }
      } catch (err) {
        console.warn('Aviso na inicialização do Supabase Auth:', err);
        checkLocalSession();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    initAuth();

    return () => {
      isMounted = false;
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // Sincronização em Tempo Real via Supabase Realtime entre múltiplos dispositivos/abas
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured || !user?.id || user.id.startsWith('offline-') || user.id.startsWith('guest-')) {
      return;
    }

    const channel = supabase
      .channel(`profile-realtime-sync-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`
        },
        (payload) => {
          if (payload.new) {
            setProfile((prev) => {
              const updated = {
                ...(prev || {}),
                ...payload.new,
                user_interests: resolveInterestsList(payload.new?.user_interests, prev?.user_interests),
                unlocked_skins: Array.from(new Set([...(prev?.unlocked_skins || []), ...(payload.new?.unlocked_skins || [])])),
                unlocked_trails: Array.from(new Set([...(prev?.unlocked_trails || []), ...(payload.new?.unlocked_trails || [])])),
                achievements: Array.from(new Set([...(prev?.achievements || []), ...(payload.new?.achievements || [])]))
              };
              localStore.saveProfile(updated);
              try {
                const saved = localStorage.getItem(LOCAL_SESSION_KEY);
                if (saved) {
                  const parsed = JSON.parse(saved);
                  parsed.profile = updated;
                  localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(parsed));
                }
              } catch (e) { /* ignore */ }
              return updated;
            });
          }
        }
      )
      .subscribe();

    // Revalidação automática quando o usuário volta para a aba do jogo
    const handleRevalidate = () => {
      if (document.visibilityState === 'visible' && user?.id) {
        fetchProfile(user.id);
      }
    };
    window.addEventListener('visibilitychange', handleRevalidate);
    window.addEventListener('focus', handleRevalidate);

    return () => {
      supabase.removeChannel(channel);
      window.removeEventListener('visibilitychange', handleRevalidate);
      window.removeEventListener('focus', handleRevalidate);
    };
  }, [user?.id]);

  const checkLocalSession = () => {
    try {
      const saved = localStorage.getItem(LOCAL_SESSION_KEY);
      if (saved) {
        const sessionData = JSON.parse(saved);
        if (sessionData?.user) {
          const localProf = localStore.getProfile();
          const sessProf = sessionData.profile || {};
          const metaProf = sessionData.user?.user_metadata || {};
          const mergedProfile = {
            ...localProf,
            ...sessProf,
            birth_date: sessProf.birth_date || metaProf.birth_date || localProf.birth_date || null,
            stages_completed: sessProf.stages_completed !== undefined ? sessProf.stages_completed : (localProf.stages_completed || 0),
            stages_completed_hero: sessProf.stages_completed_hero !== undefined
              ? sessProf.stages_completed_hero
              : (metaProf.stages_completed_hero !== undefined ? Number(metaProf.stages_completed_hero) : (localProf.stages_completed_hero !== undefined ? localProf.stages_completed_hero : (localProf.stages_completed || 0))),
            stages_completed_free: sessProf.stages_completed_free !== undefined
              ? sessProf.stages_completed_free
              : (metaProf.stages_completed_free !== undefined ? Number(metaProf.stages_completed_free) : (localProf.stages_completed_free || 0)),
            high_score: Math.max(localProf.high_score || 0, sessProf.high_score || 0, Number(metaProf.high_score || 0)),
            total_jumps: Math.max(localProf.total_jumps || 0, sessProf.total_jumps || 0, Number(metaProf.total_jumps || 0)),
            games_played: Math.max(localProf.games_played || 0, sessProf.games_played || 0),
            gems: Math.max(localProf.gems ?? 100, Number(sessProf.gems || 0), Number(metaProf.gems || 0)),
            unlocked_skins: Array.from(new Set([
              'neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball',
              ...(localProf.unlocked_skins || []),
              ...(sessProf.unlocked_skins || []),
              ...(metaProf.unlocked_skins || [])
            ])),
            unlocked_trails: Array.from(new Set([
              'default',
              ...(localProf.unlocked_trails || []),
              ...(sessProf.unlocked_trails || []),
              ...(metaProf.unlocked_trails || [])
            ])),
            achievements: Array.from(new Set([
              ...(localProf.achievements || []),
              ...(sessProf.achievements || []),
              ...(metaProf.achievements || [])
            ])),
            user_interests: resolveInterestsList(metaProf.user_interests, sessProf.user_interests, localProf.user_interests)
          };
          setUser(sessionData.user);
          setProfile(mergedProfile);
          localStore.saveProfile(mergedProfile);
          setIsGuest(Boolean(sessionData.isGuest));

          // Proativamente sincroniza com o Supabase em segundo plano
          if (supabase && isSupabaseConfigured && sessionData.user.id && !sessionData.user.id.startsWith('offline-') && !sessionData.user.id.startsWith('guest-')) {
            fetchProfile(sessionData.user.id);
          }
          return;
        }
      }
    } catch (e) {
      /* ignore */
    }
    // Não logado por padrão
    setUser(null);
    setProfile(null);
    setIsGuest(false);
  };

  const fetchProfile = async (userId) => {
    if (!supabase || !userId || userId.startsWith('offline-') || userId.startsWith('guest-')) {
      setProfile(localStore.getProfile());
      return;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      // Recupera metadados salvos na nuvem via Supabase Auth (onde ficam armazenados gemas, skins, rastros e conquistas multiplataforma)
      let cloudMeta = {};
      try {
        const { data: authUserData } = await supabase.auth.getUser();
        if (authUserData?.user?.user_metadata) {
          cloudMeta = authUserData.user.user_metadata;
        }
      } catch (authErr) {
        /* ignore */
      }

      const local = localStore.getProfile();
      let maxStageFromHistory = 0;
      try {
        const { data: histData } = await supabase
          .from('game_history')
          .select('stage_id')
          .eq('user_id', userId)
          .eq('status', 'completed');
        if (histData && histData.length > 0) {
          maxStageFromHistory = Math.max(0, ...histData.map(h => Number(h.stage_id) || 0).filter(s => s <= 50));
        }
      } catch (hErr) {
        /* ignore */
      }

      // Preserva sempre o maior progresso alcançado (separado estritamente por Modo Herói e Modo Livre)
      const localHist = localStore.getHistory();
      let maxStageHeroFromLocalHist = 0;
      let maxStageFreeFromLocalHist = 0;
      if (Array.isArray(localHist) && localHist.length > 0) {
        maxStageHeroFromLocalHist = Math.max(
          0,
          ...localHist
            .filter(h => (h.status === 'completed' || h.status === 'victory' || h.isWin) && (h.journey_mode === 'hero' || h.soloJourney === 'hero') && Number(h.stage_id || h.stageId || 0) <= 50)
            .map(h => Number(h.stage_id || h.stageId || 0))
        );
        maxStageFreeFromLocalHist = Math.max(
          0,
          ...localHist
            .filter(h => (h.status === 'completed' || h.status === 'victory' || h.isWin) && (h.journey_mode === 'free' || h.soloJourney === 'free') && Number(h.stage_id || h.stageId || 0) <= 50)
            .map(h => Number(h.stage_id || h.stageId || 0))
        );
      }

      // Função de sanitização: limita a 50 e descarta 999 (ID de modo infinito)
      const cleanStage = (val) => {
        const n = Number(val);
        if (isNaN(n) || n < 0 || n >= 999) return 0;
        return Math.min(50, n);
      };

      let rawHero = Math.max(
        cleanStage(cloudMeta.stages_completed_hero),
        cleanStage(local.stages_completed_hero),
        cleanStage(data?.stages_completed_hero),
        maxStageHeroFromLocalHist
      );

      let rawFree = Math.max(
        cleanStage(cloudMeta.stages_completed_free),
        cleanStage(local.stages_completed_free),
        cleanStage(data?.stages_completed_free),
        maxStageFreeFromLocalHist
      );

      // Fallback: quando os campos separados (hero/free) ainda não existem no banco de dados
      // (perfis antigos só têm stages_completed genérico), usa o valor sanitizado como referência
      // somente se os valores específicos estiverem zerados e o genérico for um valor válido (<=50)
      const legacyGeneric = cleanStage(data?.stages_completed);
      if (rawHero === 0 && legacyGeneric > 0) {
        rawHero = legacyGeneric;
      }
      if (rawFree === 0 && legacyGeneric > 0) {
        rawFree = legacyGeneric;
      }

      const resolvedStageHero = rawHero;
      const resolvedStageFree = rawFree;
      const resolvedStage = Math.max(resolvedStageHero, resolvedStageFree);

      const bestHighScore = Math.max(
        data?.high_score || 0, 
        local.high_score || 0,
        Number(cloudMeta.high_score || 0)
      );
      const bestTotalJumps = Math.max(
        data?.total_jumps || 0, 
        local.total_jumps || 0,
        Number(cloudMeta.total_jumps || 0)
      );
      const bestGamesPlayed = Math.max(data?.games_played || 0, local.games_played || 0);

      // Gemas: prioriza o maior saldo conhecido entre nuvem e local
      const resolvedGems = Math.max(
        local.gems ?? 100,
        cloudMeta.gems !== undefined && cloudMeta.gems !== null ? Number(cloudMeta.gems) : 0,
        data?.gems !== undefined && data?.gems !== null ? Number(data.gems) : 0
      );

      // Skins desbloqueadas: união de tudo que o jogador desbloqueou no PC, celular ou nuvem
      const resolvedUnlockedSkins = Array.from(new Set([
        'neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball',
        ...(local.unlocked_skins || []),
        ...(Array.isArray(cloudMeta.unlocked_skins) ? cloudMeta.unlocked_skins : []),
        ...(data?.unlocked_skins || [])
      ]));

      // Rastros desbloqueados: união completa
      const resolvedUnlockedTrails = Array.from(new Set([
        'default',
        ...(local.unlocked_trails || []),
        ...(Array.isArray(cloudMeta.unlocked_trails) ? cloudMeta.unlocked_trails : []),
        ...(data?.unlocked_trails || [])
      ]));

      // Conquistas permanentes: união completa
      const resolvedAchievements = Array.from(new Set([
        ...(local.achievements || []),
        ...(Array.isArray(cloudMeta.achievements) ? cloudMeta.achievements : []),
        ...(data?.achievements || [])
      ]));

      // Progresso diário: mescla progresso mais recente
      const resolvedDailyQuests = cloudMeta.daily_quests_progress || local.daily_quests_progress || data?.daily_quests_progress || { date: '', progress: {}, claimed: {} };

      const resolvedBirthDate = cloudMeta.birth_date || data?.birth_date || local.birth_date || null;
      const resolvedBallSkin = data?.ball_skin || cloudMeta.ball_skin || local.ball_skin || 'neon-cyan';
      const resolvedTrail = cloudMeta.selected_trail || local.selected_trail || data?.selected_trail || 'default';
      const resolvedEndlessScore = Math.max(
        local.endless_high_score || 0, 
        Number(cloudMeta.endless_high_score || 0), 
        data?.endless_high_score || 0
      );
      const resolvedInterests = resolveInterestsList(
        cloudMeta.user_interests,
        data?.user_interests,
        local.user_interests
      );

      const merged = {
        ...local,
        ...(data || {}),
        id: userId,
        birth_date: resolvedBirthDate,
        stages_completed: resolvedStage,
        stages_completed_hero: resolvedStageHero,
        stages_completed_free: resolvedStageFree,
        high_score: bestHighScore,
        total_jumps: bestTotalJumps,
        games_played: bestGamesPlayed,
        gems: resolvedGems,
        ball_skin: resolvedBallSkin,
        selected_trail: resolvedTrail,
        unlocked_skins: resolvedUnlockedSkins,
        unlocked_trails: resolvedUnlockedTrails,
        achievements: resolvedAchievements,
        daily_quests_progress: resolvedDailyQuests,
        endless_high_score: resolvedEndlessScore,
        user_interests: resolvedInterests
      };

      setProfile(merged);
      localStore.saveProfile(merged);

      // Atualiza também LOCAL_SESSION_KEY para manter a sessão sincronizada
      try {
        const saved = localStorage.getItem(LOCAL_SESSION_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.profile = merged;
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(parsed));
        }
      } catch (e) { /* ignore */ }

      // Se a máquina atual possuía dados mais avançados que a nuvem, envia de volta para a nuvem
      // para que celulares ou outros computadores sincronizem instantaneamente
      if (
        cloudMeta.gems === undefined ||
        resolvedStage > (Number(cloudMeta.stages_completed) || 0) ||
        resolvedStage > (Number(data?.stages_completed) || 0) ||
        bestHighScore > (Number(cloudMeta.high_score) || 0) ||
        resolvedUnlockedSkins.length > (cloudMeta.unlocked_skins?.length || 0) ||
        resolvedAchievements.length > (cloudMeta.achievements?.length || 0) ||
        resolvedGems > (Number(cloudMeta.gems) || 0) ||
        (resolvedBirthDate && !cloudMeta.birth_date) ||
        (resolvedInterests.length > 0 && (!cloudMeta.user_interests || resolveInterestsList(cloudMeta.user_interests).length === 0))
      ) {
        try {
          supabase.auth.updateUser({
            data: {
              birth_date: resolvedBirthDate,
              gems: resolvedGems,
              unlocked_skins: resolvedUnlockedSkins,
              unlocked_trails: resolvedUnlockedTrails,
              selected_trail: resolvedTrail,
              ball_skin: resolvedBallSkin,
              achievements: resolvedAchievements,
              daily_quests_progress: resolvedDailyQuests,
              endless_high_score: resolvedEndlessScore,
              stages_completed: resolvedStage,
              stages_completed_hero: resolvedStageHero,
              stages_completed_free: resolvedStageFree,
              high_score: bestHighScore,
              total_jumps: bestTotalJumps,
              user_interests: resolvedInterests
            }
          });
        } catch (syncErr) { /* ignore */ }
      }

      // Sincroniza com a tabela 'profiles' no Supabase usando apenas as colunas válidas do schema
      try {
        const profileUpdate = {
          stages_completed: resolvedStage,
          high_score: bestHighScore,
          total_jumps: bestTotalJumps,
          updated_at: new Date().toISOString()
        };

        const { error: upErr } = await supabase
          .from('profiles')
          .update(profileUpdate)
          .eq('id', userId);

        // Se a linha ainda não existir no banco, realiza upsert com os campos essenciais
        if (upErr || upErr === null) {
          await supabase.from('profiles').upsert({
            id: userId,
            ...profileUpdate
          }, { onConflict: 'id', ignoreDuplicates: false });
        }
      } catch (uErr) { /* ignore */ }
    } catch (err) {
      console.warn('Aviso ao carregar perfil do Supabase:', err);
      setProfile(localStore.getProfile());
    }
  };

  // Login com E-mail e Senha
  const login = async (email, password) => {
    if (!isSupabaseConfigured || !supabase) {
      // Mock login bem-sucedido no modo offline/local
      const mockUser = { id: 'user-' + Date.now(), email };
      const prof = { 
        ...localStore.getProfile(), 
        username: email.split('@')[0], 
        email 
      };
      setUser(mockUser);
      setProfile(prof);
      setIsGuest(false);
      localStore.saveProfile(prof);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: mockUser, profile: prof, isGuest: false }));
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
        setIsGuest(false);
        await fetchProfile(data.user.id);
        const currentProf = localStore.getProfile();
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: data.user, profile: currentProf, isGuest: false }));
      }
      return data;
    } catch (err) {
      // Se for erro de rede/servidor offline/DNS não resolvido, ativa modo local de emergência
      const isNetworkErr = err.message?.includes('Failed to fetch') || 
                           err.name === 'AuthRetryableFetchError' || 
                           err.message?.includes('ERR_NAME_NOT_RESOLVED');
      if (isNetworkErr) {
        console.warn('Supabase offline ou inacessível. Iniciando sessão em modo local resiliente.');
        try {
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
              localStorage.removeItem(key);
            }
          }
        } catch (e) { /* ignore */ }
        const fallbackUser = { id: 'offline-' + Date.now(), email };
        const prof = { 
          ...localStore.getProfile(), 
          username: email.split('@')[0], 
          email 
        };
        setUser(fallbackUser);
        setProfile(prof);
        setIsGuest(false);
        localStore.saveProfile(prof);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: fallbackUser, profile: prof, isGuest: false }));
        return { success: true, offline: true };
      }
      throw err;
    }
  };

  // Cadastro de Novo Usuário
  const signup = async (email, password, username, fullName) => {
    const localBase = localStore.getProfile();
    const createFallbackProfile = (userId) => ({
      ...localBase,
      id: userId,
      username: username || email.split('@')[0],
      full_name: fullName || 'Novo Jogador',
      avatar_url: null,
      ball_skin: localBase.ball_skin || 'neon-cyan',
      high_score: localBase.high_score || 0,
      total_jumps: localBase.total_jumps || 0,
      stages_completed: localBase.stages_completed || 0,
      gems: localBase.gems ?? 100,
      unlocked_skins: localBase.unlocked_skins || ['neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball'],
      unlocked_trails: localBase.unlocked_trails || ['default'],
      selected_trail: localBase.selected_trail || 'default',
      achievements: localBase.achievements || [],
      daily_quests_progress: localBase.daily_quests_progress || { date: '', progress: {}, claimed: {} },
      created_at: new Date().toISOString()
    });

    if (!isSupabaseConfigured || !supabase) {
      const mockUser = { id: 'user-' + Date.now(), email };
      const prof = createFallbackProfile(mockUser.id);
      setUser(mockUser);
      setProfile(prof);
      setIsGuest(false);
      localStore.saveProfile(prof);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: mockUser, profile: prof, isGuest: false }));
      return { success: true };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName
          }
        }
      });

      if (error) throw error;
      if (data?.user) {
        setUser(data.user);
        setIsGuest(false);
        await fetchProfile(data.user.id);
        const currentProf = localStore.getProfile();
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: data.user, profile: currentProf, isGuest: false }));
      }
      return data;
    } catch (err) {
      const isNetworkErr = err.message?.includes('Failed to fetch') || 
                           err.name === 'AuthRetryableFetchError' || 
                           err.message?.includes('ERR_NAME_NOT_RESOLVED');
      if (isNetworkErr) {
        console.warn('Supabase offline ou inacessível. Criando conta em modo local resiliente.');
        const fallbackUser = { id: 'offline-' + Date.now(), email };
        const prof = createFallbackProfile(fallbackUser.id);
        setUser(fallbackUser);
        setProfile(prof);
        setIsGuest(false);
        localStore.saveProfile(prof);
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: fallbackUser, profile: prof, isGuest: false }));
        return { success: true, offline: true };
      }
      throw err;
    }
  };

  // Login como Visitante / Convidado
  const loginAsGuest = () => {
    const guestProfile = localStore.getProfile();
    const guestUser = { id: guestProfile.id || 'guest-001', email: 'convidado@jumpball.app' };
    setUser(guestUser);
    setProfile(guestProfile);
    setIsGuest(true);
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: guestUser, profile: guestProfile, isGuest: true }));
  };

  // Logout (Encerramento voluntário da sessão)
  const logout = async () => {
    // 1. Remove sessão local primeiro
    localStorage.removeItem(LOCAL_SESSION_KEY);

    // 2. Limpa tokens do Supabase no localStorage para evitar tentativas de renovação em segundo plano
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (e) { /* ignore */ }

    // 3. Notifica o Supabase
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) { /* ignore */ }
    }
    setUser(null);
    setProfile(null);
    setIsGuest(false);
  };

  // Atualizar Perfil (Nome, Skin da Bola, Fases Concluídas, etc.)
  const updateProfile = async (updates) => {
    const local = localStore.getProfile();
    const base = {
      ...(profile || {}),
      ...local
    };

    const mergedUnlockedSkins = Array.from(new Set([
      ...(base.unlocked_skins || ['neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball']),
      ...(updates.unlocked_skins || [])
    ]));

    const mergedUnlockedTrails = Array.from(new Set([
      ...(base.unlocked_trails || ['default']),
      ...(updates.unlocked_trails || [])
    ]));

    const mergedAchievements = Array.from(new Set([
      ...(base.achievements || []),
      ...(updates.achievements || [])
    ]));

    const mergedInterests = updates.user_interests !== undefined
      ? resolveInterestsList(updates.user_interests)
      : resolveInterestsList(base.user_interests);

    const updated = { 
      ...base, 
      ...updates,
      birth_date: updates.birth_date !== undefined ? updates.birth_date : (base.birth_date || null),
      gems: updates.gems !== undefined ? updates.gems : (base.gems ?? 100),
      unlocked_skins: mergedUnlockedSkins,
      unlocked_trails: mergedUnlockedTrails,
      achievements: mergedAchievements,
      selected_trail: updates.selected_trail || updates.selectedTrail || base.selected_trail || 'default',
      ball_skin: updates.ball_skin || updates.ballSkin || base.ball_skin || 'neon-cyan',
      daily_quests_progress: updates.daily_quests_progress || base.daily_quests_progress || { date: '', progress: {}, claimed: {} },
      stages_completed: updates.stages_completed !== undefined ? updates.stages_completed : (base.stages_completed || 0),
      stages_completed_hero: updates.stages_completed_hero !== undefined ? updates.stages_completed_hero : (base.stages_completed_hero !== undefined ? base.stages_completed_hero : (base.stages_completed || 0)),
      stages_completed_free: updates.stages_completed_free !== undefined ? updates.stages_completed_free : (base.stages_completed_free || 0),
      high_score: Math.max(base.high_score || 0, updates.high_score !== undefined ? updates.high_score : 0),
      total_jumps: (updates.total_jumps !== undefined) ? updates.total_jumps : (base.total_jumps || 0),
      games_played: (updates.games_played !== undefined) ? updates.games_played : (base.games_played || 0),
      user_interests: mergedInterests
    };

    setProfile(updated);
    localStore.saveProfile(updated);

    // Atualiza cache local da sessão
    const saved = localStorage.getItem(LOCAL_SESSION_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.profile = updated;
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(parsed));
      } catch (e) { /* ignore */ }
    }

    if (supabase && isSupabaseConfigured && user && !isGuest && !user.id?.startsWith('offline-') && !user.id?.startsWith('guest-')) {
      try {
        // Envia apenas colunas existentes na tabela 'profiles' do banco
        const ALLOWED_DB_COLUMNS = ['username', 'full_name', 'avatar_url', 'ball_skin', 'high_score', 'total_jumps', 'stages_completed'];
        const dbUpdates = {};
        for (const col of ALLOWED_DB_COLUMNS) {
          if (updates[col] !== undefined || updated[col] !== undefined) {
            dbUpdates[col] = updates[col] !== undefined ? updates[col] : updated[col];
          }
        }
        dbUpdates.updated_at = new Date().toISOString();

        if (Object.keys(dbUpdates).length > 1) {
          const { error: upErr } = await supabase
            .from('profiles')
            .upsert({ id: user.id, ...dbUpdates }, { onConflict: 'id' });
          if (upErr) {
            console.error('Erro ao sincronizar perfil com o Supabase:', upErr);
          }
        }

        // Sincroniza metadados completos na nuvem (gemas, skins, rastros, conquistas, missões, aniversário)
        // Isso garante sincronização 100% perfeita e instantânea entre Celular e Computador!
        try {
          await supabase.auth.updateUser({
            data: {
              birth_date: updated.birth_date,
              gems: updated.gems,
              unlocked_skins: updated.unlocked_skins,
              unlocked_trails: updated.unlocked_trails,
              selected_trail: updated.selected_trail,
              ball_skin: updated.ball_skin,
              achievements: updated.achievements,
              daily_quests_progress: updated.daily_quests_progress,
              endless_high_score: updated.endless_high_score,
              stages_completed: updated.stages_completed,
              stages_completed_hero: updated.stages_completed_hero,
              stages_completed_free: updated.stages_completed_free,
              high_score: updated.high_score,
              total_jumps: updated.total_jumps,
              user_interests: updated.user_interests
            }
          });
        } catch (metaErr) {
          console.warn('Aviso ao sincronizar metadados na nuvem:', metaErr);
        }
      } catch (err) {
        console.error('Erro ao sincronizar perfil com o Supabase:', err);
      }
    }
    return updated;
  };

  // Resetar progresso das fases (zera stages_completed para 0, mantendo todo o histórico de partidas intacto)
  const resetStageProgress = async (mode = 'all') => {
    const local = localStore.getProfile();
    const current = profile ? { ...local, ...profile } : local;
    const updated = {
      ...current,
      ...(mode === 'all' || mode === 'hero' ? { stages_completed: 0, stages_completed_hero: 0 } : {}),
      ...(mode === 'all' || mode === 'free' ? { stages_completed_free: 0 } : {})
    };
    setProfile(updated);
    localStore.saveProfile(updated);

    // Atualiza cache local da sessão
    const saved = localStorage.getItem(LOCAL_SESSION_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.profile = updated;
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(parsed));
      } catch (e) { /* ignore */ }
    }

    if (supabase && isSupabaseConfigured && user && !isGuest && !user.id?.startsWith('offline-') && !user.id?.startsWith('guest-')) {
      try {
        const { error: upErr } = await supabase
          .from('profiles')
          .upsert({ 
            id: user.id, 
            stages_completed: updated.stages_completed, 
            updated_at: new Date().toISOString() 
          }, { onConflict: 'id' });
        if (upErr) {
          console.error('Erro ao sincronizar reset de fases com o Supabase:', upErr);
        }

        try {
          await supabase.auth.updateUser({
            data: {
              stages_completed: updated.stages_completed,
              stages_completed_hero: updated.stages_completed_hero,
              stages_completed_free: updated.stages_completed_free
            }
          });
        } catch (mErr) { /* ignore */ }
      } catch (err) {
        console.error('Erro ao sincronizar reset de fases com o Supabase:', err);
      }
    }
  };

  // Restaura progresso das fases para um estágio desejado (ex: 42 fases conquistadas anteriormente)
  const restoreStageProgress = async (targetStage = 42, mode = 'all') => {
    const stageNum = Math.min(50, Math.max(1, Number(targetStage) || 42));
    const local = localStore.getProfile();
    const current = profile ? { ...local, ...profile } : local;
    const heroNum = (mode === 'all' || mode === 'hero') ? stageNum : (current.stages_completed_hero || 0);
    const freeNum = (mode === 'all' || mode === 'free') ? stageNum : (current.stages_completed_free || 0);
    const updated = {
      ...current,
      stages_completed_hero: heroNum,
      stages_completed_free: freeNum,
      stages_completed: Math.max(heroNum, freeNum)
    };
    setProfile(updated);
    localStore.saveProfile(updated);

    const saved = localStorage.getItem(LOCAL_SESSION_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.profile = updated;
        localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(parsed));
      } catch (e) { /* ignore */ }
    }

    if (supabase && isSupabaseConfigured && user && !isGuest && !user.id?.startsWith('offline-') && !user.id?.startsWith('guest-')) {
      try {
        await supabase
          .from('profiles')
          .upsert({ 
            id: user.id, 
            stages_completed: updated.stages_completed, 
            updated_at: new Date().toISOString() 
          }, { onConflict: 'id' });

        try {
          await supabase.auth.updateUser({
            data: {
              stages_completed: updated.stages_completed,
              stages_completed_hero: updated.stages_completed_hero,
              stages_completed_free: updated.stages_completed_free
            }
          });
        } catch (authErr) { /* ignore */ }
      } catch (err) {
        console.warn('Erro ao sincronizar restauração de fases:', err);
      }
    }
    return updated;
  };

  // Adiciona gemas ao saldo do jogador
  const addGems = async (amount) => {
    if (!amount || amount <= 0) return;
    const local = localStore.getProfile();
    const current = { ...(profile || {}), ...local };
    const currentGems = current.gems ?? 100;
    const newGems = currentGems + amount;
    await updateProfile({ gems: newGems });
    return newGems;
  };

  // Compra uma skin com gemas
  const buySkin = async (skinId, price) => {
    const local = localStore.getProfile();
    const current = { ...(profile || {}), ...local };
    const currentGems = current.gems ?? 100;
    if (currentGems < price) {
      return { success: false, reason: 'Saldo insuficiente de gemas' };
    }
    const currentUnlocked = Array.from(new Set([
      ...(local.unlocked_skins || ['neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball']),
      ...(profile?.unlocked_skins || [])
    ]));
    if (currentUnlocked.includes(skinId)) {
      return { success: true, alreadyOwned: true };
    }
    const newGems = currentGems - price;
    const newUnlocked = [...currentUnlocked, skinId];
    const updated = await updateProfile({
      gems: newGems,
      unlocked_skins: newUnlocked,
      ball_skin: skinId
    });
    return { success: true, newGems, newUnlocked, profile: updated };
  };

  // Compra um rastro de partículas
  const buyTrail = async (trailId, price) => {
    const local = localStore.getProfile();
    const current = { ...(profile || {}), ...local };
    const currentGems = current.gems ?? 100;
    if (currentGems < price) {
      return { success: false, reason: 'Saldo insuficiente de gemas' };
    }
    const currentTrails = Array.from(new Set([
      ...(local.unlocked_trails || ['default']),
      ...(profile?.unlocked_trails || [])
    ]));
    if (currentTrails.includes(trailId)) {
      return { success: true, alreadyOwned: true };
    }
    const newGems = currentGems - price;
    const newTrails = [...currentTrails, trailId];
    const updated = await updateProfile({
      gems: newGems,
      unlocked_trails: newTrails,
      selected_trail: trailId
    });
    return { success: true, newGems, newTrails, profile: updated };
  };

  // Equipa um rastro selecionado
  const setSelectedTrail = async (trailId) => {
    await updateProfile({ selected_trail: trailId });
  };

  // Registra progresso nas missões diárias a partir das partidas
  const recordQuestProgress = async ({ jumps = 0, gems = 0, portals = 0 }) => {
    const today = new Date().toISOString().slice(0, 10);
    const local = localStore.getProfile();
    const current = { ...(profile || {}), ...local };
    let questData = current.daily_quests_progress;
    if (!questData || questData.date !== today) {
      questData = { date: today, progress: {}, claimed: {} };
    }
    const currentProg = questData.progress || {};
    const jumpsKey = `quest_jumps_${today}`;
    const gemsKey = `quest_gems_${today}`;
    const portalsKey = `quest_portals_${today}`;

    const newProg = {
      ...currentProg,
      [jumpsKey]: (currentProg[jumpsKey] || 0) + jumps,
      [gemsKey]: (currentProg[gemsKey] || 0) + gems,
      [portalsKey]: (currentProg[portalsKey] || 0) + portals,
      jumps: (currentProg.jumps || 0) + jumps,
      gems: (currentProg.gems || 0) + gems,
      portals: (currentProg.portals || 0) + portals
    };

    const newQuestData = {
      ...questData,
      date: today,
      progress: newProg,
      claimed: questData.claimed || {}
    };

    await updateProfile({ daily_quests_progress: newQuestData });
    return newQuestData;
  };

  // Resgata recompensa de missão diária
  const claimDailyQuest = async (questId, rewardGems) => {
    const today = new Date().toISOString().slice(0, 10);
    const local = localStore.getProfile();
    const current = { ...(profile || {}), ...local };
    const questData = current.daily_quests_progress || { date: today, progress: {}, claimed: {} };
    if (questData.claimed?.[questId] || questData[`${questId}_claimed`]) {
      return { success: false, reason: 'Missão já resgatada hoje' };
    }
    const newClaimed = { 
      ...(questData.claimed || {}), 
      [questId]: true 
    };
    const currentGems = current.gems ?? 100;
    const newGems = currentGems + (rewardGems || 100);
    const newQuestData = {
      ...questData,
      date: today,
      claimed: newClaimed,
      [`${questId}_claimed`]: true
    };
    await updateProfile({
      gems: newGems,
      daily_quests_progress: newQuestData
    });
    return { success: true, newGems };
  };

  // Desbloqueia uma conquista / medalha permanente
  const unlockAchievement = async (achievementId, rewardGems = 0) => {
    const local = localStore.getProfile();
    const current = { ...(profile || {}), ...local };
    const currentAch = Array.from(new Set([...(local.achievements || []), ...(profile?.achievements || [])]));
    if (currentAch.includes(achievementId)) return false;
    const newAch = [...currentAch, achievementId];
    const currentGems = current.gems ?? 100;
    const newGems = currentGems + (rewardGems || 0);
    await updateProfile({
      achievements: newAch,
      gems: newGems
    });
    return true;
  };

  // Atualiza recorde pessoal no Modo Infinito
  const updateEndlessHighScore = async (height) => {
    const currentRecord = profile?.endless_high_score || 0;
    if (height > currentRecord) {
      await updateProfile({ endless_high_score: height });
      return true;
    }
    return false;
  };

  // Solicitar recuperação / redefinição de senha
  const resetPassword = async (email) => {
    if (!isSupabaseConfigured || !supabase) {
      return { 
        success: true, 
        offline: true, 
        message: 'Ambiente local: se o e-mail estiver cadastrado, as instruções para redefinir a senha foram enviadas!' 
      };
    }

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/#recovery`
      });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const isNetworkErr = err.message?.includes('Failed to fetch') || 
                           err.name === 'AuthRetryableFetchError' || 
                           err.message?.includes('ERR_NAME_NOT_RESOLVED');
      if (isNetworkErr) {
        return { 
          success: true, 
          offline: true, 
          message: 'Servidor offline: simulação de recuperação de senha concluída com sucesso!' 
        };
      }
      throw err;
    }
  };

  // Definir nova senha
  const updateUserPassword = async (newPassword) => {
    if (!isSupabaseConfigured || !supabase) {
      return { success: true, offline: true };
    }

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      const isNetworkErr = err.message?.includes('Failed to fetch') || 
                           err.name === 'AuthRetryableFetchError' || 
                           err.message?.includes('ERR_NAME_NOT_RESOLVED');
      if (isNetworkErr) {
        return { success: true, offline: true };
      }
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isGuest,
        isAuthenticated: Boolean(user),
        isSupabaseConfigured,
        login,
        signup,
        loginAsGuest,
        logout,
        updateProfile,
        resetStageProgress,
        restoreStageProgress,
        addGems,
        buySkin,
        buyTrail,
        setSelectedTrail,
        recordQuestProgress,
        claimDailyQuest,
        unlockAchievement,
        updateEndlessHighScore,
        resetPassword,
        updateUserPassword,
        refreshProfile: () => user && fetchProfile(user.id)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      profile: null,
      loading: false,
      isGuest: false,
      isAuthenticated: false,
      isSupabaseConfigured: false,
      login: async () => ({ success: false }),
      signup: async () => ({ success: false }),
      loginAsGuest: () => {},
      logout: async () => {},
      updateProfile: async () => {},
      resetStageProgress: async () => {},
      restoreStageProgress: async () => {},
      addGems: async () => 0,
      buySkin: async () => ({ success: false }),
      buyTrail: async () => ({ success: false }),
      setSelectedTrail: async () => {},
      recordQuestProgress: async () => ({}),
      claimDailyQuest: async () => ({ success: false }),
      unlockAchievement: async () => false,
      updateEndlessHighScore: async () => false,
      resetPassword: async () => ({ success: false }),
      updateUserPassword: async () => ({ success: false }),
      refreshProfile: () => {}
    };
  }
  return context;
}
