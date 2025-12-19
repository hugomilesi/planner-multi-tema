'use client';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface ThemedButtonProps extends ComponentProps<typeof Button> {
  glow?: boolean;
}

// Theme-specific button styles
const themeButtonStyles: Record<string, { primary: string; secondary: string }> = {
  cyberpunk: {
    primary: 'bg-[#ff00ff] hover:bg-[#ff00ff]/80 text-white border-2 border-[#00ffff]/50 hover:shadow-[0_0_15px_rgba(255,0,255,0.4)]',
    secondary: 'bg-transparent border-2 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff]/10 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)]',
  },
  synthwave: {
    primary: 'bg-gradient-to-r from-[#ff6ec7] to-[#ffcc00] hover:from-[#ff6ec7]/80 hover:to-[#ffcc00]/80 text-black font-bold',
    secondary: 'bg-transparent border-2 border-[#ff6ec7] text-[#ff6ec7] hover:bg-[#ff6ec7]/10',
  },
  space: {
    primary: 'bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white',
    secondary: 'bg-transparent border border-purple-400 text-purple-300 hover:bg-purple-500/10',
  },
  ocean: {
    primary: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white',
    secondary: 'bg-transparent border border-cyan-400 text-cyan-300 hover:bg-cyan-500/10',
  },
  noir: {
    primary: 'bg-white text-black hover:bg-gray-200',
    secondary: 'bg-transparent border border-white/30 text-gray-300 hover:bg-white/5',
  },
  western: {
    primary: 'bg-amber-700 hover:bg-amber-600 text-white border-2 border-amber-900',
    secondary: 'bg-transparent border-2 border-amber-600 text-amber-200 hover:bg-amber-700/20',
  },
  'dark-academia': {
    primary: 'bg-amber-800 hover:bg-amber-700 text-amber-100',
    secondary: 'bg-transparent border border-amber-700 text-amber-300 hover:bg-amber-800/20',
  },
  kawaii: {
    primary: 'bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-300 hover:to-pink-400 text-white rounded-full',
    secondary: 'bg-white border-2 border-pink-300 text-pink-500 hover:bg-pink-50 rounded-full',
  },
  nordic: {
    primary: 'bg-slate-800 hover:bg-slate-700 text-white',
    secondary: 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50',
  },
};

export function ThemedButton({ 
  className, 
  variant = 'default',
  glow = false,
  children,
  ...props 
}: ThemedButtonProps) {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  const styles = themeButtonStyles[themeId] || themeButtonStyles.nordic;
  
  const buttonStyle = variant === 'secondary' ? styles.secondary : styles.primary;
  
  // Add glow effect for futuristic themes
  const shouldGlow = glow && ['cyberpunk', 'synthwave', 'space'].includes(themeId);

  return (
    <Button
      className={cn(
        'transition-all duration-200 tap-scale',
        visuals.fonts.body,
        buttonStyle,
        shouldGlow && 'glow-animate',
        className
      )}
      variant="ghost"
      {...props}
    >
      {children}
    </Button>
  );
}
