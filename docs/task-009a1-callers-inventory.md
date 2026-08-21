# Task 009A.1 — Production callers inventory

## `queryDirectoryPage`

| Caller | Path | Notes |
|--------|------|-------|
| Companies SSR | `app/(move)/companies/page.tsx` | First page SSR; shares abstraction with API |
| Directory API | `app/api/directory/companies/route.ts` | Progressive loads via `DirectoryLoader` |

Both accept optional Preview-only `engine=db` (ignored on production unless `DIRECTORY_QUERY_ENGINE=db`).

## `getUnifiedDirectoryCompanies`

| Caller | Path | Notes |
|--------|------|-------|
| Legacy directory query | `lib/directory/query-directory-page.ts` | Full hydrate → filter → slice (production default) |
| Site stats | `lib/trust/site-stats.ts` | Public displayable count |
| Data server | `lib/data-server.ts` | Server data helpers |
| Home ZIP route | `lib/home/resolve-route-from-zip.ts` | Route suggestions |
| Search movers action | `actions/search-movers-directory.ts` | Server action search |

**Do not break** these secondary users in 009A.1. DB engine only replaces the `queryDirectoryPage` path when opted in.

## `filterCompanies` / `scoreCompanySearch`

| Caller | Path |
|--------|------|
| Legacy `queryDirectoryPage` | `lib/directory/query-directory-page.ts` |
| Client directory | `lib/data.ts` / client filters |
| Search movers action | `actions/search-movers-directory.ts` |
| DB engine search rerank | `lib/directory/query-db-directory-page.ts` |
| Scripts / tests | `scripts/check-directory-filters.ts`, `*.test.ts` |

## Related

- `build-directory-api-query.ts` — URL ↔ filter parsing (unchanged contract)
- `components/directory/directory-loader.tsx` — client progressive fetch via API
- `lib/supabase/queries/companies.ts` — `mapCompanyRow` (exported for DB engine), `getCompaniesCached`
