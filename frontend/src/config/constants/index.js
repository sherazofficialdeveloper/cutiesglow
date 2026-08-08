/**
 * Centralized Constants Configuration
 * All application constants live here
 */

// App Info
export const APP_NAME = 'CUTIES GLOW';
export const APP_DESCRIPTION = 'Premium Skincare & Beauty Products';
export const APP_URL = 'https://cutishbyrazias.com';
export const APP_EMAIL = 'info@cutishbyrazias.com';
export const APP_PHONE = '+1 (800) 555-GLOW';

// Routes
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT: '/products/[slug]',
  CATEGORIES: '/categories',
  CATEGORY: '/categories/[slug]',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation/[id]',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',
  DASHBOARD: '/dashboard',
  DASHBOARD_ORDERS: '/dashboard/orders',
  DASHBOARD_ORDER: '/dashboard/orders/[id]',
  WISHLIST: '/dashboard/wishlist',
  PROFILE: '/dashboard/profile',
  ADDRESSES: '/dashboard/addresses',
  SETTINGS: '/dashboard/settings',
  REVIEWS: '/dashboard/reviews',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_BANNERS: '/admin/banners',
  ADMIN_BEFORE_AFTER: '/admin/before-after',
  ADMIN_VIDEOS: '/admin/videos',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_COUPONS: '/admin/coupons',
  ADMIN_PAGES: '/admin/pages',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_PAYMENTS: '/admin/payments-verification',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  BLOG: '/blog',
  BLOG_POST: '/blog/[slug]',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',
};

// API Configuration
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,
  PRODUCT_LIMIT: 12,
  ORDER_LIMIT: 10,
  REVIEW_LIMIT: 6,
  CATEGORY_LIMIT: 20,
};

// Section Limits (Homepage)
export const SECTION_LIMITS = {
  FEATURED_PRODUCTS: 6,
  BEFORE_AFTER: 6,
  REVIEWS: 6,
  INSTAGRAM_REELS: 5,
  FAQS: 5,
  BLOG_POSTS: 3,
  TESTIMONIALS: 4,
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  CART: 'cart_items',
  WISHLIST: 'wishlist_items',
  THEME: 'theme_preference',
  RECENTLY_VIEWED: 'recently_viewed',
  COMPARE: 'compare_items',
};

// Categories
export const CATEGORIES = [
  'Soap',
  'Serum',
  'Cream',
  'Scrub',
  'Bundle',
  'Gummies',
  'Mask',
  'Toner',
];

// Sort Options
export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Popular' },
];

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled',
};

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  paid: 'Paid',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

// Payment Methods
export const PAYMENT_METHODS = {
  PAYPAL: 'paypal',
  ZELLE: 'zelle',
  STRIPE: 'stripe',
  COD: 'cod',
};

export const PAYMENT_METHOD_LABELS = {
  paypal: 'PayPal',
  zelle: 'Zelle',
  stripe: 'Credit Card',
  cod: 'Cash on Delivery',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest',
};

// Form Validation
export const VALIDATION = {
  NAME_MIN: 2,
  NAME_MAX: 50,
  PASSWORD_MIN: 6,
  PASSWORD_MAX: 50,
  PHONE_MIN: 10,
  PHONE_MAX: 15,
  ZIP_MIN: 5,
  ZIP_MAX: 10,
};

// Toast Messages
export const TOAST_MESSAGES = {
  ADDED_TO_CART: 'Product added to cart successfully!',
  REMOVED_FROM_CART: 'Product removed from cart.',
  ADDED_TO_WISHLIST: 'Added to wishlist!',
  REMOVED_FROM_WISHLIST: 'Removed from wishlist.',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  REGISTER_SUCCESS: 'Account created successfully!',
  ORDER_SUCCESS: 'Order placed successfully!',
  COUPON_APPLIED: 'Coupon applied successfully!',
  COUPON_REMOVED: 'Coupon removed.',
};

// Default Images
export const DEFAULT_IMAGES = {
  PRODUCT: '/images/default-product.jpg',
  CATEGORY: '/images/default-category.jpg',
  AVATAR: '/images/default-avatar.jpg',
  BANNER: '/images/default-banner.jpg',
  LOGO: '/images/logo.png',
};

// Currency
export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD',
  LOCALE: 'en-US',
};

export default {
  APP_NAME,
  APP_DESCRIPTION,
  APP_URL,
  APP_EMAIL,
  APP_PHONE,
  ROUTES,
  API,
  PAGINATION,
  SECTION_LIMITS,
  STORAGE_KEYS,
  CATEGORIES,
  SORT_OPTIONS,
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  PAYMENT_METHODS,
  PAYMENT_METHOD_LABELS,
  USER_ROLES,
  VALIDATION,
  TOAST_MESSAGES,
  DEFAULT_IMAGES,
  CURRENCY,
};