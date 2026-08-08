// frontend/src/services/wishlistService.js
import apiClient from './api';

// Get wishlist
export const getWishlist = async () => {
  const response = await apiClient.get('/wishlist');
  return response.data; // Expected: { items: [] }
};

// Toggle wishlist item (add/remove)
export const toggleWishlist = async (productId) => {
  const response = await apiClient.post('/wishlist/toggle', { productId });
  return response.data; // Expected: { message, isAdded: boolean }
};

// Sync local wishlist with backend
export const syncWishlist = async (items) => {
  const response = await apiClient.post('/wishlist/sync', { items });
  return response.data;
};

export default {
  getWishlist,
  toggleWishlist,
  syncWishlist,
};