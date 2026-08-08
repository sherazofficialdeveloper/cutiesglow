'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import DataTable from '@/components/admin/DataTable/DataTable';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await adminService.getBanners();
        setBanners(data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this banner?')) {
      try {
        await adminService.deleteBanner(id);
        setBanners(banners.filter(b => b.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const columns = [
    { header: 'Image', accessor: (row) => <img src={row.image} alt={row.title} className="w-20 h-12 object-cover rounded" /> },
    { header: 'Title', accessor: 'title' },
    { header: 'Type', accessor: 'type' },
    { header: 'Active', accessor: (row) => row.isActive ? '✅' : '❌' },
    { header: 'Actions', accessor: (row) => (
      <div className="flex gap-2">
        <Link href={`/admin/banners/edit/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
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
        <h1 className="text-2xl font-bold">Banners</h1>
        <Link href="/admin/banners/add">
          <Button variant="primary" size="small">Add Banner</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={banners} loading={loading} />
    </div>
  );
}