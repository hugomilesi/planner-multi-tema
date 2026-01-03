import { lazy, Suspense, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFinancialStore, Transaction } from '@/stores/financialStore';
import { useTheme } from '@/themes/ThemeContext';
import { FinancialPageProps } from '@/themes/packs/types';
import { createStableFinancialComponent } from '@/utils/stableFinancialComponent';
import { CreateTransactionDialog } from '@/components/dialogs/CreateTransactionDialog';
import { PageSkeleton } from '@/components/layout/PageSkeleton';
import { PeriodFilter, getDefaultPeriod, type PeriodRange } from '@/components/financial/PeriodFilter';

const themedFinancial: Record<string, () => Promise<{ default: React.ComponentType<FinancialPageProps> }>> = {
  cyberpunk: () => import('@/themes/packs/cyberpunk/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.CyberpunkFinancialPage) })),
  western: () => import('@/themes/packs/western/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.WesternFinancialPage) })),
  nordic: () => import('@/themes/packs/nordic/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.NordicFinancialPage) })),
  'dark-academia': () => import('@/themes/packs/dark-academia/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.DarkAcademiaFinancialPage) })),
  ocean: () => import('@/themes/packs/ocean/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.OceanFinancialPage) })),
  synthwave: () => import('@/themes/packs/synthwave/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.SynthwaveFinancialPage) })),
  kawaii: () => import('@/themes/packs/kawaii/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.KawaiiFinancialPage) })),
  noir: () => import('@/themes/packs/noir/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.NoirFinancialPage) })),
  space: () => import('@/themes/packs/space/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.SpaceFinancialPage) })),
  'sacred-serenity': () => import('@/themes/packs/sacred-serenity/FinancialPage').then(m => ({ default: createStableFinancialComponent(m.SacredSerenityFinancialPage) })),
};

export default function FinancialPage() {
  const { user } = useAuth();
  const { themeId } = useTheme();

  // Optimized selectors - each selector is independent to prevent unnecessary re-renders
  const transactions = useFinancialStore((state) => state.transactions);
  const categories = useFinancialStore((state) => state.categories);
  const getBalanceByPeriod = useFinancialStore((state) => state.getBalanceByPeriod);
  const deleteTransaction = useFinancialStore((state) => state.deleteTransaction);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodRange>(getDefaultPeriod());

  const { income: monthIncome, expense: monthExpense, balance, transactions: filteredTransactions } = useMemo(
    () => getBalanceByPeriod(selectedPeriod.startDate, selectedPeriod.endDate),
    [getBalanceByPeriod, selectedPeriod]
  );

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  }, []);

  // Calculate last 7 days data based on filtered period
  const last7Days = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayTransactions = filteredTransactions.filter(t => t.date.startsWith(dateStr));
      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        income,
        expense,
      });
    }
    return days;
  }, [filteredTransactions]);

  // Calculate category spending for filtered period
  const categorySpending = useMemo(() => {
    const spending = categories
      .filter(c => c.type === 'expense')
      .map(cat => {
        const spent = filteredTransactions
          .filter(t => t.type === 'expense' && t.categoryId === cat.id)
          .reduce((sum, t) => sum + t.amount, 0);

        const budget = cat.budget || 500;
        const percentage = budget > 0 ? (spent / budget) * 100 : 0;

        return {
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          spent,
          budget,
          percentage,
          color: cat.color,
        };
      })
      .filter(c => c.spent > 0)
      .sort((a, b) => b.spent - a.spent);

    return spending;
  }, [filteredTransactions, categories]);

  // Calculate pie chart data for category distribution
  const pieData = useMemo(() => {
    return categorySpending.map(cat => ({
      name: cat.name,
      value: cat.spent,
      color: cat.color,
    }));
  }, [categorySpending]);

  // Memoized props object - only recreates when dependencies change
  const pageProps: FinancialPageProps = useMemo(() => ({
    monthIncome,
    monthExpense,
    balance,
    formatCurrency,
    pieData,
    last7Days,
    categorySpending,
    recentTransactions: filteredTransactions.slice(0, 10),
    filteredTransactions,
    categories,
    isDialogOpen,
    setIsDialogOpen,
    deleteTransaction,
    selectedPeriod,
    setSelectedPeriod,
  }), [
    monthIncome,
    monthExpense,
    balance,
    formatCurrency,
    pieData,
    filteredTransactions,
    categories,
    last7Days,
    categorySpending,
    isDialogOpen,
    deleteTransaction,
    selectedPeriod,
  ]);

  const ThemedFinancial = themedFinancial[themeId];

  if (ThemedFinancial) {
    const LazyThemedFinancial = lazy(ThemedFinancial);
    return (
      <>
        <Suspense fallback={<PageSkeleton />}>
          <LazyThemedFinancial {...pageProps} />
        </Suspense>
        <CreateTransactionDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      </>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financial</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded bg-card">
          <p className="text-sm text-muted-foreground">Balance</p>
          <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded bg-card">
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-xl font-bold text-green-600">+{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 border rounded bg-card">
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-xl font-bold text-red-600">-{formatCurrency(monthExpense)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
