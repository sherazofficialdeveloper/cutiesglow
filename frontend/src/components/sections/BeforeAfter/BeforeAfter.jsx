'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import Container from '@/components/common/Container/Container';
import Button from '@/components/common/Button/Button';

const BeforeAfter = () => {
  const items = [
    {
      id: 1,
      beforeImage: '/before.webp',
      afterImage: '/after.webp',
      description: 'From dry and patchy to deeply nourished, soft, and hydrated skin',
    },
    {
      id: 2,
      beforeImage: '/before 3.avif',
      afterImage: '/after 2.avif',
      description: 'Turn dull, uneven tone into a radiant, glowing complexion',
    },
    {
      id: 3,
      beforeImage: '/before.avif',
      afterImage: '/after 3.avif',
      description: 'Transform open pores into a smooth, flawless finish',
    },
  ];

  return (
    <section className="py-6 md:py-10 bg-[#FAF9F6]">
      <Container className="px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Before <span className="text-[#E2712E]">&amp;</span> After
          </h2>
          <p className="text-gray-600 text-sm mt-1">Visible transformation in just minutes</p>
        </div>

        {/* Horizontal scroll – scrollbar hidden, card size increased on desktop */}
        <div
          className="flex flex-nowrap gap-3 sm:gap-4 overflow-x-auto pb-4 hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-[46vw] sm:w-[300px] md:w-[340px] lg:w-[360px] bg-white rounded-2xl overflow-hidden border border-[#EBE0D5] shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[16/10] w-full bg-gray-100 grid grid-cols-2 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={item.beforeImage}
                    alt="Before"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-[10px] tracking-wider bg-black/30 backdrop-blur-sm px-3 py-0.5 rounded-full">
                    Before
                  </span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={item.afterImage}
                    alt="After"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-[10px] tracking-wider bg-[#E2712E]/80 backdrop-blur-sm px-3 py-0.5 rounded-full">
                    After
                  </span>
                </div>
              </div>
              <div className="p-3 text-center">
                <p className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
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

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

BeforeAfter.displayName = 'BeforeAfter';
export default BeforeAfter;