// backend/src/controllers/adminController.js

import mongoose from 'mongoose';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Settings from '../models/Settings.js';
import logger from '../utils/logger.js';

// ============================================================
// 📊 DASHBOARD
// ============================================================

/**
 * Get dashboard statistics
 * GET /api/admin/dashboard/stats
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ['paid', 'delivered', 'shipped'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    const revenue = revenueResult[0]?.total || 0;

    const [ordersCount, customersCount, productsCount, pendingOrdersCount] = await Promise.all([
      Order.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Product.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
    ]);

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email')
      .lean();

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt role')
      .lean();

    const orderStatusDistribution = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const topProducts = await Product.find()
      .sort({ soldCount: -1 })
      .limit(5)
      .select('name price soldCount images')
      .lean();

    res.json({
      success: true,
      data: {
        stats: { revenue, orders: ordersCount, pendingOrders: pendingOrdersCount, customers: customersCount, products: productsCount },
        recentOrders,
        recentUsers,
        orderStatusDistribution,
        topProducts,
      },
    });
  } catch (error) {
    logger.error('Get dashboard stats error:', error);
    next(error);
  }
};

// ============================================================
// 👥 USER MANAGEMENT
// ============================================================

/**
 * Get all users with pagination
 * GET /api/admin/users
 */
export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const role = req.query.role || '';

    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }
    if (role) filter.role = role;

    const [users, total] = await Promise.all([
      User.find(filter).select('-password').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        users,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
    });
  } catch (error) {
    logger.error('Get users error:', error);
    next(error);
  }
};

/**
 * Get user by ID with order statistics
 * GET /api/admin/users/:id
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const orderStats = await Order.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, totalOrders: { $sum: 1 }, totalSpent: { $sum: '$total' } } },
    ]);

    const recentOrders = await Order.find({ userId: id }).sort({ createdAt: -1 }).limit(5).lean();

    res.json({
      success: true,
      data: {
        user,
        orderStats: {
          totalOrders: orderStats[0]?.totalOrders || 0,
          totalSpent: orderStats[0]?.totalSpent || 0,
        },
        recentOrders,
      },
    });
  } catch (error) {
    logger.error('Get user by ID error:', error);
    next(error);
  }
};

/**
 * Update user role
 * PUT /api/admin/users/:id/role
 */
export const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    if (!['admin', 'customer'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role. Must be "admin" or "customer"' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user._id.toString() === req.user.id && role !== 'admin') {
      return res.status(403).json({ success: false, message: 'You cannot remove your own admin role' });
    }

    user.role = role;
    await user.save();

    res.json({
      success: true,
      message: `User role updated to ${role}`,
      data: { user: { id: user._id, name: user.name, email: user.email, role: user.role } },
    });
  } catch (error) {
    logger.error('Update user role error:', error);
    next(error);
  }
};

/**
 * Toggle user active status
 * PUT /api/admin/users/:id/toggle-active
 */
export const toggleUserActive = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(403).json({ success: false, message: 'You cannot deactivate your own account' });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user: { id: user._id, name: user.name, isActive: user.isActive } },
    });
  } catch (error) {
    logger.error('Toggle user active error:', error);
    next(error);
  }
};

/**
 * Delete user
 * DELETE /api/admin/users/:id
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(403).json({ success: false, message: 'You cannot delete your own account' });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    logger.error('Delete user error:', error);
    next(error);
  }
};

// ============================================================
// 📦 ORDER MANAGEMENT
// ============================================================

/**
 * Get all orders with pagination and filters
 * GET /api/admin/orders
 */
export const getOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const status = req.query.status || '';
    const search = req.query.search || '';

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        orders,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      },
    });
  } catch (error) {
    logger.error('Get orders error:', error);
    next(error);
  }
};

/**
 * Get single order by ID (Admin view)
 * GET /api/admin/orders/:id
 */
export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID' });
    }

    const order = await Order.findById(id)
      .populate('userId', 'name email phone addresses')
      .lean();

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    logger.error('Get order by ID error:', error);
    next(error);
  }
};

/**
 * Update order status
 * PUT /api/admin/orders/:id/status
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID' });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const oldStatus = order.status;
    order.status = status;
    await order.save();

    logger.info(`Order ${order.orderNumber} status changed from ${oldStatus} to ${status}`);

    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      data: { order },
    });
  } catch (error) {
    logger.error('Update order status error:', error);
    next(error);
  }
};

/**
 * Delete order
 * DELETE /api/admin/orders/:id
 */
export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid order ID' });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (['paid', 'delivered', 'shipped'].includes(order.status)) {
      return res.status(403).json({ success: false, message: 'Cannot delete processed orders. Mark as cancelled or refunded instead.' });
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error) {
    logger.error('Delete order error:', error);
    next(error);
  }
};

// ============================================================
// 🏷️ CATEGORY MANAGEMENT
// ============================================================

/**
 * Create category
 * POST /api/admin/categories
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, description, image, isActive } = req.body;

    const existingCategory = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingCategory) {
      return res.status(409).json({ success: false, message: 'Category with this name already exists' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const category = new Category({
      name,
      slug,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category },
    });
  } catch (error) {
    logger.error('Create category error:', error);
    next(error);
  }
};

/**
 * Update category
 * PUT /api/admin/categories/:id
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, image, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: id },
      });
      if (existingCategory) {
        return res.status(409).json({ success: false, message: 'Category with this name already exists' });
      }
      category.name = name;
      category.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    if (description !== undefined) category.description = description;
    if (image !== undefined) category.image = image;
    if (isActive !== undefined) category.isActive = isActive;

    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category },
    });
  } catch (error) {
    logger.error('Update category error:', error);
    next(error);
  }
};

/**
 * Delete category
 * DELETE /api/admin/categories/:id
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid category ID' });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const productCount = await Product.countDocuments({ category: id });
    if (productCount > 0) {
      return res.status(403).json({ success: false, message: `Cannot delete category with ${productCount} products. Reassign or delete products first.` });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    logger.error('Delete category error:', error);
    next(error);
  }
};

// ============================================================
// ⚙️ SETTINGS MANAGEMENT
// ============================================================

/**
 * Get settings
 * GET /api/admin/settings
 */
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne().lean();

    if (!settings) {
      settings = await Settings.create({
        siteName: 'CutiesGlow',
        siteDescription: 'Premium Skincare Products',
        contactEmail: process.env.SMTP_USER || '',
        zelleEmail: process.env.ZELLE_EMAIL || '',
        paypalMode: 'sandbox',
        freeShippingThreshold: 50,
        standardShippingCost: 5.99,
        taxRate: 0,
        currency: 'USD',
        maintenanceMode: false,
      });
    }

    res.json({
      success: true,
      data: { settings },
    });
  } catch (error) {
    logger.error('Get settings error:', error);
    next(error);
  }
};

/**
 * Update settings
 * PUT /api/admin/settings
 */
export const updateSettings = async (req, res, next) => {
  try {
    const updateData = req.body;
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings();
    }

    const allowedFields = [
      'siteName', 'siteDescription', 'contactEmail', 'zelleEmail',
      'paypalMode', 'freeShippingThreshold', 'standardShippingCost',
      'taxRate', 'currency', 'maintenanceMode',
    ];

    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        settings[field] = updateData[field];
      }
    });

    await settings.save();

    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: { settings },
    });
  } catch (error) {
    logger.error('Update settings error:', error);
    next(error);
  }
};

// ============================================================
// 🛍️ PRODUCT MANAGEMENT (Admin)
// ============================================================

/**
 * Create product (Admin)
 * POST /api/admin/products
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name, description, price, comparePrice, category, images,
      stock, isActive, isFeatured, ingredients, howToUse, benefits,
    } = req.body;

    const existingProduct = await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingProduct) {
      return res.status(409).json({ success: false, message: 'Product with this name already exists' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const product = new Product({
      name,
      slug,
      description,
      price,
      comparePrice: comparePrice || null,
      category,
      images: images || [],
      stock: stock || 0,
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured || false,
      ingredients: ingredients || [],
      howToUse: howToUse || '',
      benefits: benefits || [],
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product },
    });
  } catch (error) {
    logger.error('Create product error:', error);
    next(error);
  }
};

/**
 * Update product (Admin)
 * PUT /api/admin/products/:id
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (updateData.name && updateData.name !== product.name) {
      const existingProduct = await Product.findOne({
        name: { $regex: new RegExp(`^${updateData.name}$`, 'i') },
        _id: { $ne: id },
      });
      if (existingProduct) {
        return res.status(409).json({ success: false, message: 'Product with this name already exists' });
      }
      product.name = updateData.name;
      product.slug = updateData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const allowedFields = [
      'description', 'price', 'comparePrice', 'category', 'images',
      'stock', 'isActive', 'isFeatured', 'ingredients', 'howToUse', 'benefits',
    ];

    allowedFields.forEach((field) => {
      if (updateData[field] !== undefined) {
        product[field] = updateData[field];
      }
    });

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product },
    });
  } catch (error) {
    logger.error('Update product error:', error);
    next(error);
  }
};

/**
 * Delete product (Admin)
 * DELETE /api/admin/products/:id
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const orderCount = await Order.countDocuments({ 'items.productId': id });
    if (orderCount > 0) {
      return res.status(403).json({ success: false, message: `Cannot delete product with ${orderCount} orders. Archive it instead.` });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    logger.error('Delete product error:', error);
    next(error);
  }
};