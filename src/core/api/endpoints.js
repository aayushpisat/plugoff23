/**
 * Central API Route Dictionary
 * All network access endpoints are registered here for consistency.
 */

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id) => `/api/products/${id}`,
    CATEGORIES: '/api/products/categories',
  },
  CART: {
    GET: '/api/cart',
    UPDATE: '/api/cart/items',
    CHECKOUT: '/api/checkout',
  },
  CONTACT: {
    SUBMIT: '/api/contact',
  },
  BLOG: {
    LIST: '/api/blog/posts',
    DETAIL: (slug) => `/api/blog/posts/${slug}`,
  },
};

export default ENDPOINTS;
