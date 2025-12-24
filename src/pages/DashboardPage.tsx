import { lazy, Suspense, useMemo, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskStore } from '@/stores/taskStore';
import { useFinancialStore } from '@/stores/financialStore';
import { useTheme } from '@/themes/ThemeContext';
import { DashboardPageProps } from '@/themes/packs/types';

// Lazy load theme-specific dashboard pages
const themedDashboards: Record<string, () => Promise<{ default: React.ComponentType<DashboardPageProps> }>> = {
  cyberpunk: () => import('@/themes/packs/cyberpunk/DashboardPage').then(m => ({ default: m.CyberpunkDashboardPage })),
  western: () => import('@/themes/packs/western/DashboardPage').then(m => ({ default: m.WesternDashboardPage })),
  nordic: () => import('@/themes/packs/nordic/DashboardPage').then(m => ({ default: m.NordicDashboardPage })),
  'dark-academia': () => import('@/themes/packs/dark-academia/DashboardPage').then(m => ({ default: m.DarkAcademiaDashboardPage })),
  ocean: () => import('@/themes/packs/ocean/DashboardPage').then(m => ({ default: m.OceanDashboardPage })),
  synthwave: () => import('@/themes/packs/synthwave/DashboardPage').then(m => ({ default: m.SynthwaveDashboardPage })),
  kawaii: () => import('@/themes/packs/kawaii/DashboardPage').then(m => ({ default: m.KawaiiDashboardPage })),
  noir: () => import('@/themes/packs/noir/DashboardPage').then(m => ({ default: m.NoirDashboardPage })),
  space: () => import('@/themes/packs/space/DashboardPage').then(m => ({ default: m.SpaceDashboardPage })),
  'sacred-serenity': () => import('@/themes/packs/sacred-serenity/DashboardPage').then(m => ({ default: m.SacredSerenityDashboardPage })),
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { themeId } = useTheme();
  const tasks = useTaskStore((state) => state.tasks);
  const getMonthlyBalance = useFinancialStore((state) => state.getMonthlyBalance);

  const userName = useMemo(() =>
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
    [user]
  );

  const now = useMemo(() => new Date(), []);
  const { income: monthIncome, expense: monthExpense, balance } = useMemo(
    () => getMonthlyBalance(now.getFullYear(), now.getMonth()),
    [getMonthlyBalance, now]
  );

  const todayTasks = useMemo(() => tasks.filter(t => {
    if (!t.dueDate) return false;
    const today = new Date().toDateString();
    return new Date(t.dueDate).toDateString() === today;
  }), [tasks]);

  const completedToday = useMemo(() =>
    todayTasks.filter(t => t.completedAt).length,
    [todayTasks]
  );

  const pendingTasks = useMemo(() =>
    tasks.filter(t => !t.completedAt).length,
    [tasks]
  );

  const overdueTasks = useMemo(() => tasks.filter(t => {
    if (!t.dueDate || t.completedAt) return false;
    return new Date(t.dueDate) < new Date();
  }).length, [tasks]);

  const progressValue = useMemo(() =>
    tasks.length > 0 ? (completedToday / tasks.length) * 100 : 0,
    [tasks.length, completedToday]
  );

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }, []);

  const pageProps: DashboardPageProps = useMemo(() => ({
    todayTasks,
    completedToday,
    pendingTasks,
    overdueTasks,
    progressValue,
    monthIncome,
    monthExpense,
    balance,
    formatCurrency,
    userName,
  }), [
    todayTasks,
    completedToday,
    pendingTasks,
    overdueTasks,
    progressValue,
    monthIncome,
    monthExpense,
    balance,
    formatCurrency,
    userName,
  ]);

  // Get themed dashboard component
  const ThemedDashboard = themedDashboards[themeId];

  if (ThemedDashboard) {
    const LazyThemedDashboard = lazy(ThemedDashboard);
    return (
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <LazyThemedDashboard {...pageProps} />
      </Suspense>
    );
  }

  // Fallback dashboard
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {userName}!</h1>
        <p className="text-muted-foreground">Here's your overview for today</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-4 border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <p className="text-2xl font-bold">{tasks.length}</p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">Today's Tasks</p>
          <p className="text-2xl font-bold">{todayTasks.length}</p>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">Balance</p>
          <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
        </div>
      </div>
    </div>
  );
}
