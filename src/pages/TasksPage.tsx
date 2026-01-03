import { useState } from 'react';
import { useTheme } from '@/themes/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskStore, Task } from '@/stores/taskStore';

// Import theme-specific components
import { CyberpunkTasksPage } from '@/themes/packs/cyberpunk/TasksPage';
import { WesternTasksPage } from '@/themes/packs/western/TasksPage';
import { NordicTasksPage } from '@/themes/packs/nordic/TasksPage';
import { DarkAcademiaTasksPage } from '@/themes/packs/dark-academia/TasksPage';
import { OceanTasksPage } from '@/themes/packs/ocean/TasksPage';
import { SynthwaveTasksPage } from '@/themes/packs/synthwave/TasksPage';
import { KawaiiTasksPage } from '@/themes/packs/kawaii/TasksPage';
import { NoirTasksPage } from '@/themes/packs/noir/TasksPage';
import { SpaceTasksPage } from '@/themes/packs/space/TasksPage';
import { SacredSerenityTasksPage } from '@/themes/packs/sacred-serenity/TasksPage';

export default function TasksPage() {
  const { themeId } = useTheme();
  const { user } = useAuth();
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  const [filter, setFilter] = useState<'all' | 'today' | 'pending' | 'completed'>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState<Task>({
    id: '',
    title: '',
    notes: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
    status: 'pending',
    tags: [],
    createdAt: new Date().toISOString(),
  });

  const handleAddTask = () => {
    if (newTask.title?.trim()) {
      addTask({
        title: newTask.title,
        notes: newTask.notes || '',
        dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
        priority: newTask.priority || 'medium',
        status: 'pending',
        tags: newTask.tags || [],
      });
      setNewTask({
        id: '',
        title: '',
        notes: '',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        status: 'pending',
        tags: [],
        createdAt: new Date().toISOString(),
      });
      setIsDialogOpen(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'today') return task.dueDate === today;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  const commonProps = {
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
    userName,
  };

  switch (themeId) {
    case 'cyberpunk':
      return <CyberpunkTasksPage {...commonProps} />;
    case 'western':
      return <WesternTasksPage {...commonProps} />;
    case 'nordic':
      return <NordicTasksPage {...commonProps} />;
    case 'dark-academia':
      return <DarkAcademiaTasksPage {...commonProps} />;
    case 'ocean':
      return <OceanTasksPage {...commonProps} />;
    case 'synthwave':
      return <SynthwaveTasksPage {...commonProps} />;
    case 'kawaii':
      return <KawaiiTasksPage {...commonProps} />;
    case 'noir':
      return <NoirTasksPage {...commonProps} />;
    case 'space':
      return <SpaceTasksPage {...commonProps} />;
    case 'sacred-serenity':
      return <SacredSerenityTasksPage {...commonProps} />;
    default:
      return <KawaiiTasksPage {...commonProps} />;
  }
}
