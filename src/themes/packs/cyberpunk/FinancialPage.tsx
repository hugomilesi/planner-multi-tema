'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CyberpunkFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div 
      className="min-h-screen bg-[#0a0014] text-white font-[family-name:var(--font-space-grotesk)]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,0,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >
      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#ff00ff] text-xs tracking-[0.3em] mb-1">
                <div className="w-2 h-2 bg-[#ff00ff]" />
                <span>SYSTEM://CREDITS</span>
              </div>
              <h1 className="text-3xl font-[family-name:var(--font-orbitron)] text-[#00ffff] tracking-wider">
                FINANCES
              </h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="w-12 h-12 bg-[#ff00ff] text-black flex items-center justify-center hover:brightness-110 transition-all">
                  <Plus className="w-5 h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0014] border-2 border-[#ff00ff] text-white max-w-[90vw]">
                <DialogHeader>
                  <DialogTitle className="font-[family-name:var(--font-orbitron)] text-[#00ffff]">
                    NEW_TRANSACTION
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                    <TabsList className="w-full grid grid-cols-2 bg-[#1a0033]">
                      <TabsTrigger value="expense" className="data-[state=active]:bg-[#ff00ff] data-[state=active]:text-black">
                        EXPENSE
                      </TabsTrigger>
                      <TabsTrigger value="income" className="data-[state=active]:bg-[#00ffff] data-[state=active]:text-black">
                        INCOME
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="space-y-2">
                    <Label className="text-[#ff00ff] text-xs">AMOUNT</Label>
                    <Input type="number" placeholder="0.00" value={newTransaction.amount}
                      onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                      className="bg-[#1a0033] border-[#ff00ff]/50 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#ff00ff] text-xs">CATEGORY</Label>
                    <Select value={newTransaction.categoryId}
                      onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                      <SelectTrigger className="bg-[#1a0033] border-[#ff00ff]/50 text-white">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a0033] border-[#ff00ff]">
                        {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[#ff00ff] text-xs">DATE</Label>
                      <Input type="date" value={newTransaction.date}
                        onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                        className="bg-[#1a0033] border-[#ff00ff]/50 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#ff00ff] text-xs">NOTE</Label>
                      <Input placeholder="Optional" value={newTransaction.note}
                        onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                        className="bg-[#1a0033] border-[#ff00ff]/50 text-white" />
                    </div>
                  </div>
                  <button onClick={handleAddTransaction}
                    className="w-full py-3 bg-[#ff00ff] text-black font-[family-name:var(--font-orbitron)] hover:bg-[#00ffff] transition-colors">
                    EXECUTE TRANSACTION
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 border border-[#00ff00]/30 bg-[#001a00]/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#00ff00]" />
              <span className="text-[10px] text-[#00ff00] tracking-wider">CREDITS_IN</span>
            </div>
            <p className="text-xl font-[family-name:var(--font-orbitron)] text-[#00ff00]">
              {formatCurrency(monthIncome)}
            </p>
          </div>
          <div className="p-4 border border-red-500/30 bg-[#1a0000]/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className="text-[10px] text-red-500 tracking-wider">CREDITS_OUT</span>
            </div>
            <p className="text-xl font-[family-name:var(--font-orbitron)] text-red-500">
              {formatCurrency(monthExpense)}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-6 p-4 border border-[#00ffff]/30 bg-[#001a1a]/50">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#00ffff] tracking-wider">NET_BALANCE</span>
              <p className={cn('text-2xl font-[family-name:var(--font-orbitron)]', balance >= 0 ? 'text-[#00ffff]' : 'text-red-500')}>
                {formatCurrency(balance)}
              </p>
            </div>
            <Zap className={cn('w-8 h-8', balance >= 0 ? 'text-[#00ffff]' : 'text-red-500')} />
          </div>
        </div>

        {/* Chart - Last 7 Days */}
        <div className="mb-6 border border-[#ff00ff]/30 bg-[#0f001a] p-4">
          <h3 className="text-xs text-[#ff00ff] tracking-wider mb-4 font-[family-name:var(--font-orbitron)]">LAST_7_DAYS</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-[#00ffff] transition-all" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-[#ff00ff] transition-all" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-[#ff00ff]">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="border border-[#ff00ff]/30 bg-[#0f001a]">
          <div className="p-3 border-b border-[#ff00ff]/30">
            <span className="text-xs text-[#ff00ff] tracking-wider font-[family-name:var(--font-orbitron)]">RECENT_TRANSACTIONS</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-[#ff00ff]/50 py-8 text-sm">NO_DATA</p>
            ) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-[#ff00ff]/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat?.icon || '💰'}</span>
                      <div>
                        <p className="text-sm">{cat?.name || 'Unknown'}</p>
                        <p className="text-[10px] text-[#ff00ff]/50">{t.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-[family-name:var(--font-orbitron)]', t.type === 'income' ? 'text-[#00ff00]' : 'text-red-500')}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-[#ff00ff]/50 hover:text-red-500">
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
