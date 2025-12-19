'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Eye, Clock, Trash2, Plus, CircleDot } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function NoirTasksPage({
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
      case 'high': return 'URGENT';
      case 'medium': return 'STANDARD';
      case 'low': return 'LOW';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-white text-black';
      case 'medium': return 'bg-gray-600 text-white';
      case 'low': return 'bg-gray-800 text-gray-400 border border-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Film grain overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-8 border-b border-gray-800 pb-4">
          <div className="text-gray-600 text-[10px] tracking-[0.3em] uppercase mb-2">
            Case File No. {new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}
          </div>
          <h1 className="text-2xl font-bold tracking-wider uppercase">
            The Task List
          </h1>
          
          {/* Stats */}
          <div className="flex gap-6 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <CircleDot className="w-3 h-3 text-white" />
              <span className="text-gray-400">{pendingCount} OPEN</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-3 h-3 text-gray-600" />
              <span className="text-gray-600">{completedCount} CLOSED</span>
            </div>
          </div>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-0 mb-6 border border-gray-800">
          {(['all', 'today', 'pending', 'completed'] as const).map((f, i) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2.5 text-[10px] tracking-widest uppercase transition-all',
                i > 0 && 'border-l border-gray-800',
                filter === f
                  ? 'bg-white text-black'
                  : 'text-gray-500 hover:text-white hover:bg-gray-900'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-0">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center border border-gray-800">
              <Eye className="w-8 h-8 mx-auto text-gray-700 mb-4" />
              <div className="text-gray-500 text-sm uppercase tracking-wider">No cases found</div>
              <div className="text-gray-700 text-xs mt-2">
                The file is empty.
              </div>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  'border border-gray-800 transition-all',
                  index > 0 && '-mt-px',
                  task.status === 'completed' && 'opacity-50'
                )}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-5 h-5 border flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        task.status === 'completed'
                          ? 'border-gray-600 bg-gray-600'
                          : 'border-white hover:bg-white/10'
                      )}
                    >
                      {task.status === 'completed' && (
                        <span className="text-black text-xs">✓</span>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Case number */}
                      <div className="text-[10px] text-gray-600 tracking-wider mb-1">
                        CASE #{task.id.slice(0, 6).toUpperCase()}
                      </div>
                      
                      {/* Title */}
                      <h3 className={cn(
                        'text-sm',
                        task.status === 'completed'
                          ? 'line-through text-gray-600'
                          : 'text-white'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-xs text-gray-500 mt-2 italic">
                          "{task.notes}"
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className={cn(
                          'text-[9px] px-2 py-0.5 tracking-wider',
                          getPriorityStyle(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-[10px] text-gray-600">
                            <Clock className="w-3 h-3" />
                            <span>
                              {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-gray-700 hover:text-white transition-all"
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
            <button className="fixed bottom-24 right-4 w-12 h-12 bg-white text-black flex items-center justify-center z-40 hover:bg-gray-200 transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-black border border-gray-700 text-white max-w-[90vw] rounded-none">
            <DialogHeader>
              <DialogTitle className="text-white uppercase tracking-wider text-sm">
                New Case File
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-gray-400 text-[10px] uppercase tracking-wider">Subject</Label>
                <Input
                  placeholder="Enter case subject..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-black border-gray-700 text-white placeholder:text-gray-600 focus:border-white rounded-none"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-400 text-[10px] uppercase tracking-wider">Notes</Label>
                <Input
                  placeholder="Additional details..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-black border-gray-700 text-white placeholder:text-gray-600 focus:border-white rounded-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-400 text-[10px] uppercase tracking-wider">Deadline</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-black border-gray-700 text-white focus:border-white rounded-none"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-gray-400 text-[10px] uppercase tracking-wider">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-black border-gray-700 text-white rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-gray-700 rounded-none">
                      <SelectItem value="low" className="text-gray-400">LOW</SelectItem>
                      <SelectItem value="medium" className="text-gray-300">STANDARD</SelectItem>
                      <SelectItem value="high" className="text-white">URGENT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 bg-white text-black uppercase tracking-wider text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Open Case
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
