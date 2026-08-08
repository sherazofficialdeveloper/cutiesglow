'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { colors } from '@/config/theme/colors';

const RatingStars = ({
  rating = 0,
  maxStars = 5,
  size = 20,
  color = '#F59E0B',
  emptyColor = '#D1D5DB',
  showValue = false,
  className = '',
  style = {},
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const containerStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '2px',
    ...style,
  };

  const starStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const valueStyles = {
    marginLeft: '4px',
    fontSize: size * 0.8,
    fontWeight: 600,
    color: colors.text.secondary,
  };

  const renderStar = (type) => {
    const props = {
      size,
      style: { display: 'block' },
    };

    switch (type) {
      case 'full':
        return <Star {...props} fill={color} stroke={color} />;
      case 'half':
        return (
          <div style={{ position: 'relative' }}>
            <Star {...props} fill={emptyColor} stroke={emptyColor} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              overflow: 'hidden',
            }}>
              <Star {...props} fill={color} stroke={color} />
            </div>
          </div>
        );
      case 'empty':
        return <Star {...props} fill={emptyColor} stroke={emptyColor} />;
      default:
        return null;
    }
  };

  return (
    <div style={containerStyles} className={className}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} style={starStyles}>
          {renderStar('full')}
        </span>
      ))}
      {hasHalfStar && (
        <span key="half" style={starStyles}>
          {renderStar('half')}
        </span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} style={starStyles}>
          {renderStar('empty')}
        </span>
      ))}
      {showValue && <span style={valueStyles}>{rating.toFixed(1)}</span>}
    </div>
  );
};

RatingStars.displayName = 'RatingStars';

export default RatingStars;