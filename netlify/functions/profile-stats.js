import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export async function handler(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const userId = event.queryStringParameters?.userId;

  if (!userId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'userId obrigatório' })
    };
  }

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        stats: {
          gamesPlayed: 0,
          highScore: 0,
          totalJumps: 0,
          stagesCompleted: 0,
          winRate: '0%'
        }
      })
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    const { count: gamesCount } = await supabase
      .from('game_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        profile,
        stats: {
          gamesPlayed: gamesCount || 0,
          highScore: profile?.high_score || 0,
          totalJumps: profile?.total_jumps || 0,
          stagesCompleted: profile?.stages_completed || 0
        }
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
}
