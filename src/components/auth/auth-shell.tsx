import Link from 'next/link';
import type {ReactNode} from 'react';
import {ArrowLeftRight, ShieldCheck, UtensilsCrossed} from 'lucide-react';
import type {AppLocale} from '@/lib/auth/redirect';

export function AuthShell({
  locale,
  currentPath,
  title,
  description,
  switchHref,
  switchLabel,
  switchPrompt,
  children,
}: {
  locale: AppLocale;
  currentPath: 'login' | 'signup';
  title: string;
  description: string;
  switchHref: string;
  switchLabel: string;
  switchPrompt: string;
  children: ReactNode;
}) {
  const alternateLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <main className="min-h-screen bg-[#f3f6fb] px-4 py-6 text-slate-900 sm:px-6 sm:py-10">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2.5" aria-label="Nexora home">
          <span className="grid size-10 place-items-center rounded-xl bg-[#1357d5] text-white shadow-sm shadow-blue-200">
            <UtensilsCrossed size={19} strokeWidth={2.2} />
          </span>
          <span>
            <span className="block text-sm font-extrabold tracking-tight">Nexora</span>
            <span className="block text-[10px] font-medium tracking-[0.12em] text-slate-500">
              DIGITAL MENU
            </span>
          </span>
        </Link>
        <Link
          href={`/${alternateLocale}/${currentPath}`}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-[#1357d5]"
          hrefLang={alternateLocale}
        >
          <ArrowLeftRight size={14} />
          {alternateLocale === 'ar' ? 'العربية' : 'English'}
        </Link>
      </header>

      <div className="mx-auto grid w-full max-w-5xl items-stretch gap-5 pt-10 sm:pt-14 lg:grid-cols-[1fr_0.9fr] lg:gap-8">
        <section className="relative hidden overflow-hidden rounded-[28px] bg-[#1357d5] p-10 text-white shadow-xl shadow-blue-950/10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -left-24 -top-24 size-72 rounded-full border-[48px] border-white/5" />
          <div className="absolute -bottom-32 -right-20 size-80 rounded-full border-[58px] border-white/5" />
          <div className="relative">
            <span className="mb-8 grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20">
              <UtensilsCrossed size={25} />
            </span>
            <p className="text-sm font-semibold text-blue-100">Nexora Digital Menu</p>
            <h1 className="mt-4 max-w-md text-4xl font-extrabold leading-tight">
              {locale === 'ar'
                ? 'قائمتك الرقمية تبدأ من هنا'
                : 'Your digital menu starts here'}
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100">
              {locale === 'ar'
                ? 'مساحة واحدة تساعدك على إدارة حضور مطعمك الرقمي بسهولة.'
                : 'One simple workspace to manage your restaurant’s digital presence.'}
            </p>
          </div>
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/15">
              <ShieldCheck size={20} />
            </span>
            <p className="text-xs leading-5 text-blue-50">
              {locale === 'ar'
                ? 'حسابك وبياناتك الخاصة محمية.'
                : 'Your account and private data are protected.'}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md self-center rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_60px_-32px_rgba(15,23,42,0.28)] sm:p-9">
          <div className="mb-7 lg:hidden">
            <span className="mb-5 grid size-12 place-items-center rounded-2xl bg-blue-50 text-[#1357d5]">
              <UtensilsCrossed size={22} />
            </span>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#1357d5]">
            Nexora Workspace
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          <div className="mt-7">{children}</div>
          <p className="mt-7 text-center text-sm text-slate-500">
            {switchPrompt}{' '}
            <Link
              href={switchHref}
              className="font-bold text-[#1357d5] underline-offset-4 hover:underline"
            >
              {switchLabel}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
