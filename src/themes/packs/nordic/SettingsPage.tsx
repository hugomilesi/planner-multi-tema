'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap, Snowflake } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function NordicSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs tracking-widest mb-1"><Snowflake className="w-3 h-3" /><span>CONFIGURAÇÕES</span></div>
          <h1 className="text-2xl font-semibold text-slate-800">Ajustes</h1>
        </header>

        <div className="mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-600 mb-4">Escolha o Tema</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 rounded-xl border-2 transition-all', themeId === t.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300')}>
                <div className="w-full h-8 rounded-lg mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate text-slate-600">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-600 mb-3">Tema Atual</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="font-semibold text-slate-800">{currentTheme.name}</p><p className="text-xs text-slate-400">Ativo</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-600 mb-4">Preferências</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-blue-500" /><span className="text-sm text-slate-700">Reduzir Animações</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-600 mb-4">Dados</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 rounded-xl bg-blue-500 text-white text-sm flex items-center justify-center gap-2 hover:bg-blue-600">
              <Download className="w-4 h-4" />Exportar
            </button>
            <button onClick={handleImport} className="py-3 rounded-xl border border-slate-200 text-slate-600 text-sm flex items-center justify-center gap-2 hover:bg-slate-50">
              <Upload className="w-4 h-4" />Importar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
