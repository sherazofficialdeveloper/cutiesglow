// backend/src/config/payment.js

// PayPal Configuration
export const paypalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID,
  clientSecret: process.env.PAYPAL_CLIENT_SECRET,
  mode: process.env.PAYPAL_MODE || 'sandbox', // 'sandbox' or 'live'
  apiUrl: process.env.PAYPAL_MODE === 'live' 
    ? 'https://api-m.paypal.com' 
    : 'https://api-m.sandbox.paypal.com',
};

// Zelle Configuration
export const zelleConfig = {
  email: process.env.ZELLE_EMAIL || 'pay@CutiesGlowbyrazias.com',
  phone: process.env.ZELLE_PHONE || '+1234567890',
  instructions: process.env.ZELLE_INSTRUCTIONS || 'Send payment via Zelle to the email above. Include your order number in the memo.',
};

/**
 * Validate payment method
 * @param {string} method - Payment method
 * @returns {boolean} True if valid
 */
export const isValidPaymentMethod = (method) => {
  return ['paypal', 'zelle', 'stripe', 'cod'].includes(method);
};

export default {
  paypal: paypalConfig,
  zelle: zelleConfig,
  isValidPaymentMethod,
};