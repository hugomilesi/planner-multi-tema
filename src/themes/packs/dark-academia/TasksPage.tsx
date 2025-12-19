'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { BookOpen, Feather, Clock, Trash2, Plus, Bookmark } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function DarkAcademiaTasksPage({
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
      case 'high': return 'Urgente';
      case 'medium': return 'Moderado';
      case 'low': return 'Contemplativo';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-900/30 text-red-300 border-red-800/50';
      case 'medium': return 'bg-amber-900/30 text-amber-300 border-amber-800/50';
      case 'low': return 'bg-stone-800/50 text-stone-400 border-stone-700/50';
    }
  };

  return (
    <div 
      className="min-h-screen text-stone-200"
      style={{
        background: 'linear-gradient(180deg, #1c1917 0%, #292524 50%, #1c1917 100%)',
      }}
    >
      {/* Paper texture overlay */}
      <div 
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23a8a29e' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-amber-600 text-xs tracking-widest mb-1 italic">
            <Feather className="w-3 h-3" />
            <span>Diário de Estudos</span>
          </div>
          <h1 className="text-3xl font-serif text-amber-100">
            Tarefas Pendentes
          </h1>
          
          {/* Stats */}
          <div className="flex gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-stone-800/50 border border-amber-900/30">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span className="text-xs text-amber-200">{pendingCount} em estudo</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-stone-800/50 border border-stone-700/50">
              <Bookmark className="w-4 h-4 text-stone-500" />
              <span className="text-xs text-stone-400">{completedCount} concluídas</span>
            </div>
          </div>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded bg-stone-900/50 border border-stone-800">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2 text-xs rounded transition-all font-serif',
                filter === f
                  ? 'bg-amber-900/50 text-amber-200 border border-amber-800/50'
                  : 'text-stone-400 hover:bg-stone-800/50 hover:text-stone-300'
              )}
            >
              {f === 'all' ? 'Todas' : f === 'today' ? 'Hoje' : f === 'pending' ? 'Pendentes' : 'Concluídas'}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded bg-stone-900/30 border border-stone-800">
              <BookOpen className="w-12 h-12 mx-auto text-amber-900/50 mb-3" />
              <div className="text-amber-200/70 font-serif italic">Nenhuma tarefa registrada</div>
              <div className="text-stone-500 text-sm mt-1">
                "O conhecimento começa com uma única anotação."
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  'rounded bg-stone-900/40 border border-stone-800 overflow-hidden transition-all',
                  task.status === 'completed' && 'opacity-60'
                )}
              >
                {/* Top accent */}
                <div className={cn(
                  'h-0.5',
                  task.priority === 'high' ? 'bg-red-800' :
                  task.priority === 'medium' ? 'bg-amber-700' :
                  'bg-stone-700'
                )} />
                
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        task.status === 'completed'
                          ? 'border-amber-700 bg-amber-900/50 text-amber-400'
                          : 'border-amber-800/50 hover:bg-amber-900/30'
                      )}
                    >
                      {task.status === 'completed' && (
                        <span className="text-xs">✓</span>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        'font-serif',
                        task.status === 'completed'
                          ? 'line-through text-stone-500'
                          : 'text-amber-100'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-sm text-stone-400 mt-1 italic">
                          "{task.notes}"
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 rounded border',
                          getPriorityStyle(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-stone-500">
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
                      className="p-2 text-stone-600 hover:text-red-400 hover:bg-red-900/20 rounded transition-all"
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
            <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center shadow-lg border border-amber-800 z-40">
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-stone-900 border border-stone-700 text-stone-200 max-w-[90vw] rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-amber-200 flex items-center gap-2 font-serif">
                <Feather className="w-5 h-5 text-amber-600" />
                Nova Anotação
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-amber-400 text-sm font-serif">Título</Label>
                <Input
                  placeholder="Descreva sua tarefa..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-stone-800 border-stone-700 text-stone-200 placeholder:text-stone-500 focus:border-amber-700 rounded"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-amber-400 text-sm font-serif">Notas</Label>
                <Input
                  placeholder="Observações adicionais..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-stone-800 border-stone-700 text-stone-200 placeholder:text-stone-500 focus:border-amber-700 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-amber-400 text-sm font-serif">Data</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-stone-800 border-stone-700 text-stone-200 focus:border-amber-700 rounded"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-amber-400 text-sm font-serif">Prioridade</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-200 rounded">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-stone-800 border-stone-700 rounded">
                      <SelectItem value="low" className="text-stone-400">Contemplativo</SelectItem>
                      <SelectItem value="medium" className="text-amber-300">Moderado</SelectItem>
                      <SelectItem value="high" className="text-red-300">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 rounded bg-amber-900 text-amber-200 font-serif hover:bg-amber-800 transition-colors border border-amber-800"
              >
                Registrar Tarefa
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
