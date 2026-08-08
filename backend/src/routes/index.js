// backend/src/routes/index.js

import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import orderRoutes from './orderRoutes.js';
import cartRoutes from './cartRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import bannerRoutes from './bannerRoutes.js';
import beforeAfterRoutes from './beforeAfterRoutes.js';
import videoRoutes from './videoRoutes.js';
import couponRoutes from './couponRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import pageRoutes from './pageRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import adminRoutes from './adminRoutes.js';
import { auth, admin } from '../middleware/index.js';

const router = express.Router();

// Public routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/coupons', couponRoutes);
router.use('/pages', pageRoutes);
router.use('/settings', settingsRoutes);
router.use('/payments', paymentRoutes);

// Protected routes (require authentication)
router.use('/users', auth, userRoutes);
router.use('/orders', auth, orderRoutes);
router.use('/cart', auth, cartRoutes);
router.use('/wishlist', auth, wishlistRoutes);
router.use('/reviews', auth, reviewRoutes);

// Admin routes (require authentication + admin role)
router.use('/admin', auth, admin, adminRoutes);
router.use('/admin/banners', auth, admin, bannerRoutes);
router.use('/admin/before-after', auth, admin, beforeAfterRoutes);
router.use('/admin/videos', auth, admin, videoRoutes);
router.use('/admin/analytics', auth, admin, analyticsRoutes);

// Health check
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
  });
});

export default router;