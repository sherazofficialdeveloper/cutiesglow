'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import DataTable from '@/components/admin/DataTable/DataTable';
import Button from '@/components/common/Button/Button';

const ProductTable = ({ products, onDelete, loading }) => {
  const columns = [
    { header: 'Image', accessor: (row) => (
      <img src={row.image} alt={row.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
    ) },
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: (row) => `$${row.price.toFixed(2)}` },
    { header: 'Category', accessor: 'category' },
    { header: 'Stock', accessor: 'stock' },
    { header: 'Actions', accessor: (row) => (
      <div style={{ display: 'flex', gap: spacing[2] }}>
        <Link href={`/admin/products/edit/${row.id}`} style={{ color: colors.primary, textDecoration: 'none' }}>
          Edit
        </Link>
        <button
          onClick={() => onDelete(row.id)}
          style={{ color: '#DC2626', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>
    ) },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[4] }}>
        <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold }}>Products</h2>
        <Link href="/admin/products/add">
          <Button variant="primary" size="small">Add Product</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={products} loading={loading} />
    </div>
  );
};

ProductTable.displayName = 'ProductTable';

export default ProductTable;