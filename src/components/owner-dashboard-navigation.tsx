'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {
  CreditCard,
  LayoutDashboard,
  Link2,
  Package,
  Palette,
  Tags,
} from 'lucide-react';

const navItems = [
  {label: 'dashboard', href: '/dashboard', Icon: LayoutDashboard},
  {label: 'categories', href: '/dashboard/categories', Icon: Tags},
  {label: 'products', href: '/dashboard/products', Icon: Package},
  {label: 'appearance', href: '/dashboard/appearance', Icon: Palette},
  {label: 'billing', href: '/dashboard/billing', Icon: CreditCard},
  {label: 'menu', href: '/dashboard/menu', Icon: Link2},
] as const;

type NavigationLabel = (typeof navItems)[number]['label'];

export function OwnerDashboardNavigation({
  locale,
  labels,
  navigationLabel,
}: {
  locale: string;
  labels: Record<NavigationLabel, string>;
  navigationLabel: string;
}) {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const pathWithoutLocale = normalizedPath.replace(/^\/(ar|en)(?=\/|$)/, '') || '/';

  return (
    <nav aria-label={navigationLabel} className="space-y-1.5">
      {navItems.map(({label, href, Icon}) => {
        const current =
          pathWithoutLocale === href || pathWithoutLocale.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={`/${locale}${href}`}
            aria-current={current ? 'page' : undefined}
            className={`flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
              current
                ? 'bg-[#eef5ff] text-[#1357d5]'
                : 'text-slate-800 hover:bg-slate-50 hover:text-slate-950'
            }`}
          >
            <Icon size={20} strokeWidth={1.9} aria-hidden="true" />
            <span>{labels[label]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
