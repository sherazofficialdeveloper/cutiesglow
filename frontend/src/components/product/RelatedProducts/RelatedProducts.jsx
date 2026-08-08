'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';

const RelatedProducts = ({ products = [], onAddToCart, onQuickView, onToggleWishlist }) => {
  // ✅ Filter out any undefined products
  const validProducts = products.filter(p => p && typeof p === 'object' && p.id);

  if (validProducts.length === 0) return null;

  const sectionStyles = {
    padding: `${spacing[12]} 0`,
    backgroundColor: colors.white,
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing[6],
    marginTop: spacing[8],
  };

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <SectionHeader
          title="You May Also Like"
          subtitle="Discover more products from our collection"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={gridStyles}
        >
          {validProducts.map((product, index) => (
            <motion.div
              key={product.id} // ✅ product.id exists now
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

RelatedProducts.displayName = 'RelatedProducts';

export default RelatedProducts;