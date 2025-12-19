'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Clock, Trash2, Plus, Star } from 'lucide-react';
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

  const getPriorityLabel = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'URGENTE';
      case 'medium': return 'NORMAL';
      case 'low': return 'CALMO';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-800 text-amber-100 border-red-900';
      case 'medium': return 'bg-amber-700 text-amber-100 border-amber-800';
      case 'low': return 'bg-amber-900/50 text-amber-200 border-amber-800';
    }
  };

  const filterLabels = {
    all: 'TUDO',
    today: 'Hoje',
    pending: 'Pendente',
    completed: 'Feito',
  };

  return (
    <div 
      className="min-h-screen font-[family-name:var(--font-rye)]"
      style={{
        backgroundColor: '#EFE6DD',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%238B5A2B' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header - Wanted poster style */}
        <header className="mb-6">
          <div className="text-amber-800/60 text-xs tracking-[0.2em] mb-1 font-[family-name:var(--font-courier-prime)]">
            WANTED: TASKS
          </div>
          <h1 className="text-3xl text-amber-900 drop-shadow-sm">
            Lista de Tarefas
          </h1>
          
          {/* Bounty counter */}
          <div className="flex items-center gap-2 mt-3">
            <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span className="text-sm text-amber-800 font-[family-name:var(--font-courier-prime)]">
              {pendingCount} recompensa{pendingCount !== 1 ? 's' : ''} pendente{pendingCount !== 1 ? 's' : ''}
            </span>
          </div>
        </header>

        {/* Filter tabs - Western style buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 text-sm whitespace-nowrap transition-all border-2 shadow-md',
                filter === f
                  ? 'bg-amber-800 text-amber-100 border-amber-900'
                  : 'bg-amber-100 text-amber-800 border-amber-700 hover:bg-amber-200'
              )}
              style={{
                boxShadow: filter === f 
                  ? 'inset 0 2px 4px rgba(0,0,0,0.3)' 
                  : '2px 2px 0 rgba(139,69,19,0.3)',
              }}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div 
              className="p-8 text-center border-2 border-dashed border-amber-700/30 bg-amber-50/50"
              style={{ borderStyle: 'dashed' }}
            >
              <div className="text-amber-700 font-[family-name:var(--font-rye)]">
                Nenhuma tarefa encontrada
              </div>
              <div className="text-amber-600/70 text-sm mt-2 font-[family-name:var(--font-courier-prime)]">
                Toque no + para criar sua primeira tarefa
              </div>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  'relative bg-[#F4ECD8] border-2 border-amber-800/40 shadow-lg transform',
                  task.status === 'completed' ? 'opacity-60' : '',
                  index % 2 === 0 ? 'rotate-[0.5deg]' : 'rotate-[-0.5deg]'
                )}
                style={{
                  boxShadow: '4px 4px 0 rgba(139,69,19,0.2), inset 0 0 30px rgba(139,69,19,0.05)',
                }}
              >
                {/* Pin decoration */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-700 border-2 border-amber-900 shadow-md z-10" />

                {/* Priority ribbon */}
                {task.priority === 'high' && task.status !== 'completed' && (
                  <div className="absolute -top-1 -right-1 px-3 py-1 bg-red-800 text-amber-100 text-[10px] font-bold transform rotate-3 shadow-md border border-red-900">
                    URGENTE
                  </div>
                )}

                <div className="p-4 pt-5">
                  <div className="flex items-start gap-3">
                    {/* Checkbox - Western style */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-6 h-6 border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                        task.status === 'completed'
                          ? 'border-amber-700 bg-amber-700 text-amber-100'
                          : 'border-amber-700 hover:bg-amber-200'
                      )}
                    >
                      {task.status === 'completed' && (
                        <span className="text-sm font-bold">✓</span>
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        'text-lg text-amber-900',
                        task.status === 'completed' && 'line-through text-amber-700/70'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-sm text-amber-700/80 mt-1 font-[family-name:var(--font-courier-prime)]">
                          {task.notes}
                        </p>
                      )}

                      {/* Meta info */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 border font-[family-name:var(--font-courier-prime)] font-bold',
                          getPriorityStyle(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-amber-700">
                            <Clock className="w-3 h-3" />
                            <span className="font-[family-name:var(--font-courier-prime)]">
                              {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 text-amber-700/50 hover:text-red-700 hover:bg-red-100 transition-all rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Torn paper effect bottom */}
                <div 
                  className="h-2 bg-repeat-x"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='8' viewBox='0 0 20 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8 L5 0 L10 8 L15 0 L20 8' fill='none' stroke='%238B5A2B' stroke-width='0.5' stroke-opacity='0.2'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>
            ))
          )}
        </div>

        {/* FAB - Add new task (leather button style) */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              className="fixed bottom-24 right-4 w-14 h-14 bg-amber-800 text-amber-100 flex items-center justify-center rounded-full border-4 border-amber-900 z-40"
              style={{
                boxShadow: '3px 3px 0 rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.1)',
              }}
            >
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent 
            className="bg-[#F4ECD8] border-4 border-amber-800 text-amber-900 max-w-[90vw]"
            style={{
              boxShadow: '8px 8px 0 rgba(139,69,19,0.3)',
            }}
          >
            <DialogHeader>
              <DialogTitle className="font-[family-name:var(--font-rye)] text-amber-900 text-xl">
                Nova Tarefa
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Título</Label>
                <Input
                  placeholder="Digite o título..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-amber-50 border-2 border-amber-700 text-amber-900 placeholder:text-amber-600/50 focus:border-amber-900"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Notas</Label>
                <Input
                  placeholder="Detalhes adicionais..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-amber-50 border-2 border-amber-700 text-amber-900 placeholder:text-amber-600/50 focus:border-amber-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Data</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-amber-50 border-2 border-amber-700 text-amber-900 focus:border-amber-900"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Prioridade</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-amber-50 border-2 border-amber-700 text-amber-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#F4ECD8] border-2 border-amber-700">
                      <SelectItem value="low" className="text-amber-700">Calmo</SelectItem>
                      <SelectItem value="medium" className="text-amber-800">Normal</SelectItem>
                      <SelectItem value="high" className="text-red-800">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 bg-amber-800 text-amber-100 font-[family-name:var(--font-rye)] border-2 border-amber-900 hover:bg-amber-700 transition-all"
                style={{
                  boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
                }}
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
