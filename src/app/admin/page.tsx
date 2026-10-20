export default function AdminHomePage() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
        <span className="size-2 rounded-full bg-emerald-500" />
        Authenticated administrator
      </div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Nexora Admin</h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
        Your administrator session is protected by Supabase Auth and the profiles row-level security policy.
      </p>
      <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 text-sm leading-6 text-blue-900">
        Stage 2A enables authentication and administrator access. Restaurant, menu, and billing
        management are intentionally outside this stage.
      </div>
    </section>
  );
}
