
// edit/[id]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function EditPagePage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await adminService.getPage(id);
        reset(data);
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchPage();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.updatePage(id, data);
      router.push('/admin/pages');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Title" {...register('title', { required: 'Title is required' })} error={errors.title?.message} />
        <Input label="Slug" {...register('slug', { required: 'Slug is required' })} error={errors.slug?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea {...register('content')} rows={10} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('isPublished')} id="isPublished" />
          <label htmlFor="isPublished" className="text-sm text-gray-700">Published</label>
        </div>
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Update Page
        </Button>
      </form>
    </div>
  );
}