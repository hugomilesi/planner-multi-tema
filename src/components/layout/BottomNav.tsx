'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Wallet, CheckSquare, Settings } from 'lucide-react';
import { useTheme } from '@/themes/ThemeContext';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/financial', icon: Wallet, label: 'Financial' },
  { href: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

const themeNavStyles: Record<string, { nav: string; style: React.CSSProperties }> = {
  cyberpunk: {
    nav: 'border-[#ff00ff]/50 text-white',
    style: { background: '#0a0014' },
  },
  noir: {
    nav: 'border-white/20 text-gray-200',
    style: { background: '#0a0a0a' },
  },
  space: {
    nav: 'border-purple-500/40 text-purple-100',
    style: { background: '#0d0a1a' },
  },
  kawaii: {
    nav: 'border-pink-200 text-gray-700',
    style: { background: '#ffffff' },
  },
  ocean: {
    nav: 'border-cyan-500/40 text-cyan-100',
    style: { background: '#0a1a20' },
  },
  synthwave: {
    nav: 'border-[#ff6ec7]/50 text-pink-100',
    style: { background: '#12051f' },
  },
  western: {
    nav: 'border-amber-700/60 text-amber-100',
    style: { background: '#451a03' },
  },
  'dark-academia': {
    nav: 'border-amber-800/50 text-amber-100',
    style: { background: '#1a1510' },
  },
  nordic: {
    nav: 'border-slate-200 text-slate-700',
    style: { background: '#ffffff' },
  },
};

export function BottomNav() {
  const pathname = usePathname();
  const { theme, themeId } = useTheme();
  const navStyle = themeNavStyles[themeId] || themeNavStyles.nordic;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div 
        className={cn('mx-2 mb-2 rounded-2xl border', navStyle.nav)}
        style={navStyle.style}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{ background: theme.tokens.accent + '20' }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="text-xs mt-1 font-medium relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
