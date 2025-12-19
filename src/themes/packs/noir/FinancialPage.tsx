'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Eye } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-8 border-b border-gray-800 pb-4 flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-2">Financial Records</div>
            <h1 className="text-2xl font-bold tracking-wider uppercase">Ledger</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-gray-200"><Plus className="w-4 h-4" /></button>
            </DialogTrigger>
            <DialogContent className="bg-black border border-gray-700 text-white max-w-[90vw] rounded-none">
              <DialogHeader><DialogTitle className="text-white uppercase tracking-wider text-sm">New Entry</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-gray-900 rounded-none">
                    <TabsTrigger value="expense" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-black">EXPENSE</TabsTrigger>
                    <TabsTrigger value="income" className="rounded-none data-[state=active]:bg-white data-[state=active]:text-black">INCOME</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2"><Label className="text-gray-400 text-[10px] uppercase tracking-wider">Amount</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-black border-gray-700 text-white rounded-none" /></div>
                <div className="space-y-2"><Label className="text-gray-400 text-[10px] uppercase tracking-wider">Category</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-black border-gray-700 text-white rounded-none"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className="bg-black border-gray-700 rounded-none">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>))}
                    </SelectContent>
                  </Select></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-gray-400 text-[10px] uppercase tracking-wider">Date</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} className="bg-black border-gray-700 text-white rounded-none" /></div>
                  <div className="space-y-2"><Label className="text-gray-400 text-[10px] uppercase tracking-wider">Note</Label>
                    <Input placeholder="Optional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })} className="bg-black border-gray-700 text-white rounded-none" /></div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 bg-white text-black uppercase tracking-wider text-sm font-bold hover:bg-gray-200">Record Entry</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-0 mb-6">
          <div className="p-4 border border-gray-800">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 tracking-widest">INCOME</span></div>
            <p className="text-lg text-white">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 border border-gray-800 border-l-0">
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-3 h-3 text-gray-500" /><span className="text-[10px] text-gray-500 tracking-widest">EXPENSES</span></div>
            <p className="text-lg text-gray-400">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        <div className="mb-6 p-4 border border-gray-800">
          <div className="flex items-center justify-between">
            <div><span className="text-[10px] text-gray-500 tracking-widest">NET BALANCE</span><p className={cn('text-2xl', balance >= 0 ? 'text-white' : 'text-gray-500')}>{formatCurrency(balance)}</p></div>
            <Eye className="w-6 h-6 text-gray-700" />
          </div>
        </div>

        <div className="mb-6 p-4 border border-gray-800">
          <h3 className="text-[10px] text-gray-500 tracking-widest uppercase mb-4">Last 7 Days</h3>
          <div className="h-24 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-20">
                    <div className="w-2/5 bg-white" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-gray-600" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-gray-600">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-gray-800">
          <div className="p-3 border-b border-gray-800"><span className="text-[10px] text-gray-500 tracking-widest uppercase">Recent Entries</span></div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (<p className="text-center text-gray-700 py-8 text-sm uppercase tracking-wider">No entries</p>) : (
              recentTransactions.map((t, i) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className={cn('flex items-center justify-between p-3', i > 0 && 'border-t border-gray-900')}>
                    <div className="flex items-center gap-3"><span className="text-lg">{cat?.icon || '💰'}</span><div><p className="text-sm text-gray-300">{cat?.name || 'Unknown'}</p><p className="text-[10px] text-gray-600">{t.date}</p></div></div>
                    <div className="flex items-center gap-2">
                      <span className={cn('', t.type === 'income' ? 'text-white' : 'text-gray-500')}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-gray-700 hover:text-white"><Trash2 className="w-4 h-4" /></button>
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
