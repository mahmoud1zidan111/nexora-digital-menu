'use client';

import {useActionState} from 'react';
import {LoaderCircle, LockKeyhole, Mail, UserRound} from 'lucide-react';
import {loginAction, signupAction} from '@/app/[locale]/auth-actions';
import type {AppLocale} from '@/lib/auth/redirect';

type AuthMode = 'login' | 'signup';

export function AuthForm({
  mode,
  locale,
  nextPath,
  labels,
}: {
  mode: AuthMode;
  locale: AppLocale;
  nextPath: string;
  labels: {
    fullName: string;
    email: string;
    password: string;
    passwordHint: string;
    submit: string;
    pending: string;
    errors: Record<string, string>;
    emailConfirmation: string;
  };
}) {
  const action = mode === 'login' ? loginAction : signupAction;
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="next" value={nextPath} />

      {mode === 'signup' && (
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold text-slate-700">{labels.fullName}</span>
          <span className="relative block">
            <UserRound
              aria-hidden="true"
              className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              autoComplete="name"
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pe-3 ps-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              name="full_name"
              type="text"
              maxLength={120}
            />
          </span>
        </label>
      )}

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-slate-700">{labels.email}</span>
        <span className="relative block">
          <Mail
            aria-hidden="true"
            className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={17}
          />
          <input
            autoComplete="email"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pe-3 ps-10 text-left text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            dir="ltr"
            name="email"
            type="email"
            required
            maxLength={320}
          />
        </span>
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-semibold text-slate-700">{labels.password}</span>
        <span className="relative block">
          <LockKeyhole
            aria-hidden="true"
            className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={17}
          />
          <input
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pe-3 ps-10 text-left text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            dir="ltr"
            name="password"
            type="password"
            minLength={mode === 'signup' ? 8 : undefined}
            required
          />
        </span>
        {mode === 'signup' && <span className="block text-xs text-slate-400">{labels.passwordHint}</span>}
      </label>

      {state.error && (
        <p
          aria-live="polite"
          className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm leading-6 text-red-700"
          role="alert"
        >
          {labels.errors[state.error] ?? labels.errors.genericError}
        </p>
      )}
      {state.notice && (
        <p
          aria-live="polite"
          className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-sm leading-6 text-emerald-800"
          role="status"
        >
          {state.notice === 'emailConfirmation' ? labels.emailConfirmation : labels.errors.genericError}
        </p>
      )}

      <button
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1357d5] px-4 text-sm font-bold text-white shadow-sm shadow-blue-200 transition hover:bg-[#1049b7] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        type="submit"
      >
        {isPending && <LoaderCircle aria-hidden="true" className="animate-spin" size={17} />}
        {isPending ? labels.pending : labels.submit}
      </button>
    </form>
  );
}
