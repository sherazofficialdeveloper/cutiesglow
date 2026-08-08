// frontend/src/services/userService.js
import apiClient from './api';

// Get user addresses
export const getAddresses = async () => {
  const response = await apiClient.get('/users/addresses');
  return response.data; // Expected: { items: [] }
};

// Add new address
export const addAddress = async (addressData) => {
  const response = await apiClient.post('/users/addresses', addressData);
  return response.data; // Expected: { address }
};

// Update address
export const updateAddress = async (id, addressData) => {
  const response = await apiClient.put(`/users/addresses/${id}`, addressData);
  return response.data;
};

// Delete address
export const deleteAddress = async (id) => {
  const response = await apiClient.delete(`/users/addresses/${id}`);
  return response.data;
};

// Set default address
export const setDefaultAddress = async (id) => {
  const response = await apiClient.put(`/users/addresses/${id}/default`);
  return response.data;
};

export default {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};