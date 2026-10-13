# Stage 1 Foundation (Clean Scope)

## Included in this stage
- Next.js App Router + TypeScript + Tailwind
- `next-intl` routing skeleton for `/{locale}/...` (`ar|en`)
- Default flow to Arabic (`/` -> `/ar`)
- RTL/LTR baseline by locale
- Admin routes without locale (`/admin/...`)
- Admin language cookie toggle
- Owner shell layout with:
  - Top App Bar
  - Drawer on mobile
  - Sidebar on desktop
  - No bottom nav
- Auth page skeletons (UI only):
  - `/{locale}/login`
  - `/{locale}/signup`
  - `/{locale}/forgot-password`
  - `/{locale}/reset-password`
- Onboarding skeleton page (UI only):
  - `/{locale}/onboarding`
- Public menu skeleton route:
  - `/{locale}/menu/[slug]`
- Docs scaffold under `/docs`

## Explicitly NOT included in Stage 1
- Database schema/business models
- Auth backend implementation
- CRUD flows
- Billing/admin approval logic
- RLS policies
- Supabase Storage workflows

## Environment placeholders
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

No secrets are committed.
