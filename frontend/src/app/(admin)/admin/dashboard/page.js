'use client';

import React from 'react';
import DashboardStats from '@/components/admin/DashboardStats/DashboardStats';

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <DashboardStats />
    </div>
  );
}