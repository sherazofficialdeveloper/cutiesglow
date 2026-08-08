'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { ROUTES } from '@/config/constants';

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const isMobile = windowWidth < 768;

  const footerStyles = {
    backgroundColor: '#2D201A',
    color: '#E5DCD5',
    paddingTop: spacing[12],
    paddingBottom: spacing[6],
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
  };

  // Mobile: single column, Tablet/Desktop: 2/4 columns
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr',
    gap: isMobile ? spacing[8] : spacing[8],
    marginBottom: spacing[8],
  };

  const brandStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const logoStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.white,
  };

  const logoHighlightStyles = {
    color: colors.primary,
  };

  const descriptionStyles = {
    fontSize: typography.fontSize.sm,
    color: '#B8A89A',
    lineHeight: typography.lineHeight.relaxed,
    maxWidth: isMobile ? '100%' : '300px',
  };

  const socialContainerStyles = {
    display: 'flex',
    gap: spacing[3],
    marginTop: spacing[2],
    flexWrap: 'wrap',
  };

  const socialIconStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    color: '#B8A89A',
    border: 'none',
    cursor: 'pointer',
  };

  const headingStyles = {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing[4],
    marginTop: isMobile ? spacing[4] : 0,
  };

  const linkListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const linkStyles = {
    color: '#B8A89A',
    textDecoration: 'none',
    fontSize: typography.fontSize.sm,
    transition: 'color 0.3s ease',
  };

  const contactItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    fontSize: typography.fontSize.sm,
    color: '#B8A89A',
  };

  const bottomBarStyles = {
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: spacing[4],
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing[2],
    textAlign: isMobile ? 'center' : 'left',
  };

  const bottomTextStyles = {
    fontSize: typography.fontSize.xs,
    color: '#8A7A6A',
  };

  const paymentStyles = {
    display: 'flex',
    gap: spacing[2],
    fontSize: typography.fontSize.xs,
    color: '#8A7A6A',
    flexWrap: 'wrap',
    justifyContent: isMobile ? 'center' : 'flex-end',
  };

  const footerLinks = [
    { label: 'About Us', href: ROUTES.ABOUT },
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'FAQ', href: ROUTES.FAQ },
    { label: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Shipping Policy', href: '/shipping' },
  ];

  const quickLinks = [
    { label: 'All Products', href: ROUTES.PRODUCTS },
    { label: 'New Arrivals', href: '/products?sort=newest' },
    { label: 'Best Sellers', href: '/products?sort=rating' },
    { label: 'Sale', href: '/products?sale=true' },
  ];

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <div style={gridStyles}>
          {/* Brand Column */}
          <div style={brandStyles}>
            <div style={logoStyles}>
              <span style={logoHighlightStyles}>Cutish</span> by Razia's
            </div>
            <p style={descriptionStyles}>
              Premium skincare products made with natural ingredients for your daily glow routine.
            </p>
            <div style={socialContainerStyles}>
              {[
                { icon: Instagram, href: 'https://instagram.com/cutishbyrazias' },
                { icon: Facebook, href: 'https://facebook.com/cutishbyrazias' },
                { icon: Youtube, href: 'https://youtube.com/cutishbyrazias' },
                { icon: Twitter, href: 'https://twitter.com/cutishbyrazias' },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={socialIconStyles}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.primary;
                      e.currentTarget.style.color = colors.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.color = '#B8A89A';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={headingStyles}>Quick Links</h4>
            <div style={linkListStyles}>
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={linkStyles}
                  onMouseEnter={(e) => { e.currentTarget.style.color = colors.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#B8A89A'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 style={headingStyles}>Support</h4>
            <div style={linkListStyles}>
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={linkStyles}
                  onMouseEnter={(e) => { e.currentTarget.style.color = colors.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#B8A89A'; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={headingStyles}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
              <div style={contactItemStyles}>
                <Mail size={16} color={colors.primary} />
                <span>info@cutishbyrazias.com</span>
              </div>
              <div style={contactItemStyles}>
                <Phone size={16} color={colors.primary} />
                <span>+1 (800) 555-GLOW</span>
              </div>
              <div style={contactItemStyles}>
                <MapPin size={16} color={colors.primary} />
                <span>Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        <div style={bottomBarStyles}>
          <div style={bottomTextStyles}>
            © {currentYear} Cuties Glow. Made with <Heart size={12} color={colors.primary} style={{ display: 'inline' }} /> for your skin.
          </div>
          <div style={paymentStyles}>
            <span>Secure Payment</span>
            <span>•</span>
            <span>SSL Encrypted</span>
            <span>•</span>
            <span>100% Safe</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
export default Footer;