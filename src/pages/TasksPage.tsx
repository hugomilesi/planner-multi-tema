import { lazy, Suspense, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskStore, Task } from '@/stores/taskStore';
import { useTheme } from '@/themes/ThemeContext';
import { TasksPageProps } from '@/themes/packs/types';

const themedTasks: Record<string, () => Promise<{ default: React.ComponentType<TasksPageProps> }>> = {
  cyberpunk: () => import('@/themes/packs/cyberpunk/TasksPage').then(m => ({ default: m.CyberpunkTasksPage })),
  western: () => import('@/themes/packs/western/TasksPage').then(m => ({ default: m.WesternTasksPage })),
  nordic: () => import('@/themes/packs/nordic/TasksPage').then(m => ({ default: m.NordicTasksPage })),
  'dark-academia': () => import('@/themes/packs/dark-academia/TasksPage').then(m => ({ default: m.DarkAcademiaTasksPage })),
  ocean: () => import('@/themes/packs/ocean/TasksPage').then(m => ({ default: m.OceanTasksPage })),
  synthwave: () => import('@/themes/packs/synthwave/TasksPage').then(m => ({ default: m.SynthwaveTasksPage })),
  kawaii: () => import('@/themes/packs/kawaii/TasksPage').then(m => ({ default: m.KawaiiTasksPage })),
  noir: () => import('@/themes/packs/noir/TasksPage').then(m => ({ default: m.NoirTasksPage })),
  space: () => import('@/themes/packs/space/TasksPage').then(m => ({ default: m.SpaceTasksPage })),
  'sacred-serenity': () => import('@/themes/packs/sacred-serenity/TasksPage').then(m => ({ default: m.SacredSerenityTasksPage })),
};

export default function TasksPage() {
  const { user } = useAuth();
  const { themeId } = useTheme();
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const [filter, setFilter] = useState<'all' | 'today' | 'pending' | 'completed'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', notes: '', dueDate: '', priority: 'medium' as 'low' | 'medium' | 'high', tags: [] as string[] });

  const filteredTasks = tasks.filter(t => {
    if (filter === 'pending') return !t.completedAt;
    if (filter === 'completed') return !!t.completedAt;
    if (filter === 'today') {
      const today = new Date().toDateString();
      return t.dueDate && new Date(t.dueDate).toDateString() === today;
    }
    return true;
  });

  const handleAddTask = () => {
    // This would be implemented with the actual add task logic
    setIsDialogOpen(false);
  };

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

  const ThemedTasks = themedTasks[themeId];

  if (ThemedTasks) {
    const LazyThemedTasks = lazy(ThemedTasks);
    return (
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <LazyThemedTasks {...pageProps} />
      </Suspense>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-muted-foreground">No tasks yet</p>
        ) : (
          tasks.map((task: Task) => (
            <div 
              key={task.id} 
              className="p-4 border rounded flex items-start gap-3 cursor-pointer hover:bg-accent/50"
              onClick={() => toggleTaskStatus(task.id)}
            >
              <input
                type="checkbox"
                checked={!!task.completedAt}
                onChange={() => {}}
                className="mt-1"
              />
              <div className="flex-1">
                <h3 className={`font-semibold ${task.completedAt ? 'line-through opacity-60' : ''}`}>
                  {task.title}
                </h3>
                {task.notes && (
                  <p className="text-sm text-muted-foreground">{task.notes}</p>
                )}
                {task.dueDate && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
