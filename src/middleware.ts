import {createServerClient} from '@supabase/ssr';
import createMiddleware from 'next-intl/middleware';
import {NextRequest, NextResponse} from 'next/server';
import {routing} from './i18n/routing';
import {assertSupabasePublicEnv} from './lib/supabase/env';

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const isApiRoute = pathname === '/api' || pathname.startsWith('/api/');
  const locale = pathname.match(/^\/(ar|en)(?:\/|$)/)?.[1];
  const adminLocale = request.cookies.get('admin_locale')?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nexora-pathname', `${pathname}${request.nextUrl.search}`);
  requestHeaders.set(
    'x-nexora-locale',
    isAdminRoute ? (adminLocale === 'en' ? 'en' : 'ar') : locale ?? 'ar'
  );

  const forwardedRequest = new NextRequest(request, {headers: requestHeaders});
  let response =
    isAdminRoute || isApiRoute
      ? NextResponse.next({request: {headers: requestHeaders}})
      : intlMiddleware(forwardedRequest);

  const {supabaseUrl, supabaseAnonKey} = assertSupabasePublicEnv();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({name, value, options}) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {error} = await supabase.auth.getUser();
  if (error && error.name !== 'AuthSessionMissingError') {
    throw new Error('Unable to refresh the Supabase session.', {cause: error});
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
