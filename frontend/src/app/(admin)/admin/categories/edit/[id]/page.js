'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await adminService.getCategory(id);
        reset(data);
      } catch (error) {
        console.error('Error fetching category:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchCategory();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.updateCategory(id, data);
      router.push('/admin/categories');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Category Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <Input
          label="Slug"
          {...register('slug')}
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
          Update Category
        </Button>
      </form>
    </div>
  );
}