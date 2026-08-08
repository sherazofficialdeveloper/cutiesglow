'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';

const AddressForm = ({ address, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: address || {
      label: 'Home',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await onSave(data);
    } catch (error) {
      console.error('Save address error:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyles = {
    backgroundColor: '#f9fafb',
    padding: spacing[6],
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
  };

  const formStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  };

  const actionsStyles = {
    display: 'flex',
    gap: spacing[3],
    justifyContent: 'flex-end',
    marginTop: spacing[4],
  };

  return (
    <div style={containerStyles}>
      <form onSubmit={handleSubmit(onSubmit)} style={formStyles}>
        <Input
          label="Address Label"
          {...register('label', { required: 'Label is required' })}
          error={errors.label?.message}
        />
        <Input
          label="Street"
          {...register('street', { required: 'Street is required' })}
          error={errors.street?.message}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[4] }}>
          <Input
            label="City"
            {...register('city', { required: 'City is required' })}
            error={errors.city?.message}
          />
          <Input
            label="State"
            {...register('state', { required: 'State is required' })}
            error={errors.state?.message}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[4] }}>
          <Input
            label="ZIP Code"
            {...register('zip', { required: 'ZIP is required' })}
            error={errors.zip?.message}
          />
          <Input
            label="Country"
            {...register('country', { required: 'Country is required' })}
            error={errors.country?.message}
          />
        </div>
        <div style={actionsStyles}>
          {onCancel && (
            <Button variant="ghost" onClick={onCancel} type="button">
              Cancel
            </Button>
          )}
          <Button type="submit" variant="primary" loading={loading}>
            Save Address
          </Button>
        </div>
      </form>
    </div>
  );
};

AddressForm.displayName = 'AddressForm';

export default AddressForm;