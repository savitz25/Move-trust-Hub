# MOVE-SEARCH-NET-001 architecture audit

Audit date: 2026-08-31. Starting SHA and verified `origin/main`: `96a3ad8b9dc1fbdc4d68a2a956695e60acf01a32`.

## Locked baseline

Production returned 200 for `/`, `/florida`, `/companies`, `/companies/shifl-inc`, `/ask`, and `/api/search/movers?q=SHIFL`. The accepted Search V1, Profile V1, Home/Florida/cache, Florida intelligence, and Move Ask checks all passed before implementation. The locked homepage fingerprint is `3f2d144f65d5ab20bd57a1536eabf44825f18f4c8501130913c0a98a7787726e`.

## Canonical identity pipeline

`app/api/search/movers/route.ts` calls `searchMovers` in `lib/search/query.ts`. That function uses `classifySearchQuery`, the existing `directory_search_suggestions` RPC (with parameterized SQL fallback), `isConsumerVisibleCompany`, `matchCompanyIdentity`, `compareIdentityCompanies`, `uniqueExactIdentity`, and `directory_exact_display_name_count`.

- Explicit `USDOT`/`DOT` is DOT-only; explicit `MC` is MC-only.
- Bare 3–8 digits preserve accepted `BARE` behavior and match USDOT or MC, with USDOT checked first.
- Display and FMCSA legal names are distinct fields.
- Normalization is lowercase, punctuation-to-space, and whitespace collapse.
- Prefix/token/similar/substring behavior is Search V1's existing bounded textual matcher.
- Duplicate public display-name population comes from `directory_exact_display_name_count`, not the returned page size.
- Publication eligibility is `isConsumerVisibleCompany` and the accepted SQL states `NULL`, `PUBLISHABLE`, `INDEXABLE`, or `VERIFIED`.
- Ordering is match tier, textual identity closeness, deterministic identity fields, and never reputation/reviews/paid status.
- Headquarters is identity context only, never service territory.
- Role and authority labels are factual; broker is not necessarily the transporting carrier and current authority is not endorsement.

## Additive boundary

The network resolver will call `searchMovers` and only classify/serialize its public-safe result. It will not add a table, index, fuzzy algorithm, publication path, or ranking. Identity and market research remain separate endpoints. Invalid input, backend unavailability, timeout, and valid no-match will have distinct structured outcomes.

The Ask requirement artifact at `Conumers-Trust-Hub/docs/MOVE-SEARCH-NET-001-CONTRACT.md` was read as the downstream integration requirement. Move Search V1 remains authoritative.
