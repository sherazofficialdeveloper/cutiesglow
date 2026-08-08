// backend/src/utils/jwt.js

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

/**
 * Generate JWT token
 * @param {Object} payload - Data to encode
 * @param {string} expiresIn - Expiration time
 * @returns {string} JWT token
 */
export const generateToken = (payload, expiresIn = JWT_EXPIRE) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT token
 * @param {string} token - Token to verify
 * @returns {Object|null} Decoded payload or null if invalid
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
 * @returns {Object|null} Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

/**
 * Get token from request headers
 * @param {Object} req - Express request object
 * @returns {string|null} Token or null
 */
export const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

/**
 * Extract user from token (middleware helper)
 * @param {string} token - JWT token
 * @returns {Object|null} User payload or null
 */
export const getUserFromToken = (token) => {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return decoded;
};

export default {
  generateToken,
  verifyToken,
  decodeToken,
  getTokenFromRequest,
  getUserFromToken,
};