'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Bell, Wallet, Calendar, LogOut, Check, Lock, Eye } from 'lucide-react';

export function SpaceSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
  userName = 'User', userEmail = '', isAuthenticated = false, onLogout, isLoggingOut = false,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-[#1a1614] text-[#f5f0e8] antialiased pb-24" style={{ fontFamily: '"Lato", sans-serif' }}>
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }} />

      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-[#1a1614]/95 backdrop-blur-md px-4 py-4 justify-between border-b border-[#3d3430]">
        <button className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-[#262320] border border-[#3d3430] text-[#bfa372]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10" style={{ fontFamily: '"Playfair Display", serif' }}>Settings</h2>
      </div>

      <div className="px-4 pt-6">
        {/* Theme Gallery */}
        <div className="mb-6">
          <h3 className="text-[#6a6050] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Theme Gallery</h3>
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className="flex flex-col gap-2 shrink-0 group">
                <div className={cn(
                  'relative w-24 h-36 rounded-2xl p-1 transition-all',
                  themeId === t.id
                    ? 'border-2 border-[#bfa372] shadow-lg shadow-[#bfa372]/20'
                    : 'border-2 border-[#3d3430]'
                )}>
                  <div className="w-full h-full rounded-xl overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${(t.tokens as Record<string, string>).accent || t.tokens.primary} 100%)` }}>
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  {themeId === t.id && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#bfa372] text-[#1a1614] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className={cn(
                  'text-xs font-medium text-center truncate w-24',
                  themeId === t.id ? 'text-[#bfa372]' : 'text-[#6a6050]'
                )}>{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h3 className="text-[#6a6050] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Account</h3>
          <div className="bg-[#262320] rounded-2xl border border-[#3d3430] overflow-hidden">
            <div className="flex items-center p-4 border-b border-[#3d3430] cursor-pointer hover:bg-[#3d3430]/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#bfa372] to-[#8C6A5D] flex items-center justify-center mr-4">
                <span className="text-[#1a1614] font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>{userName?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>{userName || 'Alex Johnson'}</p>
                <p className="text-xs text-[#6a6050]">{userEmail || 'alex.j@example.com'}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6a6050] group-hover:text-[#bfa372] transition-colors" />
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#3d3430]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#bfa372]/10 flex items-center justify-center text-[#bfa372]">
                  <span className="text-lg">✨</span>
                </div>
                <span className="font-medium text-[#f5f0e8]">Faith Plan</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1a1614] bg-[#bfa372] px-2 py-1 rounded-md">PREMIUM</span>
                <ChevronRight className="w-5 h-5 text-[#6a6050] group-hover:text-[#bfa372] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6">
          <h3 className="text-[#6a6050] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Preferences</h3>
          <div className="bg-[#262320] rounded-2xl border border-[#3d3430] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#3d3430]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#bfa372]/10 flex items-center justify-center text-[#bfa372]">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-medium text-[#f5f0e8]">Daily Verses</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative w-12 h-7 rounded-full transition-colors',
                  !reduceMotion ? 'bg-[#bfa372]' : 'bg-[#3d3430]'
                )}>
                <div className={cn(
                  'absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  !reduceMotion ? 'right-1' : 'left-1'
                )} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-[#3d3430] cursor-pointer hover:bg-[#3d3430]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5a8a6a]/20 flex items-center justify-center text-[#5a8a6a]">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="font-medium text-[#f5f0e8]">Stewardship Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6a6050]">USD ($)</span>
                <ChevronRight className="w-5 h-5 text-[#6a6050] group-hover:text-[#bfa372] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#3d3430]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6a8a9a]/20 flex items-center justify-center text-[#6a8a9a]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-medium text-[#f5f0e8]">Sabbath Start</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6a6050]">Sunday</span>
                <ChevronRight className="w-5 h-5 text-[#6a6050] group-hover:text-[#bfa372] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy Section */}
        <div className="mb-6">
          <h3 className="text-[#6a6050] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Data & Privacy</h3>
          <div className="bg-[#262320] rounded-2xl border border-[#3d3430] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#3d3430]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6a6050]/20 flex items-center justify-center text-[#6a6050]">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="font-medium text-[#f5f0e8]">Face ID Lock</span>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-[#3d3430] transition-colors">
                <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow" />
              </button>
            </div>
            <button onClick={handleExport}
              className="w-full flex items-center justify-between p-4 border-b border-[#3d3430] hover:bg-[#3d3430]/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6a6050]/20 flex items-center justify-center text-[#6a6050]">
                  <Download className="w-5 h-5" />
                </div>
                <span className="font-medium text-[#f5f0e8]">Export Journal</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#6a6050] group-hover:text-[#bfa372] transition-colors" />
            </button>
            <button 
              onClick={() => onLogout?.()}
              disabled={isLoggingOut || !isAuthenticated}
              className="w-full flex items-center justify-center gap-2 p-4 text-[#c24d3b] hover:bg-[#c24d3b]/10 transition-colors disabled:opacity-50">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-xs text-[#6a6050] italic" style={{ fontFamily: '"Playfair Display", serif' }}>"Let all things be done decently and in order." — v2.4.0</p>
        </div>
      </div>
    </div>
  );
}
