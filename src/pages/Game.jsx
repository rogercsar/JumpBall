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
  ChevronRight
} from 'lucide-react';
import { GameEngine } from '../game/engine';
import { STAGES, BALL_SKINS } from '../game/stages';
import { soundEngine } from '../game/audio';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSettings } from '../contexts/SettingsContext';
import { useDialog } from '../contexts/DialogContext';
import { useDeviceOrientation } from '../hooks/useDeviceOrientation';
import { useMediaPipeHands } from '../hooks/useMediaPipeHands';
import { CameraPreview } from '../components/CameraPreview';
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
  const [lastGameResult, setLastGameResult] = useState(null);

  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  // Pausa o jogo imediatamente se qualquer modal de diálogo estiver aberto
  useEffect(() => {
    if (isDialogOpen && engineRef.current && gameState === 'playing') {
      engineRef.current.pause();
      setGameState('paused');
    }
  }, [isDialogOpen, gameState]);

  // Sensores de Hardware
  const {
    orientation,
    isSupported: isOrientationSupported,
    permissionGranted,
    needsPermissionPrompt,
    requestOrientationPermission,
    calibrate
  } = useDeviceOrientation();

  // Callback para o salto do MediaPipe
  const handleJumpGesture = useCallback(() => {
    if (engineRef.current && gameState === 'playing') {
      engineRef.current.triggerGestureJump();
    }
  }, [gameState]);

  // Hook do MediaPipe Hands
  const {
    isCameraActive,
    gestureDetected,
    error: cameraError,
    canvasRef: mediaPipeCanvasRef
  } = useMediaPipeHands({
    enabled: settings.cameraEnabled && (gameState === 'ready' || gameState === 'playing' || gameState === 'paused'),
    onJumpTrigger: handleJumpGesture
  });

  // Atualizar inclinação do giroscópio no motor
  useEffect(() => {
    if (engineRef.current && gameState === 'playing') {
      engineRef.current.setTilt(
        orientation.gamma,
        settings.gyroSensitivity,
        settings.gyroDeadzone
      );
    }
  }, [orientation.gamma, settings.gyroSensitivity, settings.gyroDeadzone, gameState]);

  // Skin ativa da bola
  const activeSkin = BALL_SKINS.find((s) => s.id === (profile?.ball_skin || 'neon-cyan')) || BALL_SKINS[0];

  // Prepara a fase no modo 'ready' aguardando o clique em DAR PLAY
  const startGame = useCallback((stage) => {
    setSelectedStage(stage);
    setGameState('ready');
    setCurrentScore(0);
    setCurrentHeight(0);
    setLastGameResult(null);

    // Timeout breve para o Canvas renderizar no DOM
    setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const engine = new GameEngine(
        canvas,
        stage,
        activeSkin,
        handleGameOver,
        handleVictory,
        (score, height) => {
          setCurrentScore(score);
          setCurrentHeight(height);
        }
      );

      engineRef.current = engine;
    }, 60);
  }, [activeSkin]);

  // Inicia a física e o movimento apenas quando o jogador clica em DAR PLAY
  const handleStartPlay = async () => {
    // Requisita permissão de giroscópio/acelerômetro no clique do usuário (essencial para iOS/Safari)
    if (needsPermissionPrompt && !permissionGranted && requestOrientationPermission) {
      try {
        await requestOrientationPermission();
      } catch (e) {
        console.warn('Aviso de permissão ao iniciar:', e);
      }
    }

    if (engineRef.current) {
      setGameState('playing');
      engineRef.current.start();
    }
  };

  // Handlers de Fim de Jogo
  const handleGameOver = useCallback((result) => {
    setGameState('game_over');
    setLastGameResult(result);
    saveGameResult(result);
  }, [selectedStage, user, settings.controlMode]);

  const handleVictory = useCallback((result) => {
    setGameState('victory');
    setLastGameResult(result);
    saveGameResult(result);

    // Chuva de confetes
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) { /* ignore */ }
  }, [selectedStage, user, settings.controlMode]);

  // Persistência de Score (Supabase + LocalStore + Netlify Functions)
  const saveGameResult = async (result) => {
    const stageNumber = selectedStage?.number || 1;
    const scoreVal = Math.round(result.score || 0);
    const heightVal = Math.round(result.maxHeight || 0);
    const jumpsVal = Math.round(result.jumps || 0);
    const durationVal = Math.round(result.duration || 0);
    const controlModeVal = settings.controlMode || 'hybrid';
    const isWin = result.status === 'completed';

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

    // 1. Atualiza imediatamente o perfil do jogador (desbloqueia a próxima fase no React e no banco)
    const currentCompleted = profile?.stages_completed || 0;
    const newStagesCompleted = isWin ? Math.max(currentCompleted, stageNumber) : currentCompleted;
    const newHighScore = Math.max(profile?.high_score || 0, scoreVal);
    const newTotalJumps = (profile?.total_jumps || 0) + jumpsVal;
    const newGamesPlayed = (profile?.games_played || 0) + 1;

    if (updateProfile) {
      try {
        await updateProfile({
          stages_completed: newStagesCompleted,
          high_score: newHighScore,
          total_jumps: newTotalJumps,
          games_played: newGamesPlayed
        });
      } catch (err) {
        console.warn('Aviso ao atualizar perfil:', err);
      }
    }

    // 2. Grava localmente de forma imediata (funciona offline e como visitante)
    localStore.addHistory(payload);

    // 3. Grava diretamente no banco Supabase se o usuário estiver autenticado
    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('game_history').insert([
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
      } catch (err) {
        console.warn('Aviso: Falha ao inserir no Supabase diretamente:', err);
      }
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
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      {/* 1. MENU DE SELEÇÃO DE FASES (10 Fases) */}
      {gameState === 'menu' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-6 h-6 text-cyan-400" />
                <h1 className="text-2xl sm:text-3xl font-black text-white">Seleção de Fases</h1>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Escolha uma das 10 fases cósmicas e suba até a meta de altura
              </p>
            </div>

            {/* Status dos Sensores */}
            <div className="flex items-center gap-2">
              {needsPermissionPrompt && !permissionGranted && (
                <button
                  onClick={requestOrientationPermission}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md animate-pulse"
                >
                  Liberar Giroscópio
                </button>
              )}
            </div>
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
        <div className="flex flex-col items-center">
          {/* Top Bar / HUD do Jogo */}
          <div className="w-full max-w-[440px] mb-3 flex items-center justify-between glass-panel px-4 py-2.5 rounded-2xl border border-slate-800">
            <button
              onClick={handleExitGame}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Menu de Fases"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Fase {selectedStage?.number} • {selectedStage?.title}
              </span>
              <span className="text-lg font-black text-amber-400">
                {currentScore.toLocaleString()} <span className="text-xs text-slate-400 font-normal">pts</span>
              </span>
            </div>

            {gameState === 'ready' ? (
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold animate-pulse" title="Aguardando Play">
                ▶
              </div>
            ) : (
              <button
                onClick={togglePause}
                className="p-2 rounded-xl bg-slate-800/80 text-cyan-300 hover:bg-slate-700 transition-colors"
                title={gameState === 'paused' ? 'Continuar' : 'Pausar'}
              >
                {gameState === 'paused' ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Barra de Progresso até a Meta da Fase */}
          <div className="w-full max-w-[440px] mb-2 px-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
              <span>Altura: <strong className="text-cyan-300">{currentHeight}m</strong></span>
              <span>Meta: <strong className="text-amber-400">{selectedStage?.targetHeight}m</strong></span>
            </div>
            <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 transition-all duration-100"
                style={{
                  width: `${Math.min(100, (currentHeight / (selectedStage?.targetHeight || 1)) * 100)}%`
                }}
              />
            </div>
          </div>

          {/* Viewport do Canvas do Jogo */}
          <div className="relative w-full max-w-[440px] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 flex justify-center">
            <canvas
              id="gameCanvas"
              ref={canvasRef}
              className="w-full h-auto block"
            />

            {/* Overlay Inicial de Prontidão: O jogo só inicia a física após o clique em DAR PLAY */}
            {gameState === 'ready' && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in z-20">
                <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest block">
                    Pronto para Jogar
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Fase {selectedStage?.number}: {selectedStage?.title}
                  </h2>
                </div>

                <div className="glass-card rounded-2xl p-3.5 w-full max-w-xs border border-slate-800 text-xs text-slate-300 space-y-1.5 text-left">
                  <div className="flex justify-between font-semibold">
                    <span className="text-slate-400">Meta da Fase:</span>
                    <span className="text-amber-400 font-bold">{selectedStage?.targetHeight}m</span>
                  </div>
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
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>DAR PLAY</span>
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
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-3xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                  <Skull className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-rose-400 tracking-wider">A gravidade venceu!</span>
                  <h2 className="text-3xl font-black text-white">Game Over</h2>
                </div>

                <div className="p-4 rounded-2xl glass-card w-full max-w-xs space-y-2 border border-slate-800 text-left text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pontuação Obtida:</span>
                    <span className="font-bold text-amber-400">{lastGameResult?.score?.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Altura Máxima:</span>
                    <span className="font-bold text-cyan-300">{lastGameResult?.maxHeight}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total de Saltos:</span>
                    <span className="font-bold text-slate-200">{lastGameResult?.jumps}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-52">
                  <button
                    onClick={() => startGame(selectedStage)}
                    className="py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-rose-500/25 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>TENTAR NOVAMENTE</span>
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
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Trophy className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Meta Alcançada com Sucesso!</span>
                  <h2 className="text-3xl font-black text-white">Fase Concluída!</h2>
                </div>

                <div className="p-4 rounded-2xl glass-card w-full max-w-xs space-y-2 border border-slate-800 text-left text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pontuação Total:</span>
                    <span className="font-black text-amber-400">{lastGameResult?.score?.toLocaleString()} pts</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Altura da Meta:</span>
                    <span className="font-bold text-cyan-300">{lastGameResult?.maxHeight}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tempo de Subida:</span>
                    <span className="font-bold text-slate-200">{lastGameResult?.duration}s</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 w-52">
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
                    Repetir Fase
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

          {/* Controles de Toque na Tela (Mobile & Fallback) */}
          <TouchControls
            onTouchLeft={() => engineRef.current?.setTouch(-1)}
            onTouchRight={() => engineRef.current?.setTouch(1)}
            onTouchJump={() => engineRef.current?.triggerGestureJump()}
            onRelease={() => engineRef.current?.setTouch(0)}
          />

          {/* Dica de Teclas Desktop */}
          <div className="mt-3 text-center text-[11px] text-slate-500 hidden sm:block">
            Use as setas <strong>← →</strong> ou <strong>A D</strong> para mover • <strong>Espaço</strong> para Super Salto
          </div>

          {/* PiP da Câmera com MediaPipe Hands */}
          <CameraPreview
            canvasRef={mediaPipeCanvasRef}
            isCameraActive={isCameraActive}
            gestureDetected={gestureDetected}
            error={cameraError}
            enabled={settings.cameraEnabled && (gameState === 'ready' || gameState === 'playing' || gameState === 'paused')}
          />
        </div>
      )}
    </div>
  );
}
