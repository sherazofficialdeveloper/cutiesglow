// frontend/src/services/instagramService.js
import apiClient from './api';

// Get Instagram reels for homepage
export const getHomepageReels = async (limit = 5) => {
  const response = await apiClient.get('/instagram/reels', {
    params: { limit },
  });
  return response.data; // Expected: { items: [] }
};

export default {
  getHomepageReels,
};