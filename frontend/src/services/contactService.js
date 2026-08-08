// frontend/src/services/contactService.js
import apiClient from './api';

// Submit contact form
export const submitContactForm = async (data) => {
  const response = await apiClient.post('/contact', data);
  return response.data;
};

// Subscribe to newsletter
export const subscribeNewsletter = async (email) => {
  const response = await apiClient.post('/newsletter/subscribe', { email });
  return response.data;
};

export default {
  submitContactForm,
  subscribeNewsletter,
};