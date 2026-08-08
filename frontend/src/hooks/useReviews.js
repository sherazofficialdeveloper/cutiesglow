'use client';

import { useState, useEffect, useCallback } from 'react';
import { reviewService } from '@/services/reviewService';
import { PAGINATION } from '@/config/constants';

/**
 * Custom hook for fetching and managing reviews
 * @param {string} productId - Optional product ID to filter reviews
 * @param {number} initialPage - Initial page
 * @param {number} limit - Reviews per page (default from constants)
 * @returns {Object} { reviews, loading, error, total, page, setPage, refetch, addReview }
 */
export const useReviews = (productId = null, initialPage = 1, limit = PAGINATION.REVIEW_LIMIT) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { items, totalCount, average } = await reviewService.getReviews({
        productId,
        page,
        limit,
      });
      setReviews(items);
      setTotal(totalCount);
      setAverageRating(average || 0);
    } catch (err) {
      setError(err.message || 'Failed to fetch reviews');
      console.error('useReviews error:', err);
    } finally {
      setLoading(false);
    }
  }, [productId, page, limit]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const addReview = async (reviewData) => {
    try {
      const newReview = await reviewService.createReview({
        ...reviewData,
        productId,
      });
      // Refetch to update list and average
      await fetchReviews();
      return newReview;
    } catch (err) {
      console.error('Add review error:', err);
      throw err;
    }
  };

  const refetch = useCallback(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    loading,
    error,
    total,
    averageRating,
    page,
    setPage,
    refetch,
    addReview,
  };
};

export default useReviews;