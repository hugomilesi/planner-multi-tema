'use client';

import { ThemeBackground } from '@/components/backgrounds';
import { BottomNav } from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <ThemeBackground />
      <main className="flex-1 pb-24 relative z-10">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
