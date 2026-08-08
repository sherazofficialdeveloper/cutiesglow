import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900">Terms & Conditions</h1>
      <p className="text-sm text-gray-500 mt-2">Last updated: January 2026</p>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          By using the Cuties Glow website, you agree to the following terms and conditions.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Products and Pricing</h2>
        <p>
          All products are subject to availability. Prices are subject to change without notice. We reserve the right to limit quantities.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Shipping and Delivery</h2>
        <p>
          Please refer to our shipping policy for delivery times and costs. We ship to all regions within Pakistan and internationally.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Returns and Refunds</h2>
        <p>
          We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, please contact us for a return authorization.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
        <p>
          Our products are for external use only. Results may vary. We recommend performing a patch test before first use.
        </p>

        <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
        <p>
          For any questions regarding our terms, please contact us at{' '}
          <a href="mailto:info@cutishbyrazias.com" className="font-medium" style={{ color: colors.primary }}>
            info@cutishbyrazias.com
          </a>
        </p>
      </div>
    </div>
  );
}