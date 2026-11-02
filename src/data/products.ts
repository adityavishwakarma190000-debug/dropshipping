import { Product } from '../types';

/**
 * 2-3 Realistic Sample Dropshipping Products
 * NOTE: These products and specifications are fictional samples for demonstration purposes.
 * They can be modified or replaced in this single configuration file.
 */
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'aurapro-x-earbuds',
    name: 'AuraPro X Wireless ANC Earbuds',
    tagline: 'Studio-Grade Active Noise Cancellation & 40H Playtime',
    category: 'audio',
    price: 2499,
    originalPrice: 4999,
    rating: 4.8,
    reviewCount: 382,
    isBestseller: true,
    isNewDrop: false,
    stockLeft: 14,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1000&q=80',
    ],
    variants: [
      { id: 'v-black', name: 'Stealth Black', colorHex: '#18181b', inStock: true },
      { id: 'v-white', name: 'Ceramic White', colorHex: '#f4f4f5', inStock: true },
      { id: 'v-blue', name: 'Midnight Navy', colorHex: '#1e3a8a', inStock: true },
    ],
    description:
      'Engineered for true audiophiles and remote professionals. The AuraPro X combines 42dB Hybrid Active Noise Cancellation with precision-tuned 11mm bio-cellulose drivers, delivering thunderous bass, rich mids, and sparkling highs. Featuring low-latency gaming mode and 4-mic ENC for crystal-clear calls even in crowded Indian streets.',
    highlights: [
      '42dB Hybrid Active Noise Cancellation (ANC) with Transparency Mode',
      'Up to 40 Hours Total Playtime (8 hrs earbuds + 32 hrs case)',
      'Dual-device seamless Bluetooth 5.3 pairing',
      'Type-C Fast Charging (10 mins charge = 2 hours playtime)',
      'Quad-Mic AI Environmental Noise Cancellation for crystal-clear calls',
      'IPX5 Water & Sweat Resistance for gym & daily commute'
    ],
    specs: {
      'Driver Size': '11mm Dynamic Bio-Cellulose',
      'Bluetooth Version': 'v5.3 (AAC / SBC codecs)',
      'Battery Capacity': '50mAh (buds) / 500mAh (case)',
      'Charging Time': '1 hour (Fast Charge)',
      'Water Resistance': 'IPX5 Certified',
      'Warranty': '1 Year Brand Replacement Warranty'
    },
    inTheBox: [
      '1x Pair AuraPro X Earbuds',
      '1x Smart Wireless Charging Case',
      '3x Silicone Ear-tip pairs (S/M/L)',
      '1x Braided USB-C Charging Cable',
      '1x User Manual & Warranty Card'
    ],
    codAvailable: true,
    deliveryDaysEstimate: '2 - 4 business days',
  },
  {
    id: 'lumina-arc-desk-lamp',
    name: 'Lumina Arc™ Smart Architectural Desk Lamp',
    tagline: 'Ultra-Wide Screenbar with 15W Qi Fast Charging Base',
    category: 'workspace',
    price: 1899,
    originalPrice: 3799,
    rating: 4.9,
    reviewCount: 219,
    isBestseller: true,
    isNewDrop: true,
    stockLeft: 8,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
    ],
    variants: [
      { id: 'v-space-grey', name: 'Space Grey', colorHex: '#475569', inStock: true },
      { id: 'v-silver', name: 'Silver Frost', colorHex: '#cbd5e1', inStock: true },
      { id: 'v-matte-black', name: 'Matte Black', colorHex: '#09090b', inStock: true },
    ],
    description:
      'Elevate your desk setup with the Lumina Arc. Crafted from CNC-machined aircraft-grade aluminum, it provides glare-free, asymmetric optical illumination engineered specifically to eliminate eye strain during late-night work sessions. Features stepless slide-to-dim touch controls and a wireless charging base for your smartphone.',
    highlights: [
      'Eye-Care CRI ≥ 95+ flicker-free natural spectrum light',
      'Built-in 15W Qi Fast Wireless Charging Base for smartphones',
      '5 Color Temperatures (2700K warm reading to 6500K focus white)',
      'Dual-axis 180° rotatable arm & 270° swiveling lamp head',
      'Smart memory function preserves your favorite brightness',
      'Touch slide sensitive dimmer with ambient night-light mode'
    ],
    specs: {
      'Material': 'Anodized Aircraft Aluminum + ABS',
      'Luminous Flux': '800 Lumens (CRI > 95)',
      'Power Input': '12V / 2A Type-C Adapter included',
      'Wireless Output': '15W / 10W / 7.5W Qi Certified',
      'Lifespan': '50,000+ LED Operating Hours',
      'Warranty': '1 Year Comprehensive Warranty'
    },
    inTheBox: [
      '1x Lumina Arc Architectural Lamp',
      '1x Weighted Metal Wireless Charging Base',
      '1x 24W Indian Standard Power Adapter',
      '1x Hex Key & Setup Guide'
    ],
    codAvailable: true,
    deliveryDaysEstimate: '2 - 4 business days',
  },
  {
    id: 'hydropulse-thermal-bottle',
    name: 'HydroPulse™ Smart Temperature Flask (750ml)',
    tagline: '316 Surgical Steel Vacuum Insulated with OLED Touch Cap',
    category: 'lifestyle',
    price: 1299,
    originalPrice: 2499,
    rating: 4.7,
    reviewCount: 164,
    isBestseller: false,
    isNewDrop: true,
    stockLeft: 19,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    ],
    variants: [
      { id: 'v-obsidian', name: 'Obsidian Black', colorHex: '#1c1917', inStock: true },
      { id: 'v-olive', name: 'Forest Olive', colorHex: '#365314', inStock: true },
      { id: 'v-terracotta', name: 'Sunset Terracotta', colorHex: '#9a3412', inStock: true },
    ],
    description:
      'Stay effortlessly hydrated in Indian weather. The HydroPulse features a double-wall vacuum insulated body crafted from premium SUS 316 medical-grade stainless steel that keeps beverages ice-cold for 24 hours or piping hot for 12 hours. The intelligent waterproof touch lid displays the exact liquid temperature with a tap.',
    highlights: [
      'Real-time OLED Touch Screen Temperature Indicator',
      'Double-Wall Vacuum Insulation (24H Cold / 12H Hot)',
      'SUS 316 Medical-Grade Inner Steel (Corrosion & odor resistant)',
      'Drink reminder glow alert every 2 hours (optional toggle)',
      '100% Leak-Proof food grade silicone seal',
      'Sweat-proof powder coated exterior with silicone base ring'
    ],
    specs: {
      'Capacity': '750 ml',
      'Interior Steel': 'SUS 316 Medical Grade Stainless Steel',
      'Exterior Steel': 'SUS 304 Food Grade Stainless Steel',
      'Cap Battery': 'Built-in ultra-efficient coin cell (2-year life)',
      'BPA Free': '100% Certified Toxic-Free',
      'Warranty': '6 Months Replacement Warranty'
    },
    inTheBox: [
      '1x HydroPulse Smart 750ml Flask',
      '1x Smart OLED Sensor Lid',
      '1x Removable 304 Steel Tea/Fruit Infuser',
      '1x Silicone Anti-Slip Protective Sleeve'
    ],
    codAvailable: true,
    deliveryDaysEstimate: '3 - 5 business days',
  }
];

