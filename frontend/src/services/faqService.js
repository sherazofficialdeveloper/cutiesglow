// frontend/src/services/faqService.js
import apiClient from './api';

// Get active FAQs for homepage
export const getActiveFaqs = async () => {
  const response = await apiClient.get('/faqs/active');
  return response.data; // Expected: { items: [] }
};

export default {
  getActiveFaqs,
};