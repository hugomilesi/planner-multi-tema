'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Rocket, Sparkles } from 'lucide-react';
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

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #0f0a1e 0%, #1a1035 50%, #0d0d2b 100%)' }}>
      <div className="fixed inset-0 opacity-60" style={{
        backgroundImage: `radial-gradient(2px 2px at 20px 30px, white, transparent),
                         radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                         radial-gradient(1px 1px at 90px 40px, white, transparent)`,
        backgroundSize: '350px 200px',
      }} />
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs tracking-widest mb-1">
              <Sparkles className="w-3 h-3" /><span>SPACE BANK</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Finances</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border border-purple-500/30 text-white max-w-[90vw] rounded-2xl">
              <DialogHeader><DialogTitle className="text-purple-300 flex items-center gap-2"><Rocket className="w-5 h-5" />New Transaction</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-slate-800">
                    <TabsTrigger value="expense" className="data-[state=active]:bg-purple-600">Expense</TabsTrigger>
                    <TabsTrigger value="income" className="data-[state=active]:bg-green-600">Income</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2">
                  <Label className="text-purple-300 text-sm">Amount</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-slate-800 border-purple-500/30 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-purple-300 text-sm">Category</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-slate-800 border-purple-500/30 text-white"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/30">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-purple-300 text-sm">Date</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      className="bg-slate-800 border-purple-500/30 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-purple-300 text-sm">Note</Label>
                    <Input placeholder="Optional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                      className="bg-slate-800 border-purple-500/30 text-white" />
                  </div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium">
                  🚀 Add Transaction
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-green-400" /><span className="text-xs text-green-400">Income</span></div>
            <p className="text-xl font-bold text-green-400">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="text-xs text-red-400">Expenses</span></div>
            <p className="text-xl font-bold text-red-400">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-purple-400">Net Balance</span>
              <p className={cn('text-2xl font-bold', balance >= 0 ? 'text-purple-300' : 'text-red-400')}>{formatCurrency(balance)}</p>
            </div>
            <Rocket className={cn('w-8 h-8', balance >= 0 ? 'text-purple-400' : 'text-red-400')} />
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-slate-800/50 border border-purple-500/20">
          <h3 className="text-sm text-purple-300 mb-4">Last 7 Days</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-gradient-to-t from-green-600 to-green-400 rounded-t" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-purple-400">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-800/40 border border-purple-500/20 overflow-hidden">
          <div className="p-3 border-b border-purple-500/20"><span className="text-sm text-purple-300">Recent Transactions</span></div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-purple-400/50 py-8 text-sm">No transactions</p>
            ) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-purple-500/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat?.icon || '💰'}</span>
                      <div><p className="text-sm">{cat?.name || 'Unknown'}</p><p className="text-[10px] text-purple-400/50">{t.date}</p></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-bold', t.type === 'income' ? 'text-green-400' : 'text-red-400')}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-purple-400/50 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
