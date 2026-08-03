# GA4 operations — Move Trust Hub

## Streams

| Host | Property / stream | Measurement ID |
|------|-------------------|----------------|
| `www.movetrusthub.com` | Move Trust Hub · stream `15104924379` | **`G-433BDVV8MJ`** |
| `www.insurancetrusthub.com` | Separate ITH property (optional) | `NEXT_PUBLIC_GA_MEASUREMENT_ID_INSURANCE` only |

**Never** send ITH traffic to `G-433BDVV8MJ`. **Never** use the typo `G-433BDV8MJ` (one V) — it is a dead stream.

## Code entry points

| Piece | Path |
|-------|------|
| Host-aware ID resolution | `lib/analytics/ga-config.ts` |
| Root mount (all pages) | `app/layout.tsx` → `GoogleAnalyticsRoot` |
| gtag load + config | `components/analytics/google-analytics.tsx` |
| SPA pageviews | `components/analytics/ga-page-view-tracker.tsx` |

Do **not** re-add interaction-gated GA in `ThirdPartyOrchestrator` — that previously delayed or dropped hits.

## Vercel Production env

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID_MOVE=G-433BDVV8MJ
# legacy alias (Move only) — optional if MOVE is set:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-433BDVV8MJ
# optional ITH-only stream:
# NEXT_PUBLIC_GA_MEASUREMENT_ID_INSURANCE=G-XXXXXXXX
```

Redeploy after changing `NEXT_PUBLIC_*` vars (they are inlined at build time).

Code **auto-sanitizes** the known typo `G-433BDV8MJ` → `G-433BDVV8MJ` on Move, but Production env should still be corrected in Vercel.

## Verify in 60 seconds

1. Open `https://www.movetrusthub.com/` → View Source (or Network).
2. Confirm script: `googletagmanager.com/gtag/js?id=G-433BDVV8MJ` (two V’s).
3. Network: `g/collect` or `collect` requests to Google.
4. GA4 → **Reports → Realtime** → load home + one internal page → see yourself within 1–2 min.
5. Negative: open `https://www.insurancetrusthub.com/` → page source must **not** contain `G-433BDVV8MJ`.

## Debug (optional)

In browser console on Move:

```js
window.__MTH_GA_MEASUREMENT_ID  // should be G-433BDVV8MJ
window.__MTH_GA_HUB             // "move"
typeof window.gtag              // "function"
```

## Incident history (2026)

- ~30 days of “Data collection isn’t active”
- Root cause: Production env / HTML used **`G-433BDV8MJ`** (typo) while GA4 stream is **`G-433BDVV8MJ`**
- ITH was also loading the Move (wrong) ID — isolation fixed via host-aware resolution
