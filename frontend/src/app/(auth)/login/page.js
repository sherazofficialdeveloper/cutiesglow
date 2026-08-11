'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { colors } from '@/config/theme/colors';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await login(data.email, data.password);
      // ✅ No manual redirect needed — useEffect will handle it
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Invalid email or password. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">Sign in to your account</h2>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="Enter your password"
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
          })}
          error={errors.password?.message}
          onBlur={() => trigger('password')}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 text-[#E2702E] focus:ring-[#E2702E]"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
          </div>
          <Link href="/forgot-password" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Sign In
        </Button>
      </form>

      <p className="text-sm text-center text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium hover:underline" style={{ color: colors.primary }}>
          Register
        </Link>
      </p>
    </div>
  );
}