import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { SAMPLE_PRODUCTS } from './data/products';
import { Product, ProductVariant, Order } from './types';

// Components
import { DemoNoticeBanner } from './components/DemoNoticeBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

function StoreApp() {
  const { addToCart, setIsCartOpen } = useCart();
  
  // State management
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'audio' | 'workspace' | 'lifestyle'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const flagshipProduct = SAMPLE_PRODUCTS[0]; // AuraPro X Earbuds

  const handleOpenProductDetail = (product: Product) => {
    setActiveProductModal(product);
  };

  const handleBuyNow = (product: Product, variant: ProductVariant, quantity: number) => {
    addToCart(product, variant, quantity);
    setActiveProductModal(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: Order) => {
    setConfirmedOrder(order);
  };

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-zinc-100 font-sans">
      {/* Top Demo Disclosure Bar */}
      <DemoNoticeBanner />

      {/* Main Sticky Navigation */}
      <Navbar
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTrackOrder={() => setIsTrackerOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        activeCategory={selectedCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          products={SAMPLE_PRODUCTS}
          onOpenProductDetail={handleOpenProductDetail}
          onScrollToProducts={scrollToProducts}
        />

        {/* Pan-India Trust Value Bar */}
        <TrustBar />

        {/* Curated Drops & Bestseller Grid */}
        <ProductGrid
          products={SAMPLE_PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onOpenProductDetail={handleOpenProductDetail}
        />

        {/* Verified Indian Customer Reviews (Social Proof) */}
        <ReviewsSection />

        {/* Indian Buyer FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Professional Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
        onBuyNow={handleBuyNow}
        allProducts={SAMPLE_PRODUCTS}
        onSelectProduct={(p) => setActiveProductModal(p)}
      />

      <CartDrawer
        onProceedToCheckout={handleProceedToCheckout}
        onExploreProducts={scrollToProducts}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderPlaced={handleOrderPlaced}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        onOpenTracker={() => {
          setConfirmedOrder(null);
          setIsTrackerOpen(true);
        }}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialOrderId={confirmedOrder ? confirmedOrder.id : undefined}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}

