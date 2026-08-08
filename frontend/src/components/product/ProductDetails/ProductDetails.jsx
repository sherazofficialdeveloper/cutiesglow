'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Share2, Check, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Button from '@/components/common/Button/Button';
import RatingStars from '@/components/common/RatingStars/RatingStars';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const {
    id,
    name,
    price,
    originalPrice,
    category,
    description,
    images = [],
    rating,
    reviewCount,
    inStock = true,
    variants = [],
    features = [],
    sku,
    tags = [],
  } = product;

  const mainImage = images[selectedImage] || product.image || '/images/default-product.jpg';
  const discountPercent = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => Math.min(prev + 1, 10));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart({
        productId: id,
        quantity,
        variant: selectedVariant,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const containerStyles = {
    backgroundColor: colors.white,
    padding: spacing[6],
    borderRadius: '16px',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing[8],
  };

  const galleryStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  const mainImageContainerStyles = {
    position: 'relative',
    aspectRatio: '1/1',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#F9FAFB',
    border: `1px solid ${colors.border.light}`,
  };

  const mainImageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const thumbnailContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: spacing[2],
  };

  const thumbnailStyles = (isActive) => ({
    aspectRatio: '1/1',
    borderRadius: '8px',
    overflow: 'hidden',
    border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.border.light}`,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: isActive ? 1 : 0.6,
  });

  const thumbnailImageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const infoStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  const categoryStyles = {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const nameStyles = {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.primary,
    lineHeight: typography.lineHeight.tight,
  };

  const ratingContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const ratingTextStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
  };

  const priceContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
  };

  const currentPriceStyles = {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
  };

  const originalPriceStyles = {
    fontSize: typography.fontSize.lg,
    color: colors.text.muted,
    textDecoration: 'line-through',
  };

  const discountBadgeStyles = {
    padding: `${spacing[0.5]} ${spacing[2]}`,
    borderRadius: '6px',
    backgroundColor: '#D1FAE5',
    color: '#065F46',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  };

  const descriptionStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed,
  };

  const featuresContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  };

  const featureStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  };

  const variantContainerStyles = {
    display: 'flex',
    gap: spacing[2],
    flexWrap: 'wrap',
  };

  const variantButtonStyles = (isSelected) => ({
    padding: `${spacing[2]} ${spacing[4]}`,
    borderRadius: '8px',
    border: isSelected ? `2px solid ${colors.primary}` : `1px solid ${colors.border.light}`,
    backgroundColor: isSelected ? '#FFF8F2' : colors.white,
    color: isSelected ? colors.primary : colors.text.secondary,
    fontSize: typography.fontSize.sm,
    fontWeight: isSelected ? typography.fontWeight.bold : typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  const quantityContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const quantityButtonStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: `1px solid ${colors.border.light}`,
    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };

  const quantityDisplayStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    minWidth: '40px',
    textAlign: 'center',
  };

  const actionContainerStyles = {
    display: 'flex',
    gap: spacing[3],
    flexWrap: 'wrap',
  };

  const actionButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    padding: `${spacing[3]} ${spacing[6]}`,
    borderRadius: '12px',
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.sm,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
  };

  const uspContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: '#F9FAFB',
    borderRadius: '12px',
  };

  const uspItemStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: spacing[1],
  };

  const uspIconStyles = {
    color: colors.primary,
  };

  const uspLabelStyles = {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
  };

  const uspItems = [
    { icon: Truck, label: 'Free Shipping' },
    { icon: Shield, label: 'Secure Payment' },
    { icon: RefreshCw, label: '30-Day Returns' },
  ];

  return (
    <div style={containerStyles}>
      <div style={gridStyles}>
        <div style={galleryStyles}>
          <div style={mainImageContainerStyles}>
            <img
              src={mainImage}
              alt={name}
              style={mainImageStyles}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x600/E2712E/FFFFFF?text=Product';
              }}
            />
          </div>
          
          {images.length > 1 && (
            <div style={thumbnailContainerStyles}>
              {images.map((img, index) => (
                <div
                  key={index}
                  style={thumbnailStyles(selectedImage === index)}
                  onClick={() => setSelectedImage(index)}
                  onMouseEnter={(e) => {
                    if (selectedImage !== index) {
                      e.currentTarget.style.borderColor = colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedImage !== index) {
                      e.currentTarget.style.borderColor = colors.border.light;
                    }
                  }}
                >
                  <img
                    src={img}
                    alt={`${name} - ${index + 1}`}
                    style={thumbnailImageStyles}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={infoStyles}>
          <div>
            <div style={categoryStyles}>{category}</div>
            <h1 style={nameStyles}>{name}</h1>
            
            <div style={ratingContainerStyles}>
              <RatingStars rating={rating || 0} size={20} />
              <span style={ratingTextStyles}>
                {reviewCount || 0} reviews
              </span>
            </div>
          </div>

          <div style={priceContainerStyles}>
            <span style={currentPriceStyles}>${price?.toFixed(2) || '0.00'}</span>
            {originalPrice && (
              <span style={originalPriceStyles}>${originalPrice.toFixed(2)}</span>
            )}
            {discountPercent > 0 && (
              <span style={discountBadgeStyles}>Save {discountPercent}%</span>
            )}
          </div>

          <p style={descriptionStyles}>{description}</p>

          {features.length > 0 && (
            <div style={featuresContainerStyles}>
              {features.map((feature, index) => (
                <div key={index} style={featureStyles}>
                  <Check size={16} color={colors.primary} />
                  {feature}
                </div>
              ))}
            </div>
          )}

          {variants.length > 0 && (
            <div>
              <div style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                color: colors.text.secondary,
                marginBottom: spacing[2],
              }}>
                Select Option
              </div>
              <div style={variantContainerStyles}>
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    style={variantButtonStyles(selectedVariant?.id === variant.id)}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <div style={{
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.secondary,
              marginBottom: spacing[2],
            }}>
              Quantity
            </div>
            <div style={quantityContainerStyles}>
              <button
                style={quantityButtonStyles}
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span style={quantityDisplayStyles}>{quantity}</span>
              <button
                style={quantityButtonStyles}
                onClick={() => handleQuantityChange('increase')}
                disabled={quantity >= 10}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div style={actionContainerStyles}>
            <Button
              variant="primary"
              size="large"
              loading={isAddingToCart}
              disabled={!inStock || isAddingToCart}
              onClick={handleAddToCart}
              icon={addedToCart ? <Check size={20} /> : <ShoppingBag size={20} />}
              style={{ flex: 1 }}
            >
              {addedToCart ? 'Added!' : inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            <button
              style={{
                ...actionButtonStyles,
                backgroundColor: isWishlisted(id) ? '#FEE2E2' : '#F3F4F6',
                color: isWishlisted(id) ? '#DC2626' : colors.text.secondary,
              }}
              onClick={() => toggleWishlist(id)}
            >
              <Heart 
                size={20} 
                fill={isWishlisted(id) ? '#DC2626' : 'none'}
              />
            </button>
            
            <button
              style={{
                ...actionButtonStyles,
                backgroundColor: '#F3F4F6',
                color: colors.text.secondary,
              }}
            >
              <Share2 size={20} />
            </button>
          </div>

          <div style={uspContainerStyles}>
            {uspItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} style={uspItemStyles}>
                  <Icon size={20} style={uspIconStyles} />
                  <span style={uspLabelStyles}>{item.label}</span>
                </div>
              );
            })}
          </div>

          {sku && <div style={{ fontSize: typography.fontSize.xs, color: colors.text.muted }}>SKU: {sku}</div>}
          
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <span key={tag} style={{
                  padding: `${spacing[1]} ${spacing[3]}`,
                  borderRadius: '9999px',
                  backgroundColor: '#F3F4F6',
                  fontSize: typography.fontSize.xs,
                  color: colors.text.secondary,
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails;