'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { borderRadius } from '@/config/theme/borderRadius';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  success = false,
  helperText = '',
  icon = null,
  iconPosition = 'left',
  size = 'medium',
  fullWidth = true,
  className = '',
  style = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const sizeConfig = {
    small: {
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.sm,
      height: '36px',
    },
    medium: {
      padding: `${spacing[3]} ${spacing[4]}`,
      fontSize: typography.fontSize.base,
      height: '44px',
    },
    large: {
      padding: `${spacing[4]} ${spacing[6]}`,
      fontSize: typography.fontSize.lg,
      height: '52px',
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.medium;

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyles = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
    display: 'flex',
    alignItems: 'center',
    gap: spacing[0.5],
  };

  const inputWrapperStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyles = {
    width: '100%',
    padding: currentSize.padding,
    fontSize: currentSize.fontSize,
    fontFamily: typography.fontFamily.body,
    color: colors.text.primary,
    backgroundColor: colors.white,
    border: `2px solid ${error ? '#DC2626' : success ? '#10B981' : isFocused ? colors.primary : colors.border.light}`,
    borderRadius: borderRadius.input,
    outline: 'none',
    transition: 'all 0.3s ease',
    height: currentSize.height,
    paddingLeft: icon && iconPosition === 'left' ? spacing[10] : currentSize.padding,
    paddingRight: (isPassword || icon && iconPosition === 'right') ? spacing[10] : currentSize.padding,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    ...style,
  };

  const iconStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: isFocused ? colors.primary : colors.text.muted,
    pointerEvents: 'none',
    left: iconPosition === 'left' ? spacing[3] : 'auto',
    right: iconPosition === 'right' ? spacing[3] : 'auto',
  };

  const togglePasswordStyles = {
    position: 'absolute',
    right: spacing[3],
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.muted,
    padding: spacing[0.5],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const errorStyles = {
    fontSize: typography.fontSize.sm,
    color: '#DC2626',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
  };

  const successStyles = {
    fontSize: typography.fontSize.sm,
    color: '#10B981',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[1],
  };

  const helperStyles = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
  };

  const requiredStar = {
    color: '#DC2626',
  };

  return (
    <div style={containerStyles} className={className}>
      {label && (
        <label style={labelStyles}>
          {label}
          {required && <span style={requiredStar}>*</span>}
        </label>
      )}

      <div style={inputWrapperStyles}>
        {icon && iconPosition === 'left' && (
          <span style={{ ...iconStyles, left: spacing[3] }}>
            {icon}
          </span>
        )}

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          style={inputStyles}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            style={togglePasswordStyles}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}

        {success && !error && (
          <span style={{ ...iconStyles, right: spacing[3], color: '#10B981' }}>
            <Check size={20} />
          </span>
        )}

        {error && (
          <span style={{ ...iconStyles, right: spacing[3], color: '#DC2626' }}>
            <X size={20} />
          </span>
        )}

        {icon && iconPosition === 'right' && !isPassword && !success && !error && (
          <span style={{ ...iconStyles, right: spacing[3] }}>
            {icon}
          </span>
        )}
      </div>

      {error && (
        <div style={errorStyles}>
          <X size={16} />
          {error}
        </div>
      )}

      {success && !error && (
        <div style={successStyles}>
          <Check size={16} />
          {helperText || 'Valid input'}
        </div>
      )}

      {helperText && !error && !success && (
        <div style={helperStyles}>{helperText}</div>
      )}
    </div>
  );
};

Input.displayName = 'Input';

export default Input;