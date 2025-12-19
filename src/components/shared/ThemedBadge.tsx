'use client';

import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';

interface ThemedBadgeProps {
  priority: 'high' | 'medium' | 'low';
  children?: React.ReactNode;
  className?: string;
  animated?: boolean;
}

export function ThemedBadge({ 
  priority, 
  children, 
  className,
  animated = false 
}: ThemedBadgeProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  
  const badgeClass = visuals.badge[priority];
  const label = children || priority.toUpperCase();
  
  // Add pulse animation for high priority badges on futuristic themes
  const shouldPulse = animated && priority === 'high' && 
    ['cyberpunk', 'synthwave', 'space'].includes(themeId);

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
        'transition-all duration-200',
        visuals.fonts.body,
        badgeClass,
        shouldPulse && 'badge-pulse',
        className
      )}
    >
      {label}
    </span>
  );
}
