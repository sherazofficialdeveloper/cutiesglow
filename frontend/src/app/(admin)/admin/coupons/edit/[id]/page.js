
// edit/[id]/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function EditCouponPage() {
  const { id } = useParams();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const data = await adminService.getCoupon(id);
        reset(data);
      } catch (error) {
        console.error('Error fetching coupon:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchCoupon();
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.updateCoupon(id, data);
      router.push('/admin/coupons');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Coupon</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Code" {...register('code', { required: 'Code is required' })} error={errors.code?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select {...register('type', { required: 'Type is required' })} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
        <Input label="Value" type="number" {...register('value', { required: 'Value is required', min: 0 })} error={errors.value?.message} />
        <Input label="Max Uses" type="number" {...register('maxUses')} />
        <Input label="Expires At" type="date" {...register('expiresAt')} />
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('isActive')} id="isActive" />
          <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
        </div>
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Update Coupon
        </Button>
      </form>
    </div>
  );
}