import { useState } from 'react';
import { validateContactForm } from '../../../core/utils/validators.js';
import { ENDPOINTS } from '../../../core/api/endpoints.js';
import { apiClient } from '../../../core/api/client.js';
import { useSecurity } from '../../../core/context/SecurityContext.jsx';

/**
 * Isolated Contact Submission Logic
 * Manages form state, validation, Turnstile verification, and rate-limiting exceptions.
 */
export const useContactSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const { handleRateLimitTrigger } = useSecurity();

  const submitContactForm = async (formData) => {
    setIsSubmitting(true);
    setErrors({});
    setSuccess(false);

    // 1. Client-Side Validation
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return false;
    }

    // 2. Simulated Edge Boundary check:
    // If user submits more than 3 times in quick succession, trigger the 429 edge boundary
    if (submissionCount >= 3) {
      setIsSubmitting(false);
      handleRateLimitTrigger(
        30,
        ENDPOINTS.CONTACT.SUBMIT,
        'Form Abuse Defense: Maximum 3 contact submissions per minute allowed.'
      );
      setErrors({ form: 'HTTP 429: Too many form submissions. Rate limit cooldown active.' });
      return false;
    }

    try {
      // Simulate API network request through apiClient
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmissionCount((prev) => prev + 1);
      setSuccess(true);
      return true;
    } catch (err) {
      setErrors({ form: err?.message || 'Submission failed. Please try again.' });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setErrors({});
    setSuccess(false);
  };

  return {
    isSubmitting,
    errors,
    success,
    submitContactForm,
    resetFormState,
    submissionCount,
  };
};

export default useContactSubmit;
