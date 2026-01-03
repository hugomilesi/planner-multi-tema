import { useTheme } from '@/themes/ThemeContext';
import { useMemo } from 'react';

interface ThemedDialogStyles {
  content: string;
  overlay: string;
  header: string;
  title: string;
  closeButton: string;
}

export function useThemedDialog(): ThemedDialogStyles {
  const { themeId } = useTheme();

  return useMemo(() => {
    const styles: Record<string, ThemedDialogStyles> = {
      cyberpunk: {
        content: 'bg-[#120024] border-2 border-[#ff00ff] shadow-[0_0_30px_rgba(255,0,255,0.5)] rounded-lg',
        overlay: 'bg-black/80 backdrop-blur-sm',
        header: 'border-b border-[#ff00ff]/30 pb-3',
        title: 'text-[#ff00ff] font-orbitron text-xl font-bold tracking-wider',
        closeButton: 'text-[#00ffff] hover:text-[#ff00ff] hover:bg-[#ff00ff]/10',
      },
      western: {
        content: 'bg-[#f3e5ab] border-4 border-double border-[#2c1810] shadow-[4px_4px_0px_rgba(44,24,16,0.3)] rounded-none',
        overlay: 'bg-[#5c4033]/90 backdrop-blur-sm',
        header: 'border-b-2 border-dashed border-[#2c1810] pb-3',
        title: 'text-[#2c1810] font-rye text-xl tracking-wide',
        closeButton: 'text-[#2c1810] hover:bg-[#d4af37]/20 rounded-sm',
      },
      nordic: {
        content: 'bg-white border border-slate-200 shadow-lg rounded-xl',
        overlay: 'bg-slate-900/50 backdrop-blur-sm',
        header: 'border-b border-slate-200 pb-3',
        title: 'text-slate-900 font-inter text-xl font-semibold',
        closeButton: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
      },
      'dark-academia': {
        content: 'bg-[#1a1410] border border-[#C5A065] shadow-[0_4px_20px_rgba(197,160,101,0.3)] rounded-lg',
        overlay: 'bg-black/85 backdrop-blur-sm',
        header: 'border-b border-[#C5A065]/30 pb-3',
        title: 'text-[#C5A065] font-playfair text-xl font-semibold',
        closeButton: 'text-stone-400 hover:text-[#C5A065] hover:bg-[#C5A065]/10',
      },
      ocean: {
        content: 'bg-[#0a1a20] border border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] rounded-xl',
        overlay: 'bg-[#001a2e]/90 backdrop-blur-sm',
        header: 'border-b border-cyan-500/30 pb-3',
        title: 'text-cyan-400 font-space-grotesk text-xl font-bold',
        closeButton: 'text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10',
      },
      synthwave: {
        content: 'bg-[#2d1b69] border-4 border-[#ff6ec7] shadow-[0_0_20px_rgba(255,110,199,0.5)] rounded-lg',
        overlay: 'bg-[#1a0b3d]/90 backdrop-blur-sm',
        header: 'border-b-2 border-[#ffd319] pb-3',
        title: 'text-[#ffd319] font-vt323 text-2xl tracking-wider',
        closeButton: 'text-[#ff6ec7] hover:text-[#ffd319] hover:bg-[#ff6ec7]/10',
      },
      kawaii: {
        content: 'bg-white border-2 border-pink-300 shadow-[0_4px_20px_rgba(236,72,153,0.2)] rounded-3xl',
        overlay: 'bg-pink-100/80 backdrop-blur-sm',
        header: 'border-b-2 border-pink-200 pb-3',
        title: 'text-pink-600 font-fredoka text-xl font-bold',
        closeButton: 'text-pink-400 hover:text-pink-600 hover:bg-pink-100',
      },
      noir: {
        content: 'bg-black border border-white/20 shadow-[0_4px_30px_rgba(255,255,255,0.1)] rounded-lg',
        overlay: 'bg-black/90 backdrop-blur-sm',
        header: 'border-b border-white/20 pb-3',
        title: 'text-white font-roboto-mono text-xl font-bold tracking-wider',
        closeButton: 'text-gray-400 hover:text-white hover:bg-white/10',
      },
      space: {
        content: 'bg-[#0d0a1a] border border-purple-500/30 shadow-[0_0_30px_rgba(139,92,246,0.3)] rounded-xl',
        overlay: 'bg-black/90 backdrop-blur-sm',
        header: 'border-b border-purple-500/30 pb-3',
        title: 'text-purple-400 font-space-grotesk text-xl font-bold',
        closeButton: 'text-purple-300 hover:text-purple-100 hover:bg-purple-500/10',
      },
      'sacred-serenity': {
        content: 'bg-[#f5f3ed] border border-[#8b7355] shadow-[0_4px_20px_rgba(139,115,85,0.2)] rounded-xl',
        overlay: 'bg-[#2d2416]/80 backdrop-blur-sm',
        header: 'border-b border-[#8b7355]/30 pb-3',
        title: 'text-[#5a4a3a] font-lora text-xl font-semibold',
        closeButton: 'text-[#8b7355] hover:text-[#5a4a3a] hover:bg-[#8b7355]/10',
      },
    };

    return styles[themeId] || styles.nordic;
  }, [themeId]);
}
