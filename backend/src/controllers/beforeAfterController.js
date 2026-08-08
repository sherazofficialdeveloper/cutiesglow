// backend/src/controllers/beforeAfterController.js

import BeforeAfter from '../models/BeforeAfter.js';
import { beforeAfterSchema } from '../validations/adminValidation.js';
import { validate } from '../middleware/validate.js';

export const getBeforeAfterItems = async (req, res, next) => {
  try {
    const items = await BeforeAfter.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { items },
    });
  } catch (error) {
    next(error);
  }
};

export const getBeforeAfterItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await BeforeAfter.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({
      success: true,
      data: { item },
    });
  } catch (error) {
    next(error);
  }
};

export const createBeforeAfterItem = async (req, res, next) => {
  try {
    const errors = validate(beforeAfterSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const { beforeImage, afterImage, description } = req.body;
    const item = new BeforeAfter({ beforeImage, afterImage, description });
    await item.save();
    res.status(201).json({
      success: true,
      message: 'Before/After item created successfully',
      data: { item },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBeforeAfterItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validate(beforeAfterSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const item = await BeforeAfter.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    const { beforeImage, afterImage, description } = req.body;
    item.beforeImage = beforeImage || item.beforeImage;
    item.afterImage = afterImage || item.afterImage;
    item.description = description || item.description;
    await item.save();
    res.json({
      success: true,
      message: 'Before/After item updated successfully',
      data: { item },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBeforeAfterItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await BeforeAfter.findById(id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    await item.deleteOne();
    res.json({
      success: true,
      message: 'Before/After item deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getHomepageItems = async (req, res, next) => {
  try {
    const { limit = 6 } = req.query;
    const items = await BeforeAfter.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    res.json({
      success: true,
      data: { items },
    });
  } catch (error) {
    next(error);
  }
};