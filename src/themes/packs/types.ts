import { Task } from '@/stores/taskStore';

// Props compartilhadas para páginas de Tasks (view-model)
export interface TasksPageProps {
  tasks: Task[];
  filteredTasks: Task[];
  filter: 'all' | 'today' | 'pending' | 'completed';
  setFilter: (filter: 'all' | 'today' | 'pending' | 'completed') => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  newTask: {
    title: string;
    notes: string;
    dueDate: string;
    priority: Task['priority'];
    tags: string[];
  };
  setNewTask: (task: TasksPageProps['newTask']) => void;
  handleAddTask: () => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
}

// Props compartilhadas para páginas de Dashboard (view-model)
export interface DashboardPageProps {
  todayTasks: Task[];
  completedToday: number;
  pendingTasks: number;
  overdueTasks: number;
  progressValue: number;
  monthIncome: number;
  monthExpense: number;
  balance: number;
  formatCurrency: (value: number) => string;
}

// Props compartilhadas para páginas de Financial (view-model)
export interface FinancialPageProps {
  monthIncome: number;
  monthExpense: number;
  balance: number;
  formatCurrency: (value: number) => string;
  pieData: { name: string; value: number; color?: string }[];
  last7Days: { day: string; income: number; expense: number }[];
  categorySpending: { id: string; name: string; icon: string; spent: number; budget?: number; percentage: number; color?: string }[];
  recentTransactions: { id: string; type: 'income' | 'expense'; amount: number; categoryId: string; date: string; note?: string }[];
  categories: { id: string; name: string; icon: string; type: 'income' | 'expense'; color?: string; budget?: number }[];
  // Dialog state
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  transactionType: 'income' | 'expense';
  setTransactionType: (type: 'income' | 'expense') => void;
  newTransaction: { amount: string; categoryId: string; date: string; note: string };
  setNewTransaction: (t: FinancialPageProps['newTransaction']) => void;
  handleAddTransaction: () => void;
  deleteTransaction: (id: string) => void;
}

// Props compartilhadas para páginas de Settings (view-model)
export interface SettingsPageProps {
  themeId: string;
  setTheme: (id: string) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
  themeList: { id: string; name: string; tokens: { primary: string; accent: string } }[];
  currentTheme: { name: string; tokens: { primary: string; accent: string } };
  handleExport: () => void;
  handleImport: () => void;
}

// Registro de temas que têm templates customizados
export type ThemedPageType = 'tasks' | 'dashboard' | 'financial' | 'settings';

export interface ThemePack {
  id: string;
  name: string;
  hasCustomPage: (page: ThemedPageType) => boolean;
}
