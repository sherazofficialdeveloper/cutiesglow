'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import DataTable from '@/components/admin/DataTable/DataTable';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AdminBeforeAfterPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await adminService.getBeforeAfterItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this before/after item?')) {
      try {
        await adminService.deleteBeforeAfterItem(id);
        setItems(items.filter(i => i.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const columns = [
    { header: 'Before', accessor: (row) => <img src={row.beforeImage} alt="Before" className="w-16 h-10 object-cover rounded" /> },
    { header: 'After', accessor: (row) => <img src={row.afterImage} alt="After" className="w-16 h-10 object-cover rounded" /> },
    { header: 'Description', accessor: 'description' },
    { header: 'Actions', accessor: (row) => (
      <div className="flex gap-2">
        <Link href={`/admin/before-after/edit/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
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
        <h1 className="text-2xl font-bold">Before/After</h1>
        <Link href="/admin/before-after/add">
          <Button variant="primary" size="small">Add Item</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={items} loading={loading} />
    </div>
  );
}