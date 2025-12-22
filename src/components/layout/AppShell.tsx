'use client';

import { useState, useEffect } from 'react';
import { ThemeBackground } from '@/components/backgrounds';
import { BottomNav } from './BottomNav';
import { SplashScreen } from './SplashScreen';

interface AppShellProps {
  children: React.ReactNode;
}

const SPLASH_DURATION = 1500;
const SPLASH_SHOWN_KEY = 'planner-splash-shown';

export function AppShell({ children }: AppShellProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashShown = sessionStorage.getItem(SPLASH_SHOWN_KEY);
    
    if (splashShown) {
      setShowSplash(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem(SPLASH_SHOWN_KEY, 'true');
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <SplashScreen isVisible={showSplash} />
      <ThemeBackground />
      <main className="flex-1 pb-24 relative z-10">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
