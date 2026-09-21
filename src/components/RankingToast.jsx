import React, { useState, useEffect } from 'react';
import { Trophy, X } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext.jsx';

export function RankingToast() {
  const { user } = useAuth();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Canal Realtime para escutar atualizações de pontuação/ranking na tabela profiles
    const channel = supabase
      .channel('public:profiles:ranking')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          const updatedUser = payload.new;
          const previousUser = payload.old;

          // Ignora atualizações do próprio jogador conectado
          if (user && updatedUser.id === user.id) return;

          // Dispara notificação apenas se o high_score aumentou significativamente ou completou novas fases
          const newScore = updatedUser.high_score || 0;
          const oldScore = previousUser?.high_score || 0;
          const newStages = updatedUser.stages_completed || 0;
          const oldStages = previousUser?.stages_completed || 0;

          if (newScore > oldScore && newScore > 100) {
            showNotification({
              id: Date.now(),
              type: 'score',
              username: updatedUser.username || 'Um jogador',
              message: `subiu no ranking com ${newScore.toLocaleString('pt-BR')} pts!`,
              icon: '🏆'
            });
          } else if (newStages > oldStages) {
            showNotification({
              id: Date.now(),
              type: 'stage',
              username: updatedUser.username || 'Um jogador',
              message: `concluiu a Fase ${newStages}!`,
              icon: '⭐'
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const showNotification = (notif) => {
    setNotification(notif);
    const timer = setTimeout(() => {
      setNotification((curr) => (curr?.id === notif.id ? null : curr));
    }, 3800);
    return () => clearTimeout(timer);
  };

  if (!notification) return null;

  return (
    <aside 
      aria-label="Notificações do Ranking"
      className="fixed top-16 right-4 z-50 max-w-xs animate-in fade-in slide-in-from-top-3 duration-300 pointer-events-auto"
    >
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-950/90 border border-amber-500/40 shadow-xl shadow-amber-500/10 backdrop-blur-md">
        <span className="text-base shrink-0 animate-bounce">{notification.icon}</span>
        <div className="text-left leading-tight pr-1">
          <p className="text-[11px] font-bold text-white line-clamp-1">
            <span className="text-amber-300">@{notification.username}</span> {notification.message}
          </p>
          <span className="text-[9px] font-mono text-slate-400">Tempo real</span>
        </div>
        <button
          type="button"
          onClick={() => setNotification(null)}
          className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          title="Fechar"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
}
