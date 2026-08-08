// backend/src/seeds/settings.js

import Settings from '../models/Settings.js';

/**
 * Seed settings data
 */
const seedSettings = async () => {
  try {
    // Check if settings already exist
    const count = await Settings.countDocuments();
    if (count > 0) {
      console.log('⚠️  Settings already exist. Skipping...');
      return;
    }

    const settings = {
      // General Settings
      siteName: 'Cutish by Razias',
      tagline: 'Premium Skincare for Radiant Skin',
      contactEmail: 'info@cutishbyrazias.com',
      contactPhone: '+1 (800) 555-GLOW',
      address: 'Pakistan',

      // Zelle Settings
      zelleEmail: 'pay@cutishbyrazias.com',
      zellePhone: '+1234567890',
      zelleInstructions: 'Send payment via Zelle to pay@cutishbyrazias.com. Please include your order number in the memo field for faster verification.',

      // PayPal Settings
      paypalClientId: '',
      paypalSecret: '',
      paypalMode: 'sandbox',

      // Shipping Settings
      freeShippingThreshold: 35,
      standardShippingCost: 5.99,
      expressShippingCost: 12.99,
      availableCountries: 'US, CA, GB, PK',
      estimatedDeliveryDays: '3-5 business days',

      // Tax Settings
      taxRate: 8,

      // Currency Settings
      currency: 'USD',
      currencySymbol: '$',
    };

    const created = await Settings.create(settings);
    console.log('✅ Settings seeded');

    return created;
  } catch (error) {
    console.error('❌ Error seeding settings:', error);
    throw error;
  }
};

export default seedSettings;