'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';

const ProfileForm = () => {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    maxWidth: '500px',
    margin: '0 auto',
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  return (
    <div style={containerStyles}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: spacing[6] }}>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <Input
          label="Full Name"
          {...register('name', { required: 'Name is required' })}
          error={errors.name?.message}
        />
        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
        <Button type="submit" variant="primary" size="large" loading={loading}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};

ProfileForm.displayName = 'ProfileForm';

export default ProfileForm;