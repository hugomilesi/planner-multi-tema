import { lazy, Suspense, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFinancialStore, Transaction } from '@/stores/financialStore';
import { useTheme } from '@/themes/ThemeContext';
import { FinancialPageProps } from '@/themes/packs/types';
import { createStableFinancialComponent } from '@/utils/stableFinancialComponent';
import { CreateTransactionDialog } from '@/components/dialogs/CreateTransactionDialog';

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
  const getMonthlyBalance = useFinancialStore((state) => state.getMonthlyBalance);
  const deleteTransaction = useFinancialStore((state) => state.deleteTransaction);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const now = useMemo(() => new Date(), []);
  const { income: monthIncome, expense: monthExpense, balance } = useMemo(
    () => getMonthlyBalance(now.getFullYear(), now.getMonth()),
    [getMonthlyBalance, now]
  );

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  }, []);

  // Calculate last 7 days data
  const last7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayTransactions = transactions.filter(t => t.date === dateStr);
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
  }, [transactions, now]);

  // Calculate category spending
  const categorySpending = useMemo(() => {
    const spending = categories
      .filter(c => c.type === 'expense')
      .map(cat => {
        const spent = transactions
          .filter(t => t.type === 'expense' && t.categoryId === cat.id && t.date.startsWith(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`))
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
  }, [transactions, categories, now]);

  // Memoized props object - only recreates when dependencies change
  const pageProps: FinancialPageProps = useMemo(() => ({
    monthIncome,
    monthExpense,
    balance,
    formatCurrency,
    pieData: [],
    last7Days,
    categorySpending,
    recentTransactions: transactions.slice(0, 10),
    categories,
    isDialogOpen,
    setIsDialogOpen,
    deleteTransaction,
  }), [
    monthIncome,
    monthExpense,
    balance,
    formatCurrency,
    transactions,
    categories,
    last7Days,
    categorySpending,
    isDialogOpen,
    deleteTransaction,
  ]);

  const ThemedFinancial = themedFinancial[themeId];

  if (ThemedFinancial) {
    const LazyThemedFinancial = lazy(ThemedFinancial);
    return (
      <>
        <Suspense fallback={<div className="p-6">Loading...</div>}>
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
