// backend/src/models/Settings.js

import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    // General Settings
    siteName: {
      type: String,
      default: 'CutiesGlow by Razias',
    },
    tagline: {
      type: String,
      default: 'Premium Skincare',
    },
    contactEmail: {
      type: String,
      default: 'info@CutiesGlowbyrazias.com',
    },
    contactPhone: {
      type: String,
      default: '+1 (800) 555-GLOW',
    },
    address: {
      type: String,
      default: 'Pakistan',
    },

    // Zelle Settings
    zelleEmail: {
      type: String,
      default: 'pay@CutiesGlowbyrazias.com',
    },
    zellePhone: {
      type: String,
      default: '+1234567890',
    },
    zelleInstructions: {
      type: String,
      default: 'Send payment via Zelle to the above email/phone. Include your order number in the memo.',
    },

    // PayPal Settings
    paypalClientId: {
      type: String,
      default: '',
    },
    paypalSecret: {
      type: String,
      default: '',
    },
    paypalMode: {
      type: String,
      enum: ['sandbox', 'live'],
      default: 'sandbox',
    },

    // Shipping Settings
    freeShippingThreshold: {
      type: Number,
      default: 35,
    },
    standardShippingCost: {
      type: Number,
      default: 5.99,
    },
    expressShippingCost: {
      type: Number,
      default: 12.99,
    },
    availableCountries: {
      type: String,
      default: 'US, CA, GB, PK',
    },
    estimatedDeliveryDays: {
      type: String,
      default: '3-5 business days',
    },

    // Tax Settings
    taxRate: {
      type: Number,
      default: 8,
    },

    // Currency Settings
    currency: {
      type: String,
      default: 'USD',
    },
    currencySymbol: {
      type: String,
      default: '$',
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;