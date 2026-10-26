import React, { useState } from 'react';
import { Button } from '../../../core/ui/Button.jsx';
import { Input } from '../../../core/ui/Input.jsx';
import { Mail, Lock, AlertCircle, ShieldAlert } from 'lucide-react';
import { useSecurity } from '../../../core/context/SecurityContext.jsx';

export const LoginForm = ({ onLogin, isLoading, errors, failedAttempts }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isRateLimited, retryAfter } = useSecurity();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {errors?.form && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {failedAttempts > 0 && !isRateLimited && (
        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center justify-between">
          <span>Failed attempts: {failedAttempts}/5</span>
          <span className="font-mono text-zinc-500">Worker Throttling Guard Active</span>
        </div>
      )}

      <Input
        label="Account Email"
        name="email"
        type="email"
        icon={Mail}
        placeholder="architect@aerostore.io"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors?.email}
        required
        disabled={isLoading || isRateLimited}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        icon={Lock}
        placeholder="••••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors?.password}
        required
        disabled={isLoading || isRateLimited}
      />

      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          isLoading={isLoading}
          disabled={isRateLimited}
        >
          {isRateLimited ? `Cooldown Active (${retryAfter}s)` : 'Sign In to Account'}
        </Button>
      </div>

      <p className="text-[11px] text-zinc-400 text-center font-mono">
        Protected by Cloudflare Worker Sliding-Window (Max 5/min)
      </p>
    </form>
  );
};

export default LoginForm;
