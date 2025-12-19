'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Bell, Wallet, Calendar, LogOut, Check, Diamond, ScanFace } from 'lucide-react';

export function DarkAcademiaSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-black font-sans text-stone-200 antialiased pb-24 selection:bg-[#C6A87C]/20">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-black/80 backdrop-blur-md px-4 py-4 justify-between border-b border-stone-800/50 transition-all duration-300">
        <button className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full text-stone-400 hover:bg-stone-800/50 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-serif font-semibold tracking-wide text-center flex-1 text-white">Settings</h2>
        <div className="w-10" />
      </div>

      <div className="flex flex-col w-full mt-4">
        {/* Theme Selection */}
        <div className="flex items-center justify-between px-6 pb-4 pt-2">
          <h3 className="text-stone-400 text-xs font-bold uppercase tracking-[0.15em]">Theme</h3>
          <span className="text-[#C6A87C] text-xs font-medium cursor-pointer hover:underline">View All</span>
        </div>
        <div className="flex w-full overflow-x-auto px-6 pb-6 no-scrollbar gap-4 snap-x">
          {themeList.map((t) => (
            <button key={t.id} onClick={() => setTheme(t.id)}
              className={cn(
                'flex flex-col gap-2 shrink-0 snap-center cursor-pointer group items-center transition-opacity',
                themeId !== t.id && 'opacity-70 hover:opacity-100'
              )}>
              <div className={cn(
                'relative w-16 h-16 rounded-2xl p-1 transition-all',
                themeId === t.id
                  ? 'shadow-lg shadow-[#C6A87C]/20 ring-2 ring-[#BFA15F] ring-offset-2 ring-offset-black'
                  : 'shadow-md hover:shadow-lg ring-1 ring-stone-700 bg-stone-800'
              )}>
                <div className="w-full h-full rounded-[10px] overflow-hidden relative"
                  style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${(t.tokens as Record<string, string>).accent || t.tokens.primary} 100%)` }}>
                  {themeId === t.id && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                      <Check className="w-4 h-4 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
              </div>
              <p className={cn(
                'text-center text-[11px] font-medium font-serif truncate max-w-[64px]',
                themeId === t.id ? 'font-semibold text-[#C6A87C]' : 'text-stone-400 group-hover:text-stone-200'
              )}>{t.name}</p>
            </button>
          ))}
        </div>

        {/* Account Section */}
        <div className="flex flex-col w-full mb-6">
          <h3 className="text-stone-400 text-xs font-bold uppercase tracking-[0.15em] px-6 pb-2">Account</h3>
          <div className="mx-4 bg-[#1C1C1E] rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.3)] ring-1 ring-white/5 overflow-hidden">
            <div className="flex items-center p-4 border-b border-stone-800 active:bg-stone-800/50 transition-colors cursor-pointer group">
              <div className="relative w-10 h-10 mr-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#DBC688] to-[#C6A87C] p-[2px]">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#C6A87C] to-[#9E8256] flex items-center justify-center">
                    <span className="text-white font-serif font-bold text-sm">A</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white font-serif truncate">Alex Johnson</h4>
                <p className="text-xs text-stone-400">Premium Member</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-[#BFA15F] transition-colors shrink-0" />
            </div>
            <div className="flex items-center justify-between p-4 active:bg-stone-800/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-[#C6A87C] shadow-sm">
                  <Diamond className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Subscription</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#DBC688] to-[#BFA15F] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Pro</span>
                <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-[#BFA15F] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="flex flex-col w-full mb-6">
          <h3 className="text-stone-400 text-xs font-bold uppercase tracking-[0.15em] px-6 pb-2">Preferences</h3>
          <div className="mx-4 bg-[#1C1C1E] rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.3)] ring-1 ring-white/5 divide-y divide-stone-800">
            <div className="flex items-center justify-between p-4 pl-4 pr-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 shadow-sm">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className="relative inline-flex h-6 w-11 items-center cursor-pointer">
                <div className={cn(
                  'w-11 h-6 rounded-full peer transition-colors shadow-inner',
                  !reduceMotion ? 'bg-gradient-to-r from-[#DBC688] to-[#BFA15F]' : 'bg-stone-700'
                )}>
                  <div className={cn(
                    'absolute top-[2px] w-5 h-5 bg-white rounded-full shadow transition-all',
                    !reduceMotion ? 'right-[2px]' : 'left-[2px]'
                  )} />
                </div>
              </button>
            </div>
            <div className="flex items-center justify-between p-4 pl-4 pr-5 active:bg-stone-800/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 shadow-sm">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif text-stone-200">USD ($)</span>
                <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-[#BFA15F] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 pl-4 pr-5 active:bg-stone-800/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 shadow-sm">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Start of Week</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif text-stone-200">Monday</span>
                <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-[#BFA15F] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="flex flex-col w-full mb-8">
          <h3 className="text-stone-400 text-xs font-bold uppercase tracking-[0.15em] px-6 pb-2">Security</h3>
          <div className="mx-4 bg-[#1C1C1E] rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.3)] ring-1 ring-white/5 divide-y divide-stone-800">
            <div className="flex items-center justify-between p-4 pl-4 pr-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 shadow-sm">
                  <ScanFace className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Face ID Lock</span>
              </div>
              <div className="relative inline-flex h-6 w-11 items-center cursor-pointer">
                <div className="w-11 h-6 bg-stone-700 rounded-full shadow-inner">
                  <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full shadow" />
                </div>
              </div>
            </div>
            <button onClick={handleExport}
              className="w-full flex items-center justify-between p-4 pl-4 pr-5 active:bg-stone-800/50 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-400 shadow-sm">
                  <Download className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Export Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-600 group-hover:text-[#BFA15F] transition-colors" />
            </button>
            <button className="w-full flex items-center justify-center p-4 active:bg-red-900/10 transition-colors cursor-pointer">
              <span className="text-sm font-medium text-red-400 tracking-wide">Log Out</span>
            </button>
          </div>

          {/* Version */}
          <div className="mt-8 flex flex-col items-center justify-center space-y-1">
            <div className="w-6 h-6 rounded-full border border-stone-700 flex items-center justify-center">
              <span className="text-[10px] text-stone-500">✦</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">Version 2.4.0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
