'use client';

import React, { useState } from 'react';
import { X, Sparkles, Truck, Clock, CreditCard } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const messages = [
    { icon: Sparkles, text: '✨ Get 10% OFF on your first order using code: WELCOME10' },
    { icon: Truck, text: '🚚 Free shipping on orders over $35' },
    { icon: Clock, text: '⏱️ 3-Minute Glow Promise - Visible results in 3 minutes!' },
    { icon: CreditCard, text: '💳 Pay with Zelle or PayPal - Safe & Secure' },
  ];

  if (!isVisible) return null;

  const Icon = messages[0].icon;

  return (
    <div style={{
      backgroundColor: colors.primary,
      color: colors.white,
      padding: '8px 0',  // ✅ gap khatam (pehle spacing[2] tha, ab fixed 8px)
      position: 'fixed',  // ✅ Fixed kiya taake header ke neeche aaye
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      overflow: 'hidden',
      height: '48px',     // ✅ Fixed height
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: `0 ${spacing[6]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: '100%',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[4],
          animation: 'marquee 20s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          {[...messages, ...messages, ...messages].map((msg, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
              <msg.icon size={16} style={{ opacity: 0.8 }} />
              <span style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
                {msg.text}
              </span>
              <span style={{ opacity: 0.3, margin: `0 ${spacing[2]}` }}>|</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsVisible(false)}
          style={{
            position: 'absolute',
            right: 0,
            background: 'none',
            border: 'none',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            padding: spacing[1],
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = colors.white; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
        >
          <X size={16} />
        </button>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

AnnouncementBar.displayName = 'AnnouncementBar';
export default AnnouncementBar;