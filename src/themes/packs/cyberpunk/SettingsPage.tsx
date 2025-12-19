'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function CyberpunkSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0014] text-white font-[family-name:var(--font-space-grotesk)]"
      style={{ backgroundImage: 'linear-gradient(rgba(255,0,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-[#ff00ff] text-xs tracking-[0.3em] mb-1">
            <div className="w-2 h-2 bg-[#ff00ff]" /><span>SYSTEM://CONFIG</span>
          </div>
          <h1 className="text-3xl font-[family-name:var(--font-orbitron)] text-[#00ffff] tracking-wider">SETTINGS</h1>
        </header>

        {/* Theme Selection */}
        <div className="mb-6 border border-[#ff00ff]/30 bg-[#0f001a] p-4">
          <h3 className="text-xs text-[#ff00ff] tracking-wider mb-4 font-[family-name:var(--font-orbitron)]">SELECT_THEME</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 border transition-all', themeId === t.id ? 'border-[#00ffff] bg-[#00ffff]/10' : 'border-[#ff00ff]/30 hover:border-[#ff00ff]')}>
                <div className="w-full h-8 rounded mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Current Theme */}
        <div className="mb-6 border border-[#00ffff]/30 bg-[#001a1a]/50 p-4">
          <h3 className="text-xs text-[#00ffff] tracking-wider mb-3 font-[family-name:var(--font-orbitron)]">ACTIVE_THEME</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="font-[family-name:var(--font-orbitron)]">{currentTheme.name}</p><p className="text-[10px] text-[#00ffff]/60">LOADED</p></div>
          </div>
        </div>

        {/* Preferences */}
        <div className="mb-6 border border-[#ff00ff]/30 bg-[#0f001a] p-4">
          <h3 className="text-xs text-[#ff00ff] tracking-wider mb-4 font-[family-name:var(--font-orbitron)]">PREFERENCES</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#ff00ff]" /><span className="text-sm">REDUCE_MOTION</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        {/* Data */}
        <div className="border border-[#ff00ff]/30 bg-[#0f001a] p-4">
          <h3 className="text-xs text-[#ff00ff] tracking-wider mb-4 font-[family-name:var(--font-orbitron)]">DATA_MANAGEMENT</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 border border-[#00ffff] text-[#00ffff] text-sm flex items-center justify-center gap-2 hover:bg-[#00ffff]/10">
              <Download className="w-4 h-4" />EXPORT
            </button>
            <button onClick={handleImport} className="py-3 border border-[#ff00ff] text-[#ff00ff] text-sm flex items-center justify-center gap-2 hover:bg-[#ff00ff]/10">
              <Upload className="w-4 h-4" />IMPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
