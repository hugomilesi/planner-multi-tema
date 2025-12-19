'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, ChevronRight, Check, Clock, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export function DarkAcademiaDashboardPage({
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
  const today = new Date();
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0, hasEvent: i === 2 };
  });

  return (
    <div className="min-h-screen bg-[#141414] font-sans text-white antialiased selection:bg-[#C5A065]/30">
      {/* Background gradient - DARK MODE */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#141414] to-[#0A0A0A] -z-10" />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24">
        {/* Header */}
        <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-10 bg-[#141414]/80 backdrop-blur-md border-b border-transparent transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-12 h-12 rounded-full ring-2 ring-[#C5A065]/30 group-hover:ring-[#C5A065]/60 transition-all shadow-md bg-gradient-to-br from-[#C5A065] to-[#A6854F] flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">A</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#141414]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-0.5">
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
              <h2 className="text-2xl font-serif font-semibold text-stone-100 leading-none">Hello, Alex</h2>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-full w-11 h-11 bg-[#1E1E1E] border border-[#333333] text-stone-200 hover:text-[#C5A065] transition-colors shadow-sm">
            <Bell className="w-5 h-5" />
          </button>
        </header>

        {/* Calendar Strip */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-6 py-2">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[3.5rem] h-20 rounded-2xl shrink-0 transition-all',
                  d.isToday
                    ? 'bg-[#C5A065] text-stone-900 shadow-xl shadow-[#C5A065]/10 transform scale-105 border border-[#C5A065]'
                    : 'bg-[#1E1E1E] text-stone-400 border border-[#333333] hover:border-[#C5A065]/50 group'
                )}>
                <span className={cn('text-[10px] font-bold uppercase tracking-wider mb-1', d.isToday && 'opacity-80')}>{d.day}</span>
                <span className={cn('text-xl font-serif font-bold', !d.isToday && 'group-hover:text-white')}>{d.date}</span>
                {(d.isToday || d.hasEvent) && <div className={cn('w-1 h-1 rounded-full mt-1', d.isToday ? 'bg-stone-900' : 'bg-stone-600')} />}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <div className="px-6 mt-6">
          <div className="flex flex-col gap-3 p-5 rounded-xl bg-[#1E1E1E] border border-[#333333] shadow-sm">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Daily Progress</p>
                <p className="text-lg font-serif font-bold text-white">Goal Tracker</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif font-bold text-[#C5A065]">{Math.round(progressValue)}</span>
                <span className="text-xs font-medium text-[#C5A065]">%</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-stone-800 overflow-hidden">
              <div className="h-full rounded-full bg-[#C5A065] shadow-[0_0_10px_rgba(197,160,101,0.5)]" style={{ width: `${progressValue}%` }} />
            </div>
          </div>
        </div>

        {/* Focus Card - with image background */}
        <div className="px-6 mt-6">
          <div className="flex flex-col items-stretch justify-end rounded-xl pt-32 shadow-xl shadow-stone-900/10 dark:shadow-black/30 overflow-hidden relative group cursor-pointer border border-white/5"
            style={{ 
              backgroundImage: 'linear-gradient(180deg, rgba(20, 20, 20, 0) 0%, rgba(20, 20, 20, 0.95) 100%), linear-gradient(135deg, rgba(60, 60, 80, 0.9) 0%, rgba(30, 30, 50, 0.95) 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md pl-2 pr-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C5A065] animate-pulse" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Priority</span>
            </div>
            <div className="flex w-full items-end justify-between gap-4 p-6 z-10">
              <div className="flex flex-1 flex-col">
                <p className="text-[#C5A065]/90 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Today's Focus</p>
                <p className="text-white text-2xl font-serif font-medium leading-tight mb-3">
                  {todayTasks.find(t => t.status !== 'completed')?.title || 'Client Meeting Presentation'}
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <p className="text-stone-300 text-sm tracking-wide">2:00 PM — 3:30 PM</p>
                </div>
              </div>
              <Link href="/tasks" className="bg-white/10 backdrop-blur-sm rounded-full p-3 text-white border border-white/10 hover:bg-white/20 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Budget Card */}
        <div className="px-6 mt-8">
          <div className="flex flex-col p-5 rounded-xl bg-[#1E1E1E] border border-[#333333] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C5A065]/20 via-[#C5A065] to-[#C5A065]/20" />
            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="text-base font-serif font-bold text-white">Monthly Budget</h3>
                <p className="text-xs text-stone-500 mt-1 font-medium">{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
              <button className="text-[#C5A065] hover:text-[#A6854F] transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-5 border-b border-stone-800 pb-5">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Spent</span>
                <span className="text-xl font-serif font-medium text-white truncate">{formatCurrency(monthExpense)}</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-stone-800 pl-4">
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Limit</span>
                <span className="text-xl font-serif font-medium text-stone-500 truncate">{formatCurrency(monthIncome)}</span>
              </div>
            </div>
            {/* Mini Chart */}
            <div className="flex items-end justify-between h-16 gap-1.5">
              {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                <div key={i} className={cn(
                  'flex-1 rounded-sm transition-all relative group',
                  i === 5 ? 'bg-[#C5A065] shadow-[0_0_15px_-3px_rgba(197,160,101,0.6)]' :
                  i >= 3 ? 'bg-[#C5A065]/30' : 'bg-stone-800'
                )} style={{ height: `${h}%` }}>
                  {i === 5 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Today
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between px-6 pb-4">
            <h3 className="text-xl font-serif font-bold text-white">Pending Tasks</h3>
            <span className="text-[10px] font-bold text-stone-500 bg-stone-800 px-3 py-1.5 rounded-full uppercase tracking-wider border border-stone-700">
              {pendingTasks} Remaining
            </span>
          </div>
          <div className="flex flex-col gap-3 px-6">
            {todayTasks.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-[#1E1E1E] border border-[#333333]">
                <div className="text-4xl mb-2">📚</div>
                <p className="text-stone-500 text-sm font-serif italic">No tasks scheduled</p>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task) => (
                <label key={task.id}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-[#1E1E1E] border border-[#333333] active:scale-[0.99] transition-all cursor-pointer hover:shadow-md hover:border-[#C5A065]/30">
                  <div className="relative flex items-center justify-center">
                    <div className={cn(
                      'h-5 w-5 rounded border transition-all flex items-center justify-center',
                      task.status === 'completed'
                        ? 'border-[#C5A065] bg-[#C5A065]'
                        : 'border-stone-600'
                    )}>
                      {task.status === 'completed' && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className={cn(
                      'text-sm font-medium font-serif transition-colors truncate',
                      task.status === 'completed' ? 'line-through text-stone-600' : 'text-white'
                    )}>
                      {task.title}
                    </span>
                    <span className="text-xs text-stone-500 mt-0.5">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
                    </span>
                  </div>
                  {task.priority === 'high' && task.status !== 'completed' && (
                    <span className="text-xs font-serif italic text-[#C5A065] shrink-0">Medium</span>
                  )}
                </label>
              ))
            )}
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
