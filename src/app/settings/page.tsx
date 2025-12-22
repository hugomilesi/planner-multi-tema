'use client';

import { useState, useEffect, ComponentType } from 'react';
import { Zap, Download, Upload, Info, LogOut, User, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { themeList } from '@/themes/registry';
import { ThemeId } from '@/themes/types';
import { ThemedCard } from '@/components/shared/ThemedCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PageTransition } from '@/components/layout/PageTransition';
import { Separator } from '@/components/ui/separator';
import { useTaskStore } from '@/stores/taskStore';
import { useFinancialStore } from '@/stores/financialStore';
import { cn } from '@/lib/utils';
import { hasCustomPage, themedPages, ThemeWithCustomPages } from '@/themes/packs';
import { SettingsPageProps } from '@/themes/packs/types';

export default function SettingsPage() {
  const { theme, themeId, setTheme, reduceMotion, setReduceMotion } = useTheme();
  const visuals = getThemeVisuals(themeId);
  const tasks = useTaskStore((state) => state.tasks);
  const { transactions, categories } = useFinancialStore();
  const { user, profile, signOut, isAuthenticated, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Dynamic theme page loading
  const [CustomPage, setCustomPage] = useState<ComponentType<SettingsPageProps> | null>(null);
  

  useEffect(() => {
    if (hasCustomPage(themeId, 'settings')) {
      const themePack = themedPages[themeId as ThemeWithCustomPages];
      if (themePack?.settings) {
        themePack.settings().then((Page) => setCustomPage(() => Page));
      }
    } else {
      setCustomPage(null);
    }
  }, [themeId]);

  const handleExport = () => {
    const data = {
      tasks,
      transactions,
      categories,
      preferences: {
        themeId,
        reduceMotion,
      },
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `planner-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);
        
        if (data.preferences?.themeId) {
          setTheme(data.preferences.themeId);
        }
        if (data.preferences?.reduceMotion !== undefined) {
          setReduceMotion(data.preferences.reduceMotion);
        }
        
        alert('Data imported successfully! Please refresh the page to see all changes.');
      } catch {
        alert('Failed to import data. Please check the file format.');
      }
    };
    input.click();
  };

  // Props for custom themed pages
  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  const pageProps: SettingsPageProps = {
    themeId,
    setTheme: (id: string) => setTheme(id as ThemeId),
    reduceMotion,
    setReduceMotion,
    themeList: themeList.map(t => ({ id: t.id, name: t.name, tokens: { primary: t.tokens.primary, accent: t.tokens.accent } })),
    currentTheme: { name: theme.name, tokens: { primary: theme.tokens.primary, accent: theme.tokens.accent } },
    handleExport,
    handleImport,
    userName: displayName,
    userEmail,
    isAuthenticated,
    onLogout: handleLogout,
    isLoggingOut,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Render custom themed page if available
  if (CustomPage) {
    return <CustomPage {...pageProps} />;
  }

  // Default page
  return (
    <PageTransition>
      <div className={cn('px-4 pt-6 pb-4 space-y-6', visuals.fonts.body)}>
        <header>
          <h1 className={cn('text-2xl font-bold', visuals.fonts.heading)}>{visuals.labels.settings}</h1>
          <p className={cn('text-sm opacity-70', visuals.card.titleClassName)}>
            Customize your planner experience
          </p>
        </header>

        <ThemedCard title="Choose Theme" delay={0}>
          <div className="grid grid-cols-3 gap-3">
            {themeList.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as ThemeId)}
                className={`relative p-3 rounded-xl border-2 transition-all ${
                  themeId === t.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div 
                  className="w-full h-12 rounded-lg mb-2"
                  style={{ 
                    background: `linear-gradient(135deg, ${t.tokens.primary} 0%, ${t.tokens.accent} 100%)`,
                  }}
                />
                <p className="text-xs font-medium truncate">{t.name}</p>
                {themeId === t.id && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ThemedCard>

        <ThemedCard title="Current Theme" delay={1}>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.tokens.primary} 0%, ${theme.tokens.accent} 100%)`,
                }}
              />
              <div>
                <p className="font-semibold">{theme.name}</p>
                <p className="text-xs text-muted-foreground">{theme.description}</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-5 gap-2">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ background: theme.tokens.primary }} />
                <span className="text-[10px] text-muted-foreground">Primary</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ background: theme.tokens.secondary }} />
                <span className="text-[10px] text-muted-foreground">Secondary</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ background: theme.tokens.accent }} />
                <span className="text-[10px] text-muted-foreground">Accent</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full mx-auto mb-1 border" style={{ background: theme.tokens.background }} />
                <span className="text-[10px] text-muted-foreground">BG</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ background: theme.tokens.destructive }} />
                <span className="text-[10px] text-muted-foreground">Danger</span>
              </div>
            </div>
          </div>
        </ThemedCard>

        <ThemedCard title="Accessibility" delay={2}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="reduce-motion" className="font-medium">Reduce Motion</Label>
                  <p className="text-xs text-muted-foreground">
                    Disable animations and transitions
                  </p>
                </div>
              </div>
              <Switch
                id="reduce-motion"
                checked={reduceMotion}
                onCheckedChange={setReduceMotion}
              />
            </div>
          </div>
        </ThemedCard>

        <ThemedCard title="Data Management" delay={3}>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={handleExport}
            >
              <Download className="w-4 h-4" />
              Export Data
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-3"
              onClick={handleImport}
            >
              <Upload className="w-4 h-4" />
              Import Data
            </Button>
          </div>
        </ThemedCard>

        {/* Account Section */}
        {isAuthenticated && (
          <ThemedCard title="Account" delay={4}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {profile?.display_name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              
              <Button 
                variant="destructive" 
                className="w-full justify-start gap-3"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <LogOut className="w-4 h-4" />
                {isLoggingOut ? 'Logging out...' : 'Sign Out'}
              </Button>
            </div>
          </ThemedCard>
        )}

        <ThemedCard delay={5}>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Info className="w-5 h-5" />
            <div>
              <p className="text-sm font-medium">Chamaleon Planner</p>
              <p className="text-xs">Version 1.0.0 • Made with ❤️</p>
            </div>
          </div>
        </ThemedCard>
      </div>
    </PageTransition>
  );
}
