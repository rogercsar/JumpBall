import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Serviço de Multiplayer 1v1 via Supabase Realtime (WebSockets)
 * Utiliza canais de Broadcast e Presence para sincronização instantânea
 * com custo zero de operações de banco de dados e baixíssima latência.
 */
class MultiplayerService {
  constructor() {
    this.channel = null;
    this.roomCode = null;
    this.isHost = false;
    this.lastStateSentTime = 0;
    this.throttleInterval = 32; // ~30 atualizações por segundo para fluidez perfeita
    this.subscribers = {
      playerState: [],
      gameEvent: [],
      presence: [],
      error: []
    };
  }

  // Gera um código de sala curto e amigável de 5 caracteres (ex: "JP78A")
  generateRoomCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'JP';
    for (let i = 0; i < 3; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // Cria uma nova sala como Host
  async createRoom(stage, userProfile, activeSkin) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase não configurado para conexões em tempo real.');
    }

    this.leaveRoom();
    const code = this.generateRoomCode();
    this.roomCode = code;
    this.isHost = true;

    return this._connectToChannel(code, {
      isHost: true,
      stage: {
        id: stage.id,
        number: stage.number,
        name: stage.name,
        targetHeight: stage.targetHeight,
        theme: stage.theme,
        gravity: stage.gravity,
        jumpForce: stage.jumpForce
      },
      user: {
        id: userProfile?.id || `host_${Date.now()}`,
        username: userProfile?.username || 'Host',
        avatar_url: userProfile?.avatar_url,
        level: userProfile?.level || 1,
        skin: activeSkin
      }
    });
  }

  // Entra em uma sala existente como Desafiante (Guest)
  async joinRoom(roomCode, userProfile, activeSkin) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Supabase não configurado para conexões em tempo real.');
    }

    const cleanCode = (roomCode || '').trim().toUpperCase();
    if (cleanCode.length < 4) {
      throw new Error('Código de sala inválido.');
    }

    this.leaveRoom();
    this.roomCode = cleanCode;
    this.isHost = false;

    return this._connectToChannel(cleanCode, {
      isHost: false,
      user: {
        id: userProfile?.id || `guest_${Date.now()}`,
        username: userProfile?.username || 'Desafiante',
        avatar_url: userProfile?.avatar_url,
        level: userProfile?.level || 1,
        skin: activeSkin
      }
    });
  }

  // Conecta ao canal do Supabase e configura ouvintes
  _connectToChannel(roomCode, presencePayload) {
    return new Promise((resolve, reject) => {
      const channelName = `pvp_room_${roomCode}`;

      this.channel = supabase.channel(channelName, {
        config: {
          broadcast: { ack: false, self: false },
          presence: { key: presencePayload.user.id }
        }
      });

      // 1. Escuta atualizações de física e posição da bola do adversário
      this.channel.on('broadcast', { event: 'player_state' }, ({ payload }) => {
        this.subscribers.playerState.forEach((fn) => fn(payload));
      });

      // 2. Escuta eventos do jogo (ready, countdown, start, finish, rematch)
      this.channel.on('broadcast', { event: 'game_event' }, ({ payload }) => {
        this.subscribers.gameEvent.forEach((fn) => fn(payload));
      });

      // 3. Escuta presença na sala (quem entrou, saiu ou sincronizou)
      this.channel.on('presence', { event: 'sync' }, () => {
        const state = this.channel.presenceState();
        const players = [];
        Object.values(state).forEach((presences) => {
          presences.forEach((p) => players.push(p));
        });
        this.subscribers.presence.forEach((fn) => fn(players));
      });

      this.channel.on('presence', { event: 'join' }, ({ newPresences }) => {
        // Notifica evento de conexão de novo participante
        this.subscribers.gameEvent.forEach((fn) =>
          fn({ event: 'player_joined', presences: newPresences })
        );
      });

      this.channel.on('presence', { event: 'leave' }, ({ leftPresences }) => {
        this.subscribers.gameEvent.forEach((fn) =>
          fn({ event: 'player_left', presences: leftPresences })
        );
      });

      // Inscreve no canal
      this.channel.subscribe(async (status, err) => {
        if (status === 'SUBSCRIBED') {
          try {
            await this.channel.track(presencePayload);
            resolve({ roomCode, isHost: this.isHost, channel: this.channel });
          } catch (trackError) {
            reject(trackError);
          }
        } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          const errorMsg = err?.message || 'Falha ao conectar na sala do duelo.';
          this.subscribers.error.forEach((fn) => fn(errorMsg));
          reject(new Error(errorMsg));
        }
      });
    });
  }

  // Envia posição da bola do jogador local em tempo real (com throttle para ~30fps)
  sendPlayerState(state, force = false) {
    if (!this.channel) return;
    const now = performance.now();
    if (!force && now - this.lastStateSentTime < this.throttleInterval) {
      return;
    }
    this.lastStateSentTime = now;

    this.channel.send({
      type: 'broadcast',
      event: 'player_state',
      payload: state
    }).catch(() => {});
  }

  // Dispara eventos de fluxo (contagem, largada, término, desistência)
  sendGameEvent(event, data = {}) {
    if (!this.channel) return;
    this.channel.send({
      type: 'broadcast',
      event: 'game_event',
      payload: { event, ...data, timestamp: Date.now() }
    }).catch(() => {});
  }

  // Assinantes de eventos
  onPlayerState(callback) {
    this.subscribers.playerState.push(callback);
    return () => {
      this.subscribers.playerState = this.subscribers.playerState.filter((fn) => fn !== callback);
    };
  }

  onGameEvent(callback) {
    this.subscribers.gameEvent.push(callback);
    return () => {
      this.subscribers.gameEvent = this.subscribers.gameEvent.filter((fn) => fn !== callback);
    };
  }

  onPresenceChange(callback) {
    this.subscribers.presence.push(callback);
    return () => {
      this.subscribers.presence = this.subscribers.presence.filter((fn) => fn !== callback);
    };
  }

  onError(callback) {
    this.subscribers.error.push(callback);
    return () => {
      this.subscribers.error = this.subscribers.error.filter((fn) => fn !== callback);
    };
  }

  // Desconecta da sala atual
  leaveRoom() {
    if (this.channel && supabase) {
      try {
        this.channel.untrack().catch(() => {});
        supabase.removeChannel(this.channel);
      } catch (e) {
        /* ignore */
      }
    }
    this.channel = null;
    this.roomCode = null;
    this.isHost = false;
    this.subscribers.playerState = [];
    this.subscribers.gameEvent = [];
    this.subscribers.presence = [];
    this.subscribers.error = [];
  }
}

export const multiplayerService = new MultiplayerService();
