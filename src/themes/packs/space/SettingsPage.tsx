'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function SpaceSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #0f0a1e 0%, #1a1035 50%, #0d0d2b 100%)' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-purple-400 text-xs tracking-widest mb-1"><Sparkles className="w-3 h-3" /><span>SETTINGS</span></div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Configuration</h1>
        </header>

        <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 border border-purple-500/20">
          <h3 className="text-sm text-purple-300 mb-4">Select Theme</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 rounded-xl border transition-all', themeId === t.id ? 'border-purple-500 bg-purple-500/20' : 'border-purple-500/20 hover:border-purple-500/50')}>
                <div className="w-full h-8 rounded-lg mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/20">
          <h3 className="text-sm text-purple-300 mb-3">Active Theme</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="font-bold">{currentTheme.name}</p><p className="text-xs text-purple-400/60">Currently active</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 border border-purple-500/20">
          <h3 className="text-sm text-purple-300 mb-4">Preferences</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /><span className="text-sm">Reduce Motion</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/50 border border-purple-500/20">
          <h3 className="text-sm text-purple-300 mb-4">Data Management</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />Export
            </button>
            <button onClick={handleImport} className="py-3 rounded-xl border border-purple-500/30 text-purple-300 text-sm flex items-center justify-center gap-2 hover:bg-purple-500/10">
              <Upload className="w-4 h-4" />Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
