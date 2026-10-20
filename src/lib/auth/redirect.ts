export type AppLocale = 'ar' | 'en';

export function isAppLocale(value: string): value is AppLocale {
  return value === 'ar' || value === 'en';
}

export function getSafeDashboardRedirect(locale: AppLocale, candidate?: string) {
  const fallback = `/${locale}/dashboard`;

  if (
    !candidate ||
    candidate.includes('\\') ||
    candidate.startsWith('//') ||
    /[\u0000-\u001f]/.test(candidate)
  ) {
    return fallback;
  }

  const path = candidate.split(/[?#]/, 1)[0];
  return path === fallback || path.startsWith(`${fallback}/`) ? candidate : fallback;
}
