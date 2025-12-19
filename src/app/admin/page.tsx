'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Building2, 
  Users, 
  CheckSquare, 
  DollarSign,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardStats {
  totalTenants: number;
  totalUsers: number;
  totalTasks: number;
  totalTransactions: number;
  recentActivity: {
    type: string;
    description: string;
    time: string;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTenants: 0,
    totalUsers: 0,
    totalTasks: 0,
    totalTransactions: 0,
    recentActivity: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchStats() {
      // Fetch counts
      const [tenantsRes, usersRes, tasksRes, transactionsRes] = await Promise.all([
        supabase.from('tenants').select('id', { count: 'exact', head: true }),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('tasks').select('id', { count: 'exact', head: true }),
        supabase.from('transactions').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        totalTenants: tenantsRes.count || 0,
        totalUsers: usersRes.count || 0,
        totalTasks: tasksRes.count || 0,
        totalTransactions: transactionsRes.count || 0,
        recentActivity: [
          { type: 'user', description: 'New user registered', time: '2 min ago' },
          { type: 'tenant', description: 'Tenant "Acme Corp" created', time: '15 min ago' },
          { type: 'task', description: '5 tasks completed today', time: '1 hour ago' },
        ],
      });
      setIsLoading(false);
    }

    fetchStats();
  }, [supabase]);

  const statCards = [
    { 
      label: 'Total Tenants', 
      value: stats.totalTenants, 
      icon: Building2, 
      color: 'from-purple-500 to-purple-600',
      change: '+12%',
      positive: true
    },
    { 
      label: 'Total Users', 
      value: stats.totalUsers, 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      change: '+8%',
      positive: true
    },
    { 
      label: 'Total Tasks', 
      value: stats.totalTasks, 
      icon: CheckSquare, 
      color: 'from-green-500 to-green-600',
      change: '+23%',
      positive: true
    },
    { 
      label: 'Transactions', 
      value: stats.totalTransactions, 
      icon: DollarSign, 
      color: 'from-amber-500 to-amber-600',
      change: '-5%',
      positive: false
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-400">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-slate-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-4">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className={`flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" /> : <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1">
                {isLoading ? '...' : stat.value.toLocaleString()}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm truncate">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Recent Activity
            </h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 bg-slate-700/50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  {activity.type === 'user' && <Users className="w-5 h-5 text-purple-400" />}
                  {activity.type === 'tenant' && <Building2 className="w-5 h-5 text-blue-400" />}
                  {activity.type === 'task' && <CheckSquare className="w-5 h-5 text-green-400" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Quick Stats
            </h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-700/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Active Users (24h)</span>
                <span className="font-semibold text-green-400">+15%</span>
              </div>
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
              </div>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Task Completion</span>
                <span className="font-semibold text-blue-400">68%</span>
              </div>
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
              </div>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400">Storage Used</span>
                <span className="font-semibold text-amber-400">42%</span>
              </div>
              <div className="h-2 bg-slate-600 rounded-full overflow-hidden">
                <div className="h-full w-2/5 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
