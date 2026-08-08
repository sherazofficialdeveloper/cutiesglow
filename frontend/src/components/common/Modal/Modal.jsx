'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { borderRadius } from '@/config/theme/borderRadius';
import { zIndex } from '@/config/theme/zIndex';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium', // small, medium, large, full
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  style = {},
}) => {
  const sizeConfig = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '560px' },
    large: { maxWidth: '720px' },
    full: { maxWidth: '90vw', maxHeight: '90vh' },
  };

  const overlayStyles = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: zIndex.modal,
    padding: spacing[4],
  };

  const modalStyles = {
    backgroundColor: colors.white,
    borderRadius: borderRadius['2xl'],
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    width: '100%',
    maxWidth: sizeConfig[size]?.maxWidth || sizeConfig.medium.maxWidth,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    ...style,
  };

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${spacing[4]} ${spacing[6]}`,
    borderBottom: `1px solid ${colors.border.light}`,
  };

  const titleStyles = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.muted,
    padding: spacing[1],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    width: '36px',
    height: '36px',
  };

  const bodyStyles = {
    padding: spacing[6],
    overflowY: 'auto',
    flex: 1,
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const modalVariants = {
    closed: { 
      opacity: 0, 
      scale: 0.95,
      y: 20,
    },
    open: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      }
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={overlayStyles}
            onClick={closeOnOverlayClick ? onClose : undefined}
          >
            <motion.div
              variants={modalVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={modalStyles}
              className={className}
              onClick={(e) => e.stopPropagation()}
            >
              {(title || showCloseButton) && (
                <div style={headerStyles}>
                  {title && <h2 style={titleStyles}>{title}</h2>}
                  {showCloseButton && (
                    <button
                      style={closeButtonStyles}
                      onClick={onClose}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F3F4F6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              )}
              <div style={bodyStyles}>{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

Modal.displayName = 'Modal';

export default Modal;