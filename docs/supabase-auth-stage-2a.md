# Supabase Auth — Stage 2A

## Configure the project

1. In the Supabase dashboard, open **Project Settings → API** and copy the project URL and publishable/anon key.
2. Set these values in `.env.local` (and in the deployment environment):

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-or-anon-key
   ```

   These are the only Supabase keys used by the application. Never put a `service_role` or secret key in a `NEXT_PUBLIC_*` variable or client code.

3. In **SQL Editor**, run [`supabase-auth-stage-2a.sql`](./supabase-auth-stage-2a.sql).
4. In **Authentication → URL Configuration**, set the local Site URL to `http://localhost:3000` and add the deployed URL when publishing. Configure email confirmation according to the product's account policy.
5. Restart the Next.js development server after changing environment values.

The SQL creates `public.profiles`, owner-only select/insert/update policies, a profile-on-signup trigger, timestamp maintenance, and a guard that prevents authenticated users from setting or changing their own `is_admin` flag. Existing auth users receive a profile row when the migration is run.

To grant an administrator, use the Supabase SQL Editor with a trusted project-owner connection:

```sql
update public.profiles
set is_admin = true
where id = (
  select id
  from auth.users
  where email = 'admin@example.com'
);
```

Do not grant the role through a client request or expose a service key to the application.

## Local verification

1. Run `npm run dev` and open `/ar/signup` (or `/en/signup`).
2. Create an account. If email confirmation is enabled, confirm the email before signing in; otherwise the app takes you directly to the dashboard.
3. Open `/ar/dashboard` in a private browser window. It should redirect to `/ar/login?next=...`; sign in and verify it returns to the requested dashboard path.
4. Use **تسجيل الخروج / Sign out** and verify that `/ar/dashboard` redirects back to login.
5. Open `/admin` as a regular account; it must redirect to the owner dashboard. Promote a test account with the trusted SQL above, sign in as that account, and verify `/admin` loads.
6. Change the admin language using the cookie toggle and verify the route remains `/admin` (no locale segment).

The SQL can be rerun safely for an existing project: policies and triggers are replaced, and profile backfill skips rows that already exist.
