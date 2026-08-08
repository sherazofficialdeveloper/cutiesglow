// add/page.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm/ProductForm';
import { adminService } from '@/services/adminService';

export default function AddProductPage() {
  const router = useRouter();
  const handleSubmit = async (data) => {
    try {
      await adminService.createProduct(data);
      router.push('/admin/products');
    } catch (error) {
      console.error('Create error:', error);
    }
  };
  return <ProductForm onSubmit={handleSubmit} />;
}
