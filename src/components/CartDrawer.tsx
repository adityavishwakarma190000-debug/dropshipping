import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/currency';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onProceedToCheckout,
  onExploreProducts,
}) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    freeShippingThreshold,
    freeShippingRemaining,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const finalTotal = Math.max(0, subtotal - discount + shippingFee);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dark overlay backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 text-white shadow-2xl flex flex-col border-l border-zinc-800">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-black">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-boat-red" />
              <h2 className="text-base sm:text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Your Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-400" />
                {freeShippingRemaining > 0 ? (
                  <span>
                    Add <strong className="text-white">{formatINR(freeShippingRemaining)}</strong> more for Free Delivery!
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> FREE Pan-India Shipping Unlocked!
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-zinc-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-boat-red rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-950">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center text-zinc-600 border border-zinc-800">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg">Your cart is empty</h3>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xs font-medium">
                    Explore our curated drops and discover flagship ANC audio, workspace ergonomics, and lifestyle gear.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onExploreProducts();
                  }}
                  className="px-6 py-3 bg-white hover:bg-boat-red hover:text-white text-black rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant.id}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 transition"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-zinc-800 flex-shrink-0 bg-black"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-extrabold text-xs sm:text-sm text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant.id)}
                          className="text-zinc-500 hover:text-red-400 p-1 rounded transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-medium">
                        Color: <span className="font-bold text-zinc-200">{item.selectedVariant.name}</span>
                      </p>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-black text-sm text-white">
                        {formatINR(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center border border-zinc-800 rounded-lg overflow-hidden bg-black">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVariant.id, item.quantity - 1)
                          }
                          className="px-2.5 py-0.5 text-xs font-black text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-black text-white min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedVariant.id, item.quantity + 1)
                          }
                          className="px-2.5 py-0.5 text-xs font-black text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-800 bg-black space-y-4">
              
              {/* Coupon input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <Tag className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono">{couponCode}</span> applied!
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-emerald-400 hover:text-red-400 font-bold text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 text-white rounded-xl uppercase font-mono tracking-wider focus:outline-none focus:border-zinc-600 placeholder-zinc-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white hover:bg-boat-red hover:text-white text-black rounded-xl text-xs font-black uppercase tracking-wider transition"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && !couponCode && (
                  <p className={`text-[11px] mt-1 font-bold ${couponFeedback.success ? 'text-emerald-400' : 'text-red-400'}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs text-zinc-400 font-medium">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-bold text-white">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Pan-India)</span>
                  {shippingFee === 0 ? (
                    <span className="font-black text-emerald-400">FREE</span>
                  ) : (
                    <span className="font-bold text-white">{formatINR(shippingFee)}</span>
                  )}
                </div>
                <div className="pt-2 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Payable</span>
                  <span className="text-xl font-black text-white">{formatINR(finalTotal)}</span>
                </div>
                <p className="text-[10px] text-zinc-500">Inclusive of all taxes &amp; GST</p>
              </div>

              {/* Trust Badge in Cart */}
              <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400 pt-1 font-bold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Razorpay 256-Bit SSL
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-zinc-300">
                  COD Available
                </span>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-boat-red hover:bg-boat-redHover text-white font-black text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/20 transition-all uppercase tracking-wider flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Indian Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
