// frontend/src/utils/currency.js

import { formatCurrency } from './formatters';

/**
 * Currency configuration
 */
export const CURRENCY_CONFIG = {
  USD: { symbol: '$', code: 'USD', locale: 'en-US', decimalPlaces: 2 },
  EUR: { symbol: '€', code: 'EUR', locale: 'de-DE', decimalPlaces: 2 },
  GBP: { symbol: '£', code: 'GBP', locale: 'en-GB', decimalPlaces: 2 },
  PKR: { symbol: 'Rs', code: 'PKR', locale: 'en-PK', decimalPlaces: 2 },
};

/**
 * Get currency configuration
 * @param {string} currency - Currency code
 * @returns {Object} Currency configuration
 */
export const getCurrencyConfig = (currency = 'USD') => {
  return CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
};

/**
 * Format amount as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted amount
 */
export const formatAmount = (amount, currency = 'USD') => {
  const config = getCurrencyConfig(currency);
  return formatCurrency(amount, currency, config.locale);
};

/**
 * Convert amount between currencies (simple conversion with rate)
 * @param {number} amount - Amount to convert
 * @param {number} rate - Conversion rate
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @returns {number} Converted amount
 */
export const convertCurrency = (amount, rate, fromCurrency = 'USD', toCurrency = 'USD') => {
  if (!amount || !rate) return 0;
  return amount * rate;
};

/**
 * Format as price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @param {string} currency - Currency code
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (min, max, currency = 'USD') => {
  if (min === undefined || max === undefined) return '';
  if (min === max) return formatAmount(min, currency);
  return `${formatAmount(min, currency)} - ${formatAmount(max, currency)}`;
};

/**
 * Calculate discount percentage
 * @param {number} original - Original price
 * @param {number} sale - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (original, sale) => {
  if (!original || !sale || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
};

/**
 * Format discount amount
 * @param {number} original - Original price
 * @param {number} sale - Sale price
 * @param {string} currency - Currency code
 * @returns {string} Formatted discount
 */
export const formatDiscount = (original, sale, currency = 'USD') => {
  const discount = calculateDiscount(original, sale);
  const saved = original - sale;
  return `Save ${discount}% (${formatAmount(saved, currency)})`;
};

/**
 * Check if price is on sale
 * @param {number} original - Original price
 * @param {number} sale - Sale price
 * @returns {boolean} True if on sale
 */
export const isOnSale = (original, sale) => {
  return original && sale && sale < original;
};

/**
 * Format shipping cost
 * @param {number} cost - Shipping cost
 * @param {number} threshold - Free shipping threshold
 * @param {string} currency - Currency code
 * @returns {string} Formatted shipping
 */
export const formatShipping = (cost, threshold = null, currency = 'USD') => {
  if (cost === 0) return 'Free Shipping';
  if (threshold && cost === 0) return `Free shipping on orders over ${formatAmount(threshold, currency)}`;
  return formatAmount(cost, currency);
};

export default {
  CURRENCY_CONFIG,
  getCurrencyConfig,
  formatAmount,
  convertCurrency,
  formatPriceRange,
  calculateDiscount,
  formatDiscount,
  isOnSale,
  formatShipping,
};