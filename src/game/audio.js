// Tabela de frequências harmônicas padrão (Hz)
const N = {
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  C3: 130.81, Cs3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Fs3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  C4: 261.63, Cs4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  C5: 523.25, Cs5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  C6: 1046.50, D6: 1174.66, E6: 1318.51,
  _: 0 // Pausa musical / repouso
};

// Banco rico de Temas Musicais Procedurais com Múltiplas Variações
const BGM_THEMES = {
  nature_pastoral: {
    variations: [
      {
        bpm: 104,
        filterFreq: 1400,
        bassOsc: 'triangle',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.05, decay: 0.35, sustain: 0.4, release: 0.2 },
        leadEnvelope: { attack: 0.04, decay: 0.18, sustain: 0.25, release: 0.15 },
        bassNotes: [N.C3, N._, N.G2, N._, N.A2, N._, N.F2, N._, N.C3, N._, N.G2, N._, N.A2, N._, N.F2, N._],
        leadNotes: [N.C5, N.E5, N.G5, N.A5, N.G5, N.E5, N.D5, N.C5, N.E5, N.G5, N.C6, N.A5, N.G5, N.E5, N.D5, N.C5]
      },
      {
        bpm: 110,
        filterFreq: 1550,
        bassOsc: 'sine',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.04, decay: 0.3, sustain: 0.35, release: 0.18 },
        leadEnvelope: { attack: 0.03, decay: 0.16, sustain: 0.22, release: 0.12 },
        bassNotes: [N.G2, N._, N.D3, N._, N.E3, N._, N.C3, N._, N.G2, N._, N.B2, N._, N.C3, N._, N.D3, N._],
        leadNotes: [N.G4, N.B4, N.D5, N.G5, N.Fs5, N.D5, N.B4, N.A4, N.B4, N.D5, N.E5, N.D5, N.B4, N.G4, N.A4, N.G4]
      }
    ]
  },

  nature_tribal: {
    variations: [
      {
        bpm: 118,
        filterFreq: 1650,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.03, decay: 0.24, sustain: 0.3, release: 0.1 },
        leadEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.2, release: 0.1 },
        bassNotes: [N.D3, N.D3, N._, N.D3, N.F3, N._, N.G3, N._, N.D3, N.D3, N._, N.C3, N.D3, N._, N.A2, N._],
        leadNotes: [N.D4, N.F4, N.G4, N.A4, N.C5, N.A4, N.G4, N.F4, N.D4, N.F4, N.D4, N.C4, N.D4, N.G4, N.F4, N.D4]
      },
      {
        bpm: 122,
        filterFreq: 1750,
        bassOsc: 'square',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.02, decay: 0.2, sustain: 0.28, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.18, release: 0.08 },
        bassNotes: [N.A2, N.A2, N.C3, N._, N.D3, N.D3, N.F3, N._, N.A2, N.A2, N.G2, N._, N.A2, N.C3, N.D3, N._],
        leadNotes: [N.A4, N.C5, N.D5, N.E5, N.G5, N.E5, N.D5, N.C5, N.A4, N.G4, N.A4, N.C5, N.D5, N.C5, N.A4, N.G4]
      }
    ]
  },

  desert_oriental: {
    variations: [
      {
        bpm: 112,
        filterFreq: 1800,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.03, decay: 0.22, sustain: 0.3, release: 0.1 },
        leadEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.2, release: 0.1 },
        bassNotes: [N.D3, N.D3, N.Eb3, N.D3, N.D3, N.D3, N.Eb3, N.D3, N.D3, N.D3, N.Eb3, N.D3, N.G3, N.Fs3, N.Eb3, N.D3],
        leadNotes: [N.D4, N.Eb4, N.Fs4, N.G4, N.A4, N.G4, N.Fs4, N.Eb4, N.D4, N.Fs4, N.A4, N.Bb4, N.A4, N.G4, N.Fs4, N.D4]
      },
      {
        bpm: 116,
        filterFreq: 1900,
        bassOsc: 'triangle',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.04, decay: 0.26, sustain: 0.32, release: 0.12 },
        leadEnvelope: { attack: 0.03, decay: 0.16, sustain: 0.22, release: 0.12 },
        bassNotes: [N.E3, N.E3, N.F3, N.E3, N.B2, N.B2, N.C3, N.B2, N.E3, N.E3, N.F3, N.E3, N.G3, N.F3, N.E3, N.B2],
        leadNotes: [N.E4, N.F4, N.Ab4, N.B4, N.C5, N.B4, N.Ab4, N.F4, N.E4, N.B4, N.C5, N.D5, N.C5, N.B4, N.Ab4, N.E4]
      }
    ]
  },

  desert_caravan: {
    variations: [
      {
        bpm: 124,
        filterFreq: 1700,
        bassOsc: 'sawtooth',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.02, decay: 0.18, sustain: 0.32, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.12, sustain: 0.2, release: 0.08 },
        bassNotes: [N.C3, N.C3, N.Eb3, N.C3, N.G2, N.G2, N.Bb2, N.G2, N.C3, N.C3, N.Eb3, N.C3, N.Ab2, N.Bb2, N.C3, N._],
        leadNotes: [N.C4, N.Eb4, N.G4, N.Ab4, N.G4, N.Eb4, N.F4, N.D4, N.Eb4, N.G4, N.C5, N.Bb4, N.Ab4, N.G4, N.F4, N.Eb4]
      },
      {
        bpm: 108,
        filterFreq: 1500,
        bassOsc: 'triangle',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.05, decay: 0.3, sustain: 0.35, release: 0.15 },
        leadEnvelope: { attack: 0.04, decay: 0.2, sustain: 0.25, release: 0.15 },
        bassNotes: [N.G2, N._, N.D3, N._, N.Eb3, N._, N.C3, N._, N.G2, N._, N.Bb2, N._, N.C3, N._, N.D3, N._],
        leadNotes: [N.G4, N.Bb4, N.D5, N.Eb5, N.D5, N.Bb4, N.C5, N.A4, N.Bb4, N.D5, N.G5, N.F5, N.Eb5, N.D5, N.C5, N.Bb4]
      }
    ]
  },

  ocean_ambient: {
    variations: [
      {
        bpm: 92,
        filterFreq: 950,
        bassOsc: 'sine',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.08, decay: 0.4, sustain: 0.5, release: 0.3 },
        leadEnvelope: { attack: 0.06, decay: 0.28, sustain: 0.3, release: 0.25 },
        bassNotes: [N.F2, N._, N.C3, N._, N.G2, N._, N.D3, N._, N.F2, N._, N.C3, N._, N.G2, N._, N.D3, N._],
        leadNotes: [N.C5, N.G4, N.A4, N.E5, N.D5, N.A4, N.C5, N.F5, N.E5, N.C5, N.G4, N.A4, N.D5, N.C5, N.A4, N.G4]
      },
      {
        bpm: 96,
        filterFreq: 1050,
        bassOsc: 'sine',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.07, decay: 0.38, sustain: 0.45, release: 0.28 },
        leadEnvelope: { attack: 0.05, decay: 0.25, sustain: 0.28, release: 0.22 },
        bassNotes: [N.C3, N._, N.G2, N._, N.A2, N._, N.E2, N._, N.F2, N._, N.C3, N._, N.G2, N._, N.C3, N._],
        leadNotes: [N.E5, N.D5, N.C5, N.G4, N.A4, N.C5, N.E5, N.G5, N.A5, N.G5, N.E5, N.C5, N.D5, N.E5, N.D5, N.C5]
      }
    ]
  },

  water_rush: {
    variations: [
      {
        bpm: 114,
        filterFreq: 1350,
        bassOsc: 'triangle',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.04, decay: 0.28, sustain: 0.35, release: 0.15 },
        leadEnvelope: { attack: 0.03, decay: 0.18, sustain: 0.22, release: 0.12 },
        bassNotes: [N.D3, N._, N.A2, N._, N.Bb2, N._, N.F2, N._, N.G2, N._, N.D3, N._, N.A2, N._, N.D3, N._],
        leadNotes: [N.D5, N.F5, N.A5, N.G5, N.F5, N.D5, N.E5, N.C5, N.D5, N.A4, N.Bb4, N.D5, N.F5, N.E5, N.D5, N.A4]
      },
      {
        bpm: 106,
        filterFreq: 1200,
        bassOsc: 'sine',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.05, decay: 0.32, sustain: 0.4, release: 0.2 },
        leadEnvelope: { attack: 0.03, decay: 0.2, sustain: 0.25, release: 0.16 },
        bassNotes: [N.A2, N._, N.E3, N._, N.F3, N._, N.D3, N._, N.A2, N._, N.E3, N._, N.G3, N._, N.A3, N._],
        leadNotes: [N.A4, N.C5, N.E5, N.D5, N.C5, N.A4, N.B4, N.G4, N.A4, N.E5, N.G5, N.A5, N.G5, N.E5, N.D5, N.A4]
      }
    ]
  },

  storm_thunder: {
    variations: [
      {
        bpm: 132,
        filterFreq: 1650,
        bassOsc: 'sawtooth',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.16, sustain: 0.4, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.12, sustain: 0.25, release: 0.08 },
        bassNotes: [N.E2, N.E2, N.G2, N.A2, N.E2, N.E2, N.D2, N.E2, N.E2, N.E2, N.G2, N.A2, N.B2, N.A2, N.G2, N.E2],
        leadNotes: [N.E4, N.G4, N.A4, N.B4, N.A4, N.G4, N.E4, N.D4, N.E4, N.G4, N.B4, N.D5, N.B4, N.A4, N.G4, N.E4]
      },
      {
        bpm: 136,
        filterFreq: 1750,
        bassOsc: 'square',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.35, release: 0.07 },
        leadEnvelope: { attack: 0.01, decay: 0.11, sustain: 0.22, release: 0.07 },
        bassNotes: [N.A2, N.A2, N.C3, N.D3, N.A2, N.A2, N.G2, N.A2, N.A2, N.A2, N.C3, N.D3, N.E3, N.D3, N.C3, N.A2],
        leadNotes: [N.A4, N.C5, N.D5, N.E5, N.D5, N.C5, N.A4, N.G4, N.A4, N.C5, N.E5, N.G5, N.E5, N.D5, N.C5, N.A4]
      }
    ]
  },

  volcano_metal: {
    variations: [
      {
        bpm: 128,
        filterFreq: 1600,
        bassOsc: 'sawtooth',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.42, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.12, sustain: 0.24, release: 0.07 },
        bassNotes: [N.D2, N.D2, N.F2, N.G2, N.D2, N.D2, N.C2, N.Cs2, N.D2, N.D2, N.F2, N.G2, N.Ab2, N.G2, N.F2, N.D2],
        leadNotes: [N.D4, N.F4, N.G4, N.Ab4, N.G4, N.F4, N.D4, N.C4, N.D4, N.F4, N.G4, N.C5, N.Ab4, N.G4, N.F4, N.D4]
      },
      {
        bpm: 125,
        filterFreq: 1550,
        bassOsc: 'square',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.18, sustain: 0.38, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.13, sustain: 0.22, release: 0.08 },
        bassNotes: [N.C2, N.C2, N.Eb2, N.F2, N.C2, N.C2, N.Bb1, N.B1, N.C2, N.C2, N.Eb2, N.F2, N.Fs2, N.F2, N.Eb2, N.C2],
        leadNotes: [N.C4, N.Eb4, N.F4, N.Fs4, N.F4, N.Eb4, N.C4, N.Bb3, N.C4, N.Eb4, N.F4, N.Bb4, N.Fs4, N.F4, N.Eb4, N.C4]
      }
    ]
  },

  crystal_dream: {
    variations: [
      {
        bpm: 102,
        filterFreq: 2400,
        bassOsc: 'triangle',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.04, decay: 0.3, sustain: 0.3, release: 0.2 },
        leadEnvelope: { attack: 0.01, decay: 0.15, sustain: 0.15, release: 0.3 },
        bassNotes: [N.E3, N._, N.B2, N._, N.C3, N._, N.G2, N._, N.E3, N._, N.B2, N._, N.C3, N._, N.G2, N._],
        leadNotes: [N.G5, N.B5, N.E6, N.D6, N.B5, N.G5, N.A5, N.E5, N.G5, N.C6, N.E6, N.D6, N.B5, N.A5, N.G5, N.E5]
      },
      {
        bpm: 98,
        filterFreq: 2600,
        bassOsc: 'sine',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.06, decay: 0.35, sustain: 0.35, release: 0.25 },
        leadEnvelope: { attack: 0.01, decay: 0.18, sustain: 0.18, release: 0.35 },
        bassNotes: [N.B2, N._, N.Fs3, N._, N.G3, N._, N.D3, N._, N.B2, N._, N.E3, N._, N.Fs3, N._, N.B2, N._],
        leadNotes: [N.Fs5, N.A5, N.D6, N.Cs6, N.A5, N.Fs5, N.G5, N.D5, N.Fs5, N.B5, N.D6, N.Cs6, N.B5, N.A5, N.Fs5, N.D5]
      }
    ]
  },

  winter_chill: {
    variations: [
      {
        bpm: 90,
        filterFreq: 1800,
        bassOsc: 'sine',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.06, decay: 0.36, sustain: 0.4, release: 0.25 },
        leadEnvelope: { attack: 0.03, decay: 0.22, sustain: 0.2, release: 0.25 },
        bassNotes: [N.C3, N._, N.G2, N._, N.Ab2, N._, N.Eb2, N._, N.F2, N._, N.C3, N._, N.G2, N._, N.C3, N._],
        leadNotes: [N.Eb5, N.D5, N.C5, N.G4, N.Ab4, N.C5, N.Eb5, N.G5, N.F5, N.Eb5, N.D5, N.C5, N.D5, N.Eb5, N.D5, N.C5]
      },
      {
        bpm: 100,
        filterFreq: 2100,
        bassOsc: 'triangle',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.04, decay: 0.28, sustain: 0.35, release: 0.18 },
        leadEnvelope: { attack: 0.02, decay: 0.17, sustain: 0.18, release: 0.22 },
        bassNotes: [N.D3, N._, N.A2, N._, N.Bb2, N._, N.F2, N._, N.G2, N._, N.D3, N._, N.A2, N._, N.D3, N._],
        leadNotes: [N.F5, N.A5, N.D6, N.C6, N.A5, N.F5, N.G5, N.E5, N.F5, N.A5, N.C6, N.Bb5, N.A5, N.G5, N.F5, N.E5]
      }
    ]
  },

  sky_floating: {
    variations: [
      {
        bpm: 98,
        filterFreq: 1700,
        bassOsc: 'triangle',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.05, decay: 0.35, sustain: 0.4, release: 0.2 },
        leadEnvelope: { attack: 0.04, decay: 0.22, sustain: 0.24, release: 0.2 },
        bassNotes: [N.F2, N._, N.C3, N._, N.D3, N._, N.Bb2, N._, N.F2, N._, N.C3, N._, N.G2, N._, N.C3, N._],
        leadNotes: [N.A4, N.C5, N.F5, N.G5, N.A5, N.G5, N.F5, N.D5, N.C5, N.F5, N.A5, N.C6, N.Bb5, N.A5, N.G5, N.F5]
      },
      {
        bpm: 106,
        filterFreq: 1850,
        bassOsc: 'sine',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.04, decay: 0.3, sustain: 0.35, release: 0.18 },
        leadEnvelope: { attack: 0.03, decay: 0.18, sustain: 0.2, release: 0.15 },
        bassNotes: [N.G2, N._, N.D3, N._, N.E3, N._, N.C3, N._, N.G2, N._, N.D3, N._, N.A2, N._, N.D3, N._],
        leadNotes: [N.B4, N.D5, N.G5, N.A5, N.B5, N.A5, N.G5, N.E5, N.D5, N.G5, N.B5, N.D6, N.C6, N.B5, N.A5, N.G5]
      }
    ]
  },

  synthwave_neon: {
    variations: [
      {
        bpm: 122,
        filterFreq: 2100,
        bassOsc: 'square',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.16, sustain: 0.38, release: 0.06 },
        leadEnvelope: { attack: 0.02, decay: 0.12, sustain: 0.24, release: 0.08 },
        bassNotes: [N.Fs2, N.Fs2, N.A2, N.B2, N.Fs2, N.Fs2, N.E2, N.Fs2, N.D2, N.D2, N.Fs2, N.A2, N.E2, N.E2, N.Gs2, N.B2],
        leadNotes: [N.Fs4, N.A4, N.Cs5, N.E5, N.Cs5, N.A4, N.B4, N.Gs4, N.A4, N.Cs5, N.Fs5, N.E5, N.Cs5, N.B4, N.A4, N.Gs4]
      },
      {
        bpm: 126,
        filterFreq: 2200,
        bassOsc: 'sawtooth',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.36, release: 0.06 },
        leadEnvelope: { attack: 0.01, decay: 0.10, sustain: 0.22, release: 0.06 },
        bassNotes: [N.D3, N.D3, N.F3, N.G3, N.D3, N.D3, N.C3, N.D3, N.Bb2, N.Bb2, N.D3, N.F3, N.C3, N.C3, N.E3, N.G3],
        leadNotes: [N.D5, N.F5, N.A5, N.C6, N.A5, N.F5, N.G5, N.E5, N.F5, N.A5, N.D6, N.C6, N.A5, N.G5, N.F5, N.E5]
      }
    ]
  },

  digital_data: {
    variations: [
      {
        bpm: 120,
        filterFreq: 2000,
        bassOsc: 'square',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.01, decay: 0.12, sustain: 0.3, release: 0.05 },
        leadEnvelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.05 },
        bassNotes: [N.C3, N.C3, N.G2, N.G2, N.A2, N.A2, N.F2, N.F2, N.C3, N.C3, N.G2, N.G2, N.A2, N.A2, N.Bb2, N.B2],
        leadNotes: [N.C5, N.G4, N.C5, N.E5, N.G5, N.E5, N.D5, N.B4, N.C5, N.A4, N.C5, N.F5, N.A5, N.G5, N.F5, N.D5]
      },
      {
        bpm: 128,
        filterFreq: 2150,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.32, release: 0.06 },
        leadEnvelope: { attack: 0.01, decay: 0.10, sustain: 0.2, release: 0.06 },
        bassNotes: [N.G2, N.G2, N.D3, N.D3, N.Eb3, N.Eb3, N.C3, N.C3, N.G2, N.G2, N.Bb2, N.Bb2, N.C3, N.C3, N.D3, N.D3],
        leadNotes: [N.G4, N.Bb4, N.D5, N.G5, N.F5, N.D5, N.Eb5, N.C5, N.D5, N.Bb4, N.C5, N.Eb5, N.G5, N.F5, N.Eb5, N.D5]
      }
    ]
  },

  chiptune_retro: {
    variations: [
      {
        bpm: 130,
        filterFreq: 2300,
        bassOsc: 'square',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.01, decay: 0.12, sustain: 0.35, release: 0.05 },
        leadEnvelope: { attack: 0.01, decay: 0.09, sustain: 0.22, release: 0.05 },
        bassNotes: [N.C3, N.C3, N.E3, N.G3, N.F2, N.F2, N.A2, N.C3, N.G2, N.G2, N.B2, N.D3, N.C3, N.G2, N.C3, N._],
        leadNotes: [N.C5, N.E5, N.G5, N.C6, N.A5, N.F5, N.G5, N.E5, N.F5, N.D5, N.E5, N.C5, N.D5, N.B4, N.C5, N._]
      },
      {
        bpm: 134,
        filterFreq: 2400,
        bassOsc: 'square',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.01, decay: 0.11, sustain: 0.32, release: 0.05 },
        leadEnvelope: { attack: 0.01, decay: 0.08, sustain: 0.2, release: 0.05 },
        bassNotes: [N.F2, N.F2, N.A2, N.C3, N.Bb2, N.Bb2, N.D3, N.F3, N.C3, N.C3, N.E3, N.G3, N.F2, N.C3, N.F2, N._],
        leadNotes: [N.F5, N.A5, N.C6, N.A5, N.Bb5, N.G5, N.A5, N.F5, N.G5, N.E5, N.F5, N.D5, N.E5, N.C5, N.F5, N._]
      }
    ]
  },

  puzzle_mystery: {
    variations: [
      {
        bpm: 114,
        filterFreq: 1800,
        bassOsc: 'triangle',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.03, decay: 0.22, sustain: 0.32, release: 0.1 },
        leadEnvelope: { attack: 0.01, decay: 0.12, sustain: 0.2, release: 0.08 },
        bassNotes: [N.A2, N._, N.E3, N._, N.F3, N._, N.C3, N._, N.D3, N._, N.A2, N._, N.B2, N._, N.E3, N._],
        leadNotes: [N.A4, N.C5, N.E5, N.B4, N.C5, N.E5, N.A5, N.G5, N.F5, N.D5, N.E5, N.C5, N.D5, N.B4, N.A4, N.E4]
      },
      {
        bpm: 118,
        filterFreq: 1900,
        bassOsc: 'square',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.02, decay: 0.18, sustain: 0.28, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.18, release: 0.1 },
        bassNotes: [N.E3, N._, N.B2, N._, N.C3, N._, N.G2, N._, N.A2, N._, N.E3, N._, N.Fs2, N._, N.B2, N._],
        leadNotes: [N.E5, N.G5, N.B5, N.Fs5, N.G5, N.B5, N.E6, N.D6, N.C6, N.A5, N.B5, N.G5, N.A5, N.Fs5, N.E5, N.B4]
      }
    ]
  },

  cosmic_voyage: {
    variations: [
      {
        bpm: 95,
        filterFreq: 1200,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.06, decay: 0.45, sustain: 0.45, release: 0.25 },
        leadEnvelope: { attack: 0.05, decay: 0.26, sustain: 0.3, release: 0.3 },
        bassNotes: [N.C3, N._, N.G2, N._, N.Ab2, N._, N.Bb2, N._, N.C3, N._, N.G2, N._, N.Ab2, N._, N.Bb2, N._],
        leadNotes: [N.G4, N.C5, N.Eb5, N.G5, N.F5, N.Eb5, N.D5, N.Bb4, N.C5, N.Eb5, N.G5, N.Bb5, N.Ab5, N.G5, N.F5, N.Eb5]
      },
      {
        bpm: 92,
        filterFreq: 1150,
        bassOsc: 'triangle',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.08, decay: 0.48, sustain: 0.5, release: 0.3 },
        leadEnvelope: { attack: 0.06, decay: 0.28, sustain: 0.32, release: 0.32 },
        bassNotes: [N.Eb3, N._, N.Bb2, N._, N.B2, N._, N.Db3, N._, N.Eb3, N._, N.Bb2, N._, N.B2, N._, N.Db3, N._],
        leadNotes: [N.Bb4, N.Eb5, N.Gb5, N.Bb5, N.Ab5, N.Gb5, N.F5, N.Db5, N.Eb5, N.Gb5, N.Bb5, N.Db6, N.B5, N.Bb5, N.Ab5, N.Gb5]
      }
    ]
  },

  solar_pulsar: {
    variations: [
      {
        bpm: 112,
        filterFreq: 1550,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.03, decay: 0.25, sustain: 0.35, release: 0.12 },
        leadEnvelope: { attack: 0.03, decay: 0.16, sustain: 0.24, release: 0.12 },
        bassNotes: [N.G2, N.G2, N.B2, N.D3, N.C3, N.C3, N.E3, N.G3, N.D3, N.D3, N.Fs3, N.A3, N.G2, N.D3, N.G3, N._],
        leadNotes: [N.G4, N.B4, N.D5, N.G5, N.E5, N.C5, N.D5, N.B4, N.C5, N.A4, N.B4, N.G4, N.A4, N.Fs4, N.G4, N._]
      },
      {
        bpm: 120,
        filterFreq: 1650,
        bassOsc: 'square',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.2, sustain: 0.3, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.22, release: 0.08 },
        bassNotes: [N.D3, N.D3, N.F3, N.G3, N.Bb2, N.Bb2, N.C3, N.D3, N.C3, N.C3, N.E3, N.G3, N.D3, N.A2, N.D3, N._],
        leadNotes: [N.D5, N.F5, N.G5, N.A5, N.F5, N.D5, N.E5, N.C5, N.D5, N.Bb4, N.C5, N.A4, N.Bb4, N.G4, N.A4, N._]
      }
    ]
  },

  quantum_pulse: {
    variations: [
      {
        bpm: 110,
        filterFreq: 1600,
        bassOsc: 'sawtooth',
        leadOsc: 'sine',
        bassEnvelope: { attack: 0.04, decay: 0.28, sustain: 0.35, release: 0.15 },
        leadEnvelope: { attack: 0.02, decay: 0.16, sustain: 0.2, release: 0.18 },
        bassNotes: [N.E3, N.E3, N.G3, N._, N.A3, N.A3, N.B3, N._, N.C3, N.C3, N.D3, N._, N.E3, N.B2, N.E3, N._],
        leadNotes: [N.E5, N.G5, N.B5, N.D6, N.C6, N.A5, N.B5, N.G5, N.A5, N.E5, N.G5, N.D5, N.E5, N.B4, N.E5, N._]
      },
      {
        bpm: 116,
        filterFreq: 1750,
        bassOsc: 'triangle',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.03, decay: 0.22, sustain: 0.3, release: 0.1 },
        leadEnvelope: { attack: 0.01, decay: 0.12, sustain: 0.2, release: 0.08 },
        bassNotes: [N.A2, N.A2, N.C3, N._, N.D3, N.D3, N.E3, N._, N.F2, N.F2, N.G2, N._, N.A2, N.E2, N.A2, N._],
        leadNotes: [N.A4, N.C5, N.E5, N.G5, N.F5, N.D5, N.E5, N.C5, N.D5, N.A4, N.C5, N.G4, N.A4, N.E4, N.A4, N._]
      }
    ]
  },

  epic_heroic: {
    variations: [
      {
        bpm: 125,
        filterFreq: 2200,
        bassOsc: 'triangle',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.03, decay: 0.2, sustain: 0.4, release: 0.1 },
        leadEnvelope: { attack: 0.03, decay: 0.16, sustain: 0.3, release: 0.1 },
        bassNotes: [N.C3, N.C3, N.G2, N.G2, N.A2, N.A2, N.F2, N.F2, N.C3, N.E3, N.F3, N.G3, N.C3, N.G2, N.C3, N._],
        leadNotes: [N.C5, N.E5, N.G5, N.G5, N.A5, N.G5, N.F5, N.E5, N.G5, N.C6, N.B5, N.G5, N.A5, N.B5, N.C6, N._]
      },
      {
        bpm: 128,
        filterFreq: 2300,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.02, decay: 0.18, sustain: 0.38, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.26, release: 0.1 },
        bassNotes: [N.D3, N.D3, N.A2, N.A2, N.B2, N.B2, N.G2, N.G2, N.D3, N.Fs3, N.G3, N.A3, N.D3, N.A2, N.D3, N._],
        leadNotes: [N.D5, N.Fs5, N.A5, N.A5, N.B5, N.A5, N.G5, N.Fs5, N.A5, N.D6, N.Cs6, N.A5, N.B5, N.Cs6, N.D6, N._]
      }
    ]
  },

  dragon_danger: {
    variations: [
      {
        bpm: 126,
        filterFreq: 1800,
        bassOsc: 'sawtooth',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.16, sustain: 0.45, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.13, sustain: 0.28, release: 0.08 },
        bassNotes: [N.D2, N.D2, N.F2, N.D2, N.Ab2, N.G2, N.F2, N.D2, N.D2, N.D2, N.F2, N.D2, N.C3, N.B2, N.Ab2, N.G2],
        leadNotes: [N.D4, N.F4, N.Ab4, N.A4, N.D5, N.C5, N.Ab4, N.F4, N.D4, N.Ab4, N.A4, N.D5, N.F5, N.D5, N.C5, N.Ab4]
      },
      {
        bpm: 130,
        filterFreq: 1950,
        bassOsc: 'square',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.4, release: 0.07 },
        leadEnvelope: { attack: 0.02, decay: 0.12, sustain: 0.25, release: 0.07 },
        bassNotes: [N.G2, N.G2, N.Bb2, N.G2, N.Db3, N.C3, N.Bb2, N.G2, N.G2, N.G2, N.Bb2, N.G2, N.F3, N.E3, N.Db3, N.C3],
        leadNotes: [N.G4, N.Bb4, N.Db5, N.D5, N.G5, N.F5, N.Db5, N.Bb4, N.G4, N.Db5, N.D5, N.G5, N.Bb5, N.G5, N.F5, N.Db5]
      }
    ]
  },

  carnival_groove: {
    variations: [
      {
        bpm: 128,
        filterFreq: 2100,
        bassOsc: 'triangle',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.02, decay: 0.16, sustain: 0.35, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.10, sustain: 0.22, release: 0.06 },
        bassNotes: [N.F2, N.F2, N._, N.F2, N.C3, N.C3, N._, N.C3, N.Bb2, N.Bb2, N._, N.Bb2, N.C3, N.D3, N.Eb3, N.E3],
        leadNotes: [N.F5, N.A5, N.C6, N.A5, N.G5, N.E5, N.F5, N.C5, N.D5, N.F5, N.Bb5, N.A5, N.G5, N.F5, N.E5, N.C5]
      },
      {
        bpm: 132,
        filterFreq: 2250,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.32, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.11, sustain: 0.24, release: 0.08 },
        bassNotes: [N.Bb2, N.Bb2, N._, N.Bb2, N.F3, N.F3, N._, N.F3, N.Eb3, N.Eb3, N._, N.Eb3, N.F3, N.G3, N.Ab3, N.A3],
        leadNotes: [N.Bb4, N.D5, N.F5, N.D5, N.C5, N.A4, N.Bb4, N.F4, N.G4, N.Bb4, N.Eb5, N.D5, N.C5, N.Bb4, N.A4, N.F4]
      }
    ]
  },

  playful_bounce: {
    variations: [
      {
        bpm: 126,
        filterFreq: 2000,
        bassOsc: 'triangle',
        leadOsc: 'square',
        bassEnvelope: { attack: 0.02, decay: 0.14, sustain: 0.3, release: 0.06 },
        leadEnvelope: { attack: 0.01, decay: 0.09, sustain: 0.2, release: 0.06 },
        bassNotes: [N.C3, N._, N.G2, N._, N.E3, N._, N.G2, N._, N.F2, N._, N.A2, N._, N.G2, N._, N.B2, N._],
        leadNotes: [N.E5, N.G5, N.C6, N.G5, N.E5, N.C5, N.D5, N.B4, N.C5, N.E5, N.A5, N.F5, N.G5, N.E5, N.D5, N.C5]
      },
      {
        bpm: 124,
        filterFreq: 2100,
        bassOsc: 'square',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.02, decay: 0.15, sustain: 0.32, release: 0.07 },
        leadEnvelope: { attack: 0.02, decay: 0.10, sustain: 0.22, release: 0.07 },
        bassNotes: [N.G2, N._, N.D3, N._, N.B2, N._, N.D3, N._, N.C3, N._, N.E3, N._, N.D3, N._, N.Fs3, N._],
        leadNotes: [N.B4, N.D5, N.G5, N.D5, N.B4, N.G4, N.A4, N.Fs4, N.G4, N.B4, N.E5, N.C5, N.D5, N.B4, N.A4, N.G4]
      }
    ]
  },

  steampunk_clockwork: {
    variations: [
      {
        bpm: 116,
        filterFreq: 1750,
        bassOsc: 'sawtooth',
        leadOsc: 'triangle',
        bassEnvelope: { attack: 0.02, decay: 0.18, sustain: 0.35, release: 0.08 },
        leadEnvelope: { attack: 0.02, decay: 0.13, sustain: 0.22, release: 0.08 },
        bassNotes: [N.D3, N.A2, N.D3, N.A2, N.F3, N.C3, N.F3, N.C3, N.G3, N.D3, N.G3, N.D3, N.A3, N.E3, N.A3, N._],
        leadNotes: [N.D5, N.F5, N.A5, N.F5, N.C6, N.A5, N.F5, N.D5, N.Bb5, N.G5, N.D5, N.Bb4, N.A5, N.F5, N.E5, N.D5]
      },
      {
        bpm: 120,
        filterFreq: 1850,
        bassOsc: 'square',
        leadOsc: 'sawtooth',
        bassEnvelope: { attack: 0.02, decay: 0.16, sustain: 0.32, release: 0.07 },
        leadEnvelope: { attack: 0.02, decay: 0.11, sustain: 0.2, release: 0.07 },
        bassNotes: [N.A2, N.E3, N.A2, N.E3, N.C3, N.G3, N.C3, N.G3, N.D3, N.A3, N.D3, N.A3, N.E3, N.B3, N.E3, N._],
        leadNotes: [N.A4, N.C5, N.E5, N.C5, N.G5, N.E5, N.C5, N.A4, N.F5, N.D5, N.A4, N.F4, N.E5, N.C5, N.B4, N.A4]
      }
    ]
  }
};

/**
 * Sintetizador Procedural de Áudio com Web Audio API
 * Produz efeitos sonoros ricos (SFX) e Trilhas Musicais Temáticas Variadas (BGM)
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
    this.currentSignature = null;
    this.lastSignature = null;
    this.recentSignatures = [];
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

  unlock() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    // Toca um buffer silencioso de 1 amostra para desbloquear a saída de áudio no iOS Safari / WebKit
    try {
      const buffer = this.ctx.createBuffer(1, 1, 22050);
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(this.ctx.destination);
      source.start(0);
    } catch (e) {
      /* ignore */
    }
  }

  resume() {
    this.unlock();
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

  // Mapeia temas de fases para 23 estilos musicais ricos e temáticos
  getThemeGenre(theme) {
    switch (theme) {
      case 'forest':
      case 'spring_season':
      case 'wood':
        return 'nature_pastoral';
      case 'indigenous':
      case 'autumn':
        return 'nature_tribal';
      case 'desert':
      case 'pyramids':
        return 'desert_oriental';
      case 'dune_storm':
      case 'ruins':
        return 'desert_caravan';
      case 'ocean':
      case 'ship':
        return 'ocean_ambient';
      case 'waterfall':
      case 'rain':
        return 'water_rush';
      case 'storm':
      case 'rock':
        return 'storm_thunder';
      case 'volcano':
      case 'obsidian':
        return 'volcano_metal';
      case 'crystal':
      case 'aurora':
        return 'crystal_dream';
      case 'arctic':
      case 'winter':
        return 'winter_chill';
      case 'sky':
        return 'sky_floating';
      case 'cyberpunk':
      case 'metropolis':
        return 'synthwave_neon';
      case 'internet':
      case 'computer':
        return 'digital_data';
      case 'arcade':
      case 'geometry':
        return 'chiptune_retro';
      case 'magic_cube':
        return 'puzzle_mystery';
      case 'cosmos':
      case 'singularity':
        return 'cosmic_voyage';
      case 'solar':
      case 'asteroid':
        return 'solar_pulsar';
      case 'quantum':
        return 'quantum_pulse';
      case 'olympus':
      case 'heroes':
        return 'epic_heroic';
      case 'dragon':
        return 'dragon_danger';
      case 'carnival':
      case 'music':
        return 'carnival_groove';
      case 'candy':
      case 'soccer':
        return 'playful_bounce';
      case 'steampunk':
      case 'iron':
        return 'steampunk_clockwork';
      default:
        return 'nature_pastoral';
    }
  }

  // Toca uma nota sintetizada com envelope ADSR garantidamente monotônico (evita quebra do WebKit no iOS)
  playNote(freq, type, duration, envelope = {}, targetGainNode, time) {
    if (!freq || freq <= 0 || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const startTime = Math.max(now + 0.002, time);
      const totalDur = Math.max(0.05, duration);

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Parâmetros ADSR balanceados e estritamente monotônicos para o WebKit
      const rawAttack = Math.max(0.005, envelope.attack || 0.02);
      const rawRelease = Math.max(0.01, envelope.release || 0.04);
      const attack = Math.min(rawAttack, totalDur * 0.25);
      const release = Math.min(rawRelease, totalDur * 0.35);
      const maxDecay = Math.max(0.005, totalDur - attack - release);
      const decay = Math.min(Math.max(0.005, envelope.decay || 0.05), maxDecay * 0.6);
      const sustainLevel = Math.max(0.01, Math.min(1.0, envelope.sustain ?? 0.3));
      const peakGain = 0.22;

      const t0 = startTime;
      const tAttack = t0 + attack;
      const tDecay = tAttack + decay;
      const tEnd = t0 + totalDur;
      const tSustainEnd = Math.max(tDecay + 0.002, tEnd - release);

      noteGain.gain.setValueAtTime(0.0001, t0);
      noteGain.gain.linearRampToValueAtTime(peakGain, tAttack);
      noteGain.gain.linearRampToValueAtTime(peakGain * sustainLevel, tDecay);
      if (tSustainEnd > tDecay) {
        noteGain.gain.setValueAtTime(peakGain * sustainLevel, tSustainEnd);
      }
      noteGain.gain.linearRampToValueAtTime(0.0001, tEnd);

      osc.connect(noteGain);
      noteGain.connect(targetGainNode);

      osc.start(t0);
      osc.stop(tEnd + 0.02);
    } catch (e) {
      /* ignore audio context schedule errors */
    }
  }

  // Inicia a música de fundo dinâmica adaptada à fase atual com proteção anti-repetição
  startStageBGM(stageTheme = 'forest', stageId = 1) {
    this.resume();
    if (!this.ctx) return;

    const genre = this.getThemeGenre(stageTheme);
    const themeConfig = BGM_THEMES[genre] || BGM_THEMES.nature_pastoral;
    const variations = themeConfig.variations || [themeConfig];

    // Calcula a variação baseada no stageId
    const numId = typeof stageId === 'number' ? stageId : parseInt(stageId, 10) || 1;
    let varIndex = (numId - 1) % variations.length;

    let signature = `${genre}_v${varIndex}`;

    // Mecanismo Anti-Repetição: se a assinatura resultante for a mesma que acabou de tocar,
    // ou se está na lista das últimas tocadas recentemente, tenta a outra variação
    if (this.recentSignatures.length > 0 && this.recentSignatures[this.recentSignatures.length - 1] === signature) {
      varIndex = (varIndex + 1) % variations.length;
      signature = `${genre}_v${varIndex}`;
    }

    // Se já estiver tocando exatamente esta música/variação neste exato instante, mantém o fluxo
    if (this.currentSignature === signature && this.bgmPlaying) {
      return;
    }

    this.stopBGM(0.35); // Fade out suave do tema anterior
    this.currentTheme = genre;
    this.currentSignature = signature;

    // Registra histórico recente (mantém até 3 anteriores)
    this.recentSignatures.push(signature);
    if (this.recentSignatures.length > 4) {
      this.recentSignatures.shift();
    }

    this.bgmPlaying = true;

    const config = variations[varIndex] || variations[0];
    this.bgmGainNode = this.ctx.createGain();
    const targetVol = this.isMuted ? 0 : this.bgmVolume * 0.35;
    this.bgmGainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.bgmGainNode.gain.linearRampToValueAtTime(targetVol, this.ctx.currentTime + 0.5);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(config.filterFreq || 1600, this.ctx.currentTime);

    this.bgmGainNode.connect(filter);
    filter.connect(this.ctx.destination);
    const bgmOutput = this.bgmGainNode;

    // Sequenciador de compassos (8 notas por compasso = 16 passos)
    const stepDuration = 60 / config.bpm / 2;
    this.nextNoteTime = this.ctx.currentTime + 0.08;
    this.stepIndex = 0;

    this.bgmTimer = setInterval(() => {
      if (!this.bgmPlaying || !this.ctx) return;

      // Se o contexto estiver suspenso no iOS Safari, tenta despausar
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      // Se o tempo avançou após desbloqueio no iOS, realinha para evitar acumular notas passadas
      if (this.nextNoteTime < this.ctx.currentTime) {
        this.nextNoteTime = this.ctx.currentTime + 0.02;
      }

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

// Auto-desbloqueio do Web Audio API no primeiro gesto do usuário (fundamental no iOS Safari / WebKit)
if (typeof window !== 'undefined') {
  const unlockEvents = ['touchstart', 'touchend', 'mousedown', 'pointerdown', 'keydown'];
  const handleUserGesture = () => {
    soundEngine.unlock();
    if (soundEngine.ctx && soundEngine.ctx.state === 'running') {
      unlockEvents.forEach((evt) => window.removeEventListener(evt, handleUserGesture, true));
    }
  };
  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleUserGesture, { capture: true, passive: true });
  });
}
