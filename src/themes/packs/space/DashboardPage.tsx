'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Rocket, Star, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Orbit, Satellite, Moon } from 'lucide-react';
import Link from 'next/link';

export function SpaceDashboardPage({
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
    <div className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]"
      style={{ background: 'linear-gradient(180deg, #030014 0%, #0a0a2e 30%, #1a0a3e 60%, #0f0525 100%)' }}>
      
      {/* Animated Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(2px 2px at 10% 10%, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 40% 20%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 60% 40%, rgba(167,139,250,0.9), transparent),
            radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.6), transparent),
            radial-gradient(2px 2px at 90% 50%, rgba(139,92,246,0.8), transparent),
            radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.7), transparent),
            radial-gradient(2px 2px at 70% 70%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 50% 80%, rgba(167,139,250,0.6), transparent),
            radial-gradient(2px 2px at 15% 90%, rgba(255,255,255,0.8), transparent)
          `,
          backgroundSize: '100% 100%',
        }} />
        {/* Nebula effect */}
        <div className="absolute top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-40 -left-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header with Avatar */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center ring-2 ring-purple-400/30">
                  <Orbit className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#030014] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-purple-400 uppercase">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </p>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-violet-300 bg-clip-text text-transparent">
                  Mission Control
                </h1>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/5 border border-purple-500/20 flex items-center justify-center hover:bg-purple-500/10 transition-colors">
              <Satellite className="w-5 h-5 text-purple-400" />
            </button>
          </div>
        </header>

        {/* Orbit Progress Card */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-purple-900/40 to-violet-900/20 border border-purple-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <Moon className="w-full h-full text-purple-300" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Orbit className="w-4 h-4 text-purple-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-purple-400 uppercase">Orbit Progress</span>
            </div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-3xl font-bold text-white">{Math.round(progressValue)}%</p>
                <p className="text-xs text-purple-300/60">{completedToday} of {todayTasks.length} missions complete</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-purple-200">{pendingTasks} pending</span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-purple-950/50 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 relative"
                style={{ width: `${progressValue}%` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/30 to-green-900/20 border border-emerald-500/20 relative overflow-hidden">
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase mb-1">Credits In</p>
            <p className="text-xl font-bold text-emerald-300">{formatCurrency(monthIncome)}</p>
            <div className="mt-2 h-1 rounded-full bg-emerald-950/50 overflow-hidden">
              <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-600 to-green-500" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-rose-900/30 to-red-900/20 border border-rose-500/20 relative overflow-hidden">
            <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-[10px] font-bold tracking-wider text-rose-400 uppercase mb-1">Credits Out</p>
            <p className="text-xl font-bold text-rose-300">{formatCurrency(monthExpense)}</p>
            <div className="mt-2 h-1 rounded-full bg-rose-950/50 overflow-hidden">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-rose-600 to-red-500" />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-violet-900/40 border border-indigo-500/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(139,92,246,0.1) 50px, rgba(139,92,246,0.1) 51px)',
          }} />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-indigo-400 uppercase mb-1">Net Balance</p>
              <p className={cn('text-3xl font-bold', balance >= 0 ? 'text-white' : 'text-rose-400')}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className={cn('w-14 h-14 rounded-full flex items-center justify-center', 
              balance >= 0 ? 'bg-gradient-to-br from-violet-600 to-purple-700' : 'bg-gradient-to-br from-rose-600 to-red-700')}>
              <Rocket className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Missions List */}
        <div className="mb-6 rounded-2xl bg-slate-900/50 border border-purple-500/20 overflow-hidden">
          <div className="p-4 border-b border-purple-500/20 bg-purple-900/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white">Active Missions</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                {todayTasks.length} total
              </span>
            </div>
          </div>
          
          <div className="p-3">
            {todayTasks.length === 0 ? (
              <div className="py-8 text-center">
                <Orbit className="w-12 h-12 mx-auto text-purple-500/30 mb-2" />
                <p className="text-purple-400/50 text-sm">No missions scheduled</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task, index) => (
                  <div key={task.id}
                    className={cn('flex items-center gap-3 p-3 rounded-xl transition-all',
                      task.status === 'completed' 
                        ? 'bg-emerald-500/10 border border-emerald-500/20' 
                        : 'bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/30')}>
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold',
                      task.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
                      task.priority === 'high' ? 'bg-rose-500/20 text-rose-400' : 'bg-purple-500/20 text-purple-400')}>
                      {task.status === 'completed' ? '✓' : `0${index + 1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-medium truncate',
                        task.status === 'completed' ? 'line-through text-slate-500' : 'text-white')}>
                        {task.title}
                      </p>
                      {task.priority === 'high' && task.status !== 'completed' && (
                        <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">High Priority</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link href="/tasks" className="block mt-3">
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium hover:bg-purple-500/20 transition-colors">
                View All Missions
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-900/40 to-red-900/30 border border-rose-500/30 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-rose-300 font-bold">{overdueTasks} Overdue Mission{overdueTasks > 1 ? 's' : ''}</p>
                <p className="text-rose-400/60 text-xs">Requires immediate attention</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
              <Rocket className="w-4 h-4" />
              New Mission
            </button>
          </Link>
          <Link href="/financial">
            <button className="w-full py-4 rounded-xl bg-slate-800/50 border border-purple-500/20 text-purple-300 font-bold text-sm hover:bg-purple-500/10 transition-colors flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              Transaction
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
