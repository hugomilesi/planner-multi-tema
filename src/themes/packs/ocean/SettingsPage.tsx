'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Bell, Wallet, Calendar, LogOut, Check } from 'lucide-react';

export function OceanSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-[family-name:var(--font-inter)] text-[#111418] dark:text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-[#1c2127]/95 backdrop-blur-md px-4 py-4 justify-between border-b border-[#e5e7eb] dark:border-[#283039]">
        <button className="flex w-10 h-10 shrink-0 items-center justify-center rounded-lg bg-[#f6f7f8] dark:bg-[#101922] border border-[#e5e7eb] dark:border-[#283039] text-[#137fec]">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-10">Settings</h2>
      </div>

      <div className="px-4 pt-6">
        {/* Theme Selection */}
        <div className="mb-6">
          <h3 className="text-[#637588] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Appearance</h3>
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
            {themeList.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className="flex flex-col gap-2 shrink-0 group">
                <div className={cn(
                  'relative w-24 h-36 rounded-2xl p-1 transition-all',
                  themeId === t.id
                    ? 'border-2 border-[#137fec] shadow-lg shadow-[#137fec]/20'
                    : 'border-2 border-[#e5e7eb] dark:border-[#283039]'
                )}>
                  <div className="w-full h-full rounded-xl overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${(t.tokens as Record<string, string>).accent || t.tokens.primary} 100%)` }}>
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  {themeId === t.id && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#137fec] text-white rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <p className={cn(
                  'text-xs font-medium text-center truncate w-24',
                  themeId === t.id ? 'text-[#137fec]' : 'text-[#637588] dark:text-[#9dabb9]'
                )}>{t.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <h3 className="text-[#637588] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Account</h3>
          <div className="bg-white dark:bg-[#1c2127] rounded-2xl border border-[#e5e7eb] dark:border-[#283039] overflow-hidden">
            <div className="flex items-center p-4 border-b border-[#e5e7eb] dark:border-[#283039] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#137fec] to-[#0ea5e9] flex items-center justify-center mr-4">
                <span className="text-white font-bold">A</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold">Alex Johnson</p>
                <p className="text-xs text-[#637588] dark:text-[#9dabb9]">alex@example.com</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#9dabb9] group-hover:text-[#137fec] transition-colors" />
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#137fec]/10 flex items-center justify-center text-[#137fec]">
                  <span className="text-lg">⭐</span>
                </div>
                <span className="font-medium">Subscription</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white bg-[#137fec] px-2 py-1 rounded-md">PRO</span>
                <ChevronRight className="w-5 h-5 text-[#9dabb9] group-hover:text-[#137fec] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6">
          <h3 className="text-[#637588] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Preferences</h3>
          <div className="bg-white dark:bg-[#1c2127] rounded-2xl border border-[#e5e7eb] dark:border-[#283039] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb] dark:border-[#283039]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="font-medium">Notifications</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative w-12 h-7 rounded-full transition-colors',
                  !reduceMotion ? 'bg-[#137fec]' : 'bg-slate-200 dark:bg-slate-700'
                )}>
                <div className={cn(
                  'absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform',
                  !reduceMotion ? 'right-1' : 'left-1'
                )} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 border-b border-[#e5e7eb] dark:border-[#283039] cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-500">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="font-medium">Currency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#637588] dark:text-[#9dabb9]">USD ($)</span>
                <ChevronRight className="w-5 h-5 text-[#9dabb9] group-hover:text-[#137fec] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-500">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="font-medium">Week Starts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#637588] dark:text-[#9dabb9]">Monday</span>
                <ChevronRight className="w-5 h-5 text-[#9dabb9] group-hover:text-[#137fec] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Data Section */}
        <div className="mb-6">
          <h3 className="text-[#637588] dark:text-[#9dabb9] text-xs font-semibold uppercase tracking-wider mb-3 px-1">Data</h3>
          <div className="bg-white dark:bg-[#1c2127] rounded-2xl border border-[#e5e7eb] dark:border-[#283039] overflow-hidden">
            <button onClick={handleExport}
              className="w-full flex items-center justify-between p-4 border-b border-[#e5e7eb] dark:border-[#283039] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[#637588]">
                  <Download className="w-5 h-5" />
                </div>
                <span className="font-medium">Export Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-[#9dabb9] group-hover:text-[#137fec] transition-colors" />
            </button>
            <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Log Out</span>
            </button>
          </div>
        </div>

        {/* Version */}
        <div className="text-center py-4">
          <p className="text-xs text-[#9dabb9]">Version 2.4.0</p>
        </div>
      </div>
    </div>
  );
}
