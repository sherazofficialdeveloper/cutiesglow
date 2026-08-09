'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const slides = [
    {
      id: 1,
      alt: 'CutiesGlow Premium Skincare Collection',
      desktopImage: '/image 1.png',
      mobileImage: '/image 1.jpg',
    },
    {
      id: 2,
      alt: 'CutiesGlow Botanical Beauty Skincare',
      desktopImage: '/image 2.png',
      mobileImage: '/image 2.jpg',
    },
    {
      id: 3,
      alt: 'CutiesGlow Natural Hair Care',
      desktopImage: '/image 3.png',
      mobileImage: '/image 3.jpg',
    },
    {
      id: 4,
      alt: 'CutiesGlow Glow Routine',
      desktopImage: '/image 4.png',
      mobileImage: '/image-4.png',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const sectionStyles = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundColor: colors.white,
    overflow: 'hidden',
  };

  const slideContainerStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
  };

  const slideStyles = (isActive) => ({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    transition: 'opacity 0.7s ease-in-out',
    opacity: isActive ? 1 : 0,
    zIndex: isActive ? 10 : 0,
  });

  const imageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  const buttonStyles = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(4px)',
  };

  const dotContainerStyles = {
    position: 'absolute',
    bottom: spacing[6],
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
    display: 'flex',
    gap: spacing[2],
  };

  const dotStyles = (isActive) => ({
    height: '10px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: isActive ? '32px' : '10px',
    backgroundColor: isActive ? colors.primary : 'rgba(255,255,255,0.6)',
  });

  return (
    <section style={sectionStyles}>
      <div style={slideContainerStyles}>
        {slides.map((slide, idx) => (
          <div key={slide.id} style={slideStyles(idx === currentSlide)}>
            <img
              src={isMobile ? slide.mobileImage : slide.desktopImage}
              alt={slide.alt}
              style={imageStyles}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        style={{ ...buttonStyles, left: spacing[4] }}
        aria-label="Previous slide"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <ChevronLeft size={24} color={colors.text.primary} />
      </button>

      <button
        onClick={nextSlide}
        style={{ ...buttonStyles, right: spacing[4] }}
        aria-label="Next slide"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,1)';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.85)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <ChevronRight size={24} color={colors.text.primary} />
      </button>

      <div style={dotContainerStyles}>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            style={dotStyles(idx === currentSlide)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';

export default Hero;