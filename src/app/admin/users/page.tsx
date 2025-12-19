'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Users, 
  Search, 
  MoreHorizontal,
  Mail,
  Calendar,
  Shield,
  Crown,
  User,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
  email?: string;
  memberships: {
    tenant_name: string;
    role: string;
  }[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const supabase = createClient();

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    // Fetch profiles with their tenant memberships
    const { data: profiles } = await supabase
      .from('profiles')
      .select(`
        *,
        tenant_members(
          role,
          tenants(name)
        )
      `)
      .order('created_at', { ascending: false });

    if (profiles) {
      setUsers(profiles.map(p => ({
        ...p,
        memberships: p.tenant_members?.map((tm: { role: string; tenants: { name: string } }) => ({
          tenant_name: tm.tenants?.name || 'Unknown',
          role: tm.role
        })) || []
      })));
    }
    setIsLoading(false);
  }

  const filteredUsers = users.filter(u => 
    u.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="w-3.5 h-3.5" />;
      case 'admin': return <Shield className="w-3.5 h-3.5" />;
      default: return <User className="w-3.5 h-3.5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-amber-500/20 text-amber-400';
      case 'admin': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-600/50 text-slate-300';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Users</h1>
          <p className="text-sm sm:text-base text-slate-400">Manage user accounts and permissions</p>
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-800 rounded-xl border border-slate-700 w-fit">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          <span className="font-medium text-sm sm:text-base">{users.length}</span>
          <span className="text-slate-400 text-sm sm:text-base">total</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4 sm:mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-2.5 sm:py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-slate-400">No users found</div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                    {user.display_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium">{user.display_name || 'Unnamed User'}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {user.id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {user.memberships.length === 0 ? (
                  <span className="text-slate-500 text-xs">No memberships</span>
                ) : (
                  user.memberships.slice(0, 2).map((m, i) => (
                    <span key={i} className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', getRoleColor(m.role))}>
                      {getRoleIcon(m.role)} {m.tenant_name}
                    </span>
                  ))
                )}
                {user.memberships.length > 2 && (
                  <span className="px-2 py-0.5 bg-slate-600/50 rounded-full text-xs text-slate-300">+{user.memberships.length - 2}</span>
                )}
                <span className="flex items-center gap-1 text-xs text-slate-400 ml-auto">
                  <Calendar className="w-3 h-3" /> {new Date(user.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">User</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Memberships</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Joined</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <Loader2 className="w-6 h-6 text-purple-500 animate-spin mx-auto" />
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                        {user.display_name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium">{user.display_name || 'Unnamed User'}</p>
                        <p className="text-sm text-slate-400 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          {user.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.memberships.length === 0 ? (
                        <span className="text-slate-500 text-sm">No memberships</span>
                      ) : (
                        user.memberships.slice(0, 3).map((m, i) => (
                          <span
                            key={i}
                            className={cn(
                              'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                              getRoleColor(m.role)
                            )}
                          >
                            {getRoleIcon(m.role)}
                            {m.tenant_name}
                          </span>
                        ))
                      )}
                      {user.memberships.length > 3 && (
                        <span className="px-2.5 py-1 bg-slate-600/50 rounded-full text-xs text-slate-300">
                          +{user.memberships.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors">
                      <MoreHorizontal className="w-5 h-5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
