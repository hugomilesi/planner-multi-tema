'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, TrendingUp, TrendingDown, Eye } from 'lucide-react';
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
    <div className="min-h-screen bg-[#0d1a14] text-[#f5f0e8] antialiased pb-24" style={{ fontFamily: '"Lato", sans-serif' }}>
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }} />
      
      <div className="relative z-10 px-4 pt-6">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight italic" style={{ fontFamily: '"Playfair Display", serif' }}>Stewardship</h1>
            <p className="text-[#6a8a7a] text-xs font-medium italic" style={{ fontFamily: '"Playfair Display", serif' }}>
              "Be faithful in little..."
            </p>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#1a2a24] text-[#5a8a6a] flex items-center justify-center border border-[#2a3a34]">
            <Eye className="w-5 h-5" />
          </button>
        </header>

        {/* Month Tabs */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 rounded-full bg-[#5a8a6a] text-white text-sm font-medium flex items-center gap-1">
            📅 This Month
          </button>
          <button className="px-4 py-2 rounded-full bg-[#1a2a24] text-[#6a8a7a] text-sm font-medium border border-[#2a3a34]">
            October
          </button>
          <button className="px-4 py-2 rounded-full bg-[#1a2a24] text-[#6a8a7a] text-sm font-medium border border-[#2a3a34]">
            September
          </button>
        </div>

        {/* Treasury Balance Card */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#5a8a6a]">💰</span>
            <p className="text-[#6a8a7a] text-xs font-bold uppercase tracking-wider">Treasury Balance</p>
          </div>
          <p className="text-4xl font-bold mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>{formatCurrency(balance)}</p>
          <span className="inline-block px-3 py-1 rounded-full bg-[#1a2a24] text-[#5a8a6a] text-xs border border-[#2a3a34]">
            Blessed to be a blessing
          </span>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-[#1a2a24] border border-[#2a3a34] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#5a8a6a]/20 flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#5a8a6a]" />
              </div>
              <p className="text-[10px] text-[#6a8a7a] font-bold uppercase tracking-wider">Provision (In)</p>
            </div>
            <p className="text-xl font-bold text-[#5a8a6a]" style={{ fontFamily: '"Playfair Display", serif' }}>+{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#1a2a24] border border-[#2a3a34] shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#8a6a5a]/20 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-[#8a6a5a]" />
              </div>
              <p className="text-[10px] text-[#6a8a7a] font-bold uppercase tracking-wider">Outflow</p>
            </div>
            <p className="text-xl font-bold text-[#f5f0e8]" style={{ fontFamily: '"Playfair Display", serif' }}>-{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        {/* Monthly Stewardship Chart */}
        <div className="mb-6 p-5 rounded-2xl bg-[#1a2a24] border border-[#2a3a34] shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold italic" style={{ fontFamily: '"Playfair Display", serif' }}>Monthly Stewardship</h3>
            <span className="bg-[#5a8a6a]/20 text-[#5a8a6a] text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% Saved
            </span>
          </div>
          <p className="text-xs text-[#6a8a7a] mb-4">Oct 1 - Oct 31</p>
          <div className="h-32 flex items-end gap-2">
            {['W1', 'W2', 'W3', 'W4'].map((week, i) => {
              const heights = [40, 60, 80, 50];
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center h-24">
                    <div className={cn(
                      'w-full rounded-t transition-all',
                      i === 2 ? 'bg-[#5a8a6a]' : 'bg-[#2a3a34]'
                    )} style={{ height: `${heights[i]}%` }} />
                  </div>
                  <span className="text-[10px] text-[#6a8a7a] font-medium">{week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Kingdom Allocations */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>Kingdom Allocations</h3>
            <button className="text-[#5a8a6a] text-xs font-medium">Adjust</button>
          </div>
          <div className="space-y-3">
            {categorySpending.slice(0, 2).map((cat) => (
              <div key={cat.id} className="p-4 rounded-2xl bg-[#1a2a24] border border-[#2a3a34]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#2a3a34] flex items-center justify-center text-lg">
                      {cat.icon}
                    </div>
                    <div>
                      <p className="font-medium text-[#f5f0e8]">{cat.name}</p>
                      <p className="text-xs text-[#6a8a7a]">${Math.max(0, (cat.budget || 500) - cat.spent).toFixed(0)} remaining</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#f5f0e8]">{formatCurrency(cat.spent)} / {formatCurrency(cat.budget || 500)}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-[#2a3a34] overflow-hidden">
                  <div className="h-full rounded-full bg-[#5a8a6a]" style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>Recent Activity</h3>
            <button className="text-[#5a8a6a] text-xs font-medium">Full Ledger</button>
          </div>
          <div className="space-y-2">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[#1a2a24] border border-[#2a3a34]">
                <div className="text-4xl mb-2">🙏</div>
                <p className="text-[#6a8a7a] text-sm italic" style={{ fontFamily: '"Playfair Display", serif' }}>No transactions yet</p>
              </div>
            ) : (
              recentTransactions.slice(0, 3).map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id} className="flex items-center justify-between p-4 rounded-2xl bg-[#1a2a24] border border-[#2a3a34]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2a3a34] flex items-center justify-center text-lg">
                        {cat?.icon || '💰'}
                      </div>
                      <div>
                        <p className="font-medium text-[#f5f0e8]">{cat?.name || 'Unknown'}</p>
                        <p className="text-xs text-[#6a8a7a]">
                          {new Date(t.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <span className={cn('font-bold', isIncome ? 'text-[#5a8a6a]' : 'text-[#f5f0e8]')}>
                      {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* FAB and Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-[#5a8a6a] text-white shadow-lg shadow-[#5a8a6a]/40 transition-transform active:scale-95 hover:scale-105 border-4 border-[#0d1a14]">
            <Plus className="w-7 h-7" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#1a2a24] border border-[#2a3a34] text-[#f5f0e8] max-w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>New Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
              <TabsList className="w-full grid grid-cols-2 bg-[#0d1a14] rounded-xl">
                <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-[#8a6a5a] data-[state=active]:text-white">Expense</TabsTrigger>
                <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-[#5a8a6a] data-[state=active]:text-white">Income</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="space-y-2">
              <Label className="text-[#6a8a7a] text-sm font-medium">Amount</Label>
              <Input type="number" placeholder="0.00" value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="bg-[#0d1a14] border-[#2a3a34] text-[#f5f0e8] rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label className="text-[#6a8a7a] text-sm font-medium">Category</Label>
              <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                <SelectTrigger className="bg-[#0d1a14] border-[#2a3a34] text-[#f5f0e8] rounded-xl">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1a2a24] border-[#2a3a34] text-[#f5f0e8] rounded-xl">
                  {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#6a8a7a] text-sm font-medium">Date</Label>
                <Input type="date" value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="bg-[#0d1a14] border-[#2a3a34] text-[#f5f0e8] rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#6a8a7a] text-sm font-medium">Note</Label>
                <Input placeholder="Optional" value={newTransaction.note}
                  onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                  className="bg-[#0d1a14] border-[#2a3a34] text-[#f5f0e8] rounded-xl" />
              </div>
            </div>
            <button onClick={handleAddTransaction}
              className="w-full py-3 rounded-xl bg-[#5a8a6a] text-white font-semibold hover:opacity-90" style={{ fontFamily: '"Playfair Display", serif' }}>
              Add Transaction
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
