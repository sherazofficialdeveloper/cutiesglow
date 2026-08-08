'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import adminService from '@/services/adminService';

export default function GeneralSettingsPage() {
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
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">General Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Site Name" {...register('siteName')} error={errors.siteName?.message} />
        <Input label="Tagline" {...register('tagline')} />
        <Input label="Contact Email" type="email" {...register('contactEmail')} error={errors.contactEmail?.message} />
        <Input label="Contact Phone" {...register('contactPhone')} />
        <Input label="Address" {...register('address')} />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Save Settings
        </Button>
      </form>
    </div>
  );
}