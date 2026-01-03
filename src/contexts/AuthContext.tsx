'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useTaskStore } from '@/stores/taskStore';
import { useFinancialStore } from '@/stores/financialStore';

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  timezone: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  tenantId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const supabase = createClient();

  const taskStore = useTaskStore();
  const financialStore = useFinancialStore();

  const fetchUserData = useCallback(async (authUser: User) => {
    try {
      console.log('Fetching user data for:', authUser.id);

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profileError) console.error('Error fetching profile:', profileError);

      // Fetch tenant membership
      const { data: membership, error: membershipError } = await supabase
        .from('tenant_members')
        .select('tenant_id, role')
        .eq('user_id', authUser.id)
        .limit(1)
        .single();

      if (membershipError) console.error('Error fetching membership:', membershipError);

      const userTenantId = membership?.tenant_id || null;
      console.log('Found tenant ID:', userTenantId);

      setUser(authUser);
      setProfile(profileData || null);
      setTenantId(userTenantId);
      setIsLoading(false);

      // Set context for stores and fetch data
      if (userTenantId) {
        taskStore.setContext(userTenantId, authUser.id);
        financialStore.setContext(userTenantId, authUser.id);

        // Fetch data from database
        await Promise.all([
          taskStore.fetchTasks(),
          financialStore.fetchData(),
        ]);
      }

      return { profile: profileData, tenantId: userTenantId };
    } catch (error) {
      console.error('Error fetching user data:', error);
      setIsLoading(false);
      return { profile: null, tenantId: null };
    }
  }, [supabase, taskStore, financialStore]);

  useEffect(() => {
    let isMounted = true;

    // Use onAuthStateChange as the primary method - it handles INITIAL_SESSION
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          await fetchUserData(session.user);
        } else {
          setUser(null);
          setProfile(null);
          setTenantId(null);
          setIsLoading(false);
          if (event === 'SIGNED_OUT') {
            taskStore.clearTasks();
            financialStore.clearData();
            // Redirect to login after sign out
            navigate('/login');
          }
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = useCallback(async () => {
    try {
      // Clear stores first
      taskStore.clearTasks();
      financialStore.clearData();
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error signing out:', error);
        throw error;
      }
      
      // Clear local state
      setUser(null);
      setProfile(null);
      setTenantId(null);
      
      // Navigate to login - onAuthStateChange will also handle this, but we do it here for immediate feedback
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
      // Even if there's an error, try to navigate to login
      navigate('/login');
    }
  }, [supabase, navigate, taskStore, financialStore]);

  const refreshUser = useCallback(async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      await fetchUserData(authUser);
    }
  }, [supabase, fetchUserData]);

  const value = useMemo(
    () => ({
      user,
      profile,
      tenantId,
      isLoading,
      isAuthenticated: !!user,
      signOut,
      refreshUser,
    }),
    [user, profile, tenantId, isLoading, signOut, refreshUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
