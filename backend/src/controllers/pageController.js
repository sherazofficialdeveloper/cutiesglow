// backend/src/controllers/pageController.js

import Page from '../models/Page.js';
import { validate } from '../middleware/validate.js';
import { slugify } from '../utils/helpers.js';

const pageSchema = {
  title: { required: true },
  slug: { required: true },
  content: { required: false },
  isPublished: { required: false },
};

export const getPages = async (req, res, next) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { items: pages },
    });
  } catch (error) {
    next(error);
  }
};

export const getPageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.json({
      success: true,
      data: { page },
    });
  } catch (error) {
    next(error);
  }
};

export const createPage = async (req, res, next) => {
  try {
    const errors = validate(pageSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const { title, slug, content, isPublished } = req.body;
    const existing = await Page.findOne({ slug });
    if (existing) {
      return res.status(409).json({ success: false, message: 'Page with this slug already exists' });
    }
    const page = new Page({
      title,
      slug: slugify(slug),
      content,
      isPublished: isPublished !== undefined ? isPublished : true,
    });
    await page.save();
    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: { page },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validate(pageSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const page = await Page.findById(id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    const { title, slug, content, isPublished } = req.body;
    if (slug && slug !== page.slug) {
      const existing = await Page.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: 'Slug already in use' });
      }
      page.slug = slugify(slug);
    }
    page.title = title || page.title;
    page.content = content !== undefined ? content : page.content;
    page.isPublished = isPublished !== undefined ? isPublished : page.isPublished;
    await page.save();
    res.json({
      success: true,
      message: 'Page updated successfully',
      data: { page },
    });
  } catch (error) {
    next(error);
  }
};

export const deletePage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    await page.deleteOne();
    res.json({
      success: true,
      message: 'Page deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getPageBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const page = await Page.findOne({ slug, isPublished: true });
    if (!page) {
      return res.status(404).json({ success: false, message: 'Page not found' });
    }
    res.json({
      success: true,
      data: { page },
    });
  } catch (error) {
    next(error);
  }
};