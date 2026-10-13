import type {AdminLocale} from '@/lib/admin-locale';

export function AdminLanguageToggle({locale}: {locale: AdminLocale}) {
  return (
    <form action="/admin/set-language" method="post" className="flex items-center gap-2 text-sm">
      <label htmlFor="admin-locale" className="text-slate-600">
        Language
      </label>
      <select
        id="admin-locale"
        name="locale"
        defaultValue={locale}
        className="rounded-md border border-slate-300 bg-white px-2 py-1"
      >
        <option value="ar">العربية</option>
        <option value="en">English</option>
      </select>
      <button className="rounded-md bg-slate-900 px-3 py-1 text-white">Save</button>
    </form>
  );
}
