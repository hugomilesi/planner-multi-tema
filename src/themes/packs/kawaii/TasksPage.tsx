'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Settings, Flower2, Check, Sun } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function KawaiiTasksPage({
  tasks,
  filteredTasks,
  filter,
  setFilter,
  isDialogOpen,
  setIsDialogOpen,
  newTask,
  setNewTask,
  handleAddTask,
  toggleTaskStatus,
  deleteTask,
  userName = 'User',
}: TasksPageProps) {
  const today = new Date();
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(), date: d.getDate(), isToday: i === 0 };
  });

  const getCategoryStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-[#f3e6e8] text-[#9e4250] border-[#e8d0d4]';
      case 'medium': return 'bg-[#fdf6e6] text-[#b88c3a] border-[#f0e0c0]';
      case 'low': return 'bg-[#e8efec] text-[#5c7a6e] border-[#d1e0da]';
    }
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-lora)]"
      style={{ backgroundColor: '#fdfaf6' }}>

      {/* Background decorations */}
      <div className="fixed inset-0 z-0 bg-cover bg-center opacity-25 mix-blend-multiply"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=2832&auto=format&fit=crop')" }} />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90" />
      <div className="fixed top-0 right-0 z-0 w-64 h-64 bg-cover opacity-30 rounded-bl-[100px] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=2606&auto=format&fit=crop')" }} />

      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className="flex flex-col gap-2 p-5 pb-2 pt-6">
          <div className="flex items-center h-14 justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative w-14 h-14 rounded-[2rem_2rem_0.5rem_2rem] border-2 border-[#c05b6a]/30 p-1 shadow-[0_0_20px_-5px_rgba(192,91,106,0.3)] rotate-[-5deg] overflow-hidden group bg-gradient-to-br from-[#c05b6a] to-[#9e4250]">
                  <div className="w-full h-full rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl">🌺</span>
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 text-[#c05b6a] bg-white rounded-full p-1 shadow-sm border border-[#c05b6a]/20">
                  <Flower2 className="w-4 h-4 animate-bounce" />
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#7a9187] text-xs font-bold tracking-widest uppercase flex items-center gap-1 font-[family-name:var(--font-playfair)]">
                  <Flower2 className="w-3 h-3" />
                  {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' })}
                </p>
                <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold leading-tight"
                  style={{ background: 'linear-gradient(135deg, #c05b6a 0%, #d4b06a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Hello, {userName}
                </h1>
              </div>
            </div>
            <button className="flex items-center justify-center rounded-full w-11 h-11 bg-white/50 backdrop-blur-md text-[#594a42] shadow-sm border border-[#eaddd5] hover:bg-[#c05b6a]/10 transition-colors group">
              <Settings className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex flex-col gap-2 mb-2 mt-2">
          <div className="flex overflow-x-auto no-scrollbar gap-4 px-5 pb-4 pt-2 snap-x">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'snap-center flex flex-col items-center justify-between p-2 shrink-0 transform transition-all',
                  d.isToday
                    ? 'min-w-[70px] h-[110px] rounded-t-[40px] rounded-b-[40px] bg-gradient-to-b from-[#c05b6a] to-[#9e4250] text-white shadow-lg shadow-[#c05b6a]/30 scale-105 border-2 border-white/20 relative overflow-hidden'
                    : 'min-w-[65px] h-[100px] rounded-t-[35px] rounded-b-[35px] bg-white/85 backdrop-blur-md border border-[#eaddd5] text-[#968b83] hover:-translate-y-1 hover:border-[#c05b6a]/40 hover:shadow-[0_0_20px_-5px_rgba(192,91,106,0.3)] my-auto'
                )}>
                {d.isToday && <Sun className="w-4 h-4 mt-1 relative z-10 opacity-80" />}
                {!d.isToday && <span className="text-xs font-medium uppercase tracking-wider mt-2 group-hover:text-[#c05b6a] transition-colors">{d.day}</span>}
                <div className="flex flex-col items-center z-10">
                  <span className={cn('font-[family-name:var(--font-playfair)] font-bold', d.isToday ? 'text-3xl' : 'text-2xl')}>{d.date}</span>
                  {d.isToday && <span className="text-xs font-medium uppercase tracking-wider opacity-90">{d.day}</span>}
                </div>
                {d.isToday && <Flower2 className="w-4 h-4 mb-1 relative z-10" />}
                {!d.isToday && <div className="w-1.5 h-1.5 rounded-full bg-[#7a9187]/30 mb-2" />}
              </button>
            ))}
          </div>
        </div>

        {/* Garden Growth Progress */}
        <div className="px-5 py-2">
          <div className="relative flex flex-col gap-3 p-6 rounded-[2rem_0.5rem_2rem_0.5rem] bg-white/85 backdrop-blur-md border border-[#c05b6a]/10 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] overflow-hidden group">
            <div className="absolute -right-6 -bottom-8 w-40 h-40 bg-contain bg-no-repeat bg-center opacity-10 pointer-events-none rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6">
              <Flower2 className="w-full h-full text-[#c05b6a]" />
            </div>
            <div className="flex gap-6 justify-between items-start z-10">
              <div>
                <p className="text-[#594a42] text-xl font-[family-name:var(--font-playfair)] font-bold leading-normal mb-1">
                  Garden Growth
                </p>
                <p className="text-[#968b83] text-xs font-medium italic flex items-center gap-1.5">
                  <Flower2 className="w-3.5 h-3.5 text-[#7a9187]" />
                  {completedCount} of {totalCount} seeds planted today
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#c05b6a] to-[#9e4250] flex items-center justify-center shadow-lg shadow-[#c05b6a]/20"
                style={{ clipPath: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)' }}>
                <span className="text-white font-bold font-[family-name:var(--font-playfair)] text-sm">{progressPercent}%</span>
              </div>
            </div>
            <div className="relative mt-3">
              <div className="rounded-full bg-[#f0ede6] h-3 w-full overflow-hidden border border-[#eaddd5] shadow-inner">
                <div className="h-full rounded-full bg-gradient-to-r from-[#d4b06a] via-[#c05b6a] to-[#9e4250] transition-all duration-1000 ease-out flex items-center relative"
                  style={{ width: `${progressPercent}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-sm border-2 border-[#c05b6a] z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c05b6a]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Blooms Title */}
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <h2 className="text-[#594a42] tracking-tight text-2xl font-[family-name:var(--font-playfair)] font-bold leading-tight flex items-center gap-3">
            <span className="relative flex items-center justify-center w-8 h-8">
              <Sun className="w-7 h-7 text-[#d4b06a] z-10" />
              <span className="absolute inset-0 bg-[#d4b06a]/20 blur-md rounded-full" />
            </span>
            Today's Blooms
          </h2>
          <button className="text-xs font-bold text-[#c05b6a] uppercase tracking-wider border border-[#c05b6a]/20 px-3 py-1 rounded-full hover:bg-[#c05b6a]/5 transition-colors">
            View All
          </button>
        </div>

        {/* Task List */}
        <div className="flex flex-col px-5 gap-4 mb-24">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white/85 backdrop-blur-md border border-[#eaddd5]">
              <div className="text-5xl mb-3">🌸</div>
              <div className="text-[#594a42] font-[family-name:var(--font-playfair)] font-medium">No tasks yet!</div>
              <div className="text-[#968b83] text-sm mt-1">Plant some seeds for your garden~</div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id}
                className={cn(
                  'group relative flex items-center gap-4 p-5 rounded-3xl backdrop-blur-md border shadow-sm transition-all overflow-hidden',
                  task.status === 'completed'
                    ? 'bg-white/40 border-[#eaddd5] opacity-80'
                    : 'bg-white/85 border-[#c05b6a]/10 hover:shadow-md hover:border-[#c05b6a]/30'
                )}>
                <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#c05b6a]/5 to-transparent" />
                <button onClick={() => toggleTaskStatus(task.id)}
                  className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center transition-all group/btn">
                  <div className={cn(
                    'absolute inset-0 rounded-[2rem_2rem_0.5rem_2rem] transition-transform duration-500 shadow-md',
                    task.status === 'completed'
                      ? 'bg-gradient-to-tr from-[#c05b6a] to-[#d06c7b] rotate-45 group-hover:rotate-90'
                      : 'border-2 border-dashed border-[#c05b6a]/30 bg-white rotate-[-10deg] group-hover:rotate-0 group-hover:border-solid group-hover:border-[#c05b6a]'
                  )} />
                  {task.status === 'completed' ? (
                    <Check className="w-5 h-5 text-white z-10" />
                  ) : (
                    <Flower2 className="w-5 h-5 text-[#c05b6a] z-10 opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100" />
                  )}
                </button>
                <div className="flex flex-1 flex-col gap-1.5 z-10">
                  <p className={cn(
                    'text-lg font-bold leading-tight font-[family-name:var(--font-playfair)] transition-colors',
                    task.status === 'completed'
                      ? 'text-[#968b83] line-through decoration-[#7a9187]/30 decoration-2'
                      : 'text-[#594a42] group-hover:text-[#c05b6a]'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3">
                    {task.dueDate && (
                      <span className="text-xs font-medium text-[#968b83] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    <span className="w-1 h-1 rounded-full bg-[#4d4242]/30" />
                    <span className={cn(
                      'text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide',
                      getCategoryStyle(task.priority)
                    )}>
                      {task.priority === 'high' ? 'Work' : task.priority === 'medium' ? 'Health' : 'Personal'}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[#968b83] hover:text-[#c05b6a] rounded-full">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2">
                  <Flower2 className="w-10 h-10 text-[#c05b6a]/40 rotate-12" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-24 right-5 z-30 flex w-16 h-16 items-center justify-center rounded-full bg-gradient-to-br from-[#c05b6a] via-[#d06c7b] to-[#9e4250] text-white shadow-xl shadow-[#c05b6a]/40 transition-all active:scale-95 hover:scale-110 duration-300 group ring-4 ring-white/30 backdrop-blur-sm">
              <div className="absolute inset-0 rounded-full border border-white/40 animate-pulse" />
              <Plus className="w-8 h-8 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#fdfaf6] border border-[#eaddd5] text-[#594a42] max-w-[90vw] rounded-3xl shadow-xl">
            <DialogHeader>
              <DialogTitle className="text-[#c05b6a] flex items-center gap-2 text-lg font-[family-name:var(--font-playfair)]">
                <Flower2 className="w-5 h-5" />
                Plant a New Seed
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[#968b83] text-sm">Task Name</Label>
                <Input placeholder="What will you grow?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-white border-[#eaddd5] text-[#594a42] placeholder:text-[#968b83] focus:border-[#c05b6a] rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#968b83] text-sm">Notes (optional)</Label>
                <Input placeholder="Details..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-white border-[#eaddd5] text-[#594a42] placeholder:text-[#968b83] focus:border-[#c05b6a] rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#968b83] text-sm">Date</Label>
                  <Input type="date" value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-white border-[#eaddd5] text-[#594a42] focus:border-[#c05b6a] rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#968b83] text-sm">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger className="bg-white border-[#eaddd5] text-[#594a42] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#eaddd5] rounded-xl">
                      <SelectItem value="low" className="text-[#5c7a6e]">🌿 Personal</SelectItem>
                      <SelectItem value="medium" className="text-[#b88c3a]">🌻 Health</SelectItem>
                      <SelectItem value="high" className="text-[#9e4250]">🌹 Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <button onClick={handleAddTask}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c05b6a] to-[#9e4250] text-white font-medium hover:opacity-90 transition-opacity shadow-md font-[family-name:var(--font-playfair)]">
                Plant Seed 🌱
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
