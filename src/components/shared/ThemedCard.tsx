'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';

interface ThemedCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  delay?: number;
  variant?: 'default' | 'featured';
  interactive?: boolean;
}

// Theme-specific hover classes
const themeHoverStyles: Record<string, string> = {
  cyberpunk: 'hover:border-[#00ffff]/70 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]',
  synthwave: 'hover:border-[#ff6ec7]/70 hover:shadow-[0_0_20px_rgba(255,110,199,0.2)]',
  space: 'hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
  ocean: 'hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]',
  noir: 'hover:border-white/30',
  western: 'hover:border-amber-600/80',
  'dark-academia': 'hover:border-amber-700/70',
  kawaii: 'hover:border-pink-300 hover:shadow-lg hover:shadow-pink-200/30',
  nordic: 'hover:border-slate-300 hover:shadow-md',
};

export function ThemedCard({ 
  children, 
  title, 
  className, 
  variant = 'default',
  interactive = true 
}: ThemedCardProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);

  const isFeatured = variant === 'featured';
  const hoverStyle = themeHoverStyles[themeId] || themeHoverStyles.nordic;

  return (
    <Card 
      className={cn(
        'border overflow-hidden',
        'transition-all duration-200 ease-out',
        interactive && 'card-hover',
        interactive && hoverStyle,
        visuals.card.className,
        visuals.fonts.body,
        isFeatured && 'relative',
        className
      )}
      style={visuals.card.style}
    >
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className={cn(
            'text-lg',
            visuals.fonts.heading, 
            visuals.card.titleClassName
          )}>
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? '' : 'pt-6'}>{children}</CardContent>
    </Card>
  );
}
