'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Waves, Wallet } from 'lucide-react';
import { PeriodFilter } from '@/components/financial/PeriodFilter';
import { ExportButtons } from '@/components/financial/ExportButtons';

export function OceanFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, filteredTransactions, categories,
  isDialogOpen, setIsDialogOpen, deleteTransaction,
  selectedPeriod, setSelectedPeriod,
  chartData, chartView, setChartView,
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
            <div>
              <h3 className="text-base font-bold">Spending Analysis</h3>
              <p className="text-xs text-[#637588] dark:text-[#9dabb9] mt-0.5">
                {chartView === 'weekly' ? 'Week 1 - Week 4' : chartView === 'monthly' ? 'Last 12 Months' : 'Last 4 Years'}
              </p>
            </div>
          </div>

          {/* Chart View Filters */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setChartView('weekly')}
              className={cn(
                "px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full transition-colors",
                chartView === 'weekly'
                  ? 'bg-[#137fec] text-white'
                  : 'bg-[#137fec]/10 text-[#137fec] hover:bg-[#137fec]/20'
              )}
            >
              Week
            </button>
            <button
              onClick={() => setChartView('monthly')}
              className={cn(
                "px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full transition-colors",
                chartView === 'monthly'
                  ? 'bg-[#137fec] text-white'
                  : 'bg-[#137fec]/10 text-[#137fec] hover:bg-[#137fec]/20'
              )}
            >
              Month
            </button>
            <button
              onClick={() => setChartView('yearly')}
              className={cn(
                "px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full transition-colors",
                chartView === 'yearly'
                  ? 'bg-[#137fec] text-white'
                  : 'bg-[#137fec]/10 text-[#137fec] hover:bg-[#137fec]/20'
              )}
            >
              Year
            </button>
          </div>
          <div className="h-32 flex items-end gap-1.5">
            {chartData.map((item, i) => {
              const max = Math.max(...chartData.map(d => d.amount)) || 1;
              const sqrtValue = Math.sqrt(item.amount);
              const sqrtMax = Math.sqrt(max);
              let heightPercent = (sqrtValue / sqrtMax) * 100;
              if (item.amount > 0 && heightPercent < 5) heightPercent = 5;
              const isHighlighted = item.pattern === 'striped';
              return (
                <div key={item.week} className="flex-1 flex flex-col items-center justify-end h-full gap-1">
                  <div className="w-full flex items-end justify-center" style={{ height: `${heightPercent}%` }}>
                    <div className={cn(
                      'w-full h-full rounded-t-sm transition-all',
                      isHighlighted ? 'bg-[#137fec]' : 'bg-slate-100 dark:bg-slate-700/50'
                    )} />
                  </div>
                  <span className="text-[10px] text-[#637588] dark:text-[#9dabb9] font-medium">{item.week}</span>
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
