// backend/src/config/email.js

import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
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
      from: process.env.SMTP_FROM || `"Cutish" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmation = async (order, user) => {
  const subject = `Order Confirmation #${order.id.slice(-6)}`;
  const html = `
    <h1>Thank you for your order!</h1>
    <p>Hi ${user.name},</p>
    <p>Your order #${order.id.slice(-6)} has been confirmed.</p>
    <h3>Order Details:</h3>
    <ul>
      ${order.items.map(item => `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
    </ul>
    <p><strong>Total: $${order.total.toFixed(2)}</strong></p>
    <p>Payment Method: ${order.paymentMethod}</p>
    ${order.paymentMethod === 'zelle' ? '<p>Payment verification pending. We will notify you once verified.</p>' : ''}
    <p>Thank you for shopping with Cutish!</p>
  `;

  return sendEmail({ to: user.email, subject, html });
};

/**
 * Send payment verification email
 */
export const sendPaymentVerification = async (order, user) => {
  const subject = `Payment Verified for Order #${order.id.slice(-6)}`;
  const html = `
    <h1>Payment Verified!</h1>
    <p>Hi ${user.name},</p>
    <p>Your payment for order #${order.id.slice(-6)} has been verified.</p>
    <p>Your order is now being processed and will be shipped soon.</p>
    <p>Thank you for shopping with Cutish!</p>
  `;

  return sendEmail({ to: user.email, subject, html });
};

/**
 * Send welcome email
 */
export const sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to Cutish!';
  const html = `
    <h1>Welcome to Cutish!</h1>
    <p>Hi ${user.name},</p>
    <p>Thank you for registering with Cutish by Razia's.</p>
    <p>Start exploring our premium skincare products and get 10% off your first order with code: WELCOME10</p>
    <p>Happy glowing!</p>
  `;

  return sendEmail({ to: user.email, subject, html });
};

export default {
  sendEmail,
  sendOrderConfirmation,
  sendPaymentVerification,
  sendWelcomeEmail,
};