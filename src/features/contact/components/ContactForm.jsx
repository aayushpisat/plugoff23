import React, { useState } from 'react';
import { useContactSubmit } from '../hooks/useContactSubmit.js';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm = () => {
  const { isSubmitting, errors, success, submitContactForm, resetFormState } =
    useContactSubmit();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submitContactForm(formData);
    if (ok) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Decorative Binder Clip - accurately matching the reference image */}
      <div 
        className="absolute -top-7 sm:-top-9 left-6 sm:left-12 z-20 pointer-events-none drop-shadow-md select-none"
        aria-hidden="true"
      >
        <svg
          width="54"
          height="68"
          viewBox="0 0 54 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 sm:w-14 h-auto"
        >
          {/* Metal Wire Handles (Looping upward) */}
          <path
            d="M17 38V12C17 6.47715 21.4772 2 27 2C32.5228 2 37 6.47715 37 12V38"
            stroke="#c8bca2"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M17 38V12C17 6.47715 21.4772 2 27 2C32.5228 2 37 6.47715 37 12V38"
            stroke="#9f8b6c"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Inner silver wire highlight */}
          <path
            d="M18.5 36V12.5C18.5 7.80558 22.3056 4 27 4C31.6944 4 35.5 7.80558 35.5 12.5V36"
            stroke="#ece4d4"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Clip Body Base Shadow */}
          <rect
            x="4"
            y="32"
            width="46"
            height="32"
            rx="3"
            fill="#05281e"
          />

          {/* Clip Main Dark Green Body */}
          <path
            d="M5 33H49L46 64H8L5 33Z"
            fill="#093f2f"
          />
          {/* Clip Front Metallic Highlights */}
          <path
            d="M7 35H47L44.5 62H9.5L7 35Z"
            fill="#0c4a37"
          />
          <line
            x1="27"
            y1="34"
            x2="27"
            y2="63"
            stroke="#073225"
            strokeWidth="1.5"
          />
          {/* Top Edge Rim */}
          <rect
            x="4"
            y="31"
            width="46"
            height="4"
            rx="2"
            fill="#0d553e"
          />
          <rect
            x="5"
            y="31.5"
            width="44"
            height="1.5"
            rx="0.75"
            fill="#1b7356"
          />
        </svg>
      </div>

      {/* Main Form Paper Card */}
      <div className="bg-[#fcfbf7] border border-[#e6e2d6] rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-[0_12px_40px_rgba(7,60,45,0.06)] relative text-left">
        {success && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <span>Message sent! Thank you for reaching out, we will get back to you shortly.</span>
            </div>
            <button
              onClick={resetFormState}
              className="text-emerald-900 font-bold underline hover:no-underline ml-4 text-xs"
            >
              Send another
            </button>
          </div>
        )}

        {errors.form && (
          <div className="mb-8 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
          {/* YOUR NAME */}
          <div>
            <label 
              htmlFor="contact-name"
              className="block text-xs sm:text-[13px] font-bold tracking-[0.1em] text-[#073c2d] uppercase mb-2 font-sans"
            >
              YOUR NAME
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={isSubmitting}
              className={`w-full rounded-xl border ${
                errors.name ? 'border-rose-500' : 'border-[#073c2d]/40 focus:border-[#073c2d]'
              } bg-transparent px-4 sm:px-5 py-3.5 sm:py-4 text-[#073c2d] placeholder-[#073c2d]/40 font-medium text-sm sm:text-base outline-none transition-colors focus:ring-1 focus:ring-[#073c2d]`}
            />
            {errors.name && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label 
              htmlFor="contact-email"
              className="block text-xs sm:text-[13px] font-bold tracking-[0.1em] text-[#073c2d] uppercase mb-2 font-sans"
            >
              EMAIL
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={isSubmitting}
              className={`w-full rounded-xl border ${
                errors.email ? 'border-rose-500' : 'border-[#073c2d]/40 focus:border-[#073c2d]'
              } bg-transparent px-4 sm:px-5 py-3.5 sm:py-4 text-[#073c2d] placeholder-[#073c2d]/40 font-medium text-sm sm:text-base outline-none transition-colors focus:ring-1 focus:ring-[#073c2d]`}
            />
            {errors.email && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          {/* PHONE NUMBER (OPTIONAL) */}
          <div>
            <label 
              htmlFor="contact-phone"
              className="block text-xs sm:text-[13px] font-bold tracking-[0.1em] text-[#073c2d] uppercase mb-2 font-sans"
            >
              PHONE NUMBER <span className="text-[#073c2d]/50 font-semibold normal-case">(OPTIONAL)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              disabled={isSubmitting}
              className="w-full rounded-xl border border-[#073c2d]/40 focus:border-[#073c2d] bg-transparent px-4 sm:px-5 py-3.5 sm:py-4 text-[#073c2d] placeholder-[#073c2d]/40 font-medium text-sm sm:text-base outline-none transition-colors focus:ring-1 focus:ring-[#073c2d]"
            />
          </div>

          {/* TELL US ABOUT IT */}
          <div className="relative">
            <label 
              htmlFor="contact-message"
              className="block text-xs sm:text-[13px] font-bold tracking-[0.1em] text-[#073c2d] uppercase mb-2 font-sans"
            >
              TELL US ABOUT IT
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Share a few details..."
              disabled={isSubmitting}
              className={`w-full rounded-xl border ${
                errors.message ? 'border-rose-500' : 'border-[#073c2d]/40 focus:border-[#073c2d]'
              } bg-transparent px-4 sm:px-5 py-3.5 sm:py-4 text-[#073c2d] placeholder-[#073c2d]/40 font-medium text-sm sm:text-base outline-none transition-colors focus:ring-1 focus:ring-[#073c2d] resize-y`}
            />
            {errors.message && (
              <p className="text-xs text-rose-600 mt-1 font-medium">{errors.message}</p>
            )}
          </div>

          {/* SEND IT OUR WAY Button */}
          <div className="pt-2 sm:pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#fed000] hover:bg-[#fad000] active:bg-[#f2c600] text-[#073c2d] font-black text-sm sm:text-base tracking-[0.12em] uppercase py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl transition-all duration-150 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed select-none"
            >
              <span>{isSubmitting ? 'SENDING...' : 'SEND IT OUR WAY'}</span>
              <span className="text-lg leading-none font-bold">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
