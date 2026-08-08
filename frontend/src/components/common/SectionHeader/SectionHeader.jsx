'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const SectionHeader = ({
  badge,
  title,
  subtitle,
  icon,
  badgeColor = colors.primary,
  align = 'center',
  className = '',
  style = {},
}) => {
  const alignConfig = {
    center: { textAlign: 'center' },
    left: { textAlign: 'left' },
    right: { textAlign: 'right' },
  };

  const containerStyles = {
    maxWidth: '700px',
    margin: '0 auto',
    marginBottom: spacing[8],
    ...alignConfig[align] || alignConfig.center,
    ...style,
  };

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[1]} ${spacing[4]}`,
    borderRadius: '9999px',
    backgroundColor: `${badgeColor}1A`,
    color: badgeColor,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.extrabold,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: `1px solid ${badgeColor}33`,
    marginBottom: spacing[3],
  };

  const titleStyles = {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.tight,
    marginBottom: spacing[2],
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.relaxed,
  };

  const highlightStyles = {
    color: colors.primary,
  };

  // Split title to highlight specific words
  const renderTitle = () => {
    if (typeof title !== 'string') return title;
    
    const parts = title.split(' ');
    return parts.map((word, index) => {
      // Check if word should be highlighted
      const highlightWords = ['Skincare', 'Benefits', 'Cutish', 'Ingredients', 'Collection'];
      const isHighlight = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
      
      return (
        <React.Fragment key={index}>
          {isHighlight ? (
            <span style={highlightStyles}>{word}</span>
          ) : (
            <span>{word}</span>
          )}
          {index < parts.length - 1 && ' '}
        </React.Fragment>
      );
    });
  };

  return (
    <div style={containerStyles} className={className}>
      {badge && (
        <div style={badgeStyles}>
          {icon && icon}
          {badge}
        </div>
      )}
      <h2 style={titleStyles}>{renderTitle()}</h2>
      {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
    </div>
  );
};

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;