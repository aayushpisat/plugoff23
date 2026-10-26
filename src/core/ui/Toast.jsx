import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

/**
 * Atomic Toast & Rate Limit Warning Component
 */
export const Toast = ({
  type = 'info', // 'info' | 'success' | 'warning' | 'error' | 'rate-limit'
  title,
  message,
  retryAfter,
  onClose,
  className = '',
}) => {
  const configs = {
    info: {
      bg: 'bg-zinc-900 text-white',
      border: 'border-zinc-800',
      icon: Info,
      iconColor: 'text-zinc-300',
    },
    success: {
      bg: 'bg-emerald-950 text-white',
      border: 'border-emerald-800',
      icon: CheckCircle,
      iconColor: 'text-emerald-400',
    },
    warning: {
      bg: 'bg-amber-950 text-white',
      border: 'border-amber-800',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
    },
    error: {
      bg: 'bg-rose-950 text-white',
      border: 'border-rose-800',
      icon: AlertCircle,
      iconColor: 'text-rose-400',
    },
    'rate-limit': {
      bg: 'bg-zinc-950 text-white',
      border: 'border-amber-500/50 shadow-xl shadow-amber-900/10',
      icon: AlertTriangle,
      iconColor: 'text-amber-400',
    },
  };

  const config = configs[type] || configs.info;
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={`relative flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur transition-all ${config.bg} ${config.border} ${className}`}
    >
      <div className="flex-shrink-0 pt-0.5">
        <Icon className={`w-5 h-5 ${config.iconColor}`} />
      </div>

      <div className="flex-1 text-left pr-4">
        {title && <h4 className="text-sm font-semibold tracking-tight">{title}</h4>}
        {message && (
          <p className="mt-0.5 text-xs text-zinc-300 leading-relaxed">{message}</p>
        )}
        {retryAfter !== undefined && retryAfter > 0 && (
          <div className="mt-2 flex items-center gap-2 text-xs font-mono text-amber-300">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Cooldown active: {retryAfter}s remaining</span>
          </div>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white transition-colors p-1 -mr-1 -mt-1 rounded-md focus:outline-none"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
