'use client';

import React from 'react';
import { spacing } from '@/config/theme/spacing';

const Grid = ({
  children,
  columns = 1,
  gap = spacing[4],
  responsive = true,
  className = '',
  style = {},
  ...props
}) => {
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: responsive 
      ? `repeat(auto-fill, minmax(${Math.max(200, 1200 / columns)}px, 1fr))`
      : `repeat(${columns}, 1fr)`,
    gap,
    ...style,
  };

  return (
    <div style={gridStyles} className={className} {...props}>
      {children}
    </div>
  );
};

Grid.displayName = 'Grid';

export default Grid;