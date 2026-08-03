# Step 0 — Freeze wrong architecture (Ask Trust Hub Network)

## Root causes found

1. **Move monorepo still contains `/app/lender/*` and `/app/insurance/*` App Router trees** for standalone hosts and historical rewrites — public traffic on `movetrusthub.com` is already redirected in **middleware** and **next.config**, but Insurance external redirects were incomplete in `next.config` (now added).
2. **Parent branding** still said “ConsumerTrust Hub” in JSON-LD network org and soft footer copy (not always “ConsumerTrust Hub” string, but “Sister sites” without Ask).
3. **Ask Trust Hub** still marked Lender as `coming_soon` / Planned.
4. **Insurance** default meta/schema still said “request quotes”.
5. **Lender** trust bar claimed 3,142 counties; cards showed “Avg Close” as hard fact; trust score displayed without methodology.

## Redirects (Move host)

### Middleware (`middleware.ts`) — already present, verified logic
- `movetrusthub.com/insurance/*` → `https://www.insurancetrusthub.com/*` (301)
- `movetrusthub.com/lender/*` → `https://www.lendertrusthub.com/*` (301)

### next.config redirects — reinforced
- `/lender`, `/lender/`, `/lender/:path*` → Lender apex (existing)
- `/insurance`, `/insurance/`, `/insurance/:path*` → Insurance apex (**added** Step 0)

## Sitemaps / robots
- Move sitemap already excludes `/lender` and `/insurance` trees.
- robots.txt intentionally **does not** Disallow `/lender` or `/insurance` so crawlers can process 301 equity transfer.

## Verify (after deploy)

```bash
curl -sI https://www.movetrusthub.com/lender
curl -sI https://www.movetrusthub.com/lender/local-lenders
curl -sI https://www.movetrusthub.com/insurance
curl -sI https://www.movetrusthub.com/insurance/hubs
```

Expect **301** with `Location:` to the matching specialist host.

## Files changed (Move monorepo)

- `next.config.ts` — insurance → external 301s
- `components/hub/consumer-trust-network-links.tsx` — Ask Trust Hub network line
- `lib/hub/schemas.ts` — network org → Ask Trust Hub
- `lib/hub/domains.ts` — comment
- `lib/insurance/seo/metadata.ts`, `schemas.ts` — no “request quotes”
- `app/insurance/tools/license-verification/page.tsx` — integrity
- `lib/lender/mockData.ts`, `TrustBar.tsx`, about stats, cards, profile, compare, Footer

## Ask Trust Hub (`consumers-trust-hub`)

- `lib/hubs.ts` — Lender status `live`

## Legal (Move)

- Privacy / Terms already name **Move Trust Hub** + `hello@movetrusthub.com` (no Insurance operator language found).
