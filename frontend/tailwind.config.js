/** @type {import('tailwindcss').Config} */
const { colors } = require('./src/config/theme/colors');
const { breakpoints } = require('./src/config/theme/breakpoints');

module.exports = {
  content: [
    './src/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
  ],
  theme: {
    screens: {
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
      '2xl': breakpoints['2xl'],
    },
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        'brand-primary': colors.brand.primary,
        'brand-secondary': colors.brand.secondary,
        'brand-light': colors.brand.light,
        success: colors.success,
        warning: colors.warning,
        error: colors.error,
        info: colors.info,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.04)',
        dropdown: '0 20px 60px rgba(0,0,0,0.08)',
        modal: '0 20px 60px rgba(0,0,0,0.15)',
        header: '0 4px 20px rgba(0,0,0,0.04)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale': 'scale 0.3s ease-out',
        'pulse': 'pulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scale: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};