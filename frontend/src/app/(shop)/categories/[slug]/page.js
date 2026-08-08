'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { productService } from '@/services/productService';
import { categoryService } from '@/services/categoryService';
import { useWishlist } from '@/hooks/useWishlist';
import { colors } from '@/config/theme/colors';
import { PAGINATION } from '@/config/constants';
import Pagination from '@/components/common/Pagination/Pagination';

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { wishlist, toggleWishlist } = useWishlist();
  const limit = PAGINATION.PRODUCT_LIMIT || 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catData = await categoryService.getCategoryBySlug(slug);
        setCategory(catData);
        const { items, totalCount } = await productService.getProducts({
          page,
          limit,
          category: catData?.name,
        });
        setProducts(items);
        setTotal(totalCount);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug, page]);

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
  };

  const handleQuickView = (product) => {
    console.log('Quick view:', product.name);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: colors.primary, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-500">Category not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">{category.name}</h1>
        {category.description && <p className="text-gray-600 mt-2">{category.description}</p>}
        <p className="text-sm text-gray-500 mt-1">{total} products found</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No products found in this category.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
              totalPages={Math.ceil(total / limit)}
              onPageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}