'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { authService } from '@/services/authService';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await authService.resetPassword(token, data.password);
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      setError(err.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-bold text-green-600">Password reset successful!</h3>
        <p className="text-sm text-gray-600 mt-2">You can now sign in with your new password.</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-gray-900">Set new password</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="New Password"
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
        <Button type="submit" variant="primary" size="large" fullWidth loading={loading} disabled={!token}>
          Reset Password
        </Button>
      </form>
    </>
  );
}