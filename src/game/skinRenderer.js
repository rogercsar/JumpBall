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

    // ==========================================
    // 6. HEROÍNAS, GUERREIRAS & PRINCESAS (16 SKINS)
    // ==========================================

    case 'barbie-chic': {
      // Barbie Fashion: Coração icônico, estrela dourada cintilante e laço rosa
      ctx.shadowColor = '#f472b6';
      ctx.shadowBlur = 10;

      // Coração no centro
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      const topY = -r * 0.15;
      ctx.moveTo(0, r * 0.35);
      ctx.bezierCurveTo(-r * 0.5, r * 0.05, -r * 0.5, -r * 0.4, 0, topY);
      ctx.bezierCurveTo(r * 0.5, -r * 0.4, r * 0.5, r * 0.05, 0, r * 0.35);
      ctx.fill();

      // Silhueta interna rosa vibrante
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.moveTo(0, r * 0.26);
      ctx.bezierCurveTo(-r * 0.38, 0, -r * 0.38, -r * 0.32, 0, -r * 0.1);
      ctx.bezierCurveTo(r * 0.38, -r * 0.32, r * 0.38, 0, 0, r * 0.26);
      ctx.fill();

      // Micro-estrelas douradas cintilantes
      ctx.fillStyle = '#fef08a';
      const drawStar = (x, y, s) => {
        ctx.beginPath();
        ctx.moveTo(x, y - s);
        ctx.lineTo(x + s * 0.3, y - s * 0.3);
        ctx.lineTo(x + s, y);
        ctx.lineTo(x + s * 0.3, y + s * 0.3);
        ctx.lineTo(x, y + s);
        ctx.lineTo(x - s * 0.3, y + s * 0.3);
        ctx.lineTo(x - s, y);
        ctx.lineTo(x - s * 0.3, y - s * 0.3);
        ctx.closePath();
        ctx.fill();
      };
      drawStar(r * 0.25, -r * 0.3, r * 0.16);
      drawStar(-r * 0.28, r * 0.2, r * 0.12);
      break;
    }

    case 'black-widow': {
      // Viúva Negra: Ampulheta vermelha luminosa e placas táticas de combate
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 12;

      // Anel tático de grafite
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
      ctx.stroke();

      // Ampulheta vermelha esculpida
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      // Triângulo superior
      ctx.moveTo(-r * 0.32, -r * 0.45);
      ctx.lineTo(r * 0.32, -r * 0.45);
      ctx.lineTo(0, -r * 0.02);
      ctx.closePath();
      ctx.fill();

      // Triângulo inferior
      ctx.beginPath();
      ctx.moveTo(0, r * 0.02);
      ctx.lineTo(r * 0.32, r * 0.45);
      ctx.lineTo(-r * 0.32, r * 0.45);
      ctx.closePath();
      ctx.fill();

      // Linha de mira central luminosa
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-r * 0.04, -r * 0.08, r * 0.08, r * 0.16);
      break;
    }

    case 'wonder-woman': {
      // Mulher-Maravilha: Tiara real dourada, estrela vermelha e Laço da Verdade
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;

      // Tiara real pontiaguda no topo
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(-r * 0.6, -r * 0.25);
      ctx.lineTo(0, -r * 0.55);
      ctx.lineTo(r * 0.6, -r * 0.25);
      ctx.lineTo(r * 0.45, -r * 0.15);
      ctx.lineTo(0, -r * 0.35);
      ctx.lineTo(-r * 0.45, -r * 0.15);
      ctx.closePath();
      ctx.fill();

      // Estrela vermelha central da tiara
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      const sc = -r * 0.35;
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = Math.cos(a) * r * 0.14;
        const y = sc + Math.sin(a) * r * 0.14;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Emblema com as asas em 'W' douradas
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, r * 0.05);
      ctx.lineTo(-r * 0.2, r * 0.35);
      ctx.lineTo(0, r * 0.1);
      ctx.lineTo(r * 0.2, r * 0.35);
      ctx.lineTo(r * 0.5, r * 0.05);
      ctx.stroke();
      break;
    }

    case 'moana-wayfinder': {
      // Moana: Espiral sagrada do Coração de Te Fiti e runas oceânicas
      ctx.shadowColor = '#22d3ee';
      ctx.shadowBlur = 10;

      // Amuleto de pedra polida
      ctx.fillStyle = '#065f46';
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.46, r * 0.52, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#047857';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Espiral sagrada de Te Fiti em turquesa incandescente
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      for (let theta = 0; theta < Math.PI * 4.5; theta += 0.15) {
        const radiusSp = (theta / (Math.PI * 4.5)) * r * 0.32;
        const x = Math.cos(theta) * radiusSp;
        const y = Math.sin(theta) * radiusSp;
        if (theta === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Ponto de luz no centro da espiral
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.07, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'elsa-frost': {
      // Elsa: Floco de neve cristalino fractal e aura de gelo pura
      ctx.shadowColor = '#bae6fd';
      ctx.shadowBlur = 12;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      // 6 ramos do floco de neve
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        const cos = Math.cos(ang);
        const sin = Math.sin(ang);

        // Haste principal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(cos * r * 0.62, sin * r * 0.62);
        ctx.stroke();

        // Ramificações laterais
        const midR = r * 0.38;
        const mx = cos * midR;
        const my = sin * midR;
        const bAng1 = ang + Math.PI / 4;
        const bAng2 = ang - Math.PI / 4;

        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + Math.cos(bAng1) * r * 0.16, my + Math.sin(bAng1) * r * 0.16);
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + Math.cos(bAng2) * r * 0.16, my + Math.sin(bAng2) * r * 0.16);
        ctx.stroke();
      }

      // Diamante central
      ctx.fillStyle = '#7dd3fc';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.16);
      ctx.lineTo(r * 0.16, 0);
      ctx.lineTo(0, r * 0.16);
      ctx.lineTo(-r * 0.16, 0);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'mulan-warrior': {
      // Mulan: Flor de magnólia de jade e lâmina da espada ancestral
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 8;

      // Lâmina vertical de aço ancestral
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(-r * 0.05, -r * 0.65, r * 0.1, r * 1.3);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-r * 0.05, -r * 0.65, r * 0.05, r * 1.3);

      // Flor de Magnólia de Jade no centro
      ctx.fillStyle = '#6ee7b7';
      for (let i = 0; i < 5; i++) {
        const ang = (i * 2 * Math.PI) / 5;
        ctx.beginPath();
        ctx.ellipse(
          Math.cos(ang) * r * 0.22,
          Math.sin(ang) * r * 0.22,
          r * 0.16,
          r * 0.09,
          ang,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Núcleo dourado imperial da flor
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'harley-rebel': {
      // Arlequina: Bicolor (Rosa/Ciano), losangos de cartas e coração
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 8;

      // Divisão vertical sutil
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.65);
      ctx.lineTo(0, r * 0.65);
      ctx.stroke();

      // Losangos pretos e vermelhos (naipe de arlequim)
      const drawDiamond = (x, y, sz, col) => {
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(x, y - sz);
        ctx.lineTo(x + sz * 0.7, y);
        ctx.lineTo(x, y + sz);
        ctx.lineTo(x - sz * 0.7, y);
        ctx.closePath();
        ctx.fill();
      };

      drawDiamond(-r * 0.28, -r * 0.18, r * 0.2, '#0f172a');
      drawDiamond(r * 0.28, -r * 0.18, r * 0.2, '#ffffff');
      drawDiamond(0, r * 0.22, r * 0.22, '#ef4444');

      // Pequeno coração rebelde
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(-r * 0.06, -r * 0.38, r * 0.05, 0, Math.PI * 2);
      ctx.arc(r * 0.06, -r * 0.38, r * 0.05, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'storm-mutant': {
      // Tempestade: Relâmpagos bifurcados e olhos incandescentes celestiais
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;

      // Olhos brilhantes de poder cósmico
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(-r * 0.24, -r * 0.12, r * 0.16, r * 0.08, -0.15, 0, Math.PI * 2);
      ctx.ellipse(r * 0.24, -r * 0.12, r * 0.16, r * 0.08, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Grande raio bifurcado cortando a esfera
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.1, -r * 0.65);
      ctx.lineTo(r * 0.15, -r * 0.1);
      ctx.lineTo(-r * 0.08, r * 0.05);
      ctx.lineTo(r * 0.2, r * 0.65);
      ctx.stroke();

      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(r * 0.05, 0);
      ctx.lineTo(-r * 0.35, r * 0.3);
      ctx.stroke();
      break;
    }

    case 'scarlet-witch': {
      // Feiticeira Escarlate: Tiara/coroa da Feiticeira e orbes de magia do caos
      ctx.shadowColor = '#dc2626';
      ctx.shadowBlur = 12;

      // Tiara/Coroa pontiaguda icônica
      ctx.fillStyle = '#b91c1c';
      ctx.beginPath();
      ctx.moveTo(-r * 0.55, -r * 0.15);
      ctx.lineTo(-r * 0.35, -r * 0.55);
      ctx.lineTo(-r * 0.15, -r * 0.25);
      ctx.lineTo(0, -r * 0.62);
      ctx.lineTo(r * 0.15, -r * 0.25);
      ctx.lineTo(r * 0.35, -r * 0.55);
      ctx.lineTo(r * 0.55, -r * 0.15);
      ctx.lineTo(0, -r * 0.05);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbe de Magia do Caos cintilante
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(0, r * 0.22, r * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // Anel de distorção de realidade
      ctx.strokeStyle = '#fda4af';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(0, r * 0.22, r * 0.42, r * 0.15, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }

    case 'captain-marvel': {
      // Capitã Marvel: Estrela de 8 pontas de Hala e faixas diagonais
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;

      // Faixas douradas do uniforme Starforce
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.moveTo(-r * 0.6, r * 0.2);
      ctx.lineTo(0, -r * 0.1);
      ctx.lineTo(r * 0.6, r * 0.2);
      ctx.stroke();

      // Estrela de 8 pontas de Hala no centro
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        const outer = (i % 2 === 0) ? r * 0.42 : r * 0.18;
        const x = Math.cos(ang) * outer;
        const y = -r * 0.08 + Math.sin(ang) * outer;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Núcleo branco incandescente de energia binária
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, -r * 0.08, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'princess-peach': {
      // Princesa Peach: Coroa real dourada com rubis e amuleto turquesa
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;

      // Coroa dourada real
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.1);
      ctx.lineTo(-r * 0.45, -r * 0.45);
      ctx.lineTo(-r * 0.2, -r * 0.25);
      ctx.lineTo(0, -r * 0.55);
      ctx.lineTo(r * 0.2, -r * 0.25);
      ctx.lineTo(r * 0.45, -r * 0.45);
      ctx.lineTo(r * 0.45, -r * 0.1);
      ctx.closePath();
      ctx.fill();

      // Rubis da coroa
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(-r * 0.3, -r * 0.2, r * 0.06, 0, Math.PI * 2);
      ctx.arc(r * 0.3, -r * 0.2, r * 0.06, 0, Math.PI * 2);
      ctx.fill();

      // Joia/Amuleto turquesa oval no peito
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.ellipse(0, r * 0.22, r * 0.18, r * 0.24, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.6;
      ctx.stroke();
      break;
    }

    case 'rapunzel-magic': {
      // Rapunzel: Flor mágica do Sol de Corona e fios de luz dourada
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 10;

      // Fios de cabelo solar ondulando
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.58, -Math.PI * 0.6, Math.PI * 0.6);
      ctx.stroke();

      // Flor Dourada do Sol com 8 pétalas brilhantes
      ctx.fillStyle = '#fbbf24';
      for (let i = 0; i < 8; i++) {
        const ang = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.ellipse(
          Math.cos(ang) * r * 0.22,
          Math.sin(ang) * r * 0.22,
          r * 0.16,
          r * 0.07,
          ang,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Núcleo brilhante da flor solar
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.13, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'merida-brave': {
      // Merida: Arco e flecha dourados e labareda mágica de fogo-fátuo
      ctx.shadowColor = '#ea580c';
      ctx.shadowBlur = 8;

      // Arco curvo de teixo celta
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.arc(-r * 0.15, 0, r * 0.48, -Math.PI * 0.45, Math.PI * 0.45);
      ctx.stroke();

      // Corda do arco esticada
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(r * 0.22, -r * 0.38);
      ctx.lineTo(-r * 0.15, 0);
      ctx.lineTo(r * 0.22, r * 0.38);
      ctx.stroke();

      // Flecha de mira apontando para a direita
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.15, 0);
      ctx.lineTo(r * 0.48, 0);
      ctx.stroke();

      // Ponta de flecha triangular
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.moveTo(r * 0.58, 0);
      ctx.lineTo(r * 0.42, -r * 0.1);
      ctx.lineTo(r * 0.42, r * 0.1);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'ahsoka-tano': {
      // Ahsoka: Padrões geométricos Togruta azuis e brancos e sabres duplos
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;

      // Montrais listrados no topo (listras azuis e brancas)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, -r * 0.45);
      ctx.lineTo(0, -r * 0.15);
      ctx.lineTo(r * 0.5, -r * 0.45);
      ctx.lineTo(0, -r * 0.62);
      ctx.closePath();
      ctx.fill();

      // Listras azuis nos montrais
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(-r * 0.35, -r * 0.45);
      ctx.lineTo(-r * 0.2, -r * 0.25);
      ctx.lineTo(-r * 0.1, -r * 0.32);
      ctx.lineTo(-r * 0.25, -r * 0.52);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(r * 0.35, -r * 0.45);
      ctx.lineTo(r * 0.2, -r * 0.25);
      ctx.lineTo(r * 0.1, -r * 0.32);
      ctx.lineTo(r * 0.25, -r * 0.52);
      ctx.closePath();
      ctx.fill();

      // Sabres de luz brancos puros cruzados
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.4;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(-r * 0.38, r * 0.38); ctx.lineTo(r * 0.28, -r * 0.05);
      ctx.moveTo(r * 0.38, r * 0.38); ctx.lineTo(-r * 0.28, -r * 0.05);
      ctx.stroke();
      break;
    }

    case 'lara-croft': {
      // Lara Croft: Bússola arcaica aventureira e coldres táticos
      ctx.shadowColor = '#d97706';
      ctx.shadowBlur = 8;

      // Bússola redonda de bronze
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.48, 0, Math.PI * 2);
      ctx.stroke();

      // Ponteiro Norte/Sul da bússola
      ctx.fillStyle = '#ef4444'; // Norte vermelho
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.42);
      ctx.lineTo(r * 0.12, 0);
      ctx.lineTo(-r * 0.12, 0);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#e2e8f0'; // Sul branco
      ctx.beginPath();
      ctx.moveTo(0, r * 0.42);
      ctx.lineTo(r * 0.12, 0);
      ctx.lineTo(-r * 0.12, 0);
      ctx.closePath();
      ctx.fill();

      // Parafuso central da bússola
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.08, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'gamora-blade': {
      // Gamora: Marcas faciais alienígenas prateadas e lâmina Godslayer
      ctx.shadowColor = '#cbd5e1';
      ctx.shadowBlur = 8;

      // Marcas faciais prateadas simétricas acima dos olhos
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.25);
      ctx.lineTo(-r * 0.15, -r * 0.2);
      ctx.lineTo(-r * 0.1, -r * 0.4);

      ctx.moveTo(r * 0.45, -r * 0.25);
      ctx.lineTo(r * 0.15, -r * 0.2);
      ctx.lineTo(r * 0.1, -r * 0.4);
      ctx.stroke();

      // Lâmina Godslayer no peito
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.1);
      ctx.lineTo(r * 0.15, r * 0.48);
      ctx.lineTo(0, r * 0.4);
      ctx.lineTo(-r * 0.15, r * 0.48);
      ctx.closePath();
      ctx.fill();

      // Guarda e cabo dourado da lâmina
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-r * 0.12, -r * 0.05, r * 0.24, r * 0.06);
      break;
    }

    // ==========================================
    // PROFISSÕES & MESTRES DAS NOVAS FASES
    // ==========================================

    case 'chef-gourmet': {
      // Chapéu de Chef (Toque Blanche)
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.2;

      // Topo fofo do chapéu
      ctx.beginPath();
      ctx.arc(-r * 0.25, -r * 0.35, r * 0.18, 0, Math.PI * 2);
      ctx.arc(0, -r * 0.45, r * 0.22, 0, Math.PI * 2);
      ctx.arc(r * 0.25, -r * 0.35, r * 0.18, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Faixa da base do chapéu
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(-r * 0.35, -r * 0.22, r * 0.7, r * 0.12);
      ctx.strokeRect(-r * 0.35, -r * 0.22, r * 0.7, r * 0.12);

      // Bigodinho francês curvo
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(0, r * 0.05);
      ctx.bezierCurveTo(-r * 0.15, 0, -r * 0.3, r * 0.12, -r * 0.35, r * 0.05);
      ctx.bezierCurveTo(-r * 0.25, r * 0.18, -r * 0.08, r * 0.15, 0, r * 0.1);
      ctx.bezierCurveTo(r * 0.08, r * 0.15, r * 0.25, r * 0.18, r * 0.35, r * 0.05);
      ctx.bezierCurveTo(r * 0.3, r * 0.12, r * 0.15, 0, 0, r * 0.05);
      ctx.fill();

      // Colher de ouro cruzada no peito
      ctx.save();
      ctx.rotate(0.35);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(r * 0.05, r * 0.35, r * 0.08, r * 0.14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(r * 0.03, r * 0.15, r * 0.04, r * 0.22);
      ctx.restore();
      break;
    }

    case 'medic-vital': {
      // Estetoscópio curvo metálico
      ctx.strokeStyle = '#0d9488';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, -r * 0.05, r * 0.42, 0.2 * Math.PI, 0.8 * Math.PI, false);
      ctx.stroke();

      // Olivas do estetoscópio
      ctx.fillStyle = '#14b8a6';
      ctx.beginPath();
      ctx.arc(-r * 0.35, -r * 0.18, r * 0.06, 0, Math.PI * 2);
      ctx.arc(r * 0.35, -r * 0.18, r * 0.06, 0, Math.PI * 2);
      ctx.fill();

      // Campânula central do estetoscópio
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#0d9488';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, r * 0.38, r * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Cruz médica luminosa central
      ctx.shadowColor = '#14b8a6';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#ef4444';
      // Barra horizontal
      ctx.fillRect(-r * 0.28, -r * 0.04, r * 0.56, r * 0.12);
      // Barra vertical
      ctx.fillRect(-r * 0.06, -r * 0.26, r * 0.12, r * 0.56);

      // Miolo brilhante da cruz
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-r * 0.04, -r * 0.02, r * 0.08, r * 0.08);
      break;
    }

    case 'archaeo-hunter': {
      // Chapéu Fedora de Couro
      ctx.fillStyle = '#78350f';
      ctx.strokeStyle = '#451a03';
      ctx.lineWidth = 1.5;

      // Copa do chapéu
      ctx.beginPath();
      ctx.moveTo(-r * 0.38, -r * 0.15);
      ctx.bezierCurveTo(-r * 0.3, -r * 0.55, r * 0.3, -r * 0.55, r * 0.38, -r * 0.15);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Dobra característica no topo do fedora
      ctx.fillStyle = '#54240b';
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.42, r * 0.16, r * 0.05, 0, 0, Math.PI * 2);
      ctx.fill();

      // Aba curva larga do chapéu
      ctx.fillStyle = '#92400e';
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.12, r * 0.56, r * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Faixa de couro do chapéu com fivela dourada
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(-r * 0.36, -r * 0.18, r * 0.72, r * 0.06);
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-r * 0.06, -r * 0.2, r * 0.12, r * 0.1);

      // Bússola dourada no peito
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 6;
      ctx.fillStyle = '#fef3c7';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, r * 0.25, r * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ponteiro vermelho da bússola
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(0, r * 0.08);
      ctx.lineTo(r * 0.05, r * 0.25);
      ctx.lineTo(-r * 0.05, r * 0.25);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#0284c7';
      ctx.beginPath();
      ctx.moveTo(0, r * 0.42);
      ctx.lineTo(r * 0.05, r * 0.25);
      ctx.lineTo(-r * 0.05, r * 0.25);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 'sheriff-west': {
      // Bandana vermelha do velho oeste
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, r * 0.05);
      ctx.lineTo(r * 0.45, r * 0.05);
      ctx.lineTo(0, r * 0.52);
      ctx.closePath();
      ctx.fill();

      // Dobras da bandana
      ctx.strokeStyle = '#991b1b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-r * 0.2, r * 0.15);
      ctx.lineTo(0, r * 0.38);
      ctx.lineTo(r * 0.2, r * 0.15);
      ctx.stroke();

      // Estrela dourada de 6 pontas de Xerife
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1.5;

      const starPoints = 6;
      const outerR = r * 0.28;
      const innerR = r * 0.14;
      const centerY = -r * 0.12;

      ctx.beginPath();
      for (let i = 0; i < starPoints * 2; i++) {
        const rad = (Math.PI / starPoints) * i - Math.PI / 2;
        const radius = i % 2 === 0 ? outerR : innerR;
        const px = Math.cos(rad) * radius;
        const py = centerY + Math.sin(rad) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Círculos nas pontas da estrela de xerife
      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < starPoints; i++) {
        const rad = ((2 * Math.PI) / starPoints) * i - Math.PI / 2;
        const px = Math.cos(rad) * outerR;
        const py = centerY + Math.sin(rad) * outerR;
        ctx.beginPath();
        ctx.arc(px, py, r * 0.04, 0, Math.PI * 2);
        ctx.fill();
      }

      // Relevo central da estrela
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, centerY, r * 0.05, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'cyborg-neon': {
      // Placas cibernéticas metálicas na face
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(-r * 0.5, -r * 0.25, r * 1.0, r * 0.45);

      // Trilhas de circuitos integrados neon
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-r * 0.45, -r * 0.35);
      ctx.lineTo(-r * 0.25, -r * 0.35);
      ctx.lineTo(-r * 0.15, -r * 0.25);
      ctx.moveTo(r * 0.45, -r * 0.35);
      ctx.lineTo(r * 0.25, -r * 0.35);
      ctx.lineTo(r * 0.15, -r * 0.25);
      ctx.moveTo(-r * 0.4, r * 0.3);
      ctx.lineTo(-r * 0.2, r * 0.3);
      ctx.lineTo(-r * 0.1, r * 0.2);
      ctx.stroke();

      // Visor holográfico visor-visor neon
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      const visorGrad = ctx.createLinearGradient(-r * 0.45, 0, r * 0.45, 0);
      visorGrad.addColorStop(0, '#06b6d4');
      visorGrad.addColorStop(0.5, '#d946ef');
      visorGrad.addColorStop(1, '#06b6d4');

      ctx.fillStyle = visorGrad;
      ctx.beginPath();
      ctx.roundRect(-r * 0.48, -r * 0.12, r * 0.96, r * 0.22, [r * 0.08]);
      ctx.fill();

      // Scanline brilhante no centro do visor
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-r * 0.42, -r * 0.04, r * 0.84, r * 0.05);

      // Luzes LED laterais
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(-r * 0.38, r * 0.26, r * 0.04, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(-r * 0.28, r * 0.26, r * 0.04, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 'olympic-pro': {
      // Faixa atlética esportiva de cabeça (Headband)
      ctx.fillStyle = '#1e3a8a';
      ctx.fillRect(-r * 0.52, -r * 0.38, r * 1.04, r * 0.18);
      // Listras da faixa
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-r * 0.52, -r * 0.33, r * 1.04, r * 0.04);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-r * 0.52, -r * 0.29, r * 1.04, r * 0.04);

      // Óculos esportivos espelhados aerodinâmicos
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      const glassesGrad = ctx.createLinearGradient(0, -r * 0.16, 0, r * 0.08);
      glassesGrad.addColorStop(0, '#f59e0b');
      glassesGrad.addColorStop(0.5, '#ef4444');
      glassesGrad.addColorStop(1, '#a855f7');

      ctx.fillStyle = glassesGrad;
      ctx.beginPath();
      // Lente esquerda
      ctx.roundRect(-r * 0.46, -r * 0.16, r * 0.42, r * 0.2, [r * 0.06]);
      // Lente direita
      ctx.roundRect(r * 0.04, -r * 0.16, r * 0.42, r * 0.2, [r * 0.06]);
      ctx.fill();

      // Ponte nasal dos óculos
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(-r * 0.06, -r * 0.1, r * 0.12, r * 0.06);

      // Fita e Medalha de Ouro Olímpica
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-r * 0.18, r * 0.12);
      ctx.lineTo(0, r * 0.32);
      ctx.lineTo(r * 0.18, r * 0.12);
      ctx.stroke();

      // Medalha de ouro
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, r * 0.36, r * 0.14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Estrela / louro dentro da medalha
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, r * 0.36, r * 0.05, 0, Math.PI * 2);
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
