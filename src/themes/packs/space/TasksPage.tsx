'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Check, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function SpaceTasksPage({
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
    <div className="min-h-screen bg-[#FAF7F2] dark:bg-[#2C2420] font-sans text-stone-800 dark:text-stone-100 antialiased pb-24">
      {/* Header */}
      <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
        <div className="flex items-center h-12 justify-between">
          <div className="flex w-12 h-12 shrink-0 items-center">
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#3D3430] shadow-sm bg-gradient-to-br from-[#8C6A5D] to-[#D4A373] flex items-center justify-center">
              <span className="text-white text-sm font-serif font-bold">A</span>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-white dark:bg-[#3D3430] text-stone-600 dark:text-white shadow-sm border border-stone-100 dark:border-stone-700">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-stone-500 dark:text-stone-400 text-xs font-medium italic font-serif">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="text-stone-900 dark:text-white tracking-tight text-[28px] font-serif font-bold leading-tight text-[#8C6A5D] dark:text-[#EAD8C8]">Daily Duties</h1>
          </div>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-2">
          {weekDays.map((d, i) => (
            <button key={i}
              className={cn(
                'flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-xl shrink-0 transition-all',
                d.isToday
                  ? 'bg-[#8C6A5D] text-white shadow-lg shadow-[#8C6A5D]/30'
                  : 'bg-white dark:bg-[#3D3430] text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
              )}>
              <span className={cn('text-xs font-medium font-serif', d.isToday ? 'opacity-90' : 'text-stone-400 dark:text-stone-500')}>{d.day}</span>
              <span className="text-lg font-bold">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="flex flex-col gap-2 p-4 rounded-xl bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 shadow-sm">
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold text-stone-800 dark:text-white font-serif">Stewardship Progress</p>
            <p className="text-xs font-medium text-[#8C6A5D]">{Math.round(progressValue)}%</p>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-100 dark:bg-stone-700 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#8C6A5D] to-[#D4A373]" style={{ width: `${progressValue}%` }} />
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">{completedCount}/{tasks.length} Duties Completed</p>
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-stone-900 dark:text-white tracking-tight text-lg font-serif font-bold leading-tight px-4 text-left pt-4 pb-2">Today's Tasks</h2>

      {/* Task List */}
      <div className="flex flex-col px-4 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700">
            <div className="text-4xl mb-2">🙏</div>
            <div className="text-stone-500 dark:text-stone-400 font-serif italic">No duties found</div>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            const priorityStyle = task.priority === 'high'
              ? 'bg-[#8C6A5D]/10 text-[#8C6A5D]'
              : task.priority === 'medium'
              ? 'bg-[#A3C4BC]/20 text-teal-700 dark:text-[#A3C4BC]'
              : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400';
            return (
              <div key={task.id}
                className={cn(
                  'group relative flex items-center gap-4 p-3 rounded-lg bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 shadow-sm transition-all',
                  !isCompleted && 'hover:border-[#8C6A5D]/30',
                  isCompleted && 'opacity-80'
                )}>
                <button onClick={() => toggleTaskStatus(task.id)}
                  className={cn(
                    'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                    isCompleted
                      ? 'border-[#8C6A5D] bg-[#8C6A5D]'
                      : 'border-stone-300 dark:border-stone-600 group-hover:border-[#8C6A5D]'
                  )}>
                  {isCompleted && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex flex-1 flex-col gap-1">
                  <p className={cn(
                    'text-sm font-medium',
                    isCompleted ? 'line-through text-stone-400 dark:text-stone-500' : 'text-stone-800 dark:text-white'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2">
                    {task.dueDate && (
                      <>
                        <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                      </>
                    )}
                    <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide', priorityStyle)}>
                      {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  className="p-2 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
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
          <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-[#8C6A5D] text-white shadow-lg shadow-[#8C6A5D]/40 transition-transform active:scale-95 hover:scale-105 border-4 border-[#FAF7F2] dark:border-[#2C2420]">
            <Plus className="w-7 h-7" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-[#3D3430] border border-stone-100 dark:border-stone-700 text-stone-900 dark:text-white max-w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-serif font-bold">New Duty</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Title</Label>
              <Input
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl focus:border-[#8C6A5D]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Notes</Label>
              <Input
                placeholder="Additional details..."
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl focus:border-[#8C6A5D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Due Date</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl focus:border-[#8C6A5D]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-stone-500 dark:text-stone-400 text-sm font-medium">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger className="bg-[#FAF7F2] dark:bg-[#2C2420] border-stone-200 dark:border-stone-600 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#3D3430] border-stone-200 dark:border-stone-600 rounded-xl">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={handleAddTask}
              className="w-full py-3 rounded-xl bg-[#8C6A5D] text-white font-serif font-semibold hover:opacity-90 transition-all"
            >
              Add Duty
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
