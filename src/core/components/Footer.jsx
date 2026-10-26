import React, { useState } from 'react';
import { Mail, MapPin, Instagram, Linkedin, Youtube, ArrowRight, Check } from 'lucide-react';

/**
 * Global PlugOFF Footer
 * 
 * Accurately replicates the PlugOFF brand footer:
 * - Brand wordmark "PlugOFF" & tagline "Disconnect to reconnect."
 * - Illustrated 2-prong power plug with full-width wavy green cord.
 * - Quick Links, Contact info with location & social icons.
 * - "Stay in the loop" newsletter signup.
 * - Copyright & legal links.
 */
export const Footer = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const handleScrollToFaq = () => {
    if (window.location.pathname !== '/') {
      navigate?.('/');
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 100);
    } else {
      const faqElem = document.querySelector('section[aria-label="Frequently Asked Questions"]');
      if (faqElem) {
        faqElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      className="relative w-full bg-white text-[#093c2d] overflow-hidden pt-16 sm:pt-20 pb-8 selection:bg-[#f6e474] selection:text-[#093c2d] bg-no-repeat bg-bottom bg-cover"
      style={{
        backgroundImage: "url('/assets/footer-bg.png')",
        backgroundPosition: 'bottom center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 items-start relative z-10">
          
          {/* COLUMN 1: Brand & Wordmark */}
          <div className="md:col-span-4 lg:col-span-4 text-left">
            {/* PlugOFF Logo */}
            <div
              onClick={() => navigate?.('/')}
              className="cursor-pointer inline-block"
            >
              <h2 className="text-5xl sm:text-6xl font-black tracking-tight text-[#093c2d] font-sans leading-none">
                Plug<span className="tracking-tighter">OFF</span>
              </h2>
            </div>
            
            <p className="mt-3 text-sm sm:text-base text-[#093c2d]/85 font-medium tracking-wide">
              Disconnect to reconnect.
            </p>
          </div>

          {/* COLUMN 2: QUICK LINKS */}
          <div className="md:col-span-2 lg:col-span-2 text-left">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#093c2d] uppercase block font-sans mb-4 sm:mb-5">
              QUICK LINKS
            </span>

            <ul className="space-y-3 text-sm sm:text-[15px] font-medium text-[#093c2d]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate?.('/')}
                  className="hover:opacity-75 transition-opacity cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate?.('/about')}
                  className="hover:opacity-75 transition-opacity cursor-pointer"
                >
                  About PlugOFF
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate?.('/products')}
                  className="hover:opacity-75 transition-opacity cursor-pointer"
                >
                  The Course
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate?.('/blog')}
                  className="hover:opacity-75 transition-opacity cursor-pointer"
                >
                  Resources
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleScrollToFaq}
                  className="hover:opacity-75 transition-opacity cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate?.('/contact')}
                  className="hover:opacity-75 transition-opacity cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: CONTACT & SOCIALS */}
          <div className="md:col-span-3 lg:col-span-3 text-left">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#093c2d] uppercase block font-sans mb-4 sm:mb-5">
              CONTACT
            </span>

            {/* Direct Contact */}
            <div className="space-y-3 text-sm sm:text-[15px] font-medium text-[#093c2d]">
              <a
                href="mailto:hello@plugoff.in"
                className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
              >
                <Mail className="w-4 h-4 stroke-[2]" />
                <span>hello@plugoff.in</span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 stroke-[2]" />
                <span>Mumbai, India</span>
              </div>
            </div>

            {/* Yellow Horizontal Divider */}
            <div className="h-[1.5px] w-48 sm:w-56 bg-[#f6e474] my-5" />

            {/* Social Links */}
            <div className="space-y-3 text-sm sm:text-[15px] font-medium text-[#093c2d]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
              >
                <Instagram className="w-4 h-4 stroke-[2]" />
                <span>Instagram</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
              >
                <Linkedin className="w-4 h-4 stroke-[2]" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
              >
                <Youtube className="w-4 h-4 stroke-[2]" />
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* COLUMN 4: STAY IN THE LOOP (Newsletter) */}
          <div className="md:col-span-3 lg:col-span-3 text-left">
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#093c2d] uppercase block font-sans mb-3 sm:mb-4">
              STAY IN THE LOOP
            </span>

            <p className="text-sm sm:text-[15px] text-[#093c2d]/85 font-normal leading-relaxed">
              Get updates, resources and more ways to bring balance home.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4">
              <div>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#093c2d]/40 text-[#093c2d] placeholder:text-[#093c2d]/50 text-sm focus:outline-none focus:border-[#093c2d] bg-white transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 px-6 rounded-full bg-[#f6e474] hover:bg-[#fad040] text-[#093c2d] font-bold text-xs sm:text-[13px] tracking-wider uppercase flex items-center justify-center gap-2 transition-transform active:scale-95 cursor-pointer shadow-sm"
              >
                {isSubscribed ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>SUBSCRIBED!</span>
                  </>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* BOTTOM LEGAL BAR */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full mt-16 sm:mt-24 md:mt-32 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-[13px] text-[#093c2d]/80 font-normal gap-3">
        <p>© 2026 PlugOFF. All rights reserved.</p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate?.('/about')}
            className="hover:underline cursor-pointer"
          >
            Privacy Policy
          </button>
          <span className="text-[#093c2d]/40">|</span>
          <button
            type="button"
            onClick={() => navigate?.('/about')}
            className="hover:underline cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
