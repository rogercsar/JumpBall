/**
 * BackgroundRenderer — Motor de Cenários e Parallax Dinâmico do JumpBall
 * Renderiza camadas de profundidade, ilustrações temáticas procedurais e partículas atmosféricas
 * para cada uma das 10 fases cósmicas com performance a 60/120 FPS no Canvas 2D.
 */
export class BackgroundRenderer {
  constructor(width, height, stage) {
    this.width = width;
    this.height = height;
    this.stage = stage;
    this.theme = stage.theme || 'forest';
    this.isMobile = typeof navigator !== 'undefined' && (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (typeof window !== 'undefined' && window.innerWidth < 768));

    this.time = 0;
    this.particles = [];
    this.celestialObjects = [];
    this.lightningTimer = 0;
    this.lightningIntensity = 0;

    this.initThemeAtmosphere();
  }

  initThemeAtmosphere() {
    this.particles = [];

    // 1. Floresta: Vaga-lumes luminosos
    if (this.theme === 'forest') {
      for (let i = 0; i < 22; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.8 + 1.5,
          speedY: -(Math.random() * 0.35 + 0.15),
          speedX: (Math.random() - 0.5) * 0.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.04 + 0.02,
          color: Math.random() > 0.3 ? 'rgba(74, 222, 128,' : 'rgba(250, 204, 21,'
        });
      }
    }

    // 2. Deserto: Partículas de areia sopradas pelo vento
    else if (this.theme === 'desert') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1.8 + 1.2,
          speedY: Math.random() * 0.4 - 0.2,
          opacity: Math.random() * 0.4 + 0.2
        });
      }
    }

    // 3. Oceano: Bolhas subindo e plâncton
    else if (this.theme === 'ocean') {
      for (let i = 0; i < 28; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.5 + 1.5,
          speedY: -(Math.random() * 0.7 + 0.3),
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.05 + 0.02,
          opacity: Math.random() * 0.5 + 0.25
        });
      }
    }

    // 4. Tempestade: Faíscas e névoa
    else if (this.theme === 'thunder') {
      for (let i = 0; i < 24; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2 + 1,
          speedY: Math.random() * 2 + 1.5,
          speedX: (Math.random() - 0.5) * 1.5,
          life: Math.random()
        });
      }
    }

    // 5. Vulcão: Brasas incandescentes (embers)
    else if (this.theme === 'volcano') {
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.5,
          speedY: -(Math.random() * 1.2 + 0.5),
          speedX: (Math.random() - 0.5) * 0.8,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.4 ? '#f97316' : '#ef4444'
        });
      }
    }

    // 6. Ártico: Flocos de neve
    else if (this.theme === 'arctic') {
      for (let i = 0; i < 38; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.8 + 1,
          speedY: Math.random() * 0.8 + 0.4,
          speedX: (Math.random() - 0.5) * 0.6,
          wobble: Math.random() * Math.PI * 2
        });
      }
    }

    // 7. Caverna de Cristais: Poeira mágica prismática
    else if (this.theme === 'crystal') {
      for (let i = 0; i < 26; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.5 + 1.2,
          speedY: -(Math.random() * 0.3 + 0.1),
          speedX: (Math.random() - 0.5) * 0.4,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(192, 132, 252,' : 'rgba(96, 165, 250,'
        });
      }
    }

    // 8. Céu / Santuário: Nuvens e plumas
    else if (this.theme === 'sky') {
      for (let i = 0; i < 18; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 20 + 15,
          speedX: -(Math.random() * 0.4 + 0.15),
          opacity: Math.random() * 0.15 + 0.08
        });
      }
    }

    // 9. Cyberpunk: Chuva neon e reflexos
    else if (this.theme === 'cyberpunk') {
      for (let i = 0; i < 32; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          len: Math.random() * 14 + 8,
          speedY: Math.random() * 5 + 3.5,
          speedX: -1.2,
          color: Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(236, 72, 153, 0.35)'
        });
      }
    }

    // 10. Espaço / Cosmos: Estrelas cintilantes e estrelas cadentes
    else if (this.theme === 'space' || this.theme === 'cosmos') {
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2 + 0.8,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.05 + 0.02
        });
      }
    }

    // 11. Cachoeira: Spray de água e névoa ascendente
    else if (this.theme === 'waterfall') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.2,
          speedY: -(Math.random() * 1.6 + 0.8),
          speedX: (Math.random() - 0.5) * 0.8,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.05 + 0.02,
          color: 'rgba(153, 246, 228,'
        });
      }
    }

    // 12. Floresta Sagrada Indígena: Espíritos da mata e folhas
    else if (this.theme === 'indigenous') {
      for (let i = 0; i < 28; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.5,
          speedY: -(Math.random() * 0.5 + 0.2),
          speedX: Math.sin(Math.random() * Math.PI) * 0.4,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.04 + 0.02,
          color: Math.random() > 0.4 ? 'rgba(217, 249, 157,' : 'rgba(250, 204, 21,'
        });
      }
    }

    // 13. Tempestade de Monção: Chuva densa e veloz
    else if (this.theme === 'rain') {
      for (let i = 0; i < 45; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          len: Math.random() * 22 + 14,
          speedY: Math.random() * 6 + 7,
          speedX: -2.2,
          color: 'rgba(186, 230, 253, 0.45)'
        });
      }
    }

    // 14. Tundra do Inverno: Nevasca polar cortante
    else if (this.theme === 'winter') {
      for (let i = 0; i < 45; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.5 + 1.2,
          speedY: Math.random() * 1.5 + 0.8,
          speedX: Math.random() * 3 + 2.5,
          wobble: Math.random() * Math.PI * 2
        });
      }
    }

    // 15. Deserto das Tempestades: Areia em vórtice
    else if (this.theme === 'dune_storm') {
      for (let i = 0; i < 45; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.2 + 1,
          speedX: -(Math.random() * 3.5 + 2.0),
          speedY: Math.random() * 0.8 - 0.4,
          opacity: Math.random() * 0.5 + 0.25,
          color: 'rgba(251, 191, 36,'
        });
      }
    }

    // 16. Cidadela Flutuante: Fragmentos de éter
    else if (this.theme === 'ruins') {
      for (let i = 0; i < 25; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.8 + 1.2,
          speedY: -(Math.random() * 0.4 + 0.15),
          speedX: (Math.random() - 0.5) * 0.3,
          pulse: Math.random() * Math.PI * 2,
          color: 'rgba(199, 210, 254,'
        });
      }
    }

    // 17. Fenda de Obsidiana: Fagulhas e brasas de magma
    else if (this.theme === 'obsidian') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.5,
          speedY: -(Math.random() * 1.6 + 0.8),
          speedX: (Math.random() - 0.5) * 1.0,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.5 ? '#ef4444' : '#f97316'
        });
      }
    }

    // 18. Tempestade Solar: Plasma e fótons
    else if (this.theme === 'solar') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.5 + 1.5,
          speedX: Math.random() * 2.5 + 1.5,
          speedY: (Math.random() - 0.5) * 1.2,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.4 ? '#f59e0b' : '#ffedd5'
        });
      }
    }

    // 19. Cinturão de Asteroides: Poeira e fragmentos cósmicos
    else if (this.theme === 'asteroid') {
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.4 + 0.8,
          speedY: -(Math.random() * 0.3 + 0.1),
          speedX: (Math.random() - 0.5) * 0.4,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.06 + 0.02
        });
      }
    }

    // 20. Singularidade Cósmica: Partículas gravitacionais
    else if (this.theme === 'singularity') {
      for (let i = 0; i < 45; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.2 + 1.2,
          speedY: -(Math.random() * 1.2 + 0.4),
          speedX: (Math.random() - 0.5) * 1.5,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.5 ? '#f43f5e' : '#a855f7'
        });
      }
    }

    // 21. Olimpo: Poeira divina dourada
    else if (this.theme === 'olympus') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.8 + 1.2,
          speedY: -(Math.random() * 0.5 + 0.2),
          speedX: (Math.random() - 0.5) * 0.4,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.4 ? 'rgba(250, 204, 21,' : 'rgba(254, 240, 138,'
        });
      }
    }

    // 22. Campo de Futebol: Confetes e faíscas de vitória
    else if (this.theme === 'soccer') {
      for (let i = 0; i < 28; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.5,
          speedY: Math.random() * 1.2 + 0.6,
          speedX: (Math.random() - 0.5) * 1.2,
          wobble: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(34, 197, 94,' : 'rgba(255, 255, 255,'
        });
      }
    }

    // 23. Barco/Nau: Brisa marítima e espuma do mar
    else if (this.theme === 'ship') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.5 + 1,
          speedX: -(Math.random() * 2.2 + 1.0),
          speedY: Math.random() * 0.8 - 0.4,
          opacity: Math.random() * 0.5 + 0.25
        });
      }
    }

    // 24. Primavera: Pétalas de cerejeira (sakura) flutuantes
    else if (this.theme === 'spring_season') {
      for (let i = 0; i < 36; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.5 + 2,
          speedY: Math.random() * 0.7 + 0.3,
          speedX: Math.random() * 1.0 + 0.3,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.04,
          color: Math.random() > 0.3 ? 'rgba(244, 114, 182,' : 'rgba(251, 207, 232,'
        });
      }
    }

    // 25. Outono: Folhas de carvalho e bordo secas caindo
    else if (this.theme === 'autumn') {
      for (let i = 0; i < 34; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.8 + 2.2,
          speedY: Math.random() * 0.9 + 0.4,
          speedX: -(Math.random() * 1.2 + 0.4),
          wobble: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(249, 115, 22,' : 'rgba(234, 88, 12,'
        });
      }
    }

    // 26. Multiverso dos Heróis: Faíscas de energia cinética
    else if (this.theme === 'heroes') {
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.2,
          speedY: -(Math.random() * 1.8 + 0.6),
          speedX: (Math.random() - 0.5) * 1.2,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.5 ? '#60a5fa' : '#ef4444'
        });
      }
    }

    // 27. Computador: Bits de dados binários e pulso eletrônico
    else if (this.theme === 'computer') {
      for (let i = 0; i < 32; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.5 + 1.2,
          speedY: -(Math.random() * 1.5 + 0.5),
          speedX: 0,
          color: Math.random() > 0.4 ? 'rgba(52, 211, 153,' : 'rgba(16, 185, 129,'
        });
      }
    }

    // 28. Música: Notas musicais estelares flutuantes
    else if (this.theme === 'music') {
      for (let i = 0; i < 26; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 2,
          speedY: -(Math.random() * 0.8 + 0.3),
          speedX: Math.sin(Math.random() * Math.PI * 2) * 0.4,
          wobble: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(192, 132, 252,' : 'rgba(233, 213, 255,'
        });
      }
    }

    // 29. Internet: Pacotes de rede navegando na malha
    else if (this.theme === 'internet') {
      for (let i = 0; i < 34; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.8 + 1.4,
          speedX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 0.8),
          speedY: (Math.random() - 0.5) * 0.8,
          pulse: Math.random() * Math.PI * 2,
          color: 'rgba(34, 211, 238,'
        });
      }
    }

    // 30. Geometria: Fragmentos poliédricos neon
    else if (this.theme === 'geometry') {
      for (let i = 0; i < 28; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.5 + 2,
          speedY: -(Math.random() * 0.9 + 0.3),
          speedX: (Math.random() - 0.5) * 0.6,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(129, 140, 248,' : 'rgba(199, 210, 254,'
        });
      }
    }

    // 31. Cubo Mágico: Facetas coloridas flutuantes
    else if (this.theme === 'magic_cube') {
      const cubeColors = ['rgba(239, 68, 68,', 'rgba(59, 130, 246,', 'rgba(234, 179, 8,', 'rgba(34, 197, 94,', 'rgba(249, 115, 22,'];
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.5 + 2,
          speedY: -(Math.random() * 0.7 + 0.2),
          speedX: (Math.random() - 0.5) * 0.5,
          pulse: Math.random() * Math.PI * 2,
          color: cubeColors[Math.floor(Math.random() * cubeColors.length)]
        });
      }
    }

    // 32. Doce: Confeitos de açúcar e granulados coloridos
    else if (this.theme === 'candy') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.5,
          speedY: Math.random() * 0.8 + 0.4,
          speedX: (Math.random() - 0.5) * 0.6,
          wobble: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(244, 114, 182,' : 'rgba(251, 207, 232,'
        });
      }
    }

    // 33. Dragão: Fagulhas de fogo de dragão
    else if (this.theme === 'dragon') {
      for (let i = 0; i < 34; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.2 + 1.5,
          speedY: -(Math.random() * 1.6 + 0.8),
          speedX: (Math.random() - 0.5) * 1.0,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.4 ? '#ef4444' : '#f59e0b'
        });
      }
    }

    // 34. Arcade: Pixels coloridos retrô
    else if (this.theme === 'arcade') {
      for (let i = 0; i < 32; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 2,
          speedY: -(Math.random() * 1.2 + 0.4),
          speedX: 0,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(34, 211, 238,' : 'rgba(236, 72, 153,'
        });
      }
    }

    // 35. Metrópole: Luzes de tráfego aéreo e néon
    else if (this.theme === 'metropolis') {
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.6 + 1.2,
          speedX: (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 2.5 + 1.5),
          speedY: 0,
          color: Math.random() > 0.5 ? 'rgba(56, 189, 248,' : 'rgba(251, 191, 36,'
        });
      }
    }

    // 36. Aurora Boreal: Ondas de plasma boreal
    else if (this.theme === 'aurora') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.5,
          speedY: -(Math.random() * 0.6 + 0.2),
          speedX: Math.sin(Math.random() * Math.PI * 2) * 0.5,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(52, 211, 153,' : 'rgba(45, 212, 191,'
        });
      }
    }

    // 37. Parque de Diversões: Serpentinas e luzes de carrossel
    else if (this.theme === 'carnival') {
      for (let i = 0; i < 32; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.2 + 1.4,
          speedY: Math.random() * 0.9 + 0.4,
          speedX: (Math.random() - 0.5) * 1.2,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(244, 63, 94,' : 'rgba(250, 204, 21,'
        });
      }
    }

    // 38. Pirâmides: Poeira do deserto e brilho dourado
    else if (this.theme === 'pyramids') {
      for (let i = 0; i < 35; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.4 + 1.0,
          speedX: Math.random() * 1.6 + 0.8,
          speedY: Math.random() * 0.4 - 0.2,
          opacity: Math.random() * 0.45 + 0.25
        });
      }
    }

    // 39. Steampunk: Fuligem e vapor sob pressão
    else if (this.theme === 'steampunk') {
      for (let i = 0; i < 32; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 4 + 2,
          speedY: -(Math.random() * 1.4 + 0.6),
          speedX: (Math.random() - 0.5) * 0.6,
          pulse: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(217, 119, 6,' : 'rgba(168, 162, 158,'
        });
      }
    }

    // 40. Hiperespaço Quântico: Tachyons e partículas de dobra
    else if (this.theme === 'quantum') {
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.5 + 1.5,
          speedY: -(Math.random() * 3.0 + 1.5),
          speedX: (Math.random() - 0.5) * 2.0,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.5 ? '#38bdf8' : '#818cf8'
        });
      }
    }

    // 41. Rocha: Poeira de granito e cascalho mineral
    else if (this.theme === 'rock') {
      for (let i = 0; i < 34; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3 + 1.2,
          speedY: Math.random() * 1.4 + 0.6,
          speedX: (Math.random() - 0.5) * 0.8,
          color: Math.random() > 0.5 ? 'rgba(168, 162, 158,' : 'rgba(120, 113, 108,'
        });
      }
    }

    // 42. Ferro: Fagulhas de solda e brasa de forja
    else if (this.theme === 'iron') {
      for (let i = 0; i < 36; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.8 + 1.2,
          speedY: -(Math.random() * 1.5 + 0.5),
          speedX: (Math.random() - 0.5) * 1.2,
          pulse: Math.random() * Math.PI * 2,
          glowColor: Math.random() > 0.4 ? '#f97316' : '#cbd5e1'
        });
      }
    }

    // 43. Madeira: Serragem dourada e lascas flutuando
    else if (this.theme === 'wood') {
      for (let i = 0; i < 32; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 3.2 + 1.5,
          speedY: Math.random() * 0.8 + 0.3,
          speedX: (Math.random() - 0.5) * 0.6,
          wobble: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? 'rgba(217, 119, 6,' : 'rgba(253, 230, 138,'
        });
      }
    }

    // Partículas temáticas dinâmicas para os novos temas
    if (this.particles.length === 0) {
      for (let i = 0; i < 28; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          size: Math.random() * 2.8 + 1.2,
          speedY: -(Math.random() * 0.45 + 0.15),
          speedX: (Math.random() - 0.5) * 0.4,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.04 + 0.02,
          color: this.stage?.ballGlow ? `${this.stage.ballGlow}99` : 'rgba(56, 189, 248, 0.6)'
        });
      }
    }
  }

  update(dt = 1) {
    this.time += 0.02 * dt;

    // Atualiza relâmpagos nos temas de tempestade e chuva
    if (this.theme === 'thunder' || this.theme === 'storm' || this.theme === 'rain') {
      this.lightningTimer -= dt;
      if (this.lightningTimer <= 0) {
        if (Math.random() < 0.02) {
          this.lightningIntensity = 0.85;
          this.lightningTimer = 80 + Math.random() * 120;
        }
      }
      if (this.lightningIntensity > 0) {
        this.lightningIntensity -= 0.08 * dt;
        if (this.lightningIntensity < 0) this.lightningIntensity = 0;
      }
    }

    // Atualiza partículas atmosféricas
    for (const p of this.particles) {
      if (p.speedX) p.x += p.speedX * dt;
      if (p.speedY) p.y += p.speedY * dt;

      if (p.pulse !== undefined) p.pulse += (p.pulseSpeed || 0.04) * dt;
      if (p.twinkle !== undefined) p.twinkle += p.twinkleSpeed * dt;
      if (p.wobble !== undefined) {
        p.wobble += (p.wobbleSpeed || 0.03) * dt;
        p.x += Math.sin(p.wobble) * 0.4;
      }

      // Loop de borda suave
      if (p.y < -30) p.y = this.height + 20;
      if (p.y > this.height + 30) p.y = -20;
      if (p.x < -30) p.x = this.width + 20;
      if (p.x > this.width + 30) p.x = -20;
    }
  }

  draw(ctx, cameraY) {
    // 1. Gradiente Base Dinâmico
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    const grad = (Array.isArray(this.stage?.bgGradient) && this.stage.bgGradient.length >= 2)
      ? this.stage.bgGradient
      : ['#020617', '#0f172a', '#1e293b'];

    const color0 = grad[0] || '#020617';
    const color1 = grad[1] || color0;
    const color2 = grad[2] || color1;

    bgGrad.addColorStop(0, color0);
    bgGrad.addColorStop(0.5, color1);
    bgGrad.addColorStop(1, color2);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Camadas Temáticas Específicas de Parallax
    ctx.save();
    switch (this.theme) {
      case 'forest':
        this.drawForest(ctx, cameraY);
        break;
      case 'desert':
        this.drawDesert(ctx, cameraY);
        break;
      case 'ocean':
        this.drawOcean(ctx, cameraY);
        break;
      case 'storm':
      case 'thunder':
        this.drawThunder(ctx, cameraY);
        break;
      case 'volcano':
        this.drawVolcano(ctx, cameraY);
        break;
      case 'arctic':
        this.drawArctic(ctx, cameraY);
        break;
      case 'crystal':
        this.drawCrystal(ctx, cameraY);
        break;
      case 'sky':
        this.drawSky(ctx, cameraY);
        break;
      case 'cyberpunk':
        this.drawCyberpunk(ctx, cameraY);
        break;
      case 'cosmos':
      case 'space':
        this.drawSpace(ctx, cameraY);
        break;
      case 'waterfall':
        this.drawWaterfall(ctx, cameraY);
        break;
      case 'indigenous':
        this.drawIndigenous(ctx, cameraY);
        break;
      case 'rain':
        this.drawRain(ctx, cameraY);
        break;
      case 'winter':
        this.drawWinter(ctx, cameraY);
        break;
      case 'dune_storm':
        this.drawDuneStorm(ctx, cameraY);
        break;
      case 'ruins':
        this.drawRuins(ctx, cameraY);
        break;
      case 'obsidian':
        this.drawObsidian(ctx, cameraY);
        break;
      case 'solar':
        this.drawSolar(ctx, cameraY);
        break;
      case 'asteroid':
        this.drawAsteroid(ctx, cameraY);
        break;
      case 'singularity':
        this.drawSingularity(ctx, cameraY);
        break;
      case 'olympus':
        this.drawOlympus(ctx, cameraY);
        break;
      case 'soccer':
        this.drawSoccer(ctx, cameraY);
        break;
      case 'ship':
        this.drawShip(ctx, cameraY);
        break;
      case 'spring_season':
        this.drawSpringSeason(ctx, cameraY);
        break;
      case 'autumn':
        this.drawAutumn(ctx, cameraY);
        break;
      case 'heroes':
        this.drawHeroes(ctx, cameraY);
        break;
      case 'computer':
        this.drawComputer(ctx, cameraY);
        break;
      case 'music':
        this.drawMusic(ctx, cameraY);
        break;
      case 'internet':
        this.drawInternet(ctx, cameraY);
        break;
      case 'geometry':
        this.drawGeometry(ctx, cameraY);
        break;
      case 'magic_cube':
        this.drawMagicCube(ctx, cameraY);
        break;
      case 'candy':
        this.drawCandy(ctx, cameraY);
        break;
      case 'dragon':
        this.drawDragon(ctx, cameraY);
        break;
      case 'arcade':
        this.drawArcade(ctx, cameraY);
        break;
      case 'metropolis':
        this.drawMetropolis(ctx, cameraY);
        break;
      case 'aurora':
        this.drawAurora(ctx, cameraY);
        break;
      case 'carnival':
        this.drawCarnival(ctx, cameraY);
        break;
      case 'pyramids':
        this.drawPyramids(ctx, cameraY);
        break;
      case 'steampunk':
        this.drawSteampunk(ctx, cameraY);
        break;
      case 'quantum':
        this.drawQuantum(ctx, cameraY);
        break;
      case 'rock':
        this.drawRock(ctx, cameraY);
        break;
      case 'iron':
        this.drawIron(ctx, cameraY);
        break;
      case 'wood':
        this.drawWood(ctx, cameraY);
        break;
      case 'quantum_core':
        this.drawComputer(ctx, cameraY);
        break;
      case 'wild_west':
        this.drawDesert(ctx, cameraY);
        break;
      case 'dinosaur':
        this.drawForest(ctx, cameraY);
        break;
      case 'sports':
        this.drawSoccer(ctx, cameraY);
        break;
      case 'gastronomy':
        this.drawCandy(ctx, cameraY);
        break;
      case 'health':
        this.drawCrystal(ctx, cameraY);
        break;
      case 'sky_realm':
        this.drawSky(ctx, cameraY);
        break;
      case 'continents':
        this.drawOlympus(ctx, cameraY);
        break;
      case 'futuristic':
        this.drawCyberpunk(ctx, cameraY);
        break;
      default:
        this.drawDefaultGrid(ctx, cameraY);
        break;
    }
    ctx.restore();

    // 3. Renderizar Partículas Atmosféricas Vivas
    this.drawParticles(ctx, cameraY);
  }

  // --- TEMAS ESPECÍFICOS ---

  // 1. FLORESTA ESMERALDA
  drawForest(ctx, cameraY) {
    // Camada 1: Montanhas Distantes (Parallax 0.05)
    const p1 = -cameraY * 0.05;
    ctx.fillStyle = 'rgba(6, 40, 28, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 40) {
      const y = this.height - 220 + Math.sin(x * 0.015) * 45 + (p1 % 50);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Camada 2: Silhuetas de Árvores Gigantes (Parallax 0.15)
    const p2 = -cameraY * 0.15;
    ctx.fillStyle = 'rgba(4, 30, 20, 0.65)';
    const treeSpacing = 90;
    const offset = (p2 % treeSpacing);

    for (let x = -60; x < this.width + 60; x += treeSpacing) {
      const treeX = x;
      const baseY = this.height;
      // Tronco e folhagem
      ctx.beginPath();
      ctx.moveTo(treeX - 12, baseY);
      ctx.lineTo(treeX + 12, baseY);
      ctx.lineTo(treeX + 6, baseY - 320);
      ctx.lineTo(treeX - 6, baseY - 320);
      ctx.fill();

      // Copas em camadas
      ctx.beginPath();
      ctx.arc(treeX, baseY - 330, 48, 0, Math.PI * 2);
      ctx.arc(treeX - 25, baseY - 310, 36, 0, Math.PI * 2);
      ctx.arc(treeX + 25, baseY - 310, 36, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 2. DUNAS DO SAARA
  drawDesert(ctx, cameraY) {
    // Sol Gigante Escaldante no horizonte (Parallax quase estático 0.02)
    const sunY = 140 + (-cameraY * 0.02);
    const sunGrad = ctx.createRadialGradient(this.width / 2, sunY, 15, this.width / 2, sunY, 110);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    sunGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.45)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(this.width / 2, sunY, 110, 0, Math.PI * 2);
    ctx.fill();

    // Camada 1: Dunas Distantes (Parallax 0.06)
    const p1 = -cameraY * 0.06;
    ctx.fillStyle = 'rgba(84, 44, 9, 0.6)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 20) {
      const y = this.height - 240 + Math.sin(x * 0.012) * 35 + Math.cos(x * 0.02) * 20 + (p1 % 60);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Camada 2: Dunas Médias Onduladas (Parallax 0.16)
    const p2 = -cameraY * 0.16;
    ctx.fillStyle = 'rgba(124, 63, 12, 0.75)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 15) {
      const y = this.height - 150 + Math.sin(x * 0.018 + 1.2) * 50 + (p2 % 80);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();
  }

  // 3. ABISMO OCEÂNICO
  drawOcean(ctx, cameraY) {
    // Raios de Luz Volumétricos (God Rays) descendo da superfície
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 4; i++) {
      const rayX = (this.width * 0.25) * i + Math.sin(this.time * 0.8 + i) * 25;
      const rayGrad = ctx.createLinearGradient(rayX, 0, rayX + 60, this.height);
      rayGrad.addColorStop(0, 'rgba(103, 232, 249, 0.22)');
      rayGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.08)');
      rayGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = rayGrad;
      ctx.beginPath();
      ctx.moveTo(rayX - 20, 0);
      ctx.lineTo(rayX + 50, 0);
      ctx.lineTo(rayX + 130, this.height);
      ctx.lineTo(rayX - 50, this.height);
      ctx.fill();
    }
    ctx.restore();

    // Silhuetas de Corais Abissais no fundo (Parallax 0.14)
    const p = -cameraY * 0.14;
    ctx.fillStyle = 'rgba(2, 25, 42, 0.7)';
    for (let x = 20; x < this.width; x += 80) {
      const coralY = this.height - 120 + (p % 100);
      ctx.beginPath();
      ctx.arc(x, coralY, 28, 0, Math.PI * 2);
      ctx.arc(x + 20, coralY - 15, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 4. CÂNION TROVEJANTE
  drawThunder(ctx, cameraY) {
    // Clarão de Relâmpago intermitente
    if (this.lightningIntensity > 0) {
      ctx.fillStyle = `rgba(224, 231, 255, ${this.lightningIntensity * 0.45})`;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    // Paredões Rochosos Escarpados em Parallax (0.12)
    const p = -cameraY * 0.12;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    // Paredão esquerdo
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(60 + Math.sin(p * 0.05) * 15, 0);
    ctx.lineTo(40 + Math.cos(p * 0.04) * 20, this.height);
    ctx.lineTo(0, this.height);
    ctx.fill();

    // Paredão direito
    ctx.beginPath();
    ctx.moveTo(this.width, 0);
    ctx.lineTo(this.width - 55 - Math.cos(p * 0.05) * 15, 0);
    ctx.lineTo(this.width - 45 - Math.sin(p * 0.04) * 20, this.height);
    ctx.lineTo(this.width, this.height);
    ctx.fill();
  }

  // 5. VULCÃO MAGMÁTICO
  drawVolcano(ctx, cameraY) {
    // Brilho intenso de lava subindo da base
    const lavaGrad = ctx.createLinearGradient(0, this.height - 180, 0, this.height);
    lavaGrad.addColorStop(0, 'transparent');
    lavaGrad.addColorStop(0.5, 'rgba(239, 68, 68, 0.25)');
    lavaGrad.addColorStop(1, 'rgba(249, 115, 22, 0.6)');
    ctx.fillStyle = lavaGrad;
    ctx.fillRect(0, this.height - 180, this.width, 180);

    // Basalto vulcânico rachado (Parallax 0.15)
    const p = -cameraY * 0.15;
    ctx.fillStyle = 'rgba(24, 8, 8, 0.85)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 35) {
      const y = this.height - 140 + Math.sin(x * 0.03) * 30 + (p % 70);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();
  }

  // 6. GLACIAR ÁRTICO
  drawArctic(ctx, cameraY) {
    // Aurora Boreal Ondulante no céu
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 3; i++) {
      const auroraGrad = ctx.createLinearGradient(0, 40 + i * 50, 0, 240 + i * 50);
      auroraGrad.addColorStop(0, 'rgba(52, 211, 153, 0.35)');
      auroraGrad.addColorStop(0.5, 'rgba(34, 211, 238, 0.25)');
      auroraGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = auroraGrad;
      ctx.beginPath();
      ctx.moveTo(0, 100);
      for (let x = 0; x <= this.width; x += 25) {
        const wave = Math.sin(x * 0.015 + this.time * 1.5 + i) * 35;
        ctx.lineTo(x, 80 + wave + i * 40);
      }
      ctx.lineTo(this.width, 240);
      ctx.lineTo(0, 240);
      ctx.fill();
    }
    ctx.restore();

    // Picos de Gelo Translúcidos (Parallax 0.10)
    const p = -cameraY * 0.10;
    ctx.fillStyle = 'rgba(8, 47, 73, 0.7)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 60) {
      const peakY = this.height - 200 + Math.abs(Math.sin(x * 0.02)) * -80 + (p % 60);
      ctx.lineTo(x, peakY);
      ctx.lineTo(x + 30, this.height - 130 + (p % 60));
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();
  }

  // 7. CAVERNA DE CRISTAIS
  drawCrystal(ctx, cameraY) {
    // Formações de Cristais Gigantes nos cantos
    const p = -cameraY * 0.12;
    ctx.fillStyle = 'rgba(59, 7, 100, 0.65)';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5;

    // Cristal Esquerdo
    const crysY = 280 + (p % 120);
    ctx.beginPath();
    ctx.moveTo(0, crysY + 90);
    ctx.lineTo(55, crysY + 40);
    ctx.lineTo(35, crysY - 60);
    ctx.lineTo(0, crysY - 20);
    ctx.fill();
    ctx.stroke();

    // Cristal Direito
    ctx.beginPath();
    ctx.moveTo(this.width, crysY + 160);
    ctx.lineTo(this.width - 60, crysY + 110);
    ctx.lineTo(this.width - 40, crysY + 20);
    ctx.lineTo(this.width, crysY + 50);
    ctx.fill();
    ctx.stroke();
  }

  // 8. SANTUÁRIO CELESTE
  drawSky(ctx, cameraY) {
    // Pôr do Sol Dourado
    const sunY = 160 + (-cameraY * 0.03);
    const glow = ctx.createRadialGradient(this.width / 2, sunY, 10, this.width / 2, sunY, 140);
    glow.addColorStop(0, 'rgba(253, 224, 71, 0.8)');
    glow.addColorStop(0.4, 'rgba(251, 146, 60, 0.35)');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(this.width / 2, sunY, 140, 0, Math.PI * 2);
    ctx.fill();

    // Nuvens Volumétricas em Parallax (0.16)
    const p = -cameraY * 0.16;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let x = -40; x < this.width + 60; x += 110) {
      const cloudY = this.height - 220 + Math.sin(x) * 30 + (p % 90);
      ctx.beginPath();
      ctx.arc(x, cloudY, 45, 0, Math.PI * 2);
      ctx.arc(x + 35, cloudY - 15, 38, 0, Math.PI * 2);
      ctx.arc(x + 70, cloudY, 45, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 9. METRÓPOLE CYBERPUNK
  drawCyberpunk(ctx, cameraY) {
    // Skyline de Arranha-Céus com Janelas Neon (Parallax 0.12)
    const p = -cameraY * 0.12;
    const buildingWidth = 55;
    ctx.fillStyle = '#050811';

    for (let x = 0; x < this.width + buildingWidth; x += buildingWidth + 10) {
      const bHeight = 240 + Math.sin(x * 0.04) * 80 + (p % 80);
      const bY = this.height - bHeight;
      ctx.fillRect(x, bY, buildingWidth, bHeight);

      // Janelinhas iluminadas (amarelo e ciano)
      for (let wy = bY + 15; wy < this.height - 30; wy += 18) {
        for (let wx = x + 8; wx < x + buildingWidth - 8; wx += 12) {
          if ((wx + wy) % 5 === 0) {
            ctx.fillStyle = (wx % 2 === 0) ? '#06b6d4' : '#ec4899';
            ctx.fillRect(wx, wy, 4, 6);
            ctx.fillStyle = '#050811';
          }
        }
      }
    }

    // Holofotes cruzando o céu
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const beamAngle = Math.sin(this.time * 0.6) * 0.35;
    const beamGrad = ctx.createLinearGradient(this.width * 0.3, this.height, this.width * 0.3 + Math.sin(beamAngle) * 300, 0);
    beamGrad.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
    beamGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(this.width * 0.25, this.height);
    ctx.lineTo(this.width * 0.35, this.height);
    ctx.lineTo(this.width * 0.3 + Math.sin(beamAngle) * 350 + 60, 0);
    ctx.lineTo(this.width * 0.3 + Math.sin(beamAngle) * 350 - 60, 0);
    ctx.fill();
    ctx.restore();
  }

  // 10. ÓRBITA CÓSMICA ZENITH
  drawSpace(ctx, cameraY) {
    // Nebulosa Cósmica Colorida
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const nebGrad = ctx.createRadialGradient(this.width * 0.7, 180, 20, this.width * 0.7, 180, 220);
    nebGrad.addColorStop(0, 'rgba(168, 85, 247, 0.32)');
    nebGrad.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)');
    nebGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nebGrad;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();

    // Planeta Gigante com Anéis no horizonte (Parallax quase estático 0.02)
    const planetY = 160 + (-cameraY * 0.02);
    const planetX = this.width * 0.3;
    const pGrad = ctx.createRadialGradient(planetX - 15, planetY - 15, 5, planetX, planetY, 50);
    pGrad.addColorStop(0, '#fde047');
    pGrad.addColorStop(0.6, '#ea580c');
    pGrad.addColorStop(1, '#431407');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(planetX, planetY, 48, 0, Math.PI * 2);
    ctx.fill();

    // Anéis do planeta
    ctx.save();
    ctx.translate(planetX, planetY);
    ctx.rotate(-0.35);
    ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, 0, 85, 14, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // 11. CACHOEIRA ANCESTRAL
  drawWaterfall(ctx, cameraY) {
    // Camada 1: Paredões de Rocha Úmida em Parallax (0.08)
    const p1 = -cameraY * 0.08;
    ctx.fillStyle = 'rgba(4, 47, 46, 0.75)';
    // Paredão esquerdo
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(75 + Math.sin(p1 * 0.03) * 12, 0);
    ctx.lineTo(60 + Math.cos(p1 * 0.025) * 15, this.height);
    ctx.lineTo(0, this.height);
    ctx.fill();

    // Paredão direito
    ctx.beginPath();
    ctx.moveTo(this.width, 0);
    ctx.lineTo(this.width - 70 - Math.cos(p1 * 0.03) * 12, 0);
    ctx.lineTo(this.width - 55 - Math.sin(p1 * 0.025) * 15, this.height);
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Camada 2: Cascatas d'água principais (Parallax 0.22)
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const numCascades = 3;
    for (let c = 0; c < numCascades; c++) {
      const cascadeX = 90 + c * 85;
      const waveOffset = Math.sin(this.time * 2.5 + c) * 8;
      
      const waterGrad = ctx.createLinearGradient(cascadeX, 0, cascadeX + 35, 0);
      waterGrad.addColorStop(0, 'rgba(20, 184, 166, 0.15)');
      waterGrad.addColorStop(0.5, 'rgba(153, 246, 228, 0.45)');
      waterGrad.addColorStop(1, 'rgba(20, 184, 166, 0.15)');
      
      ctx.fillStyle = waterGrad;
      ctx.fillRect(cascadeX + waveOffset, 0, 32, this.height);

      // Linhas de correnteza vertical rápida
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1;
      const flowOffset = (this.time * 220 + c * 50) % 40;
      for (let y = flowOffset; y < this.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(cascadeX + waveOffset + 8, y);
        ctx.lineTo(cascadeX + waveOffset + 8, y + 22);
        ctx.moveTo(cascadeX + waveOffset + 22, y + 12);
        ctx.lineTo(cascadeX + waveOffset + 22, y + 34);
        ctx.stroke();
      }
    }
    ctx.restore();

    // Bruma e vapor na base
    const mistGrad = ctx.createLinearGradient(0, this.height - 140, 0, this.height);
    mistGrad.addColorStop(0, 'transparent');
    mistGrad.addColorStop(1, 'rgba(94, 234, 212, 0.35)');
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, this.height - 140, this.width, 140);
  }

  // 12. FLORESTA SAGRADA INDÍGENA
  drawIndigenous(ctx, cameraY) {
    // Camada 1: Floresta Ancestral / Árvores Gigantes (Parallax 0.06)
    const p1 = -cameraY * 0.06;
    ctx.fillStyle = 'rgba(20, 83, 45, 0.5)';
    for (let x = -20; x < this.width + 40; x += 100) {
      const treeY = this.height - 280 + (p1 % 80);
      ctx.beginPath();
      ctx.arc(x, treeY, 65, 0, Math.PI * 2);
      ctx.fill();
    }

    // Camada 2: Totens Sagrados nas Laterais (Parallax 0.14)
    const p2 = -cameraY * 0.14;
    const totemY = (p2 % 260) + 120;
    
    // Totem Esquerdo
    ctx.fillStyle = 'rgba(41, 37, 36, 0.9)';
    ctx.fillRect(10, totemY, 36, 200);
    // Olhos / Runas no Totem que brilham
    ctx.fillStyle = '#a3e635';
    ctx.shadowColor = '#84cc16';
    ctx.shadowBlur = this.isMobile ? 0 : 10;
    ctx.fillRect(20, totemY + 30, 7, 7);
    ctx.fillRect(31, totemY + 30, 7, 7);
    ctx.fillRect(22, totemY + 65, 14, 4);
    // Asas decorativas esculpidas
    ctx.fillStyle = 'rgba(68, 64, 60, 0.85)';
    ctx.beginPath();
    ctx.moveTo(10, totemY + 40);
    ctx.lineTo(-10, totemY + 20);
    ctx.lineTo(10, totemY + 70);
    ctx.fill();

    // Totem Direito
    ctx.fillStyle = 'rgba(41, 37, 36, 0.9)';
    ctx.fillRect(this.width - 46, totemY + 40, 36, 200);
    ctx.fillStyle = '#facc15';
    ctx.shadowColor = '#eab308';
    ctx.fillRect(this.width - 36, totemY + 70, 7, 7);
    ctx.fillRect(this.width - 25, totemY + 70, 7, 7);
    ctx.fillRect(this.width - 34, totemY + 105, 14, 4);
    ctx.shadowBlur = 0;

    // Cipós suspensos oscilantes
    ctx.strokeStyle = 'rgba(21, 128, 61, 0.4)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const vx = 60 + i * 85;
      const sway = Math.sin(this.time + i) * 12;
      ctx.beginPath();
      ctx.moveTo(vx, 0);
      ctx.quadraticCurveTo(vx + sway, 120, vx + sway * 0.5, 240);
      ctx.stroke();
    }
  }

  // 13. TEMPESTADE DE MONÇÃO
  drawRain(ctx, cameraY) {
    // Clarão de relâmpago
    if (this.lightningIntensity > 0) {
      ctx.fillStyle = `rgba(203, 213, 225, ${this.lightningIntensity * 0.4})`;
      ctx.fillRect(0, 0, this.width, this.height);
    }

    // Camada de Nuvens Carregadas no topo
    const cloudGrad = ctx.createLinearGradient(0, 0, 0, 200);
    cloudGrad.addColorStop(0, 'rgba(2, 6, 23, 0.95)');
    cloudGrad.addColorStop(0.7, 'rgba(15, 23, 42, 0.7)');
    cloudGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = cloudGrad;
    ctx.fillRect(0, 0, this.width, 200);

    // Ondas de vento com névoa
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.fillStyle = 'rgba(56, 189, 248, 0.06)';
    for (let i = 0; i < 3; i++) {
      const waveY = 180 + i * 160 + ((-cameraY * 0.08) % 120);
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      for (let x = 0; x <= this.width; x += 30) {
        ctx.lineTo(x, waveY + Math.sin(x * 0.02 + this.time * 2 + i) * 20);
      }
      ctx.lineTo(this.width, waveY + 80);
      ctx.lineTo(0, waveY + 80);
      ctx.fill();
    }
    ctx.restore();
  }

  // 14. TUNDRA CONGELADA DO INVERNO
  drawWinter(ctx, cameraY) {
    // Picos de Gelo e Montanhas Congeladas (Parallax 0.08)
    const p1 = -cameraY * 0.08;
    ctx.fillStyle = 'rgba(3, 105, 161, 0.35)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 55) {
      const peak = this.height - 240 + Math.abs(Math.sin(x * 0.025)) * -110 + (p1 % 60);
      ctx.lineTo(x, peak);
      ctx.lineTo(x + 28, this.height - 140 + (p1 % 60));
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Ventania de Neve Horizontal em camadas translúcidas
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 3; i++) {
      const windGrad = ctx.createLinearGradient(0, 80 + i * 150, this.width, 140 + i * 150);
      windGrad.addColorStop(0, 'transparent');
      windGrad.addColorStop(0.5, 'rgba(165, 243, 252, 0.18)');
      windGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = windGrad;
      
      const windX = ((this.time * 180 + i * 120) % (this.width + 100)) - 50;
      ctx.beginPath();
      ctx.ellipse(windX, 100 + i * 160, 140, 25, 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 15. DESERTO DAS TEMPESTADES
  drawDuneStorm(ctx, cameraY) {
    // Pirâmide Gigante no horizonte distante (Parallax 0.03)
    const p0 = -cameraY * 0.03;
    const pyrX = this.width * 0.45;
    const pyrY = 220 + (p0 % 60);
    ctx.fillStyle = 'rgba(120, 53, 15, 0.55)';
    ctx.beginPath();
    ctx.moveTo(pyrX, pyrY);
    ctx.lineTo(pyrX - 110, pyrY + 160);
    ctx.lineTo(pyrX + 110, pyrY + 160);
    ctx.closePath();
    ctx.fill();

    // Dunas Vermelhas e Vórtices de Areia (Parallax 0.14)
    const p1 = -cameraY * 0.14;
    ctx.fillStyle = 'rgba(180, 83, 9, 0.7)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 20) {
      const y = this.height - 180 + Math.sin(x * 0.02 + 0.8) * 45 + (p1 % 80);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Vórtice de Tempestade de Areia
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const stormGrad = ctx.createLinearGradient(this.width, 0, 0, this.height);
    stormGrad.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
    stormGrad.addColorStop(0.6, 'rgba(180, 83, 9, 0.12)');
    stormGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = stormGrad;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }

  // 16. CIDADELA FLUTUANTE DOS CÉUS
  drawRuins(ctx, cameraY) {
    // Ilhas Celestiais e Colunas Clássicas Flutuantes (Parallax 0.09)
    const p = -cameraY * 0.09;
    
    // Ilha flutuante central
    const islandY = 220 + (p % 180);
    const islandX = this.width * 0.5;
    
    ctx.fillStyle = 'rgba(30, 27, 75, 0.85)';
    ctx.beginPath();
    ctx.moveTo(islandX - 80, islandY);
    ctx.lineTo(islandX + 80, islandY);
    ctx.lineTo(islandX + 50, islandY + 60);
    ctx.lineTo(islandX - 45, islandY + 50);
    ctx.closePath();
    ctx.fill();

    // Colunas gregas sobre a ilha
    ctx.fillStyle = 'rgba(129, 140, 248, 0.7)';
    ctx.fillRect(islandX - 55, islandY - 70, 14, 70);
    ctx.fillRect(islandX + 40, islandY - 70, 14, 70);
    // Arquitrave / Viga sobre as colunas
    ctx.fillRect(islandX - 65, islandY - 82, 130, 12);

    // Cristais de Éter levitando entre as colunas com pulso
    const crysAlpha = Math.sin(this.time * 2) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(165, 180, 252, ${crysAlpha})`;
    ctx.shadowColor = '#818cf8';
    ctx.shadowBlur = this.isMobile ? 0 : 15;
    ctx.beginPath();
    ctx.moveTo(islandX, islandY - 60);
    ctx.lineTo(islandX + 10, islandY - 45);
    ctx.lineTo(islandX, islandY - 30);
    ctx.lineTo(islandX - 10, islandY - 45);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // 17. FENDA VULCÂNICA DE OBSIDIANA
  drawObsidian(ctx, cameraY) {
    // Fendas de Magma Incandescente na base
    const magmaGrad = ctx.createLinearGradient(0, this.height - 200, 0, this.height);
    magmaGrad.addColorStop(0, 'transparent');
    magmaGrad.addColorStop(0.4, 'rgba(220, 38, 38, 0.35)');
    magmaGrad.addColorStop(1, 'rgba(249, 115, 22, 0.75)');
    ctx.fillStyle = magmaGrad;
    ctx.fillRect(0, this.height - 200, this.width, 200);

    // Pilares Afiados de Obsidiana (Parallax 0.12)
    const p = -cameraY * 0.12;
    ctx.fillStyle = '#120404';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 1;

    // Pilar esquerdo
    const pY1 = this.height - 180 + (p % 90);
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    ctx.lineTo(45, pY1);
    ctx.lineTo(65, this.height);
    ctx.fill();
    ctx.stroke();

    // Pilar direito
    const pY2 = this.height - 220 + (p % 110);
    ctx.beginPath();
    ctx.moveTo(this.width, this.height);
    ctx.lineTo(this.width - 55, pY2);
    ctx.lineTo(this.width - 80, this.height);
    ctx.fill();
    ctx.stroke();
  }

  // 18. TEMPESTADE SOLAR CORONA
  drawSolar(ctx, cameraY) {
    // Arco Gigante de Proeminência Solar no fundo
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    
    // Borda da Estrela Solar (Limb Solar)
    const sunGrad = ctx.createRadialGradient(this.width / 2, this.height + 180, 80, this.width / 2, this.height + 180, 420);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
    sunGrad.addColorStop(0.3, 'rgba(249, 115, 22, 0.75)');
    sunGrad.addColorStop(0.8, 'rgba(194, 65, 12, 0.25)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(this.width / 2, this.height + 180, 420, 0, Math.PI * 2);
    ctx.fill();

    // Labareda / Proeminência em Arco (Loop de Plasma)
    const arcX = this.width * 0.65;
    const arcY = this.height - 60;
    const sway = Math.sin(this.time * 1.2) * 20;
    
    ctx.strokeStyle = 'rgba(251, 146, 60, 0.65)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(arcX - 70, arcY);
    ctx.bezierCurveTo(arcX - 50, arcY - 180 + sway, arcX + 50, arcY - 180 - sway, arcX + 70, arcY);
    ctx.stroke();
    
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.85)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  }

  // 19. CINTURÃO DE ASTEROIDES
  drawAsteroid(ctx, cameraY) {
    // Nebulosa Violeta Profunda
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const nebGrad = ctx.createRadialGradient(this.width * 0.3, 200, 30, this.width * 0.3, 200, 260);
    nebGrad.addColorStop(0, 'rgba(192, 132, 252, 0.35)');
    nebGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.2)');
    nebGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nebGrad;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();

    // Asteroides Poligonais Flutuando em Parallax (0.05 e 0.12)
    const p1 = -cameraY * 0.05;
    const p2 = -cameraY * 0.12;
    
    // Asteroide 1 (Maior)
    const a1Y = 160 + (p1 % (this.height + 100));
    ctx.save();
    ctx.translate(this.width * 0.75, a1Y);
    ctx.rotate(this.time * 0.2);
    ctx.fillStyle = '#2e1065';
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -32);
    ctx.lineTo(26, -18);
    ctx.lineTo(34, 12);
    ctx.lineTo(12, 34);
    ctx.lineTo(-24, 28);
    ctx.lineTo(-35, -5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Asteroide 2 (Médio)
    const a2Y = 380 + (p2 % (this.height + 100));
    ctx.save();
    ctx.translate(this.width * 0.2, a2Y);
    ctx.rotate(-this.time * 0.35);
    ctx.fillStyle = '#1e1b4b';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(18, -8);
    ctx.lineTo(14, 22);
    ctx.lineTo(-12, 18);
    ctx.lineTo(-22, -6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // 20. SINGULARIDADE CÓSMICA 20.000m
  drawSingularity(ctx, cameraY) {
    const cx = this.width / 2;
    const cy = 240 + (-cameraY * 0.02);

    ctx.save();
    // 1. Jatos Relativísticos Verticais de Energia
    ctx.globalCompositeOperation = 'screen';
    const jetGrad = ctx.createLinearGradient(cx - 15, 0, cx + 15, 0);
    jetGrad.addColorStop(0, 'transparent');
    jetGrad.addColorStop(0.5, 'rgba(244, 63, 94, 0.45)');
    jetGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = jetGrad;
    ctx.fillRect(cx - 18, 0, 36, this.height);

    // 2. Disco de Acreção Brilhante (Buraco Negro)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(this.time * 0.4);

    const haloGrad = ctx.createRadialGradient(0, 0, 45, 0, 0, 150);
    haloGrad.addColorStop(0, 'rgba(244, 63, 94, 0.9)');
    haloGrad.addColorStop(0.4, 'rgba(168, 85, 247, 0.5)');
    haloGrad.addColorStop(0.8, 'rgba(56, 189, 248, 0.2)');
    haloGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = haloGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 140, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Horizonte de Eventos (Sombra Negra Absoluta no centro)
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(cx, cy, 46, 0, Math.PI * 2);
    ctx.fill();

    // Borda de Fótons (Photon Ring) extremamente brilhante
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = this.isMobile ? 0 : 18;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, 47, 0, Math.PI * 2);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  // 21. MONTE OLIMPO DOS DEUSES
  drawOlympus(ctx, cameraY) {
    const p1 = -cameraY * 0.04;
    // Raios de sol divinos dourados no topo
    const rayGrad = ctx.createRadialGradient(this.width / 2, -40, 20, this.width / 2, 280, 420);
    rayGrad.addColorStop(0, 'rgba(253, 224, 71, 0.45)');
    rayGrad.addColorStop(0.5, 'rgba(234, 179, 8, 0.15)');
    rayGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = rayGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Colunas gregas de mármore dourado (Parallax 0.12)
    const colP = -cameraY * 0.12;
    ctx.fillStyle = 'rgba(251, 191, 36, 0.22)';
    ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
    ctx.lineWidth = 2;

    const colSpacing = 110;
    for (let x = 30; x < this.width + 60; x += colSpacing) {
      const colX = x;
      const baseY = ((colP + x * 2) % (this.height + 400)) - 100;
      // Fuste da coluna
      ctx.fillRect(colX, baseY, 24, 260);
      ctx.strokeRect(colX, baseY, 24, 260);
      // Capitel e base
      ctx.fillRect(colX - 8, baseY - 12, 40, 12);
      ctx.fillRect(colX - 8, baseY + 260, 40, 12);
    }

    // Nuvens divinas do Olimpo (Parallax 0.08)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    for (let i = 0; i < 4; i++) {
      const cy = ((-cameraY * 0.08 + i * 180) % (this.height + 100)) - 50;
      ctx.beginPath();
      ctx.arc(60 + i * 80, cy, 45, 0, Math.PI * 2);
      ctx.arc(110 + i * 80, cy - 15, 60, 0, Math.PI * 2);
      ctx.arc(160 + i * 80, cy, 45, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 22. ESTÁDIO DOS CAMPEÕES (FUTEBOL)
  drawSoccer(ctx, cameraY) {
    // Faixas verticais do gramado do estádio (Parallax 0.08)
    const stripeP = (-cameraY * 0.08) % 60;
    for (let y = -60 + stripeP; y < this.height + 60; y += 60) {
      ctx.fillStyle = 'rgba(22, 163, 74, 0.08)';
      ctx.fillRect(0, y, this.width, 30);
    }

    // Holofotes de estádio nos cantos superiores
    const spotGrad1 = ctx.createRadialGradient(20, 20, 5, 140, 320, 350);
    spotGrad1.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    spotGrad1.addColorStop(0.3, 'rgba(134, 239, 172, 0.15)');
    spotGrad1.addColorStop(1, 'transparent');
    ctx.fillStyle = spotGrad1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(260, this.height);
    ctx.lineTo(0, this.height);
    ctx.fill();

    const spotGrad2 = ctx.createRadialGradient(this.width - 20, 20, 5, this.width - 140, 320, 350);
    spotGrad2.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    spotGrad2.addColorStop(0.3, 'rgba(134, 239, 172, 0.15)');
    spotGrad2.addColorStop(1, 'transparent');
    ctx.fillStyle = spotGrad2;
    ctx.beginPath();
    ctx.moveTo(this.width, 0);
    ctx.lineTo(this.width - 260, this.height);
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Silhueta de Trave de Futebol no fundo (Parallax 0.15)
    const goalY = ((-cameraY * 0.15) % (this.height + 300)) + 120;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.width / 2 - 90, goalY, 180, 100);
    // Rede
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    for (let gx = this.width / 2 - 80; gx < this.width / 2 + 85; gx += 15) {
      ctx.beginPath();
      ctx.moveTo(gx, goalY);
      ctx.lineTo(gx, goalY + 100);
      ctx.stroke();
    }
  }

  // 23. NAU DOS MARES TEMPESTUOSOS (BARCO)
  drawShip(ctx, cameraY) {
    // Ondas oceânicas ao fundo (Parallax 0.06)
    const waveP = -cameraY * 0.06;
    ctx.fillStyle = 'rgba(3, 105, 161, 0.35)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 30) {
      const wy = this.height - 160 + Math.sin(x * 0.03 + this.time * 2) * 18 + (waveP % 40);
      ctx.lineTo(x, wy);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Mastro gigante e cordames de navio pirata (Parallax 0.18)
    const mastP = (-cameraY * 0.18) % (this.height + 400);
    const mastX = this.width / 2 + 35;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.55)';
    ctx.fillRect(mastX - 7, 0, 14, this.height);

    // Vergas horizontais do mastro
    for (let my = mastP - 200; my < this.height + 200; my += 220) {
      ctx.fillRect(mastX - 90, my, 180, 8);
      // Cordas
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mastX - 90, my);
      ctx.lineTo(mastX, my - 60);
      ctx.lineTo(mastX + 90, my);
      ctx.stroke();
    }
  }

  // 24. PRIMAVERA DAS CEREJEIRAS
  drawSpringSeason(ctx, cameraY) {
    // Sol matinal suave rosado (Parallax 0.03)
    const sunY = 160 + (-cameraY * 0.03);
    const sunGrad = ctx.createRadialGradient(this.width / 2, sunY, 20, this.width / 2, sunY, 130);
    sunGrad.addColorStop(0, 'rgba(251, 207, 232, 0.65)');
    sunGrad.addColorStop(0.4, 'rgba(244, 114, 182, 0.25)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(this.width / 2, sunY, 130, 0, Math.PI * 2);
    ctx.fill();

    // Galhos orgânicos de cerejeira em flor nas laterais (Parallax 0.12)
    const branchP = (-cameraY * 0.12) % (this.height + 300);
    ctx.strokeStyle = 'rgba(80, 7, 36, 0.6)';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    for (let by = branchP - 150; by < this.height + 200; by += 280) {
      // Galho vindo da esquerda
      ctx.beginPath();
      ctx.moveTo(0, by);
      ctx.quadraticCurveTo(60, by - 20, 120, by + 10);
      ctx.stroke();
      // Flores de sakura
      ctx.fillStyle = 'rgba(244, 114, 182, 0.85)';
      ctx.beginPath();
      ctx.arc(120, by + 10, 8, 0, Math.PI * 2);
      ctx.arc(90, by - 12, 7, 0, Math.PI * 2);
      ctx.arc(50, by - 15, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 25. BOSQUE DOURADO DE OUTONO
  drawAutumn(ctx, cameraY) {
    // Colinas outonais distantes em camadas (Parallax 0.06)
    const p1 = -cameraY * 0.06;
    ctx.fillStyle = 'rgba(120, 53, 15, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 40) {
      const y = this.height - 200 + Math.sin(x * 0.02) * 35 + (p1 % 50);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Silhuetas de árvores de bordo com folhas avermelhadas (Parallax 0.14)
    const p2 = (-cameraY * 0.14) % (this.height + 300);
    for (let tx = 40; tx < this.width; tx += 120) {
      const ty = p2 + (tx * 1.5) % 250 + 100;
      // Tronco
      ctx.fillStyle = 'rgba(69, 26, 3, 0.7)';
      ctx.fillRect(tx - 5, ty, 10, 180);
      // Copa em tons de fogo outonal
      ctx.fillStyle = 'rgba(249, 115, 22, 0.55)';
      ctx.beginPath();
      ctx.arc(tx, ty - 25, 42, 0, Math.PI * 2);
      ctx.arc(tx - 20, ty - 15, 30, 0, Math.PI * 2);
      ctx.arc(tx + 20, ty - 15, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 26. MULTIVERSO DOS HERÓIS (MARVEL)
  drawHeroes(ctx, cameraY) {
    // Padrão de retícula de quadrinhos (Comic Halftone Dots)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    const dotP = (-cameraY * 0.1) % 30;
    for (let x = 15; x < this.width; x += 30) {
      for (let y = dotP; y < this.height; y += 30) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Raios de energia heroicos diagonais
    ctx.save();
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.18)';
    ctx.lineWidth = 4;
    const rayOff = (this.time * 40 + cameraY * 0.2) % (this.width + 200);
    ctx.beginPath();
    ctx.moveTo(rayOff - 100, 0);
    ctx.lineTo(rayOff + 100, this.height);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(239, 68, 68, 0.18)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.width - rayOff + 100, 0);
    ctx.lineTo(this.width - rayOff - 100, this.height);
    ctx.stroke();
    ctx.restore();
  }

  // 27. CÓRTEX DA PLACA-MÃE (COMPUTADOR)
  drawComputer(ctx, cameraY) {
    // Trilhas de circuito impresso (PCB Traces 45 graus)
    const pcbP = (-cameraY * 0.15) % 80;
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
    ctx.lineWidth = 2;
    for (let y = pcbP - 80; y < this.height + 80; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(100, y);
      ctx.lineTo(150, y + 50);
      ctx.lineTo(this.width - 80, y + 50);
      ctx.lineTo(this.width, y + 130);
      ctx.stroke();

      // Pontos de solda (Pads) dourados/esmeralda
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(100, y, 4, 0, Math.PI * 2);
      ctx.arc(150, y + 50, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Chip de Processador Central estilizado no fundo (Parallax 0.05)
    const chipY = 220 + (-cameraY * 0.05);
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.width / 2 - 50, chipY, 100, 100);
    ctx.fillStyle = 'rgba(2, 44, 34, 0.6)';
    ctx.fillRect(this.width / 2 - 50, chipY, 100, 100);
  }

  // 28. SINFONIA DAS ESTRELAS (MÚSICA)
  drawMusic(ctx, cameraY) {
    // Pauta musical ondulante (5 linhas horizontais do pentagrama)
    const staveP = (-cameraY * 0.12) % 240;
    ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)';
    ctx.lineWidth = 1.5;

    for (let baseStave = staveP - 200; baseStave < this.height + 150; baseStave += 220) {
      for (let line = 0; line < 5; line++) {
        const ly = baseStave + line * 10;
        ctx.beginPath();
        for (let x = 0; x <= this.width; x += 20) {
          const y = ly + Math.sin(x * 0.02 + this.time * 1.5) * 12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Notas musicais desenhadas na pauta (♪, ♫)
      ctx.fillStyle = 'rgba(233, 213, 255, 0.65)';
      ctx.font = '24px sans-serif';
      ctx.fillText('♪', 60, baseStave + 35);
      ctx.fillText('♫', 180, baseStave + 25);
      ctx.fillText('♩', 310, baseStave + 40);
    }
  }

  // 29. TEIA DA CIBER-REDE (INTERNET)
  drawInternet(ctx, cameraY) {
    // Nós de rede interconectados
    const netP = (-cameraY * 0.14) % 180;
    const nodes = [
      { x: 50, y: netP + 50 },
      { x: 180, y: netP + 120 },
      { x: 340, y: netP + 60 },
      { x: 110, y: netP + 220 },
      { x: 280, y: netP + 260 },
      { x: 400, y: netP + 190 }
    ];

    ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      // Ponto do nó
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 30. DIMENSÃO DOS POLÍGONOS (GEOMETRIA)
  drawGeometry(ctx, cameraY) {
    // Polígonos neon flutuantes e rotativos
    const geoP = (-cameraY * 0.15) % 300;
    const polyList = [
      { x: 80, y: geoP + 80, sides: 3, r: 35 },
      { x: 320, y: geoP + 140, sides: 6, r: 42 },
      { x: 160, y: geoP + 260, sides: 4, r: 38 },
      { x: 380, y: geoP + 350, sides: 5, r: 30 }
    ];

    ctx.strokeStyle = 'rgba(129, 140, 248, 0.4)';
    ctx.lineWidth = 2;
    for (const poly of polyList) {
      ctx.save();
      ctx.translate(poly.x, poly.y);
      ctx.rotate(this.time * 0.8);
      ctx.beginPath();
      for (let s = 0; s < poly.sides; s++) {
        const angle = (s * Math.PI * 2) / poly.sides;
        const px = Math.cos(angle) * poly.r;
        const py = Math.sin(angle) * poly.r;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }
  }

  // 31. CUBO MÁGICO TRIDIMENSIONAL
  drawMagicCube(ctx, cameraY) {
    // Cubos mágicos 3D isométricos com faces coloridas rotacionando
    const cubeP = (-cameraY * 0.12) % 340;
    const cubes = [
      { x: 90, y: cubeP + 90, size: 36, rot: this.time * 0.5 },
      { x: 310, y: cubeP + 230, size: 48, rot: -this.time * 0.6 }
    ];

    for (const c of cubes) {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(c.rot);
      const s = c.size;

      // Face superior (Amarelo)
      ctx.fillStyle = 'rgba(234, 179, 8, 0.7)';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.86, -s * 0.5);
      ctx.lineTo(0, 0);
      ctx.lineTo(-s * 0.86, -s * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Face esquerda (Vermelho)
      ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.beginPath();
      ctx.moveTo(-s * 0.86, -s * 0.5);
      ctx.lineTo(0, 0);
      ctx.lineTo(0, s);
      ctx.lineTo(-s * 0.86, s * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Face direita (Azul)
      ctx.fillStyle = 'rgba(59, 130, 246, 0.7)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(s * 0.86, -s * 0.5);
      ctx.lineTo(s * 0.86, s * 0.5);
      ctx.lineTo(0, s);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  }

  // 32. REINO DOCE DE CONFEITOS
  drawCandy(ctx, cameraY) {
    // Bengalas doces e pirulitos gigantes espiralados
    const candyP = (-cameraY * 0.15) % 360;
    const lollipops = [
      { x: 70, y: candyP + 120, r: 35 },
      { x: 360, y: candyP + 260, r: 42 }
    ];

    for (const l of lollipops) {
      // Haste branca
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(l.x - 3, l.y, 6, 140);
      // Espiral do pirulito
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(this.time);
      const radGrad = ctx.createRadialGradient(0, 0, 4, 0, 0, l.r);
      radGrad.addColorStop(0, '#fbcfe8');
      radGrad.addColorStop(0.5, '#ec4899');
      radGrad.addColorStop(1, '#be185d');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(0, 0, l.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // 33. COVIL DO DRAGÃO DE FOGO
  drawDragon(ctx, cameraY) {
    // Caverna vulcânica com estalactites no topo
    ctx.fillStyle = 'rgba(69, 10, 10, 0.75)';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let x = 0; x <= this.width; x += 30) {
      const h = 40 + Math.sin(x * 0.08) * 25;
      ctx.lineTo(x, h);
    }
    ctx.lineTo(this.width, 0);
    ctx.fill();

    // Silhueta de Dragão alado voando na distância (Parallax 0.06)
    const dragX = ((this.time * 60) % (this.width + 120)) - 60;
    const dragY = 160 + Math.sin(this.time * 2) * 25;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.beginPath();
    ctx.arc(dragX, dragY, 12, 0, Math.PI * 2); // corpo
    // Asas
    ctx.moveTo(dragX, dragY);
    ctx.lineTo(dragX - 35, dragY - 20 - Math.sin(this.time * 4) * 15);
    ctx.lineTo(dragX - 10, dragY + 5);
    ctx.moveTo(dragX, dragY);
    ctx.lineTo(dragX + 35, dragY - 20 - Math.sin(this.time * 4) * 15);
    ctx.lineTo(dragX + 10, dragY + 5);
    ctx.fill();
  }

  // 34. FLIPERAMA PIXEL 8-BIT (ARCADE)
  drawArcade(ctx, cameraY) {
    // Grade de perspectiva 80s Synthwave (Tron Floor)
    const floorP = (-cameraY * 0.25) % 40;
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.35)';
    ctx.lineWidth = 1.5;

    // Linhas horizontais
    for (let y = floorP; y < this.height; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Linhas verticais convergentes
    for (let x = 0; x <= this.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
  }

  // 35. METRÓPOLE FLUTUANTE NEON
  drawMetropolis(ctx, cameraY) {
    // Silhuetas de mega-edifícios com janelas iluminadas
    const p1 = -cameraY * 0.1;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    const bSpacing = 70;
    for (let x = 10; x < this.width; x += bSpacing) {
      const bHeight = 280 + (x % 110);
      ctx.fillRect(x, this.height - bHeight + (p1 % 100), 55, bHeight);

      // Janelas de LED
      ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
      for (let wy = this.height - bHeight + (p1 % 100) + 15; wy < this.height; wy += 25) {
        ctx.fillRect(x + 10, wy, 8, 8);
        ctx.fillRect(x + 32, wy, 8, 8);
      }
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    }
  }

  // 36. VÉU DA AURORA BOREAL
  drawAurora(ctx, cameraY) {
    // Cortinas de plasma verde-esmeralda e magenta ondulantes
    for (let a = 0; a < 3; a++) {
      const aGrad = ctx.createLinearGradient(0, 80 + a * 60, 0, 240 + a * 60);
      aGrad.addColorStop(0, 'rgba(52, 211, 153, 0.45)');
      aGrad.addColorStop(0.5, 'rgba(45, 212, 191, 0.25)');
      aGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = aGrad;

      ctx.beginPath();
      ctx.moveTo(0, this.height);
      for (let x = 0; x <= this.width; x += 25) {
        const ay = 120 + a * 70 + Math.sin(x * 0.015 + this.time * 1.5 + a) * 45;
        ctx.lineTo(x, ay);
      }
      ctx.lineTo(this.width, this.height);
      ctx.fill();
    }
  }

  // 37. PARQUE DE DIVERSÕES CÓSMICO (CARNIVAL)
  drawCarnival(ctx, cameraY) {
    // Roda-gigante cósmica em rotação suave no fundo (Parallax 0.05)
    const wheelY = 180 + (-cameraY * 0.05);
    const wheelX = this.width / 2;
    const radius = 95;

    ctx.save();
    ctx.translate(wheelX, wheelY);
    ctx.rotate(this.time * 0.4);

    ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Raios e cabines
    for (let i = 0; i < 8; i++) {
      const ang = (i * Math.PI * 2) / 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(ang) * radius, Math.sin(ang) * radius);
      ctx.stroke();

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(Math.cos(ang) * radius, Math.sin(ang) * radius, 6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // 38. PIRÂMIDES DO EGITO ANCESTRAL
  drawPyramids(ctx, cameraY) {
    // Sol de Rá gigante
    const sunY = 150 + (-cameraY * 0.02);
    const sunGrad = ctx.createRadialGradient(this.width / 2, sunY, 20, this.width / 2, sunY, 120);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
    sunGrad.addColorStop(0.4, 'rgba(234, 179, 8, 0.35)');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(this.width / 2, sunY, 120, 0, Math.PI * 2);
    ctx.fill();

    // Silhuetas das Pirâmides de Gizé
    const pyrP = -cameraY * 0.05;
    ctx.fillStyle = 'rgba(113, 63, 18, 0.65)';
    ctx.beginPath();
    // Grande Pirâmide
    ctx.moveTo(30, this.height);
    ctx.lineTo(160, this.height - 180 + (pyrP % 40));
    ctx.lineTo(290, this.height);
    // Segunda Pirâmide
    ctx.moveTo(210, this.height);
    ctx.lineTo(320, this.height - 140 + (pyrP % 40));
    ctx.lineTo(430, this.height);
    ctx.fill();
  }

  // 39. FÁBRICA STEAMPUNK DE BRONZE
  drawSteampunk(ctx, cameraY) {
    // Engrenagens colossais de bronze girando em parallax
    const gearP = (-cameraY * 0.1) % 350;
    const gears = [
      { x: 70, y: gearP + 90, r: 65, rot: this.time * 0.8 },
      { x: 340, y: gearP + 220, r: 85, rot: -this.time * 0.6 }
    ];

    for (const g of gears) {
      ctx.save();
      ctx.translate(g.x, g.y);
      ctx.rotate(g.rot);
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.45)';
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.arc(0, 0, g.r, 0, Math.PI * 2);
      ctx.stroke();

      // Dentes da engrenagem
      for (let t = 0; t < 12; t++) {
        const ang = (t * Math.PI * 2) / 12;
        ctx.fillRect(Math.cos(ang) * g.r - 5, Math.sin(ang) * g.r - 5, 10, 10);
      }
      ctx.restore();
    }
  }

  // 40. HIPERESPAÇO QUÂNTICO INFINITO
  drawQuantum(ctx, cameraY) {
    // Túnel de dobra estelar com anéis de distorção de espaço-tempo
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Raios de aceleração de dobra
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 1.5;
    for (let r = 0; r < 16; r++) {
      const ang = (r * Math.PI * 2) / 16 + this.time * 0.5;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(ang) * 450, centerY + Math.sin(ang) * 450);
      ctx.stroke();
    }

    // Anéis quânticos expansivos
    for (let ring = 1; ring <= 4; ring++) {
      const radius = ((this.time * 90 + ring * 80) % 360);
      ctx.strokeStyle = `rgba(129, 140, 248, ${0.4 - radius / 1000})`;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  // 41. PEDREIRA DOS TITÃS DE ROCHA
  drawRock(ctx, cameraY) {
    const rockP = -cameraY * 0.08;
    // Paredão rochoso com fissuras e blocos de granito
    ctx.fillStyle = 'rgba(41, 37, 36, 0.65)';
    ctx.beginPath();
    ctx.moveTo(0, this.height);
    for (let x = 0; x <= this.width; x += 35) {
      const y = this.height - 240 + Math.sin(x * 0.04) * 35 + (rockP % 50);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(this.width, this.height);
    ctx.fill();

    // Blocos de pedra maciça com contorno de cantaria
    ctx.strokeStyle = 'rgba(120, 113, 108, 0.4)';
    ctx.lineWidth = 2;
    const bY = (-cameraY * 0.14) % 180;
    for (let y = bY - 120; y < this.height + 120; y += 80) {
      ctx.strokeRect(30, y, 90, 45);
      ctx.strokeRect(this.width - 130, y + 30, 100, 50);
    }
  }

  // 42. FUNDIÇÃO DE FERRO E AÇO
  drawIron(ctx, cameraY) {
    // Vigas I-Beam de ferro rebitadas e fornalhas em brasa
    const ironP = (-cameraY * 0.12) % 140;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.35)';
    ctx.lineWidth = 3;

    // Colunas de vigas de ferro verticais
    ctx.fillRect(40, 0, 20, this.height);
    ctx.strokeRect(40, 0, 20, this.height);
    ctx.fillRect(this.width - 60, 0, 20, this.height);
    ctx.strokeRect(this.width - 60, 0, 20, this.height);

    // Vigas horizontais com rebites
    for (let y = ironP - 100; y < this.height + 100; y += 120) {
      ctx.fillRect(0, y, this.width, 16);
      ctx.strokeRect(0, y, this.width, 16);
      // Brilho alaranjado de metal aquecido
      ctx.fillStyle = 'rgba(249, 115, 22, 0.2)';
      ctx.fillRect(0, y + 5, this.width, 6);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
    }
  }

  // 43. SERRARIA DOS TRONCOS DE MADEIRA
  drawWood(ctx, cameraY) {
    // Pilhas de toras de madeira e armações rústicas de carvalho
    const woodP = (-cameraY * 0.1) % 160;
    ctx.fillStyle = 'rgba(69, 26, 3, 0.65)';
    ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
    ctx.lineWidth = 2;

    // Pilhas de toras arredondadas nos cantos
    for (let ty = woodP - 120; ty < this.height + 120; ty += 140) {
      // Tronco horizontal
      ctx.fillRect(0, ty, 110, 22);
      ctx.strokeRect(0, ty, 110, 22);
      // Corte transversal da tora com anéis de crescimento
      ctx.beginPath();
      ctx.arc(110, ty + 11, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Tora na direita
      ctx.fillRect(this.width - 110, ty + 60, 110, 22);
      ctx.strokeRect(this.width - 110, ty + 60, 110, 22);
    }
  }

  // Grade Padrão Fallback
  drawDefaultGrid(ctx, cameraY) {
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridOffsetY = -cameraY * 0.3 % 40;
    for (let y = gridOffsetY; y < this.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 3. DESENHO DAS PARTÍCULAS ATMOSFÉRICAS
  drawParticles(ctx, cameraY) {
    ctx.save();

    for (const p of this.particles) {
      // Ajuste de parallax vertical suave nas partículas
      const py = (p.y - (cameraY * 0.25) % this.height + this.height) % this.height;

      // Partículas com Pulso Luminoso
      if (p.pulse !== undefined) {
        const alpha = Math.sin(p.pulse) * 0.35 + 0.65;
        ctx.fillStyle = p.color ? `${p.color} ${alpha})` : (p.glowColor || '#ffffff');
        ctx.shadowColor = p.glowColor || '#22c55e';
        ctx.shadowBlur = this.isMobile ? 0 : 8;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // Bolhas do Oceano ou Spray de Água
      else if (p.wobble !== undefined && (this.theme === 'ocean' || this.theme === 'waterfall')) {
        ctx.strokeStyle = p.color ? `${p.color} ${p.opacity || 0.6})` : `rgba(103, 232, 249, ${p.opacity || 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Estrelas Cintilantes do Espaço e Asteroides
      else if (p.twinkle !== undefined) {
        const alpha = Math.sin(p.twinkle) * 0.45 + 0.55;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      // Chuva / Chuva Cyberpunk / Chuva de Monção
      else if (p.len !== undefined) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, py);
        ctx.lineTo(p.x + (p.speedX || -1.2) * 2.5, py + p.len);
        ctx.stroke();
      }
      // Poeira / Neve / Dunas / Outros
      else {
        ctx.fillStyle = p.color ? `${p.color} ${p.opacity || 0.4})` : `rgba(255, 255, 255, ${p.opacity || 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}
