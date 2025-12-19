'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Waves, Fish, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Anchor, Shell, Compass } from 'lucide-react';
import Link from 'next/link';

export function OceanDashboardPage({
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
    <div className="min-h-screen text-white">
      {/* Ocean gradient background */}
      <div className="fixed inset-0" style={{
        background: 'linear-gradient(180deg, #001a2c 0%, #003049 20%, #005f73 50%, #0a9396 80%, #94d2bd 100%)',
      }} />
      
      {/* Animated bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: `${4 + (i % 4) * 3}px`,
              height: `${4 + (i % 4) * 3}px`,
              left: `${5 + i * 8}%`,
              bottom: `${10 + (i % 5) * 15}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
        {/* Light rays from surface */}
        <div className="absolute top-0 left-1/4 w-32 h-96 opacity-10"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)', transform: 'rotate(-15deg)' }} />
        <div className="absolute top-0 right-1/3 w-24 h-80 opacity-10"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)', transform: 'rotate(10deg)' }} />
      </div>

      <div className="relative z-10 px-4 pt-6 pb-24">
        {/* Header with Avatar */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-teal-600 flex items-center justify-center ring-2 ring-cyan-300/30 shadow-lg shadow-cyan-500/20">
                  <Shell className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-[#001a2c]">
                  <Waves className="w-2 h-2 text-white m-0.5" />
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' })}
                </p>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-cyan-100 to-teal-200 bg-clip-text text-transparent">
                  Painel do Mar
                </h1>
              </div>
            </div>
            <button className="w-10 h-10 rounded-full bg-white/10 border border-cyan-400/20 flex items-center justify-center hover:bg-cyan-500/20 transition-colors backdrop-blur-sm">
              <Compass className="w-5 h-5 text-cyan-300" />
            </button>
          </div>
        </header>

        {/* Depth Progress Card */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-cyan-900/60 to-teal-900/40 border border-cyan-400/20 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-2 right-2 opacity-20">
            <Anchor className="w-16 h-16 text-cyan-300" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase">Profundidade do Dia</span>
            </div>
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-3xl font-bold text-white">{Math.round(progressValue)}%</p>
                <p className="text-xs text-cyan-300/60">{completedToday} de {todayTasks.length} mergulhos completos</p>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30">
                <Fish className="w-3 h-3 text-teal-300" />
                <span className="text-xs text-teal-200 font-medium">{pendingTasks} restantes</span>
              </div>
            </div>
            {/* Wave-style progress bar */}
            <div className="h-3 rounded-full bg-cyan-950/50 overflow-hidden relative">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 relative"
                style={{ width: `${progressValue}%` }}>
                <div className="absolute inset-0 opacity-50" style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid - Treasure Chests */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-900/50 to-teal-900/30 border border-emerald-400/20 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-[10px] font-bold tracking-wider text-emerald-300 uppercase mb-1">Tesouros Encontrados</p>
            <p className="text-xl font-bold text-emerald-200">{formatCurrency(monthIncome)}</p>
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={cn('h-1.5 flex-1 rounded-full', i < 4 ? 'bg-emerald-500' : 'bg-emerald-900/50')} />
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-rose-900/50 to-red-900/30 border border-rose-400/20 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-rose-400" />
            </div>
            <p className="text-[10px] font-bold tracking-wider text-rose-300 uppercase mb-1">Gastos na Viagem</p>
            <p className="text-xl font-bold text-rose-200">{formatCurrency(monthExpense)}</p>
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={cn('h-1.5 flex-1 rounded-full', i < 3 ? 'bg-rose-500' : 'bg-rose-900/50')} />
              ))}
            </div>
          </div>
        </div>

        {/* Balance - Ship's Hold */}
        <div className="mb-6 p-5 rounded-2xl bg-gradient-to-r from-cyan-900/50 via-teal-900/40 to-cyan-900/50 border border-cyan-400/20 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 40px)',
          }} />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-300 uppercase mb-1">Saldo do Porão</p>
              <p className={cn('text-3xl font-bold', balance >= 0 ? 'text-white' : 'text-rose-400')}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className={cn('w-14 h-14 rounded-full flex items-center justify-center shadow-lg',
              balance >= 0 ? 'bg-gradient-to-br from-cyan-500 to-teal-600 shadow-cyan-500/30' : 'bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/30')}>
              <Anchor className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Tasks - Dive Log */}
        <div className="mb-6 rounded-2xl bg-cyan-950/50 border border-cyan-400/20 overflow-hidden backdrop-blur-sm">
          <div className="p-4 border-b border-cyan-500/20 bg-cyan-900/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shell className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">Diário de Bordo</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
                {todayTasks.length} entradas
              </span>
            </div>
          </div>
          
          <div className="p-3">
            {todayTasks.length === 0 ? (
              <div className="py-8 text-center">
                <Fish className="w-12 h-12 mx-auto text-cyan-500/30 mb-2" />
                <p className="text-cyan-400/50 text-sm">Nenhuma tarefa registrada</p>
              </div>
            ) : (
              <div className="space-y-2">
                {todayTasks.slice(0, 3).map((task, index) => (
                  <div key={task.id}
                    className={cn('flex items-center gap-3 p-3 rounded-xl transition-all',
                      task.status === 'completed'
                        ? 'bg-teal-500/10 border border-teal-500/20'
                        : 'bg-cyan-900/30 border border-cyan-700/30 hover:border-cyan-500/30')}>
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold',
                      task.status === 'completed' ? 'bg-teal-500/20 text-teal-300' :
                      task.priority === 'high' ? 'bg-rose-500/20 text-rose-300' : 'bg-cyan-500/20 text-cyan-300')}>
                      {task.status === 'completed' ? '✓' : `${index + 1}º`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-sm font-medium truncate',
                        task.status === 'completed' ? 'line-through text-cyan-600' : 'text-white')}>
                        {task.title}
                      </p>
                      {task.priority === 'high' && task.status !== 'completed' && (
                        <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Urgente</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <Link href="/tasks" className="block mt-3">
              <div className="flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 transition-colors">
                Ver Todo o Diário
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-rose-900/50 to-red-900/40 border border-rose-500/30 mb-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <p className="text-rose-300 font-bold">{overdueTasks} Tarefa{overdueTasks > 1 ? 's' : ''} Atrasada{overdueTasks > 1 ? 's' : ''}</p>
                <p className="text-rose-400/60 text-xs">Precisa de atenção imediata</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/tasks">
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
              <Shell className="w-4 h-4" />
              Nova Tarefa
            </button>
          </Link>
          <Link href="/financial">
            <button className="w-full py-4 rounded-xl bg-cyan-950/50 border border-cyan-500/20 text-cyan-300 font-bold text-sm hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
              <Anchor className="w-4 h-4" />
              Transação
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
