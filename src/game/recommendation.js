/**
 * Sistema de Recomendação Inteligente por Interesses do JumpBall
 * Conecta os gostos do jogador a skins exclusivas e fases temáticas
 */

import { BALL_SKINS, STAGES } from './stages';

export const INTEREST_TOPICS = [
  {
    id: 'heroines',
    label: 'Heroínas & Ícones',
    emoji: '🦸‍♀️',
    color: 'from-pink-500 to-rose-600',
    desc: 'Mulher-Maravilha, Viúva Negra, Barbie, Capitã Marvel e grandes guerreiras.',
    tags: ['heroines', 'guerreiras', 'heroes']
  },
  {
    id: 'fantasy',
    label: 'Princesas & Magia',
    emoji: '👑',
    color: 'from-purple-500 to-indigo-600',
    desc: 'Elsa, Rapunzel, Peach, Feiticeira Escarlate e reinos encantados.',
    tags: ['fantasia', 'magia', 'princesas']
  },
  {
    id: 'adventure',
    label: 'Aventura & Mitologia',
    emoji: '⚔️',
    color: 'from-amber-500 to-orange-600',
    desc: 'Mulan, Merida, Lara Croft, deuses do Olimpo e expedições perigosas.',
    tags: ['aventura', 'mitologia', 'guerreiras']
  },
  {
    id: 'scifi',
    label: 'Sci-Fi & Galáxias',
    emoji: '🚀',
    color: 'from-cyan-500 to-blue-600',
    desc: 'Ahsoka Tano, Gamora, astronautas, dimensões quânticas e o cosmos.',
    tags: ['scifi', 'espaco', 'space']
  },
  {
    id: 'nature',
    label: 'Oceanos & Natureza',
    emoji: '🌊',
    color: 'from-teal-500 to-emerald-600',
    desc: 'Moana, recifes de corais, florestas densas e forças elementais.',
    tags: ['natureza', 'oceanos']
  },
  {
    id: 'heroes',
    label: 'Super-Heróis & Ação',
    emoji: '⚡',
    color: 'from-red-500 to-amber-600',
    desc: 'Homem-Aranha, Homem de Ferro, Batman, Flash e heróis lendários.',
    tags: ['heroes', 'army']
  },
  {
    id: 'retro',
    label: 'Games & Arcades',
    emoji: '🕹️',
    color: 'from-fuchsia-500 to-pink-600',
    desc: 'Pixel art, estética retrô nostálgica e referências a clássicos dos games.',
    tags: ['arcade', 'games', 'retro']
  },
  {
    id: 'extreme',
    label: 'Desafio Extremo 🔥',
    emoji: '🔥',
    color: 'from-orange-600 to-red-700',
    desc: 'Sobrevivência do magma, tempestades elétricas e reflexos no limite.',
    tags: ['desafio', 'volcano']
  }
];

/**
 * Mapeamento de temas das 50 fases para tags de interesses
 */
const STAGE_THEME_TAGS = {
  forest: ['natureza', 'aventura'],
  desert: ['aventura', 'natureza'],
  ocean: ['natureza', 'oceanos'],
  storm: ['desafio', 'natureza', 'magia'],
  crystal: ['fantasia', 'magia'],
  volcano: ['desafio', 'natureza'],
  neon: ['retro', 'games', 'scifi'],
  ice: ['fantasia', 'magia', 'natureza'],
  sky: ['aventura', 'natureza'],
  cosmos: ['scifi', 'espaco'],
  quantum: ['scifi', 'espaco', 'desafio'],
  arcade: ['retro', 'games'],
  temple: ['mitologia', 'aventura'],
  aurora: ['fantasia', 'natureza', 'magia']
};

/**
 * Calcula a pontuação de afinidade de uma skin com base nos interesses selecionados
 */
export function calculateSkinAffinity(skin, selectedInterestIds = []) {
  if (!selectedInterestIds || selectedInterestIds.length === 0) {
    return 75; // Valor neutro base
  }

  const selectedTopics = INTEREST_TOPICS.filter(t => selectedInterestIds.includes(t.id));
  const activeTags = new Set(selectedTopics.flatMap(t => t.tags));

  let matchPoints = 0;

  // Categoria direta
  if (skin.category === 'heroines' && (selectedInterestIds.includes('heroines') || selectedInterestIds.includes('fantasy'))) {
    matchPoints += 3;
  }
  if (skin.category === 'heroes' && (selectedInterestIds.includes('heroes') || selectedInterestIds.includes('heroines'))) {
    matchPoints += 2;
  }
  if (skin.category === 'space' && selectedInterestIds.includes('scifi')) {
    matchPoints += 3;
  }

  // Tags específicas da skin
  if (skin.tags && Array.isArray(skin.tags)) {
    skin.tags.forEach(tag => {
      if (activeTags.has(tag)) {
        matchPoints += 2;
      }
    });
  }

  const ratio = Math.min(1, Math.max(0.45, matchPoints / 5.5));
  return Math.round(ratio * 100);
}

/**
 * Retorna as melhores skins recomendadas para o usuário
 */
export function getRecommendedSkins(selectedInterestIds = [], unlockedIds = [], limit = 8) {
  const unlockedSet = new Set(unlockedIds);

  const scoredSkins = BALL_SKINS.map(skin => {
    const affinity = calculateSkinAffinity(skin, selectedInterestIds);
    const isUnlocked = unlockedSet.has(skin.id);
    return {
      ...skin,
      affinity,
      isUnlocked
    };
  });

  // Ordena por afinidade decrescente e prioriza skins que o jogador ainda não comprou (para incentivar descoberta)
  scoredSkins.sort((a, b) => {
    if (a.isUnlocked !== b.isUnlocked) {
      return a.isUnlocked ? 1 : -1;
    }
    return b.affinity - a.affinity;
  });

  return scoredSkins.slice(0, limit);
}

/**
 * Retorna as fases recomendadas que combinam com o perfil do jogador
 */
export function getRecommendedStages(selectedInterestIds = [], currentCompletedStages = 0, limit = 6) {
  if (!selectedInterestIds || selectedInterestIds.length === 0) {
    // Retorna as fases mais próximas do nível atual do jogador
    return STAGES.slice(Math.max(0, currentCompletedStages - 1), currentCompletedStages + limit);
  }

  const selectedTopics = INTEREST_TOPICS.filter(t => selectedInterestIds.includes(t.id));
  const activeTags = new Set(selectedTopics.flatMap(t => t.tags));

  const scoredStages = STAGES.map(stage => {
    const stageTags = STAGE_THEME_TAGS[stage.theme] || ['aventura'];
    let matches = 0;
    stageTags.forEach(t => {
      if (activeTags.has(t)) matches++;
    });

    const isUnlocked = stage.number <= Math.max(1, currentCompletedStages + 1);
    const isCompleted = stage.number <= currentCompletedStages;

    return {
      ...stage,
      matchScore: matches,
      isUnlocked,
      isCompleted
    };
  });

  // Prioriza fases com maior correspondência temática
  scoredStages.sort((a, b) => {
    if (a.isUnlocked !== b.isUnlocked) return a.isUnlocked ? -1 : 1;
    return b.matchScore - a.matchScore;
  });

  return scoredStages.slice(0, limit);
}
