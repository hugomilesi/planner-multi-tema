'use client';

import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';

interface PieData {
  name: string;
  value: number;
  color?: string;
}

interface ThemedPieChartProps {
  data: PieData[];
  size?: number;
  showLegend?: boolean;
  className?: string;
  formatValue?: (value: number) => string;
}

// Theme-specific pie chart colors
const themePieColors: Record<string, string[]> = {
  cyberpunk: ['#ff00ff', '#00ffff', '#ffff00', '#ff6600', '#00ff00', '#ff0066'],
  synthwave: ['#ff6ec7', '#ffcc00', '#00ffff', '#ff4444', '#00ff88', '#aa00ff'],
  space: ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b'],
  ocean: ['#06b6d4', '#0891b2', '#0e7490', '#14b8a6', '#2dd4bf', '#22d3ee'],
  noir: ['#ffffff', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151'],
  western: ['#d97706', '#b45309', '#92400e', '#78350f', '#fbbf24', '#f59e0b'],
  'dark-academia': ['#d97706', '#92400e', '#78716c', '#57534e', '#a8a29e', '#78350f'],
  kawaii: ['#f472b6', '#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#fb7185'],
  nordic: ['#3b82f6', '#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
};

// Theme-specific styles
const themePieStyles: Record<string, {
  container: string;
  ring: string;
  center: string;
  legend: string;
  legendDot: string;
}> = {
  cyberpunk: {
    container: 'relative',
    ring: 'drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]',
    center: 'bg-[#120024] border-2 border-[#ff00ff]/50',
    legend: 'text-[10px] text-[#00ffff] uppercase tracking-wider',
    legendDot: 'shadow-[0_0_5px_currentColor]',
  },
  synthwave: {
    container: 'relative',
    ring: 'drop-shadow-[0_0_8px_rgba(255,110,199,0.4)]',
    center: 'bg-[#1a0533] border-2 border-[#ff6ec7]/30',
    legend: 'text-[10px] text-[#ff6ec7]',
    legendDot: '',
  },
  space: {
    container: 'relative',
    ring: 'drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]',
    center: 'bg-slate-900 border border-purple-500/30',
    legend: 'text-[10px] text-purple-300',
    legendDot: '',
  },
  ocean: {
    container: 'relative',
    ring: '',
    center: 'bg-slate-800 border border-cyan-500/30',
    legend: 'text-[10px] text-cyan-300',
    legendDot: '',
  },
  noir: {
    container: 'relative',
    ring: '',
    center: 'bg-black border border-white/20',
    legend: 'text-[10px] text-gray-400 uppercase tracking-wider',
    legendDot: '',
  },
  western: {
    container: 'relative',
    ring: '',
    center: 'bg-amber-950 border-2 border-amber-700',
    legend: 'text-[10px] text-amber-300 font-bold',
    legendDot: 'border border-amber-900',
  },
  'dark-academia': {
    container: 'relative',
    ring: '',
    center: 'bg-stone-900 border border-amber-800/50',
    legend: 'text-[10px] text-amber-400',
    legendDot: '',
  },
  kawaii: {
    container: 'relative',
    ring: 'drop-shadow-lg',
    center: 'bg-white border-2 border-pink-200',
    legend: 'text-[10px] text-pink-500 font-medium',
    legendDot: 'rounded-full',
  },
  nordic: {
    container: 'relative',
    ring: '',
    center: 'bg-white border border-slate-200',
    legend: 'text-[10px] text-slate-600',
    legendDot: 'rounded-full',
  },
};

export function ThemedPieChart({ 
  data, 
  size = 160,
  showLegend = true,
  className,
  formatValue
}: ThemedPieChartProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  const colors = themePieColors[themeId] || themePieColors.nordic;
  const styles = themePieStyles[themeId] || themePieStyles.nordic;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate segments
  let currentAngle = -90; // Start from top
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
      color: item.color || colors[index % colors.length],
    };
  });

  // Create conic gradient
  const gradientStops = segments.map((seg, i) => {
    const start = ((seg.startAngle + 90) / 360) * 100;
    const end = ((seg.endAngle + 90) / 360) * 100;
    return `${seg.color} ${start}% ${end}%`;
  }).join(', ');

  const innerSize = size * 0.55;

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Pie Chart */}
      <div className={cn(styles.container, styles.ring)} style={{ width: size, height: size }}>
        <div 
          className="w-full h-full rounded-full"
          style={{ 
            background: `conic-gradient(${gradientStops})`,
          }}
        />
        {/* Center hole */}
        <div 
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center',
            styles.center
          )}
          style={{ width: innerSize, height: innerSize }}
        >
          <div className="text-center">
            <p className={cn('text-lg font-bold', visuals.fonts.heading)}>
              {formatValue ? formatValue(total) : total}
            </p>
            <p className="text-[10px] opacity-60">Total</p>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {segments.map((seg, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <div 
                className={cn('w-2.5 h-2.5 shrink-0', styles.legendDot)}
                style={{ backgroundColor: seg.color }}
              />
              <span className={styles.legend}>
                {seg.name} ({Math.round(seg.percentage)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
