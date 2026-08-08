'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { borderRadius } from '@/config/theme/borderRadius';
import { shadows } from '@/config/theme/shadows';

const Card = ({
  children,
  variant = 'default', // default, elevated, outlined, flat
  padding = 'medium', // none, small, medium, large
  hoverable = false,
  className = '',
  style = {},
  onClick = null,
  ...props
}) => {
  const variantConfig = {
    default: {
      backgroundColor: colors.white,
      border: `1px solid ${colors.border.light}`,
      boxShadow: shadows.card,
    },
    elevated: {
      backgroundColor: colors.white,
      border: 'none',
      boxShadow: shadows.lg,
    },
    outlined: {
      backgroundColor: 'transparent',
      border: `2px solid ${colors.border.light}`,
      boxShadow: 'none',
    },
    flat: {
      backgroundColor: '#F9FAFB',
      border: 'none',
      boxShadow: 'none',
    },
  };

  const paddingConfig = {
    none: spacing[0],
    small: spacing[3],
    medium: spacing[4],
    large: spacing[6],
  };

  const currentVariant = variantConfig[variant] || variantConfig.default;
  const currentPadding = paddingConfig[padding] || paddingConfig.medium;

  const cardStyles = {
    backgroundColor: currentVariant.backgroundColor,
    border: currentVariant.border,
    boxShadow: currentVariant.boxShadow,
    borderRadius: borderRadius.card,
    padding: currentPadding,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: onClick ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  const hoverStyles = hoverable ? {
    transform: 'translateY(-4px)',
    boxShadow: shadows.xl,
    borderColor: colors.primary,
  } : {};

  return (
    <div
      style={cardStyles}
      className={className}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hoverable) {
          Object.assign(e.currentTarget.style, {
            transform: hoverStyles.transform,
            boxShadow: hoverStyles.boxShadow,
            borderColor: hoverStyles.borderColor,
          });
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          Object.assign(e.currentTarget.style, {
            transform: 'translateY(0)',
            boxShadow: currentVariant.boxShadow,
            borderColor: currentVariant.border ? colors.border.light : 'transparent',
          });
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';

export default Card;