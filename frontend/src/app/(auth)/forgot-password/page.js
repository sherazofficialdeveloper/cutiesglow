'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // ✅ Correct import
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { sendOTP } from '@/services/authService';
import { colors } from '@/config/theme/colors';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    setEmail(data.email);

    try {
      await sendOTP(data.email);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(data.email)}`);
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to send OTP. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Check your email!</h3>
          <p className="text-sm text-gray-600 mt-2">
            We've sent a 6-digit OTP to <strong>{email}</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">Redirecting to reset password page...</p>
          <Link href={`/reset-password?email=${encodeURIComponent(email)}`}
                className="mt-4 inline-block text-sm font-medium hover:underline"
                style={{ color: colors.primary }}>
            Click here if not redirected
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter your email and we'll send you an OTP to reset your password.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your registered email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            error={errors.email?.message}
          />

          <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
            Send OTP
          </Button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Remember your password?{' '}
          <Link href="/login" className="font-medium hover:underline" style={{ color: colors.primary }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}