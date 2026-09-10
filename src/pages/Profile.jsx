import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Layers, 
  Zap, 
  Check, 
  Palette, 
  Edit3, 
  Save, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useDialog } from '../contexts/DialogContext';
import { BALL_SKINS } from '../game/stages';

export function Profile({ onNavigate }) {
  const { user, profile, updateProfile, isGuest } = useAuth();
  const { showAlert } = useDialog();
  const [isEditingName, setIsEditingName] = useState(false);
  const [usernameInput, setUsernameInput] = useState(profile?.username || '');
  const [fullNameInput, setFullNameInput] = useState(profile?.full_name || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentSkinId = profile?.ball_skin || 'neon-cyan';
  const activeSkin = BALL_SKINS.find(s => s.id === currentSkinId) || BALL_SKINS[0];

  const handleSaveProfile = async () => {
    if (!usernameInput.trim()) {
      showAlert({
        title: 'Nome Inválido',
        message: 'O apelido de piloto não pode ficar em branco.',
        variant: 'warning',
        confirmText: 'Entendido'
      });
      return;
    }
    await updateProfile({
      username: usernameInput.trim(),
      full_name: fullNameInput.trim()
    });
    setIsEditingName(false);
    showAlert({
      title: 'Perfil Atualizado',
      message: `Seu nome de piloto foi alterado para "${usernameInput.trim()}" com sucesso!`,
      variant: 'success'
    });
  };

  const handleSelectSkin = async (skinId) => {
    const chosenSkin = BALL_SKINS.find(s => s.id === skinId);
    await updateProfile({ ball_skin: skinId });
    showAlert({
      title: 'Esfera Equipada',
      message: `A skin "${chosenSkin?.name || skinId}" foi equipada na sua bola de salto!`,
      variant: 'success',
      confirmText: 'Jogar com ela'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Notificação de Sucesso */}
      {saveSuccess && (
        <div className="fixed top-20 right-6 z-50 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-2xl backdrop-blur-md animate-bounce">
          <Check className="w-4 h-4" />
          <span>Perfil atualizado com sucesso!</span>
        </div>
      )}

      {/* Card Principal de Perfil */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar com a Skin da Bola Ativa */}
          <div className="relative group">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-105"
              style={{
                background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${activeSkin.primary} 45%, ${activeSkin.trail} 100%)`,
                boxShadow: `0 0 30px ${activeSkin.glow}`
              }}
            >
              <div className="w-4 h-4 rounded-full bg-white/40 blur-xs absolute top-3 left-5" />
            </div>
            <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Dados do Usuário */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="px-3 py-1.5 bg-slate-900 border border-cyan-500 rounded-xl text-lg font-bold text-white focus:outline-none"
                    placeholder="Seu Apelido"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="p-2 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"
                    title="Salvar"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {profile?.username || 'Piloto'}
                  </h1>
                  <button
                    onClick={() => {
                      setUsernameInput(profile?.username || '');
                      setFullNameInput(profile?.full_name || '');
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                    title="Editar Nome"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}

              {isGuest && (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
                  Modo Convidado
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{user?.email || 'convidado@jumpball.app'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>
                  Piloto desde {new Date(profile?.created_at || Date.now()).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas Gerais do Jogador */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Recorde de Pontos</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            {profile?.high_score?.toLocaleString() || 0}
          </div>
          <p className="text-[11px] text-slate-500">Pontuação máxima atingida</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Fases Concluídas</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400">
            {profile?.stages_completed || 0} <span className="text-lg text-slate-500 font-normal">/ 10</span>
          </div>
          <p className="text-[11px] text-slate-500">Progressão na campanha</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total de Saltos</span>
            <Zap className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400">
            {profile?.total_jumps?.toLocaleString() || 0}
          </div>
          <p className="text-[11px] text-slate-500">Impulsos acumulados</p>
        </div>
      </div>

      {/* Personalização de Estilo / Skins da Bola */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-cyan-400" />
          <div>
            <h2 className="text-lg font-bold text-white">Garagem de Esferas (Skins)</h2>
            <p className="text-xs text-slate-400">Escolha o visual e o rastro luminoso da sua bola de salto</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {BALL_SKINS.map((skin) => {
            const isSelected = activeSkin.id === skin.id;
            return (
              <button
                key={skin.id}
                onClick={() => handleSelectSkin(skin.id)}
                className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-cyan-500/10 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'glass-card border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Visual da Bola */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${skin.primary} 45%, ${skin.trail} 100%)`,
                    boxShadow: `0 0 18px ${skin.glow}`
                  }}
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-white/40 blur-xs" />
                </div>

                <div className="text-center">
                  <span className="text-xs font-bold text-slate-200 block">{skin.name}</span>
                  <span className={`text-[10px] font-semibold ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`}>
                    {isSelected ? 'Equipado' : 'Selecionar'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
