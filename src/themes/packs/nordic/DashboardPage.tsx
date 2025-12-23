import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Bell, Check, Clock, Compass, Plane, Landmark, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen text-[#2c2825] antialiased pb-24 relative" style={{ fontFamily: '"DM Sans", sans-serif' }}>
      {/* Gradient background - warm peach/orange tones */}
      <div className="fixed inset-0 -z-10" style={{ 
        background: 'linear-gradient(180deg, #f4e4d8 0%, #f0d5c0 20%, #e8c4a8 50%, #d8b098 80%, #c89878 100%)'
      }} />
      {/* Vintage paper background texture */}
      <div className="fixed inset-0 -z-10 opacity-20 mix-blend-multiply pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />

      {/* Header */}
      <header className="flex items-center justify-between p-5 pb-2 sticky top-0 z-20 backdrop-blur-sm border-b border-[#d1c7b0]" style={{ backgroundColor: 'rgba(244, 236, 216, 0.95)' }}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full ring-2 ring-[#b58e46] overflow-hidden bg-[#8b7355]" style={{ filter: 'sepia(0.3)' }}>
              <div className="w-full h-full bg-gradient-to-br from-[#a08060] to-[#6b5040] flex items-center justify-center">
                <span className="text-white font-bold text-lg" style={{ fontFamily: '"Playfair Display", serif' }}>{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#f4ecd8] rounded-full p-0.5 border border-[#d1c7b0]">
              <Plane className="w-3 h-3 text-[#c24d3b]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#5d5650] uppercase tracking-widest" style={{ fontFamily: '"Courier Prime", monospace' }}>
              {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <h2 className="text-xl font-bold text-[#2c2825] italic" style={{ fontFamily: '"Playfair Display", serif' }}>Journal of {userName}</h2>
          </div>
        </div>
        <button className="flex items-center justify-center rounded-full w-10 h-10 text-[#5d5650] hover:text-[#c24d3b] hover:bg-[#e8dfc5] transition-colors border border-transparent hover:border-[#d1c7b0]">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Calendar Strip */}
      <div className="flex flex-col gap-2 mt-4 relative">
        <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-2 items-end">
          {weekDays.map((d, i) => (
            <button key={i}
              className={cn(
                'flex flex-col items-center justify-center shrink-0 transition-all relative overflow-hidden',
                d.isToday
                  ? 'min-w-[3.5rem] h-[4.5rem] rounded-t-lg rounded-b-3xl bg-[#3d5a6b] text-white shadow-lg'
                  : 'min-w-[3rem] h-14 rounded-lg bg-white/90 text-[#2c2825] border border-[#d1c7b0] hover:border-[#3d5a6b]/50'
              )}
              style={{ fontFamily: '"Playfair Display", serif' }}>
              <span className={cn('text-[9px] font-bold tracking-widest uppercase', d.isToday ? 'text-white/80 mb-1' : 'text-[#5d5650] mb-0.5')} style={{ fontFamily: '"Courier Prime", monospace' }}>{d.day.toUpperCase()}</span>
              <span className={cn('font-bold', d.isToday ? 'text-2xl' : 'text-lg')}>{d.date}</span>
              {d.isToday && <MapPin className="absolute bottom-1 w-3 h-3 opacity-50" />}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Progress - Ticket style */}
      <div className="px-4 mt-6">
        <div className="relative flex flex-col gap-2 p-5 rounded-2xl bg-white/95 border-2 border-[#2c2825] shadow-md overflow-hidden">
          {/* Ticket notches */}
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f0d5c0]" />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#f0d5c0]" />
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#c24d3b]" />
              <p className="text-sm font-bold tracking-wider text-[#c24d3b] uppercase" style={{ fontFamily: '"Courier Prime", monospace' }}>Daily Progress</p>
            </div>
            <p className="text-lg font-bold text-[#c24d3b] italic" style={{ fontFamily: '"Playfair Display", serif' }}>{Math.round(progressValue)}%</p>
          </div>
          <div className="h-4 w-full rounded-full bg-[#f0e8e0] border border-[#d1c7b0] overflow-hidden">
            <div className="h-full rounded-full bg-[#c24d3b]" style={{ width: `${progressValue}%` }} />
          </div>
        </div>
      </div>

      {/* Priority Task - Postcard style */}
      <div className="px-4 mt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer border-4 border-white"
          style={{
            background: 'linear-gradient(180deg, rgba(30, 40, 50, 0.3) 0%, rgba(20, 25, 30, 0.95) 100%), #2a3a45',
            paddingTop: '7rem'
          }}>
          {/* Star badge with circular text */}
          <div className="absolute top-4 right-4 rotate-12 opacity-80">
            <div className="w-16 h-16 border-2 border-white/30 rounded-full flex items-center justify-center relative">
              <Star className="w-7 h-7 text-white/30" />
              {/* Circular text effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[7px] text-white/40 font-bold tracking-[0.15em]" style={{ fontFamily: '"Courier Prime", monospace' }}>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2">PRIORITY</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-end justify-between gap-4 p-5 z-10">
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1" style={{ fontFamily: '"Courier Prime", monospace' }}>
                <span className="w-2 h-2 bg-[#d4a574] rounded-full" /> Priority Task
              </p>
              <p className="text-white text-2xl font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>
                {todayTasks.find(t => t.status !== 'completed')?.title || 'Client Presentation'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-[#d4a574]" />
                <p className="text-white/90 text-sm" style={{ fontFamily: '"Courier Prime", monospace' }}>
                  {todayTasks.find(t => t.status !== 'completed')?.dueDate 
                    ? new Date(todayTasks.find(t => t.status !== 'completed')!.dueDate!).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                    : '14:00'} - 15:30
                </p>
              </div>
            </div>
            <Link to="/tasks" className="bg-white/15 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/25 transition-colors">
              <Plane className="w-5 h-5 -rotate-45" />
            </Link>
          </div>
        </div>
      </div>

      {/* Financial Summary - Notebook style */}
      <div className="px-4 mt-6">
        <div className="relative bg-white/95 rounded-lg border border-[#d1c7b0] shadow-md overflow-hidden">
          {/* Notebook holes */}
          <div className="absolute top-0 bottom-0 left-3 flex flex-col justify-center gap-6">
            <div className="w-2 h-2 rounded-full bg-[#c8b8a8]" />
            <div className="w-2 h-2 rounded-full bg-[#c8b8a8]" />
            <div className="w-2 h-2 rounded-full bg-[#c8b8a8]" />
          </div>
          <div className="pl-8 pr-4 py-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#2c2825]" />
                <div>
                  <h3 className="text-base font-bold text-[#2c2825]" style={{ fontFamily: '"Playfair Display", serif' }}>Financial Summary</h3>
                  <p className="text-[10px] text-[#8a8078] uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>
                    {today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()} • LOGBOOK
                  </p>
                </div>
              </div>
              <Link to="/financial" className="text-[#3d5a6b] text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-[#3d5a6b] rounded hover:bg-[#3d5a6b]/10 transition-colors" style={{ fontFamily: '"Courier Prime", monospace' }}>
                VIEW
              </Link>
            </div>
            <div className="border-t border-dashed border-[#d8c8b8] pt-3">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-[10px] text-[#8a8078] uppercase" style={{ fontFamily: '"Courier Prime", monospace' }}>Spent</span>
                  <p className="text-xl font-bold text-[#2c2825]" style={{ fontFamily: '"Playfair Display", serif' }}>{formatCurrency(monthExpense)}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#8a8078] uppercase" style={{ fontFamily: '"Courier Prime", monospace' }}>Allowance</span>
                  <p className="text-xl font-bold text-[#c24d3b] line-through" style={{ fontFamily: '"Playfair Display", serif' }}>{formatCurrency(monthIncome)}</p>
                </div>
              </div>
              {/* Mini chart */}
              <div className="flex items-end gap-1 h-12 border-b-2 border-[#2c2825] pb-0">
                {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                  <div key={i} className={cn(
                    'flex-1 rounded-t-sm',
                    i === 5 ? 'bg-[#3d5a6b]' : i >= 3 ? 'bg-[#3d5a6b]/60' : 'bg-[#d8c8b8]'
                  )} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="mt-6 px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold italic text-[#2c2825]" style={{ fontFamily: '"Playfair Display", serif' }}>Today's Tasks</h3>
          <span className="text-[10px] font-bold text-white bg-[#2c2825] px-2.5 py-1 rounded-full" style={{ fontFamily: '"Courier Prime", monospace' }}>{pendingTasks} Left</span>
        </div>
        <div className="flex flex-col gap-2">
          {todayTasks.length === 0 ? (
            <div className="p-8 text-center rounded-lg bg-[#f0d8c8]/80 border border-[#d8c0a8]">
              <div className="text-3xl mb-2">✈️</div>
              <p className="text-[#5d5650] italic" style={{ fontFamily: '"Playfair Display", serif' }}>No items in itinerary</p>
            </div>
          ) : (
            todayTasks.slice(0, 3).map((task) => (
              <div key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#f0d8c8]/80 border border-[#d8c0a8] shadow-sm hover:shadow-md transition-shadow">
                <div className={cn(
                  'h-5 w-5 rounded border-2 flex items-center justify-center shrink-0',
                  task.status === 'completed'
                    ? 'border-[#2c2825] bg-transparent'
                    : 'border-[#c8b0a0]'
                )}>
                  {task.status === 'completed' && <Check className="w-3 h-3 text-[#2c2825]" />}
                </div>
                <div className="flex-1">
                  <p className={cn(
                    'text-sm font-medium',
                    task.status === 'completed' ? 'line-through text-[#8a8078]' : 'text-[#2c2825]'
                  )} style={{ fontFamily: '"Playfair Display", serif' }}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/60 text-[#8a8078]" style={{ fontFamily: '"Courier Prime", monospace' }}>
                      {task.priority === 'high' ? 'UTILITY' : task.priority === 'medium' ? 'HEALTH' : 'WORK'}
                    </span>
                    {task.priority === 'high' && (
                      <span className="text-[10px] text-[#c24d3b] font-medium">Due Today</span>
                    )}
                    {task.dueDate && task.priority !== 'high' && (
                      <span className="text-[10px] text-[#8a8078]" style={{ fontFamily: '"Courier Prime", monospace' }}>
                        {new Date(task.dueDate).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[#c8b0a0] text-lg">≡</div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="h-8" />
    </div>
  );
}
