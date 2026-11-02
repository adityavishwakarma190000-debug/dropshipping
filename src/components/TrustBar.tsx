import React from 'react';
import { Truck, Banknote, RotateCcw, ShieldCheck } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const guarantees = [
    {
      icon: <Truck className="w-5 h-5 text-blue-400" />,
      title: 'Free Pan-India Delivery',
      desc: 'On all orders above ₹999 with BlueDart & Delhivery',
      badge: '19,000+ PINs',
    },
    {
      icon: <Banknote className="w-5 h-5 text-emerald-400" />,
      title: 'Cash on Delivery (COD)',
      desc: 'Pay cash or UPI QR at your doorstep on delivery',
      badge: 'Zero Risk',
    },
    {
      icon: <RotateCcw className="w-5 h-5 text-boat-red" />,
      title: '7-Day Free Replacement',
      desc: 'Hassle-free doorstep pickup if defective or damaged',
      badge: 'Guaranteed',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-400" />,
      title: '1-Year Brand Warranty',
      desc: '100% genuine products with dedicated WhatsApp support',
      badge: 'Direct Brand',
    },
  ];

  return (
    <section className="bg-[#0d0d0d] border-y border-zinc-800/80 py-6 sm:py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3.5 p-3.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900/80 transition-all shadow-sm"
            >
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-sm flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-sm font-extrabold text-white truncate">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 leading-snug font-medium">
                  {item.desc}
                </p>
                <span className="inline-block mt-1 text-[10px] font-black uppercase tracking-wider text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
