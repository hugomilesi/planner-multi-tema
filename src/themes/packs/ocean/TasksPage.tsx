'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Waves, Fish, Clock, Trash2, Plus, Anchor } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function OceanTasksPage({
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
      case 'high': return '🔴 Urgente';
      case 'medium': return '🟡 Normal';
      case 'low': return '🔵 Tranquilo';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    }
  };

  return (
    <div 
      className="min-h-screen text-white"
      style={{
        background: 'linear-gradient(180deg, #0c4a6e 0%, #164e63 30%, #155e75 60%, #0e7490 100%)',
      }}
    >
      {/* Bubbles decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-20 left-10 w-4 h-4 rounded-full bg-white/10" />
        <div className="absolute bottom-40 left-20 w-2 h-2 rounded-full bg-white/10" />
        <div className="absolute bottom-60 right-10 w-3 h-3 rounded-full bg-white/10" />
        <div className="absolute bottom-32 right-24 w-2 h-2 rounded-full bg-white/10" />
      </div>

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-cyan-300 text-xs tracking-widest mb-1">
            <Waves className="w-4 h-4" />
            <span>DEEP DIVE</span>
          </div>
          <h1 className="text-3xl font-bold text-white">
            Tarefas do Mar
          </h1>
          
          {/* Stats */}
          <div className="flex gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
              <Fish className="w-4 h-4 text-cyan-300" />
              <span className="text-xs text-cyan-200">{pendingCount} nadando</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/20 border border-teal-500/30">
              <Anchor className="w-4 h-4 text-teal-300" />
              <span className="text-xs text-teal-200">{completedCount} ancoradas</span>
            </div>
          </div>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-2xl bg-slate-800/30 border border-cyan-500/20">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2 text-xs rounded-xl transition-all',
                filter === f
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg'
                  : 'text-cyan-300 hover:bg-cyan-500/20'
              )}
            >
              {f === 'all' ? '🌊 Todas' : f === 'today' ? '📅 Hoje' : f === 'pending' ? '🐟 Ativas' : '⚓ Feitas'}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-800/30 border border-cyan-500/20">
              <Fish className="w-12 h-12 mx-auto text-cyan-500/50 mb-3" />
              <div className="text-cyan-300">Nenhuma tarefa no oceano</div>
              <div className="text-cyan-400/50 text-sm mt-1">
                Mergulhe e adicione uma nova!
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  'rounded-2xl bg-slate-800/40 border border-cyan-500/20 overflow-hidden transition-all',
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
                          ? 'border-teal-500 bg-teal-500/30 text-teal-300'
                          : 'border-cyan-500 hover:bg-cyan-500/20'
                      )}
                    >
                      {task.status === 'completed' && (
                        <Anchor className="w-3 h-3" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        'font-medium',
                        task.status === 'completed'
                          ? 'line-through text-teal-400'
                          : 'text-white'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-sm text-cyan-300/70 mt-1">
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
                          <div className="flex items-center gap-1 text-xs text-cyan-400/70">
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
                      className="p-2 text-cyan-400/50 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
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
            <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 z-40">
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border border-cyan-500/30 text-white max-w-[90vw] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-cyan-300 flex items-center gap-2">
                <Waves className="w-5 h-5" />
                Nova Tarefa
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-cyan-300 text-sm">Título</Label>
                <Input
                  placeholder="O que você precisa fazer?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-slate-800 border-cyan-500/30 text-white placeholder:text-cyan-400/40 focus:border-cyan-500 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-cyan-300 text-sm">Notas</Label>
                <Input
                  placeholder="Detalhes adicionais..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-slate-800 border-cyan-500/30 text-white placeholder:text-cyan-400/40 focus:border-cyan-500 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-cyan-300 text-sm">Data</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-slate-800 border-cyan-500/30 text-white focus:border-cyan-500 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-cyan-300 text-sm">Prioridade</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-cyan-500/30 text-white rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-cyan-500/30 rounded-xl">
                      <SelectItem value="low" className="text-cyan-300">🔵 Tranquilo</SelectItem>
                      <SelectItem value="medium" className="text-yellow-300">🟡 Normal</SelectItem>
                      <SelectItem value="high" className="text-red-300">🔴 Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium hover:from-cyan-500 hover:to-teal-500 transition-all"
              >
                🌊 Adicionar Tarefa
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
