export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

export function assertSupabasePublicEnv() {
  const {supabaseUrl, supabaseAnonKey} = publicEnv;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them in your environment file.'
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(supabaseUrl);
  } catch {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL must be a valid Supabase project URL, for example https://<project-ref>.supabase.co.'
    );
  }

  if (
    (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') ||
    !parsedUrl.hostname ||
    parsedUrl.username ||
    parsedUrl.password
  ) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL must use HTTP or HTTPS and must not contain credentials.'
    );
  }

  return {supabaseUrl, supabaseAnonKey};
}
