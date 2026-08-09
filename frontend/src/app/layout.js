import React from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { colors } from '@/config/theme/colors';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { ToastProvider } from '@/contexts/ToastContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'CutiesGlow by Razia\'s – Premium Skincare',
  description: 'Premium skincare products made with natural ingredients for your daily glow routine.',
  keywords: 'skincare, premium, natural, glow, CutiesGlow, razias',
  openGraph: {
    title: 'CutiesGlow by Razia\'s – Premium Skincare',
    description: 'Premium skincare products made with natural ingredients for your daily glow routine.',
    url: 'https://CutiesGlowbyrazias.com',
    siteName: 'CutiesGlow by Razia\'s',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CutiesGlow by Razia\'s – Premium Skincare',
    description: 'Premium skincare products made with natural ingredients for your daily glow routine.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}