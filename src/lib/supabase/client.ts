import {createClient} from '@supabase/supabase-js';
import {assertSupabasePublicEnv} from './env';

export function createBrowserSupabaseClient() {
  const {supabaseUrl, supabaseAnonKey} = assertSupabasePublicEnv();

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}
