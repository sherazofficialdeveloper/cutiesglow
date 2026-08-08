'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import DataTable from '@/components/admin/DataTable/DataTable';
import { adminService } from '@/services/adminService';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await adminService.getCustomers();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Orders', accessor: (row) => row.orderCount || 0 },
    { header: 'Joined', accessor: (row) => new Date(row.createdAt).toLocaleDateString() },
    { header: 'Actions', accessor: (row) => (
      <Link href={`/admin/customers/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
        View
      </Link>
    ) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <DataTable columns={columns} data={customers} loading={loading} />
    </div>
  );
}