'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, X } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { adminService } from '@/services/adminService';
import Button from '@/components/common/Button/Button';

export default function PaymentVerificationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await adminService.getPaymentVerification(id);
        setPayment(data);
      } catch (error) {
        console.error('Error fetching payment:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  const handleVerify = async (status) => {
    setUpdating(true);
    try {
      await adminService.verifyPayment(id, status);
      setPayment({ ...payment, status });
      setTimeout(() => router.push('/admin/payments-verification'), 1500);
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!payment) return <div>Payment record not found.</div>;

  return (
    <div>
      <Link href="/admin/payments-verification" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-6" style={{ color: colors.primary }}>
        <ArrowLeft className="w-4 h-4" />
        Back to Verifications
      </Link>

      <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold">Payment Verification</h1>
            <p className="text-sm text-gray-500">Order #{payment.orderId?.slice(-8)}</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${
            payment.status === 'verified' ? 'bg-green-100 text-green-700' :
            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {payment.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Payment Details</h3>
            <div className="mt-2 space-y-2 text-sm">
              <div><span className="text-gray-500">Amount:</span> <span className="font-bold" style={{ color: colors.primary }}>${payment.amount?.toFixed(2)}</span></div>
              <div><span className="text-gray-500">Transaction ID:</span> <span className="font-mono">{payment.transactionId}</span></div>
              <div><span className="text-gray-500">Method:</span> <span className="capitalize">{payment.paymentMethod || 'Zelle'}</span></div>
              <div><span className="text-gray-500">Submitted:</span> {new Date(payment.createdAt).toLocaleString()}</div>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Customer</h3>
            <div className="mt-2 text-sm">
              <p className="font-medium">{payment.customerName}</p>
              <p className="text-gray-500">{payment.customerEmail}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Payment Proof</h3>
          {payment.proofUrl ? (
            <a href={payment.proofUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors" style={{ color: colors.primary }}>
              View Screenshot
            </a>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No proof uploaded.</p>
          )}
        </div>

        {payment.status === 'pending' && (
          <div className="mt-8 flex gap-4">
            <Button
              variant="success"
              size="large"
              loading={updating}
              onClick={() => handleVerify('verified')}
              icon={<Check className="w-4 h-4" />}
            >
              Verify Payment
            </Button>
            <Button
              variant="danger"
              size="large"
              loading={updating}
              onClick={() => handleVerify('rejected')}
              icon={<X className="w-4 h-4" />}
            >
              Reject Payment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}