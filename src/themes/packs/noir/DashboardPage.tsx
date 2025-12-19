'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Eye, FileText, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Search, Clock, Cigarette } from 'lucide-react';
import Link from 'next/link';

export function NoirDashboardPage({
  todayTasks,
  completedToday,
  pendingTasks,
  overdueTasks,
  progressValue,
  monthIncome,
  monthExpense,
  balance,
  formatCurrency,
}: DashboardPageProps) {
  return (
    <div className="min-h-screen text-white font-mono">
      {/* Film noir background with vignette */}
      <div className="fixed inset-0 bg-black" />
      <div className="fixed inset-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
      }} />
      {/* Film grain effect */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      {/* Venetian blind shadows */}
      <div className="fixed top-0 left-0 right-0 h-64 opacity-10" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 22px)',
        transform: 'skewY(-5deg)',
      }} />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header - Detective's Desk */}
        <header className="mb-8 pb-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-gray-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.3em] text-gray-600 uppercase">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
                <h1 className="text-xl font-bold tracking-wider uppercase text-gray-200">
                  Case File #247
                </h1>
              </div>
            </div>
            <button className="w-10 h-10 border border-gray-800 flex items-center justify-center hover:bg-gray-900 transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Case Progress - Typewriter style */}
        <div className="mb-6 p-5 border border-gray-800 relative">
          <div className="absolute top-0 left-4 -translate-y-1/2 bg-black px-2">
            <span className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">Investigation Progress</span>
          </div>
          <div className="flex items-end justify-between mb-4 mt-2">
            <div>
              <p className="text-4xl font-bold text-white tracking-tight">{Math.round(progressValue)}%</p>
              <p className="text-[10px] text-gray-600 tracking-wider mt-1">{completedToday} of {todayTasks.length} cases closed</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-800">
              <Clock className="w-3 h-3 text-gray-600" />
              <span className="text-[10px] text-gray-500 tracking-wider">{pendingTasks} OPEN</span>
            </div>
          </div>
          {/* Noir-style progress bar */}
          <div className="h-1 bg-gray-900 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-gray-600 via-white to-gray-600 relative"
              style={{ width: `${progressValue}%` }}>
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 8px)',
              }} />
            </div>
          </div>
        </div>

        {/* Stats - Ledger style */}
        <div className="mb-6 border border-gray-800 divide-y divide-gray-800">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-gray-800 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">Income</p>
                <p className="text-lg text-white font-bold">{formatCurrency(monthIncome)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-700">VERIFIED</p>
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-gray-800 flex items-center justify-center">
                <TrendingDown className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-[10px] text-gray-600 tracking-[0.2em] uppercase">Expenses</p>
                <p className="text-lg text-gray-400 font-bold">{formatCurrency(monthExpense)}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-700">LOGGED</p>
            </div>
          </div>
        </div>

        {/* Balance - Safe deposit */}
        <div className="mb-6 p-5 border-2 border-gray-700 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-4">
            <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">Net Balance</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className={cn('text-3xl font-bold tracking-tight', balance >= 0 ? 'text-white' : 'text-gray-500')}>
              {formatCurrency(balance)}
            </p>
            <div className={cn('w-12 h-12 border-2 flex items-center justify-center',
              balance >= 0 ? 'border-gray-600' : 'border-gray-800')}>
              <Eye className={cn('w-6 h-6', balance >= 0 ? 'text-gray-400' : 'text-gray-700')} />
            </div>
          </div>
        </div>

        {/* Cases - Filing cabinet */}
        <div className="mb-6 border border-gray-800">
          <div className="p-4 border-b border-gray-800 bg-gray-950">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-bold text-gray-300 tracking-wider uppercase">Open Cases</span>
              </div>
              <span className="text-gray-600 text-xs font-bold">{todayTasks.length} FILES</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-900">
            {todayTasks.length === 0 ? (
              <div className="py-12 text-center">
                <Cigarette className="w-8 h-8 mx-auto text-gray-800 mb-3" />
                <p className="text-gray-700 text-[10px] tracking-[0.2em] uppercase">No open cases</p>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task, index) => (
                <div key={task.id} className={cn('p-4 flex items-center gap-4 transition-colors hover:bg-gray-950',
                  task.status === 'completed' && 'opacity-50')}>
                  <div className={cn('w-8 h-8 flex items-center justify-center text-[10px] font-bold border',
                    task.status === 'completed' ? 'border-gray-800 text-gray-700' :
                    task.priority === 'high' ? 'border-gray-600 text-gray-400' : 'border-gray-800 text-gray-600')}>
                    {task.status === 'completed' ? '✓' : `#${index + 1}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm truncate',
                      task.status === 'completed' ? 'line-through text-gray-700' : 'text-gray-300')}>
                      {task.title}
                    </p>
                    {task.priority === 'high' && task.status !== 'completed' && (
                      <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Priority</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <Link href="/tasks" className="block">
            <div className="p-3 border-t border-gray-800 flex items-center justify-center gap-2 text-gray-600 text-[10px] tracking-[0.2em] uppercase hover:bg-gray-950 transition-colors">
              View All Cases
              <ChevronRight className="w-3 h-3" />
            </div>
          </Link>
        </div>

        {/* Cold Cases Alert */}
        {overdueTasks > 0 && (
          <div className="p-4 border-2 border-gray-700 mb-6 relative">
            <div className="absolute -top-2 left-4 bg-black px-2">
              <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Alert</span>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <div className="w-10 h-10 border border-gray-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="text-gray-300 font-bold tracking-wider uppercase">
                  {overdueTasks} Cold Case{overdueTasks > 1 ? 's' : ''}
                </p>
                <p className="text-gray-600 text-[10px] tracking-wider">Requires investigation</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-0">
          <Link href="/tasks">
            <button className="w-full py-4 bg-white text-black text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              New Case
            </button>
          </Link>
          <Link href="/financial">
            <button className="w-full py-4 border border-gray-800 border-l-0 text-gray-500 text-[10px] tracking-[0.2em] uppercase hover:bg-gray-950 transition-colors flex items-center justify-center gap-2">
              <Eye className="w-4 h-4" />
              Transaction
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
