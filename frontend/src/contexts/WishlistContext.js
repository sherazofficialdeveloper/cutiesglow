'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import apiClient from '@/services/api';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load wishlist from localStorage (fallback) or API
  const fetchWishlist = useCallback(async () => {
    try {
      const response = await apiClient.get('/wishlist');
      setWishlist(response.data.items || []);
    } catch (error) {
      console.warn('Backend not available, using localStorage');
      const saved = localStorage.getItem('wishlist_items');
      if (saved) {
        try {
          setWishlist(JSON.parse(saved));
        } catch {
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist_items', JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Toggle wishlist with optimistic update (INSTANT RED!)
  const toggleWishlist = async (productId) => {
    // ✅ Optimistic update: instantly toggle UI (heart turns red)
    const exists = wishlist.includes(productId);
    const newWishlist = exists 
      ? wishlist.filter(id => id !== productId) 
      : [...wishlist, productId];
    
    // Update state immediately (UI will show red heart)
    setWishlist(newWishlist);
    localStorage.setItem('wishlist_items', JSON.stringify(newWishlist));

    try {
      // Try backend sync
      await apiClient.post('/wishlist/toggle', { productId });
    } catch (error) {
      // If backend fails, we already saved in localStorage, so no problem
      console.warn('Backend sync failed, but local state updated');
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item === productId || item?.productId === productId || item?.id === productId);
  };

  const clearWishlist = async () => {
    try {
      await apiClient.delete('/wishlist/clear');
      setWishlist([]);
      localStorage.removeItem('wishlist_items');
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      setWishlist([]);
      localStorage.removeItem('wishlist_items');
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      loading,
      toggleWishlist,
      isWishlisted,
      clearWishlist,
      fetchWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;