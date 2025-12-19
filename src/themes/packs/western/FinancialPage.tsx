'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function WesternFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div 
      className="min-h-screen font-[family-name:var(--font-rye)]"
      style={{
        backgroundColor: '#EFE6DD',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='%238B5A2B' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-amber-800/60 text-xs tracking-[0.2em] mb-1 font-[family-name:var(--font-courier-prime)]">
              BANCO DO OESTE
            </div>
            <h1 className="text-3xl text-amber-900">Cofre de Ouro</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 bg-amber-800 text-amber-100 rounded-full border-4 border-amber-900 flex items-center justify-center"
                style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}>
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#F4ECD8] border-4 border-amber-800 text-amber-900 max-w-[90vw]">
              <DialogHeader>
                <DialogTitle className="text-amber-900">Nova Transação</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-amber-200">
                    <TabsTrigger value="expense" className="data-[state=active]:bg-amber-800 data-[state=active]:text-amber-100">Gasto</TabsTrigger>
                    <TabsTrigger value="income" className="data-[state=active]:bg-green-700 data-[state=active]:text-white">Entrada</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2">
                  <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Valor</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-amber-50 border-2 border-amber-700" />
                </div>
                <div className="space-y-2">
                  <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Categoria</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-amber-50 border-2 border-amber-700"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent className="bg-[#F4ECD8] border-2 border-amber-700">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Data</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                      className="bg-amber-50 border-2 border-amber-700" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-amber-800 font-[family-name:var(--font-courier-prime)]">Nota</Label>
                    <Input placeholder="Opcional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })}
                      className="bg-amber-50 border-2 border-amber-700" />
                  </div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 bg-amber-800 text-amber-100 border-2 border-amber-900"
                  style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}>Registrar</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 bg-[#F4ECD8] border-2 border-amber-700" style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-700" />
              <span className="text-xs text-amber-700 font-[family-name:var(--font-courier-prime)]">Ouro Ganho</span>
            </div>
            <p className="text-xl text-green-700">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 bg-[#F4ECD8] border-2 border-amber-700" style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-700" />
              <span className="text-xs text-amber-700 font-[family-name:var(--font-courier-prime)]">Ouro Gasto</span>
            </div>
            <p className="text-xl text-red-700">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-6 p-4 bg-[#F4ECD8] border-2 border-amber-800 relative transform rotate-[-0.5deg]" style={{ boxShadow: '4px 4px 0 rgba(139,69,19,0.3)' }}>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-700 border-2 border-amber-900" />
          <div className="text-center">
            <span className="text-xs text-amber-700 font-[family-name:var(--font-courier-prime)]">SALDO DO COFRE</span>
            <p className={cn('text-3xl mt-1', balance >= 0 ? 'text-amber-900' : 'text-red-700')}>{formatCurrency(balance)}</p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6 p-4 bg-[#F4ECD8] border-2 border-amber-700" style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}>
          <h3 className="text-sm text-amber-800 mb-4 font-[family-name:var(--font-courier-prime)]">Últimos 7 Dias</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-green-600 border border-green-800 -skew-x-3" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-red-600 border border-red-800 -skew-x-3" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-amber-700">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#F4ECD8] border-2 border-amber-800" style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}>
          <div className="p-3 border-b-2 border-amber-800 bg-amber-100">
            <span className="text-sm text-amber-900">Transações Recentes</span>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (
              <p className="text-center text-amber-600/70 py-8 text-sm font-[family-name:var(--font-courier-prime)]">Nenhuma transação</p>
            ) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-amber-200">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat?.icon || '💰'}</span>
                      <div>
                        <p className="text-sm text-amber-900 font-[family-name:var(--font-courier-prime)]">{cat?.name || 'Desconhecido'}</p>
                        <p className="text-[10px] text-amber-600">{t.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-bold', t.type === 'income' ? 'text-green-700' : 'text-red-700')}>
                        {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                      </span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-amber-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
