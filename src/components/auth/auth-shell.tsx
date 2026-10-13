import type {ReactNode} from 'react';

export function AuthShell({title, children}: {title: string; children: ReactNode}) {
  return (
    <main className="mx-auto grid min-h-screen w-full max-w-md place-items-center px-4 py-10">
      <section className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h1 className="mb-5 text-2xl font-bold text-slate-900">{title}</h1>
        {children}
      </section>
    </main>
  );
}
