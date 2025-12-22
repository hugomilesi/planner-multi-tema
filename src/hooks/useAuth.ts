'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  timezone: string | null;
}

interface TenantMembership {
  tenant_id: string;
  role: string;
  tenant: {
    id: string;
    name: string;
    slug: string;
  };
}

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  tenantId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    tenantId: null,
    isLoading: true,
    isAuthenticated: false,
  });
  
  const router = useRouter();
  const supabase = createClient();

  const fetchUserData = useCallback(async (user: User) => {
    try {
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Fetch tenant membership
      const { data: membership } = await supabase
        .from('tenant_members')
        .select(`
          tenant_id,
          role,
          tenant:tenants (
            id,
            name,
            slug
          )
        `)
        .eq('user_id', user.id)
        .limit(1)
        .single();

      const tenantId = membership?.tenant_id || null;

      setState({
        user,
        profile: profile || null,
        tenantId,
        isLoading: false,
        isAuthenticated: true,
      });

      return { profile, tenantId };
    } catch (error) {
      console.error('Error fetching user data:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return { profile: null, tenantId: null };
    }
  }, [supabase]);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        await fetchUserData(user);
      } else {
        setState({
          user: null,
          profile: null,
          tenantId: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserData(session.user);
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            profile: null,
            tenantId: null,
            isLoading: false,
            isAuthenticated: false,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, fetchUserData]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }, [supabase, router]);

  const refreshUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await fetchUserData(user);
    }
  }, [supabase, fetchUserData]);

  return {
    ...state,
    signOut,
    refreshUser,
  };
}
