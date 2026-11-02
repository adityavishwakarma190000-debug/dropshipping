import React, { useState } from 'react';
import {
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  X,
  CreditCard,
  Truck,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<{ title: string; content: string } | null>(null);

  const policies = {
    shipping: {
      title: 'Pan-India Shipping Policy',
      content: `1. Order Processing: All orders are processed and packed within 24 hours of confirmation.
2. Delivery Timelines:
   - Metro Cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune): 2 to 3 business days.
   - Rest of India: 3 to 5 business days.
   - Remote & North-East / J&K: 5 to 7 business days.
3. Logistics Partners: Orders are delivered via BlueDart Express, Delhivery, and Xpressbees.
4. Shipping Charges: FREE shipping on all orders above ₹999. A nominal fee of ₹99 applies on smaller orders.
5. Tracking: Automated live SMS & WhatsApp tracking links are dispatched immediately after carrier handover.`,
    },
    refund: {
      title: '7-Day Return & Replacement Policy',
      content: `1. Eligibility: We provide a 100% free doorstep replacement within 7 days of delivery for any damaged, defective, or incorrect products.
2. Doorstep Pickup: Our courier partner will pick up the item directly from your address at zero extra charge.
3. Processing Time: Once picked up, replacement units are dispatched within 24 hours.
4. Refunds: For prepaid orders where replacement is unavailable, full refunds are processed directly back to your original UPI/bank account within 3 to 5 working days.`,
    },
    privacy: {
      title: 'Privacy & Data Protection Policy',
      content: `1. We strictly respect your privacy. Customer phone numbers and addresses are used solely for order processing and courier delivery.
2. We never sell or share customer data with third-party advertisers.
3. Payment credentials (card numbers, UPI PINs, CVVs) are processed directly by RBI-certified Razorpay payment gateways and never touch or reside on our servers.`,
    },
    terms: {
      title: 'Terms of Service',
      content: `1. By placing an order with Zenith India, you agree to provide accurate Indian contact and delivery details.
2. Cash on Delivery (COD) orders may require phone or SMS OTP verification before warehouse dispatch to avoid fraudulent orders.
3. All warranty claims are governed by the manufacturer warranty terms provided with the product packaging.`,
    },
  };

  return (
    <footer className="bg-black text-zinc-400 text-xs sm:text-sm pt-14 pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info & Registered Address (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-black text-sm">
                Z
              </div>
              <span className="font-black text-xl tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                ZENITH<span className="text-boat-red">.</span>
              </span>
              <span className="text-[10px] font-black bg-zinc-900 text-zinc-300 border border-zinc-700 px-2 py-0.5 rounded">
                INDIA
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Zenith India is a modern D2C dropshipping brand delivering curated wireless audio, smart workspace essentials, and premium lifestyle gear across all 19,000+ Indian PIN codes.
            </p>

            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Registered Indian Office:</strong> Zenith Lifestyle Tech Pvt Ltd, 100-Ft Road, Indiranagar, Bengaluru, Karnataka - 560038
                </span>
              </div>
              <div className="text-[11px] text-slate-500 pl-6">
                CIN: U72900KA2026PTC184291 | GSTIN: 29AAACZ1234F1Z9 (Demo Placeholder)
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Shop
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#products-section" className="hover:text-white transition">
                  Wireless ANC Audio
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition">
                  Smart Workspace Lamps
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition">
                  Temperature OLED Flasks
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-white transition">
                  Bestsellers &amp; Deals
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Support
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-300">WhatsApp: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-300">support@zenithindia.store</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Mon - Sat: 10:00 AM - 7:00 PM IST</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700/30 hover:bg-emerald-700/50 border border-emerald-600/40 text-emerald-300 rounded-lg text-xs font-semibold transition"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Legal Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Policies &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActivePolicy(policies.shipping)}
                  className="hover:text-white transition text-left"
                >
                  Shipping &amp; Delivery Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy(policies.refund)}
                  className="hover:text-white transition text-left"
                >
                  7-Day Return &amp; Replacement
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy(policies.privacy)}
                  className="hover:text-white transition text-left"
                >
                  Privacy &amp; Data Protection
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicy(policies.terms)}
                  className="hover:text-white transition text-left"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Supported Payments & Courier Partners Bar */}
        <div className="pt-8 border-t border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Payment Badges */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure Razorpay &amp; UPI Gateway
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-300 font-mono">
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Google Pay</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">PhonePe</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Paytm UPI</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">RuPay</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Visa / Mastercard</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">NetBanking</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Cash on Delivery</span>
            </div>
          </div>

          {/* Logistics Partners */}
          <div className="space-y-2 md:text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center md:justify-end gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-400" /> Pan-India Express Courier Network
            </span>
            <div className="flex flex-wrap items-center md:justify-end gap-2 text-[10px] text-slate-300 font-mono">
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">BlueDart</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Delhivery</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">Xpressbees</span>
              <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">DTDC Air</span>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          <p>© 2026 Zenith Lifestyle Tech India. All rights reserved. Sample dropshipping demo storefront.</p>
        </div>

      </div>

      {/* Policy Modal Viewer */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                {activePolicy.title}
              </h3>
              <button
                onClick={() => setActivePolicy(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line max-h-80 overflow-y-auto pr-1">
              {activePolicy.content}
            </div>
            <button
              onClick={() => setActivePolicy(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

