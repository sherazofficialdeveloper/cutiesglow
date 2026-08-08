'use client';

import React from 'react';
import { useWishlist } from '@/hooks/useWishlist';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  if (!wishlist || wishlist.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: spacing[8] }}>
        <p style={{ color: colors.text.muted, marginBottom: spacing[4] }}>Your wishlist is empty.</p>
        <Link href="/products">
          <Button variant="primary">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: spacing[4],
  };

  return (
    <div>
      <h2 style={{ fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold, marginBottom: spacing[6] }}>
        My Wishlist
      </h2>
      <div style={gridStyles}>
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onToggleWishlist={toggleWishlist}
            isWishlisted={true}
          />
        ))}
      </div>
    </div>
  );
};

Wishlist.displayName = 'Wishlist';

export default Wishlist;