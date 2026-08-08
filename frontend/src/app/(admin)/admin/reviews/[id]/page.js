'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { adminService } from '@/services/adminService';
import RatingStars from '@/components/common/RatingStars/RatingStars';

export default function AdminReviewDetailPage() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await adminService.getReview(id);
        setReview(data);
      } catch (error) {
        console.error('Error fetching review:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!review) return <div>Review not found.</div>;

  return (
    <div>
      <Link href="/admin/reviews" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-6" style={{ color: colors.primary }}>
        <ArrowLeft className="w-4 h-4" />
        Back to Reviews
      </Link>

      <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-sm p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{review.name}</h1>
            <p className="text-sm text-gray-500">{review.email}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${review.isApproved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {review.isApproved ? 'Approved' : 'Pending'}
          </span>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <RatingStars rating={review.rating} size={20} />
          <span className="text-sm text-gray-500">Product: {review.productName}</span>
        </div>
        <p className="text-gray-700 text-lg">{review.text}</p>
        <p className="text-xs text-gray-400 mt-4">{new Date(review.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}