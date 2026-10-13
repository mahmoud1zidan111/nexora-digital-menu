export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-6">
      <header className="mb-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold">{locale === 'ar' ? 'القائمة العامة' : 'Public Menu'}</h1>
        <p className="mt-2 text-sm text-slate-600">Slug: {slug}</p>
      </header>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        {locale === 'ar' ? 'واجهة Public Menu Skeleton للمرحلة الأولى.' : 'Public menu skeleton placeholder for Stage 1.'}
      </section>
    </main>
  );
}
