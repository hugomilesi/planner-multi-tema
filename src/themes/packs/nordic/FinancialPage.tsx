'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Wallet, Plane, Landmark } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NordicFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const today = new Date();

  return (
    <div className="min-h-screen font-sans text-[#2c2825] antialiased pb-24 relative">
      {/* Warm gradient background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'linear-gradient(180deg, #e8d5c4 0%, #dcc4b0 30%, #d4b8a0 60%, #c9a88a 100%)'
      }} />
      <div className="relative z-10 px-4 pt-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[#5d5650] text-[10px] font-mono font-bold uppercase tracking-widest">
              {today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()} • LOGBOOK
            </p>
            <h1 className="text-[28px] font-serif font-bold italic text-[#2c2825]">Financial Overview</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-[#c24d3b] text-white flex items-center justify-center shadow-lg shadow-[#c24d3b]/30 border-4 border-white">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#f5efe8] border border-[#e0d5c8] text-[#2c2825] max-w-[90vw] rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-serif font-bold italic flex items-center gap-2">
                  <Plane className="w-5 h-5 text-[#3b5998]" />
                  New Expense
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-[#e8dfc5] rounded-lg">
                    <TabsTrigger value="expense" className="rounded-lg data-[state=active]:bg-[#c24d3b] data-[state=active]:text-white font-mono uppercase text-xs">Expense</TabsTrigger>
                    <TabsTrigger value="income" className="rounded-lg data-[state=active]:bg-[#3b5998] data-[state=active]:text-white font-mono uppercase text-xs">Income</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2">
                  <Label className="text-[#8a8078] text-xs font-mono uppercase">Amount</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-white border-[#e0d5c8] rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#8a8078] text-xs font-mono uppercase">Category</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-white border-[#e0d5c8] rounded-lg">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[#f5efe8] border-[#e0d5c8] rounded-lg">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#8a8078] text-xs font-mono uppercase">Date</Label>
                    <Input type="date" value={newTransaction.date}
                      onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      className="bg-white border-[#e0d5c8] rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#8a8078] text-xs font-mono uppercase">Note</Label>
                    <Input placeholder="Optional" value={newTransaction.note}
                      onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                      className="bg-white border-[#e0d5c8] rounded-lg" />
                  </div>
                </div>
                <button onClick={handleAddTransaction}
                  className="w-full py-3 rounded-lg bg-[#3b5998] text-white font-mono font-bold uppercase tracking-wider hover:opacity-90">
                  Add Entry
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* Budget Card - Notebook style */}
        <div className="relative bg-[#f5efe8] rounded-lg border border-[#e0d5c8] shadow-sm overflow-hidden mb-6">
          {/* Notebook holes */}
          <div className="absolute top-0 bottom-0 left-3 flex flex-col justify-center gap-6">
            <div className="w-2 h-2 rounded-full bg-[#d4c8b8]" />
            <div className="w-2 h-2 rounded-full bg-[#d4c8b8]" />
            <div className="w-2 h-2 rounded-full bg-[#d4c8b8]" />
          </div>
          <div className="pl-8 pr-4 py-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#5d5650]" />
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2c2825]">Financial Overview</h3>
                  <p className="text-[10px] font-mono text-[#8a8078] uppercase tracking-wide">{today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()} • LOGBOOK</p>
                </div>
              </div>
            </div>
            <div className="border-t border-dashed border-[#d4c8b8] pt-3">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="min-w-0">
                  <span className="text-[10px] text-[#8a8078] font-mono uppercase">Expenses</span>
                  <p className="text-lg font-serif font-bold text-[#2c2825] truncate">{formatCurrency(monthExpense)}</p>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#8a8078] font-mono uppercase">Income</span>
                  <p className="text-lg font-serif font-bold text-[#8a8078] line-through decoration-[#c24d3b]/50 truncate">{formatCurrency(monthIncome)}</p>
                </div>
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-1 h-12 border-b border-[#2c2825] pb-0">
                {last7Days.map((day, i) => {
                  const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
                  const isToday = i === last7Days.length - 2;
                  return (
                    <div key={i} className={cn(
                      'flex-1 rounded-t-sm',
                      isToday ? 'bg-[#3b5998]' : i >= 3 ? 'bg-[#3b5998]/50' : 'bg-[#d4c8b8]'
                    )} style={{ height: `${Math.max(10, ((day.income + day.expense) / max) * 100)}%` }} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-[#f5efe8] border border-[#e0d5c8] shadow-sm min-w-0">
            <p className="text-[10px] text-[#8a8078] font-mono uppercase tracking-wider mb-1">Income</p>
            <p className="text-lg font-serif font-bold text-[#3b5998] truncate">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-3 rounded-lg bg-[#f5efe8] border border-[#e0d5c8] shadow-sm min-w-0">
            <p className="text-[10px] text-[#8a8078] font-mono uppercase tracking-wider mb-1">Balance</p>
            <p className={cn('text-lg font-serif font-bold truncate', balance >= 0 ? 'text-[#2c2825]' : 'text-[#c24d3b]')}>{formatCurrency(balance)}</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-lg bg-[#f5efe8] border border-[#e0d5c8] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e0d5c8] flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold italic">Recent Transactions</h3>
            <span className="text-[10px] font-mono text-[#8a8078]">{recentTransactions.length} entries</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-3xl mb-2">✈️</div>
                <p className="text-[#8a8078] font-serif italic">No expenses logged</p>
              </div>
            ) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-[#e0d5c8] last:border-b-0 group hover:bg-[#e8dfc5]/30 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0',
                        isIncome ? 'bg-[#3b5998]/10' : 'bg-[#e8dfc5]'
                      )}>
                        {cat?.icon || '💰'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-serif truncate">{cat?.name || 'Unknown'}</p>
                        <p className="text-[10px] text-[#8a8078] font-mono">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn('font-serif font-bold text-sm', isIncome ? 'text-[#3b5998]' : 'text-[#2c2825]')}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)}
                        className="text-[#c4b8a8] hover:text-[#c24d3b] transition-colors">
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
