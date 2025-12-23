'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Eye, EyeOff, ShoppingCart, Car } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export function CyberpunkFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const [showBalance, setShowBalance] = useState(true);
  const today = new Date();

  // Get top 2 spending categories
  const topCategories = categorySpending.slice(0, 2);

  return (
    <div className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]"
      style={{
        backgroundColor: '#0b0c15',
        backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }}>

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%\" height=\"100%\" filter=\"url(%23noise)\"/%3E%3C/svg%3E')" }} />

      <div className="relative z-10 pb-24">
        {/* Header - Sticky */}
        <header className="sticky top-0 z-20 bg-[#0b0c15]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#ff00ff] animate-pulse">≡</span>
              <h2 className="text-xl font-bold uppercase tracking-wider text-white font-mono"
                style={{ textShadow: '0 0 5px rgba(0,243,255,0.7), 0 0 10px rgba(0,243,255,0.5)' }}>
                FINANCIAL OVERVIEW
              </h2>
            </div>
            <button onClick={() => setShowBalance(!showBalance)}
              className="w-10 h-10 rounded-md border border-white/20 hover:border-[#00ffff] hover:bg-[#00ffff]/10 transition-all flex items-center justify-center group">
              {showBalance ? <Eye className="w-5 h-5 group-hover:text-[#00ffff]" /> : <EyeOff className="w-5 h-5 group-hover:text-[#00ffff]" />}
            </button>
          </div>
        </header>

        {/* Period Filter */}
        <div className="flex gap-3 px-4 pt-4 pb-2 overflow-x-auto no-scrollbar">
          <button className="flex-shrink-0 h-9 px-5 rounded-sm border border-[#00ffff] bg-[#00ffff]/10 text-[#00ffff] text-sm font-bold uppercase tracking-wide transition-transform active:scale-95"
            style={{ boxShadow: '0 0 10px rgba(0,243,255,0.4)' }}>
            This Month
          </button>
          <button className="flex-shrink-0 h-9 px-5 rounded-sm bg-[#151725] border border-white/10 text-slate-400 text-sm font-medium hover:border-[#ff00ff] hover:text-[#ff00ff] transition-colors uppercase">
            {today.toLocaleDateString('en-US', { month: 'long' })}
          </button>
          <button className="flex-shrink-0 h-9 px-5 rounded-sm bg-[#151725] border border-white/10 text-slate-400 text-sm font-medium hover:border-[#ff00ff] hover:text-[#ff00ff] transition-colors uppercase">
            {today.getFullYear()}
          </button>
        </div>

        {/* Balance Display */}
        <div className="flex flex-col items-center pt-6 pb-4 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00ffff]/5 to-transparent pointer-events-none" />
          <p className="text-[#00ffff] text-[10px] font-mono uppercase tracking-[0.2em] mb-2 border border-[#00ffff]/30 px-2 py-0.5 rounded-sm">
            Total Balance
          </p>
          <h1 className="text-4xl font-mono font-bold tracking-tighter text-white"
            style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
            {showBalance ? (
              <>
                {formatCurrency(balance).split('.')[0]}
                <span className="text-2xl text-white/50">.{formatCurrency(balance).split('.')[1] || '00'}</span>
              </>
            ) : '••••••'}
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent mt-6"
            style={{ boxShadow: '0 0 10px rgba(255,0,255,0.8)' }} />
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-6">
          <div className="bg-[#151725] p-3 rounded-sm border-l-4 border-[#00ff9f] border-y border-r border-white/5 relative overflow-hidden group hover:bg-white/5 transition-colors">
            <div className="absolute right-0 top-0 w-16 h-16 bg-[#00ff9f]/5 rounded-bl-full blur-xl" />
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="w-3.5 h-3.5 text-[#00ff9f]" />
              <span className="text-[10px] font-mono uppercase text-[#00ff9f] tracking-wider">Income</span>
            </div>
            <p className="text-lg font-mono font-bold text-white truncate"
              style={{ textShadow: '0 0 5px rgba(0,255,159,0.5)' }}>
              +{formatCurrency(monthIncome)}
            </p>
          </div>
          <div className="bg-[#151725] p-3 rounded-sm border-l-4 border-[#ff00ff] border-y border-r border-white/5 relative overflow-hidden group hover:bg-white/5 transition-colors">
            <div className="absolute right-0 top-0 w-16 h-16 bg-[#ff00ff]/5 rounded-bl-full blur-xl" />
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#ff00ff]" />
              <span className="text-[10px] font-mono uppercase text-[#ff00ff] tracking-wider">Expenses</span>
            </div>
            <p className="text-lg font-mono font-bold text-white truncate"
              style={{ textShadow: '0 0 5px rgba(255,0,255,0.5)' }}>
              -{formatCurrency(monthExpense)}
            </p>
          </div>
        </div>

        {/* Analysis Protocol Chart */}
        <div className="px-4 mb-8">
          <div className="bg-[#151725] rounded-sm p-5 border border-white/10 relative">
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ffff]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00ffff]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00ffff]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ffff]" />

            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00ffff] animate-pulse" />
                  Weekly Overview
                </h3>
                <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase">
                  Cycle: {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(today.getFullYear(), today.getMonth() + 1, 0).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-1 border border-[#00ff9f]/30 bg-[#00ff9f]/5 px-2 py-1 rounded-sm">
                <TrendingUp className="w-4 h-4 text-[#00ff9f]" />
                <span className="text-xs font-mono font-bold text-[#00ff9f]">
                  {monthIncome > monthExpense ? '+' : ''}{monthIncome > 0 ? Math.round(((monthIncome - monthExpense) / monthIncome) * 100) : 0}%
                </span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-40 gap-3 px-2 pb-2 border-b border-l border-white/10"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
              {last7Days.slice(-4).map((day, i) => {
                const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
                const height = Math.max(day.income, day.expense);
                const heightPercent = (height / max) * 100;
                const isHighest = i === 2; // Highlight current week

                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                    <div className="w-full relative h-32 flex items-end justify-center">
                      <div className={cn(
                        'w-full border-2 transition-all duration-300 relative',
                        isHighest
                          ? 'border-[#00ffff] bg-[#00ffff]/20'
                          : 'border-[#bc13fe]/50 bg-[#bc13fe]/5 group-hover:bg-[#bc13fe]/20'
                      )}
                        style={{
                          height: `${heightPercent}%`,
                          boxShadow: isHighest ? '0 0 15px rgba(0,243,255,0.3)' : '0 0 10px rgba(188,19,254,0.1)'
                        }}>
                        <div className={cn('absolute top-0 w-full h-[2px]', isHighest ? 'bg-white' : 'bg-[#bc13fe]')}
                          style={{ boxShadow: isHighest ? '0 0 10px #fff' : '0 0 5px #bc13fe' }} />
                        {isHighest && (
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(transparent 50%, rgba(0,243,255,0.2) 50%)',
                            backgroundSize: '100% 4px',
                          }} />
                        )}
                      </div>
                    </div>
                    <span className={cn('text-[10px] font-mono font-bold uppercase',
                      isHighest ? 'text-[#00ffff]' : 'text-slate-500')}
                      style={isHighest ? { textShadow: '0 0 5px rgba(0,243,255,0.8)' } : {}}>
                      W{i + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Allocations */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider"
              style={{ textShadow: '0 0 5px rgba(255,0,255,0.7), 0 0 10px rgba(255,0,255,0.5)' }}>
              Expenses by Category
            </h3>
            <button className="text-[#00ffff] text-xs font-mono uppercase border border-[#00ffff]/30 px-2 py-1 rounded-sm hover:bg-[#00ffff]/10">
              Edit
            </button>
          </div>
          <div className="space-y-4">
            {topCategories.map((cat, i) => {
              const colors = ['#fcee0a', '#bc13fe'];
              const color = colors[i % colors.length];
              const percentage = monthExpense > 0 ? (cat.spent / monthExpense) * 100 : 0;

              return (
                <div key={cat.name} className="bg-[#151725] p-4 rounded-sm border border-white/10 group hover:border-opacity-50 transition-colors"
                  style={{ borderColor: `${color}50` }}>
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm border flex items-center justify-center"
                        style={{ borderColor: color, backgroundColor: `${color}10`, color: color, boxShadow: `0 0 8px ${color}30` }}>
                        {i === 0 ? <ShoppingCart className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white uppercase tracking-wide">{cat.name}</p>
                        <p className="text-xs text-slate-400 font-mono">SPENT: {formatCurrency(cat.spent)}</p>
                      </div>
                    </div>
                    <p className="text-sm font-mono" style={{ color, textShadow: `0 0 3px ${color}50` }}>
                      {Math.round(percentage)}%
                    </p>
                  </div>
                  <div className="w-full h-3 bg-black border border-white/20 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '4px 100%',
                    }} />
                    <div className="h-full relative" style={{ width: `${percentage}%`, backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}>
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Log Entries */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Recent Transactions</h3>
            <button className="text-[#00ffff] text-xs font-mono uppercase hover:underline hover:text-white">View All</button>
          </div>
          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <div className="p-8 bg-[#151725]/30 border border-white/10 text-center">
                <p className="text-slate-500 font-mono">NO_DATA_AVAILABLE</p>
              </div>
            ) : (
              recentTransactions.slice(0, 4).map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                const borderColor = isIncome ? '#00ff9f' : '#ff00ff';

                return (
                  <div key={t.id}
                    className="flex items-center justify-between p-3 rounded-sm bg-[#1e2136]/30 border border-transparent transition-all cursor-pointer group"
                    style={{ borderColor: 'transparent' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${borderColor}50`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-sm bg-black border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-white/40 transition-colors text-base shrink-0">
                        {cat?.icon || '💰'}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <p className="text-sm font-bold text-white uppercase tracking-wide truncate">{cat?.name || 'Unknown'}</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <p className="text-sm font-mono font-bold" style={{ color: borderColor }}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </p>
                      <button onClick={() => deleteTransaction(t.id)}
                        className="p-1 text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
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
            <button className="fixed bottom-24 right-6 w-14 h-14 bg-[#0b0c15] border-2 border-[#00ffff] text-[#00ffff] flex items-center justify-center transition-all hover:scale-105 active:scale-95 z-30 group"
              style={{ boxShadow: '0 0 20px rgba(0,243,255,0.4)' }}>
              <div className="absolute inset-0 bg-[#00ffff]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <Plus className="w-8 h-8 relative z-10" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#0b0c15] border-2 border-[#bc13fe] text-white max-w-[90vw] rounded-lg"
            style={{ boxShadow: '0 0 30px rgba(188,19,254,0.3)' }}>
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-orbitron)] text-[#00ffff] tracking-wider">
                NEW_TRANSACTION
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                <TabsList className="w-full grid grid-cols-2 bg-[#151725] rounded-lg">
                  <TabsTrigger value="expense" className="data-[state=active]:bg-[#ff00ff] data-[state=active]:text-black rounded-md cursor-pointer">
                    EXPENSE
                  </TabsTrigger>
                  <TabsTrigger value="income" className="data-[state=active]:bg-[#00ff9f] data-[state=active]:text-black rounded-md cursor-pointer">
                    INCOME
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-2">
                <Label className="text-[#ff00ff] text-xs font-bold uppercase">Amount</Label>
                <Input type="number" placeholder="0.00" value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="bg-[#151725] border-[#bc13fe]/50 text-white rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#ff00ff] text-xs font-bold uppercase">Category</Label>
                <Select value={newTransaction.categoryId}
                  onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                  <SelectTrigger className="bg-[#151725] border-[#bc13fe]/50 text-white rounded-lg cursor-pointer">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151725] border-[#bc13fe] rounded-lg z-[100]">
                    {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="cursor-pointer hover:bg-[#ff00ff]/20 focus:bg-[#ff00ff]/20 text-white">
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          <span>{cat.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#ff00ff] text-xs font-bold uppercase">Date</Label>
                  <Input type="date" value={newTransaction.date}
                    onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="bg-[#151725] border-[#bc13fe]/50 text-white rounded-lg cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#ff00ff] text-xs font-bold uppercase">Note</Label>
                  <Input placeholder="Optional" value={newTransaction.note}
                    onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                    className="bg-[#151725] border-[#bc13fe]/50 text-white rounded-lg" />
                </div>
              </div>
              <button onClick={handleAddTransaction} type="button"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#bc13fe] text-white font-[family-name:var(--font-orbitron)] tracking-wider hover:opacity-90 transition-opacity"
                style={{ boxShadow: '0 0 15px rgba(255,0,255,0.4)' }}>
                EXECUTE TRANSACTION
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
