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
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.aspectRatio = `${this.width} / ${this.height}`;
    this.canvas.style.maxWidth = '100%';
    this.canvas.style.maxHeight = '100%';
    this.canvas.style.width = 'auto';
    this.canvas.style.height = 'auto';
    this.canvas.style.objectFit = 'contain';

    this.ctx.scale(dpr, dpr);
  }

  initInitialPlatforms() {
    this.platforms = [];
    this.gems = [];
    this.magicBackpacks = [];
    this.spawnedBackpacksCount = 0;

    // Plataforma base inicial (mais larga no modo corrida para acomodar jogador e bot)
    const baseWidth = this.mode === 'race_ai' ? 160 : 120;
    this.platforms.push({
      x: this.width / 2 - baseWidth / 2,
      y: this.height - 60,
      width: baseWidth,
      height: 16,
      type: 'standard',
      vx: 0
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
      opacity: 1
    };

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

    // 2.5 Super Pulo Disparado por Botão Touch ou Tecla Espaço / W / Seta Cima
    if (this.gestureSuperJumpTriggered) {
      this.gestureSuperJumpTriggered = false;
      this.ball.vy = this.jumpForce * 1.45;
      this.ball.stretchX = 0.7;
      this.ball.stretchY = 1.4;
      this.jumpsCount++;
      soundEngine.playSuperJump();
      this.particles.emitSuperJumpBurst(this.ball.x, this.ball.y + this.ball.radius, this.skin.glow);
    }

    // 3. Atualizar Altura e Pontuação (Alinhado exatamente à escala da Meta da Fase)
    const currentHeight = Math.max(0, Math.floor(-this.ball.y + this.height - 120));
    if (currentHeight > this.maxHeightReached) {
      const diff = currentHeight - this.maxHeightReached;
      this.maxHeightReached = currentHeight;
      this.score += diff;
      if (this.onScoreUpdate) {
        this.onScoreUpdate(this.score, this.maxHeightReached);
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
          this.score += 250;
          soundEngine.playMagicBackpack();
          this.particles.emitSuperJumpBurst(mb.x, mb.y, '#f59e0b');
          this.particles.emitSuperJumpBurst(mb.x, mb.y, '#38bdf8');
        }
      }
    }

    // 6.5. Atualizar IA do Bot Oponente (se estiver no Modo Corrida)
    if (this.mode === 'race_ai' && this.botBall) {
      this.updateBot(dt);

      // Notificar estatísticas de duelo de corrida
      if (this.onRaceUpdate) {
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
    if (!this.botBall || this.botBall.lives <= 0) return;
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

    // Verificação de queda do Bot
    if (bot.y > this.cameraY + this.height + 60) {
      if (bot.lives > 1) {
        bot.lives--;
        this.particles.emit(bot.x, this.cameraY + this.height - 30, 18, {
          color: '#a855f7',
          size: 4,
          speed: 3.5,
          life: 0.7
        });
        this.respawnBot();
      } else {
        // Bot perdeu todas as vidas: o jogador vence a corrida por eliminação!
        bot.lives = 0;
        this.finishGame('completed', { raceWinner: 'player', raceReason: 'bot_eliminated' });
        return;
      }
    }

    // Verificação de Vitória do Bot na corrida
    const goalY = -this.stage.targetHeight + (this.height - 120);
    if (bot.maxHeightReached >= this.stage.targetHeight || bot.y <= goalY + bot.radius) {
      this.finishGame('race_bot_won', { raceWinner: 'bot', raceReason: 'bot_reached_goal' });
      return;
    }
  }

  // Respawn do Bot em plataforma segura
  respawnBot() {
    if (!this.botBall) return;
    const visiblePlatforms = this.platforms.filter((p) => {
      if (p.broken) return false;
      const screenY = p.y - this.cameraY;
      return screenY >= 90 && screenY <= this.height - 90;
    });

    let targetPlat = null;
    if (visiblePlatforms.length > 0) {
      visiblePlatforms.sort((a, b) => b.y - a.y);
      targetPlat = visiblePlatforms[0];
    } else {
      targetPlat = this.platforms[0] || { x: this.width / 2, y: this.height - 60, width: 100 };
    }

    this.botBall.x = targetPlat.x + targetPlat.width / 2;
    this.botBall.y = targetPlat.y - this.botBall.radius - 2;
    this.botBall.vx = 0;
    this.botBall.vy = this.jumpForce * 1.05;
    this.botBall.invulnerableTimer = 2.0;
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

    // Concede 2.5s de escudo de energia
    this.invulnerableTimer = 2.5;

    soundEngine.playRespawn();
    this.particles.emitSuperJumpBurst(this.ball.x, this.ball.y, '#38bdf8');
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
      ctx.shadowBlur = 10;
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
      ctx.shadowBlur = 14;

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
        ctx.shadowBlur = 15;

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

    // 5. Desenhar a Bola do Jogador
    const ballScreenY = this.ball.y - this.cameraY;

    // Se a bola estiver com a Mochila Mágica equipada, desenhar a mochila acoplada com asas e chamas
    if (this.ball.hasMagicBackpack) {
      ctx.save();
      ctx.translate(this.ball.x, ballScreenY);

      // Glow da mochila
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;

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
    ctx.shadowBlur = 18;

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

    // Escudo de Energia Protetor pós-respawn
    if (this.invulnerableTimer > 0) {
      ctx.save();
      const shieldPulse = 1 + Math.sin(Date.now() * 0.012) * 0.08;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 18;
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
      ctx.shadowBlur = 10;
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
        ctx.shadowBlur = 18;

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
        ctx.shadowBlur = 8;
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
          ctx.shadowBlur = 12;
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
          ctx.shadowBlur = 12;
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
      ctx.shadowBlur = 14;

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
