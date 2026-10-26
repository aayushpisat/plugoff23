import React from 'react';
import { Navbar } from './Navbar.jsx';
import { Footer } from './Footer.jsx';
import { Toast } from '../ui/Toast.jsx';
import { useSecurity } from '../context/SecurityContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { ShieldAlert, RefreshCw, X, Shield, Lock } from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { SideCartDrawer } from './SideCartDrawer.jsx';

/**
 * Main Layout Shell
 * Wraps Navbar, Footer, Main Content, Toast Container, and Security 429 UX Block Sheet
 */
export const Layout = ({ children, currentPath = '/', navigate }) => {
  const { 
    isRateLimited, 
    retryAfter, 
    blockedEndpoint, 
    blockReason, 
    showBlockSheet, 
    dismissBlockSheet,
    ipAddress,
    totalViolations 
  } = useSecurity();

  const { notification } = useCart();

  const isDarkHero = currentPath === '/blog' || currentPath === '/about' || currentPath === '/contact' || currentPath === '/';

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
      {/* Global Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Content Area */}
      <main className={`flex-1 w-full flex flex-col ${isDarkHero ? '' : 'pt-20 sm:pt-24'}`}>
        {children}
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Global Interactive Side Cart Drawer */}
      <SideCartDrawer navigate={navigate} />

      {/* Cart Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
          <Toast
            type="success"
            title="Cart Updated"
            message={notification.message}
          />
        </div>
      )}

      {/* Global 429 / User Ban UX Block Sheet Modal */}
      {showBlockSheet && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white border border-zinc-200 shadow-2xl p-6 sm:p-8 text-left relative overflow-hidden">
            {/* Edge Security Header Graphic */}
            <div className="flex items-center gap-3 border-b border-zinc-100 pb-5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    HTTP 429 Too Many Requests
                  </span>
                  <span className="text-xs font-mono text-zinc-400">CF-Worker-Ratelimit</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mt-1">
                  Access Temporarily Throttled
                </h3>
              </div>
              <button
                onClick={dismissBlockSheet}
                className="text-zinc-400 hover:text-zinc-600 p-1.5 rounded-lg hover:bg-zinc-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Block Details */}
            <div className="mt-5 space-y-4">
              <p className="text-sm text-zinc-600 leading-relaxed">
                Our Cloudflare edge worker detected an unusually high velocity of requests originating from your session or IP address. To prevent automated abuse and safeguard inventory, access to protected operations is temporarily paused.
              </p>

              <div className="rounded-xl bg-zinc-50 border border-zinc-200 p-4 font-mono text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Origin Boundary:</span>
                  <span className="text-zinc-800 font-semibold">{blockedEndpoint || '/api/*'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Connecting IP:</span>
                  <span className="text-zinc-800 font-semibold">{ipAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Security Rule:</span>
                  <span className="text-zinc-800 font-semibold">Sliding-Window-Token-Bucket</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Total Violations:</span>
                  <span className="text-amber-600 font-bold">{totalViolations}</span>
                </div>
              </div>

              {/* Countdown Progress Card */}
              <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 animate-spin">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-900">
                      Edge Cooldown Window
                    </p>
                    <p className="text-xs text-amber-700">
                      Origin lock automatically lifts upon countdown expiration.
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-amber-900">
                    {retryAfter}s
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-end">
              <Button
                variant="secondary"
                size="md"
                onClick={dismissBlockSheet}
              >
                Acknowledge Warning
              </Button>
              <Button
                variant="primary"
                size="md"
                disabled={retryAfter > 0}
                onClick={dismissBlockSheet}
              >
                {retryAfter > 0 ? `Wait ${retryAfter}s` : 'Resume Access'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
