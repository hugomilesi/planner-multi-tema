'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, ChevronLeft, ChevronRight, Flower2, Bell, DollarSign, Calendar, User, Check, LogOut, Shield, Leaf } from 'lucide-react';

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
    <div className="min-h-screen" style={{
      backgroundColor: '#2d1f24',
      fontFamily: '"DM Sans", sans-serif'
    }}>

      {/* Floral pattern overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d47a96\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className="sticky top-0 z-50 flex items-center bg-[#2d1f24]/80 backdrop-blur-xl px-6 py-5 justify-between">
          <button className="flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-[#3d2a32] shadow-sm cursor-pointer text-rose-100 transition-all border border-rose-900/30 hover:bg-[#d47a96]/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center flex-1 pr-11">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d47a96] font-bold mb-0.5">Configuration</span>
            <h2 className="text-2xl font-bold leading-none tracking-tight text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Settings</h2>
          </div>
        </div>

        {/* Garden Themes Section */}
        <div className="flex flex-col w-full mt-2 relative">
          <div className="absolute -top-10 -right-10 text-[#d47a96]/5 pointer-events-none rotate-12">
            <Flower2 className="w-[200px] h-[200px]" />
          </div>
          <div className="flex items-center gap-2 px-6 pb-4 pt-4">
            <Flower2 className="w-4 h-4 text-[#d47a96]" />
            <h3 className="text-[#9e7f8a] text-xs font-bold uppercase tracking-widest">Garden Themes</h3>
          </div>
          <div className="flex w-full overflow-x-auto px-6 pb-8 no-scrollbar gap-5 snap-x pt-2">
            {themeList.map((t, i) => {
              const isActive = themeId === t.id;
              return (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  className="flex flex-col gap-3 shrink-0 snap-center cursor-pointer group relative">
                  {isActive && <div className="absolute -inset-2 bg-gradient-to-tr from-[#d47a96]/20 to-transparent rounded-[2rem] blur-sm" />}
                  <div className={cn(
                    'relative h-48 overflow-hidden shadow-md transition-all transform hover:-translate-y-1 p-1',
                    isActive
                      ? 'w-32 rounded-[1.5rem] border-2 border-[#d47a96] shadow-[0_0_20px_rgba(212,122,150,0.4)] ring-2 ring-[#d47a96]/30 ring-offset-2 ring-offset-[#2d1f24]'
                      : 'w-28 rounded-[1.2rem] border border-rose-900/30 bg-[#3d2a32] hover:border-[#d47a96]/50'
                  )}>
                    <div className={cn('w-full h-full overflow-hidden relative', isActive ? 'rounded-[1.2rem]' : 'rounded-[1rem]')}>
                      <div className="absolute inset-0"
                        style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                      
                      {/* Theme Icon */}
                      {t.preview?.icon && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-90 drop-shadow-lg">{t.preview.icon}</span>
                        </div>
                      )}
                      
                      {isActive && (
                        <>
                          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-[#2d1f24]/80 to-transparent" />
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                            <div className="bg-[#d47a96] text-white rounded-full p-2 shadow-lg flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <p className={cn(
                    'text-center text-sm tracking-wide',
                    isActive ? 'font-bold text-white' : 'font-medium text-[#9e7f8a] group-hover:text-rose-100 transition-colors'
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
            <User className="w-4 h-4 text-[#d47a96]" />
            <h3 className="text-[#9e7f8a] text-xs font-bold uppercase tracking-widest">Account</h3>
          </div>
          <div className="mx-5 bg-[#3d2a32] rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_-2px_rgba(212,122,150,0.15)] border border-rose-900/30 relative">
            <div className="flex items-center p-4 border-b border-rose-900/20 cursor-pointer group">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-[#d47a96] to-[#b85c78] mr-4">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#2d1f24] flex items-center justify-center">
                  <User className="w-6 h-6 text-[#d47a96]" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white mb-0.5" style={{ fontFamily: '"Playfair Display", serif' }}>{userName}</h4>
                <p className="text-sm text-[#9e7f8a]">{userEmail}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#2d1f24] flex items-center justify-center text-[#9e7f8a] group-hover:bg-[#d47a96] group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#d47a96]/10 flex items-center justify-center text-[#d47a96]">
                  <Flower2 className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white">Plan Status</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#d47a96] to-[#b85c78] px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-[#d47a96]/20">
                  Bloom Pro
                </span>
                <ChevronRight className="w-4 h-4 text-[#9e7f8a] group-hover:text-[#d47a96] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="flex flex-col w-full mb-6">
          <div className="flex items-center gap-2 px-6 pb-3">
            <Leaf className="w-4 h-4 text-[#a3c9a8]" />
            <h3 className="text-[#9e7f8a] text-xs font-bold uppercase tracking-widest">Preferences</h3>
          </div>
          <div className="mx-5 bg-[#3d2a32] rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_-2px_rgba(212,122,150,0.15)] border border-rose-900/30 divide-y divide-rose-900/20">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <Bell className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white">Garden Alerts</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn(
                  'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-300 ease-in-out',
                  reduceMotion ? 'bg-rose-900/30' : 'bg-[#a3c9a8]'
                )}>
                <span className={cn(
                  'pointer-events-none flex items-center justify-center h-5 w-5 transform rounded-full bg-white shadow-md transition duration-300 ease-in-out',
                  reduceMotion ? 'translate-x-1' : 'translate-x-6'
                )}>
                  {reduceMotion ? (
                    <span className="text-rose-900/50 text-xs">✕</span>
                  ) : (
                    <Check className="w-3 h-3 text-[#a3c9a8]" />
                  )}
                </span>
              </button>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#a3c9a8]/10 flex items-center justify-center text-[#a3c9a8]">
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white">Currency</span>
              </div>
              <div className="flex items-center gap-3 text-[#9e7f8a]">
                <span className="text-sm">BRL (R$)</span>
                <ChevronRight className="w-4 h-4 group-hover:text-[#d47a96] transition-colors" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white">First Day</span>
              </div>
              <div className="flex items-center gap-3 text-[#9e7f8a]">
                <span className="text-sm">Monday</span>
                <ChevronRight className="w-4 h-4 group-hover:text-[#d47a96] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy Section */}
        <div className="flex flex-col w-full mb-8">
          <div className="flex items-center gap-2 px-6 pb-3">
            <Shield className="w-4 h-4 text-[#d47a96]" />
            <h3 className="text-[#9e7f8a] text-xs font-bold uppercase tracking-widest">Data & Privacy</h3>
          </div>
          <div className="mx-5 bg-[#3d2a32] rounded-[1.5rem] overflow-hidden shadow-[0_4px_20px_-2px_rgba(212,122,150,0.15)] border border-rose-900/30 divide-y divide-rose-900/20">
            <button onClick={handleExport}
              className="flex items-center justify-between p-4 w-full cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#9e7f8a]/10 flex items-center justify-center text-[#9e7f8a]">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-white">Export Bouquet (CSV)</span>
              </div>
              <Download className="w-4 h-4 text-[#9e7f8a] group-hover:text-[#d47a96] transition-colors" />
            </button>
            <button
              onClick={handleLogoutClick}
              disabled={!canLogout}
              className={cn(
                'flex items-center justify-center p-4 w-full transition-colors',
                canLogout ? 'hover:bg-[#d47a96]/10' : 'cursor-not-allowed opacity-40'
              )}
            >
              <div className="flex items-center gap-2 text-[#d47a96]">
                <LogOut className={cn('w-5 h-5', isLoggingOut && 'animate-pulse')} />
                <span className="text-sm font-bold tracking-wide">
                  {isLoggingOut ? 'Leaving...' : 'Leave Garden'}
                </span>
              </div>
            </button>
          </div>

          {/* Version */}
          <div className="flex justify-center mt-8 opacity-60">
            <div className="relative flex items-center justify-center w-10 h-10">
              <Flower2 className="w-6 h-6 text-[#d47a96] absolute animate-spin" style={{ animationDuration: '8s' }} />
              <span className="w-1.5 h-1.5 bg-[#a3c9a8] rounded-full z-10" />
            </div>
          </div>
          <p className="text-center text-xs text-[#9e7f8a] mt-1 pb-10 opacity-70">
            Version 2.4.0 (Build 302)
          </p>
        </div>
      </div>
    </div>
  );
}
