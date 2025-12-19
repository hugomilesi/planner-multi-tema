'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Music, Zap, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Sun } from 'lucide-react';
import Link from 'next/link';

export function SynthwaveDashboardPage({
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
    <div 
      className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]"
      style={{
        background: 'linear-gradient(180deg, #1a0533 0%, #2d1b4e 40%, #1a0533 100%)',
      }}
    >
      {/* Sun/horizon */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-48 opacity-30"
        style={{
          background: 'linear-gradient(0deg, #ff6ec7 0%, #ffcc00 30%, transparent 100%)',
        }}
      />
      
      {/* Grid floor */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#ff6ec7 1px, transparent 1px), linear-gradient(90deg, #ff6ec7 1px, transparent 1px)',
          backgroundSize: '40px 20px',
          transform: 'perspective(200px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-[#ff6ec7] text-xs tracking-[0.2em] mb-1">
            <Music className="w-3 h-3" />
            <span>RETRO DASHBOARD</span>
          </div>
          <h1 
            className="text-4xl font-bold"
            style={{
              background: 'linear-gradient(180deg, #ff6ec7 0%, #ffcc00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            OVERVIEW
          </h1>
          <p className="text-xs text-[#ff6ec7]/60 mt-1">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </header>

        {/* Progress */}
        <div 
          className="mb-6 p-4 border-2 border-[#ff6ec7]/50 bg-[#2d1b4e]/80"
          style={{
            clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#ff6ec7]">Daily Progress</span>
            <span className="text-[#ffcc00] font-bold">{Math.round(progressValue)}%</span>
          </div>
          <div className="h-3 bg-[#1a0533]">
            <div 
              className="h-full bg-gradient-to-r from-[#ff6ec7] to-[#ffcc00] transition-all duration-500"
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <p className="text-xs text-[#ff6ec7]/60 mt-2">
            {completedToday} / {todayTasks.length} tasks done
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div 
            className="p-4 border-2 border-[#00ff88]/50 bg-[#002211]/50"
            style={{
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#00ff88]" />
              <span className="text-xs text-[#00ff88]">Income</span>
            </div>
            <p className="text-xl font-bold text-[#00ff88]">
              {formatCurrency(monthIncome)}
            </p>
          </div>

          <div 
            className="p-4 border-2 border-red-500/50 bg-[#220000]/50"
            style={{
              clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-400">Expenses</span>
            </div>
            <p className="text-xl font-bold text-red-400">
              {formatCurrency(monthExpense)}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div 
          className="mb-6 p-4 border-2 border-[#ffcc00]/50 bg-[#2d1b4e]/80"
          style={{
            clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-[#ffcc00]">Balance</span>
              <p className={cn(
                'text-2xl font-bold',
                balance >= 0 ? 'text-[#ffcc00]' : 'text-red-400'
              )}>
                {formatCurrency(balance)}
              </p>
            </div>
            <Sun className={cn('w-8 h-8', balance >= 0 ? 'text-[#ffcc00]' : 'text-red-400')} />
          </div>
        </div>

        {/* Tasks */}
        <div 
          className="mb-6 border-2 border-[#ff6ec7]/50 bg-[#2d1b4e]/80 overflow-hidden"
          style={{
            clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
          }}
        >
          <div className="p-3 border-b-2 border-[#ff6ec7]/30 flex items-center justify-between">
            <span className="text-sm text-[#ff6ec7]">Today's Tasks</span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ffcc00]" />
              <span className="text-[#ffcc00] text-sm">{pendingTasks}</span>
            </div>
          </div>
          
          <div className="p-3">
            {todayTasks.length === 0 ? (
              <p className="text-center text-[#ff6ec7]/50 text-sm py-4">
                No tasks for today
              </p>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    className={cn(
                      'flex items-center gap-3 p-2 border-l-4',
                      task.status === 'completed' 
                        ? 'border-l-[#00ff88] opacity-50' 
                        : task.priority === 'high' 
                        ? 'border-l-red-500' 
                        : 'border-l-[#ff6ec7]'
                    )}
                  >
                    <span className={cn(
                      'text-sm flex-1 truncate',
                      task.status === 'completed' && 'line-through'
                    )}>
                      {task.title}
                    </span>
                    {task.priority === 'high' && task.status !== 'completed' && (
                      <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-red-500 to-orange-500 text-white">
                        HOT!
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <Link href="/tasks" className="block mt-3">
              <div className="flex items-center justify-center gap-2 py-2 border-2 border-[#ff6ec7]/50 text-[#ff6ec7] text-sm hover:bg-[#ff6ec7]/10 transition-colors">
                View All Tasks
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Overdue */}
        {overdueTasks > 0 && (
          <div className="p-4 border-2 border-red-500 bg-red-500/10 mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-red-400 font-bold">
                  {overdueTasks} OVERDUE TASK{overdueTasks > 1 ? 'S' : ''}
                </p>
                <p className="text-red-400/60 text-xs">Needs attention!</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <button 
              className="w-full py-3 bg-gradient-to-r from-[#ff6ec7] to-[#ffcc00] text-black font-bold hover:opacity-90 transition-opacity"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              + NEW TASK
            </button>
          </Link>
          <Link href="/financial">
            <button 
              className="w-full py-3 border-2 border-[#00ffff] text-[#00ffff] font-bold hover:bg-[#00ffff]/10 transition-colors"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              + TRANSACTION
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
