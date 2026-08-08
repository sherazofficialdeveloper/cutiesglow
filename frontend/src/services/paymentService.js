// frontend/src/services/paymentService.js
import apiClient from './api';

// Create PayPal order (backend routes)
export const createPayPalOrder = async (orderData) => {
  const response = await apiClient.post('/payments/paypal/create', orderData);
  return response.data; // Expected: { orderId, approvalUrl }
};

// Capture PayPal payment after approval
export const capturePayPalOrder = async (orderId) => {
  const response = await apiClient.post(`/payments/paypal/capture/${orderId}`);
  return response.data; // Expected: { success: true, order }
};

// Submit Zelle payment proof (moved from orderService for separation of concerns)
export const submitZellePayment = async (formData) => {
  const response = await apiClient.post('/payments/zelle/submit', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default {
  createPayPalOrder,
  capturePayPalOrder,
  submitZellePayment,
};