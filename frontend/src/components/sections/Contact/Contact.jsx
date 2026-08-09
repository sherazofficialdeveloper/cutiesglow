'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplet, Award, Heart } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import contactService from '@/services/contactService';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const badges = [
    { icon: ShieldCheck, label: '100% Safe Formula', desc: 'Natural Ingredients' },
    { icon: Droplet, label: 'Dermatologically Tested', desc: 'Skin Safe' },
    { icon: Award, label: 'Money Back Guarantee', desc: '30-Day Promise' },
    { icon: Heart, label: 'Loved by Thousands', desc: 'Happy Customers' },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await contactService.subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white">
      {/* Badges row – grid on desktop, horizontal scroll on mobile (scrollbar hidden) */}
      <div className="py-8 sm:py-12 bg-[#faf9f6] border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center">
            {badges.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center group cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-dashed border-amber-500 bg-amber-50 flex items-center justify-center p-3 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div
                      className="w-full h-full rounded-full flex flex-col items-center justify-center shadow-inner p-2 text-center text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-amber-100 mb-1" />
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider leading-tight">
                        {item.label}
                      </span>
                    </div>
                  </div>
                  <span className="mt-3 text-xs sm:text-sm font-extrabold text-gray-800 tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-500">{item.desc}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: horizontal scroll – scrollbar hidden via custom class + inline style */}
          <div
            className="lg:hidden flex flex-nowrap gap-6 overflow-x-auto items-center hide-scrollbar"
            style={{
              scrollbarWidth: 'none',        // Firefox
              msOverflowStyle: 'none',       // IE/Edge
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {badges.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex-shrink-0 flex flex-col items-center text-center group cursor-default w-[140px]"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative w-28 h-28 rounded-full border-4 border-dashed border-amber-500 bg-amber-50 flex items-center justify-center p-3 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div
                      className="w-full h-full rounded-full flex flex-col items-center justify-center shadow-inner p-2 text-center text-white"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Icon className="w-7 h-7 text-amber-100 mb-1" />
                      <span className="text-[9px] font-black uppercase tracking-wider leading-tight">
                        {item.label}
                      </span>
                    </div>
                  </div>
                  <span className="mt-3 text-xs font-extrabold text-gray-800 tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-500">{item.desc}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subscription form – full container width, centered card */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#fcf0f5] rounded-2xl p-6 sm:p-8 border border-rose-100 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center">Sign up for updates</h3>
            <p className="text-sm text-gray-600 text-center mt-1">Get 10% off your first order</p>

            {subscribed ? (
              <div className="mt-4 p-3 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center space-x-2">
                <span>✅ Subscribed! Check your inbox for code THANKYOU10.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 text-base py-3 px-4"
                  size="large"
                />
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  disabled={loading || !email}
                  className="px-8 py-3 text-base font-bold"
                  size="large"
                >
                  Subscribe Now
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Style to hide scrollbar for Webkit browsers (Chrome, Safari, Edge) */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

Contact.displayName = 'Contact';
export default Contact;