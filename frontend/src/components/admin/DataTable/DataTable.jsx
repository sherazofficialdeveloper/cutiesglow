'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';

const DataTable = ({ columns, data, loading }) => {
  if (loading) return <div style={{ textAlign: 'center', padding: spacing[8] }}>Loading...</div>;

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: typography.fontSize.sm,
  };

  const thStyles = {
    textAlign: 'left',
    padding: spacing[3],
    borderBottom: `2px solid ${colors.border.light}`,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.secondary,
  };

  const tdStyles = {
    padding: spacing[3],
    borderBottom: `1px solid ${colors.border.light}`,
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyles}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.header} style={thStyles}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((col) => (
                <td key={col.header} style={tdStyles}>
                  {typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.displayName = 'DataTable';

export default DataTable;