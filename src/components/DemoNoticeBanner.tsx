import React, { useState } from 'react';
import { Info, X, ShieldCheck } from 'lucide-react';

export const DemoNoticeBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-black border-b border-zinc-800 text-zinc-300 text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded text-[11px] border border-amber-500/30">
            <Info className="w-3 h-3" /> DEMO STORE
          </span>
          <p className="text-slate-300 line-clamp-1 sm:line-clamp-none">
            This is a production-ready dropshipping demo populated with 3 sample products, demo customer reviews, and integrated Razorpay & COD checkout flows.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-400 font-medium text-xs">
            <ShieldCheck className="w-3.5 h-3.5" /> Razorpay Test Mode Ready
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-1 rounded transition"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

