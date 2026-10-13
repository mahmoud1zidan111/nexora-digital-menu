import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nexora Digital Menu',
  description: 'Multi-tenant digital menu SaaS foundation',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
