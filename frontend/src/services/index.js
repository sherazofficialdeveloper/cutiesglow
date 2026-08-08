// frontend/src/services/index.js
export * from './api';
export * as authService from './authService';
export * as productService from './productService';
export * as categoryService from './categoryService';
export * as orderService from './orderService';
export * as cartService from './cartService';
export * as wishlistService from './wishlistService';
export * as reviewService from './reviewService';
export * as userService from './userService';
export * as adminService from './adminService';
export * as paymentService from './paymentService';
export * as instagramService from './instagramService';
export * as beforeAfterService from './beforeAfterService';
export * as faqService from './faqService';
export * as contactService from './contactService';
export * as settingsService from './settingsService';

// Default export for convenience
export default {
  authService,
  productService,
  categoryService,
  orderService,
  cartService,
  wishlistService,
  reviewService,
  userService,
  adminService,
  paymentService,
  instagramService,
  beforeAfterService,
  faqService,
  contactService,
  settingsService,
};