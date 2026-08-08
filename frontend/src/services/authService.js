// frontend/src/services/authService.js
import apiClient from './api';

// Login user
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data; // Expected: { user, token }
};

// Register user
export const register = async (name, email, password) => {
  const response = await apiClient.post('/auth/register', { name, email, password });
  return response.data; // Expected: { user, token }
};

// Get current user (verify token)
export const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data; // Expected: { user }
};

// Forgot password
export const forgotPassword = async (email) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

// Reset password
export const resetPassword = async (token, password) => {
  const response = await apiClient.post('/auth/reset-password', { token, password });
  return response.data;
};

// Verify email
export const verifyEmail = async (token) => {
  const response = await apiClient.post('/auth/verify-email', { token });
  return response.data;
};

// Update profile
export const updateProfile = async (data) => {
  const response = await apiClient.put('/auth/profile', data);
  return response.data;
};

// Logout (optional: call API to invalidate token)
export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.warn('Logout error:', error);
  }
  // Cleanup handled in context, but we can call this to be safe.
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

export default {
  login,
  register,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  updateProfile,
  logout,
};