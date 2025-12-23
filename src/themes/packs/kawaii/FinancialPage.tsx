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
    <div className="min-h-screen font-[family-name:var(--font-dm-sans)] text-stone-800 bg-[#FFF0F5] relative overflow-hidden">

      {/* Textured Background Layer */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")' }}
      />

      {/* Organic Background Blobs - Correct Floral Colors */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#ec4899]/20 rounded-full blur-[80px]" />
        <div className="absolute top-20 -left-20 w-80 h-80 bg-[#84cc16]/15 rounded-full blur-[60px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#fde047]/15 rounded-full blur-[100px]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[15%] text-6xl opacity-20 animate-bounce" style={{ animationDuration: '6s' }}>🌸</div>
        <div className="absolute top-[60%] left-[10%] text-5xl opacity-15 animate-bounce" style={{ animationDuration: '8s', animationDelay: '1s' }}>🌿</div>
        <div className="absolute bottom-[20%] right-[25%] text-4xl opacity-20 animate-bounce" style={{ animationDuration: '7s', animationDelay: '2s' }}>🦋</div>
        <div className="absolute top-[30%] right-[5%] text-3xl opacity-10 animate-bounce" style={{ animationDuration: '9s', animationDelay: '0.5s' }}>✨</div>
      </div>

      <div className="relative min-h-screen flex flex-col pb-24 max-w-md mx-auto w-full shadow-2xl overflow-hidden bg-[#fff5f9]/90 backdrop-blur-sm border-x border-stone-100">

        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2 sticky top-0 z-30 bg-[#fff5f9]/95 backdrop-blur-md transition-colors duration-200 border-b border-[#ec4899]/10">
          <div>
            <span className="text-xs font-bold text-[#84cc16] uppercase tracking-wider mb-1 flex items-center gap-1">
              <Flower2 className="w-3 h-3" />
              My Garden
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
        <div className="flex flex-col items-center pt-6 pb-8 px-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-[#ec4899]/20 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-gradient-to-tr from-[#ec4899]/10 via-[#84cc16]/5 to-[#fde047]/10 rounded-full blur-xl -z-10" />
          <div className="relative z-10 text-center">
            <p className="text-[#65a30d] text-sm font-bold tracking-widest uppercase mb-1 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
              Total Balance
              <span className="w-1.5 h-1.5 rounded-full bg-[#84cc16]" />
            </p>
            <div className="relative inline-block">
              <h1 className="text-5xl font-[family-name:var(--font-playfair)] font-bold tracking-tight text-stone-900">
                {formatCurrency(balance).split('.')[0]}<span className="text-2xl text-[#ec4899]/60 align-top mt-1 inline-block font-medium">.{formatCurrency(balance).split('.')[1] || '00'}</span>
              </h1>
              <span className="absolute -right-6 -top-2 text-2xl animate-bounce">🐝</span>
            </div>
          </div>
        </div>

        {/* Income & Expense Cards - Shape Leaf Style */}
        <div className="grid grid-cols-2 gap-4 px-6 mb-8">
          {/* Income Card */}
          <div className="rounded-[2rem_0.2rem_2rem_0.2rem] bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7] p-5 border border-green-200 shadow-[0_8px_20px_-5px_rgba(132,204,22,0.25)] relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-green-200/50 rounded-full blur-xl" />
            <div className="absolute right-2 top-2 text-green-300 transform rotate-45 group-hover:rotate-90 transition-transform duration-700">
              <Flower2 className="w-12 h-12" />
            </div>
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-green-600 shadow-sm shrink-0">
                    <ArrowDown className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Income</span>
                </div>
                <p className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-green-900 truncate">+{formatCurrency(monthIncome)}</p>
              </div>
              <div className="mt-2 text-[10px] font-semibold text-green-600/80 uppercase tracking-widest">Harvested</div>
            </div>
          </div>

          {/* Expense Card */}
          <div className="rounded-[0.2rem_2rem_0.2rem_2rem] bg-gradient-to-bl from-[#fff1f2] to-[#ffe4e6] p-5 border border-rose-200 shadow-[0_10px_40px_-10px_rgba(236,72,153,0.2)] relative overflow-hidden group transition-all duration-300 hover:-translate-y-1">
            <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-rose-200/50 rounded-full blur-xl" />
            <div className="absolute left-2 top-2 text-rose-300 transform -rotate-12 group-hover:-rotate-45 transition-transform duration-700">
              <Flower2 className="w-12 h-12" />
            </div>
            <div className="flex flex-col h-full justify-between relative z-10 items-end text-right">
              <div className="w-full flex flex-col items-end">
                <div className="flex items-center gap-1.5 mb-2 justify-end">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">Expenses</span>
                  <div className="w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-rose-500 shadow-sm shrink-0">
                    <ArrowUp className="w-3 h-3" />
                  </div>
                </div>
                <p className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-rose-900 truncate">-{formatCurrency(monthExpense)}</p>
              </div>
              <div className="mt-2 text-[10px] font-semibold text-rose-600/80 uppercase tracking-widest">Pruned</div>
            </div>
          </div>
        </div>

        {/* Growth Garden Chart */}
        <div className="bg-white rounded-[40px] p-8 border-[3px] border-[#C7CEEA] shadow-sm mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#6B5B95]">
              Weekly Growth
            </h3>
            <div className="flex items-center gap-1 bg-[#E2F0CB] px-3 py-1.5 rounded-full text-[#6B5B95] font-bold text-xs">
              <TrendingUp className="w-3 h-3" />
              <span>+12%</span>
            </div>
          </div>

          <div className="flex items-end justify-between h-48 gap-4 px-2">
            {last7Days.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <span className="text-4xl mb-2">🌱</span>
                <p className="text-sm font-bold text-[#6B5B95] opacity-60">Plant some seeds!</p>
              </div>
            ) : (
              last7Days.map((dayData, i) => {
                const maxAmount = Math.max(...last7Days.map(d => Math.max(d.income, d.expense)));
                const totalAmount = dayData.income + dayData.expense;
                const heightPercent = maxAmount > 0 ? (totalAmount / maxAmount) * 100 : 0;
                const isHighlighted = i === last7Days.length - 1;

                return (
                  <div key={dayData.day} className="flex flex-col items-center gap-3 flex-1 group cursor-pointer">
                    <div className="w-full flex flex-col items-center justify-end h-full relative">
                      <div
                        className={cn(
                          "w-full rounded-2xl transition-all duration-500 relative overflow-hidden",
                          isHighlighted ? "bg-[#FFB7B2]" : "bg-[#C7CEEA]/50 group-hover:bg-[#C7CEEA]"
                        )}
                        style={{ height: `${Math.max(heightPercent, 10)}%` }}
                      >
                        {isHighlighted && (
                          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10"></div>
                        )}
                      </div>
                    </div>
                    <span className={cn(
                      "text-xs font-bold uppercase tracking-wider",
                      isHighlighted ? "text-[#FF6F61]" : "text-[#6B5B95]/40"
                    )}>
                      {dayData.day}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#6B5B95]">Recent Activity</h3>
            <button className="text-[#FF6F61] text-sm font-bold hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-10 bg-white/50 rounded-[30px] border-2 border-dashed border-[#FFB7B2]">
                <p className="text-[#6B5B95] font-medium">No transactions yet 🌸</p>
              </div>
            ) : (
              recentTransactions.slice(0, 5).map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id} className="group flex items-center justify-between bg-white/80 p-4 rounded-[24px] border border-white hover:border-[#FFB7B2] hover:bg-white transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm",
                        isIncome ? "bg-[#E2F0CB]" : "bg-[#FFDAC1]"
                      )}>
                        {cat?.icon || '💰'}
                      </div>
                      <div>
                        <p className="font-bold text-[#6B5B95] text-lg">{cat?.name || 'Unknown'}</p>
                        <p className="text-xs text-[#6B5B95]/60 font-medium uppercase tracking-wide">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "font-bold text-lg font-[family-name:var(--font-playfair)]",
                        isIncome ? "text-[#77DD77]" : "text-[#FF6961]"
                      )}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteTransaction(t.id); }}
                        className="opacity-0 group-hover:opacity-100 text-[#FF6F61] text-xs font-bold hover:underline transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-6 right-6 w-16 h-16 group z-40">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ec4899] to-rose-600 rounded-full shadow-lg shadow-[#ec4899]/40 group-hover:scale-110 transition-transform duration-300 animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="absolute -inset-1 bg-white/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-[#ec4899] to-rose-500 rounded-full flex items-center justify-center text-white border-2 border-white/30 shadow-inner">
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
      </div >
    </div >
  );
}
