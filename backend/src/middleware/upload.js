// backend/src/middleware/upload.js

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and PDFs are allowed.'), false);
  }
};

// Limits
const limits = {
  fileSize: 10 * 1024 * 1024, // 10MB
};

// Create multer instance
const upload = multer({
  storage,
  fileFilter,
  limits,
});

/**
 * Single file upload middleware
 * @param {string} fieldName - The field name for the file
 */
export const uploadSingle = (fieldName = 'file') => {
  return upload.single(fieldName);
};

/**
 * Multiple files upload middleware
 * @param {string} fieldName - The field name for the files
 * @param {number} maxCount - Maximum number of files
 */
export const uploadMultiple = (fieldName = 'files', maxCount = 5) => {
  return upload.array(fieldName, maxCount);
};

/**
 * Multiple fields upload middleware
 * @param {Array} fields - Array of field configurations
 */
export const uploadFields = (fields) => {
  return upload.fields(fields);
};

/**
 * Single file upload with custom field name and error handling
 */
export const singleFileUpload = (fieldName = 'file') => {
  return [
    upload.single(fieldName),
    (req, res, next) => {
      if (req.file) {
        req.fileUrl = `/uploads/${req.file.filename}`;
      }
      next();
    },
  ];
};

export default upload;