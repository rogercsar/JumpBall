import React, { createContext, useContext, useState, useEffect } from 'react';
import { localStore } from '../lib/supabase';
import { soundEngine } from '../game/audio';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => localStore.getSettings());

  useEffect(() => {
    // Sincroniza volumes com o sintetizador Web Audio
    soundEngine.setVolumes(settings.sfxVolume, settings.bgmVolume);
  }, [settings.sfxVolume, settings.bgmVolume]);

  const updateSettings = (partial) => {
    setSettings((prev) => {
      const updated = { ...prev, ...partial };
      localStore.saveSettings(updated);
      return updated;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings deve ser usado dentro de SettingsProvider');
  }
  return context;
}
