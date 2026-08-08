'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function EditBannerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const data = await adminService.getBanner(id);
        reset(data);
      } catch (error) {
        console.error('Error fetching banner:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchBanner();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.updateBanner(id, data);
      router.push('/admin/banners');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Banner</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Title" {...register('title', { required: 'Title is required' })} error={errors.title?.message} />
        <Input label="Image URL" {...register('image', { required: 'Image URL is required' })} error={errors.image?.message} />
        <Input label="Link (optional)" {...register('link')} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select {...register('type')} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="hero">Hero</option>
            <option value="promo">Promo</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('isActive')} id="isActive" />
          <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
        </div>
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Update Banner
        </Button>
      </form>
    </div>
  );
}