
// edit/[id]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm/ProductForm';
import { adminService } from '@/services/adminService';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await adminService.getProduct(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await adminService.updateProduct(id, data);
      router.push('/admin/products');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (!product) return <div>Loading...</div>;
  return <ProductForm product={product} onSubmit={handleSubmit} />;
}