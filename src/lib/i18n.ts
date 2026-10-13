import {routing} from '@/i18n/routing';

export type AppLocale = (typeof routing.locales)[number];

export function getLocaleDirection(locale: AppLocale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getLocaleLabel(locale: AppLocale) {
  return locale === 'ar' ? 'العربية' : 'English';
}
