'use client';

import React from 'react';
import { useReviews } from '@/hooks/useReviews';
import RatingStars from '@/components/common/RatingStars/RatingStars';

export default function MyReviewsPage() {
  const { reviews } = useReviews(); // custom hook
  return (
    <div>
      <h2 className="text-xl font-bold">My Reviews</h2>
      {reviews.length === 0 && <p className="text-gray-500">You haven't written any reviews yet.</p>}
      {reviews.map((rev) => (
        <div key={rev.id} className="border-b py-4">
          <div className="flex items-center gap-2">
            <RatingStars rating={rev.rating} size={16} />
            <span className="text-sm text-gray-600">{rev.productName}</span>
          </div>
          <p className="text-gray-700 mt-1">{rev.text}</p>
        </div>
      ))}
    </div>
  );
}