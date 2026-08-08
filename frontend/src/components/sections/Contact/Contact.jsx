'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Droplet, Award, Heart, Mail, MapPin, Phone } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
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
      <div className="py-12 sm:py-16 bg-[#faf9f6] border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center justify-items-center">
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
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center shadow-inner p-2 text-center text-white" style={{ backgroundColor: colors.primary }}>
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
        </div>
      </div>

      <div className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#fcf0f5] rounded-2xl p-6 sm:p-8 border border-rose-100">
              <h3 className="text-2xl font-extrabold text-gray-900">Sign up for updates</h3>
              <p className="text-sm text-gray-600 mt-1">Get 10% off your first order</p>
              
              {subscribed ? (
                <div className="mt-4 p-3 bg-emerald-100 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center space-x-2">
                  <span>✅ Subscribed! Check your inbox for code THANKYOU10.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1"
                  />
                  <Button type="submit" variant="primary" loading={loading} disabled={loading || !email}>
                    Subscribe Now
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                <Mail className="w-5 h-5" style={{ color: colors.primary }} />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-bold text-gray-900">info@cutishbyrazias.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                <Phone className="w-5 h-5" style={{ color: colors.primary }} />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-bold text-gray-900">+1 (800) 555-GLOW</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-bold text-gray-900">Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Contact.displayName = 'Contact';

export default Contact;