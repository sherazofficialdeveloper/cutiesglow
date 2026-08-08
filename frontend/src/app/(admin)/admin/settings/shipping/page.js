'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function ShippingSettingsPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await adminService.getSettings();
        reset(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await adminService.updateSettings(data);
      alert('Shipping settings updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Shipping Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Free Shipping Threshold" type="number" {...register('freeShippingThreshold')} />
        <Input label="Standard Shipping Cost" type="number" {...register('standardShippingCost')} />
        <Input label="Express Shipping Cost" type="number" {...register('expressShippingCost')} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Available Countries</label>
          <Input placeholder="US, CA, GB, PK" {...register('availableCountries')} helperText="Comma-separated country codes" />
        </div>
        <Input label="Estimated Delivery Days" {...register('estimatedDeliveryDays')} />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Save Shipping Settings
        </Button>
      </form>
    </div>
  );
}