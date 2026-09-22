import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Smartphone, 
  Camera, 
  Volume2, 
  Sliders, 
  ShieldCheck, 
  RotateCcw, 
  PlayCircle,
  HelpCircle,
  Check,
  Layers,
  Radio,
  Music,
  Play,
  Square,
  Sparkles
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useDialog } from '../contexts/DialogContext';
import { useAuth } from '../contexts/AuthContext.jsx';
import { soundEngine } from '../game/audio';
import { STAGES } from '../game/stages';
import { TiltMeter } from '../components/TiltMeter';

const PRESET_RADIOS = [
  {
    id: 'lofi',
    name: 'Groove Salad (Lofi & Chill)',
    desc: 'SomaFM • Downtempo, Lofi e Ambient 24/7',
    url: 'https://ice1.somafm.com/groovesalad-128-mp3',
    icon: '☕'
  },
  {
    id: 'synthwave',
    name: 'Vaporwaves (Synthwave 80s)',
    desc: 'SomaFM • Synthwave, Retrô 80s e Cyberpunk',
    url: 'https://ice1.somafm.com/vaporwaves-128-mp3',
    icon: '🌆'
  },
  {
    id: 'classical_fast',
    name: 'Clássicos Rápidos & Allegro',
    desc: 'Radio Swiss Classic • Orquestra, Presto, Allegro e Concerto 24/7',
    url: 'https://stream.srg-ssr.ch/m/rsc_de/mp3_128',
    icon: '🎻'
  },
  {
    id: 'dance',
    name: 'DEF CON Radio (Cyber Gamer)',
    desc: 'SomaFM • Música de hacker, eletrônica e ritmo cósmico',
    url: 'https://ice1.somafm.com/defcon-128-mp3',
    icon: '⚡'
  },
  {
    id: 'rock',
    name: 'Metal & Hard Rock (SomaFM)',
    desc: 'SomaFM Metal Detector • Heavy metal, hard rock e riffs épicos 24/7',
    url: 'https://ice1.somafm.com/metal-128-mp3',
    icon: '🎸'
  },
  {
    id: 'gospel_praise',
    name: 'Rádio Super Gospel & Louvor',
    desc: 'Super FM • Louvor, adoração e mensagens cristãs 24/7',
    url: 'https://servidor32.brlogic.com:8200/live',
    icon: '🕊️'
  },
  {
    id: 'gospel_instrumental',
    name: 'Teomídia Gospel Instrumental',
    desc: 'Hinos e louvores instrumentais para foco e concentração',
    url: 'https://usa3.fastcast4u.com/proxy/teomidiainstr?mp=/1',
    icon: '✨'
  },
  {
    id: 'chiptune',
    name: 'CliqHop (Chiptune 8-Bit)',
    desc: 'SomaFM • Beats 8-bit, chiptune e videogame retrô',
    url: 'https://ice1.somafm.com/cliqhop-128-mp3',
    icon: '👾'
  }
];

export function Settings({ orientation, requestOrientationPermission, permissionGranted, needsPermissionPrompt, calibrate }) {
  const { settings, updateSettings } = useSettings();
  const { showAlert, showConfirm } = useDialog();
  const { profile, resetStageProgress } = useAuth();
  const [simulatedGamma, setSimulatedGamma] = useState(0);
  const [savedBadge, setSavedBadge] = useState(false);
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  useEffect(() => {
    return () => {
      soundEngine.stopCustomAudio();
    };
  }, []);

  const triggerSaveToast = () => {
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2000);
  };

  const handleSensitivityChange = (val) => {
    updateSettings({ gyroSensitivity: parseFloat(val) });
    triggerSaveToast();
  };

  const handleDeadzoneChange = (val) => {
    updateSettings({ gyroDeadzone: parseFloat(val) });
    triggerSaveToast();
  };

  const handleCameraToggle = (val) => {
    updateSettings({ cameraEnabled: val });
    triggerSaveToast();
  };

  const handleControlModeChange = (mode) => {
    updateSettings({ controlMode: mode });
    triggerSaveToast();
  };

  const handleSfxChange = (val) => {
    const sfx = parseFloat(val);
    updateSettings({ sfxVolume: sfx });
    soundEngine.playJump();
    triggerSaveToast();
  };

  const handleBgmChange = (val) => {
    const bgm = parseFloat(val);
    updateSettings({ bgmVolume: bgm });
    triggerSaveToast();
  };

  const handleTestSound = () => {
    soundEngine.playSuperJump();
  };

  const handleToggleCustomBgm = (enabled) => {
    if (isPlayingTest) {
      soundEngine.stopCustomAudio();
      setIsPlayingTest(false);
    }
    updateSettings({ customBgmEnabled: enabled });
    triggerSaveToast();
  };

  const handleCustomBgmUrlChange = (url) => {
    updateSettings({ customBgmUrl: url });
    triggerSaveToast();
  };

  const handleSelectPreset = (preset) => {
    updateSettings({
      customBgmEnabled: true,
      customBgmUrl: preset.url,
      customBgmTitle: preset.name
    });
    triggerSaveToast();

    soundEngine.stopCustomAudio();
    setIsPlayingTest(true);
    soundEngine.setCustomBgmConfig({ enabled: true, url: preset.url, title: preset.name });
    soundEngine.playCustomAudio(() => {
      setIsPlayingTest(false);
      showAlert({
        title: 'Falha na Conexão',
        message: 'Não foi possível carregar o áudio no momento. Verifique sua conexão com a internet.',
        variant: 'warning'
      });
    });
  };

  const handleToggleTestPlayback = () => {
    if (isPlayingTest) {
      soundEngine.stopCustomAudio();
      setIsPlayingTest(false);
    } else {
      const url = settings.customBgmUrl?.trim();
      if (!url) {
        showAlert({
          title: 'URL Necessária',
          message: 'Cole o link de uma rádio web/MP3 ou clique em uma das rádios sugeridas abaixo para testar.',
          variant: 'warning'
        });
        return;
      }
      setIsPlayingTest(true);
      soundEngine.setCustomBgmConfig({
        enabled: true,
        url: url,
        title: settings.customBgmTitle
      });
      soundEngine.playCustomAudio(() => {
        setIsPlayingTest(false);
        showAlert({
          title: 'Não foi possível carregar o áudio',
          message: 'O link inserido não respondeu ou não é um stream de áudio direto. Verifique se a URL termina em .mp3 ou escolha uma das rádios pré-definidas da lista.',
          variant: 'warning'
        });
      });
    }
  };

  const handleReset = async () => {
    const confirmed = await showConfirm({
      title: 'Restaurar Configurações',
      message: 'Tem certeza que deseja restaurar a sensibilidade, zona morta, câmera e volumes para os valores padrão?',
      variant: 'warning',
      confirmText: 'Restaurar',
      cancelText: 'Cancelar'
    });

    if (confirmed) {
      updateSettings({
        gyroSensitivity: 1.4,
        gyroDeadzone: 1.5,
        cameraEnabled: true,
        gestureThreshold: 0.65,
        sfxVolume: 0.7,
        bgmVolume: 0.4,
        controlMode: 'hybrid'
      });
      showAlert({
        title: 'Padrões Restaurados',
        message: 'Todas as preferências de sensores e áudio voltaram às configurações de fábrica.',
        variant: 'success'
      });
    }
  };

  const handleCalibrate = () => {
    calibrate();
    showAlert({
      title: 'Giroscópio Calibrado',
      message: `A posição neutra de repouso foi fixada com sucesso. Agora a bola permanecerá imóvel nesta inclinação!`,
      variant: 'success',
      confirmText: 'Entendido'
    });
  };

  const handleResetStages = async () => {
    const confirmed = await showConfirm({
      title: 'Resetar Fases Liberadas?',
      message: 'Tem certeza que deseja zerar todas as fases liberadas? Você começará novamente a partir da Fase 1, mas todo o seu histórico de partidas e recordes será mantido intacto.',
      variant: 'warning',
      confirmText: 'Sim, Resetar Fases',
      cancelText: 'Cancelar'
    });

    if (confirmed) {
      await resetStageProgress();
      showAlert({
        title: 'Fases Zeradas!',
        message: 'Todas as fases voltaram ao início (apenas Fase 1 liberada). Seu histórico completo de partidas continua salvo!',
        variant: 'success'
      });
    }
  };

  const handleResetHeroStages = async () => {
    const confirmed = await showConfirm({
      title: 'Resetar Modo Herói?',
      message: 'Tem certeza que deseja zerar apenas o progresso do Modo Herói? Você voltará à Fase 1 do Herói, mas o Modo Livre e todo o histórico serão preservados.',
      variant: 'warning',
      confirmText: 'Sim, Resetar Herói',
      cancelText: 'Cancelar'
    });

    if (confirmed) {
      await resetStageProgress('hero');
      showAlert({
        title: 'Modo Herói Zerado!',
        message: 'O progresso do Modo Herói voltou à Fase 1. Seu Modo Livre e histórico de partidas continuam intactos!',
        variant: 'success'
      });
    }
  };

  const stagesCompleted = profile?.stages_completed || 0;
  const heroCompleted = profile?.stages_completed_hero || 0;
  const freeCompleted = profile?.stages_completed_free || 0;
  const activeGamma = orientation?.gamma !== 0 ? orientation.gamma : simulatedGamma;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Toast de Confirmação */}
      {savedBadge && (
        <div className="fixed top-20 right-6 z-50 p-2.5 px-4 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-fade-in">
          <Check className="w-4 h-4" />
          <span>Configuração salva!</span>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-6 h-6 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white">Configurações de Hardware</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Calibre os sensores mobile, visão computacional e áudio do jogo
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card text-xs text-slate-400 hover:text-white border border-slate-800 transition-colors"
          title="Restaurar padrões de fábrica"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Padrões</span>
        </button>
      </div>

      {/* SEÇÕES DE GIROSCÓPIO E MEDIAPIPE (DESABILITADAS TEMPORARIAMENTE - PRESERVADAS PARA O FUTURO) */}
      {false && (
        <>
          {/* 1. SEÇÃO DE GIROSCÓPIO E INCLINAÇÃO */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Sensor de Giroscópio / Acelerômetro</h2>
                  <p className="text-xs text-slate-400">Controle horizontal pela inclinação lateral do aparelho</p>
                </div>
              </div>

              {needsPermissionPrompt && !permissionGranted && (
                <button
                  onClick={requestOrientationPermission}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 hover:bg-cyan-400 animate-pulse"
                >
                  Liberar no iOS
                </button>
              )}
            </div>

            <TiltMeter
              gamma={activeGamma}
              onSimulateTilt={setSimulatedGamma}
              onCalibrate={handleCalibrate}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Sensibilidade do Giroscópio</span>
                  <span className="text-cyan-400 font-mono font-bold">{settings.gyroSensitivity}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.1"
                  value={settings.gyroSensitivity}
                  onChange={(e) => handleSensitivityChange(e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500 block mt-1">Quanto maior, mais rápido a bola reage à inclinação</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                  <span>Zona Morta (Deadzone)</span>
                  <span className="text-cyan-400 font-mono font-bold">{settings.gyroDeadzone}°</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.5"
                  value={settings.gyroDeadzone}
                  onChange={(e) => handleDeadzoneChange(e.target.value)}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <span className="text-[10px] text-slate-500 block mt-1">Evita que tremores leves movam a bola</span>
              </div>
            </div>
          </div>

          {/* 2. SEÇÃO DE CÂMERA E VISÃO COMPUTACIONAL (MEDIAPIPE) */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Visão Computacional (MediaPipe Hands)</h2>
                  <p className="text-xs text-slate-400">Detecta punho fechado na câmera selfie para disparar o salto</p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.cameraEnabled}
                  onChange={(e) => handleCameraToggle(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500" />
              </label>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Como funciona no jogo:</span>
              </div>
              <p>
                Ao habilitar, a câmera frontal roda localmente no seu dispositivo. Quando você <strong>fecha o punho 👊</strong> ou faz um movimento rápido para cima, a bola ganha um <strong>Super Salto com Impulso Extra</strong>.
              </p>
            </div>
          </div>
        </>
      )}

      {/* AVISO DE CONTROLE ATIVO */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs flex items-center gap-3">
        <Sliders className="w-5 h-5 shrink-0 text-cyan-400" />
        <div>
          <span className="font-bold block text-white text-sm">Controles Ativos: Botões Touch e Teclado</span>
          <span>Os controles de giroscópio e câmera foram desativados para máxima precisão e estabilidade. Utilize as setas na tela ou o teclado para pilotar a esfera!</span>
        </div>
      </div>

      {/* 3. MODO DE CONTROLE PREFERIDO (Oculto temporariamente a pedido) */}
      {/*
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Modo de Controle</h2>
            <p className="text-xs text-slate-400">Escolha o layout de entrada ideal para seu dispositivo</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'hybrid', title: 'Híbrido IA', desc: 'Giroscópio + Câmera Selfie' },
            { id: 'touch', title: 'Botões Touch', desc: 'Setas táteis na tela' },
            { id: 'keyboard', title: 'Teclado', desc: 'Setas/A-D + Espaço' }
          ].map((mode) => {
            const isSelected = settings.controlMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleControlModeChange(mode.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-md shadow-cyan-500/15'
                    : 'glass-card border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold text-white block">{mode.title}</span>
                <span className="text-[11px] text-slate-400 block mt-0.5">{mode.desc}</span>
              </button>
            );
          })}
        </div>
      </div>
      */}

      {/* 4. SEÇÃO DE ÁUDIO E EFEITOS (WEB AUDIO API) */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Áudio & Efeitos Sonoros</h2>
              <p className="text-xs text-slate-400">Sintetizador procedural Web Audio API de alta fidelidade</p>
            </div>
          </div>

          <button
            onClick={handleTestSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 transition-colors"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Testar Som</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Volume dos Efeitos (SFX)</span>
              <span className="text-cyan-400 font-mono font-bold">
                {Math.round(settings.sfxVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.sfxVolume}
              onChange={(e) => handleSfxChange(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Música / Ambiência (BGM)</span>
              <span className="text-cyan-400 font-mono font-bold">
                {Math.round(settings.bgmVolume * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.bgmVolume}
              onChange={(e) => handleBgmChange(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* 5. SEÇÃO DE MÚSICA DE FUNDO PERSONALIZADA (RÁDIO WEB / LOFI / MP3) */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">Música Personalizada de Fundo</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Rádio Web / MP3
                </span>
              </div>
              <p className="text-xs text-slate-400">Toque rádios online Lofi 24/7 ou links diretos de áudio no fundo das fases</p>
            </div>
          </div>

          {/* Toggle Ativar / Desativar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">
              {settings.customBgmEnabled ? 'Ativada' : 'Música do Jogo (Padrão)'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(settings.customBgmEnabled)}
                onChange={(e) => handleToggleCustomBgm(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500" />
            </label>
          </div>
        </div>

        {settings.customBgmEnabled && (
          <div className="space-y-4 pt-2 border-t border-slate-800/80 animate-fade-in">
            {/* Aviso limpo */}
            <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-200 text-xs flex items-center gap-2.5">
              <Music className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                O som tocará <strong>nativamente em segundo plano</strong> durante as fases, sem abrir nenhuma janela na tela do jogo!
              </span>
            </div>

            {/* Input de URL e Botão de Teste */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">
                Link do Stream de Áudio ou Arquivo .MP3
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  value={settings.customBgmUrl || ''}
                  onChange={(e) => handleCustomBgmUrlChange(e.target.value)}
                  placeholder="Ex: https://stream.nightride.fm/synthwave.mp3 ou link .mp3"
                  className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
                />
                <button
                  type="button"
                  onClick={handleToggleTestPlayback}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shrink-0 ${
                    isPlayingTest
                      ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                      : 'bg-purple-600 hover:bg-purple-500 text-white'
                  }`}
                >
                  {isPlayingTest ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Parar Teste</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Testar Rádio</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Rádios Pré-Definidas de 1 Clique */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-400">Rádios 24/7 Recomendadas (Clique para escolher):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRESET_RADIOS.map((preset) => {
                  const isCurrent = settings.customBgmUrl === preset.url;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-purple-500/15 border-purple-400 shadow-md shadow-purple-500/10 ring-1 ring-purple-400/40'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-lg">{preset.icon}</span>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-white block truncate">{preset.name}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{preset.desc}</span>
                        </div>
                      </div>
                      {isCurrent ? (
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-500 text-slate-950 shrink-0">
                          Ativa
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500 hover:text-purple-300 shrink-0">
                          Usar
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. SEÇÃO DE PROGRESSO DAS FASES (RESETAR FASES E MANTER HISTÓRICO) */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 bg-gradient-to-b from-slate-900/60 to-slate-950/80">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 shadow-sm">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Progresso das Fases</h2>
            <p className="text-xs text-slate-400 mt-0.5">Zere um modo ou todos para recomeçar do zero</p>
          </div>
        </div>

        {/* Badges de progresso por modo */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
            ⚔️ Herói: {heroCompleted} / 50 fases
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            🌿 Livre: {freeCompleted} / 50 fases
          </span>
        </div>

        {/* Botões de reset */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={handleResetHeroStages}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-500/25 text-amber-300 hover:text-amber-200 font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar Modo Herói</span>
          </button>

          <button
            onClick={handleResetStages}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 active:scale-95 border border-rose-500/30 text-rose-300 hover:text-rose-200 font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Resetar Todos os Modos</span>
          </button>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-400">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Ao resetar, apenas a <strong>Fase 1 (Floresta Esmeralda)</strong> ficará liberada no modo escolhido.
            <span className="text-slate-300 font-medium"> Todo o seu histórico de partidas, recordes e estatísticas continuarão salvos!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
