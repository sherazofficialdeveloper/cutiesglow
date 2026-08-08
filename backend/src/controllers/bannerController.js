// backend/src/controllers/bannerController.js

import Banner from '../models/Banner.js';
import { bannerSchema } from '../validations/adminValidation.js';
import { validate } from '../middleware/validate.js';

export const getBanners = async (req, res, next) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { items: banners },
    });
  } catch (error) {
    next(error);
  }
};

export const getBannerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({
        success: false,
        message: 'Banner not found',
      });
    }
    res.json({
      success: true,
      data: { banner },
    });
  } catch (error) {
    next(error);
  }
};

export const createBanner = async (req, res, next) => {
  try {
    const errors = validate(bannerSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const { title, image, link, type, isActive } = req.body;
    const banner = new Banner({ title, image, link, type, isActive });
    await banner.save();
    res.status(201).json({
      success: true,
      message: 'Banner created successfully',
      data: { banner },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validate(bannerSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    const { title, image, link, type, isActive } = req.body;
    banner.title = title || banner.title;
    banner.image = image || banner.image;
    banner.link = link || banner.link;
    banner.type = type || banner.type;
    banner.isActive = isActive !== undefined ? isActive : banner.isActive;
    await banner.save();
    res.json({
      success: true,
      message: 'Banner updated successfully',
      data: { banner },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res.status(404).json({ success: false, message: 'Banner not found' });
    }
    await banner.deleteOne();
    res.json({
      success: true,
      message: 'Banner deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};