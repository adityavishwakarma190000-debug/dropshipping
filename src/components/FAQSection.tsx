import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Cash on Delivery (COD) work?',
      a: 'When you choose Cash on Delivery at checkout, you do not pay anything upfront. Once the delivery agent arrives at your doorstep, you can inspect the package and pay using either cash or by scanning the courier agent\'s UPI QR code (Google Pay, PhonePe, Paytm).',
    },
    {
      q: 'Are there any hidden customs duties or additional taxes for Indian customers?',
      a: 'Zero hidden fees. All prices listed on Zenith are 100% inclusive of all Indian GST taxes, customs clearance, and import duties. The amount you see at checkout is the exact final price you pay.',
    },
    {
      q: 'How long does shipping take to my PIN code?',
      a: 'Orders are dispatched within 24 hours from our warehouses. Deliveries to Metro cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Kolkata, Pune) typically arrive in 2–3 business days. Non-metro Tier-2 and Tier-3 cities receive delivery within 3–5 business days via BlueDart and Delhivery.',
    },
    {
      q: 'Is paying with UPI or Credit/Debit Cards safe on your website?',
      a: 'Yes, 100%. We process all online payments through Razorpay, India\'s leading RBI-authorized payment aggregator with Level-1 PCI-DSS compliance and 256-bit SSL bank-grade encryption. We never store or view your card or banking credentials.',
    },
    {
      q: 'What is your 7-Day Doorstep Replacement Guarantee?',
      a: 'If your product arrives damaged, broken, or has any hardware defect, you can request a 100% free doorstep pickup and immediate replacement within 7 days of delivery. Reach out via our dedicated WhatsApp support or email with your Order ID.',
    },
    {
      q: 'How can I track my shipment once it is ordered?',
      a: 'As soon as your package is dispatched, we send you an automated SMS and WhatsApp notification containing your BlueDart or Delhivery AWB tracking code. You can also click "Track Order" in the top header anytime to see live courier movements.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#0d0d0d] border-b border-zinc-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 text-boat-red font-black text-xs uppercase tracking-wider bg-red-950/60 px-2.5 py-1 rounded border border-red-900/60">
            <HelpCircle className="w-3.5 h-3.5" /> Buyer Assurance &amp; FAQs
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-zinc-400 font-medium">
            Everything you need to know about Indian shipping, COD rules, Razorpay security, and replacements.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-zinc-800 rounded-xl bg-zinc-950 overflow-hidden transition shadow-sm hover:border-zinc-700"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-black text-sm sm:text-base text-white hover:text-boat-red transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-boat-red' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/80 font-medium animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
