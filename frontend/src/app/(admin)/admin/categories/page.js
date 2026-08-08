'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import DataTable from '@/components/admin/DataTable/DataTable';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await adminService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this category?')) {
      try {
        await adminService.deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Slug', accessor: 'slug' },
    { header: 'Products', accessor: (row) => row.productCount || 0 },
    { header: 'Actions', accessor: (row) => (
      <div className="flex gap-2">
        <Link href={`/admin/categories/edit/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
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
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/add">
          <Button variant="primary" size="small">Add Category</Button>
        </Link>
      </div>
      <DataTable columns={columns} data={categories} loading={loading} />
    </div>
  );
}