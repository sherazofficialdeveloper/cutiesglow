'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { adminService } from '@/services/adminService';

export default function PaymentSettingsPage() {
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
      alert('Payment settings updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="font-bold text-lg mt-4">PayPal</h3>
        <Input label="PayPal Client ID" {...register('paypalClientId')} />
        <Input label="PayPal Secret" type="password" {...register('paypalSecret')} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PayPal Mode</label>
          <select {...register('paypalMode')} className="w-full p-3 border border-gray-300 rounded-lg">
            <option value="sandbox">Sandbox (Testing)</option>
            <option value="live">Live</option>
          </select>
        </div>

        <h3 className="font-bold text-lg mt-6">Zelle</h3>
        <Input label="Zelle Email" {...register('zelleEmail')} />
        <Input label="Zelle Phone" {...register('zellePhone')} />
        <Input label="Zelle Instructions" {...register('zelleInstructions')} />

        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Save Payment Settings
        </Button>
      </form>
    </div>
  );
}