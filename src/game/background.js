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

    // 10. Espaço: Estrelas cintilantes e estrelas cadentes
    else if (this.theme === 'space') {
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
  }

  update(dt = 1) {
    this.time += 0.02 * dt;

    // Atualiza relâmpagos no tema tempestade
    if (this.theme === 'thunder') {
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
    bgGrad.addColorStop(0, this.stage.bgGradient[0]);
    bgGrad.addColorStop(0.5, this.stage.bgGradient[1]);
    bgGrad.addColorStop(1, this.stage.bgGradient[2]);
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
      case 'space':
        this.drawSpace(ctx, cameraY);
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

      // Partículas com Pulso Luminoso (Floresta, Vulcão, Cristal)
      if (p.pulse !== undefined) {
        const alpha = Math.sin(p.pulse) * 0.35 + 0.65;
        ctx.fillStyle = p.color ? `${p.color} ${alpha})` : p.glowColor || '#ffffff';
        ctx.shadowColor = p.glowColor || '#22c55e';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // Bolhas do Oceano
      else if (p.wobble !== undefined && this.theme === 'ocean') {
        ctx.strokeStyle = `rgba(103, 232, 249, ${p.opacity})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.stroke();
      }
      // Estrelas Cintilantes do Espaço
      else if (p.twinkle !== undefined) {
        const alpha = Math.sin(p.twinkle) * 0.45 + 0.55;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      // Chuva Cyberpunk
      else if (p.len !== undefined) {
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, py);
        ctx.lineTo(p.x + p.speedX * 3, py + p.len);
        ctx.stroke();
      }
      // Poeira / Neve Padrão
      else {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity || 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}
