import { ReactNode } from 'react';

// Theme-specific decorative elements (slots)
// These are ONLY visual decorations, not functional components
// All functional logic stays in the unified pages

export interface ThemeSlots {
  // Dashboard decorations
  dashboardBackground?: ReactNode;
  dashboardHeaderDecoration?: ReactNode;
  progressBarStyle?: 'segments' | 'smooth' | 'rounded';
  
  // Card decorations
  cardDecoration?: ReactNode;
  cardClassName?: string;
  
  // Page-specific decorations
  pageOverlay?: ReactNode;
  
  // Animation preferences
  useGlowEffects?: boolean;
  useGridBackground?: boolean;
}

// Cyberpunk decorations
const CyberpunkGridOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      backgroundImage: 'linear-gradient(rgba(77,0,140,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(77,0,140,0.2) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
    }}
  />
);

const CyberpunkScanlines = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-10 opacity-5"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
    }}
  />
);

// Synthwave decorations
const SynthwaveGridOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      backgroundImage: 'linear-gradient(rgba(255,110,199,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,110,199,0.1) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
    }}
  />
);

// Space decorations
const SpaceStarsOverlay = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {Array.from({ length: 50 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.2,
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

// Western decorations
const WesternDustOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0 opacity-10"
    style={{
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(217,119,6,0.3) 0%, transparent 50%)',
    }}
  />
);

// Ocean decorations
const OceanWavesOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0 opacity-20"
    style={{
      backgroundImage: 'radial-gradient(ellipse at 50% 100%, rgba(34,211,238,0.3) 0%, transparent 70%)',
    }}
  />
);

// Kawaii decorations
const KawaiiSparkles = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {['✨', '💖', '🌸', '⭐'].map((emoji, i) => (
      <span
        key={i}
        className="absolute text-2xl opacity-20 animate-bounce"
        style={{
          left: `${20 + i * 20}%`,
          top: `${10 + i * 5}%`,
          animationDelay: `${i * 0.5}s`,
        }}
      >
        {emoji}
      </span>
    ))}
  </div>
);

// Noir decorations
const NoirVignetteOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0"
    style={{
      background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
    }}
  />
);

// Dark Academia decorations
const DarkAcademiaTextureOverlay = () => (
  <div 
    className="absolute inset-0 pointer-events-none z-0 opacity-5"
    style={{
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23d4a574\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    }}
  />
);

// Theme slots configuration
export const themeSlots: Record<string, ThemeSlots> = {
  cyberpunk: {
    dashboardBackground: <CyberpunkGridOverlay />,
    pageOverlay: <CyberpunkScanlines />,
    progressBarStyle: 'segments',
    useGlowEffects: true,
    useGridBackground: true,
    cardClassName: 'border-2 border-[#ff00ff]/50',
  },
  synthwave: {
    dashboardBackground: <SynthwaveGridOverlay />,
    progressBarStyle: 'smooth',
    useGlowEffects: true,
    useGridBackground: true,
    cardClassName: 'border-2 border-[#ff6ec7]/50',
  },
  space: {
    dashboardBackground: <SpaceStarsOverlay />,
    progressBarStyle: 'smooth',
    useGlowEffects: true,
    cardClassName: 'border border-purple-500/40',
  },
  western: {
    dashboardBackground: <WesternDustOverlay />,
    progressBarStyle: 'smooth',
    cardClassName: 'border-2 border-amber-700/60',
  },
  ocean: {
    dashboardBackground: <OceanWavesOverlay />,
    progressBarStyle: 'rounded',
    cardClassName: 'border border-cyan-500/40',
  },
  kawaii: {
    dashboardBackground: <KawaiiSparkles />,
    progressBarStyle: 'rounded',
    cardClassName: 'border-2 border-pink-200 rounded-3xl',
  },
  noir: {
    dashboardBackground: <NoirVignetteOverlay />,
    progressBarStyle: 'smooth',
    cardClassName: 'border border-white/20',
  },
  'dark-academia': {
    dashboardBackground: <DarkAcademiaTextureOverlay />,
    progressBarStyle: 'smooth',
    cardClassName: 'border border-amber-800/50',
  },
  nordic: {
    progressBarStyle: 'rounded',
    cardClassName: 'border border-slate-200 rounded-xl',
  },
};

// Helper to get theme slots with fallback
export function getThemeSlots(themeId: string): ThemeSlots {
  return themeSlots[themeId] || themeSlots.nordic || {};
}

// Chart colors per theme (moved from financial page)
export const themeChartColors: Record<string, { 
  income: string; 
  expense: string; 
  pie: string[]; 
  axis: string; 
  tooltip: { bg: string; border: string } 
}> = {
  cyberpunk: {
    income: '#00ffff',
    expense: '#ff00ff',
    pie: ['#ff00ff', '#00ffff', '#ff6ec7', '#7b68ee', '#00ff88'],
    axis: '#888',
    tooltip: { bg: '#0a0a12', border: '#ff00ff44' },
  },
  noir: {
    income: '#a0a0a0',
    expense: '#606060',
    pie: ['#808080', '#a0a0a0', '#606060', '#c0c0c0', '#404040'],
    axis: '#666',
    tooltip: { bg: '#0a0a0a', border: '#333' },
  },
  space: {
    income: '#a78bfa',
    expense: '#f472b6',
    pie: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#f472b6', '#60a5fa'],
    axis: '#888',
    tooltip: { bg: '#0f0d1a', border: '#8b5cf644' },
  },
  kawaii: {
    income: '#34d399',
    expense: '#f472b6',
    pie: ['#f472b6', '#a78bfa', '#60a5fa', '#fbbf24', '#34d399'],
    axis: '#999',
    tooltip: { bg: '#fff', border: '#f9a8d4' },
  },
  ocean: {
    income: '#22d3ee',
    expense: '#0891b2',
    pie: ['#06b6d4', '#22d3ee', '#67e8f9', '#0e7490', '#14b8a6'],
    axis: '#7dd3fc',
    tooltip: { bg: '#0c4a6e', border: '#22d3ee44' },
  },
  synthwave: {
    income: '#ffcc00',
    expense: '#ff6ec7',
    pie: ['#ff6ec7', '#ffcc00', '#ff6b35', '#a855f7', '#00ffff'],
    axis: '#ff6ec7',
    tooltip: { bg: '#1a0533', border: '#ff6ec744' },
  },
  western: {
    income: '#fbbf24',
    expense: '#dc2626',
    pie: ['#d97706', '#fbbf24', '#92400e', '#b45309', '#78350f'],
    axis: '#a16207',
    tooltip: { bg: '#451a03', border: '#d9770644' },
  },
  'dark-academia': {
    income: '#d4a574',
    expense: '#8b5a2b',
    pie: ['#a0522d', '#d4a574', '#8b7355', '#6b4423', '#c9a86c'],
    axis: '#8b7355',
    tooltip: { bg: '#1f1a14', border: '#8b735544' },
  },
  nordic: {
    income: '#22c55e',
    expense: '#ef4444',
    pie: ['#64748b', '#94a3b8', '#475569', '#6b8e6b', '#3b82f6'],
    axis: '#94a3b8',
    tooltip: { bg: '#fff', border: '#e2e8f0' },
  },
};

export function getThemeChartColors(themeId: string) {
  return themeChartColors[themeId] || themeChartColors.nordic;
}
