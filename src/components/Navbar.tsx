import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Truck, ShieldCheck, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenTrackOrder: () => void;
  onSelectCategory: (category: 'all' | 'audio' | 'workspace' | 'lifestyle') => void;
  activeCategory: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenTrackOrder,
  onSelectCategory,
  activeCategory,
  searchQuery,
  setSearchQuery,
}) => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'audio', label: 'Wireless Audio' },
    { id: 'workspace', label: 'Smart Desk' },
    { id: 'lifestyle', label: 'Lifestyle Tech' },
  ];

  const handleNavClick = (catId: 'all' | 'audio' | 'workspace' | 'lifestyle') => {
    onSelectCategory(catId);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800 shadow-lg transition-all">
      {/* Top Ticker: Deep Black Bar */}
      <div className="bg-black text-zinc-300 text-xs py-2 px-4 font-medium tracking-wide border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-4 mx-auto sm:mx-0">
            <span className="flex items-center gap-1.5 font-bold text-amber-400">
              <span>⚡ LAUNCH SALE:</span>
              <span className="text-zinc-200 font-normal">
                Extra 10% Off with code <strong className="bg-zinc-800 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold text-[11px] border border-zinc-700">WELCOME10</strong>
              </span>
            </span>
            <span className="hidden md:inline-block text-zinc-700">•</span>
            <span className="hidden md:flex items-center gap-1 text-zinc-400">
              <Truck className="w-3.5 h-3.5 text-emerald-400" /> Free Pan-India Delivery on orders &gt; ₹999
            </span>
            <span className="hidden lg:inline-block text-zinc-700">•</span>
            <span className="hidden lg:flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cash on Delivery (COD) Available
            </span>
          </div>

          <button
            onClick={onOpenTrackOrder}
            className="hidden sm:flex items-center gap-1 text-zinc-400 hover:text-white transition text-xs font-semibold underline underline-offset-2 ml-4 flex-shrink-0"
          >
            <MapPin className="w-3.5 h-3.5 text-boat-red" /> Track Order
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Mobile hamburger menu */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo: Obsidian Black & boAt Red Dot */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-black text-xl shadow group-hover:bg-boat-red group-hover:border-boat-red transition-all">
                Z
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-white group-hover:text-boat-red transition-colors font-['Plus_Jakarta_Sans',sans-serif]">
                  ZENITH<span className="text-boat-red">.</span>
                </span>
                <span className="text-[10px] font-extrabold tracking-widest text-zinc-500 uppercase -mt-1 flex items-center gap-1">
                  INDIA <span className="w-1.5 h-1.5 rounded-full bg-deal-green"></span> EST. 2026
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleNavClick(cat.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'text-white bg-zinc-900 border border-zinc-800 font-extrabold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
            <button
              onClick={onOpenTrackOrder}
              className="px-4 py-2 rounded-lg text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-boat-red" /> Track Order
            </button>
          </nav>

          {/* Right Action Icons: Search + Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Inline search bar (desktop) */}
            <div className="relative hidden md:block w-48 lg:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search earbuds, lamps, bottles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-zinc-900 hover:bg-zinc-800/80 focus:bg-black rounded-xl border border-zinc-800 focus:border-zinc-600 focus:outline-none transition font-medium text-white placeholder-zinc-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 md:hidden text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Trigger Button: Crisp White Button on Dark Canvas */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-white hover:bg-boat-red text-black hover:text-white px-4 py-2.5 rounded-xl font-black text-sm transition-all shadow-sm group"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-bold">Cart</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-boat-red group-hover:bg-white group-hover:text-boat-red text-white text-xs font-black rounded-full transition-colors">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer */}
        {searchOpen && (
          <div className="pb-3 md:hidden">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                autoFocus
                placeholder="Search products by name or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-900 text-white rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 placeholder-zinc-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-[#0a0a0a] px-4 pt-3 pb-5 space-y-2 shadow-2xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleNavClick(cat.id as any)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition ${
                activeCategory === cat.id
                  ? 'bg-zinc-900 text-boat-red font-black border border-zinc-800'
                  : 'text-zinc-300 hover:bg-zinc-900/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <div className="pt-2 border-t border-zinc-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrackOrder();
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-zinc-300 hover:bg-zinc-900/60 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-boat-red" /> Track My Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
