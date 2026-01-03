import { Task } from '@/stores/taskStore';
import type { PeriodRange } from '@/components/financial/PeriodFilter';

// Props compartilhadas para páginas de Tasks (view-model)
export interface TasksPageProps {
  tasks: Task[];
  filteredTasks: Task[];
  filter: 'all' | 'today' | 'pending' | 'completed';
  setFilter: (filter: 'all' | 'today' | 'pending' | 'completed') => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  newTask: Task;
  setNewTask: (task: Task) => void;
  handleAddTask: () => void;
  toggleTaskStatus: (id: string) => void;
  deleteTask: (id: string) => void;
  userName?: string;
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
  userName?: string;
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
  filteredTransactions?: { id: string; type: 'income' | 'expense'; amount: number; categoryId: string; date: string; note?: string; createdAt: string }[];
  categories: { id: string; name: string; icon: string; type: 'income' | 'expense'; color?: string; budget?: number }[];
  // Dialog state - apenas controla a abertura, o CreateTransactionDialog global gerencia o resto
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  deleteTransaction: (id: string) => void;
  // Period filter
  selectedPeriod?: PeriodRange;
  setSelectedPeriod?: (period: PeriodRange) => void;
}

// Props compartilhadas para páginas de Settings (view-model)
export interface SettingsPageProps {
  themeId: string;
  setTheme: (id: string) => void;
  reduceMotion: boolean;
  setReduceMotion: (value: boolean) => void;
  themeList: { id: string; name: string; tokens: { primary: string; accent: string }; preview?: { accent: string; icon?: string } }[];
  currentTheme: { name: string; tokens: { primary: string; accent: string } };
  handleExport: () => void;
  handleImport: () => void;
  userName?: string;
  userEmail?: string;
  isAuthenticated?: boolean;
  onLogout?: () => void | Promise<void>;
  isLoggingOut?: boolean;
}

// Registro de temas que têm templates customizados
export type ThemedPageType = 'tasks' | 'dashboard' | 'financial' | 'settings';

export interface ThemePack {
  id: string;
  name: string;
  hasCustomPage: (page: ThemedPageType) => boolean;
}
