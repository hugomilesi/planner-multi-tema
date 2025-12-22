'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, Check, Clock, Compass, Plane, Landmark, MapPin } from 'lucide-react';
import Link from 'next/link';

export function NordicDashboardPage({
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
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen font-sans text-[#2c2825] antialiased pb-24 relative">
      {/* Warm gradient background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'linear-gradient(180deg, #e8d5c4 0%, #dcc4b0 30%, #d4b8a0 60%, #c9a88a 100%)'
      }} />

      {/* Header */}
      <header className="flex items-center justify-between p-4 pt-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full ring-2 ring-[#b58e46] overflow-hidden bg-[#8b7355]">
              <div className="w-full h-full bg-gradient-to-br from-[#a08060] to-[#6b5040] flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono font-bold text-[#5d5650] uppercase tracking-widest">
              {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
            </span>
            <h2 className="text-xl font-serif font-bold text-[#2c2825] italic">Journal of {userName}</h2>
          </div>
        </div>
        <button className="flex items-center justify-center w-10 h-10 text-[#2c2825]">
          <Bell className="w-5 h-5" />
        </button>
      </header>

      {/* Calendar Strip */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-3 items-end">
        {weekDays.map((d, i) => (
          <button key={i}
            className={cn(
              'flex flex-col items-center justify-center shrink-0 transition-all rounded-lg',
              d.isToday
                ? 'min-w-[3.5rem] h-[4.5rem] bg-[#3b5998] text-white shadow-lg'
                : 'min-w-[3rem] h-14 bg-[#f5efe8] text-[#2c2825] border border-[#e0d5c8]'
            )}>
            <span className={cn('text-[9px] font-mono font-bold tracking-wider uppercase', d.isToday ? 'text-white/80' : 'text-[#8a8078]')}>{d.day}</span>
            <span className={cn('font-bold', d.isToday ? 'text-2xl' : 'text-lg')}>{d.date}</span>
            {d.isToday && <MapPin className="w-3 h-3 mt-0.5 text-white/70" />}
          </button>
        ))}
      </div>

      {/* Progress Card - Ticket style */}
      <div className="px-4 mt-4">
        <div className="relative flex flex-col gap-2 p-4 rounded-xl bg-[#f5efe8] border border-[#e0d5c8] shadow-sm overflow-hidden">
          {/* Ticket notches */}
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #e8d5c4 0%, #d4b8a0 100%)' }} />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #e8d5c4 0%, #d4b8a0 100%)' }} />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#c24d3b]" />
              <p className="text-xs font-mono font-bold tracking-wider text-[#2c2825] uppercase">Expedition Progress</p>
            </div>
            <p className="text-base font-serif text-[#8a8078] italic">{Math.round(progressValue)}%</p>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#e8dfc5] overflow-hidden">
            <div className="h-full rounded-full bg-[#c24d3b]" style={{ width: `${progressValue}%` }} />
          </div>
        </div>
      </div>

      {/* Focus Card - Postcard style */}
      <div className="px-4 mt-4">
        <div className="relative rounded-2xl overflow-hidden shadow-lg transform -rotate-1"
          style={{ 
            background: 'linear-gradient(180deg, rgba(30, 40, 60, 0.7) 0%, rgba(20, 30, 50, 0.95) 100%)',
            border: '4px solid white'
          }}>
          {/* Star badge */}
          <div className="absolute top-3 right-3">
            <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center">
              <span className="text-white/50 text-sm">★</span>
            </div>
          </div>
          <div className="pt-20 pb-4 px-4">
            <p className="text-white/60 text-[10px] font-mono font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#b58e46] rounded-full" /> Destination
            </p>
            <p className="text-white text-xl font-serif font-bold leading-tight">
              {todayTasks.find(t => t.status !== 'completed')?.title || 'Client Presentation'}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="w-4 h-4 text-[#b58e46]" />
              <p className="text-white/80 text-sm font-mono">14:00 - 15:30</p>
            </div>
          </div>
          <Link href="/tasks" className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2.5 text-white">
            <Plane className="w-5 h-5 -rotate-45" />
          </Link>
        </div>
      </div>

      {/* Budget Card - Notebook style */}
      <div className="px-4 mt-6">
        <div className="relative bg-[#f5efe8] rounded-lg border border-[#e0d5c8] shadow-sm overflow-hidden">
          {/* Notebook holes */}
          <div className="absolute top-0 bottom-0 left-3 flex flex-col justify-center gap-6">
            <div className="w-2 h-2 rounded-full bg-[#d4c8b8]" />
            <div className="w-2 h-2 rounded-full bg-[#d4c8b8]" />
            <div className="w-2 h-2 rounded-full bg-[#d4c8b8]" />
          </div>
          <div className="pl-8 pr-4 py-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#5d5650]" />
                <div>
                  <h3 className="text-base font-serif font-bold text-[#2c2825]">Travel Budget</h3>
                  <p className="text-[10px] font-mono text-[#8a8078] uppercase tracking-wide">{today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()} • LOGBOOK</p>
                </div>
              </div>
              <Link href="/financial" className="text-[#3b5998] text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-[#3b5998] rounded hover:bg-[#3b5998]/10 transition-colors">
                View
              </Link>
            </div>
            <div className="border-t border-dashed border-[#d4c8b8] pt-3">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-[10px] text-[#8a8078] font-mono uppercase">Spent</span>
                  <p className="text-xl font-serif font-bold text-[#2c2825]">{formatCurrency(monthExpense)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#8a8078] font-mono uppercase">Allowance</span>
                  <p className="text-xl font-serif font-bold text-[#8a8078] line-through decoration-[#c24d3b]/50">{formatCurrency(monthIncome)}</p>
                </div>
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-1 h-12 border-b border-[#2c2825] pb-0">
                {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                  <div key={i} className={cn(
                    'flex-1 rounded-t-sm',
                    i === 5 ? 'bg-[#3b5998]' : i >= 3 ? 'bg-[#3b5998]/50' : 'bg-[#d4c8b8]'
                  )} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Items */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-serif font-bold italic text-[#2c2825]">Itinerary Items</h3>
          <span className="text-[10px] font-mono font-bold text-white bg-[#2c2825] px-2.5 py-1 rounded-full">{pendingTasks} Left</span>
        </div>
        <div className="flex flex-col gap-2">
          {todayTasks.length === 0 ? (
            <div className="p-8 text-center rounded-lg bg-[#f5efe8] border border-[#e0d5c8]">
              <div className="text-3xl mb-2">✈️</div>
              <p className="text-[#8a8078] font-serif italic">No items in itinerary</p>
            </div>
          ) : (
            todayTasks.slice(0, 3).map((task, index) => (
              <div key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#f5efe8] border border-[#e0d5c8] shadow-sm">
                <div className={cn(
                  'h-5 w-5 rounded border-2 flex items-center justify-center',
                  task.status === 'completed'
                    ? 'border-[#2c2825] bg-transparent'
                    : 'border-[#c4b8a8]'
                )}>
                  {task.status === 'completed' && <Check className="w-3 h-3 text-[#2c2825]" />}
                </div>
                <div className="flex-1">
                  <p className={cn(
                    'text-sm font-serif',
                    task.status === 'completed' ? 'line-through text-[#8a8078]' : 'text-[#2c2825]'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#e8dfc5] text-[#8a8078]">
                      {task.priority === 'high' ? 'UTILITY' : task.priority === 'medium' ? 'HEALTH' : 'WORK'}
                    </span>
                    {task.priority === 'high' && (
                      <span className="text-[10px] text-[#c24d3b] font-medium">Due Today</span>
                    )}
                    {task.dueDate && task.priority !== 'high' && (
                      <span className="text-[10px] text-[#8a8078] font-mono">
                        {new Date(task.dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[#c4b8a8]">≡</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
