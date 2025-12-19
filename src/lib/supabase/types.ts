export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string;
          name: string;
          slug: string;
          plan: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          plan?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          plan?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          timezone: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          timezone?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          timezone?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      tenant_members: {
        Row: {
          tenant_id: string;
          user_id: string;
          role: string;
          created_at: string | null;
        };
        Insert: {
          tenant_id: string;
          user_id: string;
          role?: string;
          created_at?: string | null;
        };
        Update: {
          tenant_id?: string;
          user_id?: string;
          role?: string;
          created_at?: string | null;
        };
      };
      user_settings: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          theme_id: string | null;
          currency: string | null;
          week_start: string | null;
          reduce_motion: boolean | null;
          notifications_enabled: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          theme_id?: string | null;
          currency?: string | null;
          week_start?: string | null;
          reduce_motion?: boolean | null;
          notifications_enabled?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          theme_id?: string | null;
          currency?: string | null;
          week_start?: string | null;
          reduce_motion?: boolean | null;
          notifications_enabled?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      categories: {
        Row: {
          id: string;
          tenant_id: string | null;
          user_id: string | null;
          name: string;
          type: string;
          icon: string | null;
          color: string | null;
          is_default: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          tenant_id?: string | null;
          user_id?: string | null;
          name: string;
          type: string;
          icon?: string | null;
          color?: string | null;
          is_default?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string | null;
          user_id?: string | null;
          name?: string;
          type?: string;
          icon?: string | null;
          color?: string | null;
          is_default?: boolean | null;
          created_at?: string | null;
        };
      };
      tasks: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          title: string;
          description: string | null;
          status: string;
          priority: string | null;
          due_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          title: string;
          description?: string | null;
          status?: string;
          priority?: string | null;
          due_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          status?: string;
          priority?: string | null;
          due_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      budgets: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          category_id: string | null;
          limit_amount: number;
          period_start: string;
          period_end: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          category_id?: string | null;
          limit_amount: number;
          period_start: string;
          period_end: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          category_id?: string | null;
          limit_amount?: number;
          period_start?: string;
          period_end?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      transactions: {
        Row: {
          id: string;
          tenant_id: string;
          user_id: string;
          category_id: string | null;
          type: string;
          amount: number;
          date: string;
          note: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          tenant_id: string;
          user_id: string;
          category_id?: string | null;
          type: string;
          amount: number;
          date: string;
          note?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          tenant_id?: string;
          user_id?: string;
          category_id?: string | null;
          type?: string;
          amount?: number;
          date?: string;
          note?: string | null;
          created_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
