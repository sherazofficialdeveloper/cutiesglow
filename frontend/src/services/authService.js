// frontend/src/services/authService.js
import apiClient from './api';
import { STORAGE_KEYS } from '@/config/constants';

// -------- Login --------
export const login = async (email, password) => {
  const response = await apiClient.post('/auth/login', { email, password });
  // Response: { user, token }
  return response.data;
};

// -------- Register --------
export const register = async (name, email, password) => {
  const response = await apiClient.post('/auth/register', { name, email, password });
  // Response: { user, token }
  return response.data;
};

// -------- Get Current User --------
export const getMe = async () => {
  const response = await apiClient.get('/auth/me');
  // Response: { user }
  return response.data;
};

// -------- Forgot Password --------
export const forgotPassword = async (email) => {
  const response = await apiClient.post('/auth/forgot-password', { email });
  return response.data;
};

// -------- Reset Password --------
export const resetPassword = async (token, password) => {
  const response = await apiClient.post('/auth/reset-password', { token, password });
  return response.data;
};

// -------- Verify Email --------
export const verifyEmail = async (token) => {
  const response = await apiClient.post('/auth/verify-email', { token });
  return response.data;
};

// -------- Update Profile --------
export const updateProfile = async (data) => {
  const response = await apiClient.put('/auth/profile', data);
  return response.data;
};

// -------- Logout --------
export const logout = async () => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    console.warn('Logout API error (ignored):', error);
  }
  // Local cleanup (token removal handled in context)
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
};

// -------- Default Export --------
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