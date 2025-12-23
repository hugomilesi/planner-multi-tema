import { ThemePack } from '../types';

export const kawaiiTheme: ThemePack = {
  id: 'kawaii',
  name: 'Tema Floral',
  description: 'Elegant floral theme with dusty pink, sage green, and botanical accents',
  tokens: {
    background: '#2d1f24',           // Dark rose background
    foreground: '#fce4ec',           // Light rose text
    card: '#3d2a32',                 // Dark surface
    cardForeground: '#fce4ec',       // Light rose text
    primary: '#d47a96',              // Dusty Pink
    primaryForeground: '#ffffff',
    secondary: '#a3c9a8',            // Sage Green
    secondaryForeground: '#2d1f24',
    muted: '#4a3540',                // Muted dark rose
    mutedForeground: '#9e7f8a',      // Muted text
    accent: '#8FB394',               // Leaf green
    accentForeground: '#2d1f24',
    destructive: '#ef4444',
    border: 'rgba(212, 122, 150, 0.3)', // Rose border
    input: '#3d2a32',
    ring: '#d47a96',
    chart1: '#d47a96',               // Dusty pink
    chart2: '#a3c9a8',               // Sage green
    chart3: '#b85c78',               // Dark pink
    chart4: '#8FB394',               // Leaf green
    chart5: '#7a9e80',               // Dark sage
    glow: 'rgba(212, 122, 150, 0.25)',
    gradientStart: '#d47a96',
    gradientEnd: '#a3c9a8',
    radius: '2rem',
  },
  motion: {
    pageTransition: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    cardHover: {
      scale: 1.02,
      y: -2,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
    stagger: 0.06,
    duration: { fast: 0.2, normal: 0.35, slow: 0.5 },
    easing: [0.4, 0, 0.2, 1],
  },
  fonts: {
    heading: '"Playfair Display", Georgia, serif',
    body: '"DM Sans", "Geist Sans", sans-serif',
    mono: '"Fira Code", "Geist Mono", monospace',
  },
  background: {
    type: 'texture',
    config: {
      color: '#2d1f24',
      pattern: 'floral',
      overlay: 'linear-gradient(180deg, rgba(45, 31, 36, 0.9) 0%, rgba(45, 31, 36, 1) 100%)',
    },
  },
  preview: {
    accent: '#d47a96',
    icon: '🌸',
  },
};
