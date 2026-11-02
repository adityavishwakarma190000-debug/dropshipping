import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Volume2,
  Sun,
  Droplets,
  Flame,
} from 'lucide-react';
import { Product } from '../types';
import { formatINR, calculateDiscount, calculateSavings } from '../utils/currency';

interface HeroProps {
  products: Product[];
  onOpenProductDetail: (product: Product) => void;
  onScrollToProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  products,
  onOpenProductDetail,
  onScrollToProducts,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const currentProduct = products[activeSlideIndex] || products[0];
  const discountPercent = calculateDiscount(currentProduct.price, currentProduct.originalPrice);
  const savingsAmount = calculateSavings(currentProduct.price, currentProduct.originalPrice);

  const dropHeadlines: Record<string, { kicker: string; main: string; highlightWord: string; subtitle: string; icon: any }> = {
    'aurapro-x-earbuds': {
      kicker: "INDIA'S #1 HYBRID ANC DROP",
      main: 'Studio Silence. Pure Indian Thunder.',
      highlightWord: 'Pure Indian Thunder.',
      subtitle: 'Engineered with 42dB Hybrid Active Noise Cancellation to silence busy metro commutes and traffic drone. 40 hours playtime with Type-C Fast Charge.',
      icon: Volume2,
    },
    'lumina-arc-desk-lamp': {
      kicker: 'ARCHITECTURAL DESK UPGRADE',
      main: 'Natural Light. Zero Eye Fatigue.',
      highlightWord: 'Zero Eye Fatigue.',
      subtitle: 'CRI 95+ flicker-free natural spectrum illumination engineered for long screen sessions. Features an integrated 15W Qi wireless phone charger in the base.',
      icon: Sun,
    },
    'hydropulse-thermal-bottle': {
      kicker: 'SURGICAL STEEL SMART DRINKWARE',
      main: 'Intelligent Hydration. 24H Arctic Chill.',
      highlightWord: '24H Arctic Chill.',
      subtitle: 'Medical-grade SUS 316 double-wall steel with an OLED touch temperature lid. Keeps your hydration ice-cold in extreme Indian weather.',
      icon: Droplets,
    },
  };

  const currentCopy = dropHeadlines[currentProduct.id] || {
    kicker: 'FEATURED DROP',
    main: 'Engineered for Performance. Built for India.',
    highlightWord: 'Built for India.',
    subtitle: currentProduct.description,
    icon: Flame,
  };

  const IconComponent = currentCopy.icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % products.length);
      setSelectedVariantIndex(0);
    }, 8000);
    return () => clearInterval(timer);
  }, [products.length]);

  return (
    <section className="relative bg-[#0a0a0a] border-b border-zinc-800 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Drop Category Selector Tabs (Dark Edition) */}
        <div className="flex items-center justify-center sm:justify-start">
          <div className="inline-flex items-center p-1 rounded-xl bg-zinc-950 border border-zinc-800 shadow-sm gap-1 overflow-x-auto max-w-full">
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveSlideIndex(idx);
                  setSelectedVariantIndex(0);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeSlideIndex === idx
                    ? 'bg-zinc-900 text-white border border-zinc-700 shadow-sm font-extrabold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <span className="font-mono text-[10px] text-zinc-500">0{idx + 1}</span>
                <span>{p.name.split(' ')[0]}</span>
                {activeSlideIndex === idx && (
                  <span className="w-2 h-2 rounded-full bg-boat-red ml-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Hero Grid: Solid Black Aesthetic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Direct Commercial Sales Copy & High-Contrast CTAs (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            
            {/* Badges: Kicker & Star Rating */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-red-950/60 text-red-400 text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider border border-red-800/60">
                <Flame className="w-3.5 h-3.5 text-boat-red" />
                {currentCopy.kicker}
              </span>

              <div className="inline-flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-1 text-xs text-zinc-200 shadow-sm font-bold">
                <span className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </span>
                <span className="text-white font-extrabold">{currentProduct.rating} / 5</span>
                <span className="text-zinc-700">•</span>
                <span className="text-zinc-400 font-semibold">{currentProduct.reviewCount} Verified Buyers</span>
              </div>
            </div>

            {/* Main Headline: Solid White & boAt Red */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif] leading-[1.12]">
              {currentCopy.main.replace(currentCopy.highlightWord, '')}
              <span className="text-boat-red block sm:inline"> {currentCopy.highlightWord}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {currentCopy.subtitle}
            </p>

            {/* Pricing Section (Dark Card with High Contrast) */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 shadow-sm inline-flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {formatINR(currentProduct.price)}
                </span>
                <span className="text-base text-zinc-500 line-through font-semibold">
                  {formatINR(currentProduct.originalPrice)}
                </span>
                <span className="bg-boat-red text-white font-black text-xs px-2.5 py-1 rounded uppercase tracking-wider">
                  {discountPercent}% OFF
                </span>
              </div>

              <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30">
                You Save {formatINR(savingsAmount)} Instant Cash
              </span>
            </div>

            {/* Variant Color Swatch */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <span className="text-xs font-bold text-zinc-400">Select Edition:</span>
              <div className="flex items-center gap-2 bg-zinc-950 px-2.5 py-1 rounded-lg border border-zinc-800 shadow-sm">
                {currentProduct.variants.map((v, vIdx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(vIdx)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedVariantIndex === vIdx
                        ? 'border-boat-red scale-110 ring-2 ring-red-500/40 shadow'
                        : 'border-zinc-700 hover:scale-105'
                    }`}
                    style={{ backgroundColor: v.colorHex || '#333' }}
                    title={v.name}
                  />
                ))}
              </div>
              <span className="text-xs font-extrabold text-white">
                {currentProduct.variants[selectedVariantIndex]?.name}
              </span>
            </div>

            {/* High-Converting Action CTAs: Solid boAt Red & Clean Dark Outline */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onOpenProductDetail(currentProduct)}
                className="w-full sm:w-auto px-8 py-4 bg-boat-red hover:bg-boat-redHover text-white font-black text-sm sm:text-base rounded-xl shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <span>Buy Now — {formatINR(currentProduct.price)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToProducts}
                className="w-full sm:w-auto px-6 py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm sm:text-base rounded-xl border border-zinc-700 transition flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4 text-zinc-400" />
                <span>View All 3 Drops</span>
              </button>
            </div>

            {/* Indian Trust Reassurance Strip */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs font-bold text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Free Pan-India Delivery (&gt; ₹999)</span>
              </span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cash on Delivery (COD)</span>
              </span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>1-Year Brand Warranty</span>
              </span>
            </div>

          </div>

          {/* Right Column: High-Contrast Product Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl p-4 sm:p-5 group">
              
              {/* Header Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-boat-red uppercase tracking-wider bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                  <Flame className="w-3.5 h-3.5" /> Drop 0{activeSlideIndex + 1} / 03
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Ready for Dispatch
                </span>
              </div>

              {/* Product Image Frame */}
              <div
                onClick={() => onOpenProductDetail(currentProduct)}
                className="relative aspect-square w-full rounded-xl overflow-hidden bg-black mt-3 cursor-pointer border border-zinc-800"
              >
                <img
                  src={currentProduct.images[0]}
                  alt={currentProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 bg-boat-red text-white text-xs font-black px-2.5 py-1 rounded shadow uppercase tracking-wide">
                  {discountPercent}% OFF
                </div>

                <div className="absolute top-3 right-3 bg-zinc-900/90 text-zinc-300 text-[10px] font-bold px-2.5 py-1 rounded shadow uppercase border border-zinc-700">
                  Sample Drop
                </div>

                {/* Bottom Scarcity Banner */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="bg-black/90 px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 border border-zinc-800">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Only {currentProduct.stockLeft} Left in Stock
                  </span>
                  <span className="bg-emerald-600 px-2.5 py-1 rounded-md text-[11px] font-black uppercase">
                    COD Available
                  </span>
                </div>
              </div>

              {/* Title & Quick Specs */}
              <div className="pt-4 space-y-3">
                <div onClick={() => onOpenProductDetail(currentProduct)} className="cursor-pointer">
                  <h3 className="font-black text-lg sm:text-xl text-white group-hover:text-boat-red transition font-['Plus_Jakarta_Sans',sans-serif] truncate">
                    {currentProduct.name}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate mt-0.5 font-medium">
                    {currentProduct.tagline}
                  </p>
                </div>

                {/* Key Spec Chips */}
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-zinc-300">
                  {currentProduct.highlights.slice(0, 2).map((h, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 truncate"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => onOpenProductDetail(currentProduct)}
                  className="w-full py-3 bg-zinc-900 hover:bg-white hover:text-black text-white font-black rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-1.5 uppercase tracking-wide border border-zinc-800"
                >
                  <span>Quick View &amp; Full Specs</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
