'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to check if a media query matches
 * @param {string} query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns {boolean} true if the query matches, false otherwise
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    updateMatch();
    media.addEventListener('change', updateMatch);

    return () => media.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
};

export default useMediaQuery;