'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, Check } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { SORT_OPTIONS } from '@/config/constants';

const ProductSort = ({ sortBy, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentOption = SORT_OPTIONS.find(opt => opt.value === sortBy) || SORT_OPTIONS[0];

  const containerStyles = {
    position: 'relative',
    display: 'inline-block',
  };

  const triggerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[2]} ${spacing[4]}`,
    backgroundColor: colors.white,
    border: `1px solid ${colors.border.light}`,
    borderRadius: '8px',
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minWidth: '180px',
    justifyContent: 'space-between',
  };

  const dropdownStyles = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    right: 0,
    backgroundColor: colors.white,
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    minWidth: '220px',
    overflow: 'hidden',
    zIndex: 50,
  };

  const optionStyles = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.sm,
    color: isActive ? colors.primary : colors.text.secondary,
    fontWeight: isActive ? typography.fontWeight.bold : typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#FFF8F2' : 'transparent',
  });

  return (
    <div ref={dropdownRef} style={containerStyles}>
      <button 
        style={triggerStyles}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colors.primary;
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = colors.border.light;
          }
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          <ArrowUpDown size={16} />
          Sort by: {currentOption.label}
        </span>
        <span style={{ 
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.3s ease',
        }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div style={dropdownStyles}>
          {SORT_OPTIONS.map((option) => {
            const isActive = sortBy === option.value;
            return (
              <div
                key={option.value}
                style={optionStyles(isActive)}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>{option.label}</span>
                {isActive && <Check size={16} color={colors.primary} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

ProductSort.displayName = 'ProductSort';

export default ProductSort;