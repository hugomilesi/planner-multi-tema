import { useMemo } from 'react';
import type { Transaction } from '@/stores/financialStore';

export function useFinancialStats(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
) {
  return useMemo(() => {
    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    return {
      income,
      expense,
      balance,
      transactions: filteredTransactions,
    };
  }, [transactions, startDate, endDate]);
}

export function useCategorySpending(
  transactions: Transaction[],
  categories: Array<{ id: string; name: string; icon: string; type: 'income' | 'expense'; budget?: number; color?: string }>,
  startDate: Date,
  endDate: Date
) {
  return useMemo(() => {
    const filteredTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= startDate && transactionDate <= endDate;
    });

    return categories
      .filter(c => c.type === 'expense')
      .map(cat => {
        const spent = filteredTransactions
          .filter(t => t.type === 'expense' && t.categoryId === cat.id)
          .reduce((sum, t) => sum + t.amount, 0);

        const budget = cat.budget || 500;
        const percentage = budget > 0 ? (spent / budget) * 100 : 0;

        return {
          id: cat.id,
          name: cat.name,
          icon: cat.icon,
          spent,
          budget,
          percentage,
          color: cat.color,
        };
      })
      .filter(c => c.spent > 0)
      .sort((a, b) => b.spent - a.spent);
  }, [transactions, categories, startDate, endDate]);
}

export function useLast7DaysData(
  transactions: Transaction[],
  startDate: Date,
  endDate: Date
) {
  return useMemo(() => {
    const days: { day: string; income: number; expense: number }[] = [];
    const dayCount = Math.min(7, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

    for (let i = 0; i < dayCount; i++) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - (dayCount - 1 - i));
      const dayStr = date.toDateString();

      const dayTransactions = transactions.filter(t => 
        new Date(t.date).toDateString() === dayStr
      );

      const income = dayTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expense = dayTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        income,
        expense,
      });
    }

    return days;
  }, [transactions, startDate, endDate]);
}
