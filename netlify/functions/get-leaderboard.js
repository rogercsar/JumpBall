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

  const stageId = event.queryStringParameters?.stageId;

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        leaderboard: []
      })
    };
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase
      .from('game_history')
      .select(`
        id,
        score,
        max_height,
        status,
        played_at,
        stage_id,
        profiles (
          username,
          full_name,
          avatar_url,
          ball_skin
        )
      `)
      .order('score', { ascending: false })
      .limit(20);

    if (stageId) {
      query = query.eq('stage_id', parseInt(stageId, 10));
    }

    const { data, error } = await query;

    if (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: error.message })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ leaderboard: data })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
}
