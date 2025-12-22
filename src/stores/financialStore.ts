import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
  type: 'income' | 'expense';
  isDefault?: boolean;
}

interface FinancialStore {
  transactions: Transaction[];
  categories: Category[];
  currency: string;
  isLoading: boolean;
  tenantId: string | null;
  userId: string | null;
  
  setContext: (tenantId: string, userId: string) => void;
  fetchData: () => Promise<void>;
  
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  updateTransaction: (id: string, updates: Partial<Transaction>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, updates: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  
  setCurrency: (currency: string) => void;
  
  getMonthlyBalance: (year: number, month: number) => { income: number; expense: number; balance: number };
  getCategorySpending: (categoryId: string, year: number, month: number) => number;
  getTransactionsByMonth: (year: number, month: number) => Transaction[];
  clearData: () => void;
}

const defaultCategories: Category[] = [
  { id: 'salary', name: 'Salary', icon: '💰', color: '#22c55e', type: 'income', isDefault: true },
  { id: 'freelance', name: 'Freelance', icon: '💼', color: '#3b82f6', type: 'income', isDefault: true },
  { id: 'investments', name: 'Investments', icon: '📈', color: '#8b5cf6', type: 'income', isDefault: true },
  { id: 'food', name: 'Food', icon: '🍔', color: '#f97316', type: 'expense', budget: 500, isDefault: true },
  { id: 'transport', name: 'Transport', icon: '🚗', color: '#06b6d4', type: 'expense', budget: 200, isDefault: true },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮', color: '#ec4899', type: 'expense', budget: 150, isDefault: true },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#f59e0b', type: 'expense', budget: 300, isDefault: true },
  { id: 'bills', name: 'Bills', icon: '📄', color: '#64748b', type: 'expense', budget: 400, isDefault: true },
  { id: 'health', name: 'Health', icon: '🏥', color: '#ef4444', type: 'expense', budget: 100, isDefault: true },
];

export const useFinancialStore = create<FinancialStore>()((set, get) => ({
  transactions: [],
  categories: defaultCategories,
  currency: 'BRL',
  isLoading: false,
  tenantId: null,
  userId: null,

  setContext: (tenantId, userId) => {
    set({ tenantId, userId });
  },

  clearData: () => {
    set({ transactions: [], categories: defaultCategories, tenantId: null, userId: null });
  },

  fetchData: async () => {
    const { tenantId, userId } = get();
    if (!tenantId || !userId) return;

    set({ isLoading: true });
    const supabase = createClient();

    // Fetch transactions
    const { data: transactionsData, error: transactionsError } = await supabase
      .from('transactions')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (transactionsError) {
      console.error('Error fetching transactions:', transactionsError);
    }

    // Fetch categories - get user's categories and default categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .or(`tenant_id.eq.${tenantId},and(tenant_id.is.null,is_default.eq.true)`)
      .order('name');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
    }

    // Fetch user settings for currency
    const { data: settingsData } = await supabase
      .from('user_settings')
      .select('currency')
      .eq('tenant_id', tenantId)
      .eq('user_id', userId)
      .single();

    const transactions: Transaction[] = (transactionsData || []).map((t) => ({
      id: t.id,
      type: t.type as 'income' | 'expense',
      amount: t.amount,
      categoryId: t.category_id || '',
      date: t.date,
      note: t.note || undefined,
      createdAt: t.created_at || new Date().toISOString(),
    }));

    const categories: Category[] = categoriesData && categoriesData.length > 0
      ? categoriesData.map((c) => ({
          id: c.id,
          name: c.name,
          icon: c.icon || '📦',
          color: c.color || '#6b7280',
          type: c.type as 'income' | 'expense',
          isDefault: c.is_default || false,
        }))
      : defaultCategories;

    set({
      transactions,
      categories,
      currency: settingsData?.currency || 'BRL',
      isLoading: false,
    });
  },

  addTransaction: async (transaction) => {
    const { tenantId, userId } = get();
    if (!tenantId || !userId) return;

    const supabase = createClient();

    const { data, error } = await supabase
      .from('transactions')
      .insert({
        tenant_id: tenantId,
        user_id: userId,
        type: transaction.type,
        amount: transaction.amount,
        category_id: transaction.categoryId || null,
        date: transaction.date,
        note: transaction.note || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding transaction:', error);
      return;
    }

    const newTransaction: Transaction = {
      id: data.id,
      type: data.type as 'income' | 'expense',
      amount: data.amount,
      categoryId: data.category_id || '',
      date: data.date,
      note: data.note || undefined,
      createdAt: data.created_at || new Date().toISOString(),
    };

    set((state) => ({ transactions: [newTransaction, ...state.transactions] }));
  },

  updateTransaction: async (id, updates) => {
    const supabase = createClient();

    const dbUpdates: Record<string, unknown> = {};
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.amount !== undefined) dbUpdates.amount = updates.amount;
    if (updates.categoryId !== undefined) dbUpdates.category_id = updates.categoryId;
    if (updates.date !== undefined) dbUpdates.date = updates.date;
    if (updates.note !== undefined) dbUpdates.note = updates.note;

    const { error } = await supabase
      .from('transactions')
      .update(dbUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating transaction:', error);
      return;
    }

    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  },

  deleteTransaction: async (id) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting transaction:', error);
      return;
    }

    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  addCategory: async (category) => {
    const { tenantId, userId } = get();
    if (!tenantId || !userId) return;

    const supabase = createClient();

    const { data, error } = await supabase
      .from('categories')
      .insert({
        tenant_id: tenantId,
        user_id: userId,
        name: category.name,
        type: category.type,
        icon: category.icon,
        color: category.color,
        is_default: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding category:', error);
      return;
    }

    const newCategory: Category = {
      id: data.id,
      name: data.name,
      icon: data.icon || '📦',
      color: data.color || '#6b7280',
      type: data.type as 'income' | 'expense',
      isDefault: false,
    };

    set((state) => ({ categories: [...state.categories, newCategory] }));
  },

  updateCategory: async (id, updates) => {
    const supabase = createClient();

    const dbUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.color !== undefined) dbUpdates.color = updates.color;
    if (updates.type !== undefined) dbUpdates.type = updates.type;

    const { error } = await supabase
      .from('categories')
      .update(dbUpdates)
      .eq('id', id);

    if (error) {
      console.error('Error updating category:', error);
      return;
    }

    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    }));
  },

  deleteCategory: async (id) => {
    const supabase = createClient();

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category:', error);
      return;
    }

    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    }));
  },

  setCurrency: (currency) => {
    set({ currency });
  },

  getMonthlyBalance: (year, month) => {
    const transactions = get().getTransactionsByMonth(year, month);
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, balance: income - expense };
  },

  getCategorySpending: (categoryId, year, month) => {
    const transactions = get().getTransactionsByMonth(year, month);
    return transactions
      .filter((t) => t.categoryId === categoryId && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  },

  getTransactionsByMonth: (year, month) => {
    return get().transactions.filter((t) => {
      const date = new Date(t.date);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  },
}));
