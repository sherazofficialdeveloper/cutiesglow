'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { borderRadius } from '@/config/theme/borderRadius';

const Badge = ({
  children,
  variant = 'primary', // primary, secondary, success, warning, danger, info, outline
  size = 'medium', // small, medium, large
  icon = null,
  rounded = false,
  className = '',
  style = {},
  ...props
}) => {
  const variantConfig = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.white,
      border: 'none',
    },
    success: {
      backgroundColor: '#10B981',
      color: colors.white,
      border: 'none',
    },
    warning: {
      backgroundColor: '#F59E0B',
      color: colors.white,
      border: 'none',
    },
    danger: {
      backgroundColor: '#DC2626',
      color: colors.white,
      border: 'none',
    },
    info: {
      backgroundColor: '#3B82F6',
      color: colors.white,
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
    },
  };

  const sizeConfig = {
    small: {
      padding: `${spacing[0.5]} ${spacing[2]}`,
      fontSize: typography.fontSize.xs,
      height: '20px',
    },
    medium: {
      padding: `${spacing[1]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
      height: '28px',
    },
    large: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.base,
      height: '36px',
    },
  };

  const currentVariant = variantConfig[variant] || variantConfig.primary;
  const currentSize = sizeConfig[size] || sizeConfig.medium;

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    fontWeight: typography.fontWeight.bold,
    borderRadius: rounded ? '9999px' : borderRadius.button,
    backgroundColor: currentVariant.backgroundColor,
    color: currentVariant.color,
    border: currentVariant.border,
    height: currentSize.height,
    whiteSpace: 'nowrap',
    ...style,
  };

  return (
    <span style={badgeStyles} className={className} {...props}>
      {icon && icon}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';

export default Badge;