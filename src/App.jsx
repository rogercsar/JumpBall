import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { SettingsProvider } from './contexts/SettingsContext';
import { DialogProvider } from './contexts/DialogContext';
import { useDeviceOrientation } from './hooks/useDeviceOrientation';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { Profile } from './pages/Profile';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState('home');

  // Detecta se o usuário clicou no link de recuperação de senha vindo do e-mail
  useEffect(() => {
    if (window.location.hash.includes('recovery') || window.location.hash.includes('type=recovery')) {
      setCurrentRoute('forgot-password');
    }
  }, []);

  // Sensores globais
  const {
    orientation,
    isSupported,
    permissionGranted,
    needsPermissionPrompt,
    requestOrientationPermission,
    calibrate
  } = useDeviceOrientation();

  // 1. Tela de Carregamento da Sessão (somente se estiver tentando acessar diretamente uma rota protegida)
  if (loading && ['game', 'profile', 'history'].includes(currentRoute)) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center space-y-4 select-none">
        <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-slate-950 flex items-center justify-center shadow-inner">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>
        <span className="text-xs font-black text-slate-400 tracking-widest uppercase">
          Verificando Acesso...
        </span>
      </div>
    );
  }

  // Se o usuário não está autenticado e tentar acessar uma rota restrita, redireciona para login
  const isProtectedRoute = ['game', 'profile', 'history'].includes(currentRoute);
  const activeRoute = (!user && isProtectedRoute) ? 'login' : currentRoute;

  return (
    <div className={`bg-[#090d16] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 ${
      activeRoute === 'game' 
        ? 'h-[100dvh] max-h-[100dvh] overflow-hidden' 
        : 'min-h-screen pb-20 md:pb-0'
    }`}>
      {/* Barra de Navegação Superior (com Início, Jogar, Histórico, Perfil, Ajustes e Botões de Entrar/Cadastrar) */}
      <Navbar
        currentRoute={activeRoute}
        setCurrentRoute={setCurrentRoute}
        hasOrientation={isSupported && (permissionGranted || orientation.gamma !== 0)}
        isCameraActive={false}
      />

      {/* Roteamento de Telas */}
      <main className={`flex-1 flex flex-col ${activeRoute === 'game' ? 'h-full min-h-0 overflow-hidden' : ''}`}>
        {activeRoute === 'home' && (
          <Home
            onNavigate={setCurrentRoute}
            hasOrientation={false}
            isCameraActive={false}
          />
        )}

        {activeRoute === 'game' && (
          <Game onNavigate={setCurrentRoute} />
        )}

        {activeRoute === 'profile' && (
          <Profile onNavigate={setCurrentRoute} />
        )}

        {activeRoute === 'history' && (
          <History onNavigate={setCurrentRoute} />
        )}

        {activeRoute === 'settings' && (
          <Settings
            orientation={orientation}
            requestOrientationPermission={requestOrientationPermission}
            permissionGranted={permissionGranted}
            needsPermissionPrompt={needsPermissionPrompt}
            calibrate={calibrate}
          />
        )}

        {(activeRoute === 'login' || activeRoute === 'register') && (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 w-full my-auto">
            <Login 
              onNavigate={setCurrentRoute} 
              initialMode={activeRoute === 'register' ? 'register' : 'login'} 
            />
          </div>
        )}

        {activeRoute === 'forgot-password' && (
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 w-full my-auto">
            <ForgotPassword onNavigate={setCurrentRoute} />
          </div>
        )}
      </main>

      {/* Rodapé da Aplicação (Ocultado durante o jogo para manter imersão total e evitar rolagem) */}
      {activeRoute !== 'game' && (
        <footer className="border-t border-slate-800/60 bg-slate-950/60 py-6 px-4 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400">JumpBall Pro Runner</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              © {new Date().getFullYear()} JumpBall. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <DialogProvider>
          <AppContent />
        </DialogProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
