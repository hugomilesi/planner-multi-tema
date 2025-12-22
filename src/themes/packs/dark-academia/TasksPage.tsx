'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Check, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function DarkAcademiaTasksPage({
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
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progressValue = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen bg-[#141414] font-sans text-white antialiased pb-24">
      {/* Background gradient - DARK MODE */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#141414] to-[#0A0A0A] -z-10" />

      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 sticky top-0 z-10 bg-[#141414]/80 backdrop-blur-md border-b border-transparent transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-12 h-12 rounded-full ring-2 ring-[#C5A065]/30 group-hover:ring-[#C5A065]/60 transition-all shadow-md bg-gradient-to-br from-[#C5A065] to-[#A6854F] flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">{userName.charAt(0).toUpperCase()}</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#141414]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-0.5">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
            <h2 className="text-2xl font-serif font-semibold text-stone-100 leading-none">Tasks, {userName}</h2>
          </div>
        </div>
        <button className="flex items-center justify-center rounded-full w-11 h-11 bg-[#1E1E1E] border border-[#333333] text-stone-200 hover:text-[#C5A065] transition-colors shadow-sm">
          <Filter className="w-5 h-5" />
        </button>
      </header>

      {/* Calendar Strip */}
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-6 py-2">
          {weekDays.map((d, i) => (
            <button key={i}
              className={cn(
                'flex flex-col items-center justify-center min-w-[3.5rem] h-20 rounded-2xl shrink-0 transition-all',
                d.isToday
                  ? 'bg-[#C5A065] text-stone-900 shadow-xl shadow-[#C5A065]/10 transform scale-105 border border-[#C5A065]'
                  : 'bg-[#1E1E1E] text-stone-400 border border-[#333333] hover:border-[#C5A065]/50 group'
              )}>
              <span className={cn('text-[10px] font-bold uppercase tracking-wider mb-1', d.isToday && 'opacity-80')}>{d.day}</span>
              <span className={cn('text-xl font-serif font-bold', !d.isToday && 'group-hover:text-white')}>{d.date}</span>
              {d.isToday && <div className={cn('w-1 h-1 rounded-full mt-1', 'bg-stone-900')} />}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-6 mt-6">
        <div className="flex flex-col gap-3 p-5 rounded-xl bg-[#1E1E1E] border border-[#333333] shadow-sm">
          <div className="flex gap-4 justify-between items-end">
            <div className="flex flex-col gap-1">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Daily Goal</p>
              <p className="text-[#B08D55] text-2xl font-serif italic">{Math.round(progressValue)}%</p>
            </div>
            <p className="text-[#78716C] text-xs pb-1">{completedCount} of {tasks.length} completed</p>
          </div>
          <div className="rounded-full bg-stone-900 h-1.5 w-full overflow-hidden mt-1">
            <div className="h-full rounded-full bg-[#B08D55] shadow-[0_0_10px_rgba(176,141,85,0.4)] transition-all duration-700 ease-out" style={{ width: `${progressValue}%` }} />
          </div>
        </div>
      </div>

      {/* Headline */}
      <div className="px-6 pt-4 pb-3 flex items-center justify-between">
        <h2 className="text-white text-xl font-serif font-medium">Today's Tasks</h2>
        <button className="text-xs font-medium text-[#B08D55] hover:text-[#9E8256] transition-colors uppercase tracking-wider">View All</button>
      </div>

      {/* Task List */}
      <div className="flex flex-col px-6 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#292524] border border-[#44403C]">
            <div className="text-4xl mb-2">📚</div>
            <div className="text-[#78716C] font-serif italic">No tasks found</div>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const priorityStyle = task.priority === 'high'
              ? 'bg-stone-800 text-stone-300'
              : task.priority === 'medium'
              ? 'bg-orange-900/20 text-orange-300'
              : 'bg-green-900/20 text-green-300';
            return (
              <div key={task.id}
                className={cn(
                  'group relative flex items-start gap-4 p-4 rounded-xl bg-[#292524] shadow-sm border border-transparent transition-all',
                  !isCompleted && 'hover:border-[#B08D55]/20',
                  isCompleted && 'opacity-60'
                )}>
                <button onClick={() => toggleTaskStatus(task.id)}
                  className={cn(
                    'mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all',
                    isCompleted
                      ? 'border-[#B08D55] bg-[#B08D55] shadow-sm'
                      : 'border-[#B08D55]/40 group-hover:border-[#B08D55] hover:bg-[#B08D55]/10'
                  )}>
                  {isCompleted && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex flex-1 flex-col gap-1.5 min-w-0">
                  <p className={cn(
                    'text-base font-serif font-medium leading-snug transition-colors truncate',
                    isCompleted ? 'line-through text-gray-500 decoration-[#B08D55]/30' : 'text-white group-hover:text-[#B08D55]'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {task.dueDate && (
                      <span className="text-xs font-medium text-[#78716C] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#B08D55]/70" />
                        {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    )}
                    <span className={cn('text-[9px] font-bold tracking-wide px-2 py-0.5 rounded uppercase', priorityStyle)}>
                      {task.priority === 'high' ? 'Work' : task.priority === 'medium' ? 'Health' : 'Personal'}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  className="p-2 text-stone-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* FAB */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-24 right-6 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-[#B08D55] text-white shadow-[0_10px_30px_-10px_rgba(176,141,85,0.3)] transition-transform active:scale-90 hover:scale-105 hover:bg-[#9c7b48]">
            <Plus className="w-7 h-7" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#1E1E1E] border border-[#333333] text-white max-w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-serif font-bold">New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Title</Label>
              <Input
                placeholder="What do you need to do?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="bg-[#F9F8F6] dark:bg-[#141414] border-[#E5E0D8] dark:border-[#333333] rounded-xl focus:border-[#C5A065]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Notes</Label>
              <Input
                placeholder="Additional details..."
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="bg-[#F9F8F6] dark:bg-[#141414] border-[#E5E0D8] dark:border-[#333333] rounded-xl focus:border-[#C5A065]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Due Date</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-[#F9F8F6] dark:bg-[#141414] border-[#E5E0D8] dark:border-[#333333] rounded-xl focus:border-[#C5A065]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Category</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger className="bg-[#F9F8F6] dark:bg-[#141414] border-[#E5E0D8] dark:border-[#333333] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#1E1E1E] border-[#E5E0D8] dark:border-[#333333] rounded-xl">
                    <SelectItem value="high">Work</SelectItem>
                    <SelectItem value="medium">Health</SelectItem>
                    <SelectItem value="low">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={handleAddTask}
              className="w-full py-3 rounded-xl bg-stone-900 dark:bg-[#C5A065] text-[#C5A065] dark:text-stone-900 font-serif font-semibold hover:opacity-90 transition-all"
            >
              Add Task
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
