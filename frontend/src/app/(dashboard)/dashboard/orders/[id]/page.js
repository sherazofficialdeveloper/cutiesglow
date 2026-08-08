'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, CreditCard, MapPin, Truck } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import { orderService } from '@/services/orderService';

export default function OrderDetailPage() {
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
      <div className="flex items-center justify-center py-16">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: colors.primary, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Order not found.</p>
        <Link href="/dashboard/orders" className="mt-4 inline-block text-sm font-medium" style={{ color: colors.primary }}>
          Back to Orders
        </Link>
      </div>
    );
  }

  const statusBadge = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    rejected: 'bg-red-100 text-red-700',
    shipped: 'bg-blue-100 text-blue-700',
    delivered: 'bg-gray-100 text-gray-700',
  };

  return (
    <div>
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-6"
        style={{ color: colors.primary }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#EBE0D5] flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Order #{order.id.slice(-8)}</h1>
            <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${statusBadge[order.status] || statusBadge.pending}`}>
            {order.status}
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Items */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Items</h3>
            <div className="mt-3 space-y-3">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <img
                    src={item.image || '/images/default-product.jpg'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: colors.primary }}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Order Summary</h3>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${order.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>${order.shipping?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>${order.tax?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span style={{ color: colors.primary }}>${order.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Shipping Address</h3>
              <div className="mt-3 text-sm text-gray-600">
                <p className="font-medium text-gray-900">{order.shippingAddress?.name || 'N/A'}</p>
                <p>{order.shippingAddress?.street || ''}</p>
                <p>{order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} {order.shippingAddress?.zip || ''}</p>
                <p>{order.shippingAddress?.country || ''}</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center text-sm">
            <div>
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium capitalize ml-2">{order.paymentMethod}</span>
            </div>
            {order.paymentMethod === 'zelle' && order.status === 'pending' && (
              <span className="text-amber-600">Awaiting verification</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}