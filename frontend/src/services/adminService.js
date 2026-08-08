// frontend/src/services/adminService.js
import apiClient from './api';

// -------- DASHBOARD --------
export const getDashboardStats = async () => {
  const response = await apiClient.get('/admin/dashboard/stats');
  return response.data; // Expected: { revenue, orders, customers, products }
};

// -------- PRODUCTS --------
export const getProducts = async () => {
  const response = await apiClient.get('/admin/products');
  return response.data; // Expected: { items: [] }
};

export const createProduct = async (data) => {
  const response = await apiClient.post('/admin/products', data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await apiClient.put(`/admin/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/admin/products/${id}`);
  return response.data;
};

// -------- ORDERS --------
export const getOrders = async () => {
  const response = await apiClient.get('/admin/orders');
  return response.data;
};

export const getOrder = async (id) => {
  const response = await apiClient.get(`/admin/orders/${id}`);
  return response.data; // Expected: { order }
};

export const updateOrderStatus = async (id, status) => {
  const response = await apiClient.put(`/admin/orders/${id}/status`, { status });
  return response.data;
};

// -------- CUSTOMERS --------
export const getCustomers = async () => {
  const response = await apiClient.get('/admin/customers');
  return response.data;
};

export const getCustomer = async (id) => {
  const response = await apiClient.get(`/admin/customers/${id}`);
  return response.data;
};

// -------- BANNERS --------
export const getBanners = async () => {
  const response = await apiClient.get('/admin/banners');
  return response.data;
};

export const getBanner = async (id) => {
  const response = await apiClient.get(`/admin/banners/${id}`);
  return response.data;
};

export const createBanner = async (data) => {
  const response = await apiClient.post('/admin/banners', data);
  return response.data;
};

export const updateBanner = async (id, data) => {
  const response = await apiClient.put(`/admin/banners/${id}`, data);
  return response.data;
};

export const deleteBanner = async (id) => {
  const response = await apiClient.delete(`/admin/banners/${id}`);
  return response.data;
};

// -------- BEFORE/AFTER --------
export const getBeforeAfterItems = async () => {
  const response = await apiClient.get('/admin/before-after');
  return response.data;
};

export const getBeforeAfterItem = async (id) => {
  const response = await apiClient.get(`/admin/before-after/${id}`);
  return response.data;
};

export const createBeforeAfterItem = async (data) => {
  const response = await apiClient.post('/admin/before-after', data);
  return response.data;
};

export const updateBeforeAfterItem = async (id, data) => {
  const response = await apiClient.put(`/admin/before-after/${id}`, data);
  return response.data;
};

export const deleteBeforeAfterItem = async (id) => {
  const response = await apiClient.delete(`/admin/before-after/${id}`);
  return response.data;
};

// -------- VIDEOS --------
export const getVideos = async () => {
  const response = await apiClient.get('/admin/videos');
  return response.data;
};

export const getVideo = async (id) => {
  const response = await apiClient.get(`/admin/videos/${id}`);
  return response.data;
};

export const createVideo = async (data) => {
  const response = await apiClient.post('/admin/videos', data);
  return response.data;
};

export const updateVideo = async (id, data) => {
  const response = await apiClient.put(`/admin/videos/${id}`, data);
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await apiClient.delete(`/admin/videos/${id}`);
  return response.data;
};

// -------- REVIEWS (ADMIN) --------
export const getReviews = async () => {
  const response = await apiClient.get('/admin/reviews');
  return response.data;
};

export const getReview = async (id) => {
  const response = await apiClient.get(`/admin/reviews/${id}`);
  return response.data;
};

export const approveReview = async (id) => {
  const response = await apiClient.put(`/admin/reviews/${id}/approve`);
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await apiClient.delete(`/admin/reviews/${id}`);
  return response.data;
};

// -------- COUPONS --------
export const getCoupons = async () => {
  const response = await apiClient.get('/admin/coupons');
  return response.data;
};

export const getCoupon = async (id) => {
  const response = await apiClient.get(`/admin/coupons/${id}`);
  return response.data;
};

export const createCoupon = async (data) => {
  const response = await apiClient.post('/admin/coupons', data);
  return response.data;
};

export const updateCoupon = async (id, data) => {
  const response = await apiClient.put(`/admin/coupons/${id}`, data);
  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await apiClient.delete(`/admin/coupons/${id}`);
  return response.data;
};

// -------- CMS PAGES --------
export const getPages = async () => {
  const response = await apiClient.get('/admin/pages');
  return response.data;
};

export const getPage = async (id) => {
  const response = await apiClient.get(`/admin/pages/${id}`);
  return response.data;
};

export const createPage = async (data) => {
  const response = await apiClient.post('/admin/pages', data);
  return response.data;
};

export const updatePage = async (id, data) => {
  const response = await apiClient.put(`/admin/pages/${id}`, data);
  return response.data;
};

export const deletePage = async (id) => {
  const response = await apiClient.delete(`/admin/pages/${id}`);
  return response.data;
};

// -------- SETTINGS --------
export const getSettings = async () => {
  const response = await apiClient.get('/admin/settings');
  return response.data;
};

export const updateSettings = async (data) => {
  const response = await apiClient.put('/admin/settings', data);
  return response.data;
};

// -------- PAYMENT VERIFICATION (Zelle) --------
export const getPendingPayments = async () => {
  const response = await apiClient.get('/admin/payments/pending');
  return response.data; // Expected: { items: [] }
};

export const getPaymentVerification = async (id) => {
  const response = await apiClient.get(`/admin/payments/${id}`);
  return response.data;
};

export const verifyPayment = async (id, status) => {
  const response = await apiClient.put(`/admin/payments/${id}/verify`, { status });
  return response.data;
};

export default {
  getDashboardStats,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  getOrder,
  updateOrderStatus,
  getCustomers,
  getCustomer,
  getBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  getBeforeAfterItems,
  getBeforeAfterItem,
  createBeforeAfterItem,
  updateBeforeAfterItem,
  deleteBeforeAfterItem,
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
  getReviews,
  getReview,
  approveReview,
  deleteReview,
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  getSettings,
  updateSettings,
  getPendingPayments,
  getPaymentVerification,
  verifyPayment,
};