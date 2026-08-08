'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';

const SettingsForm = ({ settings, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: settings || {
      siteName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      zelleEmail: '',
      paypalClientId: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Settings update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  return (
    <div style={containerStyles}>
      <h2 style={{ fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold, marginBottom: spacing[6] }}>
        Site Settings
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={formStyles}>
        <Input
          label="Site Name"
          {...register('siteName', { required: 'Site name is required' })}
          error={errors.siteName?.message}
        />
        <Input
          label="Contact Email"
          type="email"
          {...register('contactEmail', { required: 'Email is required' })}
          error={errors.contactEmail?.message}
        />
        <Input
          label="Contact Phone"
          {...register('contactPhone')}
        />
        <Input
          label="Address"
          {...register('address')}
        />
        <Input
          label="Zelle Email"
          {...register('zelleEmail')}
        />
        <Input
          label="PayPal Client ID"
          {...register('paypalClientId')}
        />
        <Button type="submit" variant="primary" size="large" loading={loading}>
          Save Settings
        </Button>
      </form>
    </div>
  );
};

SettingsForm.displayName = 'SettingsForm';

export default SettingsForm;