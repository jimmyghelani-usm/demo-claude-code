/**
 * Design tokens for US Mobile Trade In landing page
 * These tokens define the core visual system including colors, typography, and spacing
 */

export const colors = {
  brand: {
    blue: '#1D5FF6',
    blueHover: 'rgba(102, 122, 244, 0.85)',
  },
  text: {
    primary: '#000000',
    secondary: '#3C434D',
    tertiary: '#586271',
    quaternary: '#9BA1AA',
    navy: '#0C173E',
  },
  background: {
    white: '#FFFFFF',
    lightBlue: '#F4F8FF',
    cardBlue: '#F4F7FF',
    supportBlue: '#D2DFFD',
  },
  border: {
    light: '#E1E3E6',
  },
} as const;

export const typography = {
  fontFamily: {
    base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '56px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px',
  stepGap: '88px',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '32px',
} as const;

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
} as const;

export const dimensions = {
  headerHeight: '60px',
  footerHeight: '60px',
  maxWidth: '1440px',
  iconButton: '35px',
  stepCardWidth: '311px',
  stepIconSize: '140px',
  videoWidth: '946px',
  videoHeight: '478px',
} as const;

export const transitions = {
  fast: '150ms ease-in-out',
  base: '250ms ease-in-out',
  slow: '350ms ease-in-out',
} as const;
