'use client';

import { useContext } from 'react';
import CartContext from '@/contexts/CartContext';

/**
 * Custom hook to access cart state and methods
 * @returns {Object} { cartItems, loading, addToCart, removeItem, updateQuantity, clearCart, subtotal, shipping, tax, totalPrice, totalItems }
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default useCart;