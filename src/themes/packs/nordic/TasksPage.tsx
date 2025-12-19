'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Check, Filter, Plane, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function NordicTasksPage({
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
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(), date: d.getDate(), isToday: i === 0 };
  });

  return (
    <div className="min-h-screen font-sans text-[#2c2825] antialiased pb-24 relative">
      {/* Warm gradient background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'linear-gradient(180deg, #e8d5c4 0%, #dcc4b0 30%, #d4b8a0 60%, #c9a88a 100%)'
      }} />
      {/* Header */}
      <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
        <div className="flex items-center h-12 justify-between">
          <div className="flex w-12 h-12 shrink-0 items-center">
            <div className="w-10 h-10 rounded-full ring-2 ring-[#b58e46] overflow-hidden bg-gradient-to-br from-[#a08060] to-[#6b5040] flex items-center justify-center">
              <span className="text-white text-sm font-serif font-bold">A</span>
            </div>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button className="flex items-center justify-center w-10 h-10 text-[#2c2825]">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div>
            <p className="text-[#5d5650] text-[10px] font-mono font-bold uppercase tracking-widest">
              {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
            </p>
            <h1 className="text-[28px] font-serif font-bold italic text-[#2c2825]">Itinerary</h1>
          </div>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-3 items-end">
        {weekDays.map((d, i) => (
          <button key={i}
            className={cn(
              'flex flex-col items-center justify-center shrink-0 transition-all rounded-lg',
              d.isToday
                ? 'min-w-[3.5rem] h-[4.5rem] bg-[#3b5998] text-white shadow-lg'
                : 'min-w-[3rem] h-14 bg-[#f5efe8] text-[#2c2825] border border-[#e0d5c8]'
            )}>
            <span className={cn('text-[9px] font-mono font-bold tracking-wider uppercase', d.isToday ? 'text-white/80' : 'text-[#8a8078]')}>{d.day}</span>
            <span className={cn('font-bold', d.isToday ? 'text-2xl' : 'text-lg')}>{d.date}</span>
            {d.isToday && <MapPin className="w-3 h-3 mt-0.5 text-white/70" />}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="px-4 mt-2">
        <div className="relative flex flex-col gap-2 p-4 rounded-xl bg-[#f5efe8] border border-[#e0d5c8] shadow-sm overflow-hidden">
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #e8d5c4 0%, #d4b8a0 100%)' }} />
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full" style={{ background: 'linear-gradient(180deg, #e8d5c4 0%, #d4b8a0 100%)' }} />
          <div className="flex justify-between items-center">
            <p className="text-xs font-mono font-bold tracking-wider text-[#2c2825] uppercase">Journey Progress</p>
            <p className="text-base font-serif text-[#8a8078] italic">{Math.round(progressValue)}%</p>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#e8dfc5] overflow-hidden">
            <div className="h-full rounded-full bg-[#c24d3b]" style={{ width: `${progressValue}%` }} />
          </div>
          <p className="text-[10px] text-[#8a8078] font-mono">{completedCount}/{tasks.length} Destinations Reached</p>
        </div>
      </div>

      {/* Headline */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 mt-2">
        <h2 className="text-lg font-serif font-bold italic text-[#2c2825]">Today's Stops</h2>
        <span className="text-[10px] font-mono font-bold text-white bg-[#2c2825] px-2.5 py-1 rounded-full">{pendingCount} Left</span>
      </div>

      {/* Task List */}
      <div className="flex flex-col px-4 gap-2">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-lg bg-[#f5efe8] border border-[#e0d5c8]">
            <div className="text-3xl mb-2">✈️</div>
            <div className="text-[#8a8078] font-serif italic">No stops planned</div>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';
            return (
              <div key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#f5efe8] border border-[#e0d5c8] shadow-sm">
                <button onClick={() => toggleTaskStatus(task.id)}
                  className={cn(
                    'flex-shrink-0 h-5 w-5 rounded border-2 flex items-center justify-center',
                    isCompleted
                      ? 'border-[#2c2825] bg-transparent'
                      : 'border-[#c4b8a8]'
                  )}>
                  {isCompleted && <Check className="w-3 h-3 text-[#2c2825]" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm font-serif truncate',
                    isCompleted ? 'line-through text-[#8a8078]' : 'text-[#2c2825]'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#e8dfc5] text-[#8a8078]">
                      {task.priority === 'high' ? 'UTILITY' : task.priority === 'medium' ? 'HEALTH' : 'WORK'}
                    </span>
                    {task.priority === 'high' && (
                      <span className="text-[10px] text-[#c24d3b] font-medium">Due Today</span>
                    )}
                    {task.dueDate && task.priority !== 'high' && (
                      <span className="text-[10px] text-[#8a8078] font-mono">
                        {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  className="text-[#c4b8a8] hover:text-[#c24d3b] transition-colors shrink-0">
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
          <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-[#c24d3b] text-white shadow-lg shadow-[#c24d3b]/30 transition-transform active:scale-95 hover:scale-105 border-4 border-white">
            <Plus className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-[#f5efe8] border border-[#e0d5c8] text-[#2c2825] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-serif font-bold italic flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#3b5998]" />
              New Destination
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-[#8a8078] text-xs font-mono uppercase">Title</Label>
              <Input
                placeholder="Where to next?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="bg-white border-[#e0d5c8] rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#8a8078] text-xs font-mono uppercase">Notes</Label>
              <Input
                placeholder="Additional details..."
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="bg-white border-[#e0d5c8] rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#8a8078] text-xs font-mono uppercase">Date</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-white border-[#e0d5c8] rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#8a8078] text-xs font-mono uppercase">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger className="bg-white border-[#e0d5c8] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#f5efe8] border-[#e0d5c8] rounded-lg">
                    <SelectItem value="high">Urgent</SelectItem>
                    <SelectItem value="medium">Standard</SelectItem>
                    <SelectItem value="low">Leisure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={handleAddTask}
              className="w-full py-3 rounded-lg bg-[#3b5998] text-white font-mono font-bold uppercase tracking-wider hover:opacity-90 transition-all"
            >
              Add to Itinerary
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
