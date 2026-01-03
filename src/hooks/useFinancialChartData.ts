import { useState, useMemo } from 'react';
import { Transaction } from '@/stores/financialStore';

export type ChartViewType = 'weekly' | 'monthly' | 'yearly';

export interface ChartDataPoint {
    week: string;
    amount: number;
    pattern?: 'solid' | 'striped';
}

export function useFinancialChartData(filteredTransactions: Transaction[]) {
    const [chartView, setChartView] = useState<ChartViewType>('weekly');
    const today = new Date();

    // Processar transações para gerar dados semanais
    const weeklyData = useMemo(() => {
        if (!filteredTransactions || filteredTransactions.length === 0) {
            return [
                { week: 'W1', amount: 0, pattern: 'solid' as const },
                { week: 'W2', amount: 0, pattern: 'solid' as const },
                { week: 'W3', amount: 0, pattern: 'solid' as const },
                { week: 'W4', amount: 0, pattern: 'solid' as const },
            ];
        }

        const weeklyExpenses = [0, 0, 0, 0];

        filteredTransactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                const date = new Date(transaction.date);
                const dayOfMonth = date.getDate();

                let weekIndex = 0;
                if (dayOfMonth <= 7) weekIndex = 0;
                else if (dayOfMonth <= 14) weekIndex = 1;
                else if (dayOfMonth <= 21) weekIndex = 2;
                else weekIndex = 3;

                weeklyExpenses[weekIndex] += transaction.amount;
            }
        });

        const maxExpenseIndex = weeklyExpenses.indexOf(Math.max(...weeklyExpenses));

        return [
            { week: 'W1', amount: weeklyExpenses[0], pattern: maxExpenseIndex === 0 ? 'striped' as const : 'solid' as const },
            { week: 'W2', amount: weeklyExpenses[1], pattern: maxExpenseIndex === 1 ? 'striped' as const : 'solid' as const },
            { week: 'W3', amount: weeklyExpenses[2], pattern: maxExpenseIndex === 2 ? 'striped' as const : 'solid' as const },
            { week: 'W4', amount: weeklyExpenses[3], pattern: maxExpenseIndex === 3 ? 'striped' as const : 'solid' as const },
        ];
    }, [filteredTransactions]);

    // Processar transações para gerar dados mensais (últimos 12 meses)
    const monthlyData = useMemo(() => {
        if (!filteredTransactions || filteredTransactions.length === 0) {
            return Array.from({ length: 12 }, (_, i) => ({
                week: new Date(today.getFullYear(), today.getMonth() - (11 - i), 1).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase(),
                amount: 0,
                pattern: 'solid' as const
            }));
        }

        const monthlyExpenses = new Array(12).fill(0);
        const monthNames: string[] = [];

        for (let i = 11; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            monthNames.push(date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase());
        }

        filteredTransactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                const date = new Date(transaction.date);
                const monthsDiff = (today.getFullYear() - date.getFullYear()) * 12 + (today.getMonth() - date.getMonth());

                if (monthsDiff >= 0 && monthsDiff < 12) {
                    monthlyExpenses[11 - monthsDiff] += transaction.amount;
                }
            }
        });

        const maxExpenseIndex = monthlyExpenses.indexOf(Math.max(...monthlyExpenses));

        return monthlyExpenses.map((amount, index) => ({
            week: monthNames[index],
            amount,
            pattern: index === maxExpenseIndex ? 'striped' as const : 'solid' as const
        }));
    }, [filteredTransactions, today]);

    // Processar transações para gerar dados anuais (últimos 4 anos)
    const yearlyData = useMemo(() => {
        if (!filteredTransactions || filteredTransactions.length === 0) {
            return Array.from({ length: 4 }, (_, i) => ({
                week: (today.getFullYear() - (3 - i)).toString(),
                amount: 0,
                pattern: 'solid' as const
            }));
        }

        const yearlyExpenses = new Array(4).fill(0);
        const years: number[] = [];

        for (let i = 3; i >= 0; i--) {
            years.push(today.getFullYear() - i);
        }

        filteredTransactions.forEach(transaction => {
            if (transaction.type === 'expense') {
                const date = new Date(transaction.date);
                const yearsDiff = today.getFullYear() - date.getFullYear();

                if (yearsDiff >= 0 && yearsDiff < 4) {
                    yearlyExpenses[3 - yearsDiff] += transaction.amount;
                }
            }
        });

        const maxExpenseIndex = yearlyExpenses.indexOf(Math.max(...yearlyExpenses));

        return yearlyExpenses.map((amount, index) => ({
            week: years[index].toString(),
            amount,
            pattern: index === maxExpenseIndex ? 'striped' as const : 'solid' as const
        }));
    }, [filteredTransactions, today]);

    // Selecionar dados baseado no tipo de visualização
    const chartData = chartView === 'weekly' ? weeklyData :
        chartView === 'monthly' ? monthlyData :
            yearlyData;

    return {
        chartView,
        setChartView,
        chartData,
        weeklyData,
        monthlyData,
        yearlyData,
    };
}
