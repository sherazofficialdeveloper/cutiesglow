'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { colors } from '@/config/theme/colors';
import { typography } from '@/config/theme/typography';
import { spacing } from '@/config/theme/spacing';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import PaymentMethods from '../PaymentMethods/PaymentMethods';

const CheckoutForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const { user } = useAuth();
  const { cartItems } = useCart();

  const containerStyles = {
    maxWidth: '600px',
    margin: '0 auto',
  };

  const sectionStyles = {
    marginBottom: spacing[6],
  };

  const titleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing[3],
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      paymentMethod,
      items: cartItems,
    });
  };

  return (
    <div style={containerStyles}>
      <form onSubmit={handleSubmit(handleFormSubmit)} style={formStyles}>
        <div style={sectionStyles}>
          <h3 style={titleStyles}>Shipping Information</h3>
          <Input
            label="Full Name"
            defaultValue={user?.name || ''}
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          <Input
            label="Email"
            type="email"
            defaultValue={user?.email || ''}
            {...register('email', { required: 'Email is required' })}
            error={errors.email?.message}
          />
          <Input
            label="Address"
            {...register('address', { required: 'Address is required' })}
            error={errors.address?.message}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[4] }}>
            <Input
              label="City"
              {...register('city', { required: 'City is required' })}
              error={errors.city?.message}
            />
            <Input
              label="Postal Code"
              {...register('postalCode', { required: 'Postal code is required' })}
              error={errors.postalCode?.message}
            />
          </div>
        </div>

        <div style={sectionStyles}>
          <h3 style={titleStyles}>Payment Method</h3>
          <PaymentMethods selected={paymentMethod} onChange={setPaymentMethod} />
        </div>

        <Button type="submit" variant="primary" size="large" fullWidth>
          Place Order
        </Button>
      </form>
    </div>
  );
};

CheckoutForm.displayName = 'CheckoutForm';

export default CheckoutForm;