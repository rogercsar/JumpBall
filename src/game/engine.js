import { soundEngine } from './audio';
import { ParticleSystem } from './particles';
import { BackgroundRenderer } from './background';
import { drawBallSkin } from './skinRenderer';

export class GameEngine {
  constructor(canvas, stage, skin, onGameOver, onVictory, onScoreUpdate, onLivesUpdate, gameOptions = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stage = stage;
    this.skin = skin;
    this.onGameOver = onGameOver;
    this.onVictory = onVictory;
    this.onScoreUpdate = onScoreUpdate;
    this.onLivesUpdate = onLivesUpdate;

    // Modos de Jogo: 'solo' (padrão), 'race_ai' (vs Máquina) ou 'race_pvp' (Duelo 1v1)
    this.mode = gameOptions.mode || 'solo';
    this.aiDifficulty = gameOptions.aiDifficulty || 'medium';
    this.onRaceUpdate = gameOptions.onRaceUpdate || null;
    this.onBoostUpdate = gameOptions.onBoostUpdate || null;
    this.opponentData = gameOptions.opponentData || null;
    this.onLocalPlayerUpdate = gameOptions.onLocalPlayerUpdate || null;
    this.onPvPFinish = gameOptions.onPvPFinish || null;

    // Barra de Carga de Impulso / Super Salto
    this.maxBoostCharge = 100;
    this.boostCharge = 100;
    this.boostRechargeRate = 36; // recarrega ~36% por segundo (~2.8s do 0 ao 100%)
    this.lastBoostReported = 100;
    this.hasPendingBoostUpdate = true;

    // Dimensões lógicas adaptativas ao espaço disponível na tela
    this.width = 440;
    this.height = 720;
    this.initCanvas();

    this.particles = new ParticleSystem();
    this.background = new BackgroundRenderer(this.width, this.height, this.stage);
    this.running = false;
    this.paused = false;
    this.animationId = null;

    this.handleResize = () => {
      this.initCanvas();
      this.render();
    };
    window.addEventListener('resize', this.handleResize);

    // Sistema de 3 Vidas, Marcadores de Morte e Escudo de Respawn
    this.maxLives = 3;
    this.lives = 3;
    this.deathMarkers = [];
    this.invulnerableTimer = 0;

    // Sistema de Paredes Laterais Temáticas (Bloqueios e Portais Abertos)
    this.wallWidth = 14;
    this.wallCycleHeight = 360;
    this.wallBlockedHeight = 220; // 220px parede sólida, 140px portal aberto
    this.wallTheme = this.initWallTheme();

    // Rastro Ativo selecionado na Loja
    this.selectedTrail = gameOptions.selectedTrail || 'default';

    // Sistema de Novos Power-Ups Coletáveis
    this.powerups = [];
    this.activePowerUps = { magnet: 0, shield: false, slowmo: 0, springBoost: 0 };

    // Sistema de Corações de Vida Coletáveis (Fase 38+ e Modo Infinito Exponencial)
    this.hearts = [];
    this.spawnedHeartsCount = 0;
    this.endlessNextHeartHeight = 10000;
    this.endlessHeartsSpawned = 0;

    // Modo Infinito com Magma / Lava Ascendente
    this.isEndless = this.mode === 'endless';
    this.lavaY = this.height + 120;
    this.lavaSpeed = 0.65;
    this.lavaWarning = false;

    // Efeitos de Camera Shake e Haptics
    this.cameraShakeTimer = 0;
    this.cameraShakeIntensity = 0;

    // Estado da Bola do Jogador
    const isRace = this.mode === 'race_ai' || this.mode === 'race_pvp';
    const initialPlayerX = isRace ? this.width / 2 - 32 : this.width / 2;
    this.ball = {
      x: initialPlayerX,
      y: this.height - 76,
      vx: 0,
      vy: 0,
      radius: 16,
      stretchX: 1,
      stretchY: 1,
      angle: 0,
      hasMagicBackpack: false,
      backpackFuel: 0,
      backpackMaxFuel: 100,
      backpackPickupAltitude: 0,
      lastFuelCanAltitude: 0
    };

    // Estado da Bola do Bot IA (Competidor na Corrida vs Máquina)
    if (this.mode === 'race_ai') {
      this.botBall = {
        x: this.width / 2 + 32,
        y: this.height - 76,
        vx: 0,
        vy: 0,
        radius: 16,
        stretchX: 1,
        stretchY: 1,
        angle: 0,
        lives: 3,
        maxHeightReached: 0,
        invulnerableTimer: 0,
        skin: {
          primary: '#c084fc', // Púrpura Neon Cyber
          glow: '#a855f7',
          trail: '#7e22ce'
        },
        targetPlatform: null,
        decisionTimer: 0
      };
    } else {
      this.botBall = null;
    }

    // Estado da Bola do Adversário Remoto (Duelo 1v1 PvP)
    if (this.mode === 'race_pvp') {
      const oppSkin = this.opponentData?.skin || {
        primary: '#f43f5e',
        glow: '#fb7185',
        trail: '#be123c'
      };
      this.opponentBall = {
        x: this.width / 2 + 32,
        y: this.height - 76,
        targetX: this.width / 2 + 32,
        targetY: this.height - 76,
        vx: 0,
        vy: 0,
        radius: 16,
        stretchX: 1,
        stretchY: 1,
        angle: 0,
        lives: 3,
        maxHeightReached: 0,
        invulnerableTimer: 0,
        username: this.opponentData?.username || 'Adversário',
        skin: oppSkin
      };
    } else {
      this.opponentBall = null;
    }

    // Câmera
    this.cameraY = 0;
    this.targetCameraY = 0;
    this.maxHeightReached = 0;

    // Pontuação e Estatísticas
    this.score = 0;
    this.jumpsCount = 0;
    this.gemsCollected = 0;
    this.portalsCrossed = 0;
    this.startTime = Date.now();

    // Controles e Sensores (Giroscópio desabilitado por solicitação)
    this.tiltX = 0; // Desabilitado
    this.keys = { left: false, right: false, jump: false };
    this.touchDirection = 0; // -1 (esquerda), 0, 1 (direita)
    this.gestureSuperJumpTriggered = false;

    // Entidades
    this.platforms = [];
    this.gems = [];
    this.magicBackpacks = [];
    this.backpackFuelCans = [];
    this.environmentalHazards = [];
    this.activeLightning = null;
    this.hazardSpawnTimer = 0;
    this.lightningTimer = 0;
    this.spawnedBackpacksCount = 0;
    this.thrustSoundTimer = 0;
    this.highestPlatformY = this.height;

    // Sistema de Chefão / Boss Fight (ativado na Jornada do Herói, desativado na Jornada Livre)
    this.soloJourney = gameOptions.soloJourney || 'hero';
    this.isBossFight = Boolean(this.stage.isBossStage && this.soloJourney !== 'free');
    if (this.isBossFight) {
      this.boss = {
        name: this.stage.bossName || 'Guardião Titânico',
        title: this.stage.bossTitle || 'Soberano das Alturas',
        maxHp: this.stage.bossHP || 6,
        hp: this.stage.bossHP || 6,
        x: this.width / 2,
        y: 105,
        radius: 36,
        color: this.stage.bossColor || '#f59e0b',
        glow: this.stage.bossGlow || '#fbbf24',
        floatAngle: 0,
        attackTimer: 2.2,
        hasParallelUniverseAttack: Boolean(this.stage.hasParallelUniverseAttack),
        parallelTriggered: false,
        isParallelUniverse: false,
        parallelTimer: 0,
        hitFlash: 0,
        projectiles: []
      };
    } else {
      this.boss = null;
    }
    this.playerMissiles = [];
    this.quantumCrystal = null;

    // Configuração de Física da Fase - Salto Normal Reduzido para maior controle e precisão
    this.gravity = stage.gravity || 0.34;
    const baseJump = stage.jumpForce || -11.8;
    this.jumpForce = baseJump * 0.76; // Reduz o salto normal em ~24% (-11.5 vira ~ -8.74)
    this.wind = stage.wind || 0;
    this.friction = stage.friction || 0.94;

    // Modo Horizontal: percursos laterais (Fases 23 e 39) - precisa ser inicializado antes de initInitialPlatforms
    this.isHorizontal = Boolean(this.stage.layout === 'horizontal');
    this.cameraX = 0;
    this.targetDistance = this.stage.targetDistance || 4000;
    this.horizontalFurthestX = 80; // começa na posição inicial da bola

    this.initInitialPlatforms();
    this.render();
  }

  // Quantidade de mochilas balanceada gradualmente pela dificuldade/altura da fase
  getMaxBackpacksForStage() {
    const stageNum = this.stage.number || 1;
    if (stageNum <= 3) return 1; // Nas primeiras fases: apenas 1 mochila
    if (stageNum <= 8) return 2;
    if (stageNum <= 16) return 3;
    if (stageNum <= 28) return 4;
    return 5; // Fases mais altas com maior extensão vertical
  }

  // Define o estilo temático das paredes e portais conforme a fase
  initWallTheme() {
    const theme = (this.stage && this.stage.theme) ? this.stage.theme.toLowerCase() : 'cyber';
    if (theme.includes('forest') || theme.includes('nature') || theme.includes('tree')) {
      return {
        type: 'forest',
        primary: '#1e3a2b',
        secondary: '#062419',
        border: '#22c55e',
        accent: '#86efac',
        portalColor: '#4ade80',
        sparkColor: '#86efac'
      };
    } else if (theme.includes('desert') || theme.includes('sand') || theme.includes('dune')) {
      return {
        type: 'desert',
        primary: '#542c09',
        secondary: '#2e1503',
        border: '#eab308',
        accent: '#fde047',
        portalColor: '#f59e0b',
        sparkColor: '#facc15'
      };
    } else if (theme.includes('ocean') || theme.includes('water') || theme.includes('abyss')) {
      return {
        type: 'ocean',
        primary: '#073b4c',
        secondary: '#031726',
        border: '#06b6d4',
        accent: '#67e8f9',
        portalColor: '#0ea5e9',
        sparkColor: '#38bdf8'
      };
    } else if (theme.includes('ice') || theme.includes('glacier') || theme.includes('frost') || theme.includes('snow')) {
      return {
        type: 'ice',
        primary: '#0c4a6e',
        secondary: '#082f49',
        border: '#38bdf8',
        accent: '#e0f2fe',
        portalColor: '#7dd3fc',
        sparkColor: '#ffffff'
      };
    } else if (theme.includes('volcano') || theme.includes('magma') || theme.includes('lava') || theme.includes('fire')) {
      return {
        type: 'volcano',
        primary: '#450a0a',
        secondary: '#1c0505',
        border: '#ef4444',
        accent: '#f97316',
        portalColor: '#fbbf24',
        sparkColor: '#fdba74'
      };
    } else if (theme.includes('space') || theme.includes('cosmic') || theme.includes('void') || theme.includes('galaxy')) {
      return {
        type: 'space',
        primary: '#1e1b4b',
        secondary: '#0f0c29',
        border: '#818cf8',
        accent: '#c084fc',
        portalColor: '#a855f7',
        sparkColor: '#e0e7ff'
      };
    } else {
      return {
        type: 'cyber',
        primary: '#0f172a',
        secondary: '#020617',
        border: '#06b6d4',
        accent: '#ec4899',
        portalColor: '#a855f7',
        sparkColor: '#38bdf8'
      };
    }
  }

  // Verifica se uma coordenada vertical Y do mundo corresponde a uma parede bloqueada ou portal aberto
  isWallBlocked(worldY) {
    const cycle = this.wallCycleHeight;
    const normY = ((Math.floor(worldY) % cycle) + cycle) % cycle;
    return normY < this.wallBlockedHeight;
  }

  // Trata colisões laterais: ricochete com impacto na parede ou travessia pelo portal
  handleLateralWallCollisions(entity, dt, isPlayer = false) {
    const wallW = this.wallWidth;
    const r = entity.radius;

    // 1. Parede Lateral Esquerda
    if (entity.x - r <= wallW) {
      if (this.isWallBlocked(entity.y)) {
        // Bloqueada: Ricochete físico
        entity.x = wallW + r;
        if (entity.vx < 0) {
          entity.vx = Math.abs(entity.vx) * 0.82 + 2.4;
          entity.stretchX = 0.78;
          entity.stretchY = 1.22;
          if (isPlayer) {
            soundEngine.playWallBounce();
            this.triggerCameraShake(4, 120);
            this.triggerHaptic(25);
            this.particles.emitWallBounceSparks(wallW, entity.y, this.wallTheme.sparkColor, true);
          }
        }
      } else {
        // Portal Aberto: Atravessar totalmente para o lado oposto
        if (entity.x < -r) {
          entity.x = this.width - wallW - r;
          if (isPlayer) {
            this.portalsCrossed = (this.portalsCrossed || 0) + 1;
            soundEngine.playPortalWarp();
            this.triggerHaptic(18);
            this.particles.emitPortalWarpBurst(wallW, entity.y, this.wallTheme.portalColor);
            this.particles.emitPortalWarpBurst(this.width - wallW, entity.y, this.wallTheme.portalColor);
          }
        }
      }
    }

    // 2. Parede Lateral Direita
    if (entity.x + r >= this.width - wallW) {
      if (this.isWallBlocked(entity.y)) {
        // Bloqueada: Ricochete físico
        entity.x = this.width - wallW - r;
        if (entity.vx > 0) {
          entity.vx = -Math.abs(entity.vx) * 0.82 - 2.4;
          entity.stretchX = 0.78;
          entity.stretchY = 1.22;
          if (isPlayer) {
            soundEngine.playWallBounce();
            this.triggerCameraShake(4, 120);
            this.triggerHaptic(25);
            this.particles.emitWallBounceSparks(this.width - wallW, entity.y, this.wallTheme.sparkColor, false);
          }
        }
      } else {
        // Portal Aberto: Atravessar totalmente para o lado oposto
        if (entity.x > this.width + r) {
          entity.x = wallW + r;
          if (isPlayer) {
            this.portalsCrossed = (this.portalsCrossed || 0) + 1;
            soundEngine.playPortalWarp();
            this.triggerHaptic(18);
            this.particles.emitPortalWarpBurst(this.width - wallW, entity.y, this.wallTheme.portalColor);
            this.particles.emitPortalWarpBurst(wallW, entity.y, this.wallTheme.portalColor);
          }
        }
      }
    }
  }

  // Renderiza as paredes laterais temáticas e os portais abertos
  drawLateralWalls(ctx) {
    const theme = this.wallTheme;
    const wallW = this.wallWidth;
    const cycle = this.wallCycleHeight;
    const blockedH = this.wallBlockedHeight;
    const openH = cycle - blockedH;

    const startY = this.cameraY - 40;
    const endY = this.cameraY + this.height + 40;

    const firstCycleIndex = Math.floor(startY / cycle);
    const lastCycleIndex = Math.floor(endY / cycle);

    ctx.save();

    for (let c = firstCycleIndex; c <= lastCycleIndex; c++) {
      const cycleWorldTop = c * cycle;
      const screenBlockedTop = cycleWorldTop - this.cameraY;
      const screenGatewayTop = screenBlockedTop + blockedH;

      // ==========================================
      // A. SEÇÃO BLOQUEADA (PAREDE SÓLIDA)
      // ==========================================
      // 1. Pilar Esquerdo
      const gradLeft = ctx.createLinearGradient(0, 0, wallW, 0);
      gradLeft.addColorStop(0, theme.secondary);
      gradLeft.addColorStop(0.7, theme.primary);
      gradLeft.addColorStop(1, theme.border);
      ctx.fillStyle = gradLeft;
      ctx.fillRect(0, screenBlockedTop, wallW, blockedH);

      // Borda interna iluminada
      ctx.strokeStyle = theme.border;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(wallW, screenBlockedTop);
      ctx.lineTo(wallW, screenBlockedTop + blockedH);
      ctx.stroke();

      // 2. Pilar Direito
      const gradRight = ctx.createLinearGradient(this.width - wallW, 0, this.width, 0);
      gradRight.addColorStop(0, theme.border);
      gradRight.addColorStop(0.3, theme.primary);
      gradRight.addColorStop(1, theme.secondary);
      ctx.fillStyle = gradRight;
      ctx.fillRect(this.width - wallW, screenBlockedTop, wallW, blockedH);

      ctx.beginPath();
      ctx.moveTo(this.width - wallW, screenBlockedTop);
      ctx.lineTo(this.width - wallW, screenBlockedTop + blockedH);
      ctx.stroke();

      // 3. Detalhes Decorativos no Bloco (Ranhuras / Rebites temáticos)
      const numSegments = 5;
      const segStep = blockedH / numSegments;
      ctx.strokeStyle = theme.accent;
      ctx.lineWidth = 1;
      ctx.fillStyle = theme.accent;
      for (let s = 1; s < numSegments; s++) {
        const segY = screenBlockedTop + s * segStep;
        // Ranhura horizontal esquerda
        ctx.beginPath();
        ctx.moveTo(1, segY);
        ctx.lineTo(wallW - 2, segY);
        ctx.stroke();
        ctx.fillRect(wallW - 4, segY - 1.5, 3, 3);

        // Ranhura horizontal direita
        ctx.beginPath();
        ctx.moveTo(this.width - wallW + 2, segY);
        ctx.lineTo(this.width - 1, segY);
        ctx.stroke();
        ctx.fillRect(this.width - wallW + 1, segY - 1.5, 3, 3);
      }

      // ==========================================
      // B. TERMINAIS / EMISSORES DE ENERGIA NAS BORDAS DO PORTAL
      // ==========================================
      ctx.fillStyle = theme.accent;
      ctx.fillRect(0, screenGatewayTop - 4, wallW + 2, 4);
      ctx.fillRect(this.width - wallW - 2, screenGatewayTop - 4, wallW + 2, 4);

      ctx.fillRect(0, screenGatewayTop + openH, wallW + 2, 4);
      ctx.fillRect(this.width - wallW - 2, screenGatewayTop + openH, wallW + 2, 4);

      // ==========================================
      // C. SEÇÃO ABERTA (PORTAL DE PASSAGEM / TELETRANSPORTE)
      // ==========================================
      const portalGradLeft = ctx.createLinearGradient(0, 0, wallW * 2.5, 0);
      portalGradLeft.addColorStop(0, theme.portalColor);
      portalGradLeft.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = portalGradLeft;
      ctx.globalAlpha = 0.28;
      ctx.fillRect(0, screenGatewayTop, wallW * 2.5, openH);

      const portalGradRight = ctx.createLinearGradient(this.width, 0, this.width - wallW * 2.5, 0);
      portalGradRight.addColorStop(0, theme.portalColor);
      portalGradRight.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = portalGradRight;
      ctx.fillRect(this.width - wallW * 2.5, screenGatewayTop, wallW * 2.5, openH);
      ctx.globalAlpha = 1.0;

      // Linha de energia tracejada vertical
      ctx.save();
      ctx.strokeStyle = theme.portalColor;
      ctx.lineWidth = 1.8;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(2, screenGatewayTop);
      ctx.lineTo(2, screenGatewayTop + openH);
      ctx.moveTo(this.width - 2, screenGatewayTop);
      ctx.lineTo(this.width - 2, screenGatewayTop + openH);
      ctx.stroke();
      ctx.restore();

      // Chevrons animados convidativos ( « e » )
      const midGatewayY = screenGatewayTop + openH / 2;
      ctx.fillStyle = theme.portalColor;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const chevronAlpha = 0.45 + Math.sin(Date.now() * 0.006) * 0.35;
      ctx.globalAlpha = Math.max(0.15, chevronAlpha);
      ctx.fillText('«', 7, midGatewayY - 20);
      ctx.fillText('«', 7, midGatewayY);
      ctx.fillText('«', 7, midGatewayY + 20);

      ctx.fillText('»', this.width - 7, midGatewayY - 20);
      ctx.fillText('»', this.width - 7, midGatewayY);
      ctx.fillText('»', this.width - 7, midGatewayY + 20);
      ctx.globalAlpha = 1.0;
    }

    ctx.restore();
  }

  initCanvas() {
    this.isMobile = typeof navigator !== 'undefined' && (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (typeof window !== 'undefined' && window.innerWidth < 768));
    const rawDpr = window.devicePixelRatio || 1;
    // Otimização Mobile: limita DPR a no máximo 1.6x no mobile para não sobrecarregar GPU móvel
    const dpr = this.isMobile ? Math.min(rawDpr, 1.6) : Math.min(rawDpr, 2.0);
    this.dpr = dpr;

    // Adaptação dinâmica ao tamanho e proporção real do container para ocupar 100% da tela disponível
    const parent = this.canvas.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const aspect = rect.height / rect.width;
        // Adapta a altura virtual para cobrir toda a extensão vertical do container
        this.height = Math.round(Math.max(680, Math.min(960, this.width * aspect)));
        if (this.background) {
          this.background.height = this.height;
        }
      }
    }

    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.maxWidth = '100%';
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.display = 'block';

    this.ctx.scale(dpr, dpr);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'low';
  }

  initInitialPlatforms() {
    this.platforms = [];
    this.gems = [];
    this.magicBackpacks = [];
    this.backpackFuelCans = [];
    this.powerups = [];
    this.hearts = [];
    this.activePowerUps = { magnet: 0, shield: false, slowmo: 0, springBoost: 0 };
    this.environmentalHazards = [];
    this.activeLightning = null;
    this.hazardSpawnTimer = 0;
    this.lightningTimer = 0;
    this.spawnedBackpacksCount = 0;
    this.spawnedHeartsCount = 0;
    this.endlessNextHeartHeight = 10000;
    this.endlessHeartsSpawned = 0;
    if (this.isEndless) {
      this.lavaY = this.height + 120;
    }

    // === MODO HORIZONTAL ===
    if (this.isHorizontal) {
      // Plataforma inicial (deck largo do navio / chão da fábrica)
      this.platforms.push({
        x: 20,
        y: this.height - 130,
        width: 220,
        height: 18,
        type: 'standard',
        vx: 0,
        broken: false,
        opacity: 1,
        hasSpikes: false,
        hasBossBattery: false
      });
      // Posição inicial da bola no modo horizontal
      this.ball.x = 80;
      this.ball.y = this.height - 130 - this.ball.radius - 4;
      this.ball.vx = 0;
      this.ball.vy = 0;
      this.cameraX = 0;
      this.horizontalFurthestX = 80;
      this.lastHorizontalPlatformY = this.height - 180;
      // Gerar plataformas iniciais à frente
      let curX = 260;
      while (curX < this.targetDistance + 600) {
        this.generateHorizontalPlatformAt(curX);
        curX += Math.floor(Math.random() * 60 + 90);
      }
      this.highestPlatformY = this.height; // não usado no horizontal mas evita erros
      return;
    }

    // === MODO VERTICAL PADRÃO ===
    // Plataforma base inicial (mais larga no modo corrida para acomodar jogador e bot)
    const baseWidth = this.mode === 'race_ai' ? 160 : 120;
    this.platforms.push({
      x: this.width / 2 - baseWidth / 2,
      y: this.height - 60,
      width: baseWidth,
      height: 16,
      type: 'standard',
      vx: 0,
      hasSpikes: false
    });

    let currentY = this.height - 120;
    while (currentY > -800) {
      this.generatePlatformAt(currentY);
      currentY -= Math.floor(Math.random() * 28 + 52);
    }
    this.highestPlatformY = currentY;
  }

  generatePlatformAt(y) {
    const pWidth = Math.floor(Math.random() * 25 + 65);
    const pX = Math.floor(Math.random() * (this.width - pWidth - 30)) + 15;
    const hazards = this.stage.hazards || [];

    let type = 'standard';
    let vx = 0;

    const rand = Math.random();
    if (rand < 0.22 && hazards.includes('moving')) {
      type = 'moving';
      vx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 1.5 + 1.2) * this.stage.speedFactor;
    } else if (rand < 0.38 && hazards.includes('fragile')) {
      type = 'fragile';
    } else if (rand < 0.50 && (hazards.includes('springs') || Math.random() < 0.15)) {
      type = 'spring';
    } else if (rand < 0.62 && hazards.includes('conveyor')) {
      type = 'conveyor';
      vx = Math.random() > 0.5 ? 2 : -2;
    }

    // Bateria de Energia anti-Chefão na Boss Fight
    let hasBossBattery = false;
    if (this.isBossFight && type === 'standard' && Math.random() < 0.32) {
      hasBossBattery = true;
    }

    const platform = {
      x: pX,
      y: y,
      width: pWidth,
      height: 15,
      type: type,
      vx: vx,
      broken: false,
      opacity: 1,
      hasSpikes: false,
      hasBossBattery: hasBossBattery,
      batteryActive: hasBossBattery,
      batteryCooldown: 0
    };

    // Chance de espinhos na plataforma baseada no tema ou desafios da fase
    const spikeThemes = ['forest', 'autumn', 'spring', 'wood', 'rock', 'iron', 'volcano', 'steampunk', 'ninja', 'medieval', 'darkmatter'];
    if (type === 'standard' && !hasBossBattery && (spikeThemes.includes(this.stage.theme) || hazards.includes('spikes'))) {
      if (Math.random() < 0.15) {
        platform.hasSpikes = true;
      }
    }

    this.platforms.push(platform);

    // Chance de gerar uma gema ou moeda bônus
    if (Math.random() < 0.25) {
      this.gems.push({
        x: pX + pWidth / 2,
        y: y - 28,
        radius: 8,
        collected: false,
        pulse: 0
      });
    }

    // Geração controlada da Mochila Mágica:
    // Nas primeiras fases tem somente 1 mochila, aumentando gradualmente nas fases mais altas
    const maxBackpacks = this.getMaxBackpacksForStage();
    if (this.spawnedBackpacksCount < maxBackpacks) {
      const currentPlatHeight = Math.max(0, Math.floor(-y + this.height - 120));
      const targetStageHeight = this.stage.targetHeight || 2000;

      // Distribui a aparição ao longo da subida da fase
      const intervalHeight = targetStageHeight / (maxBackpacks + 1);
      const targetMilestone = intervalHeight * (this.spawnedBackpacksCount + 1);

      if (currentPlatHeight >= targetMilestone - 90) {
        this.magicBackpacks.push({
          x: pX + pWidth / 2,
          y: y - 32,
          width: 24,
          height: 28,
          collected: false,
          pulse: Math.random() * Math.PI * 2
        });
        this.spawnedBackpacksCount++;
      }
    }

    // Geração Dinâmica e Calibrada de Galões de Combustível da Mochila Mágica (Jetpack Plasma Fuel)
    // 1. Taxa base aumentada em ~1.8x (de 0.04/0.025 para 0.07/0.045)
    // 2. Cálculo dinâmico inteligente: quando o jogador está com a mochila ativa,
    //    calcula com base na altura onde pegou a mochila / último combustível e quanto combustível ainda resta,
    //    garantindo que apareça combustível na janela de alcance antes de perder a mochila!
    let fuelChance = this.spawnedBackpacksCount > 0 ? 0.07 : 0.045;

    if (this.ball && this.ball.hasMagicBackpack && this.ball.backpackFuel > 0) {
      const currentPlatAlt = Math.max(0, Math.floor(-y + this.height - 120));
      const playerAlt = Math.max(0, Math.floor(-this.ball.y + this.height - 120));
      const refAlt = this.ball.lastFuelCanAltitude || this.ball.backpackPickupAltitude || playerAlt;
      
      // A velocidade de subida é ~1.85px/frame a 60fps (~111px/s).
      // Com combustível restante (0 a 100), o jogador consegue voar por: (fuel / 18.2) segundos.
      // Distância máxima alcançável restante com o combustível atual:
      const remainingSeconds = (this.ball.backpackFuel / 18.2);
      const maxReachableClimb = Math.max(120, remainingSeconds * 111);
      const targetFuelAltitude = refAlt + maxReachableClimb * 0.72; // posiciona a ~70% da autonomia para dar tempo de pegar

      // Se a plataforma que está sendo gerada estiver próxima ou acima da janela crítica de reabastecimento
      if (currentPlatAlt >= targetFuelAltitude - 150 && currentPlatAlt <= targetFuelAltitude + 280) {
        // Chance significativamente ampliada na janela crítica de resgate
        fuelChance = Math.max(fuelChance, 0.28);
      } else if (this.ball.backpackFuel < 40 && currentPlatAlt > playerAlt) {
        // Se o combustível estiver acabando (<40%), aumenta a chance em qualquer plataforma à frente
        fuelChance = Math.max(fuelChance, 0.18);
      }
    }

    if (Math.random() < fuelChance) {
      this.backpackFuelCans.push({
        x: pX + pWidth / 2,
        y: y - 30,
        radius: 12,
        collected: false,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Chance de gerar um Power-Up especial (Ímã, Escudo, Slowmo, Super Molas)
    if (Math.random() < 0.12) {
      const pTypes = ['magnet', 'shield', 'slowmo', 'spring_boost'];
      const chosenType = pTypes[Math.floor(Math.random() * pTypes.length)];
      this.powerups.push({
        x: pX + pWidth / 2,
        y: y - 28,
        radius: 12,
        type: chosenType,
        collected: false,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Geração de Corações de Vida Coletáveis:
    // 1. A partir da Fase 38 (3 corações espalhados uniformemente nos marcos de 25%, 50% e 75% da fase)
    // 2. Modo Infinito: função exponencial iniciando em 10.000m (10k, 25k, 47.5k, 81.25k...)
    const currentPlatHeight = Math.max(0, Math.floor(-y + this.height - 120));
    const isStage38Plus = Boolean(
      !this.isEndless &&
      this.stage &&
      ((this.stage.number !== undefined && this.stage.number >= 38) || (this.stage.id !== undefined && Number(this.stage.id) >= 38))
    );

    if (isStage38Plus && this.spawnedHeartsCount < 3) {
      const targetStageHeight = this.stage.targetHeight || 38000;
      const intervalHeight = targetStageHeight / 4;
      const targetMilestone = intervalHeight * (this.spawnedHeartsCount + 1);

      if (currentPlatHeight >= targetMilestone - 90) {
        this.hearts.push({
          x: pX + pWidth / 2,
          y: y - 30,
          radius: 14,
          collected: false,
          pulse: Math.random() * Math.PI * 2
        });
        this.spawnedHeartsCount++;
      }
    } else if (this.isEndless) {
      if (currentPlatHeight >= this.endlessNextHeartHeight) {
        this.hearts.push({
          x: pX + pWidth / 2,
          y: y - 30,
          radius: 14,
          collected: false,
          pulse: Math.random() * Math.PI * 2
        });
        this.endlessHeartsSpawned++;
        const nextInterval = Math.round(10000 * Math.pow(1.5, this.endlessHeartsSpawned));
        this.endlessNextHeartHeight += nextInterval;
      }
    }
  }

  // Gera plataformas para o percurso horizontal
  generateHorizontalPlatformAt(x) {
    const hazards = this.stage.hazards || [];
    const pWidth = Math.floor(Math.random() * 35 + 65); // 65px a 100px para ótima jogabilidade

    // Variação de altura gradual e suave para garantir que todos os saltos sejam alcançáveis
    if (!this.lastHorizontalPlatformY) {
      this.lastHorizontalPlatformY = this.height - 180;
    }
    const deltaY = Math.floor(Math.random() * 80 - 40); // oscilação confortável de -40px a +40px
    const pY = Math.max(this.height - 330, Math.min(this.height - 140, this.lastHorizontalPlatformY + deltaY));
    this.lastHorizontalPlatformY = pY;

    let type = 'standard';
    let vx = 0;
    let moveType = null;
    let moveVX = 0;
    let moveVY = 0;
    let moveMinX = x;
    let moveMaxX = x;
    let moveMinY = pY;
    let moveMaxY = pY;

    const rand = Math.random();
    if (rand < 0.32 && (hazards.includes('moving') || true)) {
      type = 'moving';
      // 50% de chance de mover na HORIZONTAL (esquerda/direita) e 50% na VERTICAL (cima/baixo)
      const isHorizontalMove = Math.random() < 0.5;
      const speed = (Math.random() * 0.5 + 1.2) * (this.stage.speedFactor || 1);

      if (isHorizontalMove) {
        moveType = 'horizontal';
        moveVX = (Math.random() > 0.5 ? 1 : -1) * speed;
        const rangeX = Math.floor(Math.random() * 20 + 45); // oscilação de 45px a 65px
        moveMinX = x - rangeX;
        moveMaxX = x + rangeX;
      } else {
        moveType = 'vertical';
        moveVY = (Math.random() > 0.5 ? 1 : -1) * speed;
        const rangeY = Math.floor(Math.random() * 20 + 45); // oscilação de 45px a 65px
        moveMinY = Math.max(this.height - 340, pY - rangeY);
        moveMaxY = Math.min(this.height - 130, pY + rangeY);
      }
    } else if (rand < 0.44 && hazards.includes('fragile')) {
      type = 'fragile';
    } else if (rand < 0.56 && hazards.includes('springs')) {
      type = 'spring';
    } else if (rand < 0.68 && hazards.includes('conveyor')) {
      type = 'conveyor';
      vx = Math.random() > 0.5 ? 2.2 : -2.2;
    }

    const platform = {
      x: x,
      y: pY,
      width: pWidth,
      height: 16,
      type: type,
      vx: vx,
      moveType: moveType,
      moveVX: moveVX,
      moveMinX: moveMinX,
      moveMaxX: moveMaxX,
      moveVY: moveVY,
      moveMinY: moveMinY,
      moveMaxY: moveMaxY,
      broken: false,
      opacity: 1,
      hasSpikes: false,
      hasBossBattery: false,
      batteryActive: false,
      batteryCooldown: 0
    };

    // Espinhos temáticos
    const spikeThemes = ['steampunk', 'iron', 'rock', 'volcano'];
    if (type === 'standard' && (spikeThemes.includes(this.stage.theme) || hazards.includes('spikes'))) {
      if (Math.random() < 0.10) platform.hasSpikes = true;
    }

    this.platforms.push(platform);

    // Gema acima da plataforma (chance de 28%)
    if (Math.random() < 0.28) {
      this.gems.push({
        x: x + pWidth / 2,
        y: pY - 28,
        radius: 8,
        collected: false,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Power-up coletável (chance de 10%)
    if (Math.random() < 0.10) {
      const pTypes = ['magnet', 'shield', 'slowmo', 'spring_boost'];
      this.powerups.push({
        x: x + pWidth / 2,
        y: pY - 28,
        radius: 12,
        type: pTypes[Math.floor(Math.random() * pTypes.length)],
        collected: false,
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Coração (fase 39+ ou milestone: 1/3, 2/3 da distância)
    const stageNum = this.stage.number || 1;
    if (stageNum >= 38 && this.spawnedHeartsCount < 3) {
      const milestone = (this.targetDistance / 4) * (this.spawnedHeartsCount + 1);
      if (x >= milestone - 120) {
        this.hearts.push({
          x: x + pWidth / 2,
          y: pY - 32,
          radius: 14,
          collected: false,
          pulse: Math.random() * Math.PI * 2
        });
        this.spawnedHeartsCount++;
      }
    }
  }

  // Dispara tremor de câmera cinemático em impactos fortes
  triggerCameraShake(intensity = 6, durationMs = 180) {
    this.cameraShakeIntensity = intensity;
    this.cameraShakeTimer = Math.round(durationMs / 16.6);
  }

  // Dispara vibração tátil no celular (Haptics)
  triggerHaptic(pattern = 25) {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) { /* ignore */ }
    }
  }

  // Giroscópio desabilitado conforme solicitação (preservado para uso futuro)
  /*
  setTilt(gamma, sensitivity = 1.2, deadzone = 1.5) {
    if (Math.abs(gamma) < deadzone) {
      this.tiltX = 0;
    } else {
      const normalized = Math.max(-1, Math.min(1, gamma / 30));
      this.tiltX = normalized * sensitivity;
    }
  }
  */
  setTilt(gamma, sensitivity = 1.2, deadzone = 1.5) {
    this.tiltX = 0; // Desativado para priorizar botões touch e teclado
  }

  // Acionado pelo botão de Super Salto na tela ou Teclas (Espaço, W, Seta Cima)
  triggerGestureJump() {
    if (!this.running || this.paused) return;
    const now = performance.now();
    if (this.lastManualJumpTime && (now - this.lastManualJumpTime < 380)) {
      return; // Cooldown para evitar disparos múltiplos acidentais no mesmo segundo
    }
    this.lastManualJumpTime = now;
    this.gestureSuperJumpTriggered = true;
  }

  // Controles de Toque na tela e botões táteis
  setTouch(direction) {
    this.touchDirection = direction;
  }

  // Controles de Teclado
  handleKeyDown(e) {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = true;
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
      e.preventDefault();
      this.triggerGestureJump();
    }
  }

  handleKeyUp(e) {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = false;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = false;
  }

  start() {
    this.running = true;
    this.paused = false;
    this.finished = false;
    this.ball.vy = this.jumpForce; // Dispara o primeiro pulo do jogador ao dar Play

    if (this.botBall) {
      this.botBall.vy = this.jumpForce; // Dispara largada da bola do Bot simultaneamente
    }
    soundEngine.playJump();
    soundEngine.startStageBGM(this.stage.theme || 'forest', this.stage.id || this.stage.number || 1);
    this.startTime = Date.now();
    this.lastTime = performance.now();
    this.loop();
  }

  pause() {
    this.paused = true;
    soundEngine.pauseBGM();
  }

  resume() {
    this.paused = false;
    soundEngine.resumeBGM();
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.handleResize) {
      window.removeEventListener('resize', this.handleResize);
    }
    soundEngine.stopBGM(0.4);
  }

  loop(currentTime = performance.now()) {
    if (!this.running) return;
    if (this.paused) return;

    const dt = Math.min((currentTime - this.lastTime) / 16.666, 2.0); // normalizado para 60fps
    this.lastTime = currentTime;

    this.update(dt);
    this.render();

    this.animationId = requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    // 0. Atualizar partículas de fundo e efeitos dinâmicos
    this.background.update(dt);

    // Atualizar timer do escudo de respawn
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt * 0.0166);
    }

    // Recarga contínua da barra de impulso (quando abaixo de 100%)
    if (this.boostCharge < this.maxBoostCharge) {
      this.boostCharge = Math.min(this.maxBoostCharge, this.boostCharge + (this.boostRechargeRate * (dt / 60)));
    }

    // 1. Entrada Horizontal (Apenas Teclado + Toque na Tela)
    let moveInput = 0;
    if (this.keys.left) moveInput = -1;
    if (this.keys.right) moveInput = 1;
    if (this.touchDirection !== 0) {
      moveInput = Math.max(-1, Math.min(1, this.touchDirection));
    }

    const isFloating = this.ball.hasMagicBackpack && this.ball.backpackFuel > 0;
    const accel = (isFloating ? 1.35 : 0.85) * (this.stage.speedFactor || 1);
    this.ball.vx += moveInput * accel * dt;
    this.ball.vx += (isFloating ? this.wind * 0.4 : this.wind) * dt; // Vento mais brando durante a flutuação
    this.ball.vx *= Math.pow(isFloating ? 0.90 : this.friction, dt);

    // Limitar velocidade máxima horizontal
    const maxSpeedX = isFloating ? 9.5 : 8.5;
    this.ball.vx = Math.max(-maxSpeedX, Math.min(maxSpeedX, this.ball.vx));

    this.ball.x += this.ball.vx * dt;
    this.ball.angle += (this.ball.vx * 0.05) * dt;

    // Tratamento de Paredes Laterais (apenas no modo vertical)
    if (!this.isHorizontal) {
      this.handleLateralWallCollisions(this.ball, dt, true);
    }


    // 2. Física Vertical (Gravidade ou Efeito Balão Suave da Mochila Mágica)
    if (this.ball.hasMagicBackpack && this.ball.backpackFuel > 0) {
      // Duração de ~5.5 segundos reais: garante que a mochila acabe bem antes do final da fase
      const fuelConsumptionPerSecond = 100 / 5.5; // consome 100% em 5.5s (~18.2% por segundo)
      this.ball.backpackFuel = Math.max(0, this.ball.backpackFuel - fuelConsumptionPerSecond * (dt / 60));

      // Voo balanceado e dinâmico: subida suave e ágil a -1.85px/frame
      const floatBobbing = Math.sin(Date.now() * 0.005) * 0.2;
      const targetFlyVy = -1.85 + floatBobbing;
      this.ball.vy += (targetFlyVy - this.ball.vy) * 0.14 * dt;
      this.ball.y += this.ball.vy * dt;

      // Efeito inflado suave tipo balão do Mario
      const targetInflation = 1.28 + Math.sin(Date.now() * 0.008) * 0.05;
      this.ball.stretchX += (targetInflation - this.ball.stretchX) * 0.12 * dt;
      this.ball.stretchY += (targetInflation - this.ball.stretchY) * 0.12 * dt;

      // Jato propulsor suave de sustentação
      this.particles.emitBackpackThrust(this.ball.x, this.ball.y + (this.ball.radius * targetInflation) + 2);

      // Efeito sonoro suave em cadência tranquila
      this.thrustSoundTimer = (this.thrustSoundTimer || 0) + dt;
      if (this.thrustSoundTimer > 18) {
        this.thrustSoundTimer = 0;
        soundEngine.playJetpackThrust();
      }

      // Ao esgotar o combustível, desinfla e a mochila desaparece com fumaça
      if (this.ball.backpackFuel <= 0) {
        this.ball.hasMagicBackpack = false;
        this.ball.backpackFuel = 0;
        this.ball.stretchX = 1.0;
        this.ball.stretchY = 1.0;
        soundEngine.playJetpackExhausted();
        this.particles.emitBackpackSmoke(this.ball.x, this.ball.y);
      }
    } else {
      this.ball.vy += this.gravity * dt;
      this.ball.y += this.ball.vy * dt;

      // Recuperação suave do formato esférico da bola
      this.ball.stretchX += (1 - this.ball.stretchX) * 0.12 * dt;
      this.ball.stretchY += (1 - this.ball.stretchY) * 0.12 * dt;
    }

    // Partículas de rastro contínuo estilizado (conforme rastro equipado na Loja)
    if (Math.abs(this.ball.vy) > 2) {
      this.particles.emitTrail(this.ball.x, this.ball.y, this.skin.trail, this.selectedTrail);
    }

    // 2.5 Impulso Proporcional com Força e Carga Reduzidas Conforme Solicitado
    if (this.gestureSuperJumpTriggered) {
      this.gestureSuperJumpTriggered = false;
      const chargeRatio = Math.max(0, Math.min(1, this.boostCharge / this.maxBoostCharge));

      if (chargeRatio > 0.12) {
        // Impulso moderado e proporcional (1.0x até 1.28x da força reduzida de pulo)
        const boostMultiplier = 1.0 + (chargeRatio * 0.28);
        this.ball.vy = this.jumpForce * boostMultiplier;
        this.ball.stretchX = Math.max(0.75, 1 - (chargeRatio * 0.2));
        this.ball.stretchY = Math.min(1.3, 1 + (chargeRatio * 0.25));
        this.jumpsCount++;

        if (chargeRatio >= 0.6) {
          soundEngine.playSuperJump();
          this.triggerCameraShake(5, 140);
          this.triggerHaptic(35);
          this.particles.emitSuperJumpBurst(this.ball.x, this.ball.y + this.ball.radius, this.skin.glow);
        } else {
          soundEngine.playJump();
          this.triggerHaptic(20);
          this.particles.emitJumpBurst(this.ball.x, this.ball.y + this.ball.radius, this.skin.primary);
        }

        // Zera a barra de carga após o impulso
        this.boostCharge = 0;
        this.hasPendingBoostUpdate = true;
      } else {
        // Barra vazia ou quase vazia: executa pulo normal (1.0x da força reduzida)
        this.ball.vy = this.jumpForce;
        this.ball.stretchX = 0.9;
        this.ball.stretchY = 1.1;
        this.jumpsCount++;
        soundEngine.playJump();
        this.particles.emitJumpBurst(this.ball.x, this.ball.y + this.ball.radius, '#94a3b8');
      }
    }

    // 3. Atualizar Altura e Pontuação (apenas no modo vertical; horizontal usa distância em step 7)
    if (!this.isHorizontal) {
      const currentHeight = Math.max(0, Math.floor(-this.ball.y + this.height - 120));
      if (currentHeight > this.maxHeightReached) {
        const diff = currentHeight - this.maxHeightReached;
        this.maxHeightReached = currentHeight;
        this.score += diff;
        this.hasPendingScoreUpdate = true;
      }
    }


    // 4. Colisão da Bola com Plataformas (Apenas quando estiver caindo: vy > 0)
    if (this.ball.vy > 0) {
      for (const p of this.platforms) {
        if (p.broken) continue;

        const isCollidingX = this.ball.x + this.ball.radius * 0.7 > p.x &&
                             this.ball.x - this.ball.radius * 0.7 < p.x + p.width;

        const wasAbove = (this.ball.y - this.ball.vy * dt) <= p.y + 4;
        const isNowAtOrBelow = this.ball.y + this.ball.radius >= p.y &&
                               this.ball.y + this.ball.radius <= p.y + p.height + 12;

        if (isCollidingX && wasAbove && isNowAtOrBelow) {
          if (p.hasSpikes) {
            this.takeDamage('spikes');
            this.ball.vy = this.jumpForce * 0.75;
            this.ball.stretchX = 0.8;
            this.ball.stretchY = 1.2;
            break;
          }

          this.ball.y = p.y - this.ball.radius;
          this.jumpsCount++;

          // Disparo de míssil contra o Chefão ao saltar em plataforma com bateria ativa
          if (this.isBossFight && p.hasBossBattery && p.batteryActive) {
            p.batteryActive = false;
            p.maxBatteryCooldown = 3.0;
            p.batteryCooldown = 3.0;
            this.playerMissiles.push({
              x: this.ball.x,
              y: p.y - 14,
              vx: (this.ball.vx * 0.22) + (Math.random() - 0.5) * 1.6,
              vy: -15,
              radius: 6,
              color: '#38bdf8',
              glow: '#00f0ff'
            });
            soundEngine.playSpring();
            this.particles.emitSuperJumpBurst(this.ball.x, p.y, '#38bdf8');
            this.triggerCameraShake(4, 100);
          }

          let springBoostMultiplier = 1.0;
          if (this.activePowerUps.springBoost > 0) {
            springBoostMultiplier = 1.45;
            this.activePowerUps.springBoost--;
            this.triggerCameraShake(4, 120);
            this.triggerHaptic(30);
            this.particles.emitSuperJumpBurst(this.ball.x, p.y, '#f59e0b');
          }

          if (p.type === 'spring') {
            this.ball.vy = this.jumpForce * 1.45 * springBoostMultiplier;
            this.ball.stretchX = 0.65;
            this.ball.stretchY = 1.45;
            soundEngine.playSpring();
            this.particles.emitSuperJumpBurst(this.ball.x, p.y, '#facc15');
          } else if (p.type === 'fragile') {
            this.ball.vy = this.jumpForce * springBoostMultiplier;
            p.broken = true;
            soundEngine.playCrumble();
            this.particles.emitPlatformCrumble(p.x, p.y, p.width, p.height, '#ef4444');
          } else {
            this.ball.vy = this.jumpForce * springBoostMultiplier;
            this.ball.stretchX = 1.35;
            this.ball.stretchY = 0.7;
            soundEngine.playJump();
            this.particles.emitJumpBurst(this.ball.x, p.y, this.stage.platformColor);

            if (p.type === 'conveyor') {
              this.ball.vx += p.vx * 1.8;
            } else if (p.moveVX) {
              this.ball.vx += p.moveVX * 0.45;
            }
          }
          break;
        }
      }
    }

    // 5. Atualizar Plataformas Móveis (Afetado pelo Slowmo - apenas no modo vertical)
    if (!this.isHorizontal) {
      const slowmoPlatMult = this.activePowerUps.slowmo > 0 ? 0.45 : 1.0;
      for (const p of this.platforms) {
        if (p.type === 'moving' && !p.broken) {
          p.x += p.vx * dt * slowmoPlatMult;
          if (p.x <= 10) {
            p.x = 10;
            p.vx = Math.abs(p.vx);
          } else if (p.x + p.width >= this.width - 10) {
            p.x = this.width - 10 - p.width;
            p.vx = -Math.abs(p.vx);
          }
        }
      }
    }

    // Recarga de Baterias / Armas anti-Chefão e Atualização da Luta de Boss
    if (this.isBossFight) {
      for (const p of this.platforms) {
        if (p.hasBossBattery && !p.batteryActive) {
          p.batteryCooldown -= dt * (1 / 60);
          if (p.batteryCooldown <= 0) {
            p.batteryActive = true;
            p.batteryCooldown = 0;
            // Efeito visual e sonoro de arma recarregada
            this.particles.emit(p.x + p.width / 2, p.y - 10, 6, {
              color: '#38bdf8',
              size: 2.8,
              speed: 2,
              life: 0.4
            });
            try {
              if (soundEngine && typeof soundEngine.playJetpackPickup === 'function') {
                soundEngine.playJetpackPickup();
              } else if (soundEngine && typeof soundEngine.playMagicBackpack === 'function') {
                soundEngine.playMagicBackpack();
              }
            } catch (err) {
              console.warn('Erro ao reproduzir som de recarga:', err);
            }
          }
        }
      }
      this.updateBoss(dt);
    }

    // 6. Coleta de Gemas (Atração por Ímã ou Mochila)
    const isMagnetActive = this.activePowerUps.magnet > 0;
    for (const g of this.gems) {
      if (!g.collected) {
        g.pulse += 0.05 * dt;
        const dist = Math.hypot(this.ball.x - g.x, this.ball.y - g.y);

        // Atração magnética suave das gemas em direção à bola
        const magnetReach = isMagnetActive ? 240 : (this.ball.hasMagicBackpack ? 120 : 0);
        if (magnetReach > 0 && dist < magnetReach) {
          const pullAngle = Math.atan2(this.ball.y - g.y, this.ball.x - g.x);
          const pullSpeed = isMagnetActive ? 7.0 : 3.5;
          g.x += Math.cos(pullAngle) * pullSpeed * dt;
          g.y += Math.sin(pullAngle) * pullSpeed * dt;
        }

        // Raio de coleta generoso
        const collectThreshold = this.ball.hasMagicBackpack || isMagnetActive
          ? this.ball.radius + g.radius + 18
          : this.ball.radius + g.radius + 6;
        if (dist < collectThreshold) {
          g.collected = true;
          this.gemsCollected++;
          this.score += 150;

          // Bônus de recarga instantânea na barra de impulso (+25%)
          this.boostCharge = Math.min(this.maxBoostCharge, this.boostCharge + 25);
          this.hasPendingBoostUpdate = true;

          soundEngine.playCollect();
          this.particles.emit(g.x, g.y, 14, {
            color: '#facc15',
            size: 4,
            speed: 3.5,
            life: 0.6
          });
        }
      }
    }

    // 6.2. Coleta de Mochila Mágica (Jetpack Cósmico)
    for (const mb of this.magicBackpacks) {
      if (!mb.collected) {
        mb.pulse += 0.05 * dt;
        const dist = Math.hypot(this.ball.x - mb.x, this.ball.y - mb.y);
        if (dist < this.ball.radius + 18) {
          mb.collected = true;
          this.ball.hasMagicBackpack = true;
          this.ball.backpackFuel = 100;
          this.ball.backpackMaxFuel = 100;
          const currentAlt = Math.max(0, Math.floor(-this.ball.y + this.height - 120));
          this.ball.backpackPickupAltitude = currentAlt;
          this.ball.lastFuelCanAltitude = currentAlt;
          this.boostCharge = this.maxBoostCharge;
          this.hasPendingBoostUpdate = true;
          this.score += 250;
          soundEngine.playMagicBackpack();
          this.particles.emitSuperJumpBurst(mb.x, mb.y, '#f59e0b');
          this.particles.emitSuperJumpBurst(mb.x, mb.y, '#38bdf8');
        }
      }
    }

    // 6.22. Coleta de Galão de Combustível da Mochila Mágica (Jetpack Plasma Fuel)
    for (const fc of this.backpackFuelCans) {
      if (!fc.collected) {
        fc.pulse += 0.05 * dt;
        const dist = Math.hypot(this.ball.x - fc.x, this.ball.y - fc.y);

        // Atração magnética sutil em pleno voo quando a mochila estiver ativa
        if (this.ball.hasMagicBackpack && dist < 150) {
          const pullAngle = Math.atan2(this.ball.y - fc.y, this.ball.x - fc.x);
          fc.x += Math.cos(pullAngle) * 4.5 * dt;
          fc.y += Math.sin(pullAngle) * 4.5 * dt;
        }

        if (dist < this.ball.radius + fc.radius + 12) {
          fc.collected = true;
          this.score += 200;

          if (this.ball.hasMagicBackpack) {
            // Recarrega o combustível da mochila em +60% (teto de 100) para continuar subindo
            this.ball.backpackFuel = Math.min(this.ball.backpackMaxFuel, this.ball.backpackFuel + 60);
            const currentAlt = Math.max(0, Math.floor(-this.ball.y + this.height - 120));
            this.ball.lastFuelCanAltitude = currentAlt;
            try {
              if (soundEngine && typeof soundEngine.playJetpackPickup === 'function') {
                soundEngine.playJetpackPickup();
              } else {
                soundEngine.playCollect();
              }
            } catch (e) { /* ignore */ }
            this.triggerCameraShake(3, 110);
            this.triggerHaptic(40);
            this.particles.emitSuperJumpBurst(fc.x, fc.y, '#f59e0b');
            this.particles.emit(fc.x, fc.y, 18, { color: '#38bdf8', size: 3.5, speed: 4, life: 0.5 });
          } else {
            // Bônus alternativo sem a mochila: recarrega barra de impulso (+40%)
            this.boostCharge = Math.min(this.maxBoostCharge, this.boostCharge + 40);
            this.hasPendingBoostUpdate = true;
            soundEngine.playCollect();
            this.particles.emit(fc.x, fc.y, 12, { color: '#fbbf24', size: 3, speed: 3, life: 0.4 });
          }
        }
      }
    }

    // 6.25. Coleta e Atualização dos Power-Ups (Ímã, Escudo, Slowmo, Super Molas)
    if (this.activePowerUps.magnet > 0) {
      this.activePowerUps.magnet = Math.max(0, this.activePowerUps.magnet - dt * 0.0166);
    }
    if (this.activePowerUps.slowmo > 0) {
      this.activePowerUps.slowmo = Math.max(0, this.activePowerUps.slowmo - dt * 0.0166);
    }

    for (const pu of this.powerups) {
      if (!pu.collected) {
        pu.pulse += 0.05 * dt;
        const dist = Math.hypot(this.ball.x - pu.x, this.ball.y - pu.y);
        if (dist < this.ball.radius + pu.radius + 8) {
          pu.collected = true;
          this.score += 200;
          soundEngine.playPowerUp();
          this.triggerCameraShake(3, 110);
          this.triggerHaptic(40);
          this.particles.emitPowerUpPickup(pu.x, pu.y, pu.type);

          if (pu.type === 'magnet') {
            this.activePowerUps.magnet = 8.0;
          } else if (pu.type === 'shield') {
            this.activePowerUps.shield = true;
          } else if (pu.type === 'slowmo') {
            this.activePowerUps.slowmo = 6.0;
          } else if (pu.type === 'spring_boost') {
            this.activePowerUps.springBoost = 3;
          }
        }
      }
    }

    // 6.28. Coleta de Corações de Vida (Fase 38+ e Modo Infinito Exponencial)
    for (const heart of this.hearts) {
      if (!heart.collected) {
        heart.pulse += 0.05 * dt;
        const dist = Math.hypot(this.ball.x - heart.x, this.ball.y - heart.y);
        if (dist < this.ball.radius + heart.radius + 8) {
          heart.collected = true;
          soundEngine.playHeartPickup();
          this.particles.emitHeartPickup(heart.x, heart.y);
          this.triggerCameraShake(4, 150);
          this.triggerHaptic(50);

          if (this.lives < this.maxLives) {
            this.lives++;
            if (this.onLivesUpdate) {
              this.onLivesUpdate(this.lives);
            }
          } else {
            // Se já estiver com 3 vidas cheias, ganha 1.000 pontos de bônus!
            this.score += 1000;
            this.hasPendingScoreUpdate = true;
          }
        }
      }
    }

    // 6.3. Atualizar Riscos e Inimigos Ambientais da Fase
    this.updateEnvironmentalHazards(dt);

    // 6.5. Atualizar IA do Bot Oponente (se estiver no Modo Corrida)
    if (this.mode === 'race_ai' && this.botBall) {
      this.updateBot(dt);
      this.hasPendingRaceUpdate = true;
    }

    // 6.8. Throttling de Notificações para React (a cada ~6 frames ≈ 100ms) para máxima fluidez a 60 FPS no mobile
    this.uiThrottleTimer = (this.uiThrottleTimer || 0) + dt;
    if (this.uiThrottleTimer >= 6) {
      this.uiThrottleTimer = 0;
      if (this.onScoreUpdate && this.hasPendingScoreUpdate) {
        this.hasPendingScoreUpdate = false;
        this.onScoreUpdate(this.score, this.maxHeightReached);
      }
      if (this.onBoostUpdate) {
        const roundedBoost = Math.round(this.boostCharge);
        if (roundedBoost !== this.lastBoostReported || this.hasPendingBoostUpdate) {
          this.lastBoostReported = roundedBoost;
          this.hasPendingBoostUpdate = false;
          this.onBoostUpdate(roundedBoost);
        }
      }
      if (this.onRaceUpdate && this.hasPendingRaceUpdate && this.botBall) {
        this.hasPendingRaceUpdate = false;
        const pHeight = Math.max(0, this.maxHeightReached);
        const bHeight = Math.max(0, this.botBall.maxHeightReached);
        const diff = pHeight - bHeight;
        const leader = diff > 4 ? 'player' : (diff < -4 ? 'bot' : 'tied');
        this.onRaceUpdate({
          playerHeight: pHeight,
          botHeight: bHeight,
          distanceDiff: diff,
          leader,
          botLives: this.botBall.lives
        });
      }
      if (this.onRaceUpdate && this.opponentBall) {
        const pHeight = Math.max(0, this.maxHeightReached);
        const oppHeight = Math.max(0, this.opponentBall.maxHeightReached);
        const diff = pHeight - oppHeight;
        const leader = diff > 4 ? 'player' : (diff < -4 ? 'opponent' : 'tied');
        this.onRaceUpdate({
          playerHeight: pHeight,
          botHeight: oppHeight,
          distanceDiff: diff,
          leader,
          botLives: this.opponentBall.lives,
          opponentName: this.opponentBall.username
        });
      }
    }

    // Atualização física e interpolação do adversário humano (PvP)
    if (this.opponentBall && this.opponentBall.lives > 0) {
      this.opponentBall.x += (this.opponentBall.targetX - this.opponentBall.x) * 0.45;
      this.opponentBall.y += (this.opponentBall.targetY - this.opponentBall.y) * 0.45;
      if (this.opponentBall.invulnerableTimer > 0) {
        this.opponentBall.invulnerableTimer = Math.max(0, this.opponentBall.invulnerableTimer - dt * 0.0166);
      }
      if (Math.abs(this.opponentBall.vy) > 2) {
        this.particles.emitTrail(this.opponentBall.x, this.opponentBall.y, this.opponentBall.skin.trail);
      }
    }

    // Transmissão de telemetria do jogador local para o oponente no modo PvP
    if (this.mode === 'race_pvp' && this.onLocalPlayerUpdate) {
      this.onLocalPlayerUpdate({
        x: this.ball.x,
        y: this.ball.y,
        vx: this.ball.vx,
        vy: this.ball.vy,
        stretchX: this.ball.stretchX,
        stretchY: this.ball.stretchY,
        angle: this.ball.angle,
        lives: this.lives,
        maxHeightReached: this.maxHeightReached,
        invulnerableTimer: this.invulnerableTimer
      });
    }

    // 7. Câmera (Vertical normal / Horizontal acompanha a bola da esquerda)
    if (this.isHorizontal) {
      // Câmera horizontal: acompanha suavemente com offset de 35% da largura da tela
      const targetCX = this.ball.x - this.width * 0.35;
      this.cameraX += (targetCX - this.cameraX) * 0.14 * dt;
      // Não deixa recuar abaixo de 0 (o começo do percurso)
      this.cameraX = Math.max(0, this.cameraX);

      // Barreira lateral esquerda: impede que o jogador recue até atrás da câmera
      const leftBarrier = this.cameraX + this.ball.radius + 6;
      if (this.ball.x < leftBarrier) {
        this.ball.x = leftBarrier;
        if (this.ball.vx < 0) this.ball.vx = 0;
      }

      // Distância percorrida (metros horizontais desde a origem)
      const horizDist = Math.max(0, Math.floor(this.ball.x - 80));
      if (horizDist > this.horizontalFurthestX - 80) {
        const diff = horizDist - (this.horizontalFurthestX - 80);
        this.horizontalFurthestX = horizDist + 80;
        this.maxHeightReached = horizDist; // reusar maxHeightReached para armazenar distância
        this.score += diff;
        this.hasPendingScoreUpdate = true;
      }

      // Plataformas móveis no modo horizontal (verticais e horizontais)
      const slowmoPlatMult2 = this.activePowerUps.slowmo > 0 ? 0.45 : 1.0;
      for (const p of this.platforms) {
        if (p.broken) continue;

        // Movimento vertical (sobe e desce)
        if (p.moveVY) {
          p.y += p.moveVY * dt * slowmoPlatMult2;
          if (p.y <= p.moveMinY) { p.y = p.moveMinY; p.moveVY = Math.abs(p.moveVY); }
          if (p.y >= p.moveMaxY) { p.y = p.moveMaxY; p.moveVY = -Math.abs(p.moveVY); }
        }

        // Movimento horizontal (esquerda e direita)
        if (p.moveVX) {
          p.x += p.moveVX * dt * slowmoPlatMult2;
          if (p.x <= p.moveMinX) { p.x = p.moveMinX; p.moveVX = Math.abs(p.moveVX); }
          if (p.x >= p.moveMaxX) { p.x = p.moveMaxX; p.moveVX = -Math.abs(p.moveVX); }
        }
      }

      // Verificação de Vitória Horizontal (chegou no fim do percurso)
      if (this.ball.x - 80 >= this.targetDistance) {
        this.finishGame('completed', {});
        return;
      }

      // Queda no buraco (bola saiu pela parte inferior)
      if (this.ball.y > this.height + 40) {
        soundEngine.playLoseLife();
        this.particles.emit(this.ball.x, this.height, 20, { color: '#3b82f6', size: 5, speed: 3.5, life: 0.7 });
        this.triggerCameraShake(10, 250);
        this.triggerHaptic([50, 30, 50]);

        if (this.lives > 1) {
          this.lives--;
          if (this.onLivesUpdate) this.onLivesUpdate(this.lives);
          // Respawn na plataforma atrás mais próxima visível
          this.respawnPlayerHorizontal();
        } else {
          this.lives = 0;
          if (this.onLivesUpdate) this.onLivesUpdate(0);
          this.finishGame('game_over', {});
        }
      }

      // Limpeza de entidades que ficaram muito atrás da câmera
      const cleanupX = this.cameraX - 300;
      this.platforms = this.platforms.filter((p) => p.x + p.width > cleanupX);
      this.gems = this.gems.filter((g) => !g.collected && g.x > cleanupX);
      this.powerups = this.powerups.filter((pu) => !pu.collected && pu.x > cleanupX);
      this.hearts = this.hearts.filter((h) => !h.collected && h.x > cleanupX);

    } else {
      // Câmera vertical padrão
      const targetY = this.ball.y - this.height * 0.45;
      if (targetY < this.cameraY) {
        this.cameraY += (targetY - this.cameraY) * 0.12 * dt;
      }

      // 8. Geração Procedural Contínua de Novas Plataformas acima da câmera (Infinita no Modo Infinito e Boss Fight)
      const genAheadDistance = (this.isEndless || this.isBossFight) ? 650 : 400;
      while (this.highestPlatformY > this.cameraY - genAheadDistance) {
        this.highestPlatformY -= Math.floor(Math.random() * 28 + 52);
        this.generatePlatformAt(this.highestPlatformY);
      }

      // 8.5. Atualização da Lava Ascendente no Modo Infinito
      if (this.isEndless) {
        const heightProgress = Math.max(0, this.maxHeightReached);
        const speedScale = 1 + (heightProgress / 2200) * 0.75;
        const slowmoLavaMult = this.activePowerUps.slowmo > 0 ? 0.45 : 1.0;
        this.lavaY -= this.lavaSpeed * speedScale * slowmoLavaMult * dt;

        // Borbulhamento estocástico
        if (Math.random() < 0.25) {
          const spurX = Math.random() * this.width;
          this.particles.emitLavaSpurt(spurX, this.lavaY);
        }

        // Alerta de proximidade
        this.lavaWarning = (this.lavaY - this.ball.y) < 220;

        // Se a bola mergulhar na lava:
        if (this.ball.y + this.ball.radius >= this.lavaY) {
          this.takeDamage('lava');
          this.ball.vy = this.jumpForce * 1.35; // Salto de pânico para tentar escapar
          this.ball.stretchY = 1.45;
          this.triggerCameraShake(10, 240);
          this.triggerHaptic([60, 40, 60]);
          this.particles.emitLavaSpurt(this.ball.x, this.lavaY);
        }
      }

      // 9. Limpeza de Entidades Fora da Tela
      this.platforms = this.platforms.filter((p) => p.y < this.cameraY + this.height + 150);
      this.gems = this.gems.filter((g) => !g.collected && g.y < this.cameraY + this.height + 150);
      this.magicBackpacks = this.magicBackpacks.filter((mb) => !mb.collected && mb.y < this.cameraY + this.height + 150);
      this.backpackFuelCans = this.backpackFuelCans.filter((fc) => !fc.collected && fc.y < this.cameraY + this.height + 150);
      this.powerups = this.powerups.filter((pu) => !pu.collected && pu.y < this.cameraY + this.height + 150);
      this.hearts = this.hearts.filter((h) => !h.collected && h.y < this.cameraY + this.height + 150);

      // 11. Verificação de Vitória (Chegou na meta de altura ou cruzou a linha de chegada)
      if (!this.isEndless) {
        if (this.isBossFight) {
          // Na Boss Fight, a vitória ocorre ao zerar o HP do Chefão (tratado em updateBoss/handleBossDefeat)
        } else {
          const goalY = -this.stage.targetHeight + (this.height - 120);
          if (this.maxHeightReached >= this.stage.targetHeight || this.ball.y <= goalY + this.ball.radius) {
            if (this.mode === 'race_pvp' && this.onPvPFinish) {
              this.onPvPFinish('win');
            }
            this.finishGame('completed', { raceWinner: 'player', opponentName: this.opponentBall?.username });
            return;
          }
        }
      }

      // 12. Verificação de Queda / Sistema de 3 Vidas
      if (this.ball.y > this.cameraY + this.height + 60) {
        // Perda imediata da Mochila Mágica se o jogador cair
        if (this.ball.hasMagicBackpack) {
          this.ball.hasMagicBackpack = false;
          this.ball.backpackFuel = 0;
          this.ball.stretchX = 1.0;
          this.ball.stretchY = 1.0;
          this.particles.emitBackpackSmoke(this.ball.x, this.ball.y);
        }
        if (this.lives > 1) {
          // Registra o marcador holográfico no local exato onde a bola caiu
          const deathNumber = (this.maxLives - this.lives) + 1;
          this.deathMarkers.push({
            x: Math.max(30, Math.min(this.width - 30, this.ball.x)),
            y: this.cameraY + this.height - 25,
            deathNumber
          });

          // Decrementa 1 vida
          this.lives--;
          if (this.onLivesUpdate) {
            this.onLivesUpdate(this.lives);
          }

          // SFX de perda de vida e partículas vermelhas
          soundEngine.playLoseLife();
          this.particles.emit(this.ball.x, this.cameraY + this.height - 30, 24, {
            color: '#ef4444',
            size: 4.5,
            speed: 4,
            life: 0.8
          });

          // Respawn seguro com escudo
          this.respawnPlayer();
        } else {
          // 3ª morte: Game Over definitivo
          const deathNumber = this.maxLives;
          this.deathMarkers.push({
            x: Math.max(30, Math.min(this.width - 30, this.ball.x)),
            y: this.cameraY + this.height - 25,
            deathNumber
          });
          this.lives = 0;
          if (this.onLivesUpdate) {
            this.onLivesUpdate(0);
          }
          if (this.mode === 'race_pvp' && this.onPvPFinish) {
            this.onPvPFinish('lose');
          }
          this.finishGame('game_over', { raceWinner: this.mode === 'race_pvp' ? 'opponent' : 'bot', opponentName: this.opponentBall?.username });
        }
      }
    } // fim do bloco vertical

    // 10. Atualizar Partículas (sempre, independente do modo)
    this.particles.update(dt);
  }

  // Respawn horizontal: reposiciona a bola na última plataforma visível atrás dela
  respawnPlayerHorizontal() {
    // Procura a plataforma visível mais próxima à esquerda da câmera
    const candidates = this.platforms.filter((p) => {
      if (p.broken) return false;
      const screenX = p.x - this.cameraX;
      return screenX > 30 && screenX < this.width - 30;
    });
    candidates.sort((a, b) => b.x - a.x); // mais à direita primeiro (mais próxima do jogador)

    let spawnX = this.cameraX + this.width * 0.3;
    let spawnY = this.height - 200;

    if (candidates.length > 0) {
      const plat = candidates[0];
      spawnX = plat.x + plat.width / 2;
      spawnY = plat.y - this.ball.radius - 2;
    }

    this.ball.x = spawnX;
    this.ball.y = spawnY;
    this.ball.vx = 0;
    this.ball.vy = this.jumpForce * 0.7;
    this.ball.stretchX = 0.7;
    this.ball.stretchY = 1.3;
    this.ball.hasMagicBackpack = false;
    this.ball.backpackFuel = 0;
    this.boostCharge = this.maxBoostCharge;
    this.hasPendingBoostUpdate = true;
    this.invulnerableTimer = 2.5;

    soundEngine.playRespawn();
    this.particles.emitSuperJumpBurst(this.ball.x, this.ball.y, '#38bdf8');
  }

  // Lógica da Inteligência Artificial do Bot na Corrida
  updateBot(dt) {
    if (!this.botBall) return;
    const bot = this.botBall;

    // Timer do escudo de respawn do bot
    if (bot.invulnerableTimer > 0) {
      bot.invulnerableTimer = Math.max(0, bot.invulnerableTimer - dt * 0.0166);
    }

    bot.decisionTimer = (bot.decisionTimer || 0) + dt;

    // Tomada de decisão: encontra plataforma ideal a cada ciclo de decisão
    if (bot.decisionTimer > 6 || !bot.targetPlatform || bot.targetPlatform.broken) {
      bot.decisionTimer = 0;

      // Plataformas alcançáveis (entre 30px abaixo e 220px acima)
      const reachable = this.platforms.filter((p) => {
        if (p.broken) return false;
        const dy = bot.y - p.y;
        return dy > -30 && dy < 230;
      });

      if (reachable.length > 0) {
        if (this.aiDifficulty === 'hard') {
          // Prioriza molas ou a plataforma mais alta
          reachable.sort((a, b) => {
            if (a.type === 'spring' && b.type !== 'spring') return -1;
            if (b.type === 'spring' && a.type !== 'spring') return 1;
            return a.y - b.y;
          });
          bot.targetPlatform = reachable[0];
        } else if (this.aiDifficulty === 'easy') {
          // Chance de hesitar ou pegar plataforma lateral
          if (Math.random() < 0.35) {
            bot.targetPlatform = reachable[Math.floor(Math.random() * reachable.length)];
          } else {
            reachable.sort((a, b) => Math.hypot(a.x + a.width / 2 - bot.x, a.y - bot.y) - Math.hypot(b.x + b.width / 2 - bot.x, b.y - bot.y));
            bot.targetPlatform = reachable[0];
          }
        } else {
          // 'medium': equilíbrio inteligente entre proximidade e ascensão
          reachable.sort((a, b) => {
            const scoreA = a.y + Math.abs(a.x + a.width / 2 - bot.x) * 0.35;
            const scoreB = b.y + Math.abs(b.x + b.width / 2 - bot.x) * 0.35;
            return scoreA - scoreB;
          });
          bot.targetPlatform = reachable[0];
        }
      }
    }

    // Direcionamento horizontal em direção à plataforma alvo
    const targetX = bot.targetPlatform 
      ? (bot.targetPlatform.x + bot.targetPlatform.width * 0.5)
      : (this.width * 0.5);

    const dx = targetX - bot.x;
    let botInput = 0;
    if (dx > 6) botInput = 1;
    else if (dx < -6) botInput = -1;
    else botInput = dx / 6;

    let botAccel = 0.75 * (this.stage.speedFactor || 1);
    let botMaxSpeed = 6.2;
    if (this.aiDifficulty === 'easy') {
      botAccel = 0.55 * (this.stage.speedFactor || 1);
      botMaxSpeed = 4.8;
    } else if (this.aiDifficulty === 'hard') {
      botAccel = 0.95 * (this.stage.speedFactor || 1);
      botMaxSpeed = 8.2;
    }

    bot.vx += botInput * botAccel * dt;
    bot.vx += (this.wind * 0.4) * dt;
    bot.vx *= Math.pow(this.friction, dt);
    bot.vx = Math.max(-botMaxSpeed, Math.min(botMaxSpeed, bot.vx));

    bot.x += bot.vx * dt;
    bot.angle += (bot.vx * 0.05) * dt;

    // Tratamento de Paredes Laterais para o Bot
    this.handleLateralWallCollisions(bot, dt, false);

    // Física Vertical
    bot.vy += this.gravity * dt;
    bot.y += bot.vy * dt;

    bot.stretchX += (1 - bot.stretchX) * 0.12 * dt;
    bot.stretchY += (1 - bot.stretchY) * 0.12 * dt;

    // Partículas de rastro do Bot
    if (Math.abs(bot.vy) > 2) {
      this.particles.emitTrail(bot.x, bot.y, bot.skin.trail);
    }

    // Atualizar recorde de altura alcançada pelo Bot
    const botCurrentHeight = Math.max(0, Math.floor(-bot.y + this.height - 120));
    if (botCurrentHeight > bot.maxHeightReached) {
      bot.maxHeightReached = botCurrentHeight;
    }

    // Colisão do Bot com plataformas (vy > 0)
    if (bot.vy > 0) {
      for (const p of this.platforms) {
        if (p.broken) continue;

        const isCollidingX = bot.x + bot.radius * 0.7 > p.x &&
                             bot.x - bot.radius * 0.7 < p.x + p.width;

        const wasAbove = (bot.y - bot.vy * dt) <= p.y + 4;
        const isNowAtOrBelow = bot.y + bot.radius >= p.y &&
                               bot.y + bot.radius <= p.y + p.height + 12;

        if (isCollidingX && wasAbove && isNowAtOrBelow) {
          if (p.hasSpikes) {
            if (bot.invulnerableTimer <= 0) {
              bot.lives = Math.max(1, bot.lives - 1);
              bot.invulnerableTimer = 2.0;
              this.particles.emit(bot.x, bot.y, 16, { color: '#ef4444', size: 4, speed: 3.5, life: 0.7 });
              soundEngine.playHazardHit();
            }
            bot.vy = this.jumpForce * 0.75;
            break;
          }

          bot.y = p.y - bot.radius;

          if (p.type === 'spring') {
            bot.vy = this.jumpForce * 1.65;
            bot.stretchX = 0.6;
            bot.stretchY = 1.6;
            soundEngine.playSpring();
            this.particles.emitSuperJumpBurst(bot.x, p.y, '#c084fc');
          } else if (p.type === 'fragile') {
            bot.vy = this.jumpForce;
            p.broken = true;
            soundEngine.playCrumble();
            this.particles.emitPlatformCrumble(p.x, p.y, p.width, p.height, '#ef4444');
          } else {
            bot.vy = this.jumpForce;
            bot.stretchX = 1.35;
            bot.stretchY = 0.7;
            this.particles.emitJumpBurst(bot.x, p.y, '#a855f7');
            if (p.type === 'conveyor') {
              bot.vx += p.vx * 1.8;
            }
          }
          break;
        }
      }
    }

    // Verificação de queda do Bot: respawna para manter a corrida ativa até o topo!
    if (bot.y > this.cameraY + this.height + 60) {
      bot.lives = Math.max(1, bot.lives - 1);
      this.particles.emit(bot.x, this.cameraY + this.height - 30, 18, {
        color: '#a855f7',
        size: 4,
        speed: 3.5,
        life: 0.7
      });
      this.respawnBot();
    }

    // Verificação de Vitória do Bot na corrida (somente quando cruzar a meta de altura!)
    const goalY = -this.stage.targetHeight + (this.height - 120);
    if (bot.maxHeightReached >= this.stage.targetHeight || bot.y <= goalY + bot.radius) {
      this.finishGame('race_bot_won', { raceWinner: 'bot', raceReason: 'bot_reached_goal' });
      return;
    }
  }

  // Atualização remota da posição e física do oponente humano no Duelo 1v1
  updateRemoteOpponent(data) {
    if (!this.opponentBall || !data) return;
    if (data.x !== undefined) this.opponentBall.targetX = data.x;
    if (data.y !== undefined) this.opponentBall.targetY = data.y;
    if (data.vx !== undefined) this.opponentBall.vx = data.vx;
    if (data.vy !== undefined) this.opponentBall.vy = data.vy;
    if (data.stretchX !== undefined) this.opponentBall.stretchX = data.stretchX;
    if (data.stretchY !== undefined) this.opponentBall.stretchY = data.stretchY;
    if (data.angle !== undefined) this.opponentBall.angle = data.angle;
    if (data.lives !== undefined) this.opponentBall.lives = data.lives;
    if (data.maxHeightReached !== undefined) {
      this.opponentBall.maxHeightReached = Math.max(this.opponentBall.maxHeightReached, data.maxHeightReached);
    }
    if (data.invulnerableTimer !== undefined) {
      this.opponentBall.invulnerableTimer = data.invulnerableTimer;
    }
    if (data.finished) {
      this.finishGame('race_bot_won', { raceWinner: 'opponent', raceReason: 'opponent_reached_goal', opponentName: this.opponentBall.username });
    }
  }

  // Respawn do Bot em plataforma segura visível
  respawnBot() {
    if (!this.botBall) return;
    const visiblePlatforms = this.platforms.filter((p) => {
      if (p.broken) return false;
      const screenY = p.y - this.cameraY;
      return screenY >= 140 && screenY <= this.height - 90;
    });

    let targetPlat = null;
    if (visiblePlatforms.length > 0) {
      visiblePlatforms.sort((a, b) => b.y - a.y);
      targetPlat = visiblePlatforms[0];
    } else {
      // Se não houver plataforma segura no campo de visão, cria uma plataforma segura
      const safePlat = {
        x: Math.max(30, Math.min(this.width - 130, this.width / 2 - 50)),
        y: this.cameraY + this.height - 130,
        width: 100,
        height: 16,
        type: 'standard',
        vx: 0,
        broken: false,
        opacity: 1,
        hasSpikes: false
      };
      this.platforms.push(safePlat);
      targetPlat = safePlat;
    }

    this.botBall.x = targetPlat.x + targetPlat.width / 2;
    this.botBall.y = targetPlat.y - this.botBall.radius - 2;
    this.botBall.vx = 0;
    this.botBall.vy = this.jumpForce * 1.12;
    this.botBall.invulnerableTimer = 2.5;
    this.botBall.targetPlatform = null;
  }

  respawnPlayer() {
    // Procura a plataforma mais baixa visível na tela que não esteja quebrada
    const visiblePlatforms = this.platforms.filter((p) => {
      if (p.broken) return false;
      const screenY = p.y - this.cameraY;
      return screenY >= 80 && screenY <= this.height - 80;
    });

    let targetPlat = null;
    if (visiblePlatforms.length > 0) {
      visiblePlatforms.sort((a, b) => b.y - a.y);
      targetPlat = visiblePlatforms[0];
    } else {
      // Se não houver plataforma segura no campo de visão, cria uma plataforma de segurança
      const safePlat = {
        x: this.width / 2 - 55,
        y: this.cameraY + this.height - 140,
        width: 110,
        height: 16,
        type: 'standard',
        vx: 0
      };
      this.platforms.push(safePlat);
      targetPlat = safePlat;
    }

    // Reposiciona a bola com precisão
    this.ball.x = targetPlat.x + targetPlat.width / 2;
    this.ball.y = targetPlat.y - this.ball.radius - 2;
    this.ball.vx = 0;
    this.ball.vy = this.jumpForce * 1.08;
    this.ball.stretchX = 1.35;
    this.ball.stretchY = 0.65;
    this.ball.hasMagicBackpack = false;
    this.ball.backpackFuel = 0;
    this.boostCharge = this.maxBoostCharge;
    this.hasPendingBoostUpdate = true;

    // Concede 2.5s de escudo de energia
    this.invulnerableTimer = 2.5;

    soundEngine.playRespawn();
    this.particles.emitSuperJumpBurst(this.ball.x, this.ball.y, '#38bdf8');
  }

  takeDamage(source = 'hazard') {
    if (this.invulnerableTimer > 0 || this.lives <= 0 || this.finished) return;

    // Se o escudo de bolha estiver ativo, absorve o dano completamente!
    if (this.activePowerUps.shield) {
      this.activePowerUps.shield = false;
      this.invulnerableTimer = 1.2;
      soundEngine.playShieldBreak();
      this.particles.emitShieldBreak(this.ball.x, this.ball.y);
      this.triggerHaptic(45);
      this.triggerCameraShake(8, 220);
      return;
    }

    // Se o jogador estiver com a mochila mágica, perde a mochila imediatamente!
    if (this.ball.hasMagicBackpack) {
      this.ball.hasMagicBackpack = false;
      this.ball.backpackFuel = 0;
      this.ball.stretchX = 1.0;
      this.ball.stretchY = 1.0;
      soundEngine.playJetpackExhausted();
      this.particles.emitBackpackSmoke(this.ball.x, this.ball.y);
    }

    // Perde 1 vida
    this.lives--;
    if (this.onLivesUpdate) {
      this.onLivesUpdate(this.lives);
    }

    this.triggerHaptic([60, 40, 60]);
    this.triggerCameraShake(10, 250);

    // SFX de dano e partículas de impacto
    soundEngine.playHazardHit();
    this.particles.emit(this.ball.x, this.ball.y, 22, {
      color: '#ef4444',
      size: 4.5,
      speed: 4.5,
      life: 0.8
    });

    if (this.lives <= 0) {
      const deathNumber = this.maxLives;
      this.deathMarkers.push({
        x: Math.max(30, Math.min(this.width - 30, this.ball.x)),
        y: this.ball.y,
        deathNumber
      });
      this.finishGame('game_over', { reason: 'lives_depleted', raceWinner: 'bot' });
    } else {
      this.invulnerableTimer = 2.0;
      this.ball.vy = Math.min(this.ball.vy, this.jumpForce * 0.75);
    }
  }

  updateEnvironmentalHazards(dt) {
    const theme = this.stage.theme || 'default';

    // 1. Spawning de Perigos Ambientais em Queda
    this.hazardSpawnTimer = (this.hazardSpawnTimer || 0) + dt;
    const spawnInterval = Math.max(160, 240 - (this.stage.number || 1) * 2);
    if (this.hazardSpawnTimer >= spawnInterval) {
      this.hazardSpawnTimer = 0;
      this.spawnEnvironmentalHazard(theme);
    }

    // 2. Movimentação e Colisão dos Perigos em Queda
    for (let i = this.environmentalHazards.length - 1; i >= 0; i--) {
      const h = this.environmentalHazards[i];
      h.x += h.vx * dt;
      h.y += h.vy * dt;
      h.angle += h.vRot * dt;

      if (h.x < -20) h.x = this.width + 20;
      else if (h.x > this.width + 20) h.x = -20;

      // Colisão com o Jogador
      const dist = Math.hypot(this.ball.x - h.x, this.ball.y - h.y);
      if (dist < this.ball.radius + h.radius) {
        this.particles.emitDebrisImpact(h.x, h.y, h.color);
        this.takeDamage(h.type);
        this.environmentalHazards.splice(i, 1);
        continue;
      }

      // Colisão com Bot IA no Modo Corrida
      if (this.botBall && this.botBall.invulnerableTimer <= 0) {
        const distBot = Math.hypot(this.botBall.x - h.x, this.botBall.y - h.y);
        if (distBot < this.botBall.radius + h.radius) {
          this.botBall.lives = Math.max(1, this.botBall.lives - 1);
          this.botBall.invulnerableTimer = 2.0;
          this.particles.emitDebrisImpact(h.x, h.y, h.color);
          this.environmentalHazards.splice(i, 1);
          continue;
        }
      }

      // Limpeza se cair muito abaixo da tela
      if (h.y > this.cameraY + this.height + 100) {
        this.environmentalHazards.splice(i, 1);
        continue;
      }
      // Limpeza no modo horizontal: remove se ficou muito atrás da câmera
      if (this.isHorizontal && h.x < this.cameraX - 200) {
        this.environmentalHazards.splice(i, 1);
      }
    }

    // 3. Trovões no Cânion Trovejante e Fases de Tempestade
    if (theme === 'storm' || theme === 'canyon') {
      this.lightningTimer = (this.lightningTimer || 0) + dt;
      if (!this.activeLightning && this.lightningTimer > 260) {
        this.lightningTimer = 0;
        const targetX = Math.random() * (this.width - 80) + 40;
        this.activeLightning = {
          state: 'telegraph',
          x: targetX,
          timer: 45
        };
        soundEngine.playHazardWarning();
      }

      if (this.activeLightning) {
        this.activeLightning.timer -= dt;
        if (this.activeLightning.state === 'telegraph' && this.activeLightning.timer <= 0) {
          this.activeLightning.state = 'strike';
          this.activeLightning.timer = 14;
          soundEngine.playThunderStrike();
          this.particles.emitLightningBurst(this.activeLightning.x, this.cameraY + this.height * 0.5);

          // Checar se o jogador foi atingido pelo raio
          const screenBallY = this.ball.y - this.cameraY;
          if (Math.abs(this.ball.x - this.activeLightning.x) < 28 && screenBallY > 0 && screenBallY < this.height) {
            this.takeDamage('lightning');
          }

          // Checar se o Bot foi atingido
          if (this.botBall && this.botBall.invulnerableTimer <= 0) {
            const screenBotY = this.botBall.y - this.cameraY;
            if (Math.abs(this.botBall.x - this.activeLightning.x) < 28 && screenBotY > 0 && screenBotY < this.height) {
              this.botBall.lives = Math.max(1, this.botBall.lives - 1);
              this.botBall.invulnerableTimer = 2.0;
              this.particles.emitLightningBurst(this.botBall.x, this.botBall.y);
            }
          }
        } else if (this.activeLightning.state === 'strike' && this.activeLightning.timer <= 0) {
          this.activeLightning = null;
        }
      }
    }
  }

  spawnEnvironmentalHazard(theme) {
    let type = 'cosmic_shard';
    let color = this.stage.platformColor || '#0ea5e9';
    let radius = 13;
    let vy = Math.random() * 1.5 + 3.2;

    switch (theme) {
      case 'forest':
      case 'autumn':
      case 'spring_season':
      case 'wood':
        type = 'branch';
        color = '#854d0e';
        radius = 14;
        break;

      case 'desert':
      case 'dune_storm':
      case 'pyramids':
        type = 'sandstone_shard';
        color = '#d97706';
        radius = 14;
        vy = Math.random() * 1.8 + 3.4;
        break;

      case 'ice':
      case 'arctic':
      case 'winter':
        type = 'icicle';
        color = '#38bdf8';
        radius = 12;
        vy = Math.random() * 2.0 + 4.2;
        break;

      case 'volcano':
      case 'obsidian':
      case 'dragon':
        type = 'magma_rock';
        color = '#ea580c';
        radius = 15;
        vy = Math.random() * 1.8 + 3.6;
        break;

      case 'storm':
      case 'canyon':
        type = 'thunder_shard';
        color = '#0284c7';
        radius = 13;
        vy = Math.random() * 2.0 + 4.0;
        break;

      case 'crystal':
      case 'magic_cube':
      case 'candy':
        type = 'crystal_shard';
        color = '#ec4899';
        radius = 13;
        vy = Math.random() * 1.6 + 3.3;
        break;

      case 'cosmos':
      case 'asteroid':
      case 'singularity':
      case 'quantum':
      case 'solar':
        type = 'meteorite';
        color = '#475569';
        radius = 15;
        vy = Math.random() * 2.2 + 3.8;
        break;

      case 'waterfall':
        // Obstáculo temático da fase de cachoeiras: Peixes saltitantes descendo a cascata!
        type = 'falling_fish';
        color = '#fb923c';
        radius = 14;
        vy = Math.random() * 1.6 + 2.9;
        break;

      case 'ocean':
      case 'rain':
      case 'ship':
      case 'underwater':
        type = Math.random() < 0.5 ? 'jellyfish' : 'water_drop';
        color = '#06b6d4';
        radius = 13;
        vy = Math.random() * 1.2 + 2.8;
        break;

      case 'cyberpunk':
      case 'computer':
      case 'internet':
      case 'arcade':
      case 'metropolis':
        type = 'cyber_chip';
        color = '#00f0ff';
        radius = 13;
        vy = Math.random() * 1.8 + 3.5;
        break;

      case 'indigenous':
      case 'ruins':
      case 'olympus':
        type = 'tribal_spear';
        color = '#15803d';
        radius = 14;
        vy = Math.random() * 1.6 + 3.6;
        break;

      case 'heroes':
      case 'geometry':
        type = 'energy_shuriken';
        color = '#6366f1';
        radius = 13;
        vy = Math.random() * 2.0 + 4.0;
        break;

      case 'iron':
      case 'steampunk':
        type = 'gear';
        color = '#b45309';
        radius = 13;
        vy = Math.random() * 1.8 + 3.8;
        break;

      case 'aurora':
      case 'sky':
        type = 'aurora_prism';
        color = '#2dd4bf';
        radius = 12;
        vy = Math.random() * 1.4 + 3.0;
        break;

      case 'carnival':
      case 'music':
        type = 'circus_star';
        color = '#f43f5e';
        radius = 13;
        vy = Math.random() * 1.6 + 3.4;
        break;

      case 'soccer':
        type = 'spiked_ball';
        color = '#e2e8f0';
        radius = 14;
        vy = Math.random() * 1.8 + 3.6;
        break;

      case 'rock':
        type = 'rock';
        color = '#78716c';
        radius = 14;
        vy = Math.random() * 1.8 + 3.5;
        break;

      default:
        type = 'cosmic_shard';
        color = this.stage.platformColor || '#0ea5e9';
        radius = 13;
        vy = Math.random() * 1.5 + 3.2;
        break;
    }

    this.environmentalHazards.push({
      // No modo horizontal: spawna em coordenadas de MUNDO para alinhar com ball.x
      x: this.isHorizontal
        ? this.cameraX + Math.random() * (this.width - 60) + 30
        : Math.random() * (this.width - 60) + 30,
      y: this.isHorizontal
        ? Math.random() * -80 - 20           // spawna aleatoriamente acima da tela
        : this.cameraY - 40,
      vx: (Math.random() - 0.5) * 1.2,
      vy: vy,
      radius: radius,
      angle: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.08,
      type: type,
      color: color,
      theme: theme
    });
  }

  drawEnvironmentalHazards(ctx) {
    for (const h of this.environmentalHazards) {
      // No modo horizontal: converter coords de mundo para tela
      const screenX = this.isHorizontal ? h.x - this.cameraX : h.x;
      const screenY = h.y - this.cameraY;
      if (screenY < -40 || screenY > this.height + 40) continue;
      if (screenX < -40 || screenX > this.width + 40) continue;

      ctx.save();
      ctx.translate(screenX, screenY);
      ctx.rotate(h.angle);

      if (h.type === 'branch') {
        // 1. Galho de árvore com folhas (Florestas e Madeiras)
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(-14, 0);
        ctx.quadraticCurveTo(0, 4, 14, -2);
        ctx.stroke();

        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-2, 2);
        ctx.lineTo(6, 9);
        ctx.stroke();

        ctx.fillStyle = h.theme === 'autumn' ? '#ea580c' : '#22c55e';
        ctx.beginPath();
        ctx.ellipse(8, 10, 5, 3, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-10, -4, 4, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'sandstone_shard') {
        // 2. Fragmento de Arenito Ancestral com Hieróglifo (Desertos e Pirâmides)
        ctx.fillStyle = '#b45309';
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(13, 8);
        ctx.lineTo(-13, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Hieróglifo dourado entalhado
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, -8);
        ctx.lineTo(0, 4);
        ctx.moveTo(-4, -4);
        ctx.lineTo(4, -4);
        ctx.stroke();
      } else if (h.type === 'icicle') {
        // 3. Estalactite de Gelo Cristalina Afiada (Gelo e Ártico)
        const iceGrad = ctx.createLinearGradient(0, -14, 0, 14);
        iceGrad.addColorStop(0, '#ffffff');
        iceGrad.addColorStop(0.4, '#bae6fd');
        iceGrad.addColorStop(1, '#0284c7');
        ctx.fillStyle = iceGrad;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(-7, -13);
        ctx.lineTo(7, -13);
        ctx.lineTo(0, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Reflexo de faceta interna
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(0, 11);
        ctx.stroke();
      } else if (h.type === 'magma_rock') {
        // 4. Rocha de Basalto Incandescente com Veias de Magma (Vulcão e Dragão)
        ctx.fillStyle = '#1c1917';
        ctx.strokeStyle = '#ea580c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-13, -6);
        ctx.lineTo(-4, -14);
        ctx.lineTo(10, -9);
        ctx.lineTo(14, 5);
        ctx.lineTo(3, 14);
        ctx.lineTo(-9, 11);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Fissuras ardentes de lava pulsante
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-7, -3);
        ctx.lineTo(0, 2);
        ctx.lineTo(7, -1);
        ctx.lineTo(2, 8);
        ctx.stroke();

        ctx.fillStyle = '#f97316';
        ctx.beginPath();
        ctx.arc(0, 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'thunder_shard') {
        // 5. Rocha Eletrizada com Raios (Tempestade e Cânion)
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-9, -12);
        ctx.lineTo(11, -8);
        ctx.lineTo(13, 8);
        ctx.lineTo(-3, 13);
        ctx.lineTo(-12, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Raio de plasma elétrico central
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-4, -9);
        ctx.lineTo(2, -2);
        ctx.lineTo(-2, 2);
        ctx.lineTo(4, 9);
        ctx.stroke();
      } else if (h.type === 'crystal_shard') {
        // 6. Cristal Lapidado Mágico (Caverna de Cristais e Magia)
        ctx.fillStyle = '#ec4899';
        ctx.strokeStyle = '#fbcfe8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(11, -4);
        ctx.lineTo(7, 12);
        ctx.lineTo(-7, 12);
        ctx.lineTo(-11, -4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Facetas internas do cristal
        ctx.fillStyle = '#f472b6';
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(6, -4);
        ctx.lineTo(0, 4);
        ctx.lineTo(-6, -4);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'meteorite') {
        // 7. Meteorito Cósmico com Crateras (Cosmos, Asteroides e Quântico)
        ctx.fillStyle = '#334155';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-12, -8);
        ctx.lineTo(-3, -14);
        ctx.lineTo(9, -11);
        ctx.lineTo(14, 2);
        ctx.lineTo(8, 13);
        ctx.lineTo(-6, 12);
        ctx.lineTo(-13, 3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Crateras circulares sombreadas
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(-3, -4, 3.5, 0, Math.PI * 2);
        ctx.arc(5, 3, 2.5, 0, Math.PI * 2);
        ctx.arc(-4, 5, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      } else if (h.type === 'falling_fish') {
        // 7.8 Peixe Saltitante / Salmão da Cascata (Cachoeiras Ancestrais)
        const swimTime = Date.now() * 0.015 + (h.x * 0.1);
        const tailWag = Math.sin(swimTime) * 4.5;

        // Corpo aerodinâmico do peixe com gradiente salmão / carpa dourada
        const fishGrad = ctx.createLinearGradient(0, -16, 0, 14);
        fishGrad.addColorStop(0, '#f97316');
        fishGrad.addColorStop(0.5, '#fb923c');
        fishGrad.addColorStop(1, '#38bdf8');

        ctx.fillStyle = fishGrad;
        ctx.strokeStyle = '#fdba74';
        ctx.lineWidth = 1.3;

        ctx.beginPath();
        // Cabeça apontando para baixo
        ctx.moveTo(0, 14);
        ctx.quadraticCurveTo(8, 2, 7, -8);
        // Cauda
        ctx.lineTo(tailWag + 1, -15);
        ctx.lineTo(tailWag, -17);
        ctx.lineTo(tailWag - 1, -15);
        ctx.lineTo(-7, -8);
        ctx.quadraticCurveTo(-8, 2, 0, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Barbatana Caudal (rabo em leque ondulante)
        ctx.fillStyle = 'rgba(251, 146, 60, 0.9)';
        ctx.strokeStyle = '#fed7aa';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(tailWag, -16);
        ctx.lineTo(tailWag - 7, -23);
        ctx.quadraticCurveTo(tailWag, -19, tailWag + 7, -23);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Barbatanas Peitorais laterais
        ctx.fillStyle = 'rgba(56, 189, 248, 0.75)';
        ctx.beginPath();
        ctx.moveTo(-6, -1); ctx.lineTo(-12, -4); ctx.lineTo(-6, -7);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(6, -1); ctx.lineTo(12, -4); ctx.lineTo(6, -7);
        ctx.closePath();
        ctx.fill();

        // Olhos com reflexo de água doce
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-3, 8, 2.5, 0, Math.PI * 2);
        ctx.arc(3, 8, 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.arc(-3, 9, 1.3, 0, Math.PI * 2);
        ctx.arc(3, 9, 1.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(-3.5, 8.5, 0.6, 0, Math.PI * 2);
        ctx.arc(2.5, 8.5, 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Bolhas de splash da cachoeira
        ctx.fillStyle = 'rgba(224, 242, 254, 0.8)';
        ctx.beginPath();
        ctx.arc(tailWag * 0.5, -25, 1.5, 0, Math.PI * 2);
        ctx.arc(-4, -12, 1.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'water_drop') {
        // 8. Gota d'Água Aerodinâmica (Oceanos, Chuva e Cachoeiras)
        const dropGrad = ctx.createLinearGradient(0, -14, 0, 10);
        dropGrad.addColorStop(0, '#ffffff');
        dropGrad.addColorStop(0.3, '#38bdf8');
        dropGrad.addColorStop(1, '#0284c7');
        ctx.fillStyle = dropGrad;
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.quadraticCurveTo(11, 0, 8, 8);
        ctx.quadraticCurveTo(0, 14, -8, 8);
        ctx.quadraticCurveTo(-11, 0, 0, -14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(-3, 3, 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'jellyfish') {
        // 8.2 Água-Viva Bioluminescente (Oceano Profundo)
        ctx.fillStyle = 'rgba(232, 121, 249, 0.85)';
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, -4, 10, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-6, -4); ctx.quadraticCurveTo(-7, 4, -4, 10);
        ctx.moveTo(0, -4); ctx.quadraticCurveTo(2, 5, 0, 12);
        ctx.moveTo(6, -4); ctx.quadraticCurveTo(8, 4, 5, 10);
        ctx.stroke();
      } else if (h.type === 'cyber_chip') {
        // 9. Microchip Tecnológico Cyberpunk (Cyberpunk, Arcade, Internet e Computador)
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1.8;
        this.roundRect(ctx, -11, -11, 22, 22, 3);
        ctx.fill();
        ctx.stroke();

        // Pinos conectores laterais dourados
        ctx.fillStyle = '#facc15';
        ctx.fillRect(-13, -7, 2, 3);
        ctx.fillRect(-13, 4, 2, 3);
        ctx.fillRect(11, -7, 2, 3);
        ctx.fillRect(11, 4, 2, 3);

        // Circuito central neon
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-5, -5);
        ctx.lineTo(0, -5);
        ctx.lineTo(0, 0);
        ctx.lineTo(5, 5);
        ctx.stroke();

        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(4, -4, 1.8, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'tribal_spear') {
        // 10. Ponta de Lança Sagrada / Dardo Rúnico (Indígena e Ruínas)
        ctx.fillStyle = '#78716c';
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(8, -2);
        ctx.lineTo(3, 8);
        ctx.lineTo(-3, 8);
        ctx.lineTo(-8, -2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Tiras de amarração e pena cerimonial
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-3, 8);
        ctx.lineTo(3, 8);
        ctx.stroke();

        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.ellipse(0, 13, 3, 6, 0.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'energy_shuriken') {
        // 11. Shuriken de Energia de Herói (Heróis e Geometria)
        ctx.fillStyle = '#4f46e5';
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(4, -4);
        ctx.lineTo(14, 0);
        ctx.lineTo(4, 4);
        ctx.lineTo(0, 14);
        ctx.lineTo(-4, 4);
        ctx.lineTo(-14, 0);
        ctx.lineTo(-4, -4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'gear') {
        // 12. Engrenagem Mecânica Dentada (Ferro e Steampunk)
        ctx.fillStyle = '#b45309';
        ctx.strokeStyle = '#fed7aa';
        ctx.lineWidth = 1.4;

        // Dentes da engrenagem
        const teeth = 6;
        ctx.beginPath();
        for (let i = 0; i < teeth * 2; i++) {
          const r = i % 2 === 0 ? 13 : 9;
          const a = (i * Math.PI) / teeth;
          const gx = Math.cos(a) * r;
          const gy = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(gx, gy);
          else ctx.lineTo(gx, gy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Orifício central do eixo
        ctx.fillStyle = '#1c1917';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'aurora_prism') {
        // 13. Prisma de Aurora Boreal (Aurora e Céu)
        const prismGrad = ctx.createLinearGradient(-10, -10, 10, 10);
        prismGrad.addColorStop(0, '#2dd4bf');
        prismGrad.addColorStop(0.5, '#38bdf8');
        prismGrad.addColorStop(1, '#a855f7');
        ctx.fillStyle = prismGrad;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(11, 0);
        ctx.lineTo(0, 14);
        ctx.lineTo(-11, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (h.type === 'circus_star') {
        // 14. Estrela Mágica de Circo / Carnaval (Música e Carnaval)
        ctx.fillStyle = '#f43f5e';
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const aExt = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const aInt = aExt + Math.PI / 5;
          ctx.lineTo(Math.cos(aExt) * 13, Math.sin(aExt) * 13);
          ctx.lineTo(Math.cos(aInt) * 6, Math.sin(aInt) * 6);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (h.type === 'spiked_ball') {
        // 15. Bola de Ferro com Espinhos (Futebol e Desafio)
        ctx.fillStyle = '#475569';
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // 4 espinhos cônicos salientes
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI) / 2;
          ctx.save();
          ctx.rotate(a);
          ctx.beginPath();
          ctx.moveTo(-3, 7);
          ctx.lineTo(0, 14);
          ctx.lineTo(3, 7);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      } else if (h.type === 'rock') {
        // 16. Rocha / Pedregulho de Granito
        ctx.fillStyle = h.color;
        ctx.strokeStyle = '#292524';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(-12, -7);
        ctx.lineTo(-3, -14);
        ctx.lineTo(11, -8);
        ctx.lineTo(14, 6);
        ctx.lineTo(2, 13);
        ctx.lineTo(-10, 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        // 17. Fragmento Cósmico Multifacetado (Fallback Estilizado com Cores da Fase)
        ctx.fillStyle = h.color || this.stage.platformColor || '#0ea5e9';
        ctx.strokeStyle = this.stage.platformBorder || '#ffffff';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(0, -13);
        ctx.lineTo(12, -4);
        ctx.lineTo(8, 11);
        ctx.lineTo(-9, 10);
        ctx.lineTo(-12, -3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Faceta sombreada angular
        ctx.fillStyle = 'rgba(0, 0, 0, 0.28)';
        ctx.beginPath();
        ctx.moveTo(0, -13);
        ctx.lineTo(0, 4);
        ctx.lineTo(8, 11);
        ctx.lineTo(12, -4);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    // Desenhar Trovão / Relâmpago (Cânion Trovejante)
    if (this.activeLightning) {
      const lx = this.activeLightning.x;
      if (this.activeLightning.state === 'telegraph') {
        ctx.save();
        const pulse = (Math.sin(Date.now() * 0.02) + 1) * 0.5;
        ctx.strokeStyle = `rgba(234, 179, 8, ${0.4 + pulse * 0.5})`;
        ctx.lineWidth = 3 + pulse * 2;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx, this.height);
        ctx.stroke();

        ctx.fillStyle = '#eab308';
        ctx.shadowColor = '#eab308';
        ctx.shadowBlur = this.isMobile ? 0 : 12;
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('⚡', lx, 32);

        ctx.fillStyle = 'rgba(234, 179, 8, 0.9)';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText('ALERTA DE RAIO', lx, 46);
        ctx.restore();
      } else if (this.activeLightning.state === 'strike') {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = this.isMobile ? 0 : 25;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 6;
        ctx.beginPath();
        let currY = 0;
        let currX = lx;
        ctx.moveTo(currX, currY);
        while (currY < this.height) {
          currY += Math.random() * 35 + 25;
          currX += (Math.random() - 0.5) * 36;
          ctx.lineTo(currX, currY);
        }
        ctx.stroke();

        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 14;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  finishGame(status, details = {}) {
    if (this.finished) return;
    this.finished = true;
    this.running = false;
    soundEngine.stopBGM(0.3);
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    const duration = Math.floor((Date.now() - this.startTime) / 1000);
    const isRace = this.mode === 'race_ai' || this.mode === 'race_pvp';
    const isPvP = this.mode === 'race_pvp';
    const isPlayerWin = status === 'completed';

    const resultPayload = {
      score: isPlayerWin ? this.score + 1000 : this.score,
      maxHeight: this.maxHeightReached,
      duration,
      jumps: this.jumpsCount,
      gems: this.gemsCollected,
      portals: this.portalsCrossed || 0,
      status: status,
      isEndless: this.isEndless,
      stage: this.stage,
      isRace,
      isPvP,
      winner: isPlayerWin ? 'player' : (status === 'race_bot_won' ? (isPvP ? 'opponent' : 'bot') : (details.raceWinner || 'none')),
      botHeight: this.botBall ? this.botBall.maxHeightReached : (this.opponentBall ? this.opponentBall.maxHeightReached : 0),
      opponentName: this.opponentBall ? this.opponentBall.username : (details.opponentName || null),
      raceReason: details.raceReason || null
    };

    if (isPlayerWin) {
      soundEngine.playVictory();
      if (this.onVictory) {
        this.onVictory(resultPayload);
      }
    } else {
      soundEngine.playGameOver();
      if (this.onGameOver) {
        this.onGameOver(resultPayload);
      }
    }
  }

  render() {
    const ctx = this.ctx;

    ctx.save();
    // Camera Shake em impactos e perigos
    if (this.cameraShakeTimer > 0) {
      this.cameraShakeTimer--;
      const shakeX = (Math.random() - 0.5) * this.cameraShakeIntensity;
      const shakeY = (Math.random() - 0.5) * this.cameraShakeIntensity;
      ctx.translate(shakeX, shakeY);
    }

    // 1. Cenário de Fundo Temático com Parallax e Partículas Atmosféricas
    this.background.draw(ctx, this.cameraY);

    // Para modo horizontal: deslocamos o canvas pelo cameraX
    if (this.isHorizontal) {
      ctx.save();
      ctx.translate(-Math.round(this.cameraX), 0);
    }

    // 2. Desenhar Plataformas
    for (const p of this.platforms) {
      if (p.broken) continue;
      const screenY = p.y - this.cameraY;
      const screenX = this.isHorizontal ? p.x : p.x;
      if (!this.isHorizontal && (screenY < -30 || screenY > this.height + 30)) continue;
      if (this.isHorizontal) {
        const worldScreenX = p.x - this.cameraX;
        if (worldScreenX + p.width < -10 || worldScreenX > this.width + 10) continue;
      }

      ctx.save();
      if (p.type === 'spring') {
        // Plataforma com Mola
        ctx.fillStyle = '#eab308';
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        this.roundRect(ctx, p.x, screenY, p.width, p.height, 6);
        ctx.fill();
        ctx.stroke();

        // Mola desenhada no centro
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(p.x + p.width / 2 - 10, screenY - 7, 20, 7);
      } else if (p.type === 'fragile') {
        // Plataforma Frágil (rachada)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.75)';
        ctx.strokeStyle = '#fca5a5';
        ctx.lineWidth = 1.5;
        this.roundRect(ctx, p.x, screenY, p.width, p.height, 4);
        ctx.fill();
        ctx.stroke();

        // Racha visual
        ctx.strokeStyle = '#fee2e2';
        ctx.beginPath();
        ctx.moveTo(p.x + p.width * 0.3, screenY);
        ctx.lineTo(p.x + p.width * 0.5, screenY + p.height);
        ctx.lineTo(p.x + p.width * 0.7, screenY);
        ctx.stroke();
      } else if (p.type === 'conveyor') {
        // Esteira Cyberpunk
        ctx.fillStyle = '#06b6d4';
        ctx.strokeStyle = '#67e8f9';
        ctx.lineWidth = 2;
        this.roundRect(ctx, p.x, screenY, p.width, p.height, 5);
        ctx.fill();
        ctx.stroke();

        // Linhas indicadoras de movimento
        ctx.fillStyle = '#ffffff';
        const arrowDir = p.vx > 0 ? '>' : '<';
        ctx.font = '10px monospace';
        ctx.fillText(`${arrowDir} ${arrowDir} ${arrowDir}`, p.x + p.width * 0.2, screenY + 11);
      } else {
        // Plataforma Padrão ou Móvel
        const isMoving = p.type === 'moving';
        if (isMoving && this.isHorizontal) {
          // Plataforma móvel no modo horizontal: azul ciano para H, âmbar para V
          const isHMove = Boolean(p.moveVX);
          // Pulso de brilho animado
          const pulseBright = (Math.sin(Date.now() * 0.006 + p.x * 0.01) + 1) * 0.5;
          if (isHMove) {
            ctx.fillStyle = `hsl(199, 95%, ${20 + pulseBright * 12}%)`; // ciano escuro pulsante
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.7 + pulseBright * 0.3})`;
          } else {
            ctx.fillStyle = `hsl(37, 95%, ${18 + pulseBright * 10}%)`; // âmbar escuro pulsante
            ctx.strokeStyle = `rgba(251, 191, 36, ${0.7 + pulseBright * 0.3})`;
          }
        } else {
          ctx.fillStyle = this.stage.platformColor;
          ctx.strokeStyle = this.stage.platformBorder;
        }
        ctx.lineWidth = 2;
        this.roundRect(ctx, p.x, screenY, p.width, p.height, 6);
        ctx.fill();
        ctx.stroke();

        if (isMoving) {
          if (this.isHorizontal) {
            // Indicador de direção de alta legibilidade no modo horizontal
            ctx.save();
            const midX = p.x + p.width / 2;
            const midY = screenY + p.height / 2;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const arrowPulse = (Math.sin(Date.now() * 0.008 + p.x * 0.02) + 1) * 0.5;

            if (p.moveVX) {
              // Movimento Horizontal: setas ciano animadas
              const arrowAlpha = 0.6 + arrowPulse * 0.4;
              ctx.fillStyle = `rgba(255, 255, 255, ${arrowAlpha})`;
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = this.isMobile ? 0 : (6 + arrowPulse * 8);
              ctx.font = `bold ${10 + Math.round(arrowPulse * 2)}px sans-serif`;
              // Direção real da seta com base na velocidade
              const arrowText = p.moveVX > 0 ? '► ► ►' : '◄ ◄ ◄';
              ctx.fillText(arrowText, midX, midY);
              // Label de tipo
              ctx.shadowBlur = 0;
              ctx.font = 'bold 7px monospace';
              ctx.fillStyle = '#7dd3fc';
              ctx.fillText('H', midX, screenY - 5);
            } else {
              // Movimento Vertical: setas âmbar animadas
              const arrowAlpha = 0.6 + arrowPulse * 0.4;
              ctx.fillStyle = `rgba(255, 255, 255, ${arrowAlpha})`;
              ctx.shadowColor = '#fbbf24';
              ctx.shadowBlur = this.isMobile ? 0 : (6 + arrowPulse * 8);
              ctx.font = `bold ${10 + Math.round(arrowPulse * 2)}px sans-serif`;
              // Direção real da seta com base na velocidade
              const arrowText = p.moveVY > 0 ? '▼ ▼ ▼' : '▲ ▲ ▲';
              ctx.fillText(arrowText, midX, midY);
              // Label de tipo
              ctx.shadowBlur = 0;
              ctx.font = 'bold 7px monospace';
              ctx.fillStyle = '#fde68a';
              ctx.fillText('V', midX, screenY - 5);
            }

            // Esferas de luz nas pontas da plataforma (coloridas por tipo)
            ctx.shadowBlur = 0;
            ctx.fillStyle = p.moveVX ? '#38bdf8' : '#fbbf24';
            ctx.beginPath();
            ctx.arc(p.x + 5, midY, 3, 0, Math.PI * 2);
            ctx.arc(p.x + p.width - 5, midY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          } else {
            // Indicador de movimento nas pontas (modo vertical)
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(p.x + 8, screenY + p.height / 2, 2.5, 0, Math.PI * 2);
            ctx.arc(p.x + p.width - 8, screenY + p.height / 2, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Desenhar espinhos afiados sobre a plataforma
      if (p.hasSpikes) {
        const spikeCount = Math.max(3, Math.floor(p.width / 14));
        const spikeW = p.width / spikeCount;

        const isNature = ['forest', 'autumn', 'spring', 'wood'].includes(this.stage.theme);
        ctx.fillStyle = isNature ? '#15803d' : '#ef4444';
        ctx.strokeStyle = isNature ? '#86efac' : '#fee2e2';
        ctx.lineWidth = 1.2;

        for (let i = 0; i < spikeCount; i++) {
          const sx = p.x + i * spikeW;
          ctx.beginPath();
          ctx.moveTo(sx, screenY);
          ctx.lineTo(sx + spikeW / 2, screenY - 9);
          ctx.lineTo(sx + spikeW, screenY);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      }

      // Desenhar Bateria de Energia / Arma anti-Chefão acoplada à plataforma
      if (p.hasBossBattery) {
        const battX = p.x + p.width / 2;
        const battY = screenY;
        const isActive = p.batteryActive;

        // Suporte metálico da arma
        ctx.fillStyle = isActive ? '#0284c7' : '#1e293b';
        ctx.strokeStyle = isActive ? '#38bdf8' : '#475569';
        ctx.lineWidth = 1.6;
        this.roundRect(ctx, battX - 14, battY - 8, 28, 8, 3);
        ctx.fill();
        ctx.stroke();

        if (isActive) {
          // Arma Pronta: cano emissor e núcleo pulsante
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.arc(battX, battY - 9, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(battX, battY - 9, 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Indicador "PRONTA!"
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 8px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('PRONTA! ⚡', battX, battY - 14);
        } else {
          // Barra de progresso de recarga em tempo real
          const maxCD = p.maxBatteryCooldown || 3.0;
          const rechargeRatio = Math.max(0, Math.min(1, 1 - (p.batteryCooldown / maxCD)));

          ctx.shadowBlur = 0;
          ctx.fillStyle = '#0f172a';
          this.roundRect(ctx, battX - 12, battY - 7, 24, 6, 2);
          ctx.fill();

          ctx.fillStyle = '#0284c7';
          this.roundRect(ctx, battX - 12, battY - 7, 24 * rechargeRatio, 6, 2);
          ctx.fill();

          // Texto com contagem regressiva de recarga
          ctx.fillStyle = '#94a3b8';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`RECARGA ${(Math.max(0.1, p.batteryCooldown)).toFixed(1)}s`, battX, battY - 14);
        }
      }

      ctx.restore();
    }

    // 3. Desenhar Gemas / Moedas
    for (const g of this.gems) {
      if (g.collected) continue;
      const screenY = g.y - this.cameraY;
      if (screenY < -20 || screenY > this.height + 20) continue;

      ctx.save();
      const scale = 1 + Math.sin(g.pulse * 3) * 0.12;
      ctx.translate(g.x, screenY);
      ctx.scale(scale, scale);

      ctx.fillStyle = '#facc15';
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = this.isMobile ? 0 : 10;
      ctx.beginPath();
      ctx.arc(0, 0, g.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-2, -2, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3.2. Desenhar Mochilas Mágicas Colecionáveis Flutuantes
    for (const mb of this.magicBackpacks) {
      if (mb.collected) continue;
      const screenY = mb.y - this.cameraY;
      if (screenY < -30 || screenY > this.height + 30) continue;

      ctx.save();
      const floatOffset = Math.sin(mb.pulse * 3) * 5;
      ctx.translate(mb.x, screenY + floatOffset);

      // Glow pulsante dourado e ciano
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = this.isMobile ? 0 : 14;

      // Asas / Propulsores laterais estilizados
      ctx.fillStyle = '#0284c7';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      // Asa esquerda
      ctx.beginPath();
      ctx.moveTo(-8, -2);
      ctx.lineTo(-17, -8);
      ctx.lineTo(-13, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Asa direita
      ctx.beginPath();
      ctx.moveTo(8, -2);
      ctx.lineTo(17, -8);
      ctx.lineTo(13, 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Corpo principal da mochila mágica (dourado com contorno amarelo)
      const bagGrad = ctx.createLinearGradient(-10, -12, 10, 12);
      bagGrad.addColorStop(0, '#fbbf24');
      bagGrad.addColorStop(0.5, '#f59e0b');
      bagGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = bagGrad;
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.8;
      this.roundRect(ctx, -10, -12, 20, 24, 5);
      ctx.fill();
      ctx.stroke();

      // Núcleo central de energia cósmica
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, 2, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Bicos de propulsão inferiores
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-7, 12, 4, 4);
      ctx.fillRect(3, 12, 4, 4);

      // Mini chama decorativa
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-6, 16, 2, 3);
      ctx.fillRect(4, 16, 2, 3);

      // Ícone holográfico flutuando no topo
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎒', 0, -16);

      ctx.restore();
    }

    // 3.25. Desenhar Galões de Combustível da Mochila Mágica (Jetpack Plasma Fuel Canister)
    for (const fc of this.backpackFuelCans) {
      if (fc.collected) continue;
      const screenY = fc.y - this.cameraY;
      if (screenY < -30 || screenY > this.height + 30) continue;

      ctx.save();
      const floatOffset = Math.sin(fc.pulse * 3.5 + Date.now() * 0.005) * 4;
      ctx.translate(fc.x, screenY + floatOffset);

      // Glow pulsante de combustível de plasma (âmbar e ciano)
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = this.isMobile ? 0 : 12;

      // Corpo cilíndrico do galão de combustível metálico escuro
      const canGrad = ctx.createLinearGradient(-9, -12, 9, 12);
      canGrad.addColorStop(0, '#1e293b');
      canGrad.addColorStop(0.5, '#0f172a');
      canGrad.addColorStop(1, '#334155');
      ctx.fillStyle = canGrad;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.4;
      this.roundRect(ctx, -8, -10, 16, 20, 4);
      ctx.fill();
      ctx.stroke();

      // Bocal e Alça superior do galão
      ctx.fillStyle = '#64748b';
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.rect(-5, -14, 10, 4);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(3, -15, 3, 5);

      // Visor de vidro com Combustível de Plasma Fluorescente no centro
      const fuelLevelGrad = ctx.createLinearGradient(-5, 5, 5, -5);
      fuelLevelGrad.addColorStop(0, '#f59e0b');
      fuelLevelGrad.addColorStop(0.5, '#fbbf24');
      fuelLevelGrad.addColorStop(1, '#06b6d4');
      ctx.fillStyle = fuelLevelGrad;
      this.roundRect(ctx, -5, -6, 10, 12, 2);
      ctx.fill();

      // Linha medidora de nível fluorescente
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(-4, 0); ctx.lineTo(-1, 0);
      ctx.moveTo(-4, -3); ctx.lineTo(-2, -3);
      ctx.stroke();

      // Ícone holográfico de Combustível / Chama flutuando sobre o galão
      ctx.fillStyle = '#fef08a';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⛽', 0, -17);

      ctx.restore();
    }

    // 3.5. Desenhar Marcadores de Morte ("Onde Morreu")
    for (const marker of this.deathMarkers) {
      const screenY = marker.y - this.cameraY;
      if (screenY > -60 && screenY < this.height + 60) {
        ctx.save();
        ctx.translate(marker.x, screenY);

        const pulse = 1 + Math.sin(Date.now() * 0.006 + marker.deathNumber) * 0.08;
        ctx.scale(pulse, pulse);

        // Glow vermelho de perigo
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = this.isMobile ? 0 : 15;

        // Placa holográfica
        ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        this.roundRect(ctx, -24, -26, 48, 28, 6);
        ctx.fill();
        ctx.stroke();

        // Ícone de Caveira
        ctx.fillStyle = '#fee2e2';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💀', 0, -13);

        // Rótulo da morte
        ctx.fillStyle = '#f87171';
        ctx.font = 'bold 8px monospace';
        ctx.fillText(`Morte #${marker.deathNumber}`, 0, -2);

        // Feixe vertical apontando para a queda
        ctx.strokeStyle = '#ef4444';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(0, 3);
        ctx.lineTo(0, 20);
        ctx.stroke();

        ctx.restore();
      }
    }

    // 4. Desenhar Partículas
    this.particles.draw(ctx, this.cameraY);

    // 4.5. Desenhar Inimigos e Perigos Ambientais da Cena
    this.drawEnvironmentalHazards(ctx);

    // 4.7. Elementos do Modo Horizontal (Checkpoints, Perigos e Linha de Chegada)
    if (this.isHorizontal) {
      // 4.7.1. Marcadores de Metragem / Checkpoints a cada 500m
      // Posicionados no TOPO da tela (abaixo do HUD) para não interferir na jogabilidade
      for (let cp = 500; cp < this.targetDistance; cp += 500) {
        const cpX = 80 + cp;
        const cpScreenX = cpX - this.cameraX;
        if (cpScreenX < -60 || cpScreenX > this.width + 60) continue;

        ctx.save();
        // Linha guia vertical sutil (quase transparente, não obstrui a visão)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(cpX, 65);     // começa abaixo do HUD
        ctx.lineTo(cpX, this.height - 48); // vai até antes da zona de perigo
        ctx.stroke();
        ctx.setLineDash([]);

        // Bandeirinha minimalista no TOPO (logo abaixo do HUD, y=65 a 85px)
        const cpAlpha = 0.8;
        ctx.fillStyle = `rgba(15, 23, 42, ${cpAlpha})`;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1;
        this.roundRect(ctx, cpX - 24, 66, 48, 18, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#7dd3fc';
        ctx.font = 'bold 8px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`🚩 ${cp >= 1000 ? (cp / 1000).toFixed(0) + 'km' : cp + 'm'}`, cpX, 75);
        ctx.restore();
      }

      // 4.7.2. Zona de Perigo Inferior Visual (Mar na Nau ou Caldeiras na Fábrica)
      // Nota: estamos dentro do ctx.translate(-cameraX), então usamos coordenadas de MUNDO (+ cameraX)
      const hazardY = this.height - 42;
      const worldLeft = this.cameraX;
      const worldRight = this.cameraX + this.width + 20;
      ctx.save();
      const isShip = (this.stage.theme || '').includes('ship') || (this.stage.theme || '').includes('ocean');
      if (isShip) {
        // Piso do navio / convés
        ctx.fillStyle = 'rgba(15, 35, 55, 0.95)';
        ctx.fillRect(worldLeft, hazardY + 8, worldRight - worldLeft, 34);

        // Ondas marinhas com espuma brilhante
        const waveGrad = ctx.createLinearGradient(0, hazardY, 0, hazardY + 42);
        waveGrad.addColorStop(0, 'rgba(14, 165, 233, 0.45)');
        waveGrad.addColorStop(0.4, 'rgba(3, 105, 161, 0.75)');
        waveGrad.addColorStop(1, 'rgba(2, 48, 90, 0.95)');
        ctx.fillStyle = waveGrad;
        ctx.beginPath();
        const waveTime = Date.now() * 0.003;
        ctx.moveTo(worldLeft, hazardY + 42);
        for (let wx = worldLeft; wx <= worldRight; wx += 8) {
          const wy = hazardY + Math.sin(wx * 0.05 + waveTime) * 5 + Math.cos(wx * 0.03 + waveTime * 1.4) * 3;
          if (wx === worldLeft) ctx.lineTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.lineTo(worldRight, hazardY + 42);
        ctx.closePath();
        ctx.fill();

        // Linha de espuma brilhante no topo das ondas
        ctx.strokeStyle = 'rgba(125, 211, 252, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let wx = worldLeft; wx <= worldRight; wx += 8) {
          const wy = hazardY + Math.sin(wx * 0.05 + waveTime) * 5 + Math.cos(wx * 0.03 + waveTime * 1.4) * 3;
          if (wx === worldLeft) ctx.moveTo(wx, wy);
          else ctx.lineTo(wx, wy);
        }
        ctx.stroke();

        // Label de aviso
        ctx.fillStyle = 'rgba(56, 189, 248, 0.9)';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('🌊 MAR — ZONA DE PERIGO', worldLeft + 12, hazardY + 24);
      } else {
        // Piso metálico steampunk
        ctx.fillStyle = 'rgba(40, 25, 10, 0.95)';
        ctx.fillRect(worldLeft, hazardY + 8, worldRight - worldLeft, 34);

        // Vapores incandescentes
        const steamGrad = ctx.createLinearGradient(0, hazardY, 0, hazardY + 42);
        steamGrad.addColorStop(0, 'rgba(245, 158, 11, 0.35)');
        steamGrad.addColorStop(0.5, 'rgba(180, 83, 9, 0.65)');
        steamGrad.addColorStop(1, 'rgba(100, 40, 5, 0.9)');
        ctx.fillStyle = steamGrad;
        ctx.beginPath();
        const steamTime = Date.now() * 0.004;
        ctx.moveTo(worldLeft, hazardY + 42);
        for (let sx = worldLeft; sx <= worldRight; sx += 10) {
          const sy = hazardY + Math.sin(sx * 0.08 + steamTime) * 4;
          if (sx === worldLeft) ctx.lineTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.lineTo(worldRight, hazardY + 42);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = 'rgba(253, 224, 71, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let sx = worldLeft; sx <= worldRight; sx += 10) {
          const sy = hazardY + Math.sin(sx * 0.08 + steamTime) * 4;
          if (sx === worldLeft) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();

        ctx.fillStyle = 'rgba(253, 224, 71, 0.9)';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('🔥 CALDEIRAS — ZONA DE PERIGO', worldLeft + 12, hazardY + 24);
      }
      ctx.restore();

      // 4.7.3. Dica visual no início do percurso
      // Coordenadas de MUNDO (dentro de translate(-cameraX)): centro da tela = cameraX + width/2
      if (this.ball.x < 360) {
        ctx.save();
        const bob = Math.sin(Date.now() * 0.006) * 4;
        const tipCenterX = this.cameraX + this.width / 2; // centro da tela em coords mundo
        ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        this.roundRect(ctx, tipCenterX - 120, this.height - 240 + bob, 240, 44, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('🏃 CORRA PARA A DIREITA', tipCenterX, this.height - 232 + bob);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px sans-serif';
        ctx.fillText('⬅ esq / dir ➔ para mover  |  botão ⬆ para saltar', tipCenterX, this.height - 216 + bob);
        ctx.restore();
      }

      // 4.7.4. Linha de chegada horizontal (Pórtico iluminado)
      const finishWorldX = 80 + this.targetDistance;
      const finishScreenX = finishWorldX - this.cameraX;
      if (finishScreenX > -40 && finishScreenX < this.width + 40) {
        ctx.save();
        // Poste esquerdo
        ctx.fillStyle = '#facc15';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = this.isMobile ? 0 : 18;
        ctx.fillRect(finishWorldX - 5, this.height - 320, 10, 290);
        // Poste direito
        ctx.fillRect(finishWorldX + 35, this.height - 320, 10, 290);
        // Bandeira xadrez
        ctx.shadowBlur = 0;
        const squareSize = 14;
        for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 3; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? '#ffffff' : '#1e293b';
            ctx.fillRect(finishWorldX - 4 + col * squareSize, this.height - 316 + row * squareSize, squareSize, squareSize);
          }
        }
        // Banner de meta
        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 2.5;
        this.roundRect(ctx, finishWorldX - 60, this.height - 355, 160, 32, 10);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fde047';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🏁 LINHA DE CHEGADA', finishWorldX + 20, this.height - 334);
        ctx.restore();
      }

      // Restaura o translate horizontal antes de desenhar elementos fixos na tela
      ctx.restore();

      // 4.7.5. HUD Superior de Corrida Horizontal no Canvas (Alta legibilidade)
      ctx.save();
      const hudW = Math.min(this.width - 20, 320);
      const hudX = (this.width - hudW) / 2;
      const hudY = 10;
      const hudH = 52;

      // Fundo em vidro escuro com brilho temático
      const hudBg = ctx.createLinearGradient(hudX, hudY, hudX, hudY + hudH);
      hudBg.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      hudBg.addColorStop(1, 'rgba(7, 35, 55, 0.92)');
      ctx.fillStyle = hudBg;
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 1.5;
      this.roundRect(ctx, hudX, hudY, hudW, hudH, 14);
      ctx.fill();
      ctx.stroke();

      // Linha decorativa superior brilhante
      const lineGrad = ctx.createLinearGradient(hudX, 0, hudX + hudW, 0);
      lineGrad.addColorStop(0, 'rgba(56,189,248,0)');
      lineGrad.addColorStop(0.3, 'rgba(56,189,248,0.8)');
      lineGrad.addColorStop(0.7, 'rgba(168,85,247,0.8)');
      lineGrad.addColorStop(1, 'rgba(250,204,21,0)');
      ctx.fillStyle = lineGrad;
      ctx.fillRect(hudX + 14, hudY + 1.5, hudW - 28, 1.5);

      const distPct = Math.min(1, Math.max(0, this.maxHeightReached / this.targetDistance));
      const distM = this.maxHeightReached;
      const distKm = distM >= 1000 ? (distM / 1000).toFixed(2) + 'km' : distM + 'm';
      const goalKm = this.targetDistance >= 1000 ? (this.targetDistance / 1000).toFixed(0) + 'km' : this.targetDistance + 'm';
      const pctText = `${Math.round(distPct * 100)}%`;

      // Ícone e distância percorrida (esquerda)
      ctx.fillStyle = '#e2e8f0';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`🏃 ${distKm}`, hudX + 12, hudY + 16);

      // Percentual central em destaque
      ctx.fillStyle = distPct >= 1 ? '#4ade80' : distPct >= 0.75 ? '#facc15' : '#38bdf8';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = this.isMobile ? 0 : 8;
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(pctText, hudX + hudW / 2, hudY + 16);
      ctx.shadowBlur = 0;

      // Meta e vidas (direita)
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`Meta: ${goalKm}`, hudX + hudW - 12, hudY + 16);

      // Ícones de vidas (abaixo do percentual)
      const livesStartX = hudX + hudW / 2 - (this.maxLives * 16) / 2;
      for (let lv = 0; lv < this.maxLives; lv++) {
        const lx = livesStartX + lv * 18;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = lv < this.lives ? 1.0 : 0.25;
        ctx.fillText('❤️', lx, hudY + 36);
      }
      ctx.globalAlpha = 1.0;

      // Barra de progresso interna (base)
      const barInnerW = hudW - 24;
      const barY = hudY + hudH - 11;
      const barH = 6;
      ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
      this.roundRect(ctx, hudX + 12, barY, barInnerW, barH, 3);
      ctx.fill();

      // Barra de progresso preenchida com gradiente
      const progGrad = ctx.createLinearGradient(hudX + 12, 0, hudX + 12 + barInnerW, 0);
      progGrad.addColorStop(0, '#38bdf8');
      progGrad.addColorStop(0.5, '#a855f7');
      progGrad.addColorStop(1, '#facc15');
      ctx.fillStyle = progGrad;
      const barFill = Math.max(6, barInnerW * distPct);
      this.roundRect(ctx, hudX + 12, barY, barFill, barH, 3);
      ctx.fill();

      // Marcadores de checkpoint na barra (a cada 25%)
      for (let cp = 0.25; cp < 1; cp += 0.25) {
        const cpBarX = hudX + 12 + barInnerW * cp;
        ctx.fillStyle = distPct >= cp ? '#ffffff' : 'rgba(148,163,184,0.5)';
        ctx.beginPath();
        ctx.arc(cpBarX, barY + barH / 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ponto brilhante na posição atual
      if (distPct > 0.01 && distPct < 0.99) {
        const dotX = hudX + 12 + barInnerW * distPct;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = this.isMobile ? 0 : 6;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(dotX, barY + barH / 2, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    }

    // 4.8. Desenhar Paredes Laterais e Portais Temáticos (somente no modo vertical)
    if (!this.isHorizontal) {
      this.drawLateralWalls(ctx);
    }

    // 5. Desenhar a Bola do Jogador
    const ballScreenY = this.ball.y - this.cameraY;
    const ballScreenX = this.isHorizontal ? this.ball.x - this.cameraX : this.ball.x;

    // Se a bola estiver com a Mochila Mágica equipada, desenhar a mochila acoplada com asas e chamas
    if (this.ball.hasMagicBackpack) {
      ctx.save();
      ctx.translate(ballScreenX, ballScreenY);


      // Glow da mochila
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = this.isMobile ? 0 : 12;

      // Asas do jetpack
      ctx.fillStyle = '#0284c7';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      // Asa esquerda
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(-24, -8);
      ctx.lineTo(-16, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Asa direita
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(24, -8);
      ctx.lineTo(16, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Corpo da mochila
      const bagGrad = ctx.createLinearGradient(-13, -12, 13, 14);
      bagGrad.addColorStop(0, '#fbbf24');
      bagGrad.addColorStop(0.5, '#f59e0b');
      bagGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = bagGrad;
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.8;
      this.roundRect(ctx, -13, -12, 26, 25, 5);
      ctx.fill();
      ctx.stroke();

      // Bicos propulsores inferiores
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-10, 13, 6, 5);
      ctx.fillRect(4, 13, 6, 5);

      // Chamas vivas saindo dos bocais propulsores
      const flameLen = 8 + Math.random() * 8;
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(-10, 18);
      ctx.lineTo(-7, 18 + flameLen);
      ctx.lineTo(-4, 18);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(4, 18);
      ctx.lineTo(7, 18 + flameLen);
      ctx.lineTo(10, 18);
      ctx.fill();

      ctx.restore();
    }

    ctx.save();
    ctx.translate(ballScreenX, ballScreenY);
    ctx.rotate(this.ball.angle);
    ctx.scale(this.ball.stretchX, this.ball.stretchY);

    // Renderização vetorial hiper-personalizada da Skin ativa com detalhes do herói/tema
    drawBallSkin(ctx, this.skin?.id || 'neon-cyan', 0, 0, this.ball.radius, {
      shadow: !this.isMobile,
      shadowBlur: 18,
      angle: 0,
      stretchX: 1,
      stretchY: 1
    });

    // Anel / Halo Dinâmico de Carga de Impulso ao redor da bola
    if (this.boostCharge > 0) {
      ctx.save();
      const chargeRatio = this.boostCharge / this.maxBoostCharge;
      const ringR = this.ball.radius + 3.5;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';

      if (chargeRatio >= 0.98) {
        // Carga 100%: Halo pulsante dourado/neon
        const pulse = 1 + Math.sin(Date.now() * 0.009) * 0.07;
        ctx.strokeStyle = '#f59e0b';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = this.isMobile ? 0 : 8;
        ctx.beginPath();
        ctx.arc(0, 0, ringR * pulse, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Recarregando: arco proporcional desenhado em sentido horário
        const startAng = -Math.PI / 2;
        const endAng = startAng + (Math.PI * 2 * chargeRatio);
        ctx.strokeStyle = chargeRatio > 0.4 ? '#38bdf8' : '#94a3b8';
        ctx.beginPath();
        ctx.arc(0, 0, ringR, startAng, endAng);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Escudo de Energia Protetor pós-respawn
    if (this.invulnerableTimer > 0) {
      ctx.save();
      const shieldPulse = 1 + Math.sin(Date.now() * 0.012) * 0.08;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = this.isMobile ? 0 : 18;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, (this.ball.radius + 7) * shieldPulse, 0, Math.PI * 2);
      ctx.stroke();

      // Anel rotativo pontilhado
      ctx.rotate(Date.now() * 0.003);
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, (this.ball.radius + 12) * shieldPulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Escudo de Bolha Ativo (Power-Up Coletável)
    if (this.activePowerUps.shield) {
      ctx.save();
      const bubblePulse = 1 + Math.sin(Date.now() * 0.008) * 0.05;
      const shieldR = (this.ball.radius + 9) * bubblePulse;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = this.isMobile ? 0 : 16;
      ctx.fillStyle = 'rgba(6, 182, 212, 0.24)';
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(0, 0, shieldR, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Reflexo vítreo curvo na bolha
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.beginPath();
      ctx.ellipse(-shieldR * 0.35, -shieldR * 0.35, shieldR * 0.28, shieldR * 0.14, -0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();

    // 5.2. Medidor de Combustível da Mochila Mágica (HUD e Barra sobre a bola)
    if (this.ball.hasMagicBackpack && this.ball.backpackFuel > 0) {
      const fuelPct = Math.max(0, Math.min(100, Math.round((this.ball.backpackFuel / this.ball.backpackMaxFuel) * 100)));

      // 1. Barra Flutuando Logo Acima da Bola
      ctx.save();
      ctx.translate(ballScreenX, ballScreenY - this.ball.radius - 22);

      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.strokeStyle = fuelPct < 25 ? '#ef4444' : '#f59e0b';
      ctx.lineWidth = 1.4;
      this.roundRect(ctx, -38, -12, 76, 16, 5);
      ctx.fill();
      ctx.stroke();

      // Preenchimento do combustível
      const barW = Math.max(0, (fuelPct / 100) * 44);
      const fuelGrad = ctx.createLinearGradient(-16, 0, 28, 0);
      if (fuelPct < 25) {
        fuelGrad.addColorStop(0, '#ef4444');
        fuelGrad.addColorStop(1, '#f87171');
      } else {
        fuelGrad.addColorStop(0, '#f59e0b');
        fuelGrad.addColorStop(0.5, '#fbbf24');
        fuelGrad.addColorStop(1, '#38bdf8');
      }
      ctx.fillStyle = fuelGrad;
      this.roundRect(ctx, -16, -9, barW, 10, 3);
      ctx.fill();

      // Ícone e Porcentagem
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('🎒', -34, -1);
      ctx.textAlign = 'right';
      ctx.fillText(`${fuelPct}%`, 33, -1);
      ctx.restore();

      // 2. Banner Holográfico no Topo da Tela
      ctx.save();
      ctx.translate(this.width / 2, 54);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
      ctx.strokeStyle = fuelPct < 25 ? '#ef4444' : '#0ea5e9';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = fuelPct < 25 ? '#ef4444' : '#38bdf8';
      ctx.shadowBlur = this.isMobile ? 0 : 10;
      this.roundRect(ctx, -95, -13, 190, 26, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = fuelPct < 25 ? '#fca5a5' : '#7dd3fc';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const warningText = fuelPct < 25 ? '⚠️ COMBUSTÍVEL BAIXO' : '🚀 MOCHILA MÁGICA ATIVA';
      ctx.fillText(`${warningText} (${fuelPct}%)`, 0, 0);
      ctx.restore();
    }

    // 5.5 Desenhar a Bola do Bot IA e Indicador de Corrida (Modo Corrida)
    if (this.botBall && this.botBall.lives > 0) {
      const botScreenY = this.botBall.y - this.cameraY;

      // Se o Bot estiver no campo visível da tela
      if (botScreenY > -40 && botScreenY < this.height + 40) {
        ctx.save();
        ctx.translate(this.botBall.x, botScreenY);
        ctx.rotate(this.botBall.angle);
        ctx.scale(this.botBall.stretchX, this.botBall.stretchY);

        // Renderização vetorial temática da esfera do Bot IA (Cyber Shinobi)
        drawBallSkin(ctx, 'cyber-shinobi', 0, 0, this.botBall.radius, {
          shadow: !this.isMobile,
          shadowBlur: 16,
          angle: 0,
          stretchX: 1,
          stretchY: 1
        });

        ctx.restore();

        // Placa "🤖 BOT IA" flutuando acima da esfera
        ctx.save();
        ctx.translate(this.botBall.x, botScreenY - this.botBall.radius - 12);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1;
        this.roundRect(ctx, -26, -10, 52, 16, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#f3e8ff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🤖 BOT IA', 0, -2);
        ctx.restore();
      } else {
        // Indicador Off-screen do Bot (mostra se o Bot está na frente ou atrás do jogador)
        ctx.save();
        const clampedX = Math.max(42, Math.min(this.width - 42, this.botBall.x));
        if (botScreenY <= -40) {
          // Bot está ACIMA da visão do jogador!
          ctx.translate(clampedX, 24);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.95)';
          ctx.shadowColor = '#c084fc';
          ctx.shadowBlur = this.isMobile ? 0 : 12;
          this.roundRect(ctx, -42, -12, 84, 24, 6);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const distAbove = Math.round((this.cameraY - this.botBall.y) / 10);
          ctx.fillText(`▲ BOT +${distAbove}m`, 0, 0);
        } else if (botScreenY >= this.height + 40) {
          // Bot está ABAIXO da visão do jogador!
          ctx.translate(clampedX, this.height - 24);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.95)';
          ctx.shadowColor = '#c084fc';
          ctx.shadowBlur = this.isMobile ? 0 : 12;
          this.roundRect(ctx, -42, -12, 84, 24, 6);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const distBelow = Math.round((this.botBall.y - (this.cameraY + this.height)) / 10);
          ctx.fillText(`▼ BOT -${distBelow}m`, 0, 0);
        }
        ctx.restore();
      }
    }

    // 5.6 Desenhar a Bola do Oponente Humano (Modo Duelo 1v1 PvP)
    if (this.opponentBall && this.opponentBall.lives > 0) {
      const oppScreenY = this.opponentBall.y - this.cameraY;

      if (oppScreenY > -40 && oppScreenY < this.height + 40) {
        ctx.save();
        ctx.translate(this.opponentBall.x, oppScreenY);
        ctx.rotate(this.opponentBall.angle);
        ctx.scale(this.opponentBall.stretchX, this.opponentBall.stretchY);

        // Renderização vetorial temática da esfera do adversário humano
        drawBallSkin(ctx, this.opponentBall.skin?.id || 'neon-cyan', 0, 0, this.opponentBall.radius, {
          shadow: !this.isMobile,
          shadowBlur: 16,
          angle: 0,
          stretchX: 1,
          stretchY: 1
        });

        ctx.restore();

        // Placa flutuante com o nome real do oponente
        ctx.save();
        ctx.translate(this.opponentBall.x, oppScreenY - this.opponentBall.radius - 13);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.strokeStyle = this.opponentBall.skin.glow;
        ctx.lineWidth = 1;
        const nameText = `⚔️ @${this.opponentBall.username}`;
        ctx.font = 'bold 9px sans-serif';
        const textWidth = ctx.measureText(nameText).width;
        this.roundRect(ctx, -(textWidth / 2 + 8), -10, textWidth + 16, 17, 4);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fecdd3';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(nameText, 0, -1);
        ctx.restore();
      } else {
        // Indicador Off-screen do Oponente
        ctx.save();
        const clampedX = Math.max(48, Math.min(this.width - 48, this.opponentBall.x));
        if (oppScreenY <= -40) {
          ctx.translate(clampedX, 24);
          ctx.fillStyle = 'rgba(225, 29, 72, 0.95)';
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = this.isMobile ? 0 : 12;
          this.roundRect(ctx, -52, -12, 104, 24, 6);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const distAbove = Math.round((this.cameraY - this.opponentBall.y) / 10);
          ctx.fillText(`▲ @${this.opponentBall.username} +${distAbove}m`, 0, 0);
        } else if (oppScreenY >= this.height + 40) {
          ctx.translate(clampedX, this.height - 24);
          ctx.fillStyle = 'rgba(225, 29, 72, 0.95)';
          ctx.shadowColor = '#f43f5e';
          ctx.shadowBlur = this.isMobile ? 0 : 12;
          this.roundRect(ctx, -52, -12, 104, 24, 6);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const distBelow = Math.round((this.opponentBall.y - (this.cameraY + this.height)) / 10);
          ctx.fillText(`▼ @${this.opponentBall.username} -${distBelow}m`, 0, 0);
        }
        ctx.restore();
      }
    }

    // 6. Meta de Altura / Linha de Chegada (Ocultada no Modo Infinito, Boss Fight e Horizontal)
    const goalY = -this.stage.targetHeight + (this.height - 120);
    const goalScreenY = goalY - this.cameraY;
    if (!this.isEndless && !this.isBossFight && !this.isHorizontal && goalScreenY > -60 && goalScreenY < this.height + 60) {
      ctx.save();

      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = this.isMobile ? 0 : 14;

      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 4;
      ctx.setLineDash([12, 8]);
      ctx.beginPath();
      ctx.moveTo(0, goalScreenY);
      ctx.lineTo(this.width, goalScreenY);
      ctx.stroke();

      // Placa de Chegada
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      this.roundRect(ctx, 12, goalScreenY - 26, 180, 22, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('🏆 LINHA DE CHEGADA', 22, goalScreenY - 11);
      ctx.restore();
    }

    // 6.5. Desenhar Power-Ups Coletáveis
    this.drawPowerUps(ctx, this.cameraX);

    // 6.6. Desenhar Corações Coletáveis (Fase 38+ e Modo Infinito)
    this.drawHearts(ctx, this.cameraX);

    // 6.8. Desenhar Magma / Lava Subindo no Modo Infinito
    this.drawLava(ctx);

    // 6.9. HUD de Power-Ups Ativos
    this.drawPowerUpsHUD(ctx);

    // 6.95. Batalha de Chefão: Efeitos, Projéteis, Universo Paralelo e Barra de Vida
    if (this.isBossFight) {
      this.drawBossBattle(ctx);
      this.drawBossHPBar(ctx);
    }

    ctx.restore(); // Fecha o ctx.save() do Camera Shake
  }

  // Desenha os Power-Ups coletáveis flutuando nas plataformas
  drawPowerUps(ctx, cameraX = 0) {
    for (const pu of this.powerups) {
      if (pu.collected) continue;
      const screenY = pu.y - this.cameraY;
      const screenX = pu.x - cameraX;
      if (screenY < -30 || screenY > this.height + 30) continue;
      if (screenX < -40 || screenX > this.width + 40) continue;

      ctx.save();
      const floatOffset = Math.sin(pu.pulse * 3) * 4;
      ctx.translate(screenX, screenY + floatOffset);

      let pColor = '#38bdf8';
      let pIcon = '🧲';
      if (pu.type === 'magnet') {
        pColor = '#ec4899';
        pIcon = '🧲';
      } else if (pu.type === 'shield') {
        pColor = '#06b6d4';
        pIcon = '🛡️';
      } else if (pu.type === 'slowmo') {
        pColor = '#a855f7';
        pIcon = '⏳';
      } else if (pu.type === 'spring_boost') {
        pColor = '#eab308';
        pIcon = '⚡';
      }

      ctx.shadowColor = pColor;
      ctx.shadowBlur = this.isMobile ? 0 : 12;

      // Orbe brilhante
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.strokeStyle = pColor;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 0, pu.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ícone do Power-Up
      ctx.font = '13px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(pIcon, 0, 1);

      ctx.restore();
    }
  }

  // Desenha os Corações Coletáveis Flutuantes (Recuperação de Vida)
  drawHearts(ctx, cameraX = 0) {
    for (const heart of this.hearts) {
      if (heart.collected) continue;
      const screenY = heart.y - this.cameraY;
      const screenX = heart.x - cameraX;
      if (screenY < -40 || screenY > this.height + 40) continue;
      if (screenX < -50 || screenX > this.width + 50) continue;

      ctx.save();
      const floatOffset = Math.sin(heart.pulse * 3.5) * 5;
      const heartbeat = 1 + Math.sin(heart.pulse * 6) * 0.14;
      ctx.translate(screenX, screenY + floatOffset);
      ctx.scale(heartbeat, heartbeat);

      // Glow pulsante rosa neon
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = this.isMobile ? 0 : 16;

      // Aura / Orbe translúcida suave ao redor do coração
      ctx.fillStyle = 'rgba(244, 63, 94, 0.16)';
      ctx.beginPath();
      ctx.arc(0, 0, heart.radius + 3, 0, Math.PI * 2);
      ctx.fill();

      // Desenhar formato do coração estilizado com gradiente de alta fidelidade
      const s = 11;
      const heartGrad = ctx.createLinearGradient(0, -s, 0, s);
      heartGrad.addColorStop(0, '#fb7185');
      heartGrad.addColorStop(0.5, '#f43f5e');
      heartGrad.addColorStop(1, '#be123c');

      ctx.fillStyle = heartGrad;
      ctx.strokeStyle = '#ffe4e6';
      ctx.lineWidth = 1.6;

      ctx.beginPath();
      // Inicia no entalhe central superior
      ctx.moveTo(0, -s * 0.2);
      // Lobo esquerdo
      ctx.bezierCurveTo(-s * 0.55, -s * 1.1, -s * 1.3, -s * 0.2, 0, s * 1.05);
      // Lobo direito
      ctx.bezierCurveTo(s * 1.3, -s * 0.2, s * 0.55, -s * 1.1, 0, -s * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Reflexo brilhante de luz no lobo superior esquerdo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.arc(-s * 0.45, -s * 0.45, s * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // Rótulo discreto holográfico "+1 ❤️"
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#fecdd3';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('+1 ❤️', 0, -s - 4);

      ctx.restore();
    }
  }

  // Desenha o Magma / Lava Ascendente no Modo Infinito
  drawLava(ctx) {
    if (!this.isEndless) return;
    const screenLavaY = this.lavaY - this.cameraY;
    if (screenLavaY > this.height + 150) return;

    ctx.save();
    // Gradiente térmico da lava
    const lavaGrad = ctx.createLinearGradient(0, screenLavaY, 0, screenLavaY + 280);
    lavaGrad.addColorStop(0, '#ffedd5');
    lavaGrad.addColorStop(0.1, '#f97316');
    lavaGrad.addColorStop(0.35, '#dc2626');
    lavaGrad.addColorStop(1, '#450a0a');
    ctx.fillStyle = lavaGrad;

    // Superfície ondulante da lava
    ctx.beginPath();
    ctx.moveTo(0, screenLavaY);
    const waveStep = 20;
    const time = Date.now() * 0.0035;
    for (let x = 0; x <= this.width; x += waveStep) {
      const wave = Math.sin(time + x * 0.04) * 6 + Math.cos(time * 1.4 + x * 0.02) * 3;
      ctx.lineTo(x, screenLavaY + wave);
    }
    ctx.lineTo(this.width, this.height + 300);
    ctx.lineTo(0, this.height + 300);
    ctx.closePath();
    ctx.fill();

    // Borda superior incandescente
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = this.isMobile ? 0 : 18;
    ctx.beginPath();
    ctx.moveTo(0, screenLavaY);
    for (let x = 0; x <= this.width; x += waveStep) {
      const wave = Math.sin(time + x * 0.04) * 6 + Math.cos(time * 1.4 + x * 0.02) * 3;
      ctx.lineTo(x, screenLavaY + wave);
    }
    ctx.stroke();

    // Alerta piscante caso a lava esteja perigosamente próxima
    if (this.lavaWarning) {
      const warnPulse = (Math.sin(Date.now() * 0.012) + 1) * 0.5;
      ctx.fillStyle = `rgba(239, 68, 68, ${0.12 + warnPulse * 0.18})`;
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.fillStyle = '#fef08a';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🔥 O MAGMA ESTÁ SUBINDO! SUBA RÁPIDO! 🔥', this.width / 2, Math.min(this.height - 30, screenLavaY - 20));
    }
    ctx.restore();
  }

  // Desenha os indicadores dos Power-Ups ativos em formato de pílulas holográficas
  drawPowerUpsHUD(ctx) {
    const active = [];
    if (this.activePowerUps.magnet > 0) {
      active.push({ icon: '🧲', text: `${this.activePowerUps.magnet.toFixed(1)}s`, color: '#ec4899', border: '#f472b6' });
    }
    if (this.activePowerUps.shield) {
      active.push({ icon: '🛡️', text: 'ESCUDO', color: '#06b6d4', border: '#22d3ee' });
    }
    if (this.activePowerUps.slowmo > 0) {
      active.push({ icon: '⏳', text: `${this.activePowerUps.slowmo.toFixed(1)}s`, color: '#a855f7', border: '#c084fc' });
    }
    if (this.activePowerUps.springBoost > 0) {
      active.push({ icon: '⚡', text: `${this.activePowerUps.springBoost}x PULO`, color: '#eab308', border: '#fde047' });
    }

    if (active.length === 0) return;

    ctx.save();
    let startY = 82;
    for (const item of active) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
      ctx.strokeStyle = item.border;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = item.color;
      ctx.shadowBlur = this.isMobile ? 0 : 8;

      this.roundRect(ctx, 16, startY, 94, 22, 6);
      ctx.fill();
      ctx.stroke();

      ctx.font = 'bold 10px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${item.icon} ${item.text}`, 24, startY + 11);

      startY += 26;
    }
    ctx.restore();
  }

  // ==========================================
  // SISTEMA DE CHEFÃO (BOSS FIGHT)
  // ==========================================

  updateBoss(dt) {
    if (!this.boss || this.boss.hp <= 0 || this.finished) return;

    // 1. Movimento flutuante lateral do Chefão no topo da tela
    this.boss.floatAngle += dt * 0.035;
    this.boss.x = (this.width / 2) + Math.sin(this.boss.floatAngle) * (this.width * 0.32);

    if (this.boss.hitFlash > 0) {
      this.boss.hitFlash--;
    }

    // 2. Ataque do Universo Paralelo (Fase 40 / Fase 50)
    if (this.boss.hasParallelUniverseAttack && !this.boss.parallelTriggered && this.boss.hp <= Math.ceil(this.boss.maxHp / 2)) {
      this.boss.parallelTriggered = true;
      this.boss.isParallelUniverse = true;
      this.boss.parallelTimer = 9.0;
      this.gravity = this.stage.gravity * 0.55; // Redução gravitacional quântica
      this.quantumCrystal = {
        x: Math.max(60, Math.min(this.width - 60, this.width / 2 + (Math.random() - 0.5) * (this.width * 0.5))),
        y: this.cameraY + 240,
        radius: 14,
        pulse: 0,
        collected: false
      };
      this.triggerCameraShake(12, 320);
      soundEngine.playPortalTravel();
    }

    // 3. Gerenciamento do Universo Paralelo Ativo
    if (this.boss.isParallelUniverse) {
      this.boss.parallelTimer -= dt * 0.0166;
      if (this.quantumCrystal && !this.quantumCrystal.collected) {
        this.quantumCrystal.pulse += dt * 0.08;

        // Colisão da bola com o Cristal Quântico de Estabilização
        const distToCrystal = Math.hypot(this.ball.x - this.quantumCrystal.x, this.ball.y - this.quantumCrystal.y);
        if (distToCrystal < this.ball.radius + this.quantumCrystal.radius) {
          this.quantumCrystal.collected = true;
          this.boss.isParallelUniverse = false;
          this.gravity = this.stage.gravity; // Restaura gravidade original
          this.boss.hp = Math.max(0, this.boss.hp - 2); // Dano massivo no Boss!
          this.boss.hitFlash = 20;
          this.triggerCameraShake(15, 350);
          soundEngine.playVictory();
          this.particles.emitSuperJumpBurst(this.quantumCrystal.x, this.quantumCrystal.y, '#c084fc');
          this.particles.emit(this.quantumCrystal.x, this.quantumCrystal.y, 30, {
            color: '#a855f7',
            size: 5,
            speed: 5,
            life: 1.0
          });

          if (this.boss.hp <= 0) {
            this.handleBossDefeat();
            return;
          }
        }
      }

      if (this.boss.parallelTimer <= 0) {
        this.boss.isParallelUniverse = false;
        this.gravity = this.stage.gravity;
      }
    }

    // 4. Ataques periódicos com orbes de energia disparados para baixo
    this.boss.attackTimer -= dt * 0.0166;
    if (this.boss.attackTimer <= 0) {
      this.boss.attackTimer = Math.random() * 1.5 + 1.8;
      const targetSpeedY = 3.6;
      const dirX = (this.ball.x - this.boss.x) * 0.008;
      this.boss.projectiles.push({
        x: this.boss.x,
        y: this.cameraY + this.boss.y + 24,
        vx: Math.max(-2, Math.min(2, dirX)),
        vy: targetSpeedY,
        radius: 8,
        color: this.boss.glow
      });
      soundEngine.playHazardHit();
    }

    // 5. Atualizar projéteis do Chefão
    for (let i = this.boss.projectiles.length - 1; i >= 0; i--) {
      const proj = this.boss.projectiles[i];
      proj.x += proj.vx * dt;
      proj.y += proj.vy * dt;

      // Colisão com a bola do jogador
      const dist = Math.hypot(proj.x - this.ball.x, proj.y - this.ball.y);
      if (dist < this.ball.radius + proj.radius) {
        this.takeDamage('boss_attack');
        this.boss.projectiles.splice(i, 1);
        continue;
      }

      // Remover se passou do rodapé da tela
      if (proj.y > this.cameraY + this.height + 40) {
        this.boss.projectiles.splice(i, 1);
      }
    }

    // 6. Atualizar Mísseis disparados pelo Jogador
    const bossWorldY = this.cameraY + this.boss.y;
    for (let i = this.playerMissiles.length - 1; i >= 0; i--) {
      const m = this.playerMissiles[i];
      m.x += m.vx * dt;
      m.y += m.vy * dt;

      // Rastro de partículas do míssil
      if (Math.random() < 0.4) {
        this.particles.emit(m.x, m.y, 1, {
          color: m.color,
          size: 2.5,
          speed: 1,
          life: 0.25
        });
      }

      // Colisão do míssil com o Chefão
      const hitDist = Math.hypot(m.x - this.boss.x, m.y - bossWorldY);
      if (hitDist < this.boss.radius + m.radius) {
        this.playerMissiles.splice(i, 1);
        this.boss.hp = Math.max(0, this.boss.hp - 1);
        this.boss.hitFlash = 12;
        this.triggerCameraShake(7, 180);
        soundEngine.playHazardHit();
        this.particles.emitJumpBurst(this.boss.x, bossWorldY, this.boss.glow);

        if (this.boss.hp <= 0) {
          this.handleBossDefeat();
          return;
        }
        continue;
      }

      // Remover míssil se subiu muito acima da câmera ou se ficou para trás
      if (m.y < this.cameraY - 120 || m.y > this.cameraY + this.height + 250) {
        this.playerMissiles.splice(i, 1);
      }
    }
  }

  handleBossDefeat() {
    if (this.bossDefeatedHandled) return;
    this.bossDefeatedHandled = true;
    const bossWorldY = this.cameraY + this.boss.y;

    // Explosão massiva de partículas e sfx
    this.particles.emit(this.boss.x, bossWorldY, 45, {
      color: this.boss.glow,
      size: 6,
      speed: 6,
      life: 1.4
    });
    this.particles.emitSuperJumpBurst(this.boss.x, bossWorldY, '#facc15');
    this.triggerCameraShake(18, 450);

    // Recompensa de gemas bônus
    if (this.stage.rewardGems) {
      this.gemsCollected += this.stage.rewardGems;
    }

    setTimeout(() => {
      this.finishGame('completed', { bossDefeated: true, bossName: this.boss.name });
    }, 400);
  }

  drawBossBattle(ctx) {
    if (!this.isBossFight || !this.boss) return;

    // 1. Efeito Cósmico de Universo Paralelo
    if (this.boss.isParallelUniverse) {
      ctx.save();
      ctx.fillStyle = 'rgba(24, 7, 44, 0.42)';
      ctx.fillRect(0, 0, this.width, this.height);

      ctx.strokeStyle = 'rgba(192, 132, 252, 0.22)';
      ctx.lineWidth = 1;
      const t = Date.now() * 0.001;
      for (let y = 0; y < this.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y + Math.sin(t + y * 0.02) * 8);
        ctx.lineTo(this.width, y + Math.cos(t + y * 0.02) * 8);
        ctx.stroke();
      }

      // Faixa de Alerta Quântico no Topo
      ctx.fillStyle = 'rgba(15, 5, 29, 0.85)';
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 1.5;
      this.roundRect(ctx, 20, 52, this.width - 40, 26, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#f0abfc';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const remainingSec = Math.max(0, this.boss.parallelTimer).toFixed(1);
      ctx.fillText(`🌌 UNIVERSO PARALELO: COLETE O CRISTAL! (${remainingSec}s)`, this.width / 2, 65);
      ctx.restore();
    }

    // 2. Desenhar Cristal de Estabilização Quântica
    if (this.quantumCrystal && !this.quantumCrystal.collected) {
      const crystalScreenY = this.quantumCrystal.y - this.cameraY;
      if (crystalScreenY > -30 && crystalScreenY < this.height + 30) {
        ctx.save();
        const pulseScale = 1 + Math.sin(this.quantumCrystal.pulse) * 0.15;
        ctx.translate(this.quantumCrystal.x, crystalScreenY);
        ctx.scale(pulseScale, pulseScale);

        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 16;

        ctx.fillStyle = '#a855f7';
        ctx.strokeStyle = '#f0abfc';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, -this.quantumCrystal.radius * 1.3);
        ctx.lineTo(this.quantumCrystal.radius, 0);
        ctx.lineTo(0, this.quantumCrystal.radius * 1.3);
        ctx.lineTo(-this.quantumCrystal.radius, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // 3. Desenhar Mísseis do Jogador
    for (const m of this.playerMissiles) {
      const mScreenY = m.y - this.cameraY;
      if (mScreenY < -20 || mScreenY > this.height + 20) continue;

      ctx.save();
      ctx.shadowColor = m.glow;
      ctx.shadowBlur = 12;
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.arc(m.x, mScreenY, m.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(m.x, mScreenY, m.radius * 0.45, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 4. Desenhar Projéteis do Chefão
    for (const proj of this.boss.projectiles) {
      const projScreenY = proj.y - this.cameraY;
      if (projScreenY < -20 || projScreenY > this.height + 20) continue;

      ctx.save();
      ctx.shadowColor = proj.color;
      ctx.shadowBlur = 14;
      ctx.fillStyle = proj.color;
      ctx.beginPath();
      ctx.arc(proj.x, projScreenY, proj.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // 5. Desenhar o Chefão (Fixado no topo em coordenadas de tela)
    const bossScreenY = this.boss.y;
    ctx.save();
    ctx.translate(this.boss.x, bossScreenY);

    if (this.boss.hitFlash > 0) {
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 24;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, this.boss.radius * 1.08, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.shadowColor = this.boss.glow;
      ctx.shadowBlur = 20;

      // Anel de escudo externo
      ctx.strokeStyle = this.boss.glow;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, this.boss.radius + 6, 0, Math.PI * 2);
      ctx.stroke();

      // Núcleo do Boss com gradiente
      const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, this.boss.radius);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, this.boss.glow);
      grad.addColorStop(1, this.boss.color);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, this.boss.radius, 0, Math.PI * 2);
      ctx.fill();

      // Olhos do Chefão
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(-10, -4, 4, 0, Math.PI * 2);
      ctx.arc(10, -4, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(-10, -3, 2, 0, Math.PI * 2);
      ctx.arc(10, -3, 2, 0, Math.PI * 2);
      ctx.fill();

      // Coroa sobre a cabeça
      ctx.font = '20px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('👑', 0, -this.boss.radius - 8);
    }

    ctx.restore();
  }

  drawBossHPBar(ctx) {
    if (!this.isBossFight || !this.boss) return;

    ctx.save();
    const barW = 220;
    const barH = 12;
    const barX = (this.width - barW) / 2;
    const barY = 22;

    // Fundo da Barra
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = this.boss.glow;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = this.boss.glow;
    ctx.shadowBlur = 10;
    this.roundRect(ctx, barX, barY, barW, barH, 6);
    ctx.fill();
    ctx.stroke();

    // Preenchimento de HP
    const hpRatio = Math.max(0, this.boss.hp / this.boss.maxHp);
    if (hpRatio > 0) {
      ctx.shadowBlur = 0;
      const fillW = Math.max(8, (barW - 4) * hpRatio);
      const hpGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0);
      hpGrad.addColorStop(0, '#ef4444');
      hpGrad.addColorStop(0.5, '#f59e0b');
      hpGrad.addColorStop(1, '#10b981');
      ctx.fillStyle = hpGrad;
      this.roundRect(ctx, barX + 2, barY + 2, fillW, barH - 4, 4);
      ctx.fill();
    }

    // Título do Boss acima da barra
    ctx.shadowBlur = 4;
    ctx.shadowColor = '#000000';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`👑 ${this.boss.name} — ${this.boss.title}`, this.width / 2, barY - 6);

    // Texto de HP
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.boss.hp} / ${this.boss.maxHp} HP`, this.width / 2, barY + barH + 11);

    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}
