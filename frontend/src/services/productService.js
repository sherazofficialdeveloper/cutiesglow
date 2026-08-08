// frontend/src/services/productService.js
import apiClient from './api';
import { PRODUCTS } from '@/data/products';

// Get all products with filters, sorting, pagination
export const getProducts = async (params = {}) => {
  const { page = 1, limit = 12, category = null, sort = 'featured', search = '' } = params;
  
  // If API is available, use it
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get('/products', { params });
    return response.data;
  }

  // Otherwise use local data (mock)
  let filtered = [...PRODUCTS];

  // Filter by category
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower)
    );
  }

  // Apply sorting
  switch (sort) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default: // 'featured' – keep as is
      break;
  }

  const totalCount = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return { items, totalCount };
};

// Get single product by slug
export const getProductBySlug = async (slug) => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get(`/products/slug/${slug}`);
    return response.data;
  }
  return PRODUCTS.find(p => p.slug === slug) || null;
};

// Get product by ID
export const getProductById = async (id) => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  }
  return PRODUCTS.find(p => p.id === id) || null;
};

// Get related products
export const getRelatedProducts = async (productId, category, limit = 4) => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get(`/products/${productId}/related`, {
      params: { category, limit }
    });
    return response.data;
  }
  return PRODUCTS
    .filter(p => p.id !== productId && p.category === category)
    .slice(0, limit);
};

// Get featured products (for homepage)
export const getFeaturedProducts = async (limit = 6) => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get('/products/featured', { params: { limit } });
    return response.data;
  }
  return PRODUCTS.slice(0, limit);
};

// Get product reviews
export const getProductReviews = async (productId) => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get(`/products/${productId}/reviews`);
    return response.data;
  }
  // Return empty array for now (or mock some reviews)
  return { items: [], totalCount: 0 };
};

export const productService = {
  getProducts,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
  getFeaturedProducts,
  getProductReviews,
};