'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar/AdminSidebar';
import { colors } from '@/config/theme/colors';

export default function AdminLayout({ children }) {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    // ✅ Check if user is authenticated and has admin role
    // Admin role is determined by database (user.role === 'admin')
    const isAdmin = isAuthenticated && user?.role === 'admin';

    if (!isAdmin) {
      console.log('🔒 Admin access denied. Redirecting to login.');
      router.push('/login');
      return;
    }

    setIsAuthorized(true);
    console.log('✅ Admin access granted for:', user?.email);
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" 
             style={{ borderColor: colors.primary, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}