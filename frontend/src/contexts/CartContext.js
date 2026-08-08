'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/api';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage (fallback) or API
  const loadCart = useCallback(async () => {
    try {
      // Try to fetch from backend
      const response = await apiClient.get('/cart');
      setCartItems(response.data.items || []);
    } catch (error) {
      // If backend not connected, load from localStorage
      console.warn('Backend not available, using localStorage');
      const saved = localStorage.getItem('cart_items');
      if (saved) {
        try {
          setCartItems(JSON.parse(saved));
        } catch {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Save to localStorage whenever cart changes (as backup)
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add to cart with full product details
  const addToCart = async (product, quantity = 1) => {
    // If product is an ID, fetch product details first
    let productData = product;
    if (typeof product === 'string' || typeof product === 'number') {
      // In real scenario, fetch from API
      // For now, assume product is passed as object
      console.warn('Product ID only provided, need full product object');
      return;
    }

    // Ensure product has required fields
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0] || '',
      quantity: quantity,
      slug: product.slug,
      // ... other fields
    };

    try {
      // Try backend
      const response = await apiClient.post('/cart/add', { productId: product.id, quantity });
      // If success, reload cart from backend
      await loadCart();
      return response.data;
    } catch (error) {
      // If backend fails, update local state
      console.warn('Backend not available, adding to localStorage');
      setCartItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        let newCart;
        if (existing) {
          newCart = prev.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          newCart = [...prev, { ...cartItem, quantity }];
        }
        localStorage.setItem('cart_items', JSON.stringify(newCart));
        return newCart;
      });
      // Return mock response
      return { success: true, message: 'Added locally' };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await apiClient.delete(`/cart/items/${itemId}`);
      await loadCart();
    } catch (error) {
      // Local fallback
      setCartItems(prev => {
        const newCart = prev.filter(item => item.id !== itemId);
        localStorage.setItem('cart_items', JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    try {
      await apiClient.put(`/cart/items/${itemId}`, { quantity });
      await loadCart();
    } catch (error) {
      setCartItems(prev => {
        const newCart = prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        localStorage.setItem('cart_items', JSON.stringify(newCart));
        return newCart;
      });
    }
  };

  const clearCart = async () => {
    try {
      await apiClient.delete('/cart/clear');
      await loadCart();
    } catch {
      setCartItems([]);
      localStorage.removeItem('cart_items');
    }
  };

  // Computed values
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + shipping + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        shipping,
        tax,
        totalPrice,
        totalItems,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;