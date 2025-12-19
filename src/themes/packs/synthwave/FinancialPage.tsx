'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Sun, Music } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SynthwaveFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]" style={{ background: 'linear-gradient(180deg, #1a0533 0%, #2d1b4e 40%, #1a0533 100%)' }}>
      <div className="fixed bottom-0 left-0 right-0 h-48 opacity-30" style={{ background: 'linear-gradient(0deg, #ff6ec7 0%, #ffcc00 30%, transparent 100%)' }} />
      <div className="fixed bottom-0 left-0 right-0 h-32 opacity-20" style={{
        backgroundImage: 'linear-gradient(#ff6ec7 1px, transparent 1px), linear-gradient(90deg, #ff6ec7 1px, transparent 1px)',
        backgroundSize: '40px 20px', transform: 'perspective(200px) rotateX(60deg)', transformOrigin: 'bottom',
      }} />
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#ff6ec7] text-xs tracking-[0.2em] mb-1"><Music className="w-3 h-3" /><span>RETRO BANK</span></div>
            <h1 className="text-4xl font-bold" style={{ background: 'linear-gradient(180deg, #ff6ec7 0%, #ffcc00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FINANCES</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 bg-gradient-to-b from-[#ff6ec7] to-[#ff4d94] text-white flex items-center justify-center border-2 border-[#ffcc00]"
                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#1a0533] border-2 border-[#ff6ec7] text-white max-w-[90vw]">
              <DialogHeader><DialogTitle style={{ background: 'linear-gradient(90deg, #ff6ec7, #ffcc00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>New Transaction</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-[#2d1b4e]">
                    <TabsTrigger value="expense" className="data-[state=active]:bg-[#ff6ec7]">EXPENSE</TabsTrigger>
                    <TabsTrigger value="income" className="data-[state=active]:bg-[#00ff88]">INCOME</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2">
                  <Label className="text-[#ff6ec7] text-sm">Amount</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#ff6ec7] text-sm">Category</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className="bg-[#2d1b4e] border-[#ff6ec7]">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-[#ff6ec7] text-sm">Date</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white" /></div>
                  <div className="space-y-2"><Label className="text-[#ff6ec7] text-sm">Note</Label>
                    <Input placeholder="Optional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })} className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white" /></div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 bg-gradient-to-r from-[#ff6ec7] to-[#ffcc00] text-black font-bold">ADD ⚡</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 border-2 border-[#00ff88]/50 bg-[#002211]/50" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-[#00ff88]" /><span className="text-xs text-[#00ff88]">Income</span></div>
            <p className="text-xl font-bold text-[#00ff88]">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 border-2 border-red-500/50 bg-[#220000]/50" style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}>
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="text-xs text-red-400">Expenses</span></div>
            <p className="text-xl font-bold text-red-400">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        <div className="mb-6 p-4 border-2 border-[#ffcc00]/50 bg-[#2d1b4e]/80" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
          <div className="flex items-center justify-between">
            <div><span className="text-xs text-[#ffcc00]">Balance</span><p className={cn('text-2xl font-bold', balance >= 0 ? 'text-[#ffcc00]' : 'text-red-400')}>{formatCurrency(balance)}</p></div>
            <Sun className={cn('w-8 h-8', balance >= 0 ? 'text-[#ffcc00]' : 'text-red-400')} />
          </div>
        </div>

        <div className="mb-6 p-4 border-2 border-[#ff6ec7]/50 bg-[#2d1b4e]/80" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
          <h3 className="text-sm text-[#ff6ec7] mb-4">Last 7 Days</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-gradient-to-t from-[#00ff88] to-[#00ffaa]" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-gradient-to-t from-[#ff6ec7] to-[#ffcc00]" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-[#ff6ec7]">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-2 border-[#ff6ec7]/50 bg-[#2d1b4e]/80 overflow-hidden" style={{ clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)' }}>
          <div className="p-3 border-b-2 border-[#ff6ec7]/30"><span className="text-sm text-[#ff6ec7]">Recent Transactions</span></div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (<p className="text-center text-[#ff6ec7]/50 py-8 text-sm">No transactions</p>) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-[#ff6ec7]/10">
                    <div className="flex items-center gap-3"><span className="text-xl">{cat?.icon || '💰'}</span><div><p className="text-sm">{cat?.name || 'Unknown'}</p><p className="text-[10px] text-[#ff6ec7]/50">{t.date}</p></div></div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-bold', t.type === 'income' ? 'text-[#00ff88]' : 'text-red-400')}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-[#ff6ec7]/50 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
