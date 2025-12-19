'use client';

import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface ThemedStatProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

// Theme-specific stat card accents
const themeStatStyles: Record<string, { iconBg: string; trendUp: string; trendDown: string }> = {
  cyberpunk: {
    iconBg: 'bg-[#ff00ff]/20 text-[#ff00ff]',
    trendUp: 'text-[#00ff00]',
    trendDown: 'text-[#ff0000]',
  },
  synthwave: {
    iconBg: 'bg-[#ff6ec7]/20 text-[#ff6ec7]',
    trendUp: 'text-[#00ff88]',
    trendDown: 'text-[#ff4444]',
  },
  space: {
    iconBg: 'bg-purple-500/20 text-purple-400',
    trendUp: 'text-green-400',
    trendDown: 'text-red-400',
  },
  ocean: {
    iconBg: 'bg-cyan-500/20 text-cyan-400',
    trendUp: 'text-emerald-400',
    trendDown: 'text-rose-400',
  },
  noir: {
    iconBg: 'bg-white/10 text-gray-300',
    trendUp: 'text-gray-300',
    trendDown: 'text-gray-500',
  },
  western: {
    iconBg: 'bg-amber-700/30 text-amber-400',
    trendUp: 'text-green-500',
    trendDown: 'text-red-500',
  },
  'dark-academia': {
    iconBg: 'bg-amber-800/30 text-amber-400',
    trendUp: 'text-green-500',
    trendDown: 'text-red-400',
  },
  kawaii: {
    iconBg: 'bg-pink-100 text-pink-500',
    trendUp: 'text-green-500',
    trendDown: 'text-red-400',
  },
  nordic: {
    iconBg: 'bg-slate-100 text-slate-600',
    trendUp: 'text-green-600',
    trendDown: 'text-red-500',
  },
};

export function ThemedStat({ 
  icon: Icon, 
  label, 
  value, 
  trend,
  trendValue,
  className 
}: ThemedStatProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  const styles = themeStatStyles[themeId] || themeStatStyles.nordic;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn(
        'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
        styles.iconBg
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-xs opacity-70 truncate', visuals.card.titleClassName)}>
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <p className={cn('text-lg font-bold', visuals.fonts.heading)}>
            {value}
          </p>
          {trend && trendValue && (
            <span className={cn(
              'text-xs font-medium',
              trend === 'up' && styles.trendUp,
              trend === 'down' && styles.trendDown,
              trend === 'neutral' && 'opacity-50'
            )}>
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trendValue}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
