// backend/src/services/reviewService.js

import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { AppError } from '../utils/error.js';
import { logger } from '../utils/logger.js';

/**
 * Get reviews with pagination
 */
export const getReviews = async (filters = {}) => {
  try {
    const { productId, page = 1, limit = 6, isApproved = true } = filters;
    const skip = (page - 1) * limit;

    const filter = { isApproved };
    if (productId) filter.productId = productId;

    const [reviews, totalCount] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Review.countDocuments(filter),
    ]);

    // Calculate average rating
    const avgResult = await Review.aggregate([
      { $match: filter },
      { $group: { _id: null, average: { $avg: '$rating' } } },
    ]);

    const average = avgResult[0]?.average || 0;

    return {
      items: reviews,
      totalCount,
      average: Math.round(average * 10) / 10,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    logger.error('Get reviews service error:', error);
    throw error;
  }
};

/**
 * Create review
 */
export const createReview = async (reviewData) => {
  try {
    const { productId, userId, name, email, rating, text } = reviewData;

    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Check if user already reviewed
    const existing = await Review.findOne({ productId, userId });
    if (existing) {
      throw new AppError('You have already reviewed this product', 409);
    }

    const review = new Review({
      productId,
      userId,
      name,
      email,
      rating,
      text,
      isApproved: false,
    });

    await review.save();

    return review;
  } catch (error) {
    logger.error('Create review service error:', error);
    throw error;
  }
};

/**
 * Approve review (admin)
 */
export const approveReview = async (reviewId) => {
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new AppError('Review not found', 404);
    }

    review.isApproved = true;
    await review.save();

    // Update product rating
    const reviews = await Review.find({ productId: review.productId, isApproved: true });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await Product.findByIdAndUpdate(review.productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    return review;
  } catch (error) {
    logger.error('Approve review service error:', error);
    throw error;
  }
};

/**
 * Delete review (admin)
 */
export const deleteReview = async (reviewId) => {
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new AppError('Review not found', 404);
    }

    const productId = review.productId;

    await review.deleteOne();

    // Update product rating
    const reviews = await Review.find({ productId, isApproved: true });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    return true;
  } catch (error) {
    logger.error('Delete review service error:', error);
    throw error;
  }
};

export default {
  getReviews,
  createReview,
  approveReview,
  deleteReview,
};