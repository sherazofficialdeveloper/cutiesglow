'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import { orderService } from '@/services/orderService';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrder(id);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: colors.primary, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-gray-500">Order not found.</p>
        <Link href="/" className="mt-4 inline-block text-sm font-medium" style={{ color: colors.primary }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  const isZellePending = order.paymentMethod === 'zelle' && order.status === 'pending';

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
        <h1 className="text-3xl font-extrabold text-gray-900 mt-4">Thank you for your order!</h1>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
        <p className="text-sm text-gray-500 mt-1">Order #{order.id.slice(-8)}</p>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-[#EBE0D5] shadow-sm p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Order Date</p>
            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Total Amount</p>
            <p className="font-bold text-lg" style={{ color: colors.primary }}>${order.total?.toFixed(2) || '0.00'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Payment Method</p>
            <p className="font-medium capitalize">{order.paymentMethod}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Order Status</p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
              order.status === 'paid' ? 'bg-green-100 text-green-700' :
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {isZellePending && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-700 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Payment verification pending. You will receive a confirmation email once verified.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/dashboard/orders" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:shadow-md" style={{ backgroundColor: colors.primary, color: colors.white }}>
          <Package className="w-4 h-4" />
          View My Orders
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm border transition-all hover:shadow-md" style={{ borderColor: colors.primary, color: colors.primary }}>
          <Truck className="w-4 h-4" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}