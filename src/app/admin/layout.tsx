import type {ReactNode} from 'react';
import {getAdminDirection, getAdminLocale} from '@/lib/admin-locale';
import {AdminLanguageToggle} from '@/components/admin/admin-language-toggle';

export default async function AdminLayout({children}: {children: ReactNode}) {
  const locale = await getAdminLocale();
  const dir = getAdminDirection(locale);

  return (
    <div lang={locale} dir={dir} className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <p className="font-semibold">Admin Panel</p>
          <AdminLanguageToggle locale={locale} />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
