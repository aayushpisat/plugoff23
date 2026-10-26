import React, { useState } from 'react';
import { Button } from '../../../core/ui/Button.jsx';
import { Input } from '../../../core/ui/Input.jsx';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useSecurity } from '../../../core/context/SecurityContext.jsx';

export const RegisterForm = ({ onRegister, isLoading, errors }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isRateLimited, retryAfter } = useSecurity();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {errors?.form && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      <Input
        label="Full Name"
        name="name"
        icon={User}
        placeholder="Ada Lovelace"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors?.name}
        required
        disabled={isLoading || isRateLimited}
      />

      <Input
        label="Work Email"
        name="email"
        type="email"
        icon={Mail}
        placeholder="ada@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors?.email}
        required
        disabled={isLoading || isRateLimited}
      />

      <Input
        label="Master Password"
        name="password"
        type="password"
        icon={Lock}
        hint="Min 8 chars, 1 uppercase, 1 digit"
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
          {isRateLimited ? `Cooldown Active (${retryAfter}s)` : 'Create Edge Account'}
        </Button>
      </div>

      <p className="text-[11px] text-zinc-400 text-center font-mono">
        Zero-trust session generated with client-side Bearer JWT
      </p>
    </form>
  );
};

export default RegisterForm;
