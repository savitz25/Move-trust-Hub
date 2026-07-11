# Lender Provider Onboarding

Production-ready lender onboarding for **LenderTrustHub.com**, mirroring the Move Trust Hub mover suggestion flow with **NMLS verification** replacing DOT/FMCSA.

## Flow

```
Entry (/lender/onboard)
  → Step 1: NMLS ID or name search (Playwright + fetch fallback)
  → Step 2: Multi-source preview (NMLS + Google + BBB + CFPB + county score)
  → Step 3: Submitter details + optional ZIP
  → Step 4: Insert lender_onboarding_submissions (pending)
Admin (/lender/admin/onboarding)
  → Approve → insert lenders row → Resend confirmation email
  → Reject → status rejected
Published profile: /lender/lenders/[slug]
```

## Folder structure

```
app/lender/onboard/page.tsx              # Public multi-step onboarding
app/lender/admin/onboarding/page.tsx     # Admin moderation queue
app/lender/api/nmls/lookup/route.ts      # NMLS + enrichment API (60s timeout)

actions/lender-onboarding.ts             # preview, search, submit
actions/moderate-lender-onboarding.ts    # approve/reject + email

components/lender/onboarding/
  lender-onboard-client.tsx              # Main wizard
  onboarding-nmls-lookup.tsx             # Step 1
  nmls-readonly-fields.tsx
  lender-multi-source-preview.tsx        # Step 2 preview card
  lender-onboarding-progress.tsx
  lender-moderation-queue.tsx

lib/lender/onboarding/
  nmls-lookup.ts                         # Orchestrator
  nmls-playwright.ts                     # Headless browser scrape
  nmls-parse.ts                          # HTML → structured JSON
  enrich-lender.ts                       # Google + BBB + CFPB parallel
  cfpb-lookup.ts
  county-score.ts
  schema.ts, types.ts, transparency.ts
  rate-limit.ts, duplicates.ts
  insert-submission.ts, publish.ts, queries.ts

lib/lender/email/onboarding-confirmation.ts
lib/lender/supabase/queries/lenders.ts

supabase/migrations/20260711120000_lender_onboarding_submissions.sql
```

## Supabase tables

### `lender_onboarding_submissions`
Queue table (mirrors `company_suggestions`). Key columns: `nmls_id`, `nmls_preview`, `google_data`, `public_scrape_data`, `cfpb_data`, `needs_manual_review`, `status`.

### `lender_onboarding_rate_limits`
IP/email rate limit tracking.

### `lenders` (extended)
New columns: `nmls_preview`, `google_data`, `public_scrape_data`, `verification_sources`, `transparency_note`, `published_from_onboarding`, `data_freshness_note`.

## Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public client |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Inserts / admin |
| `ADMIN_SECRET` | Yes | Admin session cookie |
| `GOOGLE_PLACES_API_KEY` | Optional | Google reviews/rating |
| `BBB_API_KEY` | Optional | Preferred BBB source |
| `RESEND_API_KEY` | Optional | Confirmation email on approve |
| `RESEND_FROM` or `LENDER_RESEND_FROM` | Optional | Sender address |
| `NEXT_PUBLIC_LENDER_SITE_URL` | Optional | Email profile links |
| `NMLS_SCRAPE_ENABLED` | Optional | Set `0` to disable scrape |
| `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` | Optional | Local Chromium path |
| `NMLS_CHROMIUM_SERVERLESS` | Optional | Force `@sparticuz/chromium` locally |

## NMLS scrape notes

NMLS Consumer Access is Cloudflare-protected. The system:

1. Tries fast HTTP fetch (works when unblocked)
2. Falls back to Playwright (`playwright-core` + `@sparticuz/chromium` on Vercel)
3. Flags `needs_manual_review` when fields are missing
4. Always links to the official NMLS record URL

Rate limiting: 5 submissions/IP/day, 3/email/day (same as movers).

## Testing

1. Run migration on Supabase SQL editor or `supabase db push`
2. `npm run dev` → open `/lender/onboard`
3. Test NMLS ID lookup (e.g. well-known mortgage company NMLS)
4. API smoke test: `GET /lender/api/nmls/lookup?nmlsId=3030`
5. Submit with test email → verify row in `lender_onboarding_submissions`
6. Log in admin → `/lender/admin/onboarding` → approve
7. Confirm profile at `/lender/lenders/[slug]` and Resend email

## Transparency (required on every profile)

- NMLS-verified via Consumer Access
- Independent directory — not affiliated
- Data for research only — verify with NMLS directly
- Zero paid placement
- Data freshness note