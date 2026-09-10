# 🌀 JumpBall — Endless Runner Vertical Híbrido

Aplicação web interativa de um jogo **Endless Runner Vertical** com física fluida em plataformas, controles híbridos por sensores de hardware móvel (**DeviceOrientation / Giroscópio**) e visão computacional em segundo plano (**MediaPipe Hands** na câmera frontal), integrado com autenticação e banco de dados **Supabase** e backend serverless no **Netlify Functions**.

Desenvolvido em **React**, **Tailwind CSS**, **Canvas 2D** e **Web Audio API**.

---

## 🌟 Funcionalidades e Diferenciais

### 🎮 1. Motor de Jogo & Físicas (Canvas 2D)
- **10 Fases Temáticas Diversas**:
  1. *Floresta Esmeralda* (Nível 1 - Introdução com plataformas de madeira e hera)
  2. *Dunas do Saara* (Nível 2 - Vento lateral dinâmico e plataformas de areia movediça)
  3. *Abismo Oceânico* (Nível 3 - Baixa gravidade/flutuabilidade e bolhas impulsoras)
  4. *Cânion Trovejante* (Nível 4 - Plataformas elétricas oscilatórias de alta velocidade)
  5. *Vulcão Magmático* (Nível 5 - Lava incandescente subindo e basalto frágil)
  6. *Glaciar Ártico* (Nível 6 - Gelo escorregadio com baixo atrito e nevasca)
  7. *Caverna de Cristais* (Nível 7 - Cristais com portais e super saltos)
  8. *Santuário Celeste* (Nível 8 - Nuvens tênues que somem após o salto)
  9. *Metrópole Cyberpunk* (Nível 9 - Esteiras rolantes aceleradoras e lasers)
  10. *Órbita Cósmica Zenith* (Nível 10 - Microgravidade e velocidade máxima)
- **Tipos de Plataformas Dinâmicas**:
  - *Padrão*: Base estável com partículas de aterrissagem.
  - *Móvel*: Oscilação horizontal contínua.
  - *Frágil (Crumble)*: Esfarela-se ao toque com efeitos sonoros de quebra.
  - *Mola (Spring)*: Super salto com impulso sonoro energizado.
  - *Esteira rolante (Conveyor)*: Transfere aceleração lateral imediata para a bola.
- **Sistema de Partículas**: Efeitos de rastro, estouro de molas, detritos e chuva de confetes comemorativa na vitória.
- **Sintetizador Procedural Web Audio API**: Áudio arcade retro (pulo, super salto, mola, moedas, choque e fanfarra) sem requisição de arquivos externos.

---

### 📱 2. Controles Híbridos de Hardware Mobile
- **Giroscópio / Acelerômetro (`DeviceOrientation API`)**:
  - Movimento lateral pelo eixo `event.gamma`.
  - Filtro passa-baixa (smoothing) para eliminar ruído.
  - Botão de solicitação de permissão nativa para iOS 13+ Safari (`DeviceOrientationEvent.requestPermission()`).
  - Calibração de centro neutro e slider de sensibilidade.
- **Visão Computacional na Câmera Frontal (`MediaPipe Hands`)**:
  - Roda em background na câmera selfie sem travar o loop do jogo.
  - Reconhece **Punho Fechado (Closed Fist) 👊** ou **Movimento Rápido para Cima 🚀** para disparar o **Super Salto com Impulso**.
  - Janela flutuante Picture-in-Picture (PiP) com renderização das 21 landmarks da mão para feedback em tempo real.
- **Fallbacks Integrados (Desktop & Acessibilidade)**:
  - Botões táteis virtuais na tela para celulares sem permissão de giroscópio.
  - Teclado: Setas `←` `→` ou `A` `D` para inclinação e `Barra de Espaço` para o pulo.

---

### 🛡️ 3. Backend, Autenticação & Supabase
- **Esquema SQL Completo (`schema.sql`)**:
  - Tabela `profiles`: Dados do usuário, pontuação máxima acumulada, total de saltos e skins de bola.
  - Tabela `stages`: 10 fases pré-configuradas com gravidade, velocidade e alvos de altura.
  - Tabela `game_history`: Registro detalhado de cada partida (fase, pontuação, altura máxima, duração, saltos e modo de controle).
  - Tabela `user_settings`: Persistência de volumes, sensibilidade e preferências.
  - Políticas de **Row Level Security (RLS)** ativadas.
  - **Triggers automáticos**: Criação de perfil ao cadastrar e atualização automática de recordes.
- **Modo Visitante (Guest Mode Resiliente)**: Se as variáveis do Supabase ainda não estiverem configuradas, o jogo roda perfeitamente em modo de demonstração local via `localStorage`.

---

### ☁️ 4. Deploy no Netlify & Funções Serverless
- `netlify.toml`: Configurado para SPA (`/* -> /index.html`), diretório de funções e **Headers de Permissão** (`Permissions-Policy: camera=(self), accelerometer=(self), gyroscope=(self)`).
- **Netlify Functions**:
  - `/api/save-score` (`netlify/functions/save-score.js`): Validação de pontuação e gravação segura.
  - `/api/get-leaderboard` (`netlify/functions/get-leaderboard.js`): Ranking global e por fase.
  - `/api/profile-stats` (`netlify/functions/profile-stats.js`): Estatísticas agregadas do jogador.

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- Node.js (v18 ou superior)
- NPM

### Passos

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <url-do-repositorio>
   cd jumpball
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente (Opcional para modo Online):**
   Crie o arquivo `.env` na raiz (baseado no `.env.example`):
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
   ```
   *(Caso não adicione o `.env`, o jogo funcionará em modo demonstração local com salvamento no navegador).*

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a URL informada no terminal (geralmente `http://localhost:5173`).

---

## 🗄️ Configuração do Banco de Dados no Supabase

1. Crie um novo projeto no [Supabase](https://supabase.com).
2. No painel do Supabase, acesse o **SQL Editor**.
3. Copie todo o conteúdo do arquivo [`schema.sql`](./schema.sql) e execute.
4. Em **Project Settings > API**, copie a **URL** e a chave **anon / public** e insira no seu `.env` ou nas variáveis de ambiente do Netlify.

---

## 🌐 Deploy no Netlify

### Opção 1: Via Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Opção 2: Via Git (GitHub / GitLab)
1. Conecte o repositório ao Netlify.
2. O arquivo [`netlify.toml`](./netlify.toml) já detectará automaticamente:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
3. Adicione as variáveis de ambiente em **Site configuration > Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (opcional para funções serverless restritas)

---

## 📂 Estrutura de Diretórios

```
jumpball/
├── netlify.toml                      # Configuração Netlify (build, redirects SPA, functions)
├── package.json                      # React, Vite, Tailwind, Supabase, Lucide
├── schema.sql                        # Script SQL de migração e RLS do Supabase
├── .env.example                      # Modelo de variáveis de ambiente
├── netlify/
│   └── functions/                    # Serverless Functions (Node.js)
│       ├── save-score.js
│       ├── get-leaderboard.js
│       └── profile-stats.js
├── src/
│   ├── main.jsx                      # Ponto de entrada React
│   ├── App.jsx                       # Roteamento SPA e contexto
│   ├── index.css                     # Tailwind CSS, custom glassmorphism e neon
│   ├── contexts/                     # Autenticação, Configurações e Áudio
│   ├── hooks/                        # DeviceOrientation e MediaPipe Hands
│   ├── components/                   # Navbar, StageCard, CameraPreview, TiltMeter, TouchControls
│   ├── pages/                        # Home, Game, Profile, History, Settings, Login
│   ├── game/                         # Motor Canvas 2D, 10 Fases, Partículas e Áudio Web API
│   └── lib/                          # Cliente Supabase e LocalStore resiliente
```
