import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck } from 'lucide-react';
import { Button } from '../../../core/ui/Button.jsx';
import { useCart } from '../../../core/context/CartContext.jsx';
import { formatCurrency } from '../../../core/utils/validators.js';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="group rounded-2xl border border-zinc-200 bg-white overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:border-zinc-300 text-left">
      <div className="relative aspect-[4/3] bg-zinc-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-900 text-white shadow-sm">
            {product.badge}
          </span>
        )}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-white/90 backdrop-blur text-zinc-700 border border-zinc-200">
          {product.sku}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-medium text-emerald-700">{product.category}</span>
            <span>{product.stock} in stock</span>
          </div>

          <h3 className="text-base font-bold text-zinc-900 leading-snug group-hover:text-zinc-700 transition-colors">
            {product.title}
          </h3>

          <p className="mt-2 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
          <div className="text-lg font-bold font-mono text-zinc-900">
            {formatCurrency(product.price)}
          </div>

          <Button
            size="sm"
            variant={justAdded ? 'secondary' : 'primary'}
            onClick={handleAddToCart}
            className={justAdded ? 'text-emerald-700 border-emerald-300' : ''}
            icon={justAdded ? Check : ShoppingBag}
          >
            {justAdded ? 'Added' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
