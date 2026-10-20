'use server';

import {redirect} from 'next/navigation';
import {getSafeDashboardRedirect, isAppLocale, type AppLocale} from '@/lib/auth/redirect';
import {createServerSupabaseClient} from '@/lib/supabase/server';

export type AuthActionState = {
  error?: string;
  notice?: string;
};

function readLocale(formData: FormData): AppLocale {
  const value = formData.get('locale');
  return typeof value === 'string' && isAppLocale(value) ? value : 'ar';
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function getAuthErrorKey(code: string | undefined) {
  switch (code) {
    case 'invalid_credentials':
      return 'invalidCredentials';
    case 'email_not_confirmed':
      return 'emailNotConfirmed';
    case 'email_exists':
    case 'user_already_exists':
      return 'emailAlreadyRegistered';
    case 'weak_password':
      return 'weakPassword';
    case 'validation_failed':
      return 'invalidEmail';
    default:
      return 'genericError';
  }
}

export async function loginAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const locale = readLocale(formData);
  const email = readText(formData, 'email');
  const password = readText(formData, 'password');

  if (!email || !email.includes('@')) {
    return {error: 'invalidEmail'};
  }

  if (!password) {
    return {error: 'genericError'};
  }

  const supabase = await createServerSupabaseClient();
  const {error} = await supabase.auth.signInWithPassword({email, password});

  if (error) {
    return {error: getAuthErrorKey(error.code)};
  }

  redirect(getSafeDashboardRedirect(locale, readText(formData, 'next')));
}

export async function signupAction(
  _previousState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const locale = readLocale(formData);
  const email = readText(formData, 'email');
  const password = readText(formData, 'password');
  const fullName = readText(formData, 'full_name');

  if (!email || !email.includes('@')) {
    return {error: 'invalidEmail'};
  }

  if (password.length < 8) {
    return {error: 'weakPassword'};
  }

  const supabase = await createServerSupabaseClient();
  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: fullName ? {full_name: fullName} : {},
    },
  });

  if (error) {
    return {error: getAuthErrorKey(error.code)};
  }

  if (data.session) {
    redirect(getSafeDashboardRedirect(locale, readText(formData, 'next')));
  }

  return data.user ? {notice: 'emailConfirmation'} : {error: 'genericError'};
}

export async function logoutAction(formData: FormData) {
  const locale = readLocale(formData);
  const supabase = await createServerSupabaseClient();
  const {error} = await supabase.auth.signOut();

  if (error) {
    throw new Error('Unable to sign out from Supabase.', {cause: error});
  }

  redirect(`/${locale}/login`);
}
