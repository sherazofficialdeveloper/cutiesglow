'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Button from '@/components/common/Button/Button';

const BrandStory = () => {
  const handleShopClick = () => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="brand-usp" className="py-10 sm:py-14 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fcf0f5] border border-rose-100/80 rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Cutish by Razia's
                <br />
                <span style={{ color: colors.primary }}>Premium Skincare</span>
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-rose-800/80 italic tracking-wide">
                Pakistan's trusted skincare brand — simple routine, fast results.
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong className="text-gray-900 font-extrabold">Cutish by Razia's</strong> brings thoughtfully crafted skincare for every type. Our promise is simple: <span style={{ color: colors.primary }}>just 3 minutes</span> of easy routine, and your skin will look <span style={{ color: colors.primary }}>healthier, smoother</span> and naturally <span style={{ color: colors.primary }}>glowing</span>.
              </p>
              <div className="pt-2 flex justify-center lg:justify-start">
                <span className="inline-flex items-center text-white px-6 py-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase shadow-md" style={{ backgroundColor: colors.primary }}>
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  So Easy — Only 3 Minutes
                </span>
              </div>
              <div className="pt-1 flex justify-center lg:justify-start">
                <Button
                  onClick={handleShopClick}
                  variant="primary"
                  size="large"
                  icon={<Sparkles className="w-4 h-4 text-amber-200" />}
                >
                  Shop Collection
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="relative w-full max-w-sm bg-white/60 backdrop-blur-xs p-4 rounded-3xl border border-rose-200/60 shadow-inner flex flex-col items-center justify-center overflow-hidden">
                <img
                  src="/images/pic.jpg"
                  alt="Cutish 3-Minute Glow"
                  className="w-full h-auto rounded-2xl object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400/E2712E/FFFFFF?text=Cutish';
                  }}
                />
                <div className="absolute top-3 left-3 bg-sky-50 text-sky-600 flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-sky-100 shadow-md">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-[10px] font-black uppercase tracking-wider">3 Mins</span>
                </div>
                <div className="absolute top-3 right-3 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-full shadow-lg rotate-3" style={{ backgroundColor: colors.primary }}>
                  ✨ So Easy
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm font-extrabold text-[10px] sm:text-xs px-4 py-1.5 rounded-full shadow-md border border-rose-200" style={{ color: colors.primary }}>
                  ⚡ Only 3 Minutes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

BrandStory.displayName = 'BrandStory';

export default BrandStory;