'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, ChevronRight, Clock, Check, Flower2 } from 'lucide-react';
import Link from 'next/link';

export function KawaiiDashboardPage({
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
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen font-[family-name:var(--font-dm-sans)]"
      style={{ backgroundColor: '#fff9fa' }}>

      {/* Floral Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d47a96\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24 z-10">
        {/* Header */}
        <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-20 bg-[#fff9fa]/80 backdrop-blur-xl transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#d47a96] to-[#a3c9a8] opacity-50 blur-sm" />
              <div className="relative w-12 h-12 rounded-full ring-2 ring-white p-0.5 bg-gradient-to-br from-[#d47a96] to-[#b85c78] flex items-center justify-center">
                <span className="text-white text-lg">🌺</span>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                  <Flower2 className="w-4 h-4 text-[#d47a96]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[#d47a96] text-xs font-bold uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                <span>{today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
              </div>
              <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-[#5c3a45] leading-tight flex items-center gap-2">
                Hello, {userName} <span className="text-xl animate-pulse">🌺</span>
              </h2>
            </div>
          </div>
          <button className="relative flex items-center justify-center rounded-full w-11 h-11 bg-white text-[#5c3a45] shadow-[0_4px_20px_-2px_rgba(212,122,150,0.25)] border border-rose-100 hover:bg-[#d47a96]/10 transition-colors group overflow-hidden">
            <Bell className="w-6 h-6 group-hover:animate-swing z-10" />
            <div className="absolute top-2.5 right-3 w-2 h-2 bg-red-400 rounded-full border border-white" />
          </button>
        </header>

        {/* Date Selector */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-6 py-4">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[3.5rem] shrink-0 transform transition-all hover:-translate-y-0.5',
                  d.isToday
                    ? 'h-20 bg-gradient-to-br from-[#d47a96] to-[#b85c78] text-white shadow-lg shadow-[#d47a96]/30 scale-105 rounded-[1.5rem] rounded-tl-sm rounded-br-sm'
                    : 'h-16 rounded-2xl bg-white text-[#9e7f8a] border border-rose-100 hover:border-[#d47a96]/50 hover:shadow-md'
                )}>
                <span className={cn('text-xs font-medium', d.isToday ? 'opacity-90 mb-1' : '')}>{d.day}</span>
                <span className={cn('font-bold', d.isToday ? 'text-2xl font-[family-name:var(--font-playfair)]' : 'text-lg')}>{d.date}</span>
                {d.isToday && <span className="text-[10px] mt-1">🌿</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Growth Progress */}
        <div className="px-6 mt-2">
          <div className="group flex flex-col gap-3 p-5 rounded-[2rem] bg-white border border-rose-100 shadow-[0_4px_20px_-2px_rgba(212,122,150,0.25)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Flower2 className="w-[120px] h-[120px] text-[#d47a96] rotate-12" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#a3c9a8]/10 rounded-full blur-2xl" />
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <div className="bg-[#d47a96]/10 p-2 rounded-full">
                  <Flower2 className="w-5 h-5 text-[#d47a96]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#5c3a45]">Daily Growth</p>
                  <p className="text-[10px] text-[#9e7f8a] font-medium">Your progress is blooming</p>
                </div>
              </div>
              <p className="text-xs font-bold text-white bg-[#d47a96] px-3 py-1 rounded-full shadow-lg shadow-[#d47a96]/20">
                {Math.round(progressValue)}%
              </p>
            </div>
            <div className="h-4 w-full rounded-full bg-rose-50 overflow-hidden relative z-10 mt-2 p-0.5 border border-rose-100">
              <div className="h-full rounded-full bg-gradient-to-r from-[#a3c9a8] to-[#d47a96] shadow-[0_0_10px_rgba(212,122,150,0.5)] relative"
                style={{ width: `${progressValue}%` }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-[#d47a96] shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#d47a96] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Focus Card */}
        <div className="px-6 mt-6">
          <div className="bg-cover bg-center flex flex-col items-stretch justify-end rounded-[2.5rem] pt-32 shadow-xl shadow-[#d47a96]/20 overflow-hidden relative group cursor-pointer transition-transform hover:scale-[1.02]"
            style={{ backgroundImage: 'linear-gradient(180deg, rgba(212, 122, 150, 0) 0%, rgba(45, 31, 36, 0.8) 50%, rgba(45, 31, 36, 0.98) 100%), linear-gradient(135deg, #d47a96 0%, #a3c9a8 100%)' }}>
            <div className="absolute inset-0 border-[6px] border-white/10 rounded-[2.5rem] pointer-events-none" />
            <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md pl-3 pr-4 py-1.5 rounded-full flex items-center gap-2 border border-white/30 shadow-lg">
              <Flower2 className="w-4 h-4 text-white" />
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">Priority Bloom</span>
            </div>
            <div className="flex w-full items-end justify-between gap-4 p-6 z-10 pb-8">
              <div className="flex flex-1 flex-col gap-2">
                <p className="text-rose-200 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" /> Today's Focus
                </p>
                <p className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold leading-tight drop-shadow-md">
                  {todayTasks.find(t => t.status !== 'completed')?.title || 'No tasks today'}
                </p>
                <div className="flex items-center gap-2 mt-2 bg-white/10 w-fit px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10">
                  <Clock className="w-4 h-4 text-rose-100" />
                  <p className="text-rose-50 text-sm font-medium">2:00 PM - 3:30 PM</p>
                </div>
              </div>
              <Link href="/tasks" className="bg-white/90 backdrop-blur text-[#d47a96] rounded-full p-3.5 shadow-lg shadow-black/20 hover:bg-[#d47a96] hover:text-white transition-all transform group-hover:rotate-45">
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#a3c9a8] via-[#d47a96] to-[#a3c9a8]" />
          </div>
        </div>

        {/* Monthly Nectar (Financial) */}
        <div className="px-6 mt-6">
          <div className="flex flex-col gap-5 p-6 rounded-[2rem] bg-white border border-rose-100 shadow-[0_4px_20px_-2px_rgba(212,122,150,0.25)] relative">
            <div className="absolute top-0 right-0 p-4 opacity-30">
              <span className="text-3xl">🦋</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#5c3a45] flex items-center gap-2">
                  Monthly Nectar <span className="text-lg">💧</span>
                </h3>
                <p className="text-xs text-[#9e7f8a] mt-1 font-medium pl-0.5">
                  {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Link href="/financial" className="text-[#d47a96] text-xs font-bold uppercase tracking-wide px-4 py-2 bg-[#d47a96]/5 border border-[#d47a96]/20 rounded-full hover:bg-[#d47a96] hover:text-white transition-all">
                Details
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-gradient-to-br from-[#fff9fa] to-white border border-rose-50">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#d47a96]" />
                  <span className="text-[10px] text-[#9e7f8a] font-bold uppercase tracking-wider">Spent</span>
                </div>
                <span className="text-2xl font-bold text-[#b85c78] font-[family-name:var(--font-playfair)]">
                  {formatCurrency(monthExpense)}
                </span>
              </div>
              <div className="flex flex-col gap-1 p-3.5 rounded-2xl bg-gradient-to-br from-[#fff9fa] to-white border border-rose-50">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#a3c9a8]" />
                  <span className="text-[10px] text-[#9e7f8a] font-bold uppercase tracking-wider">Balance</span>
                </div>
                <span className={cn('text-2xl font-bold font-[family-name:var(--font-playfair)]', balance >= 0 ? 'text-[#9e7f8a]' : 'text-red-400')}>
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-24 mt-4 border-b border-rose-100 pb-1 px-2">
              {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center h-full group">
                  {i === 5 && <Flower2 className="w-4 h-4 text-[#d47a96] mb-0.5 animate-bounce" style={{ animationDuration: '2s' }} />}
                  <div className={cn(
                    'w-full rounded-t-lg relative transition-all',
                    i === 5 ? 'bg-gradient-to-t from-[#d47a96] to-[#b85c78] shadow-[0_0_15px_rgba(212,122,150,0.4)]' : 'bg-rose-100 group-hover:bg-[#d47a96]/30'
                  )} style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Garden Tasks */}
        <div className="mt-8 relative">
          <div className="flex items-center justify-between px-6 pb-4">
            <h3 className="text-xl font-[family-name:var(--font-playfair)] font-bold text-[#5c3a45] flex items-center gap-2">
              Garden Tasks <span className="text-lg">🌿</span>
            </h3>
            <span className="text-xs font-bold text-[#d47a96] bg-[#d47a96]/10 px-3 py-1.5 rounded-full flex items-center gap-1">
              {pendingTasks} Seeds <span className="w-1.5 h-1.5 bg-[#d47a96] rounded-full" />
            </span>
          </div>
          <div className="flex flex-col gap-3 px-6 mt-1">
            {todayTasks.length === 0 ? (
              <div className="text-center py-8 rounded-[1.2rem] bg-white border border-rose-100">
                <div className="text-4xl mb-2">🌸</div>
                <p className="text-[#9e7f8a] text-sm">No tasks for today!</p>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task) => (
                <label key={task.id}
                  className="relative flex items-center gap-4 p-4 rounded-[1.2rem] bg-white border border-rose-100 shadow-sm active:scale-[0.99] transition-all cursor-pointer group hover:shadow-[0_4px_20px_-2px_rgba(212,122,150,0.25)] hover:border-[#d47a96]/30 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d47a96]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex items-center justify-center z-10">
                    <div className={cn(
                      'h-6 w-6 border-2 rounded-tr-xl rounded-bl-xl rounded-tl-sm rounded-br-sm flex items-center justify-center transition-all',
                      task.status === 'completed'
                        ? 'bg-[#d47a96] border-[#d47a96]'
                        : 'border-rose-200 group-hover:border-[#d47a96]'
                    )}>
                      {task.status === 'completed' && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 z-10">
                    <span className={cn(
                      'text-sm font-bold transition-colors',
                      task.status === 'completed'
                        ? 'text-[#9e7f8a] line-through decoration-[#d47a96] decoration-2'
                        : 'text-[#5c3a45]'
                    )}>
                      {task.title}
                    </span>
                    <span className="text-xs text-[#d47a96] font-medium flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {task.priority === 'high' ? 'Due Today' : 'Scheduled'}
                    </span>
                  </div>
                  {task.priority && (
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider z-10 border',
                      task.priority === 'high'
                        ? 'bg-orange-50 text-orange-600 border-orange-100'
                        : task.priority === 'medium'
                        ? 'bg-[#a3c9a8]/20 text-green-700 border-[#a3c9a8]/30'
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                    )}>
                      {task.priority === 'high' ? 'Med' : task.priority === 'medium' ? 'Low' : 'Low'}
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
