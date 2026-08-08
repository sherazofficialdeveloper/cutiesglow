'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          error={errors.password?.message}
        />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Sign In
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium" style={{ color: colors.primary }}>
          Register
        </Link>
      </p>
      <p className="text-sm text-center text-gray-600">
        <Link href="/forgot-password" className="font-medium" style={{ color: colors.primary }}>
          Forgot password?
        </Link>
      </p>
    </div>
  );
}