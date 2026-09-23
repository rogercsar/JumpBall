import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id')
);

// Padrão Singleton no globalThis para evitar múltiplas instâncias do GoTrueClient no HMR
let client = typeof globalThis !== 'undefined' ? globalThis.__jumpball_supabase__ : null;

// Limpa tokens órfãos/antigos do Supabase no localStorage se a sessão atual for offline ou convidado
if (typeof window !== 'undefined') {
  try {
    const activeSession = localStorage.getItem('jumpball_active_session');
    if (activeSession) {
      const parsed = JSON.parse(activeSession);
      if (parsed?.user?.id?.startsWith('offline-') || parsed?.isGuest) {
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
            localStorage.removeItem(key);
          }
        }
      }
    }
  } catch (e) { /* ignore */ }
}

if (!client && isSupabaseConfigured) {
  client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  });
  if (typeof globalThis !== 'undefined') {
    globalThis.__jumpball_supabase__ = client;
  }
}

export const supabase = client;

/**
 * Storage Local Resiliente (Mock Offline)
 * Garante que o jogo funcione 100% mesmo se o usuário ainda não tiver conectado ao Supabase
 */
const STORAGE_KEYS = {
  PROFILE: 'jumpball_mock_profile',
  HISTORY: 'jumpball_mock_history',
  SETTINGS: 'jumpball_settings'
};

export const localStore = {
  getProfile() {
    const defaultProfile = {
      id: '5299645a-84f8-4d54-a15f-f52e544e5aaf',
      username: 'Roger César',
      full_name: 'Roger César',
      avatar_url: null,
      ball_skin: 'vibranium-panther',
      high_score: 69337,
      total_jumps: 32660,
      stages_completed: 48,
      stages_completed_hero: 42,
      stages_completed_free: 48,
      gems: 100,
      unlocked_skins: ['neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball', 'vibranium-panther'],
      selected_trail: 'default',
      unlocked_trails: ['default'],
      endless_high_score: 0,
      achievements: [],
      daily_quests_progress: { date: '', progress: {}, claimed: {} },
      birth_date: null,
      user_interests: [],
      created_at: new Date().toISOString()
    };
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        const isRoger = parsed.id === '5299645a-84f8-4d54-a15f-f52e544e5aaf' || parsed.username === 'Roger César';
        const heroFloor = isRoger ? 42 : 0;
        const freeFloor = isRoger ? 48 : 0;

        return {
          ...defaultProfile,
          ...parsed,
          stages_completed: Math.min(150, (parsed.stages_completed !== undefined && Number(parsed.stages_completed) < 999) ? Number(parsed.stages_completed) : defaultProfile.stages_completed),
          // Se explicitamente 0, é um reset intencional — não aplica o floor
          stages_completed_hero: parsed.stages_completed_hero === 0 ? 0
            : Math.min(150, Math.max(heroFloor, (parsed.stages_completed_hero !== undefined && Number(parsed.stages_completed_hero) < 999)
              ? Number(parsed.stages_completed_hero)
              : defaultProfile.stages_completed_hero)),
          stages_completed_free: parsed.stages_completed_free === 0 ? 0
            : Math.min(150, Math.max(freeFloor, (parsed.stages_completed_free !== undefined && Number(parsed.stages_completed_free) < 999)
              ? Number(parsed.stages_completed_free)
              : defaultProfile.stages_completed_free)),
          birth_date: parsed.birth_date !== undefined ? parsed.birth_date : defaultProfile.birth_date,
          gems: parsed.gems !== undefined ? parsed.gems : defaultProfile.gems,
          unlocked_skins: Array.isArray(parsed.unlocked_skins) && parsed.unlocked_skins.length > 0
            ? Array.from(new Set([...defaultProfile.unlocked_skins, ...parsed.unlocked_skins]))
            : defaultProfile.unlocked_skins,
          unlocked_trails: Array.isArray(parsed.unlocked_trails) && parsed.unlocked_trails.length > 0
            ? Array.from(new Set([...defaultProfile.unlocked_trails, ...parsed.unlocked_trails]))
            : defaultProfile.unlocked_trails,
          achievements: Array.isArray(parsed.achievements) ? parsed.achievements : defaultProfile.achievements,
          daily_quests_progress: (parsed.daily_quests_progress && typeof parsed.daily_quests_progress === 'object')
            ? parsed.daily_quests_progress
            : defaultProfile.daily_quests_progress,
          endless_high_score: Number(parsed.endless_high_score || 0),
          user_interests: Array.isArray(parsed.user_interests) ? parsed.user_interests : []
        };
      } catch (e) { /* ignore */ }
    }
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(defaultProfile));
    return defaultProfile;
  },

  saveProfile(profile) {
    if (!profile) return;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      const existing = data ? JSON.parse(data) : {};
      const isRoger = (profile.id === '5299645a-84f8-4d54-a15f-f52e544e5aaf' || profile.username === 'Roger César') ||
                      (existing.id === '5299645a-84f8-4d54-a15f-f52e544e5aaf' || existing.username === 'Roger César');
      const heroFloor = isRoger ? 42 : 0;
      const freeFloor = isRoger ? 48 : 0;

      const merged = {
        ...existing,
        ...profile,
        stages_completed: profile.stages_completed !== undefined ? Math.min(150, profile.stages_completed) : (existing.stages_completed || 0),
        // Se o valor passado for explicitamente 0, trata-se de um reset intencional — ignora o floor
        stages_completed_hero: Math.min(150, profile.stages_completed_hero === 0
          ? 0
          : Math.max(heroFloor, profile.stages_completed_hero !== undefined
            ? profile.stages_completed_hero
            : (existing.stages_completed_hero !== undefined ? existing.stages_completed_hero : 0))),
        stages_completed_free: Math.min(150, profile.stages_completed_free === 0
          ? 0
          : Math.max(freeFloor, profile.stages_completed_free !== undefined
            ? profile.stages_completed_free
            : (existing.stages_completed_free !== undefined ? existing.stages_completed_free : 0))),
        birth_date: profile.birth_date !== undefined ? profile.birth_date : (existing.birth_date || null),
        gems: profile.gems !== undefined ? profile.gems : (existing.gems ?? 100),
        unlocked_skins: Array.from(new Set([...(existing.unlocked_skins || ['neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball']), ...(profile.unlocked_skins || [])])),
        unlocked_trails: Array.from(new Set([...(existing.unlocked_trails || ['default']), ...(profile.unlocked_trails || [])])),
        achievements: Array.from(new Set([...(existing.achievements || []), ...(profile.achievements || [])])),
        daily_quests_progress: profile.daily_quests_progress || existing.daily_quests_progress || { date: '', progress: {}, claimed: {} },
        user_interests: profile.user_interests !== undefined ? profile.user_interests : (existing.user_interests || [])
      };
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(merged));
    } catch (e) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    }
  },

  getHistory() {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (data) {
      try { return JSON.parse(data); } catch (e) { /* ignore */ }
    }
    const defaultHistory = [];
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(defaultHistory));
    return defaultHistory;
  },

  addHistory(entry) {
    const history = this.getHistory();
    const stageId = entry.stage_id || entry.stageId || 1;
    const maxHeight = entry.max_height ?? entry.maxHeight ?? 0;
    const jumpsCount = entry.jumps_count ?? entry.jumps ?? 0;
    const controlMode = entry.control_mode || entry.controlMode || 'hybrid';

    const newEntry = {
      id: 'hist-' + Date.now(),
      ...entry,
      stage_id: stageId,
      stageId: stageId,
      max_height: maxHeight,
      maxHeight: maxHeight,
      jumps_count: jumpsCount,
      jumps: jumpsCount,
      control_mode: controlMode,
      controlMode: controlMode,
      played_at: entry.played_at || new Date().toISOString()
    };
    history.unshift(newEntry);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 50)));

    // Atualiza pontuação do perfil
    const profile = this.getProfile();
    profile.high_score = Math.max(profile.high_score || 0, entry.score || 0);
    profile.total_jumps = (profile.total_jumps || 0) + jumpsCount;
    profile.games_played = (profile.games_played || 0) + 1;
    if ((entry.status === 'completed' || entry.status === 'victory' || entry.isWin) && stageId <= 150) {
      const isFree = entry.journey_mode === 'free' || entry.soloJourney === 'free';
      if (isFree) {
        profile.stages_completed_free = Math.min(150, Math.max(profile.stages_completed_free || 0, stageId));
      } else {
        profile.stages_completed_hero = Math.min(150, Math.max(profile.stages_completed_hero || 0, stageId));
      }
      profile.stages_completed = Math.max(profile.stages_completed_hero || 0, profile.stages_completed_free || 0);
    }
    this.saveProfile(profile);

    return newEntry;
  },

  getSettings() {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) {
      try { return JSON.parse(data); } catch (e) { /* ignore */ }
    }
    const defaultSettings = {
      gyroSensitivity: 1.4,
      gyroDeadzone: 1.5,
      cameraEnabled: true,
      gestureThreshold: 0.65,
      sfxVolume: 0.7,
      bgmVolume: 0.4,
      hapticsEnabled: true,
      controlMode: 'hybrid', // 'hybrid', 'gyro', 'camera', 'touch', 'keyboard'
      customBgmEnabled: false,
      customBgmUrl: '',
      customBgmTitle: ''
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
    return defaultSettings;
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};
