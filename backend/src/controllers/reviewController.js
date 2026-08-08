// backend/src/controllers/reviewController.js

import Review from '../models/Review.js';
import Product from '../models/Product.js';
import { reviewSchema } from '../validations/productValidation.js';
import { validate } from '../middleware/validate.js';

/**
 * Get reviews
 * GET /api/reviews
 */
export const getReviews = async (req, res, next) => {
  try {
    const { productId, page = 1, limit = 6 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { isApproved: true };
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

    res.json({
      success: true,
      data: {
        items: reviews,
        totalCount,
        average: Math.round(average * 10) / 10,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create review
 * POST /api/reviews
 */
export const createReview = async (req, res, next) => {
  try {
    const errors = validate(reviewSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { productId, rating, text } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed
    const existing = await Review.findOne({
      productId,
      userId: req.user.id,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    const review = new Review({
      productId,
      userId: req.user.id,
      name: req.user.name,
      email: req.user.email,
      rating,
      text,
      isApproved: false, // Requires admin approval
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review submitted for approval',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Approve review (Admin only)
 * PUT /api/admin/reviews/:id/approve
 */
export const approveReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    review.isApproved = true;
    await review.save();

    // Update product rating
    const reviews = await Review.find({ productId: review.productId, isApproved: true });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Product.findByIdAndUpdate(review.productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    res.json({
      success: true,
      message: 'Review approved successfully',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete review (Admin only)
 * DELETE /api/admin/reviews/:id
 */
export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    await review.deleteOne();

    // Update product rating
    const reviews = await Review.find({ productId: review.productId, isApproved: true });
    const avgRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await Product.findByIdAndUpdate(review.productId, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: reviews.length,
    });

    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};