'use client';

import React from 'react';
import { colors } from '@/config/theme/colors';
import Button from '@/components/common/Button/Button';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900">Something went wrong</h2>
      <p className="text-gray-600 mt-2">{error?.message || 'An unexpected error occurred.'}</p>
      <Button className="mt-4" variant="primary" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}