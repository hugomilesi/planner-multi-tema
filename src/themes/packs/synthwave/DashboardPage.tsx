'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, Check, Clock, ChevronRight } from 'lucide-react';
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
  userName = 'User',
}: DashboardPageProps) {
  const today = new Date();
  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen text-white font-[family-name:var(--font-vt323)]"
      style={{ backgroundColor: '#1a1a1a', imageRendering: 'pixelated' }}>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-28">
        {/* Header */}
        <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-30 bg-[#1a1a1a]/95 border-b-4 border-white backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-white bg-[#4f46e5] flex items-center justify-center"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              <span className="text-white font-[family-name:var(--font-press-start)] text-xs">:)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm uppercase tracking-widest text-gray-400">
                {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
              </span>
              <h2 className="text-xs font-[family-name:var(--font-press-start)] leading-tight mt-1 text-[#fbbf24]">
                Hi, {userName}
              </h2>
            </div>
          </div>
          <button className="flex items-center justify-center w-10 h-10 bg-gray-800 border-2 border-white text-white hover:bg-[#4f46e5] transition-none"
            style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
            <Bell className="w-5 h-5" />
          </button>
        </header>

        {/* Date Selector */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-2">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[3.5rem] h-16 border-2 shrink-0 transition-none active:translate-x-[2px] active:translate-y-[2px]',
                  d.isToday
                    ? 'bg-[#4f46e5] text-white border-white'
                    : 'bg-gray-800 text-white border-gray-500 hover:bg-gray-700'
                )}
                style={{ boxShadow: d.isToday ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000' }}>
                <span className="text-sm uppercase">{d.day}</span>
                <span className="text-sm font-[family-name:var(--font-press-start)] mt-1">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Card */}
        <div className="px-4 mt-6">
          <div className="flex flex-col gap-3 p-4 bg-gray-800 border-2 border-white"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <div className="flex justify-between items-center">
              <p className="text-xs font-[family-name:var(--font-press-start)] text-white uppercase tracking-tighter">LVL. Progress</p>
              <p className="text-xl font-bold text-[#fbbf24]">{Math.round(progressValue)}%</p>
            </div>
            <div className="h-4 w-full border-2 border-white bg-gray-700 p-0.5">
              <div className="h-full bg-[#fbbf24] relative" style={{ width: `${progressValue}%` }}>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-30" />
              </div>
            </div>
          </div>
        </div>

        {/* Current Quest Card */}
        <div className="px-4 mt-8">
          <div className="bg-cover bg-center flex flex-col items-stretch justify-end pt-24 border-2 border-white relative cursor-pointer transition-none active:translate-x-[4px] active:translate-y-[4px]"
            style={{
              boxShadow: '4px 4px 0px 0px #000000',
              backgroundImage: 'linear-gradient(180deg, rgba(79, 70, 229, 0) 0%, rgba(0, 0, 0, 1) 100%), linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            }}>
            <div className="absolute top-0 right-0 bg-[#ef4444] text-white border-b-2 border-l-2 border-black px-2 py-2">
              <span className="text-[10px] font-[family-name:var(--font-press-start)] uppercase leading-none">!!! PRIORITY</span>
            </div>
            <div className="flex w-full items-end justify-between gap-4 p-4 z-10">
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-[#fbbf24] text-sm uppercase tracking-wider mb-1">&gt; Current Quest</p>
                <p className="text-white text-lg font-[family-name:var(--font-press-start)] leading-snug">
                  {todayTasks.find(t => t.status !== 'completed')?.title || 'No Active Quest'}
                </p>
                <div className="flex items-center gap-2 mt-2 bg-black/50 p-1 w-fit border border-white/20">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-white text-base">14:00 - 15:30</span>
                </div>
              </div>
              <Link href="/tasks" className="bg-[#4f46e5] border-2 border-white p-2 text-white hover:bg-white hover:text-[#4f46e5] transition-colors">
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Budget Stats */}
        <div className="px-4 mt-8">
          <div className="flex flex-col gap-4 p-5 bg-gray-800 border-2 border-white"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <div className="flex justify-between items-start border-b-2 border-dashed border-gray-600 pb-3">
              <div>
                <h3 className="text-xs font-[family-name:var(--font-press-start)] text-white uppercase">Budget_Stats</h3>
                <p className="text-lg text-gray-400 mt-1">{today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}.dat</p>
              </div>
              <Link href="/financial" className="text-white text-xs font-[family-name:var(--font-press-start)] uppercase px-2 py-1 border-2 border-white hover:bg-white hover:text-black transition-colors">
                [View]
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 border-r-2 border-gray-700 min-w-0 pr-2">
                <span className="text-sm text-gray-400 uppercase">Spent</span>
                <span className="text-base font-[family-name:var(--font-press-start)] text-[#ef4444] truncate">{formatCurrency(monthExpense)}</span>
              </div>
              <div className="flex flex-col gap-1 pl-2 min-w-0">
                <span className="text-sm text-gray-400 uppercase">Limit</span>
                <span className={cn('text-base font-[family-name:var(--font-press-start)] truncate', balance >= 0 ? 'text-white' : 'text-[#ef4444]')}>
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-16 mt-2 border-b-2 border-white pb-0">
              {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                <div key={i} className={cn(
                  'flex-1 border-x-2 border-t-2 transition-all',
                  i === 5 ? 'bg-[#4f46e5] border-white' :
                  i >= 3 ? 'bg-[#4f46e5]/60 border-white' : 'bg-gray-700 border-white/10'
                )} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-4 pb-2">
            <h3 className="text-xs font-[family-name:var(--font-press-start)] uppercase leading-tight text-white">Pending_Tasks</h3>
            <span className="text-sm text-black bg-[#fbbf24] px-2 py-0.5 border-2 border-black"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              {pendingTasks} LEFT
            </span>
          </div>
          <div className="flex flex-col gap-3 px-4 mt-2">
            {todayTasks.length === 0 ? (
              <div className="p-4 bg-gray-800 border-2 border-white text-center"
                style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                <p className="text-gray-400">No tasks for today</p>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task) => (
                <label key={task.id}
                  className="flex items-center gap-4 p-3 bg-gray-800 border-2 border-white cursor-pointer group hover:bg-gray-700 transition-none active:translate-x-[2px] active:translate-y-[2px]"
                  style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                  <div className="relative flex items-center">
                    <div className={cn(
                      'h-6 w-6 border-2 border-white flex items-center justify-center',
                      task.status === 'completed' ? 'bg-[#4f46e5]' : 'bg-black'
                    )}>
                      {task.status === 'completed' && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className={cn(
                      'text-xl text-white',
                      task.status === 'completed' && 'line-through decoration-2 text-gray-500'
                    )}>
                      {task.title}
                    </span>
                    <span className={cn(
                      'text-sm uppercase',
                      task.priority === 'high' ? 'text-[#ef4444]' : 'text-gray-500'
                    )}>
                      {task.priority === 'high' ? '>> Due Today' : `@ ${task.dueDate ? new Date(task.dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : 'Scheduled'}`}
                    </span>
                  </div>
                  {task.priority && (
                    <span className="bg-white border-2 border-black text-black text-[10px] font-[family-name:var(--font-press-start)] px-1 py-1 uppercase">
                      {task.priority === 'high' ? 'Hi' : task.priority === 'medium' ? 'Med' : 'Low'}
                    </span>
                  )}
                </label>
              ))
            )}
          </div>
        </div>

        <div className="h-12" />
      </div>
    </div>
  );
}
