// frontend/src/utils/index.js

export * from './formatters';
export * from './validators';
export * from './helpers';
export * from './storage';
export * from './string';
export * from './array';
export * from './object';
export * from './error';
export * from './currency';

// Default export for convenience
export default {
  ...require('./formatters'),
  ...require('./validators'),
  ...require('./helpers'),
  ...require('./storage'),
  ...require('./string'),
  ...require('./array'),
  ...require('./object'),
  ...require('./error'),
  ...require('./currency'),
};