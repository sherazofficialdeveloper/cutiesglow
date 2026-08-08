'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { getProducts } from '@/services/productService';

const FeaturedProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { items } = await getProducts({ limit: 50 });
        setAllProducts(items);
        const uniqueCats = [...new Set(items.map(p => p.category))];
        setCategories(uniqueCats);
        setDisplayProducts(items);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
          alert('⚠️ Unable to connect to server. Please check your backend.');
        }
        setAllProducts([]);
        setDisplayProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setDisplayProducts(allProducts);
    } else {
      setDisplayProducts(allProducts.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, allProducts]);

  // ✅ Add to Cart Handler
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
      alert(`✅ "${product.name}" added to cart successfully!`);
    } catch (error) {
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        alert(`🛒 "${product.name}" added to cart (Backend not connected). Items saved locally.`);
      } else if (error.response) {
        alert(`❌ Failed to add "${product.name}" to cart: ${error.response?.data?.message || 'Server error'}`);
      } else {
        alert(`❌ Failed to add "${product.name}" to cart: ${error.message}`);
      }
    }
  };

  // ✅ Wishlist Handler with login check
  const handleToggleWishlist = (productId) => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('🔒 Please login to add favorites.');
      return;
    }
    toggleWishlist(productId);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 bg-white" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: '#E2702E', borderTopColor: 'transparent' }} />
          <p className="mt-4 text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  if (allProducts.length === 0) {
    return (
      <section className="py-16 bg-white" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">No products available.</p>
        </div>
      </section>
    );
  }

  const productsToShow = displayProducts.slice(0, 6);

  return (
    <section className="py-16 bg-white" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Our Collection</h2>
          <p className="text-gray-600 mt-2">Discover our premium skincare essentials</p>
        </div>

        {/* Category Filter Buttons */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === 'All'
                  ? 'bg-[#E2702E] text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#E2702E] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {productsToShow.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No products in this category.</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          >
            {productsToShow.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  isWishlisted={isWishlisted(product.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

FeaturedProducts.displayName = 'FeaturedProducts';
export default FeaturedProducts;