'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Check, Minus, Plus, X, Truck, Shield, RefreshCw } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import Button from '@/components/common/Button/Button';
import { useCart } from '@/hooks/useCart';

const AddToCart = ({ product, onAddToCart, variant = 'default' }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { addToCart } = useCart();

  const {
    id,
    name,
    price,
    inStock = true,
    variants = [],
  } = product;

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => Math.min(prev + 1, 10));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = async () => {
    if (!inStock) return;
    
    setIsLoading(true);
    try {
      await addToCart({
        productId: id,
        quantity,
      });
      if (onAddToCart) {
        onAddToCart(product, quantity);
      }
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyles = {
    backgroundColor: colors.white,
    padding: spacing[4],
    borderRadius: '12px',
  };

  const priceContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[3],
    marginBottom: spacing[4],
  };

  const priceStyles = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.primary,
  };

  const stockStyles = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: inStock ? '#10B981' : '#DC2626',
  };

  const quantityContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[4],
  };

  const quantityLabelStyles = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
    marginRight: spacing[2],
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

  const uspContainerStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[2],
    marginTop: spacing[4],
    paddingTop: spacing[4],
    borderTop: `1px solid ${colors.border.light}`,
  };

  const uspItemStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing[0.5],
  };

  const uspIconStyles = {
    color: colors.primary,
  };

  const uspLabelStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    textAlign: 'center',
  };

  const uspItems = [
    { icon: Truck, label: 'Free Shipping' },
    { icon: Shield, label: 'Secure Payment' },
    { icon: RefreshCw, label: 'Easy Returns' },
  ];

  if (!inStock) {
    return (
      <div style={containerStyles}>
        <div style={{ textAlign: 'center', padding: spacing[4] }}>
          <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.bold, color: '#DC2626', marginBottom: spacing[2] }}>
            Out of Stock
          </div>
          <p style={{ color: colors.text.muted, fontSize: typography.fontSize.sm }}>
            This product is currently unavailable. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: spacing[6],
            right: spacing[6],
            backgroundColor: colors.primary,
            color: colors.white,
            padding: `${spacing[3]} ${spacing[4]}`,
            borderRadius: '50px',
            boxShadow: '0 4px 20px rgba(226,113,46,0.3)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: spacing[2],
            cursor: 'pointer',
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            zIndex: 40,
          }}
        >
          <ShoppingBag size={20} />
          Add to Cart
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <div 
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  zIndex: 41,
                }}
                onClick={() => setIsOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                style={{
                  position: 'fixed',
                  bottom: spacing[4],
                  left: spacing[4],
                  right: spacing[4],
                  backgroundColor: colors.white,
                  padding: spacing[3],
                  borderRadius: '16px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                  zIndex: 50,
                  border: `1px solid ${colors.border.light}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[3] }}>
                  <div>
                    <div style={{ fontWeight: typography.fontWeight.bold }}>{name}</div>
                    <div style={{ color: colors.primary, fontWeight: typography.fontWeight.extrabold }}>${price.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{ background: 'none', border: 'none', color: colors.text.muted, cursor: 'pointer' }}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing[3] }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
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
                  <Button
                    variant="primary"
                    size="medium"
                    fullWidth
                    loading={isLoading}
                    onClick={handleAddToCart}
                    icon={isAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
                  >
                    {isAdded ? 'Added!' : 'Add to Cart'}
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <div style={containerStyles}>
      <div style={priceContainerStyles}>
        <span style={priceStyles}>${price.toFixed(2)}</span>
        <span style={stockStyles}>{inStock ? 'In Stock' : 'Out of Stock'}</span>
      </div>

      <div style={quantityContainerStyles}>
        <span style={quantityLabelStyles}>Quantity</span>
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

      <Button
        variant="primary"
        size="large"
        fullWidth
        loading={isLoading}
        onClick={handleAddToCart}
        icon={isAdded ? <Check size={20} /> : <ShoppingBag size={20} />}
      >
        {isAdded ? 'Added to Cart!' : 'Add to Cart'}
      </Button>

      <div style={uspContainerStyles}>
        {uspItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} style={uspItemStyles}>
              <Icon size={18} style={uspIconStyles} />
              <span style={uspLabelStyles}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

AddToCart.displayName = 'AddToCart';

export default AddToCart;