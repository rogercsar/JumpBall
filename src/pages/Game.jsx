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
  Flag
} from 'lucide-react';
import { GameEngine } from '../game/engine';
import { STAGES, BALL_SKINS } from '../game/stages';
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
import { supabase, isSupabaseConfigured, localStore } from '../lib/supabase';

export function Game({ onNavigate }) {
  const { profile, user, updateProfile } = useAuth();
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

  // Modo de Jogo: 'solo' (Individual) ou 'race_ai' (Corrida Contra a Máquina)
  const [gameMode, setGameMode] = useState('solo');
  const [aiDifficulty, setAiDifficulty] = useState('medium'); // 'easy' | 'medium' | 'hard'
  const [raceStats, setRaceStats] = useState({
    playerHeight: 0,
    botHeight: 0,
    distanceDiff: 0,
    leader: 'tied',
    botLives: 3
  });

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

    // Deslizar para cima (Swipe Up) dispara Super Salto
    const deltaY = touchStateRef.current.startY - e.clientY;
    if (deltaY > 45) {
      engineRef.current?.triggerGestureJump();
      touchStateRef.current.startY = e.clientY;
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

    // Recupera o maior progresso registrado
    const localProf = localStore.getProfile();
    const currentCompleted = Math.max(
      profileRef.current?.stages_completed || 0,
      profile?.stages_completed || 0,
      localProf.stages_completed || 0
    );

    // Se concluiu a fase, avança as fases concluídas garantindo o desbloqueio da próxima!
    const newStagesCompleted = isWin ? Math.max(currentCompleted, stageNumber) : currentCompleted;
    const newHighScore = Math.max(profileRef.current?.high_score || 0, localProf.high_score || 0, scoreVal);
    const newTotalJumps = (profileRef.current?.total_jumps || localProf.total_jumps || 0) + jumpsVal;
    const newGamesPlayed = (profileRef.current?.games_played || localProf.games_played || 0) + 1;

    const payload = {
      userId: user?.id || null,
      user_id: user?.id || null,
      stageId: stageNumber,
      stage_id: stageNumber,
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
      stages_completed: newStagesCompleted,
      high_score: newHighScore,
      total_jumps: newTotalJumps,
      games_played: newGamesPlayed
    };

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

      // Se venceu a fase, assegura a persistência na nuvem imediatamente
      if (isWin) {
        try {
          const { error: profError } = await supabase.from('profiles').upsert({
            id: user.id,
            stages_completed: newStagesCompleted,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
          if (profError) console.warn('Aviso: Erro ao atualizar stages_completed no Supabase:', profError);
        } catch (err) {
          console.warn('Aviso ao sincronizar stages_completed:', err);
        }
      }
    }
  };

  // Prepara a fase no modo 'ready' aguardando o clique em DAR PLAY
  const startGame = useCallback((stage, modeOverride = null, diffOverride = null) => {
    const activeMode = modeOverride || gameMode;
    const activeDiff = diffOverride || aiDifficulty;

    setSelectedStage(stage);
    selectedStageRef.current = stage;
    setGameState('ready');
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
      botLives: 3
    });

    // Timeout breve para o Canvas renderizar no DOM
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const engine = new GameEngine(
        canvas,
        stage,
        activeSkin,
        (result) => {
          setGameState('game_over');
          setLastGameResult(result);
          saveGameResult(result, stage);
        },
        (result) => {
          setGameState('victory');
          setLastGameResult(result);
          saveGameResult(result, stage);

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
          onRaceUpdate: (stats) => {
            setRaceStats(stats);
          },
          onBoostUpdate: (energy) => {
            setBoostEnergy(energy);
          }
        }
      );

      engineRef.current = engine;
    }, 60);
  }, [activeSkin, user, settings.controlMode, updateProfile, gameMode, aiDifficulty]);

  // Inicia a física e o movimento apenas quando o jogador clica em DAR PLAY
  const handleStartPlay = () => {
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
    const nextStage = STAGES.find((s) => s.number === nextNumber);
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
        setGameState('menu');
      } else if (engineRef.current && wasPlaying) {
        engineRef.current.resume();
      }
    } else {
      setGameState('menu');
    }
  };

  // Limpeza ao desmontar
  useEffect(() => {
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
      }
    };
  }, []);

  return (
    <div 
      className={gameState === 'menu' 
        ? "w-full h-full min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain" 
        : "w-full flex-1 flex flex-col items-center justify-center p-1 sm:p-2 h-full max-h-full overflow-hidden select-none touch-none overscroll-none"
      }
      style={gameState === 'menu' ? { WebkitOverflowScrolling: 'touch' } : undefined}
    >
      {/* 1. MENU DE SELEÇÃO DE FASES (20 Fases) */}
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
                  Explore as 20 fases temáticas em modo individual ou dispute contra a máquina
                </p>
              </div>
            </div>
          </div>

          {/* SELETOR DE MODO: INDIVIDUAL vs CORRIDA CONTRA A MÁQUINA */}
          <div className="glass-panel p-2.5 sm:p-3 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xl">
            <div className="flex p-1 bg-slate-900/90 rounded-xl border border-slate-800 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setGameMode('solo')}
                className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  gameMode === 'solo'
                    ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🏃 Modo Solo (Individual)</span>
              </button>
              <button
                type="button"
                onClick={() => setGameMode('race_ai')}
                className={`flex-1 md:flex-initial px-4 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  gameMode === 'race_ai'
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-md shadow-purple-500/30 font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>⚡ Corrida vs Máquina (1v1)</span>
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
                    { id: 'hard', label: 'Difícil 🔥' }
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setAiDifficulty(diff.id)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        aiDifficulty === diff.id
                          ? 'bg-purple-500 text-white font-black shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 hidden md:block">
                Subida individual por 20 biomas cósmicos com pontuação e recordes.
              </div>
            )}
          </div>

          {/* Grid das 10 Fases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAGES.map((stage) => {
              const completedStages = profile?.stages_completed || 0;
              // Fase 1 sempre desbloqueada, subsequentes desbloqueadas se a anterior foi concluída
              const isUnlocked = stage.number <= Math.max(1, completedStages + 1);
              const isCompleted = stage.number <= completedStages;

              return (
                <StageCard
                  key={stage.id}
                  stage={stage}
                  isUnlocked={isUnlocked}
                  isCompleted={isCompleted}
                  onSelect={startGame}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* 2. TELA DO JOGO (CANVAS + HUD + CONTROLES) */}
      {gameState !== 'menu' && (
        <div className="w-full max-w-[520px] flex flex-col items-center justify-center h-full max-h-full py-0.5">
          {/* Top Bar / HUD do Jogo */}
          <div className="w-full mb-1 flex items-center justify-between glass-panel px-3 py-1.5 rounded-2xl border border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
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
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      heartNum <= currentLives
                        ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.7)] animate-pulse'
                        : 'text-slate-600 fill-slate-800/40 opacity-30 scale-75'
                    }`}
                  />
                ))}
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
              <button
                onClick={togglePause}
                className="p-1.5 rounded-xl bg-slate-800/80 text-cyan-300 hover:bg-slate-700 transition-colors"
                title={gameState === 'paused' ? 'Continuar' : 'Pausar'}
              >
                {gameState === 'paused' ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* HUD de Duelo da Corrida vs Máquina */}
          {gameMode === 'race_ai' && (
            <div className="w-full mb-1 glass-panel px-3 py-1 rounded-2xl border border-purple-500/30 bg-purple-950/30 shrink-0 flex items-center justify-between text-xs shadow-md">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-purple-500/25 border border-purple-400/40 text-purple-300 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Swords className="w-3 h-3 text-pink-400" /> Corrida
                </span>
                <span className="text-[11px] font-bold">
                  {raceStats.leader === 'player' ? (
                    <span className="text-emerald-400">Você lidera (+{raceStats.distanceDiff}m)</span>
                  ) : raceStats.leader === 'bot' ? (
                    <span className="text-rose-400">Bot lidera ({Math.abs(raceStats.distanceDiff)}m)</span>
                  ) : (
                    <span className="text-amber-400">Empate</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-purple-200 font-semibold">
                <span>🤖 IA: {raceStats.botHeight}m</span>
                <div className="flex items-center gap-0.5" title={`${raceStats.botLives} vidas da IA`}>
                  {[1, 2, 3].map((num) => (
                    <Heart
                      key={num}
                      className={`w-3 h-3 ${num <= raceStats.botLives ? 'text-purple-400 fill-purple-400' : 'text-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Barra de Progresso até a Meta da Fase */}
          <div className="w-full mb-1 px-1 shrink-0">
            <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-0.5">
              <span>Altura: <strong className="text-cyan-300">{currentHeight}m</strong></span>
              {gameMode === 'race_ai' && (
                <span className="text-purple-300">Bot: <strong>{raceStats.botHeight}m</strong></span>
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
          </div>

          {/* Barra de Progresso de Carga do Super Impulso */}
          <div className="w-full mb-1.5 px-1 shrink-0">
            <div className="flex items-center justify-between text-[10px] font-bold mb-0.5">
              <div className="flex items-center gap-1">
                <Zap className={`w-3 h-3 ${boostEnergy >= 95 ? 'text-amber-400 animate-pulse fill-amber-400' : 'text-cyan-400'}`} />
                <span className={boostEnergy >= 95 ? 'text-amber-300 font-black tracking-wide' : 'text-slate-300'}>
                  {boostEnergy >= 95 ? 'SUPER IMPULSO PRONTO!' : 'CARGA DE IMPULSO'}
                </span>
              </div>
              <span className={`font-mono text-[11px] ${
                boostEnergy >= 95 
                  ? 'text-amber-400 font-black drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' 
                  : boostEnergy > 20 
                    ? 'text-cyan-300 font-semibold' 
                    : 'text-slate-500 font-semibold'
              }`}>
                {boostEnergy}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950/80 rounded-full overflow-hidden border border-slate-800/80 p-[1px] shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-150 ${
                  boostEnergy >= 95
                    ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 shadow-[0_0_12px_rgba(244,63,94,0.7)] animate-pulse'
                    : boostEnergy > 25
                      ? 'bg-gradient-to-r from-cyan-500 to-sky-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                      : 'bg-gradient-to-r from-slate-600 to-slate-500'
                }`}
                style={{ width: `${boostEnergy}%` }}
              />
            </div>
          </div>

          {/* Viewport do Canvas do Jogo com Controle de Toque na Tela */}
          <div 
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex justify-center items-center flex-1 min-h-0 max-h-[calc(100dvh-4.6rem)] md:max-h-[calc(100dvh-5.2rem)] cursor-pointer touch-none select-none"
          >
            <canvas
              id="gameCanvas"
              ref={canvasRef}
              className="w-auto h-full max-h-full aspect-[440/720] block object-contain pointer-events-none"
            />

            {/* Feedback Visual Sutil de Toque nas Laterais */}
            {gameState === 'playing' && (
              <>
                <div 
                  className={`absolute inset-y-0 left-0 w-1/3 pointer-events-none transition-opacity duration-150 flex items-center justify-start pl-3 z-10 ${
                    activeTouchSide === 'left' ? 'opacity-100 bg-gradient-to-r from-cyan-500/10 to-transparent' : 'opacity-0'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20 animate-pulse">
                    ◀
                  </div>
                </div>

                <div 
                  className={`absolute inset-y-0 right-0 w-1/3 pointer-events-none transition-opacity duration-150 flex items-center justify-end pr-3 z-10 ${
                    activeTouchSide === 'right' ? 'opacity-100 bg-gradient-to-l from-cyan-500/10 to-transparent' : 'opacity-0'
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
                <div className={`w-16 h-16 rounded-3xl ${
                  gameMode === 'race_ai' 
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
                  <span className={`text-[10px] uppercase font-bold tracking-widest block ${
                    gameMode === 'race_ai' ? 'text-purple-400' : 'text-cyan-400'
                  }`}>
                    {gameMode === 'race_ai' ? `Corrida 1v1 vs Máquina • ${aiDifficulty.toUpperCase()}` : 'Modo Individual'}
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
                    className={`w-full py-4 rounded-2xl ${
                      gameMode === 'race_ai'
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

            {/* Overlay de Game Over */}
            {gameState === 'game_over' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in z-20">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                  <Skull className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">
                    {lastGameResult?.isRace 
                      ? (lastGameResult?.winner === 'bot' ? 'A Máquina Alcançou a Meta Primeiro!' : 'Queda no Percurso!') 
                      : 'A gravidade venceu!'}
                  </span>
                  <h2 className="text-3xl font-black text-white">
                    {lastGameResult?.isRace ? 'Derrota na Corrida' : 'Game Over'}
                  </h2>
                </div>

                <div className="p-4 rounded-2xl glass-card w-full max-w-xs space-y-2 border border-slate-800 text-left text-xs">
                  {lastGameResult?.isRace && (
                    <div className="flex justify-between pb-1 border-b border-purple-500/30 text-purple-300 font-bold">
                      <span>Vencedor:</span>
                      <span className="text-rose-400">🤖 Bot IA ({aiDifficulty})</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sua Altura:</span>
                    <span className="font-bold text-cyan-300">{lastGameResult?.maxHeight}m</span>
                  </div>
                  {lastGameResult?.isRace && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Altura da IA:</span>
                      <span className="font-bold text-purple-400">{lastGameResult?.botHeight || 0}m</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pontuação:</span>
                    <span className="font-bold text-amber-400">{lastGameResult?.score?.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Total de Saltos:</span>
                    <span className="font-bold text-slate-200">{lastGameResult?.jumps}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-56">
                  <button
                    onClick={() => startGame(selectedStage)}
                    className={`py-3.5 rounded-2xl ${
                      lastGameResult?.isRace
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 shadow-purple-500/25'
                        : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 shadow-rose-500/25'
                    } text-white font-black text-sm shadow-xl flex items-center justify-center gap-2`}
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{lastGameResult?.isRace ? 'REVANCHE IMEDIATA' : 'TENTAR NOVAMENTE'}</span>
                  </button>
                  <button
                    onClick={() => setGameState('menu')}
                    className="py-2.5 rounded-xl glass-card text-slate-300 hover:text-white text-xs font-semibold"
                  >
                    Voltar às Fases
                  </button>
                </div>
              </div>
            )}

            {/* Overlay de Vitória */}
            {gameState === 'victory' && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in z-20">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Trophy className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                    {lastGameResult?.isRace ? 'Vitória Épica na Corrida!' : 'Meta Alcançada com Sucesso!'}
                  </span>
                  <h2 className="text-3xl font-black text-white">
                    {lastGameResult?.isRace ? 'Você Venceu a Máquina!' : 'Fase Concluída!'}
                  </h2>
                </div>

                <div className="p-4 rounded-2xl glass-card w-full max-w-xs space-y-2 border border-slate-800 text-left text-xs">
                  {lastGameResult?.isRace && (
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
                  {lastGameResult?.isRace && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Altura do Bot IA:</span>
                      <span className="font-bold text-purple-400">{lastGameResult?.botHeight || 0}m</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tempo de Subida:</span>
                    <span className="font-bold text-slate-200">{lastGameResult?.duration}s</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-56">
                  <button
                    onClick={handleNextStage}
                    className="py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-1.5"
                  >
                    <span>PRÓXIMA FASE</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => startGame(selectedStage)}
                    className="py-2 rounded-xl text-slate-400 hover:text-white text-xs"
                  >
                    {lastGameResult?.isRace ? 'Correr Novamente' : 'Repetir Fase'}
                  </button>
                  <button
                    onClick={() => setGameState('menu')}
                    className="py-1 rounded-xl text-slate-500 hover:text-slate-300 text-[11px]"
                  >
                    Menu de Fases
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dica discreta de Controles (Toque Direto na Tela ou Teclado) */}
          <div className="mt-1 text-center text-[10px] text-slate-500 shrink-0 select-none">
            Toque nas laterais: mover • Toque duplo / ⬆: Impulso ({boostEnergy >= 95 ? 'Super Salto 100%' : `${boostEnergy}% força`}) • Espaço / W
          </div>
        </div>
      )}
    </div>
  );
}
