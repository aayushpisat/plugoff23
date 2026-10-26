import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SecurityContext = createContext(null);

export const SecurityProvider = ({ children }) => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [retryAfter, setRetryAfter] = useState(0);
  const [blockedEndpoint, setBlockedEndpoint] = useState('');
  const [blockReason, setBlockReason] = useState('');
  const [showBlockSheet, setShowBlockSheet] = useState(false);
  const [ipAddress] = useState('198.51.100.42'); // Simulated client IP
  const [totalViolations, setTotalViolations] = useState(0);

  // Trigger rate limit state
  const handleRateLimitTrigger = useCallback((seconds = 30, endpoint = '/api/checkout', reason = 'Too Many Requests from this IP/JWT session') => {
    setIsRateLimited(true);
    setRetryAfter(seconds);
    setBlockedEndpoint(endpoint);
    setBlockReason(reason);
    setShowBlockSheet(true);
    setTotalViolations((prev) => prev + 1);
  }, []);

  // Countdown timer for 429 cooldown
  useEffect(() => {
    let interval = null;
    if (isRateLimited && retryAfter > 0) {
      interval = setInterval(() => {
        setRetryAfter((prev) => {
          if (prev <= 1) {
            setIsRateLimited(false);
            setShowBlockSheet(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRateLimited, retryAfter]);

  // Listen for global axios client 429 events
  useEffect(() => {
    const handleAxiosRateLimit = (event) => {
      const { retryAfter: seconds, endpoint, message } = event.detail || {};
      handleRateLimitTrigger(seconds || 25, endpoint, message);
    };

    window.addEventListener('security:rate-limited', handleAxiosRateLimit);
    return () => {
      window.removeEventListener('security:rate-limited', handleAxiosRateLimit);
    };
  }, [handleRateLimitTrigger]);

  const dismissBlockSheet = () => {
    setShowBlockSheet(false);
  };

  const simulate429Test = (endpoint = '/api/auth/login') => {
    handleRateLimitTrigger(
      20,
      endpoint,
      'Automated rate-limiter worker test triggered via developer toolbar.'
    );
  };

  return (
    <SecurityContext.Provider
      value={{
        isRateLimited,
        retryAfter,
        blockedEndpoint,
        blockReason,
        showBlockSheet,
        setShowBlockSheet,
        dismissBlockSheet,
        handleRateLimitTrigger,
        simulate429Test,
        ipAddress,
        totalViolations,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

export default SecurityContext;
