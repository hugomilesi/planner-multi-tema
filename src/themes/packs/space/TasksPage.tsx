'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Check, Filter, Sparkles } from 'lucide-react';
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

  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }), date: d.getDate(), isToday: i === 0 };
  });

  const getCategoryLabel = (priority: string, index: number) => {
    const labels = ['Service', 'Devotion', 'Temple', 'Wisdom'];
    return labels[index % labels.length];
  };

  return (
    <div className="min-h-screen bg-[#1a1614] text-stone-100 antialiased pb-24" style={{ fontFamily: '"Lato", sans-serif' }}>
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 -z-10 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-leather.png')" }} />
      
      {/* Header */}
      <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
        <div className="flex items-center h-12 justify-between">
          <div className="flex w-12 h-12 shrink-0 items-center">
            <div className="w-10 h-10 rounded-full border-2 border-[#3D3430] shadow-sm overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-[#D4A373] to-[#8C6A5D] flex items-center justify-center">
                <span className="text-white text-sm font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>A</span>
              </div>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-[#262320] text-[#bfa372] shadow-sm border border-[#3d3430]">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-[#a09080] text-xs font-medium italic" style={{ fontFamily: '"Playfair Display", serif' }}>
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-[#f5f0e8] tracking-tight text-[28px] font-bold leading-tight" style={{ fontFamily: '"Playfair Display", serif' }}>Blessings, Alex</h1>
          </div>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-2">
          {weekDays.map((d, i) => (
            <button key={i}
              className={cn(
                'flex flex-col items-center justify-center min-w-[3.5rem] h-[4.5rem] rounded-xl shrink-0 transition-all relative',
                d.isToday
                  ? 'bg-[#bfa372] text-[#1a1614] shadow-lg shadow-[#bfa372]/30'
                  : 'bg-[#262320] text-[#a09080] border border-[#3d3430]'
              )}>
              <span className={cn('text-xs font-medium', d.isToday ? 'text-[#1a1614]/80' : 'text-[#6a6050]')} style={{ fontFamily: '"Playfair Display", serif' }}>{d.day}</span>
              <span className="text-xl font-bold">{d.date}</span>
              {d.isToday && <div className="w-1.5 h-1.5 rounded-full bg-[#1a1614] mt-0.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Card - Daily Stewardship */}
      <div className="px-4 py-2">
        <div className="flex flex-col gap-3 p-4 rounded-2xl bg-[#262320] border border-[#3d3430] shadow-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#bfa372]" />
              <p className="text-base font-semibold text-[#f5f0e8] italic" style={{ fontFamily: '"Playfair Display", serif' }}>Daily Stewardship</p>
            </div>
            <div className="bg-[#3d3430] text-[#bfa372] text-sm font-bold px-3 py-1 rounded-full italic" style={{ fontFamily: '"Playfair Display", serif' }}>
              {Math.round(progressValue)}%
            </div>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#3d3430] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#bfa372] to-[#D4A373]" style={{ width: `${progressValue}%` }} />
          </div>
          <p className="text-xs text-[#a09080] italic" style={{ fontFamily: '"Playfair Display", serif' }}>{completedCount} of {tasks.length} tasks fulfilled</p>
        </div>
      </div>

      {/* Headline */}
      <h2 className="text-[#f5f0e8] tracking-tight text-xl font-bold leading-tight px-4 text-left pt-6 pb-3" style={{ fontFamily: '"Playfair Display", serif' }}>Today's Tasks</h2>

      {/* Task List */}
      <div className="flex flex-col px-4 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#262320] border border-[#3d3430]">
            <div className="text-4xl mb-2">🙏</div>
            <div className="text-[#a09080] italic" style={{ fontFamily: '"Playfair Display", serif' }}>No duties found</div>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const isCompleted = task.status === 'completed';
            const categoryLabel = getCategoryLabel(task.priority, index);
            return (
              <div key={task.id}
                className={cn(
                  'group relative flex items-center gap-4 p-4 rounded-2xl bg-[#262320] border border-[#3d3430] shadow-sm transition-all',
                  !isCompleted && 'hover:border-[#bfa372]/30',
                  isCompleted && 'opacity-60'
                )}>
                <button onClick={() => toggleTaskStatus(task.id)}
                  className={cn(
                    'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                    isCompleted
                      ? 'border-[#bfa372] bg-[#bfa372]'
                      : 'border-[#6a6050] group-hover:border-[#bfa372]'
                  )}>
                  {isCompleted && <Check className="w-3.5 h-3.5 text-[#1a1614]" />}
                  {!isCompleted && <Plus className="w-3.5 h-3.5 text-[#6a6050]" />}
                </button>
                <div className="flex flex-1 flex-col gap-1">
                  <p className={cn(
                    'text-base font-medium',
                    isCompleted ? 'line-through text-[#6a6050] italic' : 'text-[#f5f0e8]'
                  )} style={{ fontFamily: '"Playfair Display", serif' }}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-[#bfa372]" />
                    <span className="text-xs text-[#bfa372]">
                      {task.dueDate 
                        ? new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                        : '10:00 AM'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#6a6050]" />
                    <span className="text-xs text-[#a09080] flex items-center gap-1">
                      <span className="text-[#bfa372]">✦</span> {categoryLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FAB */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-[#bfa372] text-[#1a1614] shadow-lg shadow-[#bfa372]/40 transition-transform active:scale-95 hover:scale-105 border-4 border-[#1a1614]">
            <Plus className="w-7 h-7" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#262320] border border-[#3d3430] text-[#f5f0e8] max-w-[90vw] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>New Duty</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-[#a09080] text-sm font-medium">Title</Label>
              <Input
                placeholder="What needs to be done?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="bg-[#1a1614] border-[#3d3430] text-[#f5f0e8] rounded-xl focus:border-[#bfa372]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#a09080] text-sm font-medium">Notes</Label>
              <Input
                placeholder="Additional details..."
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="bg-[#1a1614] border-[#3d3430] text-[#f5f0e8] rounded-xl focus:border-[#bfa372]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#a09080] text-sm font-medium">Due Date</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-[#1a1614] border-[#3d3430] text-[#f5f0e8] rounded-xl focus:border-[#bfa372]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#a09080] text-sm font-medium">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger className="bg-[#1a1614] border-[#3d3430] text-[#f5f0e8] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#262320] border-[#3d3430] text-[#f5f0e8] rounded-xl">
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={handleAddTask}
              className="w-full py-3 rounded-xl bg-[#bfa372] text-[#1a1614] font-semibold hover:opacity-90 transition-all" style={{ fontFamily: '"Playfair Display", serif' }}
            >
              Add Duty
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
