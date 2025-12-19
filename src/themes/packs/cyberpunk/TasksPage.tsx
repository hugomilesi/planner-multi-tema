'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Zap, Clock, Trash2, Plus, Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function CyberpunkTasksPage({
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
      hasTask: filteredTasks.some(t => t.dueDate === date.toISOString().split('T')[0]),
    };
  });

  // Calculate progress
  const totalTasks = tasks.length;
  const progressValue = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  const getBorderColor = (task: Task) => {
    if (task.status === 'completed') return '#00ffff';
    if (task.priority === 'high') return '#ff00ff';
    if (task.priority === 'medium') return '#bc13fe';
    return '#00ffff';
  };

  const getCategoryColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'border-orange-500 text-orange-400 bg-orange-500/10';
      case 'medium': return 'border-[#bc13fe] text-[#bc13fe] bg-[#bc13fe]/10';
      case 'low': return 'border-green-500 text-green-400 bg-green-500/10';
    }
  };

  return (
    <div className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]"
      style={{
        backgroundColor: '#0f0518',
        backgroundImage: 'linear-gradient(rgba(42,27,61,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42,27,61,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}>
      
      {/* Vaporwave sun effect */}
      <div className="fixed top-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full opacity-40 pointer-events-none z-0"
        style={{ background: 'linear-gradient(to bottom, #ff00ff, #ffbd00)', filter: 'blur(60px)' }} />

      <div className="relative z-10 pb-24">
        {/* Header */}
        <div className="px-4 pt-6 pb-2">
          <div className="flex items-center justify-between h-12">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff00ff] to-[#00ffff] animate-pulse blur-sm" />
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#2a0052] to-[#120024] border-2 border-[#00ffff]/50 flex items-center justify-center"
                style={{ boxShadow: '0 0 10px rgba(0,255,255,0.3)' }}>
                <Zap className="w-6 h-6 text-[#00ffff]" />
              </div>
            </div>
            <button className="w-10 h-10 rounded-lg bg-[#1e0c35] text-[#00ffff] border border-[#00ffff]/30 flex items-center justify-center hover:bg-[#00ffff]/10 transition-colors"
              style={{ boxShadow: '0 0 10px rgba(0,255,255,0.2)' }}>
              <Filter className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <p className="text-[#ff00ff] text-lg font-[family-name:var(--font-orbitron)] tracking-widest uppercase mb-1"
              style={{ textShadow: '0 0 5px rgba(255,0,255,0.8)' }}>
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <h1 className="text-white tracking-wider text-3xl font-[family-name:var(--font-orbitron)] font-bold leading-tight"
              style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
              WAKE UP, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#bc13fe]">USER</span>
            </h1>
          </div>
        </div>

        {/* Timeline Calendar */}
        <div className="mt-4 px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[68px] h-[90px] rounded-xl shrink-0 transition-all active:scale-95',
                  d.isToday
                    ? 'bg-gradient-to-b from-[#ff00ff]/20 to-[#1a0b2e] border-2 border-[#ff00ff] text-white'
                    : 'bg-[#1e0c35] border border-white/10 text-gray-400 hover:border-[#00ffff]/50 hover:text-white'
                )}
                style={d.isToday ? { boxShadow: '0 0 15px rgba(255,0,255,0.4)' } : {}}>
                <span className={cn('text-xs font-bold uppercase tracking-wider', d.isToday && 'text-[#ff00ff]')}>{d.day}</span>
                <span className={cn('text-3xl font-[family-name:var(--font-orbitron)] font-bold mt-1', d.isToday && 'text-white')}
                  style={d.isToday ? { textShadow: '0 0 2px rgba(255,255,255,0.8)' } : {}}>
                  {d.date}
                </span>
                {d.hasTask && (
                  <span className="w-1.5 h-1.5 rounded-sm bg-[#00ffff] mt-2" style={{ boxShadow: '0 0 5px #00ffff' }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* System Status Card */}
        <div className="px-4 py-4">
          <div className="relative p-5 rounded-xl bg-[#1e0c35] border border-[#bc13fe]/30 overflow-hidden"
            style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 0 15px rgba(188,19,254,0.15)' }}>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[200%] w-full opacity-10 pointer-events-none"
              style={{ animation: 'spin 4s linear infinite' }} />
            
            <div className="relative z-10 flex justify-between items-center">
              <p className="text-white text-lg font-[family-name:var(--font-orbitron)] font-bold tracking-wide uppercase">System Status</p>
              <span className="text-[#ffff00] text-sm font-mono font-bold border border-[#ffff00]/50 px-2 py-0.5 rounded bg-[#ffff00]/10"
                style={{ boxShadow: '0 0 8px rgba(255,255,0,0.3)' }}>
                {Math.round(progressValue)}%
              </span>
            </div>
            
            <div className="relative h-4 w-full bg-black/40 rounded border border-white/10 p-[2px] mt-3">
              <div className="h-full rounded-sm bg-gradient-to-r from-[#bc13fe] to-[#ff00ff] relative overflow-hidden"
                style={{ width: `${progressValue}%`, boxShadow: '0 0 10px rgba(188,19,254,0.6)' }}>
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%, transparent 100%)',
                  backgroundSize: '10px 10px',
                }} />
              </div>
            </div>
            
            <p className="text-[#00ffff]/80 text-xs font-mono tracking-widest uppercase mt-2">
              {completedCount}/{totalTasks} Missions Complete
            </p>
          </div>
        </div>

        {/* Active Tasks Header */}
        <h2 className="text-white tracking-widest text-xl font-[family-name:var(--font-orbitron)] font-bold px-4 pt-2 pb-3 uppercase"
          style={{ textShadow: '0 0 3px rgba(255,255,255,0.5)' }}>
          Active Tasks <span className="text-[#ff00ff] animate-pulse">_</span>
        </h2>

        {/* Filter Tabs */}
        <div className="px-4 mb-4">
          <div className="flex gap-2 p-1 bg-[#1e0c35]/50 rounded-lg border border-[#bc13fe]/20">
            {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={cn('flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all',
                  filter === f
                    ? 'bg-gradient-to-r from-[#ff00ff] to-[#bc13fe] text-white shadow-[0_0_10px_rgba(255,0,255,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5')}>
                {f === 'all' ? 'All' : f === 'today' ? 'Today' : f === 'pending' ? 'Active' : 'Done'}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="flex flex-col px-4 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#1e0c35] border border-[#ff00ff]/30 text-center">
              <Zap className="w-12 h-12 mx-auto text-[#ff00ff]/30 mb-2" />
              <p className="text-[#ff00ff]/50 font-mono">NO_TASKS_FOUND</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const borderColor = getBorderColor(task);
              const isCompleted = task.status === 'completed';
              
              return (
                <div key={task.id}
                  className={cn(
                    'group relative flex items-center gap-4 p-4 rounded-xl bg-[#1e0c35] border-l-4 border-y border-r transition-all',
                    isCompleted 
                      ? 'border-y-white/5 border-r-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                      : 'border-y-white/5 border-r-white/5 shadow-lg hover:border-y-[#bc13fe]/50 hover:border-r-[#bc13fe]/50'
                  )}
                  style={{ borderLeftColor: borderColor, ...(isCompleted ? {} : { boxShadow: `0 0 15px ${borderColor}20` }) }}>
                  
                  {/* Checkbox */}
                  <button onClick={() => toggleTaskStatus(task.id)}
                    className={cn(
                      'flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors bg-black/20',
                      isCompleted 
                        ? 'border-[#00ffff] bg-[#00ffff]/20'
                        : 'border-[#bc13fe]/50 group-hover:border-[#bc13fe]'
                    )}
                    style={isCompleted ? { boxShadow: '0 0 8px rgba(0,255,255,0.4)' } : {}}>
                    {isCompleted && <span className="text-[#00ffff] text-sm font-bold">✓</span>}
                  </button>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-1 min-w-0">
                    <p className={cn(
                      'text-lg font-semibold leading-tight tracking-wide',
                      isCompleted ? 'text-gray-400 line-through decoration-[#ff00ff] decoration-2' : 'text-white'
                    )}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2">
                      {task.dueDate && (
                        <>
                          <span className="text-xs font-medium text-[#00ffff] flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(task.dueDate + 'T12:00:00').toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className="w-1 h-1 bg-white/30 rotate-45" />
                        </>
                      )}
                      <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider',
                        getCategoryColor(task.priority))}>
                        {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Work' : 'Personal'}
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button onClick={() => deleteTask(task.id)}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/20 rounded-lg transition-all opacity-0 group-hover:opacity-100">
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
            <button className="fixed bottom-24 right-5 z-20 flex w-14 h-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ff00ff] to-[#bc13fe] text-white border border-white/20 transition-transform active:scale-90 hover:scale-105 group overflow-hidden"
              style={{ boxShadow: '0 0 20px rgba(255,0,255,0.6)' }}>
              <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <Plus className="w-8 h-8 relative z-10" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f0518] border-2 border-[#bc13fe] text-white max-w-[90vw] rounded-xl"
            style={{ boxShadow: '0 0 30px rgba(188,19,254,0.3)' }}>
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-orbitron)] text-[#00ffff] tracking-wider flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#ff00ff]" />
                NEW_QUEST.INIT
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[#ff00ff] text-xs tracking-wider font-bold uppercase">Mission Title</Label>
                <Input
                  placeholder="Enter quest objective..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-[#1e0c35] border-[#bc13fe]/50 text-white placeholder:text-[#ff00ff]/30 focus:border-[#00ffff] rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#ff00ff] text-xs tracking-wider font-bold uppercase">Details</Label>
                <Input
                  placeholder="Additional intel..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-[#1e0c35] border-[#bc13fe]/50 text-white placeholder:text-[#ff00ff]/30 focus:border-[#00ffff] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#ff00ff] text-xs tracking-wider font-bold uppercase">Deadline</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-[#1e0c35] border-[#bc13fe]/50 text-white focus:border-[#00ffff] rounded-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[#ff00ff] text-xs tracking-wider font-bold uppercase">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-[#1e0c35] border-[#bc13fe]/50 text-white rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e0c35] border-[#bc13fe] rounded-lg">
                      <SelectItem value="low" className="text-green-400">Low</SelectItem>
                      <SelectItem value="medium" className="text-[#bc13fe]">Medium</SelectItem>
                      <SelectItem value="high" className="text-orange-400">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button onClick={handleAddTask}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#bc13fe] text-white font-[family-name:var(--font-orbitron)] tracking-wider hover:opacity-90 transition-opacity"
                style={{ boxShadow: '0 0 15px rgba(255,0,255,0.4)' }}>
                INITIALIZE QUEST
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
