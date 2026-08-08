'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import { useOrders } from '@/hooks/useOrders';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

const OrderHistory = () => {
  const { orders, loading, fetchOrders } = useOrders();
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchOrders(page, limit);
  }, [page]);

  if (loading) return <LoadingSpinner />;

  if (!orders || orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: spacing[8] }}>
        <p style={{ color: colors.text.muted }}>No orders yet.</p>
      </div>
    );
  }

  const containerStyles = {
    overflowX: 'auto',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: typography.fontSize.sm,
  };

  const thStyles = {
    textAlign: 'left',
    padding: spacing[3],
    borderBottom: `2px solid ${colors.border.light}`,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.secondary,
  };

  const tdStyles = {
    padding: spacing[3],
    borderBottom: `1px solid ${colors.border.light}`,
  };

  const statusBadgeStyles = (status) => {
    const bg = status === 'paid' ? '#D1FAE5' : status === 'pending' ? '#FEF3C7' : '#FEE2E2';
    const color = status === 'paid' ? '#065F46' : status === 'pending' ? '#92400E' : '#991B1B';
    return {
      backgroundColor: bg,
      color: color,
      padding: `${spacing[0.5]} ${spacing[2]}`,
      borderRadius: '9999px',
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.bold,
      display: 'inline-block',
    };
  };

  return (
    <div style={containerStyles}>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Order #</th>
            <th style={thStyles}>Date</th>
            <th style={thStyles}>Total</th>
            <th style={thStyles}>Status</th>
            <th style={thStyles}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td style={tdStyles}>#{order.id.slice(-6)}</td>
              <td style={tdStyles}>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td style={tdStyles}>${order.total.toFixed(2)}</td>
              <td style={tdStyles}>
                <span style={statusBadgeStyles(order.status)}>{order.status}</span>
              </td>
              <td style={tdStyles}>
                <Link href={`/dashboard/orders/${order.id}`} style={{ color: colors.primary, textDecoration: 'none', fontWeight: typography.fontWeight.medium }}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

OrderHistory.displayName = 'OrderHistory';

export default OrderHistory;