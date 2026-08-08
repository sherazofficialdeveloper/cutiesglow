/**
 * Centralized Animation Configuration
 */
export const animations = {
  // Duration
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    linear: 'linear',
    cubic: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  // Transition presets
  transition: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    spring: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },

  // Keyframes
  keyframes: {
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    fadeOut: `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `,
    slideUp: `
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    slideDown: `
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    slideInLeft: `
      @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-30px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `,
    slideInRight: `
      @keyframes slideInRight {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `,
    scale: `
      @keyframes scale {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `,
    spin: `
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `,
    marquee: `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `,
    pulse: `
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
    `,
    shimmer: `
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `,
  },

  // Animation classes
  classes: {
    fadeIn: 'animation-fadeIn',
    slideUp: 'animation-slideUp',
    slideDown: 'animation-slideDown',
    scale: 'animation-scale',
    spin: 'animation-spin',
    pulse: 'animation-pulse',
    marquee: 'animation-marquee',
  },
};

export default animations;