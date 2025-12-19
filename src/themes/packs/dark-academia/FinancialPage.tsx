'use client';

import { FinancialPageProps } from '../types';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Trash2, Plus, BookOpen, Feather } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DarkAcademiaFinancialPage({
  monthIncome, monthExpense, balance, formatCurrency, pieData, last7Days,
  categorySpending, recentTransactions, categories,
  isDialogOpen, setIsDialogOpen, transactionType, setTransactionType,
  newTransaction, setNewTransaction, handleAddTransaction, deleteTransaction,
}: FinancialPageProps) {
  const expenseCategories = categories.filter(c => c.type === 'expense');
  const incomeCategories = categories.filter(c => c.type === 'income');

  return (
    <div className="min-h-screen text-stone-200" style={{ background: 'linear-gradient(180deg, #1c1917 0%, #292524 50%, #1c1917 100%)' }}>
      <div className="relative z-10 px-4 pt-6 pb-24">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 text-xs tracking-widest mb-1 italic"><Feather className="w-3 h-3" /><span>Livro Contábil</span></div>
            <h1 className="text-3xl font-serif text-amber-100">Finanças</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="w-12 h-12 rounded-full bg-amber-900 text-amber-200 flex items-center justify-center border border-amber-800">
                <Plus className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-stone-900 border border-stone-700 text-stone-200 max-w-[90vw] rounded-lg">
              <DialogHeader><DialogTitle className="text-amber-200 flex items-center gap-2 font-serif"><Feather className="w-5 h-5 text-amber-600" />Nova Anotação</DialogTitle></DialogHeader>
              <div className="space-y-4 pt-4">
                <Tabs value={transactionType} onValueChange={(v) => setTransactionType(v as 'income' | 'expense')}>
                  <TabsList className="w-full grid grid-cols-2 bg-stone-800 rounded">
                    <TabsTrigger value="expense" className="rounded data-[state=active]:bg-amber-900 data-[state=active]:text-amber-200">Despesa</TabsTrigger>
                    <TabsTrigger value="income" className="rounded data-[state=active]:bg-amber-900 data-[state=active]:text-amber-200">Receita</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="space-y-2"><Label className="text-amber-400 text-sm font-serif">Valor</Label>
                  <Input type="number" placeholder="0.00" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="bg-stone-800 border-stone-700 text-stone-200 rounded" /></div>
                <div className="space-y-2"><Label className="text-amber-400 text-sm font-serif">Categoria</Label>
                  <Select value={newTransaction.categoryId} onValueChange={(v) => setNewTransaction({ ...newTransaction, categoryId: v })}>
                    <SelectTrigger className="bg-stone-800 border-stone-700 text-stone-200 rounded"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent className="bg-stone-800 border-stone-700 rounded">
                      {(transactionType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (<SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>))}
                    </SelectContent>
                  </Select></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label className="text-amber-400 text-sm font-serif">Data</Label>
                    <Input type="date" value={newTransaction.date} onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })} className="bg-stone-800 border-stone-700 text-stone-200 rounded" /></div>
                  <div className="space-y-2"><Label className="text-amber-400 text-sm font-serif">Nota</Label>
                    <Input placeholder="Opcional" value={newTransaction.note} onChange={(e) => setNewTransaction({ ...newTransaction, note: e.target.value })} className="bg-stone-800 border-stone-700 text-stone-200 rounded" /></div>
                </div>
                <button onClick={handleAddTransaction} className="w-full py-3 rounded bg-amber-900 text-amber-200 font-serif hover:bg-amber-800 border border-amber-800">Registrar</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded bg-stone-900/40 border border-stone-800">
            <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-amber-600" /><span className="text-xs text-amber-500">Receitas</span></div>
            <p className="text-xl font-serif text-amber-200">{formatCurrency(monthIncome)}</p>
          </div>
          <div className="p-4 rounded bg-stone-900/40 border border-stone-800">
            <div className="flex items-center gap-2 mb-2"><TrendingDown className="w-4 h-4 text-red-700" /><span className="text-xs text-red-400">Despesas</span></div>
            <p className="text-xl font-serif text-red-300">{formatCurrency(monthExpense)}</p>
          </div>
        </div>

        <div className="mb-6 p-4 rounded bg-stone-900/50 border border-amber-900/30">
          <div className="flex items-center justify-between">
            <div><span className="text-xs text-amber-500">Saldo</span><p className={cn('text-2xl font-serif', balance >= 0 ? 'text-amber-200' : 'text-red-400')}>{formatCurrency(balance)}</p></div>
            <BookOpen className={cn('w-8 h-8', balance >= 0 ? 'text-amber-700' : 'text-red-700')} />
          </div>
        </div>

        <div className="mb-6 p-4 rounded bg-stone-900/40 border border-stone-800">
          <h3 className="text-sm text-amber-400 font-serif mb-4">Últimos 7 Dias</h3>
          <div className="h-32 flex items-end gap-1">
            {last7Days.map((day, i) => {
              const max = Math.max(...last7Days.flatMap(d => [d.income, d.expense])) || 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end justify-center gap-0.5 h-24">
                    <div className="w-2/5 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t" style={{ height: `${(day.income / max) * 100}%` }} />
                    <div className="w-2/5 bg-gradient-to-t from-stone-700 to-stone-500 rounded-t" style={{ height: `${(day.expense / max) * 100}%` }} />
                  </div>
                  <span className="text-[8px] text-stone-500">{day.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded bg-stone-900/40 border border-stone-800 overflow-hidden">
          <div className="p-3 border-b border-stone-800"><span className="text-sm text-amber-400 font-serif">Transações Recentes</span></div>
          <div className="max-h-64 overflow-y-auto">
            {recentTransactions.length === 0 ? (<p className="text-center text-stone-600 py-8 text-sm italic font-serif">"Nenhum registro encontrado"</p>) : (
              recentTransactions.map((t) => {
                const cat = categories.find(c => c.id === t.categoryId);
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 border-b border-stone-800/50">
                    <div className="flex items-center gap-3"><span className="text-xl">{cat?.icon || '💰'}</span><div><p className="text-sm font-serif text-stone-300">{cat?.name || 'Desconhecido'}</p><p className="text-[10px] text-stone-500">{t.date}</p></div></div>
                    <div className="flex items-center gap-2">
                      <span className={cn('font-serif', t.type === 'income' ? 'text-amber-300' : 'text-red-400')}>{t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}</span>
                      <button onClick={() => deleteTransaction(t.id)} className="p-1 text-stone-600 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
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
