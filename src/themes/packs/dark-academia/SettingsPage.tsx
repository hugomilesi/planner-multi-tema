'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap, Feather } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function DarkAcademiaSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen text-stone-200" style={{ background: 'linear-gradient(180deg, #1c1917 0%, #292524 50%, #1c1917 100%)' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6">
          <div className="flex items-center gap-2 text-amber-600 text-xs tracking-widest mb-1 italic"><Feather className="w-3 h-3" /><span>Configurações</span></div>
          <h1 className="text-3xl font-serif text-amber-100">Ajustes</h1>
        </header>

        <div className="mb-6 p-4 rounded bg-stone-900/50 border border-amber-900/30">
          <h3 className="text-sm text-amber-400 font-serif mb-4">Escolha o Tema</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 rounded border transition-all', themeId === t.id ? 'border-amber-600 bg-amber-900/30' : 'border-stone-700 hover:border-amber-700')}>
                <div className="w-full h-8 rounded mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate text-stone-400">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 rounded bg-stone-900/50 border border-amber-900/30">
          <h3 className="text-sm text-amber-400 font-serif mb-3">Tema Atual</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="font-serif text-amber-200">{currentTheme.name}</p><p className="text-xs text-stone-500 italic">Ativo</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded bg-stone-900/50 border border-amber-900/30">
          <h3 className="text-sm text-amber-400 font-serif mb-4">Preferências</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-600" /><span className="text-sm text-stone-300">Reduzir Animações</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 rounded bg-stone-900/50 border border-amber-900/30">
          <h3 className="text-sm text-amber-400 font-serif mb-4">Dados</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 rounded bg-amber-900 text-amber-200 font-serif text-sm flex items-center justify-center gap-2 border border-amber-800 hover:bg-amber-800">
              <Download className="w-4 h-4" />Exportar
            </button>
            <button onClick={handleImport} className="py-3 rounded border border-stone-700 text-stone-400 font-serif text-sm flex items-center justify-center gap-2 hover:bg-stone-800">
              <Upload className="w-4 h-4" />Importar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
