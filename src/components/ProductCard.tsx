import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Truck, Check } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { formatINR, calculateDiscount, calculateSavings } from '../utils/currency';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetail }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const savingsAmount = calculateSavings(product.price, product.originalPrice);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  return (
    <div
      onClick={() => onOpenDetail(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-zinc-950 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer text-white"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full bg-black overflow-hidden border-b border-zinc-800/80">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges (boAt Black Edition Style) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          {discountPercent > 0 && (
            <span className="bg-boat-red text-white font-black text-xs px-2.5 py-0.5 rounded shadow uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-zinc-900 border border-zinc-700 text-white font-extrabold text-[10px] px-2 py-0.5 rounded shadow uppercase tracking-wider">
              ★ Bestseller
            </span>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-black/90 backdrop-blur-md px-2 py-0.5 rounded-md shadow border border-zinc-700 text-xs font-bold text-white">
            <span>{product.rating}</span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-zinc-400 font-normal">| {product.reviewCount}</span>
          </div>
        </div>

        {/* Low Stock Warning */}
        {product.stockLeft <= 15 && (
          <div className="absolute bottom-2 left-2 right-2 bg-black/90 text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-lg flex items-center justify-between border border-amber-400/20 backdrop-blur-sm">
            <span>Only {product.stockLeft} units left in stock!</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-zinc-950">
        <div>
          {/* Category Tag */}
          <span className="text-[10px] font-extrabold tracking-wider text-boat-red uppercase">
            {product.category === 'audio' ? 'Wireless Audio' : product.category === 'workspace' ? 'Smart Workspace' : 'Lifestyle Tech'}
          </span>

          {/* Product Title */}
          <h3 className="font-extrabold text-base text-white group-hover:text-boat-red transition-colors line-clamp-1 mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-medium">
            {product.tagline}
          </p>
        </div>

        {/* Color Variant Swatches */}
        {product.variants.length > 1 && (
          <div className="flex items-center gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] text-zinc-400 font-bold">Color:</span>
            <div className="flex items-center gap-1.5">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedVariant.id === variant.id
                      ? 'border-boat-red scale-125 ring-2 ring-red-500/40 shadow'
                      : 'border-zinc-700 hover:scale-110'
                  }`}
                  style={{ backgroundColor: variant.colorHex || '#333' }}
                  title={variant.name}
                  aria-label={variant.name}
                />
              ))}
            </div>
            <span className="text-[11px] text-zinc-300 font-extrabold truncate ml-1">
              {selectedVariant.name}
            </span>
          </div>
        )}

        {/* Pricing in INR */}
        <div className="pt-2 border-t border-zinc-800">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black text-white">
              {formatINR(product.price)}
            </span>
            <span className="text-xs text-zinc-500 line-through font-semibold">
              {formatINR(product.originalPrice)}
            </span>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              Save {formatINR(savingsAmount)}
            </span>
          </div>
          <div className="text-[10px] font-bold text-zinc-500 mt-0.5">
            Inclusive of all taxes &amp; GST
          </div>
        </div>

        {/* Badges: COD & Delivery */}
        <div className="flex items-center justify-between text-xs py-1.5 bg-zinc-900 px-2.5 rounded-lg border border-zinc-800">
          <span className="flex items-center gap-1 text-zinc-300 font-bold">
            <Truck className="w-3.5 h-3.5 text-blue-400" /> Free Pan-India Delivery
          </span>
          <span className="text-emerald-400 font-black">
            COD Available
          </span>
        </div>

        {/* Quick Add To Cart Button: Clean White on Dark Canvas */}
        <button
          onClick={handleQuickAdd}
          className={`w-full py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow uppercase tracking-wide ${
            isAddedRecently
              ? 'bg-deal-green text-white'
              : 'bg-white hover:bg-boat-red text-black hover:text-white'
          }`}
        >
          {isAddedRecently ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
