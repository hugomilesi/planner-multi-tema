import { useMemo } from 'react';
import { useTheme } from '@/themes/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskStore } from '@/stores/taskStore';
import { useFinancialStore } from '@/stores/financialStore';

// Import theme-specific components
import { CyberpunkDashboardPage } from '@/themes/packs/cyberpunk/DashboardPage';
import { WesternDashboardPage } from '@/themes/packs/western/DashboardPage';
import { NordicDashboardPage } from '@/themes/packs/nordic/DashboardPage';
import { DarkAcademiaDashboardPage } from '@/themes/packs/dark-academia/DashboardPage';
import { OceanDashboardPage } from '@/themes/packs/ocean/DashboardPage';
import { SynthwaveDashboardPage } from '@/themes/packs/synthwave/DashboardPage';
import { KawaiiDashboardPage } from '@/themes/packs/kawaii/DashboardPage';
import { NoirDashboardPage } from '@/themes/packs/noir/DashboardPage';
import { SpaceDashboardPage } from '@/themes/packs/space/DashboardPage';
import { SacredSerenityDashboardPage } from '@/themes/packs/sacred-serenity/DashboardPage';

export default function DashboardPage() {
  const { themeId } = useTheme();
  const { user } = useAuth();
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

  const today = now.toISOString().split('T')[0];
  const todayTasks = tasks.filter((task) => task.dueDate === today);
  const completedToday = todayTasks.filter((task) => task.status === 'completed').length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;
  const overdueTasks = tasks.filter(
    (task) => task.status === 'pending' && task.dueDate && task.dueDate < today
  ).length;
  const progressValue = tasks.length > 0 
    ? (tasks.filter((t) => t.status === 'completed').length / tasks.length) * 100 
    : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const commonProps = {
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
  };

  switch (themeId) {
    case 'cyberpunk':
      return <CyberpunkDashboardPage {...commonProps} />;
    case 'western':
      return <WesternDashboardPage {...commonProps} />;
    case 'nordic':
      return <NordicDashboardPage {...commonProps} />;
    case 'dark-academia':
      return <DarkAcademiaDashboardPage {...commonProps} />;
    case 'ocean':
      return <OceanDashboardPage {...commonProps} />;
    case 'synthwave':
      return <SynthwaveDashboardPage {...commonProps} />;
    case 'kawaii':
      return <KawaiiDashboardPage {...commonProps} />;
    case 'noir':
      return <NoirDashboardPage {...commonProps} />;
    case 'space':
      return <SpaceDashboardPage {...commonProps} />;
    case 'sacred-serenity':
      return <SacredSerenityDashboardPage {...commonProps} />;
    default:
      return <KawaiiDashboardPage {...commonProps} />;
  }
}
