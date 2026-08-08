
// edit/[id]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function EditBeforeAfterPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await adminService.getBeforeAfterItem(id);
        reset(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchItem();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.updateBeforeAfterItem(id, data);
      router.push('/admin/before-after');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Before/After Item</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Before Image URL" {...register('beforeImage', { required: 'Before image is required' })} error={errors.beforeImage?.message} />
        <Input label="After Image URL" {...register('afterImage', { required: 'After image is required' })} error={errors.afterImage?.message} />
        <Input label="Description" {...register('description', { required: 'Description is required' })} error={errors.description?.message} />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Update Item
        </Button>
      </form>
    </div>
  );
}