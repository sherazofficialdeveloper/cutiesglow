'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { CATEGORIES } from '@/config/constants';

const ProductForm = ({ product, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: product || {
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Product form error:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  return (
    <div style={containerStyles}>
      <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing[6] }}>
        {product ? 'Edit Product' : 'Add Product'}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={formStyles}>
        <Input
          label="Product Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <Input
          label="Description"
          {...register('description', { required: 'Description is required' })}
          error={errors.description?.message}
        />
        <Input
          label="Price"
          type="number"
          {...register('price', { required: 'Price is required', min: 0 })}
          error={errors.price?.message}
        />
        <div>
          <label style={{ display: 'block', fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium, color: colors.text.secondary, marginBottom: spacing[1] }}>
            Category
          </label>
          <select
            {...register('category', { required: 'Category is required' })}
            style={{ width: '100%', padding: spacing[3], border: `1px solid ${colors.border.light}`, borderRadius: '8px' }}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span style={{ color: '#DC2626', fontSize: typography.fontSize.sm }}>{errors.category.message}</span>}
        </div>
        <Input
          label="Stock"
          type="number"
          {...register('stock', { required: 'Stock is required', min: 0 })}
          error={errors.stock?.message}
        />
        <Input
          label="Image URL"
          {...register('image')}
          error={errors.image?.message}
        />
        <Button type="submit" variant="primary" size="large" loading={loading}>
          {product ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </div>
  );
};

ProductForm.displayName = 'ProductForm';

export default ProductForm;