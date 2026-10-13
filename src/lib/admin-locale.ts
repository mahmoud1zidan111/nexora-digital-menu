import {cookies} from 'next/headers';

export const ADMIN_LOCALE_COOKIE = 'admin_locale';
export type AdminLocale = 'ar' | 'en';

export async function getAdminLocale(): Promise<AdminLocale> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ADMIN_LOCALE_COOKIE)?.value;

  return raw === 'en' ? 'en' : 'ar';
}

export function getAdminDirection(locale: AdminLocale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
