'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';

export default function AddCategoryPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.createCategory(data);
      router.push('/admin/categories');
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Category Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <Input
          label="Slug (optional)"
          {...register('slug')}
          helperText="If left blank, slug will be generated automatically"
        />
        <Input
          label="Description"
          {...register('description')}
        />
        <Input
          label="Image URL"
          {...register('image')}
        />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Create Category
        </Button>
      </form>
    </div>
  );
}