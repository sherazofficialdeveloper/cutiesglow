'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Image,
  Video,
  Star,
  Tag,
  Settings,
  FileText,
  CreditCard,
} from 'lucide-react';

const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/banners', label: 'Banners', icon: Image },
    { href: '/admin/videos', label: 'Videos', icon: Video },
    { href: '/admin/reviews', label: 'Reviews', icon: Star },
    { href: '/admin/coupons', label: 'Coupons', icon: Tag },
    { href: '/admin/payments-verification', label: 'Payments Verification', icon: CreditCard },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
  ];

  const containerStyles = {
    width: '240px',
    backgroundColor: colors.white,
    borderRight: `1px solid ${colors.border.light}`,
    padding: spacing[4],
    height: '100vh',
    position: 'sticky',
    top: 0,
  };

  const logoStyles = {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.border.light}`,
    marginBottom: spacing[4],
  };

  const linkStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: '8px',
    textDecoration: 'none',
    color: isActive ? colors.primary : colors.text.secondary,
    backgroundColor: isActive ? '#FFF8F2' : 'transparent',
    fontWeight: isActive ? typography.fontWeight.bold : typography.fontWeight.medium,
    transition: 'all 0.2s ease',
    marginBottom: spacing[0.5],
  });

  return (
    <aside style={containerStyles}>
      <div style={logoStyles}>CutiesGlow Admin</div>
      <nav>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              style={linkStyles(isActive)}
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
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

AdminSidebar.displayName = 'AdminSidebar';

export default AdminSidebar;