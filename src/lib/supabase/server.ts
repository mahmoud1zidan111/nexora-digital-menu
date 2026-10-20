import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {assertSupabasePublicEnv} from './env';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  const {supabaseUrl, supabaseAnonKey} = assertSupabasePublicEnv();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({name, value, options}) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components are read-only; middleware and Server Actions persist refreshed cookies.
        }
      },
    },
  });
}

export async function getUser() {
  const supabase = await createServerSupabaseClient();
  const {data, error} = await supabase.auth.getUser();

  if (error && error.name !== 'AuthSessionMissingError') {
    throw new Error('Unable to verify the current Supabase user.', {cause: error});
  }

  return data.user;
}

export async function getSession() {
  const supabase = await createServerSupabaseClient();
  const {data, error} = await supabase.auth.getSession();

  if (error) {
    throw new Error('Unable to read the current Supabase session.', {cause: error});
  }

  return data.session;
}

export async function isAdminUser(userId: string) {
  const supabase = await createServerSupabaseClient();
  const {data, error} = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    throw new Error('Unable to verify the current user administrator role.', {cause: error});
  }

  return data?.is_admin === true;
}
