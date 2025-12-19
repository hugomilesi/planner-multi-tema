'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Palette, User, Bell, PiggyBank, Calendar, ScanFace, LogOut, Rocket, Star, Check } from 'lucide-react';

export function NoirSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen font-[family-name:var(--font-nunito)] text-gray-800"
      style={{ backgroundColor: '#F0F4F8' }}>

      <div className="flex flex-col w-full max-w-md mx-auto">
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center bg-white/95 backdrop-blur-md px-5 py-4 justify-between border-b-4 border-gray-100 shadow-sm">
          <div className="flex w-12 h-12 shrink-0 items-center justify-center rounded-2xl bg-white border-2 border-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] active:shadow-none active:translate-y-0.5 cursor-pointer text-[#4DACFF] transition-all group">
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
          <h2 className="text-2xl font-[family-name:var(--font-fredoka)] font-bold leading-tight tracking-wide flex-1 text-center pr-12 text-gray-800">Settings</h2>
        </div>

        <div className="p-2">
          {/* Theme Section */}
          <div className="flex flex-col w-full mt-4">
            <div className="flex items-center gap-2 px-6 pb-3 pt-2">
              <Palette className="w-6 h-6 text-[#FF6B6B]" />
              <h3 className="text-gray-500 text-sm font-[family-name:var(--font-fredoka)] font-bold uppercase tracking-wider">Pick Your Theme</h3>
            </div>
            <div className="flex w-full overflow-x-auto px-4 pb-6 no-scrollbar gap-5 snap-x py-2">
              {themeList.map((t) => (
                <div key={t.id} className="flex flex-col gap-3 shrink-0 snap-center cursor-pointer group" onClick={() => setTheme(t.id)}>
                  <div className={cn(
                    'relative w-32 h-48 rounded-3xl border-4 p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-all transform hover:-translate-y-1',
                    themeId === t.id ? 'border-[#4DACFF] bg-[#4DACFF]' : 'border-white bg-white'
                  )}>
                    <div className="w-full h-full rounded-2xl overflow-hidden relative"
                      style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${(t.tokens as Record<string, string>).accent || t.tokens.primary} 100%)` }}>
                      <div className="absolute inset-0 bg-white/20 mix-blend-overlay" />
                    </div>
                    {themeId === t.id && (
                      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#6BCB77] text-white rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10">
                        <Check className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <p className={cn(
                    'text-center font-[family-name:var(--font-fredoka)] text-base font-bold',
                    themeId === t.id ? 'text-[#4DACFF]' : 'text-gray-500 group-hover:text-gray-800'
                  )}>{t.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Section */}
          <div className="flex flex-col w-full mb-6">
            <div className="flex items-center gap-2 px-6 pb-2">
              <User className="w-6 h-6 text-[#FFD93D]" />
              <h3 className="text-gray-500 text-sm font-[family-name:var(--font-fredoka)] font-bold uppercase tracking-wider">My Profile</h3>
            </div>
            <div className="mx-4 bg-white rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-gray-100">
              <div className="flex items-center p-4 border-b-2 border-gray-100 active:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-[#FFD93D] p-1 shadow-inner rotate-3 transform transition-transform group-hover:rotate-0 flex items-center justify-center">
                  <span className="text-3xl">😊</span>
                </div>
                <div className="flex-1 ml-4">
                  <h4 className="text-lg font-[family-name:var(--font-fredoka)] font-bold text-gray-900">Alex Johnson</h4>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-[#4DACFF]/20 text-[#4DACFF] text-xs font-bold rounded-lg">Super Planner</span>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-[#4DACFF] group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 active:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center text-[#FF6B6B] border-2 border-[#FF6B6B]/20">
                    <Star className="w-6 h-6" />
                  </div>
                  <span className="text-base font-bold font-[family-name:var(--font-fredoka)]">Subscription</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-white bg-[#FF6B6B] px-3 py-1.5 rounded-xl uppercase tracking-wide shadow-sm transform -rotate-2">Pro</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4DACFF] transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Fun Tweaks Section */}
          <div className="flex flex-col w-full mb-6">
            <div className="flex items-center gap-2 px-6 pb-2">
              <Bell className="w-6 h-6 text-[#4DACFF]" />
              <h3 className="text-gray-500 text-sm font-[family-name:var(--font-fredoka)] font-bold uppercase tracking-wider">Fun Tweaks</h3>
            </div>
            <div className="mx-4 flex flex-col gap-3">
              <div className="bg-white rounded-3xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-gray-100 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 border-2 border-orange-200">
                    <Bell className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold font-[family-name:var(--font-fredoka)]">Alerts</span>
                </div>
                <button
                  onClick={() => setReduceMotion(!reduceMotion)}
                  className={cn(
                    'cursor-pointer relative w-16 h-9 rounded-full border-4 shadow-inner transition-colors',
                    !reduceMotion ? 'bg-[#6BCB77] border-[#6BCB77]/30' : 'bg-gray-200 border-transparent'
                  )}>
                  <div className={cn(
                    'absolute top-1 w-6 h-6 bg-white rounded-full shadow-md border-2 border-gray-100 transition-transform',
                    !reduceMotion ? 'right-1' : 'left-1'
                  )} />
                </button>
              </div>
              <div className="bg-white rounded-3xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-gray-100 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-all cursor-pointer group active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 border-2 border-green-200">
                    <PiggyBank className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold font-[family-name:var(--font-fredoka)]">Currency</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-500">USD ($)</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4DACFF] transition-colors" />
                </div>
              </div>
              <div className="bg-white rounded-3xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-gray-100 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)] transition-all cursor-pointer group active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-500 border-2 border-purple-200">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-bold font-[family-name:var(--font-fredoka)]">First Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-500">Monday</span>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4DACFF] transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="flex flex-col w-full mb-8">
            <div className="flex items-center gap-2 px-6 pb-2">
              <ScanFace className="w-6 h-6 text-gray-400" />
              <h3 className="text-gray-500 text-sm font-[family-name:var(--font-fredoka)] font-bold uppercase tracking-wider">Security</h3>
            </div>
            <div className="mx-4 bg-white rounded-3xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-gray-100">
              <div className="flex items-center justify-between p-4 border-b-2 border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500">
                    <ScanFace className="w-6 h-6" />
                  </div>
                  <span className="text-base font-bold font-[family-name:var(--font-fredoka)]">Face ID Lock</span>
                </div>
                <div className="cursor-pointer relative w-16 h-9 bg-gray-200 rounded-full border-4 border-transparent shadow-inner transition-colors">
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md border-2 border-gray-100 transition-transform" />
                </div>
              </div>
              <div onClick={handleExport}
                className="flex items-center justify-between p-4 border-b-2 border-gray-100 active:bg-gray-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                    <Download className="w-6 h-6" />
                  </div>
                  <span className="text-base font-bold font-[family-name:var(--font-fredoka)]">Get Data (CSV)</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4DACFF] transition-colors" />
              </div>
              <div className="flex items-center justify-center p-4 active:bg-red-50 transition-colors cursor-pointer bg-red-50/50">
                <LogOut className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-base font-bold font-[family-name:var(--font-fredoka)] text-red-500">Log Out</span>
              </div>
            </div>

            {/* Version */}
            <div className="flex flex-col items-center mt-8 pb-8 opacity-60">
              <div className="w-8 h-8 bg-gray-200 rounded-full mb-2 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-center text-xs font-bold text-gray-400">Version 2.4.0 (Build 302)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
