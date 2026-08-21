# Task 009A.2 — DB directory production cutover

## Default engine

`resolveDirectoryQueryEngine()` → **`db`**

Used by:

- `app/(move)/companies/page.tsx` (SSR first page)
- `app/api/directory/companies/route.ts` (progressive loads)

Both call `queryDirectoryPage()` — shared abstraction (no dual engines).

## Rollback

```
DIRECTORY_QUERY_ENGINE=legacy
```

See `docs/task-009a2-rollback.md`.

## Emergency fallback

Off by default. Enable only if needed:

```
DIRECTORY_ENGINE_LEGACY_FALLBACK=1
```

When enabled, DB hard-fail / empty default browse logs
`directory.query_engine.legacy_fallback` and uses legacy once.
Path counters: `db` | `hybrid` | `legacy` | `legacy_fallback`.

## Hybrid

County filters use bounded hybrid (`hybrid-local`, ≤800 candidates).
Plain state filters use SQL `p_state` pagination (national + HQ + coverage JSON).

## Mandatory proof

Default `limit=24` must materialize ≪ 4021 rows into Node (target ≤ 48, typically 24).
