'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Bell, Wallet, Calendar, LogOut, Check } from 'lucide-react';

export function SpaceSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
  userName = 'User', userEmail = '', isAuthenticated = false, onLogout, isLoggingOut = false,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#2C2420] font-sans text-stone-800 dark:text-stone-100 antialiased pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#3D3430]/95 backdrop-blur-md px-4 py-4 justify-between border-b border-stone-100 dark:border-stone-700">
        <button className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-[#FAF7F2] dark:bg-[#2C2420] border border-stone-200 dark:border-stone-600 text-[#8C6A5D]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-serif font-bold flex-1 text-center pr-10">Settings</h2>
      </div>

      <div className="px-4 pt-6">
        {/* Theme Selection */}
        <div className="mb-6">
          <h3 className="text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Appearance</h3>
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className="flex flex-col gap-2 shrink-0 group">
                <div className={cn(
                  'relative w-24 h-36 rounded-2xl p-1 transition-all',
                  themeId === t.id
                    ? 'border-2 border-[#8C6A5D] shadow-lg shadow-[#8C6A5D]/20'
                    : 'border-2 border-stone-200 dark:border-stone-600'
                )}>
                  <div className="w-full h-full rounded-xl overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${(t.tokens as Record<string, string>).accent || t.tokens.primary} 100%)` }}>
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  {themeId === t.id && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#8C6A5D] text-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className={cn(
                  'text-xs font-medium text-center truncate w-24',
                  themeId === t.id ? 'text-[#8C6A5D]' : 'text-stone-500 dark:text-stone-400'
                )}>{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h3 className="text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Account</h3>
          <div className="bg-white dark:bg-[#3D3430] rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden">
            <div className="flex items-center p-4 border-b border-stone-100 dark:border-stone-700 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8C6A5D] to-[#D4A373] flex items-center justify-center mr-4">
                <span className="text-white font-serif font-bold">{userName?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="flex-1">
                <p className="font-serif font-semibold">{userName || 'User'}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{userEmail || ''}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-[#8C6A5D] transition-colors" />
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4A373]/10 flex items-center justify-center text-[#D4A373]">
                  <span className="text-lg">⭐</span>
                </div>
                <span className="font-serif font-medium">Subscription</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white bg-[#8C6A5D] px-2 py-1 rounded-md">PRO</span>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-[#8C6A5D] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6">
          <h3 className="text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Preferences</h3>
          <div className="bg-white dark:bg-[#3D3430] rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-stone-100 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D4A373]/10 flex items-center justify-center text-[#D4A373]">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-serif font-medium">Notifications</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative w-12 h-7 rounded-full transition-colors',
                  !reduceMotion ? 'bg-[#8C6A5D]' : 'bg-stone-200 dark:bg-stone-700'
                )}>
                <div className={cn(
                  'absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  !reduceMotion ? 'right-1' : 'left-1'
                )} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-stone-100 dark:border-stone-700 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A3C4BC]/20 flex items-center justify-center text-[#A3C4BC]">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="font-serif font-medium">Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-stone-500 dark:text-stone-400">USD ($)</span>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-[#8C6A5D] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A3B8C8]/20 flex items-center justify-center text-[#A3B8C8]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-serif font-medium">Week Starts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-stone-500 dark:text-stone-400">Sunday</span>
                <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-[#8C6A5D] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="mb-6">
          <h3 className="text-stone-500 dark:text-stone-400 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Data</h3>
          <div className="bg-white dark:bg-[#3D3430] rounded-2xl border border-stone-100 dark:border-stone-700 overflow-hidden">
            <button onClick={handleExport}
              className="w-full flex items-center justify-between p-4 border-b border-stone-100 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500">
                  <Download className="w-5 h-5" />
                </div>
                <span className="font-serif font-medium">Export Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-[#8C6A5D] transition-colors" />
            </button>
            <button 
              onClick={() => onLogout?.()}
              disabled={isLoggingOut || !isAuthenticated}
              className="w-full flex items-center justify-center gap-2 p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50">
              <LogOut className="w-5 h-5" />
              <span className="font-serif font-medium">{isLoggingOut ? 'Logging out...' : 'Log Out'}</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-xs text-stone-400">Version 2.4.0</p>
        </div>
      </div>
    </div>
  );
}
