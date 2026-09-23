/**
 * JUMPBALL - JORNADA LIVRE: 30 MUNDOS E 150 FASES (Fases 1 a 150)
 * Focado em exploração, física acrobática, temas cotidianos/culturais e 30 Cumes de Escalada Zen (sem chefões).
 * Fases 1 a 50 preservadas + 100 Fases Inéditas exclusivas (Fases 51 a 150) até os 150.000m!
 */

export const FREE_WORLDS = [
  {
    "id": 1,
    "name": "Vale 1: Trilha da Natureza",
    "shortName": "Natureza",
    "theme": "forest",
    "icon": "TreePine",
    "gradient": "from-emerald-950/60 to-slate-900",
    "border": "border-emerald-500/40",
    "accentColor": "#10b981",
    "description": "Bosques ancestrais, plataformas de madeira e brisas relaxantes.",
    "stageRange": [
      1,
      5
    ],
    "bossStageNumber": 5,
    "summitStageNumber": 5,
    "summitName": "Cume do Natureza"
  },
  {
    "id": 2,
    "name": "Vale 2: Areias do Tempo",
    "shortName": "Areias",
    "theme": "desert",
    "icon": "Sun",
    "gradient": "from-amber-950/60 to-slate-900",
    "border": "border-amber-500/40",
    "accentColor": "#f59e0b",
    "description": "Dunas de areia fina, pirâmides douradas e dunas douradas de contemplação.",
    "stageRange": [
      6,
      10
    ],
    "bossStageNumber": 10,
    "summitStageNumber": 10,
    "summitName": "Cume do Areias"
  },
  {
    "id": 3,
    "name": "Vale 3: Abismo Oceânico",
    "shortName": "Oceano",
    "theme": "ocean",
    "icon": "Waves",
    "gradient": "from-cyan-950/60 to-slate-900",
    "border": "border-cyan-500/40",
    "accentColor": "#06b6d4",
    "description": "Profundezas azuis, cachoeiras ancestrais e correntes de bolhas.",
    "stageRange": [
      11,
      15
    ],
    "bossStageNumber": 15,
    "summitStageNumber": 15,
    "summitName": "Cume do Oceano"
  },
  {
    "id": 4,
    "name": "Vale 4: Trilha da Trovejante",
    "shortName": "Trovão",
    "theme": "storm",
    "icon": "Zap",
    "gradient": "from-blue-950/60 to-slate-900",
    "border": "border-blue-500/40",
    "accentColor": "#3b82f6",
    "description": "Tempestades de alta voltagem, raios telegrafados e rochas condutoras.",
    "stageRange": [
      16,
      20
    ],
    "bossStageNumber": 20,
    "summitStageNumber": 20,
    "summitName": "Cume do Trovão"
  },
  {
    "id": 5,
    "name": "Vale 5: Terras Glaciais",
    "shortName": "Glaciar",
    "theme": "arctic",
    "icon": "Snowflake",
    "gradient": "from-sky-950/60 to-slate-900",
    "border": "border-sky-500/40",
    "accentColor": "#38bdf8",
    "description": "Gelo de baixíssimo atrito, nevascas cortantes e estalactites.",
    "stageRange": [
      21,
      25
    ],
    "bossStageNumber": 25,
    "summitStageNumber": 25,
    "summitName": "Cume do Glaciar"
  },
  {
    "id": 6,
    "name": "Vale 6: Trilha da Magma",
    "shortName": "Vulcão",
    "theme": "volcano",
    "icon": "Flame",
    "gradient": "from-red-950/60 to-slate-900",
    "border": "border-red-500/40",
    "accentColor": "#ef4444",
    "description": "Calor extremo, rios de lava fervente e basalto incandescente.",
    "stageRange": [
      26,
      30
    ],
    "bossStageNumber": 30,
    "summitStageNumber": 30,
    "summitName": "Cume do Vulcão"
  },
  {
    "id": 7,
    "name": "Vale 7: Cyberpunk Neon",
    "shortName": "Cyberpunk",
    "theme": "cyberpunk",
    "icon": "Cpu",
    "gradient": "from-fuchsia-950/60 to-slate-900",
    "border": "border-fuchsia-500/40",
    "accentColor": "#d946ef",
    "description": "Metrópoles futuristas, esteiras de alta aceleração e feixes de laser.",
    "stageRange": [
      31,
      35
    ],
    "bossStageNumber": 35,
    "summitStageNumber": 35,
    "summitName": "Cume do Cyberpunk"
  },
  {
    "id": 8,
    "name": "Vale 8: Hiperespaço Quântico",
    "shortName": "Multiverso",
    "theme": "quantum",
    "icon": "Infinity",
    "gradient": "from-purple-950/60 to-slate-900",
    "border": "border-purple-500/40",
    "accentColor": "#a855f7",
    "description": "Dobra espacial, gravidade distorcida e o temido Ataque do Universo Paralelo!",
    "stageRange": [
      36,
      40
    ],
    "bossStageNumber": 40,
    "summitStageNumber": 40,
    "summitName": "Cume do Multiverso"
  },
  {
    "id": 9,
    "name": "Vale 9: Fábrica Steampunk",
    "shortName": "Steampunk",
    "theme": "steampunk",
    "icon": "Cog",
    "gradient": "from-orange-950/60 to-slate-900",
    "border": "border-orange-500/40",
    "accentColor": "#f97316",
    "description": "Engrenagens ciclópicas, pistões de alta pressão e forja de ferro.",
    "stageRange": [
      41,
      45
    ],
    "bossStageNumber": 45,
    "summitStageNumber": 45,
    "summitName": "Cume do Steampunk"
  },
  {
    "id": 10,
    "name": "Vale 10: O Ápice Cósmico",
    "shortName": "O Zênite",
    "theme": "cosmos",
    "icon": "Crown",
    "gradient": "from-amber-950/60 to-purple-950/80",
    "border": "border-amber-400/50",
    "accentColor": "#fbbf24",
    "description": "O cume supremo aos 50.000m onde reside o Guardião Supremo do Zênite.",
    "stageRange": [
      46,
      50
    ],
    "bossStageNumber": 50,
    "summitStageNumber": 50,
    "summitName": "Cume do O Zênite"
  },
  {
    "id": 11,
    "name": "Vale 11: Alameda dos Chefs & Confeitaria",
    "shortName": "Confeitaria Zen",
    "theme": "gastronomy",
    "icon": "Utensils",
    "gradient": "from-amber-950/50 to-orange-950/60",
    "border": "border-amber-400/30",
    "accentColor": "#f59e0b",
    "description": "Aromas doces, macarons flutuantes macios e plataformas elásticas de gelatina.",
    "stageRange": [
      51,
      55
    ],
    "bossStageNumber": 55,
    "summitStageNumber": 55,
    "summitName": "Torre de Macarons & Caramelo"
  },
  {
    "id": 12,
    "name": "Vale 12: Vale dos Dinossauros Herbívoros",
    "shortName": "Vale Jurássico Zen",
    "theme": "dinosaur",
    "icon": "Footprints",
    "gradient": "from-emerald-950/60 to-teal-950/50",
    "border": "border-emerald-400/30",
    "accentColor": "#10b981",
    "description": "Sauropodes gigantes pastando pacificamente, samambaias pré-históricas e lagoas azuis.",
    "stageRange": [
      56,
      60
    ],
    "bossStageNumber": 60,
    "summitStageNumber": 60,
    "summitName": "Ninho dos Pterossauros Amigáveis"
  },
  {
    "id": 13,
    "name": "Vale 13: Rota do Ouro do Cânion Vermelho",
    "shortName": "Cânion Dourado",
    "theme": "wild_west",
    "icon": "Sun",
    "gradient": "from-stone-900 to-amber-950/60",
    "border": "border-amber-500/30",
    "accentColor": "#d97706",
    "description": "Pôr do sol cinematográfico no cânion, pontes rústicas de madeira e brisas amenas.",
    "stageRange": [
      61,
      65
    ],
    "bossStageNumber": 65,
    "summitStageNumber": 65,
    "summitName": "Ponto Alto do Pôr do Sol Dourado"
  },
  {
    "id": 14,
    "name": "Vale 14: Parque das Olimpíadas & Salto Livre",
    "shortName": "Parque Olímpico",
    "theme": "sports",
    "icon": "Medal",
    "gradient": "from-blue-950/60 to-cyan-950/50",
    "border": "border-cyan-400/30",
    "accentColor": "#06b6d4",
    "description": "Trampolins de ginástica olímpica, pista de acrobacias e celebração esportiva.",
    "stageRange": [
      66,
      70
    ],
    "bossStageNumber": 70,
    "summitStageNumber": 70,
    "summitName": "Pódio dos Saltos Harmônicos"
  },
  {
    "id": 15,
    "name": "Vale 15: Jardim da Vitalidade & Respiração",
    "shortName": "Jardim da Saúde",
    "theme": "health",
    "icon": "Heart",
    "gradient": "from-teal-950/60 to-emerald-950/50",
    "border": "border-teal-400/30",
    "accentColor": "#2dd4bf",
    "description": "Fontes termais revigorantes, fluxo de ar puro e ritmo calmo de respiração e equilíbrio.",
    "stageRange": [
      71,
      75
    ],
    "bossStageNumber": 75,
    "summitStageNumber": 75,
    "summitName": "Santuário da Serenidade & Bem-Estar"
  },
  {
    "id": 16,
    "name": "Vale 16: Maravilhas Naturais dos Continentes",
    "shortName": "Rota Continentes",
    "theme": "continents",
    "icon": "Globe",
    "gradient": "from-indigo-950/60 to-emerald-950/50",
    "border": "border-emerald-400/30",
    "accentColor": "#34d399",
    "description": "Uma volta ao mundo panorâmica sobre montanhas, florestas e cachoeiras de todos os continentes.",
    "stageRange": [
      76,
      80
    ],
    "bossStageNumber": 80,
    "summitStageNumber": 80,
    "summitName": "Mirante dos Seis Continentes"
  },
  {
    "id": 17,
    "name": "Vale 17: Eco-Metrópole Tecnológica Solar",
    "shortName": "Cidade Solar",
    "theme": "futuristic",
    "icon": "Cpu",
    "gradient": "from-cyan-950/60 to-emerald-950/60",
    "border": "border-cyan-400/30",
    "accentColor": "#22d3ee",
    "description": "Arranha-céus verdes com jardins verticais, painéis solares luminosos e transporte limpo.",
    "stageRange": [
      81,
      85
    ],
    "bossStageNumber": 85,
    "summitStageNumber": 85,
    "summitName": "Cúpula da Inovação Sustentável"
  },
  {
    "id": 18,
    "name": "Vale 18: Estratosfera de Algodão & Nuvens Alvas",
    "shortName": "Mar de Nuvens",
    "theme": "sky_realm",
    "icon": "Cloud",
    "gradient": "from-sky-950/50 to-indigo-950/60",
    "border": "border-sky-300/30",
    "accentColor": "#7dd3fc",
    "description": "Flutuação etérea sobre nuvens macias com impulsos ultra-leves e horizontes infinitos.",
    "stageRange": [
      86,
      90
    ],
    "bossStageNumber": 90,
    "summitStageNumber": 90,
    "summitName": "Terraço dos Sonhos Alados"
  },
  {
    "id": 19,
    "name": "Vale 19: Biblioteca Encantada de Alexandria",
    "shortName": "Saber Ancestral",
    "theme": "olympus",
    "icon": "Landmark",
    "gradient": "from-amber-950/50 to-purple-950/60",
    "border": "border-amber-400/30",
    "accentColor": "#fbbf24",
    "description": "Pergaminhos antigos flutuantes, constelações de conhecimento e salões de mármore dourado.",
    "stageRange": [
      91,
      95
    ],
    "bossStageNumber": 95,
    "summitStageNumber": 95,
    "summitName": "Grande Domo da Filosofia"
  },
  {
    "id": 20,
    "name": "Vale 20: Viagem Estelar aos 100.000m de Paz",
    "shortName": "Cosmos Sereno 100k",
    "theme": "cosmos",
    "icon": "Sparkles",
    "gradient": "from-indigo-950/60 to-purple-950/70",
    "border": "border-purple-300/40",
    "accentColor": "#c084fc",
    "description": "O ápice pacífico aos 100.000m com poeira estelar cintilante e gravidade perfeita.",
    "stageRange": [
      96,
      100
    ],
    "bossStageNumber": 100,
    "summitStageNumber": 100,
    "summitName": "Santuário da Harmonia Estelar"
  },
  {
    "id": 21,
    "name": "Vale 21: Pomar Tropical dos Frutos Raros",
    "shortName": "Pomar Tropical",
    "theme": "forest",
    "icon": "Apple",
    "gradient": "from-emerald-950/60 to-yellow-950/50",
    "border": "border-emerald-400/30",
    "accentColor": "#10b981",
    "description": "Árvores frutíferas lendárias, aromas cítricos revigorantes e copas iluminadas.",
    "stageRange": [
      101,
      105
    ],
    "bossStageNumber": 105,
    "summitStageNumber": 105,
    "summitName": "Copa do Baobá das Estrelas"
  },
  {
    "id": 22,
    "name": "Vale 22: Caverna dos Cristais de Âmbar Fóssil",
    "shortName": "Âmbar Brilhante",
    "theme": "crystal",
    "icon": "Gem",
    "gradient": "from-amber-950/60 to-yellow-900/50",
    "border": "border-amber-400/30",
    "accentColor": "#f59e0b",
    "description": "Resinas de âmbar pré-históricas iluminadas por dentro com reflexos de ouro e mel.",
    "stageRange": [
      106,
      110
    ],
    "bossStageNumber": 110,
    "summitStageNumber": 110,
    "summitName": "Gruta Central de Quartzo Dourado"
  },
  {
    "id": 23,
    "name": "Vale 23: Oásis dos Cactos Floridos do Deserto",
    "shortName": "Oásis da Brisa",
    "theme": "desert",
    "icon": "Flower2",
    "gradient": "from-amber-950/50 to-teal-950/50",
    "border": "border-teal-400/30",
    "accentColor": "#14b8a6",
    "description": "Flores raras desabrochando à noite no deserto, fontes límpidas e noites estreladas.",
    "stageRange": [
      111,
      115
    ],
    "bossStageNumber": 115,
    "summitStageNumber": 115,
    "summitName": "Mirante das Dunas Floridas"
  },
  {
    "id": 24,
    "name": "Vale 24: Pista de Patinação na Neve Fofa",
    "shortName": "Alpes Alpinos",
    "theme": "arctic",
    "icon": "Snowflake",
    "gradient": "from-sky-950/50 to-blue-950/60",
    "border": "border-sky-300/30",
    "accentColor": "#38bdf8",
    "description": "Chalés acolhedores nas montanhas suíças, neve fresca e deslizes suaves em lagos congelados.",
    "stageRange": [
      116,
      120
    ],
    "bossStageNumber": 120,
    "summitStageNumber": 120,
    "summitName": "Cume do Mont Blanc Nevado"
  },
  {
    "id": 25,
    "name": "Vale 25: Costa Dourada & Maratona Marítima",
    "shortName": "Farol da Costa",
    "theme": "ocean",
    "icon": "Anchor",
    "gradient": "from-blue-950/60 to-teal-950/50",
    "border": "border-teal-300/30",
    "accentColor": "#06b6d4",
    "description": "O som relaxante das ondas na praia, gaivotas e faróis históricos guiando a subida.",
    "stageRange": [
      121,
      125
    ],
    "bossStageNumber": 125,
    "summitStageNumber": 125,
    "summitName": "Lanterna do Farol Celestial"
  },
  {
    "id": 26,
    "name": "Vale 26: Alameda dos Cafés & Chocolates Finos",
    "shortName": "Café & Cacau",
    "theme": "gastronomy",
    "icon": "Coffee",
    "gradient": "from-stone-900 to-amber-950/70",
    "border": "border-amber-600/30",
    "accentColor": "#b45309",
    "description": "Vapor quente de espresso perfumado, grãos de cacau nobres e plataformas de trufa suave.",
    "stageRange": [
      126,
      130
    ],
    "bossStageNumber": 130,
    "summitStageNumber": 130,
    "summitName": "Terraço do Café das Nuvens"
  },
  {
    "id": 27,
    "name": "Vale 27: Trilha Zen da Meditação & Yoga",
    "shortName": "Trilha do Silêncio",
    "theme": "health",
    "icon": "Activity",
    "gradient": "from-teal-950/50 to-indigo-950/60",
    "border": "border-emerald-400/30",
    "accentColor": "#10b981",
    "description": "Sinos de vento tocando suavemente, pedras de equilíbrio zen e harmonia postural perfeita.",
    "stageRange": [
      131,
      135
    ],
    "bossStageNumber": 135,
    "summitStageNumber": 135,
    "summitName": "Ápice da Calmaria Interior"
  },
  {
    "id": 28,
    "name": "Vale 28: Grande Observatório das Galáxias",
    "shortName": "Telescópio Estelar",
    "theme": "cosmos",
    "icon": "Orbit",
    "gradient": "from-slate-950 to-indigo-950/70",
    "border": "border-indigo-400/30",
    "accentColor": "#818cf8",
    "description": "Lentes colossais apontadas para as nebulosas de Andrômeda e anéis brilhantes de Saturno.",
    "stageRange": [
      136,
      140
    ],
    "bossStageNumber": 140,
    "summitStageNumber": 140,
    "summitName": "Mirante dos Anéis de Saturno"
  },
  {
    "id": 29,
    "name": "Vale 29: Arquipélago das Sete Ilhas Paraíso",
    "shortName": "Sete Ilhas",
    "theme": "continents",
    "icon": "Compass",
    "gradient": "from-emerald-950/50 to-cyan-950/60",
    "border": "border-cyan-400/30",
    "accentColor": "#06b6d4",
    "description": "Atóis de areia branca, corais multicoloridos e águas mornas que acalmam a alma.",
    "stageRange": [
      141,
      145
    ],
    "bossStageNumber": 145,
    "summitStageNumber": 145,
    "summitName": "Mirante do Arquipélago Esmeralda"
  },
  {
    "id": 30,
    "name": "Vale 30: O Zênite da Harmonia Absoluta aos 150k",
    "shortName": "Zênite da Paz 150k",
    "theme": "cosmos",
    "icon": "Sparkles",
    "gradient": "from-indigo-950 via-purple-950/80 to-amber-950/70",
    "border": "border-amber-300/40",
    "accentColor": "#fbbf24",
    "description": "A conquista suprema da jornada livre aos 150.000m! Uma celebração pura sem batalhas.",
    "stageRange": [
      146,
      150
    ],
    "bossStageNumber": 150,
    "summitStageNumber": 150,
    "summitName": "O Ápice da Harmonia Infinita"
  }
];

export const FREE_STAGES = [
  {
    "id": 1,
    "number": 1,
    "title": "Floresta Esmeralda",
    "theme": "forest",
    "icon": "TreePine",
    "targetHeight": 1800,
    "gravity": 0.32,
    "jumpForce": -11.5,
    "speedFactor": 1,
    "wind": 0,
    "bgGradient": [
      "#062419",
      "#0d402b",
      "#135c3e"
    ],
    "platformColor": "#22c55e",
    "platformBorder": "#86efac",
    "ballGlow": "#4ade80",
    "description": "Brisa calma e plataformas naturais de carvalho. Perfeita para calibrar o giroscópio e câmera.",
    "hazards": [],
    "mechanic": "Plataformas seguras e molas energéticas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 2,
    "number": 2,
    "title": "Dunas do Saara",
    "theme": "desert",
    "icon": "Sun",
    "targetHeight": 2400,
    "gravity": 0.33,
    "jumpForce": -11.6,
    "speedFactor": 1.1,
    "wind": 0.15,
    "bgGradient": [
      "#2e1503",
      "#542c09",
      "#7c3f0c"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fde047",
    "ballGlow": "#facc15",
    "description": "Vento lateral que sopra as dunas. Algumas plataformas de areia desmoronam ao pisar!",
    "hazards": [
      "fragile"
    ],
    "mechanic": "Rajadas de vento suaves e plataformas de areia solta.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 3,
    "number": 3,
    "title": "Abismo Oceânico",
    "theme": "ocean",
    "icon": "Waves",
    "targetHeight": 3000,
    "gravity": 0.28,
    "jumpForce": -11,
    "speedFactor": 1.15,
    "wind": 0,
    "bgGradient": [
      "#031726",
      "#062d47",
      "#0a4b73"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#67e8f9",
    "ballGlow": "#22d3ee",
    "description": "Pressão abissal e alta flutuabilidade. Bolhas gigantes garantem saltos acrobáticos.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Flutuabilidade aquática com saltos prolongados.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 4,
    "number": 4,
    "title": "Cânion Trovejante",
    "theme": "storm",
    "icon": "Zap",
    "targetHeight": 3600,
    "gravity": 0.35,
    "jumpForce": -12,
    "speedFactor": 1.25,
    "wind": -0.2,
    "bgGradient": [
      "#140a2b",
      "#281452",
      "#411e85"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#d8b4fe",
    "ballGlow": "#c084fc",
    "description": "Tempestades de raios iluminam o cânion. Plataformas condutoras aceleram a subida.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Plataformas elétricas oscilatórias em alta velocidade.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 5,
    "number": 5,
    "title": "🏔️ Cume do Bosque Ancestral",
    "theme": "forest",
    "icon": "TreePine",
    "targetHeight": 4200,
    "gravity": 0.36,
    "jumpForce": -12.4,
    "speedFactor": 1.35,
    "wind": 0,
    "bgGradient": [
      "#042014",
      "#0d4a32",
      "#15734e"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#6ee7b7",
    "ballGlow": "#34d399",
    "description": "CUME DO MUNDO 1! Conquiste o ápice da floresta ancestral entre copas colossais e plataformas flutuantes de carvalho sagrado.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Escalada do Cume: plataformas com super-molas e correntes termais ascendentes.",
    "isBossStage": false,
    "bossColor": "#16a34a",
    "bossGlow": "#4ade80",
    "rewardGems": 150,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 6,
    "number": 6,
    "title": "Glaciar Ártico",
    "theme": "arctic",
    "icon": "Snowflake",
    "targetHeight": 4800,
    "gravity": 0.34,
    "jumpForce": -11.8,
    "speedFactor": 1.45,
    "friction": 0.99,
    "wind": 0.25,
    "bgGradient": [
      "#061826",
      "#0d324f",
      "#144c77"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#bae6fd",
    "ballGlow": "#7dd3fc",
    "description": "Gelo escorregadio e rajadas de nevasca congelante. Mantenha o equilíbrio do celular.",
    "hazards": [
      "ice_slick",
      "wind",
      "moving"
    ],
    "mechanic": "Superfícies de gelo com inércia contínua.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 7,
    "number": 7,
    "title": "Caverna de Cristais",
    "theme": "crystal",
    "icon": "Gem",
    "targetHeight": 5400,
    "gravity": 0.32,
    "jumpForce": -12.2,
    "speedFactor": 1.55,
    "wind": 0,
    "bgGradient": [
      "#1f082e",
      "#3f105e",
      "#671a99"
    ],
    "platformColor": "#ec4899",
    "platformBorder": "#fbcfe8",
    "ballGlow": "#f472b6",
    "description": "Prismas luminosos refletem feixes energéticos. Portais de dobra espacial entre plataformas.",
    "hazards": [
      "teleport",
      "moving",
      "springs"
    ],
    "mechanic": "Cristais de ressonância com portais de teletransporte.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 8,
    "number": 8,
    "title": "Santuário Celeste",
    "theme": "sky",
    "icon": "Cloud",
    "targetHeight": 6000,
    "gravity": 0.29,
    "jumpForce": -11.5,
    "speedFactor": 1.65,
    "wind": -0.15,
    "bgGradient": [
      "#0f172a",
      "#1e293b",
      "#334155"
    ],
    "platformColor": "#94a3b8",
    "platformBorder": "#e2e8f0",
    "ballGlow": "#cbd5e1",
    "description": "Acima das nuvens o ar rarefeito exige passos leves em plataformas etéreas.",
    "hazards": [
      "disappearing",
      "springs"
    ],
    "mechanic": "Nuvens passageiras que se dissolvem após o salto.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 9,
    "number": 9,
    "title": "Metrópole Cyberpunk",
    "theme": "cyberpunk",
    "icon": "Cpu",
    "targetHeight": 7000,
    "gravity": 0.39,
    "jumpForce": -12.8,
    "speedFactor": 1.85,
    "wind": 0,
    "bgGradient": [
      "#050814",
      "#0d1533",
      "#162354"
    ],
    "platformColor": "#00f0ff",
    "platformBorder": "#ff0055",
    "ballGlow": "#00f0ff",
    "description": "Arranha-céus futuristas com esteiras de alta velocidade e feixes de laser verticais.",
    "hazards": [
      "conveyor",
      "lasers",
      "moving",
      "fragile"
    ],
    "mechanic": "Esteiras rolantes que aceleram a bola lateralmente.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 10,
    "number": 10,
    "title": "🏔️ Pináculo Dourado de Rá",
    "theme": "pyramids",
    "icon": "Sun",
    "targetHeight": 8500,
    "gravity": 0.33,
    "jumpForce": -12.4,
    "speedFactor": 1.8,
    "wind": 0.15,
    "bgGradient": [
      "#261502",
      "#4d2d05",
      "#78460a"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fde68a",
    "ballGlow": "#fbbf24",
    "description": "CUME DO MUNDO 2! Atinga o topo da pirâmide celestial sob tempestades de areia dourada e correntes de ar quente.",
    "hazards": [
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "Pináculo Solar: rajadas de vento ascendente e plataformas de arenito dourado suspensas.",
    "isBossStage": false,
    "bossColor": "#d97706",
    "bossGlow": "#fde047",
    "rewardGems": 180,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 11,
    "number": 11,
    "title": "Cachoeira Ancestral",
    "theme": "waterfall",
    "icon": "Droplets",
    "targetHeight": 9500,
    "gravity": 0.33,
    "jumpForce": -11.8,
    "speedFactor": 1.35,
    "wind": 0.1,
    "bgGradient": [
      "#042f2e",
      "#0f766e",
      "#14b8a6"
    ],
    "platformColor": "#2dd4bf",
    "platformBorder": "#99f6e4",
    "ballGlow": "#5eead4",
    "description": "Cascatas majestosas e bruma refrescante. O fluxo das águas cria correntes e molas que impulsionam os saltos.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Correntes de água ascendentes e plataformas rochosas úmidas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 12,
    "number": 12,
    "title": "Floresta Sagrada Indígena",
    "theme": "indigenous",
    "icon": "Feather",
    "targetHeight": 10500,
    "gravity": 0.31,
    "jumpForce": -12,
    "speedFactor": 1.45,
    "wind": 0,
    "bgGradient": [
      "#1c1917",
      "#14532d",
      "#15803d"
    ],
    "platformColor": "#84cc16",
    "platformBorder": "#d9f99d",
    "ballGlow": "#a3e635",
    "description": "Totens ancestrais rúnicos e espíritos da mata protegem a subida sagrada entre copas de árvores milenares.",
    "hazards": [
      "springs",
      "fragile",
      "moving"
    ],
    "mechanic": "Saltos abençoados pelos espíritos e plataformas rúnicas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 13,
    "number": 13,
    "title": "Tempestade de Monção",
    "theme": "rain",
    "icon": "CloudRain",
    "targetHeight": 11600,
    "gravity": 0.35,
    "jumpForce": -12,
    "speedFactor": 1.5,
    "wind": -0.25,
    "bgGradient": [
      "#020617",
      "#0f172a",
      "#1e293b"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#bae6fd",
    "ballGlow": "#7dd3fc",
    "description": "Chuva torrencial contínua e rajadas de vento tempestuoso que desviam a bola com força lateral constante.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Ventos laterais fortes e chuva densa com atrito dinâmico.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 14,
    "number": 14,
    "title": "Tundra Congelada do Inverno",
    "theme": "winter",
    "icon": "Wind",
    "targetHeight": 12800,
    "gravity": 0.36,
    "jumpForce": -12.2,
    "speedFactor": 1.55,
    "friction": 0.98,
    "wind": 0.3,
    "bgGradient": [
      "#082f49",
      "#0369a1",
      "#38bdf8"
    ],
    "platformColor": "#a5f3fc",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#67e8f9",
    "description": "Nevasca polar cortante e plataformas cristalinas de gelo eterno com inércia contínua e derrapagem intensa.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Superfícies de gelo com baixíssimo atrito e rajadas de nevasca.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 15,
    "number": 15,
    "title": "🏔️ Fossa Abissal das Marés",
    "theme": "ocean",
    "icon": "Waves",
    "targetHeight": 14000,
    "gravity": 0.3,
    "jumpForce": -12.2,
    "speedFactor": 1.65,
    "wind": 0.1,
    "bgGradient": [
      "#02182b",
      "#063d69",
      "#0d63a5"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#22d3ee",
    "description": "CUME DO MUNDO 3! Emerge das profundezas abissais pegando carona em geisers hidrotermais e super bolhas acrobáticas.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Flutuabilidade: salto ampliado por geisers e correntes marítimas fluidas.",
    "isBossStage": false,
    "bossColor": "#0891b2",
    "bossGlow": "#67e8f9",
    "rewardGems": 200,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 16,
    "number": 16,
    "title": "Cidadela Flutuante dos Céus",
    "theme": "ruins",
    "icon": "Landmark",
    "targetHeight": 15200,
    "gravity": 0.28,
    "jumpForce": -11.6,
    "speedFactor": 1.7,
    "wind": 0,
    "bgGradient": [
      "#172554",
      "#1e1b4b",
      "#312e81"
    ],
    "platformColor": "#818cf8",
    "platformBorder": "#e0e7ff",
    "ballGlow": "#a5b4fc",
    "description": "Templos e colunas místicas levitando na estratosfera. Fragmentos antigravitacionais geram saltos flutuantes.",
    "hazards": [
      "moving",
      "springs",
      "fragile"
    ],
    "mechanic": "Gravidade lunar leve com plataformas flutuantes mágicas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 17,
    "number": 17,
    "title": "Fenda Vulcânica de Obsidiana",
    "theme": "obsidian",
    "icon": "Flame",
    "targetHeight": 16500,
    "gravity": 0.4,
    "jumpForce": -13,
    "speedFactor": 1.8,
    "wind": 0,
    "bgGradient": [
      "#180303",
      "#3b0707",
      "#600a0a"
    ],
    "platformColor": "#dc2626",
    "platformBorder": "#fca5a5",
    "ballGlow": "#ef4444",
    "description": "O abismo tectônico mais profundo e perigoso. Rochas de obsidiana incandescentes deslizam sobre rios de magma vivo.",
    "hazards": [
      "moving",
      "conveyor",
      "fragile"
    ],
    "mechanic": "Esteiras de rocha vulcânica e gravidade extrema.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 18,
    "number": 18,
    "title": "Tempestade Solar Corona",
    "theme": "solar",
    "icon": "SunMedium",
    "targetHeight": 17800,
    "gravity": 0.32,
    "jumpForce": -12.6,
    "speedFactor": 1.9,
    "wind": 0.4,
    "bgGradient": [
      "#450a0a",
      "#7c2d12",
      "#c2410c"
    ],
    "platformColor": "#fb923c",
    "platformBorder": "#ffedd5",
    "ballGlow": "#f97316",
    "description": "Na coroa incandescente de uma estrela colossal. Proeminências de plasma e ventos solares de milhões de graus.",
    "hazards": [
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "Ventos solares de plasma que empurram em direção ao vácuo.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 19,
    "number": 19,
    "title": "Cinturão de Asteroides",
    "theme": "asteroid",
    "icon": "Orbit",
    "targetHeight": 19000,
    "gravity": 0.27,
    "jumpForce": -12.4,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#0f051d",
      "#1e0b36",
      "#3b0764"
    ],
    "platformColor": "#c084fc",
    "platformBorder": "#f3e8ff",
    "ballGlow": "#d8b4fe",
    "description": "Campos densos de meteoritos em rotação contínua e poeira cósmica violeta. Pise com precisão cirúrgica.",
    "hazards": [
      "moving",
      "fragile",
      "conveyor"
    ],
    "mechanic": "Fragmentos rochosos errantes e microgravidade do cinturão.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 20,
    "number": 20,
    "title": "🏔️ Agulha Trovejante do Cânion",
    "theme": "storm",
    "icon": "Zap",
    "targetHeight": 20000,
    "gravity": 0.32,
    "jumpForce": -12.5,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#100b2b",
      "#251660",
      "#41229e"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#c4b5fd",
    "ballGlow": "#a78bfa",
    "description": "CUME DO MUNDO 4! Supere o cânion de tempestades saltando entre condutores magnéticos energizados em alta velocidade.",
    "hazards": [
      "moving",
      "conveyor",
      "springs"
    ],
    "mechanic": "Condução Eletrostática: plataformas energizadas de alta impulsão e reflexos ágeis.",
    "isBossStage": false,
    "bossColor": "#0284c7",
    "bossGlow": "#facc15",
    "rewardGems": 220,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 21,
    "number": 21,
    "title": "Monte Olimpo dos Deuses",
    "theme": "olympus",
    "icon": "Crown",
    "targetHeight": 21000,
    "gravity": 0.29,
    "jumpForce": -12.2,
    "speedFactor": 1.6,
    "wind": 0.05,
    "bgGradient": [
      "#1e1b4b",
      "#3b0764",
      "#581c87"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fde047",
    "description": "O santuário dos deuses helênicos. Colunas coríntias de mármore dourado suspensas em nuvens etéreas.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Plataformas de ouro místico com impulsão divina elevada.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 22,
    "number": 22,
    "title": "Estádio dos Campeões",
    "theme": "soccer",
    "icon": "Trophy",
    "targetHeight": 22000,
    "gravity": 0.33,
    "jumpForce": -12,
    "speedFactor": 1.65,
    "wind": 0,
    "bgGradient": [
      "#022c22",
      "#064e3b",
      "#047857"
    ],
    "platformColor": "#22c55e",
    "platformBorder": "#86efac",
    "ballGlow": "#4ade80",
    "description": "Uma arena de futebol monumental sob os holofotes! O gramado sintético perfeito para arrancadas de glória.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Efeito de quique perfeito como uma bola de futebol na grande área.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 23,
    "number": 23,
    "title": "Nau dos Mares Tempestuosos",
    "theme": "ship",
    "icon": "Anchor",
    "targetHeight": 23000,
    "layout": "horizontal",
    "targetDistance": 4000,
    "gravity": 0.36,
    "jumpForce": -11.8,
    "speedFactor": 1.7,
    "wind": -0.15,
    "bgGradient": [
      "#0f172a",
      "#1e293b",
      "#0369a1"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#7dd3fc",
    "ballGlow": "#38bdf8",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Corra pelo convés e mastros de um galeão lendário navegando por ondas oceânicas bravias. Não caia no mar!",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Percurso lateral com saltos entre plataformas marítimas. Cuidado com as vagas e o balanço do navio!",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 24,
    "number": 24,
    "title": "Primavera das Cerejeiras",
    "theme": "spring_season",
    "icon": "Flower2",
    "targetHeight": 24000,
    "gravity": 0.27,
    "jumpForce": -11.5,
    "speedFactor": 1.5,
    "wind": 0.1,
    "bgGradient": [
      "#4a044e",
      "#701a75",
      "#9d174d"
    ],
    "platformColor": "#f472b6",
    "platformBorder": "#fbcfe8",
    "ballGlow": "#f43f5e",
    "description": "Chuva suave de pétalas de sakura cor-de-rosa sob um céu oriental primaveril de serenidade absoluta.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Brisa floral flutuante que desacelera suavemente a queda.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 25,
    "number": 25,
    "title": "🏔️ Pico do Glaciar Eterno",
    "theme": "arctic",
    "icon": "Snowflake",
    "targetHeight": 25000,
    "gravity": 0.33,
    "jumpForce": -12,
    "speedFactor": 1.7,
    "friction": 0.98,
    "wind": 0.2,
    "bgGradient": [
      "#041a2f",
      "#09365e",
      "#105c9e"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#7dd3fc",
    "description": "CUME DO MUNDO 5! Escale a agulha de gelo polar no topo do mundo desafiando a inércia do gelo e ventos boreais.",
    "hazards": [
      "ice_slick",
      "wind",
      "springs"
    ],
    "mechanic": "Patinação Polar: deslizes ultra-suaves com molas de cristal de gelo.",
    "isBossStage": false,
    "bossColor": "#38bdf8",
    "bossGlow": "#ffffff",
    "rewardGems": 250,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 26,
    "number": 26,
    "title": "Multiverso dos Heróis",
    "theme": "heroes",
    "icon": "Shield",
    "targetHeight": 26000,
    "gravity": 0.3,
    "jumpForce": -12.8,
    "speedFactor": 1.8,
    "wind": 0,
    "bgGradient": [
      "#1e1b4b",
      "#1e3a8a",
      "#991b1b"
    ],
    "platformColor": "#ef4444",
    "platformBorder": "#93c5fd",
    "ballGlow": "#60a5fa",
    "description": "O epicentro das lendas heroicas! Raios de poder cósmico, escudos de vibranium e energia cinética épica.",
    "hazards": [
      "springs",
      "conveyor",
      "moving"
    ],
    "mechanic": "Super saltos cinematográficos potencializados por energia heroica.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 27,
    "number": 27,
    "title": "Córtex da Placa-Mãe",
    "theme": "computer",
    "icon": "Cpu",
    "targetHeight": 27000,
    "gravity": 0.32,
    "jumpForce": -12.4,
    "speedFactor": 1.85,
    "wind": 0,
    "bgGradient": [
      "#022c22",
      "#064e3b",
      "#0f766e"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#a7f3d0",
    "ballGlow": "#34d399",
    "description": "Caminhe pelas trilhas de cobre impresso, processadores quânticos e barramentos de fibra de alta frequência.",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "Esteiras de dados velozes simulando barramentos de clock de alta precisão.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 28,
    "number": 28,
    "title": "Sinfonia das Estrelas",
    "theme": "music",
    "icon": "Music",
    "targetHeight": 28000,
    "gravity": 0.28,
    "jumpForce": -12,
    "speedFactor": 1.7,
    "wind": 0,
    "bgGradient": [
      "#18181b",
      "#27272a",
      "#4c1d95"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#e9d5ff",
    "ballGlow": "#c084fc",
    "description": "Partituras estelares flutuantes, teclas de piano holográficas e acordes musicais ressoando no vácuo.",
    "hazards": [
      "springs",
      "fragile"
    ],
    "mechanic": "Plataformas harmônicas com saltos em cadência rítmica.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 29,
    "number": 29,
    "title": "Teia da Ciber-Rede",
    "theme": "internet",
    "icon": "Globe",
    "targetHeight": 29000,
    "gravity": 0.3,
    "jumpForce": -12.2,
    "speedFactor": 1.9,
    "wind": 0.1,
    "bgGradient": [
      "#020617",
      "#0f172a",
      "#0284c7"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#22d3ee",
    "description": "A malha de satélites e nós de fibra da rede mundial. Pacotes de dados trafegando na velocidade da luz.",
    "hazards": [
      "moving",
      "conveyor"
    ],
    "mechanic": "Roteamento acelerado com conexões que impulsionam lateralmente.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 30,
    "number": 30,
    "title": "🏔️ Cratera Primordial de Magma",
    "theme": "volcano",
    "icon": "Flame",
    "targetHeight": 30000,
    "gravity": 0.36,
    "jumpForce": -12.6,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#240905",
      "#52140a",
      "#852012"
    ],
    "platformColor": "#ef4444",
    "platformBorder": "#fca5a5",
    "ballGlow": "#f87171",
    "description": "CUME DO MUNDO 6! Escale as bordas da caldeira vulcânica sobre rochas de basalto com empuxo de ar quente térmico.",
    "hazards": [
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "Termas Vulcânicas: plataformas de basalto com empuxo de ar quente sem queda na lava.",
    "isBossStage": false,
    "bossColor": "#ea580c",
    "bossGlow": "#facc15",
    "rewardGems": 280,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 31,
    "number": 31,
    "title": "Cubo Mágico Tridimensional",
    "theme": "magic_cube",
    "icon": "Boxes",
    "targetHeight": 31000,
    "gravity": 0.29,
    "jumpForce": -12.3,
    "speedFactor": 1.95,
    "wind": 0,
    "bgGradient": [
      "#1e1b4b",
      "#312e81",
      "#1e293b"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fef08a",
    "ballGlow": "#facc15",
    "description": "Um labirinto cósmico de cubos coloridos 3x3x3 que giram e reconfiguram suas faces em tempo real.",
    "hazards": [
      "moving",
      "conveyor",
      "fragile"
    ],
    "mechanic": "Faces em rotação que alternam cores e propriedades cinéticas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 32,
    "number": 32,
    "title": "Reino Doce de Confeitos",
    "theme": "candy",
    "icon": "Cookie",
    "targetHeight": 32000,
    "gravity": 0.28,
    "jumpForce": -12,
    "speedFactor": 1.75,
    "wind": 0,
    "bgGradient": [
      "#500724",
      "#831843",
      "#be185d"
    ],
    "platformColor": "#ec4899",
    "platformBorder": "#fbcfe8",
    "ballGlow": "#f472b6",
    "description": "Montanhas de marshmallow, bengalas doces de hortelã e nuvens de algodão-doce açucarado.",
    "hazards": [
      "springs",
      "fragile"
    ],
    "mechanic": "Gelatina elástica que amortece o pouso e multiplica a propulsão do salto.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 33,
    "number": 33,
    "title": "Covil do Dragão de Fogo",
    "theme": "dragon",
    "icon": "Flame",
    "targetHeight": 33000,
    "gravity": 0.35,
    "jumpForce": -12.7,
    "speedFactor": 2,
    "wind": 0.2,
    "bgGradient": [
      "#450a0a",
      "#7f1d1d",
      "#991b1b"
    ],
    "platformColor": "#dc2626",
    "platformBorder": "#fecaca",
    "ballGlow": "#ef4444",
    "description": "Nas profundezas da caverna do dragão ancestral, onde rios de ouro fundido banham estalagmites incandescentes.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Ondas de choque térmico que exigem movimentação rápida sem paradas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 34,
    "number": 34,
    "title": "Fliperama Pixel 8-Bit",
    "theme": "arcade",
    "icon": "Gamepad2",
    "targetHeight": 34000,
    "gravity": 0.32,
    "jumpForce": -12.4,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#0f051d",
      "#2e1065",
      "#581c87"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#67e8f9",
    "ballGlow": "#22d3ee",
    "description": "Uma homenagem nostálgica aos arcades clássicos dos anos 80 com gráficos pixelados e sintetizadores chiptune.",
    "hazards": [
      "conveyor",
      "springs"
    ],
    "mechanic": "Física retrô acelerada com plataformas arcade vibrantes.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 35,
    "number": 35,
    "title": "🏔️ Torre Neural Cyberpunk",
    "theme": "cyberpunk",
    "icon": "Cpu",
    "targetHeight": 35000,
    "gravity": 0.34,
    "jumpForce": -12.8,
    "speedFactor": 2.1,
    "wind": 0,
    "bgGradient": [
      "#051c24",
      "#0d3d4f",
      "#13627d"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#67e8f9",
    "ballGlow": "#22d3ee",
    "description": "CUME DO MUNDO 7! O cume da torre de dados da metrópole neon, dominando esteiras de alta velocidade e feixes energéticos.",
    "hazards": [
      "conveyor",
      "moving",
      "springs"
    ],
    "mechanic": "Aceleração de Dados: esteiras aceleradoras e nós de salto holográficos.",
    "isBossStage": false,
    "bossColor": "#00f0ff",
    "bossGlow": "#ff0055",
    "rewardGems": 300,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 36,
    "number": 36,
    "title": "Véu da Aurora Boreal",
    "theme": "aurora",
    "icon": "Sparkles",
    "targetHeight": 36000,
    "gravity": 0.26,
    "jumpForce": -12,
    "speedFactor": 1.8,
    "wind": 0.15,
    "bgGradient": [
      "#022c22",
      "#064e3b",
      "#0369a1"
    ],
    "platformColor": "#34d399",
    "platformBorder": "#a7f3d0",
    "ballGlow": "#2dd4bf",
    "description": "Faixas ondulantes de plasma magnético verde-esmeralda e violeta cortando o céu glacial polar.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Ondas geomagnéticas que produzem saltos etéreos prolongados.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 37,
    "number": 37,
    "title": "Parque de Diversões Cósmico",
    "theme": "carnival",
    "icon": "Ticket",
    "targetHeight": 37000,
    "gravity": 0.31,
    "jumpForce": -12.6,
    "speedFactor": 2.1,
    "wind": 0,
    "bgGradient": [
      "#3b0764",
      "#701a75",
      "#a21caf"
    ],
    "platformColor": "#f43f5e",
    "platformBorder": "#fecdd3",
    "ballGlow": "#fb7185",
    "description": "Roda-gigante cósmica, montanha-russa gravitacional e tendas mágicas iluminadas por milhares de lâmpadas neon.",
    "hazards": [
      "moving",
      "springs",
      "conveyor"
    ],
    "mechanic": "Loopings acrobáticos e plataformas de montanha-russa super velozes.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 38,
    "number": 38,
    "title": "Pirâmides do Egito Ancestral",
    "theme": "pyramids",
    "icon": "Pyramid",
    "targetHeight": 38000,
    "gravity": 0.34,
    "jumpForce": -12.5,
    "speedFactor": 2.15,
    "wind": 0.2,
    "bgGradient": [
      "#451a03",
      "#713f12",
      "#a16207"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fef9c3",
    "ballGlow": "#ca8a04",
    "description": "Monumentos imortais no deserto dos faraós. Hieróglifos gravados em blocos de calcário dourado sob o Sol de Rá.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Areias do tempo com plataformas ancestrais que requerem ritmo milimétrico.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 39,
    "number": 39,
    "title": "Fábrica Steampunk de Bronze",
    "theme": "steampunk",
    "icon": "Cog",
    "targetHeight": 39000,
    "layout": "horizontal",
    "targetDistance": 5000,
    "gravity": 0.38,
    "jumpForce": -13,
    "speedFactor": 2.2,
    "wind": 0,
    "bgGradient": [
      "#292524",
      "#44403c",
      "#78350f"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fed7aa",
    "ballGlow": "#b45309",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Atravesse a fábrica steampunk repleta de caldeiras, pistões de cobre e engrenagens colossais girando!",
    "hazards": [
      "moving",
      "conveyor",
      "fragile"
    ],
    "mechanic": "Percurso lateral industrial com esteiras, vapores explosivos e plataformas giratórias de bronze!",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 40,
    "number": 40,
    "title": "🏔️ Vórtice do Horizonte Cósmico",
    "theme": "quantum",
    "icon": "Sparkles",
    "targetHeight": 40000,
    "gravity": 0.26,
    "jumpForce": -13.2,
    "speedFactor": 2.3,
    "wind": 0,
    "bgGradient": [
      "#1a082b",
      "#3b0f5e",
      "#6718a3"
    ],
    "platformColor": "#d946ef",
    "platformBorder": "#f5d0fe",
    "ballGlow": "#e879f9",
    "description": "CUME DO MUNDO 8! O cume da fenda dimensional com saltos gravitacionais leves e plataformas quânticas radiantes.",
    "hazards": [
      "springs",
      "moving",
      "conveyor"
    ],
    "mechanic": "Microgravidade Fluida: saltos prolongados com precisão acrobática.",
    "isBossStage": false,
    "bossColor": "#a855f7",
    "bossGlow": "#e879f9",
    "rewardGems": 320,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 41,
    "number": 41,
    "title": "Pedreira dos Titãs de Rocha",
    "theme": "rock",
    "icon": "Pickaxe",
    "targetHeight": 41000,
    "gravity": 0.35,
    "jumpForce": -12.6,
    "speedFactor": 2.1,
    "wind": 0,
    "bgGradient": [
      "#1c1917",
      "#292524",
      "#44403c"
    ],
    "platformColor": "#78716c",
    "platformBorder": "#d6d3d1",
    "ballGlow": "#a8a29e",
    "description": "Paredões ciclópicos de rocha de granito e ardósia. Blocos monolíticos brutos e pedregulhos instáveis.",
    "hazards": [
      "spikes",
      "moving",
      "fragile"
    ],
    "mechanic": "Pedras e cascalho que despencam da pedreira e espigões de pedra afiada.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 42,
    "number": 42,
    "title": "Fundição de Ferro e Aço",
    "theme": "iron",
    "icon": "Anvil",
    "targetHeight": 42000,
    "gravity": 0.37,
    "jumpForce": -13,
    "speedFactor": 2.2,
    "wind": 0,
    "bgGradient": [
      "#0f172a",
      "#1e293b",
      "#334155"
    ],
    "platformColor": "#64748b",
    "platformBorder": "#94a3b8",
    "ballGlow": "#cbd5e1",
    "description": "Vigas maciças de ferro fundido, correntes titânicas e caldeiras incandescentes forjando aço pesado.",
    "hazards": [
      "spikes",
      "conveyor",
      "moving"
    ],
    "mechanic": "Barras de ferro e faíscas incandescentes em ambiente metalúrgico denso.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 43,
    "number": 43,
    "title": "Serraria dos Troncos de Madeira",
    "theme": "wood",
    "icon": "Axe",
    "targetHeight": 43000,
    "gravity": 0.31,
    "jumpForce": -12.4,
    "speedFactor": 2,
    "wind": 0.1,
    "bgGradient": [
      "#271708",
      "#451a03",
      "#713f12"
    ],
    "platformColor": "#92400e",
    "platformBorder": "#fde68a",
    "ballGlow": "#b45309",
    "description": "Pilhas imensas de toras de madeira de lei, vigas de carvalho maciço e pontes rústicas suspensas.",
    "hazards": [
      "spikes",
      "fragile",
      "moving"
    ],
    "mechanic": "Troncos pesados despencando e plataformas de madeira com lascas afiadas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 44,
    "number": 44,
    "title": "Coliseu dos Heróis de Aço",
    "theme": "heroes",
    "icon": "Shield",
    "targetHeight": 44000,
    "gravity": 0.33,
    "jumpForce": -12.5,
    "speedFactor": 2.1,
    "wind": 0,
    "bgGradient": [
      "#1e1b4b",
      "#312e81",
      "#4338ca"
    ],
    "platformColor": "#6366f1",
    "platformBorder": "#a5b4fc",
    "ballGlow": "#818cf8",
    "description": "A arena dos maiores campeões da galáxia! Estandartes heróicos, símbolos titânicos e desafios de pura bravura.",
    "hazards": [
      "moving",
      "springs",
      "conveyor"
    ],
    "mechanic": "Plataformas de alta propulsão heróica e escudos de energia luminosa.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 45,
    "number": 45,
    "title": "🏔️ Pináculo Industrial de Bronze",
    "theme": "steampunk",
    "icon": "Layers",
    "targetHeight": 45000,
    "gravity": 0.35,
    "jumpForce": -12.8,
    "speedFactor": 2.2,
    "wind": 0.1,
    "bgGradient": [
      "#26150b",
      "#4f2c16",
      "#7d4521"
    ],
    "platformColor": "#f97316",
    "platformBorder": "#fed7aa",
    "ballGlow": "#fb923c",
    "description": "CUME DO MUNDO 9! A coroa da usina a vapor steampunk, navegando engrenagens monumentais e pistões de bronze amortecidos.",
    "hazards": [
      "moving",
      "conveyor",
      "springs"
    ],
    "mechanic": "Mecânica a Vapor: plataformas móveis ritmadas com amortecedores a vapor.",
    "isBossStage": false,
    "bossColor": "#b45309",
    "bossGlow": "#fed7aa",
    "rewardGems": 350,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 46,
    "number": 46,
    "title": "Singularidade do Vazio Cósmico",
    "theme": "singularity",
    "icon": "Atom",
    "targetHeight": 46000,
    "gravity": 0.38,
    "jumpForce": -13.2,
    "speedFactor": 2.3,
    "wind": -0.2,
    "bgGradient": [
      "#050505",
      "#111827",
      "#1f2937"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#e9d5ff",
    "ballGlow": "#c084fc",
    "description": "O horizonte de eventos de um buraco negro supermassivo. Distorções ópticas gravitacionais atraindo tudo ao centro.",
    "hazards": [
      "moving",
      "conveyor",
      "fragile"
    ],
    "mechanic": "Gravidade distorcida e vórtices com vento cósmico oscilante.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 47,
    "number": 47,
    "title": "Muralha do Arcade Retrô",
    "theme": "arcade",
    "icon": "Gamepad2",
    "targetHeight": 47000,
    "gravity": 0.3,
    "jumpForce": -12.6,
    "speedFactor": 2.35,
    "wind": 0,
    "bgGradient": [
      "#022c22",
      "#064e3b",
      "#047857"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#6ee7b7",
    "ballGlow": "#34d399",
    "description": "Um labirinto nostálgico pixelado com telas CRT, efeitos glitch e plataformas que parecem saídas de clássicos dos anos 80.",
    "hazards": [
      "springs",
      "moving",
      "conveyor"
    ],
    "mechanic": "Super saltos de bitscore e esteiras de alta aceleração digital.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 48,
    "number": 48,
    "title": "Santuário de Aurora Boreal",
    "theme": "aurora",
    "icon": "Sparkles",
    "targetHeight": 48000,
    "gravity": 0.29,
    "jumpForce": -12.7,
    "speedFactor": 2.2,
    "wind": 0.1,
    "bgGradient": [
      "#042f2e",
      "#115e59",
      "#0d9488"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#99f6e4",
    "ballGlow": "#2dd4bf",
    "description": "Cortinas etéreas de luz esmeralda e turquesa ondulando nos confins da estratosfera orbital.",
    "hazards": [
      "fragile",
      "springs",
      "moving"
    ],
    "mechanic": "Ondulações gravitacionais de aurora e molas de impulso quântico.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 49,
    "number": 49,
    "title": "Vórtice do Tempo Infinito",
    "theme": "cosmos",
    "icon": "Infinity",
    "targetHeight": 49000,
    "gravity": 0.27,
    "jumpForce": -13,
    "speedFactor": 2.45,
    "wind": 0,
    "bgGradient": [
      "#172554",
      "#1e3a8a",
      "#1d4ed8"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#93c5fd",
    "ballGlow": "#60a5fa",
    "description": "A penúltima fronteira! Linhas temporais se cruzando em constelações brilhantes rumo à marca de 50.000m.",
    "hazards": [
      "spikes",
      "moving",
      "conveyor",
      "springs"
    ],
    "mechanic": "Múltiplos obstáculos dinâmicos em ritmo acelerado na reta final.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 50,
    "number": 50,
    "title": "🏔️ O Grande Zênite Celestial",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 50000,
    "gravity": 0.25,
    "jumpForce": -13.5,
    "speedFactor": 2.5,
    "wind": 0,
    "bgGradient": [
      "#130a2a",
      "#2c125e",
      "#4c1d95"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#fef08a",
    "ballGlow": "#fde047",
    "description": "CUME SUPREMO AOS 50.000m! O ápice do universo onde todas as constelações celebram sua escalada vertical definitiva.",
    "hazards": [
      "moving",
      "springs",
      "conveyor"
    ],
    "mechanic": "Dança Cósmica: o percurso supremo de plataformas estelares em harmonia pura sem combate.",
    "isBossStage": false,
    "bossColor": "#f59e0b",
    "bossGlow": "#fbbf24",
    "rewardGems": 500,
    "isSummitStage": true,
    "journeyMode": "free"
  },
  {
    "id": 51,
    "number": 51,
    "title": "Trilha do Açúcar Cristal",
    "theme": "gastronomy",
    "icon": "Utensils",
    "targetHeight": 51000,
    "gravity": 0.27,
    "jumpForce": -12.7,
    "speedFactor": 1.91,
    "wind": 0,
    "bgGradient": [
      "#261502",
      "#4d2d05",
      "#78460a"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fde68a",
    "ballGlow": "#fbbf24",
    "description": "Exploração acrobática e relaxante aos 51.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas de suspiro macio com saltos amortecidos.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 52,
    "number": 52,
    "title": "Esteira de Confeitos Multicoloridos",
    "theme": "gastronomy",
    "icon": "Boxes",
    "targetHeight": 52000,
    "gravity": 0.28,
    "jumpForce": -12.7,
    "speedFactor": 1.92,
    "wind": 0,
    "bgGradient": [
      "#2a1705",
      "#54300a",
      "#854c10"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f97316",
    "description": "Exploração acrobática e relaxante aos 52.000m de altitude.",
    "hazards": [
      "conveyor",
      "springs"
    ],
    "mechanic": "Esteira rolante de confeitos crocantes e saltitantes.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 53,
    "number": 53,
    "title": "Cachoeira de Calda de Chocolate",
    "theme": "gastronomy",
    "icon": "Waves",
    "targetHeight": 53000,
    "gravity": 0.28,
    "jumpForce": -12.7,
    "speedFactor": 1.92,
    "wind": 0,
    "bgGradient": [
      "#1f0f05",
      "#3d200a",
      "#663612"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fcd34d",
    "ballGlow": "#d97706",
    "description": "Exploração acrobática e relaxante aos 53.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Gotas de chocolate aerado criando apoios flutuantes.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 54,
    "number": 54,
    "title": "Pátio dos Macarons Gigantes",
    "theme": "gastronomy",
    "icon": "Cookie",
    "targetHeight": 54000,
    "gravity": 0.29,
    "jumpForce": -12.7,
    "speedFactor": 1.93,
    "wind": 0,
    "bgGradient": [
      "#281608",
      "#4f2e10",
      "#7d4a1b"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef08a",
    "ballGlow": "#fbbf24",
    "description": "Exploração acrobática e relaxante aos 54.000m de altitude.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Superfícies de amêndoas aeradas com impulsos agradáveis.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 55,
    "number": 55,
    "title": "🏔️ Torre de Macarons & Caramelo",
    "theme": "gastronomy",
    "icon": "Sparkles",
    "targetHeight": 55000,
    "gravity": 0.3,
    "jumpForce": -12.8,
    "speedFactor": 1.94,
    "wind": 0,
    "bgGradient": [
      "#1a0c02",
      "#3d1d05",
      "#6b3309"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fbbf24",
    "description": "CUME ZEN AOS 55.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "CUME DO VALE 11: A coroa da confeitaria divina com vista espetacular e muitas gemas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1100
  },
  {
    "id": 56,
    "number": 56,
    "title": "Prado dos Braquiossauros Mansos",
    "theme": "dinosaur",
    "icon": "Footprints",
    "targetHeight": 56000,
    "gravity": 0.31,
    "jumpForce": -12.8,
    "speedFactor": 1.95,
    "wind": 0,
    "bgGradient": [
      "#062111",
      "#0d4223",
      "#156b38"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#a7f3d0",
    "ballGlow": "#34d399",
    "description": "Exploração acrobática e relaxante aos 56.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Caminhe entre os passos lentos de herbívoros colossais.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 57,
    "number": 57,
    "title": "Bosque das Samambaias Gigantes",
    "theme": "dinosaur",
    "icon": "TreePine",
    "targetHeight": 57000,
    "gravity": 0.32,
    "jumpForce": -12.8,
    "speedFactor": 1.96,
    "wind": 0,
    "bgGradient": [
      "#082414",
      "#104728",
      "#1a6e3f"
    ],
    "platformColor": "#22c55e",
    "platformBorder": "#bbf7d0",
    "ballGlow": "#4ade80",
    "description": "Exploração acrobática e relaxante aos 57.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Folhas elásticas de samambaias pré-históricas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 58,
    "number": 58,
    "title": "Lagoa dos Nenúfares Jurássicos",
    "theme": "dinosaur",
    "icon": "Waves",
    "targetHeight": 58000,
    "gravity": 0.32,
    "jumpForce": -12.8,
    "speedFactor": 1.96,
    "wind": 0,
    "bgGradient": [
      "#09261a",
      "#124d35",
      "#1e7854"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#99f6e4",
    "ballGlow": "#2dd4bf",
    "description": "Exploração acrobática e relaxante aos 58.000m de altitude.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Flores aquáticas que flutuam serenamente.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 59,
    "number": 59,
    "title": "Paredão das Pegadas Ancestrais",
    "theme": "dinosaur",
    "icon": "Footprints",
    "targetHeight": 59000,
    "gravity": 0.33,
    "jumpForce": -12.8,
    "speedFactor": 1.97,
    "wind": 0,
    "bgGradient": [
      "#0d2b1f",
      "#18543d",
      "#26805d"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#d1fae5",
    "ballGlow": "#34d399",
    "description": "Exploração acrobática e relaxante aos 59.000m de altitude.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Fósseis cravados nas rochas que revelam a história da Terra.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 60,
    "number": 60,
    "title": "🏔️ Ninho dos Pterossauros Amigáveis",
    "theme": "dinosaur",
    "icon": "Sparkles",
    "targetHeight": 60000,
    "gravity": 0.26,
    "jumpForce": -12.8,
    "speedFactor": 1.98,
    "wind": 0.15,
    "bgGradient": [
      "#051c0e",
      "#0b3d1f",
      "#126131"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ecfdf5",
    "ballGlow": "#34d399",
    "description": "CUME ZEN AOS 60.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "wind"
    ],
    "mechanic": "CUME DO VALE 12: Voe junto aos pterossauros pacíficos no topo da colina pré-histórica!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1200
  },
  {
    "id": 61,
    "number": 61,
    "title": "Estrada das Carruagens do Sol",
    "theme": "wild_west",
    "icon": "Sun",
    "targetHeight": 61000,
    "gravity": 0.27,
    "jumpForce": -12.8,
    "speedFactor": 1.99,
    "wind": -0.15,
    "bgGradient": [
      "#281406",
      "#4f280c",
      "#7d4013"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "Exploração acrobática e relaxante aos 61.000m de altitude.",
    "hazards": [
      "wind"
    ],
    "mechanic": "Brisa morna de entardecer soprando poeira brilhante.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 62,
    "number": 62,
    "title": "Moinho de Vento do Vale Seco",
    "theme": "wild_west",
    "icon": "Wind",
    "targetHeight": 62000,
    "gravity": 0.28,
    "jumpForce": -12.8,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#26150b",
      "#482a17",
      "#6f4225"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fcd34d",
    "ballGlow": "#d97706",
    "description": "Exploração acrobática e relaxante aos 62.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Hélices de madeira em rotação harmoniosa e relaxante.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 63,
    "number": 63,
    "title": "Trilha dos Cactos em Flor",
    "theme": "wild_west",
    "icon": "Flower2",
    "targetHeight": 63000,
    "gravity": 0.28,
    "jumpForce": -12.8,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#2a180c",
      "#543018",
      "#854d26"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef08a",
    "ballGlow": "#fbbf24",
    "description": "Exploração acrobática e relaxante aos 63.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Pétalas amarelas suaves que pontilham o caminho árido.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 64,
    "number": 64,
    "title": "Planalto da Mina Abandonada",
    "theme": "wild_west",
    "icon": "Pickaxe",
    "targetHeight": 64000,
    "gravity": 0.29,
    "jumpForce": -12.8,
    "speedFactor": 2.01,
    "wind": 0,
    "bgGradient": [
      "#2d1a0e",
      "#59341c",
      "#8a522c"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f97316",
    "description": "Exploração acrobática e relaxante aos 64.000m de altitude.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Vigas de carvalho com minérios brilhando no crepúsculo.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 65,
    "number": 65,
    "title": "🏔️ Ponto Alto do Pôr do Sol Dourado",
    "theme": "wild_west",
    "icon": "Sparkles",
    "targetHeight": 65000,
    "gravity": 0.3,
    "jumpForce": -12.8,
    "speedFactor": 2.02,
    "wind": -0.15,
    "bgGradient": [
      "#1f0e04",
      "#401e09",
      "#6e340f"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fef3c7",
    "ballGlow": "#f59e0b",
    "description": "CUME ZEN AOS 65.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "wind"
    ],
    "mechanic": "CUME DO VALE 13: A vista definitiva do pôr do sol mais belo do velho oeste!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1300
  },
  {
    "id": 66,
    "number": 66,
    "title": "Pista de Cooper entre Alamedas",
    "theme": "sports",
    "icon": "Medal",
    "targetHeight": 66000,
    "gravity": 0.31,
    "jumpForce": -12.9,
    "speedFactor": 2.03,
    "wind": 0,
    "bgGradient": [
      "#0a1d30",
      "#12385c",
      "#1b568c"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#22d3ee",
    "description": "Exploração acrobática e relaxante aos 66.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Piso emborrachado com absorção de impacto excelente.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 67,
    "number": 67,
    "title": "Piscina Olímpica de Águas Termais",
    "theme": "sports",
    "icon": "Waves",
    "targetHeight": 67000,
    "gravity": 0.32,
    "jumpForce": -12.9,
    "speedFactor": 2.04,
    "wind": 0,
    "bgGradient": [
      "#0d2238",
      "#16436e",
      "#2066a6"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#7dd3fc",
    "ballGlow": "#38bdf8",
    "description": "Exploração acrobática e relaxante aos 67.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Água tépida azul com impulsos flutuantes suaves.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 68,
    "number": 68,
    "title": "Trampolim Acrobático de Ginástica",
    "theme": "sports",
    "icon": "Orbit",
    "targetHeight": 68000,
    "gravity": 0.32,
    "jumpForce": -12.9,
    "speedFactor": 2.04,
    "wind": 0,
    "bgGradient": [
      "#0f2842",
      "#1a4e80",
      "#2677c2"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#bfdbfe",
    "ballGlow": "#60a5fa",
    "description": "Exploração acrobática e relaxante aos 68.000m de altitude.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Trampolins de tecido esticado que projetam saltos harmônicos.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 69,
    "number": 69,
    "title": "Velódromo Solar Circular",
    "theme": "sports",
    "icon": "Zap",
    "targetHeight": 69000,
    "gravity": 0.33,
    "jumpForce": -12.9,
    "speedFactor": 2.05,
    "wind": 0,
    "bgGradient": [
      "#0b233a",
      "#164573",
      "#236eb8"
    ],
    "platformColor": "#2563eb",
    "platformBorder": "#93c5fd",
    "ballGlow": "#3b82f6",
    "description": "Exploração acrobática e relaxante aos 69.000m de altitude.",
    "hazards": [
      "conveyor"
    ],
    "mechanic": "Pistas ovais suaves que deslizam o jogador rumo ao cume.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 70,
    "number": 70,
    "title": "🏔️ Pódio dos Saltos Harmônicos",
    "theme": "sports",
    "icon": "Sparkles",
    "targetHeight": 70000,
    "gravity": 0.26,
    "jumpForce": -12.9,
    "speedFactor": 2.06,
    "wind": 0,
    "bgGradient": [
      "#061726",
      "#0f3152",
      "#1a4e82"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#cffafe",
    "ballGlow": "#22d3ee",
    "description": "CUME ZEN AOS 70.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "CUME DO VALE 14: Celebração do espírito olímpico de paz, amizade e acrobacia!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1400
  },
  {
    "id": 71,
    "number": 71,
    "title": "Bosque do Ar Puro da Manhã",
    "theme": "health",
    "icon": "Heart",
    "targetHeight": 71000,
    "gravity": 0.27,
    "jumpForce": -12.9,
    "speedFactor": 2.07,
    "wind": 0,
    "bgGradient": [
      "#042019",
      "#084032",
      "#0d6650"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#99f6e4",
    "ballGlow": "#2dd4bf",
    "description": "Exploração acrobática e relaxante aos 71.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Gotas de orvalho fresco restaurando a vitalidade.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 72,
    "number": 72,
    "title": "Vale da Respiração Profunda",
    "theme": "health",
    "icon": "Activity",
    "targetHeight": 72000,
    "gravity": 0.28,
    "jumpForce": -12.9,
    "speedFactor": 2.08,
    "wind": 0,
    "bgGradient": [
      "#06241c",
      "#0c4737",
      "#137057"
    ],
    "platformColor": "#0d9488",
    "platformBorder": "#5eead4",
    "ballGlow": "#14b8a6",
    "description": "Exploração acrobática e relaxante aos 72.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas que sobem e descem no ritmo da respiração humana (4s in, 4s out).",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 73,
    "number": 73,
    "title": "Jardim das Ervas Medicinais",
    "theme": "health",
    "icon": "TreePine",
    "targetHeight": 73000,
    "gravity": 0.28,
    "jumpForce": -12.9,
    "speedFactor": 2.08,
    "wind": 0,
    "bgGradient": [
      "#082920",
      "#105240",
      "#188266"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#a7f3d0",
    "ballGlow": "#34d399",
    "description": "Exploração acrobática e relaxante aos 73.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Aromas calmantes de lavanda e camomila no ar límpido.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 74,
    "number": 74,
    "title": "Passarela do Fluxo Energético",
    "theme": "health",
    "icon": "Zap",
    "targetHeight": 74000,
    "gravity": 0.29,
    "jumpForce": -12.9,
    "speedFactor": 2.09,
    "wind": 0,
    "bgGradient": [
      "#092e24",
      "#125c48",
      "#1d9172"
    ],
    "platformColor": "#2dd4bf",
    "platformBorder": "#ccfbf1",
    "ballGlow": "#5eead4",
    "description": "Exploração acrobática e relaxante aos 74.000m de altitude.",
    "hazards": [
      "conveyor",
      "springs"
    ],
    "mechanic": "Correntes de íons negativos promovendo bem-estar absoluto.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 75,
    "number": 75,
    "title": "🏔️ Santuário da Serenidade & Bem-Estar",
    "theme": "health",
    "icon": "Sparkles",
    "targetHeight": 75000,
    "gravity": 0.3,
    "jumpForce": -12.9,
    "speedFactor": 2.1,
    "wind": 0,
    "bgGradient": [
      "#021712",
      "#053328",
      "#095240"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#f0fdfa",
    "ballGlow": "#2dd4bf",
    "description": "CUME ZEN AOS 75.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs"
    ],
    "mechanic": "CUME DO VALE 15: O ápice do equilíbrio mental e corporal em perfeita harmonia!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1500
  },
  {
    "id": 76,
    "number": 76,
    "title": "Arquipélago das Ilhas Polinésias",
    "theme": "continents",
    "icon": "Globe",
    "targetHeight": 76000,
    "gravity": 0.31,
    "jumpForce": -13,
    "speedFactor": 2.11,
    "wind": 0,
    "bgGradient": [
      "#06212b",
      "#0c4257",
      "#14688a"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#22d3ee",
    "description": "Exploração acrobática e relaxante aos 76.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Atóis de areia branca rodeados por águas mornas de turquesa.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 77,
    "number": 77,
    "title": "Cordilheira dos Himalaias Alvos",
    "theme": "continents",
    "icon": "Landmark",
    "targetHeight": 77000,
    "gravity": 0.32,
    "jumpForce": -13,
    "speedFactor": 2.12,
    "wind": 0,
    "bgGradient": [
      "#0a1d33",
      "#143861",
      "#1e5594"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#7dd3fc",
    "description": "Exploração acrobática e relaxante aos 77.000m de altitude.",
    "hazards": [
      "snow",
      "springs"
    ],
    "mechanic": "Picos nevados sob céu anil límpido e bandeiras de oração.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 78,
    "number": 78,
    "title": "Savana Dourada do Serengeti",
    "theme": "continents",
    "icon": "Sun",
    "targetHeight": 78000,
    "gravity": 0.32,
    "jumpForce": -13,
    "speedFactor": 2.12,
    "wind": 0.15,
    "bgGradient": [
      "#261505",
      "#4d2b0a",
      "#784410"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fde68a",
    "ballGlow": "#fbbf24",
    "description": "Exploração acrobática e relaxante aos 78.000m de altitude.",
    "hazards": [
      "wind"
    ],
    "mechanic": "Acácias ancestrais e manadas migrando no horizonte sob o sol poente.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 79,
    "number": 79,
    "title": "Cânions Esculpidos do Colorado",
    "theme": "continents",
    "icon": "Compass",
    "targetHeight": 79000,
    "gravity": 0.33,
    "jumpForce": -13,
    "speedFactor": 2.13,
    "wind": 0,
    "bgGradient": [
      "#281608",
      "#522c10",
      "#824619"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f97316",
    "description": "Exploração acrobática e relaxante aos 79.000m de altitude.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Rochas de arenito esculpidas pelo vento ao longo de eras geológicas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 80,
    "number": 80,
    "title": "🏔️ Mirante dos Seis Continentes",
    "theme": "continents",
    "icon": "Sparkles",
    "targetHeight": 80000,
    "gravity": 0.26,
    "jumpForce": -13,
    "speedFactor": 2.14,
    "wind": 0,
    "bgGradient": [
      "#04161f",
      "#093145",
      "#0f5273"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ecfeff",
    "ballGlow": "#22d3ee",
    "description": "CUME ZEN AOS 80.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "CUME DO VALE 16: Vista esférica de todo o planeta Terra sem fronteiras ou conflitos!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1600
  },
  {
    "id": 81,
    "number": 81,
    "title": "Bosques Verticais dos Arranha-Céus",
    "theme": "futuristic",
    "icon": "Cpu",
    "targetHeight": 81000,
    "gravity": 0.27,
    "jumpForce": -13,
    "speedFactor": 2.15,
    "wind": 0,
    "bgGradient": [
      "#051c24",
      "#0a3a4a",
      "#105c75"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#a7f3d0",
    "ballGlow": "#34d399",
    "description": "Exploração acrobática e relaxante aos 81.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Jardins suspensos em torres bioclimáticas futuristas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 82,
    "number": 82,
    "title": "Pátio dos Painéis Solares Fotônicos",
    "theme": "futuristic",
    "icon": "Sun",
    "targetHeight": 82000,
    "gravity": 0.28,
    "jumpForce": -13,
    "speedFactor": 2.16,
    "wind": 0,
    "bgGradient": [
      "#07222c",
      "#0d4559",
      "#146d8c"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#67e8f9",
    "ballGlow": "#22d3ee",
    "description": "Exploração acrobática e relaxante aos 82.000m de altitude.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Células solares transparentes que alimentam a cidade limpa.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 83,
    "number": 83,
    "title": "Trilhos Magnéticos Silenciosos",
    "theme": "futuristic",
    "icon": "Zap",
    "targetHeight": 83000,
    "gravity": 0.28,
    "jumpForce": -13,
    "speedFactor": 2.16,
    "wind": 0,
    "bgGradient": [
      "#092633",
      "#114f69",
      "#1a7b9e"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#7dd3fc",
    "ballGlow": "#38bdf8",
    "description": "Exploração acrobática e relaxante aos 83.000m de altitude.",
    "hazards": [
      "conveyor"
    ],
    "mechanic": "Trens maglev que deslizam a centímetros do chão sem atrito.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 84,
    "number": 84,
    "title": "Praça das Fontes Holográficas",
    "theme": "futuristic",
    "icon": "Sparkles",
    "targetHeight": 84000,
    "gravity": 0.29,
    "jumpForce": -13,
    "speedFactor": 2.17,
    "wind": 0,
    "bgGradient": [
      "#0b2b3a",
      "#155878",
      "#208ab5"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#7dd3fc",
    "description": "Exploração acrobática e relaxante aos 84.000m de altitude.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Água pura e luz holográfica dançando ao som de música ambiente suave.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 85,
    "number": 85,
    "title": "🏔️ Cúpula da Inovação Sustentável",
    "theme": "futuristic",
    "icon": "Sparkles",
    "targetHeight": 85000,
    "gravity": 0.3,
    "jumpForce": -13,
    "speedFactor": 2.18,
    "wind": 0,
    "bgGradient": [
      "#04161c",
      "#072e3b",
      "#0d4a5e"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#f0fdf4",
    "ballGlow": "#34d399",
    "description": "CUME ZEN AOS 85.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "CUME DO VALE 17: O cume da cidade perfeita onde natureza e tecnologia coexistem!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1700
  },
  {
    "id": 86,
    "number": 86,
    "title": "Colina das Nuvens Cumulus Macias",
    "theme": "sky_realm",
    "icon": "Cloud",
    "targetHeight": 86000,
    "gravity": 0.31,
    "jumpForce": -13.1,
    "speedFactor": 2.19,
    "wind": 0,
    "bgGradient": [
      "#0c1e3d",
      "#17366b",
      "#24509c"
    ],
    "platformColor": "#7dd3fc",
    "platformBorder": "#f0f9ff",
    "ballGlow": "#bae6fd",
    "description": "Exploração acrobática e relaxante aos 86.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Pisar nas nuvens agora é real com molas etéreas acolhedoras.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 87,
    "number": 87,
    "title": "Passarela do Arco-Íris Pastel",
    "theme": "sky_realm",
    "icon": "Sparkles",
    "targetHeight": 87000,
    "gravity": 0.32,
    "jumpForce": -13.1,
    "speedFactor": 2.2,
    "wind": 0,
    "bgGradient": [
      "#102242",
      "#1b3c75",
      "#2a5baf"
    ],
    "platformColor": "#f472b6",
    "platformBorder": "#fce7f3",
    "ballGlow": "#f9a8d4",
    "description": "Exploração acrobática e relaxante aos 87.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Cores suaves de prisma que inspiram tranquilidade pura.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 88,
    "number": 88,
    "title": "Mirante dos Ventos Flautistas",
    "theme": "sky_realm",
    "icon": "Wind",
    "targetHeight": 88000,
    "gravity": 0.32,
    "jumpForce": -13.1,
    "speedFactor": 2.2,
    "wind": 0.15,
    "bgGradient": [
      "#122547",
      "#1f427d",
      "#3064bd"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#7dd3fc",
    "description": "Exploração acrobática e relaxante aos 88.000m de altitude.",
    "hazards": [
      "wind"
    ],
    "mechanic": "O vento passa por canos de bambu suspensos criando melodias serenas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 89,
    "number": 89,
    "title": "Planalto das Nuvens Douradas do Amanhecer",
    "theme": "sky_realm",
    "icon": "Sun",
    "targetHeight": 89000,
    "gravity": 0.33,
    "jumpForce": -13.1,
    "speedFactor": 2.21,
    "wind": 0,
    "bgGradient": [
      "#1f1c3d",
      "#3d3369",
      "#635199"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fde047",
    "description": "Exploração acrobática e relaxante aos 89.000m de altitude.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "A luz matinal banhando as nuvens com reflexos cor de pêssego.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 90,
    "number": 90,
    "title": "🏔️ Terraço dos Sonhos Alados",
    "theme": "sky_realm",
    "icon": "Sparkles",
    "targetHeight": 90000,
    "gravity": 0.26,
    "jumpForce": -13.1,
    "speedFactor": 2.22,
    "wind": 0.15,
    "bgGradient": [
      "#08142b",
      "#102752",
      "#1b3f7a"
    ],
    "platformColor": "#7dd3fc",
    "platformBorder": "#ffffff",
    "ballGlow": "#bae6fd",
    "description": "CUME ZEN AOS 90.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "wind"
    ],
    "mechanic": "CUME DO VALE 18: O ponto mais alto dos céus de nuvens com sensação de voo sem asas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1800
  },
  {
    "id": 91,
    "number": 91,
    "title": "Salão dos Manuscritos Flutuantes",
    "theme": "olympus",
    "icon": "Landmark",
    "targetHeight": 91000,
    "gravity": 0.27,
    "jumpForce": -13.1,
    "speedFactor": 2.23,
    "wind": 0,
    "bgGradient": [
      "#1c170d",
      "#382f1b",
      "#5c4d2c"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fef08a",
    "ballGlow": "#facc15",
    "description": "Exploração acrobática e relaxante aos 91.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Livros de capa dura e papiros que servem de degraus do saber.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 92,
    "number": 92,
    "title": "Jardins Suspensos da Filosofia",
    "theme": "olympus",
    "icon": "TreePine",
    "targetHeight": 92000,
    "gravity": 0.28,
    "jumpForce": -13.1,
    "speedFactor": 2.24,
    "wind": 0,
    "bgGradient": [
      "#171c10",
      "#2e3820",
      "#4a5933"
    ],
    "platformColor": "#84cc16",
    "platformBorder": "#ecfccb",
    "ballGlow": "#a3e635",
    "description": "Exploração acrobática e relaxante aos 92.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Fontes de mármore branco cercadas de oliveiras seculares.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 93,
    "number": 93,
    "title": "Cúpula dos Astrolábios de Bronze",
    "theme": "olympus",
    "icon": "Orbit",
    "targetHeight": 93000,
    "gravity": 0.28,
    "jumpForce": -13.1,
    "speedFactor": 2.24,
    "wind": 0,
    "bgGradient": [
      "#211a0d",
      "#42341a",
      "#6b542a"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fde68a",
    "ballGlow": "#fbbf24",
    "description": "Exploração acrobática e relaxante aos 93.000m de altitude.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Instrumentos astronômicos antigos calculando rotas das estrelas.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 94,
    "number": 94,
    "title": "Galeria das Constelações Gregas",
    "theme": "olympus",
    "icon": "Sparkles",
    "targetHeight": 94000,
    "gravity": 0.29,
    "jumpForce": -13.1,
    "speedFactor": 2.25,
    "wind": 0,
    "bgGradient": [
      "#1e161c",
      "#3d2d39",
      "#63495d"
    ],
    "platformColor": "#d946ef",
    "platformBorder": "#fae8ff",
    "ballGlow": "#e879f9",
    "description": "Exploração acrobática e relaxante aos 94.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Mapas celestes gravados em placas de alabastro translúcido.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 95,
    "number": 95,
    "title": "🏔️ Grande Domo da Filosofia",
    "theme": "olympus",
    "icon": "Sparkles",
    "targetHeight": 95000,
    "gravity": 0.3,
    "jumpForce": -13.1,
    "speedFactor": 2.26,
    "wind": 0,
    "bgGradient": [
      "#120f08",
      "#262012",
      "#40361e"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fbbf24",
    "description": "CUME ZEN AOS 95.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "CUME DO VALE 19: O centro universal do conhecimento clássico sob céu estrelado límpido!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 1900
  },
  {
    "id": 96,
    "number": 96,
    "title": "Caminho de Poeira Estelar Violeta",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 96000,
    "gravity": 0.31,
    "jumpForce": -13.2,
    "speedFactor": 2.27,
    "wind": 0,
    "bgGradient": [
      "#140826",
      "#2b124f",
      "#461e80"
    ],
    "platformColor": "#c084fc",
    "platformBorder": "#f3e8ff",
    "ballGlow": "#d8b4fe",
    "description": "Exploração acrobática e relaxante aos 96.000m de altitude.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Caminhe sobre trilhas cintilantes de ametista cósmica.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 97,
    "number": 97,
    "title": "Ponte dos Cometas Pacíficos",
    "theme": "cosmos",
    "icon": "Rocket",
    "targetHeight": 97000,
    "gravity": 0.32,
    "jumpForce": -13.2,
    "speedFactor": 2.28,
    "wind": 0,
    "bgGradient": [
      "#17062b",
      "#300d57",
      "#50168f"
    ],
    "platformColor": "#e879f9",
    "platformBorder": "#fae8ff",
    "ballGlow": "#f0abfc",
    "description": "Exploração acrobática e relaxante aos 97.000m de altitude.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Caldas de gelo cósmico e partículas que aceleram suavemente a subida.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 98,
    "number": 98,
    "title": "Oásis da Nebulosa de Órion",
    "theme": "cosmos",
    "icon": "Orbit",
    "targetHeight": 98000,
    "gravity": 0.32,
    "jumpForce": -13.2,
    "speedFactor": 2.28,
    "wind": 0,
    "bgGradient": [
      "#09122e",
      "#13255c",
      "#1f3c91"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#7dd3fc",
    "description": "Exploração acrobática e relaxante aos 98.000m de altitude.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Gases estelares de magenta e turquesa aquecendo os saltos acrobáticos.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 99,
    "number": 99,
    "title": "Terraço do Infinito Sem Barreiras",
    "theme": "cosmos",
    "icon": "Infinity",
    "targetHeight": 99000,
    "gravity": 0.33,
    "jumpForce": -13.2,
    "speedFactor": 2.29,
    "wind": 0,
    "bgGradient": [
      "#160824",
      "#2e124a",
      "#4c1e7a"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#fef08a",
    "ballGlow": "#fde047",
    "description": "Exploração acrobática e relaxante aos 99.000m de altitude.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "A penúltima etapa dos 100.000m onde o tempo parece parar.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 100,
    "number": 100,
    "title": "🏔️ Santuário da Harmonia Estelar aos 100.000m",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 100000,
    "gravity": 0.26,
    "jumpForce": -13.2,
    "speedFactor": 2.3,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18072b",
      "#360f5c"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#fef3c7",
    "ballGlow": "#f59e0b",
    "description": "CUME ZEN AOS 100.000m! Conquiste o topo deste mundo sereno!",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "CUME SUPREMO DA JORNADA LIVRE AOS 100.000m: Celebração mágica do ápice zen com 3.000 Gemas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 3000
  },
  {
    "id": 101,
    "number": 101,
    "title": "Pomar Tropical: Trilha 1",
    "theme": "forest",
    "icon": "Compass",
    "targetHeight": 101000,
    "gravity": 0.3,
    "jumpForce": -13.5,
    "speedFactor": 2.61,
    "wind": 0,
    "bgGradient": [
      "#051f15",
      "#0b3d2b",
      "#136145"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 101.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 102,
    "number": 102,
    "title": "Pomar Tropical: Trilha 2",
    "theme": "forest",
    "icon": "Compass",
    "targetHeight": 102000,
    "gravity": 0.31,
    "jumpForce": -13.5,
    "speedFactor": 2.62,
    "wind": 0,
    "bgGradient": [
      "#051f15",
      "#0b3d2b",
      "#136145"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 102.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 103,
    "number": 103,
    "title": "Pomar Tropical: Trilha 3",
    "theme": "forest",
    "icon": "Compass",
    "targetHeight": 103000,
    "gravity": 0.32,
    "jumpForce": -13.5,
    "speedFactor": 2.62,
    "wind": 0,
    "bgGradient": [
      "#051f15",
      "#0b3d2b",
      "#136145"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 103.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 104,
    "number": 104,
    "title": "Pomar Tropical: Trilha 4",
    "theme": "forest",
    "icon": "Compass",
    "targetHeight": 104000,
    "gravity": 0.25,
    "jumpForce": -13.5,
    "speedFactor": 2.63,
    "wind": 0,
    "bgGradient": [
      "#051f15",
      "#0b3d2b",
      "#136145"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 104.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 105,
    "number": 105,
    "title": "🏔️ CUME 21: Copa do Baobá das Estrelas",
    "theme": "forest",
    "icon": "Sparkles",
    "targetHeight": 105000,
    "gravity": 0.26,
    "jumpForce": -13.6,
    "speedFactor": 2.64,
    "wind": 0,
    "bgGradient": [
      "#051f15",
      "#0b3d2b",
      "#136145"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "CUME ZEN AOS 105.000m! Contemple Copa do Baobá das Estrelas em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 2000
  },
  {
    "id": 106,
    "number": 106,
    "title": "Âmbar Brilhante: Trilha 1",
    "theme": "crystal",
    "icon": "Compass",
    "targetHeight": 106000,
    "gravity": 0.27,
    "jumpForce": -13.6,
    "speedFactor": 2.65,
    "wind": 0,
    "bgGradient": [
      "#1f1404",
      "#3d2808",
      "#69460e"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "Subida contemplativa aos 106.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 107,
    "number": 107,
    "title": "Âmbar Brilhante: Trilha 2",
    "theme": "crystal",
    "icon": "Compass",
    "targetHeight": 107000,
    "gravity": 0.28,
    "jumpForce": -13.6,
    "speedFactor": 2.66,
    "wind": 0,
    "bgGradient": [
      "#1f1404",
      "#3d2808",
      "#69460e"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "Subida contemplativa aos 107.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 108,
    "number": 108,
    "title": "Âmbar Brilhante: Trilha 3",
    "theme": "crystal",
    "icon": "Compass",
    "targetHeight": 108000,
    "gravity": 0.29,
    "jumpForce": -13.6,
    "speedFactor": 2.66,
    "wind": 0,
    "bgGradient": [
      "#1f1404",
      "#3d2808",
      "#69460e"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "Subida contemplativa aos 108.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 109,
    "number": 109,
    "title": "Âmbar Brilhante: Trilha 4",
    "theme": "crystal",
    "icon": "Compass",
    "targetHeight": 109000,
    "gravity": 0.3,
    "jumpForce": -13.6,
    "speedFactor": 2.67,
    "wind": 0,
    "bgGradient": [
      "#1f1404",
      "#3d2808",
      "#69460e"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "Subida contemplativa aos 109.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 110,
    "number": 110,
    "title": "🏔️ CUME 22: Gruta Central de Quartzo Dourado",
    "theme": "crystal",
    "icon": "Sparkles",
    "targetHeight": 110000,
    "gravity": 0.31,
    "jumpForce": -13.6,
    "speedFactor": 2.68,
    "wind": 0,
    "bgGradient": [
      "#1f1404",
      "#3d2808",
      "#69460e"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "CUME ZEN AOS 110.000m! Contemple Gruta Central de Quartzo Dourado em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 2150
  },
  {
    "id": 111,
    "number": 111,
    "title": "Oásis da Brisa: Trilha 1",
    "theme": "desert",
    "icon": "Compass",
    "targetHeight": 111000,
    "gravity": 0.32,
    "jumpForce": -13.6,
    "speedFactor": 2.69,
    "wind": 0,
    "bgGradient": [
      "#1c1408",
      "#382810",
      "#5c421b"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#2dd4bf",
    "description": "Subida contemplativa aos 111.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 112,
    "number": 112,
    "title": "Oásis da Brisa: Trilha 2",
    "theme": "desert",
    "icon": "Compass",
    "targetHeight": 112000,
    "gravity": 0.25,
    "jumpForce": -13.6,
    "speedFactor": 2.7,
    "wind": 0,
    "bgGradient": [
      "#1c1408",
      "#382810",
      "#5c421b"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#2dd4bf",
    "description": "Subida contemplativa aos 112.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 113,
    "number": 113,
    "title": "Oásis da Brisa: Trilha 3",
    "theme": "desert",
    "icon": "Compass",
    "targetHeight": 113000,
    "gravity": 0.26,
    "jumpForce": -13.6,
    "speedFactor": 2.7,
    "wind": 0,
    "bgGradient": [
      "#1c1408",
      "#382810",
      "#5c421b"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#2dd4bf",
    "description": "Subida contemplativa aos 113.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 114,
    "number": 114,
    "title": "Oásis da Brisa: Trilha 4",
    "theme": "desert",
    "icon": "Compass",
    "targetHeight": 114000,
    "gravity": 0.27,
    "jumpForce": -13.6,
    "speedFactor": 2.71,
    "wind": 0,
    "bgGradient": [
      "#1c1408",
      "#382810",
      "#5c421b"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#2dd4bf",
    "description": "Subida contemplativa aos 114.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 115,
    "number": 115,
    "title": "🏔️ CUME 23: Mirante das Dunas Floridas",
    "theme": "desert",
    "icon": "Sparkles",
    "targetHeight": 115000,
    "gravity": 0.28,
    "jumpForce": -13.7,
    "speedFactor": 2.72,
    "wind": 0,
    "bgGradient": [
      "#1c1408",
      "#382810",
      "#5c421b"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#2dd4bf",
    "description": "CUME ZEN AOS 115.000m! Contemple Mirante das Dunas Floridas em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 2300
  },
  {
    "id": 116,
    "number": 116,
    "title": "Alpes Alpinos: Trilha 1",
    "theme": "arctic",
    "icon": "Compass",
    "targetHeight": 116000,
    "gravity": 0.29,
    "jumpForce": -13.7,
    "speedFactor": 2.73,
    "wind": 0,
    "bgGradient": [
      "#071c2e",
      "#0f385c",
      "#185991"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Subida contemplativa aos 116.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 117,
    "number": 117,
    "title": "Alpes Alpinos: Trilha 2",
    "theme": "arctic",
    "icon": "Compass",
    "targetHeight": 117000,
    "gravity": 0.3,
    "jumpForce": -13.7,
    "speedFactor": 2.74,
    "wind": 0,
    "bgGradient": [
      "#071c2e",
      "#0f385c",
      "#185991"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Subida contemplativa aos 117.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 118,
    "number": 118,
    "title": "Alpes Alpinos: Trilha 3",
    "theme": "arctic",
    "icon": "Compass",
    "targetHeight": 118000,
    "gravity": 0.31,
    "jumpForce": -13.7,
    "speedFactor": 2.74,
    "wind": 0,
    "bgGradient": [
      "#071c2e",
      "#0f385c",
      "#185991"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Subida contemplativa aos 118.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 119,
    "number": 119,
    "title": "Alpes Alpinos: Trilha 4",
    "theme": "arctic",
    "icon": "Compass",
    "targetHeight": 119000,
    "gravity": 0.32,
    "jumpForce": -13.7,
    "speedFactor": 2.75,
    "wind": 0,
    "bgGradient": [
      "#071c2e",
      "#0f385c",
      "#185991"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Subida contemplativa aos 119.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 120,
    "number": 120,
    "title": "🏔️ CUME 24: Cume do Mont Blanc Nevado",
    "theme": "arctic",
    "icon": "Sparkles",
    "targetHeight": 120000,
    "gravity": 0.25,
    "jumpForce": -13.7,
    "speedFactor": 2.76,
    "wind": 0,
    "bgGradient": [
      "#071c2e",
      "#0f385c",
      "#185991"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "CUME ZEN AOS 120.000m! Contemple Cume do Mont Blanc Nevado em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 2450
  },
  {
    "id": 121,
    "number": 121,
    "title": "Farol da Costa: Trilha 1",
    "theme": "ocean",
    "icon": "Compass",
    "targetHeight": 121000,
    "gravity": 0.26,
    "jumpForce": -13.7,
    "speedFactor": 2.77,
    "wind": 0,
    "bgGradient": [
      "#041a29",
      "#083452",
      "#0d5382"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 121.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 122,
    "number": 122,
    "title": "Farol da Costa: Trilha 2",
    "theme": "ocean",
    "icon": "Compass",
    "targetHeight": 122000,
    "gravity": 0.27,
    "jumpForce": -13.7,
    "speedFactor": 2.78,
    "wind": 0,
    "bgGradient": [
      "#041a29",
      "#083452",
      "#0d5382"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 122.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 123,
    "number": 123,
    "title": "Farol da Costa: Trilha 3",
    "theme": "ocean",
    "icon": "Compass",
    "targetHeight": 123000,
    "gravity": 0.28,
    "jumpForce": -13.7,
    "speedFactor": 2.78,
    "wind": 0,
    "bgGradient": [
      "#041a29",
      "#083452",
      "#0d5382"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 123.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 124,
    "number": 124,
    "title": "Farol da Costa: Trilha 4",
    "theme": "ocean",
    "icon": "Compass",
    "targetHeight": 124000,
    "gravity": 0.29,
    "jumpForce": -13.7,
    "speedFactor": 2.79,
    "wind": 0,
    "bgGradient": [
      "#041a29",
      "#083452",
      "#0d5382"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 124.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 125,
    "number": 125,
    "title": "🏔️ CUME 25: Lanterna do Farol Celestial",
    "theme": "ocean",
    "icon": "Sparkles",
    "targetHeight": 125000,
    "gravity": 0.3,
    "jumpForce": -13.8,
    "speedFactor": 2.8,
    "wind": 0,
    "bgGradient": [
      "#041a29",
      "#083452",
      "#0d5382"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "CUME ZEN AOS 125.000m! Contemple Lanterna do Farol Celestial em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 2600
  },
  {
    "id": 126,
    "number": 126,
    "title": "Café & Cacau: Trilha 1",
    "theme": "gastronomy",
    "icon": "Compass",
    "targetHeight": 126000,
    "gravity": 0.31,
    "jumpForce": -13.8,
    "speedFactor": 2.81,
    "wind": 0,
    "bgGradient": [
      "#211005",
      "#42200a",
      "#6e3612"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#ffffff",
    "ballGlow": "#f59e0b",
    "description": "Subida contemplativa aos 126.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 127,
    "number": 127,
    "title": "Café & Cacau: Trilha 2",
    "theme": "gastronomy",
    "icon": "Compass",
    "targetHeight": 127000,
    "gravity": 0.32,
    "jumpForce": -13.8,
    "speedFactor": 2.82,
    "wind": 0,
    "bgGradient": [
      "#211005",
      "#42200a",
      "#6e3612"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#ffffff",
    "ballGlow": "#f59e0b",
    "description": "Subida contemplativa aos 127.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 128,
    "number": 128,
    "title": "Café & Cacau: Trilha 3",
    "theme": "gastronomy",
    "icon": "Compass",
    "targetHeight": 128000,
    "gravity": 0.25,
    "jumpForce": -13.8,
    "speedFactor": 2.82,
    "wind": 0,
    "bgGradient": [
      "#211005",
      "#42200a",
      "#6e3612"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#ffffff",
    "ballGlow": "#f59e0b",
    "description": "Subida contemplativa aos 128.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 129,
    "number": 129,
    "title": "Café & Cacau: Trilha 4",
    "theme": "gastronomy",
    "icon": "Compass",
    "targetHeight": 129000,
    "gravity": 0.26,
    "jumpForce": -13.8,
    "speedFactor": 2.83,
    "wind": 0,
    "bgGradient": [
      "#211005",
      "#42200a",
      "#6e3612"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#ffffff",
    "ballGlow": "#f59e0b",
    "description": "Subida contemplativa aos 129.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 130,
    "number": 130,
    "title": "🏔️ CUME 26: Terraço do Café das Nuvens",
    "theme": "gastronomy",
    "icon": "Sparkles",
    "targetHeight": 130000,
    "gravity": 0.27,
    "jumpForce": -13.8,
    "speedFactor": 2.84,
    "wind": 0,
    "bgGradient": [
      "#211005",
      "#42200a",
      "#6e3612"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#ffffff",
    "ballGlow": "#f59e0b",
    "description": "CUME ZEN AOS 130.000m! Contemple Terraço do Café das Nuvens em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 2750
  },
  {
    "id": 131,
    "number": 131,
    "title": "Trilha do Silêncio: Trilha 1",
    "theme": "health",
    "icon": "Compass",
    "targetHeight": 131000,
    "gravity": 0.28,
    "jumpForce": -13.8,
    "speedFactor": 2.85,
    "wind": 0,
    "bgGradient": [
      "#07211a",
      "#0e4235",
      "#166954"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 131.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 132,
    "number": 132,
    "title": "Trilha do Silêncio: Trilha 2",
    "theme": "health",
    "icon": "Compass",
    "targetHeight": 132000,
    "gravity": 0.29,
    "jumpForce": -13.8,
    "speedFactor": 2.86,
    "wind": 0,
    "bgGradient": [
      "#07211a",
      "#0e4235",
      "#166954"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 132.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 133,
    "number": 133,
    "title": "Trilha do Silêncio: Trilha 3",
    "theme": "health",
    "icon": "Compass",
    "targetHeight": 133000,
    "gravity": 0.3,
    "jumpForce": -13.8,
    "speedFactor": 2.86,
    "wind": 0,
    "bgGradient": [
      "#07211a",
      "#0e4235",
      "#166954"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 133.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 134,
    "number": 134,
    "title": "Trilha do Silêncio: Trilha 4",
    "theme": "health",
    "icon": "Compass",
    "targetHeight": 134000,
    "gravity": 0.31,
    "jumpForce": -13.8,
    "speedFactor": 2.87,
    "wind": 0,
    "bgGradient": [
      "#07211a",
      "#0e4235",
      "#166954"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "Subida contemplativa aos 134.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 135,
    "number": 135,
    "title": "🏔️ CUME 27: Ápice da Calmaria Interior",
    "theme": "health",
    "icon": "Sparkles",
    "targetHeight": 135000,
    "gravity": 0.32,
    "jumpForce": -13.8,
    "speedFactor": 2.88,
    "wind": 0,
    "bgGradient": [
      "#07211a",
      "#0e4235",
      "#166954"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#ffffff",
    "ballGlow": "#34d399",
    "description": "CUME ZEN AOS 135.000m! Contemple Ápice da Calmaria Interior em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 2900
  },
  {
    "id": 136,
    "number": 136,
    "title": "Telescópio Estelar: Trilha 1",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 136000,
    "gravity": 0.25,
    "jumpForce": -13.9,
    "speedFactor": 2.89,
    "wind": 0,
    "bgGradient": [
      "#0a1029",
      "#142052",
      "#203382"
    ],
    "platformColor": "#818cf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#a5b4fc",
    "description": "Subida contemplativa aos 136.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 137,
    "number": 137,
    "title": "Telescópio Estelar: Trilha 2",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 137000,
    "gravity": 0.26,
    "jumpForce": -13.9,
    "speedFactor": 2.9,
    "wind": 0,
    "bgGradient": [
      "#0a1029",
      "#142052",
      "#203382"
    ],
    "platformColor": "#818cf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#a5b4fc",
    "description": "Subida contemplativa aos 137.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 138,
    "number": 138,
    "title": "Telescópio Estelar: Trilha 3",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 138000,
    "gravity": 0.27,
    "jumpForce": -13.9,
    "speedFactor": 2.9,
    "wind": 0,
    "bgGradient": [
      "#0a1029",
      "#142052",
      "#203382"
    ],
    "platformColor": "#818cf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#a5b4fc",
    "description": "Subida contemplativa aos 138.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 139,
    "number": 139,
    "title": "Telescópio Estelar: Trilha 4",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 139000,
    "gravity": 0.28,
    "jumpForce": -13.9,
    "speedFactor": 2.91,
    "wind": 0,
    "bgGradient": [
      "#0a1029",
      "#142052",
      "#203382"
    ],
    "platformColor": "#818cf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#a5b4fc",
    "description": "Subida contemplativa aos 139.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 140,
    "number": 140,
    "title": "🏔️ CUME 28: Mirante dos Anéis de Saturno",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 140000,
    "gravity": 0.29,
    "jumpForce": -13.9,
    "speedFactor": 2.92,
    "wind": 0,
    "bgGradient": [
      "#0a1029",
      "#142052",
      "#203382"
    ],
    "platformColor": "#818cf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#a5b4fc",
    "description": "CUME ZEN AOS 140.000m! Contemple Mirante dos Anéis de Saturno em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 3050
  },
  {
    "id": 141,
    "number": 141,
    "title": "Sete Ilhas: Trilha 1",
    "theme": "continents",
    "icon": "Compass",
    "targetHeight": 141000,
    "gravity": 0.3,
    "jumpForce": -13.9,
    "speedFactor": 2.93,
    "wind": 0,
    "bgGradient": [
      "#051c24",
      "#0a3747",
      "#10566e"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 141.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 142,
    "number": 142,
    "title": "Sete Ilhas: Trilha 2",
    "theme": "continents",
    "icon": "Compass",
    "targetHeight": 142000,
    "gravity": 0.31,
    "jumpForce": -13.9,
    "speedFactor": 2.94,
    "wind": 0,
    "bgGradient": [
      "#051c24",
      "#0a3747",
      "#10566e"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 142.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 143,
    "number": 143,
    "title": "Sete Ilhas: Trilha 3",
    "theme": "continents",
    "icon": "Compass",
    "targetHeight": 143000,
    "gravity": 0.32,
    "jumpForce": -13.9,
    "speedFactor": 2.94,
    "wind": 0,
    "bgGradient": [
      "#051c24",
      "#0a3747",
      "#10566e"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 143.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 144,
    "number": 144,
    "title": "Sete Ilhas: Trilha 4",
    "theme": "continents",
    "icon": "Compass",
    "targetHeight": 144000,
    "gravity": 0.25,
    "jumpForce": -13.9,
    "speedFactor": 2.95,
    "wind": 0,
    "bgGradient": [
      "#051c24",
      "#0a3747",
      "#10566e"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "Subida contemplativa aos 144.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 145,
    "number": 145,
    "title": "🏔️ CUME 29: Mirante do Arquipélago Esmeralda",
    "theme": "continents",
    "icon": "Sparkles",
    "targetHeight": 145000,
    "gravity": 0.26,
    "jumpForce": -13.9,
    "speedFactor": 2.96,
    "wind": 0,
    "bgGradient": [
      "#051c24",
      "#0a3747",
      "#10566e"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#ffffff",
    "ballGlow": "#22d3ee",
    "description": "CUME ZEN AOS 145.000m! Contemple Mirante do Arquipélago Esmeralda em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 3200
  },
  {
    "id": 146,
    "number": 146,
    "title": "Zênite da Paz 150k: Trilha 1",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 146000,
    "gravity": 0.27,
    "jumpForce": -14,
    "speedFactor": 2.97,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18072b",
      "#360f5c"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Subida contemplativa aos 146.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 147,
    "number": 147,
    "title": "Zênite da Paz 150k: Trilha 2",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 147000,
    "gravity": 0.28,
    "jumpForce": -14,
    "speedFactor": 2.98,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18072b",
      "#360f5c"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Subida contemplativa aos 147.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 148,
    "number": 148,
    "title": "Zênite da Paz 150k: Trilha 3",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 148000,
    "gravity": 0.29,
    "jumpForce": -14,
    "speedFactor": 2.98,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18072b",
      "#360f5c"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Subida contemplativa aos 148.000m na Jornada Livre.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 149,
    "number": 149,
    "title": "Zênite da Paz 150k: Trilha 4",
    "theme": "cosmos",
    "icon": "Compass",
    "targetHeight": 149000,
    "gravity": 0.3,
    "jumpForce": -14,
    "speedFactor": 2.99,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18072b",
      "#360f5c"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Subida contemplativa aos 149.000m na Jornada Livre.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Plataformas suaves com ritmo aeróbico agradável.",
    "isBossStage": false,
    "isSummitStage": false,
    "journeyMode": "free"
  },
  {
    "id": 150,
    "number": 150,
    "title": "🏔️ CUME 30: O Ápice da Harmonia Infinita",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 150000,
    "gravity": 0.31,
    "jumpForce": -14,
    "speedFactor": 3,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18072b",
      "#360f5c"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "CUME ZEN AOS 150.000m! Contemple O Ápice da Harmonia Infinita em paz absoluta.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Super Cume: Saltos amplificados e celebração com gemas cósmicas!",
    "isBossStage": false,
    "isSummitStage": true,
    "journeyMode": "free",
    "rewardGems": 5000
  }
];
