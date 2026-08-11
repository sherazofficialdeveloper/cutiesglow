import api from './api';
import { STORAGE_KEYS } from '@/config/constants';

// ==================== AUTHENTICATION ====================

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

export const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await api.post('/auth/verify-email', { token });
  return response.data;
};

// ==================== OTP PASSWORD RESET ====================

// ✅ Send OTP for password reset
export const sendOTP = async (email) => {
  const response = await api.post('/auth/forgot-password-otp', { email });
  return response.data;
};

// ✅ Resend OTP
export const resendOTP = async (email) => {
  const response = await api.post('/auth/resend-otp', { email });
  return response.data;
};

// ✅ Reset password using OTP
export const resetPasswordWithOTP = async (email, otp, newPassword) => {
  const response = await api.post('/auth/reset-password-otp', { 
    email, 
    otp, 
    newPassword 
  });
  return response.data;
};

// ==================== LEGACY (If needed) ====================

// ✅ Legacy forgot password (token-based)
export const forgotPassword = async (email) => {
  const response = await api.post('/auth/forgot-password', { email });
  return response.data;
};

// ✅ Legacy reset password (token-based)
export const resetPassword = async (token, newPassword) => {
  const response = await api.post('/auth/reset-password', { token, newPassword });
  return response.data;
};

// ==================== DEFAULT EXPORT ====================

const authService = {
  login,
  register,
  logout,
  getMe,
  verifyEmail,
  sendOTP,
  resendOTP,
  resetPasswordWithOTP,
  forgotPassword,
  resetPassword,
};

export default authService;