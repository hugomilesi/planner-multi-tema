import { ThemePack } from '../types';

export const sacredSerenityTheme: ThemePack = {
  id: 'sacred-serenity',
  name: 'Sacred Serenity',
  description: 'Elegant spiritual theme with warm gold tones and serene aesthetics',
  motion: {
    pageTransition: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.3 },
    },
    cardHover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.2 },
    },
    stagger: 0.1,
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: [0.4, 0, 0.2, 1],
  },
  fonts: {
    heading: 'font-serif',
    body: 'font-sans',
  },
  background: {
    type: 'texture',
    config: {
      pattern: "url('data:image/svg+xml,%3Csvg%20width=%27100%27%20height=%27100%27%20viewBox=%270%200%20100%20100%27%20xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath%20d=%27M11%2018c3.866%200%207-3.134%207-7s-3.134-7-7-7-7%203.134-7%207%203.134%207%207%207z%27%20fill=%27%23dcb773%27%20fill-opacity=%270.03%27/%3E%3C/svg%3E')",
      overlay: true,
    },
  },
  tokens: {
    primary: '#C5A059',
    primaryForeground: '#FFFFFF',
    secondary: '#F0E6D2',
    secondaryForeground: '#050505',
    accent: '#DBB87C',
    accentForeground: '#050505',
    background: '#050505',
    foreground: '#F0E6D2',
    card: '#1A1A1A',
    cardForeground: '#F0E6D2',
    muted: '#121212',
    mutedForeground: '#A3B8C8',
    destructive: '#B08D55',
    border: '#C5A059',
    input: '#121212',
    ring: '#C5A059',
    chart1: '#C5A059',
    chart2: '#DBB87C',
    chart3: '#9C7C33',
    chart4: '#B08D55',
    chart5: '#8A7029',
    radius: '0.75rem',
  },
  preview: {
    accent: '#C5A059',
    icon: '✝️',
  },
};
