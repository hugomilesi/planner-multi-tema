'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Rocket, Star, Clock, Trash2, Plus, Sparkles } from 'lucide-react';
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
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '🔴 Critical';
      case 'medium': return '🟡 Standard';
      case 'low': return '🔵 Low';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div 
      className="min-h-screen text-white"
      style={{
        background: 'linear-gradient(180deg, #0f0a1e 0%, #1a1035 50%, #0d0d2b 100%)',
      }}
    >
      {/* Stars background */}
      <div 
        className="fixed inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, white, transparent),
                           radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                           radial-gradient(1px 1px at 90px 40px, white, transparent),
                           radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.9), transparent),
                           radial-gradient(1px 1px at 230px 80px, white, transparent),
                           radial-gradient(2px 2px at 300px 150px, rgba(255,255,255,0.7), transparent)`,
          backgroundSize: '350px 200px',
        }}
      />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-purple-400 text-xs tracking-widest mb-1">
            <Sparkles className="w-3 h-3" />
            <span>MISSION CONTROL</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Space Missions
          </h1>
          
          {/* Stats */}
          <div className="flex gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-purple-300">{pendingCount} Active</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
              <Star className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-300">{completedCount} Complete</span>
            </div>
          </div>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-full bg-slate-800/50 border border-purple-500/20">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2 text-xs rounded-full transition-all capitalize',
                filter === f
                  ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg'
                  : 'text-purple-300 hover:bg-purple-500/20'
              )}
            >
              {f === 'all' ? 'All' : f === 'today' ? 'Today' : f === 'pending' ? 'Active' : 'Done'}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-800/30 border border-purple-500/20">
              <Rocket className="w-12 h-12 mx-auto text-purple-500/50 mb-3" />
              <div className="text-purple-300">No missions found</div>
              <div className="text-purple-400/50 text-sm mt-1">
                Launch a new mission to begin
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  'rounded-xl bg-slate-800/40 border border-purple-500/20 overflow-hidden transition-all',
                  task.status === 'completed' && 'opacity-60'
                )}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        task.status === 'completed'
                          ? 'border-green-500 bg-green-500/30 text-green-400'
                          : 'border-purple-500 hover:bg-purple-500/20'
                      )}
                    >
                      {task.status === 'completed' && (
                        <Star className="w-3 h-3 fill-current" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        'font-medium',
                        task.status === 'completed'
                          ? 'line-through text-slate-400'
                          : 'text-white'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-sm text-purple-300/70 mt-1">
                          {task.notes}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 rounded-full border',
                          getPriorityStyle(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-purple-400/70">
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
                      className="p-2 text-purple-400/50 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
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
            <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 z-40">
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border border-purple-500/30 text-white max-w-[90vw] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-purple-300 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                New Mission
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-purple-300 text-sm">Mission Name</Label>
                <Input
                  placeholder="Enter mission objective..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-slate-800 border-purple-500/30 text-white placeholder:text-purple-400/40 focus:border-purple-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-purple-300 text-sm">Details</Label>
                <Input
                  placeholder="Additional notes..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-slate-800 border-purple-500/30 text-white placeholder:text-purple-400/40 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-purple-300 text-sm">Launch Date</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-slate-800 border-purple-500/30 text-white focus:border-purple-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-purple-300 text-sm">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-purple-500/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-purple-500/30">
                      <SelectItem value="low" className="text-blue-300">🔵 Low</SelectItem>
                      <SelectItem value="medium" className="text-yellow-300">🟡 Standard</SelectItem>
                      <SelectItem value="high" className="text-red-300">🔴 Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-medium hover:from-purple-500 hover:to-violet-500 transition-all"
              >
                🚀 Launch Mission
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
