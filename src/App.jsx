import React, { useState, useEffect } from 'react';
import { SecurityProvider } from './core/context/SecurityContext.jsx';
import { CartProvider } from './core/context/CartContext.jsx';
import { Layout } from './core/components/Layout.jsx';
import { AppRoutes } from './routes/AppRoutes.jsx';

/**
 * App Entry Wrapper
 * Integrates Context Providers (Cart, Security) and Router mapping layer.
 */
export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      return hash || window.location.pathname || '/';
    }
    return '/';
  });

  // Sync route on popstate and hashchange
  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      const path = hash || window.location.pathname || '/';
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigate = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  return (
    <SecurityProvider>
      <CartProvider>
        <Layout currentPath={currentPath} navigate={navigate}>
          <AppRoutes currentPath={currentPath} navigate={navigate} />
        </Layout>
      </CartProvider>
    </SecurityProvider>
  );
}
