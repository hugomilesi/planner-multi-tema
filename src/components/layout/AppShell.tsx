'use client';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeBackground } from '@/components/backgrounds';
import { BottomNav } from './BottomNav';
import { SplashScreen } from './SplashScreen';
import { useAuth } from '@/contexts/AuthContext';

interface AppShellProps {
  children: React.ReactNode;
}

const SPLASH_DURATION = 1500;
const SPLASH_SHOWN_KEY = 'planner-splash-shown';

export function AppShell({ children }: AppShellProps) {
  const [showSplash, setShowSplash] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Auth protection
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Save the location we were trying to go to (optional, can implement later)
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Splash screen logic
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

  // Don't render content while checking auth or ensuring splash
  if (isLoading) {
    return <SplashScreen isVisible={true} />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }

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
