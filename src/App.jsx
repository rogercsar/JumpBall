import React, { useState } from 'react';
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

function AppContent() {
  const { user, loading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState('home');

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
  const isProtectedRoute = ['game', 'profile', 'history', 'settings'].includes(currentRoute);
  const activeRoute = (!user && isProtectedRoute) ? 'login' : currentRoute;

  return (
    <div className={`min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950 ${activeRoute !== 'game' ? 'pb-16 md:pb-0' : 'pb-0'}`}>
      {/* Barra de Navegação Superior (com Início, Jogar, Histórico, Perfil, Ajustes e Botões de Entrar/Cadastrar) */}
      <Navbar
        currentRoute={activeRoute}
        setCurrentRoute={setCurrentRoute}
        hasOrientation={isSupported && (permissionGranted || orientation.gamma !== 0)}
        isCameraActive={false}
      />

      {/* Roteamento de Telas */}
      <main className="flex-1">
        {activeRoute === 'home' && (
          <Home
            onNavigate={setCurrentRoute}
            hasOrientation={isSupported}
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
          <div className="py-8">
            <Login 
              onNavigate={setCurrentRoute} 
              initialMode={activeRoute === 'register' ? 'register' : 'login'} 
            />
          </div>
        )}
      </main>

      {/* Rodapé da Aplicação */}
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
