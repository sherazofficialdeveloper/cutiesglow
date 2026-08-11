// backend/src/config/email.js

console.log('📧 EMAIL CONFIG LOADED');

import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

// ✅ CORRECT: use createTransport (without 'er')
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

  // ✅ FIXED: use createTransport (correct method name)
  return nodemailer.createTransport(config);
};

export const sendEmail = async ({ to, subject, html, text }) => {
  console.log(`📤 sendEmail STARTED for: ${to}`);
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ SMTP connection verified');

    const mailOptions = {
      from: process.env.SMTP_FROM || `"CutiesGlow" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
    logger.info(`Email sent to ${to}: ${subject}`);
    return info;
  } catch (error) {
    console.error('❌ Email send error:', error.message);
    logger.error('Email send error:', error);
    throw error;
  }
};

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

// Export other email functions as needed...
export const sendOrderConfirmation = async (order, user) => {
  // ... (keep your implementation)
};

export const sendPaymentVerification = async (order, user) => {
  // ... (keep your implementation)
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  // ... (keep your implementation)
};

export default {
  createTransporter,
  sendEmail,
  sendWelcomeEmail,
  sendOrderConfirmation,
  sendPaymentVerification,
  sendPasswordResetEmail,
};