// backend/src/models/PaymentVerification.js

import mongoose from 'mongoose';

const paymentVerificationSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    proofUrl: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedAt: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
paymentVerificationSchema.index({ orderId: 1 });
paymentVerificationSchema.index({ status: 1 });
paymentVerificationSchema.index({ createdAt: -1 });

const PaymentVerification = mongoose.model('PaymentVerification', paymentVerificationSchema);

export default PaymentVerification;