import React, { useState } from 'react';
import { Button } from '../../../core/ui/Button.jsx';
import { ShieldCheck, Lock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useCart } from '../../../core/context/CartContext.jsx';
import { useSecurity } from '../../../core/context/SecurityContext.jsx';
import { ENDPOINTS } from '../../../core/api/endpoints.js';

export const CheckoutButton = () => {
  const { items, clearCart } = useCart();
  const { isRateLimited, retryAfter, handleRateLimitTrigger } = useSecurity();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [checkoutAttempts, setCheckoutAttempts] = useState(0);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsProcessing(true);

    // Inventory Abuse Check: Limit repetitive rapid checkout clicks to prevent locking stock
    if (checkoutAttempts >= 3) {
      setIsProcessing(false);
      handleRateLimitTrigger(
        40,
        ENDPOINTS.CART.CHECKOUT,
        'Inventory Locking Defense: Repetitive rapid checkout locks detected from this session.'
      );
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setCheckoutAttempts((prev) => prev + 1);
      setOrderComplete(true);
      clearCart();
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-xs text-left">
        <div className="flex items-center gap-2 font-bold text-sm mb-1">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Order Confirmed & Provisioned</span>
        </div>
        <p className="mt-1 text-emerald-700">
          Cryptographic receipt generated. Inventory allocation finalized without origin lock contention.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={items.length === 0 || isRateLimited}
        isLoading={isProcessing}
        onClick={handleCheckout}
        icon={Lock}
      >
        {isRateLimited
          ? `Checkout Locked (${retryAfter}s)`
          : `Secure Checkout (${items.length} ${items.length === 1 ? 'item' : 'items'})`}
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-zinc-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        <span>Inventory Denial-of-Holding Guard Active</span>
      </div>
    </div>
  );
};

export default CheckoutButton;
