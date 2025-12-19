'use client';

import { useState } from 'react';
import { 
  Settings, 
  Palette, 
  Globe, 
  Bell, 
  Shield,
  Save,
  RotateCcw,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

const availableThemes = [
  { id: 'cyberpunk', name: 'Cyberpunk', color: 'from-pink-500 to-purple-600' },
  { id: 'western', name: 'Western', color: 'from-amber-600 to-orange-700' },
  { id: 'nordic', name: 'Nordic', color: 'from-slate-400 to-slate-600' },
  { id: 'dark-academia', name: 'Elegance', color: 'from-amber-700 to-stone-800' },
  { id: 'ocean', name: 'Ocean', color: 'from-cyan-500 to-blue-600' },
  { id: 'synthwave', name: 'Retro', color: 'from-indigo-500 to-purple-600' },
  { id: 'kawaii', name: 'Floral', color: 'from-pink-400 to-rose-500' },
  { id: 'space', name: 'Space', color: 'from-purple-600 to-indigo-800' },
  { id: 'noir', name: 'Noir', color: 'from-gray-700 to-gray-900' },
];

export default function AdminSettingsPage() {
  const [enabledThemes, setEnabledThemes] = useState<string[]>(availableThemes.map(t => t.id));
  const [defaultTheme, setDefaultTheme] = useState('nordic');
  const [settings, setSettings] = useState({
    allowSignups: true,
    requireEmailVerification: true,
    maxTenantsPerUser: 3,
    maxMembersPerTenant: 10,
    enableNotifications: true,
  });
  const [saved, setSaved] = useState(false);

  const toggleTheme = (themeId: string) => {
    if (enabledThemes.includes(themeId)) {
      if (enabledThemes.length > 1) {
        setEnabledThemes(enabledThemes.filter(t => t !== themeId));
        if (defaultTheme === themeId) {
          setDefaultTheme(enabledThemes.find(t => t !== themeId) || 'nordic');
        }
      }
    } else {
      setEnabledThemes([...enabledThemes, themeId]);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-slate-400">Configure global platform settings</p>
        </div>
        <button
          onClick={handleSave}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all w-full sm:w-auto',
            saved 
              ? 'bg-green-500 text-white' 
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          )}
        >
          {saved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      {/* Theme Settings */}
      <section className="bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Theme Settings</h2>
            <p className="text-xs sm:text-sm text-slate-400">Configure available themes for users</p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <label className="block text-sm font-medium text-slate-400 mb-2 sm:mb-3">Default Theme</label>
          <select
            value={defaultTheme}
            onChange={(e) => setDefaultTheme(e.target.value)}
            className="w-full sm:max-w-xs px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-700 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {enabledThemes.map(themeId => {
              const theme = availableThemes.find(t => t.id === themeId);
              return (
                <option key={themeId} value={themeId}>
                  {theme?.name || themeId}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-2 sm:mb-3">Enabled Themes</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {availableThemes.map((theme) => {
              const isEnabled = enabledThemes.includes(theme.id);
              const isDefault = defaultTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => toggleTheme(theme.id)}
                  className={cn(
                    'relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all text-left',
                    isEnabled
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-slate-600 bg-slate-700/50 opacity-60 hover:opacity-100'
                  )}
                >
                  <div className={cn(
                    'w-full h-6 sm:h-8 rounded-md sm:rounded-lg bg-gradient-to-r mb-2 sm:mb-3',
                    theme.color
                  )} />
                  <p className="font-medium text-sm sm:text-base">{theme.name}</p>
                  {isDefault && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-purple-500 text-xs rounded-full">
                      Default
                    </span>
                  )}
                  {isEnabled && (
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Access Settings */}
      <section className="bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700 mb-4 sm:mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Access & Security</h2>
            <p className="text-xs sm:text-sm text-slate-400">Configure authentication and limits</p>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-slate-700/50 rounded-lg sm:rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-sm sm:text-base">Allow New Signups</p>
              <p className="text-xs sm:text-sm text-slate-400">Allow new users to register</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, allowSignups: !settings.allowSignups })}
              className={cn(
                'relative w-12 h-6 rounded-full transition-colors',
                settings.allowSignups ? 'bg-green-500' : 'bg-slate-600'
              )}
            >
              <div className={cn(
                'absolute top-1 w-4 h-4 bg-white rounded-full transition-all',
                settings.allowSignups ? 'right-1' : 'left-1'
              )} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-slate-700/50 rounded-lg sm:rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-sm sm:text-base">Require Email Verification</p>
              <p className="text-xs sm:text-sm text-slate-400">Users must verify email before access</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, requireEmailVerification: !settings.requireEmailVerification })}
              className={cn(
                'relative w-12 h-6 rounded-full transition-colors',
                settings.requireEmailVerification ? 'bg-green-500' : 'bg-slate-600'
              )}
            >
              <div className={cn(
                'absolute top-1 w-4 h-4 bg-white rounded-full transition-all',
                settings.requireEmailVerification ? 'right-1' : 'left-1'
              )} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-slate-700/50 rounded-lg sm:rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-sm sm:text-base">Max Tenants per User</p>
              <p className="text-xs sm:text-sm text-slate-400">Limit workspaces a user can create</p>
            </div>
            <input
              type="number"
              value={settings.maxTenantsPerUser}
              onChange={(e) => setSettings({ ...settings, maxTenantsPerUser: parseInt(e.target.value) || 1 })}
              min={1}
              max={100}
              className="w-16 sm:w-20 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-600 border border-slate-500 rounded-lg text-center text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-slate-700/50 rounded-lg sm:rounded-xl">
            <div className="min-w-0">
              <p className="font-medium text-sm sm:text-base">Max Members per Tenant</p>
              <p className="text-xs sm:text-sm text-slate-400">Limit members in each workspace</p>
            </div>
            <input
              type="number"
              value={settings.maxMembersPerTenant}
              onChange={(e) => setSettings({ ...settings, maxMembersPerTenant: parseInt(e.target.value) || 1 })}
              min={1}
              max={1000}
              className="w-16 sm:w-20 px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-600 border border-slate-500 rounded-lg text-center text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">Notifications</h2>
            <p className="text-xs sm:text-sm text-slate-400">Configure system notifications</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 p-3 sm:p-4 bg-slate-700/50 rounded-lg sm:rounded-xl">
          <div className="min-w-0">
            <p className="font-medium text-sm sm:text-base">Enable Email Notifications</p>
            <p className="text-xs sm:text-sm text-slate-400">Send email notifications to users</p>
          </div>
          <button
            onClick={() => setSettings({ ...settings, enableNotifications: !settings.enableNotifications })}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors',
              settings.enableNotifications ? 'bg-green-500' : 'bg-slate-600'
            )}
          >
            <div className={cn(
              'absolute top-1 w-4 h-4 bg-white rounded-full transition-all',
              settings.enableNotifications ? 'right-1' : 'left-1'
            )} />
          </button>
        </div>
      </section>
    </div>
  );
}
