'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap, Waves } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function OceanSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #0c4a6e 0%, #164e63 30%, #155e75 60%, #0e7490 100%)' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-cyan-300 text-xs tracking-widest mb-1"><Waves className="w-4 h-4" /><span>CONFIGURAÇÕES</span></div>
          <h1 className="text-3xl font-bold text-white">Ajustes</h1>
        </header>

        <div className="mb-6 p-4 rounded-2xl bg-slate-800/40 border border-cyan-500/20">
          <h3 className="text-sm text-cyan-300 mb-4">Escolha o Tema</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 rounded-xl border transition-all', themeId === t.id ? 'border-cyan-500 bg-cyan-500/20' : 'border-cyan-500/20 hover:border-cyan-500/50')}>
                <div className="w-full h-8 rounded-lg mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-teal-900/40 border border-cyan-500/20">
          <h3 className="text-sm text-cyan-300 mb-3">Tema Atual</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="font-bold">{currentTheme.name}</p><p className="text-xs text-cyan-400/60">Ativo</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-slate-800/40 border border-cyan-500/20">
          <h3 className="text-sm text-cyan-300 mb-4">Preferências</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-cyan-400" /><span className="text-sm">Reduzir Animações</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/40 border border-cyan-500/20">
          <h3 className="text-sm text-cyan-300 mb-4">Dados</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-sm flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />Exportar
            </button>
            <button onClick={handleImport} className="py-3 rounded-xl border border-cyan-500/30 text-cyan-300 text-sm flex items-center justify-center gap-2 hover:bg-cyan-500/10">
              <Upload className="w-4 h-4" />Importar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
