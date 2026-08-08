// frontend/src/services/settingsService.js
import apiClient from './api';

// Get general site settings
export const getGeneralSettings = async () => {
  const response = await apiClient.get('/settings/general');
  return response.data; // Expected: { siteName, tagline, contactEmail, etc. }
};

// Get homepage video URL
export const getHomepageVideo = async () => {
  const response = await apiClient.get('/settings/homepage-video');
  return response.data; // Expected: { url }
};

export default {
  getGeneralSettings,
  getHomepageVideo,
};