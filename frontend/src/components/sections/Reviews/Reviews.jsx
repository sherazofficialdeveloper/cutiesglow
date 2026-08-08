'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';

const Reviews = ({ reviews = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  // Sample reviews (if none provided)
  const defaultReviews = [
    {
      id: 1,
      name: 'Melissa J.',
      text: 'I\'ve tried everything for my dark spots, but nothing worked—until Cuties Glow. Within weeks, my skin finally looks clear and radiant.',
      rating: 5,
      date: '2 weeks ago',
    },
    {
      id: 2,
      name: 'Karen S.',
      text: 'The firming cream is a game-changer! My skin feels tighter, smoother, and honestly younger.',
      rating: 5,
      date: '1 month ago',
    },
    {
      id: 3,
      name: 'Angela D.',
      text: 'I love how natural and gentle these products are. My sensitive skin usually reacts to everything, but Cuties Glow keeps me glowing without irritation.',
      rating: 4,
      date: '3 weeks ago',
    },
    {
      id: 4,
      name: 'Sophia R.',
      text: 'The peppermint coffee scrub is my new obsession. It leaves my skin silky soft and the refreshing scent wakes me up better than coffee.',
      rating: 5,
      date: '2 months ago',
    },
  ];

  const reviewData = reviews.length > 0 ? reviews : defaultReviews;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const getVisibleCount = () => {
    if (windowWidth < 768) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const totalSlides = Math.ceil(reviewData.length / visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getVisibleReviews = () => {
    const start = currentIndex * visibleCount;
    return reviewData.slice(start, start + visibleCount);
  };

  const containerStyles = {
    backgroundColor: '#F9FAFB',
    padding: `${spacing[12]} 0`,
  };

  const innerContainerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
  };

  const headerStyles = {
    textAlign: 'center',
    marginBottom: spacing[8],
  };

  const titleStyles = {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.extrabold,
    color: colors.text.primary,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.muted,
    marginTop: spacing[2],
  };

  const reviewCardStyles = {
    backgroundColor: colors.white,
    padding: spacing[6],
    borderRadius: '16px',
    border: `1px solid ${colors.border.light}`,
    boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const reviewTextStyles = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.relaxed,
    marginBottom: spacing[4],
    flex: 1,
  };

  const reviewerNameStyles = {
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
  };

  const reviewDateStyles = {
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
  };

  const starStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: spacing[1],
    marginBottom: spacing[3],
  };

  const carouselControlsStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[4],
    marginTop: spacing[8],
  };

  const arrowButtonStyles = {
    padding: `${spacing[2]} ${spacing[3]}`,
    borderRadius: '50%',
    border: `1px solid ${colors.border.light}`,
    backgroundColor: colors.white,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const dotsContainerStyles = {
    display: 'flex',
    gap: spacing[2],
  };

  const dotStyles = (isActive) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: isActive ? colors.primary : colors.border.medium,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    padding: 0,
  });

  const visibleReviews = getVisibleReviews();

  return (
    <section style={containerStyles}>
      <div style={innerContainerStyles}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>What Our Customers Say</h2>
          <p style={subtitleStyles}>Real reviews from real people who love their glow</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${visibleCount}, 1fr)`, gap: spacing[6] }}>
          {visibleReviews.map((review, index) => (
            <motion.div
              key={review.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={reviewCardStyles}
            >
              <div>
                <div style={starStyles}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < (review.rating || 5) ? '#F59E0B' : 'none'}
                      color={i < (review.rating || 5) ? '#F59E0B' : colors.border.medium}
                    />
                  ))}
                </div>
                <p style={reviewTextStyles}>"{review.text}"</p>
              </div>
              <div>
                <div style={reviewerNameStyles}>{review.name}</div>
                <div style={reviewDateStyles}>{review.date || 'Verified Customer'}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {totalSlides > 1 && (
          <div style={carouselControlsStyles}>
            <button
              style={arrowButtonStyles}
              onClick={prevSlide}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.white;
                e.currentTarget.style.color = colors.text.primary;
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <div style={dotsContainerStyles}>
              {[...Array(totalSlides)].map((_, idx) => (
                <button
                  key={idx}
                  style={dotStyles(idx === currentIndex)}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>

            <button
              style={arrowButtonStyles}
              onClick={nextSlide}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.white;
                e.currentTarget.style.color = colors.text.primary;
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

Reviews.displayName = 'Reviews';
export default Reviews;