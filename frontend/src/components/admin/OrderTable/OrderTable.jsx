'use client';

import React from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import DataTable from '@/components/admin/DataTable/DataTable';

const OrderTable = ({ orders, loading }) => {
  const columns = [
    { header: 'Order #', accessor: (row) => `#${row.id.slice(-6)}` },
    { header: 'Customer', accessor: 'customerName' },
    { header: 'Date', accessor: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: 'Total', accessor: (row) => `$${row.total.toFixed(2)}` },
    { header: 'Status', accessor: (row) => (
      <span style={{
        backgroundColor: row.status === 'paid' ? '#D1FAE5' : row.status === 'pending' ? '#FEF3C7' : '#FEE2E2',
        color: row.status === 'paid' ? '#065F46' : row.status === 'pending' ? '#92400E' : '#991B1B',
        padding: `${spacing[0.5]} ${spacing[2]}`,
        borderRadius: '9999px',
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.bold,
      }}>
        {row.status}
      </span>
    ) },
    { header: 'Actions', accessor: (row) => (
      <Link href={`/admin/orders/${row.id}`} style={{ color: colors.primary, textDecoration: 'none' }}>
        View
      </Link>
    ) },
  ];

  return (
    <div>
      <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing[4] }}>Orders</h2>
      <DataTable columns={columns} data={orders} loading={loading} />
    </div>
  );
};

OrderTable.displayName = 'OrderTable';

export default OrderTable;