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
  const { register, handleSubmit, formState: { errors }, watch, trigger } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const password = watch('password');

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // ✅ Register – token auto-stored in AuthContext
      await signUp(data.name, data.email, data.password);
      // ✅ Direct redirect (no extra login)
      router.push('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed.';
      if (msg.includes('already exists') || err.response?.status === 409) {
        setError('This email is already registered. Please login instead.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">Create your account</h2>

      {error && (
        <div className={`text-sm p-3 rounded-lg text-center border ${
          error.includes('already registered')
            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
            : 'bg-red-50 text-red-600 border-red-200'
        }`}>
          {error}
          {error.includes('already registered') && (
            <Link href="/login" className="font-bold ml-1 underline" style={{ color: colors.primary }}>
              Sign in here
            </Link>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
          error={errors.name?.message}
          onBlur={() => trigger('name')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
          error={errors.email?.message}
          onBlur={() => trigger('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password (min 6 characters)"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
            validate: {
              hasNumber: (value) => /\d/.test(value) || 'Password must contain at least one number',
              hasUppercase: (value) => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
            },
          })}
          error={errors.password?.message}
          onBlur={() => trigger('password')}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          error={errors.confirmPassword?.message}
          onBlur={() => trigger('confirmPassword')}
        />

        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Register
        </Button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-medium hover:underline" style={{ color: colors.primary }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}