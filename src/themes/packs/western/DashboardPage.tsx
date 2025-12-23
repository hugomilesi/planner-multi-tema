import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Star, AlertTriangle, ChevronRight, Clock, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export function WesternDashboardPage({
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

  // Generate week days for timeline
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      isToday: i === 0,
    };
  });

  return (
    <div className="min-h-screen font-[family-name:var(--font-courier-prime)] text-[#2C241B]"
      style={{ backgroundColor: '#EFE6DD' }}>

      <div className="relative z-10 pb-24">
        {/* Header - Wood Panel */}
        <header className="sticky top-0 z-20 flex items-center justify-between p-4 pb-3 border-b-4 border-[#5D3A1A]"
          style={{
            backgroundColor: '#6F4E37',
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
          }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full ring-2 ring-[#DAA520] shadow-lg bg-gradient-to-br from-[#8B5A2B] to-[#5D3A1A] flex items-center justify-center"
                style={{ filter: 'sepia(0.6) contrast(1.1) brightness(0.9)' }}>
                <Star className="w-6 h-6 text-[#DAA520]" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#DAA520] rounded-full p-0.5 border border-[#2C241B]">
                <Star className="w-3 h-3 text-[#2C241B]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#F4ECD8] opacity-80 uppercase tracking-widest">
                {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, 1885
              </span>
              <h2 className="text-xl font-[family-name:var(--font-rye)] text-[#F4ECD8]"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Howdy, Partner
              </h2>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-full w-10 h-10 text-[#F4ECD8] hover:bg-[#A0522D] transition-colors relative"
            style={{
              backgroundColor: '#8B5A2B',
              border: '1px solid #5D3A1A',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 2px 2px 4px rgba(0,0,0,0.4)',
            }}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-800 rounded-full border border-[#F4ECD8]" />
          </button>
        </header>

        {/* Timeline Calendar */}
        <div className="flex flex-col gap-2 mt-4 relative">
          <div className="absolute top-[-16px] left-8 w-1 h-6 bg-[#A0522D] z-0" />
          <div className="absolute top-[-16px] right-8 w-1 h-6 bg-[#A0522D] z-0" />
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-2 z-10">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center shrink-0 transition-all',
                  d.isToday
                    ? 'min-w-[3.8rem] h-20 rounded-sm bg-[#F4ECD8] border-2 border-[#2C241B] transform rotate-1'
                    : 'min-w-[3.5rem] h-18 rounded-sm bg-[#EFE6DD]/80 border border-[#6F4E37]/50 text-[#5D3A1A] opacity-80'
                )}
                style={d.isToday ? { boxShadow: '2px 2px 0px 0px rgba(93,58,26,0.4)' } : {}}>
                <span className={cn('text-[10px] font-bold uppercase',
                  d.isToday ? 'text-[#2C241B] border-b border-[#2C241B] w-full text-center' : '')}>
                  {d.day}
                </span>
                <span className={cn('font-[family-name:var(--font-rye)]',
                  d.isToday ? 'text-2xl text-[#2C241B] mt-1' : 'text-lg')}>
                  {d.date}
                </span>
                {d.isToday && (
                  <div className="w-full text-center mt-1">
                    <Star className="w-2.5 h-2.5 text-[#A0522D] inline" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Bounty Progress */}
        <div className="px-4 mt-6">
          <div className="flex flex-col gap-2 p-4 rounded border border-[#5D3A1A] relative overflow-hidden"
            style={{ backgroundColor: '#8B5A2B', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)' }}>
            <div className="absolute inset-0 opacity-50"
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/leather.png')" }} />
            <div className="relative z-10 flex justify-between items-center mb-1">
              <p className="text-sm font-[family-name:var(--font-rye)] text-[#F4ECD8] tracking-wider"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Daily Bounty
              </p>
              <p className="text-sm font-bold text-[#DAA520]">{Math.round(progressValue)}%</p>
            </div>
            <div className="relative z-10 h-4 w-full rounded bg-[#5D3A1A]/60 shadow-inner flex items-center px-1">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#A0522D] to-[#DAA520] transition-all duration-500"
                style={{ width: `${progressValue}%`, boxShadow: '0 0 5px rgba(218,165,32,0.5)' }} />
            </div>
            <p className="relative z-10 text-xs text-[#F4ECD8]/70 mt-1">
              {completedToday} / {todayTasks.length} tasks complete
            </p>
          </div>
        </div>

        {/* Main Job - Wanted Poster */}
        {todayTasks.length > 0 && todayTasks[0].status !== 'completed' && (
          <div className="px-4 mt-8">
            <div className="relative p-1 transform rotate-[-1deg]"
              style={{
                backgroundColor: '#F4ECD8',
                boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                border: '1px dashed #8B5A2B',
              }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-stone-700 shadow-md border border-stone-500 z-20" />
              <div className="relative overflow-hidden border-2 border-[#2C241B] p-1">
                <div className="h-48 relative"
                  style={{
                    background: 'linear-gradient(to bottom, #8B5A2B, #5D3A1A)',
                    filter: 'sepia(0.6) contrast(1.1) brightness(0.9)',
                  }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C241B]/90 via-[#2C241B]/20 to-transparent" />
                </div>
                <div className="absolute top-4 right-4 bg-[#A0522D] text-[#F4ECD8] px-3 py-1 text-xs font-[family-name:var(--font-rye)] border border-[#2C241B] shadow-sm transform rotate-2">
                  WANTED DEAD OR ALIVE
                </div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <p className="text-[#DAA520] text-xs font-bold uppercase tracking-widest mb-1">Main Job</p>
                  <p className="text-[#F4ECD8] text-2xl font-[family-name:var(--font-rye)] leading-tight"
                    style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {todayTasks[0].title}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {todayTasks[0].dueDate && (
                      <div className="flex items-center gap-2 text-[#F4ECD8]/90 bg-[#2C241B]/40 px-2 py-1 rounded">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-bold">
                          {new Date(todayTasks[0].dueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )}
                    <Link to="/tasks">
                      <div className="bg-[#DAA520] rounded-full p-2 text-[#5D3A1A] shadow-lg hover:bg-white transition-colors cursor-pointer border border-[#2C241B]">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Town Bank Ledger */}
        <div className="px-4 mt-8">
          <div className="flex flex-col gap-0 rounded-sm bg-[#FDFBF7] shadow-lg border border-gray-300 relative">
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '100% 24px', marginTop: '3.5rem' }} />
            <div className="absolute left-10 top-14 bottom-4 w-px bg-red-300/50 pointer-events-none" />

            <div className="flex justify-between items-start p-4 bg-[#EFE6DD] border-b border-double border-gray-400">
              <div>
                <h3 className="text-lg font-[family-name:var(--font-rye)] text-[#5D3A1A]">Town Bank Ledger</h3>
                <p className="text-xs text-[#6F4E37] font-bold uppercase tracking-widest">
                  {today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              </div>
              <Link to="/financial">
                <button className="text-[#A0522D] text-xs font-bold uppercase tracking-wide px-3 py-1 border border-[#A0522D] rounded hover:bg-[#A0522D] hover:text-white transition-colors">
                  Inspect
                </button>
              </Link>
            </div>

            <div className="p-4 pt-6 relative z-10">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1 pl-8">
                  <span className="text-xs text-[#6F4E37] font-bold uppercase">Spent Gold</span>
                  <span className="text-xl font-[family-name:var(--font-rye)] text-[#5D3A1A]">
                    {formatCurrency(monthExpense)}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-[#6F4E37] font-bold uppercase">Income</span>
                  <span className="text-xl font-[family-name:var(--font-rye)] text-[#A0522D] underline decoration-double">
                    {formatCurrency(monthIncome)}
                  </span>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="flex items-end gap-2 h-16 mt-2 pb-1 border-b-2 border-[#2C241B]">
                {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                  <div key={i}
                    className={cn('flex-1 border transform skew-x-[-5deg]',
                      i === 5 ? 'bg-[#A0522D] border-[#2C241B] shadow-lg' : i >= 3 ? 'bg-[#A0522D]/60 border-[#A0522D]' : 'bg-[#6F4E37]/30 border-[#6F4E37]')}
                    style={{ height: `${h}%` }} />
                ))}
              </div>

              {/* Balance */}
              <div className="mt-4 pt-2 border-t border-gray-300">
                <div className="flex justify-between items-center pl-8">
                  <span className="text-xs text-[#6F4E37] font-bold uppercase">Balance</span>
                  <span className={cn('text-xl font-[family-name:var(--font-rye)]',
                    balance >= 0 ? 'text-[#5D3A1A]' : 'text-red-700')}>
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bounty Board */}
        <div className="mt-8 mb-4">
          <div className="flex items-center justify-between px-4 pb-2">
            <h3 className="text-xl font-[family-name:var(--font-rye)] text-[#2C241B] border-b-2 border-[#A0522D] inline-block pr-4">
              Bounty Board
            </h3>
            <span className="text-xs font-bold text-[#F4ECD8] bg-[#A0522D] px-2 py-1 rounded shadow-sm border border-[#2C241B]">
              {pendingTasks} Left
            </span>
          </div>

          <div className="flex flex-col gap-3 px-4 mt-2">
            {todayTasks.length === 0 ? (
              <div className="p-8 bg-[#F4ECD8] border border-[#6F4E37] text-center"
                style={{ boxShadow: '2px 2px 0px 0px rgba(93,58,26,0.4)' }}>
                <p className="text-[#6F4E37] italic">No bounties posted today</p>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task) => {
                const borderColor = task.status === 'completed' ? 'bg-green-700' : task.priority === 'high' ? 'bg-red-800' : task.priority === 'medium' ? 'bg-[#A0522D]' : 'bg-blue-800';
                const priorityLabel = task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Med' : 'Low';
                const priorityColor = task.priority === 'high' ? 'text-red-800 border-red-800' : task.priority === 'medium' ? 'text-[#A0522D] border-[#A0522D]' : 'text-green-800 border-green-800';

                return (
                  <label key={task.id}
                    className="group flex items-center gap-4 p-3 bg-[#F4ECD8] border border-[#6F4E37] active:scale-[0.99] transition-transform cursor-pointer relative overflow-hidden"
                    style={{ boxShadow: '2px 2px 0px 0px rgba(93,58,26,0.4)' }}>
                    <div className={cn('absolute top-0 left-0 w-1 h-full', borderColor)} />
                    <div className="relative flex items-center pl-2">
                      <div className={cn('h-5 w-5 border-2 border-[#6F4E37] bg-[#EFE6DD] rounded-sm flex items-center justify-center',
                        task.status === 'completed' && 'bg-[#A0522D] border-[#2C241B]')}>
                        {task.status === 'completed' && <span className="text-[#F4ECD8] text-xs">✕</span>}
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <span className={cn('text-base font-bold text-[#2C241B] group-hover:text-[#A0522D] transition-colors',
                        task.status === 'completed' && 'line-through decoration-2 decoration-[#A0522D] opacity-50')}>
                        {task.title}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-[#6F4E37] italic">
                          Due: {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                    {task.status !== 'completed' && (
                      <span className={cn('text-[10px] font-bold px-2 py-1 border rounded-sm uppercase tracking-wider', priorityColor)}>
                        {priorityLabel}
                      </span>
                    )}
                  </label>
                );
              })
            )}
          </div>

          <Link to="/tasks" className="block px-4 mt-3">
            <div className="flex items-center justify-center gap-2 py-2 border-2 border-[#8B5A2B] text-[#5D3A1A] text-sm hover:bg-[#EFE6DD] transition-colors"
              style={{ boxShadow: '2px 2px 0px 0px rgba(93,58,26,0.4)' }}>
              View All Bounties
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <div className="px-4 mb-6">
            <div className="p-4 bg-red-100 border-2 border-red-700"
              style={{ boxShadow: '3px 3px 0 rgba(185,28,28,0.2)' }}>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-700" />
                <div>
                  <p className="text-red-800 text-sm font-bold">
                    {overdueTasks} overdue bounty{overdueTasks > 1 ? 's' : ''}!
                  </p>
                  <p className="text-red-600/70 text-xs">
                    Needs immediate attention, partner
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 px-4">
          <Link to="/tasks">
            <button className="w-full py-3 text-[#F4ECD8] text-sm border-2 border-[#5D3A1A] hover:bg-[#A0522D] transition-colors font-bold"
              style={{
                backgroundColor: '#8B5A2B',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2), 2px 2px 4px rgba(0,0,0,0.4)',
              }}>
              + New Bounty
            </button>
          </Link>
          <Link to="/financial">
            <button className="w-full py-3 bg-[#F4ECD8] text-[#5D3A1A] text-sm border-2 border-[#8B5A2B] hover:bg-[#EFE6DD] transition-colors font-bold"
              style={{ boxShadow: '2px 2px 0px 0px rgba(93,58,26,0.4)' }}>
              + Transaction
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
