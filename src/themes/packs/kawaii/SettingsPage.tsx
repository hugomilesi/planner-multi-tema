'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, Zap, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function KawaiiSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-pink-400 text-xs mb-2"><Sparkles className="w-4 h-4" /><span>Configurações</span><Sparkles className="w-4 h-4" /></div>
          <h1 className="text-3xl font-bold text-pink-500">Ajustes ✨</h1>
        </header>

        <div className="mb-6 p-4 rounded-3xl bg-white/80 border-2 border-pink-200 shadow-sm">
          <h3 className="text-sm text-pink-500 font-medium mb-4">🎨 Escolha o Tema</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={cn('p-2 rounded-xl border-2 transition-all', themeId === t.id ? 'border-pink-400 bg-pink-100' : 'border-pink-200 hover:border-pink-300')}>
                <div className="w-full h-8 rounded-lg mb-1" style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                <p className="text-[10px] truncate text-gray-700">{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200 shadow-sm">
          <h3 className="text-sm text-pink-500 font-medium mb-3">💖 Tema Atual</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl" style={{ background: `linear-gradient(135deg, ${currentTheme.tokens.primary} 0%, ${currentTheme.tokens.accent} 100%)` }} />
            <div><p className="font-bold text-gray-700">{currentTheme.name}</p><p className="text-xs text-pink-400">Ativo agora!</p></div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-3xl bg-white/80 border-2 border-pink-200 shadow-sm">
          <h3 className="text-sm text-pink-500 font-medium mb-4">⚙️ Preferências</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-pink-400" /><span className="text-sm text-gray-700">Reduzir Animações</span></div>
            <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-white/80 border-2 border-pink-200 shadow-sm">
          <h3 className="text-sm text-pink-500 font-medium mb-4">📦 Dados</h3>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleExport} className="py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white text-sm flex items-center justify-center gap-2 shadow-md">
              <Download className="w-4 h-4" />Exportar
            </button>
            <button onClick={handleImport} className="py-3 rounded-xl bg-white border-2 border-pink-200 text-pink-500 text-sm flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />Importar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
