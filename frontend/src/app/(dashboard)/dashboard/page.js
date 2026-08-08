'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import DashboardStats from '@/components/dashboard/DashboardStats/DashboardStats'; // we have a similar admin stats, can create user stats

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
      <p className="text-gray-600">Here's a quick overview of your activity.</p>
      {/* Add user-specific stats/orders summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Wishlist</div>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Reviews</div>
          <div className="text-2xl font-bold">0</div>
        </div>
      </div>
    </div>
  );
}