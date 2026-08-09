'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Home,
  ShoppingBag,
  Heart,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Image,
  Video,
  Star,
  Tag,
  FileText,
  CreditCard,
  Menu,
} from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Sidebar = ({ isOpen, onClose, variant = 'user' }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Admin Navigation Items
  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Image, label: 'Banners', href: '/admin/banners' },
    { icon: Video, label: 'Videos', href: '/admin/videos' },
    { icon: Star, label: 'Reviews', href: '/admin/reviews' },
    { icon: Tag, label: 'Coupons', href: '/admin/coupons' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments-verification' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
    { icon: FileText, label: 'Pages', href: '/admin/pages' },
  ];

  // User Navigation Items
  const userNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: ShoppingBag, label: 'My Orders', href: '/dashboard/orders' },
    { icon: Heart, label: 'Wishlist', href: '/dashboard/wishlist' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const navItems = variant === 'admin' ? adminNavItems : userNavItems;

  // Overlay styles
  const overlayStyles = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 150,
    display: isOpen ? 'block' : 'none',
  };

  // Sidebar styles
  const sidebarStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '280px',
    backgroundColor: colors.white,
    zIndex: 151,
    padding: spacing[6],
    overflowY: 'auto',
    boxShadow: '4px 0 20px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    width: '36px',
    height: '36px',
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
    flexShrink: 0,
  };

  const userNameStyles = {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  };

  const userRoleStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
  };

  const navListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    flex: 1,
  };

  const navItemStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: `${spacing[2.5]} ${spacing[4]}`,
    borderRadius: '12px',
    textDecoration: 'none',
    color: isActive ? colors.primary : colors.text.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: isActive ? typography.fontWeight.bold : typography.fontWeight.medium,
    backgroundColor: isActive ? '#FFF8F2' : 'transparent',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  });

  const logoutButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: `${spacing[2.5]} ${spacing[4]}`,
    borderRadius: '12px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#DC2626',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    width: '100%',
    textAlign: 'left',
    transition: 'all 0.2s ease',
    marginTop: 'auto',
    borderTop: `1px solid ${colors.border.light}`,
    paddingTop: spacing[4],
  };

  const sidebarVariants = {
    closed: {
      x: '-100%',
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

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={overlayStyles}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={sidebarStyles}
          >
            {/* Header */}
            <div style={headerStyles}>
              <div style={logoStyles}>
                <span style={logoHighlightStyles}>CutiesGlow</span>
              </div>
              <button
                style={closeButtonStyles}
                onClick={onClose}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* User Info */}
            {isAuthenticated && (
              <div style={userInfoStyles}>
                <div style={avatarStyles}>
                  {getInitials(user?.name)}
                </div>
                <div>
                  <div style={userNameStyles}>{user?.name || 'User'}</div>
                  <div style={userRoleStyles}>
                    {variant === 'admin' ? 'Administrator' : 'Customer'}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav style={navListStyles}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={navItemStyles(isActive)}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                    onClick={onClose}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button */}
            {isAuthenticated && (
              <button
                style={logoutButtonStyles}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FEF2F2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={handleLogout}
              >
                <LogOut size={20} />
                Logout
              </button>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;