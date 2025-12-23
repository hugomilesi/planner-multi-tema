import { Link } from 'react-router-dom';
import { FinancialPageProps } from '../types';
import { TrendingUp, TrendingDown, Eye, EyeOff } from 'lucide-react';

export function SacredSerenityFinancialPage({
  monthIncome,
  monthExpense,
  balance,
  formatCurrency,
  pieData,
  categorySpending,
  recentTransactions,
  categories,
}: FinancialPageProps) {
  const today = new Date();

  return (
    <div className="relative min-h-screen flex flex-col pb-24 bg-[#050505] text-gray-200 antialiased selection:bg-[#C5A059] selection:text-black">
      {/* Header */}
      <div className="flex items-center justify-between p-6 sticky top-0 z-20 bg-[#050505]/95 backdrop-blur-md transition-colors duration-200 border-b border-white/5">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#C5A059] tracking-tight">Stewardship</h2>
          <p className="text-xs text-[#A1A1AA] italic">"Be faithful in little..."</p>
        </div>
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors text-slate-400">
          <EyeOff className="w-5 h-5" />
        </button>
      </div>

      {/* Month Filters */}
      <div className="flex gap-3 px-6 pb-2 overflow-x-auto no-scrollbar w-full flex-nowrap">
        <button className="flex-shrink-0 h-9 px-5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#9C7C33] text-black text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-[#C5A059]/20 flex items-center gap-2">
          <span className="text-base">📅</span>
          This Month
        </button>
        <button className="flex-shrink-0 h-9 px-5 rounded-full bg-[#121212] text-slate-400 text-sm font-medium border border-white/10 transition-colors hover:border-[#C5A059]/50">
          {today.toLocaleDateString('en-US', { month: 'long' })}
        </button>
        <button className="flex-shrink-0 h-9 px-5 rounded-full bg-[#121212] text-slate-400 text-sm font-medium border border-white/10 transition-colors hover:border-[#C5A059]/50">
          {today.getFullYear()}
        </button>
      </div>

      {/* Balance Section */}
      <div className="flex flex-col items-center pt-8 pb-8 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C5A059]/10 rounded-full blur-[60px] -z-10"></div>
        <p className="text-[#C5A059]/60 text-sm font-medium tracking-wide mb-2 uppercase flex items-center gap-1">
          <span className="text-[#C5A059] text-sm">💰</span>
          Treasury Balance
        </p>
        <h1 className="text-4xl md:text-[42px] font-serif font-bold tracking-tight text-white drop-shadow-sm">
          {formatCurrency(balance)}
        </h1>
        <div className="mt-2 px-3 py-1 bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-full">
          <p className="text-xs font-semibold text-[#C5A059]">Blessed to be a blessing</p>
        </div>
      </div>

      {/* Income & Expenses Cards */}
      <div className="grid grid-cols-2 gap-4 px-6 mb-8">
        <div className="bg-[#121212] p-5 rounded-2xl border border-white/5 shadow-[0_4px_25px_-4px_rgba(197,160,89,0.15)] relative overflow-hidden group">
          <div className="absolute right-[-10px] top-[-10px] opacity-[0.03] text-[#C5A059]">
            <span className="text-[80px]">🌾</span>
          </div>
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 flex items-center justify-center text-[#C5A059] mb-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-medium text-slate-400 block mb-1">Provision (In)</span>
              <p className="text-xl font-bold text-[#C5A059]">+{formatCurrency(monthIncome)}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#121212] p-5 rounded-2xl border border-white/5 shadow-[0_4px_25px_-4px_rgba(197,160,89,0.15)] relative overflow-hidden group">
          <div className="absolute right-[-10px] top-[-10px] opacity-[0.03] text-[#B08D55]">
            <span className="text-[80px]">💝</span>
          </div>
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="w-10 h-10 rounded-full bg-[#B08D55]/10 border border-[#B08D55]/20 flex items-center justify-center text-[#B08D55] mb-2">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-sm font-medium text-slate-400 block mb-1">Outflow</span>
              <p className="text-xl font-bold text-white">-{formatCurrency(monthExpense)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Stewardship Chart */}
      <div className="px-6 mb-8">
        <div className="bg-[#121212] rounded-2xl p-6 border border-white/5 shadow-[0_4px_25px_-4px_rgba(197,160,89,0.15)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-serif font-bold text-white">Monthly Stewardship</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">
                {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {today.toLocaleDateString('en-US', { month: 'short' })} 31
              </p>
            </div>
            <div className="flex items-center gap-1 bg-[#C5A059]/10 px-3 py-1.5 rounded-lg border border-[#C5A059]/20 shadow-[0_0_10px_rgba(197,160,89,0.1)]">
              <span className="text-[#C5A059] text-sm">✨</span>
              <span className="text-xs font-bold text-[#C5A059]">+12% Saved</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-40 gap-3 px-2">
            {[40, 65, 55, 80, 45, 90, 60].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                <div className="w-2.5 sm:w-4 bg-white/5 rounded-full relative h-32 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-full transition-all duration-500 ease-out ${
                      i === 5
                        ? 'bg-gradient-to-t from-[#9C7C33] to-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.3)]'
                        : 'bg-[#C5A059]/40 group-hover:bg-[#C5A059]/60'
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-[11px] font-medium text-slate-400 font-serif">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-6 mb-6">
        <h3 className="text-base font-serif font-bold text-white mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {recentTransactions.length === 0 ? (
            <div className="bg-[#121212] rounded-xl p-8 border border-white/5 text-center">
              <p className="text-slate-400 font-serif italic">No transactions yet</p>
            </div>
          ) : (
            recentTransactions.slice(0, 10).map((transaction) => {
              const category = categories.find((c) => c.id === transaction.categoryId);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center gap-3 p-4 bg-[#121212] rounded-xl border border-white/5 hover:border-[#C5A059]/50 transition-all shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-lg">
                    {category?.icon || '💰'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{category?.name || 'Unknown'}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {transaction.note && ` • ${transaction.note}`}
                    </p>
                  </div>
                  <p className={`font-bold font-serif ${
                    transaction.type === 'income' ? 'text-[#C5A059]' : 'text-white'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
