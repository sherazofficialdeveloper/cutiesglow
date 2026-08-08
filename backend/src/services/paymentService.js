// backend/src/services/paymentService.js

import axios from 'axios';
import { paypalConfig, zelleConfig } from '../config/payment.js';
import { AppError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

/**
 * Get PayPal access token
 */
export const getPayPalAccessToken = async () => {
  try {
    const auth = Buffer.from(`${paypalConfig.clientId}:${paypalConfig.clientSecret}`).toString('base64');

    const response = await axios.post(
      `${paypalConfig.apiUrl}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    logger.error('Get PayPal access token error:', error);
    throw new AppError('Failed to authenticate with PayPal', 500);
  }
};

/**
 * Create PayPal order
 */
export const createPayPalOrder = async (amount, currency = 'USD') => {
  try {
    const accessToken = await getPayPalAccessToken();

    const response = await axios.post(
      `${paypalConfig.apiUrl}/v2/checkout/orders`,
      {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount.toFixed(2),
            },
          },
        ],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/checkout/success`,
          cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      orderId: response.data.id,
      status: response.data.status,
      approvalUrl: response.data.links.find(link => link.rel === 'approve')?.href,
    };
  } catch (error) {
    logger.error('Create PayPal order error:', error);
    throw new AppError('Failed to create PayPal order', 500);
  }
};

/**
 * Capture PayPal order
 */
export const capturePayPalOrder = async (orderId) => {
  try {
    const accessToken = await getPayPalAccessToken();

    const response = await axios.post(
      `${paypalConfig.apiUrl}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      id: response.data.id,
      status: response.data.status,
      capturedAmount: response.data.purchase_units[0]?.payments?.captures[0]?.amount?.value,
    };
  } catch (error) {
    logger.error('Capture PayPal order error:', error);
    throw new AppError('Failed to capture PayPal payment', 500);
  }
};

/**
 * Get Zelle payment information
 */
export const getZelleInfo = () => {
  return {
    email: zelleConfig.email,
    phone: zelleConfig.phone,
    instructions: zelleConfig.instructions,
  };
};

/**
 * Validate Zelle transaction
 */
export const validateZelleTransaction = async (transactionId, amount) => {
  // In production, this would connect to a payment verification service
  // For now, we just return true (manual verification needed)
  return {
    isValid: true,
    transactionId,
    amount,
    verified: false, // Manual verification required
  };
};

export default {
  getPayPalAccessToken,
  createPayPalOrder,
  capturePayPalOrder,
  getZelleInfo,
  validateZelleTransaction,
};