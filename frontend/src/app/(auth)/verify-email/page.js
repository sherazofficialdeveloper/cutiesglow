'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/authService';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification token.');
      return;
    }
    const verify = async () => {
      try {
        await authService.verifyEmail(token);
        setStatus('success');
        setMessage('Email verified successfully!');
        setTimeout(() => router.push('/login'), 3000);
      } catch (err) {
        setStatus('error');
        setMessage(err.message || 'Verification failed.');
      }
    };
    verify();
  }, [token]);

  if (status === 'verifying') {
    return <div className="text-center">Verifying your email...</div>;
  }

  return (
    <div className="text-center">
      <h3 className={`text-lg font-bold ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
        {message}
      </h3>
      {status === 'success' ? (
        <p className="text-sm text-gray-600 mt-2">You can now sign in.</p>
      ) : (
        <p className="text-sm text-gray-600 mt-2">
          <Link href="/login" className="font-medium" style={{ color: colors.primary }}>
            Go to Sign in
          </Link>
        </p>
      )}
    </div>
  );
}