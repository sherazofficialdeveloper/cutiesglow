'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckoutForm from '@/components/checkout/CheckoutForm/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary/OrderSummary';
import ZellePayment from '@/components/checkout/ZellePayment/ZellePayment';
import PayPalPayment from '@/components/checkout/PayPalPayment/PayPalPayment';
import { useCart } from '@/hooks/useCart';
import { orderService } from '@/services/orderService';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handleOrderSubmit = async (orderData) => {
    try {
      const order = await orderService.createOrder({
        ...orderData,
        items: cartItems,
        paymentMethod,
      });
      if (paymentMethod === 'zelle') {
        // Zelle payment flow: we need to upload proof later
        // Redirect to order confirmation with pending status
        router.push(`/order-confirmation/${order.id}`);
      } else {
        // PayPal – handle redirect or success
        router.push(`/order-confirmation/${order.id}`);
      }
      clearCart();
    } catch (error) {
      console.error('Order creation error:', error);
    }
  };

  const handleZelleSubmit = async (formData) => {
    // formData contains transactionId and proof file
    try {
      await orderService.submitZelleProof(formData);
      router.push('/order-confirmation/success');
    } catch (error) {
      console.error('Zelle proof submission error:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleOrderSubmit} />
          {paymentMethod === 'zelle' && (
            <div className="mt-8">
              <ZellePayment onSubmit={handleZelleSubmit} />
            </div>
          )}
          {paymentMethod === 'paypal' && (
            <div className="mt-8">
              <PayPalPayment
                onSuccess={() => {}}
                onError={(err) => console.error(err)}
              />
            </div>
          )}
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}