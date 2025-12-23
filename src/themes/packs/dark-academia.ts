import { ThemePack } from '../types';

export const darkAcademiaTheme: ThemePack = {
  id: 'dark-academia',
  name: 'Elegance',
  description: 'Scholarly elegance with rich browns, deep greens, and vintage charm',
  tokens: {
    background: 'oklch(0.22 0.03 60)',
    foreground: 'oklch(0.90 0.02 80)',
    card: 'oklch(0.28 0.04 55)',
    cardForeground: 'oklch(0.90 0.02 80)',
    primary: 'oklch(0.70 0.10 80)',
    primaryForeground: 'oklch(0.22 0.03 60)',
    secondary: 'oklch(0.45 0.08 150)',
    secondaryForeground: 'oklch(0.90 0.02 80)',
    muted: 'oklch(0.30 0.03 60)',
    mutedForeground: 'oklch(0.65 0.03 80)',
    accent: 'oklch(0.55 0.12 30)',
    accentForeground: 'oklch(0.90 0.02 80)',
    destructive: 'oklch(0.55 0.18 20)',
    border: 'oklch(0.40 0.05 60 / 50%)',
    input: 'oklch(0.25 0.03 60)',
    ring: 'oklch(0.70 0.10 80)',
    chart1: 'oklch(0.70 0.10 80)',
    chart2: 'oklch(0.45 0.08 150)',
    chart3: 'oklch(0.55 0.12 30)',
    chart4: 'oklch(0.60 0.08 280)',
    chart5: 'oklch(0.50 0.06 200)',
    radius: '0.375rem',
  },
  motion: {
    pageTransition: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 1.02 },
      transition: { duration: 0.35 },
    },
    cardHover: {
      scale: 1.01,
      transition: { duration: 0.25, ease: 'easeOut' },
    },
    stagger: 0.06,
    duration: { fast: 0.2, normal: 0.35, slow: 0.5 },
    easing: [0.4, 0, 0.2, 1],
  },
  fonts: {
    heading: '"Playfair Display", "Georgia", serif',
    body: '"Crimson Text", "Georgia", serif',
    mono: '"IBM Plex Mono", monospace',
  },
  background: {
    type: 'texture',
    config: {
      texture: 'leather',
      overlay: 'vignette-heavy',
      grain: { enabled: true, opacity: 0.05 },
      candlelight: { enabled: true, intensity: 0.3 },
    },
  },
  preview: {
    accent: '#C9A227',
    icon: '📚',
  },
};
