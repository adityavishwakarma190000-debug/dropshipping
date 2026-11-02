import { ShippingAddress } from '../types';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise (e.g., ₹100 = 10000 paise)
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  handler: (response: RazorpayPaymentSuccessResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme: {
    color: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

/**
 * Razorpay Public Key ID
 * Can be configured via environment variable: VITE_RAZORPAY_KEY_ID
 * For production, create a key in your Razorpay Dashboard (Settings -> API Keys)
 */
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key';

/**
 * Checks if a real working Razorpay Key has been provided
 */
export function isRealRazorpayConfigured(): boolean {
  return (
    Boolean(RAZORPAY_KEY_ID) &&
    RAZORPAY_KEY_ID !== 'rzp_test_placeholder_key' &&
    RAZORPAY_KEY_ID.startsWith('rzp_')
  );
}

/**
 * Initiates Razorpay Payment
 * If a real key is provided, loads the official Razorpay Checkout popup.
 * If running in demo mode without API credentials, provides safe sandbox handling.
 */
export function initiateRazorpayPayment({
  amountINR,
  address,
  orderNumber,
  onSuccess,
  onFailure,
  onDismiss,
}: {
  amountINR: number;
  address: ShippingAddress;
  orderNumber: string;
  onSuccess: (paymentId: string) => void;
  onFailure: (errorMsg: string) => void;
  onDismiss: () => void;
}) {
  const isConfigured = isRealRazorpayConfigured();

  // If Razorpay SDK is present and user provided real test/live key
  if (isConfigured && typeof window !== 'undefined' && window.Razorpay) {
    try {
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: Math.round(amountINR * 100), // convert rupees to paise
        currency: 'INR',
        name: 'Zenith India',
        description: `Order ${orderNumber} Payment`,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=200&q=80',
        prefill: {
          name: address.fullName,
          email: address.email,
          contact: address.phoneNumber,
        },
        notes: {
          shipping_address: `${address.addressLine1}, ${address.city}, ${address.state} - ${address.pincode}`,
          order_id: orderNumber,
        },
        theme: {
          color: '#2563eb', // Blue brand color
        },
        handler: (response: RazorpayPaymentSuccessResponse) => {
          onSuccess(response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => {
            onDismiss();
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (response: any) {
        onFailure(response.error?.description || 'Razorpay payment could not be completed.');
      });
      rzpInstance.open();
    } catch (err: any) {
      console.error('Razorpay initialization error:', err);
      onFailure(err.message || 'Error launching Razorpay.');
    }
  } else {
    // Sandbox / Test fallback mode with zero credential exposure
    // This allows the full dropshipping workflow to be audited and demonstrated
    return 'SHOW_SANDBOX_MODAL';
  }
}

