'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Waves, Anchor } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function OceanFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div className="min-h-screen text-white" style={{ background: 'linear-gradient(180deg, #0c4a6e 0%, #164e63 30%, #155e75 60%, #0e7490 100%)' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-300 text-xs tracking-widest mb-1"><Waves className="w-4 h-4" /><span>DEEP BANK</span></div>
            <h1 className="text-3xl font-bold text-white">Finanças</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border border-cyan-500/30 text-white max-w-[90vw] rounded-2xl">
              <DialogHeader><DialogTitle className="text-cyan-300 flex items-center gap-2"><Waves className="w-5 h-5" />Nova Transação</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-slate-800 rounded-xl">
                    <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-cyan-600">Gasto</TabsTrigger>
                    <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-teal-600">Entrada</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2"><Label className="text-cyan-300 text-sm">Valor</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-slate-800 border-cyan-500/30 text-white rounded-xl" /></div>
                <div className="space-y-2"><Label className="text-cyan-300 text-sm">Categoria</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-slate-800 border-cyan-500/30 text-white rounded-xl"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-cyan-500/30 rounded-xl">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>))}
                    </SelectContent>
                  </Select></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-cyan-300 text-sm">Data</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} className="bg-slate-800 border-cyan-500/30 text-white rounded-xl" /></div>
                  <div className="space-y-2"><Label className="text-cyan-300 text-sm">Nota</Label>
                    <Input placeholder="Opcional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })} className="bg-slate-800 border-cyan-500/30 text-white rounded-xl" /></div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-medium">🌊 Adicionar</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-teal-500/20 border border-teal-500/30">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-teal-400" /><span className="text-xs text-teal-300">Entradas</span></div>
            <p className="text-xl font-bold text-teal-300">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="text-xs text-red-300">Saídas</span></div>
            <p className="text-xl font-bold text-red-300">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-900/40 to-teal-900/40 border border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div><span className="text-xs text-cyan-400">Saldo</span><p className={cn('text-2xl font-bold', balance >= 0 ? 'text-cyan-300' : 'text-red-400')}>{formatCurrency(balance)}</p></div>
            <Anchor className={cn('w-8 h-8', balance >= 0 ? 'text-cyan-400' : 'text-red-400')} />
          </div>
        </div>

        <div className="mb-6 p-4 rounded-2xl bg-slate-800/40 border border-cyan-500/20">
          <h3 className="text-sm text-cyan-300 mb-4">Últimos 7 Dias</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-cyan-400">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-slate-800/40 border border-cyan-500/20 overflow-hidden">
          <div className="p-3 border-b border-cyan-500/20"><span className="text-sm text-cyan-300">Transações Recentes</span></div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (<p className="text-center text-cyan-400/50 py-8 text-sm">Nenhuma transação</p>) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-cyan-500/10">
                    <div className="flex items-center gap-3"><span className="text-xl">{cat?.icon || '💰'}</span><div><p className="text-sm">{cat?.name || 'Desconhecido'}</p><p className="text-[10px] text-cyan-400/50">{t.date}</p></div></div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-bold', t.type === 'income' ? 'text-teal-400' : 'text-red-400')}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-cyan-400/50 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
