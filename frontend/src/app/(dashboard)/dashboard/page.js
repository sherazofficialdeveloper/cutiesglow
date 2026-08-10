'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // ✅ Added
import { useRouter } from 'next/navigation';
import { ShoppingBag, Heart, Package, Star, Loader2 } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { useAuth } from '@/hooks/useAuth';
import orderService from '@/services/orderService';
import wishlistService from '@/services/wishlistService';
import reviewService from '@/services/reviewService';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // ✅ Agar user login nahi hai toh redirect
    if (!isAuthenticated && !loading) {
      router.push('/login');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        // Fetch orders
        try {
          const orderData = await orderService.getOrders({ limit: 5 });
          setOrders(orderData.items || []);
        } catch (err) {
          console.warn('Orders fetch failed:', err);
          setOrders([]);
        }

        // Fetch wishlist count
        try {
          const wishlistData = await wishlistService.getWishlist();
          setWishlistCount(wishlistData.items?.length || 0);
        } catch (err) {
          console.warn('Wishlist fetch failed:', err);
          setWishlistCount(0);
        }

        // Fetch reviews count
        try {
          const reviewsData = await reviewService.getReviews({ limit: 1 });
          setReviewsCount(reviewsData.totalCount || 0);
        } catch (err) {
          console.warn('Reviews fetch failed:', err);
          setReviewsCount(0);
        }
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.primary }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-medium hover:underline"
          style={{ color: colors.primary }}
        >
          Try again
        </button>
      </div>
    );
  }

  const stats = [
    { label: 'Orders', value: orders.length.toString(), icon: ShoppingBag, color: '#E2702E' },
    { label: 'Wishlist', value: wishlistCount.toString(), icon: Heart, color: '#EF4444' },
    { label: 'Reviews', value: reviewsCount.toString(), icon: Star, color: '#F59E0B' },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your account
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: stat.color + '20' }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          {orders.length > 0 && (
            <Link
              href="/dashboard/orders"
              className="text-sm font-medium hover:underline"
              style={{ color: colors.primary }}
            >
              View all
            </Link>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="w-12 h-12 mx-auto text-gray-300 mb-2" />
            <p>No orders yet</p>
            <Link
              href="/products"
              className="text-sm font-medium hover:underline inline-block mt-2"
              style={{ color: colors.primary }}
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm text-gray-900">
                    Order #{order.id?.slice(-6) || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm" style={{ color: colors.primary }}>
                    ${Number(order.total || 0).toFixed(2)}
                  </p>
                  <span
                    className={`text-xs capitalize px-2 py-0.5 rounded-full ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {order.status || 'pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}