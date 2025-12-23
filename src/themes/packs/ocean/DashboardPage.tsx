import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, ChevronRight, Check, Clock, Plus, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

export function OceanDashboardPage({
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
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-[family-name:var(--font-inter)] text-slate-900 dark:text-white">

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24">
        {/* Header */}
        <header className="flex items-center justify-between p-4 pb-2 sticky top-0 z-10 bg-[#f6f7f8]/95 dark:bg-[#101922]/95 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full ring-2 ring-[#137fec]/20 bg-gradient-to-br from-[#137fec] to-[#0ea5e9] flex items-center justify-center">
              <span className="text-white text-sm font-bold">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
              <h2 className="text-lg font-bold leading-tight">Good Morning, {userName}</h2>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-full w-10 h-10 bg-[#1c2630]/10 dark:bg-[#1c2630] text-slate-900 dark:text-white hover:bg-[#137fec]/10 transition-colors">
            <Bell className="w-6 h-6" />
          </button>
        </header>

        {/* Horizontal Calendar Strip */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-2">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-xl shrink-0 transition-all',
                  d.isToday
                    ? 'bg-[#137fec] text-white shadow-lg shadow-[#137fec]/20'
                    : 'bg-white dark:bg-[#1c2630] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800'
                )}>
                <span className={cn('text-xs font-medium', d.isToday ? 'opacity-80' : 'text-slate-500 dark:text-slate-400')}>
                  {d.day}
                </span>
                <span className="text-lg font-bold">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Pill */}
        <div className="px-4 mt-4">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-white dark:bg-[#1c2630] border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Daily Goal Progress</p>
              <p className="text-xs font-medium text-[#137fec]">{Math.round(progressValue)}%</p>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div className="h-full rounded-full bg-[#137fec] transition-all" style={{ width: `${progressValue}%` }} />
            </div>
          </div>
        </div>

        {/* Today's Focus Card */}
        <div className="px-4 mt-6">
          <div className="flex flex-col items-stretch justify-end rounded-xl pt-24 shadow-md overflow-hidden relative group cursor-pointer"
            style={{
              background: 'linear-gradient(180deg, rgba(19, 127, 236, 0) 0%, rgba(16, 25, 34, 0.9) 100%), linear-gradient(135deg, #137fec 0%, #0ea5e9 100%)'
            }}>
            <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
              Top Priority
            </div>
            <div className="flex w-full items-end justify-between gap-4 p-4 z-10">
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Today's Focus</p>
                <p className="text-white text-xl font-bold leading-tight">
                  {todayTasks.find(t => t.status !== 'completed')?.title || 'All tasks completed!'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-white/80" />
                  <p className="text-white/90 text-sm font-medium">2:00 PM - 3:30 PM</p>
                </div>
              </div>
              <Link to="/tasks" className="bg-[#137fec] rounded-full p-2 text-white shadow-lg shadow-[#137fec]/30">
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Financial Glance */}
        <div className="px-4 mt-6">
          <div className="flex flex-col gap-4 p-5 rounded-xl bg-white dark:bg-[#1c2630] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Budget</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Link to="/financial">
                <button className="text-[#137fec] text-xs font-bold uppercase tracking-wide px-3 py-1 bg-[#137fec]/10 rounded-full hover:bg-[#137fec]/20 transition-colors">
                  Details
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Spent</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(monthExpense)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Balance</span>
                <span className={cn('text-xl font-bold', balance >= 0 ? 'text-slate-500 dark:text-slate-500' : 'text-red-500')}>
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
            {/* Mini Chart */}
            <div className="flex items-end gap-1.5 h-12 mt-1 border-b border-slate-100 dark:border-slate-700/50 pb-1">
              {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                <div key={i} className={cn(
                  'flex-1 rounded-t-sm transition-all',
                  i === 5 ? 'bg-[#137fec]' : i >= 3 ? 'bg-[#137fec]/60' : 'bg-slate-100 dark:bg-slate-700/50'
                )} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Pending Tasks Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-4 pb-2">
            <h3 className="text-lg font-bold leading-tight">Pending Tasks</h3>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-[#1c2630] px-2 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              {pendingTasks} Remaining
            </span>
          </div>
          <div className="flex flex-col gap-2 px-4 mt-2">
            {todayTasks.length === 0 ? (
              <div className="p-8 text-center rounded-lg bg-white dark:bg-[#1c2630] border border-slate-200 dark:border-slate-800">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">No tasks for today</p>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task) => {
                const priorityColors = {
                  high: 'bg-orange-500/10 text-orange-500',
                  medium: 'bg-green-500/10 text-green-500',
                  low: 'bg-slate-500/10 text-slate-500',
                };
                return (
                  <label key={task.id}
                    className="flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-[#1c2630] border border-slate-200 dark:border-slate-800 active:scale-[0.99] transition-transform cursor-pointer">
                    <div className="relative flex items-center">
                      <div className={cn(
                        'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                        task.status === 'completed'
                          ? 'border-[#137fec] bg-[#137fec]'
                          : 'border-slate-300 dark:border-slate-600'
                      )}>
                        {task.status === 'completed' && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className={cn(
                        'text-sm font-medium',
                        task.status === 'completed'
                          ? 'line-through text-slate-400 dark:text-slate-500'
                          : 'text-slate-900 dark:text-white'
                      )}>
                        {task.title}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
                      </span>
                    </div>
                    {task.priority && task.status !== 'completed' && (
                      <span className={cn('text-[10px] font-bold px-2 py-1 rounded uppercase', priorityColors[task.priority])}>
                        {task.priority === 'high' ? 'Med' : task.priority === 'medium' ? 'Low' : ''}
                      </span>
                    )}
                  </label>
                );
              })
            )}
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  );
}
