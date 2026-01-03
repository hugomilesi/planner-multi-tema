import { ChartViewType } from '@/hooks/useFinancialChartData';

interface ChartViewFilterProps {
    chartView: ChartViewType;
    setChartView: (view: ChartViewType) => void;
    className?: string;
    activeClassName?: string;
    inactiveClassName?: string;
}

export function ChartViewFilter({
    chartView,
    setChartView,
    className = '',
    activeClassName = 'bg-primary text-primary-foreground',
    inactiveClassName = 'bg-background hover:bg-accent'
}: ChartViewFilterProps) {
    const baseButtonClass = "px-3 py-1.5 text-xs font-semibold uppercase transition-colors rounded-sm";

    return (
        <div className={`flex gap-2 ${className}`}>
            <button
                onClick={() => setChartView('weekly')}
                className={`${baseButtonClass} ${chartView === 'weekly' ? activeClassName : inactiveClassName}`}
            >
                Semana
            </button>
            <button
                onClick={() => setChartView('monthly')}
                className={`${baseButtonClass} ${chartView === 'monthly' ? activeClassName : inactiveClassName}`}
            >
                Mês
            </button>
            <button
                onClick={() => setChartView('yearly')}
                className={`${baseButtonClass} ${chartView === 'yearly' ? activeClassName : inactiveClassName}`}
            >
                Ano
            </button>
        </div>
    );
}
