import { TasksPageProps } from '../types';
import { Filter, Check } from 'lucide-react';

export function SacredSerenityTasksPage({
  tasks,
  filteredTasks,
  filter,
  setFilter,
  toggleTaskStatus,
  deleteTask,
  userName = 'Friend',
}: TasksPageProps) {
  const today = new Date();
  const weekDays = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = today.getDate();
  const completedCount = tasks.filter(t => t.completedAt).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#1a1614] text-[#e0d6c8] font-sans pb-24">
      <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
        <div className="flex items-center h-12 justify-between">
          <div className="w-10 h-10 rounded-full border-2 border-[#bfa372]/30 shadow-sm bg-gradient-to-br from-[#bfa372] to-[#9e8455] flex items-center justify-center text-white text-lg font-serif font-bold">
            {userName.charAt(0)}
          </div>
          <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-[#262320] text-white shadow-sm border border-[#443f38] hover:border-[#bfa372]/50 transition-colors">
            <Filter className="w-5 h-5 text-[#bfa372]" />
          </button>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-[#9dabb9] text-sm font-medium italic font-serif">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-[#f2ece4] tracking-tight text-[32px] font-bold font-serif leading-tight">
              Blessings, {userName}
            </h1>
          </div>
        </div>
      </div>

      {/* Calendar Week */}
      <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-2 mb-2">
        {weekDays.map((day, index) => {
          const dayNum = currentDay + index;
          const isToday = index === 0;
          return (
            <button
              key={day}
              className={`flex flex-col items-center justify-center min-w-[64px] h-[84px] rounded-t-3xl rounded-b-xl shrink-0 transform transition-transform active:scale-95 ${
                isToday
                  ? 'bg-gradient-to-b from-[#bfa372] to-[#a38856] text-white shadow-lg shadow-[#bfa372]/20 border-b-4 border-[#8c7348]'
                  : 'bg-[#262320] border border-[#443f38] text-[#9dabb9] hover:border-[#bfa372]/30'
              }`}
            >
              <span className={`text-xs font-serif ${isToday ? 'italic opacity-90' : 'font-medium'}`}>{day}</span>
              <span className={`text-2xl font-serif font-bold mt-1 ${!isToday && 'text-[#e0d6c8]'}`}>
                {dayNum}
              </span>
              {isToday && <span className="text-[10px] mt-1">●</span>}
            </button>
          );
        })}
      </div>

      {/* Progress Card */}
      <div className="px-4 py-2">
        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-[#262320] border border-[#443f38] shadow-[0_4px_20px_-2px_rgba(191,163,114,0.15)]">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-[#e0d6c8] text-base font-serif font-bold leading-normal flex items-center gap-2">
              <span className="text-[#bfa372] text-lg">✨</span>
              Daily Stewardship
            </p>
            <span className="text-[#bfa372] text-sm font-bold bg-[#bfa372]/10 px-3 py-1 rounded-full font-serif italic">
              {progressPercent}%
            </span>
          </div>
          <div className="rounded-full bg-[#3b3630] h-2 w-full overflow-hidden border border-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#bfa372] to-[#dcb773] transition-all duration-500 ease-out relative"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20"></div>
            </div>
          </div>
          <p className="text-[#9dabb9] text-xs font-medium leading-normal italic text-right">
            {completedCount} of {totalCount} tasks fulfilled
          </p>
        </div>
      </div>

      {/* Tasks Title */}
      <h2 className="text-[#e0d6c8] tracking-tight text-xl font-serif font-bold leading-tight px-4 text-left pt-4 pb-2 flex items-center gap-2">
        Today's Tasks
      </h2>

      {/* Tasks List */}
      <div className="flex flex-col px-4 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-[#9dabb9]">
            <p className="font-serif italic">No duties found</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`group relative flex items-center gap-4 p-4 rounded-xl border shadow-sm transition-all hover:border-[#bfa372]/50 ${
                task.completedAt
                  ? 'bg-[#201d1a] border-[#443f38] shadow-inner opacity-80'
                  : 'bg-[#262320] border-[#443f38] hover:shadow-[0_4px_20px_-2px_rgba(191,163,114,0.15)]'
              }`}
            >
              <button
                onClick={() => toggleTaskStatus(task.id)}
                className={`flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors ${
                  task.completedAt
                    ? 'border-[#bfa372] bg-[#bfa372]'
                    : 'border-[#5c5246] group-hover:border-[#bfa372] bg-[#1a1614]'
                }`}
              >
                {task.completedAt && (
                  <Check className="w-[18px] h-[18px] text-white font-bold" strokeWidth={3} />
                )}
              </button>
              <div className="flex flex-1 flex-col gap-1">
                <p className={`text-base font-semibold leading-tight font-serif ${
                  task.completedAt
                    ? 'text-[#e0d6c8] line-through opacity-60 decoration-[#bfa372]/50'
                    : 'text-[#e0d6c8]'
                }`}>
                  {task.title}
                </p>
                {task.notes && (
                  <p className="text-xs text-[#9dabb9] mt-1">{task.notes}</p>
                )}
                <div className="flex items-center gap-2">
                  {task.dueDate && (
                    <>
                      <span className={`text-xs font-medium flex items-center gap-1 ${
                        task.completedAt ? 'text-[#9dabb9] opacity-60' : 'text-[#9dabb9]'
                      }`}>
                        <span className="text-[14px]">🕐</span>
                        {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#d1cdbf]"></span>
                    </>
                  )}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border ${
                    task.priority === 'high'
                      ? 'bg-[#bfa372]/20 text-[#d6c4a3] border-[#bfa372]/20'
                      : task.priority === 'medium'
                      ? 'bg-slate-500/20 text-slate-300 border-slate-700/50'
                      : 'bg-[#78866b]/20 text-[#a8b89b] border-[#78866b]/20'
                  } ${task.completedAt && 'opacity-70'}`}>
                    {task.priority === 'high' ? '📖' : task.priority === 'medium' ? '🤝' : '💚'}
                    {task.priority === 'high' ? 'Wisdom' : task.priority === 'medium' ? 'Service' : 'Devotion'}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
