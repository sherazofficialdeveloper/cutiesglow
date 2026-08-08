'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import AddressForm from '@/components/dashboard/AddressForm/AddressForm';
import { userService } from '@/services/userService';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await userService.getAddresses();
        setAddresses(data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleSaveAddress = async (address) => {
    try {
      if (editingAddress) {
        const updated = await userService.updateAddress(editingAddress.id, address);
        setAddresses(addresses.map(a => a.id === updated.id ? updated : a));
      } else {
        const created = await userService.addAddress(address);
        setAddresses([...addresses, created]);
      }
      setShowForm(false);
      setEditingAddress(null);
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (confirm('Delete this address?')) {
      try {
        await userService.deleteAddress(id);
        setAddresses(addresses.filter(a => a.id !== id));
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Addresses</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm text-white transition-all hover:shadow-md"
            style={{ backgroundColor: colors.primary }}
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <AddressForm
            address={editingAddress}
            onSave={handleSaveAddress}
            onCancel={() => {
              setShowForm(false);
              setEditingAddress(null);
            }}
          />
        </div>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <p className="text-gray-500">No addresses saved.</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 text-sm font-medium"
            style={{ color: colors.primary }}
          >
            Add your first address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="bg-white p-4 rounded-xl border border-[#EBE0D5] shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-900">{addr.label}</p>
                  <p className="text-sm text-gray-600 mt-1">{addr.street}</p>
                  <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                  <p className="text-sm text-gray-600">{addr.country}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingAddress(addr);
                      setShowForm(true);
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}