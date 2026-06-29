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

## Growth roadmap

| Feature | Schema ready | Code hook |
|---------|--------------|-----------|
| User accounts | `saved_quotes`, `saved_comparisons` | Supabase Auth + middleware |
| Saved quotes | `saved_quotes` table | `auth.uid()` RLS |
| Mover dashboards | extend `companies` ownership | service_role + Auth |
| Realtime admin | Supabase Realtime on `quote_requests` | admin client subscribe |