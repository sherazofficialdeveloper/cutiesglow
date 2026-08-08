// backend/src/middleware/admin.js

import { auth } from './auth.js';

/**
 * Admin authorization middleware
 * Checks if user has admin role
 */
export const admin = async (req, res, next) => {
  // First, authenticate the user
  await auth(req, res, async () => {
    try {
      // Check if user exists and has admin role
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized. Please log in.',
        });
      }

      if (req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Access denied. Admin privileges required.',
        });
      }

      // User is authenticated and is admin
      next();
    } catch (error) {
      next(error);
    }
  });
};

export default admin;