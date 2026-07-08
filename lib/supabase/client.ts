import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Subject, Note } from '../types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Singleton instance for browser/client-side usage
let supabaseInstance: SupabaseClient | null = null;

/**
 * Retrieves the singleton Supabase client initialized with environment variables.
 * Designed for client-side queries and RLS-protected operations.
 */
export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn(
        '[@supabase/supabase-js] Credentials missing. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are configured in .env.local'
      );
    }
    
    supabaseInstance = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key', {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return supabaseInstance;
}

// Export a default client instance for immediate import convenience
export const supabase = getSupabaseClient();
