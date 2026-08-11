'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { resetPasswordWithOTP, resendOTP } from '@/services/authService';
import { colors } from '@/config/theme/colors';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // 🛑 Redirect prevention — if no email, show error
  useEffect(() => {
    if (!email) {
      setError('Email is required. Please go back to forgot password page.');
    }
  }, [email]);

  // ✅ Timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // ✅ Verify OTP and reset password
      await resetPasswordWithOTP(email, data.otp, data.password);
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Invalid OTP or password reset failed.';
      if (msg.toLowerCase().includes('expired') || msg.toLowerCase().includes('invalid')) {
        setError('OTP has expired or is invalid. Please request a new OTP.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) return;
    if (timer > 0) return;

    setResendLoading(true);
    setError('');
    try {
      await resendOTP(email);
      setTimer(60); // 60 seconds cooldown
      setError('');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to resend OTP.';
      setError(msg);
    } finally {
      setResendLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-green-600">Password Reset Successful!</h3>
          <p className="text-sm text-gray-600 mt-2">Your password has been reset. You can now sign in with your new password.</p>
          <Link href="/login" className="mt-4 inline-block text-sm font-medium hover:underline" style={{ color: colors.primary }}>
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Invalid Access</h3>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
          <Link href="/forgot-password" className="mt-4 inline-block text-sm font-medium hover:underline" style={{ color: colors.primary }}>
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-md border border-gray-200">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter the OTP sent to <strong>{email}</strong> and your new password.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="OTP Code"
            type="text"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            {...register('otp', {
              required: 'OTP is required',
              minLength: { value: 6, message: 'OTP must be 6 digits' },
              maxLength: { value: 6, message: 'OTP must be 6 digits' },
              pattern: { value: /^\d+$/, message: 'OTP must contain only numbers' },
            })}
            error={errors.otp?.message}
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Didn't receive OTP?</span>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendLoading || timer > 0}
              className={`text-sm font-medium transition-colors ${
                timer > 0 || resendLoading
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'hover:underline'
              }`}
              style={{ color: timer > 0 || resendLoading ? undefined : colors.primary }}
            >
              {resendLoading ? 'Sending...' : timer > 0 ? `Resend (${timer}s)` : 'Resend OTP'}
            </button>
          </div>

          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password (min 6 characters)"
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Minimum 6 characters' },
              validate: {
                hasNumber: (value) => /\d/.test(value) || 'Must contain at least one number',
                hasUppercase: (value) => /[A-Z]/.test(value) || 'Must contain at least one uppercase letter',
              },
            })}
            error={errors.password?.message}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your new password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => {
                const password = watch('password');
                return value === password || 'Passwords do not match';
              },
            })}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" variant="primary" size="large" fullWidth loading={loading}>
            Reset Password
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