'use client';

import React from 'react';
import { spacing } from '@/config/theme/spacing';

const Container = ({
  children,
  maxWidth = '1200px',
  padding = true,
  className = '',
  style = {},
  ...props
}) => {
  const containerStyles = {
    maxWidth,
    margin: '0 auto',
    padding: padding ? `0 ${spacing[6]}` : 0,
    width: '100%',
    ...style,
  };

  return (
    <div style={containerStyles} className={className} {...props}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';

export default Container;