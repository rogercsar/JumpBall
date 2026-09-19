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

  // Rastro contínuo da bola com suporte a múltiplos estilos (Loja de Rastros)
  emitTrail(x, y, color = '#38bdf8', trailStyle = 'default') {
    const px = x + (Math.random() - 0.5) * 6;
    const py = y + (Math.random() - 0.5) * 6;

    if (trailStyle === 'fire') {
      const fireColors = ['#f97316', '#fbbf24', '#ef4444', '#fef08a'];
      const c = fireColors[Math.floor(Math.random() * fireColors.length)];
      this.emit(px, py, 1, {
        color: c,
        size: Math.random() * 3.5 + 2,
        speed: 1.2,
        spread: Math.PI * 0.6,
        baseAngle: -Math.PI / 2, // Sobe como fogo
        life: 0.45,
        gravity: -0.06
      });
    } else if (trailStyle === 'rainbow') {
      const rainbowColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#a855f7', '#ec4899'];
      const c = rainbowColors[Math.floor((Date.now() / 80) % rainbowColors.length)];
      this.emit(px, py, 1, {
        color: c,
        size: Math.random() * 3.2 + 2,
        speed: 0.8,
        spread: Math.PI * 2,
        life: 0.4,
        gravity: 0.01
      });
    } else if (trailStyle === 'stars') {
      this.emit(px, py, 1, {
        color: Math.random() > 0.3 ? '#fde047' : '#ffffff',
        size: Math.random() * 3 + 2,
        speed: 0.9,
        spread: Math.PI * 2,
        life: 0.5,
        gravity: 0.03,
        shape: 'rect'
      });
    } else if (trailStyle === 'lightning') {
      this.emit(px, py, 1, {
        color: Math.random() > 0.4 ? '#38bdf8' : '#ffffff',
        size: Math.random() * 3.5 + 1.5,
        speed: 2.2,
        spread: Math.PI * 2,
        life: 0.25,
        gravity: 0
      });
    } else if (trailStyle === 'music') {
      this.emit(px, py, 1, {
        color: '#c084fc',
        size: 3,
        speed: 1.0,
        spread: Math.PI * 2,
        life: 0.45,
        gravity: -0.04
      });
    } else if (trailStyle === 'petals') {
      this.emit(px, py, 1, {
        color: Math.random() > 0.5 ? '#f43f5e' : '#fbcfe8',
        size: Math.random() * 3.2 + 2,
        speed: 0.7,
        spread: Math.PI * 2,
        life: 0.6,
        gravity: 0.04
      });
    } else {
      // Default clássico
      this.emit(px, py, 1, {
        color,
        size: 3,
        speed: 0.8,
        spread: Math.PI * 2,
        life: 0.35,
        gravity: 0.02
      });
    }
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

  // Faíscas elétricas de relâmpago
  emitLightningBurst(x, y) {
    for (let i = 0; i < 20; i++) {
      this.emit(x, y, 1, {
        color: Math.random() > 0.4 ? '#67e8f9' : '#ffffff',
        size: Math.random() * 4 + 2,
        speed: Math.random() * 6 + 2,
        spread: Math.PI * 2,
        baseAngle: 0,
        life: 0.45,
        gravity: 0.1
      });
    }
  }

  // Impacto de galhos, pedras ou ferro quebrando
  emitDebrisImpact(x, y, color = '#78716c') {
    for (let i = 0; i < 14; i++) {
      this.emit(x, y, 1, {
        color,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 4 + 1.5,
        spread: Math.PI * 2,
        baseAngle: 0,
        life: 0.6,
        gravity: 0.25,
        shape: 'rect'
      });
    }
  }

  // Faíscas de ricochete na parede lateral bloqueada
  emitWallBounceSparks(x, y, color = '#38bdf8', isLeft = true) {
    this.emit(x, y, 10, {
      color,
      size: 3.5,
      speed: 4.2,
      spread: Math.PI * 0.7,
      baseAngle: isLeft ? 0 : Math.PI,
      life: 0.45,
      gravity: 0.12
    });
  }

  // Anel de partículas ao atravessar o portal lateral aberto
  emitPortalWarpBurst(x, y, color = '#a855f7') {
    this.emit(x, y, 14, {
      color,
      size: 4,
      speed: 3.6,
      spread: Math.PI * 2,
      baseAngle: 0,
      life: 0.6,
      gravity: 0
    });
  }

  // Estilhaços de escudo de bolha ao absorver impacto
  emitShieldBreak(x, y) {
    for (let i = 0; i < 18; i++) {
      this.emit(x, y, 1, {
        color: Math.random() > 0.3 ? '#38bdf8' : '#e0f2fe',
        size: Math.random() * 4 + 2,
        speed: Math.random() * 5 + 2,
        spread: Math.PI * 2,
        baseAngle: 0,
        life: 0.55,
        gravity: 0.1,
        shape: 'rect'
      });
    }
  }

  // Explosão ao coletar Power-Up (Ímã, Escudo, Slowmo, Super Mola)
  emitPowerUpPickup(x, y, color = '#38bdf8') {
    this.emit(x, y, 16, {
      color,
      size: 4.5,
      speed: 4.5,
      spread: Math.PI * 2,
      baseAngle: 0,
      life: 0.65,
      gravity: 0.05
    });
  }

  // Bolhas e respingos de magma da lava ascendente
  emitLavaSpurt(x, y) {
    this.emit(x, y, 2, {
      color: Math.random() > 0.4 ? '#f97316' : '#fbbf24',
      size: Math.random() * 3.5 + 2,
      speed: Math.random() * 3 + 1.5,
      spread: Math.PI * 0.7,
      baseAngle: -Math.PI / 2, // Espirra para cima
      life: 0.5,
      gravity: 0.15
    });
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
