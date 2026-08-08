'use client';

import React, { useState, useEffect } from 'react';
import ProductTable from '@/components/admin/ProductTable/ProductTable';
import { adminService } from '@/services/adminService';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await adminService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this product?')) {
      try {
        await adminService.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  return <ProductTable products={products} onDelete={handleDelete} loading={loading} />;
}