'use client';

import React, { useState, useEffect } from 'react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import { adminService } from '@/services/adminService';
import Button from '@/components/common/Button/Button';
import { Check, X } from 'lucide-react';

const PaymentVerification = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = await adminService.getPendingPayments();
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (paymentId, status) => {
    try {
      await adminService.verifyPayment(paymentId, status);
      fetchPayments(); // refresh
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const cardStyles = {
    backgroundColor: colors.white,
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
    padding: spacing[4],
    marginBottom: spacing[4],
  };

  const rowStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[2],
  };

  const labelStyles = {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.secondary,
    fontSize: typography.fontSize.sm,
  };

  const valueStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  };

  const actionsStyles = {
    display: 'flex',
    gap: spacing[2],
  };

  if (loading) return <div>Loading...</div>;

  if (payments.length === 0) {
    return <div style={{ textAlign: 'center', padding: spacing[8], color: colors.text.muted }}>No pending verifications.</div>;
  }

  return (
    <div>
      <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing[6] }}>
        Pending Zelle Payments
      </h2>
      {payments.map((payment) => (
        <div key={payment.id} style={cardStyles}>
          <div style={rowStyles}>
            <span style={labelStyles}>Order ID:</span>
            <span style={valueStyles}>#{payment.orderId}</span>
          </div>
          <div style={rowStyles}>
            <span style={labelStyles}>Amount:</span>
            <span style={valueStyles}>${payment.amount.toFixed(2)}</span>
          </div>
          <div style={rowStyles}>
            <span style={labelStyles}>Transaction ID:</span>
            <span style={valueStyles}>{payment.transactionId}</span>
          </div>
          <div style={rowStyles}>
            <span style={labelStyles}>Proof:</span>
            <a href={payment.proofUrl} target="_blank" rel="noopener noreferrer" style={{ color: colors.primary }}>
              View Screenshot
            </a>
          </div>
          <div style={rowStyles}>
            <span style={labelStyles}>Status:</span>
            <span style={{ ...valueStyles, color: payment.status === 'pending' ? '#F59E0B' : payment.status === 'verified' ? '#10B981' : '#EF4444' }}>
              {payment.status}
            </span>
          </div>
          {payment.status === 'pending' && (
            <div style={actionsStyles}>
              <Button
                variant="success"
                size="small"
                onClick={() => handleVerify(payment.id, 'verified')}
                icon={<Check size={16} />}
              >
                Verify
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleVerify(payment.id, 'rejected')}
                icon={<X size={16} />}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

PaymentVerification.displayName = 'PaymentVerification';

export default PaymentVerification;