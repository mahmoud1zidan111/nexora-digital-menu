import {createClient} from '@supabase/supabase-js';
import {cookies} from 'next/headers';
import {assertSupabasePublicEnv} from './env';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const {supabaseUrl, supabaseAnonKey} = assertSupabasePublicEnv();

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Cookie: cookieStore
          .getAll()
          .map(({name, value}) => `${name}=${value}`)
          .join('; '),
      },
    },
  });
}
