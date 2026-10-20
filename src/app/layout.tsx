import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {headers} from 'next/headers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexora Digital Menu',
  description: 'Multi-tenant digital menu SaaS foundation',
};

export default async function RootLayout({children}: {children: ReactNode}) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get('x-nexora-locale') === 'en' ? 'en' : 'ar';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
