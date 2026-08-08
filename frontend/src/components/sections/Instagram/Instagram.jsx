'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Instagram as InstagramIcon, X, ShoppingBag } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import Container from '@/components/common/Container/Container';

const Instagram = () => {
  const [activeReel, setActiveReel] = useState(null);

  // Sample reels data (same structure as reference)
  const reels = [
    {
      id: 1,
      title: 'Glow in 3 Minutes Routine ✨',
      handle: '@cutishbyrazias',
      videoPoster: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop',
      productId: 'prod-1',
    },
    {
      id: 2,
      title: 'Whitening Cream Transformation 🌟',
      handle: '@cutishbyrazias',
      videoPoster: 'https://images.unsplash.com/photo-1596462502278-6ec7a4e9d14b?w=400&h=400&fit=crop',
      productId: 'prod-2',
    },
    {
      id: 3,
      title: 'Oat Milk Honey Soap Review 🧼',
      handle: '@cutishbyrazias',
      videoPoster: 'https://images.unsplash.com/photo-1601612628463-20b8ae7e5d38?w=400&h=400&fit=crop',
      productId: 'prod-3',
    },
    {
      id: 4,
      title: 'Skin Firming Routine 💪',
      handle: '@cutishbyrazias',
      videoPoster: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      productId: 'prod-4',
    },
    {
      id: 5,
      title: 'The Ultimate Glow Kit ✨',
      handle: '@cutishbyrazias',
      videoPoster: 'https://images.unsplash.com/photo-1584522320722-4f39af5a46c0?w=400&h=400&fit=crop',
      productId: 'prod-5',
    },
  ];

  // Sample products data (matching productId)
  const products = [
    {
      id: 'prod-1',
      name: 'Ready 2 White All-in-One Jar',
      price: 19.50,
      originalPrice: 24.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
    },
    {
      id: 'prod-2',
      name: 'Ready 2 White Milky Whitening Cream',
      price: 17.50,
      originalPrice: 22.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
    },
    {
      id: 'prod-3',
      name: 'Oat Milk & Honey Soap',
      price: 12.99,
      originalPrice: 16.99,
      image: 'https://images.unsplash.com/photo-1601612628463-20b8ae7e5d38?w=200&h=200&fit=crop',
    },
    {
      id: 'prod-4',
      name: 'Skin Firming Cream',
      price: 29.99,
      originalPrice: 37.99,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
    },
    {
      id: 'prod-5',
      name: 'Ultimate Glow Kit',
      price: 114.99,
      originalPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1584522320722-4f39af5a46c0?w=200&h=200&fit=crop',
    },
  ];

  const getProductForReel = (reel) => {
    if (reel.productId) {
      const found = products.find((p) => p.id === reel.productId);
      if (found) return found;
    }
    return products[0];
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product.name);
    // You can add toast notification here
  };

  return (
    <section id="instagram-reels" className="py-12 sm:py-16 bg-white relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 bg-rose-50 border border-rose-100 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2" style={{ color: colors.primary }}>
            <InstagramIcon className="w-3.5 h-3.5" style={{ color: colors.primary }} />
            <span>@cutishbyrazias</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Follow On Instagram
          </h2>
        </div>

        {/* 5 Reels Grid - Exactly like reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4.5">
          {reels.slice(0, 5).map((reel, idx) => {
            const product = getProductForReel(reel);
            const discountPercent = product.originalPrice 
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 19;

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="bg-white rounded-xl border border-gray-300/90 shadow-2xs hover:shadow-lg hover:border-gray-400 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-[3/4.2] w-full overflow-hidden bg-gray-100">
                  
                  {/* Discount Badge */}
                  <div className="absolute top-0 left-0 z-10 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-br-md shadow-xs" style={{ backgroundColor: colors.primary }}>
                    {discountPercent}% OFF
                  </div>

                  {/* Video Poster */}
                  <img
                    src={reel.videoPoster}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform" style={{ color: colors.primary }}>
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Product Thumbnail Badge */}
                  <div className="absolute bottom-2 left-2 z-10 bg-white/95 border border-gray-200 rounded-md p-0.5 shadow-xs w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Product Info Below Video */}
                <div className="p-3 bg-white border-t border-gray-200/80 flex flex-col space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-[#E2712E] transition-colors">
                    {product.name}
                  </h4>

                  <div className="flex items-center space-x-1.5 text-xs">
                    <span className="font-extrabold" style={{ color: colors.primary }}>
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through text-[11px] font-medium">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Modal - Same as reference */}
      {activeReel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-gray-200">
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[9/16] w-full bg-gray-900">
              <img
                src={activeReel.videoPoster}
                alt={activeReel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center animate-pulse shadow-xl" style={{ color: colors.primary }}>
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.accent }}>{activeReel.handle}</p>
                <h3 className="text-sm font-extrabold mt-0.5">{activeReel.title}</h3>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold text-gray-900 truncate max-w-[170px]">
                  {getProductForReel(activeReel).name}
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-extrabold" style={{ color: colors.primary }}>
                    ${getProductForReel(activeReel).price.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  const product = getProductForReel(activeReel);
                  handleAddToCart(product);
                  setActiveReel(null);
                }}
                className="text-white px-4 py-2 rounded-full font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center space-x-1.5 hover:shadow-md"
                style={{ backgroundColor: colors.primary }}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

Instagram.displayName = 'Instagram';

export default Instagram;