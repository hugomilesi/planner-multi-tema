import { ThemePack } from '../types';

export const nordicTheme: ThemePack = {
  id: 'nordic',
  name: 'Vintage Voyager',
  description: 'Clean Scandinavian design with soft whites and natural accents',
  tokens: {
    background: 'oklch(0.98 0.005 90)',
    foreground: 'oklch(0.25 0.02 250)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.25 0.02 250)',
    primary: 'oklch(0.45 0.08 250)',
    primaryForeground: 'oklch(0.98 0.005 90)',
    secondary: 'oklch(0.70 0.05 150)',
    secondaryForeground: 'oklch(0.25 0.02 250)',
    muted: 'oklch(0.95 0.005 90)',
    mutedForeground: 'oklch(0.50 0.02 250)',
    accent: 'oklch(0.75 0.08 180)',
    accentForeground: 'oklch(0.25 0.02 250)',
    destructive: 'oklch(0.60 0.18 20)',
    border: 'oklch(0.90 0.005 90)',
    input: 'oklch(0.96 0.005 90)',
    ring: 'oklch(0.45 0.08 250)',
    chart1: 'oklch(0.45 0.08 250)',
    chart2: 'oklch(0.70 0.05 150)',
    chart3: 'oklch(0.75 0.08 180)',
    chart4: 'oklch(0.65 0.10 80)',
    chart5: 'oklch(0.55 0.06 300)',
    radius: '0.75rem',
  },
  motion: {
    pageTransition: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.25 },
    },
    cardHover: {
      y: -1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    stagger: 0.04,
    duration: { fast: 0.15, normal: 0.25, slow: 0.4 },
    easing: [0.25, 0.1, 0.25, 1],
  },
  fonts: {
    heading: '"Inter", "Geist Sans", sans-serif',
    body: '"Inter", "Geist Sans", sans-serif',
    mono: '"JetBrains Mono", "Geist Mono", monospace',
  },
  background: {
    type: 'gradient',
    config: {
      gradient: 'linear-gradient(180deg, oklch(0.98 0.005 90) 0%, oklch(0.96 0.01 200) 100%)',
      shapes: { enabled: true, type: 'soft-blobs', opacity: 0.03 },
    },
  },
  preview: {
    accent: '#5E81AC',
    icon: '❄️',
  },
};
