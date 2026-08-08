// backend/src/config/jwt.js

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Generate JWT token
 * @param {Object} payload - Data to encode in token
 * @param {string} expiresIn - Expiration time (default: JWT_EXPIRE)
 * @returns {string} JWT token
 */
export const generateToken = (payload, expiresIn = JWT_EXPIRE) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT token
 * @param {string} token - Token to verify
 * @returns {Object} Decoded payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Decode JWT token without verification
 * @param {string} token - Token to decode
 * @returns {Object} Decoded payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};

export default {
  secret: JWT_SECRET,
  expire: JWT_EXPIRE,
  generateToken,
  verifyToken,
  decodeToken,
};