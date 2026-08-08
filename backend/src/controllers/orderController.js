// backend/src/controllers/orderController.js

import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import PaymentVerification from '../models/PaymentVerification.js';
import { orderSchema, orderStatusSchema } from '../validations/orderValidation.js';
import { validate } from '../middleware/validate.js';
import { sendOrderConfirmation } from '../config/email.js';

/**
 * Create order
 * POST /api/orders
 */
export const createOrder = async (req, res, next) => {
  try {
    const errors = validate(orderSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const {
      items,
      shippingAddress,
      paymentMethod,
      couponCode,
      notes,
      email,
      name,
      phone,
    } = req.body;

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.id} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
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
          return res.status(400).json({
            success: false,
            message: 'Coupon has expired',
          });
        }
        if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
          return res.status(400).json({
            success: false,
            message: 'Coupon usage limit reached',
          });
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

    // Create order
    const order = new Order({
      userId: req.user?.id,
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

    // Send order confirmation email
    try {
      const user = req.user || { name, email };
      await sendOrderConfirmation(order, user);
    } catch (emailError) {
      console.error('Failed to send order confirmation:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user's orders
 * GET /api/orders
 */
export const getOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    const filter = { userId: req.user.id };
    if (status) filter.status = status;

    const [orders, totalCount] = await Promise.all([
      Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('items.productId', 'name images slug'),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        items: orders,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single order by ID
 * GET /api/orders/:id
 */
export const getOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate('items.productId', 'name images slug');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if user owns this order or is admin
    if (order.userId?.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to view this order',
      });
    }

    res.json({
      success: true,
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Submit Zelle payment proof
 * POST /api/orders/zelle-proof
 */
export const submitZelleProof = async (req, res, next) => {
  try {
    const { orderId, transactionId } = req.body;
    const proofFile = req.file;

    if (!proofFile) {
      return res.status(400).json({
        success: false,
        message: 'Proof of payment is required',
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Upload proof to cloud storage (e.g., Cloudinary)
    // For now, store the file path
    const proofUrl = `/uploads/${proofFile.filename}`;

    const verification = new PaymentVerification({
      orderId,
      transactionId,
      proofUrl,
      amount: order.total,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      status: 'pending',
    });

    await verification.save();

    res.json({
      success: true,
      message: 'Payment proof submitted successfully',
      data: { verification },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update order status
 * PUT /api/orders/:id/status (User & Admin)
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const errors = validate(orderStatusSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel order
 * PUT /api/orders/:id/cancel
 */
export const cancelOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Only allow cancellation if not shipped
    if (order.status === 'shipped' || order.status === 'delivered') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled once shipped',
      });
    }

    order.status = 'cancelled';
    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity, soldCount: -item.quantity },
      });
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};