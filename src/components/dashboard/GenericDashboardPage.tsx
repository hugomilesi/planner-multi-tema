import { useMemo, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTaskStore } from '@/stores/taskStore';
import { useFinancialStore } from '@/stores/financialStore';
import { useTheme } from '@/themes/ThemeContext';
import { useTaskStats } from '@/hooks/useTaskFilters';
import { getThemeStyles } from '@/themes/configs/themeStyles';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export function GenericDashboardPage() {
  const { user } = useAuth();
  const { themeId } = useTheme();
  const styles = getThemeStyles(themeId);
  
  const tasks = useTaskStore((state) => state.tasks);
  const getMonthlyBalance = useFinancialStore((state) => state.getMonthlyBalance);
  
  const userName = useMemo(() =>
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'User',
    [user]
  );
  
  const now = useMemo(() => new Date(), []);
  const { income: monthIncome, expense: monthExpense, balance } = useMemo(
    () => getMonthlyBalance(now.getFullYear(), now.getMonth()),
    [getMonthlyBalance, now]
  );
  
  const stats = useTaskStats(tasks);
  
  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }, []);

  return (
    <div className={cn('min-h-screen pb-24', styles.container)}>
      {/* Header */}
      <header className="p-6">
        <h1 className={cn(styles.heading, 'text-3xl mb-2')}>
          Welcome, {userName}!
        </h1>
        <p className={styles.subheading}>
          {now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </header>

      {/* Quick Stats Grid */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Today's Tasks */}
          <div className={cn(styles.statCard, 'p-4 rounded-lg')}>
            <div className="flex items-center justify-between mb-2">
              <Calendar className={cn('w-5 h-5', styles.accent)} />
              <span className={cn(styles.subheading, 'text-xs')}>TODAY</span>
            </div>
            <div className={cn(styles.heading, 'text-2xl font-bold')}>
              {stats.todayTasks.length}
            </div>
            <div className={styles.subheading}>
              {stats.completedToday} completed
            </div>
          </div>

          {/* Pending Tasks */}
          <div className={cn(styles.statCard, 'p-4 rounded-lg')}>
            <div className="flex items-center justify-between mb-2">
              <Clock className={cn('w-5 h-5', styles.accent)} />
              <span className={cn(styles.subheading, 'text-xs')}>PENDING</span>
            </div>
            <div className={cn(styles.heading, 'text-2xl font-bold')}>
              {stats.pendingTasks}
            </div>
            <div className={styles.subheading}>
              tasks remaining
            </div>
          </div>

          {/* Overdue Tasks */}
          <div className={cn(styles.statCard, 'p-4 rounded-lg')}>
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className={cn(styles.subheading, 'text-xs')}>OVERDUE</span>
            </div>
            <div className={cn(styles.heading, 'text-2xl font-bold')}>
              {stats.overdueTasks}
            </div>
            <div className={styles.subheading}>
              need attention
            </div>
          </div>

          {/* Progress */}
          <div className={cn(styles.statCard, 'p-4 rounded-lg')}>
            <div className="flex items-center justify-between mb-2">
              <CheckCircle2 className={cn('w-5 h-5', styles.accent)} />
              <span className={cn(styles.subheading, 'text-xs')}>PROGRESS</span>
            </div>
            <div className={cn(styles.heading, 'text-2xl font-bold')}>
              {Math.round(stats.progressValue)}%
            </div>
            <div className={styles.subheading}>
              completion rate
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <div className={cn(styles.card, 'p-4 rounded-lg')}>
          <div className="flex items-center justify-between mb-3">
            <span className={styles.body}>Today's Progress</span>
            <span className={cn(styles.accent, 'font-bold')}>
              {stats.completedToday}/{stats.todayTasks.length}
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={cn(styles.progressBar, 'h-full transition-all duration-500')}
              style={{ width: `${stats.progressValue}%` }}
            />
          </div>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="px-6 mb-6">
        <h2 className={cn(styles.heading, 'text-xl mb-4')}>Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Income */}
          <div className={cn(styles.incomeCard, 'p-5 rounded-lg')}>
            <div className="flex items-center justify-between mb-2">
              <span className={styles.subheading}>Income</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className={cn(styles.heading, 'text-2xl font-bold text-green-600')}>
              {formatCurrency(monthIncome)}
            </div>
            <div className={styles.subheading}>This month</div>
          </div>

          {/* Expenses */}
          <div className={cn(styles.expenseCard, 'p-5 rounded-lg')}>
            <div className="flex items-center justify-between mb-2">
              <span className={styles.subheading}>Expenses</span>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className={cn(styles.heading, 'text-2xl font-bold text-red-600')}>
              {formatCurrency(monthExpense)}
            </div>
            <div className={styles.subheading}>This month</div>
          </div>

          {/* Balance */}
          <div className={cn(styles.balanceCard, 'p-5 rounded-lg')}>
            <div className="flex items-center justify-between mb-2">
              <span className={styles.subheading}>Balance</span>
              <div className={cn(
                'w-2 h-2 rounded-full',
                balance >= 0 ? 'bg-green-500' : 'bg-red-500'
              )} />
            </div>
            <div className={cn(
              styles.heading,
              'text-2xl font-bold',
              balance >= 0 ? 'text-green-600' : 'text-red-600'
            )}>
              {formatCurrency(balance)}
            </div>
            <div className={styles.subheading}>
              {balance >= 0 ? 'Positive' : 'Negative'}
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks List */}
      {stats.todayTasks.length > 0 && (
        <div className="px-6">
          <h2 className={cn(styles.heading, 'text-xl mb-4')}>Today's Tasks</h2>
          <div className="space-y-3">
            {stats.todayTasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className={cn(
                  styles.card,
                  'p-4 rounded-lg flex items-center gap-3',
                  task.completedAt && 'opacity-60'
                )}
              >
                {task.completedAt ? (
                  <CheckCircle2 className={cn('w-5 h-5', styles.accent)} />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2" style={{ borderColor: 'var(--border)' }} />
                )}
                <div className="flex-1">
                  <h3 className={cn(
                    styles.body,
                    'font-semibold',
                    task.completedAt && 'line-through'
                  )}>
                    {task.title}
                  </h3>
                  {task.notes && (
                    <p className={cn(styles.subheading, 'text-sm mt-1')}>
                      {task.notes}
                    </p>
                  )}
                </div>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
