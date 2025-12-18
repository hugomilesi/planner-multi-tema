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
}

export function ThemedCard({ children, title, className, variant = 'default' }: ThemedCardProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);

  const isFeatured = variant === 'featured';

  return (
    <Card 
      className={cn(
        'border transition-all overflow-hidden',
        visuals.card.className,
        visuals.fonts.body,
        isFeatured && 'relative',
        className
      )}
      style={visuals.card.style}
    >
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className={cn('text-lg', visuals.fonts.heading, visuals.card.titleClassName)}>
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? '' : 'pt-6'}>{children}</CardContent>
    </Card>
  );
}
