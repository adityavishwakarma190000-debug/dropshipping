import React, { useState } from 'react';
import { X, Search, Truck, MapPin, CheckCircle2, Clock, Phone, AlertCircle } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderId?: string;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  initialOrderId = '',
}) => {
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId || 'IND-89421');
  const [phoneInput, setPhoneInput] = useState('9876543210');
  const [trackedData, setTrackedData] = useState<any>({
    orderId: initialOrderId || 'IND-89421',
    carrier: 'BlueDart Express',
    awb: 'BLR-98214432',
    status: 'In Transit',
    currentLocation: 'Hub Bengaluru South, Karnataka',
    destination: 'Bengaluru, Karnataka - 560001',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    timeline: [
      { time: 'Today, 02:45 PM', event: 'Arrived at Sort Facility - Bengaluru South Hub', done: true },
      { time: 'Today, 08:30 AM', event: 'Dispatched from Central Warehouse - Whitefield', done: true },
      { time: 'Yesterday, 06:15 PM', event: 'Order Packed & Handed Over to BlueDart', done: true },
      { time: 'Yesterday, 04:30 PM', event: 'Order Confirmed & Payment Verified', done: true },
    ],
  });

  if (!isOpen) return null;

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    setTrackedData({
      orderId: orderIdInput.trim().toUpperCase(),
      carrier: 'BlueDart Express',
      awb: `BLR-${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: 'In Transit',
      currentLocation: 'Hub Bengaluru South, Karnataka',
      destination: 'Customer Address, India',
      estimatedDelivery: 'Within 2 - 3 business days',
      timeline: [
        { time: 'Today, 02:45 PM', event: 'Departed Facility towards Regional Delivery Hub', done: true },
        { time: 'Today, 09:15 AM', event: 'Order Picked & Manifested with Carrier', done: true },
        { time: 'Yesterday, 05:00 PM', event: 'Order Confirmed & Processed', done: true },
      ],
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
      <div className="relative bg-zinc-950 text-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col border border-zinc-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-black">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-boat-red" />
            <h2 className="text-base sm:text-lg font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
              Track Your Indian Shipment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input form */}
        <div className="p-4 sm:p-6 bg-zinc-900 border-b border-zinc-800">
          <form onSubmit={handleTrackSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Order ID (e.g. IND-89421)
                </label>
                <input
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="IND-XXXXXX"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-black text-white border border-zinc-700 rounded-xl font-mono uppercase focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 mb-1">
                  Indian Mobile Number
                </label>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-black text-white border border-zinc-700 rounded-xl font-mono focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-boat-red hover:bg-boat-redHover text-white rounded-xl text-xs sm:text-sm font-black shadow transition flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Search className="w-4 h-4" />
              <span>Track Live Package Status</span>
            </button>
          </form>
        </div>

        {/* Tracking Details Body */}
        {trackedData && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-zinc-950">
            <div className="flex items-center justify-between p-3.5 bg-black border border-zinc-800 rounded-2xl">
              <div>
                <span className="text-[11px] font-black text-boat-red uppercase">Current Status</span>
                <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2 mt-0.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-boat-red animate-ping" />
                  {trackedData.status}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 font-medium">
                  Carrier: <strong className="text-white">{trackedData.carrier}</strong> | AWB: <span className="font-mono text-zinc-300">{trackedData.awb}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">Est. Delivery</span>
                <div className="text-xs sm:text-sm font-black text-emerald-400">
                  {trackedData.estimatedDelivery}
                </div>
              </div>
            </div>

            {/* Timeline Events */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-zinc-300 uppercase tracking-wider">
                Transit Activity Log
              </h4>
              <div className="relative pl-6 space-y-4 border-l-2 border-zinc-800 ml-2">
                {trackedData.timeline.map((step: any, idx: number) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-boat-red border-2 border-black shadow" />
                    <div className="text-xs font-bold text-white">{step.event}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{step.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courier Help Box */}
            <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>Need delivery assistance? WhatsApp Support available 24/7.</span>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="text-boat-red font-bold hover:underline"
              >
                Chat Now
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
