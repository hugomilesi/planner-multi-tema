'use client';

import { Plus, TrendingUp, TrendingDown, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useTheme } from '@/themes/ThemeContext';
import { getThemeVisuals } from '@/themes/themeStyles';
import { useTaskStore } from '@/stores/taskStore';
import { useFinancialStore } from '@/stores/financialStore';
import { ThemedCard } from '@/components/shared/ThemedCard';
import { ThemedProgress } from '@/components/shared/ThemedProgress';
import { ThemedBadge } from '@/components/shared/ThemedBadge';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/layout/PageTransition';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { themeId } = useTheme();
  const visuals = getThemeVisuals(themeId);
  const tasks = useTaskStore((state) => state.tasks);
  const { transactions, currency } = useFinancialStore();

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  const todayTasks = tasks.filter((t) => t.dueDate?.startsWith(todayStr));
  const completedToday = todayTasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;
  const overdueTasks = tasks.filter(
    (t) => t.status === 'pending' && t.dueDate && t.dueDate < todayStr
  ).length;

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthIncome = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const monthExpense = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = monthIncome - monthExpense;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  const progressValue = todayTasks.length > 0 
    ? (completedToday / todayTasks.length) * 100 
    : 0;

  return (
    <PageTransition>
      <div className={cn('px-4 pt-6 pb-4 space-y-6', visuals.fonts.body)}>
        {/* Header with themed greeting */}
        <header className="space-y-1">
          <p className={cn('text-sm opacity-70', visuals.card.titleClassName)}>
            {visuals.labels.greeting}
          </p>
          <h1 className={cn('text-2xl font-bold', visuals.fonts.heading)}>
            {visuals.labels.dashboard}
          </h1>
        </header>

        {/* Daily Progress */}
        <ThemedCard>
          <ThemedProgress 
            value={progressValue}
            label={visuals.labels.progress}
            showPercentage
          />
          <p className="text-xs opacity-60 mt-2">
            {completedToday} of {todayTasks.length} tasks completed today
          </p>
        </ThemedCard>

        {/* Financial Summary */}
        <div className="grid grid-cols-2 gap-3">
          <ThemedCard>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className={cn('text-xs', visuals.card.titleClassName)}>{visuals.labels.income}</span>
            </div>
            <p className={cn('text-lg font-bold text-green-500', visuals.fonts.heading)}>
              {formatCurrency(monthIncome)}
            </p>
          </ThemedCard>

          <ThemedCard>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <span className={cn('text-xs', visuals.card.titleClassName)}>{visuals.labels.expense}</span>
            </div>
            <p className={cn('text-lg font-bold text-red-500', visuals.fonts.heading)}>
              {formatCurrency(monthExpense)}
            </p>
          </ThemedCard>
        </div>

        {/* Today's Tasks */}
        <ThemedCard title={visuals.labels.taskList}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{completedToday} done</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">{todayTasks.length - completedToday} pending</span>
                </div>
              </div>
            </div>

            {todayTasks.length === 0 ? (
              <p className="text-sm opacity-60 text-center py-4">
                No tasks scheduled for today
              </p>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between gap-3 p-2 rounded-lg bg-black/10"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div 
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          task.status === 'completed' ? 'bg-green-500' : 
                          task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                      />
                      <span className={`text-sm truncate ${task.status === 'completed' ? 'line-through opacity-50' : ''}`}>
                        {task.title}
                      </span>
                    </div>
                    {task.status !== 'completed' && (
                      <ThemedBadge priority={task.priority} />
                    )}
                  </div>
                ))}
              </div>
            )}

            <Link href="/tasks">
              <Button variant="outline" className="w-full" size="sm">
                View All {visuals.labels.tasks}
              </Button>
            </Link>
          </div>
        </ThemedCard>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <ThemedCard>
            <div className="flex items-center gap-3 text-destructive">
              <AlertCircle className="w-5 h-5" />
              <div>
                <p className={cn('font-medium', visuals.fonts.heading)}>
                  {overdueTasks} overdue task{overdueTasks > 1 ? 's' : ''}
                </p>
                <p className="text-xs opacity-60">Requires your attention</p>
              </div>
            </div>
          </ThemedCard>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <Button className="w-full h-12 gap-2" variant="default">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </Link>
          <Link href="/financial">
            <Button className="w-full h-12 gap-2" variant="secondary">
              <Plus className="w-4 h-4" />
              New Transaction
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
