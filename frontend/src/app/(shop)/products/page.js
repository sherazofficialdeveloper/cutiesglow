'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion'; // ✅ Yeh import missing tha
import { Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import ProductFilters from '@/components/product/ProductFilters/ProductFilters';
import ProductSort from '@/components/product/ProductSort/ProductSort';
import Pagination from '@/components/common/Pagination/Pagination';
import { colors } from '@/config/theme/colors';
import { PRODUCTS } from '@/data/products';
import { useWishlist } from '@/hooks/useWishlist';
import { CATEGORIES } from '@/config/constants';

export default function ProductsPage() {
  // ... baaki code same rakhein (maine neeche complete de diya hai)
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ categories: [], minPrice: '', maxPrice: '', rating: '', availability: [] });
  const [sortBy, setSortBy] = useState('featured');
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { wishlist, toggleWishlist } = useWishlist();
  const itemsPerPage = 9;

  useEffect(() => {
    setProducts(PRODUCTS);
    setFilteredProducts(PRODUCTS);
    setLoading(false);
  }, []);

  useEffect(() => {
    let result = [...products];

    if (categoryParam) {
      const category = CATEGORIES.find(c => c.toLowerCase() === categoryParam.toLowerCase());
      if (category) {
        result = result.filter(p => p.category === category);
      }
    }

    if (searchParam) {
      const searchLower = searchParam.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category.toLowerCase()));
    }

    if (filters.minPrice) {
      result = result.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.rating) {
      result = result.filter(p => (p.rating || 0) >= parseFloat(filters.rating));
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setPage(1);
  }, [products, filters, sortBy, categoryParam, searchParam]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ categories: [], minPrice: '', maxPrice: '', rating: '', availability: [] });
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
  };

  const handleQuickView = (product) => {
    console.log('Quick view:', product.name);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900">All Products</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#E2702E] text-white rounded-lg text-sm font-medium hover:bg-[#c95f1e] transition-colors"
          >
            <Sliders size={18} />
            Filters
            {showMobileFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {/* ✅ Mobile Filter Panel - Slide Down Card (No Overlay) */}
      {showMobileFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden mb-6 overflow-hidden"
        >
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-4">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              isMobile={true}
            />
          </div>
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </div>
        </aside>

        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-4">{filteredProducts.length} products found</p>
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No products found.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}
              </div>
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}