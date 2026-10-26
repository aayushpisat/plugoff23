/**
 * Global Validation & Schema Helpers
 */

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return null;
};

export const validateContactForm = (values) => {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please enter your name';
  }

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  if (!values.message || values.message.trim().length < 5) {
    errors.message = 'Please share a few details';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const formatCurrency = (amount, currency = 'INR') => {
  const num = Number(amount) || 0;
  if (currency === 'INR') {
    return `₹${num.toLocaleString('en-IN')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num);
};
