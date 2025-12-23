'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Check, Bookmark, Plane, MapPin, Briefcase, ShoppingBag, Dumbbell, BookOpen } from 'lucide-react';
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

  const getCategoryStyle = (priority: string, index: number) => {
    const styles = [
      { bg: 'bg-[#f0e8e0]', border: 'border-[#d8c8b8]', accent: '#3d5a6b', label: 'WORK TRIP', icon: Briefcase },
      { bg: 'bg-[#e8f0e8]', border: 'border-[#c8d8c8]', accent: '#6b8e6b', label: 'PERSONAL', icon: ShoppingBag },
      { bg: 'bg-[#f8f0e8]', border: 'border-[#e8d8c8]', accent: '#b58e46', label: 'HEALTH', icon: Dumbbell },
      { bg: 'bg-[#e8e8f0]', border: 'border-[#c8c8d8]', accent: '#6b6b8e', label: 'EDUCATION', icon: BookOpen },
    ];
    return styles[index % styles.length];
  };

  return (
    <div className="min-h-screen text-[#2c2825] antialiased pb-24 relative" style={{ fontFamily: '"DM Sans", sans-serif' }}>
      {/* Sage/green gradient background like the example */}
      <div className="fixed inset-0 -z-10" style={{ 
        background: 'linear-gradient(180deg, #d8e0d0 0%, #c8d8c0 30%, #b8c8b0 60%, #a8b8a0 100%)'
      }} />
      <div className="fixed inset-0 -z-10 opacity-20 mix-blend-multiply pointer-events-none" 
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/natural-paper.png')" }} />
      
      {/* Compass watermark */}
      <div className="fixed top-4 right-4 w-24 h-24 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#2c2825]">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 10 L55 50 L50 90 L45 50 Z" fill="currentColor" />
          <path d="M10 50 L50 45 L90 50 L50 55 Z" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
        <div className="flex items-center h-12 justify-between">
          <div className="flex w-12 h-12 shrink-0 items-center">
            <div className="w-12 h-12 rounded-full ring-2 ring-[#b58e46] overflow-hidden bg-gradient-to-br from-[#a08060] to-[#6b5040] flex items-center justify-center" style={{ filter: 'sepia(0.2)' }}>
              <span className="text-white text-lg font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>A</span>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/80 border border-[#c8d8c0] text-[#2c2825]">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-end mt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-white bg-[#c24d3b] px-2 py-0.5 rounded uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Itinerary</span>
              <span className="text-[10px] text-[#5d5650] uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>
                {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#2c2825]" style={{ fontFamily: '"Playfair Display", serif' }}>Bon Voyage, Alex</h1>
          </div>
        </div>
      </div>

      {/* Date Strip */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-3 items-end">
        {weekDays.map((d, i) => (
          <button key={i}
            className={cn(
              'flex flex-col items-center justify-center shrink-0 transition-all relative',
              d.isToday
                ? 'min-w-[3.5rem] h-[4.5rem] rounded-t-lg rounded-b-3xl bg-[#c24d3b] text-white shadow-lg'
                : 'min-w-[3rem] h-14 rounded-lg bg-white/90 text-[#2c2825] border border-[#c8d8c0]'
            )}
            style={{ fontFamily: '"Playfair Display", serif' }}>
            <span className={cn('text-[9px] font-bold tracking-wider uppercase', d.isToday ? 'text-white/80' : 'text-[#5d5650]')} style={{ fontFamily: '"Courier Prime", monospace' }}>{d.day}</span>
            <span className={cn('font-bold', d.isToday ? 'text-2xl' : 'text-lg')}>{d.date}</span>
            {d.isToday && <span className="text-[8px] text-white/80 uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Arrived</span>}
          </button>
        ))}
      </div>

      {/* Progress Card - Journey Status */}
      <div className="px-4 mt-2">
        <div className="relative flex flex-col gap-3 p-4 rounded-xl bg-white/95 border border-[#c8d8c0] shadow-md overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-[#5d5650] uppercase tracking-widest mb-1" style={{ fontFamily: '"Courier Prime", monospace' }}>Journey Status</p>
              <p className="text-xl font-bold text-[#2c2825] uppercase tracking-wide" style={{ fontFamily: '"Courier Prime", monospace' }}>Task Progress</p>
            </div>
            <div className="bg-[#e8f0e8] text-[#3d5a6b] text-sm font-bold px-3 py-1 rounded border border-[#c8d8c0]" style={{ fontFamily: '"Courier Prime", monospace' }}>
              {Math.round(progressValue)}%
            </div>
          </div>
          <div className="h-3 w-full rounded-full bg-[#e8f0e8] overflow-hidden">
            <div className="h-full rounded-full bg-[#6b8e6b]" style={{ width: `${progressValue}%` }} />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-[#5d5650]" style={{ fontFamily: '"Courier Prime", monospace' }}>{completedCount}/{tasks.length} CHECKPOINTS</p>
            <div className="w-6 h-6 text-[#6b8e6b]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Headline - Today's Destinations */}
      <div className="flex items-center justify-between px-4 pt-6 pb-3">
        <h2 className="text-xl font-bold text-[#2c2825]" style={{ fontFamily: '"Playfair Display", serif' }}>Today's Tasks</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6b8e6b]" />
          <span className="text-[10px] text-[#5d5650]" style={{ fontFamily: '"Courier Prime", monospace' }}>{pendingCount} remaining</span>
        </div>
      </div>

      {/* Task List - Colorful cards like the example */}
      <div className="flex flex-col px-4 gap-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-white/95 border border-[#c8d8c0]">
            <div className="text-3xl mb-2">✈️</div>
            <div className="text-[#5d5650] italic" style={{ fontFamily: '"Playfair Display", serif' }}>No destinations planned</div>
          </div>
        ) : (
          filteredTasks.map((task, index) => {
            const isCompleted = task.status === 'completed';
            const style = getCategoryStyle(task.priority, index);
            const IconComponent = style.icon;
            return (
              <div key={task.id} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                    isCompleted ? 'bg-[#6b8e6b] border-[#6b8e6b]' : 'bg-white border-[#c8d8c0]'
                  )}>
                    {isCompleted && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                </div>
                <div className={cn(
                  'ml-4 rounded-xl p-4 shadow-md border transition-all',
                  style.bg, style.border,
                  isCompleted && 'opacity-60'
                )}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'text-base font-bold mb-1',
                        isCompleted ? 'line-through text-[#8a8078]' : 'text-[#2c2825]'
                      )} style={{ fontFamily: '"Playfair Display", serif' }}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" style={{ color: style.accent }} />
                        <span className="text-[10px]" style={{ color: style.accent, fontFamily: '"Courier Prime", monospace' }}>
                          {task.dueDate 
                            ? new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
                            : '10:00 AM'}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: style.accent, fontFamily: '"Courier Prime", monospace' }}>
                          {style.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${style.accent}15` }}>
                        <IconComponent className="w-5 h-5" style={{ color: style.accent }} />
                      </div>
                      {isCompleted && (
                        <div className="bg-[#6b8e6b] text-white text-[8px] font-bold px-2 py-1 rounded uppercase tracking-wider rotate-3" style={{ fontFamily: '"Courier Prime", monospace' }}>
                          Done
                        </div>
                      )}
                    </div>
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
          <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-[#c24d3b] text-white shadow-lg shadow-[#c24d3b]/30 transition-transform active:scale-95 hover:scale-105 border-4 border-white">
            <Plus className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white/95 border border-[#c8d8c0] text-[#2c2825] max-w-[90vw] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold uppercase tracking-widest flex items-center gap-2" style={{ fontFamily: '"Courier Prime", monospace' }}>
              <Plane className="w-5 h-5 text-[#6b8e6b]" />
              New Destination
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-[#5d5650] text-xs font-bold uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Title</Label>
              <Input
                placeholder="Where to next?"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="bg-white border-[#c8d8c0] rounded-lg"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-[#5d5650] text-xs font-bold uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Notes</Label>
              <Input
                placeholder="Additional details..."
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="bg-white border-[#c8d8c0] rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#5d5650] text-xs font-bold uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Date</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="bg-white border-[#c8d8c0] rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#5d5650] text-xs font-bold uppercase tracking-wider" style={{ fontFamily: '"Courier Prime", monospace' }}>Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger className="bg-white border-[#c8d8c0] rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#c8d8c0] rounded-lg">
                    <SelectItem value="high">Urgent</SelectItem>
                    <SelectItem value="medium">Standard</SelectItem>
                    <SelectItem value="low">Leisure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <button
              onClick={handleAddTask}
              className="w-full py-3 rounded-lg bg-[#6b8e6b] text-white font-bold uppercase tracking-wider hover:opacity-90 transition-all" style={{ fontFamily: '"Courier Prime", monospace' }}
            >
              Add to Itinerary
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
