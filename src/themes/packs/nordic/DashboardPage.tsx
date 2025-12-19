'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Mountain, Snowflake, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Sun, Wind, TreePine } from 'lucide-react';
import Link from 'next/link';

export function NordicDashboardPage({
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
    <div className="min-h-screen text-slate-800">
      {/* Clean Nordic gradient */}
      <div className="fixed inset-0" style={{
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 30%, #e2e8f0 70%, #cbd5e1 100%)',
      }} />
      {/* Subtle aurora effect */}
      <div className="fixed top-0 left-0 right-0 h-64 opacity-30" style={{
        background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(168,85,247,0.05) 50%, rgba(34,197,94,0.1) 100%)',
      }} />
      {/* Mountain silhouette */}
      <div className="fixed bottom-0 left-0 right-0 h-32 opacity-5" style={{
        background: 'linear-gradient(180deg, transparent 0%, #1e293b 100%)',
        clipPath: 'polygon(0 100%, 15% 60%, 30% 80%, 45% 40%, 60% 70%, 75% 30%, 90% 60%, 100% 100%)',
      }} />

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header - Scandinavian style */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                  <Mountain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-50 flex items-center justify-center">
                  <Sun className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
                </p>
                <h1 className="text-xl font-bold text-slate-800">
                  Bom dia
                </h1>
              </div>
            </div>
            <button className="w-10 h-10 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-center hover:bg-white transition-colors shadow-sm">
              <Wind className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </header>

        {/* Progress - Clean card */}
        <div className="mb-6 p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm relative overflow-hidden">
          <div className="absolute top-3 right-3 opacity-5">
            <Snowflake className="w-20 h-20 text-sky-500" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <TreePine className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Progresso do Dia</span>
            </div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-3xl font-bold text-slate-800">{Math.round(progressValue)}%</p>
                <p className="text-xs text-slate-400">{completedToday} de {todayTasks.length} tarefas concluídas</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100">
                <Sun className="w-3 h-3 text-sky-500" />
                <span className="text-xs text-sky-600 font-medium">{pendingTasks} restantes</span>
              </div>
            </div>
            {/* Minimal progress bar */}
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-500 relative"
                style={{ width: `${progressValue}%` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Floating cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-emerald-500/5" />
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center mb-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1">Entradas</p>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(monthIncome)}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-rose-500/5" />
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center mb-2">
                <TrendingDown className="w-4 h-4 text-rose-500" />
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-1">Saídas</p>
              <p className="text-xl font-bold text-rose-500">{formatCurrency(monthExpense)}</p>
            </div>
          </div>
        </div>

        {/* Balance - Feature card */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(56,189,248,0.3) 0%, transparent 50%)',
          }} />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-400 uppercase mb-1">Saldo Total</p>
              <p className={cn('text-3xl font-bold', balance >= 0 ? 'text-white' : 'text-rose-400')}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center',
              balance >= 0 ? 'bg-sky-500/20' : 'bg-rose-500/20')}>
              <Mountain className={cn('w-7 h-7', balance >= 0 ? 'text-sky-400' : 'text-rose-400')} />
            </div>
          </div>
        </div>

        {/* Tasks - Clean list */}
        <div className="mb-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-slate-700">Tarefas de Hoje</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                {todayTasks.length} tarefas
              </span>
            </div>
          </div>
          
          <div className="p-3">
            {todayTasks.length === 0 ? (
              <div className="py-8 text-center">
                <Snowflake className="w-12 h-12 mx-auto text-slate-200 mb-2" />
                <p className="text-slate-400 text-sm">Nenhuma tarefa para hoje</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task, index) => (
                  <div key={task.id}
                    className={cn('flex items-center gap-3 p-3 rounded-xl transition-all',
                      task.status === 'completed'
                        ? 'bg-emerald-50/50 border border-emerald-100'
                        : 'bg-slate-50/50 border border-slate-100 hover:border-sky-200')}>
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold',
                      task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                      task.priority === 'high' ? 'bg-rose-100 text-rose-600' : 'bg-sky-100 text-sky-600')}>
                      {task.status === 'completed' ? '✓' : index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-medium truncate',
                        task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-700')}>
                        {task.title}
                      </p>
                      {task.priority === 'high' && task.status !== 'completed' && (
                        <p className="text-[10px] text-rose-500 font-medium">Prioridade alta</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link href="/tasks" className="block mt-3">
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 text-sm font-medium hover:bg-slate-100 transition-colors">
                Ver Todas as Tarefas
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
              </div>
              <div>
                <p className="text-rose-600 font-semibold">{overdueTasks} Tarefa{overdueTasks > 1 ? 's' : ''} Atrasada{overdueTasks > 1 ? 's' : ''}</p>
                <p className="text-rose-400 text-xs">Precisa de atenção</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20">
              <Sun className="w-4 h-4" />
              Nova Tarefa
            </button>
          </Link>
          <Link href="/financial">
            <button className="w-full py-4 rounded-xl bg-white/80 border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-sm">
              <Mountain className="w-4 h-4" />
              Transação
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
