/**
 * Centralized HTTP & Network Configuration
 * Axios client configured with global 429 error interceptors.
 */

import axios from 'axios';

// Instantiate primary client
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach Auth Token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Intercept 429 Rate Limits and Network Faults
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 
        error.response.data?.retryAfter || 30;

      const rateLimitDetails = {
        status: 429,
        endpoint: error.config?.url || 'unknown',
        retryAfter: parseInt(retryAfter, 10),
        message: error.response.data?.message || 'Rate limit exceeded. Please wait.',
      };

      // Broadcast globally for SecurityContext and UI overlay
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('security:rate-limited', { detail: rateLimitDetails })
        );
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
