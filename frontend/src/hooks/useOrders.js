'use client';

import { useState, useEffect, useCallback } from 'react';
import { orderService } from '@/services/orderService';
import { PAGINATION } from '@/config/constants';

/**
 * Custom hook for fetching and managing orders
 * @param {number} initialPage - Initial page
 * @param {number} limit - Orders per page (default from constants)
 * @returns {Object} { orders, loading, error, total, page, setPage, refetch }
 */
export const useOrders = (initialPage = 1, limit = PAGINATION.ORDER_LIMIT) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items, totalCount } = await orderService.getOrders({ page, limit });
      setOrders(items);
      setTotal(totalCount);
    } catch (err) {
      setError(err.message || 'Failed to fetch orders');
      console.error('useOrders error:', err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const refetch = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    total,
    page,
    setPage,
    refetch,
  };
};

export default useOrders;