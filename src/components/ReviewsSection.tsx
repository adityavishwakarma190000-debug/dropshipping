import React from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, AlertCircle } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../data/reviews';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#0a0a0a] border-b border-zinc-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Demo Disclosure */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-boat-red font-black text-xs uppercase tracking-wider bg-red-950/60 px-2.5 py-1 rounded border border-red-900/60">
            <MessageSquare className="w-3.5 h-3.5" /> Buyer Experiences
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
            Verified Customer Reviews
          </h2>

          <div className="inline-flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-md font-bold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>Demonstration Notice: These sample testimonials illustrate real-world buyer review presentation.</span>
          </div>
        </div>

        {/* Rating Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-1 shadow-sm">
            <div className="text-3xl font-black text-white">4.8 / 5</div>
            <div className="flex justify-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <div className="text-xs font-bold text-zinc-500">Based on 750+ verified ratings</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-1 shadow-sm">
            <div className="text-3xl font-black text-emerald-400">98.4%</div>
            <div className="text-xs font-black text-white uppercase tracking-wide">Recommendation Rate</div>
            <div className="text-xs font-bold text-zinc-500">Indian shoppers recommend to friends</div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-1 shadow-sm">
            <div className="text-3xl font-black text-blue-400">2-3 Days</div>
            <div className="text-xs font-black text-white uppercase tracking-wide">Average Transit Time</div>
            <div className="text-xs font-bold text-zinc-500">Across major Indian Metros</div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3 shadow-xl hover:border-zinc-700 transition-all"
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm text-white">{rev.author}</span>
                    {rev.verifiedPurchase && (
                      <span className="inline-flex items-center gap-0.5 text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded text-[10px] font-black border border-emerald-500/30">
                        <CheckCircle className="w-3 h-3" /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-zinc-400">{rev.city}</div>
                </div>

                <div className="text-right">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-zinc-500">{rev.date}</span>
                </div>
              </div>

              {/* Review Content */}
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-white">{rev.title}</h4>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed font-medium">{rev.comment}</p>
              </div>

              {/* Helpful count */}
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 pt-2 border-t border-zinc-800 font-bold">
                <ThumbsUp className="w-3.5 h-3.5 text-zinc-400" />
                <span>{rev.helpfulCount} people found this helpful</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
