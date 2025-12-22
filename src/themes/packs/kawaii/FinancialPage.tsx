'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Flower2, TrendingUp, Sun, ArrowDown, ArrowUp, ShoppingCart, Car } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function KawaiiFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const today = new Date();
  const topCategories = categorySpending.slice(0, 2);

  return (
    <div className="min-h-screen font-[family-name:var(--font-dm-sans)] text-stone-800"
      style={{ backgroundColor: '#fff5f9' }}>

      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ec4899]/20 rounded-full blur-[80px]" />
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#84cc16]/15 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fde047]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative min-h-screen flex flex-col pb-24 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full shadow-2xl overflow-hidden bg-[#fff5f9]/90 backdrop-blur-sm border-x border-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#fff5f9]/95 backdrop-blur-md transition-colors duration-200 border-b border-[#ec4899]/10">
          <div>
            <span className="text-xs font-bold text-[#84cc16] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Flower2 className="w-3 h-3" /> My Garden
            </span>
            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold leading-tight tracking-tight text-stone-900">
              Floral<span className="text-[#ec4899] italic">Finance</span>
            </h2>
          </div>
          <button className="relative group w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ec4899]/20 to-[#84cc16]/20 rounded-full scale-75 group-hover:scale-100 transition-transform duration-300" />
            <Flower2 className="w-6 h-6 text-stone-600 z-10 group-hover:text-[#ec4899] transition-colors" />
          </button>
        </div>

        {/* Period Filter */}
        <div className="px-6 py-4">
          <div className="flex gap-2 p-1.5 bg-white/50 rounded-full border border-stone-100 backdrop-blur-sm overflow-x-auto no-scrollbar shadow-inner">
            <button className="flex-shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-[#ec4899] to-pink-500 text-white text-xs font-semibold shadow-lg shadow-[#ec4899]/30 flex items-center gap-1.5 transition-all hover:scale-105">
              <Sun className="w-4 h-4" /> This Season
            </button>
            <button className="flex-shrink-0 px-4 py-2 rounded-full hover:bg-white/80 text-stone-600 text-xs font-medium transition-colors">
              {today.toLocaleDateString('en-US', { month: 'long' })}
            </button>
            <button className="flex-shrink-0 px-4 py-2 rounded-full hover:bg-white/80 text-stone-600 text-xs font-medium transition-colors">
              {today.getFullYear()}
            </button>
          </div>
        </div>

        {/* Balance Display */}
        <div className="flex flex-col items-center pt-4 pb-6 px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 border-2 border-dashed border-[#ec4899]/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-gradient-to-tr from-[#ec4899]/10 via-[#84cc16]/5 to-[#fde047]/10 rounded-full blur-xl -z-10" />
          <div className="relative z-10 text-center">
            <p className="text-[#65a30d] text-xs font-bold tracking-widest uppercase mb-1 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
              Total Nectar
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
            </p>
            <div className="relative inline-block">
              <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold tracking-tight text-stone-900">
                {formatCurrency(balance).split('.')[0]}<span className="text-xl text-[#ec4899]/60 align-top mt-1 inline-block font-medium">.{formatCurrency(balance).split('.')[1] || '00'}</span>
              </h1>
              <span className="absolute -right-5 -top-1 text-xl animate-bounce">🐝</span>
            </div>
          </div>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 px-6 mb-6">
          <div className="rounded-[1.5rem_0.2rem_1.5rem_0.2rem] bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] p-4 border border-green-200 shadow-[0_8px_20px_-5px_rgba(132,204,22,0.25)] relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-green-200/50 rounded-full blur-xl" />
            <div className="absolute right-1 top-1 text-green-300 transform rotate-45 group-hover:rotate-90 transition-transform duration-700">
              <Flower2 className="w-12 h-12" />
            </div>
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-green-600 shadow-sm shrink-0">
                    <ArrowDown className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Income</span>
                </div>
                <p className="text-lg font-[family-name:var(--font-playfair)] font-bold text-green-900 truncate">+{formatCurrency(monthIncome)}</p>
              </div>
              <div className="mt-1 text-[9px] font-semibold text-green-600/80 uppercase tracking-widest">Harvested</div>
            </div>
          </div>
          <div className="rounded-[0.2rem_1.5rem_0.2rem_1.5rem] bg-gradient-to-bl from-[#fff1f2] to-[#ffe4e6] p-4 border border-rose-200 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)] relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -left-4 -bottom-4 w-16 h-16 bg-rose-200/50 rounded-full blur-xl" />
            <div className="absolute left-1 top-1 text-rose-300 transform -rotate-12 group-hover:-rotate-45 transition-transform duration-700">
              <Flower2 className="w-12 h-12" />
            </div>
            <div className="flex flex-col h-full justify-between relative z-10 items-end text-right">
              <div className="w-full flex flex-col items-end">
                <div className="flex items-center gap-1 mb-1 justify-end">
                  <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider">Expenses</span>
                  <div className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                    <ArrowUp className="w-2.5 h-2.5" />
                  </div>
                </div>
                <p className="text-lg font-[family-name:var(--font-playfair)] font-bold text-rose-900 truncate">-{formatCurrency(monthExpense)}</p>
              </div>
              <div className="mt-1 text-[9px] font-semibold text-rose-600/80 uppercase tracking-widest">Pruned</div>
            </div>
          </div>
        </div>

        {/* Growth Garden Chart */}
        <div className="px-6 mb-8">
          <div className="bg-white rounded-[2.5rem] p-6 border border-stone-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ec4899] via-[#84cc16] to-[#fde047] opacity-50" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-stone-900 flex items-center gap-2">
                  <Flower2 className="w-6 h-6 text-[#ec4899]" /> Growth Garden
                </h3>
                <p className="text-xs text-stone-500 mt-1 ml-1">
                  {today.toLocaleDateString('en-US', { month: 'short' })} 1 - 31
                </p>
              </div>
              <div className="flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 text-green-700">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold">+12%</span>
              </div>
            </div>
            <div className="flex items-end justify-between h-44 px-2 gap-4">
              {last7Days.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                  <div className="text-5xl mb-3">🌱</div>
                  <p className="text-sm font-bold text-stone-600">No activity yet!</p>
                  <p className="text-xs text-stone-500 mt-1">Plant some seeds by adding transactions</p>
                </div>
              ) : (
                last7Days.map((dayData, i) => {
                  const maxAmount = Math.max(...last7Days.map(d => Math.max(d.income, d.expense)));
                  const totalAmount = dayData.income + dayData.expense;
                  const heightPercent = maxAmount > 0 ? (totalAmount / maxAmount) * 100 : 0;
                  const isHighlighted = i === last7Days.length - 1;
                  return (
                    <div key={dayData.day} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer relative">
                      <div className="w-full flex flex-col items-center justify-end h-36 relative group-hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-1.5 bg-[#84cc16]/30 h-full rounded-full absolute bottom-0" />
                        <div className="relative w-full flex justify-center z-10" style={{ height: `${heightPercent}%` }}>
                          {isHighlighted && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12">
                              <Flower2 className="w-12 h-12 text-[#ec4899] animate-spin" style={{ animationDuration: '8s' }} />
                            </div>
                          )}
                          <div className={cn(
                            'h-full rounded-t-full rounded-b-lg border-2 border-white shadow-sm relative overflow-hidden',
                            isHighlighted ? 'w-10 bg-gradient-to-t from-[#ec4899] to-pink-400 shadow-lg shadow-[#ec4899]/30' : 'w-8 bg-gradient-to-t from-[#ec4899]/30 to-[#ec4899]/60'
                          )}>
                            {isHighlighted && <div className="absolute inset-0 bg-white/10" />}
                          </div>
                        </div>
                      </div>
                      <span className={cn('text-[10px] font-bold uppercase tracking-wider', isHighlighted ? 'text-[#ec4899]' : 'text-stone-400')}>
                        {dayData.day}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Garden Pots (Budgets) */}
        <div className="px-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-stone-900">Garden Pots</h3>
            <button className="text-[#ec4899] text-sm font-medium hover:text-[#ec4899]/80 flex items-center gap-1">
              Prune ✂️
            </button>
          </div>
          <div className="space-y-4">
            {topCategories.map((cat, i) => {
              const colors = [
                { bg: 'bg-orange-50', border: 'border-orange-200', accent: 'bg-orange-400', text: 'text-orange-500', gradient: 'from-orange-300 to-orange-500' },
                { bg: 'bg-purple-50', border: 'border-purple-200', accent: 'bg-purple-400', text: 'text-purple-500', gradient: 'from-purple-300 to-purple-500' },
              ];
              const color = colors[i % colors.length];
              const icons = [ShoppingCart, Car];
              const Icon = icons[i % icons.length];
              const percentage = cat.percentage || 0;
              return (
                <div key={cat.name} className="bg-white p-1 rounded-[1.5rem] border border-stone-100 shadow-sm relative group overflow-hidden">
                  <div className={cn('absolute right-0 top-0 bottom-0 w-2', color.accent)} />
                  <div className="p-4 pr-6 flex items-center gap-4 relative z-10 bg-white rounded-[1.3rem] transition-transform group-hover:-translate-x-1">
                    <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden', color.bg)}>
                      <Icon className={cn('w-6 h-6 relative z-10', color.text)} />
                      <div className={cn('absolute -bottom-2 -right-2 w-8 h-8 rounded-full blur-md', color.bg)} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-bold text-stone-900">{cat.name}</p>
                        <p className="text-xs font-medium text-stone-500">
                          <span className="text-stone-900 font-bold">${cat.spent}</span> / ${cat.budget || 500}
                        </p>
                      </div>
                      <div className="relative w-full h-3 bg-stone-100 rounded-full overflow-hidden">
                        <div className={cn('absolute top-0 left-0 h-full bg-gradient-to-r rounded-full flex items-center justify-end pr-1', color.gradient)}
                          style={{ width: `${percentage}%` }}>
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Petals (Transactions) */}
        <div className="px-6 flex-1 pb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-stone-900">Recent Petals</h3>
            <button className="text-[#ec4899] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="relative pl-4">
            <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-stone-200" />
            <div className="space-y-6">
              {recentTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">🌸</div>
                  <p className="text-stone-500 text-sm">No transactions yet!</p>
                </div>
              ) : (
                recentTransactions.slice(0, 3).map((t) => {
                  const cat = categories.find(c => c.id === t.categoryId);
                  const isIncome = t.type === 'income';
                  return (
                    <div key={t.id} className="flex items-center justify-between relative group cursor-pointer pl-6">
                      <div className="absolute left-[1.6rem] top-1/2 -translate-y-1/2 w-4 h-0.5 bg-stone-200" />
                      <div className={cn('absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full', isIncome ? 'bg-green-300' : 'bg-stone-300')} />
                      <div className="flex items-center gap-4 flex-1">
                        <div className={cn(
                          'relative z-10 w-14 h-14 rounded-full bg-white border border-stone-100 group-hover:border-[#ec4899]/50 transition-colors flex items-center justify-center shadow-sm overflow-hidden',
                          isIncome ? 'text-green-600' : 'text-stone-600'
                        )}>
                          <div className={cn('absolute inset-0 opacity-50', isIncome ? 'bg-green-50' : 'bg-stone-50')} />
                          <span className="text-xl relative z-10">{cat?.icon || '💰'}</span>
                        </div>
                        <div className="flex flex-col">
                          <p className={cn('text-sm font-bold text-stone-900 transition-colors', isIncome ? 'group-hover:text-green-600' : 'group-hover:text-[#ec4899]')}>
                            {cat?.name || 'Unknown'}
                          </p>
                          <p className="text-xs text-stone-500">
                            {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className={cn('absolute inset-0 rounded-full transform rotate-3 scale-110', isIncome ? 'bg-green-100' : 'bg-rose-100')} />
                          <p className={cn('relative text-sm font-bold px-3 py-1', isIncome ? 'text-green-700' : 'text-rose-600')}>
                            {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                          </p>
                        </div>
                        <button onClick={() => deleteTransaction(t.id)}
                          className="p-1 text-stone-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all">
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

        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-24 right-6 w-16 h-16 group z-40">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899] to-rose-600 rounded-full shadow-lg shadow-[#ec4899]/40 group-hover:scale-110 transition-transform duration-300 animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full bg-gradient-to-br from-[#ec4899] to-rose-500 rounded-full flex items-center justify-center text-white border-2 border-white/30 shadow-inner">
                <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
              </div>
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#fff5f9] border border-stone-200 text-stone-800 max-w-[90vw] rounded-3xl shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-[#ec4899] flex items-center gap-2 text-lg font-[family-name:var(--font-playfair)]">
                <Flower2 className="w-5 h-5" /> New Transaction
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                <TabsList className="w-full grid grid-cols-2 bg-stone-100 rounded-xl">
                  <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-rose-500 data-[state=active]:text-white">🌹 Expense</TabsTrigger>
                  <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white">🌿 Income</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-2">
                <Label className="text-stone-600 text-sm">Amount</Label>
                <Input type="number" placeholder="0.00" value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="bg-white border-stone-200 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-600 text-sm">Category</Label>
                <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                  <SelectTrigger className="bg-white border-stone-200 rounded-xl"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent className="bg-white border-stone-200 rounded-xl">
                    {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-stone-600 text-sm">Date</Label>
                  <Input type="date" value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="bg-white border-stone-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-stone-600 text-sm">Note</Label>
                  <Input placeholder="Optional" value={newTransaction.note}
                    onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                    className="bg-white border-stone-200 rounded-xl" />
                </div>
              </div>
              <button onClick={handleAddTransaction}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ec4899] to-rose-500 text-white font-medium shadow-md font-[family-name:var(--font-playfair)]">
                Plant Transaction 🌱
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
