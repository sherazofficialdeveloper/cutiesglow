'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import DataTable from '@/components/admin/DataTable/DataTable';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const data = await adminService.getCoupons();
        setCoupons(data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this coupon?')) {
      try {
        await adminService.deleteCoupon(id);
        setCoupons(coupons.filter(c => c.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const columns = [
    { header: 'Code', accessor: 'code' },
    { header: 'Discount', accessor: (row) => row.type === 'percentage' ? `${row.value}%` : `$${row.value}` },
    { header: 'Expires', accessor: (row) => new Date(row.expiresAt).toLocaleDateString() },
    { header: 'Uses', accessor: (row) => `${row.usedCount || 0}/${row.maxUses || '∞'}` },
    { header: 'Active', accessor: (row) => row.isActive ? '✅' : '❌' },
    { header: 'Actions', accessor: (row) => (
      <div className="flex gap-2">
        <Link href={`/admin/coupons/edit/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
          Edit
        </Link>
        <button onClick={() => handleDelete(row.id)} className="text-sm font-medium text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
    ) },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <Link href="/admin/coupons/add">
          <Button variant="primary" size="small">Add Coupon</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={coupons} loading={loading} />
    </div>
  );
}