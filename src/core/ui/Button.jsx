import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Atomic Button Token
 * Handles visual variants and submission disabled/loading states.
 */
export const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 select-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

  const variants = {
    primary:
      'bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-zinc-900 shadow-sm border border-transparent',
    secondary:
      'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus:ring-zinc-400 border border-zinc-200',
    outline:
      'border border-zinc-300 bg-transparent text-zinc-800 hover:bg-zinc-50 focus:ring-zinc-400',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm border border-transparent',
    ghost:
      'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus:ring-zinc-300',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5',
  };

  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isButtonDisabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 text-current" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
