'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Music, Zap, Clock, Trash2, Plus, Sun } from 'lucide-react';
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
  const pendingCount = tasks.filter(t => t.status === 'pending').length;

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'HOT!';
      case 'medium': return 'COOL';
      case 'low': return 'CHILL';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-gradient-to-r from-red-500 to-orange-500 text-white';
      case 'medium': return 'bg-gradient-to-r from-pink-500 to-purple-500 text-white';
      case 'low': return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white';
    }
  };

  return (
    <div 
      className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]"
      style={{
        background: 'linear-gradient(180deg, #1a0533 0%, #2d1b4e 40%, #1a0533 100%)',
      }}
    >
      {/* Sun/horizon effect */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-48 opacity-30"
        style={{
          background: 'linear-gradient(0deg, #ff6ec7 0%, #ffcc00 30%, transparent 100%)',
        }}
      />
      
      {/* Grid floor */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-32 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(#ff6ec7 1px, transparent 1px), linear-gradient(90deg, #ff6ec7 1px, transparent 1px)',
          backgroundSize: '40px 20px',
          transform: 'perspective(200px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-[#ff6ec7] text-xs tracking-[0.2em] mb-1">
            <Music className="w-3 h-3" />
            <span>RETRO VIBES</span>
          </div>
          <h1 
            className="text-4xl font-bold"
            style={{
              background: 'linear-gradient(180deg, #ff6ec7 0%, #ffcc00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(255,110,199,0.3)',
            }}
          >
            TASK WAVE
          </h1>
          
          {/* Stats */}
          <div className="flex items-center gap-2 mt-4 text-[#ff6ec7]">
            <Sun className="w-4 h-4" />
            <span className="text-sm">{pendingCount} tasks to crush</span>
          </div>
        </header>

        {/* Filter tabs - Retro buttons */}
        <div className="flex gap-2 mb-6">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2.5 text-xs font-bold tracking-wider transition-all border-2',
                filter === f
                  ? 'bg-gradient-to-b from-[#ff6ec7] to-[#ff4d94] border-[#ffcc00] text-white'
                  : 'bg-[#2d1b4e] border-[#ff6ec7]/30 text-[#ff6ec7] hover:border-[#ff6ec7]'
              )}
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div 
              className="p-8 text-center border-2 border-[#ff6ec7]/30 bg-[#2d1b4e]/50"
              style={{
                clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
              }}
            >
              <Music className="w-12 h-12 mx-auto text-[#ff6ec7]/50 mb-3" />
              <div className="text-[#ff6ec7]">No tasks yet</div>
              <div className="text-[#ff6ec7]/50 text-sm mt-1">
                Add some retro vibes!
              </div>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  'relative border-2 bg-[#2d1b4e]/80 transition-all',
                  task.status === 'completed'
                    ? 'border-[#00ff88]/30 opacity-60'
                    : 'border-[#ff6ec7]/50'
                )}
                style={{
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                }}
              >
                {/* Accent line */}
                <div 
                  className={cn(
                    'absolute top-0 left-0 w-1 h-full',
                    task.priority === 'high' ? 'bg-gradient-to-b from-red-500 to-orange-500' :
                    task.priority === 'medium' ? 'bg-gradient-to-b from-[#ff6ec7] to-[#ffcc00]' :
                    'bg-gradient-to-b from-cyan-500 to-blue-500'
                  )}
                />

                <div className="p-4 pl-5">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-6 h-6 border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        task.status === 'completed'
                          ? 'border-[#00ff88] bg-[#00ff88]/20 text-[#00ff88]'
                          : 'border-[#ff6ec7] hover:bg-[#ff6ec7]/20'
                      )}
                      style={{
                        clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                      }}
                    >
                      {task.status === 'completed' && (
                        <Zap className="w-4 h-4" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        'font-bold',
                        task.status === 'completed'
                          ? 'line-through text-[#00ff88]/70'
                          : 'text-white'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-sm text-[#ff6ec7]/70 mt-1">
                          {task.notes}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 font-bold',
                          getPriorityStyle(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-[#ffcc00]">
                            <Clock className="w-3 h-3" />
                            <span>
                              {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-[#ff6ec7]/50 hover:text-red-400 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-b from-[#ff6ec7] to-[#ff4d94] text-white flex items-center justify-center shadow-lg z-40 border-2 border-[#ffcc00]"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
            >
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent 
            className="bg-[#1a0533] border-2 border-[#ff6ec7] text-white max-w-[90vw]"
          >
            <DialogHeader>
              <DialogTitle 
                className="flex items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, #ff6ec7, #ffcc00)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                <Music className="w-5 h-5 text-[#ff6ec7]" />
                New Task
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-[#ff6ec7] text-sm">Title</Label>
                <Input
                  placeholder="What's the vibe?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white placeholder:text-[#ff6ec7]/40 focus:border-[#ffcc00]"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-[#ff6ec7] text-sm">Notes</Label>
                <Input
                  placeholder="Extra details..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white placeholder:text-[#ff6ec7]/40 focus:border-[#ffcc00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#ff6ec7] text-sm">Date</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white focus:border-[#ffcc00]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[#ff6ec7] text-sm">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-[#2d1b4e] border-[#ff6ec7]/50 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#2d1b4e] border-[#ff6ec7]">
                      <SelectItem value="low" className="text-cyan-400">CHILL</SelectItem>
                      <SelectItem value="medium" className="text-[#ff6ec7]">COOL</SelectItem>
                      <SelectItem value="high" className="text-orange-400">HOT!</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 bg-gradient-to-r from-[#ff6ec7] to-[#ffcc00] text-black font-bold tracking-wider hover:opacity-90 transition-opacity"
              >
                ADD TASK ⚡
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
