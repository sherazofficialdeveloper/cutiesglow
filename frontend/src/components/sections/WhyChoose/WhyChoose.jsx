'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Sparkles, Leaf } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const WhyChoose = () => {
  const pillars = [
    {
      icon: Sparkles,
      title: '99.99% Pure German Bio-Gold',
      desc: 'Colloidal 24K gold nanoparticles act as bio-conductors, delivering active nutrients deep into skin tissue while reflecting light for instantaneous luminescence.',
      stat: '99.99% Purity',
    },
    {
      icon: Leaf,
      title: 'Swiss Alpine Rose Stem Cells',
      desc: 'Wild-harvested from rare flora thriving at 3,000 meters in the Swiss Alps, providing superior cellular stress resilience and barrier renewal.',
      stat: 'Organic Wildcraft',
    },
    {
      icon: ShieldCheck,
      title: 'Dermatologist Certified Clean',
      desc: 'Formulated under strict EU pharmaceutical standards. 100% hypoallergenic, non-comedogenic, and completely free from synthetic parabens or phthalates.',
      stat: '0% Toxins',
    },
    {
      icon: Award,
      title: '30-Day 100% Glow Guarantee',
      desc: 'Experience complete confidence in your purchase. If your skin does not look visibly more radiant, receive a full refund with our no-hassle guarantee.',
      stat: 'Risk-Free Trial',
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
            <Award className="w-4 h-4 text-[#E2712E]" /> Uncompromising Excellence
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#2D201A] tracking-tight mb-5 leading-tight">
            Why Choose <span className="text-[#E2712E]">Cutish</span>
          </h2>
          <p className="text-lg sm:text-xl text-[#5C4E46] font-medium leading-relaxed">
            Where Swiss bio-technology meets pure 24K European gold. Designed for royalty, accessible to those who demand the finest skincare.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 sm:p-9 rounded-3xl border border-[#EBE0D5] hover:border-[#E2712E]/60 shadow-md hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#E2712E]/10 text-[#E2712E] flex items-center justify-center mb-6 group-hover:bg-[#E2712E] group-hover:text-white transition-all duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-xs font-extrabold tracking-widest text-[#E2712E] uppercase mb-2">{pillar.stat}</div>
                <h3 className="text-2xl font-serif font-bold text-[#2D201A] mb-3.5 leading-snug">{pillar.title}</h3>
                <p className="text-base text-[#5C4E46] font-medium leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

WhyChoose.displayName = 'WhyChoose';

export default WhyChoose;