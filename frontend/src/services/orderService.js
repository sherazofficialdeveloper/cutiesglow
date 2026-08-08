// frontend/src/services/orderService.js
import apiClient from './api';

// Get orders for the authenticated user
export const getOrders = async (params = {}) => {
  const { page = 1, limit = 10 } = params;
  const response = await apiClient.get(`/orders`, {
    params: { page, limit },
  });
  return response.data; // Expected: { items: [], totalCount: number }
};

// Get single order by ID
export const getOrder = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data; // Expected: { order }
};

// Create a new order
export const createOrder = async (orderData) => {
  const response = await apiClient.post('/orders', orderData);
  return response.data; // Expected: { order }
};

// Submit Zelle payment proof (multipart/form-data)
export const submitZelleProof = async (formData) => {
  const response = await apiClient.post('/orders/zelle-proof', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Cancel order (optional)
export const cancelOrder = async (id) => {
  const response = await apiClient.put(`/orders/${id}/cancel`);
  return response.data;
};

export default {
  getOrders,
  getOrder,
  createOrder,
  submitZelleProof,
  cancelOrder,
};