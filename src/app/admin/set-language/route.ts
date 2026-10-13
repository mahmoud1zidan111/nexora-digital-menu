import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';
import {ADMIN_LOCALE_COOKIE} from '@/lib/admin-locale';

export async function POST(request: Request) {
  const formData = await request.formData();
  const locale = formData.get('locale');
  const resolvedLocale = locale === 'en' ? 'en' : 'ar';

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_LOCALE_COOKIE, resolvedLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  const referer = request.headers.get('referer');
  return NextResponse.redirect(referer ?? '/admin', {status: 303});
}
