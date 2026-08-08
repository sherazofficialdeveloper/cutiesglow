'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import faqService from '@/services/faqService';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await faqService.getActiveFaqs();
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  if (loading) return <div className="py-16 text-center">Loading...</div>;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Everything You Need to Know"
        />

        <div>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-[#EBE0D5] py-5 cursor-pointer hover:bg-[#FFF8F2] transition-all"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center text-lg font-medium text-gray-900">
                <span>{faq.question}</span>
                <span className="text-2xl text-[#E2712E] transition-transform duration-300" style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0)' }}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-base text-gray-600 leading-relaxed pt-3 pr-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

FAQ.displayName = 'FAQ';

export default FAQ;