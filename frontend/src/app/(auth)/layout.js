'use client';

import React from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="text-center">
          <Link href="/" className="text-3xl font-extrabold" style={{ color: colors.primary }}>
            Cutish
          </Link>
          <p className="mt-2 text-sm text-gray-600">by Razia's</p>
        </div>
        {children}
      </div>
    </div>
  );
}