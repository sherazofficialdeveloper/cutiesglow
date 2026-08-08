'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { borderRadius } from '@/config/theme/borderRadius';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  icon = null,
  iconPosition = 'left',
  href = null,
  onClick = null,
  type = 'button',
  className = '',
  style = {},
  ...props
}) => {
  const sizeConfig = {
    small: {
      padding: `${spacing[2]} ${spacing[4]}`,
      fontSize: typography.fontSize.sm,
      height: '36px',
    },
    medium: {
      padding: `${spacing[3]} ${spacing[6]}`,
      fontSize: typography.fontSize.base,
      height: '44px',
    },
    large: {
      padding: `${spacing[4]} ${spacing[8]}`,
      fontSize: typography.fontSize.lg,
      height: '52px',
    },
  };

  const variantConfig = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      hoverBg: '#C95F1E',
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.white,
      border: 'none',
      hoverBg: '#1A110E',
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary,
      border: `2px solid ${colors.primary}`,
      hoverBg: colors.primary,
      hoverColor: colors.white,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.text.secondary,
      border: 'none',
      hoverBg: '#F3F4F6',
    },
    danger: {
      backgroundColor: '#DC2626',
      color: colors.white,
      border: 'none',
      hoverBg: '#B91C1C',
    },
    success: {
      backgroundColor: '#10B981',
      color: colors.white,
      border: 'none',
      hoverBg: '#059669',
    },
  };

  const currentVariant = variantConfig[variant] || variantConfig.primary;
  const currentSize = sizeConfig[size] || sizeConfig.medium;

  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    fontWeight: typography.fontWeight.bold,
    borderRadius: borderRadius.button,
    backgroundColor: currentVariant.backgroundColor,
    color: currentVariant.color,
    border: currentVariant.border,
    width: fullWidth ? '100%' : 'auto',
    height: currentSize.height,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  const hoverStyles = {
    backgroundColor: currentVariant.hoverBg,
    color: currentVariant.hoverColor || currentVariant.color,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  };

  const activeStyles = {
    transform: 'translateY(0)',
    boxShadow: 'none',
  };

  const loadingStyles = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'inherit',
  };

  const spinnerStyles = {
    width: '20px',
    height: '20px',
    border: `2px solid ${currentVariant.color}33`,
    borderTopColor: currentVariant.color,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  const content = (
    <>
      {loading && (
        <span style={loadingStyles}>
          <span style={spinnerStyles} />
        </span>
      )}
      <span style={{ opacity: loading ? 0 : 1, display: 'flex', alignItems: 'center', gap: spacing[2] }}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        style={baseStyles}
        className={className}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, hoverStyles);
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, baseStyles);
          }
        }}
        onMouseDown={(e) => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, activeStyles);
          }
        }}
        onMouseUp={(e) => {
          if (!disabled && !loading) {
            Object.assign(e.currentTarget.style, hoverStyles);
          }
        }}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      style={baseStyles}
      className={className}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { 
        y: -2, 
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      } : {}}
      whileTap={!disabled && !loading ? { 
        y: 0, 
        scale: 0.98,
        boxShadow: 'none',
      } : {}}
      onClick={onClick}
      {...props}
    >
      {content}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </motion.button>
  );
};

Button.displayName = 'Button';

export default Button;