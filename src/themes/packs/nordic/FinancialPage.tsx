'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Mountain, Snowflake } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NordicFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-xs tracking-widest mb-1"><Snowflake className="w-3 h-3" /><span>FINANÇAS</span></div>
            <h1 className="text-2xl font-semibold text-slate-800">Controle Financeiro</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-blue-600">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white border border-slate-200 text-slate-800 max-w-[90vw] rounded-2xl">
              <DialogHeader><DialogTitle className="text-slate-800 flex items-center gap-2"><Mountain className="w-5 h-5 text-blue-500" />Nova Transação</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-slate-100 rounded-xl">
                    <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-red-500 data-[state=active]:text-white">Despesa</TabsTrigger>
                    <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-green-500 data-[state=active]:text-white">Receita</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2"><Label className="text-slate-600 text-sm">Valor</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-slate-50 border-slate-200 rounded-xl" /></div>
                <div className="space-y-2"><Label className="text-slate-600 text-sm">Categoria</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent className="bg-white border-slate-200 rounded-xl">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>))}
                    </SelectContent>
                  </Select></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-slate-600 text-sm">Data</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} className="bg-slate-50 border-slate-200 rounded-xl" /></div>
                  <div className="space-y-2"><Label className="text-slate-600 text-sm">Nota</Label>
                    <Input placeholder="Opcional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })} className="bg-slate-50 border-slate-200 rounded-xl" /></div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600">Adicionar</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-green-500" /><span className="text-xs text-slate-500">Entradas</span></div>
            <p className="text-xl font-semibold text-green-600">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-red-500" /><span className="text-xs text-slate-500">Saídas</span></div>
            <p className="text-xl font-semibold text-red-500">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div><span className="text-xs text-slate-500">Saldo</span><p className={cn('text-2xl font-semibold', balance >= 0 ? 'text-slate-800' : 'text-red-500')}>{formatCurrency(balance)}</p></div>
            <Mountain className={cn('w-8 h-8', balance >= 0 ? 'text-blue-500' : 'text-red-400')} />
          </div>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-sm text-slate-600 mb-4">Últimos 7 Dias</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-green-500 rounded-t" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-red-400 rounded-t" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-slate-400">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-3 border-b border-slate-100"><span className="text-sm text-slate-600">Transações Recentes</span></div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (<p className="text-center text-slate-400 py-8 text-sm">Nenhuma transação</p>) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-slate-50">
                    <div className="flex items-center gap-3"><span className="text-xl">{cat?.icon || '💰'}</span><div><p className="text-sm text-slate-700">{cat?.name || 'Desconhecido'}</p><p className="text-[10px] text-slate-400">{t.date}</p></div></div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-semibold', t.type === 'income' ? 'text-green-600' : 'text-red-500')}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-slate-300 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
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
