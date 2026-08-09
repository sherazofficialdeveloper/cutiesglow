'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Home, ShoppingBag, Heart, User, Settings, LogOut, Info, Mail } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { ROUTES, CATEGORIES } from '@/config/constants';
import { useAuth } from '@/hooks/useAuth';

const MobileMenu = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, logout } = useAuth();

  // ----- Styles -----
  const overlayStyles = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 200,
  };

  const menuStyles = {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    width: '320px',
    maxWidth: '85%',
    backgroundColor: colors.white,
    zIndex: 201,
    padding: spacing[6],
    overflowY: 'auto',
    boxShadow: '-4px 0 20px rgba(0,0,0,0.08)',
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[6],
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.border.light}`,
  };

  const logoStyles = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.primary,
  };

  const logoHighlightStyles = {
    color: colors.primary,
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.muted,
    padding: spacing[1],
  };

  const userInfoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[3],
    backgroundColor: '#FFF8F2',
    borderRadius: '12px',
    marginBottom: spacing[6],
  };

  const avatarStyles = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: colors.primary,
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.lg,
  };

  const userNameStyles = {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  };

  const userEmailStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
  };

  const navListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const navItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: `${spacing[3]} ${spacing[4]}`,
    borderRadius: '12px',
    textDecoration: 'none',
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    transition: 'all 0.2s ease',
  };

  const categoryListStyles = {
    paddingLeft: spacing[8],
    marginTop: spacing[1],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const categoryItemStyles = {
    padding: `${spacing[2]} ${spacing[4]}`,
    borderRadius: '8px',
    textDecoration: 'none',
    color: colors.text.muted,
    fontSize: typography.fontSize.sm,
    transition: 'all 0.2s ease',
  };

  const logoutButtonStyles = {
    ...navItemStyles,
    marginTop: spacing[2],
    borderTop: `1px solid ${colors.border.light}`,
    paddingTop: spacing[4],
    color: '#DC2626',
    background: 'none',
    border: 'none',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'left',
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { type: 'tween', duration: 0.3 },
    },
    open: {
      x: 0,
      transition: { type: 'tween', duration: 0.3 },
    },
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  // ----- ✅ Updated Nav Items (All Links Added) -----
  const navItems = [
    { icon: Home, label: 'Home', href: ROUTES.HOME },
    { icon: ShoppingBag, label: 'All Products', href: ROUTES.PRODUCTS },
    { icon: Heart, label: 'Wishlist', href: ROUTES.WISHLIST },
    { icon: Info, label: 'About', href: ROUTES.ABOUT },
    { icon: Mail, label: 'Contact', href: ROUTES.CONTACT },
    { icon: User, label: 'Dashboard', href: ROUTES.DASHBOARD },
    { icon: Settings, label: 'Settings', href: ROUTES.SETTINGS },
  ];

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={overlayStyles}
            onClick={onClose}
          />

          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={menuStyles}
          >
            <div style={headerStyles}>
              <div style={logoStyles}>
                {/* ✅ FIX: windowWidth error removed – using Tailwind responsive classes */}
                <img
                  src="/logo.avif"
                  alt="CUTIES GLOW"
                  className="h-[70px] md:h-[80px] w-auto max-h-[80px]"
                />
              </div>
              <button style={closeButtonStyles} onClick={onClose}>
                <X size={24} />
              </button>
            </div>

            {isAuthenticated ? (
              <div style={userInfoStyles}>
                <div style={avatarStyles}>
                  {getInitials(user?.name)}
                </div>
                <div>
                  <div style={userNameStyles}>{user?.name || 'User'}</div>
                  <div style={userEmailStyles}>{user?.email || ''}</div>
                </div>
              </div>
            ) : (
              <div style={userInfoStyles}>
                <div style={avatarStyles}>G</div>
                <div>
                  <div style={userNameStyles}>Guest</div>
                  <Link 
                    href={ROUTES.LOGIN} 
                    style={{ fontSize: typography.fontSize.xs, color: colors.primary, textDecoration: 'none' }}
                    onClick={onClose}
                  >
                    Sign In / Register
                  </Link>
                </div>
              </div>
            )}

            <nav style={navListStyles}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={navItemStyles}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#FFF8F2';
                      e.currentTarget.style.color = colors.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = colors.text.secondary;
                    }}
                    onClick={onClose}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}

              <div style={{ paddingTop: spacing[2] }}>
                <div style={{ 
                  padding: `${spacing[3]} ${spacing[4]}`, 
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.bold,
                  color: colors.text.muted,
                }}>
                  Categories
                </div>
                <div style={categoryListStyles}>
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category}
                      href={`/categories/${category.toLowerCase()}`}
                      style={categoryItemStyles}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFF8F2';
                        e.currentTarget.style.color = colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.text.muted;
                      }}
                      onClick={onClose}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              {isAuthenticated && (
                <button
                  style={logoutButtonStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEF2F2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                >
                  <LogOut size={20} />
                  Logout
                </button>
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

MobileMenu.displayName = 'MobileMenu';
export default MobileMenu;