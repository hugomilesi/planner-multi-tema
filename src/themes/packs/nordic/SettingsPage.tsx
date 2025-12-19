'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Bell, Wallet, Calendar, LogOut, Check, Plane } from 'lucide-react';

export function NordicSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen font-sans text-[#2c2825] antialiased pb-24 relative">
      {/* Warm gradient background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'linear-gradient(180deg, #e8d5c4 0%, #dcc4b0 30%, #d4b8a0 60%, #c9a88a 100%)'
      }} />
      {/* Header */}
      <div className="flex items-center px-4 py-4 pt-6 justify-between">
        <button className="flex w-10 h-10 shrink-0 items-center justify-center text-[#2c2825]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-serif font-bold italic flex-1 text-center pr-10">Gear Settings</h2>
      </div>

      <div className="px-4 pt-2">
        {/* Theme Selection */}
        <div className="mb-6">
          <h3 className="text-[#8a8078] text-[10px] font-mono font-bold uppercase tracking-widest mb-3 px-1">Travel Style</h3>
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className="flex flex-col gap-2 shrink-0 group">
                <div className={cn(
                  'relative w-20 h-28 rounded-lg p-1 transition-all border-2',
                  themeId === t.id
                    ? 'border-[#3b5998] shadow-lg'
                    : 'border-[#e0d5c8] hover:border-[#3b5998]/50'
                )}>
                  <div className="w-full h-full rounded-md overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${(t.tokens as Record<string, string>).accent || t.tokens.primary} 100%)` }}>
                  </div>
                  {themeId === t.id && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-5 h-5 bg-[#c24d3b] text-white rounded-full flex items-center justify-center border-2 border-white">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
                <p className={cn(
                  'text-[10px] font-mono text-center truncate w-20 uppercase',
                  themeId === t.id ? 'text-[#3b5998] font-bold' : 'text-[#8a8078]'
                )}>{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h3 className="text-[#8a8078] text-[10px] font-mono font-bold uppercase tracking-widest mb-3 px-1">Traveler Info</h3>
          <div className="bg-[#f5efe8] rounded-lg border border-[#e0d5c8] shadow-sm overflow-hidden">
            <div className="flex items-center p-4 border-b border-[#e0d5c8] cursor-pointer hover:bg-[#e8dfc5]/30 transition-colors group">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#a08060] to-[#6b5040] flex items-center justify-center mr-3 ring-2 ring-[#b58e46]">
                <span className="text-white font-serif font-bold">A</span>
              </div>
              <div className="flex-1">
                <p className="font-serif font-semibold text-sm">Alex Johnson</p>
                <p className="text-[10px] text-[#8a8078] font-mono">alex@example.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c4b8a8] group-hover:text-[#3b5998] transition-colors" />
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#e8dfc5]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#b58e46]/10 flex items-center justify-center">
                  <Plane className="w-4 h-4 text-[#b58e46]" />
                </div>
                <span className="font-serif text-sm">Travel Class</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-white bg-[#c24d3b] px-2 py-0.5 rounded">FIRST</span>
                <ChevronRight className="w-5 h-5 text-[#c4b8a8] group-hover:text-[#3b5998] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6">
          <h3 className="text-[#8a8078] text-[10px] font-mono font-bold uppercase tracking-widest mb-3 px-1">Preferences</h3>
          <div className="bg-[#f5efe8] rounded-lg border border-[#e0d5c8] shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#e0d5c8]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#3b5998]/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-[#3b5998]" />
                </div>
                <span className="font-serif text-sm">Notifications</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative w-11 h-6 rounded-full transition-colors',
                  !reduceMotion ? 'bg-[#3b5998]' : 'bg-[#d4c8b8]'
                )}>
                <div className={cn(
                  'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  !reduceMotion ? 'right-0.5' : 'left-0.5'
                )} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-[#e0d5c8] cursor-pointer hover:bg-[#e8dfc5]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#b58e46]/10 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-[#b58e46]" />
                </div>
                <span className="font-serif text-sm">Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8a8078] font-mono">USD ($)</span>
                <ChevronRight className="w-5 h-5 text-[#c4b8a8] group-hover:text-[#3b5998] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#e8dfc5]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c24d3b]/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#c24d3b]" />
                </div>
                <span className="font-serif text-sm">Week Starts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8a8078] font-mono">Monday</span>
                <ChevronRight className="w-5 h-5 text-[#c4b8a8] group-hover:text-[#3b5998] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="mb-6">
          <h3 className="text-[#8a8078] text-[10px] font-mono font-bold uppercase tracking-widest mb-3 px-1">Logbook Data</h3>
          <div className="bg-[#f5efe8] rounded-lg border border-[#e0d5c8] shadow-sm overflow-hidden">
            <button onClick={handleExport}
              className="w-full flex items-center justify-between p-4 border-b border-[#e0d5c8] hover:bg-[#e8dfc5]/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#e8dfc5] flex items-center justify-center">
                  <Download className="w-4 h-4 text-[#8a8078]" />
                </div>
                <span className="font-serif text-sm">Export Journal</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c4b8a8] group-hover:text-[#3b5998] transition-colors" />
            </button>
            <button className="w-full flex items-center justify-center gap-2 p-4 text-[#c24d3b] hover:bg-[#c24d3b]/5 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="font-serif text-sm">End Journey</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-[10px] text-[#8a8078] font-mono">Version 2.4.0 • Safe Travels ✈️</p>
        </div>
      </div>
    </div>
  );
}
