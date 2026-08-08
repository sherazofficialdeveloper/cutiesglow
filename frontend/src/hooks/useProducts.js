'use client';

import { useState, useEffect, useCallback } from 'react';
import { productService } from '@/services/productService';
import { PAGINATION } from '@/config/constants';

/**
 * Custom hook for fetching and managing products with filters, sorting, and pagination
 * @param {Object} initialFilters - Initial filter values
 * @param {number} initialPage - Initial page
 * @param {number} limit - Items per page (default from constants)
 * @returns {Object} { products, loading, error, total, page, setPage, filters, setFilters, sortBy, setSortBy, refetch }
 */
export const useProducts = (initialFilters = {}, initialPage = 1, limit = PAGINATION.PRODUCT_LIMIT) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('featured');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items, totalCount } = await productService.getProducts({
        page,
        limit,
        sort: sortBy,
        ...filters,
      });
      setProducts(items);
      setTotal(totalCount);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('useProducts error:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortBy, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refetch = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    total,
    page,
    setPage,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    refetch,
  };
};

export default useProducts;