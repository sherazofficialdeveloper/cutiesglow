// backend/src/services/index.js

export * from './authService.js';
export * from './userService.js';
export * from './productService.js';
export * from './orderService.js';
export * from './cartService.js';
export * from './wishlistService.js';
export * from './reviewService.js';
export * from './emailService.js';
export * from './paymentService.js';
export * from './analyticsService.js';
export * from './storageService.js';

export default {
  ...require('./authService.js'),
  ...require('./userService.js'),
  ...require('./productService.js'),
  ...require('./orderService.js'),
  ...require('./cartService.js'),
  ...require('./wishlistService.js'),
  ...require('./reviewService.js'),
  ...require('./emailService.js'),
  ...require('./paymentService.js'),
  ...require('./analyticsService.js'),
  ...require('./storageService.js'),
};