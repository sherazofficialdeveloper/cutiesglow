'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';

const PromoBanner = ({ imageUrl, altText = 'Promotional Banner', id }) => {
  return (
    <section id={id} className="w-full py-8 sm:py-12 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-auto object-cover block"
          />
        </div>
      </div>
    </section>
  );
};

PromoBanner.displayName = 'PromoBanner';

export default PromoBanner;