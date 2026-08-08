// frontend/src/services/beforeAfterService.js
import apiClient from './api';

// Get before/after items for homepage
export const getHomepageItems = async (limit = 6) => {
  const response = await apiClient.get('/before-after', {
    params: { limit },
  });
  return response.data; // Expected: { items: [] }
};

export default {
  getHomepageItems,
};