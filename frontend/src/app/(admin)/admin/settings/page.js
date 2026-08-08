'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, CreditCard, Truck, ArrowRight } from 'lucide-react';
import { colors } from '@/config/theme/colors';

export default function SettingsDashboardPage() {
  const settingsSections = [
    {
      id: 'general',
      title: 'General Settings',
      description: 'Site name, contact info, address, and other general settings.',
      icon: Settings,
      href: '/admin/settings/general',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'payment',
      title: 'Payment Settings',
      description: 'Configure PayPal, Zelle, and other payment gateways.',
      icon: CreditCard,
      href: '/admin/settings/payment',
      color: 'bg-green-50 text-green-600',
    },
    {
      id: 'shipping',
      title: 'Shipping Settings',
      description: 'Configure shipping rates, free shipping threshold, and delivery options.',
      icon: Truck,
      href: '/admin/settings/shipping',
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your store settings from here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.id}
              href={section.href}
              className="group block bg-white rounded-2xl border border-[#EBE0D5] shadow-sm hover:shadow-lg transition-all duration-300 p-6 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${section.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#E2702E] transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className="shrink-0 text-gray-400 group-hover:text-[#E2702E] transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-200" />

      {/* Additional Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-2xl">
        <h4 className="font-bold text-amber-800 text-sm">💡 Tip</h4>
        <p className="text-amber-700 text-sm mt-1">
          Changes made in settings will reflect across the store. Make sure to save after updating.
        </p>
      </div>
    </div>
  );
}