import { ThemePack } from '../types';

export const kawaiiTheme: ThemePack = {
  id: 'kawaii',
  name: 'Kawaii Pop',
  description: 'Cute and playful with pastel colors, soft shapes, and bouncy animations',
  tokens: {
    background: 'oklch(0.97 0.02 330)',
    foreground: 'oklch(0.35 0.08 320)',
    card: 'oklch(1 0 0)',
    cardForeground: 'oklch(0.35 0.08 320)',
    primary: 'oklch(0.75 0.15 350)',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.80 0.12 280)',
    secondaryForeground: 'oklch(0.35 0.08 320)',
    muted: 'oklch(0.95 0.02 330)',
    mutedForeground: 'oklch(0.55 0.05 320)',
    accent: 'oklch(0.85 0.12 200)',
    accentForeground: 'oklch(0.35 0.08 320)',
    destructive: 'oklch(0.70 0.18 15)',
    border: 'oklch(0.85 0.08 350 / 50%)',
    input: 'oklch(0.98 0.01 330)',
    ring: 'oklch(0.75 0.15 350)',
    chart1: 'oklch(0.75 0.15 350)',
    chart2: 'oklch(0.80 0.12 280)',
    chart3: 'oklch(0.85 0.12 200)',
    chart4: 'oklch(0.85 0.15 100)',
    chart5: 'oklch(0.80 0.10 60)',
    radius: '1.5rem',
  },
  motion: {
    pageTransition: {
      initial: { opacity: 0, scale: 0.9, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.9, y: -20 },
      transition: { duration: 0.4 },
    },
    cardHover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
    },
    stagger: 0.08,
    duration: { fast: 0.2, normal: 0.4, slow: 0.6 },
    easing: [0.34, 1.56, 0.64, 1],
  },
  fonts: {
    heading: '"Fredoka", "Comic Sans MS", sans-serif',
    body: '"Nunito", "Geist Sans", sans-serif',
    mono: '"Fira Code", "Geist Mono", monospace',
  },
  background: {
    type: 'animated',
    config: {
      gradient: 'linear-gradient(135deg, oklch(0.97 0.02 330) 0%, oklch(0.95 0.03 280) 50%, oklch(0.97 0.02 200) 100%)',
      shapes: { enabled: true, type: 'hearts-stars', count: 15, float: true },
      sparkles: { enabled: true, count: 20 },
      clouds: { enabled: true, opacity: 0.3 },
    },
  },
  preview: {
    accent: '#FFB6C1',
  },
};
