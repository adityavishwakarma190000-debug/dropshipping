import React, { useState } from 'react';
import { SlidersHorizontal, Flame, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: 'all' | 'audio' | 'workspace' | 'lifestyle') => void;
  searchQuery: string;
  onOpenProductDetail: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onOpenProductDetail,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const categories = [
    { id: 'all', label: 'All Essentials' },
    { id: 'audio', label: 'Wireless Audio' },
    { id: 'workspace', label: 'Smart Desk' },
    { id: 'lifestyle', label: 'Lifestyle Tech' },
  ];

  return (
    <section id="products-section" className="py-12 sm:py-16 bg-[#0a0a0a] text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-boat-red font-black text-xs uppercase tracking-wider bg-red-950/60 px-2.5 py-1 rounded border border-red-900/60">
              <Flame className="w-3.5 h-3.5" /> Curated Drops
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-2 font-['Plus_Jakarta_Sans',sans-serif]">
              Trending Drops &amp; Bestsellers
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl font-medium">
              Direct dropshipping fulfillment. 100% genuine brand gear covered by 1-year brand warranty and 7-day replacement.
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-bold text-zinc-300">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs sm:text-sm bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600 font-bold text-white shadow-sm cursor-pointer"
            >
              <option value="featured">Featured / Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills (Dark Edition) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-black shadow-md font-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetail={onOpenProductDetail}
              />
            ))}
          </div>
        ) : (
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-12 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="w-10 h-10 text-zinc-500 mx-auto" />
            <h3 className="font-extrabold text-white text-lg">No products found</h3>
            <p className="text-xs text-zinc-400 font-medium">
              No products match "{searchQuery}" in this category. Try searching for "earbuds", "lamp", or "bottle".
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              className="mt-3 px-5 py-2.5 bg-white hover:bg-boat-red hover:text-white text-black rounded-xl text-xs font-black uppercase tracking-wider transition"
            >
              View All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
