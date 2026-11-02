import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Printer,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Order } from '../types';
import { formatINR } from '../utils/currency';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
  onOpenTracker: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  onOpenTracker,
}) => {
  if (!order) return null;

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11900', '#10b981', '#f59e0b', '#3b82f6'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-zinc-950 text-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col border border-zinc-800">
        
        {/* Celebration Header */}
        <div className="bg-emerald-950 border-b border-emerald-800/80 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-emerald-900/80 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Thank You! Your Order is Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-emerald-300 mt-1 max-w-md mx-auto font-medium">
            Order <strong className="text-white font-mono bg-black/50 px-2 py-0.5 rounded border border-emerald-700/50">#{order.id}</strong> has been received and is being prepared for express dispatch.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-black/40 border border-emerald-600/30 rounded-full px-4 py-1 text-xs text-emerald-300 font-bold">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Estimated Delivery: <strong>2 - 4 Business Days</strong></span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1 bg-zinc-950">
          
          {/* Tracking Timeline Visualization */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-black text-boat-red uppercase tracking-wider">
                  Live Dispatch Status
                </span>
                <h3 className="text-sm font-black text-white">
                  Carrier: {order.courierName} (AWB: <span className="font-mono text-zinc-300">{order.trackingNumber}</span>)
                </h3>
              </div>

              <button
                onClick={onOpenTracker}
                className="text-xs font-bold text-white hover:text-boat-red flex items-center gap-1 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800 shadow-sm"
              >
                <span>Live Tracker</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Stepper */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2">
              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs font-black shadow-sm">
                  ✓
                </div>
                <div className="text-[11px] font-extrabold text-white">Confirmed</div>
                <div className="text-[10px] text-emerald-400 font-bold">Today</div>
              </div>

              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-full bg-boat-red text-white flex items-center justify-center mx-auto text-xs font-black shadow-sm animate-pulse">
                  2
                </div>
                <div className="text-[11px] font-extrabold text-white">Packing</div>
                <div className="text-[10px] text-red-400 font-bold">Warehouse</div>
              </div>

              <div className="space-y-1.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto text-xs font-black border border-zinc-700">
                  3
                </div>
                <div className="text-[11px] font-bold text-zinc-400">Shipped</div>
                <div className="text-[10px] text-zinc-500">BlueDart</div>
              </div>

              <div className="space-y-1.5 opacity-50">
                <div className="w-7 h-7 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto text-xs font-black border border-zinc-700">
                  4
                </div>
                <div className="text-[11px] font-bold text-zinc-400">Delivered</div>
                <div className="text-[10px] text-zinc-500">Doorstep</div>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Delivery Address */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-white pb-1 border-b border-zinc-800">
                <MapPin className="w-4 h-4 text-boat-red" />
                <span>Delivery Address</span>
              </div>
              <div className="text-xs text-zinc-300 space-y-0.5 font-medium">
                <div className="font-black text-white">{order.shippingAddress.fullName}</div>
                <div>{order.shippingAddress.addressLine1}</div>
                {order.shippingAddress.landmark && (
                  <div className="text-zinc-500">Landmark: {order.shippingAddress.landmark}</div>
                )}
                <div>
                  {order.shippingAddress.city}, {order.shippingAddress.state} -{' '}
                  <strong className="font-mono text-white">{order.shippingAddress.pincode}</strong>
                </div>
                <div className="text-zinc-400 pt-1">
                  Phone: 🇮🇳 +91 {order.shippingAddress.phoneNumber}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-black text-white pb-1 border-b border-zinc-800">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Payment Summary</span>
              </div>
              <div className="text-xs text-zinc-300 space-y-1 font-medium">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Payment Method:</span>
                  <strong className="text-white">
                    {order.paymentMethod === 'razorpay' ? 'Razorpay Secure (Prepaid)' : 'Cash on Delivery (COD)'}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Payment Status:</span>
                  <span className="text-emerald-400 font-black bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {order.paymentMethod === 'razorpay' ? 'Paid Online' : 'Pay on Delivery'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Reference ID:</span>
                  <span className="font-mono text-[11px] text-zinc-400">{order.paymentId}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-zinc-800 font-bold">
                  <span>Grand Total:</span>
                  <span className="text-sm font-black text-white">{formatINR(order.total)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Ordered Products Table */}
          <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-zinc-900">
            <div className="bg-black px-4 py-2.5 text-xs font-black text-zinc-300 border-b border-zinc-800">
              Items in this Shipment
            </div>
            <div className="divide-y divide-zinc-800 p-2">
              {order.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant.id}`}
                  className="p-2 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-zinc-800 bg-black"
                    />
                    <div>
                      <h4 className="font-bold text-white">{item.product.name}</h4>
                      <p className="text-[11px] text-zinc-400">
                        {item.selectedVariant.name} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-black text-white">
                    {formatINR(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800">
            <button
              onClick={handlePrintReceipt}
              className="w-full sm:w-auto px-4 py-2.5 border border-zinc-700 hover:bg-zinc-900 text-zinc-300 hover:text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              <Printer className="w-4 h-4 text-zinc-400" />
              <span>Print Tax Invoice</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-boat-red text-black hover:text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition uppercase tracking-wider"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
