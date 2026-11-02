export interface ProductVariant {
  id: string;
  name: string;
  colorHex?: string;
  inStock: boolean;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'audio' | 'workspace' | 'lifestyle';
  price: number; // In INR (₹)
  originalPrice: number; // In INR (₹)
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNewDrop?: boolean;
  stockLeft: number;
  images: string[];
  variants: ProductVariant[];
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  inTheBox: string[];
  codAvailable: boolean;
  deliveryDaysEstimate: string;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string; // 10 digits
  email: string;
  pincode: string; // 6 digits
  city: string;
  state: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
}

export type PaymentMethod = 'razorpay' | 'cod';

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  shippingFee: number;
  codFee: number;
  total: number;
  couponCode?: string;
  createdAt: string;
  paymentId?: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
  trackingNumber: string;
  courierName: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface PincodeData {
  city: string;
  state: string;
  deliveryDays: number;
  codAvailable: boolean;
  expressAvailable: boolean;
}

