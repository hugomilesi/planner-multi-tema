'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap, Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function NoirSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-8 border-b border-gray-800 pb-4">
          <div className="text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-2">Configuration</div>
          <h1 className="text-2xl font-bold tracking-wider uppercase">Settings</h1>
        </header>

        <div className="mb-6 p-4 border border-gray-800">
          <h3 className="text-[10px] text-gray-500 tracking-widest uppercase mb-4">Select Theme</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 border transition-all', themeId === t.id ? 'border-white bg-white/10' : 'border-gray-800 hover:border-gray-600')}>
                <div className="w-full h-8 mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate text-gray-400">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 border border-gray-800">
          <h3 className="text-[10px] text-gray-500 tracking-widest uppercase mb-3">Active Theme</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="text-white">{currentTheme.name}</p><p className="text-[10px] text-gray-600">LOADED</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 border border-gray-800">
          <h3 className="text-[10px] text-gray-500 tracking-widest uppercase mb-4">Preferences</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-gray-500" /><span className="text-sm text-gray-300">Reduce Motion</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 border border-gray-800">
          <h3 className="text-[10px] text-gray-500 tracking-widest uppercase mb-4">Data</h3>
          <div className="grid grid-cols-2 gap-0">
            <button onClick={handleExport} className="py-3 bg-white text-black text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gray-200">
              <Download className="w-4 h-4" />Export
            </button>
            <button onClick={handleImport} className="py-3 border border-gray-800 border-l-0 text-gray-500 text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white">
              <Upload className="w-4 h-4" />Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
