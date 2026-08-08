'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AnnouncementBar from '@/components/layout/AnnouncementBar/AnnouncementBar';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

export default function ShopLayout({ children }) {
  const pathname = usePathname();

  // ✅ AnnouncementBar sabhi pages par show hogi
  const showAnnouncement = true; // ✅ Always true

  const isCheckout = pathname?.startsWith('/checkout');

  const ANNOUNCEMENT_HEIGHT = 48;
  const HEADER_HEIGHT = 72;

  const mainPaddingTop = showAnnouncement ? ANNOUNCEMENT_HEIGHT + HEADER_HEIGHT : HEADER_HEIGHT;

  return (
    <>
      {!isCheckout && showAnnouncement && <AnnouncementBar />}
      {!isCheckout && <Header announcementHeight={showAnnouncement ? ANNOUNCEMENT_HEIGHT : 0} />}
      <main className="min-h-screen" style={{ paddingTop: `${mainPaddingTop}px` }}>
        {children}
      </main>
      {!isCheckout && <Footer />}
    </>
  );
}