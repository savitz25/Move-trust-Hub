# Supabase Architecture — Move Trust Hub

**Owner:** savitz25  
**Stack:** Next.js 15 App Router (Vercel) + Supabase PostgreSQL

## Folder structure

```
lib/supabase/
  config.ts          # Env helpers (never expose service role client-side)
  client.ts          # Browser client (@supabase/ssr createBrowserClient)
  server.ts          # Server client (cookies, RSC, Server Actions)
  admin.ts           # Service-role client (admin dashboards, seeds)
  middleware.ts      # Session refresh + /admin auth gate
  queries/
    companies.ts     # React cache() for Server Component reads

actions/
  quotes.ts          # submitQuoteRequest Server Action

lib/quotes/
  schema.ts          # Zod validation
  notify.ts          # Resend + Brevo pipeline
  analytics.ts       # Admin quote metrics

supabase/
  schema.sql         # Baseline schema
  migrations/        # Incremental SQL (run in Supabase SQL Editor)
  functions/
    process-quote/   # Edge Function stub for queues/webhooks
```

## Environment variables (Vercel)

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Publishable anon key (RLS-enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Admin reads, seeds, bypasses RLS |
| `ADMIN_SECRET` | **Server only** | Protects `/admin/*` routes |

Never prefix the service role key or `ADMIN_SECRET` with `NEXT_PUBLIC_`.

## Quote submission flow

1. `QuoteModal` (client) validates UX fields locally.
2. `submitQuoteRequest` Server Action validates with Zod.
3. Server Supabase client inserts into `quote_requests` (anon + RLS insert policy).
4. `sendQuoteNotifications` sends Resend emails + Brevo CRM sync.
5. Structured JSON logs: `quote.submitted`, `quote.notification_processed`.

**Why Server Action?** Prevents client-side tampering, centralizes validation, keeps secrets off the browser, and enables unified logging.

## RLS model

| Table | Public read | Public insert | Admin (service_role) |
|-------|-------------|---------------|----------------------|
| `companies` | ✅ | ❌ | ✅ full |
| `reviews` | ✅ | ❌ | ✅ full |
| `quote_requests` | ❌ | ✅ validated insert | ✅ full |
| `saved_quotes` | ❌ (future auth) | own rows only | ✅ full |

Run migrations in order:
1. `supabase/schema.sql` (baseline)
2. `supabase/migrations/20260625184500_quote_attribution.sql`
3. `supabase/migrations/20260627120000_quote_hardening.sql`

## Admin access

1. Set `ADMIN_SECRET` in Vercel.
2. Visit `/admin/login`, enter secret → httpOnly cookie.
3. `/admin/quotes` shows volume, destinations, sources (requires `SUPABASE_SERVICE_ROLE_KEY`).

Middleware refreshes Supabase auth sessions for future user accounts.

## Regenerate TypeScript types

```bash
npx supabase login
npx supabase gen types typescript --project-id <your-project-ref> > types/supabase.ts
```

Or add to `package.json`: `npm run supabase:types`

## Caching

- **Companies (RSC):** `getCompaniesCached()` uses React `cache()` — deduped per request.
- **Static pages:** Destination/route content remains SSG; Supabase reads are for dynamic directory data.
- **Vercel Edge:** Public marketing pages cache at CDN; admin routes use `force-dynamic`.

## Edge Function (future)

Deploy `supabase/functions/process-quote` and attach a Database Webhook on `quote_requests` INSERT for:
- High-volume batching
- Mover-matching queues
- Slack/PagerDuty alerts on error spikes

## Soft deletes

Set `deleted_at = now()` instead of hard-deleting quote rows. Analytics exclude soft-deleted leads.

## Deployment checklist

- [ ] Run latest SQL migrations in Supabase SQL Editor
- [ ] Confirm Vercel env vars (anon + service role + ADMIN_SECRET)
- [ ] Redeploy `main` on Vercel
- [ ] Test quote form on production → verify row in Supabase Table Editor
- [ ] Log in at `/admin/login` → confirm `/admin/quotes` loads
- [ ] Enable Supabase daily backups (Pro plan) + Point-in-Time Recovery
- [ ] Optional: Database Webhook → `process-quote` Edge Function

## Save My Move (optional passwordless accounts)

**Migration:** `supabase/migrations/20260712190000_save_my_move.sql`

Tables: `user_profiles`, `saved_inventories`, `saved_movers`, `magic_link_rate_limits` (+ existing `saved_comparisons`).

**Production project ref:** `uvqkyupfnpswdozmuzih` (must match `NEXT_PUBLIC_SUPABASE_URL` on Vercel).

**Verify OAuth providers on the live project** (not a different Supabase project):

```bash
curl -s "https://uvqkyupfnpswdozmuzih.supabase.co/auth/v1/settings" \
  -H "apikey: $NEXT_PUBLIC_SUPABASE_ANON_KEY" | jq '.external | {google, facebook}'
```

Both should return `true` when enabled. **Note:** `/auth/v1/settings` can report `facebook: false` even when Facebook OAuth works. `/api/auth/facebook` has **zero settings preflight** — it always tries `signInWithOAuth` (SSR → plain client) then manual authorize URL. Full settings JSON is logged server-side for diagnostics only.

**Supabase Auth setup (Dashboard → project `uvqkyupfnpswdozmuzih`):**
1. **Authentication → URL Configuration:**
   - **Site URL:** `https://www.movetrusthub.com` (NOT `http://localhost:3000` — if Site URL is localhost, OAuth sends users to localhost after sign-in)
   - **Redirect URLs:** add `https://www.movetrusthub.com/auth/callback`
2. Enable **Google** provider (scopes: email, profile only) and **Save**.
3. Enable **Facebook** provider — paste App ID + App Secret from Meta (see below) and **Save**.
4. **Email (magic link):** set OTP expiry to **900 seconds (15 min)** under Auth → Email.
5. Disable email confirmations for magic link if double-confirm blocks sign-in.

**Google sign-in (Save My Move modal):** Official [Google Identity Services](https://developers.google.com/identity/gsi/web) button → `signInWithIdToken` in the browser. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` on Vercel to the same OAuth web client ID as Supabase Auth → Google.

**Fallback Google OAuth:** `GET /api/auth/google` → `signInWithOAuth` (used when `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is unset).

**Facebook sign-in (Save My Move modal):** `GET /api/auth/facebook` → `signInWithOAuth` with `redirectTo: https://www.movetrusthub.com/auth/callback`. Saved movers, inventories, and comparisons are keyed to `auth.users.id` — provider-agnostic.

### Facebook App setup (Meta for Developers)

1. Go to [developers.facebook.com](https://developers.facebook.com/) → **My Apps** → **Create App** → type **Consumer** (or **None** if Consumer is unavailable).
2. Add product **Facebook Login** → **Settings** → **Web**.
3. **Valid OAuth Redirect URIs** — add exactly:
   ```
   https://uvqkyupfnpswdozmuzih.supabase.co/auth/v1/callback
   ```
4. **App Domains:** `movetrusthub.com`, `www.movetrusthub.com`
5. **Settings → Basic:** copy **App ID** and **App Secret**.
6. Supabase Dashboard → **Authentication → Providers → Facebook:** paste App ID + App Secret, enable provider, Save.
7. **App Review:** request `email` and `public_profile` permissions if the app is in Development mode (add test users under **Roles → Test Users**, or switch to Live when ready).
8. **Data Deletion Callback URL** (optional but recommended): `https://www.movetrusthub.com/privacy-policy`

**Routes:** `/my-move` (dashboard), `/auth/callback`, `/api/auth/google`, `/api/auth/facebook`, `/api/auth/magic-link` (rate-limited).

## Growth roadmap

| Feature | Status |
|---------|--------|
| Save My Move accounts | Shipped — Google, Facebook OAuth + magic link |
| Saved inventories / movers / comparisons | `saved_inventories`, `saved_movers`, `saved_comparisons` |
| Mover dashboards | extend `companies` ownership — future |
| Realtime admin | Supabase Realtime on `quote_requests` — future |