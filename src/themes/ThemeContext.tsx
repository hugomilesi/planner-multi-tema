'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemePack, ThemeId } from './types';
import { getTheme, DEFAULT_THEME } from './registry';

interface ThemeContextType {
  theme: ThemePack;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'planner-theme';
const REDUCE_MOTION_KEY = 'planner-reduce-motion';

function applyThemeTokens(theme: ThemePack) {
  const root = document.documentElement;
  const { tokens } = theme;

  root.style.setProperty('--background', tokens.background);
  root.style.setProperty('--foreground', tokens.foreground);
  root.style.setProperty('--card', tokens.card);
  root.style.setProperty('--card-foreground', tokens.cardForeground);
  root.style.setProperty('--primary', tokens.primary);
  root.style.setProperty('--primary-foreground', tokens.primaryForeground);
  root.style.setProperty('--secondary', tokens.secondary);
  root.style.setProperty('--secondary-foreground', tokens.secondaryForeground);
  root.style.setProperty('--muted', tokens.muted);
  root.style.setProperty('--muted-foreground', tokens.mutedForeground);
  root.style.setProperty('--accent', tokens.accent);
  root.style.setProperty('--accent-foreground', tokens.accentForeground);
  root.style.setProperty('--destructive', tokens.destructive);
  root.style.setProperty('--border', tokens.border);
  root.style.setProperty('--input', tokens.input);
  root.style.setProperty('--ring', tokens.ring);
  root.style.setProperty('--radius', tokens.radius);
  root.style.setProperty('--chart-1', tokens.chart1);
  root.style.setProperty('--chart-2', tokens.chart2);
  root.style.setProperty('--chart-3', tokens.chart3);
  root.style.setProperty('--chart-4', tokens.chart4);
  root.style.setProperty('--chart-5', tokens.chart5);

  if (tokens.glow) {
    root.style.setProperty('--glow', tokens.glow);
  }
  if (tokens.gradientStart) {
    root.style.setProperty('--gradient-start', tokens.gradientStart);
  }
  if (tokens.gradientEnd) {
    root.style.setProperty('--gradient-end', tokens.gradientEnd);
  }

  root.setAttribute('data-theme', theme.id);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(DEFAULT_THEME);
  const [theme, setThemeState] = useState<ThemePack>(getTheme(DEFAULT_THEME));
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
    const savedReduceMotion = localStorage.getItem(REDUCE_MOTION_KEY);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (savedTheme && getTheme(savedTheme)) {
      setThemeId(savedTheme);
      setThemeState(getTheme(savedTheme));
    }

    if (savedReduceMotion !== null) {
      setReduceMotionState(savedReduceMotion === 'true');
    } else if (prefersReducedMotion) {
      setReduceMotionState(true);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      applyThemeTokens(theme);
    }
  }, [theme, mounted]);

  const setTheme = useCallback((id: ThemeId) => {
    const newTheme = getTheme(id);
    setThemeId(id);
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, id);
  }, []);

  const setReduceMotion = useCallback((value: boolean) => {
    setReduceMotionState(value);
    localStorage.setItem(REDUCE_MOTION_KEY, String(value));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, themeId, setTheme, reduceMotion, setReduceMotion }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
