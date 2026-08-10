// backend/src/utils/email.js

import nodemailer from 'nodemailer';
import { logger } from './logger.js';

/**
 * Create email transporter
 */
export const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  return nodemailer.createTransporter(config);
};

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content
 * @returns {Promise} Nodemailer response
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: process.env.SMTP_FROM || `"CutiesGlow" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}: ${subject}`);
    return info;
  } catch (error) {
    logger.error('Email send error:', error);
    throw error;
  }
};

/**
 * Send welcome email
 */
export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to CutiesGlow! 🌟';
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #E2712E; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9f9f9; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .highlight { color: #E2712E; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ Welcome to CutiesGlow!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Thank you for joining the CutiesGlow family! 🎉</p>
          <p>We're excited to help you achieve radiant, glowing skin with our premium skincare products.</p>
          <p><strong>Here's a special gift for you:</strong></p>
          <p style="text-align: center;">
            <span style="background: #f0f0f0; padding: 10px 20px; border-radius: 8px; font-size: 20px; font-weight: bold; color: #E2712E;">
              WELCOME10
            </span>
          </p>
          <p>Use code <strong>WELCOME10</strong> at checkout to get <strong>10% off</strong> your first order! 🛍️</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Start Shopping</a>
          </p>
          <p>Happy glowing! 🌸</p>
          <p>— The CutiesGlow Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CutiesGlow by Razias. All rights reserved.</p>
          <p>If you didn't create an account, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: user.email, subject, html });
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmation = async (order, user) => {
  const subject = `Order Confirmation #${order.id.slice(-6)} 🛍️`;
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #E2712E; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 20px; border-radius: 8px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f5f5f5; padding: 10px; text-align: left; }
        .total { font-size: 18px; font-weight: bold; text-align: right; padding: 15px 0; border-top: 2px solid #eee; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Order Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Thank you for your order! We're thrilled to be a part of your skincare journey. 🎉</p>

          <div class="order-details">
            <h3>Order #${order.id.slice(-6)}</h3>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Status:</strong> ${order.status}</p>

            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Price</th>
                  <th style="text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="total">
              <p>Subtotal: $${order.subtotal.toFixed(2)}</p>
              ${order.discount > 0 ? `<p>Discount: -$${order.discount.toFixed(2)}</p>` : ''}
              <p>Shipping: $${order.shipping.toFixed(2)}</p>
              <p>Tax: $${order.tax.toFixed(2)}</p>
              <p style="font-size: 22px; color: #E2712E;">Total: $${order.total.toFixed(2)}</p>
            </div>
          </div>

          ${order.paymentMethod === 'zelle' && order.status === 'pending' ? `
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>⚠️ Payment Verification Pending</strong></p>
              <p>Please send payment via Zelle to <strong>${process.env.ZELLE_EMAIL || 'pay@CutiesGlowbyrazias.com'}</strong> and upload the proof to complete your order.</p>
            </div>
          ` : ''}

          <p style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders/${order.id}" class="button">View Order</a>
          </p>

          <p>We'll keep you updated on your order status! 📦</p>
          <p>— The CutiesGlow Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CutiesGlow by Razias. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: user.email, subject, html });
};

/**
 * Send payment verification email
 */
export const sendPaymentVerificationEmail = async (order, user) => {
  const subject = `Payment Verified for Order #${order.id.slice(-6)} ✅`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10B981; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9f9f9; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Payment Verified!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Great news! Your payment for Order #${order.id.slice(-6)} has been verified. 🎉</p>
          <p>Your order is now being processed and will be shipped soon.</p>
          <p style="text-align: center; margin-top: 30px;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders/${order.id}" class="button">View Order</a>
          </p>
          <p>Thank you for choosing CutiesGlow! ✨</p>
          <p>— The CutiesGlow Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CutiesGlow by Razias. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: user.email, subject, html });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  const subject = 'Reset Your Password 🔑';
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #E2712E; color: white; padding: 20px; text-align: center; }
        .content { padding: 30px 20px; background: #f9f9f9; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔑 Reset Your Password</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>We received a request to reset your password. Click the button below to set a new password:</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" class="button">Reset Password</a>
          </p>
          <p>This link will expire in <strong>1 hour</strong>.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>— The CutiesGlow Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CutiesGlow by Razias. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: user.email, subject, html });
};

export default {
  createTransporter,
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmation,
  sendPaymentVerificationEmail,
  sendPasswordResetEmail,
};