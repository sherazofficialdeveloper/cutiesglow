// backend/src/controllers/videoController.js

import Video from '../models/Video.js';
import { videoSchema } from '../validations/adminValidation.js';
import { validate } from '../middleware/validate.js';

export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: { items: videos },
    });
  } catch (error) {
    next(error);
  }
};

export const getVideoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    res.json({
      success: true,
      data: { video },
    });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const errors = validate(videoSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const { title, url, type } = req.body;
    const video = new Video({ title, url, type });
    await video.save();
    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: { video },
    });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validate(videoSchema, req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    const { title, url, type } = req.body;
    video.title = title || video.title;
    video.url = url || video.url;
    video.type = type || video.type;
    await video.save();
    res.json({
      success: true,
      message: 'Video updated successfully',
      data: { video },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    await video.deleteOne();
    res.json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getHomepageVideo = async (req, res, next) => {
  try {
    const video = await Video.findOne({ type: 'homepage' }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: video ? { url: video.url } : null,
    });
  } catch (error) {
    next(error);
  }
};