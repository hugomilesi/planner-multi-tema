import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Flower2, Leaf, Droplets, Scissors, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Floral Theme Implementation
export function KawaiiFinancialPage({
  monthIncome,
  monthExpense,
  balance,
  formatCurrency,
  categorySpending,
  recentTransactions,
  categories,
  isDialogOpen,
  setIsDialogOpen,
  transactionType,
  setTransactionType,
  newTransaction,
  setNewTransaction,
  handleAddTransaction,
  deleteTransaction,
}: FinancialPageProps) {
  const today = new Date();

  return (
    <div className="min-h-screen pb-24 relative overflow-x-hidden" style={{ 
      backgroundColor: '#2d1f24',
      fontFamily: '"DM Sans", sans-serif'
    }}>

      {/* Floral pattern overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23d47a96\" fill-opacity=\"1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

      <div className="relative z-10 p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-[#d47a96] mb-1">
              <Flower2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">My Garden</span>
            </div>
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              <span className="text-[#d47a96]">Floral</span>Finance
            </h1>
          </div>
          <div className="w-12 h-12 bg-[#3d2a32] rounded-full flex items-center justify-center border border-rose-900/30">
            <Leaf className="w-6 h-6 text-[#a3c9a8]" />
          </div>
        </div>

        {/* Period Tabs */}
        <div className="flex p-1 bg-[#3d2a32] rounded-full border border-rose-900/30">
          <button className="flex-1 py-2.5 px-4 rounded-full text-sm font-bold bg-[#d47a96] text-white shadow-lg shadow-[#d47a96]/20">
            This Season
          </button>
          <button className="flex-1 py-2.5 px-4 rounded-full text-sm font-medium text-[#9e7f8a] hover:text-white transition-colors">
            {today.toLocaleDateString('en-US', { month: 'long' })}
          </button>
          <button className="flex-1 py-2.5 px-4 rounded-full text-sm font-medium text-[#9e7f8a] hover:text-white transition-colors">
            {new Date(today.setMonth(today.getMonth() + 1)).toLocaleDateString('en-US', { month: 'long' })}
          </button>
        </div>

        {/* Total Nectar (Balance) */}
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#d47a96] text-xs font-bold uppercase tracking-widest">• Total Nectar •</span>
            <span className="text-lg">🐝</span>
          </div>
          <h2 className={cn(
            "text-5xl font-bold",
            balance >= 0 ? "text-white" : "text-red-400"
          )} style={{ fontFamily: '"Playfair Display", serif' }}>
            {formatCurrency(balance)}
          </h2>
        </div>

        {/* Income/Expense Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-[1.5rem] bg-gradient-to-br from-[#a3c9a8]/20 to-[#3d2a32] border border-[#a3c9a8]/30 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Leaf className="w-5 h-5 text-[#a3c9a8]/30" />
            </div>
            <span className="text-[10px] text-[#a3c9a8] font-bold uppercase tracking-wider flex items-center gap-1">
              <ArrowDownLeft className="w-3 h-3" /> Income
            </span>
            <p className="text-2xl font-bold text-[#a3c9a8] mt-1" style={{ fontFamily: '"Playfair Display", serif' }}>
              +{formatCurrency(monthIncome)}
            </p>
            <span className="text-[10px] text-[#9e7f8a] uppercase tracking-wider">Harvested</span>
          </div>
          <div className="p-4 rounded-[1.5rem] bg-gradient-to-br from-[#d47a96]/20 to-[#3d2a32] border border-[#d47a96]/30 relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <Scissors className="w-5 h-5 text-[#d47a96]/30" />
            </div>
            <span className="text-[10px] text-[#d47a96] font-bold uppercase tracking-wider flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> Expenses
            </span>
            <p className="text-2xl font-bold text-[#d47a96] mt-1" style={{ fontFamily: '"Playfair Display", serif' }}>
              -{formatCurrency(monthExpense)}
            </p>
            <span className="text-[10px] text-[#9e7f8a] uppercase tracking-wider">Pruned</span>
          </div>
        </div>

        {/* Growth Garden (Chart) */}
        <div className="p-6 rounded-[2rem] bg-[#3d2a32] border border-rose-900/30 shadow-[0_4px_20px_-2px_rgba(212,122,150,0.15)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-[#d47a96]" />
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                Growth Garden
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[#a3c9a8] text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+12%</span>
            </div>
          </div>
          <p className="text-xs text-[#9e7f8a] mb-4">Oct 1 - Oct 31</p>

          {/* Flower Chart */}
          <div className="flex items-end justify-around h-32 px-4">
            {[40, 55, 70, 85].map((height, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                {i === 2 && (
                  <div className="bg-[#2d1f24] text-white text-[10px] px-2 py-1 rounded-lg mb-1 font-bold">
                    $2.3k
                  </div>
                )}
                <div className="relative">
                  {/* Flower stem */}
                  <div 
                    className="w-8 rounded-t-full bg-gradient-to-t from-[#d47a96] to-[#b85c78]"
                    style={{ height: `${height}px` }}
                  />
                  {/* Leaves */}
                  <div className="absolute -left-2 bottom-4 w-3 h-3 bg-[#a3c9a8] rounded-full transform -rotate-45" />
                  <div className="absolute -right-2 bottom-8 w-3 h-3 bg-[#a3c9a8] rounded-full transform rotate-45" />
                </div>
                <span className="text-[10px] text-[#9e7f8a] mt-2 font-medium">Week {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Garden Pots (Categories) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              Garden Pots
            </h3>
            <button className="text-[#d47a96] text-xs font-bold flex items-center gap-1">
              Prune <Scissors className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {categorySpending.length === 0 ? (
              <div className="p-6 text-center text-[#9e7f8a] bg-[#3d2a32]/50 rounded-2xl border-2 border-dashed border-rose-900/30">
                <span className="text-2xl">🌱</span>
                <p className="mt-2 font-medium">No expenses yet! Garden is thriving!</p>
              </div>
            ) : (
              categorySpending.slice(0, 3).map((cat) => (
                <div key={cat.id} className="p-4 rounded-2xl bg-[#3d2a32] border border-rose-900/30 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#d47a96]/10 flex items-center justify-center text-xl">
                    {cat.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm">{cat.name}</span>
                      <span className="text-xs text-[#9e7f8a]">
                        {formatCurrency(cat.spent)} / {formatCurrency(cat.budget || 500)}
                      </span>
                    </div>
                    <div className="h-2 bg-[#2d1f24] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-[#a3c9a8] to-[#d47a96]"
                        style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Petals (Transactions) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
              Recent Petals
            </h3>
            <button className="text-[#d47a96] text-xs font-bold">View All</button>
          </div>

          <div className="space-y-3">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-[#9e7f8a] py-4 font-medium">No petals fallen yet 🌸</p>
            ) : (
              recentTransactions.slice(0, 5).map((t) => {
                const category = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-[#3d2a32]/50 border border-rose-900/20 group hover:border-[#d47a96]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-lg",
                        t.type === 'income' ? "bg-[#a3c9a8]/10" : "bg-[#d47a96]/10"
                      )}>
                        {category?.icon || (t.type === 'income' ? '🌻' : '🥀')}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{category?.name || t.note || 'Uncategorized'}</p>
                        <p className="text-[10px] text-[#9e7f8a]">
                          {new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "font-bold text-sm",
                        t.type === 'income' ? "text-[#a3c9a8]" : "text-[#d47a96]"
                      )}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="text-[#9e7f8a]/50 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Add Transaction FAB */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-[#d47a96] hover:bg-[#b85c78] text-white shadow-xl shadow-[#d47a96]/40 z-50">
              <Plus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[#3d2a32] border border-rose-900/30 rounded-[2rem] p-6" style={{ fontFamily: '"DM Sans", sans-serif' }}>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white text-center" style={{ fontFamily: '"Playfair Display", serif' }}>
                New Petal 🌸
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex p-1 bg-[#2d1f24] rounded-xl">
                <button
                  type="button"
                  onClick={() => setTransactionType('income')}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-bold transition-all",
                    transactionType === 'income' ? "bg-[#a3c9a8] text-[#2d1f24] shadow-sm" : "text-[#9e7f8a] hover:text-[#a3c9a8]"
                  )}
                >
                  🌻 Harvest
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType('expense')}
                  className={cn(
                    "flex-1 py-3 rounded-lg text-sm font-bold transition-all",
                    transactionType === 'expense' ? "bg-[#d47a96] text-white shadow-sm" : "text-[#9e7f8a] hover:text-[#d47a96]"
                  )}
                >
                  🥀 Prune
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9e7f8a] ml-1">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9e7f8a] font-bold">R$</span>
                  <Input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="pl-10 h-14 bg-[#2d1f24] border-rose-900/30 rounded-xl text-lg font-bold text-white focus:ring-2 focus:ring-[#d47a96] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9e7f8a] ml-1">Category</label>
                <Select
                  value={newTransaction.categoryId}
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, categoryId: value })}
                >
                  <SelectTrigger className="h-14 bg-[#2d1f24] border-rose-900/30 rounded-xl font-bold text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl bg-[#3d2a32] border-rose-900/30">
                    {categories
                      .filter(c => c.type === transactionType)
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id} className="rounded-lg my-1 font-bold text-white hover:bg-[#d47a96]/10">
                          <span className="flex items-center gap-2">
                            <span>{category.icon}</span> {category.name}
                          </span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9e7f8a] ml-1">Date</label>
                <Input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="h-14 bg-[#2d1f24] border-rose-900/30 rounded-xl font-bold text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-[#9e7f8a] ml-1">Note (Optional)</label>
                <Input
                  value={newTransaction.note || ''}
                  onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                  placeholder="What bloomed?"
                  className="h-14 bg-[#2d1f24] border-rose-900/30 rounded-xl font-bold text-white placeholder:text-[#9e7f8a]/50"
                />
              </div>

              <Button onClick={handleAddTransaction} className="w-full h-14 bg-[#d47a96] hover:bg-[#b85c78] text-white rounded-xl text-lg font-bold mt-4">
                Plant Petal 🌺
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
