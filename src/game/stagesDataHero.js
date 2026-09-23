/**
 * JUMPBALL - MODO HERÓI: 30 MUNDOS E 150 FASES (Fases 1 a 150)
 * Inclui os 10 Mundos Clássicos intactos (Fases 1 a 50) + 20 Novos Mundos Inéditos (Fases 51 a 150)
 * com 30 Batalhas de Chefão culminando no Demiurgo Supremo aos 150.000m!
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
    "bossTitle": "O Titã de Aço a Vapor"
  },
  {
    "id": 26,
    "name": "Mundo 26: Parque Acrobático da Gravidade Zero",
    "shortName": "Parkour Gravidade 0",
    "theme": "sports",
    "icon": "Trophy",
    "gradient": "from-sky-950/80 to-blue-900/60",
    "border": "border-sky-400/40",
    "accentColor": "#0ea5e9",
    "description": "Arenas verticais com campos antigravitacionais alternados e acrobacias extremas.",
    "stageRange": [
      126,
      130
    ],
    "bossStageNumber": 130,
    "bossName": "Campeão da Gravidade Zero",
    "bossTitle": "O Ás Invicto do Parkour"
  },
  {
    "id": 27,
    "name": "Mundo 27: Confeitaria Proibida dos Deuses",
    "shortName": "Doce do Apocalipse",
    "theme": "candy",
    "icon": "Cookie",
    "gradient": "from-pink-950/80 to-purple-950/70",
    "border": "border-pink-400/40",
    "accentColor": "#ec4899",
    "description": "Muralhas de açúcar cristal super-resistente, caldas ferventes e doces explosivos.",
    "stageRange": [
      131,
      135
    ],
    "bossStageNumber": 135,
    "bossName": "Gólem de Caramelo Ardente",
    "bossTitle": "A Força Açucarada Imparável"
  },
  {
    "id": 28,
    "name": "Mundo 28: Sinapses Neurais & Vigor Biológico",
    "shortName": "Mente Quântica",
    "theme": "health",
    "icon": "Activity",
    "gradient": "from-rose-950/70 to-indigo-950/80",
    "border": "border-rose-400/40",
    "accentColor": "#f43f5e",
    "description": "A rede neural suprema do pensamento humano. Disparos elétricos de dopamina e adrenalina pura.",
    "stageRange": [
      136,
      140
    ],
    "bossStageNumber": 140,
    "bossName": "Sinapse Hiperativa Omega",
    "bossTitle": "O Impulso Cósmico da Mente"
  },
  {
    "id": 29,
    "name": "Mundo 29: Monumentos dos Cinco Continentes",
    "shortName": "Muralha das Eras",
    "theme": "continents",
    "icon": "Landmark",
    "gradient": "from-slate-900 to-amber-950/80",
    "border": "border-amber-400/50",
    "accentColor": "#f59e0b",
    "description": "Templos e fortalezas de todas as civilizações da Terra unidas em uma só escalada monumental.",
    "stageRange": [
      141,
      145
    ],
    "bossStageNumber": 145,
    "bossName": "Colosso das Sete Civilizações",
    "bossTitle": "O Guardião da História Humana"
  },
  {
    "id": 30,
    "name": "Mundo 30: O Demiurgo Supremo aos 150.000m",
    "shortName": "Zênite Infinito 150k",
    "theme": "cosmos",
    "icon": "Crown",
    "gradient": "from-black via-purple-950 to-amber-950",
    "border": "border-amber-400/60",
    "accentColor": "#fbbf24",
    "description": "A fronteira final absoluta da criação! O confronto lendário aos 150.000 metros de altitude!",
    "stageRange": [
      146,
      150
    ],
    "bossStageNumber": 150,
    "bossName": "O Demiurgo Eterno do Cosmos",
    "bossTitle": "A Divindade Suprema do JumpBall"
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
    "gravity": 0.27,
    "jumpForce": -13.2,
    "speedFactor": 2.31,
    "wind": 0,
    "bgGradient": [
      "#041527",
      "#082b4c",
      "#0f487a"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#67e8f9",
    "ballGlow": "#22d3ee",
    "description": "Desafio temático nos 51.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "conveyor",
      "lasers"
    ],
    "mechanic": "Esteiras de fibra óptica de alta frequência."
  },
  {
    "id": 52,
    "number": 52,
    "title": "Barramento de Dados Taquiônico",
    "theme": "quantum_core",
    "icon": "Zap",
    "targetHeight": 52000,
    "gravity": 0.28,
    "jumpForce": -13.2,
    "speedFactor": 2.32,
    "wind": 0,
    "bgGradient": [
      "#041e2b",
      "#073b52",
      "#0c5e82"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#7dd3fc",
    "ballGlow": "#38bdf8",
    "description": "Desafio temático nos 52.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "conveyor"
    ],
    "mechanic": "Saltos em pacotes de pulso de dados velozes."
  },
  {
    "id": 53,
    "number": 53,
    "title": "Matriz de Memória Quântica",
    "theme": "quantum_core",
    "icon": "Boxes",
    "targetHeight": 53000,
    "gravity": 0.29,
    "jumpForce": -13.2,
    "speedFactor": 2.33,
    "wind": 0,
    "bgGradient": [
      "#061a33",
      "#0d325e",
      "#134e8e"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#93c5fd",
    "ballGlow": "#60a5fa",
    "description": "Desafio temático nos 53.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Nós de memória que colapsam ao toque."
  },
  {
    "id": 54,
    "number": 54,
    "title": "Labirinto de Feixes Laser",
    "theme": "quantum_core",
    "icon": "Crosshair",
    "targetHeight": 54000,
    "gravity": 0.3,
    "jumpForce": -13.2,
    "speedFactor": 2.34,
    "wind": 0,
    "bgGradient": [
      "#091b36",
      "#143463",
      "#1e5299"
    ],
    "platformColor": "#6366f1",
    "platformBorder": "#a5b4fc",
    "ballGlow": "#818cf8",
    "description": "Desafio temático nos 54.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "lasers",
      "moving",
      "springs"
    ],
    "mechanic": "Evasão ágil entre barreiras de lasers sincronizados."
  },
  {
    "id": 55,
    "number": 55,
    "title": "👑 CHEFÃO 11: Nexus Quântico 9000",
    "theme": "quantum_core",
    "icon": "Crown",
    "targetHeight": 55000,
    "gravity": 0.31,
    "jumpForce": -13.2,
    "speedFactor": 2.35,
    "wind": 0,
    "bgGradient": [
      "#020b18",
      "#0b2040",
      "#173f78"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#22d3ee",
    "description": "BATALHA DE CHEFÃO AOS 55.000m! Derrote Nexus Quântico 9000!",
    "hazards": [
      "lasers",
      "conveyor",
      "moving",
      "fragile"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Destrua os núcleos de processamento do supercomputador!",
    "isBossStage": true,
    "bossName": "Nexus Quântico 9000",
    "bossTitle": "IA Central da Rede Quântica",
    "bossHP": 11,
    "bossColor": "#06b6d4",
    "bossGlow": "#22d3ee",
    "rewardGems": 1100,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 56,
    "number": 56,
    "title": "Entrada do Desfiladeiro Seco",
    "theme": "wild_west",
    "icon": "Sun",
    "targetHeight": 56000,
    "gravity": 0.32,
    "jumpForce": -13.2,
    "speedFactor": 2.36,
    "wind": 0.25,
    "bgGradient": [
      "#281204",
      "#4a2408",
      "#733a10"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "Desafio temático nos 56.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "wind"
    ],
    "mechanic": "Rajadas de vento árido desviam a subida entre rochas de arenito."
  },
  {
    "id": 57,
    "number": 57,
    "title": "Saloon Abandonado de Madeira",
    "theme": "wild_west",
    "icon": "Axe",
    "targetHeight": 57000,
    "gravity": 0.33,
    "jumpForce": -13.3,
    "speedFactor": 2.37,
    "wind": 0,
    "bgGradient": [
      "#26150b",
      "#482a17",
      "#6f4225"
    ],
    "platformColor": "#b45309",
    "platformBorder": "#fcd34d",
    "ballGlow": "#d97706",
    "description": "Desafio temático nos 57.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Vigas antigas que rangem e desmoronam."
  },
  {
    "id": 58,
    "number": 58,
    "title": "Mina de Ouro Assombrada",
    "theme": "wild_west",
    "icon": "Pickaxe",
    "targetHeight": 58000,
    "gravity": 0.34,
    "jumpForce": -13.3,
    "speedFactor": 2.38,
    "wind": 0,
    "bgGradient": [
      "#1f140d",
      "#3d291b",
      "#61422c"
    ],
    "platformColor": "#92400e",
    "platformBorder": "#fde68a",
    "ballGlow": "#b45309",
    "description": "Desafio temático nos 58.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "spikes",
      "fragile"
    ],
    "mechanic": "Vagonetes velozes e estalactites rochosas pontiagudas."
  },
  {
    "id": 59,
    "number": 59,
    "title": "Ponte Pênsil da Ravina",
    "theme": "wild_west",
    "icon": "Wind",
    "targetHeight": 59000,
    "gravity": 0.35,
    "jumpForce": -13.3,
    "speedFactor": 2.39,
    "wind": -0.25,
    "bgGradient": [
      "#2a140a",
      "#542614",
      "#823c1f"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fdba74",
    "ballGlow": "#f97316",
    "description": "Desafio temático nos 59.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "wind",
      "moving",
      "fragile"
    ],
    "mechanic": "Ventos uivantes e pranchas instáveis sobre o abismo."
  },
  {
    "id": 60,
    "number": 60,
    "title": "👑 CHEFÃO 12: Pistoleiro Espectral",
    "theme": "wild_west",
    "icon": "Crown",
    "targetHeight": 60000,
    "gravity": 0.26,
    "jumpForce": -13.3,
    "speedFactor": 2.4,
    "wind": 0,
    "bgGradient": [
      "#1a0a04",
      "#3d160a",
      "#692612"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef08a",
    "ballGlow": "#fbbf24",
    "description": "BATALHA DE CHEFÃO AOS 60.000m! Derrote Pistoleiro Espectral!",
    "hazards": [
      "moving",
      "fragile",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Desvie dos tiros fantasmagóricos e ative os barris de pólvora!",
    "isBossStage": true,
    "bossName": "Pistoleiro Espectral",
    "bossTitle": "O Vingador do Cânion",
    "bossHP": 12,
    "bossColor": "#d97706",
    "bossGlow": "#f59e0b",
    "rewardGems": 1200,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 61,
    "number": 61,
    "title": "Selva Primordial dos Sauropodes",
    "theme": "dinosaur",
    "icon": "Footprints",
    "targetHeight": 61000,
    "gravity": 0.27,
    "jumpForce": -13.3,
    "speedFactor": 2.41,
    "wind": 0,
    "bgGradient": [
      "#072010",
      "#103d21",
      "#196135"
    ],
    "platformColor": "#84cc16",
    "platformBorder": "#d9f99d",
    "ballGlow": "#a3e635",
    "description": "Desafio temático nos 61.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Troncos colossais e folhas gigantes que amortecem saltos."
  },
  {
    "id": 62,
    "number": 62,
    "title": "Pântano dos Fósseis Vivos",
    "theme": "dinosaur",
    "icon": "Waves",
    "targetHeight": 62000,
    "gravity": 0.28,
    "jumpForce": -13.3,
    "speedFactor": 2.42,
    "wind": 0,
    "bgGradient": [
      "#0c2415",
      "#164227",
      "#22693f"
    ],
    "platformColor": "#65a30d",
    "platformBorder": "#bef264",
    "ballGlow": "#84cc16",
    "description": "Desafio temático nos 62.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "fragile",
      "springs"
    ],
    "mechanic": "Ossadas pré-históricas com molas de seiva antiga."
  },
  {
    "id": 63,
    "number": 63,
    "title": "Ninho dos Velocirraptores",
    "theme": "dinosaur",
    "icon": "Zap",
    "targetHeight": 63000,
    "gravity": 0.29,
    "jumpForce": -13.3,
    "speedFactor": 2.43,
    "wind": 0,
    "bgGradient": [
      "#122912",
      "#234a23",
      "#377337"
    ],
    "platformColor": "#4d7c0f",
    "platformBorder": "#a3e635",
    "ballGlow": "#65a30d",
    "description": "Desafio temático nos 63.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Plataformas rápidas sob a vigilância de predadores jurássicos."
  },
  {
    "id": 64,
    "number": 64,
    "title": "Garganta dos Pterossauros",
    "theme": "dinosaur",
    "icon": "Wind",
    "targetHeight": 64000,
    "gravity": 0.3,
    "jumpForce": -13.4,
    "speedFactor": 2.44,
    "wind": 0.25,
    "bgGradient": [
      "#10281b",
      "#1e4b33",
      "#2d734e"
    ],
    "platformColor": "#10b981",
    "platformBorder": "#a7f3d0",
    "ballGlow": "#34d399",
    "description": "Desafio temático nos 64.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "wind",
      "moving",
      "springs"
    ],
    "mechanic": "Correntes termais ascendentes na subida aos picos rochosos."
  },
  {
    "id": 65,
    "number": 65,
    "title": "👑 CHEFÃO 13: T-Rex Titânico Apex",
    "theme": "dinosaur",
    "icon": "Crown",
    "targetHeight": 65000,
    "gravity": 0.31,
    "jumpForce": -13.4,
    "speedFactor": 2.45,
    "wind": 0,
    "bgGradient": [
      "#08170c",
      "#14331c",
      "#235730"
    ],
    "platformColor": "#84cc16",
    "platformBorder": "#ecfccb",
    "ballGlow": "#a3e635",
    "description": "BATALHA DE CHEFÃO AOS 65.000m! Derrote T-Rex Titânico Apex!",
    "hazards": [
      "moving",
      "fragile",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Fuja das mordidas sísmicas e detone as armadilhas de rocha!",
    "isBossStage": true,
    "bossName": "T-Rex Titânico Apex",
    "bossTitle": "O Predador Supremo",
    "bossHP": 13,
    "bossColor": "#65a30d",
    "bossGlow": "#84cc16",
    "rewardGems": 1300,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 66,
    "number": 66,
    "title": "Ágora de Atenas em Mármore",
    "theme": "olympus",
    "icon": "Landmark",
    "targetHeight": 66000,
    "gravity": 0.32,
    "jumpForce": -13.4,
    "speedFactor": 2.46,
    "wind": 0,
    "bgGradient": [
      "#1c170a",
      "#3b3117",
      "#615128"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fef08a",
    "ballGlow": "#facc15",
    "description": "Desafio temático nos 66.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "springs"
    ],
    "mechanic": "Mármore dourado reluzente e impulso dos deuses do Olimpo."
  },
  {
    "id": 67,
    "number": 67,
    "title": "Colunas Quebradas do Partenon",
    "theme": "olympus",
    "icon": "Boxes",
    "targetHeight": 67000,
    "gravity": 0.33,
    "jumpForce": -13.4,
    "speedFactor": 2.47,
    "wind": 0,
    "bgGradient": [
      "#1d1912",
      "#3d3427",
      "#635440"
    ],
    "platformColor": "#ca8a04",
    "platformBorder": "#fde047",
    "ballGlow": "#eab308",
    "description": "Desafio temático nos 67.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Capitéis coríntios soltos que balançam nas alturas."
  },
  {
    "id": 68,
    "number": 68,
    "title": "Labirinto Subterrâneo de Creta",
    "theme": "olympus",
    "icon": "Compass",
    "targetHeight": 68000,
    "gravity": 0.34,
    "jumpForce": -13.4,
    "speedFactor": 2.48,
    "wind": 0,
    "bgGradient": [
      "#1a151e",
      "#362c3e",
      "#594966"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#e9d5ff",
    "ballGlow": "#c084fc",
    "description": "Desafio temático nos 68.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "spikes",
      "conveyor"
    ],
    "mechanic": "Paredes estreitas e armadilhas ancestrais de espinhos."
  },
  {
    "id": 69,
    "number": 69,
    "title": "Portão Dourado do Monte Olimpo",
    "theme": "olympus",
    "icon": "Shield",
    "targetHeight": 69000,
    "gravity": 0.35,
    "jumpForce": -13.4,
    "speedFactor": 2.49,
    "wind": 0,
    "bgGradient": [
      "#211a0c",
      "#47371a",
      "#785d2d"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef08a",
    "ballGlow": "#fbbf24",
    "description": "Desafio temático nos 69.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "springs",
      "fragile"
    ],
    "mechanic": "Degraus divinos que conduzem aos aposentos dos titãs."
  },
  {
    "id": 70,
    "number": 70,
    "title": "👑 CHEFÃO 14: Minotauro de Bronze",
    "theme": "olympus",
    "icon": "Crown",
    "targetHeight": 70000,
    "gravity": 0.26,
    "jumpForce": -13.4,
    "speedFactor": 2.5,
    "wind": 0,
    "bgGradient": [
      "#181206",
      "#3b2b0f",
      "#664b1a"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fffbeb",
    "ballGlow": "#fbbf24",
    "description": "BATALHA DE CHEFÃO AOS 70.000m! Derrote Minotauro de Bronze!",
    "hazards": [
      "moving",
      "fragile",
      "spikes"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Desvie das investidas do Minotauro e faça-o colidir com as colunas!",
    "isBossStage": true,
    "bossName": "Minotauro de Bronze",
    "bossTitle": "Guardião do Labirinto Mítico",
    "bossHP": 14,
    "bossColor": "#b45309",
    "bossGlow": "#f59e0b",
    "rewardGems": 1400,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 71,
    "number": 71,
    "title": "Mega-Rampa do Skate Park Aéreo",
    "theme": "sports",
    "icon": "Medal",
    "targetHeight": 71000,
    "gravity": 0.27,
    "jumpForce": -13.4,
    "speedFactor": 2.51,
    "wind": 0,
    "bgGradient": [
      "#0c1b2e",
      "#15365c",
      "#205794"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#bfdbfe",
    "ballGlow": "#60a5fa",
    "description": "Desafio temático nos 71.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "conveyor",
      "springs"
    ],
    "mechanic": "Superfícies de uretano com impulsos acrobáticos extremos."
  },
  {
    "id": 72,
    "number": 72,
    "title": "Circuito da Ginástica Gravitacional",
    "theme": "sports",
    "icon": "Orbit",
    "targetHeight": 72000,
    "gravity": 0.28,
    "jumpForce": -13.5,
    "speedFactor": 2.52,
    "wind": 0,
    "bgGradient": [
      "#0f2238",
      "#1a436e",
      "#2769ad"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#22d3ee",
    "description": "Desafio temático nos 72.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Trampolins sincronizados de salto quádruplo."
  },
  {
    "id": 73,
    "number": 73,
    "title": "Pista de Bobsled Congelada",
    "theme": "sports",
    "icon": "Snowflake",
    "targetHeight": 73000,
    "gravity": 0.29,
    "jumpForce": -13.5,
    "speedFactor": 2.53,
    "wind": -0.25,
    "bgGradient": [
      "#082030",
      "#103e5c",
      "#1b6494"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#7dd3fc",
    "description": "Desafio temático nos 73.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "ice_slick",
      "wind",
      "moving"
    ],
    "mechanic": "Curvas de baixíssimo atrito e arrancadas velozes."
  },
  {
    "id": 74,
    "number": 74,
    "title": "Velódromo das Alturas",
    "theme": "sports",
    "icon": "Zap",
    "targetHeight": 74000,
    "gravity": 0.3,
    "jumpForce": -13.5,
    "speedFactor": 2.54,
    "wind": 0,
    "bgGradient": [
      "#0b233a",
      "#164573",
      "#236eb8"
    ],
    "platformColor": "#2563eb",
    "platformBorder": "#93c5fd",
    "ballGlow": "#3b82f6",
    "description": "Desafio temático nos 74.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "conveyor",
      "moving",
      "fragile"
    ],
    "mechanic": "Esteiras ovais de inclinação extrema e altíssima rotação."
  },
  {
    "id": 75,
    "number": 75,
    "title": "👑 CHEFÃO 15: Gladiador Campeão Titã",
    "theme": "sports",
    "icon": "Crown",
    "targetHeight": 75000,
    "gravity": 0.31,
    "jumpForce": -13.5,
    "speedFactor": 2.55,
    "wind": 0,
    "bgGradient": [
      "#061626",
      "#0f3154",
      "#1a4e85"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#dbeafe",
    "ballGlow": "#60a5fa",
    "description": "BATALHA DE CHEFÃO AOS 75.000m! Derrote Gladiador Campeão Titã!",
    "hazards": [
      "conveyor",
      "moving",
      "springs"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Supere os reflexos do campeão olímpico nas plataformas de duelo!",
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
    "gravity": 0.32,
    "jumpForce": -13.5,
    "speedFactor": 2.56,
    "wind": 0,
    "bgGradient": [
      "#280d07",
      "#521a0f",
      "#852a18"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fdba74",
    "ballGlow": "#f97316",
    "description": "Desafio temático nos 76.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "fragile",
      "moving"
    ],
    "mechanic": "Superfícies de ferro fundido com labaredas periódicas de vapor."
  },
  {
    "id": 77,
    "number": 77,
    "title": "Caldeirão dos Caldos Efervescentes",
    "theme": "gastronomy",
    "icon": "Flame",
    "targetHeight": 77000,
    "gravity": 0.33,
    "jumpForce": -13.5,
    "speedFactor": 2.57,
    "wind": 0,
    "bgGradient": [
      "#2a1005",
      "#57220b",
      "#8a3712"
    ],
    "platformColor": "#f97316",
    "platformBorder": "#fed7aa",
    "ballGlow": "#fb923c",
    "description": "Desafio temático nos 77.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Bolhas de vapor aromático que funcionam como catapultas verticais."
  },
  {
    "id": 78,
    "number": 78,
    "title": "Esteira Industrial de Especiarias",
    "theme": "gastronomy",
    "icon": "Boxes",
    "targetHeight": 78000,
    "gravity": 0.34,
    "jumpForce": -13.5,
    "speedFactor": 2.58,
    "wind": 0,
    "bgGradient": [
      "#2b1308",
      "#542710",
      "#853d1a"
    ],
    "platformColor": "#d97706",
    "platformBorder": "#fde68a",
    "ballGlow": "#f59e0b",
    "description": "Desafio temático nos 78.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "conveyor",
      "fragile"
    ],
    "mechanic": "Esteiras rolantes de trituração com fluxo contínuo de canela e pimenta."
  },
  {
    "id": 79,
    "number": 79,
    "title": "Fornalha das Grelhas de Basalto",
    "theme": "gastronomy",
    "icon": "Flame",
    "targetHeight": 79000,
    "gravity": 0.35,
    "jumpForce": -13.6,
    "speedFactor": 2.59,
    "wind": 0,
    "bgGradient": [
      "#300b05",
      "#61170a",
      "#9c2610"
    ],
    "platformColor": "#ef4444",
    "platformBorder": "#fca5a5",
    "ballGlow": "#f87171",
    "description": "Desafio temático nos 79.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "spikes",
      "fragile"
    ],
    "mechanic": "Grelhas incandescentes que exigem pisadas rápidas e precisas."
  },
  {
    "id": 80,
    "number": 80,
    "title": "👑 CHEFÃO 16: Chef Magmático Vulcânico",
    "theme": "gastronomy",
    "icon": "Crown",
    "targetHeight": 80000,
    "gravity": 0.26,
    "jumpForce": -13.6,
    "speedFactor": 2.6,
    "wind": 0,
    "bgGradient": [
      "#220603",
      "#4a0d06",
      "#7d160b"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#ffedd5",
    "ballGlow": "#f97316",
    "description": "BATALHA DE CHEFÃO AOS 80.000m! Derrote Chef Magmático Vulcânico!",
    "hazards": [
      "conveyor",
      "moving",
      "fragile"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Apague as chamas do caldeirão gigante usando os interruptores de vapor!",
    "isBossStage": true,
    "bossName": "Chef Magmático Vulcânico",
    "bossTitle": "Mestre da Fornalha Flamejante",
    "bossHP": 16,
    "bossColor": "#dc2626",
    "bossGlow": "#f97316",
    "rewardGems": 1600,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 81,
    "number": 81,
    "title": "Hélice Dupla de DNA Primordial",
    "theme": "health",
    "icon": "Dna",
    "targetHeight": 81000,
    "gravity": 0.27,
    "jumpForce": -13.6,
    "speedFactor": 2.61,
    "wind": 0,
    "bgGradient": [
      "#05221d",
      "#0b473d",
      "#137363"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#99f6e4",
    "ballGlow": "#2dd4bf",
    "description": "Desafio temático nos 81.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Bases nitrogenadas giratórias formando uma escada helicoidal contínua."
  },
  {
    "id": 82,
    "number": 82,
    "title": "Corrente dos Anticorpos Velozes",
    "theme": "health",
    "icon": "Shield",
    "targetHeight": 82000,
    "gravity": 0.28,
    "jumpForce": -13.6,
    "speedFactor": 2.62,
    "wind": 0,
    "bgGradient": [
      "#08261e",
      "#104d3d",
      "#1a7860"
    ],
    "platformColor": "#0d9488",
    "platformBorder": "#5eead4",
    "ballGlow": "#14b8a6",
    "description": "Desafio temático nos 82.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "fragile"
    ],
    "mechanic": "Células imunológicas circulam velozmente entre os caminhos linfáticos."
  },
  {
    "id": 83,
    "number": 83,
    "title": "Ventrículo dos Pulsos Cardíacos",
    "theme": "health",
    "icon": "Heart",
    "targetHeight": 83000,
    "gravity": 0.29,
    "jumpForce": -13.6,
    "speedFactor": 2.63,
    "wind": 0,
    "bgGradient": [
      "#240914",
      "#4d142c",
      "#7d2047"
    ],
    "platformColor": "#f43f5e",
    "platformBorder": "#fecdd3",
    "ballGlow": "#fb7185",
    "description": "Desafio temático nos 83.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "springs",
      "moving"
    ],
    "mechanic": "Batimentos cardíacos em ritmo regular projetam impulsos gigantescos."
  },
  {
    "id": 84,
    "number": 84,
    "title": "Sinapse das Fibras Nervosas",
    "theme": "health",
    "icon": "Zap",
    "targetHeight": 84000,
    "gravity": 0.3,
    "jumpForce": -13.6,
    "speedFactor": 2.64,
    "wind": 0,
    "bgGradient": [
      "#0a2228",
      "#144652",
      "#216e80"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#a5f3fc",
    "ballGlow": "#22d3ee",
    "description": "Desafio temático nos 84.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "lasers",
      "moving",
      "springs"
    ],
    "mechanic": "Disparos elétricos de neurotransmissores acelerando a transmissão."
  },
  {
    "id": 85,
    "number": 85,
    "title": "👑 CHEFÃO 17: Patógeno Quântico Alfa",
    "theme": "health",
    "icon": "Crown",
    "targetHeight": 85000,
    "gravity": 0.31,
    "jumpForce": -13.6,
    "speedFactor": 2.65,
    "wind": 0,
    "bgGradient": [
      "#031713",
      "#0a332b",
      "#135c4e"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ccfbf1",
    "ballGlow": "#2dd4bf",
    "description": "BATALHA DE CHEFÃO AOS 85.000m! Derrote Patógeno Quântico Alfa!",
    "hazards": [
      "lasers",
      "moving",
      "fragile"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Neutralize o vírus mutante ativando os anticorpos nos polos de cura!",
    "isBossStage": true,
    "bossName": "Patógeno Quântico Alfa",
    "bossTitle": "Mutação Viral Hipercinética",
    "bossHP": 17,
    "bossColor": "#0d9488",
    "bossGlow": "#14b8a6",
    "rewardGems": 1700,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 86,
    "number": 86,
    "title": "Camada de Ozônio Iônica",
    "theme": "sky_realm",
    "icon": "Cloud",
    "targetHeight": 86000,
    "gravity": 0.32,
    "jumpForce": -13.6,
    "speedFactor": 2.66,
    "wind": 0.25,
    "bgGradient": [
      "#0e1d3d",
      "#1a356e",
      "#2851a6"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#e0f2fe",
    "ballGlow": "#7dd3fc",
    "description": "Desafio temático nos 86.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "wind"
    ],
    "mechanic": "Ar ultra-rarefeito com gravidade reduzida e ventos cortantes de alta altitude."
  },
  {
    "id": 87,
    "number": 87,
    "title": "Cortina da Aurora Boreal Polar",
    "theme": "sky_realm",
    "icon": "Sparkles",
    "targetHeight": 87000,
    "gravity": 0.33,
    "jumpForce": -13.7,
    "speedFactor": 2.67,
    "wind": 0,
    "bgGradient": [
      "#062326",
      "#0c474d",
      "#14737d"
    ],
    "platformColor": "#2dd4bf",
    "platformBorder": "#ccfbf1",
    "ballGlow": "#5eead4",
    "description": "Desafio temático nos 87.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Feixes de plasma magnético verde-esmeralda que ondulam suavemente."
  },
  {
    "id": 88,
    "number": 88,
    "title": "Nuvem Cumulonimbus de Granizo",
    "theme": "sky_realm",
    "icon": "Snowflake",
    "targetHeight": 88000,
    "gravity": 0.34,
    "jumpForce": -13.7,
    "speedFactor": 2.68,
    "wind": 0.25,
    "bgGradient": [
      "#0f1c30",
      "#1c3357",
      "#2b4d82"
    ],
    "platformColor": "#60a5fa",
    "platformBorder": "#dbeafe",
    "ballGlow": "#93c5fd",
    "description": "Desafio temático nos 88.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "ice_slick",
      "fragile",
      "wind"
    ],
    "mechanic": "Pedras de gelo flutuantes e descargas elétricas estáticas."
  },
  {
    "id": 89,
    "number": 89,
    "title": "Turbulência do Vórtice Polar",
    "theme": "sky_realm",
    "icon": "Wind",
    "targetHeight": 89000,
    "gravity": 0.35,
    "jumpForce": -13.7,
    "speedFactor": 2.69,
    "wind": -0.25,
    "bgGradient": [
      "#121d36",
      "#223661",
      "#345294"
    ],
    "platformColor": "#818cf8",
    "platformBorder": "#e0e7ff",
    "ballGlow": "#a5b4fc",
    "description": "Desafio temático nos 89.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "wind",
      "moving",
      "fragile"
    ],
    "mechanic": "Rajadas giratórias de vento cruzado testando o equilíbrio fino."
  },
  {
    "id": 90,
    "number": 90,
    "title": "👑 CHEFÃO 18: Fênix das Tempestades",
    "theme": "sky_realm",
    "icon": "Crown",
    "targetHeight": 90000,
    "gravity": 0.26,
    "jumpForce": -13.7,
    "speedFactor": 2.7,
    "wind": 0.25,
    "bgGradient": [
      "#081226",
      "#10254c",
      "#1b3d7a"
    ],
    "platformColor": "#38bdf8",
    "platformBorder": "#f0f9ff",
    "ballGlow": "#7dd3fc",
    "description": "BATALHA DE CHEFÃO AOS 90.000m! Derrote Fênix das Tempestades!",
    "hazards": [
      "wind",
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Voe entre as rajadas polares da Fênix e descarregue os raios nas penas solares!",
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
    "title": "Grande Muralha das Cordilheiras",
    "theme": "continents",
    "icon": "Globe",
    "targetHeight": 91000,
    "gravity": 0.27,
    "jumpForce": -13.7,
    "speedFactor": 2.71,
    "wind": 0,
    "bgGradient": [
      "#191e12",
      "#333d24",
      "#52613b"
    ],
    "platformColor": "#84cc16",
    "platformBorder": "#ecfccb",
    "ballGlow": "#a3e635",
    "description": "Desafio temático nos 91.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving"
    ],
    "mechanic": "Fortalezas de pedra milenar se estendendo sobre serras infinitas."
  },
  {
    "id": 92,
    "number": 92,
    "title": "Pirâmides Esculpidas dos Andes",
    "theme": "continents",
    "icon": "Landmark",
    "targetHeight": 92000,
    "gravity": 0.28,
    "jumpForce": -13.7,
    "speedFactor": 2.72,
    "wind": 0,
    "bgGradient": [
      "#1f180e",
      "#3d301c",
      "#634f2e"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#fef08a",
    "ballGlow": "#facc15",
    "description": "Desafio temático nos 92.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "fragile",
      "springs"
    ],
    "mechanic": "Plataformas de cantaria monolítica suspensas a 4.000m nas montanhas."
  },
  {
    "id": 93,
    "number": 93,
    "title": "Cânions Vermelhos da Austrália",
    "theme": "continents",
    "icon": "Sun",
    "targetHeight": 93000,
    "gravity": 0.29,
    "jumpForce": -13.7,
    "speedFactor": 2.73,
    "wind": -0.25,
    "bgGradient": [
      "#261208",
      "#4d2511",
      "#7b3c1c"
    ],
    "platformColor": "#ea580c",
    "platformBorder": "#fed7aa",
    "ballGlow": "#f97316",
    "description": "Desafio temático nos 93.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "wind",
      "moving"
    ],
    "mechanic": "Monólitos sagrados de argila vermelha sob calor solar constante."
  },
  {
    "id": 94,
    "number": 94,
    "title": "Fiordes Glaciais da Escandinávia",
    "theme": "continents",
    "icon": "Anchor",
    "targetHeight": 94000,
    "gravity": 0.3,
    "jumpForce": -13.8,
    "speedFactor": 2.74,
    "wind": 0,
    "bgGradient": [
      "#081d29",
      "#113b52",
      "#1b5e82"
    ],
    "platformColor": "#06b6d4",
    "platformBorder": "#cffafe",
    "ballGlow": "#22d3ee",
    "description": "Desafio temático nos 94.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "ice_slick",
      "moving",
      "fragile"
    ],
    "mechanic": "Paredões de rocha negra banhados por águas cristalinas profundas."
  },
  {
    "id": 95,
    "number": 95,
    "title": "👑 CHEFÃO 19: Esfinge Imperial Global",
    "theme": "continents",
    "icon": "Crown",
    "targetHeight": 95000,
    "gravity": 0.31,
    "jumpForce": -13.8,
    "speedFactor": 2.75,
    "wind": 0,
    "bgGradient": [
      "#141108",
      "#2e2714",
      "#4d4121"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#fef3c7",
    "ballGlow": "#fbbf24",
    "description": "BATALHA DE CHEFÃO AOS 95.000m! Derrote Esfinge Imperial Global!",
    "hazards": [
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "BATALHA DE CHEFÃO: Resolva os enigmas rúnicos dos cinco continentes para destrancar o zênite!",
    "isBossStage": true,
    "bossName": "Esfinge Imperial Global",
    "bossTitle": "Guardião dos Sete Continentes",
    "bossHP": 19,
    "bossColor": "#d97706",
    "bossGlow": "#f59e0b",
    "rewardGems": 1900,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 96,
    "number": 96,
    "title": "Horizonte de Eventos Quântico",
    "theme": "futuristic",
    "icon": "Rocket",
    "targetHeight": 96000,
    "gravity": 0.32,
    "jumpForce": -13.8,
    "speedFactor": 2.76,
    "wind": 0,
    "bgGradient": [
      "#120826",
      "#26114d",
      "#3e1c7d"
    ],
    "platformColor": "#a855f7",
    "platformBorder": "#f3e8ff",
    "ballGlow": "#c084fc",
    "description": "Desafio temático nos 96.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "conveyor",
      "moving"
    ],
    "mechanic": "Distorção da gravidade ao se aproximar dos 100.000 metros de altitude."
  },
  {
    "id": 97,
    "number": 97,
    "title": "Fenda do Hiperespaço 100k",
    "theme": "futuristic",
    "icon": "Orbit",
    "targetHeight": 97000,
    "gravity": 0.33,
    "jumpForce": -13.8,
    "speedFactor": 2.77,
    "wind": 0,
    "bgGradient": [
      "#150629",
      "#2c0d54",
      "#491787"
    ],
    "platformColor": "#d946ef",
    "platformBorder": "#fae8ff",
    "ballGlow": "#e879f9",
    "description": "Desafio temático nos 97.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "fragile",
      "springs"
    ],
    "mechanic": "Plataformas de energia taquiônica que piscam no espaço-tempo."
  },
  {
    "id": 98,
    "number": 98,
    "title": "Rede Neural das Constelações",
    "theme": "futuristic",
    "icon": "Cpu",
    "targetHeight": 98000,
    "gravity": 0.34,
    "jumpForce": -13.8,
    "speedFactor": 2.78,
    "wind": 0,
    "bgGradient": [
      "#070f29",
      "#102054",
      "#1a3385"
    ],
    "platformColor": "#3b82f6",
    "platformBorder": "#dbeafe",
    "ballGlow": "#60a5fa",
    "description": "Desafio temático nos 98.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "conveyor",
      "lasers",
      "moving"
    ],
    "mechanic": "Linhas cósmicas condutoras de poder primordial entre galáxias."
  },
  {
    "id": 99,
    "number": 99,
    "title": "Vórtice Cronológico Pré-Zênite",
    "theme": "futuristic",
    "icon": "Infinity",
    "targetHeight": 99000,
    "gravity": 0.35,
    "jumpForce": -13.8,
    "speedFactor": 2.79,
    "wind": 0,
    "bgGradient": [
      "#160824",
      "#2e124a",
      "#4c1e7a"
    ],
    "platformColor": "#c084fc",
    "platformBorder": "#f5d0fe",
    "ballGlow": "#d8b4fe",
    "description": "Desafio temático nos 99.000m de altitude! Domine as plataformas com reflexos aguçados.",
    "hazards": [
      "moving",
      "fragile",
      "lasers",
      "springs"
    ],
    "mechanic": "A penúltima fronteira dos 100.000m com múltiplas armadilhas em aceleração."
  },
  {
    "id": 100,
    "number": 100,
    "title": "👑 CHEFÃO 20: Chronos, O Senhor das Eras",
    "theme": "futuristic",
    "icon": "Crown",
    "targetHeight": 100000,
    "gravity": 0.26,
    "jumpForce": -13.8,
    "speedFactor": 2.8,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#18072b",
      "#3b0d66"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#fef08a",
    "ballGlow": "#f59e0b",
    "description": "BATALHA DE CHEFÃO AOS 100.000m! Derrote Chronos, O Senhor das Eras!",
    "hazards": [
      "moving",
      "springs",
      "fragile",
      "conveyor",
      "lasers"
    ],
    "mechanic": "BATALHA DE CHEFÃO LENDÁRIA AOS 100.000m: 20 HP e dobra de tempo! Ataque temporal supremo!",
    "isBossStage": true,
    "bossName": "Chronos, O Senhor das Eras",
    "bossTitle": "Imperador do Vácuo Infinito",
    "bossHP": 20,
    "bossColor": "#eab308",
    "bossGlow": "#fbbf24",
    "rewardGems": 3000,
    "hasParallelUniverseAttack": true
  },
  {
    "id": 101,
    "number": 101,
    "title": "Abismo Mariana: Nível 1",
    "theme": "ocean",
    "icon": "Sparkles",
    "targetHeight": 101000,
    "gravity": 0.32,
    "jumpForce": -14.2,
    "speedFactor": 3.14,
    "wind": 0,
    "bgGradient": [
      "#010f1e",
      "#03203c",
      "#06396b"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#ffffff",
    "ballGlow": "#38bdf8",
    "description": "Escalada extrema na estratosfera aos 101.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 102,
    "number": 102,
    "title": "Abismo Mariana: Nível 2",
    "theme": "ocean",
    "icon": "Sparkles",
    "targetHeight": 102000,
    "gravity": 0.33,
    "jumpForce": -14.2,
    "speedFactor": 3.15,
    "wind": 0,
    "bgGradient": [
      "#010f1e",
      "#03203c",
      "#06396b"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#ffffff",
    "ballGlow": "#38bdf8",
    "description": "Escalada extrema na estratosfera aos 102.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 103,
    "number": 103,
    "title": "Abismo Mariana: Nível 3",
    "theme": "ocean",
    "icon": "Sparkles",
    "targetHeight": 103000,
    "gravity": 0.34,
    "jumpForce": -14.2,
    "speedFactor": 3.16,
    "wind": 0,
    "bgGradient": [
      "#010f1e",
      "#03203c",
      "#06396b"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#ffffff",
    "ballGlow": "#38bdf8",
    "description": "Escalada extrema na estratosfera aos 103.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 104,
    "number": 104,
    "title": "Abismo Mariana: Nível 4",
    "theme": "ocean",
    "icon": "Sparkles",
    "targetHeight": 104000,
    "gravity": 0.24,
    "jumpForce": -14.2,
    "speedFactor": 3.17,
    "wind": 0,
    "bgGradient": [
      "#010f1e",
      "#03203c",
      "#06396b"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#ffffff",
    "ballGlow": "#38bdf8",
    "description": "Escalada extrema na estratosfera aos 104.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 105,
    "number": 105,
    "title": "👑 CHEFÃO 21: Kraken Abissal de Neon",
    "theme": "ocean",
    "icon": "Crown",
    "targetHeight": 105000,
    "gravity": 0.26,
    "jumpForce": -14.3,
    "speedFactor": 3.18,
    "wind": 0,
    "bgGradient": [
      "#010f1e",
      "#03203c",
      "#06396b"
    ],
    "platformColor": "#0284c7",
    "platformBorder": "#ffffff",
    "ballGlow": "#38bdf8",
    "description": "BATALHA DE CHEFÃO AOS 105.000m! Supere Kraken Abissal de Neon!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: Terror das Fossas Oceânicas. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Kraken Abissal de Neon",
    "bossTitle": "Terror das Fossas Oceânicas",
    "bossHP": 20,
    "bossColor": "#0284c7",
    "bossGlow": "#38bdf8",
    "rewardGems": 2000,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 106,
    "number": 106,
    "title": "Cristais de Fogo: Nível 1",
    "theme": "crystal",
    "icon": "Sparkles",
    "targetHeight": 106000,
    "gravity": 0.27,
    "jumpForce": -14.3,
    "speedFactor": 3.19,
    "wind": 0,
    "bgGradient": [
      "#1e1402",
      "#3d2905",
      "#6b480a"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "Escalada extrema na estratosfera aos 106.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 107,
    "number": 107,
    "title": "Cristais de Fogo: Nível 2",
    "theme": "crystal",
    "icon": "Sparkles",
    "targetHeight": 107000,
    "gravity": 0.28,
    "jumpForce": -14.3,
    "speedFactor": 3.2,
    "wind": 0,
    "bgGradient": [
      "#1e1402",
      "#3d2905",
      "#6b480a"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "Escalada extrema na estratosfera aos 107.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 108,
    "number": 108,
    "title": "Cristais de Fogo: Nível 3",
    "theme": "crystal",
    "icon": "Sparkles",
    "targetHeight": 108000,
    "gravity": 0.3,
    "jumpForce": -14.3,
    "speedFactor": 3.21,
    "wind": 0,
    "bgGradient": [
      "#1e1402",
      "#3d2905",
      "#6b480a"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "Escalada extrema na estratosfera aos 108.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 109,
    "number": 109,
    "title": "Cristais de Fogo: Nível 4",
    "theme": "crystal",
    "icon": "Sparkles",
    "targetHeight": 109000,
    "gravity": 0.32,
    "jumpForce": -14.3,
    "speedFactor": 3.22,
    "wind": 0,
    "bgGradient": [
      "#1e1402",
      "#3d2905",
      "#6b480a"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "Escalada extrema na estratosfera aos 109.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 110,
    "number": 110,
    "title": "👑 CHEFÃO 22: Escorpião de Cristal Solar",
    "theme": "crystal",
    "icon": "Crown",
    "targetHeight": 110000,
    "gravity": 0.33,
    "jumpForce": -14.3,
    "speedFactor": 3.23,
    "wind": 0,
    "bgGradient": [
      "#1e1402",
      "#3d2905",
      "#6b480a"
    ],
    "platformColor": "#eab308",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde047",
    "description": "BATALHA DE CHEFÃO AOS 110.000m! Supere Escorpião de Cristal Solar!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: Ferrão Primordial de Quartzo. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Escorpião de Cristal Solar",
    "bossTitle": "Ferrão Primordial de Quartzo",
    "bossHP": 21,
    "bossColor": "#eab308",
    "bossGlow": "#fde047",
    "rewardGems": 2200,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 111,
    "number": 111,
    "title": "Acelerador Hádrons: Nível 1",
    "theme": "quantum",
    "icon": "Sparkles",
    "targetHeight": 111000,
    "gravity": 0.34,
    "jumpForce": -14.3,
    "speedFactor": 3.24,
    "wind": 0,
    "bgGradient": [
      "#120c24",
      "#26194d",
      "#422c82"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#ffffff",
    "ballGlow": "#c4b5fd",
    "description": "Escalada extrema na estratosfera aos 111.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 112,
    "number": 112,
    "title": "Acelerador Hádrons: Nível 2",
    "theme": "quantum",
    "icon": "Sparkles",
    "targetHeight": 112000,
    "gravity": 0.24,
    "jumpForce": -14.3,
    "speedFactor": 3.25,
    "wind": 0,
    "bgGradient": [
      "#120c24",
      "#26194d",
      "#422c82"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#ffffff",
    "ballGlow": "#c4b5fd",
    "description": "Escalada extrema na estratosfera aos 112.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 113,
    "number": 113,
    "title": "Acelerador Hádrons: Nível 3",
    "theme": "quantum",
    "icon": "Sparkles",
    "targetHeight": 113000,
    "gravity": 0.26,
    "jumpForce": -14.4,
    "speedFactor": 3.25,
    "wind": 0,
    "bgGradient": [
      "#120c24",
      "#26194d",
      "#422c82"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#ffffff",
    "ballGlow": "#c4b5fd",
    "description": "Escalada extrema na estratosfera aos 113.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 114,
    "number": 114,
    "title": "Acelerador Hádrons: Nível 4",
    "theme": "quantum",
    "icon": "Sparkles",
    "targetHeight": 114000,
    "gravity": 0.27,
    "jumpForce": -14.4,
    "speedFactor": 3.26,
    "wind": 0,
    "bgGradient": [
      "#120c24",
      "#26194d",
      "#422c82"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#ffffff",
    "ballGlow": "#c4b5fd",
    "description": "Escalada extrema na estratosfera aos 114.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 115,
    "number": 115,
    "title": "👑 CHEFÃO 23: Bóson Descontrolado",
    "theme": "quantum",
    "icon": "Crown",
    "targetHeight": 115000,
    "gravity": 0.28,
    "jumpForce": -14.4,
    "speedFactor": 3.27,
    "wind": 0,
    "bgGradient": [
      "#120c24",
      "#26194d",
      "#422c82"
    ],
    "platformColor": "#8b5cf6",
    "platformBorder": "#ffffff",
    "ballGlow": "#c4b5fd",
    "description": "BATALHA DE CHEFÃO AOS 115.000m! Supere Bóson Descontrolado!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: A Partícula Devoradora. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Bóson Descontrolado",
    "bossTitle": "A Partícula Devoradora",
    "bossHP": 22,
    "bossColor": "#8b5cf6",
    "bossGlow": "#c4b5fd",
    "rewardGems": 2400,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 116,
    "number": 116,
    "title": "Ninho Pterodáctilo: Nível 1",
    "theme": "dinosaur",
    "icon": "Sparkles",
    "targetHeight": 116000,
    "gravity": 0.3,
    "jumpForce": -14.4,
    "speedFactor": 3.28,
    "wind": 0,
    "bgGradient": [
      "#071a17",
      "#0f3630",
      "#1a5950"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "Escalada extrema na estratosfera aos 116.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 117,
    "number": 117,
    "title": "Ninho Pterodáctilo: Nível 2",
    "theme": "dinosaur",
    "icon": "Sparkles",
    "targetHeight": 117000,
    "gravity": 0.32,
    "jumpForce": -14.4,
    "speedFactor": 3.29,
    "wind": 0,
    "bgGradient": [
      "#071a17",
      "#0f3630",
      "#1a5950"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "Escalada extrema na estratosfera aos 117.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 118,
    "number": 118,
    "title": "Ninho Pterodáctilo: Nível 3",
    "theme": "dinosaur",
    "icon": "Sparkles",
    "targetHeight": 118000,
    "gravity": 0.33,
    "jumpForce": -14.4,
    "speedFactor": 3.3,
    "wind": 0,
    "bgGradient": [
      "#071a17",
      "#0f3630",
      "#1a5950"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "Escalada extrema na estratosfera aos 118.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 119,
    "number": 119,
    "title": "Ninho Pterodáctilo: Nível 4",
    "theme": "dinosaur",
    "icon": "Sparkles",
    "targetHeight": 119000,
    "gravity": 0.34,
    "jumpForce": -14.4,
    "speedFactor": 3.31,
    "wind": 0,
    "bgGradient": [
      "#071a17",
      "#0f3630",
      "#1a5950"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "Escalada extrema na estratosfera aos 119.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 120,
    "number": 120,
    "title": "👑 CHEFÃO 24: Quetzalcoatlus Supremo",
    "theme": "dinosaur",
    "icon": "Crown",
    "targetHeight": 120000,
    "gravity": 0.24,
    "jumpForce": -14.4,
    "speedFactor": 3.32,
    "wind": 0,
    "bgGradient": [
      "#071a17",
      "#0f3630",
      "#1a5950"
    ],
    "platformColor": "#14b8a6",
    "platformBorder": "#ffffff",
    "ballGlow": "#5eead4",
    "description": "BATALHA DE CHEFÃO AOS 120.000m! Supere Quetzalcoatlus Supremo!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: Soberano Alado dos Céus Jurássicos. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Quetzalcoatlus Supremo",
    "bossTitle": "Soberano Alado dos Céus Jurássicos",
    "bossHP": 23,
    "bossColor": "#14b8a6",
    "bossGlow": "#5eead4",
    "rewardGems": 2600,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 121,
    "number": 121,
    "title": "Trem Fantasma Oeste: Nível 1",
    "theme": "wild_west",
    "icon": "Sparkles",
    "targetHeight": 121000,
    "gravity": 0.26,
    "jumpForce": -14.5,
    "speedFactor": 3.33,
    "wind": 0,
    "bgGradient": [
      "#1f0f06",
      "#3d1d0c",
      "#693315"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde68a",
    "description": "Escalada extrema na estratosfera aos 121.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 122,
    "number": 122,
    "title": "Trem Fantasma Oeste: Nível 2",
    "theme": "wild_west",
    "icon": "Sparkles",
    "targetHeight": 122000,
    "gravity": 0.27,
    "jumpForce": -14.5,
    "speedFactor": 3.34,
    "wind": 0,
    "bgGradient": [
      "#1f0f06",
      "#3d1d0c",
      "#693315"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde68a",
    "description": "Escalada extrema na estratosfera aos 122.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 123,
    "number": 123,
    "title": "Trem Fantasma Oeste: Nível 3",
    "theme": "wild_west",
    "icon": "Sparkles",
    "targetHeight": 123000,
    "gravity": 0.28,
    "jumpForce": -14.5,
    "speedFactor": 3.35,
    "wind": 0,
    "bgGradient": [
      "#1f0f06",
      "#3d1d0c",
      "#693315"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde68a",
    "description": "Escalada extrema na estratosfera aos 123.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 124,
    "number": 124,
    "title": "Trem Fantasma Oeste: Nível 4",
    "theme": "wild_west",
    "icon": "Sparkles",
    "targetHeight": 124000,
    "gravity": 0.3,
    "jumpForce": -14.5,
    "speedFactor": 3.36,
    "wind": 0,
    "bgGradient": [
      "#1f0f06",
      "#3d1d0c",
      "#693315"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde68a",
    "description": "Escalada extrema na estratosfera aos 124.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 125,
    "number": 125,
    "title": "👑 CHEFÃO 25: Locomotiva Blindada Fantasma",
    "theme": "wild_west",
    "icon": "Crown",
    "targetHeight": 125000,
    "gravity": 0.32,
    "jumpForce": -14.5,
    "speedFactor": 3.37,
    "wind": 0,
    "bgGradient": [
      "#1f0f06",
      "#3d1d0c",
      "#693315"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fde68a",
    "description": "BATALHA DE CHEFÃO AOS 125.000m! Supere Locomotiva Blindada Fantasma!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: O Titã de Aço a Vapor. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Locomotiva Blindada Fantasma",
    "bossTitle": "O Titã de Aço a Vapor",
    "bossHP": 24,
    "bossColor": "#f59e0b",
    "bossGlow": "#fde68a",
    "rewardGems": 2800,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 126,
    "number": 126,
    "title": "Parkour Gravidade 0: Nível 1",
    "theme": "sports",
    "icon": "Sparkles",
    "targetHeight": 126000,
    "gravity": 0.33,
    "jumpForce": -14.5,
    "speedFactor": 3.38,
    "wind": 0,
    "bgGradient": [
      "#051829",
      "#0d3252",
      "#165082"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Escalada extrema na estratosfera aos 126.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 127,
    "number": 127,
    "title": "Parkour Gravidade 0: Nível 2",
    "theme": "sports",
    "icon": "Sparkles",
    "targetHeight": 127000,
    "gravity": 0.34,
    "jumpForce": -14.5,
    "speedFactor": 3.39,
    "wind": 0,
    "bgGradient": [
      "#051829",
      "#0d3252",
      "#165082"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Escalada extrema na estratosfera aos 127.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 128,
    "number": 128,
    "title": "Parkour Gravidade 0: Nível 3",
    "theme": "sports",
    "icon": "Sparkles",
    "targetHeight": 128000,
    "gravity": 0.24,
    "jumpForce": -14.5,
    "speedFactor": 3.39,
    "wind": 0,
    "bgGradient": [
      "#051829",
      "#0d3252",
      "#165082"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Escalada extrema na estratosfera aos 128.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 129,
    "number": 129,
    "title": "Parkour Gravidade 0: Nível 4",
    "theme": "sports",
    "icon": "Sparkles",
    "targetHeight": 129000,
    "gravity": 0.26,
    "jumpForce": -14.5,
    "speedFactor": 3.4,
    "wind": 0,
    "bgGradient": [
      "#051829",
      "#0d3252",
      "#165082"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "Escalada extrema na estratosfera aos 129.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 130,
    "number": 130,
    "title": "👑 CHEFÃO 26: Campeão da Gravidade Zero",
    "theme": "sports",
    "icon": "Crown",
    "targetHeight": 130000,
    "gravity": 0.27,
    "jumpForce": -14.6,
    "speedFactor": 3.41,
    "wind": 0,
    "bgGradient": [
      "#051829",
      "#0d3252",
      "#165082"
    ],
    "platformColor": "#0ea5e9",
    "platformBorder": "#ffffff",
    "ballGlow": "#7dd3fc",
    "description": "BATALHA DE CHEFÃO AOS 130.000m! Supere Campeão da Gravidade Zero!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: O Ás Invicto do Parkour. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Campeão da Gravidade Zero",
    "bossTitle": "O Ás Invicto do Parkour",
    "bossHP": 25,
    "bossColor": "#0ea5e9",
    "bossGlow": "#7dd3fc",
    "rewardGems": 3000,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 131,
    "number": 131,
    "title": "Doce do Apocalipse: Nível 1",
    "theme": "candy",
    "icon": "Sparkles",
    "targetHeight": 131000,
    "gravity": 0.28,
    "jumpForce": -14.6,
    "speedFactor": 3.42,
    "wind": 0,
    "bgGradient": [
      "#1f0714",
      "#3d0f28",
      "#691a45"
    ],
    "platformColor": "#ec4899",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbcfe8",
    "description": "Escalada extrema na estratosfera aos 131.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 132,
    "number": 132,
    "title": "Doce do Apocalipse: Nível 2",
    "theme": "candy",
    "icon": "Sparkles",
    "targetHeight": 132000,
    "gravity": 0.3,
    "jumpForce": -14.6,
    "speedFactor": 3.43,
    "wind": 0,
    "bgGradient": [
      "#1f0714",
      "#3d0f28",
      "#691a45"
    ],
    "platformColor": "#ec4899",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbcfe8",
    "description": "Escalada extrema na estratosfera aos 132.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 133,
    "number": 133,
    "title": "Doce do Apocalipse: Nível 3",
    "theme": "candy",
    "icon": "Sparkles",
    "targetHeight": 133000,
    "gravity": 0.32,
    "jumpForce": -14.6,
    "speedFactor": 3.44,
    "wind": 0,
    "bgGradient": [
      "#1f0714",
      "#3d0f28",
      "#691a45"
    ],
    "platformColor": "#ec4899",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbcfe8",
    "description": "Escalada extrema na estratosfera aos 133.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 134,
    "number": 134,
    "title": "Doce do Apocalipse: Nível 4",
    "theme": "candy",
    "icon": "Sparkles",
    "targetHeight": 134000,
    "gravity": 0.33,
    "jumpForce": -14.6,
    "speedFactor": 3.45,
    "wind": 0,
    "bgGradient": [
      "#1f0714",
      "#3d0f28",
      "#691a45"
    ],
    "platformColor": "#ec4899",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbcfe8",
    "description": "Escalada extrema na estratosfera aos 134.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 135,
    "number": 135,
    "title": "👑 CHEFÃO 27: Gólem de Caramelo Ardente",
    "theme": "candy",
    "icon": "Crown",
    "targetHeight": 135000,
    "gravity": 0.34,
    "jumpForce": -14.6,
    "speedFactor": 3.46,
    "wind": 0,
    "bgGradient": [
      "#1f0714",
      "#3d0f28",
      "#691a45"
    ],
    "platformColor": "#ec4899",
    "platformBorder": "#ffffff",
    "ballGlow": "#fbcfe8",
    "description": "BATALHA DE CHEFÃO AOS 135.000m! Supere Gólem de Caramelo Ardente!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: A Força Açucarada Imparável. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Gólem de Caramelo Ardente",
    "bossTitle": "A Força Açucarada Imparável",
    "bossHP": 26,
    "bossColor": "#ec4899",
    "bossGlow": "#fbcfe8",
    "rewardGems": 3200,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 136,
    "number": 136,
    "title": "Mente Quântica: Nível 1",
    "theme": "health",
    "icon": "Sparkles",
    "targetHeight": 136000,
    "gravity": 0.24,
    "jumpForce": -14.6,
    "speedFactor": 3.47,
    "wind": 0,
    "bgGradient": [
      "#210610",
      "#420d20",
      "#701637"
    ],
    "platformColor": "#f43f5e",
    "platformBorder": "#ffffff",
    "ballGlow": "#fecdd3",
    "description": "Escalada extrema na estratosfera aos 136.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 137,
    "number": 137,
    "title": "Mente Quântica: Nível 2",
    "theme": "health",
    "icon": "Sparkles",
    "targetHeight": 137000,
    "gravity": 0.26,
    "jumpForce": -14.6,
    "speedFactor": 3.48,
    "wind": 0,
    "bgGradient": [
      "#210610",
      "#420d20",
      "#701637"
    ],
    "platformColor": "#f43f5e",
    "platformBorder": "#ffffff",
    "ballGlow": "#fecdd3",
    "description": "Escalada extrema na estratosfera aos 137.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 138,
    "number": 138,
    "title": "Mente Quântica: Nível 3",
    "theme": "health",
    "icon": "Sparkles",
    "targetHeight": 138000,
    "gravity": 0.27,
    "jumpForce": -14.7,
    "speedFactor": 3.49,
    "wind": 0,
    "bgGradient": [
      "#210610",
      "#420d20",
      "#701637"
    ],
    "platformColor": "#f43f5e",
    "platformBorder": "#ffffff",
    "ballGlow": "#fecdd3",
    "description": "Escalada extrema na estratosfera aos 138.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 139,
    "number": 139,
    "title": "Mente Quântica: Nível 4",
    "theme": "health",
    "icon": "Sparkles",
    "targetHeight": 139000,
    "gravity": 0.28,
    "jumpForce": -14.7,
    "speedFactor": 3.5,
    "wind": 0,
    "bgGradient": [
      "#210610",
      "#420d20",
      "#701637"
    ],
    "platformColor": "#f43f5e",
    "platformBorder": "#ffffff",
    "ballGlow": "#fecdd3",
    "description": "Escalada extrema na estratosfera aos 139.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 140,
    "number": 140,
    "title": "👑 CHEFÃO 28: Sinapse Hiperativa Omega",
    "theme": "health",
    "icon": "Crown",
    "targetHeight": 140000,
    "gravity": 0.3,
    "jumpForce": -14.7,
    "speedFactor": 3.51,
    "wind": 0,
    "bgGradient": [
      "#210610",
      "#420d20",
      "#701637"
    ],
    "platformColor": "#f43f5e",
    "platformBorder": "#ffffff",
    "ballGlow": "#fecdd3",
    "description": "BATALHA DE CHEFÃO AOS 140.000m! Supere Sinapse Hiperativa Omega!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: O Impulso Cósmico da Mente. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Sinapse Hiperativa Omega",
    "bossTitle": "O Impulso Cósmico da Mente",
    "bossHP": 27,
    "bossColor": "#f43f5e",
    "bossGlow": "#fecdd3",
    "rewardGems": 3400,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 141,
    "number": 141,
    "title": "Muralha das Eras: Nível 1",
    "theme": "continents",
    "icon": "Sparkles",
    "targetHeight": 141000,
    "gravity": 0.32,
    "jumpForce": -14.7,
    "speedFactor": 3.52,
    "wind": 0,
    "bgGradient": [
      "#171207",
      "#33270f",
      "#574219"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Escalada extrema na estratosfera aos 141.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 142,
    "number": 142,
    "title": "Muralha das Eras: Nível 2",
    "theme": "continents",
    "icon": "Sparkles",
    "targetHeight": 142000,
    "gravity": 0.33,
    "jumpForce": -14.7,
    "speedFactor": 3.53,
    "wind": 0,
    "bgGradient": [
      "#171207",
      "#33270f",
      "#574219"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Escalada extrema na estratosfera aos 142.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 143,
    "number": 143,
    "title": "Muralha das Eras: Nível 3",
    "theme": "continents",
    "icon": "Sparkles",
    "targetHeight": 143000,
    "gravity": 0.34,
    "jumpForce": -14.7,
    "speedFactor": 3.53,
    "wind": 0,
    "bgGradient": [
      "#171207",
      "#33270f",
      "#574219"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Escalada extrema na estratosfera aos 143.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 144,
    "number": 144,
    "title": "Muralha das Eras: Nível 4",
    "theme": "continents",
    "icon": "Sparkles",
    "targetHeight": 144000,
    "gravity": 0.24,
    "jumpForce": -14.7,
    "speedFactor": 3.54,
    "wind": 0,
    "bgGradient": [
      "#171207",
      "#33270f",
      "#574219"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "Escalada extrema na estratosfera aos 144.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 145,
    "number": 145,
    "title": "👑 CHEFÃO 29: Colosso das Sete Civilizações",
    "theme": "continents",
    "icon": "Crown",
    "targetHeight": 145000,
    "gravity": 0.26,
    "jumpForce": -14.7,
    "speedFactor": 3.55,
    "wind": 0,
    "bgGradient": [
      "#171207",
      "#33270f",
      "#574219"
    ],
    "platformColor": "#f59e0b",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef08a",
    "description": "BATALHA DE CHEFÃO AOS 145.000m! Supere Colosso das Sete Civilizações!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: O Guardião da História Humana. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "Colosso das Sete Civilizações",
    "bossTitle": "O Guardião da História Humana",
    "bossHP": 28,
    "bossColor": "#f59e0b",
    "bossGlow": "#fef08a",
    "rewardGems": 3600,
    "hasParallelUniverseAttack": false
  },
  {
    "id": 146,
    "number": 146,
    "title": "Zênite Infinito 150k: Nível 1",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 146000,
    "gravity": 0.27,
    "jumpForce": -14.8,
    "speedFactor": 3.56,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#170726",
      "#300f52"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef3c7",
    "description": "Escalada extrema na estratosfera aos 146.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 147,
    "number": 147,
    "title": "Zênite Infinito 150k: Nível 2",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 147000,
    "gravity": 0.28,
    "jumpForce": -14.8,
    "speedFactor": 3.57,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#170726",
      "#300f52"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef3c7",
    "description": "Escalada extrema na estratosfera aos 147.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 148,
    "number": 148,
    "title": "Zênite Infinito 150k: Nível 3",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 148000,
    "gravity": 0.3,
    "jumpForce": -14.8,
    "speedFactor": 3.58,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#170726",
      "#300f52"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef3c7",
    "description": "Escalada extrema na estratosfera aos 148.000m!",
    "hazards": [
      "fragile",
      "conveyor"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 149,
    "number": 149,
    "title": "Zênite Infinito 150k: Nível 4",
    "theme": "cosmos",
    "icon": "Sparkles",
    "targetHeight": 149000,
    "gravity": 0.32,
    "jumpForce": -14.8,
    "speedFactor": 3.59,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#170726",
      "#300f52"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef3c7",
    "description": "Escalada extrema na estratosfera aos 149.000m!",
    "hazards": [
      "moving",
      "springs"
    ],
    "mechanic": "Plataformas energéticas e acrobacias aéreas de alta velocidade."
  },
  {
    "id": 150,
    "number": 150,
    "title": "👑 CHEFÃO 30: O Demiurgo Eterno do Cosmos",
    "theme": "cosmos",
    "icon": "Crown",
    "targetHeight": 150000,
    "gravity": 0.33,
    "jumpForce": -14.8,
    "speedFactor": 3.6,
    "wind": 0,
    "bgGradient": [
      "#000000",
      "#170726",
      "#300f52"
    ],
    "platformColor": "#fbbf24",
    "platformBorder": "#ffffff",
    "ballGlow": "#fef3c7",
    "description": "BATALHA DE CHEFÃO AOS 150.000m! Supere O Demiurgo Eterno do Cosmos!",
    "hazards": [
      "moving",
      "fragile",
      "springs",
      "conveyor"
    ],
    "mechanic": "Confronto de Chefão: A Divindade Suprema do JumpBall. Desvie das ondas cósmicas e vença!",
    "isBossStage": true,
    "bossName": "O Demiurgo Eterno do Cosmos",
    "bossTitle": "A Divindade Suprema do JumpBall",
    "bossHP": 29,
    "bossColor": "#fbbf24",
    "bossGlow": "#fef3c7",
    "rewardGems": 5000,
    "hasParallelUniverseAttack": true
  }
];
