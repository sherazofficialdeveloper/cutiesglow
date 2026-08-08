'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-xl font-bold">Settings</h2>
      <p className="text-gray-600">Account settings and preferences (coming soon).</p>
    </div>
  );
}