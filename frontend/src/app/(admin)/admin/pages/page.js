'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import DataTable from '@/components/admin/DataTable/DataTable';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AdminPagesPage() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await adminService.getPages();
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this page?')) {
      try {
        await adminService.deletePage(id);
        setPages(pages.filter(p => p.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Status', accessor: (row) => row.isPublished ? '✅ Published' : '📝 Draft' },
    { header: 'Updated', accessor: (row) => new Date(row.updatedAt).toLocaleDateString() },
    { header: 'Actions', accessor: (row) => (
      <div className="flex gap-2">
        <Link href={`/admin/pages/edit/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
          Edit
        </Link>
        <Link href={`/${row.slug}`} target="_blank" className="text-sm font-medium text-gray-500 hover:text-gray-700">
          View
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
        <h1 className="text-2xl font-bold">Pages</h1>
        <Link href="/admin/pages/add">
          <Button variant="primary" size="small">Add Page</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={pages} loading={loading} />
    </div>
  );
}