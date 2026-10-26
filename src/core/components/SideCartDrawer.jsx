import React, { useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatCurrency } from '../utils/validators.js';

export const SideCartDrawer = ({ navigate }) => {
  const { 
    items, 
    isSideCartOpen, 
    closeSideCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalCount, 
    subtotal, 
    tax, 
    shipping, 
    total 
  } = useCart();

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSideCartOpen) {
        closeSideCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSideCartOpen, closeSideCart]);

  // Lock body scroll when side cart is open
  useEffect(() => {
    if (isSideCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideCartOpen]);

  if (!isSideCartOpen) return null;

  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckoutClick = () => {
    closeSideCart();
    navigate('/cart');
  };

  const handleBrowseProducts = () => {
    closeSideCart();
    navigate('/products');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="side-cart-title"
    >
      {/* Backdrop */}
      <div 
        onClick={closeSideCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn cursor-pointer"
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slideLeft">
          
          {/* Header */}
          <div className="px-6 py-5 bg-[#073c2d] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#fde02f]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 id="side-cart-title" className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Your Cart
                  <span className="text-xs bg-[#fde02f] text-[#093528] font-bold px-2 py-0.5 rounded-full">
                    {totalCount} {totalCount === 1 ? 'item' : 'items'}
                  </span>
                </h2>
                <p className="text-xs text-emerald-100/70">Plugoff Mindful Offline Essentials</p>
              </div>
            </div>

            <button
              onClick={closeSideCart}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#f6f9f7] px-6 py-3 border-b border-zinc-200">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {remainingForFreeShipping > 0 ? (
                <span className="text-zinc-700">
                  Add <strong className="text-[#073c2d]">{formatCurrency(remainingForFreeShipping)}</strong> more for <strong className="text-[#073c2d]">FREE Shipping</strong>
                </span>
              ) : (
                <span className="text-[#073c2d] font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  You've unlocked FREE Shipping!
                </span>
              )}
              <span className="text-zinc-400 font-mono text-[11px]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-[#073c2d] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-zinc-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-[#073c2d] mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-zinc-500 max-w-xs">
                  Discover our kits, journals, and tools designed to help families unplug and connect.
                </p>
                <button
                  onClick={handleBrowseProducts}
                  className="mt-6 inline-flex items-center gap-2 bg-[#fde02f] hover:bg-[#fad81d] text-[#093528] font-bold px-6 py-3 rounded-full text-sm shadow-sm transition-all"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-4 py-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-3 group">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-zinc-100 border border-zinc-200 overflow-hidden flex-shrink-0 relative">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-[#073c2d]">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-zinc-900 leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-zinc-400 hover:text-rose-600 transition-colors p-1 -mr-1"
                            title="Remove item"
                            aria-label={`Remove ${item.title}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {item.category || 'Mindful Living'}
                        </p>
                        {item.freebies && item.freebies.length > 0 && (
                          <div className="mt-2 p-2 bg-[#f4f8f5] rounded-lg border border-[#073c2d]/10 text-left">
                            <span className="text-[11px] font-bold text-[#073c2d] flex items-center gap-1">
                              🎁 Included Goodies (2):
                            </span>
                            <ul className="mt-1 space-y-0.5">
                              {item.freebies.map((freebie, idx) => (
                                <li key={idx} className="text-[11px] text-[#073c2d]/90 flex items-center gap-1.5 font-medium">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#f8d468] flex-shrink-0" />
                                  <span className="truncate">{freebie}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-zinc-600 hover:bg-zinc-200 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold font-mono text-zinc-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-zinc-600 hover:bg-zinc-200 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-zinc-900">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[11px] text-zinc-400">
                              {formatCurrency(item.price)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-zinc-50 border-t border-zinc-200 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-zinc-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-zinc-900">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span className="font-mono text-zinc-900">
                    {shipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatCurrency(shipping)}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-200 flex justify-between text-base font-bold text-zinc-900">
                  <span>Total</span>
                  <span className="font-mono text-[#073c2d]">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full flex items-center justify-center gap-2 bg-[#fde02f] hover:bg-[#fad81d] text-[#093528] font-bold py-3.5 px-4 rounded-full shadow-sm hover:shadow transition-all text-sm active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => {
                      closeSideCart();
                      navigate('/cart');
                    }}
                    className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 underline"
                  >
                    View detailed cart
                  </button>

                  <button
                    onClick={clearCart}
                    className="text-xs font-medium text-zinc-400 hover:text-rose-600"
                  >
                    Clear cart
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-day happiness guarantee & mindful returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SideCartDrawer;
