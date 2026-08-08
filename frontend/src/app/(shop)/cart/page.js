'use client';

import React from 'react';
import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/cart/CartItem/CartItem';
import CartSummary from '@/components/cart/CartSummary/CartSummary';
import CartEmpty from '@/components/cart/CartEmpty/CartEmpty';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';

export default function CartPage() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}