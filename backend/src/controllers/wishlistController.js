// backend/src/controllers/wishlistController.js

import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

/**
 * Get user's wishlist
 * GET /api/wishlist
 */
export const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('items', 'name price images slug stock isActive');

    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, items: [] });
      await wishlist.save();
    }

    res.json({
      success: true,
      data: {
        items: wishlist.items || [],
        totalItems: wishlist.items?.length || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Toggle wishlist item (add/remove)
 * POST /api/wishlist/toggle
 */
export const toggleWishlist = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, items: [] });
    }

    const index = wishlist.items.indexOf(productId);
    let isAdded = false;

    if (index === -1) {
      wishlist.items.push(productId);
      isAdded = true;
    } else {
      wishlist.items.splice(index, 1);
      isAdded = false;
    }

    await wishlist.save();

    res.json({
      success: true,
      message: isAdded ? 'Added to wishlist' : 'Removed from wishlist',
      data: {
        isAdded,
        totalItems: wishlist.items.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Sync wishlist with server
 * POST /api/wishlist/sync
 */
export const syncWishlist = async (req, res, next) => {
  try {
    const { items } = req.body;

    let wishlist = await Wishlist.findOne({ userId: req.user.id });
    if (!wishlist) {
      wishlist = new Wishlist({ userId: req.user.id, items: [] });
    }

    // Merge items (server wins)
    const serverItems = new Set(wishlist.items.map(id => id.toString()));
    const clientItems = new Set(items.map(id => id.toString()));

    // Add client items not in server
    for (const id of clientItems) {
      if (!serverItems.has(id)) {
        const product = await Product.findById(id);
        if (product && product.isActive) {
          wishlist.items.push(id);
        }
      }
    }

    await wishlist.save();
    await wishlist.populate('items', 'name price images slug stock isActive');

    res.json({
      success: true,
      message: 'Wishlist synced successfully',
      data: {
        items: wishlist.items || [],
        totalItems: wishlist.items?.length || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};