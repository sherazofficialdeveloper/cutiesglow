// backend/src/middleware/index.js

import auth from './auth.js';
import admin from './admin.js';
import validate, { commonValidations } from './validate.js';
import upload, { uploadSingle, uploadMultiple, uploadFields, singleFileUpload } from './upload.js';
import errorHandler from './errorHandler.js';
import rateLimiter, { generalLimiter, authLimiter, adminLimiter, apiLimiter, strictLimiter } from './rateLimiter.js';
import logger, { httpLogger, devLogger, prodLogger, loggerMiddleware } from './logger.js';
import cors, { corsMiddleware } from './cors.js';
import sanitize, { sanitizeBody, sanitizeQuery, sanitizations, sanitizeRequestBody, xssProtection } from './sanitize.js';

export {
  auth,
  admin,
  validate,
  commonValidations,
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  singleFileUpload,
  errorHandler,
  rateLimiter,
  generalLimiter,
  authLimiter,
  adminLimiter,
  apiLimiter,
  strictLimiter,
  logger,
  httpLogger,
  devLogger,
  prodLogger,
  loggerMiddleware,
  cors,
  corsMiddleware,
  sanitize,
  sanitizeBody,
  sanitizeQuery,
  sanitizations,
  sanitizeRequestBody,
  xssProtection,
};

export default {
  auth,
  admin,
  validate,
  commonValidations,
  upload,
  uploadSingle,
  uploadMultiple,
  uploadFields,
  singleFileUpload,
  errorHandler,
  rateLimiter,
  generalLimiter,
  authLimiter,
  adminLimiter,
  apiLimiter,
  strictLimiter,
  logger,
  httpLogger,
  devLogger,
  prodLogger,
  loggerMiddleware,
  cors,
  corsMiddleware,
  sanitize,
  sanitizeBody,
  sanitizeQuery,
  sanitizations,
  sanitizeRequestBody,
  xssProtection,
};