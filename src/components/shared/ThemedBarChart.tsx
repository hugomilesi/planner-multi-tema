'use client';

import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';

interface BarData {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface ThemedBarChartProps {
  data: BarData[];
  maxValue?: number;
  showLabels?: boolean;
  className?: string;
  formatValue?: (value: number) => string;
}

// Theme-specific bar chart styles
const themeBarStyles: Record<string, {
  container: string;
  bar: string;
  barSecondary: string;
  barBg: string;
  label: string;
  grid: string;
}> = {
  cyberpunk: {
    container: 'bg-black/30 border border-[#4d008c] p-3',
    bar: 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]',
    barSecondary: 'bg-[#ff00ff] shadow-[0_0_8px_#ff00ff]',
    barBg: 'bg-[#4d008c]/30',
    label: 'text-[#00ffff] text-[10px] font-bold uppercase',
    grid: 'border-[#4d008c]/50',
  },
  synthwave: {
    container: 'bg-[#1a0533]/50 border border-[#ff6ec7]/30 p-3',
    bar: 'bg-gradient-to-t from-[#ff6ec7] to-[#ffcc00]',
    barSecondary: 'bg-gradient-to-t from-[#00ffff] to-[#00ff88]',
    barBg: 'bg-[#2d1b4e]/50',
    label: 'text-[#ff6ec7] text-[10px] font-bold',
    grid: 'border-[#ff6ec7]/20',
  },
  space: {
    container: 'bg-slate-900/50 border border-purple-500/30 p-3 rounded-lg',
    bar: 'bg-gradient-to-t from-purple-600 to-violet-400 rounded-t',
    barSecondary: 'bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t',
    barBg: 'bg-slate-800/50 rounded-t',
    label: 'text-purple-400 text-[10px]',
    grid: 'border-purple-500/20',
  },
  ocean: {
    container: 'bg-slate-800/30 border border-cyan-500/30 p-3 rounded-xl',
    bar: 'bg-gradient-to-t from-cyan-600 to-teal-400 rounded-t',
    barSecondary: 'bg-gradient-to-t from-blue-600 to-sky-400 rounded-t',
    barBg: 'bg-slate-700/30 rounded-t',
    label: 'text-cyan-400 text-[10px]',
    grid: 'border-cyan-500/20',
  },
  noir: {
    container: 'bg-black/50 border border-white/10 p-3',
    bar: 'bg-gradient-to-t from-gray-600 to-white',
    barSecondary: 'bg-gradient-to-t from-gray-800 to-gray-500',
    barBg: 'bg-gray-900/50',
    label: 'text-gray-500 text-[10px] uppercase tracking-wider',
    grid: 'border-white/10',
  },
  western: {
    container: 'bg-amber-950/30 border-2 border-amber-800 p-3',
    bar: 'bg-gradient-to-t from-amber-700 to-amber-500 border border-amber-900 -skew-x-3',
    barSecondary: 'bg-gradient-to-t from-amber-900 to-amber-700 border border-amber-950 -skew-x-3',
    barBg: 'bg-amber-900/20 -skew-x-3',
    label: 'text-amber-400 text-[10px] font-bold uppercase',
    grid: 'border-amber-800/30',
  },
  'dark-academia': {
    container: 'bg-stone-900/30 border border-amber-800/30 p-3',
    bar: 'bg-gradient-to-t from-amber-800 to-amber-600',
    barSecondary: 'bg-gradient-to-t from-stone-700 to-stone-500',
    barBg: 'bg-stone-800/30',
    label: 'text-amber-500 text-[10px]',
    grid: 'border-amber-800/20',
  },
  kawaii: {
    container: 'bg-pink-50 border-2 border-pink-200 p-3 rounded-2xl',
    bar: 'bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-full',
    barSecondary: 'bg-gradient-to-t from-purple-400 to-purple-300 rounded-t-full',
    barBg: 'bg-pink-100 rounded-t-full',
    label: 'text-pink-500 text-[10px] font-medium',
    grid: 'border-pink-200',
  },
  nordic: {
    container: 'bg-slate-50 border border-slate-200 p-3 rounded-xl',
    bar: 'bg-gradient-to-t from-blue-600 to-blue-400 rounded-t',
    barSecondary: 'bg-gradient-to-t from-slate-600 to-slate-400 rounded-t',
    barBg: 'bg-slate-100 rounded-t',
    label: 'text-slate-500 text-[10px]',
    grid: 'border-slate-200',
  },
};

export function ThemedBarChart({ 
  data, 
  maxValue,
  showLabels = true,
  className,
  formatValue
}: ThemedBarChartProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  const styles = themeBarStyles[themeId] || themeBarStyles.nordic;

  const computedMax = Math.max(0, ...data.flatMap((d) => [d.value, d.secondaryValue ?? 0]));
  const max = maxValue ?? (computedMax > 0 ? computedMax * 1.1 : 1);
  const hasSecondary = data.some(d => d.secondaryValue !== undefined);

  const toPct = (value: number) => {
    if (max <= 0) return 0;
    return Math.min(100, Math.max(0, (value / max) * 100));
  };

  return (
    <div className={cn(styles.container, className)}>
      {/* Grid lines */}
      <div className="relative h-32 flex items-end gap-1">
        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={cn('border-t', styles.grid)} />
          ))}
        </div>
        
        {/* Bars */}
        {data.map((item, index) => (
          <div key={index} className="flex-1 h-full flex items-end justify-center gap-0.5 relative z-10">
            {hasSecondary && item.secondaryValue !== undefined && (
              <div
                className={cn('w-2/5 transition-all duration-500', styles.barSecondary)}
                style={{ height: `${toPct(item.secondaryValue)}%` }}
              />
            )}
            <div
              className={cn(
                hasSecondary ? 'w-2/5' : 'w-3/4',
                'transition-all duration-500',
                styles.bar
              )}
              style={{ height: `${toPct(item.value)}%` }}
            />
          </div>
        ))}
      </div>
      
      {/* Labels */}
      {showLabels && (
        <div className="flex gap-1 mt-2 border-t pt-2" style={{ borderColor: 'inherit' }}>
          {data.map((item, index) => (
            <div key={index} className="flex-1 text-center">
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
