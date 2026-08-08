'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';

const OrderSummary = () => {
  const { cartItems, totalPrice, subtotal, shipping, tax } = useCart();

  const containerStyles = {
    padding: spacing[6],
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
  };

  const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${spacing[2]} 0`,
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  };

  const totalRowStyles = {
    ...rowStyles,
    borderTop: `1px solid ${colors.border.light}`,
    marginTop: spacing[2],
    paddingTop: spacing[4],
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  };

  return (
    <div style={containerStyles}>
      <h3 style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, marginBottom: spacing[4] }}>
        Order Summary
      </h3>

      {cartItems.map((item) => (
        <div key={item.id} style={{ ...rowStyles, padding: `${spacing[1]} 0` }}>
          <span>{item.name} × {item.quantity}</span>
          <span>${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}

      <div style={rowStyles}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div style={rowStyles}>
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div style={rowStyles}>
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div style={totalRowStyles}>
        <span>Total</span>
        <span style={{ color: colors.primary }}>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

OrderSummary.displayName = 'OrderSummary';

export default OrderSummary;