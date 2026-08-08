'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { zIndex } from '@/config/theme/zIndex';

const ToastContext = createContext();

const ToastContainer = ({ toasts, removeToast }) => {
  const containerStyles = {
    position: 'fixed',
    top: spacing[6],
    right: spacing[6],
    zIndex: zIndex.toast,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
    maxWidth: '400px',
    width: '100%',
    pointerEvents: 'none',
  };

  const toastStyles = (type) => {
    const base = {
      backgroundColor: colors.white,
      borderRadius: '12px',
      padding: spacing[4],
      boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
      border: `1px solid ${colors.border.light}`,
      display: 'flex',
      alignItems: 'flex-start',
      gap: spacing[3],
      pointerEvents: 'auto',
      position: 'relative',
    };

    const colorsMap = {
      success: { bg: '#D1FAE5', icon: '#065F46' },
      error: { bg: '#FEE2E2', icon: '#991B1B' },
      warning: { bg: '#FEF3C7', icon: '#92400E' },
      info: { bg: '#DBEAFE', icon: '#1E40AF' },
    };

    const c = colorsMap[type] || colorsMap.info;
    return { ...base, borderLeftColor: c.icon, borderLeftWidth: '4px' };
  };

  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  return (
    <div style={containerStyles}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={toastStyles(toast.type)}
            >
              <Icon size={20} style={{ color: toastStyles(toast.type).borderLeftColor, flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                {toast.title && (
                  <div style={{ fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.bold, color: colors.text.primary }}>
                    {toast.title}
                  </div>
                )}
                <div style={{ fontSize: typography.fontSize.sm, color: colors.text.secondary, marginTop: toast.title ? spacing[0.5] : 0 }}>
                  {toast.message}
                </div>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.text.muted,
                  padding: spacing[1],
                  flexShrink: 0,
                }}
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', title = '', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, title }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = (message, title) => showToast(message, 'success', title);
  const showError = (message, title) => showToast(message, 'error', title);
  const showWarning = (message, title) => showToast(message, 'warning', title);
  const showInfo = (message, title) => showToast(message, 'info', title);

  const value = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext;