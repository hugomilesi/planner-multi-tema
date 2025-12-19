'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Check, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function OceanTasksPage({
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

  const getCategoryStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return { bg: 'bg-purple-100 dark:bg-purple-500/20', text: 'text-purple-700 dark:text-purple-300', label: 'Work' };
      case 'medium': return { bg: 'bg-orange-100 dark:bg-orange-500/20', text: 'text-orange-700 dark:text-orange-300', label: 'Health' };
      case 'low': return { bg: 'bg-blue-100 dark:bg-blue-500/20', text: 'text-blue-700 dark:text-blue-300', label: 'Education' };
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#101922] font-[family-name:var(--font-inter)] text-[#111418] dark:text-white overflow-x-hidden pb-24">

      {/* Top AppBar */}
      <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
        <div className="flex items-center h-12 justify-between">
          <div className="flex w-12 h-12 shrink-0 items-center">
            <div className="w-10 h-10 rounded-full border-2 border-white dark:border-[#1c2127] shadow-sm bg-gradient-to-br from-[#137fec] to-[#0ea5e9] flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-white dark:bg-[#1c2127] text-[#111418] dark:text-white shadow-sm border border-[#e5e7eb] dark:border-[#283039]">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-[#637588] dark:text-[#9dabb9] text-sm font-medium">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="text-[#111418] dark:text-white tracking-tight text-[28px] font-bold leading-tight">Good Morning, Alex</h1>
          </div>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-2">
          {weekDays.map((d, i) => (
            <button key={i}
              className={cn(
                'flex flex-col items-center justify-center min-w-[64px] h-[84px] rounded-2xl shrink-0 transform transition-transform active:scale-95',
                d.isToday
                  ? 'bg-[#137fec] text-white shadow-md shadow-[#137fec]/30'
                  : 'bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] text-[#637588] dark:text-[#9dabb9]'
              )}>
              <span className={cn('text-xs font-medium', d.isToday && 'opacity-80')}>{d.day}</span>
              <span className={cn('text-2xl font-bold mt-1', !d.isToday && 'text-[#111418] dark:text-white')}>{d.date}</span>
              {d.isToday && <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-2">
        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] shadow-sm">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-[#111418] dark:text-white text-base font-bold leading-normal">Daily Progress</p>
            <span className="text-[#137fec] text-sm font-bold bg-[#137fec]/10 px-2 py-0.5 rounded-md">{Math.round(progressValue)}%</span>
          </div>
          <div className="rounded-full bg-[#e5e7eb] dark:bg-[#3b4754] h-2.5 w-full overflow-hidden">
            <div className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-out" style={{ width: `${progressValue}%` }} />
          </div>
          <p className="text-[#637588] dark:text-[#9dabb9] text-xs font-medium leading-normal">{completedCount}/{tasks.length} Tasks Completed</p>
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-[#111418] dark:text-white tracking-tight text-xl font-bold leading-tight px-4 text-left pt-4 pb-2">Today's Tasks</h2>

      {/* Task List */}
      <div className="flex flex-col px-4 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039]">
            <div className="text-4xl mb-2">✨</div>
            <div className="text-[#637588] dark:text-[#9dabb9]">No tasks found</div>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const style = getCategoryStyle(task.priority);
            const isCompleted = task.status === 'completed';
            return (
              <div key={task.id}
                className={cn(
                  'group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] shadow-sm transition-all',
                  !isCompleted && 'hover:border-[#137fec]/50',
                  isCompleted && 'opacity-80'
                )}>
                <button onClick={() => toggleTaskStatus(task.id)}
                  className={cn(
                    'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                    isCompleted
                      ? 'border-[#137fec] bg-[#137fec]'
                      : 'border-[#d1d5db] dark:border-[#4b5563] group-hover:border-[#137fec]'
                  )}>
                  {isCompleted && <Check className="w-3 h-3 text-white" />}
                </button>
                <div className="flex flex-1 flex-col gap-1">
                  <p className={cn(
                    'text-base font-semibold leading-tight',
                    isCompleted ? 'line-through opacity-50 text-[#111418] dark:text-white' : 'text-[#111418] dark:text-white'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2">
                    {task.dueDate && (
                      <>
                        <span className="text-xs font-medium text-[#637588] dark:text-[#9dabb9] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#d1d5db] dark:bg-[#4b5563]" />
                      </>
                    )}
                    <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', style.bg, style.text)}>
                      {style.label}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  className="p-2 text-[#9dabb9] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
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
          <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-[#137fec] text-white shadow-xl shadow-[#137fec]/40 transition-transform active:scale-90 hover:scale-105">
            <Plus className="w-8 h-8" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white dark:bg-[#1c2127] border border-[#e5e7eb] dark:border-[#283039] text-[#111418] dark:text-white max-w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#111418] dark:text-white text-lg font-bold">New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-[#637588] dark:text-[#9dabb9] text-sm font-medium">Title</Label>
              <Input
                placeholder="What do you need to do?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="bg-[#f6f7f8] dark:bg-[#101922] border-[#e5e7eb] dark:border-[#283039] rounded-xl focus:border-[#137fec]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#637588] dark:text-[#9dabb9] text-sm font-medium">Notes</Label>
              <Input
                placeholder="Additional details..."
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="bg-[#f6f7f8] dark:bg-[#101922] border-[#e5e7eb] dark:border-[#283039] rounded-xl focus:border-[#137fec]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#637588] dark:text-[#9dabb9] text-sm font-medium">Due Date</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-[#f6f7f8] dark:bg-[#101922] border-[#e5e7eb] dark:border-[#283039] rounded-xl focus:border-[#137fec]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#637588] dark:text-[#9dabb9] text-sm font-medium">Category</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger className="bg-[#f6f7f8] dark:bg-[#101922] border-[#e5e7eb] dark:border-[#283039] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-[#1c2127] border-[#e5e7eb] dark:border-[#283039] rounded-xl">
                    <SelectItem value="high">Work</SelectItem>
                    <SelectItem value="medium">Health</SelectItem>
                    <SelectItem value="low">Education</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={handleAddTask}
              className="w-full py-3 rounded-xl bg-[#137fec] text-white font-semibold hover:bg-[#137fec]/90 transition-all"
            >
              Add Task
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
