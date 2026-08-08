// frontend/src/services/categoryService.js
import { CATEGORIES } from '@/config/constants';
import { PRODUCTS } from '@/data/products';

// Get all categories with product counts – returns array directly
export const getAllCategories = async () => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get('/categories');
    return response.data; // expected { items: [] } – but we'll handle in component
  }

  // Return array directly (not wrapped in { items })
  return CATEGORIES.map(cat => ({
    id: cat.toLowerCase(),
    name: cat,
    slug: cat.toLowerCase(),
    productCount: PRODUCTS.filter(p => p.category === cat).length,
    image: `/images/category-${cat.toLowerCase()}.jpg`,
  }));
};

// Get single category by slug
export const getCategoryBySlug = async (slug) => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get(`/categories/slug/${slug}`);
    return response.data;
  }

  const categoryName = CATEGORIES.find(c => c.toLowerCase() === slug);
  if (!categoryName) return null;

  return {
    id: slug,
    name: categoryName,
    slug: slug,
    description: `Explore our range of ${categoryName} products.`,
    productCount: PRODUCTS.filter(p => p.category === categoryName).length,
  };
};

// Get products by category slug (with pagination)
export const getProductsByCategory = async (slug, page = 1, limit = 12) => {
  if (process.env.NEXT_PUBLIC_USE_API === 'true') {
    const response = await apiClient.get(`/categories/${slug}/products`, {
      params: { page, limit },
    });
    return response.data;
  }

  const categoryName = CATEGORIES.find(c => c.toLowerCase() === slug);
  if (!categoryName) return { items: [], totalCount: 0 };

  const filtered = PRODUCTS.filter(p => p.category === categoryName);
  const totalCount = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  return { items, totalCount };
};

export const categoryService = {
  getAllCategories,
  getCategoryBySlug,
  getProductsByCategory,
};