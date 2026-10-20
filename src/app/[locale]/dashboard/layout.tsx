import Link from 'next/link';
import {headers} from 'next/headers';
import {notFound, redirect} from 'next/navigation';
import type {ReactNode} from 'react';
import {
  LogOut,
  Menu,
  UtensilsCrossed,
} from 'lucide-react';
import {getTranslations} from 'next-intl/server';
import {logoutAction} from '@/app/[locale]/auth-actions';
import {OwnerDashboardNavigation} from '@/components/owner-dashboard-navigation';
import {getSafeDashboardRedirect, isAppLocale} from '@/lib/auth/redirect';
import {getUser} from '@/lib/supabase/server';

export default async function OwnerDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale: requestedLocale} = await params;
  if (!isAppLocale(requestedLocale)) {
    notFound();
  }
  const locale = requestedLocale;
  const [user, requestHeaders, t] = await Promise.all([
    getUser(),
    headers(),
    getTranslations('owner'),
  ]);
  const navigationLabels = {
    dashboard: t('dashboard'),
    categories: t('categories'),
    products: t('products'),
    appearance: t('appearance'),
    billing: t('billing'),
    menu: t('menu'),
  };

  if (!user) {
    const currentPath = getSafeDashboardRedirect(
      locale,
      requestHeaders.get('x-nexora-pathname') ?? undefined
    );
    redirect(`/${locale}/login?next=${encodeURIComponent(currentPath)}`);
  }

  return (
    <div className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <details className="group relative lg:hidden">
              <summary
                aria-label={t('openMenu')}
                className="grid size-10 list-none cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm [&::-webkit-details-marker]:hidden"
              >
                <Menu size={19} />
              </summary>
              <div className="absolute start-0 top-12 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
                <div className="mb-3 flex items-center gap-2 border-b border-slate-100 px-2 pb-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-blue-50 text-[#1357d5]">
                    <UtensilsCrossed size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold">Nexora</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <OwnerDashboardNavigation
                  locale={locale}
                  labels={navigationLabels}
                  navigationLabel={t('navigation')}
                />
              </div>
            </details>
            <Link href={`/${locale}/dashboard`} className="flex shrink-0 items-center gap-2">
              <span className="grid size-9 place-items-center rounded-xl bg-[#1357d5] text-white">
                <UtensilsCrossed size={17} />
              </span>
              <span className="text-sm font-extrabold tracking-tight">Nexora</span>
            </Link>
            <span className="hidden h-7 w-px bg-slate-200 sm:block" />
            <div className="hidden min-w-0 text-end sm:block">
              <p className="truncate text-sm font-bold">{t('dashboard')}</p>
              <p className="truncate text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          <form action={logoutAction} className="shrink-0">
            <input type="hidden" name="locale" value={locale} />
            <button
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
              type="submit"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">{t('logout')}</span>
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-5 px-4 py-6 sm:px-7 lg:grid-cols-[minmax(0,1fr)_296px] lg:gap-7 lg:py-8">
        <main className="min-w-0">{children}</main>
        <aside className="hidden self-start rounded-[20px] border border-slate-200/80 bg-white p-4 shadow-sm lg:sticky lg:top-[100px] lg:block">
          <div className="mb-3 px-3 pt-2">
            <p className="text-xs font-bold tracking-wide text-slate-400">
              {t('navigation')}
            </p>
          </div>
          <OwnerDashboardNavigation
            locale={locale}
            labels={navigationLabels}
            navigationLabel={t('navigation')}
          />
        </aside>
      </div>
    </div>
  );
}
