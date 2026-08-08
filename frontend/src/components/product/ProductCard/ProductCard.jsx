'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Button from '@/components/common/Button/Button';
import RatingStars from '@/components/common/RatingStars/RatingStars';

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product || !product.id) {
    return null;
  }

  const {
    id,
    slug,
    name,
    price,
    originalPrice,
    category,
    rating,
    reviewCount,
    image,
    inStock = true,
    discount,
  } = product;

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : discount || 0;

  // ----- ALL STYLES (inline) -----
  const cardStyles = {
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: `1px solid #e5e7eb`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: isHovered
      ? '0 20px 40px rgba(0,0,0,0.08)'
      : '0 2px 10px rgba(0,0,0,0.04)',
  };

  const imageContainerStyles = {
    position: 'relative',
    aspectRatio: '1/1',
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    cursor: 'default',
  };

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    opacity: imageLoaded ? 1 : 0,
  };

  const placeholderStyles = {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    fontSize: '0.875rem',
  };

  const badgeContainerStyles = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    zIndex: 2,
  };

  const badgeStyles = (type) => ({
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    backgroundColor: type === 'new' ? '#10B981' : '#E2702E',
    color: '#fff',
  });

  const actionButtonsStyles = {
    position: 'absolute',
    top: '12px',
    right: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 2,
    opacity: isHovered ? 1 : 0,
    transform: isHovered ? 'translateX(0)' : 'translateX(10px)',
    transition: 'all 0.3s ease',
  };

  const actionButtonStyles = {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: `1px solid #e5e7eb`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    color: '#6b7280',
  };

  const infoStyles = {
    padding: '16px',
  };

  const categoryStyles = {
    fontSize: '0.75rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '4px',
  };

  const nameStyles = {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '4px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: '1.375',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const ratingContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '8px',
  };

  const ratingTextStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
  };

  const priceContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  };

  const currentPriceStyles = {
    fontSize: '1.25rem',
    fontWeight: '800',
    color: '#E2702E',
  };

  const originalPriceStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    textDecoration: 'line-through',
  };

  const stockBadgeStyles = {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    padding: '2px 8px',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '700',
    backgroundColor: inStock ? '#D1FAE5' : '#FEE2E2',
    color: inStock ? '#065F46' : '#991B1B',
  };

  // ✅ View Detail Page Handler (Eye button)
  const handleViewDetail = () => {
    router.push(`/products/${slug || id}`);
  };

  // ✅ Heart click handler with login check
  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if user is logged in (mock check)
    const token = localStorage.getItem('auth_token');
    if (!token) {
      alert('🔒 Please login to add favorites.');
      return;
    }
    
    if (onToggleWishlist) {
      onToggleWishlist(id);
    }
  };

  return (
    <motion.div
      style={cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      {/* Image Section - No Link */}
      <div style={imageContainerStyles}>
        {!imageLoaded && (
          <div style={placeholderStyles}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: `3px solid #e5e7eb`,
                borderTopColor: '#E2702E',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        )}
        <img
          src={image || '/images/default-product.jpg'}
          alt={name}
          style={imageStyles}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/400x400/E2712E/FFFFFF?text=Product';
          }}
          loading="lazy"
        />

        <div style={badgeContainerStyles}>
          {discountPercent > 0 && (
            <span style={badgeStyles('sale')}>{discountPercent}% OFF</span>
          )}
        </div>

        {/* Action Buttons - Heart & Eye */}
        <div style={actionButtonsStyles}>
          {/* ✅ HEART BUTTON - Red when isWishlisted is true */}
          <button
            style={{
              ...actionButtonStyles,
              backgroundColor: isWishlisted ? '#FEE2E2' : '#fff',
              borderColor: isWishlisted ? '#E2702E' : '#e5e7eb',
            }}
            onClick={handleHeartClick}
            onMouseEnter={(e) => {
              if (!isWishlisted) {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }
            }}
            onMouseLeave={(e) => {
              if (!isWishlisted) {
                e.currentTarget.style.backgroundColor = '#fff';
              }
            }}
          >
            <Heart
              size={18}
              fill={isWishlisted ? '#E2702E' : 'none'}
              color={isWishlisted ? '#E2702E' : '#6b7280'}
            />
          </button>

          {/* Eye Button -> Goes to Detail Page */}
          <button
            style={actionButtonStyles}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleViewDetail();
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            <Eye size={18} color="#6b7280" />
          </button>
        </div>

        <div style={stockBadgeStyles}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </div>
      </div>

      {/* Info Section */}
      <div style={infoStyles}>
        <div style={categoryStyles}>{category}</div>

        {/* ✅ Only Name is Clickable to Detail Page */}
        <Link href={`/products/${slug || id}`} passHref legacyBehavior>
          <a style={nameStyles}>{name}</a>
        </Link>

        <div style={ratingContainerStyles}>
          <RatingStars rating={rating || 0} size={16} />
          <span style={ratingTextStyles}>({reviewCount || 0})</span>
        </div>

        <div style={priceContainerStyles}>
          <span style={currentPriceStyles}>${price?.toFixed(2) || '0.00'}</span>
          {originalPrice && (
            <span style={originalPriceStyles}>
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {discountPercent > 0 && (
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                color: '#10B981',
                backgroundColor: '#D1FAE5',
                padding: '2px 8px',
                borderRadius: '4px',
              }}
            >
              Save {discountPercent}%
            </span>
          )}
        </div>

        <Button
          variant="primary"
          size="medium"
          fullWidth
          disabled={!inStock}
          onClick={() => {
            if (onAddToCart) {
              onAddToCart(product);
            }
          }}
          icon={<ShoppingBag size={18} />}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </motion.div>
  );
};

ProductCard.displayName = 'ProductCard';
export default ProductCard;