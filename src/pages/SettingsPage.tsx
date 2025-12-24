import { lazy, Suspense, useState } from 'react';
import { useTheme } from '@/themes/ThemeContext';
import { themeList } from '@/themes/registry';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeId } from '@/themes/types';
import { SettingsPageProps } from '@/themes/packs/types';

const themedSettings: Record<string, () => Promise<{ default: React.ComponentType<SettingsPageProps> }>> = {
  cyberpunk: () => import('@/themes/packs/cyberpunk/SettingsPage').then(m => ({ default: m.CyberpunkSettingsPage })),
  western: () => import('@/themes/packs/western/SettingsPage').then(m => ({ default: m.WesternSettingsPage })),
  nordic: () => import('@/themes/packs/nordic/SettingsPage').then(m => ({ default: m.NordicSettingsPage })),
  'dark-academia': () => import('@/themes/packs/dark-academia/SettingsPage').then(m => ({ default: m.DarkAcademiaSettingsPage })),
  ocean: () => import('@/themes/packs/ocean/SettingsPage').then(m => ({ default: m.OceanSettingsPage })),
  synthwave: () => import('@/themes/packs/synthwave/SettingsPage').then(m => ({ default: m.SynthwaveSettingsPage })),
  kawaii: () => import('@/themes/packs/kawaii/SettingsPage').then(m => ({ default: m.KawaiiSettingsPage })),
  noir: () => import('@/themes/packs/noir/SettingsPage').then(m => ({ default: m.NoirSettingsPage })),
  space: () => import('@/themes/packs/space/SettingsPage').then(m => ({ default: m.SpaceSettingsPage })),
  'sacred-serenity': () => import('@/themes/packs/sacred-serenity/SettingsPage').then(m => ({ default: m.SacredSerenitySettingsPage })),
};

export default function SettingsPage() {
  const { themeId, setTheme, theme, reduceMotion, setReduceMotion } = useTheme();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleExport = () => {
    const data = {
      tasks: localStorage.getItem('tasks'),
      transactions: localStorage.getItem('transactions'),
      settings: localStorage.getItem('settings'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planner-backup-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.tasks) localStorage.setItem('tasks', data.tasks);
            if (data.transactions) localStorage.setItem('transactions', data.transactions);
            if (data.settings) localStorage.setItem('settings', data.settings);
            window.location.reload();
          } catch (error) {
            console.error('Import error:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const pageProps: SettingsPageProps = {
    themeId,
    setTheme: (id: string) => setTheme(id as ThemeId),
    reduceMotion,
    setReduceMotion,
    themeList,
    currentTheme: theme,
    handleExport,
    handleImport,
    userName: user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
    userEmail: user?.email,
    isAuthenticated: !!user,
    onLogout: handleLogout,
    isLoggingOut,
  };

  const ThemedSettings = themedSettings[themeId];

  if (ThemedSettings) {
    const LazyThemedSettings = lazy(ThemedSettings);
    return (
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <LazyThemedSettings {...pageProps} />
      </Suspense>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold mb-3">Theme</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themeList.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as ThemeId)}
                className={`p-4 border rounded-lg transition-colors ${
                  themeId === t.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3">Preferences</h2>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Reduce Motion</p>
              <p className="text-sm text-muted-foreground">Disable animations</p>
            </div>
            <Button
              variant={reduceMotion ? 'default' : 'outline'}
              size="sm"
              onClick={() => setReduceMotion(!reduceMotion)}
            >
              {reduceMotion ? 'On' : 'Off'}
            </Button>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-3">Data & Privacy</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={handleExport}>
              Export Data
            </Button>
            <Button variant="outline" className="w-full" onClick={handleImport}>
              Import Data
            </Button>
            {user && (
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Log Out'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
