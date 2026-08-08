'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Container from '@/components/common/Container/Container';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import Button from '@/components/common/Button/Button';

const BeforeAfter = () => {
  // Direct data - No loading state
  const items = [
    {
      id: 1,
      beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&sat=-65&con=120',
      afterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
      description: 'From dry and patchy to deeply nourished, soft, and hydrated skin',
    },
    {
      id: 2,
      beforeImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&sat=-60&con=115',
      afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      description: 'Turn dull, uneven tone into a radiant, glowing complexion',
    },
    {
      id: 3,
      beforeImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600&sat=-55&con=115',
      afterImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
      description: 'Transform open pores into a smooth, flawless finish',
    },
  ];

  return (
    <section id="before-after" className="py-16 lg:py-20 bg-[#FAF9F6] relative">
      <Container>
        {/* Simplified Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Real Results</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Before <span className="text-[#E2712E]">&amp;</span> After
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Visible transformation in just minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#EBE0D5] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-[16/10] w-full bg-gray-100 grid grid-cols-2 overflow-hidden">
                {/* Before */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-[10px] tracking-wider bg-black/30 backdrop-blur-sm px-3 py-0.5 rounded-full">
                    Before
                  </span>
                </div>

                {/* After */}
                <div className="relative overflow-hidden">
                  <img
                    src={item.afterImage}
                    alt="After"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-[10px] tracking-wider bg-[#E2712E]/80 backdrop-blur-sm px-3 py-0.5 rounded-full">
                    After
                  </span>
                </div>
              </div>

              <div className="p-4 text-center">
                <p className="text-sm font-medium text-gray-700 leading-snug">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            href="/products"
            variant="primary"
            size="medium"
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Start Your Glow Journey
          </Button>
        </div>
      </Container>
    </section>
  );
};

BeforeAfter.displayName = 'BeforeAfter';

export default BeforeAfter;