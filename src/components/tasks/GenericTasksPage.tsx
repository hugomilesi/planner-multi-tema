import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskStore } from '@/stores/taskStore';
import { useTheme } from '@/themes/ThemeContext';
import { useWeekTimeline } from '@/hooks/useWeekTimeline';
import { useTaskFilters, useTaskStats, TaskFilter } from '@/hooks/useTaskFilters';
import { getThemeStyles } from '@/themes/configs/themeStyles';
import { cn } from '@/lib/utils';
import { Plus, Trash2, Calendar, CheckCircle2, Circle } from 'lucide-react';

export function GenericTasksPage() {
  const { user } = useAuth();
  const { themeId } = useTheme();
  const styles = getThemeStyles(themeId);
  
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const weekDays = useWeekTimeline();
  const filteredTasks = useTaskFilters(tasks, filter);
  const stats = useTaskStats(tasks);

  const getPriorityStyle = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return styles.taskPriorityHigh;
      case 'medium': return styles.taskPriorityMedium;
      case 'low': return styles.taskPriorityLow;
      default: return '';
    }
  };

  return (
    <div className={cn('min-h-screen pb-24', styles.container)}>
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-sm p-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <h1 className={styles.heading}>Tasks</h1>
          <button
            onClick={() => setIsDialogOpen(true)}
            className={cn(styles.button, 'px-4 py-2 rounded-lg flex items-center gap-2')}
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
        <p className={styles.subheading}>
          {stats.completedToday} of {stats.todayTasks.length} completed today
        </p>
      </header>

      {/* Week Timeline */}
      <div className="px-4 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {weekDays.map((day) => (
            <div
              key={day.date.toISOString()}
              className={cn(
                styles.card,
                'flex-shrink-0 w-16 p-3 text-center cursor-pointer transition-all',
                day.isToday && styles.cardHover
              )}
            >
              <div className={cn(styles.subheading, 'text-xs mb-1')}>
                {day.dayName}
              </div>
              <div className={cn(
                styles.heading,
                'text-2xl font-bold',
                day.isToday && styles.accent
              )}>
                {day.dayNumber}
              </div>
              {day.isToday && (
                <div className={cn(styles.accent, 'text-xs mt-1')}>Today</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className={cn(styles.statCard, 'p-4 rounded-lg')}>
            <div className={styles.subheading}>Pending</div>
            <div className={cn(styles.heading, 'text-2xl mt-1')}>{stats.pendingTasks}</div>
          </div>
          <div className={cn(styles.statCard, 'p-4 rounded-lg')}>
            <div className={styles.subheading}>Overdue</div>
            <div className={cn(styles.heading, 'text-2xl mt-1')}>{stats.overdueTasks}</div>
          </div>
          <div className={cn(styles.statCard, 'p-4 rounded-lg')}>
            <div className={styles.subheading}>Progress</div>
            <div className={cn(styles.heading, 'text-2xl mt-1')}>{Math.round(stats.progressValue)}%</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={cn(styles.progressBar, 'h-full transition-all duration-300')}
            style={{ width: `${stats.progressValue}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(['all', 'today', 'pending', 'completed'] as TaskFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-lg capitalize whitespace-nowrap transition-all',
                filter === f
                  ? cn(styles.button, styles.buttonHover)
                  : cn(styles.card, 'hover:opacity-80')
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tasks List */}
      <div className="px-4 space-y-3">
        {filteredTasks.length === 0 ? (
          <div className={cn(styles.card, 'p-8 text-center rounded-lg')}>
            <div className="text-4xl mb-2">📝</div>
            <p className={styles.subheading}>No tasks found</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                styles.taskCard,
                'rounded-lg transition-all group',
                task.completedAt && styles.taskCardCompleted,
                getPriorityStyle(task.priority)
              )}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="mt-1 flex-shrink-0"
                >
                  {task.completedAt ? (
                    <CheckCircle2 className={cn('w-5 h-5', styles.accent)} />
                  ) : (
                    <Circle className="w-5 h-5 opacity-50" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <h3
                    className={cn(
                      styles.body,
                      'font-semibold',
                      task.completedAt && 'line-through opacity-60'
                    )}
                  >
                    {task.title}
                  </h3>
                  
                  {task.notes && (
                    <p className={cn(styles.subheading, 'mt-1 text-sm')}>
                      {task.notes}
                    </p>
                  )}
                  
                  {task.dueDate && (
                    <div className={cn(styles.subheading, 'flex items-center gap-1 mt-2 text-xs')}>
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(task.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={cn(
                        'text-xs px-2 py-1 rounded capitalize',
                        task.priority === 'high' && 'bg-red-500/10 text-red-500',
                        task.priority === 'medium' && 'bg-yellow-500/10 text-yellow-500',
                        task.priority === 'low' && 'bg-green-500/10 text-green-500'
                      )}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                >
                  <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAB - Add Task */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className={cn(
          styles.button,
          styles.buttonHover,
          'fixed bottom-20 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-30'
        )}
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
