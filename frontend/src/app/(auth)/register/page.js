'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { register: signUp } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signUp(data.name, data.email, data.password);
      router.push('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">Create your account</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        <Input
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register('confirmPassword', { required: 'Please confirm password' })}
          error={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Register
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium" style={{ color: colors.primary }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}