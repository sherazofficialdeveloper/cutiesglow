'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import DataTable from '@/components/admin/DataTable/DataTable';
import { adminService } from '@/services/adminService';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await adminService.getReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    try {
      await adminService.approveReview(id);
      setReviews(reviews.map(r => r.id === id ? { ...r, isApproved: true } : r));
    } catch (error) {
      console.error('Approve error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this review?')) {
      try {
        await adminService.deleteReview(id);
        setReviews(reviews.filter(r => r.id !== id));
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const columns = [
    { header: 'User', accessor: 'name' },
    { header: 'Product', accessor: 'productName' },
    { header: 'Rating', accessor: (row) => '★'.repeat(row.rating) },
    { header: 'Status', accessor: (row) => row.isApproved ? '✅ Approved' : '⏳ Pending' },
    { header: 'Actions', accessor: (row) => (
      <div className="flex gap-2">
        {!row.isApproved && (
          <button onClick={() => handleApprove(row.id)} className="text-sm font-medium text-green-600 hover:text-green-800">
            Approve
          </button>
        )}
        <Link href={`/admin/reviews/${row.id}`} className="text-sm font-medium" style={{ color: colors.primary }}>
          View
        </Link>
        <button onClick={() => handleDelete(row.id)} className="text-sm font-medium text-red-500 hover:text-red-700">
          Delete
        </button>
      </div>
    ) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reviews</h1>
      <DataTable columns={columns} data={reviews} loading={loading} />
    </div>
  );
}