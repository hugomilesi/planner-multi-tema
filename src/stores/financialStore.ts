import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
}

interface FinancialStore {
  transactions: Transaction[];
  categories: Category[];
  currency: string;
  
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  setCurrency: (currency: string) => void;
  
  getMonthlyBalance: (year: number, month: number) => { income: number; expense: number; balance: number };
  getCategorySpending: (categoryId: string, year: number, month: number) => number;
  getTransactionsByMonth: (year: number, month: number) => Transaction[];
}

const defaultCategories: Category[] = [
  { id: 'salary', name: 'Salary', icon: '💰', color: '#22c55e', type: 'income' },
  { id: 'freelance', name: 'Freelance', icon: '💼', color: '#3b82f6', type: 'income' },
  { id: 'investments', name: 'Investments', icon: '📈', color: '#8b5cf6', type: 'income' },
  { id: 'food', name: 'Food', icon: '🍔', color: '#f97316', type: 'expense', budget: 500 },
  { id: 'transport', name: 'Transport', icon: '🚗', color: '#06b6d4', type: 'expense', budget: 200 },
  { id: 'entertainment', name: 'Entertainment', icon: '🎮', color: '#ec4899', type: 'expense', budget: 150 },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: '#f59e0b', type: 'expense', budget: 300 },
  { id: 'bills', name: 'Bills', icon: '📄', color: '#64748b', type: 'expense', budget: 400 },
  { id: 'health', name: 'Health', icon: '🏥', color: '#ef4444', type: 'expense', budget: 100 },
];

const today = new Date();
const getDateStr = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

const sampleTransactions: Transaction[] = [
  { id: '1', type: 'income', amount: 5000, categoryId: 'salary', date: getDateStr(0), createdAt: new Date().toISOString() },
  { id: '2', type: 'expense', amount: 150, categoryId: 'food', date: getDateStr(0), note: 'Groceries', createdAt: new Date().toISOString() },
  { id: '3', type: 'expense', amount: 50, categoryId: 'transport', date: getDateStr(1), note: 'Uber', createdAt: new Date().toISOString() },
  { id: '4', type: 'expense', amount: 80, categoryId: 'entertainment', date: getDateStr(2), note: 'Cinema', createdAt: new Date().toISOString() },
  { id: '5', type: 'expense', amount: 200, categoryId: 'shopping', date: getDateStr(3), note: 'Clothes', createdAt: new Date().toISOString() },
  { id: '6', type: 'expense', amount: 120, categoryId: 'food', date: getDateStr(4), note: 'Restaurant', createdAt: new Date().toISOString() },
  { id: '7', type: 'expense', amount: 350, categoryId: 'bills', date: getDateStr(5), note: 'Electricity', createdAt: new Date().toISOString() },
  { id: '8', type: 'income', amount: 800, categoryId: 'freelance', date: getDateStr(6), note: 'Project', createdAt: new Date().toISOString() },
];

export const useFinancialStore = create<FinancialStore>()(
  persist(
    (set, get) => ({
      transactions: sampleTransactions,
      categories: defaultCategories,
      currency: 'BRL',

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ transactions: [...state.transactions, newTransaction] }));
      },

      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      addCategory: (category) => {
        const newCategory: Category = {
          ...category,
          id: crypto.randomUUID(),
        };
        set((state) => ({ categories: [...state.categories, newCategory] }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      deleteCategory: (id) => {
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
    }),
    {
      name: 'planner-financial',
      onRehydrateStorage: () => (state) => {
        if (state && state.transactions.length === 0) {
          state.transactions = sampleTransactions;
        }
      },
    }
  )
);
