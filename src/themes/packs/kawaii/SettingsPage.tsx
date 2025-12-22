'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Flower2, Bell, DollarSign, Calendar, User, Check, LogOut, Shield } from 'lucide-react';

export function KawaiiSettingsPage({
  themeId,
  setTheme,
  reduceMotion,
  setReduceMotion,
  themeList,
  currentTheme,
  handleExport,
  handleImport,
  userName = 'Garden Friend',
  userEmail = 'friend@example.com',
  isAuthenticated = false,
  onLogout,
  isLoggingOut = false,
}: SettingsPageProps) {
  const canLogout = isAuthenticated && !!onLogout;
  const handleLogoutClick = () => {
    if (!canLogout || isLoggingOut) return;
    onLogout?.();
  };
  return (
    <div className="min-h-screen font-[family-name:var(--font-lato)] text-[#5d4037]"
      style={{
        backgroundColor: '#fdfbf7',
        backgroundImage: 'radial-gradient(circle at top right, rgba(208, 90, 110, 0.1) 0%, transparent 50%)',
      }}>

      <div className="relative pb-24">
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center bg-[#fdfbf7]/80 backdrop-blur-xl px-6 py-5 justify-between">
          <button className="flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_-4px_rgba(93,64,55,0.08)] hover:shadow-md cursor-pointer text-[#d05a6e] transition-all border border-[#d05a6e]/20 relative group overflow-hidden">
            <div className="absolute inset-0 bg-[#d05a6e]/5 group-hover:bg-[#d05a6e]/10 transition-colors" />
            <ChevronLeft className="w-5 h-5 relative z-10" />
          </button>
          <div className="flex flex-col items-center flex-1 pr-11">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d05a6e] font-bold mb-0.5 opacity-80">Configuration</span>
            <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold leading-none tracking-tight text-[#9f3e4f]">Settings</h2>
          </div>
        </div>

        {/* Garden Themes Section */}
        <div className="flex flex-col w-full mt-2 relative">
          <div className="absolute -top-10 -right-10 text-[#d05a6e]/5 pointer-events-none rotate-12">
            <Flower2 className="w-[200px] h-[200px]" />
          </div>
          <div className="flex items-center gap-2 px-6 pb-4 pt-4">
            <Flower2 className="w-4 h-4 text-[#d05a6e]" />
            <h3 className="text-[#8d6e63] text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-playfair)]">Garden Themes</h3>
          </div>
          <div className="flex w-full overflow-x-auto px-6 pb-8 no-scrollbar gap-6 snap-x pt-2">
            {themeList.map((t, i) => {
              const isActive = themeId === t.id;
              return (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  className="flex flex-col gap-4 shrink-0 snap-center cursor-pointer group relative">
                  {isActive && <div className="absolute -inset-3 bg-gradient-to-tr from-[#d05a6e]/20 to-transparent rounded-[2.5rem] rotate-3 blur-sm" />}
                  <div className={cn(
                    'relative h-56 overflow-hidden shadow-md transition-all transform hover:-translate-y-1 bg-white p-1.5',
                    isActive
                      ? 'w-36 rounded-[2rem] border-[3px] border-[#d05a6e]/40 shadow-[0_0_15px_rgba(208,90,110,0.4)] ring-2 ring-[#d05a6e] ring-offset-2'
                      : 'w-32 rounded-[1.5rem] border-2 border-dashed border-[#a1887f]/30 hover:border-[#a1887f]'
                  )}>
                    <div className={cn('w-full h-full overflow-hidden relative shadow-inner', isActive ? 'rounded-[1.6rem]' : 'rounded-[1.2rem]')}>
                      <div className="absolute inset-0 opacity-95"
                        style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }}>
                        <div className="absolute inset-0 bg-[#d05a6e]/20 mix-blend-color" />
                      </div>
                      {isActive && (
                        <>
                          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-[#d05a6e]/60 via-[#d05a6e]/10 to-transparent" />
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <div className="bg-white/90 backdrop-blur-md text-[#d05a6e] rounded-full p-2 shadow-lg flex items-center justify-center mb-2 border border-[#d05a6e]/20">
                              <Check className="w-5 h-5" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <p className={cn(
                    'text-center font-[family-name:var(--font-playfair)] tracking-wide',
                    isActive ? 'text-base font-bold text-[#9f3e4f]' : 'text-sm font-medium text-[#8d6e63] group-hover:text-[#5d4037] transition-colors'
                  )}>
                    {t.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Account Section */}
        <div className="flex flex-col w-full mb-6 relative z-10">
          <div className="flex items-center gap-2 px-6 pb-3 pt-2">
            <User className="w-4 h-4 text-[#d05a6e]" />
            <h3 className="text-[#8d6e63] text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-playfair)]">Account</h3>
          </div>
          <div className="mx-5 bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_-4px_rgba(93,64,55,0.08)] border border-[#e7ddd0] relative">
            <div className="absolute inset-[3px] border border-dashed border-[#d05a6e]/30 rounded-[1.8rem] pointer-events-none" />
            <div className="flex items-center p-4 border-b border-dashed border-stone-200 cursor-pointer group">
              <div className="w-16 h-16 rounded-full p-1 bg-gradient-to-br from-[#d05a6e]/30 to-transparent mr-4">
                <div className="w-full h-full rounded-full overflow-hidden shadow-sm ring-2 ring-white bg-gradient-to-br from-[#d05a6e] to-[#9f3e4f] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#5d4037] mb-0.5">{userName}</h4>
                <p className="text-sm text-[#8d6e63] italic">{userEmail}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-[#d05a6e] group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[1.5rem_0.25rem_1.5rem_0.25rem] bg-gradient-to-br from-[#d05a6e]/20 to-[#d05a6e]/5 flex items-center justify-center text-[#d05a6e] shadow-sm border border-[#d05a6e]/10">
                  <Flower2 className="w-6 h-6" />
                </div>
                <span className="text-base font-medium font-[family-name:var(--font-playfair)] text-[#5d4037]">Plan Status</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#d05a6e] to-[#9f3e4f] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm ring-2 ring-[#d05a6e]/20">
                  Bloom Pro
                </span>
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center group-hover:bg-[#d05a6e] group-hover:text-white transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="flex flex-col w-full mb-6">
          <div className="flex items-center gap-2 px-6 pb-3">
            <Flower2 className="w-4 h-4 text-[#d05a6e]" />
            <h3 className="text-[#8d6e63] text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-playfair)]">Preferences</h3>
          </div>
          <div className="mx-5 bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_-4px_rgba(93,64,55,0.08)] border border-[#e7ddd0] relative divide-y divide-dashed divide-stone-200">
            <div className="absolute inset-[3px] border border-dashed border-[#d05a6e]/30 rounded-[1.8rem] pointer-events-none" />
            <div className="flex items-center justify-between p-4 py-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[0.25rem_1.5rem_0.25rem_1.5rem] bg-[#ffcc80]/20 flex items-center justify-center text-orange-600 shadow-sm border border-orange-200/30">
                  <Bell className="w-6 h-6" />
                </div>
                <span className="text-base font-medium font-[family-name:var(--font-playfair)] text-[#5d4037]">Garden Alerts</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out shadow-inner',
                  reduceMotion ? 'bg-stone-300' : 'bg-[#8caf7e]'
                )}>
                <span className={cn(
                  'pointer-events-none flex items-center justify-center h-6 w-6 transform rounded-full bg-[#fdfbf7] shadow-md ring-0 transition duration-300 ease-in-out',
                  reduceMotion ? 'translate-x-0.5' : 'translate-x-6'
                )}>
                  {reduceMotion ? (
                    <span className="text-stone-400 text-xs">✕</span>
                  ) : (
                    <Check className="w-3.5 h-3.5 text-[#8caf7e]" />
                  )}
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between p-4 py-5 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[1.5rem_0.25rem_1.5rem_0.25rem] bg-[#a5d6a7]/20 flex items-center justify-center text-green-700 shadow-sm border border-green-200/30">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-base font-medium font-[family-name:var(--font-playfair)] text-[#5d4037]">Currency</span>
              </div>
              <div className="flex items-center gap-3 text-[#8d6e63]">
                <span className="text-base italic">BRL (R$)</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#d05a6e] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 py-5 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[0.25rem_1.5rem_0.25rem_1.5rem] bg-[#ce93d8]/20 flex items-center justify-center text-purple-700 shadow-sm border border-purple-200/30">
                  <Calendar className="w-6 h-6" />
                </div>
                <span className="text-base font-medium font-[family-name:var(--font-playfair)] text-[#5d4037]">First Day</span>
              </div>
              <div className="flex items-center gap-3 text-[#8d6e63]">
                <span className="text-base italic">Monday</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#d05a6e] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy Section */}
        <div className="flex flex-col w-full mb-8">
          <div className="flex items-center gap-2 px-6 pb-3">
            <Shield className="w-4 h-4 text-[#d05a6e]" />
            <h3 className="text-[#8d6e63] text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-playfair)]">Data & Privacy</h3>
          </div>
          <div className="mx-5 bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_-4px_rgba(93,64,55,0.08)] border border-[#e7ddd0] relative divide-y divide-dashed divide-stone-200">
            <div className="absolute inset-[3px] border border-dashed border-[#d05a6e]/30 rounded-[1.8rem] pointer-events-none" />
            <button onClick={handleExport}
              className="flex items-center justify-between p-4 py-5 w-full cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-[1.5rem_0.25rem_1.5rem_0.25rem] bg-stone-400/20 flex items-center justify-center text-stone-600 shadow-sm border border-stone-200/30">
                  <Download className="w-6 h-6" />
                </div>
                <span className="text-base font-medium font-[family-name:var(--font-playfair)] text-[#5d4037]">Export Bouquet (CSV)</span>
              </div>
              <Download className="w-4 h-4 text-stone-400 group-hover:text-[#d05a6e] transition-colors" />
            </button>
            <button
              onClick={handleLogoutClick}
              disabled={!canLogout}
              className={cn(
                'flex items-center justify-center p-4 py-5 border-t border-dashed border-stone-200 transition-colors',
                canLogout ? 'hover:bg-[#ffe4eb]' : 'cursor-not-allowed opacity-40'
              )}
            >
              <div className="flex items-center gap-2 text-[#d05a6e]">
                <LogOut className={cn('w-5 h-5', isLoggingOut && 'animate-pulse')} />
                <span className="text-base font-bold font-[family-name:var(--font-playfair)] tracking-wide">
                  {isLoggingOut ? 'Leaving...' : 'Leave Garden'}
                </span>
              </div>
            </button>
          </div>

          {/* Version */}
          <div className="flex justify-center mt-8 opacity-60">
            <div className="relative flex items-center justify-center w-10 h-10">
              <Flower2 className="w-6 h-6 text-[#d05a6e] absolute animate-spin" style={{ animationDuration: '8s' }} />
              <span className="w-1.5 h-1.5 bg-[#fbc02d] rounded-full z-10" />
            </div>
          </div>
          <p className="text-center text-xs text-[#8d6e63] mt-1 pb-10 opacity-70 font-[family-name:var(--font-playfair)] italic">
            Version 2.4.0 (Build 302)
          </p>
        </div>
      </div>
    </div>
  );
}
