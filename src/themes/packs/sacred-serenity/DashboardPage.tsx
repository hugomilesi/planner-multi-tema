import { Link } from 'react-router-dom';
import { DashboardPageProps } from '../types';
import { Church, BookOpen, ArrowRight, Calendar, Plus } from 'lucide-react';

export function SacredSerenityDashboardPage({
  todayTasks,
  completedToday,
  pendingTasks,
  progressValue,
  monthIncome,
  monthExpense,
  balance,
  formatCurrency,
  userName = 'Friend',
}: DashboardPageProps) {
  const today = new Date();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDay = today.getDate();

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-stone-200 selection:bg-[#C5A059] selection:text-white">
      {/* Background decorations - stained glass */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-soft-light" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1457296898342-cdd24585d095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}></div>
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#050505]/50 via-[#050505]/90 to-[#050505]"></div>

      <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 z-10">
        {/* Header */}
        <header className="flex flex-col relative sticky top-0 z-20 transition-all duration-300">
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-xl z-0 border-b border-[#C5A059]/20"></div>
          <div className="flex items-center justify-between p-4 pb-2 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full ring-2 ring-[#C5A059]/40 shadow-lg shadow-[#C5A059]/5 bg-gradient-to-br from-[#C5A059] to-[#8A7029] flex items-center justify-center text-white text-xl font-serif font-bold">
                {userName.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#F0E6D2]/70 italic font-serif">
                  {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
                <h2 className="text-xl font-serif font-bold leading-tight text-[#F0E6D2]">
                  Blessings, {userName}
                </h2>
              </div>
            </div>
            <button className="flex items-center justify-center rounded-full w-10 h-10 bg-[#1A1A1A] text-[#C5A059] hover:bg-[#121212] transition-all shadow-sm border border-[#C5A059]/20">
              <Church className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Calendar Week */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 py-2">
            {weekDays.map((day, index) => {
              const dayNum = currentDay + index - 1;
              const isToday = index === 1;
              return (
                <button
                  key={day}
                  className={`flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-xl shrink-0 transition-all ${
                    isToday
                      ? 'bg-gradient-to-br from-[#C5A059] to-[#8A7029] text-[#050505] shadow-lg shadow-[#C5A059]/20 border border-[#F0E6D2]/50 relative overflow-hidden group'
                      : 'bg-[#1A1A1A]/60 text-stone-400 border border-white/5 backdrop-blur-sm hover:border-[#C5A059]/30'
                  }`}
                >
                  {isToday && (
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                  )}
                  <span className={`text-xs font-medium font-serif relative z-10 ${isToday ? 'opacity-90' : 'text-stone-500'}`}>
                    {day}
                  </span>
                  <span className="text-lg font-bold relative z-10">{dayNum}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Verse of the Day */}
        <div className="px-4 mt-4">
          <div className="relative overflow-hidden rounded-2xl shadow-md border border-[#C5A059]/20 bg-[#1A1A1A]">
            <div className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-luminosity" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}></div>
            <div className="relative bg-gradient-to-r from-[#121212]/80 to-[#1A1A1A]/50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-[#C5A059]" />
                <h3 className="text-sm font-bold text-[#C5A059] uppercase tracking-wider">
                  Verse of the Day
                </h3>
              </div>
              <p className="font-serif italic text-stone-200 text-lg leading-relaxed drop-shadow-sm">
                "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."
              </p>
              <p className="text-right text-xs font-bold text-[#DBB87C] mt-3 border-t border-[#C5A059]/20 inline-block pt-2 ml-auto">
                — Jeremiah 29:11
              </p>
            </div>
          </div>
        </div>

        {/* Stewardship Goals */}
        <div className="px-4 mt-6">
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#C5A059]/10 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[#C5A059]">✨</span>
                <p className="text-sm font-semibold text-[#F0E6D2] font-serif">
                  Stewardship Goals
                </p>
              </div>
              <p className="text-xs font-medium text-[#C5A059]">{progressValue}%</p>
            </div>
            <div className="h-2 w-full rounded-full bg-[#121212] overflow-hidden border border-white/5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8A7029] to-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.3)]"
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Priority Task */}
        <div className="px-4 mt-6">
          <div className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer pt-32 transition-transform active:scale-[0.99] border border-[#C5A059]/20">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-60 grayscale-[30%] sepia-[20%]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')" }}></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent"></div>
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-[#F0E6D2] uppercase tracking-wider border border-[#C5A059]/30 flex items-center gap-1">
              <span className="text-[#C5A059]">★</span> Priority
            </div>
            <div className="flex w-full items-end justify-between gap-4 p-5 relative z-10">
              <div className="flex flex-1 flex-col gap-1">
                <p className="text-[#C5A059] text-xs font-bold uppercase tracking-wider">
                  Today's Mission
                </p>
                <p className="text-white text-xl font-serif font-bold leading-tight">
                  {todayTasks[0]?.title || 'No priority task'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4 text-stone-400" />
                  <p className="text-stone-300 text-sm font-medium">
                    {todayTasks[0]?.dueDate ? new Date(todayTasks[0].dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today'}
                  </p>
                </div>
              </div>
              <Link to="/tasks" className="bg-[#C5A059]/20 hover:bg-[#C5A059]/30 backdrop-blur-sm rounded-full p-2 text-[#C5A059] border border-[#C5A059]/30 transition-colors">
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Monthly Budget */}
        <div className="px-4 mt-6">
          <div className="flex flex-col gap-4 p-5 rounded-xl bg-[#1A1A1A]/90 backdrop-blur-sm border border-[#C5A059]/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C5A059]/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="text-base font-bold text-[#F0E6D2] font-serif flex items-center gap-2">
                  <span className="text-[#C5A059]">⛪</span>
                  Monthly Budget
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Link to="/financial">
                <button className="text-[#C5A059] text-xs font-bold uppercase tracking-wide px-3 py-1 bg-[#C5A059]/10 rounded-full hover:bg-[#C5A059]/20 transition-colors border border-[#C5A059]/10">
                  Details
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-stone-500 font-medium">Spent</span>
                <span className="text-xl font-bold text-white font-serif">
                  {formatCurrency(monthExpense)}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-stone-500 font-medium">Income</span>
                <span className="text-xl font-bold text-[#C5A059] font-serif">
                  {formatCurrency(monthIncome)}
                </span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-12 mt-1 border-b border-stone-100/10 pb-1 relative z-10">
              {[30, 50, 40, 60, 45, 85, 20].map((height, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm relative group ${
                    i === 5
                      ? 'bg-gradient-to-t from-[#8A7029] to-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.2)]'
                      : i >= 3
                      ? 'bg-[#C5A059]/30'
                      : 'bg-[#121212]'
                  }`}
                  style={{ height: `${height}%` }}
                >
                  {i === 5 && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#C5A059] text-[#050505] text-[9px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 font-bold">
                      Today
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Duties */}
        <div className="mt-6">
          <div className="flex items-center justify-between px-4 pb-2">
            <h3 className="text-lg font-bold leading-tight font-serif text-[#F0E6D2]">
              Daily Duties
            </h3>
            <span className="text-xs font-medium text-stone-400 bg-[#1A1A1A] px-2 py-1 rounded-full border border-white/5">
              {pendingTasks} Remaining
            </span>
          </div>
          <div className="flex flex-col gap-3 px-4 mt-2">
            {todayTasks.slice(0, 3).map((task) => (
              <label
                key={task.id}
                className="flex items-center gap-4 p-3 rounded-lg bg-[#1A1A1A]/80 backdrop-blur-sm border border-white/5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer group hover:border-[#C5A059]/30"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={!!task.completedAt}
                    readOnly
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-stone-600 checked:border-[#C5A059] checked:bg-[#C5A059] transition-all"
                  />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14px] text-[#050505] opacity-0 peer-checked:opacity-100 pointer-events-none font-bold">
                    ✓
                  </span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className={`text-sm font-medium ${task.completedAt ? 'line-through text-stone-600' : 'text-stone-200'}`}>
                    {task.title}
                  </span>
                  {task.dueDate && (
                    <span className="text-xs text-stone-500">
                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide border ${
                  task.priority === 'high'
                    ? 'bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/20'
                    : 'bg-[#121212] text-stone-400 border-white/5'
                }`}>
                  {task.priority}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 mt-6 flex gap-3">
          <Link to="/tasks" className="flex-1">
            <button className="w-full py-3 px-4 bg-gradient-to-br from-[#C5A059] to-[#8A7029] text-[#050505] rounded-xl font-serif font-semibold shadow-lg shadow-[#C5A059]/20 hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              New Duty
            </button>
          </Link>
          <Link to="/financial" className="flex-1">
            <button className="w-full py-3 px-4 bg-[#1A1A1A] text-[#C5A059] rounded-xl font-serif font-semibold border border-[#C5A059]/20 hover:bg-[#121212] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Transaction
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
