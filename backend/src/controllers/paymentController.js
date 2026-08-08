// backend/src/controllers/paymentController.js

import Order from '../models/Order.js';
import PaymentVerification from '../models/PaymentVerification.js';
import User from '../models/User.js';
import { paypalConfig, zelleConfig } from '../config/payment.js';
import { sendPaymentVerification } from '../config/email.js';

export const createPayPalOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const approvalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
    res.json({
      success: true,
      data: { orderId, approvalUrl },
    });
  } catch (error) {
    next(error);
  }
};

export const capturePayPalOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    order.status = 'paid';
    await order.save();
    res.json({
      success: true,
      message: 'Payment captured successfully',
      data: { order },
    });
  } catch (error) {
    next(error);
  }
};

export const submitZellePayment = async (req, res, next) => {
  try {
    const { orderId, transactionId } = req.body;
    const proofFile = req.file;
    if (!proofFile) {
      return res.status(400).json({ success: false, message: 'Proof of payment is required' });
    }
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
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
      message: 'Zelle payment proof submitted successfully',
      data: { verification },
    });
  } catch (error) {
    next(error);
  }
};

export const getZelleInfo = async (req, res) => {
  res.json({
    success: true,
    data: {
      email: zelleConfig.email,
      phone: zelleConfig.phone,
      instructions: zelleConfig.instructions,
    },
  });
};

export const getPendingVerifications = async (req, res, next) => {
  try {
    const verifications = await PaymentVerification.find({ status: 'pending' })
      .populate('orderId', 'total customerName customerEmail')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { items: verifications },
    });
  } catch (error) {
    next(error);
  }
};

export const getVerificationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const verification = await PaymentVerification.findById(id)
      .populate('orderId', 'total customerName customerEmail items');
    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }
    res.json({
      success: true,
      data: { verification },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const verification = await PaymentVerification.findById(id);
    if (!verification) {
      return res.status(404).json({ success: false, message: 'Verification not found' });
    }
    verification.status = status;
    await verification.save();

    const order = await Order.findById(verification.orderId);
    if (order) {
      order.status = status === 'verified' ? 'paid' : 'rejected';
      await order.save();
      if (status === 'verified') {
        try {
          const user = await User.findById(order.userId);
          if (user) {
            await sendPaymentVerification(order, user);
          }
        } catch (emailError) {
          console.error('Email send error:', emailError);
        }
      }
    }

    res.json({
      success: true,
      message: `Payment ${status}`,
      data: { verification, order },
    });
  } catch (error) {
    next(error);
  }
};