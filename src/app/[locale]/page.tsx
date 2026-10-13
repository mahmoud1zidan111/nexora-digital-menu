import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center gap-6 px-4 py-10">
      <p className="text-sm font-medium text-slate-500">{t('common.appName')}</p>
      <h1 className="text-3xl font-bold text-slate-900">{t('home.title')}</h1>
      <p className="text-slate-600">{t('home.subtitle')}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link className="rounded-xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50" href={`/${locale}/dashboard`}>
          {t('owner.dashboard')}
        </Link>
        <Link className="rounded-xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50" href={`/${locale}/onboarding`}>
          Onboarding
        </Link>
        <Link className="rounded-xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50" href={`/${locale}/menu/demo-slug`}>
          {t('publicMenu.title')}
        </Link>
        <Link className="rounded-xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50" href={`/${locale}/login`}>
          {t('auth.login')}
        </Link>
        <Link className="rounded-xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50" href={`/${locale}/signup`}>
          {t('auth.signup')}
        </Link>
      </div>

      <Link href="/admin" className="text-sm text-slate-500 hover:underline">
        Admin Panel
      </Link>
    </main>
  );
}
