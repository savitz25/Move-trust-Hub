# Task 009A.1 — DB-Backed Directory Query Engine

## Status

Built and proven behind opt-in. **Production default remains the legacy engine.**
Task 009A.2 performs live cutover.

## Architecture

```
queryDirectoryPage()
  ├─ resolveDirectoryQueryEngine()  → legacy (default) | db (opt-in)
  ├─ queryLegacyDirectoryPage()     → getUnifiedDirectoryCompanies → filter → slice
  └─ queryDbDirectoryPage()         → directory_query_page RPC/pg → mapCompanyRow → page
```

### Opt-in (no production cutover)

- `DIRECTORY_QUERY_ENGINE=db` (env)
- Preview/local only: `?engine=db` on `/companies` or `/api/directory/companies`
- Production ignores `engine=db` unless env forces db

### Default interstate path

1. Fail-closed publication filter (allow PUBLISHABLE / INDEXABLE / VERIFIED / null)
2. Exclude `service_scope = intrastate` unless Local/state/search
3. SQL sort with sparse price/complaints rules + `id ASC` tie-break
4. `COUNT` + `OFFSET` + `LIMIT`
5. Map only returned IDs via shared `mapCompanyRow`

### Search

- Exact USDOT/MC → regulatory fast path
- Name → bounded SQL candidates → `scoreCompanySearch` rerank

### Hybrid

State/county coverage uses a bounded hybrid path (≤500 DB candidates + client coverage filter). Does **not** hydrate all ~4k DB rows.

## DB objects

Migration: `supabase/migrations/20260820220000_task_009a1_directory_query_engine.sql`

- Indexes: usdot, mc, publication_state, scope+reputation, name/legal lower, price, years, capability
- RPC: `directory_query_page(...)` — `SECURITY INVOKER`, grants to anon/authenticated/service_role
- Rollback: `docs/task-009a1-rollback.sql`

## Known parity differences (acceptable for 009A.1)

| Area | Difference |
|------|------------|
| Default order | DB uses stable `id ASC` tie-break; legacy JS sort is unstable on equal reputation |
| Common token search (`moving`) | Candidate cap (~250) vs full-universe score |
| State/county | Hybrid HQ/coverage approximation vs full coverage_counties + static merge |
| Role totals | Capability-table approx vs badge resolver (±1–2%) |

Exact matches expected for: USDOT/MC search, exact name (Allied/Mayflower), protected identity USDOTs, default **totals**.

## Mandatory proof

For `limit=24` default browse: Node materializes ≤40 rows (typically 24), not ~4021.
See `docs/task-009a1-directory-query-benchmarks.json`.
