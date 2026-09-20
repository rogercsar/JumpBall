import React, { useState, useEffect, useRef } from 'react';
import { 
  Swords, 
  Users, 
  Copy, 
  Check, 
  Play, 
  X, 
  Sparkles, 
  Trophy, 
  Share2, 
  Shield, 
  Loader2, 
  AlertCircle,
  Layers,
  Flame,
  ArrowRight
} from 'lucide-react';
import { multiplayerService } from '../services/multiplayer';
import { STAGES } from '../game/stages';
import { soundEngine } from '../game/audio';

export const DUEL_THEME_PRESETS = [
  {
    id: 'default',
    label: 'Original da Fase',
    color: '#38bdf8',
    previewGradient: 'from-slate-900 to-slate-950'
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk Neon',
    color: '#ec4899',
    previewGradient: 'from-purple-950 via-fuchsia-950 to-slate-950',
    themeData: {
      theme: 'neon',
      bgGradient: ['#180026', '#3b0764', '#581c87'],
      platformColor: '#ec4899',
      platformBorder: '#f472b6',
      ballGlow: '#f43f5e'
    }
  },
  {
    id: 'enchanted',
    label: 'Reino Encantado',
    color: '#c084fc',
    previewGradient: 'from-pink-950 via-purple-950 to-slate-950',
    themeData: {
      theme: 'crystal',
      bgGradient: ['#2e0854', '#581c87', '#701a75'],
      platformColor: '#d946ef',
      platformBorder: '#f0abfc',
      ballGlow: '#e879f9'
    }
  },
  {
    id: 'volcano',
    label: 'Inferno de Magma',
    color: '#ea580c',
    previewGradient: 'from-red-950 via-orange-950 to-slate-950',
    themeData: {
      theme: 'volcano',
      bgGradient: ['#1c0505', '#450a0a', '#7f1d1d'],
      platformColor: '#ea580c',
      platformBorder: '#fdba74',
      ballGlow: '#f97316'
    }
  },
  {
    id: 'ocean',
    label: 'Abismo Aquático',
    color: '#06b6d4',
    previewGradient: 'from-cyan-950 via-blue-950 to-slate-950',
    themeData: {
      theme: 'ocean',
      bgGradient: ['#031726', '#062d47', '#0a4b73'],
      platformColor: '#06b6d4',
      platformBorder: '#67e8f9',
      ballGlow: '#22d3ee'
    }
  },
  {
    id: 'golden',
    label: 'Templo Dourado',
    color: '#eab308',
    previewGradient: 'from-amber-950 via-yellow-950 to-slate-950',
    themeData: {
      theme: 'temple',
      bgGradient: ['#291a03', '#4d3205', '#714b08'],
      platformColor: '#eab308',
      platformBorder: '#fef08a',
      ballGlow: '#fbbf24'
    }
  }
];

export function PvPLobbyModal({
  isOpen,
  onClose,
  onStartPvPMatch,
  currentStage,
  userProfile,
  activeSkin,
  initialRoomCode = ''
}) {
  const [activeTab, setActiveTab] = useState(initialRoomCode ? 'join' : 'create'); // 'create' | 'join'
  const [selectedStageId, setSelectedStageId] = useState(currentStage?.id || 1);
  const [selectedThemePreset, setSelectedThemePreset] = useState('default');
  const [duelGravity, setDuelGravity] = useState('normal'); // 'low' | 'normal' | 'high'
  const [joinCodeInput, setJoinCodeInput] = useState(initialRoomCode || '');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Estado da Sala Conectada
  const [connectedRoom, setConnectedRoom] = useState(null); // { code, isHost, stage }
  const [playersInRoom, setPlayersInRoom] = useState([]);
  const [countdown, setCountdown] = useState(null); // 3, 2, 1, 0

  const countdownTimerRef = useRef(null);

  // Sincroniza initialRoomCode se for passado via URL
  useEffect(() => {
    if (initialRoomCode) {
      setJoinCodeInput(initialRoomCode.toUpperCase());
      setActiveTab('join');
    }
  }, [initialRoomCode]);

  // Limpa ouvintes ao fechar modal ou desmontar
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  // Ouvintes de eventos do MultiplayerService enquanto o modal estiver conectado
  useEffect(() => {
    if (!connectedRoom) return;

    // 1. Atualizações de Presença na Sala
    const unsubPresence = multiplayerService.onPresenceChange((presences) => {
      setPlayersInRoom(presences);
    });

    // 2. Eventos de Jogo (Início de contagem regressiva, largada, etc.)
    const unsubGameEvent = multiplayerService.onGameEvent((data) => {
      if (data.event === 'start_countdown') {
        startCountdownSequence(data.stage);
      } else if (data.event === 'player_left') {
        // Se o oponente sair antes da largada
        setErrorMessage('O outro jogador desconectou da sala.');
      }
    });

    // 3. Erros de Conexão
    const unsubError = multiplayerService.onError((msg) => {
      setErrorMessage(msg);
      setLoading(false);
    });

    return () => {
      unsubPresence();
      unsubGameEvent();
      unsubError();
    };
  }, [connectedRoom]);

  if (!isOpen) return null;

  const currentSelectedStage = STAGES.find((s) => s.id === selectedStageId) || STAGES[0];

  // Inicia sequência sincronizada de contagem 3.. 2.. 1.. LARGADA!
  const startCountdownSequence = (stageToPlay) => {
    let count = 3;
    setCountdown(count);
    soundEngine.playJump();

    countdownTimerRef.current = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
        soundEngine.playJump();
      } else if (count === 0) {
        setCountdown(0); // Mostra "LARGADA!"
        soundEngine.playSuperJump();
      } else {
        clearInterval(countdownTimerRef.current);
        countdownTimerRef.current = null;
        setCountdown(null);

        // Identifica o oponente na lista de presenças
        const myId = userProfile?.id;
        const opponentPresence = playersInRoom.find((p) => p.user?.id !== myId) || playersInRoom[1] || playersInRoom[0];

        onStartPvPMatch({
          stage: stageToPlay || currentSelectedStage,
          roomCode: connectedRoom.code,
          isHost: connectedRoom.isHost,
          opponent: opponentPresence?.user || { username: 'Adversário', skin: null }
        });
      }
    }, 900);
  };

  // 1. Criar Sala (Host)
  const handleCreateRoom = async () => {
    setLoading(true);
    setErrorMessage('');
    soundEngine.unlock();

    try {
      const themePresetObj = DUEL_THEME_PRESETS.find(t => t.id === selectedThemePreset);
      const themeConfig = themePresetObj?.themeData || {};
      const customizedStage = {
        ...currentSelectedStage,
        ...themeConfig,
        name: selectedThemePreset !== 'default' 
          ? `${currentSelectedStage.name} • ${themePresetObj.label}` 
          : currentSelectedStage.name,
        gravity: duelGravity === 'low' ? 0.22 : (duelGravity === 'high' ? 0.40 : currentSelectedStage.gravity),
        jumpForce: duelGravity === 'low' ? -10.5 : (duelGravity === 'high' ? -12.8 : currentSelectedStage.jumpForce)
      };

      const result = await multiplayerService.createRoom(
        customizedStage,
        userProfile,
        activeSkin
      );
      setConnectedRoom({
        code: result.roomCode,
        isHost: true,
        stage: customizedStage
      });
    } catch (err) {
      setErrorMessage(err.message || 'Erro ao criar sala de duelo.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Entrar em Sala (Guest)
  const handleJoinRoom = async () => {
    if (!joinCodeInput || joinCodeInput.trim().length < 4) {
      setErrorMessage('Digite um código de sala válido (mínimo 4 caracteres).');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    soundEngine.unlock();

    try {
      const cleanCode = joinCodeInput.trim().toUpperCase();
      const result = await multiplayerService.joinRoom(
        cleanCode,
        userProfile,
        activeSkin
      );
      setConnectedRoom({
        code: result.roomCode,
        isHost: false,
        stage: currentSelectedStage
      });
    } catch (err) {
      setErrorMessage(err.message || 'Não foi possível entrar na sala. Verifique o código.');
    } finally {
      setLoading(false);
    }
  };

  // 3. O Host dispara a largada da partida
  const handleHostStartGame = () => {
    if (!connectedRoom?.isHost) return;
    soundEngine.unlock();

    // Notifica todos os jogadores no canal via Broadcast
    multiplayerService.sendGameEvent('start_countdown', {
      stage: connectedRoom.stage
    });

    startCountdownSequence(connectedRoom.stage);
  };

  // 4. Copiar Código da Sala
  const handleCopyCode = () => {
    if (!connectedRoom?.code) return;
    navigator.clipboard.writeText(connectedRoom.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // 5. Copiar Link Direto
  const handleCopyLink = () => {
    if (!connectedRoom?.code) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}?challenge=${connectedRoom.code}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // 6. Abandonar / Fechar Sala
  const handleExitLobby = () => {
    multiplayerService.leaveRoom();
    setConnectedRoom(null);
    setPlayersInRoom([]);
    setCountdown(null);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    onClose();
  };

  const hostPlayer = playersInRoom.find((p) => p.isHost) || (connectedRoom?.isHost ? { user: userProfile, isHost: true } : null);
  const guestPlayer = playersInRoom.find((p) => !p.isHost) || (!connectedRoom?.isHost ? { user: userProfile, isHost: false } : null);
  const bothConnected = hostPlayer && guestPlayer && playersInRoom.length >= 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Contagem Regressiva em Tela Cheia */}
      {countdown !== null && (
        <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-slate-950/90 select-none animate-in zoom-in-90 duration-150">
          <div className="text-center space-y-3">
            <span className="text-xs sm:text-sm font-black tracking-widest text-cyan-400 uppercase">
              Preparem os Saltos
            </span>
            <div className="text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-sky-400 to-rose-500 animate-bounce scale-110">
              {countdown === 0 ? 'VAI!' : countdown}
            </div>
            <p className="text-slate-300 text-sm font-semibold">
              {currentSelectedStage.name} • Meta: {currentSelectedStage.targetHeight}m
            </p>
          </div>
        </div>
      )}

      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900/95 border border-slate-700/80 shadow-2xl shadow-cyan-950/40 flex flex-col overflow-hidden text-slate-100 max-h-[92vh]">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/20 text-white font-bold">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Duelo 1v1 PvP
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                  Ao Vivo
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Dispute uma corrida em tempo real contra outro jogador
              </p>
            </div>
          </div>

          <button
            onClick={handleExitLobby}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mensagem de Erro se houver */}
        {errorMessage && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* CORPO DO MODAL */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* CASO 1: SALA JÁ CONECTADA (LOBBY DE ESPERA 1v1) */}
          {connectedRoom ? (
            <div className="space-y-6">
              {/* Código da Sala em Destaque */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Código do Desafio
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black tracking-widest text-cyan-400 font-mono">
                      {connectedRoom.code}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1 active:scale-95"
                      title="Copiar Código"
                    >
                      {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span className="text-[10px] font-bold">{copiedCode ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                    <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link de Convite'}</span>
                  </button>
                </div>
              </div>

              {/* CARTÕES DO CONFRONTO: JOGADOR 1 vs JOGADOR 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                {/* Ícone VS no centro */}
                <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
                  <div className="w-10 h-10 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-xs font-black text-rose-400 shadow-xl shadow-rose-500/30">
                    VS
                  </div>
                </div>

                {/* Card do Jogador 1 (Host) */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  hostPlayer ? 'bg-slate-800/60 border-cyan-500/40 shadow-lg shadow-cyan-500/10' : 'bg-slate-900/40 border-slate-800 border-dashed'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Host da Sala
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Pronto ✅
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shrink-0">
                      {hostPlayer?.user?.username?.charAt(0).toUpperCase() || 'H'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white truncate">
                        @{hostPlayer?.user?.username || 'Host'}
                      </div>
                      <div className="text-xs text-slate-400">
                        Nível {hostPlayer?.user?.level || 1} • Esfera Ativa
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card do Jogador 2 (Desafiante) */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  guestPlayer ? 'bg-slate-800/60 border-rose-500/40 shadow-lg shadow-rose-500/10' : 'bg-slate-950/60 border-slate-800 border-dashed flex flex-col justify-center items-center py-6 text-center'
                }`}>
                  {guestPlayer ? (
                    <>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
                          <Swords className="w-3 h-3" /> Desafiante
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          Conectado ✅
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md shrink-0">
                          {guestPlayer?.user?.username?.charAt(0).toUpperCase() || 'D'}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-white truncate">
                            @{guestPlayer?.user?.username || 'Desafiante'}
                          </div>
                          <div className="text-xs text-slate-400">
                            Nível {guestPlayer?.user?.level || 1} • Pronto
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-8 h-8 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500 animate-pulse">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-slate-300">
                        Aguardando Desafiante...
                      </div>
                      <p className="text-[11px] text-slate-500 max-w-[180px]">
                        Compartilhe o código ou link da sala acima
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Informações da Fase Escolhida */}
              <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">
                    #{connectedRoom.stage?.number || 1}
                  </div>
                  <div>
                    <div className="font-bold text-white">{connectedRoom.stage?.name}</div>
                    <div className="text-[11px] text-slate-400 capitalize">{connectedRoom.stage?.theme || 'Floresta'}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-amber-400">{connectedRoom.stage?.targetHeight} Metros</div>
                  <div className="text-[10px] text-slate-400">Meta da Corrida</div>
                </div>
              </div>

              {/* BOTÕES DE AÇÃO DO LOBBY */}
              <div className="pt-2">
                {connectedRoom.isHost ? (
                  <button
                    onClick={handleHostStartGame}
                    disabled={!bothConnected}
                    className={`w-full py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl ${
                      bothConnected
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 cursor-pointer'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/60'
                    }`}
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{bothConnected ? 'INICIAR DUELO AGORA!' : 'Aguardando Desafiante Conectar...'}</span>
                  </button>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-center space-y-1">
                    <div className="text-xs font-bold text-cyan-300 flex items-center justify-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Você está conectado na sala!</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Aguardando o Host (@{hostPlayer?.user?.username || 'Host'}) disparar a largada...
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* CASO 2: FORMULÁRIO INICIAL (CRIAR vs ENTRAR) */
            <div className="space-y-6">
              {/* Abas Seletoras */}
              <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => { setActiveTab('create'); setErrorMessage(''); }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'create'
                      ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Criar Desafio</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('join'); setErrorMessage(''); }}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    activeTab === 'join'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Entrar com Código</span>
                </button>
              </div>

              {/* CONTEÚDO DA ABA: CRIAR DESAFIO */}
              {activeTab === 'create' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Escolha a Fase para o Duelo:
                    </label>
                    <select
                      value={selectedStageId}
                      onChange={(e) => setSelectedStageId(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-rose-500 transition-colors cursor-pointer"
                    >
                      {STAGES.map((s) => (
                        <option key={s.id} value={s.id}>
                          Fase {s.number}: {s.name} ({s.targetHeight}m - {s.theme})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Card Visual da Fase Selecionada */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white font-black text-lg shadow-md">
                        #{currentSelectedStage.number}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{currentSelectedStage.name}</div>
                        <div className="text-xs text-slate-400 capitalize">Bioma Base: {currentSelectedStage.theme}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-amber-400">{currentSelectedStage.targetHeight}m</div>
                      <div className="text-[10px] text-slate-400">Altitude Alvo</div>
                    </div>
                  </div>

                  {/* Seletor de Bioma / Tema Customizado do Duelo */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        Personalizar Bioma da Arena:
                      </span>
                      <span className="text-[10px] text-pink-400 font-bold bg-pink-500/10 px-2 py-0.5 rounded-md border border-pink-500/20">
                        Poder do Host
                      </span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {DUEL_THEME_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setSelectedThemePreset(preset.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                            selectedThemePreset === preset.id
                              ? 'bg-slate-800 border-pink-500 text-white font-bold shadow-md shadow-pink-500/20 scale-[1.02]'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                            style={{ backgroundColor: preset.color }}
                          />
                          <span className="text-xs truncate">{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ajuste de Gravidade do Duelo */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>Física do Duelo (Gravidade):</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'low', label: 'Lunar / Baixa 🚀', desc: 'Flutuação alta' },
                        { id: 'normal', label: 'Normal ⚖️', desc: 'Calibrado' },
                        { id: 'high', label: 'Pesada 🔥', desc: 'Frenético' }
                      ].map((grav) => (
                        <button
                          key={grav.id}
                          type="button"
                          onClick={() => setDuelGravity(grav.id)}
                          className={`p-2 rounded-xl border text-center transition-all ${
                            duelGravity === grav.id
                              ? 'bg-slate-800 border-cyan-400 text-cyan-300 font-bold shadow-md shadow-cyan-500/10'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="text-[11px] font-bold">{grav.label}</div>
                          <div className="text-[9px] text-slate-500">{grav.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCreateRoom}
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:to-pink-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-rose-500/20 hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Gerando Sala e Canal Realtime...</span>
                      </>
                    ) : (
                      <>
                        <Swords className="w-4 h-4" />
                        <span>CRIAR SALA E GERAR CÓDIGO</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* CONTEÚDO DA ABA: ENTRAR COM CÓDIGO */}
              {activeTab === 'join' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      Código da Sala (5 Dígitos):
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={joinCodeInput}
                      onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                      placeholder="Ex: JP82X"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950 border border-slate-700 text-cyan-300 font-mono font-black text-xl tracking-widest text-center focus:outline-none focus:border-cyan-400 transition-colors uppercase placeholder:text-slate-600"
                    />
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed text-center px-4">
                    Peça o código de 5 caracteres para o amigo que criou o desafio ou acesse pelo link compartilhado.
                  </p>

                  <button
                    type="button"
                    onClick={handleJoinRoom}
                    disabled={loading || !joinCodeInput.trim()}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Conectando à sala...</span>
                      </>
                    ) : (
                      <>
                        <ArrowRight className="w-4 h-4" />
                        <span>ENTRAR NO DUELO</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
