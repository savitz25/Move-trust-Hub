# Auto-transport Google Places enrichment

## Why production UI was empty

1. **Writes never hit production** — local `.env.local` often has placeholder Supabase URL/service role and no `GOOGLE_PLACES_API_KEY`. Prior runs wrote `data/auto-transport-google-enrichment.json` for some brands only.
2. **File hydrate was broken** — `applyAutoTransportGoogleEnrichment` used to copy Places numbers into **industry** `overallRating` / `reviewCount` and never set `company.googleData`, so the Google panel always said “not stored.”

## Source separation (do not mix)

| Source | Fields | UI |
|--------|--------|-----|
| Industry-reported (editorial) | `overallRating`, `reviewCount` | Directory cards / editorial volume |
| Google Places snapshot | `googleData` / `verification_sources.google` | “Google rating (external)” panel |
| On-site attributed | moderated reviews | Review schema only |

## Commands

```bash
# Pull production secrets (required)
vercel env pull .env.local

# Diagnose production DB vs UI
npm run enrich:auto-transport -- --diagnose

# Force re-enrich priority brands
npm run enrich:auto-transport -- --slugs=sherpa-auto-transport,reliable-carriers,montway-auto-transport --confirm --force

# Full auto set
npm run enrich:auto-transport -- --confirm --force --limit=50

# Fail if >50% still lack Places
npm run verify:auto-transport-places
```

`--confirm` **exits non-zero** if Supabase service role or `GOOGLE_PLACES_API_KEY` is missing/placeholder.

## Artifacts

- `scripts/output/auto-transport-places-diagnosis.json`
- `scripts/output/auto-transport-enrichment-audit.json`
- `scripts/output/auto-transport-enrichment-report.json`
