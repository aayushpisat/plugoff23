import React from 'react';
import { Home } from '../features/home/index.jsx';
import { About } from '../features/about/index.jsx';
import { Contact } from '../features/contact/index.jsx';
import { ProductCatalogue } from '../features/product/index.jsx';
import { Blog } from '../features/blog/index.jsx';
import { Account } from '../features/account/index.jsx';
import { Cart } from '../features/cart/index.jsx';

/**
 * Application Routing Mapping Layer
 * Defines paths for /, /about, /cart, /products, /blog, /contact, /account
 */
export const AppRoutes = ({ currentPath = '/', navigate }) => {
  const normalizedPath = currentPath.toLowerCase().replace(/\/$/, '') || '/';

  switch (normalizedPath) {
    case '/':
      return <Home navigate={navigate} />;
    case '/about':
      return <About navigate={navigate} />;
    case '/contact':
      return <Contact navigate={navigate} />;
    case '/products':
      return <ProductCatalogue navigate={navigate} />;
    case '/blog':
      return <Blog navigate={navigate} />;
    case '/account':
      return <Account navigate={navigate} />;
    case '/cart':
      return <Cart navigate={navigate} />;
    default:
      return (
        <div className="py-20 text-center max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-zinc-900">404 - Route Not Found</h2>
          <p className="mt-2 text-sm text-zinc-500">
            The path <code className="font-mono text-zinc-800 bg-zinc-100 px-1 py-0.5 rounded">{currentPath}</code> does not exist on this edge instance.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Return to Home
          </button>
        </div>
      );
  }
};

export default AppRoutes;
