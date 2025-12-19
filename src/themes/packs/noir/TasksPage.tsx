'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Check, Zap, SlidersHorizontal, Rocket } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function NoirTasksPage({
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
}: TasksPageProps) {
  const today = new Date();
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressValue = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const weekDays = Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  const getCategoryStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', icon: '📚', label: 'School' };
      case 'medium': return { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', icon: '⚽', label: 'Fun' };
      case 'low': return { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', icon: '📖', label: 'Books' };
    }
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-fredoka)] text-slate-800"
      style={{ backgroundColor: '#FFFBEB' }}>

      <div className="relative pb-28">
        {/* Header */}
        <div className="flex flex-col gap-2 p-5 pt-8">
          <div className="flex items-center h-14 justify-between">
            <div className="flex w-14 h-14 shrink-0 items-center justify-center p-1 bg-white rounded-full border-4 border-[#FFD166] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#118AB2] flex items-center justify-center">
                <span className="text-xl">😊</span>
              </div>
            </div>
            <button className="flex items-center justify-center rounded-2xl w-12 h-12 bg-white text-[#118AB2] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] border-2 border-[#118AB2]/20 hover:scale-105 transition-transform">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between items-end mt-2 px-1">
            <div>
              <p className="text-[#118AB2] text-lg font-semibold tracking-wide">
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
              <h1 className="text-slate-800 text-3xl font-bold leading-tight mt-1">Hi, Alex! 👋</h1>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-5 pb-4">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'group flex flex-col items-center justify-center min-w-[72px] h-[96px] rounded-[24px] transform transition-all active:scale-95',
                  d.isToday
                    ? 'bg-[#FF6B6B] text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,0.15)] border-2 border-[#FF6B6B] ring-2 ring-white ring-offset-2'
                    : 'bg-white border-2 border-slate-100 text-slate-400 shadow-sm hover:border-[#FFD166] hover:text-[#FFD166]'
                )}>
                <span className="text-sm font-semibold">{d.day}</span>
                <span className={cn('text-3xl font-bold mt-1', !d.isToday && 'text-slate-700')}>{d.date}</span>
                {d.isToday && <span className="text-xl mt-1 animate-pulse">⭐</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Super Power Progress */}
        <div className="px-5 py-2">
          <div className="flex flex-col gap-4 p-6 rounded-[32px] bg-white border-2 border-[#118AB2]/10 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#FFD166]/20 rounded-full blur-xl" />
            <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-[#4ECDC4]/20 rounded-full blur-xl" />
            <div className="flex gap-6 justify-between items-center relative z-10">
              <div className="flex items-center gap-2">
                <Zap className="w-8 h-8 text-[#FFD166] fill-[#FFD166]" />
                <p className="text-slate-800 text-lg font-bold">Super Power</p>
              </div>
              <span className="text-white text-sm font-bold bg-[#FF6B6B] px-3 py-1 rounded-full shadow-sm">
                Level {Math.round(progressValue)}%
              </span>
            </div>
            <div className="relative z-10">
              <div className="rounded-full bg-slate-100 h-4 w-full overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-[#FFD166] to-[#FF6B6B] transition-all duration-500 ease-out flex items-center justify-end pr-1"
                  style={{ width: `${progressValue}%` }}>
                  <div className="w-2 h-2 bg-white/50 rounded-full" />
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-slate-400 text-xs font-semibold">Keep going!</p>
                <p className="text-[#118AB2] text-xs font-bold">{completedCount}/{tasks.length} Missions Done</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <div className="px-5 pt-6 pb-3 flex items-center gap-2">
          <h2 className="text-slate-800 text-2xl font-bold">Today's Missions</h2>
          <span className="bg-[#FFD166]/20 text-[#FFD166] p-1 rounded-lg">
            <Rocket className="w-5 h-5" />
          </span>
        </div>

        {/* Task List */}
        <div className="flex flex-col px-5 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-[24px] bg-white border-2 border-slate-100 shadow-sm">
              <div className="text-5xl mb-3">🎉</div>
              <div className="text-slate-600 font-bold text-lg">All missions complete!</div>
              <div className="text-slate-400 text-sm mt-1">You're a superstar!</div>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const style = getCategoryStyle(task.priority);
              const isCompleted = task.status === 'completed';
              const hoverColors = {
                high: 'hover:border-[#4ECDC4]',
                medium: 'hover:border-[#FFD166]',
                low: 'hover:border-[#118AB2]',
              };
              return (
                <div key={task.id}
                  className={cn(
                    'group relative flex items-center gap-4 p-4 rounded-[24px] transition-all',
                    isCompleted
                      ? 'bg-slate-50 border-2 border-slate-100 opacity-90 shadow-sm'
                      : `bg-white border-2 border-transparent shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] ${hoverColors[task.priority]}`
                  )}>
                  <button onClick={() => toggleTaskStatus(task.id)}
                    className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-full border-4 flex items-center justify-center transition-colors',
                      isCompleted
                        ? 'bg-[#FF6B6B] border-[#FF6B6B]'
                        : 'border-slate-200 bg-white group-hover:border-[#4ECDC4]'
                    )}>
                    {isCompleted && <Check className="w-5 h-5 text-white" />}
                  </button>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className={cn(
                      'text-lg font-bold leading-tight',
                      isCompleted ? 'text-slate-400 line-through decoration-2 decoration-[#FF6B6B]' : 'text-slate-800'
                    )}>
                      {task.title}
                    </p>
                    <div className={cn('flex items-center gap-3 mt-1', isCompleted && 'opacity-60')}>
                      <span className={cn('text-xs font-bold px-3 py-1 rounded-full border', style.bg, style.text, style.border)}>
                        {style.icon} {style.label}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </span>
                      )}
                    </div>
                  </div>
                  <button onClick={() => deleteTask(task.id)}
                    className="p-2 text-slate-300 hover:text-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {!isCompleted && (
                    <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <span className="text-3xl">{task.priority === 'high' ? '😊' : task.priority === 'medium' ? '☀️' : '📚'}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-28 right-5 z-20 flex w-16 h-16 items-center justify-center rounded-full bg-[#FFD166] text-slate-800 shadow-xl shadow-[#FFD166]/40 transition-transform active:scale-90 hover:scale-110 border-4 border-white">
              <Plus className="w-9 h-9" strokeWidth={3} />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#FFFBEB] border-2 border-[#FFD166]/30 text-slate-800 max-w-[90vw] rounded-[24px] shadow-[5px_5px_0px_0px_rgba(0,0,0,0.1)]">
            <DialogHeader>
              <DialogTitle className="text-slate-800 text-xl font-bold flex items-center gap-2">
                <span className="text-2xl">🚀</span> New Mission
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-slate-600 text-sm font-bold">What's the mission?</Label>
                <Input
                  placeholder="Enter your mission..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-white border-2 border-slate-200 rounded-xl focus:border-[#4ECDC4]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-slate-600 text-sm font-bold">Extra notes</Label>
                <Input
                  placeholder="Any details..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-white border-2 border-slate-200 rounded-xl focus:border-[#4ECDC4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-600 text-sm font-bold">When?</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-white border-2 border-slate-200 rounded-xl focus:border-[#4ECDC4]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-slate-600 text-sm font-bold">Type</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-white border-2 border-slate-200 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-slate-200 rounded-xl">
                      <SelectItem value="high">📚 School</SelectItem>
                      <SelectItem value="medium">⚽ Fun</SelectItem>
                      <SelectItem value="low">📖 Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 bg-[#FF6B6B] text-white rounded-xl font-bold text-lg shadow-[0_4px_0_rgb(220,38,38)] active:shadow-none active:translate-y-[4px] transition-all"
              >
                Start Mission! 🎯
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
