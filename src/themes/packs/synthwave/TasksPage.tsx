'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Trash2, Plus, Check, SlidersHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function SynthwaveTasksPage({
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
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return { day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(), date: d.getDate(), isToday: i === 0 };
  });

  const getCategoryStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-purple-600';
      case 'medium': return 'bg-orange-600';
      case 'low': return 'bg-blue-600';
    }
  };

  return (
    <div className="min-h-screen text-[#dcdcdc] font-[family-name:var(--font-vt323)]"
      style={{ backgroundColor: '#2b2b2b', imageRendering: 'pixelated' }}>

      <div className="relative pb-24">
        {/* Header */}
        <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
          <div className="flex items-center h-12 justify-between">
            <div className="flex w-12 shrink-0 items-center">
              <div className="w-10 h-10 border-4 border-black bg-[#f2a900] flex items-center justify-center"
                style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                <span className="font-[family-name:var(--font-press-start)] text-[#1a1a1a] text-xs">:P</span>
              </div>
            </div>
            <button className="flex items-center justify-center w-10 h-10 bg-[#404040] text-[#dcdcdc] border-2 border-black transition-all active:translate-y-1"
              style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-between items-end mt-4">
            <div>
              <p className="text-[#f2a900] text-lg font-[family-name:var(--font-press-start)] mb-2 tracking-tighter">
                {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <h1 className="text-white tracking-tight text-3xl font-[family-name:var(--font-press-start)] leading-snug"
                style={{ textShadow: '2px 2px 0 #000' }}>
                HI PLAYER!
              </h1>
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex flex-col gap-2 mb-4 mt-2">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-2">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[72px] h-[90px] border-2 border-black shrink-0 transform transition-transform active:translate-y-1',
                  d.isToday
                    ? 'bg-[#f2a900] text-[#1a1a1a]'
                    : 'bg-[#404040] text-[#dcdcdc]'
                )}
                style={{ boxShadow: d.isToday ? '4px 4px 0px 0px #000000' : '2px 2px 0px 0px #000000' }}>
                <span className={cn('text-xs font-[family-name:var(--font-press-start)] mt-2', !d.isToday && 'opacity-70')}>{d.day}</span>
                <span className="text-3xl font-[family-name:var(--font-press-start)] mt-1">{d.date}</span>
                {d.isToday && <div className="w-2 h-2 bg-[#1a1a1a] mt-2" />}
              </button>
            ))}
          </div>
        </div>

        {/* Daily EXP Progress */}
        <div className="px-4 py-2">
          <div className="flex flex-col gap-3 p-5 bg-[#404040] border-2 border-black relative"
            style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
            <div className="absolute top-1 left-1 w-1 h-1 bg-[#dcdcdc] opacity-20" />
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#dcdcdc] opacity-20" />
            <div className="flex gap-6 justify-between items-center">
              <p className="text-[#dcdcdc] text-sm font-[family-name:var(--font-press-start)] leading-normal uppercase">Daily EXP</p>
              <span className="text-[#1a1a1a] text-xs font-[family-name:var(--font-press-start)] bg-[#f2a900] px-2 py-1 border border-black"
                style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                {progressPercent}%
              </span>
            </div>
            <div className="bg-[#1a1a1a] h-6 w-full border-2 border-black relative p-0.5">
              <div className="h-full bg-[#70c655] transition-all duration-500" style={{ width: `${progressPercent}%` }}>
                <div className="w-full h-1 bg-white opacity-30 mt-0.5" />
              </div>
            </div>
            <p className="text-[#f2a900] text-sm font-[family-name:var(--font-press-start)] leading-normal text-right">
              {completedCount}/{totalCount} CLEARED
            </p>
          </div>
        </div>

        {/* Current Quests Title */}
        <h2 className="text-white tracking-wide text-lg font-[family-name:var(--font-press-start)] leading-tight px-4 text-left pt-6 pb-4 uppercase"
          style={{ textShadow: '2px 2px 0 #000' }}>
          Current Quests
        </h2>

        {/* Task List */}
        <div className="flex flex-col px-4 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center bg-[#404040] border-2 border-black"
              style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
              <p className="text-[#dcdcdc] font-[family-name:var(--font-press-start)] text-sm">NO QUESTS</p>
              <p className="text-[#dcdcdc]/50 mt-2">Add a new quest!</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id}
                className={cn(
                  'group relative flex items-start gap-4 p-4 border-2 border-black transition-all',
                  task.status === 'completed'
                    ? 'bg-[#1a1a1a] opacity-60'
                    : 'bg-[#404040] hover:translate-x-1'
                )}
                style={{ boxShadow: task.status === 'completed' ? 'none' : '4px 4px 0px 0px #000000' }}>
                <button onClick={() => toggleTaskStatus(task.id)}
                  className={cn(
                    'flex-shrink-0 w-8 h-8 border-2 border-black flex items-center justify-center transition-colors mt-1',
                    task.status === 'completed'
                      ? 'bg-[#70c655]'
                      : 'bg-[#1a1a1a] group-hover:bg-[#f2a900]'
                  )}>
                  {task.status === 'completed' && <Check className="w-5 h-5 text-[#1a1a1a]" />}
                </button>
                <div className="flex flex-1 flex-col gap-2">
                  <p className={cn(
                    'text-xl font-bold leading-none pt-1',
                    task.status === 'completed'
                      ? 'text-[#dcdcdc] line-through decoration-2 decoration-[#e63946]'
                      : 'text-[#dcdcdc]'
                  )}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {task.dueDate && (
                      <span className="text-sm text-[#dcdcdc]/70 flex items-center gap-1 bg-[#1a1a1a] px-2 py-0.5 border border-black">
                        {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    <span className={cn(
                      'text-xs font-[family-name:var(--font-press-start)] px-2 py-1 text-white border border-black',
                      getCategoryStyle(task.priority)
                    )}
                      style={{ boxShadow: '2px 2px 0px 0px #000000' }}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <button onClick={() => deleteTask(task.id)}
                  className="p-2 text-[#dcdcdc]/50 hover:text-[#e63946] transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center bg-[#e63946] text-white border-2 border-white transition-transform active:translate-y-1"
              style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
              <Plus className="w-8 h-8" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#2b2b2b] border-4 border-black text-[#dcdcdc] max-w-[90vw]"
            style={{ boxShadow: '8px 8px 0px 0px #000000' }}>
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-press-start)] text-[#f2a900] text-sm">
                NEW QUEST
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[#dcdcdc] text-sm font-[family-name:var(--font-press-start)]">Title</Label>
                <Input placeholder="Quest name..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-[#1a1a1a] border-2 border-black text-[#dcdcdc] placeholder:text-[#dcdcdc]/40" />
              </div>
              <div className="space-y-2">
                <Label className="text-[#dcdcdc] text-sm font-[family-name:var(--font-press-start)]">Notes</Label>
                <Input placeholder="Details..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-[#1a1a1a] border-2 border-black text-[#dcdcdc] placeholder:text-[#dcdcdc]/40" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#dcdcdc] text-sm font-[family-name:var(--font-press-start)]">Date</Label>
                  <Input type="date" value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-[#1a1a1a] border-2 border-black text-[#dcdcdc]" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#dcdcdc] text-sm font-[family-name:var(--font-press-start)]">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger className="bg-[#1a1a1a] border-2 border-black text-[#dcdcdc]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2b2b2b] border-2 border-black">
                      <SelectItem value="low" className="text-blue-400">LOW</SelectItem>
                      <SelectItem value="medium" className="text-orange-400">MEDIUM</SelectItem>
                      <SelectItem value="high" className="text-purple-400">HIGH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <button onClick={handleAddTask}
                className="w-full py-3 bg-[#f2a900] text-[#1a1a1a] font-[family-name:var(--font-press-start)] text-sm border-2 border-black hover:brightness-110 transition-all"
                style={{ boxShadow: '4px 4px 0px 0px #000000' }}>
                START QUEST
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
