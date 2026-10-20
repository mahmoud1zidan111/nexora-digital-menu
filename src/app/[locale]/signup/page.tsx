import {notFound, redirect} from 'next/navigation';
import {getTranslations} from 'next-intl/server';
import {AuthForm} from '@/components/auth/auth-form';
import {AuthShell} from '@/components/auth/auth-shell';
import {getSafeDashboardRedirect, isAppLocale} from '@/lib/auth/redirect';
import {getUser} from '@/lib/supabase/server';

export default async function SignupPage({
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
      currentPath="signup"
      title={t('signup')}
      description={t('signupDescription')}
      switchHref={`/${locale}/login`}
      switchPrompt={t('haveAccount')}
      switchLabel={t('login')}
    >
      <AuthForm
        mode="signup"
        locale={locale}
        nextPath={destination}
        labels={{
          fullName: t('fullName'),
          email: t('email'),
          password: t('password'),
          passwordHint: t('passwordHint'),
          submit: t('signup'),
          pending: t('creatingAccount'),
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
    </AuthShell>
  );
}
