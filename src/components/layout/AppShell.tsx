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

  // Auth protection - redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate, location.pathname]);

  // Splash screen logic - only show on first authenticated session
  useEffect(() => {
    if (!isAuthenticated) {
      setShowSplash(false);
      return;
    }

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
  }, [isAuthenticated]);

  // Show splash while loading auth
  if (isLoading) {
    return null; // Don't show splash while checking auth
  }

  // Don't render content if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
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
