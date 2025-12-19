'use client';

import { useState, useEffect, ComponentType } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { useTaskStore, Task } from '@/stores/taskStore';
import { ThemedCard } from '@/components/shared/ThemedCard';
import { ThemedBadge } from '@/components/shared/ThemedBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { PageTransition } from '@/components/layout/PageTransition';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { hasCustomPage, themedPages, ThemeWithCustomPages } from '@/themes/packs';
import { TasksPageProps } from '@/themes/packs/types';

type FilterType = 'all' | 'today' | 'pending' | 'completed';

export default function TasksPage() {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  const { tasks, addTask, toggleTaskStatus, deleteTask } = useTaskStore();
  
  // Dynamic theme page loading
  const [CustomPage, setCustomPage] = useState<ComponentType<TasksPageProps> | null>(null);
  
  useEffect(() => {
    if (hasCustomPage(themeId, 'tasks')) {
      const themePack = themedPages[themeId as ThemeWithCustomPages];
      if (themePack?.tasks) {
        themePack.tasks().then((Page) => setCustomPage(() => Page));
      }
    } else {
      setCustomPage(null);
    }
  }, [themeId]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  
  const [newTask, setNewTask] = useState({
    title: '',
    notes: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium' as Task['priority'],
    tags: [] as string[],
  });

  const today = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'today':
        return task.dueDate?.startsWith(today);
      case 'pending':
        return task.status === 'pending';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  }).sort((a, b) => {
    if (a.status !== b.status) return a.status === 'pending' ? -1 : 1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    addTask({
      title: newTask.title,
      notes: newTask.notes,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      status: 'pending',
      tags: newTask.tags,
    });

    setNewTask({
      title: '',
      notes: '',
      dueDate: today,
      priority: 'medium',
      tags: [],
    });
    setIsDialogOpen(false);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
    }
  };

  // Props for custom themed pages
  const pageProps: TasksPageProps = {
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
  };

  // Render custom themed page if available
  if (CustomPage) {
    return <CustomPage {...pageProps} />;
  }

  // Default page (for themes without custom templates)
  return (
    <PageTransition>
      <div className={cn('px-4 pt-6 pb-4 space-y-6', visuals.fonts.body)}>
        <header className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-2xl font-bold', visuals.fonts.heading)}>{visuals.labels.tasks}</h1>
            <p className={cn('text-sm opacity-70', visuals.card.titleClassName)}>
              {tasks.filter(t => t.status === 'pending').length} pending
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" className="rounded-full h-12 w-12">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] rounded-2xl">
              <DialogHeader>
                <DialogTitle>New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Task title..."
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Additional notes..."
                    value={newTask.notes}
                    onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: Task['priority']) => setNewTask({ ...newTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleAddTask} className="w-full">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Done</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <ThemedCard>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tasks found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Tap + to create your first task
                </p>
              </div>
            </ThemedCard>
          ) : (
            filteredTasks.map((task) => (
              <div key={task.id}>
                <ThemedCard className="p-0">
                  <div className="flex items-start gap-3 p-4">
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={() => toggleTaskStatus(task.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <ThemedBadge priority={task.priority} />
                      </div>
                      
                      {task.notes && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">
                          {task.notes}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3 mt-2">
                        {task.dueDate && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </ThemedCard>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
}
