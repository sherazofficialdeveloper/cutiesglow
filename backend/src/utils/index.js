// backend/src/utils/index.js
// backend/src/utils/index.js
export * from './logger.js';
export * from './password.js';
export * from './jwt.js';
export * from './sanitize.js';
export * from './formatters.js';
export * from './helpers.js';
export * from './error.js';  // ✅ This should be error.js, not errors.js
export * from './validators.js';

export default {
  ...require('./logger.js'),
  ...require('./password.js'),
  ...require('./jwt.js'),
  ...require('./sanitize.js'),
  ...require('./formatters.js'),
  ...require('./helpers.js'),
  ...require('./error.js'),
  ...require('./validators.js'),
};