'use client';

import { SettingsPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Download, Upload, ChevronLeft, Palette, User, Settings, Shield, Bell, DollarSign, Calendar, Check, ChevronRight, LogOut } from 'lucide-react';

export function CyberpunkSettingsPage({
  themeId, setTheme, reduceMotion, setReduceMotion, themeList, currentTheme, handleExport, handleImport,
  userName = 'User', userEmail = '', isAuthenticated = false, onLogout, isLoggingOut = false,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen text-gray-200 font-[family-name:var(--font-space-grotesk)]"
      style={{
        backgroundColor: '#050510',
        backgroundImage: `
          linear-gradient(rgba(5,5,16,0.9), rgba(5,5,16,0.95)),
          linear-gradient(0deg, transparent 24%, rgba(30,30,50,0.3) 25%, rgba(30,30,50,0.3) 26%, transparent 27%, transparent 74%, rgba(30,30,50,0.3) 75%, rgba(30,30,50,0.3) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(30,30,50,0.3) 25%, rgba(30,30,50,0.3) 26%, transparent 27%, transparent 74%, rgba(30,30,50,0.3) 75%, rgba(30,30,50,0.3) 76%, transparent 77%, transparent)
        `,
        backgroundSize: '100% 100%, 50px 50px, 50px 50px',
      }}>

      <div className="relative z-10 pb-24">
        {/* Header - Sticky */}
        <header className="sticky top-0 z-50 flex items-center bg-[#050510]/90 backdrop-blur-md px-4 py-4 justify-between border-b border-[#00ffff]/20"
          style={{ boxShadow: '0 0 5px rgba(0,243,255,0.5), 0 0 10px rgba(0,243,255,0.2)' }}>
          <button className="w-10 h-10 rounded border border-[#00ffff]/30 hover:bg-[#00ffff]/10 hover:border-[#00ffff] flex items-center justify-center text-[#00ffff] transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-[family-name:var(--font-orbitron)] font-bold tracking-widest text-white uppercase"
            style={{ textShadow: '0 0 5px rgba(255,255,255,0.5)' }}>
            Settings
          </h2>
          <div className="w-10" />
        </header>

        {/* Appearance Section */}
        <div className="mt-6">
          <div className="flex items-center px-6 pb-4 pt-2">
            <Palette className="w-4 h-4 text-[#ff00ff] mr-2" />
            <h3 className="text-[#ff00ff] font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-[0.2em]"
              style={{ textShadow: '0 0 2px rgba(255,0,255,0.8)' }}>
              Appearance
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#ff00ff]/50 to-transparent ml-4" />
          </div>

          {/* Theme Carousel */}
          <div className="flex w-full overflow-x-auto px-6 pb-6 no-scrollbar gap-5 snap-x">
            {themeList.map((t) => {
              const isActive = themeId === t.id;
              return (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  className={cn(
                    'flex flex-col gap-3 shrink-0 snap-center cursor-pointer group w-32 transition-all',
                  )}>
                  <div className={cn(
                    'relative w-full h-48 rounded overflow-hidden transition-all duration-300 transform active:scale-95',
                    isActive
                      ? 'border-2 border-[#00ffff] rounded-lg'
                      : 'border-2 border-gray-700 group-hover:border-[#00ffff]/50'
                  )}
                    style={isActive ? { boxShadow: '0 0 15px rgba(0,243,255,0.3)' } : {}}>
                    <div className="absolute inset-0 opacity-60 group-hover:opacity-80 transition-opacity"
                      style={{ background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    
                    {/* Theme Icon */}
                    {t.preview?.icon && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <span className="text-5xl opacity-90 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">{t.preview.icon}</span>
                      </div>
                    )}
                    
                    {isActive && (
                      <>
                        <div className="absolute top-2 right-2 bg-[#00ffff] text-black rounded px-1.5 py-0.5 shadow-lg flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 font-bold" />
                        </div>
                        <div className="absolute inset-0 z-10 pointer-events-none"
                          style={{
                            backgroundImage: 'linear-gradient(rgba(18,16,11,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))',
                            backgroundSize: '100% 2px, 3px 100%',
                          }} />
                      </>
                    )}
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-gray-600/50 rounded-sm" />
                  </div>
                  <p className={cn(
                    'text-center text-sm font-bold tracking-wider font-[family-name:var(--font-orbitron)] uppercase transition-colors',
                    isActive ? 'text-[#00ffff]' : 'text-gray-500 group-hover:text-[#00ffff]'
                  )}
                    style={isActive ? { textShadow: '0 0 3px rgba(0,243,255,0.8)' } : {}}>
                    {t.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <div className="flex items-center px-6 pb-3">
            <User className="w-4 h-4 text-[#00ffff] mr-2" />
            <h3 className="text-[#00ffff] font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-[0.2em]"
              style={{ textShadow: '0 0 2px rgba(0,243,255,0.8)' }}>
              Account
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#00ffff]/50 to-transparent ml-4" />
          </div>

          <div className="mx-4 rounded-lg overflow-hidden relative"
            style={{ background: 'rgba(15,15,31,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,243,255,0.1)' }}>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ffff]/50 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ffff]/50 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ffff]/50 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ffff]/50 rounded-br-sm" />

            <div className="flex items-center p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-br from-[#ff00ff] to-[#00ffff] shadow-lg mr-4">
                <div className="w-full h-full rounded-full bg-black border-2 border-black flex items-center justify-center">
                  <User className="w-6 h-6 text-[#00ffff]" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-bold text-white tracking-wide font-[family-name:var(--font-orbitron)]">USER</h4>
                <p className="text-xs text-gray-400 font-mono tracking-wider">ID: USER@SYSTEM.NET</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#00ffff]/50 group-hover:text-[#00ffff] transition-colors" />
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#00ffff]/10 border border-[#00ffff]/30 flex items-center justify-center text-[#00ffff]"
                  style={{ boxShadow: '0 0 10px rgba(0,243,255,0.1)' }}>
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-base font-medium tracking-wide text-gray-200">Subscription</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-black bg-[#00ffff] px-2 py-0.5 rounded-sm uppercase tracking-wider font-[family-name:var(--font-orbitron)]"
                  style={{ boxShadow: '0 0 8px rgba(0,243,255,0.6)' }}>
                  Pro Active
                </span>
                <ChevronRight className="w-5 h-5 text-[#00ffff]/50 group-hover:text-[#00ffff] transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mb-6">
          <div className="flex items-center px-6 pb-3">
            <Settings className="w-4 h-4 text-[#0aff0a] mr-2" />
            <h3 className="text-[#0aff0a] font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-[0.2em]"
              style={{ textShadow: '0 0 2px rgba(10,255,10,0.8)' }}>
              Preferences
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#0aff0a]/50 to-transparent ml-4" />
          </div>

          <div className="mx-4 rounded-lg overflow-hidden divide-y divide-white/5 relative"
            style={{ background: 'rgba(15,15,31,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(10,255,10,0.1)' }}>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#0aff0a]/50 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#0aff0a]/50 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#0aff0a]/50 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#0aff0a]/50 rounded-br-sm" />

            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400"
                  style={{ boxShadow: '0 0 10px rgba(249,115,22,0.1)' }}>
                  <Bell className="w-5 h-5" />
                </div>
                <span className="text-base font-medium tracking-wide text-gray-200">Reduce Motion</span>
              </div>
              <button onClick={() => setReduceMotion(!reduceMotion)}
                className={cn('relative w-12 h-6 rounded-sm border-2 transition-all',
                  reduceMotion ? 'bg-[#00ffff]/20 border-[#00ffff]' : 'bg-[#1a1a2e] border-[#33334d]')}
                style={reduceMotion ? { boxShadow: '0 0 8px rgba(0,243,255,0.4)' } : {}}>
                <div className={cn('absolute top-0.5 w-4 h-4 rounded-sm transition-all',
                  reduceMotion ? 'left-6 bg-[#00ffff]' : 'left-0.5 bg-[#4a4a6a]')}
                  style={reduceMotion ? { boxShadow: '0 0 5px #00ffff' } : {}} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400"
                  style={{ boxShadow: '0 0 10px rgba(34,197,94,0.1)' }}>
                  <DollarSign className="w-5 h-5" />
                </div>
                <span className="text-base font-medium tracking-wide text-gray-200">Currency</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-sm font-mono tracking-wider text-[#0aff0a]">BRL (R$)</span>
                <ChevronRight className="w-5 h-5 group-hover:text-gray-200 transition-colors" />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400"
                  style={{ boxShadow: '0 0 10px rgba(168,85,247,0.1)' }}>
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-base font-medium tracking-wide text-gray-200">Start of Week</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-sm font-mono tracking-wider text-[#bc13fe]">MONDAY</span>
                <ChevronRight className="w-5 h-5 group-hover:text-gray-200 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy Section */}
        <div className="mb-8">
          <div className="flex items-center px-6 pb-3">
            <Shield className="w-4 h-4 text-[#bc13fe] mr-2" />
            <h3 className="text-[#bc13fe] font-[family-name:var(--font-orbitron)] text-sm font-bold uppercase tracking-[0.2em]"
              style={{ textShadow: '0 0 2px rgba(188,19,254,0.8)' }}>
              Data & Privacy
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-[#bc13fe]/50 to-transparent ml-4" />
          </div>

          <div className="mx-4 rounded-lg overflow-hidden divide-y divide-white/5 relative"
            style={{ background: 'rgba(15,15,31,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(188,19,254,0.1)' }}>
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#bc13fe]/50 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#bc13fe]/50 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#bc13fe]/50 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#bc13fe]/50 rounded-br-sm" />

            <button onClick={handleExport}
              className="flex items-center justify-between p-4 w-full hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-gray-500/10 border border-gray-500/30 flex items-center justify-center text-gray-400">
                  <Download className="w-5 h-5" />
                </div>
                <span className="text-base font-medium tracking-wide text-gray-200">Export Data (JSON)</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
            </button>

            <button onClick={handleImport}
              className="flex items-center justify-between p-4 w-full hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400"
                  style={{ boxShadow: '0 0 10px rgba(59,130,246,0.1)' }}>
                  <Upload className="w-5 h-5" />
                </div>
                <span className="text-base font-medium tracking-wide text-gray-200">Import Data</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-300 transition-colors" />
            </button>

            <button
              onClick={() => onLogout?.()}
              disabled={isLoggingOut || !isAuthenticated}
              className="flex items-center justify-center p-4 hover:bg-red-500/5 transition-colors cursor-pointer border-t border-red-500/20 mt-1 w-full disabled:opacity-50"
            >
              <LogOut className="w-4 h-4 text-red-500 mr-2" />
              <span className="text-base font-bold text-red-500 font-[family-name:var(--font-orbitron)] tracking-widest uppercase"
                style={{ textShadow: '0 0 5px rgba(239,68,68,0.4)' }}>
                {isLoggingOut ? 'LOGGING OUT...' : 'LOG OUT'}
              </span>
            </button>
          </div>

          {/* Version */}
          <div className="mt-8 flex justify-center">
            <p className="text-center text-[10px] text-gray-500 font-mono tracking-widest uppercase border border-gray-800 px-3 py-1 rounded bg-black/40">
              System V.2.4.0 <span className="text-gray-700">|</span> Build 302
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
