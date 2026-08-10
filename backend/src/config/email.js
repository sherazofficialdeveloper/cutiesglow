// backend/src/config/email.js

console.log('📧 EMAIL CONFIG LOADED');

import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  console.log('🔧 Creating SMTP transporter...');
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };
  console.log('🔧 SMTP Config:', {
    host: config.host,
    port: config.port,
    user: config.auth.user,
    secure: config.secure,
  });

  // ✅ Correct method: createTransport
  return nodemailer.createTransport(config);
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
  console.log(`📤 sendEmail STARTED for: ${to}`);
  try {
    const transporter = createTransporter();

    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    const mailOptions = {
      from: process.env.SMTP_FROM || `"CutiesGlow" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    console.log(`📤 Sending email to ${to} with subject: "${subject}"`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email SENT successfully to ${to}`);
    console.log('📨 Message ID:', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ EMAIL SEND ERROR:', error.message);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error command:', error.command);
    throw error;
  }
};

/**
 * Send welcome email to new user
 * @param {Object} user - User object with email and name
 * @returns {Promise} Nodemailer response
 */
export const sendWelcomeEmail = async (user) => {
  console.log(`📧 sendWelcomeEmail called for: ${user.email}`);

  const subject = 'Welcome to CutiesGlow! ✨';
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #E2712E; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border-radius: 0 0 10px 10px; }
        .code-box { background: #f0f0f0; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .code { font-size: 24px; font-weight: bold; color: #E2712E; letter-spacing: 2px; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
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
          
          <div class="code-box">
            <p style="margin: 0; font-size: 14px; color: #666;">🎁 Your Welcome Gift:</p>
            <p class="code">WELCOME10</p>
            <p style="margin: 0; font-size: 12px; color: #666;">Use this code at checkout</p>
          </div>
          
          <p>Use code <strong>WELCOME10</strong> to get <strong>10% off</strong> your first order! 🛍️</p>
          
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" class="button">Start Shopping</a>
          </p>
          
          <p>Happy glowing! 🌸</p>
          <p>— The CutiesGlow Team</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} CutiesGlow by Razias. All rights reserved.</p>
          <p>If you didn't create this account, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return sendEmail({ to: user.email, subject, html });
};

/**
 * Send order confirmation email
 * @param {Object} order - Order object with items, total, etc.
 * @param {Object} user - User object with email and name
 * @returns {Promise} Nodemailer response
 */
export const sendOrderConfirmation = async (order, user) => {
  console.log(`📦 sendOrderConfirmation called for order: ${order.id}`);

  const subject = `Order Confirmation #${order.id.slice(-6)} 🛍️`;

  const itemsHtml = order.items.map(
    (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
  ).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #E2712E; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border-radius: 0 0 10px 10px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #f5f5f5; padding: 10px; text-align: left; }
        .total { font-size: 18px; font-weight: bold; text-align: right; padding: 15px 0; border-top: 2px solid #eee; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .pending-box { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
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
            <p>Subtotal: $${order.subtotal?.toFixed(2) || '0.00'}</p>
            ${order.discount > 0 ? `<p>Discount: -$${order.discount.toFixed(2)}</p>` : ''}
            <p>Shipping: $${order.shipping?.toFixed(2) || '0.00'}</p>
            <p>Tax: $${order.tax?.toFixed(2) || '0.00'}</p>
            <p style="font-size: 22px; color: #E2712E;">Total: $${order.total.toFixed(2)}</p>
          </div>

          ${
            order.paymentMethod === 'zelle' && order.status === 'pending'
              ? `
            <div class="pending-box">
              <p><strong>⚠️ Payment Verification Pending</strong></p>
              <p>Please send payment via Zelle to <strong>${process.env.ZELLE_EMAIL || 'pay@cutishbyrazias.com'}</strong> and upload the proof to complete your order.</p>
            </div>
            `
              : ''
          }

          <p style="text-align: center; margin: 30px 0;">
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
 * @param {Object} order - Order object
 * @param {Object} user - User object with email and name
 * @returns {Promise} Nodemailer response
 */
export const sendPaymentVerification = async (order, user) => {
  console.log(`💰 sendPaymentVerification called for order: ${order.id}`);

  const subject = `Payment Verified for Order #${order.id.slice(-6)} ✅`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #10B981; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border-radius: 0 0 10px 10px; }
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
          <p style="text-align: center; margin: 30px 0;">
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
 * @param {Object} user - User object with email and name
 * @param {string} resetToken - Password reset token
 * @returns {Promise} Nodemailer response
 */
export const sendPasswordResetEmail = async (user, resetToken) => {
  console.log(`🔑 sendPasswordResetEmail called for: ${user.email}`);

  const resetUrl = `${
    process.env.FRONTEND_URL || 'http://localhost:3000'
  }/reset-password?token=${resetToken}`;

  const subject = 'Reset Your Password 🔑';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #E2712E; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .warning { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; }
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
          <div class="warning">
            <p style="margin: 0; font-size: 14px;">⏰ This link will expire in <strong>1 hour</strong>.</p>
          </div>
          <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
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
 * Send order shipped email
 * @param {Object} order - Order object
 * @param {Object} user - User object with email and name
 * @returns {Promise} Nodemailer response
 */
export const sendOrderShippedEmail = async (order, user) => {
  console.log(`📦 sendOrderShippedEmail called for order: ${order.id}`);

  const subject = `Order #${order.id.slice(-6)} Has Been Shipped 🚚`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #3B82F6; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚚 Order Shipped!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Great news! Your Order #${order.id.slice(-6)} has been shipped and is on its way to you. 🎉</p>
          <p>You can track your order using the tracking number below:</p>
          <p><strong>Tracking Number:</strong> ${order.trackingNumber || 'Available Soon'}</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders/${order.id}" class="button">Track Order</a>
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
 * Send order delivered email
 * @param {Object} order - Order object
 * @param {Object} user - User object with email and name
 * @returns {Promise} Nodemailer response
 */
export const sendOrderDeliveredEmail = async (order, user) => {
  console.log(`📦 sendOrderDeliveredEmail called for order: ${order.id}`);

  const subject = `Order #${order.id.slice(-6)} Has Been Delivered 🎉`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: #10B981; color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px 20px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #E2712E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Order Delivered!</h1>
        </div>
        <div class="content">
          <h2>Hi ${user.name},</h2>
          <p>Your Order #${order.id.slice(-6)} has been delivered! 🎉</p>
          <p>We hope you love your products. Please take a moment to leave a review and let us know about your experience.</p>
          <p style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/orders/${order.id}" class="button">Review Order</a>
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

export default {
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmation,
  sendPaymentVerification,
  sendPasswordResetEmail,
  sendOrderShippedEmail,
  sendOrderDeliveredEmail,
};