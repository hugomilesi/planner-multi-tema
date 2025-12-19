'use client';

import { TasksPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Heart, Star, Clock, Trash2, Plus, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/stores/taskStore';

export function KawaiiTasksPage({
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
      case 'high': return '🔥 Super importante!';
      case 'medium': return '⭐ Normal';
      case 'low': return '🌸 Relaxa';
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-500 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-500 border-blue-200';
    }
  };

  const getCardColor = (index: number) => {
    const colors = [
      'bg-pink-50 border-pink-200',
      'bg-purple-50 border-purple-200',
      'bg-blue-50 border-blue-200',
      'bg-green-50 border-green-200',
      'bg-yellow-50 border-yellow-200',
    ];
    return colors[index % colors.length];
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="fixed top-20 left-4 text-4xl opacity-20">🌸</div>
      <div className="fixed top-40 right-8 text-3xl opacity-20">⭐</div>
      <div className="fixed bottom-40 left-8 text-3xl opacity-20">💖</div>

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-pink-400 text-xs mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Minhas Tarefas</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-3xl font-bold text-pink-500">
            Lista Fofa ✨
          </h1>
          
          {/* Stats */}
          <div className="flex justify-center gap-3 mt-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-pink-200 shadow-sm">
              <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span className="text-xs text-pink-500">{pendingCount} pendentes</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-green-200 shadow-sm">
              <Star className="w-4 h-4 text-green-400 fill-green-400" />
              <span className="text-xs text-green-500">{completedCount} feitas!</span>
            </div>
          </div>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 p-1.5 rounded-2xl bg-white/60 border border-pink-200 shadow-sm">
          {(['all', 'today', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'flex-1 py-2 text-xs rounded-xl transition-all font-medium',
                filter === f
                  ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                  : 'text-pink-400 hover:bg-pink-100'
              )}
            >
              {f === 'all' ? '🌈 Tudo' : f === 'today' ? '📅 Hoje' : f === 'pending' ? '💪 Fazer' : '✅ Feito'}
            </button>
          ))}
        </div>

        {/* Task list */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white/80 border-2 border-dashed border-pink-200 shadow-sm">
              <div className="text-5xl mb-3">🌸</div>
              <div className="text-pink-400 font-medium">Nenhuma tarefa!</div>
              <div className="text-pink-300 text-sm mt-1">
                Adicione algo fofo para fazer~
              </div>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={cn(
                  'rounded-2xl border-2 shadow-sm transition-all',
                  task.status === 'completed' ? 'bg-green-50 border-green-200 opacity-70' : getCardColor(index)
                )}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={cn(
                        'w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                        task.status === 'completed'
                          ? 'border-green-400 bg-green-400 text-white'
                          : 'border-pink-300 hover:bg-pink-100'
                      )}
                    >
                      {task.status === 'completed' ? (
                        <span className="text-sm">✓</span>
                      ) : (
                        <Heart className="w-3 h-3 text-pink-300" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h3 className={cn(
                        'font-medium',
                        task.status === 'completed'
                          ? 'line-through text-green-500'
                          : 'text-gray-700'
                      )}>
                        {task.title}
                      </h3>

                      {/* Notes */}
                      {task.notes && (
                        <p className="text-sm text-gray-400 mt-1">
                          {task.notes}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className={cn(
                          'text-[10px] px-2 py-0.5 rounded-full border font-medium',
                          getPriorityStyle(task.priority)
                        )}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-gray-400">
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
                      className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-50 rounded-xl transition-all"
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
            <button className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white flex items-center justify-center shadow-lg shadow-pink-300/50 z-40 border-2 border-white">
              <Plus className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white border-2 border-pink-200 text-gray-700 max-w-[90vw] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-pink-500 flex items-center gap-2 text-lg">
                <Sparkles className="w-5 h-5" />
                Nova Tarefa Fofa
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-pink-400 text-sm">O que você vai fazer?</Label>
                <Input
                  placeholder="Escreva aqui..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="bg-pink-50 border-pink-200 text-gray-700 placeholder:text-pink-300 focus:border-pink-400 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-pink-400 text-sm">Notas (opcional)</Label>
                <Input
                  placeholder="Detalhes..."
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  className="bg-pink-50 border-pink-200 text-gray-700 placeholder:text-pink-300 focus:border-pink-400 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-pink-400 text-sm">Data</Label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="bg-pink-50 border-pink-200 text-gray-700 focus:border-pink-400 rounded-xl"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-pink-400 text-sm">Prioridade</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                  >
                    <SelectTrigger className="bg-pink-50 border-pink-200 text-gray-700 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pink-200 rounded-xl">
                      <SelectItem value="low" className="text-blue-500">🌸 Relaxa</SelectItem>
                      <SelectItem value="medium" className="text-yellow-500">⭐ Normal</SelectItem>
                      <SelectItem value="high" className="text-red-500">🔥 Importante!</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <button
                onClick={handleAddTask}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium hover:opacity-90 transition-opacity shadow-md"
              >
                Adicionar ✨
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
