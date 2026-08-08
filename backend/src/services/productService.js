// backend/src/services/productService.js

import Product from '../models/Product.js';
import Review from '../models/Review.js';
import Category from '../models/Category.js';
import { AppError } from '../utils/error.js';
import { slugify } from '../utils/helpers.js';
import { logger } from '../utils/logger.js';

/**
 * Get products with filters and pagination
 */
export const getProducts = async (filters = {}) => {
  try {
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
    } = filters;

    const skip = (page - 1) * limit;
    const filter = { isActive };

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
      default:
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

    return {
      items: products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
    };
  } catch (error) {
    logger.error('Get products service error:', error);
    throw error;
  }
};

/**
 * Get product by ID
 */
export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId)
      .populate('category', 'name slug');

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  } catch (error) {
    logger.error('Get product by ID service error:', error);
    throw error;
  }
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (slug) => {
  try {
    const product = await Product.findOne({ slug })
      .populate('category', 'name slug');

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    // Increment view count
    product.viewCount = (product.viewCount || 0) + 1;
    await product.save();

    return product;
  } catch (error) {
    logger.error('Get product by slug service error:', error);
    throw error;
  }
};

/**
 * Get featured products
 */
export const getFeaturedProducts = async (limit = 6) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate('category', 'name slug');

    return products;
  } catch (error) {
    logger.error('Get featured products service error:', error);
    throw error;
  }
};

/**
 * Get related products
 */
export const getRelatedProducts = async (productId, category, limit = 4) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const related = await Product.find({
      _id: { $ne: productId },
      category: category || product.category,
      isActive: true,
    })
      .sort({ rating: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .populate('category', 'name slug');

    return related;
  } catch (error) {
    logger.error('Get related products service error:', error);
    throw error;
  }
};

/**
 * Create product
 */
export const createProduct = async (productData) => {
  try {
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
    } = productData;

    const slug = slugify(name);

    // Check if slug exists
    const existing = await Product.findOne({ slug });
    if (existing) {
      throw new AppError('Product with this name already exists', 409);
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

    return product;
  } catch (error) {
    logger.error('Create product service error:', error);
    throw error;
  }
};

/**
 * Update product
 */
export const updateProduct = async (productId, updateData) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
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
    } = updateData;

    let slug = product.slug;
    if (name && name !== product.name) {
      slug = slugify(name);
      const existing = await Product.findOne({ slug, _id: { $ne: productId } });
      if (existing) {
        throw new AppError('Product with this name already exists', 409);
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

    return product;
  } catch (error) {
    logger.error('Update product service error:', error);
    throw error;
  }
};

/**
 * Delete product
 */
export const deleteProduct = async (productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await product.deleteOne();

    return true;
  } catch (error) {
    logger.error('Delete product service error:', error);
    throw error;
  }
};

export default {
  getProducts,
  getProductById,
  getProductBySlug,
  getFeaturedProducts,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};