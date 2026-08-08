'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for infinite scrolling
 * @param {function} fetchMore - Async function to fetch more items
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {number} threshold - Intersection threshold (default: 0.5)
 * @returns {Object} { loaderRef, loading, error }
 */
export const useInfiniteScroll = (fetchMore, hasMore, threshold = 0.5) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);

  const handleObserver = useCallback(
    async (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setLoading(true);
        try {
          await fetchMore();
        } catch (err) {
          setError(err.message || 'Failed to load more items');
        } finally {
          setLoading(false);
        }
      }
    },
    [fetchMore, hasMore, loading]
  );

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold,
    });
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [handleObserver, threshold]);

  return { loaderRef, loading, error };
};

export default useInfiniteScroll;