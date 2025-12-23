import { Link } from 'react-router-dom';
import { SettingsPageProps } from '../types';
import { ChevronRight, Download, Upload, LogOut, ArrowLeft } from 'lucide-react';

export function SacredSerenitySettingsPage({
  themeId,
  setTheme,
  reduceMotion,
  setReduceMotion,
  themeList,
  currentTheme,
  handleExport,
  handleImport,
  userName = 'Friend',
  userEmail,
  isAuthenticated,
  onLogout,
  isLoggingOut,
}: SettingsPageProps) {
  return (
    <div className="min-h-screen bg-[#1C1917] font-sans text-[#E7E5E4] overflow-x-hidden pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center bg-[#1C1917]/95 backdrop-blur-sm px-4 py-3 justify-between border-b border-stone-800">
        <Link to="/" className="flex w-10 h-10 shrink-0 items-center justify-center rounded-full hover:bg-stone-800 cursor-pointer text-[#8D6E63] transition-colors">
          <ArrowLeft className="w-5 h-5 font-bold" />
        </Link>
        <h2 className="text-lg font-serif font-bold leading-tight tracking-tight flex-1 text-center pr-10 text-stone-100">
          Settings
        </h2>
      </div>

      {/* Theme Gallery */}
      <div className="flex flex-col w-full mt-4">
        <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest px-6 pb-3 pt-2 font-serif">
          Theme Gallery
        </h3>
        <div className="flex w-full overflow-x-auto px-4 pb-4 no-scrollbar gap-4 snap-x">
          {themeList.map((theme) => {
            const isActive = themeId === theme.id;
            return (
              <div key={theme.id} className="flex flex-col gap-2 shrink-0 snap-center cursor-pointer group">
                <div
                  onClick={() => setTheme(theme.id)}
                  className={`relative w-28 h-44 rounded-xl overflow-hidden shadow-lg transition-transform transform active:scale-95 ${
                    isActive
                      ? 'border-4 border-[#8D6E63] ring-2 ring-[#8D6E63]/40'
                      : 'border border-[#3F3F3F] hover:border-[#8D6E63]/50'
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      background: `linear-gradient(135deg, ${theme.tokens.primary} 0%, ${theme.tokens.accent} 100%)`,
                    }}
                  >
                    {isActive && <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply"></div>}
                  </div>
                  <div className="absolute top-3 left-3 right-3 h-2 bg-white/40 rounded-full"></div>
                  <div className="absolute top-7 left-3 w-12 h-2 bg-white/40 rounded-full"></div>
                  <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#8D6E63]/30 to-transparent"></div>
                  {isActive && (
                    <div className="absolute bottom-2 right-2 bg-[#8D6E63] text-white rounded-full p-1 shadow-md flex items-center justify-center border border-white/20">
                      <span className="text-[16px] font-bold">✓</span>
                    </div>
                  )}
                </div>
                <p className={`text-center text-sm font-semibold font-serif ${
                  isActive ? 'text-[#8D6E63]' : 'text-stone-400 group-hover:text-white'
                } transition-colors`}>
                  {theme.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Section */}
      {isAuthenticated && (
        <div className="flex flex-col w-full mb-6">
          <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest px-6 pb-2 font-serif">
            Account
          </h3>
          <div className="mx-4 bg-[#292524] rounded-xl overflow-hidden shadow-sm ring-1 ring-white/10">
            <div className="flex items-center p-4 border-b border-stone-700/50 active:bg-stone-800 transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full border-2 border-stone-600 overflow-hidden mr-4 shadow-sm bg-gradient-to-br from-[#8D6E63] to-[#5D4037] flex items-center justify-center text-white text-xl font-serif font-bold">
                {userName.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-stone-100 font-serif">
                  {userName}
                </p>
                <p className="text-sm text-stone-400">{userEmail}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-stone-300 transition-colors" />
            </div>
          </div>
        </div>
      )}

      {/* Preferences */}
      <div className="flex flex-col w-full mb-6">
        <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest px-6 pb-2 font-serif">
          Preferences
        </h3>
        <div className="mx-4 bg-[#292524] rounded-xl overflow-hidden shadow-sm ring-1 ring-white/10">
          <button
            onClick={() => setReduceMotion(!reduceMotion)}
            className="w-full flex items-center justify-between p-4 active:bg-stone-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <p className="text-base font-semibold text-stone-100">Reduce Motion</p>
                <p className="text-sm text-stone-400">Disable animations</p>
              </div>
            </div>
            <div className={`w-12 h-6 rounded-full transition-colors ${
              reduceMotion ? 'bg-[#8D6E63]' : 'bg-stone-700'
            }`}>
              <div className={`w-5 h-5 rounded-full bg-white mt-0.5 transition-transform ${
                reduceMotion ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </div>
          </button>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="flex flex-col w-full mb-6">
        <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest px-6 pb-2 font-serif">
          Data & Privacy
        </h3>
        <div className="mx-4 space-y-2">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-between p-4 bg-[#292524] rounded-xl shadow-sm ring-1 ring-white/10 active:bg-stone-800 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#8D6E63]" />
              <span className="text-base font-semibold text-stone-100">Export Data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-stone-300 transition-colors" />
          </button>

          <button
            onClick={handleImport}
            className="w-full flex items-center justify-between p-4 bg-[#292524] rounded-xl shadow-sm ring-1 ring-white/10 active:bg-stone-800 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Upload className="w-5 h-5 text-[#8D6E63]" />
              <span className="text-base font-semibold text-stone-100">Import Data</span>
            </div>
            <ChevronRight className="w-5 h-5 text-stone-500 group-hover:text-stone-300 transition-colors" />
          </button>

          {isAuthenticated && onLogout && (
            <button
              onClick={onLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-between p-4 bg-red-900/10 rounded-xl shadow-sm ring-1 ring-red-900/20 active:bg-red-900/20 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-base font-semibold text-red-400">
                  {isLoggingOut ? 'Logging out...' : 'Log Out'}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4 px-6">
        <p className="text-xs text-stone-400 font-serif italic">
          "Let all things be done decently and in order." — v2.4.0
        </p>
      </div>
    </div>
  );
}
