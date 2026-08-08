'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const Ingredients = () => {
  const ingredients = [
    {
      id: 'ing-1',
      name: '24K Bio-Colloidal Gold',
      scientificName: 'Aurum Metallicum Colloidale',
      description: 'Micro-pulverized 99.99% pure German gold particles that act as bio-conductors, delivering active nutrients deep into dermal layers while reflecting light for instant radiance.',
      benefit: 'Stimulates natural collagen production and instantly illuminates skin with a filter-free golden glow.',
      origin: 'Germany',
      purity: '99.99%',
      image: '/images/ingredient-gold.jpg',
    },
    {
      id: 'ing-2',
      name: 'Swiss Alpine Rose Stem Cells',
      scientificName: 'Rhododendron Ferrugineum',
      description: 'Extracted from rare Alpine roses thriving at 3,000 meters, these resilient stem cells protect the skin against extreme environmental stress while promoting cellular renewal.',
      benefit: 'Accelerates epidermal regeneration and reduces visible signs of aging by 76% in clinical studies.',
      origin: 'Swiss Alps',
      purity: 'Organic Wildcraft',
      image: '/images/ingredient-rose.jpg',
    },
    {
      id: 'ing-3',
      name: 'Japanese Akoya Pearl Extract',
      scientificName: 'Pinctada Fucata',
      description: 'Crushed pearls containing 20 essential amino acids that gently refine enlarged pores, smooth rough texture, and balance sebum production for a porcelain finish.',
      benefit: 'Refines pores and imparts a silky, matte luminosity to the skin surface.',
      origin: 'Japan',
      purity: 'Sustainable',
      image: '/images/ingredient-pearl.jpg',
    },
    {
      id: 'ing-4',
      name: 'Quad-Weight Hyaluronic Acid',
      scientificName: 'Sodium Hyaluronate Crosspolymer',
      description: 'A multi-molecular weight hyaluronic acid complex that delivers hydration to all skin layers, from the surface to the deep dermis, locking in moisture for up to 72 hours.',
      benefit: 'Provides intense, lasting hydration that plumps fine lines and creates a dewy glass-skin effect.',
      origin: 'France',
      purity: '99.9%',
      image: '/images/ingredient-hyaluronic.jpg',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F7F2EA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2712E]/10 text-[#E2712E] text-xs font-extrabold uppercase tracking-widest mb-4 border border-[#E2712E]/20">
            <Sparkles className="w-4 h-4 text-[#E2712E]" /> Precious Botanical Extracts
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#2D201A] tracking-tight mb-4 leading-tight">
            Precious <span className="text-[#E2712E]">Active Ingredients</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#5C4E46] font-medium leading-relaxed">
            Every bottle is formulated with bio-active ingredients ethically sourced from certified European and Asian micro-regions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((ing, idx) => (
            <motion.div
              key={ing.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EBE0D5] hover:border-[#E2712E] shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE0D5]">
                <img
                  src={ing.image}
                  alt={ing.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/E2712E/FFFFFF?text=Ingredient';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D201A]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="text-xs font-extrabold tracking-widest uppercase text-[#E2712E]">
                    {ing.origin}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#E2712E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>

              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#5C4E46] block mb-1">
                    {ing.scientificName}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#2D201A] mb-2 group-hover:text-[#E2712E] transition-colors leading-snug">
                    {ing.name}
                  </h3>
                  <p className="text-base text-[#5C4E46] font-medium line-clamp-3 mb-5 leading-relaxed">
                    {ing.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EBE0D5] flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-[#2D201A]">Purity Level</span>
                  <span className="text-[#E2712E] font-extrabold">{ing.purity}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

Ingredients.displayName = 'Ingredients';

export default Ingredients;