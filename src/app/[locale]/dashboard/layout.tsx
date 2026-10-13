import Link from 'next/link';
import type {ReactNode} from 'react';
import {Menu} from 'lucide-react';

const navItems = [
  {label: 'Dashboard', href: '/dashboard'},
  {label: 'Categories', href: '/dashboard/categories'},
  {label: 'Products', href: '/dashboard/products'},
  {label: 'Appearance', href: '/dashboard/appearance'},
  {label: 'Billing', href: '/dashboard/billing'},
  {label: 'Menu Link', href: '/dashboard/menu'},
] as const;

export default async function OwnerDashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2">
            <details className="relative md:hidden">
              <summary className="flex list-none cursor-pointer items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-700">
                <Menu size={16} />
              </summary>
              <nav className="absolute mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                {navItems.map((item) => (
                  <Link key={item.href} href={`/${locale}${item.href}`} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                    {item.label}
                  </Link>
                ))}
              </nav>
            </details>
            <p className="font-semibold">Owner Dashboard</p>
          </div>
          <Link href={`/${locale}/login`} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm text-white">
            Login
          </Link>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-3 py-4 sm:px-4 md:grid-cols-[240px_1fr]">
        <aside className="hidden rounded-2xl border border-slate-200 bg-white p-3 md:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={`/${locale}${item.href}`} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </div>
  );
}
