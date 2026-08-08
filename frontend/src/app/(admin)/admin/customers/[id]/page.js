'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { adminService } from '@/services/adminService';

export default function AdminCustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await adminService.getCustomer(id);
        setCustomer(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found.</div>;

  return (
    <div>
      <Link href="/admin/customers" className="inline-flex items-center gap-2 text-sm font-medium hover:underline mb-6" style={{ color: colors.primary }}>
        <ArrowLeft className="w-4 h-4" />
        Back to Customers
      </Link>

      <div className="bg-white rounded-2xl border border-[#EBE0D5] shadow-sm p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold">
            {customer.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {customer.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {customer.phone || 'N/A'}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Joined {new Date(customer.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>{customer.orderCount || 0}</div>
            <div className="text-sm text-gray-500">Total Orders</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>${customer.totalSpent?.toFixed(2) || '0.00'}</div>
            <div className="text-sm text-gray-500">Total Spent</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-xl text-center">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>{customer.reviewCount || 0}</div>
            <div className="text-sm text-gray-500">Reviews</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Addresses</h3>
          {customer.addresses?.length ? (
            <div className="mt-2 space-y-2">
              {customer.addresses.map((addr, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 mt-0.5" style={{ color: colors.primary }} />
                  <span>{addr.street}, {addr.city}, {addr.state} {addr.zip}, {addr.country}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">No addresses saved.</p>
          )}
        </div>
      </div>
    </div>
  );
}