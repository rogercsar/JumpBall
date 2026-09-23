import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Trophy,
  Skull,
  Zap,
  Sparkles,
  Layers,
  Smartphone,
  Camera,
  Volume2,
  VolumeX,
  ChevronRight,
  Heart,
  Bot,
  Swords,
  Flag,
  Flame,
  PartyPopper,
  Cake,
  Gift,
  Crown,
  Globe,
  CheckCircle2,
  Feather,
  Compass
} from 'lucide-react';
import { GameEngine } from '../game/engine';
import { STAGES, BALL_SKINS, WORLDS, getStagesForMode, getWorldsForMode } from '../game/stages';
import { getActiveCommemorativeStages } from '../game/events';
import { soundEngine } from '../game/audio';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSettings } from '../contexts/SettingsContext';
import { useDialog } from '../contexts/DialogContext';
// Hooks de hardware comentados conforme solicitação (preservados para uso futuro):
// import { useDeviceOrientation } from '../hooks/useDeviceOrientation';
// import { useMediaPipeHands } from '../hooks/useMediaPipeHands';
// import { CameraPreview } from '../components/CameraPreview';
import { TouchControls } from '../components/TouchControls';
import { StageCard } from '../components/StageCard';
import { PvPLobbyModal } from '../components/PvPLobbyModal';
import { multiplayerService } from '../services/multiplayer';
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';

export const ENDLESS_STAGE = {
  id: 'endless',
  number: 999,
  title: 'Sobrevivência do Magma',
  name: 'Sobrevivência do Magma',
  theme: 'volcano',
  icon: 'Flame',
  targetHeight: 999999,
  gravity: 0.34,
  jumpForce: -11.8,
  friction: 0.94,
  wind: 0,
  speedFactor: 1.1,
  hazards: ['moving', 'springs', 'spikes'],
  platformColor: '#ea580c',
  platformBorder: '#fdba74',
  ballGlow: '#f97316',
  bgGradient: ['#1c0505', '#450a0a', '#7f1d1d'],
  description: 'Sobreviva ao magma ascendente! Alcance a maior altitude possível antes que a lava suba.',
  mechanic: 'Magma ascendente contínuo e geração infinita de plataformas.'
};

export function Game({ onNavigate }) {
  const { profile, user, updateProfile, addGems, updateEndlessHighScore, recordQuestProgress, restoreStageProgress } = useAuth();
  const { settings } = useSettings();
  const { showConfirm, showAlert, isDialogOpen } = useDialog();

  // Estados da Tela ('menu' | 'ready' | 'playing' | 'paused' | 'game_over' | 'victory')
  const [selectedStage, setSelectedStage] = useState(null);
  const [gameState, setGameState] = useState('menu');
  const [currentScore, setCurrentScore] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentLives, setCurrentLives] = useState(3);
  const [boostEnergy, setBoostEnergy] = useState(100);
  const [lastGameResult, setLastGameResult] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(() => soundEngine.isMuted);

  const toggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
  };

  // Modo de Jogo: 'solo' (Individual) | 'race_ai' (vs Máquina) | 'race_pvp' (Duelo 1v1)
  const [gameMode, setGameMode] = useState('solo');
  // Estilo de Jornada Solo: 'hero' (Jornada do Herói com Chefões) | 'free' (Jornada Livre sem Chefões)
  const [soloJourney, setSoloJourney] = useState(() => {
    try {
      return localStorage.getItem('jumpball_solo_journey') || 'hero';
    } catch (e) {
      return 'hero';
    }
  });

  // Estado de Revanche (PvP)
  // 'idle' | 'requesting' | 'waiting' | 'incoming'
  const [rematchState, setRematchState] = useState('idle');
  const rematchTimeoutRef = useRef(null);

  // Progresso estritamente independente para cada modo (Livre ou Herói)
  // Garante que o progresso de um modo nunca vaze para o outro e suporta até 150 fases
  const activeCompletedStages = soloJourney === 'free'
    ? Math.min(150, Math.max(0, profile?.stages_completed_free || 0, localStore.getProfile()?.stages_completed_free || 0))
    : Math.min(150, Math.max(0, profile?.stages_completed_hero || 0, localStore.getProfile()?.stages_completed_hero || 0));

  // Fases e Mundos customizados para o modo selecionado
  const activeStages = React.useMemo(() => {
    return getStagesForMode(soloJourney);
  }, [soloJourney]);

  const activeWorlds = React.useMemo(() => {
    return getWorldsForMode(soloJourney);
  }, [soloJourney]);

  const handleSoloJourneyChange = (journey) => {
    setSoloJourney(journey);
    try {
      localStorage.setItem('jumpball_solo_journey', journey);
    } catch (e) { /* ignore */ }
    const journeyCompleted = journey === 'free'
      ? Math.min(150, Math.max(0, profile?.stages_completed_free || 0, localStore.getProfile()?.stages_completed_free || 0))
      : Math.min(150, Math.max(0, profile?.stages_completed_hero || 0, localStore.getProfile()?.stages_completed_hero || 0));
    setSelectedWorldId(Math.min(30, Math.max(1, Math.floor(journeyCompleted / 5) + 1)));
  };

  const [aiDifficulty, setAiDifficulty] = useState('medium'); // 'easy' | 'medium' | 'hard'
  const [raceStats, setRaceStats] = useState({
    playerHeight: 0,
    botHeight: 0,
    distanceDiff: 0,
    leader: 'tied',
    botLives: 3,
    opponentName: null
  });

  // Estado do Modo Multiplayer 1v1 (PvP)
  const [isPvPModalOpen, setIsPvPModalOpen] = useState(false);
  const [pvpMatchConfig, setPvpMatchConfig] = useState(null);
  const [challengeCodeFromUrl, setChallengeCodeFromUrl] = useState('');

  // Seleção de Mundo Temático (1 a 10 ou 'all')
  const [selectedWorldId, setSelectedWorldId] = useState(() => {
    const journey = (() => {
      try { return localStorage.getItem('jumpball_solo_journey') || 'hero'; } catch (e) { return 'hero'; }
    })();
    const localProf = localStore.getProfile();
    const completed = journey === 'free'
      ? (localProf.stages_completed_free || 0)
      : (localProf.stages_completed_hero || 0);
    return Math.min(10, Math.max(1, Math.floor(completed / 5) + 1));
  });

  // Fases comemorativas ativas na semana atual (Aniversário, Natal, Páscoa, etc.)
  const activeEventStages = React.useMemo(() => {
    return getActiveCommemorativeStages(profile);
  }, [profile]);

  // Detecta se o jogador acessou via link de desafio (?challenge=JPXXX)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challenge = params.get('challenge');
    if (challenge) {
      setChallengeCodeFromUrl(challenge.toUpperCase());
      setIsPvPModalOpen(true);
    }
  }, []);

  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  // Estado e Controle de Toque Direto na Tela do Jogo
  const [activeTouchSide, setActiveTouchSide] = useState(null); // 'left' | 'right' | null
  const touchStateRef = useRef({
    activePointerId: null,
    startX: 0,
    startY: 0,
    lastTapTime: 0
  });

  const handlePointerDown = (e) => {
    soundEngine.unlock();
    if (gameState !== 'playing') return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) { /* ignore */ }

    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const now = Date.now();

    // Toque duplo rápido (Double Tap em < 300ms) aciona Super Pulo
    if (now - touchStateRef.current.lastTapTime < 300) {
      engineRef.current?.triggerGestureJump();
      touchStateRef.current.lastTapTime = 0;
    } else {
      touchStateRef.current.lastTapTime = now;
    }

    touchStateRef.current.activePointerId = e.pointerId;
    touchStateRef.current.startX = clientX;
    touchStateRef.current.startY = clientY;
    touchStateRef.current.swipeTriggered = false;

    // Metade esquerda -> move esquerda (-1); Metade direita -> move direita (1)
    const relX = (clientX - rect.left) / rect.width;
    const side = relX < 0.5 ? 'left' : 'right';
    touchStateRef.current.activeSide = side;
    setActiveTouchSide(side);
    engineRef.current?.setTouch(side === 'left' ? -1 : 1);
  };

  const handlePointerMove = (e) => {
    if (gameState !== 'playing') return;
    if (touchStateRef.current.activePointerId !== e.pointerId) return;

    // Deslizar para cima (Swipe Up) dispara Impulso uma única vez por gesto
    const deltaY = touchStateRef.current.startY - e.clientY;
    if (!touchStateRef.current.swipeTriggered && deltaY > 50) {
      touchStateRef.current.swipeTriggered = true;
      engineRef.current?.triggerGestureJump();
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const side = relX < 0.5 ? 'left' : 'right';

    // Otimização Mobile: Só dispara setState do React se o lado realmente mudar, evitando centenas de re-renders!
    if (touchStateRef.current.activeSide !== side) {
      touchStateRef.current.activeSide = side;
      setActiveTouchSide(side);
    }

    // Controle analógico direto para a engine (sem overhead de React)
    const normDir = Math.max(-1, Math.min(1, (relX - 0.5) * 2.2));
    engineRef.current?.setTouch(normDir);
  };

  const handlePointerUp = (e) => {
    if (touchStateRef.current.activePointerId === e.pointerId) {
      touchStateRef.current.activePointerId = null;
      touchStateRef.current.activeSide = null;
      touchStateRef.current.swipeTriggered = false;
      setActiveTouchSide(null);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch (err) { /* ignore */ }
      engineRef.current?.setTouch(0);
    }
  };

  // Pausa o jogo imediatamente se qualquer modal de diálogo estiver aberto
  useEffect(() => {
    if (isDialogOpen && engineRef.current && gameState === 'playing') {
      engineRef.current.pause();
      setGameState('paused');
    }
  }, [isDialogOpen, gameState]);

  // Sensores de Hardware (Giroscópio e MediaPipe comentados conforme solicitado para uso futuro)
  /*
  const {
    orientation,
    isSupported: isOrientationSupported,
    permissionGranted,
    needsPermissionPrompt,
    requestOrientationPermission,
    calibrate
  } = useDeviceOrientation();

  const handleJumpGesture = useCallback(() => {
    if (engineRef.current && gameState === 'playing') {
      engineRef.current.triggerGestureJump();
    }
  }, [gameState]);

  const {
    isCameraActive,
    gestureDetected,
    error: cameraError,
    canvasRef: mediaPipeCanvasRef
  } = useMediaPipeHands({
    enabled: settings.cameraEnabled && (gameState === 'ready' || gameState === 'playing' || gameState === 'paused'),
    onJumpTrigger: handleJumpGesture
  });

  useEffect(() => {
    if (engineRef.current && gameState === 'playing') {
      engineRef.current.setTilt(
        orientation.gamma,
        settings.gyroSensitivity,
        settings.gyroDeadzone
      );
    }
  }, [orientation.gamma, settings.gyroSensitivity, settings.gyroDeadzone, gameState]);
  */

  // Skin ativa da bola
  // Refs para evitar problemas de stale closure
  const selectedStageRef = useRef(selectedStage);
  useEffect(() => {
    selectedStageRef.current = selectedStage;
  }, [selectedStage]);

  const profileRef = useRef(profile);
  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  // Skin ativa da bola
  const activeSkin = BALL_SKINS.find((s) => s.id === (profile?.ball_skin || 'neon-cyan')) || BALL_SKINS[0];

  // Persistência de Score e Desbloqueio de Fases (Supabase + LocalStore)
  const saveGameResult = async (result, currentStageObj) => {
    const stageObj = currentStageObj || result?.stage || selectedStageRef.current || selectedStage;
    const stageNumber = Number(stageObj?.number || stageObj?.id || 1);
    const scoreVal = Math.round(result.score || 0);
    const heightVal = Math.round(result.maxHeight || 0);
    const jumpsVal = Math.round(result.jumps || 0);
    const durationVal = Math.round(result.duration || 0);
    const controlModeVal = settings.controlMode || 'hybrid';
    const isWin = result.status === 'completed';

    // Recupera o maior progresso registrado para cada modo de forma totalmente independente
    const localProf = localStore.getProfile();
    const isFreeMode = soloJourney === 'free';

    // Modos de corrida (race_pvp, race_ai, endless) NUNCA alteram o progresso das jornadas solo.
    // Apenas partidas no modo 'solo' avançam os contadores de fases concluídas.
    const isRaceMode = gameMode === 'race_pvp' || gameMode === 'race_ai' || gameMode === 'endless';

    const currentHeroCompleted = Math.min(150, Math.max(
      profileRef.current?.stages_completed_hero || 0,
      profile?.stages_completed_hero || 0,
      localProf.stages_completed_hero || 0
    ));

    const currentFreeCompleted = Math.min(150, Math.max(
      profileRef.current?.stages_completed_free || 0,
      profile?.stages_completed_free || 0,
      localProf.stages_completed_free || 0
    ));

    const isEventStage = Boolean(stageObj?.isEvent);
    // Avança estritamente o progresso do modo solo jogado (nunca nos modos de corrida/duelo)
    const newHeroCompleted = (!isRaceMode && !isFreeMode && isWin && !isEventStage && stageNumber <= 150)
      ? Math.min(150, Math.max(currentHeroCompleted, stageNumber))
      : currentHeroCompleted;

    const newFreeCompleted = (!isRaceMode && isFreeMode && isWin && !isEventStage && stageNumber <= 150)
      ? Math.min(150, Math.max(currentFreeCompleted, stageNumber))
      : currentFreeCompleted;

    const newHighScore = Math.max(profileRef.current?.high_score || 0, localProf.high_score || 0, scoreVal);
    const newTotalJumps = (profileRef.current?.total_jumps || localProf.total_jumps || 0) + jumpsVal;
    const newGamesPlayed = (profileRef.current?.games_played || localProf.games_played || 0) + 1;

    const payload = {
      userId: user?.id || null,
      user_id: user?.id || null,
      stageId: stageNumber,
      stage_id: stageNumber,
      journey_mode: soloJourney,
      soloJourney: soloJourney,
      score: scoreVal,
      maxHeight: heightVal,
      max_height: heightVal,
      status: result.status,
      duration: durationVal,
      duration_seconds: durationVal,
      jumps: jumpsVal,
      jumps_count: jumpsVal,
      controlMode: controlModeVal,
      control_mode: controlModeVal
    };

    const updates = {
      stages_completed: Math.max(newHeroCompleted, newFreeCompleted),
      stages_completed_hero: newHeroCompleted,
      stages_completed_free: newFreeCompleted,
      high_score: newHighScore,
      total_jumps: newTotalJumps,
      games_played: newGamesPlayed
    };

    // Crédito das gemas coletadas na partida + bônus de evento/chefão se venceu
    const eventRewardGems = (isWin && isEventStage) ? (stageObj?.rewardGems || 500) : 0;
    const bossRewardGems = (isWin && stageObj?.isBossStage) ? (stageObj?.rewardGems || 200) : 0;
    const gemsEarned = Math.round(result.gems || 0) + eventRewardGems + bossRewardGems;
    const portalsVal = Math.round(result.portals || 0);

    // Registra progresso nas missões diárias
    if (recordQuestProgress) {
      recordQuestProgress({ jumps: jumpsVal, gems: gemsEarned, portals: portalsVal });
    }

    if (gemsEarned > 0 && addGems) {
      addGems(gemsEarned);
    }

    // Se for modo infinito, atualiza o recorde pessoal de altura
    if ((result.isEndless || stageNumber === 999) && updateEndlessHighScore) {
      updateEndlessHighScore(heightVal);
    }

    // 1. Atualiza imediatamente o perfil do jogador no estado e storage
    if (updateProfile) {
      try {
        await updateProfile(updates);
      } catch (err) {
        console.warn('Aviso ao atualizar perfil:', err);
      }
    } else {
      localStore.saveProfile({ ...localProf, ...updates });
    }

    // 2. Grava localmente no histórico
    localStore.addHistory(payload);

    // 3. Grava diretamente no banco Supabase se o usuário estiver autenticado na nuvem
    const isRemoteUser = Boolean(
      isSupabaseConfigured &&
      supabase &&
      user &&
      !user.id?.startsWith('offline-') &&
      !user.id?.startsWith('guest-')
    );
    if (isRemoteUser) {
      try {
        const { error: histError } = await supabase.from('game_history').insert([
          {
            user_id: user.id,
            stage_id: stageNumber,
            score: scoreVal,
            max_height: heightVal,
            status: result.status,
            duration_seconds: durationVal,
            jumps_count: jumpsVal,
            control_mode: controlModeVal
          }
        ]);
        if (histError) console.warn('Aviso: Erro ao inserir game_history:', histError);
      } catch (err) {
        console.warn('Aviso: Falha ao inserir no Supabase diretamente:', err);
      }

      // Se venceu a fase no modo herói solo, assegura a persistência na nuvem imediatamente
      if (isWin && !isFreeMode && !isRaceMode) {
        try {
          const { error: profError } = await supabase.from('profiles').upsert({
            id: user.id,
            stages_completed: newHeroCompleted,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
          if (profError) console.warn('Aviso: Erro ao atualizar stages_completed no Supabase:', profError);
        } catch (err) {
          console.warn('Aviso ao sincronizar stages_completed:', err);
        }
      }
    }
  };

  // Prepara a fase no modo 'ready' aguardando o clique em DAR PLAY (ou inicia direto no PvP)
  const startGame = useCallback((stage, modeOverride = null, diffOverride = null, pvpConfigOverride = null) => {
    soundEngine.unlock();
    const activeMode = modeOverride || gameMode;
    const activeDiff = diffOverride || aiDifficulty;
    const activePvP = pvpConfigOverride || pvpMatchConfig;

    // Normaliza a fase para o modo ativo (garante que no Modo Livre a fase venha da lista sem chefões)
    let resolvedStage = stage;
    if (activeMode === 'solo' && soloJourney === 'free') {
      const freeList = getStagesForMode('free');
      resolvedStage = freeList.find((s) => s.number === stage?.number || s.id === stage?.id) || stage;
    } else if (activeMode === 'solo' && soloJourney === 'hero') {
      const heroList = getStagesForMode('hero');
      resolvedStage = heroList.find((s) => s.number === stage?.number || s.id === stage?.id) || stage;
    }

    setSelectedStage(resolvedStage);
    selectedStageRef.current = resolvedStage;
    setGameState(activeMode === 'race_pvp' ? 'playing' : 'ready');
    setCurrentScore(0);
    setCurrentHeight(0);
    setCurrentLives(3);
    setBoostEnergy(100);
    setLastGameResult(null);
    setRaceStats({
      playerHeight: 0,
      botHeight: 0,
      distanceDiff: 0,
      leader: 'tied',
      botLives: 3,
      opponentName: activePvP?.opponent?.username
    });

    // Timeout breve para o Canvas renderizar no DOM
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const engine = new GameEngine(
        canvas,
        resolvedStage,
        activeSkin,
        (result) => {
          setGameState('game_over');
          const enhancedResult = { ...result, stage, isEvent: Boolean(stage?.isEvent) };
          setLastGameResult(enhancedResult);
          saveGameResult(enhancedResult, stage);
        },
        (result) => {
          setGameState('victory');
          const isBoss = Boolean(resolvedStage?.isBossStage && soloJourney !== 'free');
          const isSummit = Boolean(resolvedStage?.isSummitStage || (resolvedStage?.number % 5 === 0 && soloJourney === 'free'));
          const enhancedResult = {
            ...result,
            stage: resolvedStage,
            isEvent: Boolean(resolvedStage?.isEvent),
            isBossStage: isBoss,
            isSummitStage: isSummit,
            bossName: isBoss ? resolvedStage?.bossName : null,
            bossRewardGems: isBoss ? (resolvedStage?.rewardGems || 200) : 0,
            eventRewardGems: resolvedStage?.rewardGems || 0,
            celebrationTitle: isBoss
              ? `👑 CHEFÃO DERROTADO: ${resolvedStage?.bossName}!`
              : (isSummit
                ? `🏔️ CUME CONQUISTADO: ${resolvedStage?.title}!`
                : (resolvedStage?.celebrationTitle || resolvedStage?.name))
          };
          setLastGameResult(enhancedResult);
          saveGameResult(enhancedResult, resolvedStage);

          // Chuva de confetes
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 }
            });
          } catch (e) { /* ignore */ }
        },
        (score, height) => {
          setCurrentScore(score);
          setCurrentHeight(height);
        },
        (lives) => {
          setCurrentLives(lives);
        },
        {
          mode: activeMode,
          aiDifficulty: activeDiff,
          soloJourney: soloJourney,
          opponentData: activePvP?.opponent,
          selectedTrail: profile?.selected_trail || 'default',
          onLocalPlayerUpdate: activeMode === 'race_pvp' ? (state) => {
            multiplayerService.sendPlayerState(state);
          } : null,
          onPvPFinish: activeMode === 'race_pvp' ? (status) => {
            multiplayerService.sendGameEvent('player_finished', { status });
          } : null,
          onRaceUpdate: (stats) => {
            setRaceStats(stats);
          },
          onBoostUpdate: (energy) => {
            setBoostEnergy(energy);
          }
        }
      );

      engineRef.current = engine;
      if (activeMode === 'race_pvp') {
        engine.start();
      }
    }, 60);
  }, [activeSkin, user, settings.controlMode, updateProfile, gameMode, soloJourney, aiDifficulty, pvpMatchConfig]);

  // Sincronização de Telemetria do Duelo 1v1 PvP + Escuta de eventos de revanche
  useEffect(() => {
    if ((gameState === 'playing' || gameState === 'game_over' || gameState === 'victory') && gameMode === 'race_pvp') {
      const unsubState = multiplayerService.onPlayerState((state) => {
        engineRef.current?.updateRemoteOpponent(state);
      });

      const unsubGame = multiplayerService.onGameEvent((data) => {
        if (data.event === 'player_finished') {
          if (data.status === 'win') {
            engineRef.current?.updateRemoteOpponent({ finished: true });
          }
        } else if (data.event === 'request_rematch') {
          // O adversário pediu revanche — mostrar aviso para o outro jogador
          setRematchState('incoming');
          // Auto-declinar após 30 segundos sem resposta
          if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
          rematchTimeoutRef.current = setTimeout(() => {
            setRematchState('idle');
          }, 30000);
        } else if (data.event === 'accept_rematch') {
          // O adversário aceitou nossa revanche — reiniciar a partida!
          if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
          setRematchState('idle');
          if (pvpMatchConfig) {
            startGame(selectedStageRef.current, 'race_pvp', null, pvpMatchConfig);
          }
        } else if (data.event === 'decline_rematch' || data.event === 'player_left') {
          // O adversário recusou ou saiu — voltar ao modal PvP
          if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
          setRematchState('idle');
          setGameMode('solo');
          setPvpMatchConfig(null);
          setIsPvPModalOpen(true);
        }
      });

      return () => {
        unsubState();
        unsubGame();
      };
    }
  }, [gameState, gameMode, pvpMatchConfig]);

  // Reset automático do gameMode para 'solo' ao retornar ao menu após um duelo PvP
  useEffect(() => {
    if (gameState === 'menu' && gameMode === 'race_pvp') {
      setGameMode('solo');
      setPvpMatchConfig(null);
      setRematchState('idle');
      if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
    }
  }, [gameState, gameMode]);

  // Cleanup ao desmontar (cancela timers de revanche)
  useEffect(() => {
    return () => {
      if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
    };
  }, []);

  // Inicia Duelo 1v1 PvP a partir do PvPLobbyModal
  const handleStartPvPMatch = ({ stage, roomCode, isHost, opponent }) => {
    const config = { roomCode, isHost, opponent };
    setPvpMatchConfig(config);
    setGameMode('race_pvp');
    setIsPvPModalOpen(false);
    setRematchState('idle');
    if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
    startGame(stage, 'race_pvp', null, config);
  };

  // Solicita revanche ao adversário (mantém conexão ativa)
  const handleRequestRematch = () => {
    setRematchState('requesting');
    multiplayerService.sendGameEvent('request_rematch', {});
    // Timeout: se o adversário não responder em 30s, abrir modal normal
    if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
    rematchTimeoutRef.current = setTimeout(() => {
      setRematchState('idle');
      setGameMode('solo');
      setPvpMatchConfig(null);
      setIsPvPModalOpen(true);
    }, 30000);
  };

  // Aceitar revanche recebida
  const handleAcceptRematch = () => {
    if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
    setRematchState('idle');
    multiplayerService.sendGameEvent('accept_rematch', {});
    if (pvpMatchConfig) {
      startGame(selectedStageRef.current, 'race_pvp', null, pvpMatchConfig);
    }
  };

  // Recusar revanche
  const handleDeclineRematch = () => {
    if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
    setRematchState('idle');
    multiplayerService.sendGameEvent('decline_rematch', {});
    setGameMode('solo');
    setPvpMatchConfig(null);
    setIsPvPModalOpen(true);
  };

  // Inicia a física e o movimento apenas quando o jogador clica em DAR PLAY
  const handleStartPlay = () => {
    soundEngine.unlock();
    if (engineRef.current) {
      setGameState('playing');
      engineRef.current.start();
    }
  };

  // Teclado Fallback
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (engineRef.current && gameState === 'playing') {
        engineRef.current.handleKeyDown(e);
      }
    };
    const handleKeyUp = (e) => {
      if (engineRef.current && gameState === 'playing') {
        engineRef.current.handleKeyUp(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Pausar / Continuar
  const togglePause = () => {
    if (!engineRef.current) return;
    if (gameState === 'playing') {
      engineRef.current.pause();
      setGameState('paused');
    } else if (gameState === 'paused') {
      engineRef.current.resume();
      setGameState('playing');
    }
  };

  // Próxima fase
  const handleNextStage = () => {
    const nextNumber = (selectedStage?.number || 1) + 1;
    const stagesList = getStagesForMode(soloJourney);
    const nextStage = stagesList.find((s) => s.number === nextNumber);
    if (nextStage) {
      startGame(nextStage);
    } else {
      setGameState('menu');
    }
  };

  // Sair do jogo com confirmação customizada da plataforma
  const handleExitGame = async () => {
    if (gameState === 'playing' || gameState === 'paused') {
      const wasPlaying = gameState === 'playing';
      if (engineRef.current && wasPlaying) engineRef.current.pause();

      const confirmed = await showConfirm({
        title: 'Abandonar Fase',
        message: 'Deseja realmente sair da partida atual e retornar ao menu de fases?',
        variant: 'warning',
        confirmText: 'Sair da Partida',
        cancelText: 'Continuar Jogando'
      });

      if (confirmed) {
        if (engineRef.current) engineRef.current.stop();
        soundEngine.stopBGM(0.4);
        // Limpa estado PvP ao sair (o useEffect de gameState === 'menu' faz o reset)
        if (gameMode === 'race_pvp') {
          multiplayerService.sendGameEvent('decline_rematch', {});
          multiplayerService.leaveRoom();
          setRematchState('idle');
          if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
        }
        setGameState('menu');
      } else if (engineRef.current && wasPlaying) {
        engineRef.current.resume();
      }
    } else {
      soundEngine.stopBGM(0.4);
      if (gameMode === 'race_pvp') {
        multiplayerService.sendGameEvent('decline_rematch', {});
        multiplayerService.leaveRoom();
        setRematchState('idle');
        if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
      }
      setGameState('menu');
    }
  };

  // Restauração rápida das 42 fases conquistadas anteriormente
  const handleRestoreStages42 = async () => {
    const confirmed = await showConfirm({
      title: 'Restaurar Fases Anteriores',
      message: 'Deseja restabelecer o seu progresso liberando até a Fase 42 para ambos os modos solo (Herói e Livre)?',
      variant: 'info',
      confirmText: 'Restaurar até a Fase 42',
      cancelText: 'Cancelar'
    });

    if (confirmed && restoreStageProgress) {
      await restoreStageProgress(42, 'all');
      await showAlert({
        title: 'Fases Restauradas com Sucesso!',
        message: 'Todas as fases de 1 a 42 agora estão totalmente liberadas para você!',
        variant: 'success'
      });
    }
  };

  // Limpeza ao desmontar
  useEffect(() => {
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
      soundEngine.stopBGM(0.4);
    };
  }, []);

  return (
    <div
      className={gameState === 'menu'
        ? "w-full h-full min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
        : "w-full flex-1 flex flex-col items-center justify-start p-0.5 sm:p-1.5 h-full max-h-full overflow-hidden select-none touch-none overscroll-none"
      }
      style={gameState === 'menu' ? { WebkitOverflowScrolling: 'touch' } : undefined}
    >
      {/* 1. MENU DE SELEÇÃO DE FASES */}
      {gameState === 'menu' && (
        <div className="max-w-4xl mx-auto px-4 pt-4 pb-32 sm:py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('home')}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-all flex items-center gap-1.5 text-xs font-semibold shrink-0 active:scale-95 shadow-md"
                  title="Voltar ao Início"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Início</span>
                </button>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-6 h-6 text-cyan-400" />
                  <h1 className="text-2xl sm:text-3xl font-black text-white">Seleção de Fases</h1>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Explore as {STAGES.length} fases temáticas em modo individual ou dispute contra a máquina
                </p>
              </div>
            </div>
          </div>

          {/* SELETOR DE MODO: INDIVIDUAL vs CORRIDA vs DUELO vs MODO INFINITO */}
          <div className="glass-panel p-2.5 sm:p-3 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setGameMode('solo')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-[11px] text-center transition-all truncate ${gameMode === 'solo'
                  ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                <span>Modo Solo</span>
              </button>
              <button
                type="button"
                onClick={() => setGameMode('race_ai')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-[11px] text-center transition-all truncate ${gameMode === 'race_ai'
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-md shadow-purple-500/30 font-black'
                  : 'text-slate-400 hover:text-white'
                  }`}
              >
                <span>Vs Máquina</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPvPModalOpen(true)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-[11px] text-center transition-all truncate active:scale-95 cursor-pointer ${gameMode === 'race_pvp'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/25 font-black'
                  : 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 hover:text-white border border-rose-500/20'
                  }`}
              >
                <span>Duelo 1v1</span>
              </button>
              <button
                type="button"
                onClick={() => setGameMode('endless')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-bold text-[11px] text-center transition-all truncate flex items-center justify-center gap-1 ${gameMode === 'endless'
                  ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 text-white shadow-md shadow-orange-500/30 font-black'
                  : 'text-orange-400 hover:text-orange-300'
                  }`}
              >
                {/*<Flame className="w-3.5 h-3.5" />*/}
                <span>Infinito</span>
              </button>
            </div>

            {gameMode === 'race_ai' ? (
              <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
                <span className="text-xs text-purple-300 font-bold flex items-center gap-1">
                  <Swords className="w-3.5 h-3.5" /> Dificuldade IA:
                </span>
                <div className="flex p-1 bg-slate-900 rounded-xl border border-purple-500/30 text-[11px] font-bold">
                  {[
                    { id: 'easy', label: 'Fácil' },
                    { id: 'medium', label: 'Médio' },
                    { id: 'hard', label: 'Difícil' }
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setAiDifficulty(diff.id)}
                      className={`px-3 py-1 rounded-lg transition-all ${aiDifficulty === diff.id
                        ? 'bg-purple-500 text-white font-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                        }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : gameMode === 'endless' ? (
              <div className="text-xs text-orange-400 font-bold flex items-center gap-1">
                <Flame className="w-4 h-4 fill-current" /> Modo Sobrevivência Sem Fim com Magma Ascendente
              </div>
            ) : (
              <div className="text-xs text-slate-400 hidden md:block">
                {soloJourney === 'free'
                  ? 'Jornada Livre: 50 fases de pura escalada sem chefões com física e ritmo zen.'
                  : 'Jornada do Herói: 50 fases épicas enfrentando os 10 Titãs Guardiões.'}
              </div>
            )}
          </div>

          {/* Seletor de Conteúdo: Modo Infinito vs Grid de Fases Normais */}
          {gameMode === 'endless' ? (
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-orange-500/40 bg-gradient-to-b from-orange-950/40 via-slate-900/90 to-slate-950 shadow-2xl relative overflow-hidden text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-orange-500 to-red-600 text-white flex items-center justify-center shadow-xl shadow-orange-500/30 border border-orange-400/40 animate-pulse">
                <Flame className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase font-black text-orange-400 tracking-widest">Desafio Extremo Sem Fim</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white">Sobrevivência do Magma</h2>
                <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  O chão se transformou em um rio de magma ardente que sobe sem parar! Pule de plataforma em plataforma, colete power-ups especiais e tente bater o seu recorde de altura máxima.
                </p>
              </div>

              <div className="grid grid-cols-2 max-w-sm mx-auto gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium">Recorde Pessoal:</span>
                  <div className="text-2xl font-black text-amber-400">{profile?.endless_high_score || 0}m</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium">Suas Gemas:</span>
                  <div className="text-2xl font-black text-cyan-300">{profile?.gems || 0} 💎</div>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => startGame(ENDLESS_STAGE, 'endless')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black text-base shadow-xl shadow-orange-500/30 flex items-center gap-2 transform active:scale-95 transition-all cursor-pointer"
                >
                  <Flame className="w-5 h-5 fill-current" />
                  <span>INICIAR SOBREVIVÊNCIA</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* PAINEL EXCLUSIVO DO MODO SOLO: JORNADA LIVRE vs JORNADA DO HERÓI */}
              {gameMode === 'solo' && (
                <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950 shadow-2xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <h2 className="text-base sm:text-lg font-black text-white">Escolha o seu Estilo de Jornada Solo</h2>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Defina como deseja explorar as 50 fases cósmicas do JumpBall
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800">
                        Jornada Ativa: <strong className={soloJourney === 'free' ? 'text-emerald-400' : 'text-amber-400'}>{soloJourney === 'free' ? 'Jornada Livre 🕊️' : 'Jornada do Herói ⚔️'}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Os 2 Cards de Escolha de Jornada */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {/* CARD 1: JORNADA LIVRE */}
                    <div
                      onClick={() => handleSoloJourneyChange('free')}
                      className={`group relative rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${soloJourney === 'free'
                        ? 'border-emerald-400 bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-400/40 scale-[1.01]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shrink-0 transition-transform group-hover:scale-105 ${soloJourney === 'free'
                            ? 'bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 shadow-emerald-500/30'
                            : 'bg-slate-800 text-emerald-400 border border-slate-700'
                            }`}>
                            <Feather className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-black text-white">Jornada Livre</h3>
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                Escalada Zen
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              Subida clássica pelas 50 fases <strong>sem combates com chefões</strong>. Foco total em ritmo, física de salto e cruzar a linha de chegada no topo.
                            </p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all ${soloJourney === 'free'
                          ? 'border-emerald-400 bg-emerald-400 text-slate-950'
                          : 'border-slate-600'
                          }`}>
                          {soloJourney === 'free' && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/60 text-[10px] font-semibold text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black">Progresso: {profile?.stages_completed_free || localStore.getProfile()?.stages_completed_free || 0}/50 Fases</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-300">✓ Linha de Chegada Clássica</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 font-bold">✓ Ritmo Contínuo</span>
                      </div>
                    </div>

                    {/* CARD 2: JORNADA DO HERÓI */}
                    <div
                      onClick={() => handleSoloJourneyChange('hero')}
                      className={`group relative rounded-2xl p-4 sm:p-5 border transition-all cursor-pointer overflow-hidden flex flex-col justify-between ${soloJourney === 'hero'
                        ? 'border-amber-400 bg-gradient-to-br from-amber-950/40 via-purple-950/30 to-slate-950 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/40 scale-[1.01]'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/90'
                        }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shrink-0 transition-transform group-hover:scale-105 ${soloJourney === 'hero'
                            ? 'bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 shadow-amber-500/30'
                            : 'bg-slate-800 text-amber-400 border border-slate-700'
                            }`}>
                            <Crown className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-black text-white">Jornada do Herói</h3>
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
                                Campanha com Chefões
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              A campanha clássica lendária! Supere armadilhas e <strong>combata os 10 Titãs Guardiões</strong> a cada 5 fases ativando canhões anti-chefão.
                            </p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-all ${soloJourney === 'hero'
                          ? 'border-amber-400 bg-amber-400 text-slate-950'
                          : 'border-slate-600'
                          }`}>
                          {soloJourney === 'hero' && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-slate-800/60 text-[10px] font-semibold text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black">Progresso: {profile?.stages_completed_hero ?? localStore.getProfile()?.stages_completed_hero ?? 0}/50 Fases</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-bold">⚡ Baterias de Energia</span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 font-bold">🌌 Ataque do Multiverso</span>
                      </div>
                    </div>
                  </div>

                  {/* Banner de Restauração de Fases Anteriores */}
                  {/*{activeCompletedStages < 42 && (
                    <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs shadow-lg shadow-amber-500/5">
                      <div className="flex items-center gap-2.5 text-amber-300">
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
                        <div>
                          <strong className="block text-amber-200">Recuperar Fases Anteriores</strong>
                          <span className="text-[11px] text-slate-300">Você havia liberado até a Fase 42? Clique para restaurar seu progresso agora.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRestoreStages42}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restaurar até a Fase 42</span>
                      </button>
                    </div>
                  )}
                  */}
                </div>
              )}

              {/* Seção de Fases Comemorativas Ativas (Tempo Limitado: 7 Dias) */}
              {activeEventStages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PartyPopper className="w-5 h-5 text-pink-400 animate-bounce" />
                      <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                        Eventos & Fases Comemorativas
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30 shadow-sm">
                          Disponível por 7 Dias
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeEventStages.map((evStage) => (
                      <div
                        key={evStage.id}
                        className="relative glass-panel rounded-3xl p-5 border border-pink-500/40 bg-gradient-to-br from-pink-950/30 via-slate-900/90 to-purple-950/30 shadow-xl hover:border-pink-400/80 transition-all flex flex-col justify-between group overflow-hidden"
                      >
                        <div className="absolute -top-12 -right-12 w-36 h-36 bg-pink-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/25 transition-all" />

                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center text-2xl shadow-lg shadow-pink-500/25 shrink-0">
                                {evStage.celebrationIcon || '🎉'}
                              </div>
                              <div>
                                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
                                  {evStage.celebrationSubtitle || 'Evento Comemorativo'}
                                </span>
                                <h4 className="text-base sm:text-lg font-black text-white group-hover:text-pink-300 transition-colors leading-tight">
                                  {evStage.name}
                                </h4>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-200 font-bold whitespace-nowrap">
                                {evStage.daysRemaining} {evStage.daysRemaining === 1 ? 'dia restante' : 'dias restantes'}
                              </span>
                              <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20 shadow-sm">
                                +{evStage.rewardGems} 💎
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                            {evStage.description}
                          </p>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-slate-800/60 mt-3">
                          <span className="text-[11px] text-slate-400 font-medium">
                            Meta: <strong className="text-pink-300 font-bold">{evStage.targetHeight}m</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => startGame(evStage)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs shadow-lg shadow-pink-500/25 flex items-center gap-1.5 transform active:scale-95 transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>JOGAR EVENTO</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Seletor dos 10 Mundos Temáticos e Batalhas de Chefão */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  {soloJourney === 'free' ? (
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-white tracking-wide flex items-center gap-2">
                          MUNDOS & EXPEDIÇÕES
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                            10 Mundos · 50 Fases Livres
                          </span>
                        </h2>
                        <p className="text-xs text-slate-400">
                          Cada mundo possui 5 fases. Na 5ª fase conquiste o Cume do Mundo em pura escalada vertical!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-white tracking-wide flex items-center gap-2">
                          MUNDOS & CHEFÕES
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                            10 Mundos · 50 Fases
                          </span>
                        </h2>
                        <p className="text-xs text-slate-400">
                          Cada mundo possui 5 fases. Na 5ª fase enfrente o Chefão Guardião!
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedWorldId('all')}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${selectedWorldId === 'all'
                      ? soloJourney === 'free'
                        ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20 scale-105'
                        : 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20 scale-105'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-700/60'
                      }`}
                  >
                    Ver Todas as {activeStages.length} Fases
                  </button>
                </div>

                {/* Abas Horizontais dos Mundos com Scroll Suave */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {activeWorlds.map((w) => {
                    const completedStages = activeCompletedStages;
                    const isWorldUnlocked = w.stageRange[0] <= Math.max(1, completedStages + 1);
                    const worldStagesCompleted = Math.max(
                      0,
                      Math.min(5, completedStages - w.stageRange[0] + 1)
                    );
                    const isWorldCompleted = completedStages >= w.stageRange[1];
                    const isSelected = selectedWorldId === w.id;

                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setSelectedWorldId(w.id)}
                        className={`group relative flex items-center gap-2 px-3 py-2 rounded-2xl border shrink-0 transition-all text-left ${isSelected
                          ? soloJourney === 'free'
                            ? 'bg-slate-800/90 border-emerald-400/80 shadow-lg shadow-emerald-500/10 scale-105 ring-1 ring-emerald-400/40'
                            : 'bg-slate-800/90 border-cyan-400/80 shadow-lg shadow-cyan-500/10 scale-105 ring-1 ring-cyan-400/40'
                          : !isWorldUnlocked
                            ? 'bg-slate-900/40 border-slate-800 opacity-60 hover:opacity-80'
                            : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50'
                          }`}
                      >
                        <div
                          className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shadow-inner shrink-0"
                          style={{
                            backgroundColor: isSelected ? (soloJourney === 'free' ? '#10b981' : w.accentColor) : '#1e293b',
                            color: isSelected ? '#020617' : '#94a3b8'
                          }}
                        >
                          {isWorldCompleted ? '✓' : w.id}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-bold whitespace-nowrap ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                              {w.shortName}
                            </span>
                            {soloJourney === 'free' ? (
                              <span className="text-[10px]" title={`Cume: Fase ${w.bossStageNumber || w.summitStageNumber}`}>
                                🏔️
                              </span>
                            ) : (
                              <span className="text-[10px]" title={`Chefão: ${w.bossName}`}>
                                👑
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="w-12 h-1 bg-slate-950 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${soloJourney === 'free' ? 'bg-emerald-400' : 'bg-cyan-400'} transition-all duration-300`}
                                style={{ width: `${(worldStagesCompleted / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-[9px] font-mono text-slate-400">
                              {worldStagesCompleted}/5
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Banner Informativo do Mundo Selecionado */}
                {selectedWorldId !== 'all' && (() => {
                  const currentWorld = activeWorlds.find((w) => w.id === selectedWorldId) || activeWorlds[0];
                  return (
                    <div className="p-3.5 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-slate-900/90 via-slate-800/50 to-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-black text-white">
                            {currentWorld.name}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${soloJourney === 'free' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'}`}>
                            Fases {currentWorld.stageRange[0]} a {currentWorld.stageRange[1]}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {currentWorld.description}
                        </p>
                      </div>

                      <div className={`flex items-center gap-2 shrink-0 self-start sm:self-center px-3 py-1.5 rounded-xl border text-xs font-bold ${soloJourney === 'free'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}>
                        <span>{soloJourney === 'free' ? '🏔️' : '👑'}</span>
                        <span>
                          {soloJourney === 'free'
                            ? `Cume do Mundo: Fase ${currentWorld.bossStageNumber || currentWorld.summitStageNumber} (${currentWorld.summitName || 'Escalada Pura'})`
                            : `Chefão: ${currentWorld.bossName} (${currentWorld.bossTitle})`}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Grid das Fases Filtradas por Mundo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeStages.filter((stage) => {
                  if (selectedWorldId === 'all') return true;
                  const world = activeWorlds.find((w) => w.id === selectedWorldId);
                  if (!world) return true;
                  return stage.number >= world.stageRange[0] && stage.number <= world.stageRange[1];
                }).map((stage) => {
                  const completedStages = activeCompletedStages;
                  // Fase 1 sempre desbloqueada, subsequentes desbloqueadas se a anterior foi concluída
                  const isUnlocked = stage.number <= Math.max(1, completedStages + 1);
                  const isCompleted = stage.number <= completedStages;

                  return (
                    <StageCard
                      key={`${soloJourney}-${stage.id}`}
                      stage={stage}
                      isUnlocked={isUnlocked}
                      isCompleted={isCompleted}
                      onSelect={startGame}
                      journeyMode={soloJourney}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. TELA DO JOGO (CANVAS + HUD + CONTROLES) */}
      {gameState !== 'menu' && (
        <div className="w-full max-w-[560px] md:max-w-[640px] flex flex-col items-center justify-start h-full max-h-full py-0.5">
          {/* Top Bar / HUD do Jogo */}
          <div className="w-full mb-1 flex items-center justify-between glass-panel px-3 py-1.5 rounded-2xl border border-slate-800 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleExitGame}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Menu de Fases"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Contador de 3 Vidas */}
              <div
                className="flex items-center gap-1 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800 shadow-inner"
                title={`${currentLives} vidas restantes`}
              >
                {[1, 2, 3].map((heartNum) => (
                  <Heart
                    key={heartNum}
                    className={`w-3.5 h-3.5 transition-all duration-300 ${heartNum <= currentLives
                      ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.7)] animate-pulse'
                      : 'text-slate-600 fill-slate-800/40 opacity-30 scale-75'
                      }`}
                  />
                ))}
              </div>

              {/* Mini Medidor de Impulso ao lado das Vidas */}
              <div
                className={`flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded-xl border transition-all duration-200 shadow-inner ${boostEnergy >= 95
                  ? 'border-amber-500/50 bg-amber-950/20 shadow-[0_0_8px_rgba(251,191,36,0.25)]'
                  : 'border-slate-800'
                  }`}
                title={`Carga de Impulso: ${boostEnergy}%`}
              >
                <Zap className={`w-3.5 h-3.5 shrink-0 transition-all ${boostEnergy >= 95
                  ? 'text-amber-400 fill-amber-400 animate-pulse drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]'
                  : boostEnergy > 20
                    ? 'text-cyan-400'
                    : 'text-slate-500'
                  }`} />
                <div className="w-10 sm:w-14 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80 p-[0.5px]">
                  <div
                    className={`h-full rounded-full transition-all duration-150 ${boostEnergy >= 95
                      ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse'
                      : boostEnergy > 25
                        ? 'bg-gradient-to-r from-cyan-500 to-sky-400'
                        : 'bg-gradient-to-r from-slate-600 to-slate-500'
                      }`}
                    style={{ width: `${boostEnergy}%` }}
                  />
                </div>
                <span className={`text-[10px] font-mono font-bold leading-none shrink-0 ${boostEnergy >= 95
                  ? 'text-amber-400 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]'
                  : boostEnergy > 20
                    ? 'text-cyan-300'
                    : 'text-slate-500'
                  }`}>
                  {boostEnergy}%
                </span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block leading-none mb-0.5">
                {gameMode === 'race_ai' ? '⚡ Corrida 1v1 • ' : ''}Fase {selectedStage?.number}
              </span>
              <span className="text-base sm:text-lg font-black text-amber-400 leading-tight">
                {currentScore.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">pts</span>
              </span>
            </div>

            {gameState === 'ready' ? (
              <div className="w-7 h-7 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold animate-pulse" title="Aguardando Play">
                ▶
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title={isAudioMuted ? 'Ativar Música e Áudio' : 'Mutar Música e Áudio'}
                >
                  {isAudioMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-cyan-300" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={togglePause}
                  className="p-1.5 rounded-xl bg-slate-800/80 text-cyan-300 hover:bg-slate-700 transition-colors"
                  title={gameState === 'paused' ? 'Continuar' : 'Pausar'}
                >
                  {gameState === 'paused' ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* Painel do Modo Corrida 1v1 (vs Máquina ou vs Oponente Real) */}
          {(gameMode === 'race_ai' || gameMode === 'race_pvp') && (
            <div className={`w-full mb-1 glass-panel px-3 py-1 rounded-2xl border shrink-0 flex items-center justify-between text-xs shadow-md ${gameMode === 'race_pvp'
              ? 'border-rose-500/40 bg-rose-950/30'
              : 'border-purple-500/30 bg-purple-950/30'
              }`}>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${gameMode === 'race_pvp'
                  ? 'bg-rose-500/25 border-rose-400/40 text-rose-300'
                  : 'bg-purple-500/25 border-purple-400/40 text-purple-300'
                  }`}>
                  <Swords className="w-3 h-3 text-pink-400" /> {gameMode === 'race_pvp' ? 'Duelo PvP' : 'Corrida'}
                </span>
                <span className="text-[11px] font-bold">
                  {raceStats.leader === 'player' ? (
                    <span className="text-emerald-400">Você lidera (+{raceStats.distanceDiff}m)</span>
                  ) : raceStats.leader === 'opponent' ? (
                    <span className="text-rose-400">@{raceStats.opponentName || 'Oponente'} lidera ({Math.abs(raceStats.distanceDiff)}m)</span>
                  ) : raceStats.leader === 'bot' ? (
                    <span className="text-rose-400">Bot lidera ({Math.abs(raceStats.distanceDiff)}m)</span>
                  ) : (
                    <span className="text-amber-400">Empate</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-purple-200 font-semibold">
                <span>{gameMode === 'race_pvp' ? `⚔️ @${raceStats.opponentName || 'Oponente'}` : '🤖 IA'}: {raceStats.botHeight}m</span>
                <div className="flex items-center gap-0.5" title={`${raceStats.botLives} vidas restantes`}>
                  {[1, 2, 3].map((num) => (
                    <Heart
                      key={num}
                      className={`w-3 h-3 ${num <= raceStats.botLives ? (gameMode === 'race_pvp' ? 'text-rose-400 fill-rose-400' : 'text-purple-400 fill-purple-400') : 'text-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Barra de Progresso até a Meta da Fase ou Indicador do Modo Infinito / Boss Fight */}
          <div className="w-full mb-1 px-1 shrink-0">
            {selectedStage?.isBossStage && soloJourney !== 'free' ? (
              <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/50 px-2.5 py-0.5 rounded-lg border border-slate-800/60 backdrop-blur-xs">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <span className="text-[10px] opacity-75">👑</span>
                  <span className="text-xs font-semibold">{selectedStage.bossName} <span className="text-slate-500 font-normal">· Subida Infinita</span></span>
                </span>
                <span className="text-slate-400 font-medium">
                  Altura: <strong className="text-cyan-400/90 font-bold">{currentHeight}m</strong>
                </span>
              </div>
            ) : gameMode === 'endless' ? (
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300 bg-orange-950/40 px-3 py-1 rounded-xl border border-orange-500/30">
                <span className="flex items-center gap-1 text-orange-400">
                  <Flame className="w-3.5 h-3.5 fill-orange-400" /> Altura: <strong>{currentHeight}m</strong>
                </span>
                <span className="text-amber-300">
                  Recorde: <strong>{Math.max(currentHeight, profile?.endless_high_score || 0)}m</strong>
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-0.5">
                  <span>Altura: <strong className="text-cyan-300">{currentHeight}m</strong></span>
                  {gameMode === 'race_ai' && (
                    <span className="text-purple-300">Bot: <strong>{raceStats.botHeight}m</strong></span>
                  )}
                  {gameMode === 'race_pvp' && (
                    <span className="text-rose-300">@{raceStats.opponentName || pvpMatchConfig?.opponent?.username || 'Adversário'}: <strong>{raceStats.botHeight}m</strong></span>
                  )}
                  <span>Meta: <strong className="text-amber-400">{selectedStage?.targetHeight}m</strong></span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 transition-all duration-100"
                    style={{
                      width: `${Math.min(100, (currentHeight / (selectedStage?.targetHeight || 1)) * 100)}%`
                    }}
                  />
                </div>
              </>
            )}
          </div>

          {/* Viewport do Canvas do Jogo com Controle de Toque na Tela (100% da Área Disponível) */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full flex-1 min-h-0 h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex justify-center items-center cursor-pointer touch-none select-none"
          >
            <canvas
              id="gameCanvas"
              ref={canvasRef}
              className="w-full h-full block pointer-events-none"
            />

            {/* Feedback Visual Sutil de Toque nas Laterais */}
            {gameState === 'playing' && (
              <>
                <div
                  className={`absolute inset-y-0 left-0 w-1/3 pointer-events-none transition-opacity duration-150 flex items-center justify-start pl-3 z-10 ${activeTouchSide === 'left' ? 'opacity-100 bg-gradient-to-r from-cyan-500/10 to-transparent' : 'opacity-0'
                    }`}
                >
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 animate-pulse">
                    ◀
                  </div>
                </div>

                <div
                  className={`absolute inset-y-0 right-0 w-1/3 pointer-events-none transition-opacity duration-150 flex items-center justify-end pr-3 z-10 ${activeTouchSide === 'right' ? 'opacity-100 bg-gradient-to-l from-cyan-500/10 to-transparent' : 'opacity-0'
                    }`}
                >
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 animate-pulse">
                    ▶
                  </div>
                </div>
              </>
            )}

            {/* Overlay Inicial de Prontidão: O jogo só inicia a física após o clique em DAR PLAY */}
            {gameState === 'ready' && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in z-20">
                <div className={`w-16 h-16 rounded-3xl ${gameMode === 'race_ai'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-purple-500/20'
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-cyan-500/20'
                  } flex items-center justify-center shadow-2xl animate-pulse`}>
                  {gameMode === 'race_ai' ? (
                    <Bot className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 fill-current ml-1" />
                  )}
                </div>

                <div>
                  <span className={`text-[10px] uppercase font-bold tracking-widest block ${gameMode === 'race_ai'
                    ? 'text-purple-400'
                    : soloJourney === 'free'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                    }`}>
                    {gameMode === 'race_ai'
                      ? `Corrida 1v1 vs Máquina • ${aiDifficulty.toUpperCase()}`
                      : soloJourney === 'free'
                        ? 'Modo Solo • Jornada Livre (Escalada Pura)'
                        : 'Modo Solo • Jornada do Herói (Com Chefões)'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Fase {selectedStage?.number}: {selectedStage?.title}
                  </h2>
                </div>

                <div className="glass-card rounded-2xl p-3.5 w-full max-w-xs border border-slate-800 text-xs text-slate-300 space-y-1.5 text-left">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-400">Meta de Chegada:</span>
                    <span className="text-amber-400 font-bold">{selectedStage?.targetHeight}m</span>
                  </div>
                  {gameMode === 'race_ai' && (
                    <div className="flex justify-between font-semibold text-purple-300">
                      <span className="text-slate-400">Oponente IA:</span>
                      <span className="font-bold">Bot Cibernético ({aiDifficulty})</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-400">Velocidade:</span>
                    <span className="text-cyan-300 font-bold">{selectedStage?.speedFactor}x</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                    {selectedStage?.mechanic}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 w-60 pt-2">
                  <button
                    onClick={handleStartPlay}
                    className={`w-full py-4 rounded-2xl ${gameMode === 'race_ai'
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 hover:from-purple-400 hover:to-rose-400 text-white shadow-purple-500/30'
                      : 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/30'
                      } font-black text-base flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all`}
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>LARGADA / PLAY</span>
                  </button>

                  <button
                    onClick={handleExitGame}
                    className="py-2 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Voltar às Fases
                  </button>
                </div>
              </div>
            )}

            {/* Overlay de Pausa */}
            {gameState === 'paused' && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                  <Pause className="w-7 h-7" />
                </div>
                <h2 className="text-2xl font-black text-white">Partida Pausada</h2>
                <div className="flex flex-col gap-2.5 w-48">
                  <button
                    onClick={togglePause}
                    className="py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20"
                  >
                    Continuar
                  </button>
                  <button
                    onClick={() => startGame(selectedStage)}
                    className="py-2.5 rounded-xl glass-card text-white hover:bg-slate-800 text-xs font-semibold"
                  >
                    Reiniciar Fase
                  </button>
                  <button
                    onClick={handleExitGame}
                    className="py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                  >
                    Escolher Outra Fase
                  </button>
                </div>
              </div>
            )}

            {/* Overlay de Revanche Recebida (adversário pediu revanche) */}
            {(gameState === 'game_over' || gameState === 'victory') && gameMode === 'race_pvp' && rematchState === 'incoming' && (
              <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-5 animate-fade-in z-30">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center shadow-xl shadow-rose-500/20 animate-pulse">
                  <Swords className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-widest text-rose-400 block mb-1">⚔️ Pedido de Revanche!</span>
                  <h2 className="text-2xl font-black text-white">
                    @{pvpMatchConfig?.opponent?.username || 'Adversário'} quer a revanche!
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Aceita disputar a mesma fase novamente?</p>
                </div>
                <div className="flex flex-col gap-2.5 w-64">
                  <button
                    onClick={handleAcceptRematch}
                    className="py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>ACEITAR REVANCHE!</span>
                  </button>
                  <button
                    onClick={handleDeclineRematch}
                    className="py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold active:scale-95 transition-all"
                  >
                    Recusar e Voltar ao Menu
                  </button>
                </div>
              </div>
            )}

            {/* Overlay de Game Over */}
            {gameState === 'game_over' && rematchState !== 'incoming' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in z-20">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center border ${lastGameResult?.isEndless
                  ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                  {lastGameResult?.isEndless ? <Flame className="w-8 h-8 fill-current" /> : <Skull className="w-8 h-8" />}
                </div>

                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-rose-400">
                    {lastGameResult?.isEndless
                      ? '🌋 Fim da Sobrevivência!'
                      : (lastGameResult?.isPvP
                        ? `@${pvpMatchConfig?.opponent?.username || 'Adversário'} venceu o duelo!`
                        : (lastGameResult?.isRace
                          ? (lastGameResult?.winner === 'bot' ? 'A Máquina Alcançou a Meta Primeiro!' : 'Queda no Percurso!')
                          : 'A gravidade venceu!'))}
                  </span>
                  <h2 className="text-3xl font-black text-white">
                    {lastGameResult?.isEndless
                      ? 'O Magma Te Alcançou!'
                      : (lastGameResult?.isPvP ? 'Derrota no Duelo 1v1' : (lastGameResult?.isRace ? 'Derrota na Corrida' : 'Game Over'))}
                  </h2>
                </div>

                <div className="p-4 rounded-2xl glass-card w-full max-w-xs space-y-2 border border-slate-800 text-left text-xs">
                  {lastGameResult?.isPvP && (
                    <div className="flex justify-between pb-1 border-b border-rose-500/30 text-rose-300 font-bold">
                      <span>Adversário:</span>
                      <span>⚔️ @{pvpMatchConfig?.opponent?.username || 'Adversário'}</span>
                    </div>
                  )}
                  {lastGameResult?.isRace && !lastGameResult?.isPvP && (
                    <div className="flex justify-between pb-1 border-b border-purple-500/30 text-purple-300 font-bold">
                      <span>Vencedor:</span>
                      <span className="text-rose-400">🤖 Bot IA ({aiDifficulty})</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">{lastGameResult?.isEndless ? 'Altura Conquistada:' : 'Sua Altura:'}</span>
                    <span className="font-bold text-cyan-300">{lastGameResult?.maxHeight}m</span>
                  </div>
                  {lastGameResult?.isEndless && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Recorde Pessoal:</span>
                      <span className="font-bold text-amber-400">{Math.max(profile?.endless_high_score || 0, lastGameResult?.maxHeight || 0)}m</span>
                    </div>
                  )}
                  {(lastGameResult?.isRace || lastGameResult?.isPvP) && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">{lastGameResult?.isPvP ? 'Altura do Adversário:' : 'Altura da IA:'}</span>
                      <span className="font-bold text-purple-400">{lastGameResult?.botHeight || 0}m</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pontuação:</span>
                    <span className="font-bold text-amber-400">{lastGameResult?.score?.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Gemas Coletadas:</span>
                    <span className="font-bold text-cyan-300">+{lastGameResult?.gems || 0} 💎</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total de Saltos:</span>
                    <span className="font-bold text-slate-200">{lastGameResult?.jumps}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-56">
                  {gameMode === 'race_pvp' ? (
                    <>
                      {rematchState === 'requesting' ? (
                        <div className="py-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 animate-pulse">
                          <Swords className="w-4 h-4" />
                          <span>Aguardando resposta...</span>
                        </div>
                      ) : (
                        <button
                          onClick={handleRequestRematch}
                          className="py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all"
                        >
                          <Swords className="w-4 h-4" />
                          <span>PEDIR REVANCHE</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => startGame(lastGameResult?.isEndless ? ENDLESS_STAGE : selectedStage, lastGameResult?.isEndless ? 'endless' : null)}
                      className={`py-3.5 rounded-2xl ${lastGameResult?.isEndless
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 shadow-orange-500/25'
                          : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 shadow-rose-500/25'
                        } text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{lastGameResult?.isEndless ? 'JOGAR NOVAMENTE' : 'TENTAR NOVAMENTE'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (gameMode === 'race_pvp') {
                        multiplayerService.sendGameEvent('decline_rematch', {});
                        multiplayerService.leaveRoom();
                        setRematchState('idle');
                        if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
                      }
                      setGameState('menu');
                    }}
                    className="py-2.5 rounded-xl glass-card text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Voltar ao Menu
                  </button>
                </div>
              </div>
            )}

            {/* Overlay de Vitória */}
            {gameState === 'victory' && rematchState !== 'incoming' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in z-20">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Trophy className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                    {lastGameResult?.isEvent
                      ? `🎉 ${lastGameResult?.celebrationTitle || 'Evento Festivo Conquistado!'}`
                      : lastGameResult?.isPvP
                        ? `🏆 Você superou @${pvpMatchConfig?.opponent?.username || lastGameResult?.opponentName || 'Adversário'}!`
                        : (lastGameResult?.isRace ? 'Vitória Épica na Corrida!' : 'Meta Alcançada com Sucesso!')}
                  </span>
                  <h2 className="text-3xl font-black text-white">
                    {lastGameResult?.isEvent
                      ? 'Recompensa Festiva Liberada!'
                      : lastGameResult?.isPvP
                        ? 'Vitória no Duelo 1v1!'
                        : lastGameResult?.isBossStage
                          ? 'Chefão Derrotado!'
                          : lastGameResult?.isSummitStage
                            ? 'Cume Conquistado!'
                            : (lastGameResult?.isRace ? 'Você Venceu a Máquina!' : 'Fase Concluída!')}
                  </h2>
                </div>

                <div className="p-4 rounded-2xl glass-card w-full max-w-xs space-y-2 border border-slate-800 text-left text-xs">
                  {lastGameResult?.isEvent && (
                    <div className="flex justify-between pb-1 border-b border-pink-500/30 text-pink-300 font-bold">
                      <span>Bônus Comemorativo:</span>
                      <span className="text-amber-400 font-black">+{lastGameResult?.eventRewardGems || 500} 💎</span>
                    </div>
                  )}
                  {lastGameResult?.isPvP && (
                    <div className="flex justify-between pb-1 border-b border-emerald-500/30 text-emerald-400 font-bold">
                      <span>Adversário:</span>
                      <span>⚔️ @{pvpMatchConfig?.opponent?.username || 'Adversário'}</span>
                    </div>
                  )}
                  {lastGameResult?.isRace && !lastGameResult?.isPvP && (
                    <div className="flex justify-between pb-1 border-b border-emerald-500/30 text-emerald-400 font-bold">
                      <span>Resultado 1v1:</span>
                      <span>🏆 1º Lugar (Piloto Campeão)</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pontuação Total:</span>
                    <span className="font-black text-amber-400">{lastGameResult?.score?.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sua Altura:</span>
                    <span className="font-bold text-cyan-300">{lastGameResult?.maxHeight}m</span>
                  </div>
                  {(lastGameResult?.isRace || lastGameResult?.isPvP) && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Altura do Adversário:</span>
                      <span className="font-bold text-rose-400">{lastGameResult?.botHeight || 0}m</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Gemas Coletadas:</span>
                    <span className="font-bold text-cyan-300">+{lastGameResult?.gems || 0} 💎</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Tempo de Subida:</span>
                    <span className="font-bold text-slate-200">{lastGameResult?.duration}s</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-56">
                  {lastGameResult?.isEvent ? (
                    <button
                      onClick={() => setGameState('menu')}
                      className="py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white font-black text-sm shadow-xl shadow-pink-500/25 flex items-center justify-center gap-1.5 cursor-pointer transform active:scale-95 transition-all"
                    >
                      <PartyPopper className="w-4 h-4" />
                      <span>COLETAR E VOLTAR AO MENU</span>
                    </button>
                  ) : lastGameResult?.isPvP ? (
                    <>
                      {rematchState === 'requesting' ? (
                        <div className="py-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-sm flex items-center justify-center gap-2 animate-pulse">
                          <Swords className="w-4 h-4" />
                          <span>Aguardando resposta de @{pvpMatchConfig?.opponent?.username || 'Adversário'}...</span>
                        </div>
                      ) : (
                        <button
                          onClick={handleRequestRematch}
                          className="py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-rose-500/25 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                        >
                          <Swords className="w-4 h-4" />
                          <span>PEDIR REVANCHE</span>
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={handleNextStage}
                      className="py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-1.5"
                    >
                      <span>PRÓXIMA FASE</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {!lastGameResult?.isPvP && (
                    <button
                      onClick={() => startGame(selectedStage)}
                      className="py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                    >
                      {lastGameResult?.isRace ? 'Correr Novamente' : 'Repetir Fase'}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (gameMode === 'race_pvp') {
                        multiplayerService.sendGameEvent('decline_rematch', {});
                        multiplayerService.leaveRoom();
                        setRematchState('idle');
                        if (rematchTimeoutRef.current) clearTimeout(rematchTimeoutRef.current);
                      }
                      setGameState('menu');
                    }}
                    className="py-1 rounded-xl text-slate-500 hover:text-slate-300 text-[11px]"
                  >
                    Menu de Fases
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DE DUELO 1V1 PVP */}
      <PvPLobbyModal
        isOpen={isPvPModalOpen}
        onClose={() => setIsPvPModalOpen(false)}
        onStartPvPMatch={handleStartPvPMatch}
        currentStage={selectedStage || STAGES[0]}
        userProfile={profile || { id: user?.id, username: user?.email?.split('@')[0] || 'Piloto' }}
        activeSkin={activeSkin}
        initialRoomCode={challengeCodeFromUrl}
      />
    </div>
  );
}
