'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const Breadcrumb = ({ customItems }) => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const items = [];

    items.push({
      label: 'Home',
      href: '/',
      icon: Home,
    });

    let currentPath = '';
    paths.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let label = segment
        .replace(/-/g, ' ')
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

      if (segment === 'products' && index === 0) {
        label = 'All Products';
      }

      items.push({
        label,
        href: currentPath,
        isLast: index === paths.length - 1,
      });
    });

    return items;
  };

  const breadcrumbItems = customItems || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) return null;

  const containerStyles = {
    backgroundColor: '#F9FAFB',
    padding: `${spacing[3]} 0`,
    borderBottom: `1px solid ${colors.border.light}`,
  };

  const innerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing[1],
  };

  const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  const activeStyles = {
    color: colors.text.primary,
    fontWeight: typography.fontWeight.medium,
  };

  const separatorStyles = {
    color: colors.border.medium,
  };

  return (
    <nav style={containerStyles} aria-label="Breadcrumb">
      <div style={innerStyles}>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const Icon = item.icon;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <span style={separatorStyles}>
                  <ChevronRight size={16} />
                </span>
              )}

              {isLast ? (
                <span style={{ ...itemStyles, ...activeStyles }}>
                  {Icon && <Icon size={16} style={{ marginRight: spacing[0.5] }} />}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  style={itemStyles}
                  onMouseEnter={(e) => {
                    e.target.style.color = colors.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = colors.text.secondary;
                  }}
                >
                  {Icon && <Icon size={16} style={{ marginRight: spacing[0.5] }} />}
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;