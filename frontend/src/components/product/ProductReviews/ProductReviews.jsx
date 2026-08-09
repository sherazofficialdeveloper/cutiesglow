'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, User, Calendar, MessageSquare } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import Button from '@/components/common/Button/Button';
import RatingStars from '@/components/common/RatingStars/RatingStars';
import Input from '@/components/common/Input/Input';

const ProductReviews = ({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  onAddReview,
  loading = false,
}) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (dist[review.rating] !== undefined) {
        dist[review.rating]++;
      }
    });
    return dist;
  };

  const distribution = getRatingDistribution();

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim()) return;

    onAddReview &&
      onAddReview({
        rating,
        text: reviewText,
        name: reviewName || 'Anonymous',
        email: reviewEmail,
      });

    setRating(0);
    setReviewText('');
    setReviewName('');
    setReviewEmail('');
    setShowWriteReview(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-sm p-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-sm p-4 sm:p-6">
      {/* Header: Summary + Write Review Button */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Rating Display */}
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-4xl font-extrabold text-gray-900 leading-none">
              {averageRating.toFixed(1)}
            </span>
            <RatingStars rating={Math.round(averageRating)} size={20} />
            <span className="text-sm text-gray-500">{totalReviews} reviews</span>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="flex flex-col gap-1 min-w-[140px] sm:min-w-[200px] w-full">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-8">{star}★</span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400 w-10 text-right">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Button
          variant="primary"
          size="medium"
          onClick={() => setShowWriteReview(!showWriteReview)}
          icon={<MessageSquare size={18} />}
          className="self-start sm:self-auto"
        >
          {showWriteReview ? 'Cancel' : 'Write Review'}
        </Button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Rating *
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={32}
                      className={`transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Review *
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E2702E] focus:border-transparent text-sm min-h-[100px]"
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                  fullWidth
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="large">
              Submit Review
            </Button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-gray-200 pb-4 last:border-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E2702E] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {getInitials(review.name || 'User')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">
                      {review.name || 'Anonymous'}
                    </div>
                    <div className="text-xs text-gray-500">{review.email || ''}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                  <RatingStars rating={review.rating || 0} size={16} />
                  <div className="text-xs text-gray-400">
                    {review.date || 'Recently'}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.text}</p>

              <div className="flex items-center gap-4 mt-3">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <ThumbsUp size={16} />
                  Helpful ({review.helpful || 0})
                </button>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                  <ThumbsDown size={16} />
                  Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <User size={48} className="mx-auto opacity-30" />
          <p className="mt-4">No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

ProductReviews.displayName = 'ProductReviews';

export default ProductReviews;