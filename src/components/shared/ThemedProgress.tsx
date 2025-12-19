'use client';

import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';

interface ThemedProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
  animated?: boolean;
}

export function ThemedProgress({ 
  value, 
  max = 100, 
  label, 
  showPercentage = true,
  className,
  animated = true
}: ThemedProgressProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  // Cyberpunk uses segmented progress bar
  if (themeId === 'cyberpunk') {
    const segments = 13;
    const filledSegments = Math.round((percentage / 100) * segments);
    
    return (
      <div className={cn('space-y-2', className)}>
        {(label || showPercentage) && (
          <div className="flex justify-between items-center">
            {label && (
              <span className={cn('text-xs font-bold uppercase tracking-wider', visuals.card.titleClassName)}>
                {label}
              </span>
            )}
            {showPercentage && (
              <span className={cn('text-sm font-black', visuals.fonts.heading, 'text-[#ffff00]')}>
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div className={visuals.progressBar.className}>
          {Array.from({ length: segments }).map((_, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 h-full transition-all duration-150',
                i < filledSegments ? visuals.progressBar.fillClassName : 'bg-[#ff00ff]/20'
              )}
              style={{ transitionDelay: animated ? `${i * 30}ms` : '0ms' }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Synthwave uses gradient with shine effect
  const isFuturistic = ['synthwave', 'space'].includes(themeId);

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className={cn('text-sm font-medium', visuals.card.titleClassName)}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className={cn('text-sm font-semibold', visuals.fonts.body)}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn('relative', visuals.progressBar.className)}>
        <div 
          className={cn(
            'h-full transition-all duration-500 ease-out',
            visuals.progressBar.fillClassName,
            isFuturistic && 'shine-effect'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
