'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { borderRadius } from '@/config/theme/borderRadius';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className = '',
  style = {},
}) => {
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    ...style,
  };

  const buttonStyles = (isActive = false, disabled = false) => ({
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.button,
    fontSize: typography.fontSize.sm,
    fontWeight: isActive ? typography.fontWeight.bold : typography.fontWeight.medium,
    color: isActive ? colors.white : colors.text.secondary,
    backgroundColor: isActive ? colors.primary : 'transparent',
    border: isActive ? 'none' : `1px solid ${colors.border.light}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  });

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 3;
    const firstPage = 1;
    const lastPage = totalPages;

    if (totalPageNumbers >= totalPages) {
      return range(firstPage, lastPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, lastPage);

    const shouldShowLeftDots = leftSiblingIndex > firstPage + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount;
      return [...range(firstPage, leftItemCount), '...', lastPage];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      return [firstPage, '...', ...range(lastPage - rightItemCount + 1, lastPage)];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPage, '...', ...middleRange, '...', lastPage];
    }

    return range(firstPage, lastPage);
  };

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <nav style={containerStyles} className={className} aria-label="Pagination">
      {showFirstLast && (
        <button
          style={buttonStyles(false, currentPage === 1)}
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronLeft size={16} />
          <ChevronLeft size={16} style={{ marginLeft: '-8px' }} />
        </button>
      )}

      <button
        style={buttonStyles(false, currentPage === 1)}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${index}`}
              style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.text.muted,
              }}
            >
              …
            </span>
          );
        }

        return (
          <button
            key={page}
            style={buttonStyles(page === currentPage)}
            onClick={() => handlePageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        style={buttonStyles(false, currentPage === totalPages)}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>

      {showFirstLast && (
        <button
          style={buttonStyles(false, currentPage === totalPages)}
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <ChevronRight size={16} />
          <ChevronRight size={16} style={{ marginLeft: '-8px' }} />
        </button>
      )}
    </nav>
  );
};

Pagination.displayName = 'Pagination';

export default Pagination;