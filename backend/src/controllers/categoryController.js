// backend/src/controllers/categoryController.js

import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { categorySchema } from '../validations/adminValidation.js';
import { validate } from '../middleware/validate.js';
import { slugify } from '../utils/helpers.js';

/**
 * Get all categories
 * GET /api/categories
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({
          category: category.name,
          isActive: true,
        });
        return {
          ...category.toObject(),
          productCount: count,
        };
      })
    );

    res.json({
      success: true,
      data: { items: categoriesWithCount },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get category by slug
 * GET /api/categories/slug/:slug
 */
export const getCategoryBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.json({
      success: true,
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get products by category slug
 * GET /api/categories/:slug/products
 */
export const getProductsByCategory = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const skip = (page - 1) * limit;

    const [products, totalCount] = await Promise.all([
      Product.find({ category: category.name, isActive: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('category', 'name slug'),
      Product.countDocuments({ category: category.name, isActive: true }),
    ]);

    res.json({
      success: true,
      data: {
        items: products,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page),
        category,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create category (Admin only)
 * POST /api/admin/categories
 */
export const createCategory = async (req, res, next) => {
  try {
    const errors = validate(categorySchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const { name, description, image } = req.body;
    const slug = slugify(name);

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'Category already exists',
      });
    }

    const category = new Category({ name, slug, description, image });
    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update category (Admin only)
 * PUT /api/admin/categories/:id
 */
export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validate(categorySchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const { name, description, image } = req.body;

    // Update slug if name changed
    let slug = category.slug;
    if (name && name !== category.name) {
      slug = slugify(name);
      const existing = await Category.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: 'Category with this name already exists',
        });
      }
    }

    category.name = name || category.name;
    category.slug = slug;
    category.description = description || category.description;
    category.image = image || category.image;

    await category.save();

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete category (Admin only)
 * DELETE /api/admin/categories/:id
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    // Check if products exist in this category
    const productCount = await Product.countDocuments({ category: category.name });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category with ${productCount} products. Reassign or delete products first.`,
      });
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};