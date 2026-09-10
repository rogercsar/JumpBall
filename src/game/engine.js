import { soundEngine } from './audio';
import { ParticleSystem } from './particles';

export class GameEngine {
  constructor(canvas, stage, skin, onGameOver, onVictory, onScoreUpdate) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.stage = stage;
    this.skin = skin;
    this.onGameOver = onGameOver;
    this.onVictory = onVictory;
    this.onScoreUpdate = onScoreUpdate;

    this.particles = new ParticleSystem();
    this.running = false;
    this.paused = false;
    this.animationId = null;

    // Dimensões lógicas
    this.width = 440;
    this.height = 720;

    // Estado da Bola (inicialmente repousando na plataforma base)
    this.ball = {
      x: this.width / 2,
      y: this.height - 76,
      vx: 0,
      vy: 0,
      radius: 16,
      stretchX: 1,
      stretchY: 1,
      angle: 0
    };

    // Câmera
    this.cameraY = 0;
    this.targetCameraY = 0;
    this.maxHeightReached = 0;

    // Pontuação e Estatísticas
    this.score = 0;
    this.jumpsCount = 0;
    this.gemsCollected = 0;
    this.startTime = Date.now();

    // Controles e Sensores
    this.tiltX = 0; // -1 a 1 vindo do DeviceOrientation
    this.keys = { left: false, right: false, jump: false };
    this.touchDirection = 0; // -1 (esquerda), 0, 1 (direita)
    this.gestureSuperJumpTriggered = false;

    // Entidades
    this.platforms = [];
    this.gems = [];
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

  initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = '100%';
    this.canvas.style.maxWidth = `${this.width}px`;
    this.canvas.style.height = 'auto';
    this.canvas.style.aspectRatio = `${this.width} / ${this.height}`;

    this.ctx.scale(dpr, dpr);
  }

  initInitialPlatforms() {
    this.platforms = [];
    this.gems = [];

    // Plataforma base inicial
    this.platforms.push({
      x: this.width / 2 - 60,
      y: this.height - 60,
      width: 120,
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
  }

  // Acionado pelo hook do giroscópio
  setTilt(gamma, sensitivity = 1.2, deadzone = 1.5) {
    if (Math.abs(gamma) < deadzone) {
      this.tiltX = 0;
    } else {
      const normalized = Math.max(-1, Math.min(1, gamma / 30));
      this.tiltX = normalized * sensitivity;
    }
  }

  // Acionado pelo MediaPipe Hands
  triggerGestureJump() {
    if (!this.running || this.paused) return;
    this.gestureSuperJumpTriggered = true;
  }

  // Controles de Toque na tela
  setTouch(direction) {
    this.touchDirection = direction;
  }

  // Controles de Teclado
  handleKeyDown(e) {
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') this.keys.left = true;
    if (e.code === 'ArrowRight' || e.code === 'KeyD') this.keys.right = true;
    if (e.code === 'Space') {
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
    this.ball.vy = this.jumpForce; // Dispara o primeiro pulo ao dar Play
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
    // 1. Entrada Horizontal (Giroscópio + Teclado + Toque)
    let moveInput = this.tiltX;
    if (this.keys.left || this.touchDirection < 0) moveInput = -1;
    if (this.keys.right || this.touchDirection > 0) moveInput = 1;

    const accel = 0.85 * (this.stage.speedFactor || 1);
    this.ball.vx += moveInput * accel * dt;
    this.ball.vx += this.wind * dt; // Efeito do vento da fase
    this.ball.vx *= Math.pow(this.friction, dt);

    // Limitar velocidade máxima horizontal
    const maxSpeedX = 8.5;
    this.ball.vx = Math.max(-maxSpeedX, Math.min(maxSpeedX, this.ball.vx));

    this.ball.x += this.ball.vx * dt;
    this.ball.angle += (this.ball.vx * 0.05) * dt;

    // Wrap around nas bordas laterais da tela
    if (this.ball.x < -this.ball.radius) {
      this.ball.x = this.width + this.ball.radius;
    } else if (this.ball.x > this.width + this.ball.radius) {
      this.ball.x = -this.ball.radius;
    }

    // 2. Gravidade e Entrada Vertical
    this.ball.vy += this.gravity * dt;
    this.ball.y += this.ball.vy * dt;

    // Normalizar elasticidade visual (squash & stretch)
    this.ball.stretchX += (1 - this.ball.stretchX) * 0.15 * dt;
    this.ball.stretchY += (1 - this.ball.stretchY) * 0.15 * dt;

    // 3. Super Pulo Disparado por Gesto MediaPipe ou Tecla Espaço
    if (this.gestureSuperJumpTriggered) {
      this.gestureSuperJumpTriggered = false;
      this.ball.vy = this.jumpForce * 1.45; // 45% mais forte
      this.ball.stretchX = 0.7;
      this.ball.stretchY = 1.4;
      this.jumpsCount++;
      soundEngine.playSuperJump();
      this.particles.emitSuperJumpBurst(this.ball.x, this.ball.y + this.ball.radius, this.skin.glow);
    }

    // 4. Colisão da Bola com Plataformas (apenas quando caindo vy > 0)
    if (this.ball.vy > 0) {
      const ballBottom = this.ball.y + this.ball.radius;
      const prevBallBottom = ballBottom - this.ball.vy * dt;

      for (let i = 0; i < this.platforms.length; i++) {
        const p = this.platforms[i];
        if (p.broken) continue;

        if (
          this.ball.x + this.ball.radius * 0.6 >= p.x &&
          this.ball.x - this.ball.radius * 0.6 <= p.x + p.width &&
          ballBottom >= p.y &&
          prevBallBottom <= p.y + p.height + 4
        ) {
          // Aterrissou na plataforma!
          this.ball.y = p.y - this.ball.radius;
          this.jumpsCount++;

          if (p.type === 'spring') {
            this.ball.vy = this.jumpForce * 1.5;
            this.ball.stretchX = 0.65;
            this.ball.stretchY = 1.45;
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
        if (dist < this.ball.radius + g.radius + 6) {
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

    // 7. Câmera Vertical (Segue a bola para cima suavemente)
    const targetY = this.ball.y - this.height * 0.45;
    if (targetY < this.cameraY) {
      this.cameraY += (targetY - this.cameraY) * 0.12 * dt;
    }

    // 8. Cálculo de Altura e Pontuação
    const currentHeight = Math.max(0, Math.floor(-this.ball.y + this.height - 120));
    if (currentHeight > this.maxHeightReached) {
      const diff = currentHeight - this.maxHeightReached;
      this.score += diff;
      this.maxHeightReached = currentHeight;
      if (this.onScoreUpdate) {
        this.onScoreUpdate(this.score, this.maxHeightReached);
      }
    }

    // 9. Geração Procedural de Novas Plataformas no topo
    while (this.highestPlatformY > this.cameraY - 400) {
      this.highestPlatformY -= Math.floor(Math.random() * 45 + 65);
      this.generatePlatformAt(this.highestPlatformY);
    }

    // Limpar plataformas e gemas que ficaram muito abaixo da tela
    this.platforms = this.platforms.filter((p) => p.y < this.cameraY + this.height + 150);
    this.gems = this.gems.filter((g) => !g.collected && g.y < this.cameraY + this.height + 150);

    // 10. Atualizar Partículas
    this.particles.update(dt);

    // 11. Verificação de Vitória (Chegou na meta de altura da fase)
    if (this.maxHeightReached >= this.stage.targetHeight) {
      this.finishGame('completed');
      return;
    }

    // 12. Verificação de Game Over (Caiu abaixo da câmera visível)
    if (this.ball.y > this.cameraY + this.height + 60) {
      this.finishGame('game_over');
    }
  }

  finishGame(status) {
    if (this.finished) return;
    this.finished = true;
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    const duration = Math.floor((Date.now() - this.startTime) / 1000);

    if (status === 'completed') {
      soundEngine.playVictory();
      if (this.onVictory) {
        this.onVictory({
          score: this.score + 1000,
          maxHeight: this.maxHeightReached,
          duration,
          jumps: this.jumpsCount,
          gems: this.gemsCollected,
          status: 'completed'
        });
      }
    } else {
      soundEngine.playGameOver();
      if (this.onGameOver) {
        this.onGameOver({
          score: this.score,
          maxHeight: this.maxHeightReached,
          duration,
          jumps: this.jumpsCount,
          gems: this.gemsCollected,
          status: 'game_over'
        });
      }
    }
  }

  render() {
    const ctx = this.ctx;

    // 1. Fundo Gradiente da Fase
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    bgGrad.addColorStop(0, this.stage.bgGradient[0]);
    bgGrad.addColorStop(0.5, this.stage.bgGradient[1]);
    bgGrad.addColorStop(1, this.stage.bgGradient[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Grade de fundo sutil com efeito parallax
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const gridOffsetY = -this.cameraY * 0.3 % 40;
    for (let y = gridOffsetY; y < this.height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }
    ctx.restore();

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

    // 4. Desenhar Partículas
    this.particles.draw(ctx, this.cameraY);

    // 5. Desenhar a Bola do Jogador
    const ballScreenY = this.ball.y - this.cameraY;
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

    ctx.restore();

    // 6. Meta de Altura / Linha de Chegada
    const goalY = -this.stage.targetHeight + (this.height - 120);
    const goalScreenY = goalY - this.cameraY;
    if (goalScreenY > -40 && goalScreenY < this.height + 40) {
      ctx.save();
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(0, goalScreenY);
      ctx.lineTo(this.width, goalScreenY);
      ctx.stroke();

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('🏆 META DA FASE', 15, goalScreenY - 8);
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
