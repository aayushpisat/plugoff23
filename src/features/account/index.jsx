import React, { useState } from 'react';
import { LoginForm } from './components/LoginForm.jsx';
import { RegisterForm } from './components/RegisterForm.jsx';
import { useAuthActions } from './hooks/useAuthActions.js';
import { ShieldCheck, UserCheck, LogOut, Key, Lock, AlertTriangle } from 'lucide-react';
import { Button } from '../../core/ui/Button.jsx';
import { useSecurity } from '../../core/context/SecurityContext.jsx';

export const Account = () => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const {
    currentUser,
    isLoading,
    authErrors,
    failedAttempts,
    handleLogin,
    handleRegister,
    handleLogout,
  } = useAuthActions();

  const { simulate429Test } = useSecurity();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
            Credential Stuffing Vulnerability Boundary
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mt-2">
            Identity & Edge Access
          </h1>
          <p className="mt-2 text-xs text-zinc-500">
            Protected by Cloudflare Worker JWT/IP rate limiting rules (Max 5 attempts/min).
          </p>
        </div>

        {currentUser ? (
          /* Logged In View */
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 pb-6 border-b border-zinc-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">{currentUser.name}</h3>
                <p className="text-xs text-zinc-500 font-mono">{currentUser.email}</p>
              </div>
            </div>

            <div className="mt-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between p-3 rounded-lg bg-zinc-50">
                <span className="text-zinc-500">Session Role:</span>
                <span className="font-semibold text-zinc-800">{currentUser.role}</span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-zinc-50">
                <span className="text-zinc-500">Bearer Token:</span>
                <span className="font-semibold text-zinc-800 truncate max-w-[200px]">
                  {currentUser.token}
                </span>
              </div>
              <div className="flex justify-between p-3 rounded-lg bg-zinc-50">
                <span className="text-zinc-500">Edge Boundary State:</span>
                <span className="font-semibold text-emerald-600">Authenticated (JWT Bound)</span>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulate429Test('/api/auth/me')}
                className="text-amber-700 border-amber-300"
              >
                Test 429 On Session
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleLogout}
                icon={LogOut}
              >
                Log Out
              </Button>
            </div>
          </div>
        ) : (
          /* Authentication Forms */
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Tabs */}
            <div className="flex border-b border-zinc-200 mb-6">
              <button
                onClick={() => setTab('login')}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  tab === 'login'
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab('register')}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors ${
                  tab === 'register'
                    ? 'border-zinc-900 text-zinc-900'
                    : 'border-transparent text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Register
              </button>
            </div>

            {tab === 'login' ? (
              <LoginForm
                onLogin={handleLogin}
                isLoading={isLoading}
                errors={authErrors}
                failedAttempts={failedAttempts}
              />
            ) : (
              <RegisterForm
                onRegister={handleRegister}
                isLoading={isLoading}
                errors={authErrors}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
