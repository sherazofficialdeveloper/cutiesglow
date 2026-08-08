'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import settingsService from '@/services/settingsService';

const VideoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [videoUrl, setVideoUrl] = React.useState('https://www.youtube.com/embed/dQw4w9WgXcQ');

  React.useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await settingsService.getHomepageVideo();
        if (data) setVideoUrl(data.url);
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };
    fetchVideo();
  }, []);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">See the Glow in Action</h2>
          <p className="text-lg text-gray-600 mt-2">Watch our 3-minute transformation</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden aspect-video bg-gray-900 shadow-xl"
        >
          <iframe
            src={videoUrl}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Cutish - 3 Minute Glow"
          />
        </motion.div>
      </div>
    </section>
  );
};

VideoSection.displayName = 'VideoSection';

export default VideoSection;