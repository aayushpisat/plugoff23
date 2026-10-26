import { useState, useCallback } from 'react';
import { validateEmail, validatePassword } from '../../../core/utils/validators.js';
import { ENDPOINTS } from '../../../core/api/endpoints.js';
import { apiClient } from '../../../core/api/client.js';
import { useSecurity } from '../../../core/context/SecurityContext.jsx';

/**
 * Isolated Auth Actions Hook
 * Centralizes Login and Register form dispatches with credential stuffing mitigation.
 */
export const useAuthActions = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [authErrors, setAuthErrors] = useState({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { handleRateLimitTrigger } = useSecurity();

  const handleLogin = useCallback(
    async (email, password) => {
      setIsLoading(true);
      setAuthErrors({});

      const emailErr = validateEmail(email);
      const passErr = !password ? 'Password is required' : null;

      if (emailErr || passErr) {
        setAuthErrors({
          email: emailErr,
          password: passErr,
        });
        setIsLoading(false);
        return false;
      }

      // Credential stuffing boundary check:
      // Worker threshold is 5 attempts / min
      if (failedAttempts >= 4) {
        setIsLoading(false);
        handleRateLimitTrigger(
          45,
          ENDPOINTS.AUTH.LOGIN,
          'Credential Stuffing Boundary: Maximum 5 authentication attempts per minute exceeded.'
        );
        setAuthErrors({
          form: 'HTTP 429: Too many failed login attempts. Security lock engaged.',
        });
        return false;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock verification
        if (password === 'WrongPassword123') {
          setFailedAttempts((prev) => prev + 1);
          setAuthErrors({ form: 'Invalid email or password credentials.' });
          return false;
        }

        const user = {
          email,
          name: email.split('@')[0],
          role: 'Architect',
          token: `jwt-${Math.random().toString(36).substring(2)}`,
        };

        localStorage.setItem('auth_token', user.token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        setCurrentUser(user);
        setFailedAttempts(0);
        return true;
      } catch (err) {
        setAuthErrors({ form: err?.message || 'Login failed.' });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [failedAttempts, handleRateLimitTrigger]
  );

  const handleRegister = useCallback(
    async (name, email, password) => {
      setIsLoading(true);
      setAuthErrors({});

      const emailErr = validateEmail(email);
      const passErr = validatePassword(password);
      const nameErr = !name || name.trim().length < 2 ? 'Name is required' : null;

      if (emailErr || passErr || nameErr) {
        setAuthErrors({
          name: nameErr,
          email: emailErr,
          password: passErr,
        });
        setIsLoading(false);
        return false;
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 900));

        const user = {
          name,
          email,
          role: 'Architect',
          token: `jwt-${Math.random().toString(36).substring(2)}`,
        };

        localStorage.setItem('auth_token', user.token);
        localStorage.setItem('auth_user', JSON.stringify(user));
        setCurrentUser(user);
        return true;
      } catch (err) {
        setAuthErrors({ form: err?.message || 'Registration failed.' });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setCurrentUser(null);
  }, []);

  return {
    currentUser,
    isLoading,
    authErrors,
    failedAttempts,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};

export default useAuthActions;
