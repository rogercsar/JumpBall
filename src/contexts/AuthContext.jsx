import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from './authInstance';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';

const LOCAL_SESSION_KEY = 'jumpball_active_session';

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

  const checkLocalSession = () => {
    try {
      const saved = localStorage.getItem(LOCAL_SESSION_KEY);
      if (saved) {
        const sessionData = JSON.parse(saved);
        if (sessionData?.user) {
          const localProf = localStore.getProfile();
          const sessProf = sessionData.profile || {};
          const mergedProfile = {
            ...localProf,
            ...sessProf,
            stages_completed: Math.max(localProf.stages_completed || 0, sessProf.stages_completed || 0),
            high_score: Math.max(localProf.high_score || 0, sessProf.high_score || 0),
            total_jumps: Math.max(localProf.total_jumps || 0, sessProf.total_jumps || 0),
            games_played: Math.max(localProf.games_played || 0, sessProf.games_played || 0)
          };
          setUser(sessionData.user);
          setProfile(mergedProfile);
          localStore.saveProfile(mergedProfile);
          setIsGuest(Boolean(sessionData.isGuest));
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
        .single();

      if (data) {
        const local = localStore.getProfile();
        const merged = {
          ...data,
          stages_completed: Math.max(data.stages_completed || 0, local.stages_completed || 0),
          high_score: Math.max(data.high_score || 0, local.high_score || 0),
          total_jumps: Math.max(data.total_jumps || 0, local.total_jumps || 0),
          games_played: Math.max(data.games_played || 0, local.games_played || 0)
        };
        setProfile(merged);
        localStore.saveProfile(merged);

        // Se o progresso local estava à frente, sincroniza de volta com o Supabase
        if (merged.stages_completed > (data.stages_completed || 0) || merged.high_score > (data.high_score || 0)) {
          supabase.from('profiles').update({
            stages_completed: merged.stages_completed,
            high_score: merged.high_score,
            total_jumps: merged.total_jumps
          }).eq('id', userId).then(() => {}).catch(() => {});
        }
      } else {
        setProfile(localStore.getProfile());
      }
    } catch (e) {
      console.warn('Perfil do Supabase inacessível, mantendo dados locais:', e);
      setProfile(localStore.getProfile());
    }
  };

  // Login com E-mail e Senha
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
    const createFallbackProfile = (userId) => ({
      id: userId,
      username: username || email.split('@')[0],
      full_name: fullName || 'Novo Jogador',
      avatar_url: null,
      ball_skin: 'neon-cyan',
      high_score: 0,
      total_jumps: 0,
      stages_completed: 0,
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
    const current = profile ? { ...local, ...profile } : local;
    const updated = { 
      ...current, 
      ...updates,
      stages_completed: Math.max(current.stages_completed || 0, updates.stages_completed !== undefined ? updates.stages_completed : 0),
      high_score: Math.max(current.high_score || 0, updates.high_score !== undefined ? updates.high_score : 0),
      total_jumps: (updates.total_jumps !== undefined) ? updates.total_jumps : (current.total_jumps || 0),
      games_played: (updates.games_played !== undefined) ? updates.games_played : (current.games_played || 0)
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
          if (updates[col] !== undefined) {
            dbUpdates[col] = updates[col];
          }
        }
        dbUpdates.updated_at = new Date().toISOString();

        if (Object.keys(dbUpdates).length > 1) {
          await supabase
            .from('profiles')
            .update(dbUpdates)
            .eq('id', user.id);
        }
      } catch (err) {
        console.error('Erro ao sincronizar perfil com o Supabase:', err);
      }
    }
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
      resetPassword: async () => ({ success: false }),
      updateUserPassword: async () => ({ success: false }),
      refreshProfile: () => {}
    };
  }
  return context;
}
