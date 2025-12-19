'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Mountain, Snowflake, Clock, Trash2, Plus, Check } from 'lucide-react';
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
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 text-slate-400 text-xs tracking-widest mb-1">
            <Snowflake className="w-3 h-3" />
            <span>TAREFAS</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Lista de Tarefas
          </h1>
          
          {/* Stats */}
          <div className="flex gap-3 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <Mountain className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-slate-600">{pendingCount} pendentes</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm">
              <Check className="w-4 h-4 text-green-500" />
              <span className="text-sm text-slate-600">{completedCount} concluídas</span>
            </div>
          </div>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl bg-white border border-slate-200 shadow-sm">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2 text-sm rounded-lg transition-all',
                filter === f
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-500 hover:bg-slate-100'
              )}
            >
              {f === 'all' ? 'Todas' : f === 'today' ? 'Hoje' : f === 'pending' ? 'Pendentes' : 'Concluídas'}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-2">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-white border border-slate-200 shadow-sm">
              <Mountain className="w-12 h-12 mx-auto text-slate-300 mb-3" />
              <div className="text-slate-500">Nenhuma tarefa encontrada</div>
              <div className="text-slate-400 text-sm mt-1">
                Adicione uma nova tarefa para começar
              </div>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  'rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden transition-all',
                  task.status === 'completed' && 'opacity-60'
                )}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        task.status === 'completed'
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-slate-300 hover:border-blue-500'
                      )}
                    >
                      {task.status === 'completed' && (
                        <Check className="w-3 h-3" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        'font-medium',
                        task.status === 'completed'
                          ? 'line-through text-slate-400'
                          : 'text-slate-800'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-sm text-slate-500 mt-1">
                          {task.notes}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={cn(
                          'text-xs px-2 py-0.5 rounded-full border',
                          getPriorityStyle(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-slate-400">
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
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
            <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 z-40 hover:bg-blue-600 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white border border-slate-200 text-slate-800 max-w-[90vw] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-slate-800 flex items-center gap-2">
                <Mountain className="w-5 h-5 text-blue-500" />
                Nova Tarefa
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-slate-600 text-sm">Título</Label>
                <Input
                  placeholder="O que você precisa fazer?"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-slate-600 text-sm">Notas</Label>
                <Input
                  placeholder="Detalhes adicionais..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-600 text-sm">Data</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-slate-600 text-sm">Prioridade</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-800 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 rounded-xl">
                      <SelectItem value="low" className="text-blue-600">Baixa</SelectItem>
                      <SelectItem value="medium" className="text-amber-600">Média</SelectItem>
                      <SelectItem value="high" className="text-red-600">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors"
              >
                Adicionar Tarefa
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
