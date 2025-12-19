'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, Heart, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function KawaiiFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)' }}>
      <div className="fixed top-20 left-4 text-4xl opacity-20">🌸</div>
      <div className="fixed top-40 right-8 text-3xl opacity-20">💰</div>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6 flex items-center justify-between">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-2 text-pink-400 text-xs mb-2"><Sparkles className="w-4 h-4" /><span>Meu Dinheiro</span><Sparkles className="w-4 h-4" /></div>
            <h1 className="text-3xl font-bold text-pink-500">Finanças ✨</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white flex items-center justify-center shadow-lg shadow-pink-300/50 border-2 border-white">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-white border-2 border-pink-200 text-gray-700 max-w-[90vw] rounded-3xl">
              <DialogHeader><DialogTitle className="text-pink-500 flex items-center gap-2"><Sparkles className="w-5 h-5" />Nova Transação</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-pink-100 rounded-xl">
                    <TabsTrigger value="expense" className="rounded-xl data-[state=active]:bg-pink-400 data-[state=active]:text-white">💸 Gasto</TabsTrigger>
                    <TabsTrigger value="income" className="rounded-xl data-[state=active]:bg-green-400 data-[state=active]:text-white">💰 Entrada</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2"><Label className="text-pink-400 text-sm">Valor</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-pink-50 border-pink-200 rounded-xl" /></div>
                <div className="space-y-2"><Label className="text-pink-400 text-sm">Categoria</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-pink-50 border-pink-200 rounded-xl"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent className="bg-white border-pink-200 rounded-xl">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>))}
                    </SelectContent>
                  </Select></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-pink-400 text-sm">Data</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} className="bg-pink-50 border-pink-200 rounded-xl" /></div>
                  <div className="space-y-2"><Label className="text-pink-400 text-sm">Nota</Label>
                    <Input placeholder="Opcional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })} className="bg-pink-50 border-pink-200 rounded-xl" /></div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium shadow-md">Adicionar ✨</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-green-500" /><span className="text-xs text-green-600">Entradas 💰</span></div>
            <p className="text-xl font-bold text-green-500">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-red-400" /><span className="text-xs text-red-500">Saídas 💸</span></div>
            <p className="text-xl font-bold text-red-400">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div><span className="text-xs text-pink-500">Saldo Total</span><p className={cn('text-2xl font-bold', balance >= 0 ? 'text-pink-500' : 'text-red-400')}>{formatCurrency(balance)}</p></div>
            <div className="text-4xl">{balance >= 0 ? '🌟' : '😢'}</div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-3xl bg-white/80 border-2 border-pink-200 shadow-sm">
          <h3 className="text-sm text-pink-500 font-medium mb-4">Últimos 7 Dias</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-gradient-to-t from-green-400 to-green-300 rounded-t-lg" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-gradient-to-t from-pink-400 to-pink-300 rounded-t-lg" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-pink-400">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl bg-white/80 border-2 border-pink-200 shadow-sm overflow-hidden">
          <div className="p-3 border-b-2 border-pink-100 bg-pink-50"><span className="text-sm text-pink-500 font-medium">Transações Recentes</span></div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (<div className="text-center py-8"><div className="text-4xl mb-2">🌈</div><p className="text-pink-400 text-sm">Nenhuma transação!</p></div>) : (
              recentTransactions.map((t, i) => {
                const cat = categories.find(c => c.id === t.categoryId);
                const colors = ['bg-pink-50', 'bg-purple-50', 'bg-blue-50'];
                return (
                  <div key={t.id} className={cn('flex items-center justify-between p-3 border-b border-pink-100', colors[i % 3])}>
                    <div className="flex items-center gap-3"><span className="text-xl">{cat?.icon || '💰'}</span><div><p className="text-sm text-gray-700">{cat?.name || 'Desconhecido'}</p><p className="text-[10px] text-gray-400">{t.date}</p></div></div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-bold', t.type === 'income' ? 'text-green-500' : 'text-red-400')}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-gray-300 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
