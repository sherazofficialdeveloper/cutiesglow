// frontend/src/services/reviewService.js
import apiClient from './api';

// Get reviews with optional filters (productId)
export const getReviews = async (params = {}) => {
  const { productId, page = 1, limit = 6 } = params;
  const response = await apiClient.get(`/reviews`, {
    params: { productId, page, limit },
  });
  return response.data; // Expected: { items: [], totalCount: number, average: number }
};

// Create a new review
export const createReview = async (data) => {
  const response = await apiClient.post('/reviews', data);
  return response.data; // Expected: { review }
};

// Admin: Approve a review
export const approveReview = async (id) => {
  const response = await apiClient.put(`/reviews/${id}/approve`);
  return response.data;
};

// Admin: Delete a review
export const deleteReview = async (id) => {
  const response = await apiClient.delete(`/reviews/${id}`);
  return response.data;
};

export default {
  getReviews,
  createReview,
  approveReview,
  deleteReview,
};