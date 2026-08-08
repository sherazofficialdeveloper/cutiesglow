'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Button from '@/components/common/Button/Button';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';

export default function AboutPage() {
  const features = [
    { title: 'Natural Ingredients', description: 'We use only the finest natural ingredients sourced from around the world.', icon: '🌿' },
    { title: 'Dermatologically Tested', description: 'All our products are tested by dermatologists for safety and efficacy.', icon: '🔬' },
    { title: 'Cruelty Free', description: 'We never test on animals. Our products are 100% cruelty-free.', icon: '🐰' },
    { title: 'Made with Love', description: 'Every product is crafted with care and passion for beautiful skin.', icon: '💖' },
  ];

  const milestones = [
    { year: '2018', title: 'Founded', description: 'Cutish was born with a mission to make natural skincare accessible.' },
    { year: '2019', title: 'First Product', description: 'Launched our first product - the Oat Milk Honey Soap.' },
    { year: '2020', title: 'Expanded', description: 'Grew our product line to include serums and creams.' },
    { year: '2022', title: 'Reached 10,000+ Customers', description: '10,000+ happy customers trust Cutish for their skincare.' },
  ];

  // ✅ FAQ Data (same as homepage FAQ section)
  const faqs = [
    {
      question: 'What makes Cuties Glow different?',
      answer: 'Our products combine nature and science—clean, plant-based ingredients blended with dermatologist-approved actives to give you real, visible results.'
    },
    {
      question: 'Are your products safe for sensitive skin?',
      answer: 'Yes! Every formula is tested to be gentle and effective for all skin types, including sensitive skin.'
    },
    {
      question: 'Are your products vegan and cruelty-free?',
      answer: 'Absolutely. Cuties Glow is 100% cruelty-free and most of our products are vegan-friendly.'
    },
    {
      question: 'Can I use multiple Cuties Glow products together?',
      answer: 'Yes. Our products are designed to complement each other, creating a complete skincare routine for glowing, healthy skin.'
    },
    {
      question: 'Where are your products made?',
      answer: 'All Cuties Glow products are proudly made in FDA-registered, GMP-certified facilities for quality and safety.'
    },
    {
      question: 'Do you offer subscriptions?',
      answer: 'Yes! Subscribe and save to ensure you never run out of your favorite products—plus enjoy exclusive discounts.'
    }
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-[#F7F2EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                About <span style={{ color: colors.primary }}>Cutish</span>
              </h1>
              <p className="text-lg text-gray-600 mt-4 leading-relaxed">
                Cuties Glow is a premium skincare brand dedicated to providing natural, 
                effective solutions for your daily glow routine. Our products are crafted with 
                care using the finest ingredients to help you achieve healthy, radiant skin.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Button href="/products" variant="primary" size="large">
                  Shop Our Products
                </Button>
                <Button href="/contact" variant="outline" size="large">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27d2d707c338?w=600&h=400&fit=crop"
                alt="About Cutish"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✨</span>
                  <div>
                    <p className="font-bold text-gray-900">10,000+</p>
                    <p className="text-xs text-gray-500">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Why Choose Cutish"
            subtitle="We believe in the power of nature, backed by science"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-[#FFF8F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Story"
            subtitle="A journey of passion for natural beauty"
          />
          <div className="mt-8 space-y-6 text-gray-700 leading-relaxed text-center sm:text-left">
            <p>
              Cuties Glow was born from a simple belief: that everyone deserves to feel 
              confident and beautiful in their own skin. Our founder, Razia, spent years 
              researching the best natural ingredients from around the world to create 
              skincare that truly works.
            </p>
            <p>
              Today, Cutish is Pakistan's trusted skincare brand, known for our commitment 
              to quality, natural ingredients, and visible results. Every product in our 
              collection is carefully formulated to address specific skin concerns while 
              being gentle enough for daily use.
            </p>
            <p>
              Our mission is simple: to help you achieve glowing, healthy skin with a 
              simple, effective routine. We believe in transparency, sustainability, 
              and the power of nature combined with science.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Journey"
            subtitle="A timeline of growth and innovation"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-extrabold" style={{ color: colors.primary }}>
                  {item.year}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mt-2">{item.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ FAQ Section (Replaces Team) */}
      <section className="py-16 bg-[#F7F2EA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our products"
          />
          <div className="mt-8 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Start Your Glow Journey?</h2>
          <p className="text-white/80 mt-2 text-lg">Join thousands of happy customers who trust Cutish for their skincare.</p>
          <Button href="/products" variant="outline" size="large" className="mt-6" style={{ color: colors.white, borderColor: colors.white }}>
            Shop Now
          </Button>
        </div>
      </section>
    </div>
  );
}