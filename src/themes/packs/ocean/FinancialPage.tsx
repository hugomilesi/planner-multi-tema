'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Wallet } from 'lucide-react';

export function OceanFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, deleteTransaction,
}: FinancialPageProps) {
  const today = new Date();

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-[family-name:var(--font-inter)] text-[#111418] dark:text-white pb-24">
      <div className="relative z-10 px-4 pt-6">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-[#637588] dark:text-[#9dabb9] text-sm font-medium">
              {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <h1 className="text-[28px] font-bold tracking-tight">Financial Overview</h1>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-12 h-12 rounded-full bg-[#137fec] text-white flex items-center justify-center shadow-lg shadow-[#137fec]/30"
          >
            <Plus className="w-5 h-5" />
          </button>
        </header>

        {/* Balance Card */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-[#137fec] to-[#0ea5e9] text-white shadow-lg shadow-[#137fec]/20">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-white/80 text-xs font-medium mb-1">Total Balance</p>
              <p className="text-2xl font-bold truncate">{formatCurrency(balance)}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 ml-3">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] shadow-sm">
            <p className="text-xs text-[#637588] dark:text-[#9dabb9] font-medium mb-1">Income</p>
            <p className="text-xl font-bold text-green-500">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] shadow-sm">
            <p className="text-xs text-[#637588] dark:text-[#9dabb9] font-medium mb-1">Expenses</p>
            <p className="text-xl font-bold text-[#111418] dark:text-white">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">Weekly Overview</h3>
            <button className="text-[#137fec] text-xs font-bold uppercase tracking-wide px-3 py-1 bg-[#137fec]/10 rounded-full">
              Details
            </button>
          </div>
          <div className="h-32 flex items-end gap-1.5">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              const isToday = i === last7Days.length - 2;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center h-24">
                    <div className={cn(
                      'w-full rounded-t-sm transition-all',
                      isToday ? 'bg-[#137fec]' : 'bg-slate-100 dark:bg-slate-700/50'
                    )} style={{ height: `${Math.max(5, ((day.income + day.expense) / max) * 100)}% ` }} />
                  </div>
                  <span className="text-[10px] text-[#637588] dark:text-[#9dabb9] font-medium">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-2xl bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-[#e5e7eb] dark:border-[#283039] flex items-center justify-between">
            <h3 className="text-base font-bold">Recent Transactions</h3>
            <span className="text-xs text-[#637588] dark:text-[#9dabb9]">{recentTransactions.length} items</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-4xl mb-2">💳</div>
                <p className="text-[#637588] dark:text-[#9dabb9] text-sm">No transactions yet</p>
              </div>
            ) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const isIncome = t.type === 'income';
                return (
                  <div key={t.id} className="flex items-center justify-between p-4 border-b border-[#e5e7eb] dark:border-[#283039] last:border-b-0 group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-lg',
                        isIncome ? 'bg-green-100 dark:bg-green-500/20' : 'bg-slate-100 dark:bg-slate-700'
                      )}>
                        {cat?.icon || '💰'}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{cat?.name || 'Unknown'}</p>
                        <p className="text-xs text-[#637588] dark:text-[#9dabb9]">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-bold', isIncome ? 'text-green-500' : 'text-[#111418] dark:text-white')}>
                        {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)}
                        className="p-1 text-[#9dabb9] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
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
