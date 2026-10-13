export function AuthFormPlaceholder({
  includeName = false,
  includePasswordConfirm = false,
}: {
  includeName?: boolean;
  includePasswordConfirm?: boolean;
}) {
  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
      {includeName ? (
        <label className="block space-y-1">
          <span className="text-sm text-slate-600">Name</span>
          <input className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring" />
        </label>
      ) : null}

      <label className="block space-y-1">
        <span className="text-sm text-slate-600">Email</span>
        <input type="email" className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring" />
      </label>

      <label className="block space-y-1">
        <span className="text-sm text-slate-600">Password</span>
        <input type="password" className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring" />
      </label>

      {includePasswordConfirm ? (
        <label className="block space-y-1">
          <span className="text-sm text-slate-600">Confirm password</span>
          <input type="password" className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-200 focus:ring" />
        </label>
      ) : null}

      <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-white hover:bg-slate-800">
        Continue
      </button>
    </form>
  );
}
