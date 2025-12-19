'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, ChevronLeft, ChevronRight, Bell, DollarSign, Calendar, User, Check, LogOut } from 'lucide-react';

export function WesternSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen font-[family-name:var(--font-courier-prime)] text-[#3E2723]"
      style={{ backgroundColor: '#E8DCC5' }}>

      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center bg-[#D7CCC8]/95 backdrop-blur-sm px-4 py-3 justify-between border-b-4 border-[#5D4037] shadow-md">
          <button className="w-10 h-10 rounded-full border-2 border-[#5D4037]/30 hover:bg-[#5D4037]/10 flex items-center justify-center text-[#3E2723] transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-[family-name:var(--font-rye)] tracking-widest flex-1 text-center pr-10 text-[#3E2723]"
            style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>
            SETTINGS
          </h2>
        </div>

        {/* Wanted Styles Section */}
        <div className="flex flex-col w-full mt-4">
          <div className="flex items-center px-6 pb-2 pt-2">
            <span className="h-px flex-1 bg-[#5D4037]/30" />
            <h3 className="text-[#5D4037] text-sm font-[family-name:var(--font-rye)] uppercase tracking-wider px-3">Wanted Styles</h3>
            <span className="h-px flex-1 bg-[#5D4037]/30" />
          </div>

          {/* Theme Carousel */}
          <div className="flex w-full overflow-x-auto px-4 pb-6 pt-2 no-scrollbar gap-5 snap-x">
            {themeList.map((t) => {
              const isActive = themeId === t.id;
              return (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  className="flex flex-col gap-3 shrink-0 snap-center cursor-pointer group">
                  <div className={cn(
                    'relative w-32 h-48 p-1.5 rounded-sm transform transition-transform active:scale-95 border',
                    isActive
                      ? 'bg-[#5D4037] border-[#3E2723]'
                      : 'bg-[#8D6E63] border-[#5D4037] hover:shadow-lg'
                  )}
                    style={isActive ? { boxShadow: '3px 3px 0px 0px rgba(62,39,35,0.4)' } : {}}>
                    {/* Corner nails */}
                    {isActive && (
                      <>
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-[#1a1a1a] shadow-sm z-20" />
                        <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-[#1a1a1a] shadow-sm z-20" />
                        <div className="absolute bottom-0.5 left-0.5 w-1 h-1 rounded-full bg-[#1a1a1a] shadow-sm z-20" />
                        <div className="absolute bottom-0.5 right-0.5 w-1 h-1 rounded-full bg-[#1a1a1a] shadow-sm z-20" />
                      </>
                    )}
                    <div className="relative w-full h-full border border-[#8D6E63] overflow-hidden bg-[#FFF8E1]">
                      <div className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)`,
                          filter: 'sepia(0.3)',
                        }} />
                      <div className="absolute inset-0 bg-[#5D4037]/20 mix-blend-overlay" />
                      {isActive && (
                        <div className="absolute -bottom-2 -right-2 bg-[#FFB300] text-[#3E2723] rounded-full p-1 shadow-md flex items-center justify-center border-2 border-[#3E2723]">
                          <Check className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={cn(
                    'px-2 py-1 rounded-sm shadow-sm mx-auto -rotate-1',
                    isActive ? 'bg-[#FFF8E1] border border-[#5D4037]/50' : ''
                  )}>
                    <p className={cn(
                      'text-center text-sm font-bold font-[family-name:var(--font-rye)]',
                      isActive ? 'text-[#3E2723]' : 'text-[#5D4037]/70 group-hover:text-[#3E2723]'
                    )}>
                      {t.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Identity Section */}
        <div className="flex flex-col w-full mb-6 mt-2">
          <div className="flex items-center px-6 pb-2">
            <h3 className="text-[#5D4037] text-sm font-[family-name:var(--font-rye)] uppercase tracking-wider">Identity</h3>
            <span className="h-px flex-1 ml-3 bg-[#5D4037]/30" />
          </div>
          <div className="mx-4 bg-[#FFF8E1] rounded-sm overflow-hidden border-2 border-[#5D4037] relative"
            style={{ boxShadow: '3px 3px 0px 0px rgba(62,39,35,0.4)' }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }} />
            
            <div className="relative flex items-center p-4 border-b-2 border-dashed border-[#5D4037]/30 hover:bg-[#5D4037]/10 transition-colors cursor-pointer group">
              <div className="w-14 h-14 rounded-full border-2 border-[#5D4037] p-0.5 mr-4 bg-[#D7CCC8]">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8D6E63] to-[#5D4037] flex items-center justify-center"
                  style={{ filter: 'sepia(0.4)' }}>
                  <User className="w-6 h-6 text-[#FFF8E1]" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-[family-name:var(--font-rye)] text-[#3E2723]">Partner</h4>
                <p className="text-sm text-[#5D4037] italic">user@frontier.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5D4037] group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="relative flex items-center justify-between p-4 hover:bg-[#5D4037]/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#BF360C]">
                  <Check className="w-6 h-6" />
                </div>
                <span className="text-lg font-semibold text-[#3E2723]">Bounty Pass</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-[family-name:var(--font-rye)] font-bold text-[#FFF8E1] bg-[#BF360C] px-2 py-1 rounded-sm uppercase tracking-wide shadow-sm border border-[#3E2723]">
                  Active
                </span>
                <ChevronRight className="w-5 h-5 text-[#5D4037] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Provisions Section */}
        <div className="flex flex-col w-full mb-6">
          <div className="flex items-center px-6 pb-2">
            <h3 className="text-[#5D4037] text-sm font-[family-name:var(--font-rye)] uppercase tracking-wider">Provisions</h3>
            <span className="h-px flex-1 ml-3 bg-[#5D4037]/30" />
          </div>
          <div className="mx-4 bg-[#FFF8E1] rounded-sm overflow-hidden border-2 border-[#5D4037] relative"
            style={{ boxShadow: '3px 3px 0px 0px rgba(62,39,35,0.4)' }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }} />

            <div className="relative flex items-center justify-between p-4 border-b-2 border-dashed border-[#5D4037]/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#BF360C]">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium text-[#3E2723]">Reduce Motion</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-[#3E2723] transition-colors duration-200 ease-in-out shadow-inner',
                  reduceMotion ? 'bg-[#BF360C]' : 'bg-[#3E2723]'
                )}>
                <span className={cn(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#D7CCC8] shadow ring-0 transition duration-200 ease-in-out border border-[#3E2723]',
                  reduceMotion ? 'translate-x-5' : 'translate-x-0.5'
                )} />
              </button>
            </div>

            <div className="relative flex items-center justify-between p-4 border-b-2 border-dashed border-[#5D4037]/30 hover:bg-[#5D4037]/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#558B2F]">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium text-[#3E2723]">Currency</span>
              </div>
              <div className="flex items-center gap-2 text-[#5D4037]">
                <span className="text-base font-[family-name:var(--font-rye)]">BRL (R$)</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="relative flex items-center justify-between p-4 hover:bg-[#5D4037]/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#6A1B9A]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium text-[#3E2723]">Week Start</span>
              </div>
              <div className="flex items-center gap-2 text-[#5D4037]">
                <span className="text-base font-[family-name:var(--font-rye)]">Monday</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Records Section */}
        <div className="flex flex-col w-full mb-8">
          <div className="flex items-center px-6 pb-2">
            <h3 className="text-[#5D4037] text-sm font-[family-name:var(--font-rye)] uppercase tracking-wider">Security & Records</h3>
            <span className="h-px flex-1 ml-3 bg-[#5D4037]/30" />
          </div>
          <div className="mx-4 bg-[#FFF8E1] rounded-sm overflow-hidden border-2 border-[#5D4037] relative"
            style={{ boxShadow: '3px 3px 0px 0px rgba(62,39,35,0.4)' }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper-fibers.png')" }} />

            <button onClick={handleExport}
              className="relative flex items-center justify-between p-4 w-full border-b-2 border-dashed border-[#5D4037]/30 hover:bg-[#5D4037]/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#5D4037]">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium text-[#3E2723]">Export Ledger (JSON)</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5D4037] group-hover:translate-x-1 transition-transform" />
            </button>

            <button onClick={handleImport}
              className="relative flex items-center justify-between p-4 w-full border-b-2 border-dashed border-[#5D4037]/30 hover:bg-[#5D4037]/10 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center text-[#1565C0]">
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium text-[#3E2723]">Import Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#5D4037] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative flex items-center justify-center p-5 hover:bg-[#BF360C]/10 transition-colors cursor-pointer"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }}>
              <div className="border-2 border-[#BF360C] border-dashed px-6 py-1 rounded-sm transform -rotate-1 flex items-center gap-2">
                <LogOut className="w-4 h-4 text-[#BF360C]" />
                <span className="text-base font-[family-name:var(--font-rye)] font-bold text-[#BF360C] uppercase tracking-widest">
                  Abandon Post
                </span>
              </div>
            </div>
          </div>

          {/* Version */}
          <div className="mt-8 flex justify-center opacity-60">
            <span className="text-xs text-[#5D4037] font-[family-name:var(--font-rye)] border-t border-[#5D4037] pt-1 px-4">
              Est. Version 2.4.0 (Build 302)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
