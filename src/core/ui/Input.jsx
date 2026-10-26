import React from 'react';

/**
 * Atomic Input Token
 * Handles label, error state, placeholder, and disabled styling.
 */
export const Input = React.forwardRef(
  (
    {
      label,
      error,
      hint,
      id,
      name,
      type = 'text',
      className = '',
      icon: Icon,
      required = false,
      ...props
    },
    ref
  ) => {
    const inputId = id || name || Math.random().toString(36).substring(7);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-zinc-700 tracking-wide flex items-center justify-between"
          >
            <span>
              {label} {required && <span className="text-rose-500">*</span>}
            </span>
            {hint && <span className="text-zinc-400 font-normal">{hint}</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3 text-zinc-400 pointer-events-none flex items-center">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <input
            id={inputId}
            name={name}
            type={type}
            ref={ref}
            required={required}
            className={`w-full rounded-lg border bg-white px-3.5 py-2 text-sm text-zinc-900 transition-colors placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-zinc-50 disabled:text-zinc-500 ${
              Icon ? 'pl-9' : ''
            } ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                : 'border-zinc-300 hover:border-zinc-400 focus:border-zinc-900 focus:ring-zinc-200'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p className="text-xs text-rose-600 font-medium animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
