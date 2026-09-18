import React, { useState, useEffect } from 'react';
import { 
  KeyRound, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export function ForgotPassword({ onNavigate }) {
  const { resetPassword, updateUserPassword, isSupabaseConfigured } = useAuth();

  // Se a URL contiver hash de recuperação (#recovery ou access_token com type=recovery)
  const [isResettingPassword, setIsResettingPassword] = useState(
    window.location.hash.includes('recovery') || window.location.hash.includes('type=recovery')
  );

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Escuta alterações na hash da URL para abrir automaticamente o modo de redefinição
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.includes('recovery') || window.location.hash.includes('type=recovery')) {
        setIsResettingPassword(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Enviar link de recuperação de senha
  const handleRequestReset = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!email) {
        throw new Error('Por favor, informe seu e-mail cadastrado.');
      }

      const res = await resetPassword(email);
      setSuccessMsg(
        res.message || 'Link de recuperação enviado com sucesso! Verifique sua caixa de entrada e spam.'
      );
    } catch (err) {
      console.error('Erro ao solicitar redefinição de senha:', err);
      setErrorMsg(err.message || 'Falha ao enviar e-mail de recuperação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Salvar a nova senha
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword.length < 6) {
      setErrorMsg('A nova senha deve possuir pelo menos 6 caracteres.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('As senhas digitadas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      await updateUserPassword(newPassword);
      setSuccessMsg('Sua senha foi redefinida com sucesso! Redirecionando para o login...');
      setTimeout(() => {
        window.location.hash = '';
        onNavigate('login');
      }, 1500);
    } catch (err) {
      console.error('Erro ao atualizar senha:', err);
      setErrorMsg(err.message || 'Não foi possível atualizar sua senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:py-14">
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        {/* Cabeçalho */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 mx-auto flex items-center justify-center shadow-lg shadow-orange-500/20">
            {isResettingPassword ? (
              <Lock className="w-6 h-6 text-slate-950" />
            ) : (
              <KeyRound className="w-6 h-6 text-slate-950" />
            )}
          </div>
          <h2 className="text-2xl font-black text-slate-100">
            {isResettingPassword ? 'Criar Nova Senha' : 'Recuperar Acesso'}
          </h2>
          <p className="text-xs text-slate-400">
            {isResettingPassword
              ? 'Digite sua nova senha de acesso para o JumpBall.'
              : 'Informe seu e-mail cadastrado para receber as instruções de recuperação.'}
          </p>
        </div>

        {/* Mensagens de Alerta / Sucesso */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Formulário 1: Solicitar link de e-mail */}
        {!isResettingPassword ? (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">E-mail Cadastrado</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu-email@exemplo.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>Enviar Link de Recuperação</span>
                </>
              )}
            </button>

            {/* Alternador manual para modo de redefinição direta */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setIsResettingPassword(true);
                }}
                className="text-[11px] text-slate-500 hover:text-orange-400 transition-colors"
              >
                Já possui código ou deseja redefinir agora? Clique aqui
              </button>
            </div>
          </form>
        ) : (
          /* Formulário 2: Definir nova senha */
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Nova Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo de 6 caracteres"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                  aria-label={showPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirmar Nova Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a nova senha"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 focus:outline-none"
                  aria-label={showConfirmPassword ? 'Ocultar senha' : 'Ver senha'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Salvar Nova Senha</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setIsResettingPassword(false);
                }}
                className="text-[11px] text-slate-500 hover:text-orange-400 transition-colors"
              >
                ← Voltar para envio do link por e-mail
              </button>
            </div>
          </form>
        )}

        {/* Rodapé do Card - Voltar para Login */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 font-medium py-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Lembrou da senha? Voltar para o Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}
