export interface ThemeTokens {
  // Core colors
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  
  // Chart colors
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  
  // Theme-specific
  glow?: string;
  gradientStart?: string;
  gradientEnd?: string;
  
  // Radius
  radius: string;
}

export interface ThemeMotion {
  pageTransition: {
    initial: Record<string, number | string>;
    animate: Record<string, number | string>;
    exit: Record<string, number | string>;
    transition: Record<string, number | string | number[]>;
  };
  cardHover: {
    scale?: number;
    y?: number;
    transition: Record<string, number | string | number[]>;
  };
  stagger: number;
  duration: {
    fast: number;
    normal: number;
    slow: number;
  };
  easing: number[];
}

export interface ThemeFonts {
  heading: string;
  body: string;
  mono?: string;
}

export interface ThemeBackground {
  type: 'gradient' | 'particles' | 'animated' | 'texture';
  config: Record<string, unknown>;
}

export interface ThemePack {
  id: string;
  name: string;
  description: string;
  tokens: ThemeTokens;
  motion: ThemeMotion;
  fonts: ThemeFonts;
  background: ThemeBackground;
  preview: {
    accent: string;
    thumbnail?: string;
    icon?: string; // Emoji or icon to represent the theme
  };
}

export type ThemeId = 
  | 'cyberpunk'
  | 'western'
  | 'nordic'
  | 'dark-academia'
  | 'ocean'
  | 'synthwave'
  | 'kawaii'
  | 'noir'
  | 'space'
  | 'sacred-serenity';
