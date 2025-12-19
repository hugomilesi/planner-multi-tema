'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function WesternSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen font-[family-name:var(--font-rye)]" style={{ backgroundColor: '#EFE6DD' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6">
          <div className="text-amber-800/60 text-xs tracking-[0.2em] mb-1 font-[family-name:var(--font-courier-prime)]">CONFIGURAÇÕES</div>
          <h1 className="text-3xl text-amber-900">Ajustes</h1>
        </header>

        <div className="mb-6 p-4 bg-[#F4ECD8] border-2 border-amber-700" style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}>
          <h3 className="text-sm text-amber-800 mb-4 font-[family-name:var(--font-courier-prime)]">Escolha o Tema</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 border-2 transition-all', themeId === t.id ? 'border-amber-900 bg-amber-200' : 'border-amber-600 hover:border-amber-800')}>
                <div className="w-full h-8 rounded mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate text-amber-900">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 bg-[#F4ECD8] border-2 border-amber-800 transform rotate-[-0.5deg]" style={{ boxShadow: '4px 4px 0 rgba(139,69,19,0.3)' }}>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-700 border-2 border-amber-900" />
          <h3 className="text-sm text-amber-800 mb-3 font-[family-name:var(--font-courier-prime)]">Tema Atual</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 border-2 border-amber-700" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="text-amber-900">{currentTheme.name}</p><p className="text-[10px] text-amber-700">Ativo</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-[#F4ECD8] border-2 border-amber-700" style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}>
          <h3 className="text-sm text-amber-800 mb-4 font-[family-name:var(--font-courier-prime)]">Preferências</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-700" /><span className="text-sm text-amber-900">Reduzir Animações</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 bg-[#F4ECD8] border-2 border-amber-700" style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}>
          <h3 className="text-sm text-amber-800 mb-4 font-[family-name:var(--font-courier-prime)]">Dados</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 bg-amber-800 text-amber-100 text-sm flex items-center justify-center gap-2 border-2 border-amber-900">
              <Download className="w-4 h-4" />Exportar
            </button>
            <button onClick={handleImport} className="py-3 bg-amber-100 text-amber-800 text-sm flex items-center justify-center gap-2 border-2 border-amber-700">
              <Upload className="w-4 h-4" />Importar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
