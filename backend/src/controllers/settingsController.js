// backend/src/controllers/settingsController.js

import Settings from '../models/Settings.js';
import { settingsSchema } from '../validations/adminValidation.js';
import { validate } from '../middleware/validate.js';

export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        siteName: 'Cutish by Razias',
        tagline: 'Premium Skincare',
        contactEmail: 'info@cutishbyrazias.com',
        contactPhone: '+1 (800) 555-GLOW',
        address: 'Pakistan',
        zelleEmail: 'pay@cutishbyrazias.com',
        zellePhone: '+1234567890',
        paypalClientId: '',
        paypalMode: 'sandbox',
      });
      await settings.save();
    }
    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const errors = validate(settingsSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }
    const {
      siteName,
      tagline,
      contactEmail,
      contactPhone,
      address,
      zelleEmail,
      zellePhone,
      zelleInstructions,
      paypalClientId,
      paypalSecret,
      paypalMode,
      freeShippingThreshold,
      standardShippingCost,
      expressShippingCost,
      availableCountries,
      estimatedDeliveryDays,
    } = req.body;

    if (siteName !== undefined) settings.siteName = siteName;
    if (tagline !== undefined) settings.tagline = tagline;
    if (contactEmail !== undefined) settings.contactEmail = contactEmail;
    if (contactPhone !== undefined) settings.contactPhone = contactPhone;
    if (address !== undefined) settings.address = address;
    if (zelleEmail !== undefined) settings.zelleEmail = zelleEmail;
    if (zellePhone !== undefined) settings.zellePhone = zellePhone;
    if (zelleInstructions !== undefined) settings.zelleInstructions = zelleInstructions;
    if (paypalClientId !== undefined) settings.paypalClientId = paypalClientId;
    if (paypalSecret !== undefined) settings.paypalSecret = paypalSecret;
    if (paypalMode !== undefined) settings.paypalMode = paypalMode;
    if (freeShippingThreshold !== undefined) settings.freeShippingThreshold = freeShippingThreshold;
    if (standardShippingCost !== undefined) settings.standardShippingCost = standardShippingCost;
    if (expressShippingCost !== undefined) settings.expressShippingCost = expressShippingCost;
    if (availableCountries !== undefined) settings.availableCountries = availableCountries;
    if (estimatedDeliveryDays !== undefined) settings.estimatedDeliveryDays = estimatedDeliveryDays;

    await settings.save();
    res.json({
      success: true,
      message: 'Settings updated successfully',
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

export const getGeneralSettings = async (req, res, next) => {
  try {
    const settings = await Settings.findOne().select('siteName tagline contactEmail contactPhone address');
    res.json({
      success: true,
      data: settings || {},
    });
  } catch (error) {
    next(error);
  }
};