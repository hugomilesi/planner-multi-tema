'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, ChevronLeft, ChevronRight, Bell, DollarSign, Calendar, User, Check, LogOut, Palette, Settings, Shield } from 'lucide-react';

export function SynthwaveSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen text-[#e2e2e2] font-[family-name:var(--font-vt323)]"
      style={{
        backgroundColor: '#202028',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}>

      <div className="relative pb-24">
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center bg-[#202028]/95 backdrop-blur-sm px-4 py-4 justify-between border-b-4 border-black mb-4"
          style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
          <button className="flex w-10 h-10 shrink-0 items-center justify-center border-2 border-[#e2e2e2] bg-[#2d2d35] cursor-pointer hover:bg-[#e2e2e2] hover:text-[#202028] transition-all group active:translate-y-1"
            style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </button>
          <h2 className="text-xs font-[family-name:var(--font-press-start)] tracking-widest text-center text-[#facc15] uppercase pt-1"
            style={{ textShadow: '2px 2px 0 rgba(0,0,0,1)' }}>
            Settings
          </h2>
          <div className="w-10" />
        </div>

        {/* Appearance Section */}
        <div className="flex flex-col w-full mb-4">
          <div className="flex items-center gap-3 px-6 pb-3 pt-2">
            <div className="p-1 bg-[#3b82f6] border-2 border-black"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              <Palette className="w-4 h-4 text-black" />
            </div>
            <h3 className="text-[#3b82f6] text-xs font-[family-name:var(--font-press-start)] uppercase tracking-widest leading-none pt-2">
              Appearance
            </h3>
          </div>

          {/* Theme Carousel */}
          <div className="w-full bg-black/30 border-y-4 border-black py-6 relative">
            <div className="absolute top-0 left-4 -translate-y-1/2 bg-[#facc15] text-black text-[10px] font-[family-name:var(--font-press-start)] px-3 py-1 border-2 border-black z-10 transform -rotate-1"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              SELECT THEME
            </div>
            <div className="flex w-full overflow-x-auto px-6 no-scrollbar gap-6 snap-x items-start pt-2 pb-2">
              {themeList.map((t) => {
                const isActive = themeId === t.id;
                return (
                  <button key={t.id} onClick={() => setTheme(t.id)}
                    className="flex flex-col gap-3 shrink-0 snap-center cursor-pointer group">
                    <div className={cn(
                      'relative w-32 h-48 border-4 bg-[#2d2d35] transform transition-transform active:scale-95 hover:-translate-y-1',
                      isActive ? 'border-[#facc15]' : 'border-[#4b4b52] hover:border-[#e2e2e2]'
                    )}
                      style={{ boxShadow: isActive ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000' }}>
                      <div className="absolute inset-0 m-1 border-2 border-black/20 overflow-hidden bg-black">
                        <div className="w-full h-full opacity-90"
                          style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }}>
                          <div className="absolute inset-0 bg-[#3b82f6]/20 mix-blend-overlay" />
                        </div>
                        <div className="absolute inset-0 opacity-30 pointer-events-none"
                          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDAsIDAsIDAuMikiLz4KPC9zdmc+')" }} />
                      </div>
                      {isActive && (
                        <div className="absolute -bottom-3 -right-3 bg-[#facc15] text-black border-2 border-black w-8 h-8 flex items-center justify-center z-20"
                          style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className={cn(
                      'text-center bg-[#2d2d35] border-2 py-1 px-2 mt-1',
                      isActive ? 'border-black' : 'border-black/50 group-hover:border-[#e2e2e2]'
                    )}
                      style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                      <p className={cn(
                        'text-xl leading-none uppercase font-bold tracking-tight',
                        isActive ? 'text-[#facc15]' : 'text-gray-400 group-hover:text-white'
                      )}>
                        {t.name}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Player 1 Section */}
        <div className="flex flex-col w-full mb-6 mt-4">
          <div className="flex items-center gap-3 px-6 pb-3">
            <div className="p-1 bg-[#ff4d4d] border-2 border-black"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              <User className="w-4 h-4 text-black" />
            </div>
            <h3 className="text-[#ff4d4d] text-xs font-[family-name:var(--font-press-start)] uppercase tracking-widest leading-none pt-2">
              Player 1
            </h3>
          </div>
          <div className="mx-4 bg-[#2d2d35] border-2 border-black"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <div className="flex items-center p-3 border-b-2 border-black hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="w-14 h-14 border-2 border-[#e2e2e2] mr-4 p-0.5 bg-black"
                style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                <div className="w-full h-full bg-gradient-to-br from-[#3b82f6] to-[#a855f7] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-2xl leading-none text-white mb-1 tracking-tight">PLAYER ONE</h4>
                <p className="text-lg text-gray-400 font-normal tracking-tight">player@arcade.com</p>
              </div>
              <ChevronRight className="w-6 h-6 text-[#e2e2e2] group-hover:text-[#facc15] transition-colors group-hover:translate-x-1" />
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#facc15] border-2 border-transparent bg-black/20 group-hover:border-[#facc15] transition-colors">
                  <span className="text-xl">★</span>
                </div>
                <span className="text-2xl leading-none pt-1">SUBSCRIPTION</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-[family-name:var(--font-press-start)] text-black bg-[#facc15] px-2 py-1 border-2 border-white/50">PRO</span>
                <ChevronRight className="w-6 h-6 text-[#e2e2e2] group-hover:text-[#facc15] transition-colors group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* System Config Section */}
        <div className="flex flex-col w-full mb-6">
          <div className="flex items-center gap-3 px-6 pb-3">
            <div className="p-1 bg-[#4ade80] border-2 border-black"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              <Settings className="w-4 h-4 text-black" />
            </div>
            <h3 className="text-[#4ade80] text-xs font-[family-name:var(--font-press-start)] uppercase tracking-widest leading-none pt-2">
              System Config
            </h3>
          </div>
          <div className="mx-4 bg-[#2d2d35] border-2 border-black"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <div className="flex items-center justify-between p-3 border-b-2 border-black">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#facc15] bg-black/20">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="text-2xl leading-none pt-1">REDUCE MOTION</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative w-14 h-7 border-2 border-black cursor-pointer transition-all active:translate-y-0.5 hover:brightness-110',
                  reduceMotion ? 'bg-[#4ade80]' : 'bg-gray-700'
                )}
                style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                <div className={cn(
                  'absolute top-0.5 w-5 h-5 bg-white border-2 border-black transition-all',
                  reduceMotion ? 'right-0.5' : 'left-0.5'
                )} />
                <span className={cn(
                  'absolute top-1 text-[10px] text-black font-[family-name:var(--font-press-start)] font-bold',
                  reduceMotion ? 'left-1.5' : 'right-1 opacity-50'
                )}>
                  {reduceMotion ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between p-3 border-b-2 border-black hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#4ade80] bg-black/20 group-hover:text-[#4ade80]/80">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-2xl leading-none pt-1">CURRENCY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-400 group-hover:text-white font-mono">BRL (R$)</span>
                <ChevronRight className="w-6 h-6 text-[#e2e2e2] group-hover:text-[#4ade80] transition-colors group-hover:translate-x-1" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#a855f7] bg-black/20 group-hover:text-[#a855f7]/80">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-2xl leading-none pt-1">START WEEK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl text-gray-400 group-hover:text-white font-mono">MONDAY</span>
                <ChevronRight className="w-6 h-6 text-[#e2e2e2] group-hover:text-[#a855f7] transition-colors group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="flex flex-col w-full mb-8">
          <div className="flex items-center gap-3 px-6 pb-3">
            <div className="p-1 bg-gray-500 border-2 border-black"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              <Shield className="w-4 h-4 text-black" />
            </div>
            <h3 className="text-gray-400 text-xs font-[family-name:var(--font-press-start)] uppercase tracking-widest leading-none pt-2">
              Security
            </h3>
          </div>
          <div className="mx-4 bg-[#2d2d35] border-2 border-black"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <button onClick={handleExport}
              className="flex items-center justify-between p-3 w-full border-b-2 border-black hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-gray-400 bg-black/20 group-hover:text-white">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-2xl leading-none pt-1">EXPORT DATA</span>
              </div>
              <ChevronRight className="w-6 h-6 text-[#e2e2e2] group-hover:text-white transition-colors group-hover:translate-x-1" />
            </button>
            <button onClick={handleImport}
              className="flex items-center justify-between p-3 w-full border-b-2 border-black hover:bg-white/5 cursor-pointer group transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#3b82f6] bg-black/20 group-hover:text-[#3b82f6]/80">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-2xl leading-none pt-1">IMPORT DATA</span>
              </div>
              <ChevronRight className="w-6 h-6 text-[#e2e2e2] group-hover:text-[#3b82f6] transition-colors group-hover:translate-x-1" />
            </button>
            <div className="flex items-center justify-center p-3 hover:bg-[#ff4d4d]/10 cursor-pointer border-t-4 border-black/50 transition-colors">
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-[#ff4d4d]" />
                <span className="text-xs font-[family-name:var(--font-press-start)] font-bold text-[#ff4d4d] uppercase tracking-wide hover:scale-105 transition-transform">
                  Log Out
                </span>
              </div>
            </div>
          </div>

          {/* Version */}
          <div className="text-center mt-8 pb-8 opacity-40 hover:opacity-100 transition-opacity cursor-default">
            <p className="text-[10px] font-[family-name:var(--font-press-start)] text-gray-500">
              v2.4.0 <span className="text-gray-600">[BUILD 302]</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
