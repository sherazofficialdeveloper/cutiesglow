'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

export default function ContactPage() {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'info@cutishbyrazias.com', href: 'mailto:info@cutishbyrazias.com' },
    { icon: Phone, label: 'Phone', value: '+1 (800) 555-GLOW', href: 'tel:+1800555GLOW' },
    { icon: MapPin, label: 'Address', value: 'Pakistan', href: '#' },
    { icon: Clock, label: 'Working Hours', value: 'Mon-Fri: 9AM - 8PM', href: '#' },
  ];

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${spacing[12]} ${spacing[6]}`,
  };

  return (
    <div>
      {/* ✅ Hero Section with Background Image */}
      <section
        style={{
          backgroundImage: 'url(/contact-hero-bg.jpg)', // ✅ Apni image path yahan daalein
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: `${spacing[20]} ${spacing[6]}`,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Dark overlay for better text visibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.white,
              marginBottom: spacing[4],
            }}
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: typography.fontSize.lg,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            We'd love to hear from you. Reach out with any questions or feedback.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Grid */}
      <div style={containerStyles}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: spacing[6],
          }}
        >
          {contactInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: spacing[6],
                  backgroundColor: colors.white,
                  borderRadius: '16px',
                  border: `1px solid ${colors.border.light}`,
                  textDecoration: 'none',
                  color: colors.text.primary,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Icon size={32} color={colors.primary} style={{ marginBottom: spacing[3] }} />
                <h3 style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.bold, marginBottom: spacing[1] }}>
                  {item.label}
                </h3>
                <p style={{ fontSize: typography.fontSize.sm, color: colors.text.muted }}>
                  {item.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* Optional: Contact Form Section */}
        <div style={{ marginTop: spacing[12] }}>
          <h2 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.extrabold, textAlign: 'center', marginBottom: spacing[6] }}>
            Send Us a Message
          </h2>
          <form
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: spacing[4],
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: spacing[3],
                borderRadius: '8px',
                border: `1px solid ${colors.border.light}`,
                fontSize: typography.fontSize.base,
                outline: 'none',
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: spacing[3],
                borderRadius: '8px',
                border: `1px solid ${colors.border.light}`,
                fontSize: typography.fontSize.base,
                outline: 'none',
              }}
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              style={{
                padding: spacing[3],
                borderRadius: '8px',
                border: `1px solid ${colors.border.light}`,
                fontSize: typography.fontSize.base,
                outline: 'none',
                resize: 'vertical',
              }}
            />
            <button
              type="submit"
              style={{
                padding: `${spacing[3]} ${spacing[6]}`,
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '8px',
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.bold,
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primaryDark || '#C95F1E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.primary; }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}