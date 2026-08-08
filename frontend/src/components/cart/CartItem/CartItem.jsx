'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import { useCart } from '@/hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (type) => {
    const newQty = type === 'increase' ? item.quantity + 1 : item.quantity - 1;
    if (newQty < 1) return;
    updateQuantity(item.id, newQty);
  };

  const containerStyles = {
    display: 'flex',
    gap: spacing[4],
    padding: `${spacing[4]} 0`,
    borderBottom: `1px solid ${colors.border.light}`,
    alignItems: 'center',
  };

  const imageStyles = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
    backgroundColor: '#f3f4f6',
  };

  const infoStyles = {
    flex: 1,
  };

  const nameStyles = {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[1],
  };

  const priceStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.extrabold,
  };

  const quantityContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const qtyButtonStyles = {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    border: `1px solid ${colors.border.light}`,
    backgroundColor: colors.white,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  };

  const qtyDisplayStyles = {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    minWidth: '24px',
    textAlign: 'center',
  };

  const removeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.muted,
    transition: 'color 0.2s ease',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={containerStyles}
    >
      <Link href={`/products/${item.slug}`}>
        <img
          src={item.image}
          alt={item.name}
          style={imageStyles}
        />
      </Link>

      <div style={infoStyles}>
        <Link href={`/products/${item.slug}`} style={{ textDecoration: 'none' }}>
          <div style={nameStyles}>{item.name}</div>
        </Link>
        <div style={priceStyles}>${(item.price * item.quantity).toFixed(2)}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4], marginTop: spacing[2] }}>
          <div style={quantityContainerStyles}>
            <button
              style={qtyButtonStyles}
              onClick={() => handleQuantityChange('decrease')}
              disabled={item.quantity <= 1}
            >
              <Minus size={14} />
            </button>
            <span style={qtyDisplayStyles}>{item.quantity}</span>
            <button
              style={qtyButtonStyles}
              onClick={() => handleQuantityChange('increase')}
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            style={removeButtonStyles}
            onClick={() => removeItem(item.id)}
            onMouseEnter={(e) => e.currentTarget.style.color = '#DC2626'}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.text.muted}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

CartItem.displayName = 'CartItem';

export default CartItem;