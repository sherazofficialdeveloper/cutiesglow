'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';

const PaymentMethods = ({ selected, onChange }) => {
  const methods = [
    { id: 'paypal', label: 'PayPal', icon: '💳' },
    { id: 'zelle', label: 'Zelle', icon: '🏦' },
  ];

  const containerStyles = {
    display: 'flex',
    gap: spacing[4],
    flexWrap: 'wrap',
  };

  const optionStyles = (isSelected) => ({
    flex: 1,
    minWidth: '120px',
    padding: spacing[4],
    border: `2px solid ${isSelected ? colors.primary : colors.border.light}`,
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'center',
    backgroundColor: isSelected ? '#FFF8F2' : colors.white,
    transition: 'all 0.3s ease',
  });

  const iconStyles = {
    fontSize: typography.fontSize['2xl'],
    display: 'block',
    marginBottom: spacing[1],
  };

  const labelStyles = {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  };

  return (
    <div style={containerStyles}>
      {methods.map((method) => (
        <div
          key={method.id}
          style={optionStyles(selected === method.id)}
          onClick={() => onChange(method.id)}
          onMouseEnter={(e) => {
            if (selected !== method.id) {
              e.currentTarget.style.borderColor = colors.primary;
            }
          }}
          onMouseLeave={(e) => {
            if (selected !== method.id) {
              e.currentTarget.style.borderColor = colors.border.light;
            }
          }}
        >
          <span style={iconStyles}>{method.icon}</span>
          <span style={labelStyles}>{method.label}</span>
        </div>
      ))}
    </div>
  );
};

PaymentMethods.displayName = 'PaymentMethods';

export default PaymentMethods;