# Route Map (Stage 1 Only)

## Root
- `/` -> redirects to `/ar`

## Localized (`ar|en`)
- `/{locale}`
- `/{locale}/login`
- `/{locale}/signup`
- `/{locale}/forgot-password`
- `/{locale}/reset-password`
- `/{locale}/onboarding`
- `/{locale}/dashboard`
- `/{locale}/dashboard/categories`
- `/{locale}/dashboard/products`
- `/{locale}/dashboard/appearance`
- `/{locale}/dashboard/billing`
- `/{locale}/dashboard/menu`
- `/{locale}/menu/[slug]`

## Admin (no locale)
- `/admin`
- `/admin/set-language` (POST)

## API
- `/api/health`
