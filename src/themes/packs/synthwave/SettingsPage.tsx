'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap, Music } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function SynthwaveSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]" style={{ background: 'linear-gradient(180deg, #1a0533 0%, #2d1b4e 40%, #1a0533 100%)' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-[#ff6ec7] text-xs tracking-[0.2em] mb-1"><Music className="w-3 h-3" /><span>CONFIG</span></div>
          <h1 className="text-4xl font-bold" style={{ background: 'linear-gradient(180deg, #ff6ec7 0%, #ffcc00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SETTINGS</h1>
        </header>

        <div className="mb-6 p-4 border-2 border-[#ff6ec7]/50 bg-[#2d1b4e]/80" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
          <h3 className="text-sm text-[#ff6ec7] mb-4">Select Theme</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 border-2 transition-all', themeId === t.id ? 'border-[#ffcc00] bg-[#ffcc00]/10' : 'border-[#ff6ec7]/30 hover:border-[#ff6ec7]')}
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}>
                <div className="w-full h-8 mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 border-2 border-[#ffcc00]/50 bg-[#2d1b4e]/80" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
          <h3 className="text-sm text-[#ffcc00] mb-3">Active Theme</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)`, clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }} />
            <div><p className="font-bold">{currentTheme.name}</p><p className="text-xs text-[#ffcc00]/60">LOADED</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 border-2 border-[#ff6ec7]/50 bg-[#2d1b4e]/80" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
          <h3 className="text-sm text-[#ff6ec7] mb-4">Preferences</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#ffcc00]" /><span className="text-sm">Reduce Motion</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 border-2 border-[#ff6ec7]/50 bg-[#2d1b4e]/80" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
          <h3 className="text-sm text-[#ff6ec7] mb-4">Data</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 bg-gradient-to-r from-[#ff6ec7] to-[#ffcc00] text-black font-bold text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />Export
            </button>
            <button onClick={handleImport} className="py-3 border-2 border-[#00ffff] text-[#00ffff] text-sm flex items-center justify-center gap-2 hover:bg-[#00ffff]/10">
              <Upload className="w-4 h-4" />Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
