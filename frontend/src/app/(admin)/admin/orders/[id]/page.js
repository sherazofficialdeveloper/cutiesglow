'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { adminService } from '@/services/adminService';
import Button from '@/components/common/Button/Button';

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await adminService.getOrder(id);
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (status) => {
    setUpdating(true);
    try {
      await adminService.updateOrderStatus(id, status);
      setOrder({ ...order, status });
    } catch (error) {
      console.error('Status update error:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found.</div>;

  const statusOptions = ['pending', 'paid', 'shipped', 'delivered', 'rejected'];

  return (
    <div>
      <Link href="/admin/orders" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-6" style={{ color: colors.primary }}>
        <ArrowLeft className="w-4 h-4" />
        Back to Orders
      </Link>

      <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-sm p-6">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Order #{order.id.slice(-8)}</h1>
            <p className="text-sm text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${
              order.status === 'paid' ? 'bg-green-100 text-green-700' :
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
              order.status === 'delivered' ? 'bg-gray-100 text-gray-700' :
              'bg-red-100 text-red-700'
            }`}>
              {order.status}
            </span>
            <div className="flex gap-2">
              {statusOptions.filter(s => s !== order.status).map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="small"
                  loading={updating}
                  onClick={() => handleStatusUpdate(status)}
                >
                  Mark as {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Order details - similar to user order detail but with admin controls */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Items</h3>
            {order.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl mt-2">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="font-bold" style={{ color: colors.primary }}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Order Summary</h3>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${order.subtotal?.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>${order.shipping?.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>${order.tax?.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span style={{ color: colors.primary }}>${order.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Customer</h3>
              <div className="mt-2 text-sm">
                <p className="font-medium">{order.customerName}</p>
                <p className="text-gray-500">{order.customerEmail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}