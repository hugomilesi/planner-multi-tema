'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Zap, Target, Clock, Trash2, Plus, ChevronRight } from 'lucide-react';
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

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '!!! CRITICAL';
      case 'medium': return '>> STANDARD';
      case 'low': return '.. LOW_PRI';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/20 border-red-500/50';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'low': return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/50';
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#0a0014] text-white font-[family-name:var(--font-space-grotesk)]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,0,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}
    >

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header HUD */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-[#ff00ff] text-xs tracking-[0.3em] mb-1">
            <div className="w-2 h-2 bg-[#ff00ff] animate-pulse" />
            <span>SYSTEM://QUEST_LOG</span>
          </div>
          <h1 className="text-3xl font-[family-name:var(--font-orbitron)] text-[#00ffff] tracking-wider">
            ACTIVE MISSIONS
          </h1>
          
          {/* Stats bar */}
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-1 border border-[#00ffff]/30 bg-[#00ffff]/10">
              <Target className="w-4 h-4 text-[#00ffff]" />
              <span className="text-xs text-[#00ffff]">{pendingCount} ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 border border-[#00ff00]/30 bg-[#00ff00]/10">
              <Zap className="w-4 h-4 text-[#00ff00]" />
              <span className="text-xs text-[#00ff00]">{completedCount} CLEARED</span>
            </div>
          </div>
        </header>

        {/* Filter tabs - cyberpunk style */}
        <div className="flex gap-1 mb-6 p-1 bg-[#1a0033] border border-[#ff00ff]/30">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2 text-xs tracking-wider transition-all font-[family-name:var(--font-orbitron)]',
                filter === f
                  ? 'bg-[#ff00ff] text-black'
                  : 'text-[#ff00ff] hover:bg-[#ff00ff]/20'
              )}
            >
              {f === 'all' && '[ ALL ]'}
              {f === 'today' && '[ TODAY ]'}
              {f === 'pending' && '[ ACTIVE ]'}
              {f === 'completed' && '[ DONE ]'}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="border-2 border-dashed border-[#ff00ff]/30 p-8 text-center">
              <div className="text-[#ff00ff]/50 text-sm font-[family-name:var(--font-orbitron)]">
                NO_MISSIONS_FOUND
              </div>
              <div className="text-[#00ffff]/50 text-xs mt-2">
                Initialize new quest to begin...
              </div>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  'relative border-l-4 bg-[#0f001a] transition-all',
                  task.status === 'completed'
                    ? 'border-l-[#00ff00]/50 opacity-60'
                    : task.priority === 'high'
                    ? 'border-l-red-500'
                    : task.priority === 'medium'
                    ? 'border-l-yellow-400'
                    : 'border-l-[#00ffff]'
                )}
              >
                {/* Priority indicator for high priority */}
                {task.priority === 'high' && task.status !== 'completed' && (
                  <div className="absolute top-0 right-0 px-2 py-0.5 bg-red-500 text-black text-[10px] font-bold">
                    !!! PRIORITY
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Custom checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-6 h-6 border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        task.status === 'completed'
                          ? 'border-[#00ff00] bg-[#00ff00]/20 text-[#00ff00]'
                          : 'border-[#ff00ff] hover:bg-[#ff00ff]/20'
                      )}
                    >
                      {task.status === 'completed' && (
                        <Zap className="w-4 h-4" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Task ID */}
                      <div className="text-[10px] text-[#ff00ff]/50 font-mono mb-1">
                        QUEST_ID: {task.id.slice(0, 8).toUpperCase()}
                      </div>
                      
                      {/* Title */}
                      <h3 className={cn(
                        'font-[family-name:var(--font-orbitron)] text-sm tracking-wide',
                        task.status === 'completed'
                          ? 'line-through text-[#00ff00]/70'
                          : 'text-white'
                      )}>
                        {task.title.toUpperCase()}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-xs text-[#00ffff]/60 mt-1 font-mono">
                          {'>'} {task.notes}
                        </p>
                      )}

                      {/* Meta info */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 border font-mono',
                          getPriorityColor(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-[10px] text-[#00ffff]/70">
                            <Clock className="w-3 h-3" />
                            <span className="font-mono">
                              {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: '2-digit' 
                              }).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-[#ff00ff]/50 hover:text-red-500 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom border glow */}
                <div className={cn(
                  'h-px',
                  task.priority === 'high' && task.status !== 'completed'
                    ? 'bg-gradient-to-r from-transparent via-red-500 to-transparent'
                    : 'bg-gradient-to-r from-transparent via-[#ff00ff]/30 to-transparent'
                )} />
              </div>
            ))
          )}
        </div>

        {/* FAB - Add new quest */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="fixed bottom-24 right-4 w-14 h-14 bg-[#ff00ff] text-black flex items-center justify-center shadow-lg hover:brightness-110 transition-all z-40">
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-[#0a0014] border-2 border-[#ff00ff] text-white max-w-[90vw]">
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-orbitron)] text-[#00ffff] tracking-wider">
                NEW_QUEST.INIT
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[#ff00ff] text-xs tracking-wider">MISSION_TITLE</Label>
                <Input
                  placeholder="Enter quest objective..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-[#1a0033] border-[#ff00ff]/50 text-white placeholder:text-[#ff00ff]/30 focus:border-[#00ffff]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#ff00ff] text-xs tracking-wider">DETAILS</Label>
                <Input
                  placeholder="Additional intel..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-[#1a0033] border-[#ff00ff]/50 text-white placeholder:text-[#ff00ff]/30 focus:border-[#00ffff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#ff00ff] text-xs tracking-wider">DEADLINE</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-[#1a0033] border-[#ff00ff]/50 text-white focus:border-[#00ffff]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[#ff00ff] text-xs tracking-wider">PRIORITY_LVL</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-[#1a0033] border-[#ff00ff]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a0033] border-[#ff00ff]">
                      <SelectItem value="low" className="text-cyan-400">.. LOW</SelectItem>
                      <SelectItem value="medium" className="text-yellow-400">{'>>'} MEDIUM</SelectItem>
                      <SelectItem value="high" className="text-red-500">!!! HIGH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 bg-[#ff00ff] text-black font-[family-name:var(--font-orbitron)] tracking-wider hover:bg-[#00ffff] transition-colors"
              >
                INITIALIZE QUEST
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
