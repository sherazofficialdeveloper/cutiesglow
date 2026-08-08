'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';

const CartEmpty = () => {
  const containerStyles = {
    textAlign: 'center',
    padding: spacing[12],
  };

  const iconStyles = {
    color: colors.border.medium,
    marginBottom: spacing[4],
  };

  const titleStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[2],
  };

  const descStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.muted,
    marginBottom: spacing[6],
  };

  return (
    <div style={containerStyles}>
      <ShoppingBag size={64} style={iconStyles} />
      <h2 style={titleStyles}>Your Cart is Empty</h2>
      <p style={descStyles}>Looks like you haven't added anything to your cart yet.</p>
      <Link href="/products">
        <Button variant="primary" size="large">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
};

CartEmpty.displayName = 'CartEmpty';

export default CartEmpty;