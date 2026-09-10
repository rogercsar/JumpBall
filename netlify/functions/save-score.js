import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export async function handler(event, context) {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Método não permitido. Utilize POST.' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const { userId, stageId, score, maxHeight, status, duration, jumps, controlMode } = payload;

    if (!score || score < 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Pontuação inválida.' })
      };
    }

    if (!supabaseUrl || !supabaseKey) {
      // Fallback em caso de chaves não configuradas no Netlify ainda
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          mock: true,
          message: 'Score registrado localmente (configure o Supabase para persistência total em nuvem).'
        })
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Inserir registro na tabela game_history
    const { data, error } = await supabase
      .from('game_history')
      .insert([
        {
          user_id: userId || null,
          stage_id: stageId || 1,
          score: Math.round(score),
          max_height: Math.round(maxHeight || 0),
          status: status || 'game_over',
          duration_seconds: Math.round(duration || 0),
          jumps_count: Math.round(jumps || 0),
          control_mode: controlMode || 'hybrid'
        }
      ])
      .select();

    if (error) {
      console.error('Erro ao salvar partida:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, record: data[0] })
    };
  } catch (err) {
    console.error('Erro inesperado no backend:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Erro interno do servidor' })
    };
  }
}
