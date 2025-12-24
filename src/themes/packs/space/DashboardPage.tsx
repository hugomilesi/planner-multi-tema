import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, ChevronRight, Check, Clock, BookOpen, Heart, Church } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  userName = 'User',
}: DashboardPageProps) {
  const today = new Date();
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-800 antialiased pb-24" style={{ fontFamily: '"Lato", sans-serif' }}>
      {/* Header */}
      <header className="flex flex-col relative sticky top-0 z-20">
        <div className="absolute inset-0 bg-[#8C6A5D]/5 backdrop-blur-md border-b border-[#8C6A5D]/10" />
        <div className="flex items-center justify-between p-4 pb-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full ring-2 ring-[#8C6A5D]/30 shadow-sm overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#D4A373] to-[#8C6A5D] flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: '"Playfair Display", serif' }}>{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-stone-500 italic" style={{ fontFamily: '"Playfair Display", serif' }}>
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
              <h2 className="text-xl font-bold leading-tight text-[#8C6A5D]" style={{ fontFamily: '"Playfair Display", serif' }}>
                Blessings, {userName}
              </h2>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-full w-10 h-10 bg-white text-stone-600 hover:bg-[#8C6A5D]/10 transition-colors shadow-sm border border-stone-100">
            <Church className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Calendar Strip */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-2">
          {weekDays.map((d, i) => (
            <button key={i}
              className={cn(
                'flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-xl shrink-0 transition-all',
                d.isToday
                  ? 'bg-[#8C6A5D] text-white shadow-lg shadow-[#8C6A5D]/30 border border-[#8C6A5D]'
                  : 'bg-white text-stone-600 border border-stone-200'
              )}>
              <span className={cn('text-xs font-medium', d.isToday ? 'opacity-90' : 'text-stone-400')} style={{ fontFamily: '"Playfair Display", serif' }}>{d.day}</span>
              <span className="text-lg font-bold">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Verse of the Day */}
      <div className="px-4 mt-4">
        <div className="relative overflow-hidden rounded-2xl shadow-md border border-stone-100">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800')] bg-cover bg-center opacity-20 mix-blend-multiply" />
          <div className="relative bg-gradient-to-r from-[#8C6A5D]/10 to-[#D4A373]/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-[#8C6A5D]" />
              <h3 className="text-sm font-bold text-[#8C6A5D] uppercase tracking-wider">Verse of the Day</h3>
            </div>
            <p className="italic text-stone-700 text-lg leading-relaxed" style={{ fontFamily: '"Playfair Display", serif' }}>
              "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
            </p>
            <p className="text-right text-xs font-bold text-[#8C6A5D] mt-2">— Jeremiah 29:11</p>
          </div>
        </div>
      </div>

      {/* Progress Card - Stewardship Goals */}
      <div className="px-4 mt-6">
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-white border border-stone-100 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[#D4A373]">✨</span>
              <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>Stewardship Goals</p>
            </div>
            <p className="text-xs font-medium text-[#8C6A5D]">{Math.round(progressValue)}%</p>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#8C6A5D] to-[#D4A373]" style={{ width: `${progressValue}%` }} />
          </div>
        </div>
      </div>

      {/* Priority Task Card - Today's Mission */}
      <div className="px-4 mt-6">
        <Link to="/tasks" className="block relative rounded-xl overflow-hidden shadow-lg group cursor-pointer pt-32 transition-transform active:scale-[0.99]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-800/40 to-transparent" />
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/20 flex items-center gap-1">
            <span>⭐</span> Priority
          </div>
          <div className="flex w-full items-end justify-between gap-4 p-5 relative z-10">
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[#D4A373] text-xs font-bold uppercase tracking-wider">Today's Mission</p>
              <p className="text-white text-xl font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                {todayTasks.find(t => t.status !== 'completed')?.title || 'All tasks completed'}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock className="w-4 h-4 text-white/80" />
                <p className="text-white/90 text-sm font-medium">2:00 PM - 3:30 PM</p>
              </div>
            </div>
            <div className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 text-white border border-white/20 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </Link>
      </div>

      {/* Monthly Budget Card */}
      <div className="px-4 mt-6">
        <div className="flex flex-col gap-4 p-5 rounded-xl bg-white border border-stone-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C6A5D]/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2" style={{ fontFamily: '"Playfair Display", serif' }}>
                🏛️ Monthly Budget
              </h3>
              <p className="text-xs text-stone-500 mt-1">{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            </div>
            <Link to="/financial" className="text-[#8C6A5D] text-xs font-bold uppercase tracking-wide px-3 py-1 bg-[#8C6A5D]/10 rounded-full hover:bg-[#8C6A5D]/20 transition-colors">
              Details
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs text-stone-500 font-medium">Spent</span>
              <span className="text-xl font-bold text-stone-800 truncate" style={{ fontFamily: '"Playfair Display", serif' }}>{formatCurrency(monthExpense)}</span>
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-xs text-stone-500 font-medium">Tithe Target (10%)</span>
              <span className="text-xl font-bold text-[#8C6A5D] truncate" style={{ fontFamily: '"Playfair Display", serif' }}>{formatCurrency(monthIncome * 0.1)}</span>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-12 mt-1 border-b border-stone-100 pb-1 relative z-10">
            {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
              <div key={i} className={cn(
                'flex-1 rounded-t-sm',
                i === 5 ? 'bg-[#8C6A5D]' : i >= 3 ? 'bg-[#8C6A5D]/50' : 'bg-stone-200'
              )} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Daily Duties */}
      <div className="mt-6">
        <div className="flex items-center justify-between px-4 pb-2">
          <h3 className="text-lg font-bold leading-tight text-stone-800" style={{ fontFamily: '"Playfair Display", serif' }}>Daily Duties</h3>
          <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-full border border-stone-200">
            {pendingTasks} Remaining
          </span>
        </div>
        <div className="flex flex-col gap-3 px-4 mt-2">
          {todayTasks.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-white border border-stone-100">
              <div className="text-4xl mb-2">🙏</div>
              <p className="text-stone-500 text-sm italic" style={{ fontFamily: '"Playfair Display", serif' }}>No duties scheduled</p>
            </div>
          ) : (
            todayTasks.slice(0, 3).map((task) => (
              <label key={task.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-white border border-stone-100 shadow-sm active:scale-[0.99] transition-transform cursor-pointer group hover:border-[#8C6A5D]/30">
                <div className="relative flex items-center">
                  <div className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all',
                    task.status === 'completed'
                      ? 'border-[#8C6A5D] bg-[#8C6A5D]'
                      : 'border-stone-300'
                  )}>
                    {task.status === 'completed' && <Check className="w-3 h-3 text-white" />}
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <span className={cn(
                    'text-sm font-medium',
                    task.status === 'completed' ? 'line-through text-stone-400' : 'text-stone-800'
                  )}>
                    {task.title}
                  </span>
                  <span className="text-xs text-stone-500 flex items-center gap-1">
                    {task.dueDate ? `★ ${new Date(task.dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}` : '★ Morning'}
                  </span>
                </div>
                {task.priority === 'high' && task.status !== 'completed' && (
                  <span className="bg-[#8C6A5D]/10 text-[#8C6A5D] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">High</span>
                )}
                {task.priority === 'low' && task.status !== 'completed' && (
                  <span className="bg-[#A3C4BC]/20 text-[#5a8a7a] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">Low</span>
                )}
              </label>
            ))
          )}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
