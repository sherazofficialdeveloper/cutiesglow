'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Check } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const Benefits = () => {
  const [activeTab, setActiveTab] = useState(0);

  const benefits = [
    {
      id: 'luminosity',
      title: 'Instant 3-Min Luminosity',
      subtitle: '+94% Light Reflection & Filter-Free Glass Skin',
      desc: 'Micro-pulverized 24K colloidal gold particles form an invisible light-refracting matrix across the skin, immediately diffusing shadow lines and imparting a golden, dewy radiance.',
      highlights: ['Light-deflecting gold particles', 'Instant glass-skin sheen', 'Zero greasy residue', 'Lasts up to 24 hours'],
      statValue: '+94%',
      statLabel: 'Luminosity Boost',
    },
    {
      id: 'repair',
      title: 'Epidermal Barrier Repair',
      subtitle: 'Restores Lipid Integrity & Seals 72H Hydration',
      desc: '5 bio-identical ceramides paired with fermented oat lipids fill microscopic gaps in damaged skin barriers, sealing moisture and protecting against environmental stress.',
      highlights: ['5 Bio-Identical Ceramides', 'Calms redness in seconds', 'Prevents trans-epidermal water loss', 'Reinforces skin immunity'],
      statValue: '72H',
      statLabel: 'Moisture Retention',
    },
    {
      id: 'cellular',
      title: 'Cellular Anti-Aging Renewal',
      subtitle: 'Swiss Stem Cell Acceleration & Elasticity Booster',
      desc: 'Extracted from Swiss Alpine Roses growing at 3,000m, these resilient botanical stem cells stimulate epidermal stem vitality, encouraging rapid cellular turnover.',
      highlights: ['Swiss Alpine Rose Stem Cells', 'Reduces wrinkle depth', 'Boosts natural collagen +34%', 'Improves skin firmness'],
      statValue: '+34%',
      statLabel: 'Collagen Density',
    },
    {
      id: 'pores',
      title: 'Micro-Pore Refining',
      subtitle: 'Akoya Pearl Extract & Smooth Satin Finish',
      desc: 'Crushed Japanese Akoya pearl powder contains 20 amino acids that gently refine enlarged pores, smooth rough texture, and balance sebum production.',
      highlights: ['Japanese Akoya Pearl Powder', 'Tightens enlarged pores', 'Silky porcelain finish', 'Balancing amino acids'],
      statValue: '-68%',
      statLabel: 'Visibly Reduced Pores',
    },
  ];

  const currentBenefit = benefits[activeTab];

  return (
    <section className="py-24 lg:py-32 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2712E]/10 text-[#E2712E] text-xs font-extrabold uppercase tracking-widest mb-4 border border-[#E2712E]/20">
            <Zap className="w-4 h-4 text-[#E2712E]" /> Proven Clinical Transformations
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#2D201A] tracking-tight leading-tight mb-4">
            Targeted <span className="text-[#E2712E]">Skincare Benefits</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {benefits.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-[#2D201A] text-white shadow-xl'
                  : 'bg-[#F7F2EA] text-[#5C4E46] hover:bg-[#E2712E] hover:text-white border border-[#EBE0D5]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <motion.div
          key={currentBenefit.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-8 lg:p-14 border border-[#EBE0D5] shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-extrabold text-[#E2712E] tracking-widest uppercase">CLINICAL STUDY FEATURE</span>
              <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D201A] mt-2 mb-2">{currentBenefit.title}</h3>
              <p className="text-base font-bold text-[#E2712E] mb-6">{currentBenefit.subtitle}</p>
              <p className="text-lg text-[#5C4E46] font-medium leading-relaxed mb-8">{currentBenefit.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentBenefit.highlights.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-base font-semibold text-[#2D201A]">
                    <div className="w-6 h-6 rounded-full bg-[#E2712E]/15 text-[#E2712E] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full bg-[#2D201A] text-white p-8 sm:p-10 rounded-3xl border border-[#E2712E]/30 text-center shadow-2xl">
                <div className="text-5xl lg:text-6xl font-serif font-extrabold text-[#E2712E] mb-3">{currentBenefit.statValue}</div>
                <div className="text-xs font-extrabold tracking-widest text-white uppercase mb-2">{currentBenefit.statLabel}</div>
                <div className="mt-4 pt-4 border-t border-[#E2712E]/20 text-xs text-white/80 font-medium leading-relaxed">
                  Verified in 12-week clinical trials conducted across 120 clients aged 25–65.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

Benefits.displayName = 'Benefits';

export default Benefits;