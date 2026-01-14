'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, EyeOff, TrendingUp, ShoppingCart, Car } from 'lucide-react';

export function SynthwaveFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');
  const today = new Date();
  const topCategories = categorySpending.slice(0, 2);

  return (
    <div className="min-h-screen text-[#E5E5E5] font-[family-name:var(--font-vt323)]"
      style={{ backgroundColor: '#121212' }}>

      <div className="relative min-h-screen flex flex-col pb-24 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full shadow-2xl overflow-hidden bg-[#121212] border-x-2 border-[#525252]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sticky top-0 z-20 bg-[#121212] border-b-2 border-[#525252]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#E5E5E5] text-[#121212] flex items-center justify-center border border-[#525252]">
              <span className="font-[family-name:var(--font-press-start)] text-[8px]">$</span>
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest mt-1">
              FINANCIAL<span className="text-[#6366F1]"> OVERVIEW</span>
            </h2>
          </div>
          <button className="flex items-center justify-center w-10 h-10 border-2 border-[#525252] bg-[#1E1E1E] transition-all active:translate-x-[2px] active:translate-y-[2px] hover:bg-[#525252] hover:text-[#121212]"
            style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
            <EyeOff className="w-5 h-5" />
          </button>
        </div>

        {/* Period Filter */}
        <div className="flex gap-3 px-4 py-4 overflow-x-auto no-scrollbar w-full flex-nowrap border-b-2 border-[#525252] bg-[#1E1E1E]/50">
          <button className="flex-shrink-0 h-10 px-4 bg-[#6366F1] text-white text-xl leading-none border-2 border-[#525252] uppercase transition-all active:translate-x-[2px] active:translate-y-[2px]"
            style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
            Current
          </button>
          <button className="flex-shrink-0 h-10 px-4 bg-[#1E1E1E] text-[#E5E5E5] text-xl leading-none border-2 border-[#525252] uppercase transition-all active:translate-x-[2px] active:translate-y-[2px] hover:bg-[#525252] hover:text-[#121212]"
            style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
            {today.toLocaleDateString('en-US', { month: 'long' })}
          </button>
          <button className="flex-shrink-0 h-10 px-4 bg-[#1E1E1E] text-[#E5E5E5] text-xl leading-none border-2 border-[#525252] uppercase transition-all active:translate-x-[2px] active:translate-y-[2px] hover:bg-[#525252] hover:text-[#121212]"
            style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
            {today.getFullYear()}
          </button>
        </div>

        {/* Balance Display */}
        <div className="flex flex-col items-center pt-6 pb-4 px-4">
          <div className="border-2 border-[#525252] bg-[#1E1E1E] p-4 w-full text-center relative"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <div className="absolute top-1 left-1 w-1.5 h-1.5 border border-[#525252] bg-[#121212]" />
            <div className="absolute top-1 right-1 w-1.5 h-1.5 border border-[#525252] bg-[#121212]" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border border-[#525252] bg-[#121212]" />
            <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border border-[#525252] bg-[#121212]" />
            <p className="text-[#A3A3A3] text-lg uppercase mb-2 font-bold tracking-widest border-b border-[#525252]/50 pb-2 mx-4">
              Total Balance
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-[#E5E5E5] mt-2 truncate px-2">
              {formatCurrency(balance)}
            </h1>
          </div>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 px-4 mb-6">
          <div className="bg-[#1E1E1E] p-3 border-2 border-[#525252] relative group cursor-default hover:bg-[#525252] hover:text-[#121212] transition-all active:translate-y-1 min-w-0"
            style={{ boxShadow: '3px 3px 0px 0px #000000' }}>
            <div className="flex flex-col h-full justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-base uppercase font-bold truncate">Income</span>
                <div className="w-5 h-5 border border-[#10B981] flex items-center justify-center bg-[#10B981]/10 shrink-0 ml-1">
                  <Plus className="w-3 h-3 text-[#10B981]" />
                </div>
              </div>
              <p className="text-xl font-bold text-[#10B981] tracking-tighter truncate">+{formatCurrency(monthIncome)}</p>
            </div>
          </div>
          <div className="bg-[#1E1E1E] p-3 border-2 border-[#525252] relative group cursor-default hover:bg-[#525252] hover:text-[#121212] transition-all active:translate-y-1 min-w-0"
            style={{ boxShadow: '3px 3px 0px 0px #000000' }}>
            <div className="flex flex-col h-full justify-between gap-2">
              <div className="flex items-center justify-between">
                <span className="text-base uppercase font-bold truncate">Expenses</span>
                <div className="w-5 h-5 border border-[#EF4444] flex items-center justify-center bg-[#EF4444]/10 shrink-0 ml-1">
                  <span className="text-[#EF4444] font-bold text-sm">-</span>
                </div>
              </div>
              <p className="text-xl font-bold text-[#EF4444] tracking-tighter truncate">-{formatCurrency(monthExpense)}</p>
            </div>
          </div>
        </div>

        {/* Analysis Chart */}
        <div className="px-4 mb-8">
          <div className="bg-[#1E1E1E] border-2 border-[#525252] p-4"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <div className="flex items-center justify-between mb-6 border-b-2 border-[#525252]/30 pb-2">
              <div>
                <h3 className="text-2xl font-bold text-[#E5E5E5] uppercase leading-none">Weekly Overview</h3>
                <p className="text-lg text-[#A3A3A3] mt-1">
                  {today.toLocaleDateString('en-US', { month: 'short' })} 01 - 31
                </p>
              </div>
              <div className="flex items-center gap-1 bg-[#10B981]/10 px-2 py-1 border border-[#10B981] border-dashed">
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
                <span className="text-lg font-bold text-[#10B981] leading-none">12%</span>
              </div>
            </div>
            <div className="flex items-end justify-between h-40 gap-3 px-2 bg-[#121212] border-2 border-[#525252] p-2 relative">
              <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                style={{ backgroundImage: 'linear-gradient(#525252 1px, transparent 1px), linear-gradient(90deg, #525252 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              {['W1', 'W2', 'W3', 'W4'].map((week, i) => {
                const heights = [40, 65, 85, 30];
                const isHighlighted = i === 2;
                return (
                  <div key={week} className="flex flex-col items-center gap-1 flex-1 h-full justify-end z-10 group cursor-pointer">
                    <div className={cn(
                      'w-full border-2 border-[#525252] relative transition-colors',
                      isHighlighted ? 'bg-[#6366F1]' : 'bg-[#E5E5E5]/20 hover:bg-[#E5E5E5]/40'
                    )} style={{ height: `${heights[i]}%` }}>
                      <div className="w-full h-full opacity-40"
                        style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3) 50%)', backgroundSize: '100% 4px' }} />
                    </div>
                    <span className={cn('text-lg leading-none mt-1', isHighlighted ? 'font-bold text-[#6366F1]' : 'text-[#A3A3A3]')}>
                      {week}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Budgets */}
        <div className="px-4 mb-8">
          <div className="flex items-center justify-between mb-4 border-b-2 border-[#525252] pb-1">
            <h3 className="text-2xl font-bold uppercase">Expenses by Category</h3>
            <button className="text-[#6366F1] text-xl underline hover:no-underline hover:text-[#E5E5E5]">EDIT</button>
          </div>
          <div className="space-y-4">
            {topCategories.map((cat, i) => {
              const icons = [ShoppingCart, Car];
              const Icon = icons[i % icons.length];
              const percentage = cat.percentage || 0;
              const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
              return (
                <div key={cat.name} className="bg-[#1E1E1E] p-4 border-2 border-[#525252]"
                  style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-[#525252] bg-[#121212] flex items-center justify-center text-[#E5E5E5]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xl font-bold leading-none">{cat.name}</p>
                        <p className="text-lg text-[#A3A3A3] leading-none mt-1">${(cat.budget || 500) - cat.spent} rem.</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold">${cat.spent}<span className="text-[#A3A3A3]/50">/{cat.budget || 500}</span></p>
                  </div>
                  <div className="w-full h-6 border-2 border-[#525252] bg-[#121212] p-0.5 relative overflow-hidden">
                    <div
                      className={cn(
                        'h-full border-r-2 border-[#525252] relative transition-[width]',
                        i === 0 ? 'bg-[#EF4444]' : 'bg-[#6366F1]'
                      )}
                      style={{ width: `${clampedPercentage}%` }}
                    >
                      <div className="absolute inset-0 opacity-30"
                        style={{ backgroundImage: 'radial-gradient(#000000 1px, transparent 1px)', backgroundSize: '3px 3px' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transactions */}
        <div className="px-4 flex-1">
          <div className="flex items-center justify-between mb-4 border-b-2 border-[#525252] pb-1">
            <h3 className="text-2xl font-bold uppercase">Recent Transactions</h3>
            <button className="text-[#6366F1] text-xl underline hover:no-underline hover:text-[#E5E5E5]">ALL</button>
          </div>
          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[#A3A3A3]">No transactions yet</p>
              </div>
            ) : (
              recentTransactions.slice(0, 4).map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id}
                    className="flex items-center justify-between p-2 border-b-2 border-dashed border-[#525252]/30 hover:bg-[#525252] hover:text-[#121212] cursor-pointer group transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 border-2 border-[#525252] bg-[#121212] flex items-center justify-center group-hover:bg-[#121212] group-hover:text-[#E5E5E5] transition-colors text-[#A3A3A3]">
                        <span className="text-lg">{cat?.icon || '💰'}</span>
                      </div>
                      <div className="flex flex-col">
                        <p className="text-xl font-bold leading-none uppercase">{cat?.name || 'Unknown'}</p>
                        <p className="text-lg text-[#A3A3A3] group-hover:text-[#121212]/70 leading-none mt-1">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className={cn('text-xl font-bold', isIncome ? 'text-[#10B981] group-hover:text-[#121212]' : '')}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </p>
                      <button onClick={() => deleteTransaction(t.id)}
                        className="p-1 text-[#A3A3A3] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-all">
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
        <button
          onClick={() => setIsDialogOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-[#6366F1] text-white border-2 border-[#525252] flex items-center justify-center transition-all z-30 group active:translate-x-1 active:translate-y-1"
          style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
          <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    </div>
  );
}
