'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Wallet, MoreHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SpaceFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const today = new Date();

  return (
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#2C2420] font-sans text-stone-800 dark:text-stone-100 antialiased pb-24">
      <div className="relative z-10 px-4 pt-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-stone-500 dark:text-stone-400 text-xs font-medium italic font-serif">
              {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <h1 className="text-[28px] font-serif font-bold tracking-tight text-[#8C6A5D] dark:text-[#EAD8C8]">Financial Overview</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-[#8C6A5D] text-white flex items-center justify-center shadow-lg shadow-[#8C6A5D]/30">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 text-stone-900 dark:text-white max-w-[90vw] rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-serif font-bold">New Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-[#FAF7F2] dark:bg-[#2C2420] rounded-xl">
                    <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-[#8C6A5D] data-[state=active]:text-white">Expense</TabsTrigger>
                    <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-[#A3C4BC] data-[state=active]:text-white">Income</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2">
                  <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Amount</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Category</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-[#3D3430] border-stone-200 dark:border-stone-600 rounded-xl">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Date</Label>
                    <Input type="date" value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Note</Label>
                    <Input placeholder="Optional" value={newTransaction.note}
                      onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                      className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl" />
                  </div>
                </div>
                <button onClick={handleAddTransaction}
                  className="w-full py-3 rounded-xl bg-[#8C6A5D] text-white font-serif font-semibold hover:opacity-90">
                  Add Transaction
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* Balance Card */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#8C6A5D] to-[#D4A373] text-white shadow-lg shadow-[#8C6A5D]/20">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-white/80 text-xs font-medium mb-1">Total Balance</p>
              <p className="text-2xl font-serif font-bold truncate">{formatCurrency(balance)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-3">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 shadow-sm min-w-0">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Income</p>
            <p className="text-lg font-serif font-medium text-[#A3C4BC] truncate">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 shadow-sm min-w-0">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-1">Expenses</p>
            <p className="text-lg font-serif font-medium text-stone-800 dark:text-white truncate">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-bold">Weekly Overview</h3>
            <button className="text-[#8C6A5D] hover:text-[#D4A373] transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-32 flex items-end gap-1.5">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              const isToday = i === last7Days.length - 2;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center h-24">
                    <div className={cn(
                      'w-full rounded-t-sm transition-all',
                      isToday ? 'bg-[#8C6A5D] shadow-[0_0_15px_-3px_rgba(140,106,93,0.6)]' : 'bg-stone-100 dark:bg-stone-700'
                    )} style={{ height: `${Math.max(5, ((day.income + day.expense) / max) * 100)}%` }} />
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-2xl bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-stone-100 dark:border-stone-700 flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold">Recent Transactions</h3>
            <span className="text-xs text-stone-500">{recentTransactions.length} items</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-2">🙏</div>
                <p className="text-stone-500 text-sm font-serif italic">No transactions yet</p>
              </div>
            ) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id} className="flex items-center justify-between p-4 border-b border-stone-100 dark:border-stone-700 last:border-b-0 group hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-lg',
                        isIncome ? 'bg-[#A3C4BC]/20' : 'bg-stone-100 dark:bg-stone-800'
                      )}>
                        {cat?.icon || '💰'}
                      </div>
                      <div>
                        <p className="text-sm font-serif font-medium">{cat?.name || 'Unknown'}</p>
                        <p className="text-xs text-stone-500">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-serif font-bold', isIncome ? 'text-[#A3C4BC]' : 'text-stone-800 dark:text-white')}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)}
                        className="p-1 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
