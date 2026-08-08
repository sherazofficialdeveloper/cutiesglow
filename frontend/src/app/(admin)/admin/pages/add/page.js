// add/page.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AddPagePage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.createPage(data);
      router.push('/admin/pages');
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Title" {...register('title', { required: 'Title is required' })} error={errors.title?.message} />
        <Input label="Slug" {...register('slug', { required: 'Slug is required' })} error={errors.slug?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea {...register('content')} rows={10} className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('isPublished')} id="isPublished" defaultChecked />
          <label htmlFor="isPublished" className="text-sm text-gray-700">Published</label>
        </div>
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Create Page
        </Button>
      </form>
    </div>
  );
}
