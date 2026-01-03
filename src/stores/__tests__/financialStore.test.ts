import { describe, it, expect, beforeEach } from 'vitest';
import { useFinancialStore } from '../financialStore';

describe('FinancialStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useFinancialStore.setState({
      transactions: [],
      categories: [],
      currency: 'BRL',
    });
  });

  describe('getBalanceByPeriod', () => {
    it('should calculate balance correctly for a given period', () => {
      const store = useFinancialStore.getState();
      
      // Add test transactions
      store.transactions = [
        {
          id: '1',
          type: 'income',
          amount: 1000,
          categoryId: 'cat1',
          date: '2024-01-15',
          createdAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          type: 'expense',
          amount: 500,
          categoryId: 'cat2',
          date: '2024-01-20',
          createdAt: '2024-01-20T10:00:00Z',
        },
        {
          id: '3',
          type: 'expense',
          amount: 200,
          categoryId: 'cat2',
          date: '2024-02-05',
          createdAt: '2024-02-05T10:00:00Z',
        },
      ];

      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      
      const result = store.getBalanceByPeriod(startDate, endDate);
      
      expect(result.income).toBe(1000);
      expect(result.expense).toBe(500);
      expect(result.balance).toBe(500);
      expect(result.transactions).toHaveLength(2);
    });

    it('should return zero values for period with no transactions', () => {
      const store = useFinancialStore.getState();
      
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');
      
      const result = store.getBalanceByPeriod(startDate, endDate);
      
      expect(result.income).toBe(0);
      expect(result.expense).toBe(0);
      expect(result.balance).toBe(0);
      expect(result.transactions).toHaveLength(0);
    });
  });

  describe('getMonthlyBalance', () => {
    it('should calculate monthly balance correctly', () => {
      const store = useFinancialStore.getState();
      
      store.transactions = [
        {
          id: '1',
          type: 'income',
          amount: 2000,
          categoryId: 'cat1',
          date: '2024-01-15',
          createdAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          type: 'expense',
          amount: 800,
          categoryId: 'cat2',
          date: '2024-01-20',
          createdAt: '2024-01-20T10:00:00Z',
        },
      ];

      const result = store.getMonthlyBalance(2024, 0); // January (0-indexed)
      
      expect(result.income).toBe(2000);
      expect(result.expense).toBe(800);
      expect(result.balance).toBe(1200);
    });
  });

  describe('getCategorySpending', () => {
    it('should calculate spending for a specific category', () => {
      const store = useFinancialStore.getState();
      
      store.transactions = [
        {
          id: '1',
          type: 'expense',
          amount: 300,
          categoryId: 'food',
          date: '2024-01-15',
          createdAt: '2024-01-15T10:00:00Z',
        },
        {
          id: '2',
          type: 'expense',
          amount: 200,
          categoryId: 'food',
          date: '2024-01-20',
          createdAt: '2024-01-20T10:00:00Z',
        },
        {
          id: '3',
          type: 'expense',
          amount: 100,
          categoryId: 'transport',
          date: '2024-01-25',
          createdAt: '2024-01-25T10:00:00Z',
        },
      ];

      const spending = store.getCategorySpending('food', 2024, 0);
      
      expect(spending).toBe(500);
    });
  });
});
