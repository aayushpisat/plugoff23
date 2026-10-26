import React from 'react';
import { CartItemList } from './components/CartItemList.jsx';
import { CheckoutButton } from './components/CheckoutButton.jsx';
import { useCart } from '../../core/context/CartContext.jsx';
import { formatCurrency } from '../../core/utils/validators.js';
import { ShoppingBag, ArrowLeft, Shield, Zap } from 'lucide-react';
import { Button } from '../../core/ui/Button.jsx';

export const Cart = ({ navigate }) => {
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 font-semibold">
            Cart & Checkout Feature (Inventory Abuses)
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mt-1">
            Shopping Cart & Order Summary
          </h1>
        </div>

        {items.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-zinc-500 hover:text-rose-600 self-start sm:self-auto"
          >
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-100 mx-auto flex items-center justify-center text-zinc-400 mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">Your Cart is Empty</h2>
          <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto">
            Explore our enterprise edge routing and security appliances to add hardware items to your checkout.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/products')}
              icon={ArrowLeft}
            >
              Browse Catalogue
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Item List Column */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-zinc-900 mb-2">
              Reserved Items ({items.length})
            </h3>
            <CartItemList />
          </div>

          {/* Order Summary & Security Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-6 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 pb-4 border-b border-zinc-200">
                Order Breakdown
              </h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono text-zinc-900">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Edge Courier Shipping</span>
                  <span className="font-mono text-zinc-900">
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex justify-between text-base font-bold text-zinc-900">
                  <span>Estimated Total</span>
                  <span className="font-mono">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-200">
                <CheckoutButton />
              </div>
            </div>

            {/* Inventory Boundary Info Card */}
            <div className="rounded-xl border border-zinc-200 bg-white p-4 text-xs text-zinc-600 flex items-start gap-3">
              <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-zinc-900">Edge Inventory Holding Policy</p>
                <p className="mt-0.5 text-zinc-500">
                  Temporary item reservations expire if checkout requests exceed the rate limit threshold (10 req/min) defined in <code className="font-mono text-zinc-700">wrangler.toml</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
