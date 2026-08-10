# Local movers data source (canonical)

## Supabase project (single source of truth)

| Role | Project ref | URL |
|------|-------------|-----|
| **Production ONLY** | `arepfylnilkjmyduhwbz` | `https://arepfylnilkjmyduhwbz.supabase.co` |
| **Forbidden (legacy free)** | `uvqkyupfnpswdozmuzih` | Do not use in any env |

Vercel Production for Move Trust Hub must set:

- `NEXT_PUBLIC_SUPABASE_URL=https://arepfylnilkjmyduhwbz.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` from **are** only

Guards:

```bash
npm run guard:supabase-project
ENFORCE_CANONICAL_SUPABASE=1 npm run guard:supabase-project
```

## How county lists are built

`getMoversForCountyAsync(state, county)`:

1. **Approved / onboarded (are DB)** — `company_destination_assignments` for that county (+ intrastate `coverage_counties`), converted via `companyToLocalMover`, marked local when source is `local_intrastate*` or `service_scope=intrastate`.
2. **Catalog fill** — static `data/*-county-assignments.ts` + `fullMoversCatalog` (seed + active directory snapshot).
3. **Merge** — approved first, then catalog (`mergeApprovedMovers`), then HQ segmentation.

| `sourceMode` | Meaning |
|--------------|---------|
| `db` | Only directory/approved rows |
| `hybrid` | Approved + catalog (normal healthy state) |
| `seed` | Catalog only (DB had no rows for that county) |
| `degraded` | Supabase fetch failed; catalog only — **must not look “healthy” forever** |

## Onboarding → county page

1. DOT verify → suggest company → admin approve.
2. Approval writes **company** row on **are** + **county/state assignment** (`company_destination_assignments`, source `onboarding_approval` / local paths).
3. Revalidate tag `APPROVED_COUNTY_MOVERS_TAG` + `/local-movers/[state]/[county]` (and state hub).
4. ISR: county `revalidate=60`, state hub `revalidate=300`.

## If every county shows the same count (e.g. all “26”)

That is the **uniform seed pack** signature:

1. Check `/api/health/local-movers` — `projectRef`, `samples`, `flCountyCountsDiffer`.
2. Confirm Vercel env is **are**, not **uvq**.
3. Confirm are has per-county assignment diversity (not empty).
4. Rebuild static assignments from are after fixing verified no-USDOT drop:

   ```bash
   npx tsx scripts/rebuild-state-from-active-db.ts florida
   ```

5. Run diversity guard:

   ```bash
   npm run guard:local-movers-diversity
   npm run guard:local-movers-diversity -- --live=https://www.movetrusthub.com
   ```

6. POST `/api/revalidate-local-movers` with `REVALIDATE_SECRET` after deploy.

## Ops

- Health: `GET /api/health/local-movers`
- Revalidate: `POST /api/revalidate-local-movers` (Bearer or `?secret=`)
- Never treat missing Supabase as a quiet full seed substitute for production badges without checking health.
