// add/page.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AddVideoPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.createVideo(data);
      router.push('/admin/videos');
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Video</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Title" {...register('title', { required: 'Title is required' })} error={errors.title?.message} />
        <Input label="YouTube URL" {...register('url', { required: 'URL is required' })} error={errors.url?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select {...register('type', { required: 'Type is required' })} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="homepage">Homepage</option>
            <option value="product">Product</option>
          </select>
        </div>
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Create Video
        </Button>
      </form>
    </div>
  );
}