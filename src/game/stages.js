import { HERO_WORLDS, HERO_STAGES } from './stagesDataHero';
import { FREE_WORLDS, FREE_STAGES } from './stagesDataFree';

export const MAX_HERO_STAGES = 150;
export const MAX_FREE_STAGES = 150;
export const MAX_STAGES = 150;

// Exportações padrão e retrocompatíveis
export const WORLDS = HERO_WORLDS;
export const STAGES = HERO_STAGES;
export { HERO_WORLDS, HERO_STAGES, FREE_WORLDS, FREE_STAGES };

/**
 * Retorna as fases configuradas de acordo com o modo de jogo
 * @param {'hero' | 'free'} mode
 * @returns {Array} Lista das 150 fases
 */
export function getStagesForMode(mode = 'hero') {
  if (mode === 'free') {
    return FREE_STAGES;
  }
  return HERO_STAGES;
}

/**
 * Retorna os 30 mundos temáticos de acordo com o modo de jogo
 * @param {'hero' | 'free'} mode
 * @returns {Array} Lista dos 30 mundos
 */
export function getWorldsForMode(mode = 'hero') {
  if (mode === 'free') {
    return FREE_WORLDS;
  }
  return HERO_WORLDS;
}

export const BALL_SKINS = [
  // 6 Skins Iniciais (Gratuitas / Desbloqueadas)
  { id: 'neon-cyan', name: 'Esfera Neon', primary: '#06b6d4', glow: '#22d3ee', trail: '#0891b2', priceGems: 0, category: 'starter', tags: ['scifi', 'arcade', 'retro'] },
  { id: 'plasma-pink', name: 'Pulso Plasma', primary: '#f43f5e', glow: '#fb7185', trail: '#e11d48', priceGems: 0, category: 'starter', tags: ['fantasia', 'magia', 'arcade'] },
  { id: 'solar-gold', name: 'Sol de Hélio', primary: '#eab308', glow: '#fde047', trail: '#ca8a04', priceGems: 0, category: 'starter', tags: ['mitologia', 'heroes', 'desafio'] },
  { id: 'matrix-green', name: 'Córtex Matrix', primary: '#22c55e', glow: '#86efac', trail: '#16a34a', priceGems: 0, category: 'starter', tags: ['scifi', 'arcade', 'retro'] },
  { id: 'cosmic-purple', name: 'Nebulosa Roxa', primary: '#a855f7', glow: '#d8b4fe', trail: '#9333ea', priceGems: 0, category: 'starter', tags: ['scifi', 'espaco', 'magia'] },
  { id: 'fireball', name: 'Meteoro Ígneo', primary: '#f97316', glow: '#fdba74', trail: '#ea580c', priceGems: 0, category: 'starter', tags: ['desafio', 'volcano', 'natureza'] },

  // Forças Táticas & Militares (a partir de 160 💎)
  { id: 'army-camo', name: 'Camuflagem Militar', primary: '#4d7c0f', glow: '#84cc16', trail: '#365314', priceGems: 160, category: 'army', tags: ['army', 'aventura', 'guerreiras'] },
  { id: 'tactical-specops', name: 'Força Especial Tática', primary: '#1e293b', glow: '#64748b', trail: '#0f172a', priceGems: 180, category: 'army', tags: ['army', 'desafio', 'guerreiras'] },

  // Heróis Lendários
  { id: 'iron-hero', name: 'Homem de Ferro', primary: '#b91c1c', glow: '#facc15', trail: '#7f1d1d', priceGems: 200, category: 'heroes', tags: ['heroes', 'scifi', 'arcade'] },
  { id: 'spider-hero', name: 'Homem-Aranha', primary: '#dc2626', glow: '#38bdf8', trail: '#1d4ed8', priceGems: 200, category: 'heroes', tags: ['heroes', 'aventura', 'arcade'] },

  // Heróis
  { id: 'super-steel', name: 'Superman', primary: '#2563eb', glow: '#ef4444', trail: '#eab308', priceGems: 220, category: 'heroes', tags: ['heroes', 'scifi', 'mitologia'] },
  { id: 'dark-bat', name: 'Batman', primary: '#18181b', glow: '#eab308', trail: '#09090b', priceGems: 220, category: 'heroes', tags: ['heroes', 'desafio', 'aventura'] },

  // Heróis
  { id: 'thunder-god', name: 'Thor', primary: '#64748b', glow: '#60a5fa', trail: '#38bdf8', priceGems: 240, category: 'heroes', tags: ['heroes', 'mitologia', 'magia'] },
  { id: 'captain-shield', name: 'Capitão América', primary: '#1d4ed8', glow: '#ef4444', trail: '#f8fafc', priceGems: 240, category: 'heroes', tags: ['heroes', 'army', 'guerreiras'] },

  // Heróis
  { id: 'wolverine-claw', name: 'Wolverine', primary: '#eab308', glow: '#3b82f6', trail: '#854d0e', priceGems: 260, category: 'heroes', tags: ['heroes', 'desafio', 'guerreiras'] },
  { id: 'gamma-titan', name: 'Hulk Titã', primary: '#15803d', glow: '#4ade80', trail: '#166534', priceGems: 260, category: 'heroes', tags: ['heroes', 'desafio', 'natureza'] },

  // Heróis
  { id: 'vibranium-panther', name: 'Pantera Negra', primary: '#09090b', glow: '#c084fc', trail: '#6b21a8', priceGems: 280, category: 'heroes', tags: ['heroes', 'guerreiras', 'scifi'] },
  { id: 'speed-lightning', name: 'Flash Velocista', primary: '#dc2626', glow: '#fde047', trail: '#ca8a04', priceGems: 280, category: 'heroes', tags: ['heroes', 'scifi', 'arcade'] },

  // Heróis
  { id: 'red-mercenary', name: 'Deadpool', primary: '#e11d48', glow: '#475569', trail: '#881337', priceGems: 300, category: 'heroes', tags: ['heroes', 'arcade', 'desafio'] },
  { id: 'mystic-supreme', name: 'Doutor Estranho', primary: '#c2410c', glow: '#4ade80', trail: '#4338ca', priceGems: 300, category: 'heroes', tags: ['heroes', 'magia', 'fantasia'] },

  // Astronautas & Exploração Espacial
  { id: 'apollo-astronaut', name: 'Astronauta Apollo', primary: '#f8fafc', glow: '#fde047', trail: '#94a3b8', priceGems: 320, category: 'space', tags: ['scifi', 'espaco'] },
  { id: 'void-cosmonaut', name: 'Cosmonauta do Vazio', primary: '#0f172a', glow: '#06b6d4', trail: '#0284c7', priceGems: 320, category: 'space', tags: ['scifi', 'espaco', 'desafio'] },

  // Táticas Especiais
  { id: 'stealth-pilot', name: 'Piloto Stealth', primary: '#334155', glow: '#f59e0b', trail: '#1e293b', priceGems: 350, category: 'army', tags: ['army', 'scifi', 'guerreiras'] },
  { id: 'cyber-shinobi', name: 'Ninja Cibernético', primary: '#581c87', glow: '#22c55e', trail: '#3b0764', priceGems: 350, category: 'heroes', tags: ['heroes', 'retro', 'arcade', 'guerreiras'] },

  // Guerreiros Lendários
  { id: 'spartan-gladiator', name: 'Gladiador Espartano', primary: '#92400e', glow: '#f59e0b', trail: '#78350f', priceGems: 380, category: 'heroes', tags: ['mitologia', 'guerreiras', 'aventura', 'heroes'] },
  { id: 'solar-ronin', name: 'Samurai Solar', primary: '#be123c', glow: '#fbbf24', trail: '#881337', priceGems: 380, category: 'heroes', tags: ['mitologia', 'guerreiras', 'aventura'] },

  // Lendárias Cósmicas
  { id: 'space-corsair', name: 'Corsário Espacial', primary: '#1e1b4b', glow: '#10b981', trail: '#0f172a', priceGems: 420, category: 'space', tags: ['scifi', 'espaco', 'aventura'] },
  { id: 'god-slayer', name: 'Deus do Olimpo', primary: '#f59e0b', glow: '#ffffff', trail: '#d97706', priceGems: 450, category: 'heroes', tags: ['mitologia', 'heroes', 'desafio'] },

  // ==========================================
  // HEROÍNAS, GUERREIRAS & PRINCESAS (16 SKINS)
  // ==========================================
  { id: 'barbie-chic', name: 'Barbie Fashion', primary: '#ec4899', glow: '#facc15', trail: '#f472b6', priceGems: 200, category: 'heroines', tags: ['heroines', 'princesas', 'fantasia'] },
  { id: 'black-widow', name: 'Viúva Negra', primary: '#0f172a', glow: '#ef4444', trail: '#991b1b', priceGems: 220, category: 'heroines', tags: ['heroines', 'heroes', 'aventura', 'desafio'] },
  { id: 'wonder-woman', name: 'Mulher-Maravilha', primary: '#dc2626', glow: '#f59e0b', trail: '#2563eb', priceGems: 240, category: 'heroines', tags: ['heroines', 'heroes', 'guerreiras', 'mitologia'] },
  { id: 'moana-wayfinder', name: 'Moana Navegadora', primary: '#f97316', glow: '#06b6d4', trail: '#0284c7', priceGems: 220, category: 'heroines', tags: ['heroines', 'natureza', 'oceanos', 'aventura'] },
  { id: 'elsa-frost', name: 'Elsa Rainha do Gelo', primary: '#38bdf8', glow: '#ffffff', trail: '#7dd3fc', priceGems: 240, category: 'heroines', tags: ['heroines', 'fantasia', 'princesas', 'magia'] },
  { id: 'mulan-warrior', name: 'Mulan Guerreira', primary: '#be123c', glow: '#10b981', trail: '#881337', priceGems: 220, category: 'heroines', tags: ['heroines', 'guerreiras', 'aventura'] },
  { id: 'harley-rebel', name: 'Arlequina Caos', primary: '#f43f5e', glow: '#06b6d4', trail: '#1e293b', priceGems: 260, category: 'heroines', tags: ['heroines', 'heroes', 'desafio', 'arcade'] },
  { id: 'storm-mutant', name: 'Tempestade', primary: '#e2e8f0', glow: '#0ea5e9', trail: '#38bdf8', priceGems: 260, category: 'heroines', tags: ['heroines', 'heroes', 'magia', 'natureza'] },
  { id: 'scarlet-witch', name: 'Feiticeira Escarlate', primary: '#991b1b', glow: '#f43f5e', trail: '#dc2626', priceGems: 280, category: 'heroines', tags: ['heroines', 'heroes', 'magia', 'fantasia'] },
  { id: 'captain-marvel', name: 'Capitã Marvel', primary: '#1e3a8a', glow: '#f59e0b', trail: '#dc2626', priceGems: 280, category: 'heroines', tags: ['heroines', 'heroes', 'scifi', 'espaco'] },
  { id: 'princess-peach', name: 'Princesa Peach', primary: '#f472b6', glow: '#fbbf24', trail: '#06b6d4', priceGems: 200, category: 'heroines', tags: ['heroines', 'princesas', 'games', 'arcade'] },
  { id: 'rapunzel-magic', name: 'Rapunzel Solar', primary: '#7c3aed', glow: '#facc15', trail: '#a855f7', priceGems: 220, category: 'heroines', tags: ['heroines', 'princesas', 'fantasia', 'magia'] },
  { id: 'merida-brave', name: 'Merida Arqueira', primary: '#15803d', glow: '#ea580c', trail: '#78350f', priceGems: 220, category: 'heroines', tags: ['heroines', 'guerreiras', 'natureza', 'aventura'] },
  { id: 'ahsoka-tano', name: 'Ahsoka Guerreira', primary: '#ea580c', glow: '#ffffff', trail: '#0284c7', priceGems: 300, category: 'heroines', tags: ['heroines', 'scifi', 'espaco', 'guerreiras'] },
  { id: 'lara-croft', name: 'Lara Aventureira', primary: '#3f6212', glow: '#d97706', trail: '#713f12', priceGems: 240, category: 'heroines', tags: ['heroines', 'aventura', 'natureza', 'desafio'] },
  { id: 'gamora-blade', name: 'Gamora Guardiã', primary: '#16a34a', glow: '#cbd5e1', trail: '#064e3b', priceGems: 260, category: 'heroines', tags: ['heroines', 'scifi', 'espaco', 'guerreiras'] },

  // ==========================================
  // PROFISSÕES & MESTRES DAS NOVAS FASES (6 SKINS)
  // ==========================================
  { id: 'chef-gourmet', name: 'Chef Estelar', primary: '#ffffff', glow: '#fbbf24', trail: '#f59e0b', priceGems: 200, category: 'professions', tags: ['gastronomy', 'arcade', 'natureza'] },
  { id: 'medic-vital', name: 'Doutor da Vida', primary: '#f0fdfa', glow: '#14b8a6', trail: '#0d9488', priceGems: 220, category: 'professions', tags: ['health', 'heroes', 'natureza'] },
  { id: 'archaeo-hunter', name: 'Arqueólogo Jones', primary: '#78350f', glow: '#f59e0b', trail: '#d97706', priceGems: 240, category: 'professions', tags: ['dinosaur', 'aventura', 'mitologia'] },
  { id: 'sheriff-west', name: 'Xerife Federal', primary: '#451a03', glow: '#fbbf24', trail: '#b45309', priceGems: 240, category: 'professions', tags: ['wild_west', 'aventura', 'desafio'] },
  { id: 'cyborg-neon', name: 'Androide Quântico', primary: '#0f172a', glow: '#06b6d4', trail: '#d946ef', priceGems: 260, category: 'professions', tags: ['quantum_core', 'scifi', 'arcade'] },
  { id: 'olympic-pro', name: 'Atleta Supremo', primary: '#1e3a8a', glow: '#fbbf24', trail: '#3b82f6', priceGems: 220, category: 'professions', tags: ['sports', 'heroes', 'desafio'] }
];

export const BALL_TRAILS = [
  { id: 'default', name: 'Rastro Clássico', icon: 'Sparkles', priceGems: 0, description: 'Rastro na cor da esfera equipada.', color: '#38bdf8' },
  { id: 'fire', name: 'Chamas do Dragão', icon: 'Flame', priceGems: 180, description: 'Labaredas de fogo e brasas incandescentes.', color: '#f97316' },
  { id: 'music', name: 'Batida Harmônica', icon: 'Music', priceGems: 190, description: 'Notas musicais e harmonia rítmica.', color: '#a855f7' },
  { id: 'petals', name: 'Pétalas Místicas', icon: 'Flower2', priceGems: 190, description: 'Pétalas de cerejeira em flutuação.', color: '#f43f5e' },
  { id: 'rainbow', name: 'Prisma Arco-Íris', icon: 'Palette', priceGems: 210, description: 'Cores vibrantes do espectro RGB.', color: '#ec4899' },
  { id: 'stars', name: 'Poeira Estelar', icon: 'Star', priceGems: 230, description: 'Micro-estrelas cintilantes cósmicas.', color: '#facc15' },
  { id: 'lightning', name: 'Relâmpago Elétrico', icon: 'Zap', priceGems: 250, description: 'Descargas elétricas e faíscas azuis.', color: '#06b6d4' },
  { id: 'bubble', name: 'Bolhas Abissais', icon: 'Droplets', priceGems: 200, description: 'Bolhas translúcidas aquáticas que flutuam para o alto.', color: '#38bdf8' },
  { id: 'matrix', name: 'Código Matrix', icon: 'Binary', priceGems: 220, description: 'Chuva de dados verdes neon e fragmentos digitais.', color: '#22c55e' },
  { id: 'ice', name: 'Cristais de Neve', icon: 'Snowflake', priceGems: 220, description: 'Flocos gélidos cintilantes e geada glacial.', color: '#93c5fd' },
  { id: 'gold', name: 'Chuva de Ouro', icon: 'Coins', priceGems: 260, description: 'Pirilampos dourados cintilantes dignos de reis.', color: '#facc15' },
  { id: 'toxic', name: 'Bruma Bioquímica', icon: 'Atom', priceGems: 240, description: 'Vapores esmeralda e partículas radioativas curativas.', color: '#10b981' },
  { id: 'meteor', name: 'Cometa Cósmico', icon: 'Rocket', priceGems: 280, description: 'Vórtice de plasma estelar em altíssima velocidade.', color: '#d946ef' }
];

export const ACHIEVEMENTS = [
  { id: 'first_jump', title: 'Primeiro Salto', desc: 'Realize seu primeiro salto no jogo.', icon: 'ArrowUp', rewardGems: 50 },
  { id: 'stage_10', title: 'Explorador dos Céus', desc: 'Conclua as primeiras 10 fases do modo Solo.', icon: 'Compass', rewardGems: 150 },
  { id: 'stage_25', title: 'Lenda do Salto', desc: 'Conclua 25 fases no modo Solo.', icon: 'Award', rewardGems: 300 },
  { id: 'stage_50', title: 'Mestre Absoluto', desc: 'Conquiste as 50 fases clássicas do JumpBall!', icon: 'Crown', rewardGems: 1000 },
  { id: 'stage_75', title: 'Titã das Alturas', desc: 'Conclua 75 fases no modo Solo.', icon: 'Award', rewardGems: 1200 },
  { id: 'stage_100', title: 'Lenda Centenária', desc: 'Conquiste 100 fases no modo Solo!', icon: 'Crown', rewardGems: 2000 },
  { id: 'stage_125', title: 'Viajante do Hiperespaço', desc: 'Alcance a incrível marca de 125 fases!', icon: 'Sparkles', rewardGems: 2500 },
  { id: 'stage_150', title: 'Divindade Cósmica Suprema', desc: 'Conquiste todas as 150 fases do JumpBall aos 150.000m!', icon: 'Crown', rewardGems: 5000 },
  { id: 'gem_hunter', title: 'Caçador de Relíquias', desc: 'Acumule 500 gemas na sua carreira.', icon: 'Gem', rewardGems: 150 },
  { id: 'skin_collector', title: 'Colecionador de Heróis', desc: 'Desbloqueie pelo menos 6 skins no Hangar.', icon: 'Shield', rewardGems: 200 },
  { id: 'portal_master', title: 'Viajante Dimensional', desc: 'Atravesse 30 portais laterais.', icon: 'RotateCw', rewardGems: 180 },
  { id: 'endless_1000', title: 'Sobrevivente do Magma', desc: 'Alcance 1.000m no Modo Infinito.', icon: 'Flame', rewardGems: 250 }
];

// Gera 3 missões diárias determinísticas para a data atual
export function getDailyQuests(dateStr = new Date().toISOString().slice(0, 10)) {
  return [
    {
      id: `quest_jumps_${dateStr}`,
      title: 'Saltador Imparável',
      desc: 'Realize 60 saltos em qualquer modo de jogo.',
      target: 60,
      metric: 'jumps',
      rewardGems: 100,
      icon: 'Zap'
    },
    {
      id: `quest_gems_${dateStr}`,
      title: 'Caçador de Gemas',
      desc: 'Colete 15 gemas durante suas subidas.',
      target: 15,
      metric: 'gems',
      rewardGems: 120,
      icon: 'Gem'
    },
    {
      id: `quest_portals_${dateStr}`,
      title: 'Distorção Espacial',
      desc: 'Atravesse 6 portais laterais nas paredes.',
      target: 6,
      metric: 'portals',
      rewardGems: 150,
      icon: 'RotateCw'
    }
  ];
}

export const ENDLESS_STAGE = {
  id: 'endless',
  number: 999,
  title: 'Sobrevivência do Magma',
  name: 'Sobrevivência do Magma',
  theme: 'volcano',
  icon: 'Flame',
  targetHeight: 999999,
  gravity: 0.34,
  jumpForce: -11.8,
  friction: 0.94,
  wind: 0,
  speedFactor: 1.1,
  hazards: ['moving', 'springs', 'spikes'],
  platformColor: '#ea580c',
  platformBorder: '#fdba74',
  ballGlow: '#f97316',
  bgGradient: ['#1c0505', '#450a0a', '#7f1d1d'],
  description: 'Sobreviva ao magma ascendente! Alcance a maior altitude possível antes que a lava suba.',
  mechanic: 'Magma ascendente contínuo e geração infinita de plataformas.'
};
