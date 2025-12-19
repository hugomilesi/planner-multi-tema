'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Wallet, CheckSquare, Settings, Plus } from 'lucide-react';
import { useTheme } from '@/themes/ThemeContext';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Home' },
  { href: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { href: '/financial', icon: Wallet, label: 'Money' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

interface NavStyleConfig {
  container: string;
  containerStyle: React.CSSProperties;
  item: string;
  itemActive: string;
  itemInactive: string;
  label: string;
  fab?: {
    className: string;
    style?: React.CSSProperties;
  };
}

const themeNavStyles: Record<string, NavStyleConfig> = {
  cyberpunk: {
    container: 'border-t-2 border-[#ff00ff] rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(18,0,36,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-[#ff00ff]',
    itemInactive: 'text-white/50 hover:text-[#00ffff]',
    label: 'text-[9px] font-bold uppercase tracking-widest',
    fab: {
      className: 'bg-gradient-to-t from-[#bc13fe] to-[#ff00ff] border-2 border-white text-white',
      style: { boxShadow: '0 0 15px rgba(255,0,255,0.6)' },
    },
  },
  synthwave: {
    container: 'border-t-4 border-black rounded-none mx-0 mb-0',
    containerStyle: { background: '#d4d4d4' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-[#4f46e5]',
    itemInactive: 'text-gray-500 hover:text-black',
    label: 'text-[10px] font-bold uppercase',
    fab: {
      className: 'bg-[#fbbf24] border-4 border-black text-black',
      style: { boxShadow: '4px 4px 0px 0px #000000' },
    },
  },
  'dark-academia': {
    container: 'border-t border-[#333333] rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-[#C5A065]',
    itemInactive: 'text-stone-500 hover:text-stone-300',
    label: 'text-[10px] font-medium',
    fab: {
      className: 'bg-[#C5A065] text-white border-0',
      style: { boxShadow: '0 4px 15px rgba(197,160,101,0.3)' },
    },
  },
  western: {
    container: 'border-t-2 border-amber-900/50 rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(69,26,3,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-amber-400',
    itemInactive: 'text-amber-100/50 hover:text-amber-100',
    label: 'text-[10px] font-bold uppercase',
    fab: {
      className: 'bg-amber-600 border-2 border-amber-900 text-white',
      style: { boxShadow: '0 4px 10px rgba(0,0,0,0.4)' },
    },
  },
  space: {
    container: 'border-t border-purple-500/30 rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(13,10,26,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-purple-400',
    itemInactive: 'text-purple-200/50 hover:text-purple-200',
    label: 'text-[10px] font-medium',
    fab: {
      className: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0',
      style: { boxShadow: '0 0 20px rgba(139,92,246,0.4)' },
    },
  },
  kawaii: {
    container: 'border-t border-pink-200 rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-pink-500',
    itemInactive: 'text-gray-400 hover:text-pink-400',
    label: 'text-[10px] font-medium',
    fab: {
      className: 'bg-gradient-to-br from-pink-400 to-pink-500 text-white border-0',
      style: { boxShadow: '0 4px 15px rgba(236,72,153,0.3)' },
    },
  },
  ocean: {
    container: 'border-t border-cyan-500/30 rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(10,26,32,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-cyan-400',
    itemInactive: 'text-cyan-100/50 hover:text-cyan-100',
    label: 'text-[10px] font-medium',
    fab: {
      className: 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white border-0',
      style: { boxShadow: '0 0 20px rgba(34,211,238,0.3)' },
    },
  },
  noir: {
    container: 'border-t border-white/10 rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-white',
    itemInactive: 'text-gray-500 hover:text-gray-300',
    label: 'text-[10px] font-medium',
    fab: {
      className: 'bg-white text-black border-0',
      style: { boxShadow: '0 4px 15px rgba(255,255,255,0.2)' },
    },
  },
  nordic: {
    container: 'border-t border-slate-200 rounded-none mx-0 mb-0',
    containerStyle: { background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)' },
    item: 'flex flex-col items-center gap-1 w-14',
    itemActive: 'text-slate-900',
    itemInactive: 'text-slate-400 hover:text-slate-600',
    label: 'text-[10px] font-medium',
    fab: {
      className: 'bg-slate-900 text-white border-0',
      style: { boxShadow: '0 4px 15px rgba(0,0,0,0.15)' },
    },
  },
};

export function BottomNav() {
  const pathname = usePathname();
  const { themeId } = useTheme();
  const navStyle = themeNavStyles[themeId] || themeNavStyles.nordic;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div 
        className={cn('pb-safe pt-2', navStyle.container)}
        style={navStyle.containerStyle}
      >
        <div className="flex items-end justify-around px-2 pb-4">
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  navStyle.item,
                  'transition-colors',
                  isActive ? navStyle.itemActive : navStyle.itemInactive
                )}
              >
                <Icon className="w-5 h-5" style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined} />
                <span className={navStyle.label}>{item.label}</span>
              </Link>
            );
          })}

          {/* FAB Center Button */}
          {navStyle.fab && (
            <button
              className={cn(
                'flex items-center justify-center -mt-8 w-14 h-14 rounded-full transition-transform active:scale-95 hover:scale-105',
                navStyle.fab.className
              )}
              style={navStyle.fab.style}
            >
              <Plus className="w-7 h-7" />
            </button>
          )}

          {navItems.slice(2).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  navStyle.item,
                  'transition-colors',
                  isActive ? navStyle.itemActive : navStyle.itemInactive
                )}
              >
                <Icon className="w-5 h-5" style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined} />
                <span className={navStyle.label}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
