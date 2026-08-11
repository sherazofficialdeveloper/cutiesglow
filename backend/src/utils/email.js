// backend/src/utils/email.js

import nodemailer from 'nodemailer';
import logger from './logger.js';

// ✅ CORRECT: use createTransport
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
  return nodemailer.createTransport(config);
};

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = createTransporter();
    await transporter.verify();

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