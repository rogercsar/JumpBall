/**
 * SkinRenderer — Motor de Renderização Vetorial Hiper-Personalizado para as 28 Skins do JumpBall
 * Desenha todas as esferas com volumetria 3D, iluminação dinâmica, insígnias temáticas,
 * máscaras de heróis, visores de astronautas e detalhes de alta fidelidade em Canvas 2D.
 */

import { BALL_SKINS } from './stages';

// Dicionário rápido de busca por ID
const SKINS_MAP = {};
BALL_SKINS.forEach(s => {
  SKINS_MAP[s.id] = s;
});

/**
 * Desenha os detalhes da insígnia/emblema específico de cada skin no centro da esfera
 */
function drawSkinEmblem(ctx, skinId, r) {
  ctx.save();

  switch (skinId) {
    // ==========================================
    // 1. HERÓIS
    // ==========================================

    case 'iron-hero': {
      // Homem de Ferro: Placas douradas e Reator Arc triangular luminoso
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.moveTo(-r * 0.55, -r * 0.4);
      ctx.lineTo(r * 0.55, -r * 0.4);
      ctx.lineTo(r * 0.4, r * 0.5);
      ctx.lineTo(-r * 0.4, r * 0.5);
      ctx.closePath();
      ctx.fill();

      // Olhos do elmo
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-r * 0.35, -r * 0.15, r * 0.22, r * 0.08);
      ctx.fillRect(r * 0.13, -r * 0.15, r * 0.22, r * 0.08);

      // Reator Arc no peito / centro
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, r * 0.12, r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Triângulo interno do reator
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(0, r * 0.02);
      ctx.lineTo(r * 0.12, r * 0.22);
      ctx.lineTo(-r * 0.12, r * 0.22);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'spider-hero': {
      // Homem-Aranha: Teias esculpidas e Lentes brancas anguladas
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.lineWidth = 1.2;

      // Linhas da teia radiando do centro
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(ang) * r * 0.9, Math.sin(ang) * r * 0.9);
        ctx.stroke();
      }

      // Anéis de teia
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.75, 0, Math.PI * 2);
      ctx.stroke();

      // Lentes da máscara (olhos triangulares angulados)
      const drawEye = (flip) => {
        ctx.save();
        ctx.scale(flip ? -1 : 1, 1);
        ctx.fillStyle = '#0f172a'; // Contorno preto grosso
        ctx.beginPath();
        ctx.moveTo(-r * 0.1, -r * 0.35);
        ctx.lineTo(-r * 0.52, -r * 0.1);
        ctx.lineTo(-r * 0.2, r * 0.25);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff'; // Interior branco brilhante
        ctx.beginPath();
        ctx.moveTo(-r * 0.14, -r * 0.3);
        ctx.lineTo(-r * 0.46, -r * 0.1);
        ctx.lineTo(-r * 0.22, r * 0.18);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };
      drawEye(false);
      drawEye(true);
      break;
    }

    case 'super-steel': {
      // Superman: Brasão diamante de aço com 'S' heróico
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 6;

      // Escudo pentagonal de diamante
      ctx.fillStyle = '#facc15';
      ctx.strokeStyle = '#b91c1c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.55);
      ctx.lineTo(r * 0.55, -r * 0.18);
      ctx.lineTo(r * 0.38, r * 0.48);
      ctx.lineTo(0, r * 0.65);
      ctx.lineTo(-r * 0.38, r * 0.48);
      ctx.lineTo(-r * 0.55, -r * 0.18);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Emblema 'S' em vermelho heróico
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-r * 0.25, -r * 0.3);
      ctx.lineTo(r * 0.25, -r * 0.3);
      ctx.lineTo(r * 0.25, -r * 0.12);
      ctx.lineTo(-r * 0.15, -r * 0.02);
      ctx.lineTo(r * 0.25, r * 0.12);
      ctx.lineTo(r * 0.25, r * 0.38);
      ctx.lineTo(-r * 0.25, r * 0.38);
      ctx.lineTo(-r * 0.25, r * 0.2);
      ctx.lineTo(r * 0.15, r * 0.1);
      ctx.lineTo(-r * 0.25, 0);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'dark-bat': {
      // Batman: Insígnia do Morcego estilizado sobre elipse dourada
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.62, r * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();

      // Morcego preto afiado
      ctx.fillStyle = '#09090b';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.2); // cabeça
      ctx.lineTo(r * 0.08, -r * 0.3); // orelha dir
      ctx.lineTo(r * 0.14, -r * 0.18);
      ctx.lineTo(r * 0.48, -r * 0.25); // ponta asa dir
      ctx.lineTo(r * 0.38, 0);
      ctx.lineTo(r * 0.45, r * 0.2);
      ctx.lineTo(r * 0.22, r * 0.1);
      ctx.lineTo(r * 0.12, r * 0.32); // cauda dir
      ctx.lineTo(0, r * 0.18); // ponta cauda centro
      ctx.lineTo(-r * 0.12, r * 0.32); // cauda esq
      ctx.lineTo(-r * 0.22, r * 0.1);
      ctx.lineTo(-r * 0.45, r * 0.2);
      ctx.lineTo(-r * 0.38, 0);
      ctx.lineTo(-r * 0.48, -r * 0.25); // ponta asa esq
      ctx.lineTo(-r * 0.14, -r * 0.18);
      ctx.lineTo(-r * 0.08, -r * 0.3); // orelha esq
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'thunder-god': {
      // Thor: Martelo Mjolnir prateado e relâmpagos
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.5);
      ctx.lineTo(-r * 0.15, -r * 0.1);
      ctx.lineTo(-r * 0.3, 0);
      ctx.lineTo(0, r * 0.55);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(r * 0.45, -r * 0.5);
      ctx.lineTo(r * 0.15, -r * 0.1);
      ctx.lineTo(r * 0.3, 0);
      ctx.lineTo(0, r * 0.55);
      ctx.stroke();

      // Bloco do martelo Mjolnir
      ctx.fillStyle = '#e2e8f0';
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.fillRect(-r * 0.32, -r * 0.28, r * 0.64, r * 0.32);
      ctx.strokeRect(-r * 0.32, -r * 0.28, r * 0.64, r * 0.32);

      // Cabo do martelo
      ctx.fillStyle = '#78350f';
      ctx.fillRect(-r * 0.06, 0.04 * r, r * 0.12, r * 0.42);
      break;
    }

    case 'captain-shield': {
      // Capitão América: Escudo com anéis concêntricos e Estrela Prateada
      const rings = [
        { rRatio: 0.85, fill: '#dc2626' },
        { rRatio: 0.68, fill: '#f8fafc' },
        { rRatio: 0.50, fill: '#dc2626' },
        { rRatio: 0.32, fill: '#1d4ed8' }
      ];
      rings.forEach(ring => {
        ctx.fillStyle = ring.fill;
        ctx.beginPath();
        ctx.arc(0, 0, r * ring.rRatio, 0, Math.PI * 2);
        ctx.fill();
      });

      // Estrela central de 5 pontas
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAng = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = Math.cos(outerAng) * r * 0.25;
        const y = Math.sin(outerAng) * r * 0.25;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'wolverine-claw': {
      // Wolverine: Três cortes ferozes de garras de adamantium prateadas
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';

      [-0.26, 0, 0.26].forEach((offset, idx) => {
        ctx.beginPath();
        ctx.moveTo(offset * r - r * 0.15, -r * 0.6 + idx * 2);
        ctx.lineTo(offset * r + r * 0.15, r * 0.6 - idx * 2);
        ctx.stroke();
      });

      // Máscara com asas laterais pretas
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(-r * 0.55, -r * 0.5);
      ctx.lineTo(-r * 0.2, -r * 0.1);
      ctx.lineTo(-r * 0.55, r * 0.1);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(r * 0.55, -r * 0.5);
      ctx.lineTo(r * 0.2, -r * 0.1);
      ctx.lineTo(r * 0.55, r * 0.1);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'gamma-titan': {
      // Hulk Titã: Punho esmeralda titânico e fissuras de radiação gamma
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 10;

      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(-r * 0.6, -r * 0.2);
      ctx.lineTo(-r * 0.1, 0);
      ctx.lineTo(r * 0.6, -r * 0.3);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -r * 0.6);
      ctx.lineTo(-r * 0.1, 0);
      ctx.lineTo(0, r * 0.6);
      ctx.stroke();

      ctx.fillStyle = '#14532d';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'vibranium-panther': {
      // Pantera Negra: Colar de dentes pontiagudos de Vibranium violeta
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#e9d5ff';

      for (let i = 0; i < 7; i++) {
        const ang = ((i - 3) * 0.32) + Math.PI / 2;
        const cx = Math.cos(ang) * r * 0.55;
        const cy = Math.sin(ang) * r * 0.55;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ang + Math.PI / 2);
        ctx.beginPath();
        ctx.moveTo(-r * 0.08, -r * 0.12);
        ctx.lineTo(r * 0.08, -r * 0.12);
        ctx.lineTo(0, r * 0.14);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      ctx.fillStyle = '#c084fc';
      ctx.fillRect(-r * 0.3, -r * 0.2, r * 0.18, r * 0.08);
      ctx.fillRect(r * 0.12, -r * 0.2, r * 0.18, r * 0.08);
      break;
    }

    case 'speed-lightning': {
      // Flash Velocista: Círculo branco com Raio zig-zag veloz
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.42, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.moveTo(r * 0.12, -r * 0.45);
      ctx.lineTo(-r * 0.22, 0);
      ctx.lineTo(-r * 0.02, 0);
      ctx.lineTo(-r * 0.18, r * 0.45);
      ctx.lineTo(r * 0.24, -r * 0.05);
      ctx.lineTo(0.04 * r, -r * 0.05);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'red-mercenary': {
      // Deadpool: Manchas ovais pretas com olhos brancos estilizados
      const drawDeadpoolEye = (flip) => {
        ctx.save();
        ctx.scale(flip ? -1 : 1, 1);
        ctx.fillStyle = '#0f172a';
        ctx.beginPath();
        ctx.ellipse(-r * 0.28, -r * 0.05, r * 0.28, r * 0.38, 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(-r * 0.15, -r * 0.1);
        ctx.lineTo(-r * 0.38, -r * 0.05);
        ctx.lineTo(-r * 0.2, 0.08 * r);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };
      drawDeadpoolEye(false);
      drawDeadpoolEye(true);
      break;
    }

    case 'mystic-supreme': {
      // Doutor Estranho: Olho de Agamotto e Mandalas Místicas
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 1.4;

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeRect(-r * 0.35, -r * 0.35, r * 0.7, r * 0.7);

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.28, r * 0.16, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#15803d';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 2. FORÇAS MILITARES & TÁTICAS
    // ==========================================

    case 'army-camo': {
      // Camuflagem Militar: Manchas táticas e Estrela Branca do Exército
      ctx.fillStyle = 'rgba(21, 128, 61, 0.45)';
      ctx.beginPath();
      ctx.arc(-r * 0.3, -r * 0.2, r * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(r * 0.35, r * 0.25, r * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const outerAng = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = Math.cos(outerAng) * r * 0.24;
        const y = Math.sin(outerAng) * r * 0.24;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'tactical-specops': {
      // Força Especial: Mira Crosshair Tática HUD e Chevron militar
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.4;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-r * 0.6, 0); ctx.lineTo(-r * 0.2, 0);
      ctx.moveTo(r * 0.2, 0); ctx.lineTo(r * 0.6, 0);
      ctx.moveTo(0, -r * 0.6); ctx.lineTo(0, -r * 0.2);
      ctx.moveTo(0, r * 0.2); ctx.lineTo(0, r * 0.6);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.08, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'stealth-pilot': {
      // Piloto Stealth: Caça bombardeiro em delta e HUD âmbar
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 6;

      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.55);
      ctx.lineTo(r * 0.55, r * 0.35);
      ctx.lineTo(0, r * 0.15);
      ctx.lineTo(-r * 0.55, r * 0.35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.12, r * 0.1, r * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 3. ESPAÇO & ASTRONAUTAS
    // ==========================================

    case 'apollo-astronaut': {
      // Astronauta Apollo: Viseira espacial dourada espelhada com reflexo curvo
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.62, 0, Math.PI * 2);
      ctx.fill();

      const visorGrad = ctx.createLinearGradient(0, -r * 0.5, 0, r * 0.5);
      visorGrad.addColorStop(0, '#fef08a');
      visorGrad.addColorStop(0.5, '#f59e0b');
      visorGrad.addColorStop(1, '#b45309');
      ctx.fillStyle = visorGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.52, r * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.ellipse(-r * 0.16, -r * 0.16, r * 0.2, r * 0.08, -0.4, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'void-cosmonaut': {
      // Cosmonauta do Vazio: Visor de nebulosa azul ciano cósmica e anéis orbitais
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.72, r * 0.25, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#030712';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.42, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      [[-0.15, -0.1], [0.1, 0.12], [-0.05, 0.2], [0.2, -0.15]].forEach(([sx, sy]) => {
        ctx.beginPath();
        ctx.arc(sx * r, sy * r, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      break;
    }

    case 'cyber-shinobi': {
      // Ninja Cibernético: Shuriken afiado e visor de neon
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 8;

      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.55);
      ctx.lineTo(r * 0.12, -r * 0.12);
      ctx.lineTo(r * 0.55, 0);
      ctx.lineTo(r * 0.12, r * 0.12);
      ctx.lineTo(0, r * 0.55);
      ctx.lineTo(-r * 0.12, r * 0.12);
      ctx.lineTo(-r * 0.55, 0);
      ctx.lineTo(-r * 0.12, -r * 0.12);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#09090b';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    // ==========================================
    // 4. GUERREIROS & LENDÁRIAS
    // ==========================================

    case 'spartan-gladiator': {
      // Gladiador Espartano: Elmo coríntio com penacho escarlate
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-r * 0.15, -r * 0.65);
      ctx.lineTo(r * 0.15, -r * 0.65);
      ctx.lineTo(r * 0.08, -r * 0.25);
      ctx.lineTo(-r * 0.08, -r * 0.25);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#d97706';
      ctx.strokeStyle = '#fde68a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.42, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-r * 0.25, -r * 0.12, r * 0.5, r * 0.08);
      ctx.fillRect(-r * 0.06, -r * 0.12, r * 0.12, r * 0.38);
      break;
    }

    case 'solar-ronin': {
      // Samurai Solar: Máscara Kabuto e Sol Nascente
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * r * 0.3, Math.sin(ang) * r * 0.3);
        ctx.lineTo(Math.cos(ang) * r * 0.55, Math.sin(ang) * r * 0.55);
        ctx.stroke();
      }

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-r * 0.35, -r * 0.35); ctx.lineTo(r * 0.35, r * 0.35);
      ctx.moveTo(r * 0.35, -r * 0.35); ctx.lineTo(-r * 0.35, r * 0.35);
      ctx.stroke();
      break;
    }

    case 'space-corsair': {
      // Corsário Espacial: Caveira pirata espacial com tapa-olho neon
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(0, -r * 0.08, r * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-r * 0.16, r * 0.08, r * 0.32, r * 0.18);

      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.arc(r * 0.12, -r * 0.08, r * 0.08, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(-r * 0.12, -r * 0.08, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'god-slayer': {
      // Deus do Olimpo: Coroa de louros triunfal e raio divino
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 10;

      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.52, -Math.PI * 0.8, Math.PI * 0.8);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(r * 0.08, -r * 0.5);
      ctx.lineTo(-r * 0.15, 0);
      ctx.lineTo(0, 0);
      ctx.lineTo(-r * 0.1, r * 0.5);
      ctx.lineTo(r * 0.18, 0);
      ctx.lineTo(0.04 * r, 0);
      ctx.closePath();
      ctx.fill();
      break;
    }

    // ==========================================
    // 5. INICIAIS CLÁSSICAS
    // ==========================================

    case 'neon-cyan': {
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#67e8f9';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'plasma-pink': {
      ctx.shadowColor = '#fb7185';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#fb7185';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, 0); ctx.lineTo(r * 0.5, 0);
      ctx.moveTo(0, -r * 0.5); ctx.lineTo(0, r * 0.5);
      ctx.stroke();
      break;
    }

    case 'solar-gold': {
      ctx.shadowColor = '#fde047';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#fde047';
      ctx.lineWidth = 1.8;
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(Math.cos(ang) * r * 0.3, Math.sin(ang) * r * 0.3);
        ctx.lineTo(Math.cos(ang) * r * 0.65, Math.sin(ang) * r * 0.65);
        ctx.stroke();
      }
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'matrix-green': {
      ctx.shadowColor = '#86efac';
      ctx.shadowBlur = 6;
      ctx.strokeStyle = '#86efac';
      ctx.lineWidth = 1.4;
      ctx.strokeRect(-r * 0.3, -r * 0.3, r * 0.6, r * 0.6);

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.15, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'cosmic-purple': {
      ctx.shadowColor = '#d8b4fe';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#d8b4fe';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.55, r * 0.25, Math.PI / 4, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'fireball': {
      ctx.shadowColor = '#fdba74';
      ctx.shadowBlur = 8;
      ctx.strokeStyle = '#fdba74';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.2);
      ctx.lineTo(0, r * 0.1);
      ctx.lineTo(r * 0.45, -r * 0.1);
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    default:
      break;
  }

  ctx.restore();
}

/**
 * Renderiza uma esfera completa do JumpBall com gradiente volumétrico 3D,
 * contorno de neon brilhante, reflexo de lente e a insígnia detalhada da skin.
 * 
 * @param {CanvasRenderingContext2D} ctx - Contexto Canvas 2D
 * @param {string} skinId - Identificador único da skin
 * @param {number} x - Posição X de centro
 * @param {number} y - Posição Y de centro
 * @param {number} radius - Raio da esfera
 * @param {Object} options - Parâmetros opcionais (angle, stretchX, stretchY, isMobile, shadow)
 */
export function drawBallSkin(ctx, skinId, x, y, radius, options = {}) {
  const skin = SKINS_MAP[skinId] || BALL_SKINS[0];
  const angle = options.angle || 0;
  const stretchX = options.stretchX !== undefined ? options.stretchX : 1;
  const stretchY = options.stretchY !== undefined ? options.stretchY : 1;
  const showGlow = options.shadow !== false;

  ctx.save();
  ctx.translate(x, y);

  if (angle !== 0) {
    ctx.rotate(angle);
  }
  if (stretchX !== 1 || stretchY !== 1) {
    ctx.scale(stretchX, stretchY);
  }

  // 1. Glow externo de neon
  if (showGlow) {
    ctx.shadowColor = skin.glow;
    ctx.shadowBlur = options.shadowBlur || (radius > 20 ? 16 : 10);
  }

  // 2. Esfera base com gradiente esférico 3D
  const grad = ctx.createRadialGradient(
    -radius * 0.35, -radius * 0.35, radius * 0.1,
    0, 0, radius
  );
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.35, skin.primary);
  grad.addColorStop(1, skin.trail);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // 3. Contorno estilizado brilhante
  ctx.strokeStyle = skin.glow;
  ctx.lineWidth = radius > 20 ? 2.2 : 1.5;
  ctx.stroke();

  // 4. Desenho vetorial da insígnia / detalhes específicos da skin
  drawSkinEmblem(ctx, skin.id, radius);

  // 5. Brilho especular translúcido de topo (lente de vidro)
  ctx.save();
  ctx.shadowBlur = 0;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.ellipse(-radius * 0.3, -radius * 0.32, radius * 0.28, radius * 0.14, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore();
}
