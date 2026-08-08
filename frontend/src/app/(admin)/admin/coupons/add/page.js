// add/page.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function AddCouponPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.createCoupon(data);
      router.push('/admin/coupons');
    } catch (error) {
      console.error('Create error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Coupon</h1>
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
          <input type="checkbox" {...register('isActive')} id="isActive" defaultChecked />
          <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
        </div>
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Create Coupon
        </Button>
      </form>
    </div>
  );
}
