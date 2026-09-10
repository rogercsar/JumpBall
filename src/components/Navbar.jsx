import {
  Gamepad2,
  User,
  History,
  Settings as SettingsIcon,
  LogIn,
  LogOut,
  UserPlus,
  Smartphone,
  Camera,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useSettings } from '../contexts/SettingsContext';
import { useDialog } from '../contexts/DialogContext';

export function Navbar({ currentRoute, setCurrentRoute, hasOrientation, isCameraActive }) {
  const { user, profile, logout } = useAuth();
  const { settings } = useSettings();
  const { showConfirm, showAlert } = useDialog();

  const handleNavClick = (routeId) => {
    if (!user && routeId !== 'home') {
      setCurrentRoute('login');
      return;
    }
    setCurrentRoute(routeId);
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'game', label: 'Jogar', icon: Gamepad2 },
    { id: 'history', label: 'Histórico', icon: History },
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'settings', label: 'Ajustes', icon: SettingsIcon }
  ];

  return (
    <>
      {/* Barra de Navegação Superior (Desktop & Tablets) */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Marca */}
          <div
            onClick={() => setCurrentRoute('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-5 h-5 rounded-full bg-white shadow-inner animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-sky-300 to-rose-400 bg-clip-text text-transparent">
                JUMPBALL
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                PRO RUNNER
              </span>
            </div>
          </div>

          {/* Links Centrais (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Indicadores de Hardware e Status do Usuário */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Indicadores de Sensores comentados a pedido:
            {user && (
              <div 
                title={hasOrientation ? 'Giroscópio / Acelerômetro Conectado' : 'Aguardando sensor de movimento'}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
                  hasOrientation 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : 'bg-slate-800/60 text-slate-500 border-slate-700/50'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{hasOrientation ? 'Giro Ativo' : 'Giro Desligado'}</span>
              </div>
            )}

            {user && settings.cameraEnabled && (
              <div
                title={isCameraActive ? 'MediaPipe Hands Ativo' : 'Câmera em espera'}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${isCameraActive
                    ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 animate-pulse'
                    : 'bg-slate-800/60 text-slate-500 border-slate-700/50'
                  }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{isCameraActive ? 'Visão Ativa' : 'Câmera Off'}</span>
              </div>
            )}
            */}

            {/* Perfil / Login */}
            {!user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentRoute('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold glass-card text-slate-200 hover:text-white hover:bg-slate-800 border border-slate-700 transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Entrar</span>
                </button>
                <button
                  onClick={() => setCurrentRoute('login')}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Cadastrar</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentRoute('profile')}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:border-cyan-500/40 text-xs font-medium text-slate-200 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-sky-600 flex items-center justify-center text-[11px] font-bold text-slate-950">
                    {profile?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline max-w-[90px] truncate">{profile?.username || 'Piloto'}</span>
                </button>
                <button
                  onClick={async () => {
                    const confirmed = await showConfirm({
                      title: 'Desconectar da Conta',
                      message: 'Deseja realmente sair da sua conta? Suas pontuações locais serão preservadas.',
                      variant: 'warning',
                      confirmText: 'Sair da Conta',
                      cancelText: 'Continuar Jogando'
                    });
                    if (confirmed) {
                      await logout();
                      showAlert({
                        title: 'Desconectado',
                        message: 'Você saiu da sua conta com sucesso.',
                        variant: 'info'
                      });
                    }
                  }}
                  title="Sair"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Barra de Navegação Inferior para Mobile (Ocultada durante a tela do jogo para não sobrepor os controles) */}
      {user && currentRoute !== 'game' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel border-t border-slate-800/90 bg-slate-950/90 py-1.5 px-3 flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentRoute(item.id)}
                className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all ${isActive
                    ? 'text-cyan-400 scale-105'
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </>
  );
}
