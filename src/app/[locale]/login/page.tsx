import Link from 'next/link';
import {notFound, redirect} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {AuthForm} from '@/components/auth/auth-form';
import {AuthShell} from '@/components/auth/auth-shell';
import {getSafeDashboardRedirect, isAppLocale} from '@/lib/auth/redirect';
import {getUser} from '@/lib/supabase/server';

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{next?: string | string[]}>;
}) {
  const [{locale: requestedLocale}, query] = await Promise.all([params, searchParams]);
  if (!isAppLocale(requestedLocale)) notFound();
  const locale = requestedLocale;
  const nextPath = Array.isArray(query.next) ? query.next[0] : query.next;
  const destination = getSafeDashboardRedirect(locale, nextPath);

  if (await getUser()) {
    redirect(destination);
  }

  const t = await getTranslations('auth');

  return (
    <AuthShell
      locale={locale}
      currentPath="login"
      title={t('login')}
      description={t('loginDescription')}
      switchHref={`/${locale}/signup`}
      switchPrompt={t('noAccount')}
      switchLabel={t('signup')}
    >
      <AuthForm
        mode="login"
        locale={locale}
        nextPath={destination}
        labels={{
          fullName: t('fullName'),
          email: t('email'),
          password: t('password'),
          passwordHint: t('passwordHint'),
          submit: t('login'),
          pending: t('loggingIn'),
          emailConfirmation: t('emailConfirmation'),
          errors: {
            invalidCredentials: t('invalidCredentials'),
            emailNotConfirmed: t('emailNotConfirmed'),
            emailAlreadyRegistered: t('emailAlreadyRegistered'),
            weakPassword: t('weakPassword'),
            invalidEmail: t('invalidEmail'),
            genericError: t('genericError'),
          },
        }}
      />
      <div className="mt-4 text-center text-sm">
        <Link
          className="font-semibold text-slate-500 underline-offset-4 hover:text-[#1357d5] hover:underline"
          href={`/${locale}/forgot-password`}
        >
          {t('forgot')}
        </Link>
      </div>
    </AuthShell>
  );
}
