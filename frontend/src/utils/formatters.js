// frontend/src/utils/formatters.js

/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '$0.00';
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a number with commas
 * @param {number} num - The number to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted number string
 */
export const formatNumber = (num, decimals = 0) => {
  if (num === undefined || num === null || isNaN(num)) {
    return '0';
  }
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

/**
 * Format a percentage
 * @param {number} value - The value to format as percentage
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 0) => {
  if (value === undefined || value === null || isNaN(value)) {
    return '0%';
  }
  return `${formatNumber(value, decimals)}%`;
};

/**
 * Format a date
 * @param {string|Date} date - The date to format
 * @param {string} format - Format style: 'short', 'medium', 'long', 'full' (default: 'medium')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium', locale = 'en-US') => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  const options = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  };

  return new Intl.DateTimeFormat(locale, options[format] || options.medium).format(dateObj);
};

/**
 * Format a time
 * @param {string|Date} date - The date to format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted time string
 */
export const formatTime = (date, locale = 'en-US') => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'Invalid Time';

  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(dateObj);
};

/**
 * Format a date and time together
 * @param {string|Date} date - The date to format
 * @param {string} dateFormat - Date format style
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, dateFormat = 'medium', locale = 'en-US') => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  return `${formatDate(dateObj, dateFormat, locale)} at ${formatTime(dateObj, locale)}`;
};

/**
 * Format a relative time (e.g., "2 hours ago")
 * @param {string|Date} date - The date to format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date, locale = 'en-US') => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormatter(locale, { numeric: 'auto' });

  if (diffYear > 0) return rtf.format(-diffYear, 'year');
  if (diffMonth > 0) return rtf.format(-diffMonth, 'month');
  if (diffWeek > 0) return rtf.format(-diffWeek, 'week');
  if (diffDay > 0) return rtf.format(-diffDay, 'day');
  if (diffHour > 0) return rtf.format(-diffHour, 'hour');
  if (diffMin > 0) return rtf.format(-diffMin, 'minute');
  if (diffSec > 10) return rtf.format(-diffSec, 'second');
  return 'Just now';
};

/**
 * Format a phone number
 * @param {string} phone - The phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
  }
  return phone;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length (default: 50)
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + suffix;
};

/**
 * Get initials from a name
 * @param {string} name - The full name
 * @param {number} max - Maximum number of initials (default: 2)
 * @returns {string} Initials
 */
export const getInitials = (name, max = 2) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .filter(char => char && char.match(/[A-Za-z]/))
    .join('')
    .toUpperCase()
    .slice(0, max);
};

export default {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatPhoneNumber,
  truncateText,
  getInitials,
};