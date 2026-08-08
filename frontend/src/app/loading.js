'use client';

import React from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

export default function Loading() {
  return <LoadingSpinner fullScreen text="Loading..." />;
}