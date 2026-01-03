import { useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartData {
  day: string;
  income: number;
  expense: number;
}

interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

interface FinancialLineChartProps {
  data: LineChartData[];
  formatCurrency: (value: number) => string;
}

interface FinancialPieChartProps {
  data: PieChartData[];
  formatCurrency: (value: number) => string;
}

interface FinancialBarChartProps {
  data: LineChartData[];
  formatCurrency: (value: number) => string;
}

// Tooltip customizado
const CustomTooltip = ({ active, payload, label, formatCurrency }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Gráfico de Linha - Tendência de Receitas/Despesas
export function FinancialLineChart({ data, formatCurrency }: FinancialLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="day" 
          stroke="rgba(255,255,255,0.5)"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip content={<CustomTooltip formatCurrency={formatCurrency} />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="income" 
          stroke="#10b981" 
          strokeWidth={2}
          name="Receita"
          dot={{ fill: '#10b981', r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="expense" 
          stroke="#ef4444" 
          strokeWidth={2}
          name="Despesa"
          dot={{ fill: '#ef4444', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Gráfico de Barras - Comparação Semanal
export function FinancialBarChart({ data, formatCurrency }: FinancialBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="day" 
          stroke="rgba(255,255,255,0.5)"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="rgba(255,255,255,0.5)"
          style={{ fontSize: '12px' }}
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip content={<CustomTooltip formatCurrency={formatCurrency} />} />
        <Legend />
        <Bar dataKey="income" fill="#10b981" name="Receita" radius={[8, 8, 0, 0]} />
        <Bar dataKey="expense" fill="#ef4444" name="Despesa" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Gráfico de Pizza - Distribuição por Categoria
export function FinancialPieChart({ data, formatCurrency }: FinancialPieChartProps) {
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      color: item.color || COLORS[index % COLORS.length],
    }));
  }, [data]);

  const renderLabel = (entry: any) => {
    const percent = ((entry.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(0);
    return `${entry.name} (${percent}%)`;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number | undefined) => value ? formatCurrency(value) : ''}
          contentStyle={{ 
            backgroundColor: 'rgba(0,0,0,0.8)', 
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
