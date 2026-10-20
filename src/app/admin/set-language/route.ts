import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {redirect} from 'next/navigation';
import {ADMIN_LOCALE_COOKIE, getAdminLocale} from '@/lib/admin-locale';
import {getUser, isAdminUser} from '@/lib/supabase/server';

export async function POST(request: Request) {
  const user = await getUser();
  const localeForRedirect = await getAdminLocale();

  if (!user) {
    redirect(`/${localeForRedirect}/login?next=${encodeURIComponent('/admin')}`);
  }

  if (!(await isAdminUser(user.id))) {
    redirect(`/${localeForRedirect}/dashboard?error=admin_required`);
  }

  const formData = await request.formData();
  const locale = formData.get('locale');
  if (locale !== 'en' && locale !== 'ar') {
    return NextResponse.json({error: 'Invalid locale.'}, {status: 400});
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return NextResponse.redirect(new URL('/admin', request.url), {status: 303});
}
