'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, Trash2, Plus, EyeOff, ShoppingBag, Compass } from 'lucide-react';
import { PeriodFilter } from '@/components/financial/PeriodFilter';
import { ExportButtons } from '@/components/financial/ExportButtons';
import { WesternBarChart } from '@/components/charts/WesternBarChart';

export function WesternFinancialPage({
    monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
    categorySpending, recentTransactions, filteredTransactions, categories,
    isDialogOpen, setIsDialogOpen, deleteTransaction,
    selectedPeriod, setSelectedPeriod,
    chartData, chartView, setChartView,
}: FinancialPageProps) {
    const expenseCategories = categories.filter(c => c.type === 'expense');
    const incomeCategories = categories.filter(c => c.type === 'income');
    const today = new Date();
    const topCategories = categorySpending.slice(0, 2);

    return (
        <div className="min-h-screen font-courier-prime text-[#2c1810]"
            style={{ backgroundColor: '#5c4033' }}>

            <div className="relative min-h-screen flex flex-col pb-24 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto w-full shadow-2xl overflow-hidden border-x-8 border-[#5c4033]"
                style={{ backgroundColor: '#f3e5ab' }}>

                {/* Paper nail decorations */}
                <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-neutral-800 shadow-inner z-50 border border-black opacity-60" />
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-neutral-800 shadow-inner z-50 border border-black opacity-60" />

                {/* Header */}
                <div className="flex items-center justify-between p-4 pt-8 sticky top-0 z-20 bg-[#f3e5ab]/95 backdrop-blur-sm border-b-2 border-[#2c1810] border-dashed">
                    <h2 className="text-2xl font-rye text-[#2c1810] tracking-wide">Financial Overview</h2>
                    <div className="flex items-center gap-2">
                        {selectedPeriod && filteredTransactions && (
                            <ExportButtons
                                transactions={filteredTransactions}
                                period={selectedPeriod}
                                categories={categories}
                                categorySpending={categorySpending}
                                summary={{ income: monthIncome, expense: monthExpense, balance }}
                            />
                        )}
                        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#d4af37]/20 transition-colors text-[#2c1810]">
                            <EyeOff className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Period Filter */}
                {selectedPeriod && setSelectedPeriod && (
                    <div className="px-4 py-4 bg-[#5c4033]/10 border-b-2 border-[#2c1810] border-dashed">
                        <PeriodFilter
                            value={selectedPeriod}
                            onChange={setSelectedPeriod}
                            className="w-full"
                        />
                    </div>
                )}

                {/* Balance Display */}
                <div className="flex flex-col items-center pt-6 pb-4 px-4">
                    <div className="relative border-4 border-double border-[#2c1810] p-4 rounded-lg bg-[#fffdf0] rotate-1 max-w-[90%]"
                        style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.2), inset 0 0 30px rgba(160,140,100,0.1)' }}>
                        {/* Corner decorations */}
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-[#2c1810]" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-[#2c1810]" />
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-[#2c1810]" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-[#2c1810]" />
                        <p className="text-[#2c1810]/70 text-xs font-bold tracking-widest mb-2 text-center font-rye uppercase border-b border-[#2c1810] pb-1">
                            Total Balance
                        </p>
                        <h1 className="text-3xl font-bold tracking-tight text-[#2c1810] font-rye flex items-center gap-1 justify-center">
                            <span className="text-2xl opacity-80">$</span><span className="truncate">{formatCurrency(balance).replace(/[^\d.,]/g, '')}</span>
                        </h1>
                    </div>
                </div>

                {/* Income/Expense Cards */}
                <div className="grid grid-cols-2 gap-3 px-4 mb-6">
                    <div className="bg-[#fffdf0] p-3 rounded-sm border-2 border-[#2c1810] relative overflow-hidden group"
                        style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.2), inset 0 0 30px rgba(160,140,100,0.1)' }}>
                        <div className="absolute right-0 top-0 w-12 h-12 bg-gradient-to-br from-[#2e4a2e]/20 to-transparent rounded-bl-3xl" />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full border-2 border-[#2e4a2e] flex items-center justify-center text-[#2e4a2e] bg-[#2e4a2e]/10 shrink-0">
                                <Plus className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-[#2c1810] uppercase font-rye">Income</span>
                        </div>
                        <p className="text-lg font-bold text-[#2e4a2e] border-b-2 border-[#2e4a2e] inline-block truncate max-w-full">
                            +{formatCurrency(monthIncome)}
                        </p>
                    </div>
                    <div className="bg-[#fffdf0] p-3 rounded-sm border-2 border-[#2c1810] relative overflow-hidden group"
                        style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.2), inset 0 0 30px rgba(160,140,100,0.1)' }}>
                        <div className="absolute right-0 top-0 w-12 h-12 bg-gradient-to-br from-[#8b0000]/20 to-transparent rounded-bl-3xl" />
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-7 h-7 rounded-full border-2 border-[#8b0000] flex items-center justify-center text-[#8b0000] bg-[#8b0000]/10 shrink-0">
                                <span className="text-base font-bold">-</span>
                            </div>
                            <span className="text-xs font-bold text-[#2c1810] uppercase font-rye">Expenses</span>
                        </div>
                        <p className="text-lg font-bold text-[#8b0000] border-b-2 border-[#8b0000] inline-block truncate max-w-full">
                            -{formatCurrency(monthExpense)}
                        </p>
                    </div>
                </div>

                {/* Western Bar Chart - Spending Trail */}
                <div className="px-4 mb-8">
                    <div className="bg-[#fffdf0] rounded-sm p-5 border-2 border-[#2c1810] relative"
                        style={{ boxShadow: '2px 2px 5px rgba(0,0,0,0.2), inset 0 0 30px rgba(160,140,100,0.1)' }}>
                        {/* Corner nail decoration */}
                        <div className="absolute -top-2 -right-2 bg-neutral-400 w-4 h-4 rounded-full shadow border border-black z-10" />

                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base font-bold text-[#2c1810] font-rye uppercase tracking-wider">
                                    Spending Trail
                                </h3>
                                <p className="text-xs text-[#2c1810]/60 mt-1">
                                    {chartView === 'weekly' ? 'Week 1 - Week 4' :
                                        chartView === 'monthly' ? 'Last 12 Months' :
                                            'Last 4 Years'}
                                </p>
                            </div>
                        </div>

                        {/* Filtros de visualização */}
                        <div className="flex gap-2 mb-4 border-b border-[#2c1810]/20 pb-3">
                            <button
                                onClick={() => setChartView('weekly')}
                                className={cn(
                                    "px-3 py-1 text-xs font-bold font-rye uppercase border-2 border-[#2c1810] transition-colors",
                                    chartView === 'weekly'
                                        ? 'bg-[#2c1810] text-[#f3e5ab]'
                                        : 'bg-[#fffdf0] text-[#2c1810] hover:bg-[#2c1810]/10'
                                )}
                            >
                                Semana
                            </button>
                            <button
                                onClick={() => setChartView('monthly')}
                                className={cn(
                                    "px-3 py-1 text-xs font-bold font-rye uppercase border-2 border-[#2c1810] transition-colors",
                                    chartView === 'monthly'
                                        ? 'bg-[#2c1810] text-[#f3e5ab]'
                                        : 'bg-[#fffdf0] text-[#2c1810] hover:bg-[#2c1810]/10'
                                )}
                            >
                                Mês
                            </button>
                            <button
                                onClick={() => setChartView('yearly')}
                                className={cn(
                                    "px-3 py-1 text-xs font-bold font-rye uppercase border-2 border-[#2c1810] transition-colors",
                                    chartView === 'yearly'
                                        ? 'bg-[#2c1810] text-[#f3e5ab]'
                                        : 'bg-[#fffdf0] text-[#2c1810] hover:bg-[#2c1810]/10'
                                )}
                            >
                                Ano
                            </button>
                        </div>

                        {/* Bar Chart */}
                        <div className="w-full">
                            <WesternBarChart
                                data={chartData}
                                formatCurrency={formatCurrency}
                            />
                        </div>
                    </div>
                </div>

                {/* Monthly Rations */}
                <div className="px-4 mb-8">
                    <div className="flex items-center justify-between mb-4 border-b border-[#2c1810] pb-2 border-dashed">
                        <h3 className="text-lg font-bold text-[#2c1810] font-rye uppercase">Expenses by Category</h3>
                        <button className="text-[#2c1810] text-sm font-bold uppercase hover:text-[#d4af37] transition-colors font-rye">
                            Modify
                        </button>
                    </div>
                    <div className="space-y-4">
                        {topCategories.map((cat, i) => {
                            const icons = [ShoppingBag, Compass];
                            const Icon = icons[i % icons.length];
                            const percentage = cat.percentage || 0;

                            return (
                                <div key={cat.name} className="bg-[#fffdf0]/50 p-4 border-b border-[#2c1810]/30 relative">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-[#5c4033] bg-[#5c4033] text-[#f3e5ab] flex items-center justify-center shadow-sm">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#2c1810] font-rye uppercase tracking-wide">{cat.name}</p>
                                                <p className="text-xs text-[#2c1810]/70">${(cat.budget || 500) - cat.spent} left in sack</p>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-[#2c1810]">${cat.spent} / ${cat.budget || 500}</p>
                                    </div>
                                    <div className="w-full h-3 border-2 border-[#2c1810] bg-transparent rounded-full overflow-hidden p-[1px]">
                                        <div className="h-full bg-[#5c4033] rounded-full" style={{ width: `${percentage}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recent Dealings */}
                <div className="px-4 flex-1 border-t-4 border-double border-[#2c1810] pt-6"
                    style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/lined-paper-2.png')" }}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-[#2c1810] font-rye uppercase">Recent Transactions</h3>
                        <button className="text-[#2c1810] text-sm font-bold hover:underline font-rye uppercase">See All</button>
                    </div>
                    <div className="space-y-1">
                        {recentTransactions.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-[#2c1810]/60 italic">No dealings recorded yet</p>
                            </div>
                        ) : (
                            recentTransactions.slice(0, 4).map((t) => {
                                const cat = categories.find(c => c.id === t.categoryId);
                                const isIncome = t.type === 'income';

                                return (
                                    <div key={t.id}
                                        className="flex items-center justify-between p-3 border-b border-[#2c1810]/20 hover:bg-[#5c4033]/5 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#d4af37] flex items-center justify-center text-[#2c1810] border-2 border-yellow-600 shadow-sm relative group-hover:scale-110 transition-transform">
                                                <div className="absolute top-1 right-2 w-2 h-2 bg-white rounded-full opacity-50" />
                                                <span className="text-lg">{cat?.icon || '💰'}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm font-bold text-[#2c1810] font-rye">{cat?.name || 'Unknown'}</p>
                                                <p className="text-xs text-[#2c1810]/60">
                                                    {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className={cn('text-sm font-bold', isIncome ? 'text-[#2e4a2e]' : 'text-[#8b0000]')}>
                                                {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                                            </p>
                                            <button onClick={() => deleteTransaction(t.id)}
                                                className="p-1 text-[#2c1810]/50 hover:text-[#8b0000] opacity-0 group-hover:opacity-100 transition-all">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* FAB */}
                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="fixed bottom-24 right-6 w-16 h-16 bg-[#2c1810] text-[#d4af37] rounded-full border-2 border-[#d4af37] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 z-30 group overflow-hidden"
                    style={{ boxShadow: '0 4px 0 #000' }}>
                    <Plus className="w-8 h-8 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>
        </div>
    );
}
