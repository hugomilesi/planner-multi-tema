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
      <div className="flex flex-col gap-2 p-6 pb-2 pt-8">
        <div className="flex items-center h-12 justify-between">
          <div className="flex w-12 h-12 shrink-0 items-center">
            <div className="w-12 h-12 rounded-full border border-white/50 shadow-sm bg-gradient-to-br from-[#B08D55] to-[#9E8256] flex items-center justify-center">
              <span className="text-white text-sm font-serif font-bold">A</span>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-full w-10 h-10 bg-[#292524] text-white shadow-sm border border-[#44403C] hover:bg-[#B08D55]/10 transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end mt-4">
          <div>
            <p className="text-[#B08D55] font-serif italic text-base mb-1">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="text-white tracking-tight text-3xl font-serif font-medium leading-tight">Good Morning,<br/>Alex.</h1>
          </div>
        </div>
      </div>

      {/* Date Strip - Pill/Oval style */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-6 pb-4 pt-2">
          {weekDays.map((d, i) => (
            <button key={i}
              className={cn(
                'flex flex-col items-center justify-center min-w-[52px] h-[80px] rounded-full shrink-0 transform transition-all hover:scale-105 active:scale-95',
                d.isToday
                  ? 'bg-[#B08D55] text-white shadow-[0_10px_30px_-10px_rgba(176,141,85,0.3)]'
                  : 'bg-[#292524] border border-[#44403C] text-[#78716C] hover:border-[#B08D55]/50 group'
              )}>
              <span className={cn('text-[10px] font-medium uppercase tracking-wider mt-2', d.isToday ? 'opacity-90' : 'group-hover:text-[#B08D55] transition-colors')}>{d.day}</span>
              <span className={cn('text-xl font-serif font-medium my-auto', !d.isToday && 'text-white')}>{d.date}</span>
              <span className={cn('w-1 h-1 rounded-full mb-3', d.isToday ? 'bg-white' : 'bg-transparent')} />
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-2 mb-2">
        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-[#292524] border border-[#44403C] shadow-sm">
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
