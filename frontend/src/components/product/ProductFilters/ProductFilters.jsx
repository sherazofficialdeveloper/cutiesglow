'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sliders, X } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { CATEGORIES } from '@/config/constants';
import { PRODUCTS } from '@/data/products';
import Button from '@/components/common/Button/Button';

const ProductFilters = ({ filters, onFilterChange, onClearFilters, isMobile = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const categoryCounts = CATEGORIES.map(cat => ({
    label: cat,
    value: cat.toLowerCase(),
    count: PRODUCTS.filter(p => p.category === cat).length,
  }));

  const filterSections = [
    {
      id: 'categories',
      label: 'Categories',
      type: 'checkbox',
      options: categoryCounts,
    },
    {
      id: 'price',
      label: 'Price Range',
      type: 'price',
      options: { min: 0, max: 200, step: 5 },
    },
    {
      id: 'rating',
      label: 'Rating',
      type: 'rating',
      options: [
        { label: '4★ & above', value: 4 },
        { label: '3★ & above', value: 3 },
        { label: '2★ & above', value: 2 },
        { label: '1★ & above', value: 1 },
      ],
    },
    {
      id: 'availability',
      label: 'Availability',
      type: 'checkbox',
      options: [
        { label: 'In Stock', value: 'in-stock' },
        { label: 'Out of Stock', value: 'out-of-stock' },
      ],
    },
  ];

  // Styles (same as before)
  const containerStyles = {
    backgroundColor: colors.white,
    padding: spacing[4],
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[4],
    paddingBottom: spacing[3],
    borderBottom: `1px solid ${colors.border.light}`,
  };

  const titleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const clearButtonStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontWeight: typography.fontWeight.medium,
  };

  const sectionStyles = {
    marginBottom: spacing[4],
    borderBottom: `1px solid ${colors.border.light}`,
    paddingBottom: spacing[4],
  };

  const sectionHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: `${spacing[1]} 0`,
  };

  const sectionTitleStyles = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const optionContainerStyles = {
    marginTop: spacing[3],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  };

  const optionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    cursor: 'pointer',
    padding: `${spacing[1]} 0`,
  };

  const checkboxStyles = {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: `2px solid ${colors.border.medium}`,
    cursor: 'pointer',
    accentColor: colors.primary,
  };

  const priceRangeStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const priceInputContainerStyles = {
    display: 'flex',
    gap: spacing[2],
  };

  const priceInputStyles = {
    flex: 1,
    padding: `${spacing[1]} ${spacing[2]}`,
    border: `1px solid ${colors.border.light}`,
    borderRadius: '6px',
    fontSize: typography.fontSize.sm,
    outline: 'none',
  };

  const rangeSliderStyles = {
    width: '100%',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: colors.border.medium,
    outline: 'none',
    accentColor: colors.primary,
  };

  const renderFilterContent = (section) => {
    switch (section.type) {
      case 'checkbox':
        return (
          <div style={optionContainerStyles}>
            {section.options.map((option) => (
              <label key={option.value} style={optionStyles}>
                <input
                  type="checkbox"
                  style={checkboxStyles}
                  checked={filters[section.id]?.includes(option.value)}
                  onChange={(e) => {
                    const current = filters[section.id] || [];
                    const newValue = e.target.checked
                      ? [...current, option.value]
                      : current.filter(v => v !== option.value);
                    onFilterChange(section.id, newValue);
                  }}
                />
                <span>{option.label}</span>
                {option.count !== undefined && (
                  <span style={{ color: colors.text.muted, fontSize: typography.fontSize.xs }}>
                    ({option.count})
                  </span>
                )}
              </label>
            ))}
          </div>
        );

      case 'price':
        return (
          <div style={priceRangeStyles}>
            <div style={priceInputContainerStyles}>
              <input
                type="number"
                style={priceInputStyles}
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => onFilterChange('minPrice', e.target.value)}
              />
              <span style={{ color: colors.text.muted }}>to</span>
              <input
                type="number"
                style={priceInputStyles}
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              />
            </div>
            <input
              type="range"
              min={section.options.min}
              max={section.options.max}
              step={section.options.step}
              style={rangeSliderStyles}
              value={filters.maxPrice || section.options.max}
              onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: typography.fontSize.xs,
              color: colors.text.muted,
            }}>
              <span>${section.options.min}</span>
              <span>${section.options.max}</span>
            </div>
          </div>
        );

      case 'rating':
        return (
          <div style={optionContainerStyles}>
            {section.options.map((option) => (
              <label key={option.value} style={optionStyles}>
                <input
                  type="radio"
                  name="rating"
                  style={{ ...checkboxStyles, borderRadius: '50%' }}
                  checked={filters.rating === option.value}
                  onChange={() => onFilterChange('rating', option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const FilterContent = () => (
    <>
      {filterSections.map((section) => (
        <div key={section.id} style={sectionStyles}>
          <div style={sectionHeaderStyles} onClick={() => toggleSection(section.id)}>
            <span style={sectionTitleStyles}>{section.label}</span>
            {expandedSections[section.id] ? (
              <ChevronUp size={18} color={colors.text.muted} />
            ) : (
              <ChevronDown size={18} color={colors.text.muted} />
            )}
          </div>
          <AnimatePresence>
            {expandedSections[section.id] && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderFilterContent(section)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </>
  );

  // ✅ Render only content – no overlay logic
  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={titleStyles}>
          <Sliders size={20} />
          Filters
        </div>
        <button style={clearButtonStyles} onClick={onClearFilters}>
          Clear All
        </button>
      </div>
      <FilterContent />
    </div>
  );
};

ProductFilters.displayName = 'ProductFilters';
export default ProductFilters;