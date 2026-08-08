// frontend/src/validations/messages.js

/**
 * Centralized validation error messages
 */
export const VALIDATION_MESSAGES = {
  // Auth messages
  INVALID_EMAIL: 'Please enter a valid email address.',
  PASSWORD_MIN: 'Password must be at least 6 characters long.',
  PASSWORD_STRONG: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  PASSWORD_MISMATCH: 'Passwords do not match. Please try again.',
  INVALID_PHONE: 'Please enter a valid phone number.',
  NAME_MIN: 'Name must be at least 2 characters long.',
  CURRENT_PASSWORD_REQUIRED: 'Current password is required.',

  // Product messages
  PRODUCT_NAME: 'Product name must be between 3 and 100 characters.',
  PRODUCT_DESCRIPTION: 'Description must be at least 20 characters long.',
  INVALID_PRICE: 'Please enter a valid price.',
  INVALID_STOCK: 'Please enter a valid stock quantity.',
  INVALID_IMAGE_URL: 'Please enter a valid image URL.',
  INVALID_CATEGORY: 'Please select a valid category.',
  INVALID_SLUG: 'Slug can only contain lowercase letters, numbers, and hyphens.',
  INVALID_RATING: 'Rating must be between 0 and 5.',
  INVALID_SEARCH: 'Invalid search term.',
  INVALID_SORT: 'Invalid sort option.',

  // Order messages
  ADDRESS_REQUIRED: 'Please enter your complete address.',
  CITY_REQUIRED: 'Please enter your city.',
  STATE_REQUIRED: 'Please enter your state/province.',
  ZIP_REQUIRED: 'Please enter your postal code.',
  COUNTRY_REQUIRED: 'Please enter your country.',
  INVALID_ZIP: 'Please enter a valid postal code.',
  INVALID_PAYMENT_METHOD: 'Please select a valid payment method.',
  EMPTY_CART: 'Your cart is empty. Please add items before checking out.',
  INVALID_COUPON: 'Invalid coupon code.',
  NOTES_TOO_LONG: 'Notes cannot exceed 500 characters.',
  INVALID_STATUS: 'Invalid order status.',
  INVALID_DATE: 'Please enter a valid date.',
  TRANSACTION_ID_REQUIRED: 'Please enter the transaction ID or reference number.',
  PROOF_REQUIRED: 'Please upload proof of payment (screenshot).',

  // User messages
  LABEL_REQUIRED: 'Please enter a label for this address (e.g., Home, Work).',
  STREET_REQUIRED: 'Please enter your street address.',
  INVALID_AVATAR_URL: 'Please enter a valid image URL for your avatar.',

  // Admin messages
  CATEGORY_NAME: 'Category name must be between 2 and 50 characters.',
  BANNER_TITLE: 'Banner title must be between 2 and 100 characters.',
  INVALID_BANNER_TYPE: 'Invalid banner type. Must be hero, promo, or instagram.',
  VIDEO_TITLE: 'Video title must be between 2 and 100 characters.',
  INVALID_VIDEO_URL: 'Please enter a valid YouTube or Vimeo URL.',
  INVALID_VIDEO_TYPE: 'Invalid video type. Must be homepage or product.',
  COUPON_CODE: 'Coupon code must be between 3 and 20 characters.',
  INVALID_COUPON_TYPE: 'Invalid coupon type. Must be percentage or fixed.',
  INVALID_COUPON_VALUE: 'Please enter a valid coupon value.',
  INVALID_MAX_USES: 'Please enter a valid maximum uses.',
  SITE_NAME: 'Site name must be between 2 and 50 characters.',
  TAGLINE_TOO_LONG: 'Tagline cannot exceed 100 characters.',
  DESCRIPTION_TOO_LONG: 'Description cannot exceed 500 characters.',
  ADDRESS_TOO_LONG: 'Address cannot exceed 200 characters.',
  INVALID_PAYPAL_CLIENT_ID: 'Please enter a valid PayPal Client ID.',
  INVALID_PAYPAL_MODE: 'Invalid PayPal mode. Must be sandbox or live.',

  // Common messages
  REQUIRED: 'This field is required.',
  INVALID_URL: 'Please enter a valid URL.',
  INVALID_NUMBER: 'Please enter a valid number.',
  INVALID_INTEGER: 'Please enter a valid whole number.',
  INVALID_BOOLEAN: 'This field must be true or false.',
  INVALID_ARRAY: 'Please enter a valid array.',
  INVALID_PAGE: 'Please enter a valid page number.',
  INVALID_LIMIT: 'Please enter a valid limit (1-50).',
  SUBJECT_REQUIRED: 'Please enter a subject.',
  MESSAGE_REQUIRED: 'Please enter your message (min 10 characters).',
  QUESTION_REQUIRED: 'Please enter a question.',
  ANSWER_REQUIRED: 'Please enter an answer.',
  REVIEW_TEXT: 'Review must be between 5 and 1000 characters.',
};

export default VALIDATION_MESSAGES;