'use client';

import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { useFinancialStore } from '@/stores/financialStore';
import { cn } from '@/lib/utils';
import { ThemedCard } from '@/components/shared/ThemedCard';
import { ThemedBarChart } from '@/components/shared/ThemedBarChart';
import { ThemedPieChart } from '@/components/shared/ThemedPieChart';
import { ThemedProgress } from '@/components/shared/ThemedProgress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PageTransition } from '@/components/layout/PageTransition';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const themeChartColors: Record<string, { income: string; expense: string; pie: string[]; axis: string; tooltip: { bg: string; border: string } }> = {
  cyberpunk: {
    income: '#00ffff',
    expense: '#ff00ff',
    pie: ['#ff00ff', '#00ffff', '#ff6ec7', '#7b68ee', '#00ff88'],
    axis: '#888',
    tooltip: { bg: '#0a0a12', border: '#ff00ff44' },
  },
  noir: {
    income: '#a0a0a0',
    expense: '#606060',
    pie: ['#808080', '#a0a0a0', '#606060', '#c0c0c0', '#404040'],
    axis: '#666',
    tooltip: { bg: '#0a0a0a', border: '#333' },
  },
  space: {
    income: '#a78bfa',
    expense: '#f472b6',
    pie: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#f472b6', '#60a5fa'],
    axis: '#888',
    tooltip: { bg: '#0f0d1a', border: '#8b5cf644' },
  },
  kawaii: {
    income: '#34d399',
    expense: '#f472b6',
    pie: ['#f472b6', '#a78bfa', '#60a5fa', '#fbbf24', '#34d399'],
    axis: '#999',
    tooltip: { bg: '#fff', border: '#f9a8d4' },
  },
  ocean: {
    income: '#22d3ee',
    expense: '#0891b2',
    pie: ['#06b6d4', '#22d3ee', '#67e8f9', '#0e7490', '#14b8a6'],
    axis: '#7dd3fc',
    tooltip: { bg: '#0c4a6e', border: '#22d3ee44' },
  },
  synthwave: {
    income: '#ffcc00',
    expense: '#ff6ec7',
    pie: ['#ff6ec7', '#ffcc00', '#ff6b35', '#a855f7', '#00ffff'],
    axis: '#ff6ec7',
    tooltip: { bg: '#1a0533', border: '#ff6ec744' },
  },
  western: {
    income: '#fbbf24',
    expense: '#dc2626',
    pie: ['#d97706', '#fbbf24', '#92400e', '#b45309', '#78350f'],
    axis: '#a16207',
    tooltip: { bg: '#451a03', border: '#d9770644' },
  },
  'dark-academia': {
    income: '#d4a574',
    expense: '#8b5a2b',
    pie: ['#a0522d', '#d4a574', '#8b7355', '#6b4423', '#c9a86c'],
    axis: '#8b7355',
    tooltip: { bg: '#1f1a14', border: '#8b735544' },
  },
  nordic: {
    income: '#22c55e',
    expense: '#ef4444',
    pie: ['#64748b', '#94a3b8', '#475569', '#6b8e6b', '#3b82f6'],
    axis: '#94a3b8',
    tooltip: { bg: '#fff', border: '#e2e8f0' },
  },
};

export default function FinancialPage() {
  const { themeId } = useTheme();
  const chartColors = themeChartColors[themeId] || themeChartColors.nordic;
  const visuals = getThemeVisuals(themeId);
  const { transactions, categories, currency, addTransaction, deleteTransaction } = useFinancialStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');

  const toLocalDateId = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const parseLocalDateId = (dateId: string) => {
    const [y, m, d] = dateId.split('-').map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1);
  };
  
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    categoryId: '',
    date: toLocalDateId(new Date()),
    note: '',
  });

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthTransactions = transactions.filter((t) => {
    const date = parseLocalDateId(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthIncome = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const monthExpense = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const handleAddTransaction = () => {
    const amount = parseFloat(newTransaction.amount);
    if (isNaN(amount) || amount <= 0 || !newTransaction.categoryId) return;

    addTransaction({
      type: transactionType,
      amount,
      categoryId: newTransaction.categoryId,
      date: newTransaction.date,
      note: newTransaction.note,
    });

    setNewTransaction({
      amount: '',
      categoryId: '',
      date: toLocalDateId(new Date()),
      note: '',
    });
    setIsDialogOpen(false);
  };

  const expenseCategories = categories.filter((c) => c.type === 'expense');
  const incomeCategories = categories.filter((c) => c.type === 'income');

  const categorySpending = expenseCategories.map((cat) => {
    const spent = monthTransactions
      .filter((t) => t.categoryId === cat.id && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      ...cat,
      spent,
      percentage: cat.budget ? (spent / cat.budget) * 100 : 0,
    };
  }).filter((c) => c.spent > 0);

  const pieData = categorySpending.map((cat) => ({
    name: cat.name,
    value: cat.spent,
    color: cat.color,
  }));

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = toLocalDateId(date);
    const dayTransactions = transactions.filter((t) => t.date === dateStr);
    return {
      day: date.toLocaleDateString('pt-BR', { weekday: 'short' }),
      income: dayTransactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      expense: dayTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    };
  });

  const recentTransactions = [...transactions]
    .sort((a, b) => parseLocalDateId(b.date).getTime() - parseLocalDateId(a.date).getTime())
    .slice(0, 10);

  return (
    <PageTransition>
      <div className={cn('px-4 pt-6 pb-4 space-y-6', visuals.fonts.body)}>
        <header className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-2xl font-bold', visuals.fonts.heading)}>{visuals.labels.financial}</h1>
            <p className={cn('text-sm opacity-70', visuals.card.titleClassName)}>
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="rounded-full h-12 w-12">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] rounded-2xl">
              <DialogHeader>
                <DialogTitle>New Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="expense" className="gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Expense
                    </TabsTrigger>
                    <TabsTrigger value="income" className="gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Income
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newTransaction.categoryId}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, categoryId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <span className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span>{cat.name}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="note">Note</Label>
                    <Input
                      id="note"
                      placeholder="Optional"
                      value={newTransaction.note}
                      onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddTransaction} className="w-full">
                  Add Transaction
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-3">
          <ThemedCard delay={0}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-muted-foreground">Income</span>
            </div>
            <p className="text-lg font-semibold text-green-500">
              {formatCurrency(monthIncome)}
            </p>
          </ThemedCard>

          <ThemedCard delay={1}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-xs text-muted-foreground">Expenses</span>
            </div>
            <p className="text-lg font-semibold text-red-500">
              {formatCurrency(monthExpense)}
            </p>
          </ThemedCard>
        </div>

        {pieData.length > 0 && (
          <ThemedCard title={visuals.labels.financial + ' by Category'} delay={2}>
            <ThemedPieChart 
              data={pieData}
              size={180}
              showLegend={true}
              formatValue={(v) => formatCurrency(v)}
            />
          </ThemedCard>
        )}

        <ThemedCard title="Last 7 Days" delay={3}>
          <ThemedBarChart 
            data={last7Days.map(d => ({
              label: d.day,
              value: d.income,
              secondaryValue: d.expense,
            }))}
            showLabels={true}
            formatValue={(v) => formatCurrency(v)}
          />
          <div className="flex justify-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-green-500 rounded-sm" />
              <span>{visuals.labels.income}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-red-500 rounded-sm" />
              <span>{visuals.labels.expense}</span>
            </div>
          </div>
        </ThemedCard>

        {categorySpending.length > 0 && (
          <ThemedCard title="Budget Progress" delay={4}>
            <div className="space-y-4">
              {categorySpending.filter(c => c.budget).map((cat) => (
                <div key={cat.id}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{cat.icon}</span>
                    <span className="text-sm font-medium flex-1">{cat.name}</span>
                    <span className="text-xs opacity-70">
                      {formatCurrency(cat.spent)} / {formatCurrency(cat.budget!)}
                    </span>
                  </div>
                  <ThemedProgress 
                    value={cat.spent}
                    max={cat.budget!}
                    showPercentage={false}
                  />
                </div>
              ))}
            </div>
          </ThemedCard>
        )}

        <ThemedCard title="Recent Transactions" delay={5}>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {recentTransactions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No transactions yet
                </p>
              ) : (
                recentTransactions.map((transaction) => {
                  const category = categories.find((c) => c.id === transaction.categoryId);
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category?.icon || '💰'}</span>
                        <div>
                          <p className="font-medium text-sm">{category?.name || 'Unknown'}</p>
                          <p className="text-xs text-muted-foreground">
                            {parseLocalDateId(transaction.date).toLocaleDateString('pt-BR')}
                            {transaction.note && ` • ${transaction.note}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => deleteTransaction(transaction.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </ThemedCard>
      </div>
    </PageTransition>
  );
}
