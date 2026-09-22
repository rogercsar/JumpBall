-- ==============================================================================
-- JUMPBALL: MIGRATION PARA INDEPENDÊNCIA DAS FASES (MODO HERÓI E MODO LIVRE)
-- ==============================================================================

-- Adiciona colunas para tracking independente se desejado no Supabase
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS stages_completed_hero integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS stages_completed_free integer DEFAULT 0;

-- Inicializa stages_completed_hero com o valor atual de stages_completed para preservar o progresso existente
UPDATE public.profiles
SET stages_completed_hero = COALESCE(stages_completed, 0)
WHERE stages_completed_hero IS NULL OR stages_completed_hero = 0;
