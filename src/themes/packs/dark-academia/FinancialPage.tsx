'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Bell, TrendingUp, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DarkAcademiaFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const today = new Date();

  const months = ['This Month', 'October', 'September', 'August'];

  return (
    <div className="min-h-screen bg-[#141414] font-sans text-white antialiased pb-24">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#141414] to-[#0A0A0A] -z-10" />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24">
        {/* Header */}
        <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-10 bg-[#141414]/80 backdrop-blur-md border-b border-transparent transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-12 h-12 rounded-full ring-2 ring-[#C5A065]/30 group-hover:ring-[#C5A065]/60 transition-all shadow-md bg-gradient-to-br from-[#C5A065] to-[#A6854F] flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">A</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#141414]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-0.5">
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
              <h2 className="text-2xl font-serif font-semibold text-stone-100 leading-none">Financial Overview</h2>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-full w-11 h-11 bg-[#1E1E1E] border border-[#333333] text-stone-200 hover:text-[#C5A065] transition-colors shadow-sm">
            <Bell className="w-5 h-5" />
          </button>
        </header>

        {/* Month Tabs */}
        <div className="flex items-center gap-4 px-6 mt-4 pb-4 overflow-x-auto no-scrollbar w-full flex-nowrap border-b border-[#333333]">
          {months.map((month, i) => (
            <button key={month} className={cn(
              'flex-shrink-0 relative pb-2 font-medium text-sm transition-colors whitespace-nowrap',
              i === 0 ? 'text-[#C5A065]' : 'text-stone-500 hover:text-stone-300'
            )}>
              {month}
              {i === 0 && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A065] rounded-full" />}
            </button>
          ))}
        </div>

        {/* Balance Section */}
        <div className="flex flex-col items-center pt-6 pb-6 px-6">
          <p className="text-stone-400 text-xs font-semibold tracking-[0.2em] uppercase mb-3">Total Balance</p>
          <h1 className="text-4xl font-serif font-medium tracking-tight text-stone-100 mb-2">
            {formatCurrency(balance).split('.')[0]}<span className="text-2xl text-stone-600">.{formatCurrency(balance).split('.')[1] || '00'}</span>
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/20">
            <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs font-semibold text-green-400">+2.4% vs last month</span>
          </div>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 px-6 mb-6">
          <div className="bg-[#1E1E1E] p-4 rounded-xl border border-[#333333] shadow-sm relative overflow-hidden flex flex-col justify-between h-24 group hover:border-[#C5A065]/30 transition-colors">
            <div className="flex justify-between items-start">
              <ArrowDownLeft className="w-4 h-4 text-stone-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Income</span>
            </div>
            <p className="text-xl font-serif font-medium text-stone-100 group-hover:text-green-400 transition-colors truncate">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="bg-[#1E1E1E] p-4 rounded-xl border border-[#333333] shadow-sm relative overflow-hidden flex flex-col justify-between h-24 group hover:border-[#C5A065]/30 transition-colors">
            <div className="flex justify-between items-start">
              <ArrowUpRight className="w-4 h-4 text-stone-400" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">Expense</span>
            </div>
            <p className="text-xl font-serif font-medium text-stone-100 group-hover:text-red-400 transition-colors truncate">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        {/* Analytics Chart */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-serif font-medium text-white">Weekly Overview</h3>
            <button className="text-[#C5A059] text-xs font-semibold tracking-wide uppercase hover:opacity-80">View Report</button>
          </div>
          <div className="bg-[#18181B] rounded-xl p-5 border border-slate-800 shadow-none">
            <div className="flex items-end justify-between h-32 gap-3">
              {['W1', 'W2', 'W3', 'W4', 'W5'].map((week, i) => {
                const heights = [40, 65, 85, 30, 50];
                const isActive = i === 2;
                return (
                  <div key={week} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                    <div className="w-full relative h-24 flex items-end justify-center">
                      <div className={cn(
                        'w-2 rounded-full transition-all duration-500 ease-out',
                        isActive ? 'bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'bg-slate-700 group-hover:bg-[#C5A059]/40'
                      )} style={{ height: `${heights[i]}%` }} />
                    </div>
                    <span className={cn('text-[9px] font-medium uppercase tracking-wide', isActive ? 'font-bold text-[#C5A059]' : 'text-slate-500')}>{week}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Latest Activity */}
        <div className="px-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-serif font-medium text-white">Recent Transactions</h3>
            <button className="text-[#C5A059] text-xs font-semibold tracking-wide uppercase hover:opacity-80">See All</button>
          </div>
          <div className="bg-[#18181B] rounded-xl border border-slate-800 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-800/50">
              {recentTransactions.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <p className="text-slate-500 text-sm">No transactions yet</p>
                </div>
              ) : (
                recentTransactions.slice(0, 4).map((t) => {
                  const cat = categories.find(c => c.id === t.categoryId);
                  const isIncome = t.type === 'income';
                  return (
                    <div key={t.id} className="flex items-center justify-between p-3 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-[#C5A059] transition-colors text-base shrink-0">
                          {cat?.icon || '💰'}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="text-sm font-medium text-white truncate">{cat?.name || 'Unknown'}</p>
                          <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-0.5">
                            {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <p className={cn('text-sm font-serif font-medium shrink-0 ml-2', isIncome ? 'text-green-400' : 'text-white')}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-8 right-6 w-14 h-14 bg-[#C5A059] hover:bg-[#B08D45] text-white rounded-full shadow-lg shadow-[#C5A059]/30 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 z-30 group">
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#18181B] border border-slate-800 text-white max-w-[90vw] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-serif font-semibold">New Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                <TabsList className="w-full grid grid-cols-2 bg-slate-800 rounded-xl">
                  <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-slate-900 data-[state=active]:text-white">Expense</TabsTrigger>
                  <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-green-600 data-[state=active]:text-white">Income</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm font-medium">Amount</Label>
                <Input type="number" placeholder="0.00" value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="bg-slate-900 border-slate-700 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-sm font-medium">Category</Label>
                <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                  <SelectTrigger className="bg-slate-900 border-slate-700 rounded-xl">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#18181B] border-slate-700 rounded-xl">
                    {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm font-medium">Date</Label>
                  <Input type="date" value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="bg-slate-900 border-slate-700 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm font-medium">Note</Label>
                  <Input placeholder="Optional" value={newTransaction.note}
                    onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                    className="bg-slate-900 border-slate-700 rounded-xl" />
                </div>
              </div>
              <button onClick={handleAddTransaction}
                className="w-full py-3 rounded-xl bg-[#C5A059] hover:bg-[#B08D45] text-white font-medium transition-colors">
                Add Transaction
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
