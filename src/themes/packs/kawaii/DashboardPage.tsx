'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Heart, Star, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function KawaiiDashboardPage({
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
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
      }}
    >
      {/* Decorative */}
      <div className="fixed top-20 left-4 text-4xl opacity-20">🌸</div>
      <div className="fixed top-40 right-8 text-3xl opacity-20">⭐</div>
      <div className="fixed bottom-40 left-8 text-3xl opacity-20">💖</div>

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header */}
        <header className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-pink-400 text-xs mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Bem-vindo de volta!</span>
            <Sparkles className="w-4 h-4" />
          </div>
          <h1 className="text-3xl font-bold text-pink-500">
            Meu Dia ✨
          </h1>
          <p className="text-xs text-pink-400/70 mt-1">
            {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </header>

        {/* Progress */}
        <div className="mb-6 p-4 rounded-3xl bg-white/80 border-2 border-pink-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-pink-500 font-medium">Progresso do Dia</span>
            <span className="text-pink-400 font-bold">{Math.round(progressValue)}%</span>
          </div>
          <div className="h-4 rounded-full bg-pink-100 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-500"
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <p className="text-xs text-pink-400/70 mt-2 text-center">
            {completedToday} de {todayTasks.length} tarefas feitas! 🎉
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-600">Entradas 💰</span>
            </div>
            <p className="text-xl font-bold text-green-500">
              {formatCurrency(monthIncome)}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-xs text-red-500">Saídas 💸</span>
            </div>
            <p className="text-xl font-bold text-red-400">
              {formatCurrency(monthExpense)}
            </p>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-pink-500">Saldo Total</span>
              <p className={cn(
                'text-2xl font-bold',
                balance >= 0 ? 'text-pink-500' : 'text-red-400'
              )}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className="text-4xl">
              {balance >= 0 ? '🌟' : '😢'}
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="mb-6 rounded-3xl bg-white/80 border-2 border-pink-200 shadow-sm overflow-hidden">
          <div className="p-3 border-b-2 border-pink-100 flex items-center justify-between bg-pink-50">
            <span className="text-sm text-pink-500 font-medium">Tarefas de Hoje</span>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-pink-200">
              <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
              <span className="text-pink-600 text-xs font-medium">{pendingTasks}</span>
            </div>
          </div>
          
          <div className="p-3">
            {todayTasks.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">🌈</div>
                <p className="text-pink-400 text-sm">Nenhuma tarefa para hoje!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task, index) => {
                  const colors = ['bg-pink-50', 'bg-purple-50', 'bg-blue-50'];
                  return (
                    <div 
                      key={task.id}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl',
                        task.status === 'completed' ? 'bg-green-50' : colors[index % 3]
                      )}
                    >
                      <div className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs',
                        task.status === 'completed' 
                          ? 'bg-green-400 text-white' 
                          : 'bg-pink-200 text-pink-500'
                      )}>
                        {task.status === 'completed' ? '✓' : '♡'}
                      </div>
                      <span className={cn(
                        'text-sm flex-1 truncate',
                        task.status === 'completed' ? 'line-through text-green-500' : 'text-gray-700'
                      )}>
                        {task.title}
                      </span>
                      {task.priority === 'high' && task.status !== 'completed' && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-500">
                          🔥 Urgente
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            
            <Link href="/tasks" className="block mt-3">
              <div className="flex items-center justify-center gap-2 py-2 rounded-xl border-2 border-pink-200 text-pink-500 text-sm hover:bg-pink-50 transition-colors">
                Ver Todas as Tarefas
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Overdue */}
        {overdueTasks > 0 && (
          <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-200 mb-6">
            <div className="flex items-center gap-3">
              <div className="text-2xl">😰</div>
              <div>
                <p className="text-red-500 font-medium">
                  {overdueTasks} tarefa{overdueTasks > 1 ? 's' : ''} atrasada{overdueTasks > 1 ? 's' : ''}!
                </p>
                <p className="text-red-400/70 text-xs">Vamos resolver isso? 💪</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-purple-400 text-white font-medium shadow-md shadow-pink-300/50 hover:opacity-90 transition-opacity">
              + Nova Tarefa
            </button>
          </Link>
          <Link href="/financial">
            <button className="w-full py-3 rounded-2xl bg-white border-2 border-pink-200 text-pink-500 font-medium hover:bg-pink-50 transition-colors">
              + Transação
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
