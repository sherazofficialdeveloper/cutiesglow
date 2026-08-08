'use client';

import React from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import Button from '@/components/common/Button/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900">404 – Page Not Found</h2>
      <p className="text-gray-600 mt-2">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-4">
        <Button variant="primary">Go Home</Button>
      </Link>
    </div>
  );
}