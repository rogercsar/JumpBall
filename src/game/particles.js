/**
 * Sistema de Partículas para Efeitos Visuais no Canvas
 */
export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, count = 10, options = {}) {
    const {
      color = '#06b6d4',
      size = 3,
      speed = 3,
      spread = Math.PI * 2,
      baseAngle = 0,
      life = 0.8,
      gravity = 0.1,
      shape = 'circle'
    } = options;

    for (let i = 0; i < count; i++) {
      const angle = baseAngle + (Math.random() - 0.5) * spread;
      const velocity = (Math.random() * 0.7 + 0.3) * speed;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: Math.random() * size + 1.5,
        color,
        life,
        maxLife: life,
        gravity,
        shape
      });
    }
  }

  // Efeito ao saltar em uma plataforma
  emitJumpBurst(x, y, color = '#22c55e') {
    this.emit(x, y, 12, {
      color,
      size: 4,
      speed: 4.5,
      spread: Math.PI * 0.8,
      baseAngle: Math.PI / 2, // Para baixo
      life: 0.5,
      gravity: 0.15
    });
  }

  // Efeito de Mola / Super Pulo
  emitSuperJumpBurst(x, y, color = '#facc15') {
    this.emit(x, y, 20, {
      color,
      size: 5,
      speed: 6,
      spread: Math.PI * 0.9,
      baseAngle: Math.PI / 2,
      life: 0.7,
      gravity: 0.1
    });
  }

  // Rastro contínuo da bola em queda ou ascensão veloz
  emitTrail(x, y, color = '#38bdf8') {
    this.emit(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6, 1, {
      color,
      size: 3,
      speed: 0.8,
      spread: Math.PI * 2,
      life: 0.35,
      gravity: 0.02
    });
  }

  // Efeito de plataforma quebrando
  emitPlatformCrumble(x, y, width, height, color = '#ef4444') {
    for (let i = 0; i < 15; i++) {
      this.emit(x + Math.random() * width, y + Math.random() * height, 1, {
        color,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 4 + 1,
        spread: Math.PI * 2,
        baseAngle: 0,
        life: 0.9,
        gravity: 0.3,
        shape: 'rect'
      });
    }
  }

  // Jato propulsor da Mochila Mágica (Chamas e faíscas cósmicas para baixo)
  emitBackpackThrust(x, y) {
    // Ejetor Esquerdo e Direito
    const offsets = [-8, 8];
    offsets.forEach((offsetX) => {
      // Chama amarela/laranja central
      this.emit(x + offsetX, y, 2, {
        color: Math.random() > 0.4 ? '#f59e0b' : '#ef4444',
        size: 3.5,
        speed: 5.5,
        spread: 0.35,
        baseAngle: Math.PI / 2, // Para baixo
        life: 0.3,
        gravity: 0.05
      });
      // Faíscas azuis/mágicas
      if (Math.random() < 0.4) {
        this.emit(x + offsetX, y, 1, {
          color: '#38bdf8',
          size: 2.2,
          speed: 4.2,
          spread: 0.5,
          baseAngle: Math.PI / 2,
          life: 0.35,
          gravity: 0.05
        });
      }
    });
  }

  // Fumaça ao esgotar ou desequipar a Mochila Mágica
  emitBackpackSmoke(x, y) {
    for (let i = 0; i < 18; i++) {
      this.emit(x + (Math.random() - 0.5) * 16, y + (Math.random() - 0.5) * 16, 1, {
        color: Math.random() > 0.5 ? 'rgba(148, 163, 184, 0.7)' : 'rgba(203, 213, 225, 0.5)',
        size: Math.random() * 5 + 3,
        speed: Math.random() * 2 + 0.8,
        spread: Math.PI * 2,
        baseAngle: 0,
        life: 0.65,
        gravity: -0.04
      });
    }
  }

  update(dt = 1) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.gravity * dt;
      p.life -= 0.02 * dt;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(ctx, cameraY) {
    ctx.save();
    for (const p of this.particles) {
      const screenY = p.y - cameraY;
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(p.x - p.size / 2, screenY - p.size / 2, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, screenY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  clear() {
    this.particles = [];
  }
}
