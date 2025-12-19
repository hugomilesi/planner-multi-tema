'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Star, TrendingUp, TrendingDown, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export function WesternDashboardPage({
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
    <div 
      className="min-h-screen font-[family-name:var(--font-rye)]"
      style={{
        backgroundColor: '#EFE6DD',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%238B5A2B' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6">
          <div className="text-amber-800/60 text-xs tracking-[0.2em] mb-1 font-[family-name:var(--font-courier-prime)]">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
          <h1 className="text-3xl text-amber-900 drop-shadow-sm">
            Quartel General
          </h1>
        </header>

        {/* Daily Bounty Progress */}
        <div 
          className="mb-6 p-4 bg-amber-800 border-2 border-amber-900"
          style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)' }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-100 text-sm font-[family-name:var(--font-courier-prime)]">
              Recompensa Diária
            </span>
            <span className="text-amber-300 font-bold">{Math.round(progressValue)}%</span>
          </div>
          <div className="h-3 bg-amber-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <p className="text-xs text-amber-200/70 mt-2 font-[family-name:var(--font-courier-prime)]">
            {completedToday} de {todayTasks.length} tarefas concluídas
          </p>
        </div>

        {/* Gold Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Income */}
          <div 
            className="p-4 bg-[#F4ECD8] border-2 border-amber-700"
            style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-700" />
              <span className="text-xs text-amber-700 font-[family-name:var(--font-courier-prime)]">Ouro Ganho</span>
            </div>
            <p className="text-xl text-green-700">
              {formatCurrency(monthIncome)}
            </p>
          </div>

          {/* Expense */}
          <div 
            className="p-4 bg-[#F4ECD8] border-2 border-amber-700"
            style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-700" />
              <span className="text-xs text-amber-700 font-[family-name:var(--font-courier-prime)]">Ouro Gasto</span>
            </div>
            <p className="text-xl text-red-700">
              {formatCurrency(monthExpense)}
            </p>
          </div>
        </div>

        {/* Balance - Wanted Poster Style */}
        <div 
          className="mb-6 p-4 bg-[#F4ECD8] border-2 border-amber-800 relative transform rotate-[-0.5deg]"
          style={{ boxShadow: '4px 4px 0 rgba(139,69,19,0.3)' }}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-700 border-2 border-amber-900" />
          <div className="text-center">
            <span className="text-xs text-amber-700 font-[family-name:var(--font-courier-prime)]">SALDO DO COFRE</span>
            <p className={cn(
              'text-3xl mt-1',
              balance >= 0 ? 'text-amber-900' : 'text-red-700'
            )}>
              {formatCurrency(balance)}
            </p>
          </div>
        </div>

        {/* Today's Bounties */}
        <div 
          className="mb-6 bg-[#F4ECD8] border-2 border-amber-800"
          style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}
        >
          <div className="p-3 border-b-2 border-amber-800 bg-amber-100 flex items-center justify-between">
            <span className="text-amber-900 text-sm">Tarefas de Hoje</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span className="text-amber-700 text-sm font-[family-name:var(--font-courier-prime)]">{pendingTasks}</span>
            </div>
          </div>
          
          <div className="p-3">
            {todayTasks.length === 0 ? (
              <p className="text-center text-amber-600/70 text-sm py-4 font-[family-name:var(--font-courier-prime)]">
                Nenhuma tarefa para hoje
              </p>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task) => (
                  <div 
                    key={task.id}
                    className={cn(
                      'flex items-center gap-3 p-2 border-l-4',
                      task.status === 'completed' 
                        ? 'border-l-green-600 opacity-50' 
                        : task.priority === 'high' 
                        ? 'border-l-red-600' 
                        : 'border-l-amber-600'
                    )}
                  >
                    <span className={cn(
                      'text-sm flex-1 truncate text-amber-900 font-[family-name:var(--font-courier-prime)]',
                      task.status === 'completed' && 'line-through'
                    )}>
                      {task.title}
                    </span>
                    {task.priority === 'high' && task.status !== 'completed' && (
                      <span className="text-[10px] px-2 py-0.5 bg-red-700 text-white">URGENTE</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <Link href="/tasks" className="block mt-3">
              <div className="flex items-center justify-center gap-2 py-2 border-2 border-amber-700 text-amber-800 text-sm hover:bg-amber-100 transition-colors font-[family-name:var(--font-courier-prime)]">
                Ver Todas as Tarefas
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <div 
            className="p-4 bg-red-100 border-2 border-red-700 mb-6"
            style={{ boxShadow: '3px 3px 0 rgba(185,28,28,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-700" />
              <div>
                <p className="text-red-800 text-sm">
                  {overdueTasks} tarefa{overdueTasks > 1 ? 's' : ''} atrasada{overdueTasks > 1 ? 's' : ''}!
                </p>
                <p className="text-red-600/70 text-xs font-[family-name:var(--font-courier-prime)]">
                  Precisa de atenção imediata
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <button 
              className="w-full py-3 bg-amber-800 text-amber-100 text-sm border-2 border-amber-900 hover:bg-amber-700 transition-colors"
              style={{ boxShadow: '3px 3px 0 rgba(0,0,0,0.2)' }}
            >
              + Nova Tarefa
            </button>
          </Link>
          <Link href="/financial">
            <button 
              className="w-full py-3 bg-amber-100 text-amber-800 text-sm border-2 border-amber-700 hover:bg-amber-200 transition-colors"
              style={{ boxShadow: '3px 3px 0 rgba(139,69,19,0.2)' }}
            >
              + Transação
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
