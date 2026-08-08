// backend/src/controllers/productController.js

import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';
import { productSchema, productFilterSchema, reviewSchema } from '../validations/productValidation.js';
import { validate } from '../middleware/validate.js';
import { slugify } from '../utils/helpers.js';

/**
 * Get all products with filters, sorting, pagination
 * GET /api/products
 */
export const getProducts = async (req, res, next) => {
  try {
    const errors = validate(productFilterSchema, req.query);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const {
      page = 1,
      limit = 12,
      sort = 'featured',
      category,
      search,
      minPrice,
      maxPrice,
      rating,
      isActive = true,
    } = req.query;

    const skip = (page - 1) * limit;

    // Build filter
    const filter = { isActive: isActive === 'true' };

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    // Build sort
    let sortOptions = {};
    switch (sort) {
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      case 'popularity':
        sortOptions = { soldCount: -1 };
        break;
      default: // featured
        sortOptions = { isFeatured: -1, createdAt: -1 };
    }

    const [products, totalCount] = await Promise.all([
      Product.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('category', 'name slug'),
      Product.countDocuments(filter),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: {
        items: products,
        totalCount,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product by ID
 * GET /api/products/:id
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate('category', 'name slug')
      .populate('reviews');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product by slug
 * GET /api/products/slug/:slug
 */
export const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug })
      .populate('category', 'name slug')
      .populate('reviews');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Increment view count
    product.viewCount = (product.viewCount || 0) + 1;
    await product.save();

    res.json({
      success: true,
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get featured products
 * GET /api/products/featured
 */
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const { limit = 6 } = req.query;

    const products = await Product.find({ isFeatured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('category', 'name slug');

    res.json({
      success: true,
      data: { items: products },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get related products
 * GET /api/products/:id/related
 */
export const getRelatedProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, limit = 4 } = req.query;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const related = await Product.find({
      _id: { $ne: id },
      category: category || product.category,
      isActive: true,
    })
      .sort({ rating: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .populate('category', 'name slug');

    res.json({
      success: true,
      data: { items: related },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create product (Admin only)
 * POST /api/admin/products
 */
export const createProduct = async (req, res, next) => {
  try {
    const errors = validate(productSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const {
      name,
      description,
      price,
      originalPrice,
      category,
      stock,
      images,
      isActive,
      isFeatured,
      tags,
      variants,
    } = req.body;

    // Generate slug
    const slug = slugify(name);

    // Check if slug exists
    const existing = await Product.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Product with this name already exists',
      });
    }

    const product = new Product({
      name,
      slug,
      description,
      price,
      originalPrice,
      category,
      stock,
      images: images || [],
      isActive: isActive !== undefined ? isActive : true,
      isFeatured: isFeatured || false,
      tags: tags || [],
      variants: variants || [],
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update product (Admin only)
 * PUT /api/admin/products/:id
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validate(productSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const {
      name,
      description,
      price,
      originalPrice,
      category,
      stock,
      images,
      isActive,
      isFeatured,
      tags,
      variants,
    } = req.body;

    // Update slug if name changed
    let slug = product.slug;
    if (name && name !== product.name) {
      slug = slugify(name);
      const existing = await Product.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Product with this name already exists',
        });
      }
    }

    product.name = name || product.name;
    product.slug = slug;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.originalPrice = originalPrice !== undefined ? originalPrice : product.originalPrice;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    product.images = images || product.images;
    product.isActive = isActive !== undefined ? isActive : product.isActive;
    product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
    product.tags = tags || product.tags;
    product.variants = variants || product.variants;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product (Admin only)
 * DELETE /api/admin/products/:id
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create product review
 * POST /api/products/:id/reviews
 */
export const createReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validate(reviewSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { rating, text } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed
    const existingReview = await Review.findOne({
      productId: id,
      userId: req.user.id,
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    const review = new Review({
      productId: id,
      userId: req.user.id,
      name: req.user.name,
      email: req.user.email,
      rating,
      text,
    });

    await review.save();

    // Update product rating
    const reviews = await Review.find({ productId: id, isApproved: true });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    product.rating = Math.round(avgRating * 10) / 10;
    product.reviewCount = reviews.length;
    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};