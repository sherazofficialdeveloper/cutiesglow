// add/page.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AddBeforeAfterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.createBeforeAfterItem(data);
      router.push('/admin/before-after');
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Before/After Item</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Before Image URL" {...register('beforeImage', { required: 'Before image is required' })} error={errors.beforeImage?.message} />
        <Input label="After Image URL" {...register('afterImage', { required: 'After image is required' })} error={errors.afterImage?.message} />
        <Input label="Description" {...register('description', { required: 'Description is required' })} error={errors.description?.message} />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Create Item
        </Button>
      </form>
    </div>
  );
}
