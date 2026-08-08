'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const LoadingSpinner = ({
  size = 'medium', // small, medium, large
  color = colors.primary,
  text = '',
  fullScreen = false,
  className = '',
  style = {},
}) => {
  const sizeConfig = {
    small: { width: '24px', height: '24px', borderWidth: '3px' },
    medium: { width: '40px', height: '40px', borderWidth: '4px' },
    large: { width: '56px', height: '56px', borderWidth: '5px' },
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[3],
    ...(fullScreen && {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 999,
    }),
    ...style,
  };

  const spinnerStyles = {
    width: currentSize.width,
    height: currentSize.height,
    border: `${currentSize.borderWidth} solid ${color}33`,
    borderTopColor: color,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  };

  const textStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
  };

  return (
    <div style={containerStyles} className={className}>
      <div style={spinnerStyles} />
      {text && <p style={textStyles}>{text}</p>}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;