'use client';

import React, { useEffect, useState } from 'react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import Button from '@/components/common/Button/Button';

const PayPalPayment = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load PayPal SDK script dynamically
    const loadPayPalScript = async () => {
      const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
      if (!clientId) {
        console.error('PayPal Client ID missing');
        return;
      }

      // Check if already loaded
      if (window.paypal) {
        setScriptLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      script.onerror = () => onError?.('Failed to load PayPal SDK');
      document.body.appendChild(script);
    };

    loadPayPalScript();

    return () => {
      // Cleanup if needed
    };
  }, [onError]);

  const handlePayPalCheckout = () => {
    if (!scriptLoaded) {
      alert('PayPal is loading, please wait.');
      return;
    }

    setLoading(true);
    // Here we would implement the PayPal checkout flow using window.paypal.Buttons
    // For production, we call the backend to create an order, then use the SDK.
    // For now, we simulate success.
    setTimeout(() => {
      setLoading(false);
      onSuccess?.({ id: 'PAYPAL-ORDER-123' });
    }, 2000);
  };

  const containerStyles = {
    padding: spacing[6],
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
    textAlign: 'center',
  };

  return (
    <div style={containerStyles}>
      <h3 style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, marginBottom: spacing[3] }}>
        Pay with PayPal
      </h3>
      <p style={{ color: colors.text.secondary, marginBottom: spacing[4] }}>
        You will be redirected to PayPal to complete your payment securely.
      </p>
      <Button
        variant="primary"
        size="large"
        fullWidth
        loading={loading}
        onClick={handlePayPalCheckout}
        disabled={!scriptLoaded}
      >
        {scriptLoaded ? 'Proceed to PayPal' : 'Loading PayPal...'}
      </Button>
    </div>
  );
};

PayPalPayment.displayName = 'PayPalPayment';

export default PayPalPayment;