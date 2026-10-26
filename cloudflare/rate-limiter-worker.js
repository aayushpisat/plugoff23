/**
 * Cloudflare Worker: Edge Rate Limiter & Security Boundary
 * 
 * Protects vulnerable endpoints against:
 * 1. Credential Stuffing & Brute Force (/api/auth/*)
 * 2. Form Spam & Automated Abuse (/api/contact)
 * 3. Inventory Locking & Denial of Inventory (/api/checkout)
 * 
 * Supports:
 * - Client IP extraction (CF-Connecting-IP)
 * - JWT subject / Authorization header parsing
 * - Sliding window bucket counter
 * - Standard HTTP 429 Too Many Requests with Retry-After header
 */

// In-memory sliding window cache for Worker isolate lifecycle
const ipWindows = new Map();

/**
 * Check if request exceeds route threshold
 * @param {string} identifier - Client IP or User ID
 * @param {number} maxRequests - Max requests per window
 * @param {number} windowSeconds - Duration of window
 * @returns {{ allowed: boolean, remaining: number, resetIn: number }}
 */
function checkRateLimit(identifier, maxRequests, windowSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const userRecord = ipWindows.get(identifier) || { timestamps: [] };

  // Filter out timestamps outside the active sliding window
  const activeTimestamps = userRecord.timestamps.filter(
    (t) => now - t < windowSeconds
  );

  if (activeTimestamps.length >= maxRequests) {
    const oldest = activeTimestamps[0];
    const resetIn = Math.max(1, windowSeconds - (now - oldest));
    return { allowed: false, remaining: 0, resetIn };
  }

  activeTimestamps.push(now);
  ipWindows.set(identifier, { timestamps: activeTimestamps });

  return {
    allowed: true,
    remaining: maxRequests - activeTimestamps.length,
    resetIn: windowSeconds,
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Turnstile-Token',
        },
      });
    }

    // 1. Identify Client
    const clientIp = request.headers.get('CF-Connecting-IP') || '127.0.0.1';
    const authHeader = request.headers.get('Authorization') || '';
    
    // Derive rate limit key based on JWT or IP
    let identityKey = `ip:${clientIp}`;
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '').trim();
      identityKey = `user:${token.substring(0, 16)}`;
    }

    // 2. Determine Route Constraints
    let maxLimit = 60;
    let windowDuration = 60; // 60 seconds

    if (path.startsWith('/api/auth')) {
      // Sensitive endpoint: Credential stuffing mitigation
      maxLimit = parseInt(env?.AUTH_MAX_REQUESTS_PER_MINUTE || '5', 10);
    } else if (path.startsWith('/api/contact')) {
      // Sensitive endpoint: Form spam mitigation
      maxLimit = parseInt(env?.CONTACT_MAX_REQUESTS_PER_MINUTE || '3', 10);
    } else if (path.startsWith('/api/checkout')) {
      // Sensitive endpoint: Inventory holding mitigation
      maxLimit = parseInt(env?.CHECKOUT_MAX_REQUESTS_PER_MINUTE || '10', 10);
    }

    const { allowed, remaining, resetIn } = checkRateLimit(
      `${identityKey}:${path}`,
      maxLimit,
      windowDuration
    );

    // 3. Enforce Rate Limit Violation (HTTP 429)
    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: 'Too Many Requests',
          message: 'Rate limit exceeded on this endpoint. Please wait before retrying.',
          path: path,
          retryAfter: resetIn,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': String(resetIn),
            'X-RateLimit-Limit': String(maxLimit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(resetIn),
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Pass through to upstream or mock handler
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('X-RateLimit-Limit', String(maxLimit));
    newHeaders.set('X-RateLimit-Remaining', String(remaining));
    newHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
