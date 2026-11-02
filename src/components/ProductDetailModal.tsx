import React, { useState } from 'react';
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ShoppingBag,
  Zap,
  MapPin,
  Tag,
  CheckCircle2,
  Package,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { formatINR, calculateDiscount, calculateSavings } from '../utils/currency';
import { lookupPincode } from '../data/pincodes';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product, variant: ProductVariant, quantity: number) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onBuyNow,
  allProducts,
  onSelectProduct,
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState('560001');
  const [pincodeResult, setPincodeResult] = useState(lookupPincode('560001'));
  const [activeTab, setActiveTab] = useState<'highlights' | 'specs' | 'box' | 'shipping'>('highlights');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = calculateDiscount(product.price, product.originalPrice);
  const savings = calculateSavings(product.price, product.originalPrice);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const res = lookupPincode(pincodeInput);
    setPincodeResult(res);
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleDirectBuyNow = () => {
    onBuyNow(product, selectedVariant, quantity);
  };

  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-zinc-950 text-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col border border-zinc-800">
        
        {/* Sticky Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/95 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-zinc-400 truncate mr-4">
            <span className="font-extrabold text-boat-red uppercase tracking-wider text-[10px] bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
              {product.category}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="truncate text-zinc-200 font-bold">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square rounded-2xl bg-black overflow-hidden border border-zinc-800 shadow-inner">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-300"
                />

                {discountPercent > 0 && (
                  <div className="absolute top-4 left-4 bg-boat-red text-white font-black text-xs px-2.5 py-1 rounded-md shadow uppercase tracking-wide">
                    {discountPercent}% OFF
                  </div>
                )}

                <div className="absolute top-4 right-4 bg-zinc-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-zinc-700">
                  Demo Drop
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 bg-black ${
                      selectedImageIndex === idx
                        ? 'border-boat-red ring-2 ring-red-500/30'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} preview ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Verified Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-zinc-400">
                <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                  <span className="font-extrabold text-white">100% Genuine</span>
                  <span className="text-[10px] text-zinc-500">Direct Dropship</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center">
                  <RotateCcw className="w-4 h-4 text-boat-red mb-1" />
                  <span className="font-extrabold text-white">7-Day Return</span>
                  <span className="text-[10px] text-zinc-500">Easy Replacement</span>
                </div>
                <div className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col items-center">
                  <Truck className="w-4 h-4 text-blue-400 mb-1" />
                  <span className="font-extrabold text-white">Free Express</span>
                  <span className="text-[10px] text-zinc-500">On Orders &gt; ₹999</span>
                </div>
              </div>
            </div>

            {/* Right Column: Buying Details & Checkout */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                {/* Star rating */}
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-black text-white ml-1 text-sm">{product.rating}</span>
                  </div>
                  <span>•</span>
                  <span className="text-zinc-300 font-semibold">{product.reviewCount} customer reviews</span>
                  <span>•</span>
                  <span className="text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] font-bold border border-emerald-500/30">
                    In Stock ({product.stockLeft} left)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white mt-2 font-['Plus_Jakarta_Sans',sans-serif] leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-zinc-400 mt-1 font-medium">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Savings Pill (Dark Edition) */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {formatINR(product.price)}
                  </span>
                  <span className="text-base text-zinc-500 line-through font-semibold">
                    {formatINR(product.originalPrice)}
                  </span>
                  <span className="bg-boat-red text-white text-xs font-black px-2 py-1 rounded-md uppercase">
                    {discountPercent}% OFF
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded-md border border-emerald-500/30">
                    You Save {formatINR(savings)}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 flex items-center gap-2 font-medium">
                  <span>Inclusive of all GST &amp; taxes.</span>
                  <span className="text-zinc-700">•</span>
                  <span className="text-emerald-400 font-bold">Free Pan-India delivery</span>
                </div>
              </div>

              {/* Color / Variant Swatch Selector */}
              {product.variants.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-300">
                      Color / Edition: <span className="text-white font-extrabold">{selectedVariant.name}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 transition ${
                          selectedVariant.id === v.id
                            ? 'border-boat-red bg-red-950/30 shadow'
                            : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                          style={{ backgroundColor: v.colorHex || '#333' }}
                        />
                        <span className="text-xs font-bold text-zinc-200">{v.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-zinc-300">Quantity:</span>
                <div className="flex items-center border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 font-black transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-black text-white min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockLeft, quantity + 1))}
                    className="px-3.5 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 font-black transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-zinc-400 font-medium">
                  (Total: <strong className="text-white">{formatINR(product.price * quantity)}</strong>)
                </span>
              </div>

              {/* Conversion Buttons: Add To Cart & Buy Now */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 border-2 transition uppercase tracking-wider ${
                    addedAnimation
                      ? 'bg-deal-green text-white border-deal-green'
                      : 'border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDirectBuyNow}
                  className="w-full py-4 px-6 bg-boat-red hover:bg-boat-redHover text-white font-black text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>Buy Now (Instant Checkout)</span>
                </button>
              </div>

              {/* Indian PIN Code Delivery & COD Checker (Dark Edition) */}
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <MapPin className="w-4 h-4 text-boat-red" />
                  <span>Delivery &amp; COD Availability Checker</span>
                </div>
                
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN Code"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-black text-white rounded-xl border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-boat-red font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white hover:bg-boat-red hover:text-white text-black text-xs font-black rounded-xl whitespace-nowrap transition uppercase tracking-wide"
                  >
                    Check
                  </button>
                </form>

                {pincodeResult ? (
                  <div className="space-y-1.5 text-xs text-zinc-300 pt-1">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>
                        Delivery available to {pincodeResult.city}, {pincodeResult.state}
                      </span>
                    </div>
                    <div className="text-zinc-400 pl-5">
                      • Estimated delivery: <strong className="text-white">{pincodeResult.deliveryDays} business days</strong>
                    </div>
                    <div className="text-zinc-400 pl-5">
                      • Cash on Delivery (COD): <strong className="text-emerald-400">Available at this PIN</strong>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-red-400">
                    Please enter a valid 6-digit Indian PIN code (e.g. 560001, 110001, 400001).
                  </p>
                )}
              </div>

              {/* Available Discount Coupons Promo */}
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-amber-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Use code WELCOME10</span> for extra 10% off
                  </div>
                </div>
                <span className="font-mono bg-black px-2 py-0.5 rounded border border-amber-400/40 font-bold text-[11px] text-amber-400">
                  WELCOME10
                </span>
              </div>

            </div>
          </div>

          {/* Deep Tabs: Description, Highlights, Specs, Box, Returns */}
          <div className="pt-8 border-t border-zinc-800">
            <div className="flex items-center gap-3 border-b border-zinc-800 overflow-x-auto pb-px">
              {[
                { id: 'highlights', label: 'Key Highlights', icon: Star },
                { id: 'specs', label: 'Technical Specs', icon: Layers },
                { id: 'box', label: "What's in the Box", icon: Package },
                { id: 'shipping', label: 'Shipping & Returns', icon: Truck },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 pb-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition ${
                      activeTab === tab.id
                        ? 'border-boat-red text-boat-red'
                        : 'border-transparent text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              {activeTab === 'highlights' && (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {product.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-200 bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <tbody className="divide-y divide-zinc-800">
                      {Object.entries(product.specs).map(([k, v]) => (
                        <tr key={k} className="hover:bg-zinc-900/60">
                          <td className="py-2.5 px-3 font-semibold text-zinc-400 bg-zinc-900/40 w-1/3">
                            {k}
                          </td>
                          <td className="py-2.5 px-3 text-white font-medium">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'box' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.inTheBox.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs sm:text-sm font-medium text-white">
                      <div className="w-6 h-6 rounded-lg bg-zinc-800 text-boat-red flex items-center justify-center font-black text-xs border border-zinc-700">
                        {idx + 1}
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4 text-xs sm:text-sm text-zinc-300">
                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <h4 className="font-extrabold text-white">7-Day Free Doorstep Replacement</h4>
                    <p className="text-zinc-400">
                      If your item arrives with any defect, malfunction, or shipping damage, we provide a 100% free doorstep replacement pickup. Simply contact our WhatsApp or email support with your Order ID and photo evidence within 7 days of delivery.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                    <h4 className="font-extrabold text-white">Logistics &amp; Courier Partners</h4>
                    <p className="text-zinc-400">
                      All orders are dispatched within 24 hours of confirmation. We partner with Tier-1 Indian courier services including BlueDart, Delhivery, Xpressbees, and DTDC. Real-time SMS and WhatsApp tracking links are dispatched once the parcel is handed over.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="pt-8 border-t border-zinc-800">
              <h3 className="text-base sm:text-lg font-black text-white mb-4 font-['Plus_Jakarta_Sans',sans-serif]">
                Frequently Bought Together
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedImageIndex(0);
                      setSelectedVariant(rel.variants[0]);
                    }}
                    className="flex items-center gap-4 p-3 bg-zinc-900 hover:bg-zinc-800/80 rounded-2xl border border-zinc-800 transition cursor-pointer group"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-16 h-16 rounded-xl object-cover border border-zinc-800 group-hover:scale-105 transition"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-white truncate group-hover:text-boat-red transition">
                        {rel.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400 truncate">{rel.tagline}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-black text-sm text-white">{formatINR(rel.price)}</span>
                        <span className="text-[11px] text-zinc-500 line-through">{formatINR(rel.originalPrice)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
