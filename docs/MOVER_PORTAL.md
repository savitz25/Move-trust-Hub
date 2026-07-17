# Verified Mover Portal (Carrier Command Center)

Official mover business-owner experience for Move Trust Hub.

**Tagline:** You’ve earned your reputation. Now own it.

## Core principles

- Movers do **not** pay for placement or higher rankings.
- Owners **cannot** edit scores or remove legitimate negative reviews.
- Owners **can** claim, verify, respond, and keep listing data accurate.
- Messaging stays professional, transparent, and empowering.

## Routes

| Path | Purpose |
|------|---------|
| `/for-movers` | Landing page for moving companies |
| `/portal` | Owner dashboard (auth required for tools) |
| `/portal/login` | Magic-link sign-in |
| `/portal/claim/[companySlug]` | Claim flow (USDOT + contact + magic link) |
| `/portal/reviews` | Owner responses + policy disputes |
| `/portal/service-area` | National / regional / local + interstate lanes |
| `/admin/portal-claims` | Staff claim moderation |
| `/admin/portal-disputes` | Staff dispute moderation |

Footer link: **For Moving Companies** → `/for-movers`  
Profile + directory cards: **Is this your company? Claim this profile**

## Database migration

Apply in the Supabase SQL Editor (or `supabase db push`):

```text
supabase/migrations/20260717120000_mover_portal.sql
```

Or with a database password:

```bash
# SUPABASE_DB_PASSWORD or SUPABASE_DB_URL required
npx tsx scripts/apply-portal-migration.ts
```

The migration is **idempotent** and safe to re-run. It also bootstraps `moving_companies` + `company_reviews` if the public review system was never applied to this project (otherwise you get `relation "public.company_reviews" does not exist`).

Requires `public.companies` to already exist (directory table).

### Runtime fallback (production safety)

If `company_claims` is missing from PostgREST (migration not applied), claim submission **still works** by storing rows in `company_suggestions` with `source_page = 'portal_claim'`. Admin queue, pending claim list, and post-approval ownership read that fallback. Logs: `[portal.claim] …`.

Apply the migration when you can so native tables + owner response columns are used.

Tables:

- `moving_companies` / `company_reviews` — community reviews (created if missing)
- `company_claims` — pending ownership claims
- `company_owners` — verified portal access
- `company_portal_profiles` — reputation sync + service area
- `portal_claim_rate_limits` — anti-spam
- Owner response + dispute columns on `company_reviews`

RLS: service_role only for portal tables. App uses admin client after auth / admin session checks.

## Phase 1 — Claiming & invitation

1. Open `/for-movers` — brand messaging, no paid placement language.
2. Open any `/companies/[slug]` — claim CTA under freshness row.
3. Directory cards show compact “Claim profile” link.
4. Footer RESOURCES includes For Moving Companies.

### Test steps

1. Visit `/for-movers` and confirm CTAs to portal + directory.
2. Open a company profile → Claim this profile → `/portal/claim/{slug}`.
3. Submit with wrong USDOT → error.
4. Submit with matching USDOT → success + magic link request.

## Phase 2 — Verification & login

1. Claim stores pending row; work email domain match sets `verification_method = email_domain`.
2. Magic link uses `/auth/callback?next=/portal`.
3. On portal load, pending claims matching email get `claimant_user_id` linked.
4. Admin approves at `/admin/portal-claims` **only after** user_id is linked.
5. Approval creates `company_owners` + portal profile.
6. Owner responds on `/portal/reviews` → public **Verified Owner** badge.
7. Dispute → review stays public with **Under Review** → `/admin/portal-disputes`.

### Test steps

1. Claim company as test owner email.
2. Complete magic link → `/portal` shows pending claim.
3. Admin login → Portal Claims → Approve.
4. Refresh `/portal` → dashboard, reviews, service area.
5. Post owner response → appears on public community reviews.
6. File dispute → Under Review tag public; admin can uphold/remove or reject.

## Phase 3 — Reputation sync

- Button: **Sync reputation data** (Google + BBB + FMCSA).
- Once per **30 days** with countdown.
- Shows last refreshed time + per-source summary.
- Does **not** allow score editing or paid boosts.
- Auto-quarterly helper: `needsQuarterlyAutoRefresh()` (wire to cron when ready).

### Test steps

1. As verified owner, click Sync → loading state + summary.
2. Click again immediately → blocked with days remaining.
3. Confirm public profile data freshness / Google-BBB fields updated when APIs configured.

## Phase 4 — Service area

- Mode toggle: National / Regional / Local.
- Regional: multi-state selection (cap 25 → use National).
- Local: radius 10–500 miles + optional counties.
- Primary interstate lanes (max 20).
- Verified coverage signals (HQ state, USDOT authority note).
- Updates directory `companies.coverage` coarse label + revalidates profile.

### Test steps

1. Save regional multi-state → public profile coverage updates.
2. Local without radius → validation error.
3. Add lanes NY → FL → save and reload editor.

## Auth notes

- Mover login = Supabase Auth (shared with Save My Move).
- Staff admin = `ADMIN_SECRET` cookie (separate).
- Never use admin cookie for mover sessions.

## Related code

- `lib/portal/*` — domain logic
- `actions/portal-claims.ts`, `actions/portal-owner.ts`
- `components/portal/*`
- Reuses FMCSA/Google/BBB refresh pipelines from admin tools
