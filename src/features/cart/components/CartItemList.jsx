import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../../core/context/CartContext.jsx';
import { formatCurrency } from '../../../core/utils/validators.js';

export const CartItemList = () => {
  const { items, updateQuantity, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-500 text-sm">
        Your cart is currently empty.
      </div>
    );
  }

  return (
    <div className="divide-y divide-zinc-200">
      {items.map((item) => (
        <div key={item.id} className="py-4 sm:py-6 flex items-start gap-4 text-left">
          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-xl border border-zinc-200 flex-shrink-0 bg-zinc-100"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                  {item.sku}
                </span>
                <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                  {item.title}
                </h4>
                {item.freebies && item.freebies.length > 0 && (
                  <div className="mt-2 p-2 bg-[#f4f8f5] rounded-lg border border-[#073c2d]/10 text-left">
                    <span className="text-[11px] font-bold text-[#073c2d] flex items-center gap-1">
                      🎁 Included Goodies (2):
                    </span>
                    <ul className="mt-1 space-y-0.5">
                      {item.freebies.map((freebie, idx) => (
                        <li key={idx} className="text-[11px] text-[#073c2d]/90 flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#f8d468] flex-shrink-0" />
                          <span>{freebie}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-zinc-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between">
              {/* Quantity Selector */}
              <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1.5 text-zinc-600 hover:text-zinc-900 focus:outline-none"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold font-mono text-zinc-800">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1.5 text-zinc-600 hover:text-zinc-900 focus:outline-none"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right">
                <div className="text-xs text-zinc-400 font-mono">
                  {formatCurrency(item.price)} each
                </div>
                <div className="text-sm font-bold font-mono text-zinc-900">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItemList;
