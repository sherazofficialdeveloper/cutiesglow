'use client';

import React from 'react';
import Hero from '@/components/sections/Hero/Hero';
import BrandStory from '@/components/sections/BrandStory/BrandStory';
import FeaturedProducts from '@/components/sections/FeaturedProducts/FeaturedProducts';
import WhyChoose from '@/components/sections/WhyChoose/WhyChoose';
import BeforeAfter from '@/components/sections/BeforeAfter/BeforeAfter';
import PromoBanner from '@/components/sections/PromoBanner/PromoBanner';
import Reviews from '@/components/sections/Reviews/Reviews';
import ScrollingTicker from '@/components/sections/ScrollingTicker/ScrollingTicker';
import Instagram from '@/components/sections/Instagram/Instagram';
import Contact from '@/components/sections/Contact/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <BrandStory />
      <FeaturedProducts />
      <WhyChoose />
      <BeforeAfter />
      <PromoBanner imageUrl="/image 3.png" altText="Promotional Banner 1" />
      <Reviews />
      <ScrollingTicker />
      <Instagram />
      <PromoBanner imageUrl="/image 4.png" altText="Promotional Banner 2" />
      <Contact />
    </main>
  );
}