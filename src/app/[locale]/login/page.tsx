import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

export default async function LoginPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations();

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md place-items-center px-4 py-10">
      <section className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-5 text-2xl font-bold text-slate-900">{t('auth.login')}</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block space-y-1">
            <span className="text-sm text-slate-600">Email</span>
            <input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-slate-600">Password</span>
            <input type="password" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-white">{t('auth.login')}</button>
        </form>

        <div className="mt-4 flex items-center justify-between text-sm">
          <Link className="text-indigo-600 hover:underline" href={`/${locale}/forgot-password`}>
            {t('auth.forgot')}
          </Link>
          <Link className="text-slate-600 hover:underline" href={`/${locale}/signup`}>
            {t('auth.signup')}
          </Link>
        </div>
      </section>
    </main>
  );
}
