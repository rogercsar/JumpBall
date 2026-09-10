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

          const { data: subData } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
            if (!isMounted) return;
            if (newSession?.user) {
              setUser(newSession.user);
              setIsGuest(false);
              fetchProfile(newSession.user.id);
            } else {
              setUser(null);
              setProfile(null);
              setIsGuest(false);
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
          setUser(sessionData.user);
          setProfile(sessionData.profile || localStore.getProfile());
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
    if (!supabase) return;
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
      } else if (error) {
        console.warn('Perfil não encontrado no Supabase, usando local:', error.message);
        setProfile(localStore.getProfile());
      }
    } catch (e) {
      console.error('Erro ao buscar perfil:', e);
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (data?.user) {
      setUser(data.user);
      setIsGuest(false);
      await fetchProfile(data.user.id);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: data.user, isGuest: false }));
    }
    return data;
  };

  // Cadastro de Novo Usuário
  const signup = async (email, password, username, fullName) => {
    if (!isSupabaseConfigured || !supabase) {
      const mockUser = { id: 'user-' + Date.now(), email };
      const prof = {
        id: mockUser.id,
        username: username || email.split('@')[0],
        full_name: fullName || 'Novo Jogador',
        avatar_url: null,
        ball_skin: 'neon-cyan',
        high_score: 0,
        total_jumps: 0,
        stages_completed: 0,
        created_at: new Date().toISOString()
      };
      setUser(mockUser);
      setProfile(prof);
      setIsGuest(false);
      localStore.saveProfile(prof);
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: mockUser, profile: prof, isGuest: false }));
      return { success: true };
    }

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
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({ user: data.user, isGuest: false }));
    }
    return data;
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

  // Logout
  const logout = async () => {
    if (supabase && isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) { /* ignore */ }
    }
    localStorage.removeItem(LOCAL_SESSION_KEY);
    setUser(null);
    setProfile(null);
    setIsGuest(false);
  };

  // Atualizar Perfil (Nome, Skin da Bola, Fases Concluídas, etc.)
  const updateProfile = async (updates) => {
    const current = profile || localStore.getProfile();
    const updated = { ...current, ...updates };
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

    if (supabase && isSupabaseConfigured && user && !isGuest) {
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
      refreshProfile: () => {}
    };
  }
  return context;
}
