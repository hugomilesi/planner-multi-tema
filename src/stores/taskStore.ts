import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTasksByDate: (date: string) => Task[];
  getTodayTasks: () => Task[];
  getOverdueTasks: () => Task[];
}

const today = new Date();
const getDateStr = (daysOffset: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysOffset);
  return d.toISOString().split('T')[0];
};

const sampleTasks: Task[] = [
  { id: '1', title: 'Review project proposal', notes: 'Check budget and timeline', dueDate: getDateStr(0), priority: 'high', status: 'pending', tags: ['work'], createdAt: new Date().toISOString() },
  { id: '2', title: 'Buy groceries', notes: 'Milk, eggs, bread', dueDate: getDateStr(0), priority: 'medium', status: 'completed', tags: ['personal'], createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
  { id: '3', title: 'Call dentist', dueDate: getDateStr(1), priority: 'low', status: 'pending', tags: ['health'], createdAt: new Date().toISOString() },
  { id: '4', title: 'Finish report', notes: 'Q4 financial summary', dueDate: getDateStr(2), priority: 'high', status: 'pending', tags: ['work'], createdAt: new Date().toISOString() },
  { id: '5', title: 'Gym session', dueDate: getDateStr(0), priority: 'medium', status: 'pending', tags: ['health'], createdAt: new Date().toISOString() },
  { id: '6', title: 'Pay electricity bill', dueDate: getDateStr(-1), priority: 'high', status: 'pending', tags: ['bills'], createdAt: new Date().toISOString() },
];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: sampleTasks,

      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      toggleTaskStatus: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === 'pending' ? 'completed' : 'pending',
                  completedAt:
                    task.status === 'pending'
                      ? new Date().toISOString()
                      : undefined,
                }
              : task
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
    }),
    {
      name: 'planner-tasks',
      onRehydrateStorage: () => (state) => {
        if (state && state.tasks.length === 0) {
          state.tasks = sampleTasks;
        }
      },
    }
  )
);
