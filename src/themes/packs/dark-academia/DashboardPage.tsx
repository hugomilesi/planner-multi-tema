'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { BookOpen, Feather, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Library, Scroll, GraduationCap, Bookmark } from 'lucide-react';
import Link from 'next/link';

export function DarkAcademiaDashboardPage({
  todayTasks,
  completedToday,
  pendingTasks,
  overdueTasks,
  progressValue,
  monthIncome,
  monthExpense,
  balance,
  formatCurrency,
}: DashboardPageProps) {
  return (
    <div className="min-h-screen text-stone-200">
      {/* Aged paper background */}
      <div className="fixed inset-0" style={{
        background: 'linear-gradient(180deg, #1a1614 0%, #252220 30%, #1f1c1a 60%, #171514 100%)',
      }} />
      {/* Paper texture overlay */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />
      {/* Warm light from top */}
      <div className="fixed top-0 left-0 right-0 h-96 opacity-20" style={{
        background: 'radial-gradient(ellipse at top, rgba(180,130,70,0.3) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header - Scholar's Desk */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-900 to-stone-900 flex items-center justify-center ring-2 ring-amber-800/30 shadow-lg">
                  <GraduationCap className="w-6 h-6 text-amber-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-800 rounded-full border-2 border-[#1a1614] flex items-center justify-center">
                  <Feather className="w-2 h-2 text-amber-300" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-amber-700 uppercase italic">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
                </p>
                <h1 className="text-xl font-serif font-bold text-amber-100">
                  Diário Acadêmico
                </h1>
              </div>
            </div>
            <button className="w-10 h-10 rounded bg-stone-900/50 border border-amber-900/30 flex items-center justify-center hover:bg-amber-900/20 transition-colors">
              <Bookmark className="w-5 h-5 text-amber-700" />
            </button>
          </div>
        </header>

        {/* Progress - Manuscript style */}
        <div className="mb-6 p-5 rounded-lg bg-gradient-to-br from-stone-900/80 to-stone-950/60 border border-amber-900/20 relative overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-800/30 rounded-tl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-800/30 rounded-br-lg" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Scroll className="w-4 h-4 text-amber-600" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-amber-600 uppercase">Progresso dos Estudos</span>
            </div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-3xl font-serif font-bold text-amber-100">{Math.round(progressValue)}%</p>
                <p className="text-xs text-stone-500 italic">{completedToday} de {todayTasks.length} capítulos concluídos</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded bg-amber-900/20 border border-amber-800/30">
                <Library className="w-3 h-3 text-amber-600" />
                <span className="text-xs text-amber-400 font-serif">{pendingTasks} pendentes</span>
              </div>
            </div>
            {/* Antique progress bar */}
            <div className="h-2 rounded-full bg-stone-900 overflow-hidden border border-stone-800">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-700 relative"
                style={{ width: `${progressValue}%` }}>
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.2) 8px, rgba(0,0,0,0.2) 16px)',
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Ledger entries */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-950/40 to-stone-950/40 border border-emerald-900/20 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <TrendingUp className="w-12 h-12 text-emerald-500" />
            </div>
            <p className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase mb-1">Receitas</p>
            <p className="text-xl font-serif font-bold text-emerald-300">{formatCurrency(monthIncome)}</p>
            <div className="mt-2 h-0.5 bg-emerald-900/30 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-emerald-700 rounded-full" />
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-rose-950/40 to-stone-950/40 border border-rose-900/20 relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <TrendingDown className="w-12 h-12 text-rose-500" />
            </div>
            <p className="text-[10px] font-bold tracking-wider text-rose-600 uppercase mb-1">Despesas</p>
            <p className="text-xl font-serif font-bold text-rose-300">{formatCurrency(monthExpense)}</p>
            <div className="mt-2 h-0.5 bg-rose-900/30 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-rose-700 rounded-full" />
            </div>
          </div>
        </div>

        {/* Balance - Treasury */}
        <div className="mb-6 p-5 rounded-lg bg-gradient-to-r from-amber-950/40 via-stone-900/50 to-amber-950/40 border border-amber-800/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(180,130,70,0.1) 30px, rgba(180,130,70,0.1) 60px)',
          }} />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-amber-600 uppercase mb-1">Saldo do Cofre</p>
              <p className={cn('text-3xl font-serif font-bold', balance >= 0 ? 'text-amber-100' : 'text-rose-400')}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className={cn('w-14 h-14 rounded-lg flex items-center justify-center border-2',
              balance >= 0 ? 'bg-amber-900/30 border-amber-800/50' : 'bg-rose-900/30 border-rose-800/50')}>
              <BookOpen className={cn('w-7 h-7', balance >= 0 ? 'text-amber-500' : 'text-rose-500')} />
            </div>
          </div>
        </div>

        {/* Tasks - Study Journal */}
        <div className="mb-6 rounded-lg bg-stone-900/50 border border-stone-800 overflow-hidden">
          <div className="p-4 border-b border-stone-800 bg-amber-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scroll className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-serif font-bold text-amber-200">Estudos do Dia</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-amber-900/30 text-amber-400 text-xs font-serif border border-amber-800/30">
                {todayTasks.length} capítulos
              </span>
            </div>
          </div>
          
          <div className="p-3">
            {todayTasks.length === 0 ? (
              <div className="py-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-stone-700 mb-2" />
                <p className="text-stone-600 text-sm italic font-serif">"Nenhum estudo programado"</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task, index) => (
                  <div key={task.id}
                    className={cn('flex items-center gap-3 p-3 rounded-lg transition-all',
                      task.status === 'completed'
                        ? 'bg-amber-900/10 border border-amber-900/20'
                        : 'bg-stone-800/30 border border-stone-700/30 hover:border-amber-800/30')}>
                    <div className={cn('w-8 h-8 rounded flex items-center justify-center text-xs font-serif font-bold border',
                      task.status === 'completed' ? 'bg-amber-900/20 border-amber-800/30 text-amber-500' :
                      task.priority === 'high' ? 'bg-rose-900/20 border-rose-800/30 text-rose-400' : 'bg-stone-800/50 border-stone-700 text-stone-500')}>
                      {task.status === 'completed' ? '✓' : `${index + 1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-serif truncate',
                        task.status === 'completed' ? 'line-through text-stone-600' : 'text-stone-200')}>
                        {task.title}
                      </p>
                      {task.priority === 'high' && task.status !== 'completed' && (
                        <p className="text-[10px] text-rose-500 italic">Prioridade alta</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link href="/tasks" className="block mt-3">
              <div className="flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-900/10 border border-amber-800/20 text-amber-400 text-sm font-serif hover:bg-amber-900/20 transition-colors">
                Ver Todos os Estudos
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-rose-950/40 to-stone-950/40 border border-rose-800/30 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-rose-900/30 flex items-center justify-center border border-rose-800/30">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-rose-300 font-serif font-bold">{overdueTasks} Estudo{overdueTasks > 1 ? 's' : ''} Atrasado{overdueTasks > 1 ? 's' : ''}</p>
                <p className="text-rose-500/60 text-xs italic">Requer atenção imediata</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <button className="w-full py-4 rounded-lg bg-gradient-to-r from-amber-900 to-amber-800 text-amber-100 font-serif font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 border border-amber-700/50 shadow-lg shadow-amber-900/20">
              <Feather className="w-4 h-4" />
              Novo Estudo
            </button>
          </Link>
          <Link href="/financial">
            <button className="w-full py-4 rounded-lg bg-stone-900/50 border border-stone-700 text-stone-400 font-serif font-bold text-sm hover:bg-stone-800/50 transition-colors flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              Transação
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
