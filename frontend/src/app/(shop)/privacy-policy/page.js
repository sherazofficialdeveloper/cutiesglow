import React from 'react';
import { colors } from '@/config/theme/colors'; // ✅ Added

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          At Cuties Glow, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, shipping address, and payment information.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
        <p>
          We use your information to process orders, communicate with you, and improve our products and services. We do not sell your personal information to third parties.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Security</h2>
        <p>
          We implement industry-standard security measures to protect your information. All payment transactions are encrypted and secure.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
        <p>
          If you have any questions about our privacy policy, please contact us at{' '}
          <a href="mailto:info@CutiesGlowbyrazias.com" className="font-medium" style={{ color: colors.primary }}>
            info@CutiesGlowbyrazias.com
          </a>
        </p>
      </div>
    </div>
  );
}