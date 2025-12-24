'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Plane, ArrowDownLeft, ArrowUpRight, Utensils, Bus, Eye } from 'lucide-react';

export function NordicFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, deleteTransaction,
}: FinancialPageProps) {
  const today = new Date();
  const currentMonth = today.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1).toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div className="min-h-screen text-[#2c2825] antialiased pb-24 relative" style={{ fontFamily: '"DM Sans", sans-serif' }}>
      {/* Airmail border stripes */}
      <div className="fixed top-0 left-0 right-0 h-3 z-50" style={{
        background: 'repeating-linear-gradient(135deg, #c24d3b 0px, #c24d3b 10px, white 10px, white 20px, #3d5a6b 20px, #3d5a6b 30px, white 30px, white 40px)'
      }} />
      <div className="fixed bottom-0 left-0 right-0 h-3 z-50" style={{
        background: 'repeating-linear-gradient(135deg, #c24d3b 0px, #c24d3b 10px, white 10px, white 20px, #3d5a6b 20px, #3d5a6b 30px, white 30px, white 40px)'
      }} />

      {/* Gradient background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'linear-gradient(180deg, #f4e4d8 0%, #f0d5c0 20%, #e8c4a8 50%, #d8b098 80%, #c89878 100%)'
      }} />
      <div className="fixed inset-0 -z-10 opacity-20 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />

      <div className="relative z-10 px-4 pt-8">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#c24d3b]" />
            <h1 className="text-xl font-bold uppercase tracking-widest text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>Travel Log</h1>
          </div>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#5d5650] hover:bg-white/50 transition-colors">
            <Eye className="w-5 h-5" />
          </button>
        </header>

        {/* Month Tabs */}
        <div className="flex gap-2 mb-6">
          <button className="px-4 py-2 rounded-lg bg-[#c24d3b] text-white text-xs font-bold uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>
            Current
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/80 text-[#5d5650] text-xs font-bold uppercase tracking-wider border border-[#d1c7b0]" style={{ fontFamily: '"Courier Prime", monospace' }}>
            {prevMonth} '{today.getFullYear().toString().slice(-2)}
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/80 text-[#5d5650] text-xs font-bold uppercase tracking-wider border border-[#d1c7b0]" style={{ fontFamily: '"Courier Prime", monospace' }}>
            Sep '{today.getFullYear().toString().slice(-2)}
          </button>
        </div>

        {/* Trip Balance Card */}
        <div className="relative bg-gradient-to-br from-[#e8dfc5] to-[#d8c8b0] rounded-xl p-5 mb-4 shadow-md border border-[#c8b8a0]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-[#5d5650] uppercase tracking-widest mb-1" style={{ fontFamily: '"Courier Prime", monospace' }}>Total Balance</p>
              <p className="text-4xl font-bold text-[#2c2825]" style={{ fontFamily: '"Playfair Display", serif' }}>{formatCurrency(balance)}</p>
            </div>
            <div className="bg-[#c24d3b] text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-wider rotate-6 border border-[#a03d2d]" style={{ fontFamily: '"Courier Prime", monospace' }}>
              Verified
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-dashed border-[#b8a890]">
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#5d5650] uppercase" style={{ fontFamily: '"Courier Prime", monospace' }}>From:</span>
              <span className="text-xs font-bold text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>HOME</span>
            </div>
            <Plane className="w-4 h-4 text-[#5d5650]" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#5d5650] uppercase" style={{ fontFamily: '"Courier Prime", monospace' }}>To:</span>
              <span className="text-xs font-bold text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>WORLD</span>
            </div>
          </div>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/95 rounded-xl p-4 shadow-md border border-[#d1c7b0]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#3d5a6b]/10 flex items-center justify-center">
                <ArrowDownLeft className="w-4 h-4 text-[#3d5a6b]" />
              </div>
              <span className="text-[10px] text-[#5d5650] uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Income</span>
            </div>
            <p className="text-xl font-bold text-[#3d5a6b]" style={{ fontFamily: '"Playfair Display", serif' }}>+{formatCurrency(monthIncome)}</p>
          </div>
          <div className="bg-white/95 rounded-xl p-4 shadow-md border border-[#d1c7b0]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#c24d3b]/10 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-[#c24d3b]" />
              </div>
              <span className="text-[10px] text-[#5d5650] uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Expenses</span>
            </div>
            <p className="text-xl font-bold text-[#c24d3b]" style={{ fontFamily: '"Playfair Display", serif' }}>-{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        {/* Spending Map */}
        <div className="bg-gradient-to-br from-[#e8e0d0] to-[#d8d0c0] rounded-xl p-4 mb-6 shadow-md border border-[#c8c0b0]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>Spending Chart</h3>
            <span className="text-[10px] text-[#3d5a6b] font-bold" style={{ fontFamily: '"Courier Prime", monospace' }}>+12% vs last trip</span>
          </div>
          <p className="text-[10px] text-[#5d5650] mb-3" style={{ fontFamily: '"Courier Prime", monospace' }}>
            {currentMonth} 1 - {currentMonth} {new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()}
          </p>
          {/* Chart */}
          <div className="flex items-end gap-2 h-20 border-b-2 border-[#2c2825] pb-0">
            {last7Days.slice(0, 4).map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              const height = Math.max(15, ((day.income + day.expense) / max) * 100);
              const isHighlighted = i === 2;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className={cn(
                    'w-full rounded-t',
                    isHighlighted ? 'bg-[#3d5a6b]' : 'bg-[#c8b8a0]'
                  )} style={{ height: `${height}%` }} />
                  <span className={cn(
                    'text-[9px] uppercase',
                    isHighlighted ? 'text-[#3d5a6b] font-bold' : 'text-[#8a8078]'
                  )} style={{ fontFamily: '"Courier Prime", monospace' }}>WK {i + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categories/Budgets Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>Categories</h3>
            <button className="text-[10px] text-[#c24d3b] font-bold uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Adjust</button>
          </div>
          <div className="space-y-3">
            {categorySpending.slice(0, 2).map((cat) => (
              <div key={cat.id} className="bg-white/95 rounded-xl p-4 shadow-md border border-[#d1c7b0]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#f4ecd8] flex items-center justify-center text-lg">
                      {cat.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm uppercase tracking-wide text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>{cat.name}</p>
                      <p className="text-[10px] text-[#8a8078]" style={{ fontFamily: '"Courier Prime", monospace' }}>${Math.max(0, (cat.budget || 500) - cat.spent).toFixed(0)} remaining</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>{formatCurrency(cat.spent)} / {formatCurrency(cat.budget || 500)}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-[#e8dfc5] overflow-hidden">
                  <div className="h-full rounded-full bg-[#c24d3b]" style={{ width: `${cat.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log / Recent Transactions */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#2c2825]" style={{ fontFamily: '"Courier Prime", monospace' }}>Recent Transactions</h3>
            <button className="text-[10px] text-[#c24d3b] font-bold uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>View All</button>
          </div>
          <div className="bg-white/95 rounded-xl shadow-md border border-[#d1c7b0] overflow-hidden">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-3xl mb-2">✈️</div>
                <p className="text-[#8a8078] italic" style={{ fontFamily: '"Playfair Display", serif' }}>No expenses logged</p>
              </div>
            ) : (
              recentTransactions.slice(0, 4).map((t, i) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id} className={cn(
                    "flex items-center justify-between p-4 group hover:bg-[#f4ecd8]/50 transition-colors",
                    i < recentTransactions.length - 1 && "border-b border-[#e8dfc5]"
                  )}>
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0',
                        isIncome ? 'bg-[#3d5a6b]/10' : 'bg-[#f4ecd8]'
                      )}>
                        {cat?.icon || '💰'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-sm uppercase tracking-wide text-[#2c2825] truncate" style={{ fontFamily: '"Courier Prime", monospace' }}>{cat?.name || 'Unknown'}</p>
                        <p className="text-[10px] text-[#8a8078]" style={{ fontFamily: '"Courier Prime", monospace' }}>
                          {t.note || 'TXN'} • {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={cn('font-bold text-sm', isIncome ? 'text-[#3d5a6b]' : 'text-[#2c2825]')} style={{ fontFamily: '"Courier Prime", monospace' }}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)}
                        className="text-[#c8b8a8] hover:text-[#c24d3b] transition-colors opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Add Transaction FAB */}
        <button
          onClick={() => setIsDialogOpen(true)}
          className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-[#c24d3b] text-white flex items-center justify-center shadow-lg shadow-[#c24d3b]/30 border-4 border-white z-40 hover:scale-105 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
