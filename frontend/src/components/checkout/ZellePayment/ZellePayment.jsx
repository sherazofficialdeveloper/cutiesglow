'use client';

import React, { useState } from 'react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';

const ZellePayment = ({ onSubmit }) => {
  const [transactionId, setTransactionId] = useState('');
  const [proofFile, setProofFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const zelleEmail = process.env.NEXT_PUBLIC_ZELLE_EMAIL || 'pay@cutiesglow.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId || !proofFile) {
      alert('Please provide transaction ID and proof of payment.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('transactionId', transactionId);
      formData.append('proof', proofFile);
      await onSubmit(formData);
    } catch (error) {
      console.error('Zelle payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    padding: spacing[6],
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
  };

  const infoStyles = {
    marginBottom: spacing[4],
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 1.6,
  };

  const highlightStyles = {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  };

  return (
    <div style={containerStyles}>
      <h3 style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, marginBottom: spacing[3] }}>
        Pay with Zelle
      </h3>
      <div style={infoStyles}>
        <p>Send payment to <span style={highlightStyles}>{zelleEmail}</span> using Zelle.</p>
        <p>After sending, enter your transaction ID and upload the confirmation screenshot below.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Transaction ID / Reference"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          placeholder="Enter Zelle transaction ID"
          required
        />

        <div style={{ marginBottom: spacing[4] }}>
          <label style={{ display: 'block', fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.text.secondary, marginBottom: spacing[1] }}>
            Upload Payment Proof (Screenshot)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProofFile(e.target.files[0])}
            style={{ width: '100%' }}
            required
          />
        </div>

        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Submit Payment Proof
        </Button>
      </form>
    </div>
  );
};

ZellePayment.displayName = 'ZellePayment';

export default ZellePayment;