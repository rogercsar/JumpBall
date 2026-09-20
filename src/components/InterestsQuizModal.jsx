import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, Compass, Heart, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INTEREST_TOPICS } from '../game/recommendation';

export function InterestsQuizModal({
  isOpen,
  onClose,
  currentInterests = [],
  onSaveInterests
}) {
  const [selected, setSelected] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      let safeList = [];
      if (Array.isArray(currentInterests)) {
        safeList = currentInterests.filter(Boolean);
      } else if (typeof currentInterests === 'string') {
        try {
          const parsed = JSON.parse(currentInterests);
          if (Array.isArray(parsed)) safeList = parsed.filter(Boolean);
        } catch (e) {
          safeList = currentInterests.split(',').map(s => s.trim()).filter(Boolean);
        }
      }
      setSelected(safeList);
    }
  }, [isOpen, currentInterests]);

  if (!isOpen) return null;

  const toggleTopic = (id) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSaveInterests) {
        await onSaveInterests(selected);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) { /* ignore */ }
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/30 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 shadow-2xl flex flex-col overflow-hidden text-left">
        
        {/* Glow de fundo */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Topo do Modal */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80 relative z-10 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase tracking-widest text-pink-400">
                Personalização de Estilo
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Quais são seus temas favoritos?
            </h2>
            <p className="text-xs text-slate-400">
              Selecione seus interesses para recomendarmos skins de heroínas e fases feitas para você.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Fechar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grid de Tópicos de Interesse */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-3 custom-scrollbar relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTEREST_TOPICS.map((topic) => {
              const isSelected = selected.includes(topic.id);
              return (
                <div
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3 relative group overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-950/40 via-purple-950/40 to-slate-900 border-pink-500/80 shadow-lg shadow-pink-500/10 scale-[1.01]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {topic.emoji}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-black truncate ${isSelected ? 'text-pink-200' : 'text-white'}`}>
                        {topic.label}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      {topic.desc}
                    </p>
                  </div>

                  <div className={`absolute top-3 right-3 w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                    isSelected
                      ? 'bg-pink-500 border-pink-400 text-slate-950 font-bold'
                      : 'border-slate-700 bg-slate-800/50 text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé com Contador e Botão Salvar */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4 relative z-10 shrink-0">
          <div className="text-xs text-slate-400">
            <span className="font-bold text-white">{selected.length}</span> selecionados
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
            >
              Pular por enquanto
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-black text-xs sm:text-sm shadow-xl shadow-pink-500/25 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Salvando...' : 'Aplicar Preferências'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
