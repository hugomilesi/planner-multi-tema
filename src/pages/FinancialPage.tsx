import { lazy, Suspense, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useFinancialStore, Transaction } from '@/stores/financialStore';
import { useTheme } from '@/themes/ThemeContext';
import { FinancialPageProps } from '@/themes/packs/types';

const themedFinancial: Record<string, () => Promise<{ default: React.ComponentType<FinancialPageProps> }>> = {
  cyberpunk: () => import('@/themes/packs/cyberpunk/FinancialPage').then(m => ({ default: m.CyberpunkFinancialPage })),
  western: () => import('@/themes/packs/western/FinancialPage').then(m => ({ default: m.WesternFinancialPage })),
  nordic: () => import('@/themes/packs/nordic/FinancialPage').then(m => ({ default: m.NordicFinancialPage })),
  'dark-academia': () => import('@/themes/packs/dark-academia/FinancialPage').then(m => ({ default: m.DarkAcademiaFinancialPage })),
  ocean: () => import('@/themes/packs/ocean/FinancialPage').then(m => ({ default: m.OceanFinancialPage })),
  synthwave: () => import('@/themes/packs/synthwave/FinancialPage').then(m => ({ default: m.SynthwaveFinancialPage })),
  kawaii: () => import('@/themes/packs/kawaii/FinancialPage').then(m => ({ default: m.KawaiiFinancialPage })),
  noir: () => import('@/themes/packs/noir/FinancialPage').then(m => ({ default: m.NoirFinancialPage })),
  space: () => import('@/themes/packs/space/FinancialPage').then(m => ({ default: m.SpaceFinancialPage })),
  'sacred-serenity': () => import('@/themes/packs/sacred-serenity/FinancialPage').then(m => ({ default: m.SacredSerenityFinancialPage })),
};

export default function FinancialPage() {
  const { user } = useAuth();
  const { themeId } = useTheme();
  const transactions = useFinancialStore((state) => state.transactions);
  const categories = useFinancialStore((state) => state.categories);
  const getMonthlyBalance = useFinancialStore((state) => state.getMonthlyBalance);
  const deleteTransaction = useFinancialStore((state) => state.deleteTransaction);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [newTransaction, setNewTransaction] = useState({ amount: '', categoryId: '', date: '', note: '' });

  const now = new Date();
  const { income: monthIncome, expense: monthExpense, balance } = getMonthlyBalance(
    now.getFullYear(),
    now.getMonth()
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const handleAddTransaction = () => {
    setIsDialogOpen(false);
  };

  const pageProps: FinancialPageProps = {
    monthIncome,
    monthExpense,
    balance,
    formatCurrency,
    pieData: [],
    last7Days: [],
    categorySpending: [],
    recentTransactions: transactions.slice(0, 10),
    categories,
    isDialogOpen,
    setIsDialogOpen,
    transactionType,
    setTransactionType,
    newTransaction,
    setNewTransaction,
    handleAddTransaction,
    deleteTransaction,
  };

  const ThemedFinancial = themedFinancial[themeId];

  if (ThemedFinancial) {
    const LazyThemedFinancial = lazy(ThemedFinancial);
    return (
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <LazyThemedFinancial {...pageProps} />
      </Suspense>
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
