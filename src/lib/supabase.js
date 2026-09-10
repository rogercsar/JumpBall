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
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (data) {
      try { return JSON.parse(data); } catch (e) { /* ignore */ }
    }
    const defaultProfile = {
      id: 'guest-player-001',
      username: 'Piloto',
      full_name: 'Piloto',
      avatar_url: null,
      ball_skin: 'neon-cyan',
      high_score: 0,
      total_jumps: 0,
      stages_completed: 0,
      created_at: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(defaultProfile));
    return defaultProfile;
  },

  saveProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
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
    if (entry.status === 'completed') {
      profile.stages_completed = Math.max(profile.stages_completed || 0, stageId);
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
      controlMode: 'hybrid' // 'hybrid', 'gyro', 'camera', 'touch', 'keyboard'
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
    return defaultSettings;
  },

  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
};
