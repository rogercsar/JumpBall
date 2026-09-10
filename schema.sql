-- ==============================================================================
-- JUMPBALL: ENDLESS RUNNER VERTICAL - SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- 1. Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Tabela de Perfis de Usuários (profiles)
-- Vinculada à tabela auth.users do Supabase
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    ball_skin TEXT DEFAULT 'neon-cyan', -- 'neon-cyan', 'plasma-pink', 'solar-gold', 'matrix-green', 'cosmic-purple', 'fireball'
    high_score BIGINT DEFAULT 0,
    total_jumps BIGINT DEFAULT 0,
    stages_completed INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabela de Fases / Estágios (stages)
CREATE TABLE IF NOT EXISTS public.stages (
    id SERIAL PRIMARY KEY,
    stage_number INTEGER UNIQUE NOT NULL,
    title TEXT NOT NULL,
    theme TEXT NOT NULL,
    description TEXT,
    target_height INTEGER NOT NULL, -- Altura em metros/pixels para vencer a fase
    gravity FLOAT DEFAULT 0.35,
    speed_factor FLOAT DEFAULT 1.0,
    obstacle_types TEXT[] DEFAULT ARRAY['moving', 'fragile'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Tabela de Histórico de Partidas (game_history)
CREATE TABLE IF NOT EXISTS public.game_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    stage_id INTEGER REFERENCES public.stages(stage_number) ON DELETE SET NULL,
    score BIGINT NOT NULL,
    max_height INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('completed', 'game_over', 'quit')),
    duration_seconds INTEGER DEFAULT 0,
    jumps_count INTEGER DEFAULT 0,
    control_mode TEXT DEFAULT 'hybrid', -- 'hybrid', 'gyro', 'camera', 'touch', 'keyboard'
    played_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabela de Configurações de Usuário (user_settings)
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    gyro_sensitivity FLOAT DEFAULT 1.2,
    gyro_deadzone FLOAT DEFAULT 2.0,
    camera_enabled BOOLEAN DEFAULT TRUE,
    gesture_jump_threshold FLOAT DEFAULT 0.7,
    sfx_volume FLOAT DEFAULT 0.8,
    bgm_volume FLOAT DEFAULT 0.6,
    haptics_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para Profiles
CREATE POLICY "Perfis públicos são visíveis por todos" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Usuários podem atualizar seus próprios perfis" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Políticas para Stages
CREATE POLICY "Fases são visíveis por todos" 
    ON public.stages FOR SELECT 
    USING (true);

-- Políticas para Game History
CREATE POLICY "Histórico público para ranking global" 
    ON public.game_history FOR SELECT 
    USING (true);

CREATE POLICY "Usuários autenticados podem gravar seu histórico" 
    ON public.game_history FOR INSERT 
    WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');

-- Políticas para User Settings
CREATE POLICY "Usuários visualizam apenas suas próprias configurações" 
    ON public.user_settings FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Usuários modificam suas próprias configurações" 
    ON public.user_settings FOR ALL 
    USING (auth.uid() = user_id);

-- ==============================================================================
-- TRIGGERS E FUNÇÕES AUTOMÁTICAS
-- ==============================================================================

-- Função para criar automaticamente perfil e configurações ao cadastrar novo usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, full_name, avatar_url)
    VALUES (
        new.id, 
        COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        new.raw_user_meta_data->>'avatar_url'
    );

    INSERT INTO public.user_settings (user_id)
    VALUES (new.id);

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger disparado no cadastro do Auth
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger para atualizar high_score no perfil automaticamente após uma partida
CREATE OR REPLACE FUNCTION public.update_profile_high_score()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET 
        high_score = GREATEST(high_score, NEW.score),
        total_jumps = total_jumps + NEW.jumps_count,
        stages_completed = stages_completed + CASE WHEN NEW.status = 'completed' THEN 1 ELSE 0 END,
        updated_at = timezone('utc'::text, now())
    WHERE id = NEW.user_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_game_history_inserted ON public.game_history;
CREATE TRIGGER on_game_history_inserted
    AFTER INSERT ON public.game_history
    FOR EACH ROW EXECUTE FUNCTION public.update_profile_high_score();

-- ==============================================================================
-- INSERÇÃO DAS 10 FASES INICIAIS DO JOGO
-- ==============================================================================
INSERT INTO public.stages (stage_number, title, theme, description, target_height, gravity, speed_factor, obstacle_types)
VALUES
(1, 'Floresta Esmeralda', 'forest', 'Gravidade suave e plataformas de madeira. Ideal para calibrar o giroscópio.', 1500, 0.32, 1.0, ARRAY['moving']),
(2, 'Dunas do Saara', 'desert', 'Vento lateral suave empurrando a bola. Cuidado com areia movediça!', 2000, 0.34, 1.1, ARRAY['moving', 'fragile']),
(3, 'Abismo Oceânico', 'ocean', 'Flutuação líquida, plataformas elásticas e correntes de bolhas.', 2500, 0.28, 1.15, ARRAY['spring', 'moving']),
(4, 'Cânion Trovejante', 'storm', 'Descargas elétricas periódicas e plataformas condutoras.', 3000, 0.36, 1.25, ARRAY['moving', 'electric', 'fragile']),
(5, 'Vulcão Magmático', 'volcano', 'Lava subindo do fundo! Plataformas de basalto que se esfarelam.', 3500, 0.38, 1.35, ARRAY['fragile', 'moving', 'lava_rising']),
(6, 'Glaciar Ártico', 'arctic', 'Superfícies de gelo com baixíssimo atrito e rajadas de nevasca.', 4000, 0.35, 1.45, ARRAY['ice_slick', 'fragile', 'spring']),
(7, 'Caverna de Cristais', 'crystal', 'Cristais de ressonância com portais dimensionais e super saltos.', 4500, 0.33, 1.55, ARRAY['spring', 'teleport', 'moving']),
(8, 'Santuário Celeste', 'sky', 'Nuvens tênues e plataformas invisíveis que exigem reflexos rápidos.', 5000, 0.30, 1.65, ARRAY['disappearing', 'spring', 'wind']),
(9, 'Metrópole Cyberpunk', 'cyberpunk', 'Esteiras rolantes que aceleram a bola e lasers móveis.', 6000, 0.40, 1.85, ARRAY['conveyor', 'lasers', 'moving', 'fragile']),
(10, 'Órbita Cósmica Zenith', 'cosmos', 'Gravidade quântica, campos de força gravitacionais e asteroides velozes.', 7500, 0.25, 2.10, ARRAY['gravity_well', 'teleport', 'moving', 'lasers'])
ON CONFLICT (stage_number) DO NOTHING;
