'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, ThumbsDown, User, Calendar, MessageSquare } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Button from '@/components/common/Button/Button';
import RatingStars from '@/components/common/RatingStars/RatingStars';
import Input from '@/components/common/Input/Input';

const ProductReviews = ({ reviews = [], averageRating = 0, totalReviews = 0, onAddReview, loading = false }) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');

  const containerStyles = {
    backgroundColor: colors.white,
    padding: spacing[6],
    borderRadius: '16px',
    border: `1px solid ${colors.border.light}`,
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[6],
    flexWrap: 'wrap',
    gap: spacing[4],
  };

  const summaryStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
  };

  const ratingDisplayStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const ratingNumberStyles = {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.primary,
    lineHeight: 1,
  };

  const totalStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
  };

  const ratingBreakdownStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    minWidth: '200px',
  };

  const ratingBarStyles = (percentage) => ({
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    backgroundColor: colors.border.light,
    overflow: 'hidden',
    position: 'relative',
  });

  const ratingBarFillStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: '3px',
    transition: 'width 0.6s ease',
  };

  const ratingRowStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const ratingLabelStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    minWidth: '40px',
  };

  const ratingPercentStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    minWidth: '40px',
    textAlign: 'right',
  };

  const reviewListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
  };

  const reviewItemStyles = {
    paddingBottom: spacing[4],
    borderBottom: `1px solid ${colors.border.light}`,
  };

  const reviewHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[2],
  };

  const reviewerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const avatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: colors.primary,
    color: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
  };

  const reviewerNameStyles = {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  };

  const reviewerEmailStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
  };

  const reviewDateStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
  };

  const reviewTextStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed,
    marginTop: spacing[2],
  };

  const reviewActionsStyles = {
    display: 'flex',
    gap: spacing[4],
    marginTop: spacing[3],
  };

  const actionButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  const formContainerStyles = {
    marginTop: spacing[6],
    padding: spacing[6],
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
  };

  const formTitleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing[4],
  };

  const ratingSelectorStyles = {
    display: 'flex',
    gap: spacing[1],
    marginBottom: spacing[4],
  };

  const starButtonStyles = (isActive) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: spacing[0.5],
    color: isActive ? '#F59E0B' : colors.border.medium,
    transition: 'color 0.2s ease',
  });

  const formGroupStyles = {
    marginBottom: spacing[4],
  };

  const formLabelStyles = {
    display: 'block',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
    marginBottom: spacing[1],
  };

  const textareaStyles = {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    border: `1px solid ${colors.border.light}`,
    borderRadius: '8px',
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.body,
    resize: 'vertical',
    minHeight: '100px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const getRatingDistribution = () => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
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
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || !reviewText.trim()) return;

    onAddReview && onAddReview({
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
    return <div style={{ ...containerStyles, textAlign: 'center', padding: spacing[8] }}>Loading...</div>;
  }

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={summaryStyles}>
          <div style={ratingDisplayStyles}>
            <span style={ratingNumberStyles}>{averageRating.toFixed(1)}</span>
            <RatingStars rating={Math.round(averageRating)} size={20} />
            <span style={totalStyles}>{totalReviews} reviews</span>
          </div>

          <div style={ratingBreakdownStyles}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = distribution[star] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} style={ratingRowStyles}>
                  <span style={ratingLabelStyles}>{star}★</span>
                  <div style={ratingBarStyles(percentage)}>
                    <div style={{ ...ratingBarFillStyles, width: `${percentage}%` }} />
                  </div>
                  <span style={ratingPercentStyles}>{percentage.toFixed(0)}%</span>
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
        >
          {showWriteReview ? 'Cancel' : 'Write Review'}
        </Button>
      </div>

      {showWriteReview && (
        <div style={formContainerStyles}>
          <h3 style={formTitleStyles}>Write a Review</h3>
          <form onSubmit={handleSubmitReview}>
            <div style={formGroupStyles}>
              <label style={formLabelStyles}>Your Rating *</label>
              <div style={ratingSelectorStyles}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    style={starButtonStyles(star <= (hoverRating || rating))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <Star size={32} fill={star <= (hoverRating || rating) ? '#F59E0B' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div style={formGroupStyles}>
              <label style={formLabelStyles}>Review *</label>
              <textarea
                style={textareaStyles}
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[4] }}>
              <div style={formGroupStyles}>
                <label style={formLabelStyles}>Name</label>
                <Input
                  type="text"
                  placeholder="Your name"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                />
              </div>
              <div style={formGroupStyles}>
                <label style={formLabelStyles}>Email</label>
                <Input
                  type="email"
                  placeholder="Your email"
                  value={reviewEmail}
                  onChange={(e) => setReviewEmail(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="large">
              Submit Review
            </Button>
          </form>
        </div>
      )}

      {reviews.length > 0 ? (
        <div style={reviewListStyles}>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={reviewItemStyles}
            >
              <div style={reviewHeaderStyles}>
                <div style={reviewerStyles}>
                  <div style={avatarStyles}>
                    {getInitials(review.name || 'User')}
                  </div>
                  <div>
                    <div style={reviewerNameStyles}>{review.name || 'Anonymous'}</div>
                    <div style={reviewerEmailStyles}>{review.email || ''}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <RatingStars rating={review.rating || 0} size={16} />
                  <div style={reviewDateStyles}>
                    {review.date || 'Recently'}
                  </div>
                </div>
              </div>

              <p style={reviewTextStyles}>{review.text}</p>

              <div style={reviewActionsStyles}>
                <button style={actionButtonStyles}>
                  <ThumbsUp size={16} />
                  Helpful ({review.helpful || 0})
                </button>
                <button style={actionButtonStyles}>
                  <ThumbsDown size={16} />
                  Report
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: spacing[8], color: colors.text.muted }}>
          <User size={48} style={{ margin: '0 auto', opacity: 0.3 }} />
          <p style={{ marginTop: spacing[4] }}>No reviews yet. Be the first to review this product!</p>
        </div>
      )}
    </div>
  );
};

ProductReviews.displayName = 'ProductReviews';

export default ProductReviews;