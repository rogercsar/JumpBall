/**
 * events.js — Sistema de Fases Comemorativas e Eventos Temporários do JumpBall
 *
 * Gera fases dinâmicas e exclusivas baseadas em:
 * 1. Aniversário do Usuário (birth_date) — 1 semana comemorativa
 * 2. Aniversário de Cadastro da Conta (created_at) — 1 semana comemorativa
 * 3. Datas Festivas do Ano:
 *    - Réveillon / Ano Novo (29/12 a 05/01)
 *    - Carnaval (Semana de Carnaval)
 *    - Páscoa (Semana da Páscoa)
 *    - Festa Junina / São João (20/06 a 27/06)
 *    - Halloween (26/10 a 02/11)
 *    - Natal (20/12 a 27/12)
 *
 * Cada fase fica ativa durante 7 dias e após isso é ocultada automaticamente até o próximo ciclo.
 */

// Algoritmo Gregoriano Anônimo para calcular o Domingo de Páscoa
export function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = Março, 4 = Abril
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

// Verifica se a data de teste está dentro de uma janela de 7 dias [startDate, startDate + 7 dias]
function checkIsWithinWindow(now, startDate) {
  const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 dias depois
  const current = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const isActive = current >= start && current <= end;
  const diffMs = end.getTime() - current.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  const daysUntilStart = Math.ceil((start.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));

  return { isActive, daysRemaining, daysUntilStart, startDate: start, endDate: end };
}

/**
 * Gera todas as fases comemorativas configuradas para o ano atual
 */
export function getAllCommemorativeStages(profile, currentDate = new Date()) {
  const now = new Date(currentDate);
  const currentYear = now.getFullYear();
  const stages = [];

  // 1. ANIVERSÁRIO DO USUÁRIO
  const birthDateStr = profile?.birth_date;
  if (birthDateStr) {
    try {
      const parts = birthDateStr.split('-');
      if (parts.length === 3) {
        const birthMonth = parseInt(parts[1], 10) - 1;
        const birthDay = parseInt(parts[2], 10);
        const birthdayThisYear = new Date(currentYear, birthMonth, birthDay);
        const window = checkIsWithinWindow(now, birthdayThisYear);

        const username = profile?.username || 'Piloto';
        stages.push({
          id: 'event_birthday',
          number: 8001,
          isEvent: true,
          eventKey: 'birthday',
          title: `Festa de Aniversário de ${username}`,
          name: `Aniversário de ${username}`,
          badgeText: '🎂 SEU ANIVERSÁRIO',
          badgeColor: 'from-pink-500 to-rose-400',
          theme: 'birthday',
          icon: 'Cake',
          targetHeight: 3500,
          gravity: 0.30,
          jumpForce: -12.4,
          speedFactor: 1.15,
          wind: 0,
          bgGradient: ['#1f082e', '#3f105e', '#671a99'],
          platformColor: '#ec4899',
          platformBorder: '#fbcfe8',
          ballGlow: '#f472b6',
          description: `Parabéns, ${username}! Uma fase espacial exclusiva com balões de gravidade zero, confetes cósmicos e presentes!`,
          hazards: ['springs'],
          mechanic: 'Super saltos comemorativos com molas de confetes e balões de impulso.',
          rewardGems: 300,
          isActive: window.isActive,
          daysRemaining: window.daysRemaining,
          daysUntilStart: window.daysUntilStart,
          startDate: window.startDate,
          endDate: window.endDate
        });
      }
    } catch (e) {
      /* ignore */
    }
  }

  // 2. ANIVERSÁRIO DE CADASTRO (JUBILEU DA CONTA)
  const createdAtStr = profile?.created_at;
  if (createdAtStr) {
    try {
      const createdDate = new Date(createdAtStr);
      const createdMonth = createdDate.getMonth();
      const createdDay = createdDate.getDate();
      const createdYear = createdDate.getFullYear();
      const yearsActive = currentYear - createdYear;

      const accountAnniversary = new Date(currentYear, createdMonth, createdDay);
      const window = checkIsWithinWindow(now, accountAnniversary);

      stages.push({
        id: 'event_account_anniversary',
        number: 8002,
        isEvent: true,
        eventKey: 'account_anniversary',
        title: `Jubileu de Cadastro JumpBall`,
        name: `Jubileu JumpBall`,
        badgeText: `🚀 ${yearsActive > 0 ? `${yearsActive}º ANO` : 'ESTREIA NO JUMPBALL'}`,
        badgeColor: 'from-cyan-500 to-blue-500',
        theme: 'jubilee',
        icon: 'Crown',
        targetHeight: 3800,
        gravity: 0.32,
        jumpForce: -12.0,
        speedFactor: 1.2,
        wind: 0.1,
        bgGradient: ['#021d38', '#073b6c', '#0f5b9e'],
        platformColor: '#06b6d4',
        platformBorder: '#67e8f9',
        ballGlow: '#22d3ee',
        description: `Comemore o aniversário do seu cadastro no JumpBall! Uma ascensão de veterano pelas altas camadas estelares.`,
        hazards: ['moving', 'springs'],
        mechanic: 'Plataformas de plasma acelerado celebrando sua jornada cósmica.',
        rewardGems: 250,
        isActive: window.isActive,
        daysRemaining: window.daysRemaining,
        daysUntilStart: window.daysUntilStart,
        startDate: window.startDate,
        endDate: window.endDate
      });
    } catch (e) {
      /* ignore */
    }
  }

  // 3. RÉVEILLON / ANO NOVO (29/12 a 05/01)
  let newYearStart = new Date(currentYear, 11, 29); // 29 de Dezembro
  if (now.getMonth() === 0 && now.getDate() <= 5) {
    newYearStart = new Date(currentYear - 1, 11, 29);
  }
  const newYearWindow = checkIsWithinWindow(now, newYearStart);
  stages.push({
    id: 'event_new_year',
    number: 8003,
    isEvent: true,
    eventKey: 'new_year',
    title: `Salto da Virada Cósmica`,
    name: `Réveillon Cósmico`,
    badgeText: '🎆 ANO NOVO',
    badgeColor: 'from-amber-400 to-yellow-500',
    theme: 'new_year',
    icon: 'Sparkles',
    targetHeight: 4000,
    gravity: 0.32,
    jumpForce: -12.5,
    speedFactor: 1.25,
    wind: 0,
    bgGradient: ['#120c02', '#2d1f05', '#573d09'],
    platformColor: '#fbbf24',
    platformBorder: '#fef08a',
    ballGlow: '#f59e0b',
    description: `Celebre o Ano Novo saltando sobre fogos de artifício espaciais e partículas cintilantes de ouro!`,
    hazards: ['springs', 'moving'],
    mechanic: 'Plataformas douradas festivas com propulsão pirotécnica de alta velocidade.',
    rewardGems: 250,
    isActive: newYearWindow.isActive,
    daysRemaining: newYearWindow.daysRemaining,
    daysUntilStart: newYearWindow.daysUntilStart,
    startDate: newYearWindow.startDate,
    endDate: newYearWindow.endDate
  });

  // 4. CARNAVAL (47 dias antes da Páscoa)
  const easterSunday = getEasterSunday(currentYear);
  const carnivalStart = new Date(easterSunday.getTime() - 47 * 24 * 60 * 60 * 1000);
  const carnivalWindow = checkIsWithinWindow(now, carnivalStart);
  stages.push({
    id: 'event_carnival',
    number: 8004,
    isEvent: true,
    eventKey: 'carnival',
    title: `Folia das Galáxias`,
    name: `Carnaval Galáctico`,
    badgeText: '🎭 CARNAVAL',
    badgeColor: 'from-purple-500 via-pink-500 to-yellow-400',
    theme: 'carnival',
    icon: 'PartyPopper',
    targetHeight: 3600,
    gravity: 0.30,
    jumpForce: -12.8,
    speedFactor: 1.3,
    wind: 0.2,
    bgGradient: ['#290833', '#4e1061', '#7b1999'],
    platformColor: '#a855f7',
    platformBorder: '#f0abfc',
    ballGlow: '#c084fc',
    description: `O ritmo acelerado do Carnaval nas estrelas! Serpentinas fluorescentes e plataformas elásticas vibrantes.`,
    hazards: ['springs', 'conveyor'],
    mechanic: 'Molas rítmicas com impulsos acrobáticos super velozes.',
    rewardGems: 200,
    isActive: carnivalWindow.isActive,
    daysRemaining: carnivalWindow.daysRemaining,
    daysUntilStart: carnivalWindow.daysUntilStart,
    startDate: carnivalWindow.startDate,
    endDate: carnivalWindow.endDate
  });

  // 5. PÁSCOA (Semana da Páscoa)
  const easterStart = new Date(easterSunday.getTime() - 7 * 24 * 60 * 60 * 1000);
  const easterWindow = checkIsWithinWindow(now, easterStart);
  stages.push({
    id: 'event_easter',
    number: 8005,
    isEvent: true,
    eventKey: 'easter',
    title: `Ascensão do Coelho Cósmico`,
    name: `Páscoa nas Estrelas`,
    badgeText: '🐰 PÁSCOA',
    badgeColor: 'from-emerald-400 to-teal-500',
    theme: 'easter',
    icon: 'Egg',
    targetHeight: 3400,
    gravity: 0.28,
    jumpForce: -13.0,
    speedFactor: 1.15,
    wind: 0,
    bgGradient: ['#062b20', '#0e4a38', '#166e54'],
    platformColor: '#34d399',
    platformBorder: '#a7f3d0',
    ballGlow: '#10b981',
    description: `Super pulos em ovos cósmicos flutuantes e plataformas de confeito cristalizado com gravidade reduzida.`,
    hazards: ['springs'],
    mechanic: 'Saltos gigantescos inspirados no pulo do coelho com flutuação estendida.',
    rewardGems: 200,
    isActive: easterWindow.isActive,
    daysRemaining: easterWindow.daysRemaining,
    daysUntilStart: easterWindow.daysUntilStart,
    startDate: easterWindow.startDate,
    endDate: easterWindow.endDate
  });

  // 6. FESTA JUNINA / SÃO JOÃO (20/06 a 27/06)
  const juninaStart = new Date(currentYear, 5, 20); // 20 de Junho
  const juninaWindow = checkIsWithinWindow(now, juninaStart);
  stages.push({
    id: 'event_festa_junina',
    number: 8006,
    isEvent: true,
    eventKey: 'festa_junina',
    title: `Arraiá das Estrelas`,
    name: `Arraiá de São João`,
    badgeText: '🔥 FESTA JUNINA',
    badgeColor: 'from-orange-500 to-amber-500',
    theme: 'junina',
    icon: 'Flame',
    targetHeight: 3700,
    gravity: 0.33,
    jumpForce: -12.2,
    speedFactor: 1.2,
    wind: 0,
    bgGradient: ['#2b0d02', '#521905', '#802709'],
    platformColor: '#f97316',
    platformBorder: '#fed7aa',
    ballGlow: '#ea580c',
    description: `Fogueiras cósmicas, balões iluminados e bandeirinhas no céu estelar aquecendo a subida.`,
    hazards: ['moving', 'springs'],
    mechanic: 'Plataformas rústicas incandescentes com brisas ascendentes de ar quente.',
    rewardGems: 200,
    isActive: juninaWindow.isActive,
    daysRemaining: juninaWindow.daysRemaining,
    daysUntilStart: juninaWindow.daysUntilStart,
    startDate: juninaWindow.startDate,
    endDate: juninaWindow.endDate
  });

  // 7. HALLOWEEN / DIA DAS BRUXAS (26/10 a 02/11)
  const halloweenStart = new Date(currentYear, 9, 26); // 26 de Outubro
  const halloweenWindow = checkIsWithinWindow(now, halloweenStart);
  stages.push({
    id: 'event_halloween',
    number: 8007,
    isEvent: true,
    eventKey: 'halloween',
    title: `Pesadelo das Sombras`,
    name: `Halloween Espacial`,
    badgeText: '🎃 HALLOWEEN',
    badgeColor: 'from-orange-600 via-purple-600 to-slate-900',
    theme: 'halloween',
    icon: 'Ghost',
    targetHeight: 3900,
    gravity: 0.34,
    jumpForce: -12.0,
    speedFactor: 1.25,
    wind: -0.15,
    bgGradient: ['#120321', '#28064a', '#43097d'],
    platformColor: '#ea580c',
    platformBorder: '#f97316',
    ballGlow: '#c084fc',
    description: `Abóboras cósmicas bioluminescentes e plataformas fantasmagóricas que desafiam os mais corajosos!`,
    hazards: ['fragile', 'moving'],
    mechanic: 'Plataformas espectrais e névoa gravitacional misteriosa.',
    rewardGems: 220,
    isActive: halloweenWindow.isActive,
    daysRemaining: halloweenWindow.daysRemaining,
    daysUntilStart: halloweenWindow.daysUntilStart,
    startDate: halloweenWindow.startDate,
    endDate: halloweenWindow.endDate
  });

  // 8. NATAL (20/12 a 27/12)
  const christmasStart = new Date(currentYear, 11, 20); // 20 de Dezembro
  const christmasWindow = checkIsWithinWindow(now, christmasStart);
  stages.push({
    id: 'event_christmas',
    number: 8008,
    isEvent: true,
    eventKey: 'christmas',
    title: `Noite Polar Encantada`,
    name: `Natal Estelar`,
    badgeText: '🎄 NATAL',
    badgeColor: 'from-red-500 via-emerald-500 to-green-600',
    theme: 'christmas',
    icon: 'Gift',
    targetHeight: 4000,
    gravity: 0.32,
    jumpForce: -12.0,
    speedFactor: 1.2,
    friction: 0.98,
    wind: 0.1,
    bgGradient: ['#051c14', '#0d3829', '#155740'],
    platformColor: '#ef4444',
    platformBorder: '#fecaca',
    ballGlow: '#22d3ee',
    description: `Neve cintilante, aurora polar mágica e caixas de presentes energéticas pelas plataformas nevadas!`,
    hazards: ['ice_slick', 'springs'],
    mechanic: 'Plataformas de gelo decorado com caixas de presente bônus e baixo atrito.',
    rewardGems: 250,
    isActive: christmasWindow.isActive,
    daysRemaining: christmasWindow.daysRemaining,
    daysUntilStart: christmasWindow.daysUntilStart,
    startDate: christmasWindow.startDate,
    endDate: christmasWindow.endDate
  });

  return stages;
}

/**
 * Retorna somente as fases comemorativas ativas no momento (período de 1 semana)
 */
export function getActiveCommemorativeStages(profile, currentDate = new Date()) {
  const all = getAllCommemorativeStages(profile, currentDate);
  return all.filter(s => s.isActive);
}

/**
 * Retorna os próximos eventos comemorativos do calendário anual para exibição
 */
export function getUpcomingCommemorativeStages(profile, currentDate = new Date()) {
  const all = getAllCommemorativeStages(profile, currentDate);
  return all.filter(s => !s.isActive && s.daysUntilStart > 0).sort((a, b) => a.daysUntilStart - b.daysUntilStart);
}
