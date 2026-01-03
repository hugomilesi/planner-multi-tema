import { useMemo } from 'react';
import type { Task } from '@/stores/taskStore';

export type TaskFilter = 'all' | 'today' | 'pending' | 'completed';

export function useTaskFilters(tasks: Task[], filter: TaskFilter) {
  return useMemo(() => {
    return tasks.filter(t => {
      if (filter === 'pending') return !t.completedAt;
      if (filter === 'completed') return !!t.completedAt;
      if (filter === 'today') {
        const today = new Date().toDateString();
        return t.dueDate && new Date(t.dueDate).toDateString() === today;
      }
      return true;
    });
  }, [tasks, filter]);
}

export function useTaskStats(tasks: Task[]) {
  return useMemo(() => {
    const today = new Date().toDateString();
    
    const todayTasks = tasks.filter(t => 
      t.dueDate && new Date(t.dueDate).toDateString() === today
    );
    
    const completedToday = todayTasks.filter(t => t.completedAt).length;
    const pendingTasks = tasks.filter(t => !t.completedAt).length;
    
    const overdueTasks = tasks.filter(t => {
      if (t.completedAt || !t.dueDate) return false;
      return new Date(t.dueDate) < new Date(today);
    }).length;
    
    const progressValue = todayTasks.length > 0 
      ? (completedToday / todayTasks.length) * 100 
      : 0;
    
    return {
      todayTasks,
      completedToday,
      pendingTasks,
      overdueTasks,
      progressValue,
    };
  }, [tasks]);
}
