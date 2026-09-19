import { soundEngine } from './audio';
import { ParticleSystem } from './particles';
import { BackgroundRenderer } from './background';

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

    // Modos de Jogo: 'solo' (padrão) ou 'race_ai' (Corrida 1v1 vs Máquina)
    this.mode = gameOptions.mode || 'solo';
    this.aiDifficulty = gameOptions.aiDifficulty || 'medium';
    this.onRaceUpdate = gameOptions.onRaceUpdate || null;
    this.onBoostUpdate = gameOptions.onBoostUpdate || null;

    // Barra de Carga de Impulso / Super Salto
    this.maxBoostCharge = 100;
    this.boostCharge = 100;
    this.boostRechargeRate = 36; // recarrega ~36% por segundo (~2.8s do 0 ao 100%)
    this.lastBoostReported = 100;
    this.hasPendingBoostUpdate = true;

    // Dimensões lógicas
    this.width = 440;
    this.height = 720;

    this.particles = new ParticleSystem();
    this.background = new BackgroundRenderer(this.width, this.height, this.stage);
    this.running = false;
    this.paused = false;
    this.animationId = null;

    // Sistema de 3 Vidas, Marcadores de Morte e Escudo de Respawn
    this.maxLives = 3;
    this.lives = 3;
    this.deathMarkers = [];
    this.invulnerableTimer = 0;

    // Estado da Bola do Jogador
    const initialPlayerX = this.mode === 'race_ai' ? this.width / 2 - 32 : this.width / 2;
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
      backpackMaxFuel: 100
    };

    // Estado da Bola do Bot IA (Competidor na Corrida)
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

    // Câmera
    this.cameraY = 0;
    this.targetCameraY = 0;
    this.maxHeightReached = 0;

    // Pontuação e Estatísticas
    this.score = 0;
    this.jumpsCount = 0;
    this.gemsCollected = 0;
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
    this.environmentalHazards = [];
    this.activeLightning = null;
    this.hazardSpawnTimer = 0;
    this.lightningTimer = 0;
    this.spawnedBackpacksCount = 0;
    this.thrustSoundTimer = 0;
    this.highestPlatformY = this.height;

    // Configuração de Física da Fase
    this.gravity = stage.gravity || 0.34;
    this.jumpForce = stage.jumpForce || -11.8;
    this.wind = stage.wind || 0;
    this.friction = stage.friction || 0.94;

    this.initCanvas();
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

  initCanvas() {
    this.isMobile = typeof navigator !== 'undefined' && (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (typeof window !== 'undefined' && window.innerWidth < 768));
    const rawDpr = window.devicePixelRatio || 1;
    // Otimização Mobile: limita DPR a no máximo 1.6x no mobile para não sobrecarregar GPU móvel
    const dpr = this.isMobile ? Math.min(rawDpr, 1.6) : Math.min(rawDpr, 2.0);
    this.dpr = dpr;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.canvas.style.aspectRatio = `${this.width} / ${this.height}`;
    this.canvas.style.maxWidth = '100%';
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.width = 'auto';
    this.canvas.style.height = 'auto';
    this.canvas.style.objectFit = 'contain';

    this.ctx.scale(dpr, dpr);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'low';
  }

  initInitialPlatforms() {
    this.platforms = [];
    this.gems = [];
    this.magicBackpacks = [];
    this.environmentalHazards = [];
    this.activeLightning = null;
    this.hazardSpawnTimer = 0;
    this.lightningTimer = 0;
    this.spawnedBackpacksCount = 0;

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

    let currentY = this.height - 130;
    while (currentY > -800) {
      this.generatePlatformAt(currentY);
      currentY -= Math.floor(Math.random() * 45 + 65);
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

    const platform = {
      x: pX,
      y: y,
      width: pWidth,
      height: 15,
      type: type,
      vx: vx,
      broken: false,
      opacity: 1,
      hasSpikes: false
    };

    // Chance de espinhos na plataforma baseada no tema ou desafios da fase
    const spikeThemes = ['forest', 'autumn', 'spring', 'wood', 'rock', 'iron', 'volcano', 'steampunk', 'ninja', 'medieval', 'darkmatter'];
    if (type === 'standard' && (spikeThemes.includes(this.stage.theme) || hazards.includes('spikes'))) {
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
    this.startTime = Date.now();
    this.lastTime = performance.now();
    this.loop();
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
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

    // Wrap around nas bordas laterais da tela
    if (this.ball.x < -this.ball.radius) {
      this.ball.x = this.width + this.ball.radius;
    } else if (this.ball.x > this.width + this.ball.radius) {
      this.ball.x = -this.ball.radius;
    }

    // 2. Física Vertical (Gravidade ou Efeito Balão Suave da Mochila Mágica)
    if (this.ball.hasMagicBackpack && this.ball.backpackFuel > 0) {
      // Duração de ~5.5 segundos reais: garante que a mochila acabe bem antes do final da fase
      const fuelConsumptionPerSecond = 100 / 5.5; // consome 100% em 5.5s (~18.2% por segundo)
      this.ball.backpackFuel = Math.max(0, this.ball.backpackFuel - fuelConsumptionPerSecond * (dt / 60));

      // Voo 2x mais lento: subida calma e serena a -1.2px/frame estilo balão do Mario
      const floatBobbing = Math.sin(Date.now() * 0.005) * 0.2;
      const targetFlyVy = -1.2 + floatBobbing; // Exatamente 2x mais lento que antes
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

    // Partículas de rastro contínuo com a cor da skin
    if (Math.abs(this.ball.vy) > 2) {
      this.particles.emitTrail(this.ball.x, this.ball.y, this.skin.trail);
    }

    // 2.5 Super Pulo / Impulso Proporcional Disparado por Botão Touch, Toque Duplo, Deslizar ⬆ ou Teclado (Espaço/W/Seta Cima)
    if (this.gestureSuperJumpTriggered) {
      this.gestureSuperJumpTriggered = false;
      const chargeRatio = Math.max(0, Math.min(1, this.boostCharge / this.maxBoostCharge));

      if (chargeRatio > 0.08) {
        // Pulo com impulso proporcional à carga disponível (1.0x até 1.70x da força de pulo)
        const boostMultiplier = 1.0 + (chargeRatio * 0.70);
        this.ball.vy = this.jumpForce * boostMultiplier;
        this.ball.stretchX = Math.max(0.6, 1 - (chargeRatio * 0.35));
        this.ball.stretchY = Math.min(1.5, 1 + (chargeRatio * 0.45));
        this.jumpsCount++;

        if (chargeRatio >= 0.5) {
          soundEngine.playSuperJump();
          this.particles.emitSuperJumpBurst(this.ball.x, this.ball.y + this.ball.radius, this.skin.glow);
        } else {
          soundEngine.playJump();
          this.particles.emitJumpBurst(this.ball.x, this.ball.y + this.ball.radius, this.skin.primary);
        }

        // Zera a barra de carga após o impulso
        this.boostCharge = 0;
        this.hasPendingBoostUpdate = true;
      } else {
        // Barra vazia ou quase vazia: executa pulo normal (1.0x) conforme regra do jogo
        this.ball.vy = this.jumpForce;
        this.ball.stretchX = 0.85;
        this.ball.stretchY = 1.15;
        this.jumpsCount++;
        soundEngine.playJump();
        this.particles.emitJumpBurst(this.ball.x, this.ball.y + this.ball.radius, '#94a3b8');
      }
    }

    // 3. Atualizar Altura e Pontuação (Alinhado exatamente à escala da Meta da Fase)
    const currentHeight = Math.max(0, Math.floor(-this.ball.y + this.height - 120));
    if (currentHeight > this.maxHeightReached) {
      const diff = currentHeight - this.maxHeightReached;
      this.maxHeightReached = currentHeight;
      this.score += diff;
      this.hasPendingScoreUpdate = true;
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

          if (p.type === 'spring') {
            this.ball.vy = this.jumpForce * 1.65;
            this.ball.stretchX = 0.6;
            this.ball.stretchY = 1.6;
            soundEngine.playSpring();
            this.particles.emitSuperJumpBurst(this.ball.x, p.y, '#facc15');
          } else if (p.type === 'fragile') {
            this.ball.vy = this.jumpForce;
            p.broken = true;
            soundEngine.playCrumble();
            this.particles.emitPlatformCrumble(p.x, p.y, p.width, p.height, '#ef4444');
          } else {
            this.ball.vy = this.jumpForce;
            this.ball.stretchX = 1.35;
            this.ball.stretchY = 0.7;
            soundEngine.playJump();
            this.particles.emitJumpBurst(this.ball.x, p.y, this.stage.platformColor);

            if (p.type === 'conveyor') {
              this.ball.vx += p.vx * 1.8;
            }
          }
          break;
        }
      }
    }

    // 5. Atualizar Plataformas Móveis
    for (const p of this.platforms) {
      if (p.type === 'moving' && !p.broken) {
        p.x += p.vx * dt;
        if (p.x <= 10) {
          p.x = 10;
          p.vx = Math.abs(p.vx);
        } else if (p.x + p.width >= this.width - 10) {
          p.x = this.width - 10 - p.width;
          p.vx = -Math.abs(p.vx);
        }
      }
    }

    // 6. Coleta de Gemas
    for (const g of this.gems) {
      if (!g.collected) {
        g.pulse += 0.05 * dt;
        const dist = Math.hypot(this.ball.x - g.x, this.ball.y - g.y);

        // Atração magnética suave das gemas em direção à bola enquanto flutua com a mochila
        if (this.ball.hasMagicBackpack && dist < 120) {
          const pullAngle = Math.atan2(this.ball.y - g.y, this.ball.x - g.x);
          g.x += Math.cos(pullAngle) * 3.5 * dt;
          g.y += Math.sin(pullAngle) * 3.5 * dt;
        }

        // Raio de coleta generoso durante o voo com a mochila mágica
        const collectThreshold = this.ball.hasMagicBackpack ? this.ball.radius + g.radius + 18 : this.ball.radius + g.radius + 6;
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
          this.boostCharge = this.maxBoostCharge;
          this.hasPendingBoostUpdate = true;
          this.score += 250;
          soundEngine.playMagicBackpack();
          this.particles.emitSuperJumpBurst(mb.x, mb.y, '#f59e0b');
          this.particles.emitSuperJumpBurst(mb.x, mb.y, '#38bdf8');
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
    }

    // 7. Câmera Vertical (Segue a bola do jogador para cima suavemente)
    const targetY = this.ball.y - this.height * 0.45;
    if (targetY < this.cameraY) {
      this.cameraY += (targetY - this.cameraY) * 0.12 * dt;
    }

    // 8. Geração Procedural Contínua de Novas Plataformas acima da câmera
    while (this.highestPlatformY > this.cameraY - 400) {
      this.highestPlatformY -= Math.floor(Math.random() * 45 + 65);
      this.generatePlatformAt(this.highestPlatformY);
    }

    // 9. Limpeza de Entidades Fora da Tela
    this.platforms = this.platforms.filter((p) => p.y < this.cameraY + this.height + 150);
    this.gems = this.gems.filter((g) => !g.collected && g.y < this.cameraY + this.height + 150);
    this.magicBackpacks = this.magicBackpacks.filter((mb) => !mb.collected && mb.y < this.cameraY + this.height + 150);

    // 10. Atualizar Partículas
    this.particles.update(dt);

    // 11. Verificação de Vitória (Chegou na meta de altura ou cruzou a linha de chegada)
    const goalY = -this.stage.targetHeight + (this.height - 120);
    if (this.maxHeightReached >= this.stage.targetHeight || this.ball.y <= goalY + this.ball.radius) {
      this.finishGame('completed', { raceWinner: 'player' });
      return;
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
        this.finishGame('game_over', { raceWinner: 'bot' });
      }
    }
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

    // Wrap around nas bordas da tela
    if (bot.x < -bot.radius) {
      bot.x = this.width + bot.radius;
    } else if (bot.x > this.width + bot.radius) {
      bot.x = -bot.radius;
    }

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
    let type = 'debris';
    let color = '#94a3b8';
    let radius = 13;
    let vy = Math.random() * 1.5 + 3.0;

    switch (theme) {
      case 'forest':
      case 'spring':
      case 'autumn':
      case 'wood':
        type = 'branch';
        color = '#854d0e';
        radius = 14;
        break;
      case 'rock':
      case 'volcano':
        type = 'rock';
        color = theme === 'volcano' ? '#f97316' : '#78716c';
        radius = 15;
        vy = Math.random() * 1.8 + 3.5;
        break;
      case 'iron':
      case 'steampunk':
        type = 'iron_bar';
        color = '#f59e0b';
        radius = 12;
        vy = Math.random() * 1.6 + 3.8;
        break;
      case 'arctic':
        type = 'icicle';
        color = '#38bdf8';
        radius = 12;
        vy = Math.random() * 2.0 + 4.0;
        break;
      case 'ocean':
      case 'underwater':
        type = 'jellyfish';
        color = '#e879f9';
        radius = 13;
        vy = Math.random() * 1.0 + 2.2;
        break;
      default:
        type = 'debris';
        color = '#a855f7';
        radius = 12;
        break;
    }

    this.environmentalHazards.push({
      x: Math.random() * (this.width - 60) + 30,
      y: this.cameraY - 40,
      vx: (Math.random() - 0.5) * 1.2,
      vy: vy,
      radius: radius,
      angle: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.08,
      type: type,
      color: color
    });
  }

  drawEnvironmentalHazards(ctx) {
    for (const h of this.environmentalHazards) {
      const screenY = h.y - this.cameraY;
      if (screenY < -40 || screenY > this.height + 40) continue;

      ctx.save();
      ctx.translate(h.x, screenY);
      ctx.rotate(h.angle);

      if (h.type === 'branch') {
        // Galho de árvore caindo com folhas
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

        ctx.fillStyle = this.stage.theme === 'autumn' ? '#ea580c' : '#22c55e';
        ctx.beginPath();
        ctx.ellipse(8, 10, 5, 3, 0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(-10, -4, 4, 2, -0.3, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'rock') {
        // Rocha / Bloco de pedra caindo
        ctx.fillStyle = h.color;
        ctx.strokeStyle = '#292524';
        ctx.lineWidth = 2;
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

        ctx.strokeStyle = '#44403c';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-3, -14);
        ctx.lineTo(2, 0);
        ctx.lineTo(14, 6);
        ctx.stroke();
      } else if (h.type === 'iron_bar') {
        // Barra de ferro incandescente
        ctx.shadowColor = '#f97316';
        ctx.shadowBlur = this.isMobile ? 0 : 10;
        const grad = ctx.createLinearGradient(-15, -6, 15, 6);
        grad.addColorStop(0, '#f97316');
        grad.addColorStop(0.5, '#fef08a');
        grad.addColorStop(1, '#ea580c');
        ctx.fillStyle = grad;
        ctx.strokeStyle = '#9a3412';
        ctx.lineWidth = 1.5;
        this.roundRect(ctx, -14, -6, 28, 12, 3);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#7c2d12';
        ctx.beginPath();
        ctx.arc(-8, 0, 2, 0, Math.PI * 2);
        ctx.arc(8, 0, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (h.type === 'icicle') {
        // Estalactite de gelo afiada
        ctx.fillStyle = 'rgba(186, 230, 253, 0.9)';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(-7, -13);
        ctx.lineTo(7, -13);
        ctx.lineTo(0, 14);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (h.type === 'jellyfish') {
        // Água-viva
        ctx.fillStyle = 'rgba(232, 121, 249, 0.85)';
        ctx.beginPath();
        ctx.arc(0, -4, 10, Math.PI, 0, false);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#f472b6';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-6, -4); ctx.quadraticCurveTo(-7, 4, -4, 10);
        ctx.moveTo(0, -4); ctx.quadraticCurveTo(2, 5, 0, 12);
        ctx.moveTo(6, -4); ctx.quadraticCurveTo(8, 4, 5, 10);
        ctx.stroke();
      } else {
        // Destroço padrão
        ctx.fillStyle = h.color;
        ctx.beginPath();
        ctx.arc(0, 0, h.radius, 0, Math.PI * 2);
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
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    const duration = Math.floor((Date.now() - this.startTime) / 1000);
    const isRace = this.mode === 'race_ai';
    const isPlayerWin = status === 'completed';

    const resultPayload = {
      score: isPlayerWin ? this.score + 1000 : this.score,
      maxHeight: this.maxHeightReached,
      duration,
      jumps: this.jumpsCount,
      gems: this.gemsCollected,
      status: status,
      stage: this.stage,
      isRace,
      winner: isPlayerWin ? 'player' : (status === 'race_bot_won' ? 'bot' : (details.raceWinner || 'none')),
      botHeight: this.botBall ? this.botBall.maxHeightReached : 0,
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

    // 1. Cenário de Fundo Temático com Parallax e Partículas Atmosféricas
    this.background.draw(ctx, this.cameraY);

    // 2. Desenhar Plataformas
    for (const p of this.platforms) {
      if (p.broken) continue;
      const screenY = p.y - this.cameraY;
      if (screenY < -30 || screenY > this.height + 30) continue;

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
        ctx.fillStyle = this.stage.platformColor;
        ctx.strokeStyle = this.stage.platformBorder;
        ctx.lineWidth = 2;
        this.roundRect(ctx, p.x, screenY, p.width, p.height, 6);
        ctx.fill();
        ctx.stroke();

        if (p.type === 'moving') {
          // Indicador de movimento nas pontas
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x + 8, screenY + p.height / 2, 2.5, 0, Math.PI * 2);
          ctx.arc(p.x + p.width - 8, screenY + p.height / 2, 2.5, 0, Math.PI * 2);
          ctx.fill();
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

    // 5. Desenhar a Bola do Jogador
    const ballScreenY = this.ball.y - this.cameraY;

    // Se a bola estiver com a Mochila Mágica equipada, desenhar a mochila acoplada com asas e chamas
    if (this.ball.hasMagicBackpack) {
      ctx.save();
      ctx.translate(this.ball.x, ballScreenY);

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
    ctx.translate(this.ball.x, ballScreenY);
    ctx.rotate(this.ball.angle);
    ctx.scale(this.ball.stretchX, this.ball.stretchY);

    // Glow externo
    ctx.shadowColor = this.skin.glow;
    ctx.shadowBlur = this.isMobile ? 0 : 18;

    // Gradiente esférico 3D
    const ballGrad = ctx.createRadialGradient(-4, -4, 2, 0, 0, this.ball.radius);
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.4, this.skin.primary);
    ballGrad.addColorStop(1, this.skin.trail);

    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(0, 0, this.ball.radius, 0, Math.PI * 2);
    ctx.fill();

    // Contorno brilhante
    ctx.strokeStyle = this.skin.glow;
    ctx.lineWidth = 2;
    ctx.stroke();

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

    ctx.restore();

    // 5.2. Medidor de Combustível da Mochila Mágica (HUD e Barra sobre a bola)
    if (this.ball.hasMagicBackpack && this.ball.backpackFuel > 0) {
      const fuelPct = Math.max(0, Math.min(100, Math.round((this.ball.backpackFuel / this.ball.backpackMaxFuel) * 100)));

      // 1. Barra Flutuando Logo Acima da Bola
      ctx.save();
      ctx.translate(this.ball.x, ballScreenY - this.ball.radius - 22);

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

        // Glow externo do Bot
        ctx.shadowColor = this.botBall.skin.glow;
        ctx.shadowBlur = this.isMobile ? 0 : 18;

        // Gradiente do Bot
        const botGrad = ctx.createRadialGradient(-4, -4, 2, 0, 0, this.botBall.radius);
        botGrad.addColorStop(0, '#ffffff');
        botGrad.addColorStop(0.35, this.botBall.skin.primary);
        botGrad.addColorStop(1, this.botBall.skin.trail);

        ctx.fillStyle = botGrad;
        ctx.beginPath();
        ctx.arc(0, 0, this.botBall.radius, 0, Math.PI * 2);
        ctx.fill();

        // Contorno brilhante
        ctx.strokeStyle = this.botBall.skin.glow;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Visor óptico cibernético de IA
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = this.isMobile ? 0 : 8;
        ctx.fillRect(-6, -3, 12, 5);

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

    // 6. Meta de Altura / Linha de Chegada
    const goalY = -this.stage.targetHeight + (this.height - 120);
    const goalScreenY = goalY - this.cameraY;
    if (goalScreenY > -60 && goalScreenY < this.height + 60) {
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
