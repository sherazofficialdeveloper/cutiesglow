'use client';

import React, { useState, useEffect } from 'react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import { adminService } from '@/services/adminService';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cardStyles = {
    backgroundColor: colors.white,
    padding: spacing[6],
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
  };

  const iconStyles = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#FFF8F2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary,
  };

  const infoStyles = {
    flex: 1,
  };

  const labelStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    fontWeight: typography.fontWeight.medium,
  };

  const valueStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing[4],
  };

  const statsData = [
    { label: 'Revenue', value: stats?.revenue || 0, icon: DollarSign, color: '#10B981' },
    { label: 'Orders', value: stats?.orders || 0, icon: ShoppingBag, color: '#3B82F6' },
    { label: 'Customers', value: stats?.customers || 0, icon: Users, color: '#F59E0B' },
    { label: 'Products', value: stats?.products || 0, icon: Package, color: '#EF4444' },
  ];

  if (loading) return <div>Loading stats...</div>;

  return (
    <div style={gridStyles}>
      {statsData.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} style={cardStyles}>
            <div style={{ ...iconStyles, color: item.color }}>
              <Icon size={24} />
            </div>
            <div style={infoStyles}>
              <div style={labelStyles}>{item.label}</div>
              <div style={valueStyles}>
                {item.label === 'Revenue' ? `$${item.value.toFixed(2)}` : item.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

DashboardStats.displayName = 'DashboardStats';

export default DashboardStats;