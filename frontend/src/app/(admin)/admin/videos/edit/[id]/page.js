
// edit/[id]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function EditVideoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await adminService.getVideo(id);
        reset(data);
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchVideo();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.updateVideo(id, data);
      router.push('/admin/videos');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Video</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Title" {...register('title', { required: 'Title is required' })} error={errors.title?.message} />
        <Input label="YouTube URL" {...register('url', { required: 'URL is required' })} error={errors.url?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select {...register('type')} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="homepage">Homepage</option>
            <option value="product">Product</option>
          </select>
        </div>
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Update Video
        </Button>
      </form>
    </div>
  );
}