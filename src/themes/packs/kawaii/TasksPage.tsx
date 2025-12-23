'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Settings, Flower2, Check, Sun, Sprout, Calendar } from 'lucide-react';
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
  userName = 'Alex',
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
      case 'high': return 'bg-[#d47a96]/20 text-[#d47a96] border-[#d47a96]/30';
      case 'medium': return 'bg-[#d4b06a]/20 text-[#d4b06a] border-[#d4b06a]/30';
      case 'low': return 'bg-[#a3c9a8]/20 text-[#a3c9a8] border-[#a3c9a8]/30';
    }
  };

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: '#2d1f24',
      fontFamily: '"DM Sans", sans-serif'
    }}>

      {/* Floral pattern overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d47a96\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className="flex flex-col gap-2 p-5 pb-2 pt-6">
          <div className="flex items-center h-14 justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="relative w-14 h-14 rounded-full border-2 border-[#d47a96]/30 p-1 shadow-[0_0_20px_-5px_rgba(212,122,150,0.3)] overflow-hidden group bg-gradient-to-br from-[#d47a96] to-[#b85c78]">
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <Flower2 className="w-7 h-7 text-white" />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 text-[#d47a96] bg-[#3d2a32] rounded-full p-1 shadow-sm border border-[#d47a96]/20">
                  <Sprout className="w-4 h-4" />
                </span>
              </div>
              <div className="flex flex-col">
                <p className="text-[#d47a96] text-xs font-bold tracking-widest uppercase flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'long' })}
                </p>
                <h1 className="text-3xl font-bold leading-tight text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Hello, {userName}
                </h1>
              </div>
            </div>
            <button className="flex items-center justify-center rounded-full w-11 h-11 bg-[#3d2a32] text-rose-100 shadow-sm border border-rose-900/30 hover:bg-[#d47a96]/10 transition-colors group">
              <Settings className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex flex-col gap-2 mb-2 mt-2">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-5 pb-4 pt-2">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center p-2 shrink-0 transform transition-all',
                  d.isToday
                    ? 'min-w-[70px] h-[100px] rounded-t-[40px] rounded-b-[40px] bg-gradient-to-b from-[#d47a96] to-[#b85c78] text-white shadow-lg shadow-[#d47a96]/30 scale-105 border-2 border-white/20 relative overflow-hidden'
                    : 'min-w-[60px] h-[90px] rounded-t-[30px] rounded-b-[30px] bg-[#3d2a32] border border-rose-900/30 text-rose-200/50 hover:-translate-y-1 hover:border-[#d47a96]/40 hover:shadow-[0_0_20px_-5px_rgba(212,122,150,0.3)]'
                )}>
                {d.isToday && <Sun className="w-4 h-4 mt-1 relative z-10 opacity-80" />}
                {!d.isToday && <span className="text-xs font-medium uppercase tracking-wider mt-2">{d.day}</span>}
                <div className="flex flex-col items-center z-10">
                  <span className={cn('font-bold', d.isToday ? 'text-3xl' : 'text-2xl')} style={{ fontFamily: '"Playfair Display", serif' }}>{d.date}</span>
                  {d.isToday && <span className="text-xs font-medium uppercase tracking-wider opacity-90">{d.day}</span>}
                </div>
                {d.isToday && <Flower2 className="w-4 h-4 mb-1 relative z-10" />}
                {!d.isToday && <div className="w-1.5 h-1.5 rounded-full bg-rose-900/30 mb-2" />}
              </button>
            ))}
          </div>
        </div>

        {/* Garden Growth Progress */}
        <div className="px-5 py-2">
          <div className="relative flex flex-col gap-3 p-6 rounded-[2rem] bg-[#3d2a32] border border-rose-900/30 shadow-[0_4px_20px_-2px_rgba(212,122,150,0.15)] overflow-hidden group">
            <div className="absolute -right-6 -bottom-8 w-40 h-40 opacity-10 pointer-events-none rotate-12">
              <Flower2 className="w-full h-full text-[#d47a96]" />
            </div>
            <div className="flex gap-6 justify-between items-start z-10">
              <div>
                <p className="text-white text-xl font-bold leading-normal mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                  Garden Growth
                </p>
                <p className="text-[#9e7f8a] text-xs font-medium flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-[#a3c9a8]" />
                  {completedCount} of {totalCount} seeds planted today
                </p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-[#d47a96] to-[#b85c78] rounded-full flex items-center justify-center shadow-lg shadow-[#d47a96]/20">
                <span className="text-white font-bold text-sm">{progressPercent}%</span>
              </div>
            </div>
            <div className="relative mt-3">
              <div className="rounded-full bg-[#2d1f24] h-3 w-full overflow-hidden border border-rose-900/20">
                <div className="h-full rounded-full bg-gradient-to-r from-[#a3c9a8] to-[#d47a96] transition-all duration-1000 ease-out flex items-center relative"
                  style={{ width: `${progressPercent}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-sm border-2 border-[#d47a96] z-20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d47a96]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Blooms Title */}
        <div className="flex items-center justify-between px-6 pt-6 pb-3">
          <h2 className="text-white tracking-tight text-2xl font-bold leading-tight flex items-center gap-3" style={{ fontFamily: '"Playfair Display", serif' }}>
            <span className="relative flex items-center justify-center w-8 h-8">
              <Sun className="w-7 h-7 text-[#d4b06a] z-10" />
              <span className="absolute inset-0 bg-[#d4b06a]/20 blur-md rounded-full" />
            </span>
            Today's Blooms
          </h2>
          <button className="text-xs font-bold text-[#d47a96] uppercase tracking-wider border border-[#d47a96]/20 px-3 py-1 rounded-full hover:bg-[#d47a96]/5 transition-colors">
            View All
          </button>
        </div>

        {/* Task List */}
        <div className="flex flex-col px-5 gap-3 mb-24">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-[#3d2a32]/50 border border-rose-900/30">
              <div className="text-5xl mb-3">🌸</div>
              <div className="text-white font-medium" style={{ fontFamily: '"Playfair Display", serif' }}>No tasks yet!</div>
              <div className="text-[#9e7f8a] text-sm mt-1">Plant some seeds for your garden~</div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id}
                className={cn(
                  'group relative flex items-center gap-4 p-4 rounded-[1.5rem] border shadow-sm transition-all overflow-hidden',
                  task.status === 'completed'
                    ? 'bg-[#3d2a32]/50 border-rose-900/20 opacity-70'
                    : 'bg-[#3d2a32] border-rose-900/30 hover:shadow-[0_4px_20px_-2px_rgba(212,122,150,0.25)] hover:border-[#d47a96]/30'
                )}>
                <div className="absolute inset-0 bg-gradient-to-r from-[#d47a96]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button onClick={() => toggleTaskStatus(task.id)}
                  className="flex-shrink-0 w-12 h-12 relative flex items-center justify-center transition-all">
                  <div className={cn(
                    'absolute inset-0 rounded-full transition-all duration-300',
                    task.status === 'completed'
                      ? 'bg-gradient-to-tr from-[#d47a96] to-[#b85c78]'
                      : 'border-2 border-dashed border-rose-700 bg-transparent group-hover:border-solid group-hover:border-[#d47a96]'
                  )} />
                  {task.status === 'completed' ? (
                    <Check className="w-5 h-5 text-white z-10" />
                  ) : (
                    <Flower2 className="w-5 h-5 text-[#d47a96] z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
                <div className="flex flex-1 flex-col gap-1.5 z-10">
                  <p className={cn(
                    'text-base font-bold leading-tight transition-colors',
                    task.status === 'completed'
                      ? 'text-[#9e7f8a] line-through decoration-[#d47a96]/50 decoration-2'
                      : 'text-white group-hover:text-rose-100'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3">
                    {task.dueDate && (
                      <span className="text-xs font-medium text-[#9e7f8a] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    )}
                    <span className="w-1 h-1 rounded-full bg-rose-900/50" />
                    <span className={cn(
                      'text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wide',
                      getCategoryStyle(task.priority)
                    )}>
                      {task.priority === 'high' ? 'Work' : task.priority === 'medium' ? 'Health' : 'Personal'}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-[#9e7f8a] hover:text-red-400 rounded-full">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-24 right-5 z-30 flex w-14 h-14 items-center justify-center rounded-full bg-gradient-to-br from-[#d47a96] to-[#b85c78] text-white shadow-xl shadow-[#d47a96]/40 transition-all active:scale-95 hover:scale-110 duration-300 group">
              <Plus className="w-7 h-7 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#3d2a32] border border-rose-900/30 text-white max-w-[90vw] rounded-[2rem] shadow-xl" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2 text-lg" style={{ fontFamily: '"Playfair Display", serif' }}>
                <Flower2 className="w-5 h-5 text-[#d47a96]" />
                Plant a New Seed
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[#9e7f8a] text-sm">Task Name</Label>
                <Input placeholder="What will you grow?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-[#2d1f24] border-rose-900/30 text-white placeholder:text-[#9e7f8a]/50 focus:border-[#d47a96] rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#9e7f8a] text-sm">Notes (optional)</Label>
                <Input placeholder="Details..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-[#2d1f24] border-rose-900/30 text-white placeholder:text-[#9e7f8a]/50 focus:border-[#d47a96] rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#9e7f8a] text-sm">Date</Label>
                  <Input type="date" value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-[#2d1f24] border-rose-900/30 text-white focus:border-[#d47a96] rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#9e7f8a] text-sm">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger className="bg-[#2d1f24] border-rose-900/30 text-white rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3d2a32] border-rose-900/30 rounded-xl">
                      <SelectItem value="low" className="text-[#a3c9a8]">🌿 Personal</SelectItem>
                      <SelectItem value="medium" className="text-[#d4b06a]">🌻 Health</SelectItem>
                      <SelectItem value="high" className="text-[#d47a96]">🌹 Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <button onClick={handleAddTask}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d47a96] to-[#b85c78] text-white font-bold hover:opacity-90 transition-opacity shadow-md">
                Plant Seed 🌱
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
