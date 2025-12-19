'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Star, SlidersHorizontal } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function WesternTasksPage({
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
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const today = new Date();

  // Generate week days for timeline
  const weekDays = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      isToday: i === 0,
    };
  });

  const progressValue = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const getCategoryStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'border-purple-800/20 bg-purple-100/50 text-purple-900';
      case 'medium': return 'border-orange-800/20 bg-orange-100/50 text-orange-900';
      case 'low': return 'border-green-800/20 bg-green-100/50 text-green-900';
    }
  };

  const getCategoryLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'Work';
      case 'medium': return 'Health';
      case 'low': return 'Personal';
    }
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-courier-prime)] text-[#3E2723]"
      style={{ backgroundColor: '#F0EAD6' }}>

      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className="flex flex-col gap-2 p-4 pb-2 pt-6">
          <div className="flex items-center h-12 justify-between">
            <div className="flex w-12 shrink-0 items-center relative">
              <div className="absolute inset-0 rounded-full border-2 border-[#8B4513] border-dashed"
                style={{ animation: 'spin 10s linear infinite' }} />
              <div className="w-10 h-10 rounded-full border-2 border-[#8B4513] shadow-sm ml-1 bg-gradient-to-br from-[#8B4513] to-[#5D4037] flex items-center justify-center">
                <Star className="w-5 h-5 text-[#DAA520]" />
              </div>
            </div>
            <button className="flex items-center justify-center rounded-lg w-10 h-10 bg-[#FDF5E6] text-[#8B4513] border-2 border-[#D2B48C]"
              style={{ boxShadow: '2px 2px 0px 0px rgba(139,69,19,0.15)' }}>
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-between items-end mt-2">
            <div>
              <p className="text-[#8B4513]/70 text-base font-semibold italic tracking-wide">
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </p>
              <h1 className="text-[#8B4513] font-[family-name:var(--font-rye)] text-3xl leading-tight"
                style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.1)' }}>
                Howdy, Partner
              </h1>
            </div>
          </div>
        </div>

        {/* Timeline Calendar */}
        <div className="flex flex-col gap-2 mb-4 mt-2">
          <div className="flex overflow-x-auto no-scrollbar gap-3 px-4 pb-2">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[68px] h-[90px] rounded-lg shrink-0 transform transition-transform active:scale-95 border-2 relative overflow-hidden',
                  d.isToday
                    ? 'bg-[#8B4513] text-[#FDF5E6] border-[#5D4037]'
                    : 'bg-[#FDF5E6] border-[#D2B48C] text-[#3E2723]/60 hover:bg-[#F5DEB3]'
                )}
                style={d.isToday ? { boxShadow: '4px 4px 0px 0px rgba(62,39,35,0.3)' } : {}}>
                {d.isToday && (
                  <>
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#5D4037]/30" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-[#5D4037]/30" />
                  </>
                )}
                <span className={cn('text-xs font-bold uppercase tracking-widest', d.isToday && 'opacity-90 mt-1')}>
                  {d.day}
                </span>
                <span className={cn('font-[family-name:var(--font-rye)] mt-1', d.isToday ? 'text-3xl' : 'text-2xl font-bold')}>
                  {d.date}
                </span>
                {d.isToday && <Star className="w-2.5 h-2.5 text-[#DAA520] mt-1" />}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Bounty Progress */}
        <div className="px-4 py-2">
          <div className="flex flex-col gap-3 p-5 rounded-lg bg-[#FDF5E6] border-2 border-[#D2B48C] relative overflow-hidden"
            style={{ boxShadow: '2px 2px 0px 0px rgba(139,69,19,0.15)' }}>
            <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
              <Star className="w-16 h-16 rotate-12" />
            </div>
            <div className="flex gap-6 justify-between items-center z-10">
              <p className="text-[#3E2723] text-lg font-[family-name:var(--font-rye)] tracking-wide">Daily Bounty</p>
              <span className="text-[#A0522D] font-bold bg-[#D2B48C]/20 px-3 py-1 rounded-sm border border-[#D2B48C]/50 text-sm">
                {Math.round(progressValue)}% Done
              </span>
            </div>
            <div className="rounded-full bg-[#E6DCC3] h-3 w-full overflow-hidden border border-[#D2B48C]/50 z-10">
              <div className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressValue}%`,
                  backgroundImage: 'repeating-linear-gradient(45deg, #8B4513, #8B4513 10px, #A0522D 10px, #A0522D 20px)',
                  boxShadow: '0 0 10px rgba(139,69,19,0.5)',
                }} />
            </div>
            <p className="text-[#3E2723]/60 text-sm font-semibold italic z-10">
              {completedCount} of {tasks.length} Tasks Rounded Up
            </p>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center px-4 pt-6 pb-2">
          <div className="h-px bg-[#D2B48C] flex-1 opacity-50" />
          <h2 className="text-[#3E2723] font-[family-name:var(--font-rye)] text-2xl px-4 text-center">Today's Tasks</h2>
          <div className="h-px bg-[#D2B48C] flex-1 opacity-50" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-4 mb-4 overflow-x-auto pb-2">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={cn('px-4 py-2 text-sm whitespace-nowrap transition-all border-2 rounded-lg',
                filter === f
                  ? 'bg-[#8B4513] text-[#FDF5E6] border-[#5D4037]'
                  : 'bg-[#FDF5E6] text-[#8B4513] border-[#D2B48C] hover:bg-[#F5DEB3]'
              )}
              style={filter === f ? { boxShadow: '4px 4px 0px 0px rgba(62,39,35,0.3)' } : {}}>
              {f === 'all' ? 'All' : f === 'today' ? 'Today' : f === 'pending' ? 'Active' : 'Done'}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="flex flex-col px-4 gap-4 pb-4">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center border-2 border-dashed border-[#D2B48C] bg-[#FDF5E6]/50 rounded-lg">
              <Star className="w-12 h-12 mx-auto text-[#D2B48C] mb-2" />
              <p className="text-[#8B4513] font-[family-name:var(--font-rye)]">No tasks found</p>
              <p className="text-[#8B4513]/60 text-sm mt-1 italic">Tap + to create your first bounty</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isCompleted = task.status === 'completed';
              
              return (
                <div key={task.id}
                  className={cn(
                    'group relative flex items-center gap-4 p-4 rounded-sm bg-[#FDF5E6] border border-[#D2B48C] shadow-sm transition-all hover:border-[#8B4513]',
                    isCompleted && 'bg-[#E8E0CC] border-[#D2B48C]/60 opacity-70'
                  )}>
                  {/* Corner fold */}
                  {!isCompleted && (
                    <div className="absolute top-0 right-0 border-t-[16px] border-r-[16px] border-t-[#F0EAD6] border-r-[#D2B48C] shadow-sm" />
                  )}
                  
                  {/* Checkbox */}
                  <button onClick={() => toggleTaskStatus(task.id)}
                    className={cn(
                      'flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-colors',
                      isCompleted
                        ? 'bg-[#8B4513] border-[#8B4513] shadow-sm'
                        : 'border-[#8B4513] group-hover:bg-[#8B4513]/10'
                    )}>
                    {isCompleted && <Star className="w-4 h-4 text-white" />}
                  </button>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-1 relative">
                    {isCompleted && (
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#3E2723]/30 -rotate-1" />
                    )}
                    <p className={cn(
                      'text-lg font-bold leading-tight font-[family-name:var(--font-rye)] tracking-wide',
                      isCompleted ? 'text-[#3E2723] opacity-60' : 'text-[#3E2723]'
                    )}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2">
                      {task.dueDate && (
                        <>
                          <span className="text-sm font-medium text-[#3E2723]/60 flex items-center gap-1 italic">
                            <Clock className="w-4 h-4" />
                            {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D2B48C]" />
                        </>
                      )}
                      <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-sm border uppercase tracking-wider',
                        getCategoryStyle(task.priority))}>
                        {getCategoryLabel(task.priority)}
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button onClick={() => deleteTask(task.id)}
                    className="p-2 text-[#8B4513]/50 hover:text-red-700 hover:bg-red-100 transition-all rounded opacity-0 group-hover:opacity-100">
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
            <button className="fixed bottom-24 right-5 z-20 flex w-16 h-16 items-center justify-center rounded-full bg-[#DAA520] text-[#3E2723] border-4 border-[#B8860B] transition-transform active:scale-90 hover:scale-105 group"
              style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.4)' }}>
              <div className="absolute inset-0 rounded-full border border-[#FFF8DC] opacity-50 m-1" />
              <Star className="w-9 h-9 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#FDF5E6] border-4 border-[#8B4513] text-[#3E2723] max-w-[90vw] rounded-lg"
            style={{ boxShadow: '8px 8px 0 rgba(139,69,19,0.3)' }}>
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-rye)] text-[#8B4513] text-xl flex items-center gap-2">
                <Star className="w-5 h-5 text-[#DAA520]" />
                New Bounty
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[#8B4513] font-bold">Title</Label>
                <Input placeholder="Enter bounty title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-[#F0EAD6] border-2 border-[#D2B48C] text-[#3E2723] placeholder:text-[#8B4513]/50 focus:border-[#8B4513] rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#8B4513] font-bold">Notes</Label>
                <Input placeholder="Additional details..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-[#F0EAD6] border-2 border-[#D2B48C] text-[#3E2723] placeholder:text-[#8B4513]/50 focus:border-[#8B4513] rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#8B4513] font-bold">Due Date</Label>
                  <Input type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-[#F0EAD6] border-2 border-[#D2B48C] text-[#3E2723] focus:border-[#8B4513] rounded-lg" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[#8B4513] font-bold">Priority</Label>
                  <Select value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger className="bg-[#F0EAD6] border-2 border-[#D2B48C] text-[#3E2723] rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#FDF5E6] border-2 border-[#D2B48C] rounded-lg">
                      <SelectItem value="low" className="text-green-800">Low</SelectItem>
                      <SelectItem value="medium" className="text-orange-800">Medium</SelectItem>
                      <SelectItem value="high" className="text-purple-800">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button onClick={handleAddTask}
                className="w-full py-3 bg-[#8B4513] text-[#FDF5E6] font-[family-name:var(--font-rye)] border-2 border-[#5D4037] hover:bg-[#A0522D] transition-all rounded-lg"
                style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.2)' }}>
                Post Bounty
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
