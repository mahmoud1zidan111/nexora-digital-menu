import type {ReactNode} from 'react';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import {LayoutDashboard, LogOut, ShieldCheck, UsersRound} from 'lucide-react';
import {AdminLanguageToggle} from '@/components/admin/admin-language-toggle';
import {logoutAction} from '@/app/[locale]/auth-actions';
import {getAdminDirection, getAdminLocale} from '@/lib/admin-locale';
import {getUser, isAdminUser} from '@/lib/supabase/server';

export default async function AdminLayout({children}: {children: ReactNode}) {
  const locale = await getAdminLocale();
  const direction = getAdminDirection(locale);
  const user = await getUser();

  if (!user) {
    redirect(`/${locale}/login?next=${encodeURIComponent('/admin')}`);
  }

  if (!(await isAdminUser(user.id))) {
    redirect(`/${locale}/dashboard?error=admin_required`);
  }

  const labels =
    locale === 'ar'
      ? {
          title: 'لوحة الإدارة',
          subtitle: 'إدارة Nexora',
          overview: 'نظرة عامة',
          users: 'المستخدمون',
          logout: 'تسجيل الخروج',
          navigation: 'التنقل',
        }
      : {
          title: 'Admin panel',
          subtitle: 'Manage Nexora',
          overview: 'Overview',
          users: 'Users',
          logout: 'Sign out',
          navigation: 'Navigation',
        };

  return (
    <div lang={locale} dir={direction} className="min-h-screen bg-[#f3f6fb] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#1357d5] text-white">
              <ShieldCheck size={19} />
            </span>
            <div>
              <p className="text-sm font-extrabold">{labels.title}</p>
              <p className="text-xs text-slate-500">{labels.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden max-w-48 truncate text-xs text-slate-500 sm:block">
              {user.email}
            </span>
            <AdminLanguageToggle locale={locale} />
            <form action={logoutAction}>
              <input type="hidden" name="locale" value={locale} />
              <button
                aria-label={labels.logout}
                className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                type="submit"
              >
                <LogOut size={17} />
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_250px] lg:gap-6 lg:py-7">
        <main className="min-w-0">{children}</main>
        <aside className="hidden self-start rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm lg:sticky lg:top-[88px] lg:block">
          <p className="mb-3 px-3 pt-2 text-xs font-bold uppercase tracking-wide text-slate-400">
            {labels.navigation}
          </p>
          <nav aria-label={labels.navigation} className="space-y-1">
            <Link
              aria-current="page"
              className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-[#1357d5]"
              href="/admin"
            >
              <LayoutDashboard size={18} />
              {labels.overview}
            </Link>
            <div className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400">
              <UsersRound size={18} />
              {labels.users}
            </div>
          </nav>
        </aside>
      </div>
    </div>
  );
}
