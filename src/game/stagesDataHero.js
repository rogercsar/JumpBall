/**
 * JUMPBALL - MODO HERÓI: 30 MUNDOS E 150 FASES (Fases 1 a 150)
 * Inclui os 10 Mundos Clássicos intactos (Fases 1 a 50) + 20 Novos Mundos Inéditos (Fases 51 a 150)
 * com 30 Batalhas de Chefão e Múltiplas Fases no Modo Horizontal!
 */

export const HERO_WORLDS = [
  {
    "id": 1,
    "name": "Mundo 1: Reino da Natureza",
    "shortName": "Natureza",
    "theme": "forest",
    "icon": "TreePine",
    "gradient": "from-emerald-950/60 to-slate-900",
    "border": "border-emerald-500/40",
    "accentColor": "#10b981",
    "description": "Bosques ancestrais, plataformas de madeira e ventos da floresta.",
    "stageRange": [
      1,
      5
    ],
    "bossStageNumber": 5,
    "bossName": "Silvano",
    "bossTitle": "Titã da Mata"
  },
  {
    "id": 2,
    "name": "Mundo 2: Areias do Tempo",
    "shortName": "Areias",
    "theme": "desert",
    "icon": "Sun",
    "gradient": "from-amber-950/60 to-slate-900",
    "border": "border-amber-500/40",
    "accentColor": "#f59e0b",
    "description": "Dunas de areia fina, pirâmides douradas e rajadas quentes.",
    "stageRange": [
      6,
      10
    ],
    "bossStageNumber": 10,
    "bossName": "Faraó de Rá",
    "bossTitle": "Guardião das Areias Cósmicas"
  },
  {
    "id": 3,
    "name": "Mundo 3: Abismo Oceânico",
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
    "bossName": "Leviatã",
    "bossTitle": "Monarca das Profundezas"
  },
  {
    "id": 4,
    "name": "Mundo 4: Cânion Trovejante",
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
    "bossName": "Colosso do Trovão",
    "bossTitle": "Ira Eletrizada"
  },
  {
    "id": 5,
    "name": "Mundo 5: Terras Glaciais",
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
    "bossName": "Gólem Glacial",
    "bossTitle": "Soberano do Gelo"
  },
  {
    "id": 6,
    "name": "Mundo 6: Forja do Magma",
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
    "bossName": "Dragão de Magma",
    "bossTitle": "Fúria Vulcânica"
  },
  {
    "id": 7,
    "name": "Mundo 7: Cyberpunk Neon",
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
    "bossName": "Overlord IA",
    "bossTitle": "Mestre Cibernético"
  },
  {
    "id": 8,
    "name": "Mundo 8: Hiperespaço Quântico",
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
    "bossName": "Singularidade",
    "bossTitle": "Devorador do Multiverso"
  },
  {
    "id": 9,
    "name": "Mundo 9: Fábrica Steampunk",
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
    "bossName": "Autômato de Bronze",
    "bossTitle": "Titã da Forja Steampunk"
  },
  {
    "id": 10,
    "name": "Mundo 10: O Ápice Cósmico",
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
    "bossName": "O Guardião Supremo do Zênite",
    "bossTitle": "O Ápice Cósmico"
  },
  {
    "id": 11,
    "name": "Mundo 11: Núcleo Quântico Cibernético",
    "shortName": "Córtex Quântico",
    "theme": "quantum_core",
    "icon": "Cpu",
    "gradient": "from-cyan-950/70 to-blue-950/80",
    "border": "border-cyan-400/40",
    "accentColor": "#06b6d4",
    "description": "Processadores subatômicos, feixes de luz taquiônica e esteiras de dados ultrarrápidas.",
    "stageRange": [
      51,
      55
    ],
    "bossStageNumber": 55,
    "bossName": "Nexus Quântico 9000",
    "bossTitle": "IA Central da Rede Quântica"
  },
  {
    "id": 12,
    "name": "Mundo 12: Desfiladeiro do Velho Oeste",
    "shortName": "Faroeste Selvagem",
    "theme": "wild_west",
    "icon": "Crosshair",
    "gradient": "from-amber-950/70 to-stone-900",
    "border": "border-amber-600/40",
    "accentColor": "#d97706",
    "description": "Cânions de arenito vermelho, minas de ouro abandonadas e ventos de areia com pólvora.",
    "stageRange": [
      56,
      60
    ],
    "bossStageNumber": 60,
    "bossName": "Pistoleiro Espectral",
    "bossTitle": "O Vingador do Cânion"
  },
  {
    "id": 13,
    "name": "Mundo 13: Cratera Jurássica dos Dinossauros",
    "shortName": "Era Jurássica",
    "theme": "dinosaur",
    "icon": "Footprints",
    "gradient": "from-emerald-950/70 to-amber-950/60",
    "border": "border-lime-500/40",
    "accentColor": "#84cc16",
    "description": "Selva primordial, ossos colossais fossilizados e ninhos de dinossauros predadores.",
    "stageRange": [
      61,
      65
    ],
    "bossStageNumber": 65,
    "bossName": "T-Rex Titânico Apex",
    "bossTitle": "O Predador Supremo"
  },
  {
    "id": 14,
    "name": "Mundo 14: Coliseu da Mitologia Grega",
    "shortName": "Grécia Antiga",
    "theme": "olympus",
    "icon": "Landmark",
    "gradient": "from-amber-950/60 to-indigo-950/70",
    "border": "border-amber-400/40",
    "accentColor": "#f59e0b",
    "description": "Colunas coríntias em ruínas, labirintos de pedra sagrada e a fúria das bestas míticas.",
    "stageRange": [
      66,
      70
    ],
    "bossStageNumber": 70,
    "bossName": "Minotauro de Bronze",
    "bossTitle": "Guardião do Labirinto"
  },
  {
    "id": 15,
    "name": "Mundo 15: Arena dos Esportes Radicais",
    "shortName": "Esportes X",
    "theme": "sports",
    "icon": "Medal",
    "gradient": "from-blue-950/70 to-rose-950/60",
    "border": "border-blue-400/40",
    "accentColor": "#3b82f6",
    "description": "Mega-rampas de skate voador, trampolins de alta impulsão e pistas olímpicas suspensas.",
    "stageRange": [
      71,
      75
    ],
    "bossStageNumber": 75,
    "bossName": "Gladiador Campeão Titã",
    "bossTitle": "O Soberano das Arenas"
  },
  {
    "id": 16,
    "name": "Mundo 16: Caldeirão Gastronômico Flamejante",
    "shortName": "Forja Culinária",
    "theme": "gastronomy",
    "icon": "Utensils",
    "gradient": "from-orange-950/70 to-red-950/70",
    "border": "border-orange-500/40",
    "accentColor": "#ea580c",
    "description": "Panelas colossais ferventes, grelhas incandescentes e vapores aromáticos superaquecidos.",
    "stageRange": [
      76,
      80
    ],
    "bossStageNumber": 80,
    "bossName": "Chef Magmático Vulcânico",
    "bossTitle": "Mestre da Fornalha Flamejante"
  },
  {
    "id": 17,
    "name": "Mundo 17: Fita de DNA & Biologia Celular",
    "shortName": "Mundo Celular",
    "theme": "health",
    "icon": "Dna",
    "gradient": "from-teal-950/70 to-emerald-950/80",
    "border": "border-teal-400/40",
    "accentColor": "#14b8a6",
    "description": "Hélices de DNA luminosas, sinapses bioelétricas pulsantes e anticorpos em alta velocidade.",
    "stageRange": [
      81,
      85
    ],
    "bossStageNumber": 85,
    "bossName": "Patógeno Quântico Alfa",
    "bossTitle": "Mutação Viral Hipercinética"
  },
  {
    "id": 18,
    "name": "Mundo 18: Estratosfera & Fenômenos Celestes",
    "shortName": "Céus Polares",
    "theme": "sky_realm",
    "icon": "Cloud",
    "gradient": "from-indigo-950/70 to-sky-950/70",
    "border": "border-sky-400/40",
    "accentColor": "#38bdf8",
    "description": "Nuvens de tempestade iônica, auroras boreais congeladas e rajadas estratosféricas cortantes.",
    "stageRange": [
      86,
      90
    ],
    "bossStageNumber": 90,
    "bossName": "Fênix das Tempestades",
    "bossTitle": "Senhora dos Ventos Polares"
  },
  {
    "id": 19,
    "name": "Mundo 19: Rota das Maravilhas Globais",
    "shortName": "Maravilhas da Terra",
    "theme": "continents",
    "icon": "Globe",
    "gradient": "from-emerald-950/60 to-indigo-950/70",
    "border": "border-emerald-400/40",
    "accentColor": "#10b981",
    "description": "Pirâmides maias, muralhas ancestrais e monumentos colossais suspensos entre continentes.",
    "stageRange": [
      91,
      95
    ],
    "bossStageNumber": 95,
    "bossName": "Esfinge Imperial Global",
    "bossTitle": "Guardião dos Sete Continentes"
  },
  {
    "id": 20,
    "name": "Mundo 20: Apoteose Futurista Dimensional",
    "shortName": "Hiperespaço 100k",
    "theme": "futuristic",
    "icon": "Rocket",
    "gradient": "from-purple-950/80 to-slate-950",
    "border": "border-purple-400/50",
    "accentColor": "#c084fc",
    "description": "A barreira lendária dos 100.000m! Portais de dobra estelar e energia pura condensada.",
    "stageRange": [
      96,
      100
    ],
    "bossStageNumber": 100,
    "bossName": "Chronos, O Senhor das Eras",
    "bossTitle": "Imperador do Vácuo Infinito"
  },
  {
    "id": 21,
    "name": "Mundo 21: Fossa Abissal das Marianas",
    "shortName": "Abismo Mariana",
    "theme": "ocean",
    "icon": "Waves",
    "gradient": "from-blue-950/90 to-slate-950",
    "border": "border-blue-500/40",
    "accentColor": "#0284c7",
    "description": "110.000m de profundidade cósmica invertida! Criaturas bioluminescentes e correntes esmagadoras.",
    "stageRange": [
      101,
      105
    ],
    "bossStageNumber": 105,
    "bossName": "Kraken Abissal de Neon",
    "bossTitle": "Terror das Fossas Oceânicas"
  },
  {
    "id": 22,
    "name": "Mundo 22: Deserto dos Cristais Solares",
    "shortName": "Cristais de Fogo",
    "theme": "crystal",
    "icon": "Gem",
    "gradient": "from-amber-950/80 to-yellow-950/70",
    "border": "border-yellow-400/40",
    "accentColor": "#eab308",
    "description": "Prismas gigantescos de cristal solar que refletem lasers concentrados em meio às dunas cósmicas.",
    "stageRange": [
      106,
      110
    ],
    "bossStageNumber": 110,
    "bossName": "Escorpião de Cristal Solar",
    "bossTitle": "Ferrão Primordial de Quartzo"
  },
  {
    "id": 23,
    "name": "Mundo 23: Acelerador de Hádrons Subatômico",
    "shortName": "Acelerador Hádrons",
    "theme": "quantum",
    "icon": "Atom",
    "gradient": "from-indigo-950/80 to-violet-950/80",
    "border": "border-violet-400/40",
    "accentColor": "#8b5cf6",
    "description": "Túneis circulares magnéticos colidindo partículas a 99% da velocidade da luz.",
    "stageRange": [
      111,
      115
    ],
    "bossStageNumber": 115,
    "bossName": "Bóson Descontrolado",
    "bossTitle": "A Partícula Devoradora"
  },
  {
    "id": 24,
    "name": "Mundo 24: Picos Nevados dos Pterossauros",
    "shortName": "Ninho Pterodáctilo",
    "theme": "dinosaur",
    "icon": "Wind",
    "gradient": "from-slate-900 via-teal-950/60 to-emerald-950/80",
    "border": "border-teal-400/40",
    "accentColor": "#14b8a6",
    "description": "Cumes verticais gelados onde répteis alados colossais planam em meio a tempestades pré-históricas.",
    "stageRange": [
      116,
      120
    ],
    "bossStageNumber": 120,
    "bossName": "Quetzalcoatlus Supremo",
    "bossTitle": "Soberano Alado dos Céus Jurássicos"
  },
  {
    "id": 25,
    "name": "Mundo 25: Ferrovia Fantasma do Velho Oeste",
    "shortName": "Trem Fantasma Oeste",
    "theme": "wild_west",
    "icon": "Flame",
    "gradient": "from-stone-950 via-amber-950/80 to-rose-950/70",
    "border": "border-amber-500/50",
    "accentColor": "#f59e0b",
    "description": "Trilhos suspensos sobre abismos sem fim, pontes de madeira em chamas e dinamites ativadas.",
    "stageRange": [
      121,
      125
    ],
    "bossStageNumber": 125,
    "bossName": "Locomotiva Blindada Fantasma",
    "bossTitle": "A Máquina do Juízo Final"
  },
  {
    "id": 26,
    "name": "Mundo 26: Estádio Orbital Gravidade Zero",
    "shortName": "Gravidade Zero",
    "theme": "sports",
    "icon": "Medal",
    "gradient": "from-blue-950/80 via-indigo-950/80 to-slate-950",
    "border": "border-cyan-400/40",
    "accentColor": "#06b6d4",
    "description": "Arena olímpica no espaço sideral com pistas de aceleração, aros holográficos e super impulso.",
    "stageRange": [
      126,
      130
    ],
    "bossStageNumber": 130,
    "bossName": "Campeão da Gravidade Zero",
    "bossTitle": "O Invencível das Galáxias"
  },
  {
    "id": 27,
    "name": "Mundo 27: Confeitaria Apocalíptica de Caramelo",
    "shortName": "Doce Apocalipse",
    "theme": "gastronomy",
    "icon": "Cookie",
    "gradient": "from-amber-950/80 via-orange-950/80 to-slate-950",
    "border": "border-orange-400/40",
    "accentColor": "#f97316",
    "description": "Doces monumentais hiperbólicos, cascatas de chocolate fervente e biscoitos gigantescos.",
    "stageRange": [
      131,
      135
    ],
    "bossStageNumber": 135,
    "bossName": "Gólem de Caramelo Ardente",
    "bossTitle": "O Monstro da Calda Quente"
  },
  {
    "id": 28,
    "name": "Mundo 28: Sinapse Cósmica Interdimensional",
    "shortName": "Sinapse Cósmica",
    "theme": "health",
    "icon": "Activity",
    "gradient": "from-teal-950/80 via-purple-950/80 to-slate-950",
    "border": "border-teal-400/50",
    "accentColor": "#14b8a6",
    "description": "Cérebro estelar universal com neurônios gigantescos conectados por feixes de luz consciente.",
    "stageRange": [
      136,
      140
    ],
    "bossStageNumber": 140,
    "bossName": "Sinapse Hiperativa Omega",
    "bossTitle": "A Consciência Quântica Universal"
  },
  {
    "id": 29,
    "name": "Mundo 29: Muralha das Sete Eras Ancestrais",
    "shortName": "Sete Civilizações",
    "theme": "continents",
    "icon": "Landmark",
    "gradient": "from-amber-950/80 via-emerald-950/70 to-slate-950",
    "border": "border-amber-400/50",
    "accentColor": "#f59e0b",
    "description": "Monumentos acumulados de todas as civilizações que já dominaram a Terra e o espaço.",
    "stageRange": [
      141,
      145
    ],
    "bossStageNumber": 145,
    "bossName": "Colosso das Sete Civilizações",
    "bossTitle": "O Titã dos Séculos"
  },
  {
    "id": 30,
    "name": "Mundo 30: Zênite Supremo dos 150.000m",
    "shortName": "Zênite Supremo",
    "theme": "futuristic",
    "icon": "Crown",
    "gradient": "from-amber-950/90 via-purple-950/90 to-slate-950",
    "border": "border-amber-400/60",
    "accentColor": "#fbbf24",
    "description": "O clímax definitivo aos 150.000m! O trono do Demiurgo onde o JumpBall alcança a divindade.",
    "stageRange": [
      146,
      150
    ],
    "bossStageNumber": 150,
    "bossName": "O Demiurgo Eterno do Cosmos",
    "bossTitle": "O Criador e Destruidor de Universos"
  }
];

export const HERO_STAGES = [
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
    "mechanic": "Plataformas seguras e molas energéticas."
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
    "mechanic": "Rajadas de vento suaves e plataformas de areia solta."
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
    "mechanic": "Flutuabilidade aquática com saltos prolongados."
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
    "mechanic": "Plataformas elétricas oscilatórias em alta velocidade."
  },
  {
    "id": 5,
    "number": 5,
    "title": "👑 CHEFÃO 1: Silvano, Titã da Mata",
    "theme": "forest",
    "icon": "Crown",
    "targetHeight": 4200,
    "gravity": 0.36,
    "jumpForce": -12.4,
    "speedFactor": 1.35,
    "wind": 0,
    "bgGradient": [
      "#062419",
      "#14532d",
      "#166534"
    ],
    "platformColor": "#22c55e",
    "platformBorder": "#86efac",
    "ballGlow": "#4ade80",
    "description": "BATALHA DE CHEFÃO! Silvano, o Titã da Floresta, arremessa galhos e vinhas espinhosas. Pule nas baterias energéticas para vencê-lo!",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Batalha de Chefão: ative os nós de energia para atirar no Titã Silvano!",
    "isBossStage": true,
    "bossName": "Silvano",
    "bossTitle": "Titã Guardião da Mata",
    "bossHP": 4,
    "bossColor": "#16a34a",
    "bossGlow": "#4ade80",
    "rewardGems": 150
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
    "mechanic": "Superfícies de gelo com inércia contínua."
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
    "mechanic": "Cristais de ressonância com portais de teletransporte."
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
    "mechanic": "Nuvens passageiras que se dissolvem após o salto."
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
    "mechanic": "Esteiras rolantes que aceleram a bola lateralmente."
  },
  {
    "id": 10,
    "number": 10,
    "title": "👑 CHEFÃO 2: Faraó de Pedra de Rá",
    "theme": "pyramids",
    "icon": "Crown",
    "targetHeight": 8500,
    "gravity": 0.33,
    "jumpForce": -12.4,
    "speedFactor": 1.8,
    "wind": 0.15,
    "bgGradient": [
      "#451a03",
      "#713f12",
      "#a16207"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fef08a",
    "ballGlow": "#ca8a04",
    "description": "BATALHA DE CHEFÃO! O guardião milenar desperta em sua pirâmide cósmica lançando escaravelhos e tempestades de arenito.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Batalha de Chefão: acione os obeliscos dourados para quebrar a couraça de pedra!",
    "isBossStage": true,
    "bossName": "Faraó de Rá",
    "bossTitle": "Guardião das Areias Cósmicas",
    "bossHP": 5,
    "bossColor": "#d97706",
    "bossGlow": "#fde047",
    "rewardGems": 180
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
    "mechanic": "Correntes de água ascendentes e plataformas rochosas úmidas."
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
    "mechanic": "Saltos abençoados pelos espíritos e plataformas rúnicas."
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
    "mechanic": "Ventos laterais fortes e chuva densa com atrito dinâmico."
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
    "mechanic": "Superfícies de gelo com baixíssimo atrito e rajadas de nevasca."
  },
  {
    "id": 15,
    "number": 15,
    "title": "👑 CHEFÃO 3: Leviatã das Marés",
    "theme": "ocean",
    "icon": "Crown",
    "targetHeight": 14000,
    "gravity": 0.3,
    "jumpForce": -12.2,
    "speedFactor": 1.65,
    "wind": 0.1,
    "bgGradient": [
      "#042f2e",
      "#0f766e",
      "#134e4a"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#67e8f9",
    "ballGlow": "#22d3ee",
    "description": "BATALHA DE CHEFÃO! A criatura colossal das fossas oceânicas invoca jatos d'água torrenciais e águas-vivas elétricas.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Batalha de Chefão: colete orbes de hidroplasma para acertar o Leviatã!",
    "isBossStage": true,
    "bossName": "Leviatã",
    "bossTitle": "Monarca das Profundezas",
    "bossHP": 5,
    "bossColor": "#0891b2",
    "bossGlow": "#67e8f9",
    "rewardGems": 200
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
    "mechanic": "Gravidade lunar leve com plataformas flutuantes mágicas."
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
    "mechanic": "Esteiras de rocha vulcânica e gravidade extrema."
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
    "mechanic": "Ventos solares de plasma que empurram em direção ao vácuo."
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
    "mechanic": "Fragmentos rochosos errantes e microgravidade do cinturão."
  },
  {
    "id": 20,
    "number": 20,
    "title": "👑 CHEFÃO 4: Colosso dos Relâmpagos",
    "theme": "storm",
    "icon": "Crown",
    "targetHeight": 20000,
    "gravity": 0.32,
    "jumpForce": -12.5,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#020617",
      "#172554",
      "#1e3a8a"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#bae6fd",
    "ballGlow": "#7dd3fc",
    "description": "BATALHA DE CHEFÃO! Um titã de alta voltagem descarrega tempestades de raios contínuas no topo do cânion.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Batalha de Chefão: desarme os condutores para desferir sobrecarga elétrica no Boss!",
    "isBossStage": true,
    "bossName": "Colosso do Trovão",
    "bossTitle": "Ira Eletrizada",
    "bossHP": 6,
    "bossColor": "#0284c7",
    "bossGlow": "#facc15",
    "rewardGems": 220
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
    "mechanic": "Plataformas de ouro místico com impulsão divina elevada."
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
    "mechanic": "Efeito de quique perfeito como uma bola de futebol na grande área."
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
    "mechanic": "Percurso lateral com saltos entre plataformas marítimas. Cuidado com as vagas e o balanço do navio!"
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
    "mechanic": "Brisa floral flutuante que desacelera suavemente a queda."
  },
  {
    "id": 25,
    "number": 25,
    "title": "👑 CHEFÃO 5: Gólem Glacial de Neve",
    "theme": "arctic",
    "icon": "Crown",
    "targetHeight": 25000,
    "gravity": 0.33,
    "jumpForce": -12,
    "speedFactor": 1.7,
    "friction": 0.98,
    "wind": 0.2,
    "bgGradient": [
      "#082f49",
      "#0369a1",
      "#0284c7"
    ],
    "platformColor": "#a5f3fc",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#38bdf8",
    "description": "BATALHA DE CHEFÃO! O soberano do zero absoluto tenta congelar seus saltos com chuvas de estalactites pontiagudas.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Batalha de Chefão: derreta as couraças térmicas com saltos certeiros!",
    "isBossStage": true,
    "bossName": "Gólem Glacial",
    "bossTitle": "Soberano do Gelo Eterno",
    "bossHP": 6,
    "bossColor": "#38bdf8",
    "bossGlow": "#ffffff",
    "rewardGems": 250
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
    "mechanic": "Super saltos cinematográficos potencializados por energia heroica."
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
    "mechanic": "Esteiras de dados velozes simulando barramentos de clock de alta precisão."
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
    "mechanic": "Plataformas harmônicas com saltos em cadência rítmica."
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
    "mechanic": "Roteamento acelerado com conexões que impulsionam lateralmente."
  },
  {
    "id": 30,
    "number": 30,
    "title": "👑 CHEFÃO 6: Dragão Solar de Magma",
    "theme": "volcano",
    "icon": "Crown",
    "targetHeight": 30000,
    "gravity": 0.36,
    "jumpForce": -12.6,
    "speedFactor": 2,
    "wind": 0,
    "bgGradient": [
      "#450a0a",
      "#7f1d1d",
      "#991b1b"
    ],
    "platformColor": "#f97316",
    "platformBorder": "#fde047",
    "ballGlow": "#ea580c",
    "description": "BATALHA DE CHEFÃO! A lendária serpente de fogo desperta do coração do vulcão cospindo rochas incandescentes.",
    "hazards": [
      "lava_rising",
      "moving",
      "fragile"
    ],
    "mechanic": "Batalha de Chefão: desvie das chamas e lance gelo geotérmico contra o Dragão!",
    "isBossStage": true,
    "bossName": "Dragão de Magma",
    "bossTitle": "Fúria Vulcânica do Núcleo",
    "bossHP": 7,
    "bossColor": "#ea580c",
    "bossGlow": "#facc15",
    "rewardGems": 280
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
    "mechanic": "Faces em rotação que alternam cores e propriedades cinéticas."
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
    "mechanic": "Gelatina elástica que amortece o pouso e multiplica a propulsão do salto."
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
    "mechanic": "Ondas de choque térmico que exigem movimentação rápida sem paradas."
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
    "mechanic": "Física retrô acelerada com plataformas arcade vibrantes."
  },
  {
    "id": 35,
    "number": 35,
    "title": "👑 CHEFÃO 7: Overlord IA Matrix",
    "theme": "cyberpunk",
    "icon": "Crown",
    "targetHeight": 35000,
    "gravity": 0.34,
    "jumpForce": -12.8,
    "speedFactor": 2.1,
    "wind": 0,
    "bgGradient": [
      "#020617",
      "#1e1b4b",
      "#312e81"
    ],
    "platformColor": "#00f0ff",
    "platformBorder": "#ff0055",
    "ballGlow": "#00f0ff",
    "description": "BATALHA DE CHEFÃO! A inteligência artificial suprema da metrópole aciona esteiras aceleradoras e feixes de laser verticais.",
    "hazards": [
      "conveyor",
      "moving",
      "fragile"
    ],
    "mechanic": "Batalha de Chefão: sobrecarregue os chips de firewall para derrotar a IA!",
    "isBossStage": true,
    "bossName": "Overlord IA",
    "bossTitle": "Mestre da Rede Matrix",
    "bossHP": 7,
    "bossColor": "#00f0ff",
    "bossGlow": "#ff0055",
    "rewardGems": 300
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
    "mechanic": "Ondas geomagnéticas que produzem saltos etéreos prolongados."
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
    "mechanic": "Loopings acrobáticos e plataformas de montanha-russa super velozes."
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
    "mechanic": "Areias do tempo com plataformas ancestrais que requerem ritmo milimétrico."
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
    "mechanic": "Percurso lateral industrial com esteiras, vapores explosivos e plataformas giratórias de bronze!"
  },
  {
    "id": 40,
    "number": 40,
    "title": "👑 CHEFÃO 8: Singularidade Multiversal",
    "theme": "quantum",
    "icon": "Crown",
    "targetHeight": 40000,
    "gravity": 0.26,
    "jumpForce": -13.2,
    "speedFactor": 2.3,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#1e1b4b",
      "#3b0764"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#e9d5ff",
    "ballGlow": "#c084fc",
    "description": "BATALHA DE CHEFÃO MULTIVERSAL! A Singularidade abre fendas no contínuo espaço-tempo e ENVIA O JOGADOR PARA UM UNIVERSO PARALELO!",
    "hazards": [
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "Ataque Especial: UNIVERSO PARALELO! Sobreviva à dimensão reversa para causar dano crítico no Boss!",
    "isBossStage": true,
    "hasParallelUniverseAttack": true,
    "bossName": "Singularidade",
    "bossTitle": "Devorador do Multiverso",
    "bossHP": 8,
    "bossColor": "#a855f7",
    "bossGlow": "#e879f9",
    "rewardGems": 400
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
    "mechanic": "Pedras e cascalho que despencam da pedreira e espigões de pedra afiada."
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
    "mechanic": "Barras de ferro e faíscas incandescentes em ambiente metalúrgico denso."
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
    "mechanic": "Troncos pesados despencando e plataformas de madeira com lascas afiadas."
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
    "mechanic": "Plataformas de alta propulsão heróica e escudos de energia luminosa."
  },
  {
    "id": 45,
    "number": 45,
    "title": "👑 CHEFÃO 9: Autômato Titânico de Bronze",
    "theme": "steampunk",
    "icon": "Crown",
    "targetHeight": 45000,
    "gravity": 0.35,
    "jumpForce": -12.8,
    "speedFactor": 2.2,
    "wind": 0.1,
    "bgGradient": [
      "#292524",
      "#44403c",
      "#78350f"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fed7aa",
    "ballGlow": "#b45309",
    "description": "BATALHA DE CHEFÃO! A máquina industrial suprema de bronze gira engrenagens ciclópicas e solta vapor superaquecido.",
    "hazards": [
      "moving",
      "fragile",
      "conveyor"
    ],
    "mechanic": "Batalha de Chefão: resfrie as caldeiras a vapor com saltos precisos!",
    "isBossStage": true,
    "bossName": "Autômato de Bronze",
    "bossTitle": "Titã da Forja Steampunk",
    "bossHP": 8,
    "bossColor": "#b45309",
    "bossGlow": "#fed7aa",
    "rewardGems": 450
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
    "mechanic": "Gravidade distorcida e vórtices com vento cósmico oscilante."
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
    "mechanic": "Super saltos de bitscore e esteiras de alta aceleração digital."
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
    "mechanic": "Ondulações gravitacionais de aurora e molas de impulso quântico."
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
    "mechanic": "Múltiplos obstáculos dinâmicos em ritmo acelerado na reta final."
  },
  {
    "id": 50,
    "number": 50,
    "title": "👑 CHEFÃO FINAL: O Guardião Supremo do Zênite",
    "theme": "cosmos",
    "icon": "Crown",
    "targetHeight": 50000,
    "gravity": 0.25,
    "jumpForce": -13.5,
    "speedFactor": 2.5,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18181b",
      "#3b0764"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#fef08a",
    "ballGlow": "#f59e0b",
    "description": "A BATALHA DEFINITIVA AOS 50.000m! O Guardião Supremo do Zênite combina os poderes de todos os 10 mundos do JumpBall!",
    "hazards": [
      "moving",
      "springs",
      "fragile",
      "conveyor"
    ],
    "mechanic": "Chefão Final: Batalha épica de 10 HP com rajadas cósmicas e dobra dimensional!",
    "isBossStage": true,
    "hasParallelUniverseAttack": true,
    "bossName": "O Guardião do Zênite",
    "bossTitle": "Soberano Supremo do Ápice Cósmico",
    "bossHP": 10,
    "bossColor": "#f59e0b",
    "bossGlow": "#fbbf24",
    "rewardGems": 1000
  },
  {
    "id": 51,
    "number": 51,
    "title": "Trilhas de Cobre Subatômico",
    "theme": "quantum_core",
    "icon": "Cpu",
    "targetHeight": 51000,
    "gravity": 0.32,
    "jumpForce": -12.5,
    "speedFactor": 2.31,
    "wind": 0,
    "bgGradient": [
      "#021a24",
      "#083344",
      "#0e7490"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#67e8f9",
    "ballGlow": "#22d3ee",
    "description": "Salte sobre pistas condutoras de cobre dourado energizadas por pulsos quânticos.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Placas de circuito impresso com micro-molas de impulso piezoelétrico."
  },
  {
    "id": 52,
    "number": 52,
    "title": "Barramento Taquiônico",
    "theme": "quantum_core",
    "icon": "Zap",
    "targetHeight": 52000,
    "gravity": 0.34,
    "jumpForce": -12.6,
    "speedFactor": 2.33,
    "wind": 0,
    "bgGradient": [
      "#03182b",
      "#073a61",
      "#0284c7"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#38bdf8",
    "ballGlow": "#0ea5e9",
    "description": "Fluxos de dados hipervelozes empurram você pelas pontes lógicas da placa-mãe.",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "Esteiras de fibra óptica em altíssima rotação que aceleram ou freiam a bola."
  },
  {
    "id": 53,
    "number": 53,
    "title": "Matriz de Memória Quântica",
    "theme": "quantum_core",
    "icon": "Boxes",
    "targetHeight": 53000,
    "gravity": 0.36,
    "jumpForce": -12.6,
    "speedFactor": 2.34,
    "wind": 0,
    "bgGradient": [
      "#0a1936",
      "#142c5c",
      "#1d4ed8"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#93c5fd",
    "ballGlow": "#60a5fa",
    "description": "Pise com extrema leveza! Cada bloco de memória só suporta um único cálculo.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Bits quânticos que colapsam e se desintegram 0.8s após o contato."
  },
  {
    "id": 54,
    "number": 54,
    "title": "Túnel do Acelerador de Fótons",
    "theme": "quantum_core",
    "icon": "Rocket",
    "targetHeight": 54000,
    "gravity": 0.26,
    "jumpForce": -12.6,
    "speedFactor": 2.35,
    "wind": 0,
    "bgGradient": [
      "#022c3b",
      "#0e7490",
      "#06b6d4"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#38bdf8",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Dispare em linha reta pelo colisor de fótons desviando de esteiras e prismas!",
    "hazards": [
      "moving",
      "conveyor"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Corra no túnel de feixes laser cruzando portais laterais!",
    "layout": "horizontal",
    "targetDistance": 4300
  },
  {
    "id": 55,
    "number": 55,
    "title": "👑 CHEFÃO 11: Nexus Quântico 9000",
    "theme": "quantum_core",
    "icon": "Crown",
    "targetHeight": 55000,
    "gravity": 0.28,
    "jumpForce": -12.6,
    "speedFactor": 2.36,
    "wind": 0,
    "bgGradient": [
      "#01131c",
      "#052d3f",
      "#0369a1"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#38bdf8",
    "ballGlow": "#22d3ee",
    "description": "BATALHA DE CHEFÃO AOS 55.000m! O supercomputador autônomo tenta corromper seu código de salto!",
    "hazards": [
      "moving",
      "conveyor",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Desvie dos pulsos de firewall e sobrecarregue os 3 núcleos da IA!",
    "isBossStage": true,
    "bossName": "Nexus Quântico 9000",
    "bossTitle": "IA Central da Rede Quântica",
    "bossHP": 11,
    "bossColor": "#06b6d4",
    "bossGlow": "#67e8f9",
    "rewardGems": 1100,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 56,
    "number": 56,
    "title": "Garganta de Arenito Vermelho",
    "theme": "wild_west",
    "icon": "Wind",
    "targetHeight": 56000,
    "gravity": 0.3,
    "jumpForce": -12.7,
    "speedFactor": 2.38,
    "wind": 0.3,
    "bgGradient": [
      "#291305",
      "#4d2309",
      "#78350f"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "O vento uivante do cânion desafia seu equilíbrio entre penhascos alaranjados.",
    "hazards": [
      "wind"
    ],
    "mechanic": "Rajadas cortantes de poeira desértica empurram a esfera para a direita."
  },
  {
    "id": 57,
    "number": 57,
    "title": "Saloon Abandonado de Madeira",
    "theme": "wild_west",
    "icon": "Axe",
    "targetHeight": 57000,
    "gravity": 0.32,
    "jumpForce": -12.7,
    "speedFactor": 2.39,
    "wind": 0,
    "bgGradient": [
      "#24140a",
      "#452614",
      "#6b3c20"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fed7aa",
    "ballGlow": "#d97706",
    "description": "Salte sobre assoalhos decrépitos de pinho seco do lendário saloon fantasma.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Trevos e tábuas antigas que rangem e despencam após o salto."
  },
  {
    "id": 58,
    "number": 58,
    "title": "Mina de Ouro Assombrada",
    "theme": "wild_west",
    "icon": "Pickaxe",
    "targetHeight": 58000,
    "gravity": 0.34,
    "jumpForce": -12.7,
    "speedFactor": 2.4,
    "wind": 0,
    "bgGradient": [
      "#1c1008",
      "#382011",
      "#59331b"
    ],
    "platformColor": "#92400e",
    "platformBorder": "#fde68a",
    "ballGlow": "#b45309",
    "description": "Desça nas galerias esquecidas da mina de ouro onde brotam espinhos de ferro fundido.",
    "hazards": [
      "spikes",
      "moving"
    ],
    "mechanic": "Vagonetes desgovernados com estacas pontiagudas cruzam os trilhos."
  },
  {
    "id": 59,
    "number": 59,
    "title": "Cavalgada na Ferrovia dos Despenhadeiros",
    "theme": "wild_west",
    "icon": "Crosshair",
    "targetHeight": 59000,
    "gravity": 0.36,
    "jumpForce": -12.7,
    "speedFactor": 2.42,
    "wind": 0,
    "bgGradient": [
      "#331505",
      "#662808",
      "#9a3d0d"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fde047",
    "ballGlow": "#f97316",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Atravesse a ponte férrea de madeira antes que o trem fantasma chegue!",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Corra sobre dormentes de madeira suspensos no abismo do cânion!",
    "layout": "horizontal",
    "targetDistance": 4400
  },
  {
    "id": 60,
    "number": 60,
    "title": "👑 CHEFÃO 12: Pistoleiro Espectral",
    "theme": "wild_west",
    "icon": "Crown",
    "targetHeight": 60000,
    "gravity": 0.26,
    "jumpForce": -12.8,
    "speedFactor": 2.43,
    "wind": 0,
    "bgGradient": [
      "#1a0802",
      "#3a1306",
      "#611f0a"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "DUELO AO MEIO-DIA AOS 60.000m! O xerife fantasma não permite intrusos em seu desfiladeiro!",
    "hazards": [
      "moving",
      "fragile",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Desvie das balas fantasmagóricas e detone barris de pólvora!",
    "isBossStage": true,
    "bossName": "Pistoleiro Espectral",
    "bossTitle": "O Vingador do Cânion",
    "bossHP": 12,
    "bossColor": "#d97706",
    "bossGlow": "#fbbf24",
    "rewardGems": 1200,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 61,
    "number": 61,
    "title": "Copas das Sequoias Gigantes",
    "theme": "dinosaur",
    "icon": "TreePine",
    "targetHeight": 61000,
    "gravity": 0.28,
    "jumpForce": -12.8,
    "speedFactor": 2.44,
    "wind": 0,
    "bgGradient": [
      "#071f11",
      "#104225",
      "#186e3d"
    ],
    "platformColor": "#84cc16",
    "platformBorder": "#bef264",
    "ballGlow": "#a3e635",
    "description": "Suba pela vegetação pré-histórica colossal intocada há 150 milhões de anos.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Folhas elásticas primordiais que lançam a esfera com dobro da força."
  },
  {
    "id": 62,
    "number": 62,
    "title": "Pântano dos Fósseis Calcários",
    "theme": "dinosaur",
    "icon": "Waves",
    "targetHeight": 62000,
    "gravity": 0.3,
    "jumpForce": -12.8,
    "speedFactor": 2.46,
    "wind": 0,
    "bgGradient": [
      "#0d2616",
      "#194a2b",
      "#277344"
    ],
    "platformColor": "#65a30d",
    "platformBorder": "#d9f99d",
    "ballGlow": "#84cc16",
    "description": "Pise com agilidade extrema nas ossadas ancestrais sobre a lama borbulhante.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Costelas fossilizadas de braquiossauros que se esfarelam com o peso."
  },
  {
    "id": 63,
    "number": 63,
    "title": "Garganta dos Ninhos de Espinhos",
    "theme": "dinosaur",
    "icon": "Zap",
    "targetHeight": 63000,
    "gravity": 0.32,
    "jumpForce": -12.8,
    "speedFactor": 2.47,
    "wind": 0,
    "bgGradient": [
      "#142e12",
      "#235420",
      "#367d32"
    ],
    "platformColor": "#4d7c0f",
    "platformBorder": "#a3e635",
    "ballGlow": "#65a30d",
    "description": "O ninho das feras está repleto de armadilhas pontiagudas e plataformas instáveis.",
    "hazards": [
      "spikes",
      "moving"
    ],
    "mechanic": "Espinhos venenosos de estegossauro projetados nas laterais das rochas."
  },
  {
    "id": 64,
    "number": 64,
    "title": "Corrida na Trilha dos Velocirraptores",
    "theme": "dinosaur",
    "icon": "Footprints",
    "targetHeight": 64000,
    "gravity": 0.34,
    "jumpForce": -12.8,
    "speedFactor": 2.48,
    "wind": 0,
    "bgGradient": [
      "#082e14",
      "#125e29",
      "#1da347"
    ],
    "platformColor": "#84cc16",
    "platformBorder": "#fef08a",
    "ballGlow": "#bef264",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Corra lateralmente em alta velocidade escapando dos predadores da selva!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Fuga veloz entre rochedos e raízes jurássicas!",
    "layout": "horizontal",
    "targetDistance": 4500
  },
  {
    "id": 65,
    "number": 65,
    "title": "👑 CHEFÃO 13: T-Rex Titânico Apex",
    "theme": "dinosaur",
    "icon": "Crown",
    "targetHeight": 65000,
    "gravity": 0.36,
    "jumpForce": -12.9,
    "speedFactor": 2.49,
    "wind": 0,
    "bgGradient": [
      "#0a1a09",
      "#163814",
      "#255c22"
    ],
    "platformColor": "#4d7c0f",
    "platformBorder": "#d9f99d",
    "ballGlow": "#84cc16",
    "description": "CONFRONTO PRIMORDIAL AOS 65.000m! Enfrente o rei indiscutível da Era Mesozóica!",
    "hazards": [
      "moving",
      "fragile",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O T-Rex ruge fazendo pedregulhos caírem! Ative as catapultas de basalto!",
    "isBossStage": true,
    "bossName": "T-Rex Titânico Apex",
    "bossTitle": "O Predador Supremo",
    "bossHP": 13,
    "bossColor": "#65a30d",
    "bossGlow": "#a3e635",
    "rewardGems": 1300,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 66,
    "number": 66,
    "title": "Ágora de Mármore de Atenas",
    "theme": "olympus",
    "icon": "Landmark",
    "targetHeight": 66000,
    "gravity": 0.26,
    "jumpForce": -12.9,
    "speedFactor": 2.51,
    "wind": 0,
    "bgGradient": [
      "#261502",
      "#472804",
      "#734007"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fbbf24",
    "description": "A praça central dos filósofos e generais da Grécia Antiga sob a bênção de Atena.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Degraus de mármore translúcido esculpidos com frisos dourados móveis."
  },
  {
    "id": 67,
    "number": 67,
    "title": "Colunas Quebradas do Partenon",
    "theme": "olympus",
    "icon": "Boxes",
    "targetHeight": 67000,
    "gravity": 0.28,
    "jumpForce": -12.9,
    "speedFactor": 2.52,
    "wind": 0,
    "bgGradient": [
      "#291807",
      "#4d2f0e",
      "#7a4a16"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f59e0b",
    "description": "Escale os vestígios do templo sagrado suspenso nos céus da Hélade.",
    "hazards": [
      "fragile",
      "springs"
    ],
    "mechanic": "Capitéis coríntios rompidos que se desprendem sob fortes impactos."
  },
  {
    "id": 68,
    "number": 68,
    "title": "Forja Divina de Hefesto",
    "theme": "olympus",
    "icon": "Anvil",
    "targetHeight": 68000,
    "gravity": 0.3,
    "jumpForce": -12.9,
    "speedFactor": 2.53,
    "wind": 0,
    "bgGradient": [
      "#301205",
      "#5c240a",
      "#8c360f"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fde047",
    "ballGlow": "#fb923c",
    "description": "A forja onde os raios de Zeus são moldados em bronze celestial e fogo eterno.",
    "hazards": [
      "spikes",
      "moving"
    ],
    "mechanic": "Bigornas celestes e brasas olímpicas incandescentes que ferem no contato."
  },
  {
    "id": 69,
    "number": 69,
    "title": "Pátio das Bigas do Monte Olimpo",
    "theme": "olympus",
    "icon": "Landmark",
    "targetHeight": 69000,
    "gravity": 0.32,
    "jumpForce": -13,
    "speedFactor": 2.55,
    "wind": 0,
    "bgGradient": [
      "#331d04",
      "#663908",
      "#9e580c"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Acelere pelo hipódromo dos deuses gregos sobre pistas velozes!",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Pista monumental das corridas de bigas celestes com esteiras de ouro!",
    "layout": "horizontal",
    "targetDistance": 4600
  },
  {
    "id": 70,
    "number": 70,
    "title": "👑 CHEFÃO 14: Minotauro de Bronze",
    "theme": "olympus",
    "icon": "Crown",
    "targetHeight": 70000,
    "gravity": 0.34,
    "jumpForce": -13,
    "speedFactor": 2.56,
    "wind": 0,
    "bgGradient": [
      "#1f0f02",
      "#3b1e04",
      "#5e3006"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fde68a",
    "ballGlow": "#fbbf24",
    "description": "DUELO NO LABIRINTO AOS 70.000m! O colosso taurino de bronze forjado quer esmagar seu avanço!",
    "hazards": [
      "moving",
      "fragile",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O Minotauro investe em linha reta quebrando plataformas! Acerte as lanças de Ares!",
    "isBossStage": true,
    "bossName": "Minotauro de Bronze",
    "bossTitle": "Guardião do Labirinto",
    "bossHP": 14,
    "bossColor": "#d97706",
    "bossGlow": "#f59e0b",
    "rewardGems": 1400,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 71,
    "number": 71,
    "title": "Mega-Rampa do Half-Pipe Aéreo",
    "theme": "sports",
    "icon": "Medal",
    "targetHeight": 71000,
    "gravity": 0.36,
    "jumpForce": -13,
    "speedFactor": 2.57,
    "wind": 0,
    "bgGradient": [
      "#0b1a38",
      "#17336e",
      "#2551ad"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#93c5fd",
    "ballGlow": "#60a5fa",
    "description": "Pratique manobras insanas no maior half-pipe suspenso da galáxia esportiva.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Rampas elásticas com super amortecimento que projetam saltos parabólicos perfeitos."
  },
  {
    "id": 72,
    "number": 72,
    "title": "Circuito da Ginástica Rítmica",
    "theme": "sports",
    "icon": "Activity",
    "targetHeight": 72000,
    "gravity": 0.26,
    "jumpForce": -13.1,
    "speedFactor": 2.59,
    "wind": 0,
    "bgGradient": [
      "#11163b",
      "#222c73",
      "#3747b8"
    ],
    "platformColor": "#6366f1",
    "platformBorder": "#c7d2fe",
    "ballGlow": "#818cf8",
    "description": "Sincronize seus saltos com o ritmo dos holofotes e conquiste notas perfeitas dos jurados.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Barras móveis que balançam em sincronia musical com aterrissagens cronometradas."
  },
  {
    "id": 73,
    "number": 73,
    "title": "Sprint dos 100 Metros Espaciais",
    "theme": "sports",
    "icon": "Trophy",
    "targetHeight": 73000,
    "gravity": 0.28,
    "jumpForce": -13.1,
    "speedFactor": 2.6,
    "wind": 0,
    "bgGradient": [
      "#08204d",
      "#10419c",
      "#1d6bf3"
    ],
    "platformColor": "#2563eb",
    "platformBorder": "#fde047",
    "ballGlow": "#38bdf8",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Dispare em arrancada pura na pista sintética com cronômetro em tempo real!",
    "hazards": [
      "conveyor",
      "springs"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Reta plana de alta velocidade com esteiras turbo e barreiras baixas!",
    "layout": "horizontal",
    "targetDistance": 4800
  },
  {
    "id": 74,
    "number": 74,
    "title": "Velódromo dos Aros de Fogo",
    "theme": "sports",
    "icon": "Orbit",
    "targetHeight": 74000,
    "gravity": 0.3,
    "jumpForce": -13.1,
    "speedFactor": 2.61,
    "wind": 0,
    "bgGradient": [
      "#052338",
      "#0b4670",
      "#126dae"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#7dd3fc",
    "ballGlow": "#38bdf8",
    "description": "Pedale nas alturas em uma pista oval futurista projetada para quebrar recordes mundiais.",
    "hazards": [
      "conveyor",
      "spikes"
    ],
    "mechanic": "Curvas parabólicas perigosas com faixas de atrito variável e aros em chamas."
  },
  {
    "id": 75,
    "number": 75,
    "title": "👑 CHEFÃO 15: Gladiador Campeão Titã",
    "theme": "sports",
    "icon": "Crown",
    "targetHeight": 75000,
    "gravity": 0.32,
    "jumpForce": -13.1,
    "speedFactor": 2.63,
    "wind": 0,
    "bgGradient": [
      "#061329",
      "#0e2957",
      "#17428c"
    ],
    "platformColor": "#1d4ed8",
    "platformBorder": "#fbbf24",
    "ballGlow": "#3b82f6",
    "description": "FINAL DO CAMPEONATO AOS 75.000m! Prove ser o atleta absoluto sob o olhar de milhões na torcida!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O Campeão arremessa bumerangues e discos de ouro! Ative o placar do estádio!",
    "isBossStage": true,
    "bossName": "Gladiador Campeão Titã",
    "bossTitle": "O Soberano das Arenas",
    "bossHP": 15,
    "bossColor": "#2563eb",
    "bossGlow": "#60a5fa",
    "rewardGems": 1500,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 76,
    "number": 76,
    "title": "Alameda das Frigideiras Ardentes",
    "theme": "gastronomy",
    "icon": "Utensils",
    "targetHeight": 76000,
    "gravity": 0.34,
    "jumpForce": -13.2,
    "speedFactor": 2.64,
    "wind": 0,
    "bgGradient": [
      "#2d1004",
      "#572108",
      "#87330d"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f97316",
    "description": "Caminhe com cuidado sobre as alças de cobre e chapas quentes da cozinha monumental.",
    "hazards": [
      "moving",
      "spikes"
    ],
    "mechanic": "Bordas de frigideira quentes que estalam e faíscam óleo fervente."
  },
  {
    "id": 77,
    "number": 77,
    "title": "Caldeirão dos Caldos Efervescentes",
    "theme": "gastronomy",
    "icon": "Coffee",
    "targetHeight": 77000,
    "gravity": 0.36,
    "jumpForce": -13.2,
    "speedFactor": 2.65,
    "wind": 0,
    "bgGradient": [
      "#331405",
      "#66280a",
      "#9e3e0f"
    ],
    "platformColor": "#f97316",
    "platformBorder": "#fde68a",
    "ballGlow": "#fb923c",
    "description": "Aproveite a efervescência do caldeirão cósmico para voar mais alto entre conchas douradas.",
    "hazards": [
      "springs",
      "fragile"
    ],
    "mechanic": "Bolhas colossais de sopa aromática que estouram com grande força de empuxo."
  },
  {
    "id": 78,
    "number": 78,
    "title": "Esteira Industrial de Temperos",
    "theme": "gastronomy",
    "icon": "Boxes",
    "targetHeight": 78000,
    "gravity": 0.26,
    "jumpForce": -13.2,
    "speedFactor": 2.66,
    "wind": 0,
    "bgGradient": [
      "#2e1605",
      "#5c2c0a",
      "#8f4510"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fde047",
    "ballGlow": "#f59e0b",
    "description": "Pistas rolantes industriais transportando sacas de açafrão, canela e ervas raras.",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "Rolos mecânicos de moagem com grãos de pimenta que rolam e desviam o salto."
  },
  {
    "id": 79,
    "number": 79,
    "title": "Esteira dos Confeitos da Grande Cozinha",
    "theme": "gastronomy",
    "icon": "Utensils",
    "targetHeight": 79000,
    "gravity": 0.28,
    "jumpForce": -13.2,
    "speedFactor": 2.68,
    "wind": 0,
    "bgGradient": [
      "#381704",
      "#702e08",
      "#ad470d"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Corra lateralmente pela bancada do banquete dos deuses gastronômicos!",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Travessia sobre bandejas de doces rolantes e tortas gigantes!",
    "layout": "horizontal",
    "targetDistance": 4800
  },
  {
    "id": 80,
    "number": 80,
    "title": "👑 CHEFÃO 16: Chef Magmático Vulcânico",
    "theme": "gastronomy",
    "icon": "Crown",
    "targetHeight": 80000,
    "gravity": 0.3,
    "jumpForce": -13.3,
    "speedFactor": 2.69,
    "wind": 0,
    "bgGradient": [
      "#240a02",
      "#471404",
      "#6e1f06"
    ],
    "platformColor": "#c2410c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#ea580c",
    "description": "O PRATO PRINCIPAL AOS 80.000m! O mestre cuca do magma quer transformar seu salto em banquete!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O Chef arremessa cutelos e caldas ardentes! Apague os queimadores de lava!",
    "isBossStage": true,
    "bossName": "Chef Magmático Vulcânico",
    "bossTitle": "Mestre da Fornalha Flamejante",
    "bossHP": 16,
    "bossColor": "#ea580c",
    "bossGlow": "#f97316",
    "rewardGems": 1600,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 81,
    "number": 81,
    "title": "Hélice Dupla do Código Genético",
    "theme": "health",
    "icon": "Dna",
    "targetHeight": 81000,
    "gravity": 0.32,
    "jumpForce": -13.3,
    "speedFactor": 2.7,
    "wind": 0,
    "bgGradient": [
      "#041f1c",
      "#0a3d38",
      "#10635b"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#99f6e4",
    "ballGlow": "#2dd4bf",
    "description": "Suba pela fita de DNA cósmica que guarda as instruções fundamentais da vida eterna.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Pontes de hidrogênio espirais que giram e impulsionam com vibração biológica."
  },
  {
    "id": 82,
    "number": 82,
    "title": "Corrente dos Anticorpos Velozes",
    "theme": "health",
    "icon": "Activity",
    "targetHeight": 82000,
    "gravity": 0.34,
    "jumpForce": -13.3,
    "speedFactor": 2.72,
    "wind": 0,
    "bgGradient": [
      "#052420",
      "#0c4740",
      "#147367"
    ],
    "platformColor": "#0d9488",
    "platformBorder": "#5eead4",
    "ballGlow": "#14b8a6",
    "description": "Desvie dos glóbulos hiperativos que reagem com força a qualquer elemento invasor.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Células de defesa esféricas que patrulham os vasos com movimento senoidal."
  },
  {
    "id": 83,
    "number": 83,
    "title": "Ventrículo dos Pulsos Bioelétricos",
    "theme": "health",
    "icon": "Heart",
    "targetHeight": 83000,
    "gravity": 0.36,
    "jumpForce": -13.3,
    "speedFactor": 2.73,
    "wind": 0,
    "bgGradient": [
      "#072622",
      "#0f4d45",
      "#187d70"
    ],
    "platformColor": "#0f766e",
    "platformBorder": "#99f6e4",
    "ballGlow": "#0d9488",
    "description": "Sinta a pulsação colossal do núcleo vital e salte exatamente no momento do sístole.",
    "hazards": [
      "spikes",
      "springs"
    ],
    "mechanic": "Batimentos cardíacos regulares que geram ondas de choque a cada 2.5 segundos."
  },
  {
    "id": 84,
    "number": 84,
    "title": "Artéria Principal da Vida",
    "theme": "health",
    "icon": "Heart",
    "targetHeight": 84000,
    "gravity": 0.26,
    "jumpForce": -13.3,
    "speedFactor": 2.74,
    "wind": 0,
    "bgGradient": [
      "#08302b",
      "#115e54",
      "#1b9183"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Navegue horizontalmente pela grande artéria em ritmo de alta velocidade!",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Túnel arterial com fluxo plasmático contínuo e desvios rápidos!",
    "layout": "horizontal",
    "targetDistance": 5000
  },
  {
    "id": 85,
    "number": 85,
    "title": "👑 CHEFÃO 17: Patógeno Quântico Alfa",
    "theme": "health",
    "icon": "Crown",
    "targetHeight": 85000,
    "gravity": 0.28,
    "jumpForce": -13.4,
    "speedFactor": 2.75,
    "wind": 0,
    "bgGradient": [
      "#031715",
      "#082e2a",
      "#0f4a43"
    ],
    "platformColor": "#115e59",
    "platformBorder": "#99f6e4",
    "ballGlow": "#14b8a6",
    "description": "QUARANTENA ABSOLUTA AOS 85.000m! Erradique a anomalia microscópica antes que contamine o cosmos!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "springs"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O vírus se divide em réplicas! Injete as doses de anticorpos curativos!",
    "isBossStage": true,
    "bossName": "Patógeno Quântico Alfa",
    "bossTitle": "Mutação Viral Hipercinética",
    "bossHP": 17,
    "bossColor": "#0d9488",
    "bossGlow": "#2dd4bf",
    "rewardGems": 1700,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 86,
    "number": 86,
    "title": "Camada de Ozônio Ionizada",
    "theme": "sky_realm",
    "icon": "Cloud",
    "targetHeight": 86000,
    "gravity": 0.3,
    "jumpForce": -13.4,
    "speedFactor": 2.77,
    "wind": 0,
    "bgGradient": [
      "#08182b",
      "#103157",
      "#1a4f8c"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#bae6fd",
    "ballGlow": "#7dd3fc",
    "description": "Flutue nas franjas do espaço onde o céu se funde com o infinito azul-violeta.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Atmosfera rarefeita: gravidade reduzida para 0.22 permitindo super saltos flutuantes."
  },
  {
    "id": 87,
    "number": 87,
    "title": "Nuvem de Granizo Cumulonimbus",
    "theme": "sky_realm",
    "icon": "Wind",
    "targetHeight": 87000,
    "gravity": 0.32,
    "jumpForce": -13.4,
    "speedFactor": 2.78,
    "wind": -0.35,
    "bgGradient": [
      "#061a33",
      "#0d3566",
      "#1454a3"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#38bdf8",
    "description": "Enfrente o coração de uma tempestade supercelular carregada de raios e saraiva cósmica.",
    "hazards": [
      "wind",
      "spikes"
    ],
    "mechanic": "Rajadas gélidas da esquerda e pedras pontiagudas de gelo caindo das nuvens."
  },
  {
    "id": 88,
    "number": 88,
    "title": "Cortina Eletromagnética da Aurora",
    "theme": "sky_realm",
    "icon": "Sparkles",
    "targetHeight": 88000,
    "gravity": 0.34,
    "jumpForce": -13.4,
    "speedFactor": 2.79,
    "wind": 0,
    "bgGradient": [
      "#0b1638",
      "#172c6e",
      "#2547b0"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#c4b5fd",
    "ballGlow": "#38bdf8",
    "description": "Dancem sobre as fitas luminescentes da aurora polar que pintam a escuridão estratosférica.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Fitilhos de plasma verde e violeta que oscilam e mudam de altura suavemente."
  },
  {
    "id": 89,
    "number": 89,
    "title": "Corredor das Correntes de Jato",
    "theme": "sky_realm",
    "icon": "Wind",
    "targetHeight": 89000,
    "gravity": 0.36,
    "jumpForce": -13.5,
    "speedFactor": 2.81,
    "wind": 0.25,
    "bgGradient": [
      "#0a2247",
      "#14458f",
      "#1f6bd9"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Voe pelas correntes de jato da estratosfera a velocidades supersônicas!",
    "hazards": [
      "wind",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Vento de cauda favorável em alta altitude com turbulências repentinas!",
    "layout": "horizontal",
    "targetDistance": 5100
  },
  {
    "id": 90,
    "number": 90,
    "title": "👑 CHEFÃO 18: Fênix das Tempestades",
    "theme": "sky_realm",
    "icon": "Crown",
    "targetHeight": 90000,
    "gravity": 0.26,
    "jumpForce": -13.5,
    "speedFactor": 2.82,
    "wind": 0,
    "bgGradient": [
      "#041221",
      "#082542",
      "#0f3d6b"
    ],
    "platformColor": "#0369a1",
    "platformBorder": "#bae6fd",
    "ballGlow": "#0ea5e9",
    "description": "TEMPESTADE ZÊNITE AOS 90.000m! Domine a senhora alada dos ciclones árticos!",
    "hazards": [
      "moving",
      "fragile",
      "wind",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: A Fênix bate as asas criando furacões! Ative os para-raios de titânio!",
    "isBossStage": true,
    "bossName": "Fênix das Tempestades",
    "bossTitle": "Senhora dos Ventos Polares",
    "bossHP": 18,
    "bossColor": "#0284c7",
    "bossGlow": "#38bdf8",
    "rewardGems": 1800,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 91,
    "number": 91,
    "title": "Pirâmides Esculpidas dos Andes",
    "theme": "continents",
    "icon": "Pyramid",
    "targetHeight": 91000,
    "gravity": 0.28,
    "jumpForce": -13.5,
    "speedFactor": 2.83,
    "wind": 0.2,
    "bgGradient": [
      "#062116",
      "#0d422c",
      "#146946"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#a7f3d0",
    "ballGlow": "#34d399",
    "description": "As montanhas sagradas da cordilheira andina guardam segredos astronômicos milenares.",
    "hazards": [
      "moving",
      "wind"
    ],
    "mechanic": "Plataformas de basalto esculpidas com cantaria inca que deslizam entre precipícios."
  },
  {
    "id": 92,
    "number": 92,
    "title": "Fiordes Glaciais da Escandinávia",
    "theme": "continents",
    "icon": "Snowflake",
    "targetHeight": 92000,
    "gravity": 0.3,
    "jumpForce": -13.6,
    "speedFactor": 2.85,
    "wind": 0,
    "bgGradient": [
      "#06241c",
      "#0d4738",
      "#157058"
    ],
    "platformColor": "#059669",
    "platformBorder": "#99f6e4",
    "ballGlow": "#10b981",
    "description": "O reino dos vikings e das geleiras azuis esculpidas pela passagem do tempo.",
    "hazards": [
      "fragile",
      "springs"
    ],
    "mechanic": "Icebergs suspensos sobre águas esmeraldas que estalam e dão saltos frescos."
  },
  {
    "id": 93,
    "number": 93,
    "title": "Cânions Vermelhos de Uluru",
    "theme": "continents",
    "icon": "Landmark",
    "targetHeight": 93000,
    "gravity": 0.32,
    "jumpForce": -13.6,
    "speedFactor": 2.86,
    "wind": 0,
    "bgGradient": [
      "#260f06",
      "#4d1e0c",
      "#7a3013"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fde68a",
    "ballGlow": "#f97316",
    "description": "O coração sagrado do outback australiano pulsando sob a luz dourada do poente.",
    "hazards": [
      "spikes",
      "moving"
    ],
    "mechanic": "Monólitos avermelhados de arenito com formações pontiagudas de quartzo ferroso."
  },
  {
    "id": 94,
    "number": 94,
    "title": "Passarela da Grande Muralha Milenar",
    "theme": "continents",
    "icon": "Shield",
    "targetHeight": 94000,
    "gravity": 0.34,
    "jumpForce": -13.6,
    "speedFactor": 2.87,
    "wind": 0,
    "bgGradient": [
      "#082e1f",
      "#115c3e",
      "#1b8f60"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#fde047",
    "ballGlow": "#34d399",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Salte entre as guaritas imperiais e torres de sinalização de fumaça!",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Corrida pelas ameias e torres de pedra da muralha milenar!",
    "layout": "horizontal",
    "targetDistance": 5200
  },
  {
    "id": 95,
    "number": 95,
    "title": "👑 CHEFÃO 19: Esfinge Imperial Global",
    "theme": "continents",
    "icon": "Crown",
    "targetHeight": 95000,
    "gravity": 0.36,
    "jumpForce": -13.6,
    "speedFactor": 2.88,
    "wind": 0,
    "bgGradient": [
      "#041a11",
      "#093322",
      "#0f5237"
    ],
    "platformColor": "#047857",
    "platformBorder": "#fef08a",
    "ballGlow": "#10b981",
    "description": "O JULGAMENTO DAS CIVILIZAÇÕES AOS 95.000m! Desvende os mistérios da guardiã planetária!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "springs"
    ],
    "mechanic": "BATALHA DE CHEFÃO: A Esfinge propõe enigmas gravitacionais! Pise nas runas corretas!",
    "isBossStage": true,
    "bossName": "Esfinge Imperial Global",
    "bossTitle": "Guardião dos Sete Continentes",
    "bossHP": 19,
    "bossColor": "#10b981",
    "bossGlow": "#34d399",
    "rewardGems": 1900,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 96,
    "number": 96,
    "title": "Horizonte de Eventos Quântico",
    "theme": "futuristic",
    "icon": "Infinity",
    "targetHeight": 96000,
    "gravity": 0.26,
    "jumpForce": -13.7,
    "speedFactor": 2.9,
    "wind": 0,
    "bgGradient": [
      "#1e0a2e",
      "#3b1459",
      "#5e208c"
    ],
    "platformColor": "#c084fc",
    "platformBorder": "#f5d0fe",
    "ballGlow": "#d8b4fe",
    "description": "A borda da realidade cósmica aos 96.000m onde a luz dobra em círculos perfeitos.",
    "hazards": [
      "conveyor"
    ],
    "mechanic": "Gravidade extrema que suga levemente para o centro com esteiras gravitacionais."
  },
  {
    "id": 97,
    "number": 97,
    "title": "Fenda Taquiônica dos 100k",
    "theme": "futuristic",
    "icon": "Zap",
    "targetHeight": 97000,
    "gravity": 0.28,
    "jumpForce": -13.7,
    "speedFactor": 2.91,
    "wind": 0,
    "bgGradient": [
      "#240d36",
      "#451969",
      "#6e28a6"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#e9d5ff",
    "ballGlow": "#c084fc",
    "description": "O tempo começa a se desfragmentar à medida que a altitude dos 100.000m se aproxima.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Fissuras no continuum temporal que teleportam a esfera entre plataformas."
  },
  {
    "id": 98,
    "number": 98,
    "title": "Rede Neural das Constelações",
    "theme": "futuristic",
    "icon": "Orbit",
    "targetHeight": 98000,
    "gravity": 0.3,
    "jumpForce": -13.7,
    "speedFactor": 2.92,
    "wind": 0,
    "bgGradient": [
      "#290f3d",
      "#511e7a",
      "#8030bf"
    ],
    "platformColor": "#9333ea",
    "platformBorder": "#f3e8ff",
    "ballGlow": "#a855f7",
    "description": "Conecte estrelas vivas através de saltos audaciosos acima de todas as galáxias conhecidas.",
    "hazards": [
      "fragile",
      "springs"
    ],
    "mechanic": "Sinapses estelares que se acendem e apagam criando caminhos efêmeros."
  },
  {
    "id": 99,
    "number": 99,
    "title": "Túnel do Hiperespaço Interestelar",
    "theme": "futuristic",
    "icon": "Rocket",
    "targetHeight": 99000,
    "gravity": 0.32,
    "jumpForce": -13.7,
    "speedFactor": 2.94,
    "wind": 0,
    "bgGradient": [
      "#33144d",
      "#662899",
      "#9e3ee8"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#ffffff",
    "ballGlow": "#e879f9",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Voe através do túnel de minhoca galáctico com reflexos relâmpago!",
    "hazards": [
      "conveyor",
      "moving",
      "fragile"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Arrancada máxima na velocidade da dobra estelar rumo ao Zênite!",
    "layout": "horizontal",
    "targetDistance": 5400
  },
  {
    "id": 100,
    "number": 100,
    "title": "👑 CHEFÃO 20: Chronos, O Senhor das Eras",
    "theme": "futuristic",
    "icon": "Crown",
    "targetHeight": 100000,
    "gravity": 0.34,
    "jumpForce": -13.8,
    "speedFactor": 2.95,
    "wind": 0,
    "bgGradient": [
      "#1c082b",
      "#361054",
      "#561a85"
    ],
    "platformColor": "#7e22ce",
    "platformBorder": "#fde047",
    "ballGlow": "#a855f7",
    "description": "O MARCO DO CENTENÁRIO AOS 100.000m! O governante supremo das dimensões aguarda seu salto final!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO LENDÁRIA: Chronos congela o tempo e inverte a gravidade! Desvie e vença!",
    "isBossStage": true,
    "bossName": "Chronos, O Senhor das Eras",
    "bossTitle": "Imperador do Vácuo Infinito",
    "bossHP": 20,
    "bossColor": "#9333ea",
    "bossGlow": "#c084fc",
    "rewardGems": 2000,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 101,
    "number": 101,
    "title": "Entrada do Vértice Abissal",
    "theme": "ocean",
    "icon": "Waves",
    "targetHeight": 101000,
    "gravity": 0.36,
    "jumpForce": -13.8,
    "speedFactor": 2.96,
    "wind": 0,
    "bgGradient": [
      "#021221",
      "#052747",
      "#0a457a"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#7dd3fc",
    "ballGlow": "#38bdf8",
    "description": "Mergulhe no abismo oceânico cósmico invertido onde a escuridão é rompida por neon natural.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Águas pesadas com resistência fluida e plataformas bioluminescentes de corais."
  },
  {
    "id": 102,
    "number": 102,
    "title": "Fontes Hidrotérmicas Negras",
    "theme": "ocean",
    "icon": "Flame",
    "targetHeight": 102000,
    "gravity": 0.26,
    "jumpForce": -13.8,
    "speedFactor": 2.98,
    "wind": 0,
    "bgGradient": [
      "#03182b",
      "#083359",
      "#0e5694"
    ],
    "platformColor": "#0369a1",
    "platformBorder": "#fdba74",
    "ballGlow": "#0284c7",
    "description": "Chaminés vulcânicas expelindo minerais aquecidos a 400°C sob a pressão das profundezas.",
    "hazards": [
      "springs",
      "spikes"
    ],
    "mechanic": "Jatos termais submarinos de alta pressão que lançam a esfera com calor súbito."
  },
  {
    "id": 103,
    "number": 103,
    "title": "Cemitério de Submarinos de Titânio",
    "theme": "ocean",
    "icon": "Anchor",
    "targetHeight": 103000,
    "gravity": 0.28,
    "jumpForce": -13.8,
    "speedFactor": 2.99,
    "wind": 0,
    "bgGradient": [
      "#041e36",
      "#0b3d6b",
      "#1263ab"
    ],
    "platformColor": "#075985",
    "platformBorder": "#94a3b8",
    "ballGlow": "#38bdf8",
    "description": "Escale pelas carcaças de expedições pretéritas que sucumbiram à pressão esmagadora.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Cascos de naves exploradoras submersas que rangem e cedem com o peso."
  },
  {
    "id": 104,
    "number": 104,
    "title": "Trincheira das Correntes de Fundo",
    "theme": "ocean",
    "icon": "Waves",
    "targetHeight": 104000,
    "gravity": 0.3,
    "jumpForce": -13.8,
    "speedFactor": 3,
    "wind": 0,
    "bgGradient": [
      "#052542",
      "#0d4b82",
      "#1677cc"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Deslize horizontalmente pelo leito submarino esquivando de algas vivas!",
    "hazards": [
      "moving",
      "conveyor"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Travessia lateral contra correntes de água pesada e cardumes elétricos!",
    "layout": "horizontal",
    "targetDistance": 5300
  },
  {
    "id": 105,
    "number": 105,
    "title": "👑 CHEFÃO 21: Kraken Abissal de Neon",
    "theme": "ocean",
    "icon": "Crown",
    "targetHeight": 105000,
    "gravity": 0.32,
    "jumpForce": -13.9,
    "speedFactor": 3.01,
    "wind": 0,
    "bgGradient": [
      "#010c17",
      "#031c33",
      "#073259"
    ],
    "platformColor": "#0369a1",
    "platformBorder": "#38bdf8",
    "ballGlow": "#0ea5e9",
    "description": "PESADELO DAS FOSSAS AOS 105.000m! Enfrente o monstro cefalópode de tentáculos bioluminescentes!",
    "hazards": [
      "moving",
      "fragile",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Tentáculos colossais emergem da escuridão! Ative as cargas de profundidade!",
    "isBossStage": true,
    "bossName": "Kraken Abissal de Neon",
    "bossTitle": "Terror das Fossas Oceânicas",
    "bossHP": 21,
    "bossColor": "#0284c7",
    "bossGlow": "#38bdf8",
    "rewardGems": 2100,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 106,
    "number": 106,
    "title": "Dunas de Quartzo Prismático",
    "theme": "crystal",
    "icon": "Gem",
    "targetHeight": 106000,
    "gravity": 0.34,
    "jumpForce": -13.9,
    "speedFactor": 3.03,
    "wind": 0,
    "bgGradient": [
      "#241902",
      "#473204",
      "#735107"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fef08a",
    "ballGlow": "#fde047",
    "description": "O deserto cósmico onde cada grão de areia é um diamante bruto brilhando sob sóis gêmeos.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Plataformas de cristal multifacetado que refratam luz e aceleram levemente o salto."
  },
  {
    "id": 107,
    "number": 107,
    "title": "Caverna dos Geodos Gigantes",
    "theme": "crystal",
    "icon": "Sparkles",
    "targetHeight": 107000,
    "gravity": 0.36,
    "jumpForce": -13.9,
    "speedFactor": 3.04,
    "wind": 0,
    "bgGradient": [
      "#261c05",
      "#4d380a",
      "#7a5910"
    ],
    "platformColor": "#ca8a04",
    "platformBorder": "#fed7aa",
    "ballGlow": "#eab308",
    "description": "Penetre no ventre da terra cósmica forrado de estalagmites ametistas brilhantes.",
    "hazards": [
      "spikes",
      "fragile"
    ],
    "mechanic": "Cristais de calcita pontiagudos com pontas afiadas que quebram sob pressão."
  },
  {
    "id": 108,
    "number": 108,
    "title": "Obeliscos Refletores de Fótons",
    "theme": "crystal",
    "icon": "Boxes",
    "targetHeight": 108000,
    "gravity": 0.26,
    "jumpForce": -13.9,
    "speedFactor": 3.05,
    "wind": 0,
    "bgGradient": [
      "#2b2007",
      "#543f0e",
      "#856317"
    ],
    "platformColor": "#a16207",
    "platformBorder": "#fde68a",
    "ballGlow": "#ca8a04",
    "description": "Espelhos monumentais alinhados para canalizar a energia da estrela central do mundo.",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "Monólitos translúcidos que conduzem feixes solares com esteiras de reflexão."
  },
  {
    "id": 109,
    "number": 109,
    "title": "Passo do Vale dos Espelhos",
    "theme": "crystal",
    "icon": "Gem",
    "targetHeight": 109000,
    "gravity": 0.28,
    "jumpForce": -14,
    "speedFactor": 3.07,
    "wind": 0,
    "bgGradient": [
      "#332605",
      "#664c0a",
      "#9e7710"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Atravesse a passarela de vidro cristalino cintilante em velocidade pura!",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Corrida entre espelhos solares gigantescos refletindo calor!",
    "layout": "horizontal",
    "targetDistance": 5300
  },
  {
    "id": 110,
    "number": 110,
    "title": "👑 CHEFÃO 22: Escorpião de Cristal Solar",
    "theme": "crystal",
    "icon": "Crown",
    "targetHeight": 110000,
    "gravity": 0.3,
    "jumpForce": -14,
    "speedFactor": 3.08,
    "wind": 0,
    "bgGradient": [
      "#1c1302",
      "#382704",
      "#593e06"
    ],
    "platformColor": "#ca8a04",
    "platformBorder": "#fef08a",
    "ballGlow": "#eab308",
    "description": "DUELO NO SOL DO MEIO-DIA AOS 110.000m! O predador de carapaça adamantina ataca!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O ferrão de cristal dispara feixes de plasma! Reflita a luz nos espelhos de bronze!",
    "isBossStage": true,
    "bossName": "Escorpião de Cristal Solar",
    "bossTitle": "Ferrão Primordial de Quartzo",
    "bossHP": 22,
    "bossColor": "#eab308",
    "bossGlow": "#fde047",
    "rewardGems": 2200,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 111,
    "number": 111,
    "title": "Câmara de Vácuo Magnético",
    "theme": "quantum",
    "icon": "Atom",
    "targetHeight": 111000,
    "gravity": 0.32,
    "jumpForce": -14,
    "speedFactor": 3.09,
    "wind": 0,
    "bgGradient": [
      "#130a24",
      "#261547",
      "#3c2170"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#c4b5fd",
    "ballGlow": "#a78bfa",
    "description": "O anel principal do acelerador onde prótons giram 11.000 vezes por segundo.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Supercondutores criogênicos resfriados a hélio líquido que mantêm a esfera em levitação."
  },
  {
    "id": 112,
    "number": 112,
    "title": "Colisor de Quarks e Léptons",
    "theme": "quantum",
    "icon": "Zap",
    "targetHeight": 112000,
    "gravity": 0.34,
    "jumpForce": -14.1,
    "speedFactor": 3.11,
    "wind": 0,
    "bgGradient": [
      "#170c2e",
      "#2e185c",
      "#47258f"
    ],
    "platformColor": "#7c3aed",
    "platformBorder": "#ddd6fe",
    "ballGlow": "#8b5cf6",
    "description": "Colida com precisão milimétrica para aproveitar a energia liberada na fissão quântica.",
    "hazards": [
      "springs",
      "fragile"
    ],
    "mechanic": "Detonações subatômicas regulares que fornecem super impulso instantâneo."
  },
  {
    "id": 113,
    "number": 113,
    "title": "Trilhas de Íons Pesados",
    "theme": "quantum",
    "icon": "Boxes",
    "targetHeight": 113000,
    "gravity": 0.36,
    "jumpForce": -14.1,
    "speedFactor": 3.12,
    "wind": 0,
    "bgGradient": [
      "#1b0f36",
      "#351e6b",
      "#532fa3"
    ],
    "platformColor": "#6d28d9",
    "platformBorder": "#c4b5fd",
    "ballGlow": "#7c3aed",
    "description": "Feixes de partículas pesadas de chumbo aceleradas em direção ao ponto de impacto.",
    "hazards": [
      "conveyor",
      "spikes"
    ],
    "mechanic": "Esteiras magnéticas de alta indução com faíscas elétricas de alta voltagem."
  },
  {
    "id": 114,
    "number": 114,
    "title": "O Anel Circular de Partículas",
    "theme": "quantum",
    "icon": "Orbit",
    "targetHeight": 114000,
    "gravity": 0.26,
    "jumpForce": -14.1,
    "speedFactor": 3.13,
    "wind": 0,
    "bgGradient": [
      "#201240",
      "#402480",
      "#6338c7"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#ffffff",
    "ballGlow": "#c4b5fd",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Acelere até 99% da velocidade da luz pelo túnel magnético!",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Loop subterrâneo de 27km percorrido em velocidade relativística!",
    "layout": "horizontal",
    "targetDistance": 5400
  },
  {
    "id": 115,
    "number": 115,
    "title": "👑 CHEFÃO 23: Bóson Descontrolado",
    "theme": "quantum",
    "icon": "Crown",
    "targetHeight": 115000,
    "gravity": 0.28,
    "jumpForce": -14.1,
    "speedFactor": 3.14,
    "wind": 0,
    "bgGradient": [
      "#0f071c",
      "#1e0e38",
      "#301659"
    ],
    "platformColor": "#5b21b6",
    "platformBorder": "#ddd6fe",
    "ballGlow": "#8b5cf6",
    "description": "SINGULARIDADE SUBATÔMICA AOS 115.000m! Impeça a criação de um micro buraco negro!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O bóson colapsa matéria! Ative os campos magnéticos de contenção!",
    "isBossStage": true,
    "bossName": "Bóson Descontrolado",
    "bossTitle": "A Partícula Devoradora",
    "bossHP": 23,
    "bossColor": "#8b5cf6",
    "bossGlow": "#c4b5fd",
    "rewardGems": 2300,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 116,
    "number": 116,
    "title": "Encosta dos Fósseis Glaciais",
    "theme": "dinosaur",
    "icon": "Snowflake",
    "targetHeight": 116000,
    "gravity": 0.3,
    "jumpForce": -14.2,
    "speedFactor": 3.16,
    "wind": 0.3,
    "bgGradient": [
      "#051c1c",
      "#0a3838",
      "#105959"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#99f6e4",
    "ballGlow": "#2dd4bf",
    "description": "Suba a montanha dos dinossauros onde o frio preservou esqueletos inteiros de milhões de anos.",
    "hazards": [
      "wind",
      "moving"
    ],
    "mechanic": "Placas de rocha cobertas de gelo escorregadio com ventos laterais de geleira."
  },
  {
    "id": 117,
    "number": 117,
    "title": "Ninhos Suspensos nas Escarpas",
    "theme": "dinosaur",
    "icon": "TreePine",
    "targetHeight": 117000,
    "gravity": 0.32,
    "jumpForce": -14.2,
    "speedFactor": 3.17,
    "wind": 0,
    "bgGradient": [
      "#072424",
      "#0e4747",
      "#156e6e"
    ],
    "platformColor": "#0d9488",
    "platformBorder": "#5eead4",
    "ballGlow": "#14b8a6",
    "description": "Escale pelas fendas íngremes onde as mães pterodáctilos criam seus filhotes alados.",
    "hazards": [
      "springs",
      "fragile"
    ],
    "mechanic": "Ramos fossilizados elásticos e ninhos com ovos petrificados que balançam no vento."
  },
  {
    "id": 118,
    "number": 118,
    "title": "Desfiladeiro dos Picos de Gelo",
    "theme": "dinosaur",
    "icon": "Zap",
    "targetHeight": 118000,
    "gravity": 0.34,
    "jumpForce": -14.2,
    "speedFactor": 3.18,
    "wind": -0.3,
    "bgGradient": [
      "#082929",
      "#115252",
      "#1a8080"
    ],
    "platformColor": "#0f766e",
    "platformBorder": "#99f6e4",
    "ballGlow": "#0d9488",
    "description": "O vento corta como navalha enquanto pedras pontiagudas ameaçam perfurar sua subida.",
    "hazards": [
      "spikes",
      "wind"
    ],
    "mechanic": "Estalactites de gelo jurássico pontiagudas penduradas sobre o abismo."
  },
  {
    "id": 119,
    "number": 119,
    "title": "Planalto do Voo das Bestas Aladas",
    "theme": "dinosaur",
    "icon": "Wind",
    "targetHeight": 119000,
    "gravity": 0.36,
    "jumpForce": -14.2,
    "speedFactor": 3.2,
    "wind": 0.2,
    "bgGradient": [
      "#0a3333",
      "#146666",
      "#209e9e"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Salte entre as correntes térmicas dos picos nevados pré-históricos!",
    "hazards": [
      "moving",
      "wind"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Cruzando cumes verticais lado a lado com pterossauros em pleno voo!",
    "layout": "horizontal",
    "targetDistance": 5400
  },
  {
    "id": 120,
    "number": 120,
    "title": "👑 CHEFÃO 24: Quetzalcoatlus Supremo",
    "theme": "dinosaur",
    "icon": "Crown",
    "targetHeight": 120000,
    "gravity": 0.26,
    "jumpForce": -14.3,
    "speedFactor": 3.21,
    "wind": 0,
    "bgGradient": [
      "#041414",
      "#082929",
      "#0e4242"
    ],
    "platformColor": "#115e59",
    "platformBorder": "#99f6e4",
    "ballGlow": "#14b8a6",
    "description": "O SENHOR DOS CÉUS MESOZÓICOS AOS 120.000m! Conquiste o ápice do ninho jurássico!",
    "hazards": [
      "moving",
      "fragile",
      "wind",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O réptil alado de 12 metros dá rasantes furiosos! Ative as redes balísticas!",
    "isBossStage": true,
    "bossName": "Quetzalcoatlus Supremo",
    "bossTitle": "Soberano Alado dos Céus Jurássicos",
    "bossHP": 24,
    "bossColor": "#14b8a6",
    "bossGlow": "#2dd4bf",
    "rewardGems": 2400,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 121,
    "number": 121,
    "title": "Estação Abandonada de Tombstone",
    "theme": "wild_west",
    "icon": "Crosshair",
    "targetHeight": 121000,
    "gravity": 0.28,
    "jumpForce": -14.3,
    "speedFactor": 3.22,
    "wind": 0,
    "bgGradient": [
      "#261304",
      "#4a2608",
      "#783c0d"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fbbf24",
    "description": "O sino da estação soa na névoa do deserto anunciando a passagem do comboio amaldiçoado.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Pranchas de carvalho velho da plataforma de embarque que cedem com rangidos."
  },
  {
    "id": 122,
    "number": 122,
    "title": "Corte da Serra de Fogo",
    "theme": "wild_west",
    "icon": "Flame",
    "targetHeight": 122000,
    "gravity": 0.3,
    "jumpForce": -14.3,
    "speedFactor": 3.24,
    "wind": 0,
    "bgGradient": [
      "#2e1405",
      "#5c280b",
      "#8f3e11"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f97316",
    "description": "Túneis escavados na rocha viva onde chamas dançam pelas frestas dos dormentes.",
    "hazards": [
      "spikes",
      "conveyor"
    ],
    "mechanic": "Trilhos incandescentes aquecidos por carvão espectral que queimam no contato."
  },
  {
    "id": 123,
    "number": 123,
    "title": "O Expresso do Purgatório em Disparada",
    "theme": "wild_west",
    "icon": "Rocket",
    "targetHeight": 123000,
    "gravity": 0.32,
    "jumpForce": -14.3,
    "speedFactor": 3.25,
    "wind": 0,
    "bgGradient": [
      "#361706",
      "#6b2d0c",
      "#a34513"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Corra sobre o teto metálico dos vagões em chamas do expresso fantasma!",
    "hazards": [
      "conveyor",
      "fragile",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Pulando de vagão em vagão de um trem blindado a 150 km/h!",
    "layout": "horizontal",
    "targetDistance": 5500
  },
  {
    "id": 124,
    "number": 124,
    "title": "Ponte Pênsil da Ravina Negra",
    "theme": "wild_west",
    "icon": "Axe",
    "targetHeight": 124000,
    "gravity": 0.34,
    "jumpForce": -14.3,
    "speedFactor": 3.26,
    "wind": 0,
    "bgGradient": [
      "#3b1b08",
      "#733510",
      "#ab4f18"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "A travessia mais perigosa de todo o oeste: 800 metros de vão sobre o abismo insondável.",
    "hazards": [
      "fragile",
      "springs"
    ],
    "mechanic": "Cabos de aço arrebentando e vigas que despencam aos pares sobre o precipício."
  },
  {
    "id": 125,
    "number": 125,
    "title": "👑 CHEFÃO 25: Locomotiva Blindada Fantasma",
    "theme": "wild_west",
    "icon": "Crown",
    "targetHeight": 125000,
    "gravity": 0.36,
    "jumpForce": -14.4,
    "speedFactor": 3.27,
    "wind": 0,
    "bgGradient": [
      "#1c0c03",
      "#381906",
      "#59270a"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "O APITO FINAL AOS 125.000m! Pare a locomotiva demoníaca antes que ela destrua a linha cósmica!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O monstro de aço solta vapor superaquecido! Jogue água na caldeira central!",
    "isBossStage": true,
    "bossName": "Locomotiva Blindada Fantasma",
    "bossTitle": "A Máquina do Juízo Final",
    "bossHP": 25,
    "bossColor": "#f59e0b",
    "bossGlow": "#fbbf24",
    "rewardGems": 2500,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 126,
    "number": 126,
    "title": "Domo dos Aros Holográficos",
    "theme": "sports",
    "icon": "Orbit",
    "targetHeight": 126000,
    "gravity": 0.26,
    "jumpForce": -14.4,
    "speedFactor": 3.29,
    "wind": 0,
    "bgGradient": [
      "#071b30",
      "#0f3761",
      "#175799"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#38bdf8",
    "description": "A arena futurista onde atletas competem sem peso em meio a estrelas cintilantes.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Anéis flutuantes no vácuo que dão propulsão magnética extra a cada travessia."
  },
  {
    "id": 127,
    "number": 127,
    "title": "Pistas Cruzadas de Propulsão",
    "theme": "sports",
    "icon": "Activity",
    "targetHeight": 127000,
    "gravity": 0.28,
    "jumpForce": -14.4,
    "speedFactor": 3.3,
    "wind": 0,
    "bgGradient": [
      "#0a223d",
      "#144378",
      "#1e68b8"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#7dd3fc",
    "ballGlow": "#38bdf8",
    "description": "Corredores iluminados por LEDs que cruzam a arena em malhas geométricas velozes.",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "Esteiras com velocidades contrastantes que testam reflexos a cada fração de segundo."
  },
  {
    "id": 128,
    "number": 128,
    "title": "Barreiras Eletrizadas de Salto",
    "theme": "sports",
    "icon": "Zap",
    "targetHeight": 128000,
    "gravity": 0.3,
    "jumpForce": -14.4,
    "speedFactor": 3.31,
    "wind": 0,
    "bgGradient": [
      "#0d294a",
      "#1a5191",
      "#277cdb"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#bfdbfe",
    "ballGlow": "#60a5fa",
    "description": "Salte sobre as traves de energia sem encostar nas pontas de descarga iônica.",
    "hazards": [
      "spikes",
      "fragile"
    ],
    "mechanic": "Obstáculos de alta tensão com feixes que pulsam a cada intervalo de 2 segundos."
  },
  {
    "id": 129,
    "number": 129,
    "title": "Reta Final da Maratona Galáctica",
    "theme": "sports",
    "icon": "Trophy",
    "targetHeight": 129000,
    "gravity": 0.32,
    "jumpForce": -14.5,
    "speedFactor": 3.33,
    "wind": 0,
    "bgGradient": [
      "#103259",
      "#2062ad",
      "#3094fa"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#fde047",
    "ballGlow": "#38bdf8",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Corra a grande maratona espacial rumo à fita de chegada estelar!",
    "hazards": [
      "conveyor",
      "springs",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Pista olímpica suspensa no vácuo estelar com esteiras e obstáculos!",
    "layout": "horizontal",
    "targetDistance": 5500
  },
  {
    "id": 130,
    "number": 130,
    "title": "👑 CHEFÃO 26: Campeão da Gravidade Zero",
    "theme": "sports",
    "icon": "Crown",
    "targetHeight": 130000,
    "gravity": 0.34,
    "jumpForce": -14.5,
    "speedFactor": 3.34,
    "wind": 0,
    "bgGradient": [
      "#051526",
      "#0b2b4d",
      "#124378"
    ],
    "platformColor": "#0369a1",
    "platformBorder": "#fde047",
    "ballGlow": "#0ea5e9",
    "description": "FINAL DO TORNEIO CÓSMICO AOS 130.000m! Destrone a lenda invicta dos esportes interplanetários!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O campeão usa impulso orbital triplo! Use as molas para superá-lo no ar!",
    "isBossStage": true,
    "bossName": "Campeão da Gravidade Zero",
    "bossTitle": "O Invencível das Galáxias",
    "bossHP": 26,
    "bossColor": "#0284c7",
    "bossGlow": "#38bdf8",
    "rewardGems": 2600,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 131,
    "number": 131,
    "title": "Geleia de Morango Saltitante",
    "theme": "gastronomy",
    "icon": "Cookie",
    "targetHeight": 131000,
    "gravity": 0.36,
    "jumpForce": -14.5,
    "speedFactor": 3.35,
    "wind": 0,
    "bgGradient": [
      "#2e1005",
      "#59210a",
      "#8a3310"
    ],
    "platformColor": "#f97316",
    "platformBorder": "#fed7aa",
    "ballGlow": "#fb923c",
    "description": "Um mundo feito inteiramente de confeitos mágicos onde cada salto é uma explosão doce.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Blocos de gelatina vermelha super elásticos com amortecimento suave e impulsos duplos."
  },
  {
    "id": 132,
    "number": 132,
    "title": "Cascatas de Chocolate Amargo",
    "theme": "gastronomy",
    "icon": "Waves",
    "targetHeight": 132000,
    "gravity": 0.26,
    "jumpForce": -14.6,
    "speedFactor": 3.37,
    "wind": 0,
    "bgGradient": [
      "#331406",
      "#63280c",
      "#963d12"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fde68a",
    "ballGlow": "#d97706",
    "description": "Rios espessos de cacau a 70% fluindo entre montanhas de suspiro e chantilly.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Barras de chocolate crocante que quebram com estalo sob aterrissagens duras."
  },
  {
    "id": 133,
    "number": 133,
    "title": "Floresta dos Pirulitos de Vidro",
    "theme": "gastronomy",
    "icon": "Zap",
    "targetHeight": 133000,
    "gravity": 0.28,
    "jumpForce": -14.6,
    "speedFactor": 3.38,
    "wind": 0,
    "bgGradient": [
      "#381708",
      "#6e2e10",
      "#a64619"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fef08a",
    "ballGlow": "#f97316",
    "description": "Árvores de pirulito transparente com espinhos de caramelo quebradiço e cortante.",
    "hazards": [
      "spikes",
      "conveyor"
    ],
    "mechanic": "Estacas de açúcar caramelizado pontiagudas e esteiras de bala toffee que puxam a bola."
  },
  {
    "id": 134,
    "number": 134,
    "title": "Passarela dos Biscoitos Crocantes",
    "theme": "gastronomy",
    "icon": "Cookie",
    "targetHeight": 134000,
    "gravity": 0.3,
    "jumpForce": -14.6,
    "speedFactor": 3.39,
    "wind": 0,
    "bgGradient": [
      "#401b0a",
      "#7a3414",
      "#b84f1f"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Atravesse a bancada das confeitarias cósmicas sem cair no leite quente!",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Corrida sobre bolachas gigantescas que esfarelam a cada pisada!",
    "layout": "horizontal",
    "targetDistance": 5500
  },
  {
    "id": 135,
    "number": 135,
    "title": "👑 CHEFÃO 27: Gólem de Caramelo Ardente",
    "theme": "gastronomy",
    "icon": "Crown",
    "targetHeight": 135000,
    "gravity": 0.32,
    "jumpForce": -14.6,
    "speedFactor": 3.4,
    "wind": 0,
    "bgGradient": [
      "#240d04",
      "#451908",
      "#6b270c"
    ],
    "platformColor": "#c2410c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#ea580c",
    "description": "SOBREMESA FINAL AOS 135.000m! Derrote o titã doce de caramelo antes que ele endureça seu caminho!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "conveyor"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O Gólem lança bombas de calda fervente! Resfrie-o com cristais de menta!",
    "isBossStage": true,
    "bossName": "Gólem de Caramelo Ardente",
    "bossTitle": "O Monstro da Calda Quente",
    "bossHP": 27,
    "bossColor": "#ea580c",
    "bossGlow": "#fbbf24",
    "rewardGems": 2700,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 136,
    "number": 136,
    "title": "Dendritos de Prata Estelar",
    "theme": "health",
    "icon": "Activity",
    "targetHeight": 136000,
    "gravity": 0.34,
    "jumpForce": -14.7,
    "speedFactor": 3.42,
    "wind": 0,
    "bgGradient": [
      "#041a18",
      "#083330",
      "#0e524d"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#99f6e4",
    "ballGlow": "#2dd4bf",
    "description": "Salte pelas ramificações do córtex cósmico onde pensamentos universais se formam.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Ramificações neurais que propagam potenciais de ação e impulsionam saltos harmônicos."
  },
  {
    "id": 137,
    "number": 137,
    "title": "Labirinto da Memória Quântica",
    "theme": "health",
    "icon": "Boxes",
    "targetHeight": 137000,
    "gravity": 0.36,
    "jumpForce": -14.7,
    "speedFactor": 3.43,
    "wind": 0,
    "bgGradient": [
      "#06211e",
      "#0b423d",
      "#126961"
    ],
    "platformColor": "#0d9488",
    "platformBorder": "#5eead4",
    "ballGlow": "#14b8a6",
    "description": "Recordações de estrelas extintas flutuando em meio a correntes bioelétricas suaves.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Plataformas que representam memórias antigas que desvanecem 0.7s após a ativação."
  },
  {
    "id": 138,
    "number": 138,
    "title": "Nódulo de Conexão Axônica",
    "theme": "health",
    "icon": "Zap",
    "targetHeight": 138000,
    "gravity": 0.26,
    "jumpForce": -14.7,
    "speedFactor": 3.44,
    "wind": 0,
    "bgGradient": [
      "#082925",
      "#10524b",
      "#197d73"
    ],
    "platformColor": "#0f766e",
    "platformBorder": "#c4b5fd",
    "ballGlow": "#0d9488",
    "description": "O ponto de confluência onde bilhões de impulsos nervosos do universo colidem.",
    "hazards": [
      "spikes",
      "conveyor"
    ],
    "mechanic": "Feixes de neurotransmissores com descargas elétricas ritmadas nos intervalos de sinapse."
  },
  {
    "id": 139,
    "number": 139,
    "title": "Via Expressa dos Impulsos Cerebrais",
    "theme": "health",
    "icon": "Rocket",
    "targetHeight": 139000,
    "gravity": 0.28,
    "jumpForce": -14.7,
    "speedFactor": 3.46,
    "wind": 0,
    "bgGradient": [
      "#0a332f",
      "#14665e",
      "#209e92"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Percorra o tronco neural em alta velocidade desviando de sobrecargas elétricas!",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Corrida na velocidade do pensamento puro pelos axônios celestes!",
    "layout": "horizontal",
    "targetDistance": 5600
  },
  {
    "id": 140,
    "number": 140,
    "title": "👑 CHEFÃO 28: Sinapse Hiperativa Omega",
    "theme": "health",
    "icon": "Crown",
    "targetHeight": 140000,
    "gravity": 0.3,
    "jumpForce": -14.8,
    "speedFactor": 3.47,
    "wind": 0,
    "bgGradient": [
      "#031413",
      "#072926",
      "#0c423e"
    ],
    "platformColor": "#115e59",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#14b8a6",
    "description": "DESPERTAR DA MENTE AOS 140.000m! Prove a pureza da sua intenção diante da consciência viva do cosmos!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "springs"
    ],
    "mechanic": "BATALHA DE CHEFÃO: A mente cósmica dispara ilusões visuais! Pise nos núcleos de razão verdadeira!",
    "isBossStage": true,
    "bossName": "Sinapse Hiperativa Omega",
    "bossTitle": "A Consciência Quântica Universal",
    "bossHP": 28,
    "bossColor": "#0d9488",
    "bossGlow": "#2dd4bf",
    "rewardGems": 2800,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 141,
    "number": 141,
    "title": "Terraços Flutuantes da Mesopotâmia",
    "theme": "continents",
    "icon": "Landmark",
    "targetHeight": 141000,
    "gravity": 0.32,
    "jumpForce": -14.8,
    "speedFactor": 3.48,
    "wind": 0,
    "bgGradient": [
      "#241402",
      "#472704",
      "#733f07"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fbbf24",
    "description": "Tijolos cozidos no sol da Babilônia sustentando árvores que tocam as estrelas.",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "Jardins de zigurates com esteiras de água corrente que aceleram o movimento lateral."
  },
  {
    "id": 142,
    "number": 142,
    "title": "Colunatas dos Templos Faraônicos",
    "theme": "continents",
    "icon": "Pyramid",
    "targetHeight": 142000,
    "gravity": 0.34,
    "jumpForce": -14.8,
    "speedFactor": 3.5,
    "wind": 0,
    "bgGradient": [
      "#291705",
      "#4d2c09",
      "#7a460e"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f59e0b",
    "description": "O legado de Karnak e Luxor erguido aos 142.000m como testamento da ambição humana.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Pilares esculpidos com hieróglifos de ouro que deslizam verticalmente."
  },
  {
    "id": 143,
    "number": 143,
    "title": "Calçada Monumental dos Faraós e Reis",
    "theme": "continents",
    "icon": "Crown",
    "targetHeight": 143000,
    "gravity": 0.36,
    "jumpForce": -14.8,
    "speedFactor": 3.51,
    "wind": 0,
    "bgGradient": [
      "#331d06",
      "#66390b",
      "#9e5912"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Corra pela avenida sagrada dos impérios do passado até o portão das eras!",
    "hazards": [
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "PERCURSO HORIZONTAL! Grande avenida cerimonial com obeliscos e arcos triunfais!",
    "layout": "horizontal",
    "targetDistance": 5600
  },
  {
    "id": 144,
    "number": 144,
    "title": "Bastilhas dos Cumes da Antiguidade",
    "theme": "continents",
    "icon": "Shield",
    "targetHeight": 144000,
    "gravity": 0.26,
    "jumpForce": -14.8,
    "speedFactor": 3.52,
    "wind": 0.35,
    "bgGradient": [
      "#3d2208",
      "#75420f",
      "#b36517"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "As torres de vigia finais que guardavam o portal para a última dimensão do cosmos.",
    "hazards": [
      "wind",
      "spikes"
    ],
    "mechanic": "Fortalezas de pedra com ameias protegidas contra vendavais e setas pontiagudas."
  },
  {
    "id": 145,
    "number": 145,
    "title": "👑 CHEFÃO 29: Colosso das Sete Civilizações",
    "theme": "continents",
    "icon": "Crown",
    "targetHeight": 145000,
    "gravity": 0.28,
    "jumpForce": -14.9,
    "speedFactor": 3.53,
    "wind": 0,
    "bgGradient": [
      "#1c0f02",
      "#381f03",
      "#593106"
    ],
    "platformColor": "#92400e",
    "platformBorder": "#fef08a",
    "ballGlow": "#d97706",
    "description": "A PROVA DA HISTÓRIA AOS 145.000m! Supere a fusão dos maiores guerreiros que o mundo já viu!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "conveyor",
      "springs"
    ],
    "mechanic": "BATALHA DE CHEFÃO: O titã empunha as armas de 7 impérios! Ative os selos de cada era!",
    "isBossStage": true,
    "bossName": "Colosso das Sete Civilizações",
    "bossTitle": "O Titã dos Séculos",
    "bossHP": 29,
    "bossColor": "#d97706",
    "bossGlow": "#fbbf24",
    "rewardGems": 2900,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 146,
    "number": 146,
    "title": "Limiar do Vácuo Absoluto",
    "theme": "futuristic",
    "icon": "Sparkles",
    "targetHeight": 146000,
    "gravity": 0.3,
    "jumpForce": -14.9,
    "speedFactor": 3.55,
    "wind": 0,
    "bgGradient": [
      "#241502",
      "#472a04",
      "#734307"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "Você cruzou a fronteira do conhecido: o espaço agora é ouro líquido e silêncio absoluto.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Plataformas de matéria pura cristalizada com impulsos celestiais perfeitos."
  },
  {
    "id": 147,
    "number": 147,
    "title": "Espiral das Constelações Vivas",
    "theme": "futuristic",
    "icon": "Orbit",
    "targetHeight": 147000,
    "gravity": 0.32,
    "jumpForce": -14.9,
    "speedFactor": 3.56,
    "wind": 0,
    "bgGradient": [
      "#291804",
      "#4f2f08",
      "#7d4a0d"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef08a",
    "ballGlow": "#fbbf24",
    "description": "Cada plataforma é uma supernova em gestação sustentando seu avanço final.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Estrelas vivas em órbita rápida que se fundem e se separam sob seus pés."
  },
  {
    "id": 148,
    "number": 148,
    "title": "Fronteira Dimensional do Hiperespaço",
    "theme": "futuristic",
    "icon": "Infinity",
    "targetHeight": 148000,
    "gravity": 0.34,
    "jumpForce": -14.9,
    "speedFactor": 3.57,
    "wind": -0.3,
    "bgGradient": [
      "#301c05",
      "#5c360a",
      "#8c5310"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f59e0b",
    "description": "O universo está colapsando em pura beleza luminescente aos 148.000m de altitude.",
    "hazards": [
      "conveyor",
      "wind",
      "spikes"
    ],
    "mechanic": "Esteiras de dobra temporal com ventos dimensionais e cristais de matéria escura."
  },
  {
    "id": 149,
    "number": 149,
    "title": "O Corredor da Eternidade Cósmica",
    "theme": "futuristic",
    "icon": "Crown",
    "targetHeight": 149000,
    "gravity": 0.36,
    "jumpForce": -15,
    "speedFactor": 3.59,
    "wind": 0,
    "bgGradient": [
      "#382006",
      "#6b3e0c",
      "#a35f12"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "🏃‍♂️ PERCURSO HORIZONTAL! Corra pelo tapete dourado das galáxias rumo ao confronto derradeiro!",
    "hazards": [
      "moving",
      "conveyor",
      "fragile",
      "springs"
    ],
    "mechanic": "PERCURSO HORIZONTAL SUPREMO! O teste horizontal final antes do trono dos deuses!",
    "layout": "horizontal",
    "targetDistance": 5800
  },
  {
    "id": 150,
    "number": 150,
    "title": "👑 CHEFÃO 30: O Demiurgo Eterno do Cosmos",
    "theme": "futuristic",
    "icon": "Crown",
    "targetHeight": 150000,
    "gravity": 0.26,
    "jumpForce": -15,
    "speedFactor": 3.6,
    "wind": 0,
    "bgGradient": [
      "#1a0f02",
      "#361f04",
      "#543106"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbbf24",
    "description": "O CLÍMAX ABSOLUTO AOS 150.000m! Conquiste o trono eterno e torne-se a Lenda Imortal do JumpBall!",
    "hazards": [
      "moving",
      "fragile",
      "spikes",
      "conveyor",
      "springs"
    ],
    "mechanic": "O CONFRONTO SUPREMO: Inversão total de gravidade, feixes cósmicos e Ataque do Multiverso!",
    "isBossStage": true,
    "bossName": "O Demiurgo Eterno do Cosmos",
    "bossTitle": "O Criador e Destruidor de Universos",
    "bossHP": 30,
    "bossColor": "#fbbf24",
    "bossGlow": "#ffffff",
    "rewardGems": 5000,
    "hasParallelUniverseAttack": true
  }
];
