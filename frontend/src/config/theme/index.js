/**
 * Main Theme Configuration Export
 * All theme settings are centralized here
 */
import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import borderRadius from './borderRadius';
import shadows from './shadows';
import breakpoints from './breakpoints';
import animations from './animations';
import zIndex from './zIndex';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
  zIndex,
};

// Also export individual items for easier imports
export {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
  zIndex,
};

export default theme;