'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import authService from '@/services/authService';
import { colors } from '@/config/theme/colors'; // ✅ Added

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      await authService.forgotPassword(data.email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-bold text-green-600">Check your email</h3>
        <p className="text-sm text-gray-600 mt-2">We've sent you a password reset link.</p>
        <Link href="/login" className="text-sm font-medium mt-4 inline-block" style={{ color: colors.primary }}>
          Back to Sign in
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900">Reset password</h2>
      <p className="text-sm text-center text-gray-600">Enter your email to receive a reset link.</p>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
          Send Reset Link
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600">
        <Link href="/login" className="font-medium" style={{ color: colors.primary }}>
          Back to Sign in
        </Link>
      </p>
    </>
  );
}