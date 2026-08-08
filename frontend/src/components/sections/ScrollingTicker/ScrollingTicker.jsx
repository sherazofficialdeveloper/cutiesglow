'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';

const ScrollingTicker = () => {
  const promises = [
    'GET 10% OFF ON ALL ORDERS OVER $20 USING CODE "THANKYOU10"',
    'Premium Botanical Skincare • Natural Ingredients',
    'Dermatologically Tested • 100% Satisfaction Guarantee',
    'Free Shipping on orders over $35',
  ];

  return (
    <div className="bg-[#111111] text-white py-4 overflow-hidden border-y border-rose-900/40 select-none">
      <div className="flex animate-marquee space-x-12 items-center whitespace-nowrap">
        {[...promises, ...promises, ...promises, ...promises].map((text, idx) => (
          <div key={idx} className="inline-flex items-center space-x-4">
            <Sparkles className="w-4 h-4" style={{ color: colors.accent }} />
            <span className="text-sm sm:text-base font-extrabold tracking-wider uppercase text-rose-100 font-serif">
              {text}
            </span>
            <Heart className="w-3.5 h-3.5 mx-2" style={{ color: colors.primary }} />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

ScrollingTicker.displayName = 'ScrollingTicker';

export default ScrollingTicker;