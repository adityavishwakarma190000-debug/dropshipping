# Zenith™ India — High-Converting Dropshipping E-Commerce Store

Zenith India is a modern, high-converting dropshipping e-commerce platform built specifically for the Indian market, inspired by leading Indian D2C brands (such as boAt, Noise, Minimalist, Snitch, and Apple).

---

## 🚀 Key Features

### 1. Indian Market Optimization
- **Currency & Pricing**: All figures displayed in Indian Rupees (`₹`) formatted with standard Indian grouping (e.g. `₹2,499`, `₹24,999`), clear discount badges (`50% OFF`), and transparent GST notices (`Inclusive of all taxes`).
- **Indian PIN Code Checker**: Live 6-digit Indian postal PIN code validator with automated City/State detection, carrier delivery estimates, and Cash on Delivery (COD) availability checks.
- **Indian Phone Validation**: Strict validation for 10-digit mobile numbers conforming to TRAI Indian telecom standards (`+91` with initial digits 6, 7, 8, or 9).
- **Payment Methods**: Seamless Razorpay payment integration supporting **UPI (Google Pay, PhonePe, Paytm, CRED)**, Debit & Credit Cards (RuPay, Visa, Mastercard), and Netbanking, plus full **Cash on Delivery (COD)** support.
- **Order Tracking**: Live shipment tracker with Delhivery / BlueDart tracking numbers and transit status.
- **Indian Trust Elements**: 1-Year Brand Warranty, 7-Day Hassle-Free Replacement, WhatsApp Customer Support (+91 98765 43210), and Indian Registered Office & GSTIN placeholders.

### 2. High-Converting Store Architecture
- **Compelling Hero Section**: High-impact headlines, customer review ratings pill (`4.8/5 ★`), and a featured drop spotlight card.
- **Curated Sample Products**: 3 realistic fictional dropshipping products (`AuraPro X Earbuds`, `Lumina Arc Smart Lamp`, and `HydroPulse Temperature Flask`) clearly tagged with `[Demo Product]`.
- **Slide-over Cart Drawer**: Free Pan-India shipping progress bar (orders > ₹999), coupon application (`WELCOME10`, `UPI50`), real-time subtotal calculations, and instant checkout link.
- **Interactive Product Detail View**: Multi-angle image gallery with thumbnail switcher, color/variant swatches, live stock scarcity warning, technical specs table, and "What's in the box" breakdown.
- **Order Confirmation Page**: Celebration confetti, live tracking progress bar, itemized receipt, and printable tax invoice.

---

## 🛠️ Project Structure

```
zenith-store/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx               # Announcement ticker, brand logo, search, cart count
│   │   ├── Hero.tsx                 # High-converting Hero section with product spotlight
│   │   ├── TrustBar.tsx             # 4-card Indian buyer guarantee bar
│   │   ├── ProductCard.tsx          # Card with ₹ pricing, % discount badge, variant dots
│   │   ├── ProductGrid.tsx          # Bestseller grid with category filters & sort
│   │   ├── ProductDetailModal.tsx   # Complete PDP with PIN code checker & specs
│   │   ├── CartDrawer.tsx           # Slide-over cart with free delivery progress & coupons
│   │   ├── CheckoutModal.tsx        # 3-step checkout: Address, PIN auto-lookup & Razorpay/COD
│   │   ├── OrderConfirmationModal.tsx # Confetti celebration, live delivery tracker & print invoice
│   │   ├── OrderTrackerModal.tsx    # Dedicated package tracker by Order ID & Phone
│   │   ├── ReviewsSection.tsx       # Verified Indian customer reviews (marked demo)
│   │   ├── FAQSection.tsx           # Accordion for Indian shopper concerns (COD, shipping, taxes)
│   │   ├── DemoNoticeBanner.tsx     # Top banner identifying demo sample status
│   │   └── Footer.tsx               # Registered address, GSTIN, WhatsApp help, payment icons
│   ├── data/
│   │   ├── products.ts              # Centralized product catalog (easily replace sample items)
│   │   ├── reviews.ts               # Sample Indian customer reviews (clearly marked demo)
│   │   └── pincodes.ts              # Indian PIN codes database for instant city/state detection
│   ├── context/
│   │   └── CartContext.tsx          # Persistent cart state, quantities, coupons, and discounts
│   ├── utils/
│   │   ├── currency.ts              # Indian Rupee formatter (₹) and savings math
│   │   └── razorpay.ts              # Razorpay checkout handler with safe sandbox simulation
│   ├── types/
│   │   └── index.ts                 # Full TypeScript interfaces
│   ├── App.tsx                      # Root application coordinating all views
│   ├── main.tsx                     # React DOM entry
│   └── index.css                    # Tailwind CSS imports & animations
├── .env.example                     # Environment template for Razorpay Key ID
├── package.json                     # Scripts & dependencies
├── vite.config.ts                   # Vite bundler configuration
└── tailwind.config.js               # Tailwind custom color palette & styling
```

---

## ⚙️ How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates a zero-error, minified, production-ready bundle in the `dist/` directory.

---

## 💳 Connecting Razorpay Live or Test Keys

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Retrieve your **Key ID** from the [Razorpay Dashboard](https://dashboard.razorpay.com) (`Settings -> API Keys`).
3. Set your Key ID:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
   ```
4. **Demo / Sandbox Fallback**: If no key is set or the placeholder is retained, Zenith automatically engages an interactive Razorpay Test Sandbox modal that simulates full UPI and card approvals without throwing errors or exposing sensitive API keys.

---

## 📦 How to Replace Sample Products

All products are defined in a single file: `src/data/products.ts`.
To replace the 3 sample products with your own dropshipping items, simply edit or replace the objects in `SAMPLE_PRODUCTS`. Each product supports:
- `id`, `name`, `tagline`, `category` (`'audio' | 'workspace' | 'lifestyle'`)
- `price` and `originalPrice` (in INR ₹)
- `images` (array of image URLs)
- `variants` (colors, names, hex codes)
- `highlights` and `specs` (key-value specifications)
- `inTheBox` (list of package contents)

