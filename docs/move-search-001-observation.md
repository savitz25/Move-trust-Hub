# MOVE-SEARCH-001 — Research omnibox + neutral identity search

Identity research, not mover ranking. `db_writes` for company identity = 0. Schema additive only (`pg_trgm` + `directory_search_suggestions`).

## Baseline

| Field | Value |
| --- | --- |
| origin/main | `5e52e2e320696d60ba9276573905bc6b31beb886` |
| Homepage fingerprint | `3f2d144f65d5ab20bd57a1536eabf44825f18f4c8501130913c0a98a7787726e` |
| Public cohort | 5,022 |
| Display ≠ legal | 1,675 |
| Duplicate name keys | 60 |
| Duplicate-name profiles | 276 |
| TWO MEN AND A TRUCK | 99 (audit ~98; +1 live drift) |
| pg_trgm before | absent |

## Architecture

- Classifier: `lib/search/classify-intent.ts` (DOT / MC / BARE / company / place)
- Matching: `lib/search/match.ts` (tiers 1–10, reputation never used)
- API: `GET /api/search/movers`
- RPC: `directory_search_suggestions` (public-eligible only)
- Homepage: combobox omnibox after H1; Intelligence payload unchanged
- `/companies?search=` research-results mode, noindex remains

## Golden (Production DB)

See `docs/move-search-001-golden-live.json`. All 15 curated queries PASS after RPC case-normalization fix.

## 001B corrections

- Exact display-name census via `directory_exact_display_name_count` (not candidate LIMIT). TWO MEN AND A TRUCK live count at correction: **100** (was 99 at 001 audit).
- Textual identity score (ordered tokens, adjacency, extra-token penalty, stopwords `and/the/a/of/an`). Two Men Truck now ranks TWO MEN AND A TRUCK before Two Men And A Junk Truck.

## Remaining gaps

- Workstation RPC p50 ~400–700ms (includes TLS + fetch-by-id). Vercel-region warm latency measured in 001B closeout.
- No alias table (not provenance-safe yet).
- Broad terms remain a bounded candidate set.
