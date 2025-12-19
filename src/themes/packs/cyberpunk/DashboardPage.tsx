'use client';

import { DashboardPageProps } from '../types';
import { cn } from '@/lib/utils';
import { Zap, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, Clock, Wallet } from 'lucide-react';
import Link from 'next/link';

export function CyberpunkDashboardPage({
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
  // Generate week days for timeline
  const today = new Date();
  const weekDays = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate(),
      isToday: i === 0,
    };
  });

  // Calculate progress segments (13 segments like reference)
  const totalSegments = 13;
  const filledSegments = Math.round((progressValue / 100) * totalSegments);

  return (
    <div className="min-h-screen text-white font-[family-name:var(--font-space-grotesk)]"
      style={{
        backgroundColor: '#120024',
        backgroundImage: 'linear-gradient(rgba(77,0,140,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(77,0,140,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}>

      <div className="relative z-10 pb-24">
        {/* Header - Sticky with blur */}
        <header className="sticky top-0 z-20 bg-[#120024]/90 backdrop-blur-md border-b-2 border-[#bc13fe]/30 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2a0052] to-[#120024] border-2 border-[#00ffff] transform -skew-x-6"
                  style={{ boxShadow: '0 0 10px rgba(0,255,255,0.5), 0 0 20px rgba(0,255,255,0.3)' }}>
                  <Zap className="w-5 h-5 text-[#00ffff] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ffff00] border border-black transform rotate-45" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#ff00ff] uppercase tracking-widest font-[family-name:var(--font-orbitron)]">
                  {today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, 20XX
                </span>
                <h2 className="text-xl font-black italic tracking-tight text-white"
                  style={{ textShadow: '2px 2px 0 #bc13fe' }}>
                  RADICAL USER
                </h2>
              </div>
            </div>
            <button className="w-10 h-10 bg-gradient-to-br from-[#bc13fe] to-[#2a0052] border border-[#bc13fe]/50 flex items-center justify-center hover:bg-[#bc13fe]/20 transition-colors"
              style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}>
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Timeline Section */}
        <div className="mt-4 px-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-bold text-[#00ffff] uppercase tracking-[0.2em] font-[family-name:var(--font-orbitron)]">Timeline</span>
            <div className="h-px flex-1 bg-[#00ffff]/30" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {weekDays.map((d, i) => (
              <button key={i}
                className={cn(
                  'flex flex-col items-center justify-center min-w-[3.5rem] h-16 shrink-0 transition-all',
                  d.isToday
                    ? 'bg-[#ff00ff] text-black border-2 border-white transform -skew-x-3'
                    : 'bg-[#2a0052]/80 text-[#00ffff] border border-[#00ffff]/30 hover:border-[#00ffff] hover:shadow-[0_0_10px_rgba(0,255,255,0.5)]'
                )}
                style={d.isToday ? { boxShadow: '0 0 10px rgba(255,0,255,0.5), 0 0 20px rgba(255,0,255,0.3)' } : {}}>
                <span className={cn('text-[10px] font-black uppercase', d.isToday ? 'text-black' : 'opacity-70')}>{d.day}</span>
                <span className="text-xl font-black font-[family-name:var(--font-orbitron)]">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* System Status - Segmented Progress */}
        <div className="px-4 mt-6">
          <div className="p-1 border-2 border-[#ffff00] bg-black/40"
            style={{ boxShadow: '4px 4px 0 #ffff00' }}>
            <div className="flex justify-between items-center px-3 pt-2">
              <p className="text-xs font-bold text-[#ffff00] font-[family-name:var(--font-orbitron)] uppercase tracking-wider">System Status</p>
              <p className="text-sm font-black text-[#ffff00] font-[family-name:var(--font-orbitron)]">{Math.round(progressValue)}%</p>
            </div>
            <div className="h-6 w-full bg-[#4d008c] p-1 flex items-center gap-1 mt-2">
              {Array.from({ length: totalSegments }).map((_, i) => (
                <div key={i}
                  className={cn('h-full flex-1', i < filledSegments ? 'bg-[#ff00ff]' : 'bg-[#ff00ff]/30')}
                  style={i < filledSegments ? { boxShadow: '0 0 5px #ff00ff' } : {}} />
              ))}
            </div>
            <p className="text-[10px] text-[#ffff00]/70 px-3 pb-2 mt-1 font-mono">
              {completedToday} / {todayTasks.length} MISSIONS COMPLETE
            </p>
          </div>
        </div>

        {/* Primary Mission Card */}
        {todayTasks.length > 0 && todayTasks[0].status !== 'completed' && (
          <div className="px-4 mt-8">
            <div className="relative group cursor-pointer transform hover:scale-[1.01] transition-transform">
              {/* Offset border effect */}
              <div className="absolute -top-2 -right-2 w-full h-full border-2 border-[#00ffff] bg-transparent z-0" />
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-tr from-[#ff00ff] to-transparent opacity-50 blur-xl" />
              
              <div className="relative z-10 bg-[#2a0052] border-2 border-white pt-20 pb-5 px-5"
                style={{ boxShadow: '8px 8px 0 rgba(0,255,255,0.4)' }}>
                {/* Priority Badge */}
                <div className="absolute top-0 right-4 bg-[#ff00ff] text-white px-3 py-1 text-[10px] font-black font-[family-name:var(--font-orbitron)] uppercase tracking-widest transform -skew-x-[15deg] border-b-2 border-l-2 border-black"
                  style={{ boxShadow: '2px 2px 0 black' }}>
                  Primary Mission
                </div>
                
                <div className="flex items-end justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 bg-[#00ffff] animate-pulse" />
                      <p className="text-[#00ffff] text-xs font-bold uppercase tracking-[0.2em] font-[family-name:var(--font-orbitron)]">Target Acquired</p>
                    </div>
                    <p className="text-white text-2xl font-black leading-none font-[family-name:var(--font-orbitron)] italic"
                      style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.5)' }}>
                      {todayTasks[0].title.toUpperCase()}
                    </p>
                    {todayTasks[0].dueDate && (
                      <div className="flex items-center gap-2 mt-3 bg-black/50 w-fit px-2 py-1 border border-white/20">
                        <Clock className="w-4 h-4 text-[#ffff00]" />
                        <p className="text-[#ffff00] text-sm font-bold font-mono">
                          {new Date(todayTasks[0].dueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    )}
                  </div>
                  <Link href="/tasks">
                    <div className="bg-gradient-to-br from-[#00ffff] to-blue-600 border border-white p-3 text-white hover:translate-y-1 hover:translate-x-1 transition-all"
                      style={{ boxShadow: '4px 4px 0 black' }}>
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Credits Section */}
        <div className="px-4 mt-10">
          <div className="relative p-5 bg-[#2a0052] border-2 border-[#bc13fe]"
            style={{ boxShadow: '0 0 15px rgba(188,19,254,0.3)' }}>
            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(188,19,254,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(188,19,254,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-orbitron)] uppercase tracking-wider flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-[#bc13fe]" />
                    Credits
                  </h3>
                  <p className="text-xs text-[#bc13fe]/80 mt-1 font-mono">CYCLE: {today.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()}</p>
                </div>
                <Link href="/financial">
                  <button className="text-black text-xs font-black uppercase tracking-wide px-4 py-1 bg-[#bc13fe] hover:bg-white transition-colors border-2 border-transparent hover:border-[#bc13fe]">
                    Info
                  </button>
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1 border-l-4 border-[#00ffff] pl-3 bg-black/30 py-2">
                  <span className="text-[10px] text-[#00ffff]/70 font-bold uppercase tracking-wider">Income</span>
                  <span className="text-2xl font-black text-white font-[family-name:var(--font-orbitron)] tracking-wide">
                    {formatCurrency(monthIncome)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-l-4 border-[#ff00ff] pl-3 bg-black/30 py-2">
                  <span className="text-[10px] text-[#ff00ff]/70 font-bold uppercase tracking-wider">Expenses</span>
                  <span className="text-2xl font-black text-gray-400 font-[family-name:var(--font-orbitron)] tracking-wide">
                    {formatCurrency(monthExpense)}
                  </span>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="flex items-end gap-1.5 h-16 border-b-2 border-[#bc13fe]/50 pb-0 px-2 bg-black/20">
                {[30, 50, 40, 60, 45, 85, 20].map((h, i) => (
                  <div key={i}
                    className={cn('flex-1 border-t border-x transition-all',
                      i === 5 ? 'bg-[#00ffff] border-white' : i >= 3 ? 'bg-[#00ffff]/40 border-[#00ffff]/60' : 'bg-[#bc13fe]/20 border-[#bc13fe]/40')}
                    style={{ height: `${h}%`, ...(i === 5 ? { boxShadow: '0 0 10px #00ffff' } : {}) }} />
                ))}
              </div>

              {/* Balance */}
              <div className="mt-4 pt-4 border-t border-[#bc13fe]/30">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#00ffff] font-bold uppercase tracking-wider">Net Balance</span>
                  <span className={cn('text-xl font-black font-[family-name:var(--font-orbitron)]',
                    balance >= 0 ? 'text-[#00ffff]' : 'text-red-500')}>
                    {formatCurrency(balance)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quest Log */}
        <div className="mt-8 px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-white italic tracking-wide font-[family-name:var(--font-orbitron)]"
              style={{ textShadow: '2px 2px 0 #bc13fe' }}>
              QUEST LOG
            </h3>
            <span className="text-[10px] font-bold text-black bg-[#ffff00] px-3 py-1 border-2 border-white transform rotate-2">
              {pendingTasks} ACTIVE
            </span>
          </div>

          <div className="space-y-3">
            {todayTasks.length === 0 ? (
              <div className="p-8 bg-[#2a0052] border border-[#ff00ff]/30 text-center">
                <Zap className="w-12 h-12 mx-auto text-[#ff00ff]/30 mb-2" />
                <p className="text-[#ff00ff]/50 font-mono">NO_QUESTS_AVAILABLE</p>
              </div>
            ) : (
              todayTasks.slice(0, 3).map((task) => {
                const borderColor = task.status === 'completed' ? '#00ff00' : task.priority === 'high' ? '#ff00ff' : '#00ffff';
                return (
                  <div key={task.id}
                    className={cn('group flex items-center gap-4 p-4 bg-[#2a0052] border transition-all cursor-pointer relative overflow-hidden',
                      task.status === 'completed' ? 'border-[#00ff00]/30 opacity-60' : `border-[${borderColor}]/30 hover:border-[${borderColor}]`)}>
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-2 transition-all"
                      style={{ backgroundColor: borderColor }} />
                    
                    {/* Checkbox */}
                    <button onClick={() => {}} 
                      className={cn('w-6 h-6 border-2 flex items-center justify-center shrink-0 transition-all',
                        task.status === 'completed' ? 'border-[#00ff00] bg-[#00ff00]' : `border-[${borderColor}]`)}>
                      {task.status === 'completed' && <span className="text-black font-bold text-sm">✓</span>}
                    </button>

                    <div className="flex-1 min-w-0">
                      <span className={cn('text-base font-bold font-[family-name:var(--font-orbitron)] tracking-wide transition-colors',
                        task.status === 'completed' ? 'line-through text-gray-500' : 'text-white group-hover:text-[#00ffff]')}>
                        {task.title}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs font-mono block mt-1" style={{ color: `${borderColor}70` }}>
                          DUE: {new Date(task.dueDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {task.priority === 'high' && task.status !== 'completed' && (
                      <span className="bg-transparent border border-orange-500 text-orange-500 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        !!!
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <Link href="/tasks" className="block mt-4">
            <div className="flex items-center justify-center gap-2 py-3 border-2 border-[#ff00ff] text-[#ff00ff] text-xs font-bold uppercase tracking-wider hover:bg-[#ff00ff] hover:text-black transition-all"
              style={{ boxShadow: '4px 4px 0 rgba(255,0,255,0.3)' }}>
              VIEW ALL QUESTS
              <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Overdue Alert */}
        {overdueTasks > 0 && (
          <div className="px-4 mt-6">
            <div className="p-4 border-2 border-red-500 bg-red-500/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,0,0.1)_10px,rgba(255,0,0,0.1)_20px)]" />
              <div className="relative z-10 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <div>
                  <p className="text-red-500 font-[family-name:var(--font-orbitron)] text-sm font-bold">
                    !!! {overdueTasks} OVERDUE MISSION{overdueTasks > 1 ? 'S' : ''}
                  </p>
                  <p className="text-red-400/60 text-xs font-mono">REQUIRES IMMEDIATE ATTENTION</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 px-4 mt-6">
          <Link href="/tasks">
            <button className="w-full py-4 bg-[#ff00ff] text-black font-[family-name:var(--font-orbitron)] text-sm font-black tracking-wider hover:brightness-110 transition-all border-2 border-white"
              style={{ boxShadow: '4px 4px 0 rgba(0,0,0,0.5)' }}>
              + NEW QUEST
            </button>
          </Link>
          <Link href="/financial">
            <button className="w-full py-4 border-2 border-[#00ffff] text-[#00ffff] font-[family-name:var(--font-orbitron)] text-sm font-black tracking-wider hover:bg-[#00ffff] hover:text-black transition-all"
              style={{ boxShadow: '4px 4px 0 rgba(0,255,255,0.3)' }}>
              + TRANSACTION
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
