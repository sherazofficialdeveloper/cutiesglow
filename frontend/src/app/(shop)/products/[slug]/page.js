'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '@/components/product/ProductDetails/ProductDetails';
import RelatedProducts from '@/components/product/RelatedProducts/RelatedProducts';
import ProductReviews from '@/components/product/ProductReviews/ProductReviews';
import { productService } from '@/services/productService';
import { useWishlist } from '@/hooks/useWishlist';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, isWishlisted } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProductBySlug(slug);
        setProduct(data);
        if (data) {
          const relatedData = await productService.getRelatedProducts(data.id, data.category);
          setRelated(relatedData);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <div className="py-16 text-center">Loading...</div>;
  if (!product) return <div className="py-16 text-center">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetails product={product} />
      <div className="mt-12">
        <ProductReviews
          reviews={product.reviews || []}
          averageRating={product.rating || 0}
          totalReviews={product.reviewCount || 0}
          onAddReview={async (reviewData) => {
            // Handle review submission
            console.log('Review submitted:', reviewData);
          }}
        />
      </div>
      <RelatedProducts
        products={related}
        onAddToCart={() => {}}
        onQuickView={() => {}}
        onToggleWishlist={toggleWishlist}
      />
    </div>
  );
}