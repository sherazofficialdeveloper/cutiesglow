// backend/src/services/orderService.js

import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import PaymentVerification from '../models/PaymentVerification.js';
import { AppError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

/**
 * Create order
 */
export const createOrder = async (orderData, userId) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      couponCode,
      notes,
      email,
      name,
      phone,
    } = orderData;

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) {
        throw new AppError(`Product ${item.id} not found`, 404);
      }

      if (product.stock < item.quantity) {
        throw new AppError(`Insufficient stock for ${product.name}`, 400);
      }

      const price = product.price;
      subtotal += price * item.quantity;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity,
        image: product.images?.[0] || '',
      });
    }

    // Apply coupon
    let discount = 0;
    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon) {
        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          throw new AppError('Coupon has expired', 400);
        }
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
          throw new AppError('Coupon usage limit reached', 400);
        }
        if (coupon.type === 'percentage') {
          discount = (subtotal * coupon.value) / 100;
        } else {
          discount = coupon.value;
        }
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    const shipping = subtotal > 35 ? 0 : 5.99;
    const tax = (subtotal - discount) * 0.08;
    const total = subtotal - discount + shipping + tax;

    const order = new Order({
      userId,
      items: orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      discount,
      shipping,
      tax,
      total,
      coupon: coupon?._id,
      notes,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      status: paymentMethod === 'zelle' ? 'pending' : 'paid',
    });

    await order.save();

    // Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.id, {
        $inc: { stock: -item.quantity, soldCount: item.quantity },
      });
    }

    return order;
  } catch (error) {
    logger.error('Create order service error:', error);
    throw error;
  }
};

/**
 * Get orders with pagination
 */
export const getOrders = async (userId, filters = {}) => {
  try {
    const { page = 1, limit = 10, status } = filters;
    const skip = (page - 1) * limit;

    const filter = { userId };
    if (status) filter.status = status;

    const [orders, totalCount] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('items.productId', 'name images slug'),
      Order.countDocuments(filter),
    ]);

    return {
      items: orders,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    logger.error('Get orders service error:', error);
    throw error;
  }
};

/**
 * Get order by ID
 */
export const getOrderById = async (orderId, userId) => {
  try {
    const order = await Order.findById(orderId)
      .populate('items.productId', 'name images slug');

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Check authorization
    if (order.userId?.toString() !== userId) {
      throw new AppError('Unauthorized to view this order', 403);
    }

    return order;
  } catch (error) {
    logger.error('Get order by ID service error:', error);
    throw error;
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    order.status = status;
    if (status === 'shipped') {
      order.shippedAt = new Date();
    }
    if (status === 'delivered') {
      order.deliveredAt = new Date();
    }

    await order.save();

    return order;
  } catch (error) {
    logger.error('Update order status service error:', error);
    throw error;
  }
};

/**
 * Cancel order
 */
export const cancelOrder = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    // Only allow cancellation if not shipped
    if (order.status === 'shipped' || order.status === 'delivered') {
      throw new AppError('Order cannot be cancelled once shipped', 400);
    }

    order.status = 'cancelled';
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity, soldCount: -item.quantity },
      });
    }

    return order;
  } catch (error) {
    logger.error('Cancel order service error:', error);
    throw error;
  }
};

/**
 * Get all orders (admin)
 */
export const getAllOrders = async (filters = {}) => {
  try {
    const { page = 1, limit = 10, status, search } = filters;
    const skip = (page - 1) * limit;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
        { _id: search.length >= 6 ? search : undefined },
      ].filter(Boolean);
    }

    const [orders, totalCount] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('items.productId', 'name images slug')
        .populate('userId', 'name email'),
      Order.countDocuments(filter),
    ]);

    return {
      items: orders,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    logger.error('Get all orders service error:', error);
    throw error;
  }
};

export default {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
};