import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export interface Task {
  id: string;
  title: string;
  notes?: string;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  tags: string[];
  createdAt: string;
  completedAt?: string;
}

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  tenantId: string | null;
  userId: string | null;
  setContext: (tenantId: string, userId: string) => void;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  getTasksByDate: (date: string) => Task[];
  getTodayTasks: () => Task[];
  getOverdueTasks: () => Task[];
  clearTasks: () => void;
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: [],
  isLoading: false,
  tenantId: null,
  userId: null,

  setContext: (tenantId, userId) => {
    set({ tenantId, userId });
  },

  clearTasks: () => {
    set({ tasks: [], tenantId: null, userId: null });
  },

  fetchTasks: async () => {
    const { tenantId, userId } = get();
    if (!tenantId || !userId) return;

    set({ isLoading: true });
    const supabase = createClient();

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tasks:', error);
      set({ isLoading: false });
      return;
    }

    const tasks: Task[] = (data || []).map((t) => ({
      id: t.id,
      title: t.title,
      notes: t.description || undefined,
      dueDate: t.due_at ? t.due_at.split('T')[0] : undefined,
      priority: (t.priority as Task['priority']) || 'medium',
      status: (t.status as Task['status']) || 'pending',
      tags: [],
      createdAt: t.created_at || new Date().toISOString(),
      completedAt: t.status === 'completed' ? t.updated_at || undefined : undefined,
    }));

    set({ tasks, isLoading: false });
  },

  addTask: async (task) => {
    const { tenantId, userId } = get();
    if (!tenantId || !userId) return;

    const supabase = createClient();

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        tenant_id: tenantId,
        user_id: userId,
        title: task.title,
        description: task.notes || null,
        due_at: task.dueDate || null,
        priority: task.priority,
        status: task.status,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding task:', error);
      return;
    }

    const newTask: Task = {
      id: data.id,
      title: data.title,
      notes: data.description || undefined,
      dueDate: data.due_at ? data.due_at.split('T')[0] : undefined,
      priority: (data.priority as Task['priority']) || 'medium',
      status: (data.status as Task['status']) || 'pending',
      tags: [],
      createdAt: data.created_at || new Date().toISOString(),
    };

    set((state) => ({ tasks: [newTask, ...state.tasks] }));
  },

  updateTask: async (id, updates) => {
    const supabase = createClient();

    const dbUpdates: Record<string, unknown> = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.notes !== undefined) dbUpdates.description = updates.notes;
    if (updates.dueDate !== undefined) dbUpdates.due_at = updates.dueDate;
    if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
    if (updates.status !== undefined) dbUpdates.status = updates.status;

    const { error } = await supabase
      .from('tasks')
      .update(dbUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating task:', error);
      return;
    }

    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    }));
  },

  deleteTask: async (id) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      return;
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  toggleTaskStatus: async (id) => {
    const task = get().tasks.find((t) => t.id === id);
    if (!task) return;

    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    const supabase = createClient();

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error toggling task status:', error);
      return;
    }

    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status: newStatus,
              completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
            }
          : t
      ),
    }));
  },

  getTasksByDate: (date) => {
    return get().tasks.filter((task) => task.dueDate?.startsWith(date));
  },

  getTodayTasks: () => {
    const today = new Date().toISOString().split('T')[0];
    return get().tasks.filter((task) => task.dueDate?.startsWith(today));
  },

  getOverdueTasks: () => {
    const today = new Date().toISOString().split('T')[0];
    return get().tasks.filter(
      (task) =>
        task.status === 'pending' &&
        task.dueDate &&
        task.dueDate < today
    );
  },
}));
