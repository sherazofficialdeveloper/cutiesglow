// frontend/src/validations/index.js

export * from './authValidation';
export * from './productValidation';
export * from './orderValidation';
export * from './userValidation';
export * from './adminValidation';
export * from './commonValidation';
export * from './messages';
export * from './schemas';
export * from './sanitizers';

// For convenience, export default as well
export default {
  ...require('./authValidation'),
  ...require('./productValidation'),
  ...require('./orderValidation'),
  ...require('./userValidation'),
  ...require('./adminValidation'),
  ...require('./commonValidation'),
  ...require('./messages'),
  ...require('./schemas'),
  ...require('./sanitizers'),
};