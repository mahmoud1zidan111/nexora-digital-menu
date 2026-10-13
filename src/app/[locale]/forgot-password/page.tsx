import {getTranslations} from 'next-intl/server';

export default async function ForgotPasswordPage() {
  const t = await getTranslations();

  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md place-items-center px-4 py-10">
      <section className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-5 text-2xl font-bold text-slate-900">{t('auth.forgot')}</h1>
        <p className="mb-4 text-sm text-slate-600">سيتم تفعيل استرجاع كلمة المرور عبر البريد في مرحلة لاحقة.</p>
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <label className="block space-y-1">
            <span className="text-sm text-slate-600">Email</span>
            <input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-white">
            Send reset link
          </button>
        </form>
      </section>
    </main>
  );
}
