'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2 } from 'lucide-react';
import { productService } from '@/services/productService';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { colors } from '@/config/theme/colors';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import RatingStars from '@/components/common/RatingStars/RatingStars';
import ProductReviews from '@/components/product/ProductReviews/ProductReviews';
import RelatedProducts from '@/components/product/RelatedProducts/RelatedProducts';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();
  const isWishlisted = product ? wishlist?.includes(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductBySlug(slug);
        setProduct(data);
        setSelectedImage(0);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0 && val <= (product?.stock || 10)) {
      setQuantity(val);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-500">Product not found.</p>
        <Link href="/products" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
          Back to Products
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 md:mb-6 overflow-x-auto">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-gray-700">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      {/* Main Layout: Image on top on mobile, side-by-side on desktop */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="relative aspect-square w-full bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={product.images?.[selectedImage] || product.image || '/images/default-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-[#E2702E]' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 flex-wrap">
            <RatingStars rating={product.rating || 0} />
            <span className="text-sm text-gray-500">({product.reviewCount || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl md:text-3xl font-bold" style={{ color: colors.primary }}>
              ${product.price?.toFixed(2) || '0.00'}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-gray-400 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">{product.description}</p>

          {/* Stock Status */}
          <div className="text-sm">
            {isOutOfStock ? (
              <span className="text-red-500 font-medium">Out of Stock</span>
            ) : (
              <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
            )}
          </div>

          {/* Quantity & Add to Cart - Fixed Layout */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg font-bold transition-colors"
                aria-label="Decrease quantity"
                disabled={isOutOfStock}
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={product.stock || 10}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-12 text-center border-x border-gray-300 py-2 text-sm focus:outline-none"
                disabled={isOutOfStock}
              />
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg font-bold transition-colors"
                aria-label="Increase quantity"
                disabled={isOutOfStock}
              >
                +
              </button>
            </div>

            {/* Add to Cart / Out of Stock Button */}
            {isOutOfStock ? (
              <button
                disabled
                className="flex-1 min-w-[140px] py-3 px-6 rounded-lg font-bold text-white bg-gray-400 cursor-not-allowed"
              >
                Out of Stock
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[140px] py-3 px-6 rounded-lg font-bold text-white transition-colors hover:bg-opacity-90"
                style={{ backgroundColor: colors.primary }}
              >
                Add to Cart
              </button>
            )}

            {/* Wishlist Button - Icon Only, Fixed Size */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-lg border transition-colors flex-shrink-0 ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'border-gray-300 hover:border-gray-400 text-gray-600 hover:text-red-500'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Additional Info */}
          <div className="text-sm text-gray-500 mt-2 space-y-1">
            <p><span className="font-medium">Category:</span> {product.category?.name || 'N/A'}</p>
            {product.sku && <p><span className="font-medium">SKU:</span> {product.sku}</p>}
          </div>
        </div>
      </div>

      {/* Tabs: Description & Reviews */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setActiveTab('description')}
            className={`text-sm font-bold pb-2 border-b-2 transition-colors ${
              activeTab === 'description'
                ? 'border-[#E2702E] text-[#E2702E]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`text-sm font-bold pb-2 border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-[#E2702E] text-[#E2702E]'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Reviews ({product.reviewCount || 0})
          </button>
        </div>

        <div className="prose max-w-none text-gray-600">
          {activeTab === 'description' ? (
            <p>{product.description}</p>
          ) : (
            <ProductReviews productId={product.id} />
          )}
        </div>
      </div>

      {/* Related Products */}
      {product.related && product.related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <RelatedProducts products={product.related} />
        </div>
      )}
    </div>
  );
}