import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  User,
  ShieldAlert
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useSecurity } from '../context/SecurityContext.jsx';

/**
 * Isolated Electric Plug Icon (Logo)
 * Stylized plug angled at 45° with two prongs and downward zigzag lightning cord.
 */
export const ElectricPlugIcon = ({ className = 'w-7 h-7' }) => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Prongs pointing top-right */}
      <rect x="23.5" y="4" width="2.4" height="6.2" rx="1.2" transform="rotate(45 23.5 4)" fill="currentColor" />
      <rect x="28" y="8.5" width="2.4" height="6.2" rx="1.2" transform="rotate(45 28 8.5)" fill="currentColor" />
      {/* Main plug body */}
      <rect x="13" y="11" width="13" height="10" rx="3.5" transform="rotate(45 13 11)" fill="currentColor" />
      {/* Zigzag lightning cord descending */}
      <path
        d="M 13.5 22.5 L 9.5 27.5 H 15.5 L 11 34"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Navbar = ({ currentPath = '/', navigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalCount, openSideCart } = useCart();
  const { isRateLimited, retryAfter } = useSecurity();

  // Track window scroll for reactive expansion / convergence animation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDarkHero = currentPath === '/blog' || currentPath === '/about' || currentPath === '/contact' || currentPath === '/';

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    openSideCart();
    setMobileMenuOpen(false);
  };

  const handleAccountClick = () => {
    navigate('/account');
    setMobileMenuOpen(false);
  };

  // Dynamic frosted glass styling based on scroll state & page context
  const pillGlassClasses = isScrolled
    ? 'bg-white/65 backdrop-blur-xl border border-white/50 text-[#093528] shadow-lg shadow-black/5'
    : isDarkHero
      ? 'bg-white/20 backdrop-blur-xl border border-white/35 text-white shadow-sm'
      : 'bg-white/75 backdrop-blur-xl border border-zinc-200/70 text-[#093528] shadow-sm';

  const textHoverColor = isScrolled
    ? 'hover:text-[#093528]/70'
    : isDarkHero
      ? 'hover:text-white/75'
      : 'hover:text-[#093528]/70';

  const activeIndicator = isScrolled || !isDarkHero
    ? 'font-extrabold text-[#093528]'
    : 'font-extrabold text-white';

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none flex flex-col items-center px-3 sm:px-5">
      {/* Edge Rate Limit Warning Bar (if active) */}
      {isRateLimited && (
        <div className="pointer-events-auto w-full max-w-4xl mt-2 bg-amber-500 text-zinc-950 px-4 py-1.5 text-xs font-medium rounded-full flex items-center justify-center gap-2 shadow-md">
          <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
          <span>
            Edge 429 Active: Requests throttled by Cloudflare Worker. Cooldown: {retryAfter}s
          </span>
        </div>
      )}

      {/* ========================================================
          FROSTED GLASS PILL NAVBAR
          - Top of page: Extends left-to-right with curved pill edges
          - When scrolled: Pops, converges slightly toward center (narrower),
            and increases tiny amount in height
         ======================================================== */}
      <div 
        className={`pointer-events-auto transition-all duration-300 ease-out rounded-full flex items-center justify-between px-6 sm:px-8 lg:px-12 select-none ${
          isScrolled
            ? 'mt-2.5 sm:mt-3.5 w-[92%] sm:w-[88%] lg:w-[82%] max-w-5xl h-[52px] sm:h-[56px] scale-[1.01]'
            : 'mt-2 sm:mt-2.5 w-[98%] sm:w-[98%] lg:w-[99%] max-w-7xl h-12 sm:h-[48px]'
        } ${pillGlassClasses}`}
      >
        
        {/* ========================================================
            MOBILE VIEW (md:hidden): ONLY LOGO & SIDEBAR MENU OPENER
           ======================================================== */}
        <div className="flex md:hidden items-center justify-between w-full">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('/')}
            className="focus:outline-none transition-transform hover:scale-105 active:scale-95 cursor-pointer bg-transparent border-none p-1 flex items-center"
            aria-label="Plugoff Home"
          >
            <ElectricPlugIcon className="w-6 h-6" />
          </button>

          {/* Sidebar Menu Opener */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none cursor-pointer bg-transparent border-none p-1.5 flex items-center justify-center transition-transform active:scale-90"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
          </button>
        </div>

        {/* ========================================================
            DESKTOP VIEW (hidden md:flex): EXACT REFERENCE LAYOUT
           ======================================================== */}
        {/* LEFT LINKS: ABOUT, BLOGS, CONTACT */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => handleNavClick('/about')}
              className={`text-xs sm:text-[13px] tracking-[0.16em] uppercase font-bold transition-opacity cursor-pointer bg-transparent border-none p-0 ${textHoverColor} ${
                currentPath === '/about' ? activeIndicator : 'opacity-90'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => handleNavClick('/blog')}
              className={`text-xs sm:text-[13px] tracking-[0.16em] uppercase font-bold transition-opacity cursor-pointer bg-transparent border-none p-0 ${textHoverColor} ${
                currentPath === '/blog' ? activeIndicator : 'opacity-90'
              }`}
            >
              BLOGS
            </button>
            <button
              onClick={() => handleNavClick('/contact')}
              className={`text-xs sm:text-[13px] tracking-[0.16em] uppercase font-bold transition-opacity cursor-pointer bg-transparent border-none p-0 ${textHoverColor} ${
                currentPath === '/contact' ? activeIndicator : 'opacity-90'
              }`}
            >
              CONTACT
            </button>
          </nav>
        </div>

        {/* CENTER LOGO: Isolated Electric Plug Icon (Centered) */}
        <div className="hidden md:flex items-center justify-center">
          <button
            onClick={() => handleNavClick('/')}
            className="focus:outline-none transition-transform hover:scale-110 active:scale-95 cursor-pointer bg-transparent border-none p-1.5"
            aria-label="Plugoff Home"
          >
            <ElectricPlugIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* RIGHT LINKS: PRODUCTS, CART BAG, ACCOUNT USER */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6 lg:gap-7">
          {/* PRODUCTS Text Button */}
          <button
            onClick={() => handleNavClick('/products')}
            className={`text-xs sm:text-[13px] tracking-[0.16em] uppercase font-bold transition-opacity cursor-pointer bg-transparent border-none p-0 ${textHoverColor} ${
              currentPath === '/products' ? activeIndicator : 'opacity-90'
            }`}
          >
            PRODUCTS
          </button>

          {/* Shopping Bag Icon Button (Cart) */}
          <button
            onClick={handleCartClick}
            className={`transition-opacity cursor-pointer bg-transparent border-none p-1 flex items-center relative ${textHoverColor}`}
            aria-label={`Open Cart with ${totalCount} items`}
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.85]" />
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[10px] font-black w-4 h-4 rounded-full bg-[#fde02f] text-[#093528] flex items-center justify-center shadow-xs">
                {totalCount}
              </span>
            )}
          </button>

          {/* User Account Icon Button */}
          <button
            onClick={handleAccountClick}
            className={`transition-opacity cursor-pointer bg-transparent border-none p-1 flex items-center ${textHoverColor}`}
            title="My Account"
            aria-label="Account"
          >
            <User className="w-5 h-5 stroke-[1.85]" />
          </button>
        </div>

      </div>

      {/* ========================================================
          MOBILE MENU FROSTED CARD
         ======================================================== */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mt-2 w-[92%] max-w-sm rounded-3xl bg-white/95 backdrop-blur-2xl text-[#093528] p-5 shadow-2xl border border-zinc-200/80 animate-fadeIn space-y-3">
          <button
            onClick={() => handleNavClick('/')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase transition-opacity hover:opacity-75 bg-transparent border-none"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('/about')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase transition-opacity hover:opacity-75 bg-transparent border-none"
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('/blog')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase transition-opacity hover:opacity-75 bg-transparent border-none"
          >
            Blogs
          </button>
          <button
            onClick={() => handleNavClick('/contact')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase transition-opacity hover:opacity-75 bg-transparent border-none"
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick('/products')}
            className="block w-full text-left py-2 text-sm font-bold tracking-wider uppercase transition-opacity hover:opacity-75 bg-transparent border-none"
          >
            Products
          </button>
          <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
            <button
              onClick={handleCartClick}
              className="py-1.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-75 bg-transparent border-none flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({totalCount})</span>
            </button>
            <button
              onClick={handleAccountClick}
              className="py-1.5 text-xs font-bold uppercase tracking-wider transition-opacity hover:opacity-75 bg-transparent border-none flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Account</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
