// Configurações Musicais Procedurais para cada bioma / tema de fase
const BGM_THEMES = {
  nature: {
    bpm: 104,
    filterFreq: 1400,
    bassOsc: 'triangle',
    leadOsc: 'sine',
    bassEnvelope: { attack: 0.05, decay: 0.35, sustain: 0.4, release: 0.2 },
    leadEnvelope: { attack: 0.04, decay: 0.18, sustain: 0.25, release: 0.15 },
    bassNotes: [130.81, 0, 98.00, 0, 110.00, 0, 87.31, 0, 130.81, 0, 98.00, 0, 110.00, 0, 87.31, 0], // C3, G2, A2, F2
    leadNotes: [523.25, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33, 523.25, 659.25, 783.99, 1046.5, 880.00, 783.99, 659.25, 587.33, 523.25]
  },
  oriental: {
    bpm: 114,
    filterFreq: 1800,
    bassOsc: 'sawtooth',
    leadOsc: 'triangle',
    bassEnvelope: { attack: 0.03, decay: 0.22, sustain: 0.3, release: 0.1 },
    leadEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.2, release: 0.1 },
    bassNotes: [146.83, 146.83, 155.56, 146.83, 146.83, 146.83, 155.56, 146.83, 146.83, 146.83, 155.56, 146.83, 196.00, 185.00, 155.56, 146.83], // D3, Eb3, G3
    leadNotes: [293.66, 311.13, 369.99, 392.00, 440.00, 392.00, 369.99, 311.13, 293.66, 369.99, 440.00, 466.16, 440.00, 392.00, 369.99, 293.66]
  },
  ocean: {
    bpm: 92,
    filterFreq: 950,
    bassOsc: 'sine',
    leadOsc: 'sine',
    bassEnvelope: { attack: 0.08, decay: 0.4, sustain: 0.5, release: 0.3 },
    leadEnvelope: { attack: 0.06, decay: 0.28, sustain: 0.3, release: 0.25 },
    bassNotes: [87.31, 0, 130.81, 0, 98.00, 0, 146.83, 0, 87.31, 0, 130.81, 0, 98.00, 0, 146.83, 0], // F2, C3, G2, D3
    leadNotes: [523.25, 392.00, 440.00, 659.25, 587.33, 440.00, 523.25, 698.46, 659.25, 523.25, 392.00, 440.00, 587.33, 523.25, 440.00, 392.00]
  },
  storm_rock: {
    bpm: 130,
    filterFreq: 1600,
    bassOsc: 'sawtooth',
    leadOsc: 'sawtooth',
    bassEnvelope: { attack: 0.02, decay: 0.16, sustain: 0.4, release: 0.08 },
    leadEnvelope: { attack: 0.02, decay: 0.12, sustain: 0.25, release: 0.08 },
    bassNotes: [110.00, 110.00, 130.81, 146.83, 82.41, 82.41, 98.00, 110.00, 110.00, 110.00, 130.81, 146.83, 164.81, 146.83, 130.81, 110.00],
    leadNotes: [440.00, 523.25, 587.33, 659.25, 587.33, 523.25, 440.00, 392.00, 440.00, 523.25, 659.25, 783.99, 659.25, 587.33, 523.25, 440.00]
  },
  crystal_ice: {
    bpm: 100,
    filterFreq: 2400,
    bassOsc: 'triangle',
    leadOsc: 'sine',
    bassEnvelope: { attack: 0.04, decay: 0.3, sustain: 0.3, release: 0.2 },
    leadEnvelope: { attack: 0.01, decay: 0.15, sustain: 0.15, release: 0.3 },
    bassNotes: [164.81, 0, 123.47, 0, 130.81, 0, 98.00, 0, 164.81, 0, 123.47, 0, 130.81, 0, 98.00, 0],
    leadNotes: [783.99, 987.77, 1318.51, 1174.66, 987.77, 783.99, 880.00, 659.25, 783.99, 1046.5, 1318.51, 1174.66, 987.77, 880.00, 783.99, 659.25]
  },
  cyber_arcade: {
    bpm: 124,
    filterFreq: 1900,
    bassOsc: 'square',
    leadOsc: 'square',
    bassEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.35, release: 0.06 },
    leadEnvelope: { attack: 0.01, decay: 0.10, sustain: 0.22, release: 0.06 },
    bassNotes: [146.83, 146.83, 174.61, 196.00, 110.00, 110.00, 130.81, 146.83, 146.83, 146.83, 174.61, 196.00, 220.00, 196.00, 174.61, 146.83],
    leadNotes: [587.33, 698.46, 880.00, 1046.5, 880.00, 698.46, 783.99, 659.25, 698.46, 587.33, 698.46, 783.99, 880.00, 1046.5, 1174.66, 880.00]
  },
  cosmic: {
    bpm: 96,
    filterFreq: 1200,
    bassOsc: 'sawtooth',
    leadOsc: 'triangle',
    bassEnvelope: { attack: 0.06, decay: 0.45, sustain: 0.45, release: 0.25 },
    leadEnvelope: { attack: 0.05, decay: 0.26, sustain: 0.3, release: 0.3 },
    bassNotes: [130.81, 0, 98.00, 0, 103.83, 0, 116.54, 0, 130.81, 0, 98.00, 0, 103.83, 0, 116.54, 0], // C3, G2, Ab2, Bb2
    leadNotes: [392.00, 523.25, 622.25, 783.99, 698.46, 622.25, 587.33, 466.16, 523.25, 622.25, 783.99, 932.33, 830.61, 783.99, 698.46, 622.25]
  }
};

/**
 * Sintetizador Procedural de Áudio com Web Audio API
 * Produz efeitos sonoros ricos (SFX) e Trilhas Musicais Temáticas (BGM)
 * sem depender de arquivos de áudio externos
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.sfxVolume = 0.7;
    this.bgmVolume = 0.4;
    this.isMuted = false;
    this.initialized = false;
    this.bgmPlaying = false;
    this.currentTheme = null;
    this.bgmTimer = null;
    this.bgmGainNode = null;
    this.stepIndex = 0;
  }

  init() {
    if (this.initialized && this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API não suportada:', e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolumes(sfxVol, bgmVol) {
    this.sfxVolume = Math.max(0, Math.min(1, sfxVol));
    this.bgmVolume = Math.max(0, Math.min(1, bgmVol));
    if (this.bgmGainNode && this.ctx) {
      const targetVol = this.isMuted ? 0 : this.bgmVolume * 0.35;
      this.bgmGainNode.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.bgmGainNode && this.ctx) {
      const targetVol = this.isMuted ? 0 : this.bgmVolume * 0.35;
      this.bgmGainNode.gain.setValueAtTime(targetVol, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Identifica o gênero musical a partir do tema visual da fase
  getThemeGenre(theme) {
    if (['forest', 'indigenous', 'autumn', 'spring_season', 'wood'].includes(theme)) return 'nature';
    if (['desert', 'dune_storm', 'pyramids'].includes(theme)) return 'oriental';
    if (['ocean', 'waterfall', 'rain', 'ship'].includes(theme)) return 'ocean';
    if (['storm', 'volcano', 'obsidian', 'rock', 'iron'].includes(theme)) return 'storm_rock';
    if (['arctic', 'winter', 'crystal', 'aurora'].includes(theme)) return 'crystal_ice';
    if (['cyberpunk', 'computer', 'internet', 'arcade', 'geometry', 'magic_cube', 'steampunk'].includes(theme)) return 'cyber_arcade';
    return 'cosmic'; // cosmos, singularity, solar, asteroid, quantum, olympus, sky, heroes, carnival, soccer, music, etc.
  }

  // Toca uma nota sintetizada com envelope ADSR
  playNote(freq, type, duration, envelope, targetGainNode, time) {
    if (!freq || freq <= 0 || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, time);

      const attack = envelope.attack || 0.03;
      const decay = envelope.decay || 0.15;
      const sustain = envelope.sustain || 0.3;
      const release = envelope.release || 0.1;
      const peakGain = 0.22;

      noteGain.gain.setValueAtTime(0.0001, time);
      noteGain.gain.linearRampToValueAtTime(peakGain, time + attack);
      noteGain.gain.linearRampToValueAtTime(peakGain * sustain, time + attack + decay);
      noteGain.gain.setValueAtTime(peakGain * sustain, time + duration - release);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(noteGain);
      noteGain.connect(targetGainNode);

      osc.start(time);
      osc.stop(time + duration + 0.02);
    } catch (e) {
      /* ignore audio context schedule errors */
    }
  }

  // Inicia a música de fundo dinâmica adaptada à fase atual
  startStageBGM(stageTheme = 'forest') {
    this.resume();
    if (!this.ctx) return;

    const genre = this.getThemeGenre(stageTheme);
    if (this.currentTheme === genre && this.bgmPlaying) {
      return; // Já está tocando a trilha desta fase
    }

    this.stopBGM(0.3); // Fade out suave do tema anterior
    this.currentTheme = genre;
    this.bgmPlaying = true;

    const config = BGM_THEMES[genre] || BGM_THEMES.nature;
    this.bgmGainNode = this.ctx.createGain();
    const targetVol = this.isMuted ? 0 : this.bgmVolume * 0.35;
    this.bgmGainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.bgmGainNode.gain.linearRampToValueAtTime(targetVol, this.ctx.currentTime + 0.6);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(config.filterFreq || 1600, this.ctx.currentTime);

    this.bgmGainNode.connect(filter);
    filter.connect(this.ctx.destination);
    const bgmOutput = this.bgmGainNode;

    // Sequenciador de compassos (8 notas por compasso = 16 passos)
    const stepDuration = 60 / config.bpm / 2;
    this.nextNoteTime = this.ctx.currentTime + 0.1;
    this.stepIndex = 0;

    this.bgmTimer = setInterval(() => {
      if (!this.bgmPlaying || !this.ctx) return;
      while (this.nextNoteTime < this.ctx.currentTime + 0.25) {
        const bassNote = config.bassNotes[this.stepIndex];
        const leadNote = config.leadNotes[this.stepIndex];

        if (bassNote) {
          this.playNote(bassNote, config.bassOsc, stepDuration * 1.8, config.bassEnvelope, bgmOutput, this.nextNoteTime);
        }
        if (leadNote) {
          this.playNote(leadNote, config.leadOsc, stepDuration * 0.9, config.leadEnvelope, bgmOutput, this.nextNoteTime);
        }

        this.nextNoteTime += stepDuration;
        this.stepIndex = (this.stepIndex + 1) % 16;
      }
    }, 80);
  }

  pauseBGM() {
    if (this.bgmGainNode && this.ctx) {
      try {
        this.bgmGainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      } catch (e) { /* ignore */ }
    }
  }

  resumeBGM() {
    if (this.bgmGainNode && this.ctx) {
      try {
        const targetVol = this.isMuted ? 0 : this.bgmVolume * 0.35;
        this.bgmGainNode.gain.linearRampToValueAtTime(targetVol, this.ctx.currentTime + 0.25);
      } catch (e) { /* ignore */ }
    }
  }

  stopBGM(fadeDuration = 0.4) {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    this.bgmPlaying = false;
    this.currentTheme = null;

    if (this.bgmGainNode && this.ctx) {
      try {
        this.bgmGainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + fadeDuration);
      } catch (e) { /* ignore */ }
    }
  }

  // Efeito de Pulo Normal
  playJump() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  }

  // Efeito de Super Pulo (Mola ou Gesto MediaPipe)
  playSuperJump() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.28);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Efeito de Mola / Plataforma Elástica
  playSpring() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(750, now + 0.2);

    gain.gain.setValueAtTime(this.sfxVolume * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Efeito de Coleta de Moeda / Cristal
  playCollect() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.08); // A5

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Efeito de Plataforma Quebrando (Frágil)
  playCrumble() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    gain.gain.setValueAtTime(this.sfxVolume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Efeito de Colisão com Obstáculo
  playHit() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    const now = this.ctx.currentTime;

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

    gain.gain.setValueAtTime(this.sfxVolume * 0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  }

  // Efeito de Game Over
  playGameOver() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [329.63, 311.13, 293.66, 277.18]; // Sequência descendente

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.12;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.sfxVolume * 0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.16);
    });
  }

  // Fanfarra de Vitória
  playVictory() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.14;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.sfxVolume * 0.45, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  // Efeito ao Perder 1 Vida
  playLoseLife() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

    gain.gain.setValueAtTime(this.sfxVolume * 0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);
  }

  // Efeito de Respawn / Ativação de Escudo
  playRespawn() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [349.23, 440.0, 587.33, 783.99]; // F4, A4, D5, G5

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.sfxVolume * 0.35, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.28);
    });
  }

  // Efeito ao Coletar a Mochila Mágica
  playMagicBackpack() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chimeFrequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6

    chimeFrequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.06;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(this.sfxVolume * 0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.32);
    });
  }

  // Efeito de Propulsão / Jato Contínuo da Mochila Mágica
  playJetpackThrust() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.12);

    gain.gain.setValueAtTime(this.sfxVolume * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Efeito quando o combustível da Mochila Mágica acaba
  playJetpackExhausted() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.22);

    gain.gain.setValueAtTime(this.sfxVolume * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  // Efeito de Trovão / Queda de Relâmpago
  playThunderStrike() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Onda quadrada grave + ruído de descarga
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.55);

    gain.gain.setValueAtTime(this.sfxVolume * 0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.58);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Efeito de Aviso Prévio do Perigo (Telegraph de Relâmpago ou Queda)
  playHazardWarning() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1174, now + 0.08);

    gain.gain.setValueAtTime(this.sfxVolume * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Efeito de Impacto / Dano Sofrido por Perigo da Cena
  playHazardHit() {
    if (this.isMuted || this.sfxVolume <= 0) return;
    this.resume();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.28);

    gain.gain.setValueAtTime(this.sfxVolume * 0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }
}

export const soundEngine = new SoundEngine();
