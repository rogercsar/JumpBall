import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  XCircle, 
  X, 
  Sparkles 
} from 'lucide-react';

const DialogContext = createContext(null);

export function DialogProvider({ children }) {
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: 'alert', // 'alert' | 'confirm' | 'prompt'
    variant: 'info', // 'info' | 'success' | 'warning' | 'error'
    title: '',
    message: '',
    confirmText: 'Entendido',
    cancelText: 'Cancelar',
    inputValue: '',
    inputPlaceholder: '',
    resolve: null
  });

  // Fecha o diálogo e resolve a Promise
  const handleClose = useCallback((result = false) => {
    if (dialog.resolve) {
      dialog.resolve(result);
    }
    setDialog((prev) => ({ ...prev, isOpen: false, resolve: null }));
  }, [dialog.resolve]);

  // Exibe um diálogo de Alerta customizado
  const showAlert = useCallback(({ 
    title = 'Aviso da Plataforma', 
    message = '', 
    variant = 'info', 
    confirmText = 'Entendido' 
  }) => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        type: 'alert',
        variant,
        title,
        message,
        confirmText,
        cancelText: 'Cancelar',
        inputValue: '',
        inputPlaceholder: '',
        resolve
      });
    });
  }, []);

  // Exibe um diálogo de Confirmação customizado
  const showConfirm = useCallback(({ 
    title = 'Confirmação', 
    message = 'Deseja continuar?', 
    variant = 'warning', 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar' 
  }) => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        type: 'confirm',
        variant,
        title,
        message,
        confirmText,
        cancelText,
        inputValue: '',
        inputPlaceholder: '',
        resolve
      });
    });
  }, []);

  // Exibe um diálogo de Entrada de Texto (Prompt) customizado
  const showPrompt = useCallback(({ 
    title = 'Informe o valor', 
    message = '', 
    defaultValue = '', 
    placeholder = '', 
    confirmText = 'Salvar', 
    cancelText = 'Cancelar' 
  }) => {
    return new Promise((resolve) => {
      setDialog({
        isOpen: true,
        type: 'prompt',
        variant: 'info',
        title,
        message,
        confirmText,
        cancelText,
        inputValue: defaultValue,
        inputPlaceholder: placeholder,
        resolve
      });
    });
  }, []);

  // Polyfill opcional para interceptar chamadas nativas do navegador window.alert, window.confirm, window.prompt
  useEffect(() => {
    const originalAlert = window.alert;
    const originalConfirm = window.confirm;
    const originalPrompt = window.prompt;

    window.alert = (msg) => {
      showAlert({ title: 'Aviso JumpBall', message: String(msg), variant: 'info' });
    };

    window.confirm = (msg) => {
      // Nota: chamadas síncronas nativas de confirm não pausam JS assíncrono no React moderno,
      // mas alertamos e retornamos true
      showConfirm({ title: 'Confirmação', message: String(msg), variant: 'warning' });
      return true;
    };

    window.prompt = (msg, def) => {
      showPrompt({ title: 'Entrada de Dados', message: String(msg), defaultValue: def || '' });
      return def || null;
    };

    return () => {
      window.alert = originalAlert;
      window.confirm = originalConfirm;
      window.prompt = originalPrompt;
    };
  }, [showAlert, showConfirm, showPrompt]);

  // Configuração visual de ícones e cores por variante
  const getVariantStyle = (variant) => {
    switch (variant) {
      case 'success':
        return {
          icon: CheckCircle2,
          iconColor: 'text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/30',
          buttonColor: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950',
          glow: 'shadow-emerald-500/20'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          iconColor: 'text-amber-400',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/30',
          buttonColor: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950',
          glow: 'shadow-amber-500/20'
        };
      case 'error':
        return {
          icon: XCircle,
          iconColor: 'text-rose-400',
          bgColor: 'bg-rose-500/10',
          borderColor: 'border-rose-500/30',
          buttonColor: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white',
          glow: 'shadow-rose-500/20'
        };
      default:
        return {
          icon: Info,
          iconColor: 'text-cyan-400',
          bgColor: 'bg-cyan-500/10',
          borderColor: 'border-cyan-500/30',
          buttonColor: 'bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-slate-950',
          glow: 'shadow-cyan-500/20'
        };
    }
  };

  const style = getVariantStyle(dialog.variant);
  const IconComponent = style.icon;

  return (
    <DialogContext.Provider value={{ showAlert, showConfirm, showPrompt, isDialogOpen: dialog.isOpen }}>
      {children}

      {/* Modal Próprio da Plataforma JumpBall */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop escurecido com Blur */}
          <div 
            onClick={() => handleClose(false)}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-fade-in"
          />

          {/* Janela de Diálogo Customizada */}
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-7 border border-slate-700/80 shadow-2xl bg-slate-900/95 z-10 space-y-5 animate-scale-up">
            {/* Glow de ambientação no topo */}
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 ${style.bgColor} blur-2xl pointer-events-none`} />

            {/* Cabeçalho */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl ${style.bgColor} ${style.borderColor} border flex items-center justify-center shrink-0`}>
                  <IconComponent className={`w-6 h-6 ${style.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white leading-snug">
                    {dialog.title}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Mensagem do Sistema
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleClose(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensagem do Diálogo */}
            <div className="text-sm text-slate-300 leading-relaxed pl-1">
              {dialog.message}
            </div>

            {/* Input para modo Prompt */}
            {dialog.type === 'prompt' && (
              <div className="pt-1">
                <input
                  type="text"
                  autoFocus
                  value={dialog.inputValue}
                  placeholder={dialog.inputPlaceholder}
                  onChange={(e) => setDialog((prev) => ({ ...prev, inputValue: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleClose(dialog.inputValue);
                    if (e.key === 'Escape') handleClose(null);
                  }}
                  className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            )}

            {/* Botões de Ação */}
            <div className="flex items-center justify-end gap-3 pt-2">
              {(dialog.type === 'confirm' || dialog.type === 'prompt') && (
                <button
                  type="button"
                  onClick={() => handleClose(dialog.type === 'prompt' ? null : false)}
                  className="px-5 py-2.5 rounded-xl glass-card text-xs font-bold text-slate-300 hover:text-white border border-slate-700/80 hover:bg-slate-800 transition-all"
                >
                  {dialog.cancelText}
                </button>
              )}

              <button
                type="button"
                onClick={() => handleClose(dialog.type === 'prompt' ? dialog.inputValue : true)}
                className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg ${style.buttonColor} ${style.glow} active:scale-95 transition-all`}
              >
                {dialog.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog deve ser utilizado dentro de um DialogProvider');
  }
  return context;
}
