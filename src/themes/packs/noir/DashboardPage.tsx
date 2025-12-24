import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, ChevronRight, Clock, Check, PiggyBank } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  userName = 'User',
}: DashboardPageProps) {
  const today = new Date();
  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen font-[family-name:var(--font-fredoka)] text-slate-800"
      style={{
        backgroundColor: '#FFF9E6',
        backgroundImage: 'radial-gradient(#FFD200 1.5px, transparent 1.5px), radial-gradient(#FFD200 1.5px, transparent 1.5px)',
        backgroundSize: '30px 30px',
        backgroundPosition: '0 0, 15px 15px',
      }}>

      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-32">
        {/* Header */}
        <header className="flex items-center justify-between p-5 pb-2 sticky top-0 z-20 bg-[#FFF9E6]/90 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full ring-4 ring-[#FFD200] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] bg-gradient-to-br from-[#4FACFE] to-[#00f2fe] flex items-center justify-center">
                <span className="text-2xl">😊</span>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#2ECC71] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                lvl 5
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#A29BFE] font-[family-name:var(--font-quicksand)] tracking-wide">
                {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <h2 className="text-2xl font-bold leading-tight text-slate-800">
                Hi, {userName}! 👋
              </h2>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-2xl w-12 h-12 bg-white text-[#FF9A3C] hover:bg-[#FF9A3C] hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none border-2 border-[#FF9A3C]/20">
            <Bell className="w-7 h-7" />
          </button>
        </header>

        {/* Date Selector */}
        <div className="flex flex-col gap-2 mt-4 relative z-10">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-5 py-2 pb-4">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[4rem] h-20 rounded-3xl shrink-0 transition-all transform active:scale-95',
                  d.isToday
                    ? 'bg-[#4FACFE] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] border-b-4 border-blue-600'
                    : 'bg-white text-slate-600 shadow-sm border-2 border-slate-100 hover:border-[#4FACFE]/50'
                )}>
                <span className={cn('text-sm font-semibold font-[family-name:var(--font-quicksand)]', d.isToday ? 'opacity-90' : 'text-slate-400')}>
                  {d.day}
                </span>
                <span className={cn('font-black', d.isToday ? 'text-2xl' : 'text-xl')}>{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Mission Progress */}
        <div className="px-5 mt-2">
          <div className="flex flex-col gap-3 p-5 rounded-3xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] border-2 border-[#FFD200]/30 relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#FFD200]/20 rounded-full blur-xl" />
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚀</span>
                <p className="text-base font-bold text-slate-800">Daily Mission</p>
              </div>
              <div className="px-3 py-1 bg-[#2ECC71]/20 text-[#2ECC71] rounded-full font-bold text-sm">
                {Math.round(progressValue)}% Done!
              </div>
            </div>
            <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200 relative z-10">
              <div className="h-full rounded-full bg-gradient-to-r from-[#FFD200] to-[#FF9A3C] animate-pulse"
                style={{ width: `${progressValue}%` }} />
            </div>
            <p className="text-xs text-slate-500 font-[family-name:var(--font-quicksand)] text-center font-medium">
              Almost there! Keep going superstar! ⭐
            </p>
          </div>
        </div>

        {/* Big Task Card */}
        <div className="px-5 mt-6">
          <div className="group cursor-pointer relative transform transition-all hover:scale-[1.02]">
            <div className="absolute inset-0 bg-[#4FACFE] rounded-3xl rotate-1 opacity-50 group-hover:rotate-2 transition-transform" />
            <div className="flex flex-col items-stretch justify-end rounded-3xl pt-24 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden relative border-4 border-white"
              style={{ background: 'linear-gradient(180deg, rgba(79, 172, 254, 0) 0%, rgba(79, 172, 254, 0.9) 100%), linear-gradient(135deg, #4FACFE 0%, #00f2fe 100%)' }}>
              <div className="absolute top-4 right-4 bg-[#FF6B6B] text-white px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transform -rotate-2 border-2 border-white border-dashed">
                Big Task!
              </div>
              <div className="flex w-full items-end justify-between gap-4 p-5 z-10">
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/90 text-xs font-bold uppercase tracking-wider bg-black/10 px-2 py-0.5 rounded-lg backdrop-blur-sm">Focus Time</span>
                  </div>
                  <p className="text-white text-2xl font-black leading-tight drop-shadow-md">
                    {todayTasks.find(t => t.status !== 'completed')?.title || 'All done!'}
                  </p>
                  <div className="flex items-center gap-2 mt-2 bg-white/20 p-2 rounded-xl backdrop-blur-sm w-fit">
                    <Clock className="w-4 h-4 text-white" />
                    <p className="text-white text-sm font-bold font-[family-name:var(--font-quicksand)]">2:00 PM - 3:30 PM</p>
                  </div>
                </div>
                <Link to="/tasks" className="bg-white rounded-2xl p-3 text-[#4FACFE] shadow-lg group-hover:bg-[#FFD200] group-hover:text-white transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Piggy Bank (Financial) */}
        <div className="px-5 mt-6">
          <div className="flex flex-col gap-4 p-5 rounded-3xl bg-white border-2 border-[#2ECC71]/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] relative overflow-hidden">
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-[#2ECC71]/10 rounded-full" />
            <div className="absolute right-10 top-2 text-6xl opacity-10 rotate-12">🐷</div>
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-3">
                <div className="bg-[#2ECC71]/20 p-2.5 rounded-2xl text-[#2ECC71]">
                  <PiggyBank className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">My Piggy Bank</h3>
                  <p className="text-xs text-slate-500 font-bold font-[family-name:var(--font-quicksand)]">
                    {today.toLocaleDateString('en-US', { month: 'long' })}
                  </p>
                </div>
              </div>
              <Link to="/financial">
                <button className="text-white text-xs font-bold uppercase tracking-wide px-4 py-2 bg-[#2ECC71] rounded-xl shadow-[0_4px_0_rgb(34,197,94)] active:shadow-none active:translate-y-[4px] transition-all">
                  See All
                </button>
              </Link>
            </div>
            <div className="flex items-center justify-between bg-[#FFF9E6] rounded-2xl p-4 border border-[#FFD200]/30">
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Spent</span>
                <span className="text-xl font-black text-slate-800 truncate">{formatCurrency(monthExpense)}</span>
              </div>
              <div className="h-8 w-[2px] bg-slate-200 rounded-full mx-2 shrink-0" />
              <div className="flex flex-col text-right min-w-0 flex-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Balance</span>
                <span className={cn('text-xl font-black truncate', balance >= 0 ? 'text-slate-800' : 'text-[#FF6B6B]')}>
                  {formatCurrency(balance)}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2 h-16 mt-2 pb-1 px-2">
              {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                <div key={i} className={cn(
                  'flex-1 rounded-t-xl border-t-2 border-x-2 transition-all',
                  i === 5
                    ? 'bg-[#2ECC71] border-white/50 shadow-lg shadow-[#2ECC71]/20'
                    : i >= 3 ? 'bg-[#2ECC71]/40 border-white/50' : 'bg-slate-100 border-slate-50'
                )} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* To-Do List */}
        <div className="mt-8">
          <div className="flex items-center justify-between px-5 pb-2">
            <h3 className="text-xl font-bold leading-tight text-slate-800 flex items-center gap-2">
              <span className="text-2xl">📝</span> To-Do List
            </h3>
            <span className="text-xs font-bold text-[#4FACFE] bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm">
              {pendingTasks} Left
            </span>
          </div>
          <div className="flex flex-col gap-3 px-5 mt-2">
            {todayTasks.length === 0 ? (
              <div className="p-8 text-center rounded-3xl bg-white border-2 border-slate-100 shadow-sm">
                <div className="text-5xl mb-3">🎉</div>
                <div className="text-slate-600 font-bold">All done for today!</div>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task) => {
                const colors = {
                  high: { border: 'hover:border-[#FF9A3C]', bg: 'bg-[#FF9A3C]', text: 'group-hover:text-[#FF9A3C]' },
                  medium: { border: 'hover:border-[#2ECC71]', bg: 'bg-[#2ECC71]', text: 'group-hover:text-[#2ECC71]' },
                  low: { border: 'hover:border-[#A29BFE]', bg: 'bg-[#A29BFE]', text: 'group-hover:text-[#A29BFE]' },
                };
                const color = colors[task.priority] || colors.low;
                return (
                  <label key={task.id}
                    className={cn('group flex items-center gap-4 p-4 rounded-3xl bg-white border-2 border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer', color.border)}>
                    <div className="relative flex items-center">
                      <div className={cn(
                        'h-7 w-7 rounded-xl border-2 flex items-center justify-center transition-all',
                        task.status === 'completed'
                          ? `${color.bg} border-transparent`
                          : 'border-slate-300'
                      )}>
                        {task.status === 'completed' && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className={cn(
                        'text-base font-bold transition-colors',
                        task.status === 'completed' ? 'text-slate-400 line-through' : `text-slate-800 ${color.text}`
                      )}>
                        {task.title}
                      </span>
                      <span className="text-xs text-slate-500 font-bold font-[family-name:var(--font-quicksand)]">
                        {task.priority === 'high' ? 'Due Today' : 'Scheduled'}
                      </span>
                    </div>
                    {task.priority && task.status !== 'completed' && (
                      <span className={cn(
                        'text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase shadow-sm rotate-3 group-hover:rotate-0 transition-transform',
                        color.bg
                      )}>
                        {task.priority === 'high' ? 'Med' : task.priority === 'medium' ? 'Fun' : 'Easy'}
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
