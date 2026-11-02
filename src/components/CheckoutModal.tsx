import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Banknote,
  Truck,
  CheckCircle2,
  Lock,
  Smartphone,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingAddress, PaymentMethod, Order } from '../types';
import { formatINR } from '../utils/currency';
import { lookupPincode } from '../data/pincodes';
import {
  initiateRazorpayPayment,
  isRealRazorpayConfigured,
  RAZORPAY_KEY_ID,
} from '../utils/razorpay';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onOrderPlaced,
}) => {
  const { cart, subtotal, discount, shippingFee, couponCode, clearCart } = useCart();

  // Form states
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    phoneNumber: '',
    email: '',
    pincode: '',
    city: '',
    state: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [codFee, setCodFee] = useState<number>(0);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [orderInProgress, setOrderInProgress] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Handle PIN code input and auto-lookup city and state
  const handlePincodeChange = (pin: string) => {
    const cleanPin = pin.replace(/\D/g, '').slice(0, 6);
    setFormData((prev) => ({ ...prev, pincode: cleanPin }));

    if (cleanPin.length === 6) {
      const data = lookupPincode(cleanPin);
      if (data) {
        setFormData((prev) => ({
          ...prev,
          city: data.city,
          state: data.state,
        }));
        setFormErrors((prev) => {
          const next = { ...prev };
          delete next.pincode;
          return next;
        });
      }
    }
  };

  const handlePhoneChange = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phoneNumber: cleanPhone }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phoneNumber || !/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      errors.phoneNumber = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Enter a valid email address for order tracking';
    }
    if (!formData.pincode || !/^[1-9]\d{5}$/.test(formData.pincode)) {
      errors.pincode = 'Enter a valid 6-digit Indian PIN code (cannot start with 0)';
    }
    if (!formData.addressLine1.trim()) errors.addressLine1 = 'House/Flat No and Street is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.state.trim()) errors.state = 'State is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const effectiveCodFee = paymentMethod === 'cod' ? codFee : 0;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee + effectiveCodFee);

  const handleCompleteOrder = (paymentId?: string) => {
    const orderId = `IND-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingNumber = `BLR-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      shippingAddress: { ...formData },
      paymentMethod,
      subtotal,
      discount,
      shippingFee,
      codFee: effectiveCodFee,
      total: grandTotal,
      couponCode,
      createdAt: new Date().toISOString(),
      paymentId: paymentId || (paymentMethod === 'cod' ? 'COD_PENDING' : 'RZP_DEMO_SUCCESS'),
      status: 'confirmed',
      trackingNumber,
      courierName: 'BlueDart Express',
    };

    clearCart();
    setIsProcessing(false);
    setShowSandboxModal(false);
    onClose();
    onOrderPlaced(newOrder);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    const tempOrderId = `IND-${Math.floor(100000 + Math.random() * 900000)}`;

    if (paymentMethod === 'cod') {
      setTimeout(() => {
        handleCompleteOrder();
      }, 800);
      return;
    }

    // Razorpay flow
    const result = initiateRazorpayPayment({
      amountINR: grandTotal,
      address: formData,
      orderNumber: tempOrderId,
      onSuccess: (paymentId) => {
        handleCompleteOrder(paymentId);
      },
      onFailure: (errMsg) => {
        setIsProcessing(false);
        alert(`Payment Failed: ${errMsg}`);
      },
      onDismiss: () => {
        setIsProcessing(false);
      },
    });

    if (result === 'SHOW_SANDBOX_MODAL') {
      setOrderInProgress({
        id: tempOrderId,
        items: [...cart],
        shippingAddress: { ...formData },
        paymentMethod: 'razorpay',
        subtotal,
        discount,
        shippingFee,
        codFee: 0,
        total: grandTotal,
        couponCode,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        trackingNumber: `BLR-${Math.floor(10000000 + Math.random() * 90000000)}`,
        courierName: 'Delhivery Surface',
      });
      setShowSandboxModal(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-zinc-950 text-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col border border-zinc-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-boat-red text-white flex items-center justify-center font-bold text-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Express Indian Checkout
              </h2>
              <p className="text-[11px] text-zinc-400 font-medium">100% Encrypted &amp; Secure Payment Processing</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 flex-1 bg-zinc-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Form Fields (7 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Contact Details */}
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <span className="w-5 h-5 rounded-full bg-boat-red text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Customer &amp; Indian Contact Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-xl focus:bg-black focus:outline-none focus:border-white transition font-medium"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-400 mt-1 font-bold">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Mobile Number (SMS &amp; WhatsApp updates) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 text-xs font-bold bg-black border border-r-0 border-zinc-800 rounded-l-xl text-zinc-300">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={formData.phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-r-xl focus:bg-black focus:outline-none focus:border-white font-mono transition"
                      />
                    </div>
                    {formErrors.phoneNumber && (
                      <p className="text-[11px] text-red-400 mt-1 font-bold">{formErrors.phoneNumber}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Email Address (for tax invoice &amp; tracking) *
                    </label>
                    <input
                      type="email"
                      placeholder="rahul.sharma@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-xl focus:bg-black focus:outline-none focus:border-white transition font-medium"
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-400 mt-1 font-bold">{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <span className="w-5 h-5 rounded-full bg-boat-red text-white text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Shipping Address (Pan-India)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      6-Digit PIN Code *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 560001"
                      value={formData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-xl focus:bg-black focus:outline-none focus:border-white font-mono transition"
                    />
                    {formErrors.pincode && (
                      <p className="text-[11px] text-red-400 mt-1 font-bold">{formErrors.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      City / District *
                    </label>
                    <input
                      type="text"
                      placeholder="Bengaluru"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-xl focus:bg-black focus:outline-none focus:border-white transition font-medium"
                    />
                    {formErrors.city && (
                      <p className="text-[11px] text-red-400 mt-1 font-bold">{formErrors.city}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      State / Union Territory *
                    </label>
                    <input
                      type="text"
                      placeholder="Karnataka"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-xl focus:bg-black focus:outline-none focus:border-white transition font-medium"
                    />
                    {formErrors.state && (
                      <p className="text-[11px] text-red-400 mt-1 font-bold">{formErrors.state}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Flat / House No., Apartment, Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="Flat 402, Sunshine Heights, 12th Main Road"
                      value={formData.addressLine1}
                      onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-xl focus:bg-black focus:outline-none focus:border-white transition font-medium"
                    />
                    {formErrors.addressLine1 && (
                      <p className="text-[11px] text-red-400 mt-1 font-bold">{formErrors.addressLine1}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-zinc-300 mb-1">
                      Landmark (Crucial for Indian Delivery Boys)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near HDFC Bank, Opposite Apollo Pharmacy"
                      value={formData.landmark || ''}
                      onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-zinc-900 text-white border border-zinc-800 rounded-xl focus:bg-black focus:outline-none focus:border-white transition font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-2 pb-2 border-b border-zinc-800">
                  <span className="w-5 h-5 rounded-full bg-boat-red text-white text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Select Payment Method
                </h3>

                <div className="space-y-3 mt-3">
                  {/* Option 1: Razorpay (UPI / Cards / Netbanking) */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === 'razorpay'
                        ? 'border-boat-red bg-red-950/20'
                        : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="mt-1 text-boat-red focus:ring-boat-red"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-boat-red" />
                          <span className="font-extrabold text-sm text-white">
                            Razorpay Secure (UPI, Cards, Netbanking)
                          </span>
                        </div>
                        <span className="bg-emerald-950 text-emerald-400 text-[10px] font-black px-2 py-0.5 rounded uppercase border border-emerald-500/30">
                          Recommended
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-medium">
                        Pay via Google Pay, PhonePe, Paytm, RuPay, Visa, Mastercard, or 50+ Netbanking banks.
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-black bg-black px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
                          GPay
                        </span>
                        <span className="text-[10px] font-black bg-black px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
                          PhonePe
                        </span>
                        <span className="text-[10px] font-black bg-black px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
                          Paytm
                        </span>
                        <span className="text-[10px] font-black bg-black px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
                          RuPay
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Cash on Delivery (COD) */}
                  <label
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition ${
                      paymentMethod === 'cod'
                        ? 'border-boat-red bg-red-950/20'
                        : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 text-boat-red focus:ring-boat-red"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-emerald-400" />
                          <span className="font-extrabold text-sm text-white">
                            Cash on Delivery (COD)
                          </span>
                        </div>
                        <span className="text-zinc-400 text-xs font-bold">
                          Pay at doorstep
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-medium">
                        Pay with Cash or UPI QR to the delivery courier when your order arrives.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-boat-red hover:bg-boat-redHover text-white font-black text-base rounded-xl shadow-lg shadow-red-600/30 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-60 uppercase tracking-wider"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Processing Secure Payment...
                  </span>
                ) : paymentMethod === 'razorpay' ? (
                  <span>Pay {formatINR(grandTotal)} via Razorpay</span>
                ) : (
                  <span>Confirm Cash on Delivery Order</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-xs text-zinc-400 pt-1 font-bold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Encryption
                </span>
                <span>•</span>
                <span>100% RBI Compliant Gateway</span>
              </div>
            </form>

            {/* Right: Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 bg-black rounded-2xl p-4 sm:p-6 border border-zinc-800 space-y-4 self-start">
              <h3 className="font-black text-sm text-white pb-2 border-b border-zinc-800">
                Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
              </h3>

              {/* Items List */}
              <div className="divide-y divide-zinc-800 max-h-56 overflow-y-auto space-y-2 pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedVariant.id}`}
                    className="pt-2 flex items-center gap-3"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover border border-zinc-800 bg-zinc-900"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        {item.selectedVariant.name} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-black text-white">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="pt-3 border-t border-zinc-800 space-y-2 text-xs text-zinc-400 font-medium">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-white">{formatINR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charges (Pan-India)</span>
                  {shippingFee === 0 ? (
                    <span className="font-black text-emerald-400">FREE</span>
                  ) : (
                    <span className="font-bold text-white">{formatINR(shippingFee)}</span>
                  )}
                </div>

                {paymentMethod === 'cod' && effectiveCodFee > 0 && (
                  <div className="flex justify-between">
                    <span>COD Handling Fee</span>
                    <span className="font-bold text-white">{formatINR(effectiveCodFee)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-zinc-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total Amount</span>
                  <span className="text-2xl font-black text-white">{formatINR(grandTotal)}</span>
                </div>
                <p className="text-[10px] text-zinc-500">Includes 18% GST (Goods and Services Tax)</p>
              </div>

              {/* Trust Box */}
              <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 space-y-1.5 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Zenith Customer Protection</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Orders are tracked via BlueDart/Delhivery with live SMS updates and 7-day hassle-free replacement.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Razorpay Interactive Test Sandbox Simulator Modal */}
      {showSandboxModal && orderInProgress && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 text-white max-w-md w-full rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden p-6 space-y-5 animate-scaleUp">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-boat-red flex items-center justify-center text-white font-black text-sm">
                  R
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Razorpay Checkout Sandbox</h4>
                  <p className="text-[10px] text-zinc-400">Dark Mode Test Simulation</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSandboxModal(false);
                  setIsProcessing(false);
                }}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notice regarding production keys */}
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-300 space-y-1">
              <p className="font-bold flex items-center gap-1 text-white">
                <AlertCircle className="w-3.5 h-3.5 text-boat-red flex-shrink-0" />
                Integration Ready
              </p>
              <p className="text-[11px] text-zinc-400">
                In production, supply your Razorpay Key ID in <code className="bg-black text-zinc-200 px-1 py-0.5 rounded font-mono border border-zinc-800">VITE_RAZORPAY_KEY_ID</code> to trigger live Razorpay Checkout.
              </p>
            </div>

            <div className="p-4 bg-black rounded-2xl border border-zinc-800 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Paying to</span>
                <strong className="text-white">Zenith India Store</strong>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Customer</span>
                <span className="text-white">{orderInProgress.shippingAddress.fullName} (+91 {orderInProgress.shippingAddress.phoneNumber})</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-zinc-800">
                <span className="text-xs font-bold text-zinc-300">Amount Due</span>
                <span className="text-xl font-black text-white">{formatINR(orderInProgress.total)}</span>
              </div>
            </div>

            {/* Simulated Payment Methods */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-300">Select Test Payment Mode:</span>
              
              <button
                onClick={() => handleCompleteOrder(`pay_test_upi_${Date.now()}`)}
                className="w-full p-3 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 flex items-center justify-between text-left transition group"
              >
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-boat-red" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-boat-red">
                      Simulate UPI Payment (GPay / PhonePe / Paytm)
                    </div>
                    <div className="text-[10px] text-zinc-500">Instant approval simulation</div>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={() => handleCompleteOrder(`pay_test_card_${Date.now()}`)}
                className="w-full p-3 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-900 hover:bg-zinc-800 flex items-center justify-between text-left transition group"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-boat-red">
                      Simulate Credit / Debit Card (Visa / RuPay)
                    </div>
                    <div className="text-[10px] text-zinc-500">3D Secure OTP verification</div>
                  </div>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

            {/* Cancel Button */}
            <button
              onClick={() => {
                setShowSandboxModal(false);
                setIsProcessing(false);
              }}
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold rounded-xl transition border border-zinc-800"
            >
              Cancel Payment Simulation
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
