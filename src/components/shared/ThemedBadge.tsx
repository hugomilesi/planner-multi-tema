'use client';

import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';

interface ThemedBadgeProps {
  priority: 'high' | 'medium' | 'low';
  children?: React.ReactNode;
  className?: string;
}

export function ThemedBadge({ priority, children, className }: ThemedBadgeProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  
  const badgeClass = visuals.badge[priority];
  const label = children || priority.toUpperCase();

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2 py-0.5 text-xs font-bold uppercase tracking-wide',
        visuals.fonts.body,
        badgeClass,
        className
      )}
    >
      {label}
    </span>
  );
}
