'use client';

import {createBrowserClient} from '@supabase/ssr';
import {assertSupabasePublicEnv} from './env';

export function createBrowserSupabaseClient() {
  const {supabaseUrl, supabaseAnonKey} = assertSupabasePublicEnv();
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
