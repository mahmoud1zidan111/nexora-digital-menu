import Link from 'next/link';
import {getTranslations} from 'next-intl/server';

export default async function SignupPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations();

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md place-items-center px-4 py-10">
      <section className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-5 text-2xl font-bold text-slate-900">{t('auth.signup')}</h1>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block space-y-1">
            <span className="text-sm text-slate-600">Full name</span>
            <input className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-slate-600">Email</span>
            <input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-slate-600">Password</span>
            <input type="password" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-white">{t('auth.signup')}</button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          <Link className="text-indigo-600 hover:underline" href={`/${locale}/login`}>
            {t('auth.login')}
          </Link>
        </p>
      </section>
    </main>
  );
}
