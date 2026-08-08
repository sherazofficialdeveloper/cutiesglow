// frontend/src/services/cartService.js
import apiClient from './api';

// Get current cart
export const getCart = async () => {
  const response = await apiClient.get('/cart');
  return response.data; // Expected: { items: [] }
};

// Add item to cart
export const addToCart = async (productId, quantity = 1, variant = null) => {
  const response = await apiClient.post('/cart', { productId, quantity, variant });
  return response.data; // Expected: { cart }
};

// Update cart item quantity
export const updateCartItem = async (cartItemId, quantity) => {
  const response = await apiClient.put(`/cart/${cartItemId}`, { quantity });
  return response.data;
};

// Remove item from cart
export const removeFromCart = async (cartItemId) => {
  const response = await apiClient.delete(`/cart/${cartItemId}`);
  return response.data;
};

// Sync local cart with backend
export const syncCart = async (items) => {
  const response = await apiClient.post('/cart/sync', { items });
  return response.data;
};

export default {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  syncCart,
};