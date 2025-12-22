'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, PiggyBank, Settings, PlusCircle, MinusCircle, BarChart3, Gift, IceCream, Gamepad2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NoirFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const goalProgress = Math.min(100, (balance / 60) * 100);

  return (
    <div className="min-h-screen font-[family-name:var(--font-nunito)] text-slate-800"
      style={{
        backgroundColor: '#FFF9F0',
        backgroundImage: 'radial-gradient(#FF9F1C 1.5px, transparent 1.5px), radial-gradient(#2EC4B6 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
      }}>

      <div className="relative min-h-screen flex flex-col pb-24 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-40 w-full">
          <div className="absolute inset-0 bg-[#FFF9F0]/95 backdrop-blur-xl border-b border-slate-200 shadow-sm" />
          <div className="relative z-10 flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#FF9F1C] rounded-full flex items-center justify-center text-white shadow-[0_8px_0px_0px_rgba(0,0,0,0.1)] transform active:translate-y-1 transition-transform border-2 border-white">
                <PiggyBank className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-[family-name:var(--font-fredoka)] font-black text-slate-900 tracking-tight">My Wallet</h2>
            </div>
            <button className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border-2 border-slate-200 hover:bg-slate-50 transition-colors text-slate-500 hover:text-[#FF9F1C]">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Period Tabs */}
        <div className="px-6 mb-4">
          <div className="bg-white p-1.5 rounded-2xl flex shadow-sm border border-slate-200">
            <button className="flex-1 py-2.5 rounded-xl bg-[#FF9F1C] text-white font-extrabold text-sm shadow-md transition-all">This Week</button>
            <button className="flex-1 py-2.5 rounded-xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors">Month</button>
          </div>
        </div>

        {/* Piggy Bank Card */}
        <div className="px-6 mb-8">
          <div className="bg-gradient-to-br from-[#FF9F1C] to-[#FFBF69] p-7 rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)] relative overflow-hidden group border-2 border-white/20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-sm" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-sm" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <p className="text-white/95 font-bold text-lg mb-1 tracking-wide">My Piggy Bank</p>
              <h1 className="text-6xl font-[family-name:var(--font-fredoka)] font-black text-white drop-shadow-md mb-5 tracking-tight">
                {formatCurrency(balance)}
              </h1>
              <div className="w-full bg-black/10 h-5 rounded-full overflow-hidden backdrop-blur-sm border border-white/40 shadow-inner">
                <div className="bg-white h-full rounded-full shadow-sm transition-all" style={{ width: `${goalProgress}%` }} />
              </div>
              <p className="text-white font-bold text-sm mt-3 bg-white/20 px-4 py-1 rounded-full backdrop-blur-md">
                {Math.round(goalProgress)}% to your goal! 🎯
              </p>
            </div>
          </div>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-4 px-6 mb-8">
          <div className="bg-white p-5 rounded-3xl border-2 border-green-200 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-green-400 transition-colors">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-2 rotate-3 group-hover:rotate-6 transition-transform shadow-sm">
                <PlusCircle className="w-10 h-10" />
              </div>
              <span className="text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-1">Earned</span>
              <p className="text-3xl font-[family-name:var(--font-fredoka)] font-black text-green-600">+{formatCurrency(monthIncome)}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border-2 border-red-200 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] relative overflow-hidden group hover:border-red-400 transition-colors">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 mb-2 -rotate-3 group-hover:-rotate-6 transition-transform shadow-sm">
                <MinusCircle className="w-10 h-10" />
              </div>
              <span className="text-sm font-extrabold text-slate-500 uppercase tracking-wider mb-1">Spent</span>
              <p className="text-3xl font-[family-name:var(--font-fredoka)] font-black text-red-600">-{formatCurrency(monthExpense)}</p>
            </div>
          </div>
        </div>

        {/* Spending Chart */}
        <div className="px-6 mb-8">
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-[family-name:var(--font-fredoka)] font-extrabold text-slate-800 flex items-center gap-2">
                <div className="p-1.5 bg-[#FF9F1C]/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-[#FF9F1C]" />
                </div>
                Where did it go?
              </h3>
            </div>
            <div className="flex items-end justify-between h-48 gap-3">
              {categorySpending.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                  <div className="text-5xl mb-3">📊</div>
                  <p className="text-sm font-bold text-slate-600">No expenses yet!</p>
                  <p className="text-xs text-slate-500 mt-1">Add transactions to see your spending</p>
                </div>
              ) : (
                categorySpending.slice(0, 4).map((cat, i) => {
                  const maxSpent = Math.max(...categorySpending.map(c => c.spent));
                  const heightPercent = maxSpent > 0 ? (cat.spent / maxSpent) * 100 : 0;
                  return (
                    <div key={cat.id} className="flex flex-col items-center gap-2 flex-1 group">
                      <div className="w-full rounded-2xl relative h-36 flex items-end justify-center overflow-hidden border"
                        style={{ backgroundColor: `${cat.color}10`, borderColor: `${cat.color}20` }}>
                        <div className="w-full mx-1.5 rounded-t-xl transition-all duration-300 relative flex items-start justify-center pt-2 shadow-sm"
                          style={{ height: `${heightPercent}%`, backgroundColor: cat.color }}>
                          <span className="text-xs font-bold text-white drop-shadow-md">{formatCurrency(cat.spent)}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl mb-0.5">{cat.icon}</span>
                        <span className="text-xs font-bold text-slate-600">{cat.name}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="px-6 flex-1 bg-white rounded-t-[3rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.08)] pt-8 pb-8 -mx-1 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xl font-[family-name:var(--font-fredoka)] font-extrabold text-slate-900">Recent Fun</h3>
            <button className="text-[#FF9F1C] text-sm font-bold hover:underline">See All</button>
          </div>
          <div className="space-y-4">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-5xl mb-3">🐷</div>
                <div className="text-slate-600 font-bold">No transactions yet!</div>
              </div>
            ) : (
              recentTransactions.slice(0, 3).map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        'w-14 h-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 border',
                        isIncome ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-pink-50 text-pink-600 border-pink-100'
                      )}>
                        <span className="text-2xl">{cat?.icon || '💰'}</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-base font-bold text-slate-900">{cat?.name || 'Unknown'}</p>
                        <p className="text-xs font-bold text-slate-500">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={cn('text-lg font-black', isIncome ? 'text-green-600' : 'text-slate-900')}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </p>
                      <button onClick={() => deleteTransaction(t.id)}
                        className="p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <Trash2 className="w-4 h-4" />
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
            <button className="fixed bottom-6 right-6 w-16 h-16 bg-[#FF9F1C] text-white rounded-full shadow-lg shadow-[#FF9F1C]/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 z-50 border-4 border-white">
              <Plus className="w-8 h-8" strokeWidth={3} />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#FFF9F0] border-2 border-[#FF9F1C]/30 text-slate-800 max-w-[90vw] rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)]">
            <DialogHeader>
              <DialogTitle className="text-slate-800 text-xl font-[family-name:var(--font-fredoka)] font-bold flex items-center gap-2">
                <span className="text-2xl">💰</span> Add Money
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                <TabsList className="w-full grid grid-cols-2 bg-slate-100 rounded-xl">
                  <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white font-bold">💵 Earned</TabsTrigger>
                  <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold">🛒 Spent</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-2">
                <Label className="text-slate-600 text-sm font-bold">How much?</Label>
                <Input type="number" placeholder="0.00" value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="bg-white border-2 border-slate-200 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-600 text-sm font-bold">What for?</Label>
                <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                  <SelectTrigger className="bg-white border-2 border-slate-200 rounded-xl"><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent className="bg-white border-2 border-slate-200 rounded-xl">
                    {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-600 text-sm font-bold">When?</Label>
                  <Input type="date" value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="bg-white border-2 border-slate-200 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-600 text-sm font-bold">Note</Label>
                  <Input placeholder="Optional" value={newTransaction.note}
                    onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                    className="bg-white border-2 border-slate-200 rounded-xl" />
                </div>
              </div>
              <button onClick={handleAddTransaction}
                className="w-full py-3 bg-[#FF9F1C] text-white rounded-xl font-bold text-lg shadow-[0_4px_0_rgb(217,119,6)] active:shadow-none active:translate-y-[4px] transition-all">
                Save! 🎉
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
