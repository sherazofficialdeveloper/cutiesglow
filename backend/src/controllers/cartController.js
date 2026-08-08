// backend/src/controllers/cartController.js

import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

/**
 * Get user's cart
 * GET /api/cart
 */
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId', 'name price images slug stock');

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
      await cart.save();
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({
      success: true,
      data: {
        items: cart.items,
        subtotal,
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Add item to cart
 * POST /api/cart
 */
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, variant } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock',
      });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId &&
      JSON.stringify(item.variant) === JSON.stringify(variant)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        price: product.price,
        variant,
      });
    }

    await cart.save();

    // Populate product details
    await cart.populate('items.productId', 'name price images slug stock');

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({
      success: true,
      message: 'Item added to cart',
      data: {
        items: cart.items,
        subtotal,
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update cart item quantity
 * PUT /api/cart/:itemId
 */
export const updateCartItem = async (req, res, next) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be positive',
      });
    }

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      // Check stock
      const product = await Product.findById(cart.items[itemIndex].productId);
      if (product && product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock',
        });
      }
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.productId', 'name price images slug stock');

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({
      success: true,
      message: 'Cart updated',
      data: {
        items: cart.items,
        subtotal,
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Remove item from cart
 * DELETE /api/cart/:itemId
 */
export const removeFromCart = async (req, res, next) => {
  try {
    const { itemId } = req.params;

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(item => item._id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate('items.productId', 'name price images slug stock');

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: {
        items: cart.items,
        subtotal,
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Sync local cart with server
 * POST /api/cart/sync
 */
export const syncCart = async (req, res, next) => {
  try {
    const { items } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    // Merge items (server wins for conflicts)
    for (const item of items) {
      const existing = cart.items.find(
        (ci) => ci.productId.toString() === item.id &&
        JSON.stringify(ci.variant) === JSON.stringify(item.variant)
      );

      if (existing) {
        // Keep the higher quantity? or server? We'll keep server's.
        if (item.quantity > existing.quantity) {
          existing.quantity = item.quantity;
        }
      } else {
        cart.items.push({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant,
        });
      }
    }

    await cart.save();
    await cart.populate('items.productId', 'name price images slug stock');

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({
      success: true,
      message: 'Cart synced successfully',
      data: {
        items: cart.items,
        subtotal,
        totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
};