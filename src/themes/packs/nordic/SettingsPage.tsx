'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Bell, Wallet, Calendar, LogOut, Check, Plane, Globe, User, Fingerprint, FileText } from 'lucide-react';

export function NordicSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
  userName = 'User', userEmail = '', isAuthenticated = false, onLogout, isLoggingOut = false,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen text-[#2c2825] antialiased pb-24 relative" style={{ fontFamily: '"DM Sans", sans-serif', backgroundColor: '#f4ecd8' }}>
      {/* Vintage paper background texture */}
      <div className="fixed inset-0 -z-10 opacity-20 mix-blend-multiply pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      {/* Header */}
      <div className="flex items-center px-4 py-4 pt-6 justify-between border-b border-[#d1c7b0]" style={{ backgroundColor: 'rgba(244, 236, 216, 0.95)' }}>
        <button className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full border-2 border-[#2c2825]/20 hover:bg-[#e8dfc5] transition-colors text-[#2c2825]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center flex-1 pr-10">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>Passport</h2>
          <span className="text-[10px] uppercase tracking-wider text-[#c24d3b] font-bold">Settings & Config</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Theme Selection - Destination Themes */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Globe className="w-4 h-4 text-[#c24d3b]" />
            <h3 className="text-[#5d5650] text-xs font-bold uppercase tracking-widest" style={{ fontFamily: '"Courier Prime", monospace' }}>Destination Themes</h3>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className="flex flex-col gap-2 shrink-0 group cursor-pointer">
                <div className={cn(
                  'relative w-32 h-40 bg-white/95 shadow-md rounded-lg p-2 border transition-all transform active:scale-95',
                  themeId === t.id
                    ? 'border-[#3d5a6b] rotate-0'
                    : 'border-[#d1c7b0] -rotate-2 hover:rotate-0'
                )}
                  style={{ boxShadow: '0 2px 8px -2px rgba(44, 40, 37, 0.15)' }}>
                  {/* Dashed border inside */}
                  <div className="absolute inset-[3px] border-2 border-dashed border-[#2c2825]/20 rounded-md pointer-events-none" />
                  <div className="w-full h-full rounded border border-[#d1c7b0] overflow-hidden relative">
                    <div className="absolute inset-0 opacity-80"
                      style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${(t.tokens as Record<string, string>).accent || t.tokens.primary} 100%)` }} />
                    <div className="absolute inset-0 bg-[#3d5a6b]/20 mix-blend-overlay" />
                    {/* Theme icon */}
                    {t.preview?.icon && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl opacity-90 drop-shadow-lg">{t.preview.icon}</span>
                      </div>
                    )}
                    {themeId === t.id && (
                      <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-[#c24d3b] flex items-center justify-center -rotate-[15deg] bg-white/90 shadow-sm z-10">
                        <Plane className="w-4 h-4 text-[#c24d3b]" />
                      </div>
                    )}
                  </div>
                </div>
                <p className={cn(
                  'text-center text-xs font-bold uppercase tracking-widest',
                  themeId === t.id ? 'text-[#2c2825]' : 'text-[#5d5650]'
                )} style={{ fontFamily: '"Courier Prime", monospace' }}>{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Traveller ID Section */}
        <div className="mb-6">
          <h3 className="text-[#5d5650] text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ fontFamily: '"Courier Prime", monospace' }}>Traveller ID</h3>
          <div className="bg-white/95 rounded-lg border border-[#d1c7b0] shadow-md overflow-hidden">
            <div className="flex items-center p-4 border-b border-[#d1c7b0] cursor-pointer hover:bg-[#f4ecd8]/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a08060] to-[#6b5040] flex items-center justify-center mr-3 ring-2 ring-[#b58e46]" style={{ filter: 'sepia(0.2)' }}>
                <span className="text-white font-bold text-lg" style={{ fontFamily: '"Playfair Display", serif' }}>{userName?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-[#8a8078] uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Name / Nom</p>
                <p className="font-bold text-[#2c2825] uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>{userName || 'User'}</p>
                <p className="text-[10px] text-[#8a8078]" style={{ fontFamily: '"Courier Prime", monospace' }}>ID: {userEmail?.split('@')[0] || '000-000'}-EXP</p>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-[#3d5a6b] flex items-center justify-center">
                <Check className="w-4 h-4 text-[#3d5a6b]" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#f4ecd8]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f4ecd8] flex items-center justify-center">
                  <Plane className="w-4 h-4 text-[#2c2825]" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Ticket Class</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white bg-[#3d5a6b] px-2 py-1 rounded uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>First Class</span>
                <ChevronRight className="w-5 h-5 text-[#c8b8a8] group-hover:text-[#3d5a6b] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Flight Controls Section */}
        <div className="mb-6">
          <h3 className="text-[#5d5650] text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ fontFamily: '"Courier Prime", monospace' }}>Flight Controls</h3>
          <div className="bg-white/95 rounded-lg border border-[#d1c7b0] shadow-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#d1c7b0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#c24d3b]/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-[#c24d3b]" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Alerts</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative w-12 h-6 rounded transition-colors',
                  !reduceMotion ? 'bg-[#c24d3b]' : 'bg-[#d8c8b8]'
                )}>
                <div className={cn(
                  'absolute top-0.5 w-5 h-5 bg-white rounded shadow transition-transform',
                  !reduceMotion ? 'right-0.5' : 'left-0.5'
                )} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-[#d1c7b0] cursor-pointer hover:bg-[#f4ecd8]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#3d5a6b]/10 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-[#3d5a6b]" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5d5650]" style={{ fontFamily: '"Courier Prime", monospace' }}>USD ($)</span>
                <ChevronRight className="w-5 h-5 text-[#c8b8a8] group-hover:text-[#3d5a6b] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#f4ecd8]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#b58e46]/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-[#b58e46]" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Itinerary Start</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#5d5650]" style={{ fontFamily: '"Courier Prime", monospace' }}>Monday</span>
                <ChevronRight className="w-5 h-5 text-[#c8b8a8] group-hover:text-[#3d5a6b] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Security Check Section */}
        <div className="mb-6">
          <h3 className="text-[#5d5650] text-xs font-bold uppercase tracking-widest mb-3 px-1" style={{ fontFamily: '"Courier Prime", monospace' }}>Security Check</h3>
          <div className="bg-white/95 rounded-lg border border-[#d1c7b0] shadow-md overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#d1c7b0]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f4ecd8] flex items-center justify-center">
                  <Fingerprint className="w-4 h-4 text-[#5d5650]" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Biometrics</span>
              </div>
              <button className="relative w-12 h-6 rounded bg-[#d8c8b8]">
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded shadow" />
              </button>
            </div>
            <button onClick={handleExport}
              className="w-full flex items-center justify-between p-4 border-b border-[#d1c7b0] hover:bg-[#f4ecd8]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f4ecd8] flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#5d5650]" />
                </div>
                <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Export Log</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#c8b8a8] group-hover:text-[#3d5a6b] transition-colors" />
            </button>
            <button 
              onClick={() => onLogout?.()}
              disabled={isLoggingOut || !isAuthenticated}
              className="w-full flex items-center justify-center gap-2 p-4 text-[#c24d3b] hover:bg-[#c24d3b]/5 transition-colors disabled:opacity-50">
              <LogOut className="w-4 h-4" />
              <span className="font-bold text-sm uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>{isLoggingOut ? 'Departing...' : 'Depart'}</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <div className="flex justify-center gap-1 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#c8b8a8]" />
            <div className="w-2 h-2 rounded-full bg-[#c8b8a8]" />
            <div className="w-2 h-2 rounded-full bg-[#c8b8a8]" />
          </div>
          <p className="text-[10px] text-[#8a8078] uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Version 2.4.0 (Build 302)</p>
        </div>
      </div>
    </div>
  );
}
