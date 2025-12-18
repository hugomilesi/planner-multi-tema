import { ThemePack } from '../types';

export const noirTheme: ThemePack = {
  id: 'noir',
  name: 'Film Noir',
  description: 'Classic detective aesthetics with high contrast, shadows, and mystery',
  tokens: {
    background: 'oklch(0.12 0 0)',
    foreground: 'oklch(0.92 0 0)',
    card: 'oklch(0.18 0 0)',
    cardForeground: 'oklch(0.92 0 0)',
    primary: 'oklch(0.85 0 0)',
    primaryForeground: 'oklch(0.12 0 0)',
    secondary: 'oklch(0.50 0 0)',
    secondaryForeground: 'oklch(0.92 0 0)',
    muted: 'oklch(0.22 0 0)',
    mutedForeground: 'oklch(0.60 0 0)',
    accent: 'oklch(0.55 0.15 15)',
    accentForeground: 'oklch(0.92 0 0)',
    destructive: 'oklch(0.50 0.20 20)',
    border: 'oklch(0.35 0 0)',
    input: 'oklch(0.15 0 0)',
    ring: 'oklch(0.85 0 0)',
    chart1: 'oklch(0.85 0 0)',
    chart2: 'oklch(0.60 0 0)',
    chart3: 'oklch(0.55 0.15 15)',
    chart4: 'oklch(0.45 0 0)',
    chart5: 'oklch(0.70 0 0)',
    radius: '0.125rem',
  },
  motion: {
    pageTransition: {
      initial: { opacity: 0, filter: 'brightness(2) contrast(0.5)' },
      animate: { opacity: 1, filter: 'brightness(1) contrast(1)' },
      exit: { opacity: 0, filter: 'brightness(0) contrast(2)' },
      transition: { duration: 0.4 },
    },
    cardHover: {
      scale: 1.01,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    stagger: 0.05,
    duration: { fast: 0.15, normal: 0.3, slow: 0.5 },
    easing: [0.4, 0, 0.2, 1],
  },
  fonts: {
    heading: '"Bebas Neue", "Impact", sans-serif',
    body: '"Source Serif 4", "Georgia", serif',
    mono: '"Courier Prime", monospace',
  },
  background: {
    type: 'texture',
    config: {
      gradient: 'radial-gradient(ellipse at top, oklch(0.20 0 0) 0%, oklch(0.08 0 0) 100%)',
      grain: { enabled: true, opacity: 0.15, animated: true },
      vignette: { enabled: true, intensity: 0.6 },
      spotlight: { enabled: true, position: 'top-right' },
      rain: { enabled: true, opacity: 0.1 },
    },
  },
  preview: {
    accent: '#1a1a1a',
  },
};
