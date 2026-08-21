# Task 009A.2 — Directory cutover rollback

Rollback returns `/companies` and `/api/directory/companies` to the **legacy**
unified-directory engine. It does **not** touch provider data.

## Instant rollback (no deploy)

Set Vercel Production env:

```
DIRECTORY_QUERY_ENGINE=legacy
```

Redeploy or wait for env propagation. Directory queries immediately use
`queryLegacyDirectoryPage` (full hydrate → filter → slice).

## Remove emergency auto-fallback

Ensure these are unset or false in Production:

```
DIRECTORY_ENGINE_LEGACY_FALLBACK=0
DIRECTORY_ENGINE_ALLOW_LEGACY_HINT=0
```

## What rollback does NOT change

- `public.companies` rows / slugs / USDOT / MC
- `publication_state` / `indexable`
- Wave publication rows
- provider_authority / provider_capability
- identity overlay / Task 008B
- reviews / claims / consumer data

## Restore DB default after fix

```
DIRECTORY_QUERY_ENGINE=db
```

or delete the variable (009A.2 code default is `db`).

## Dry-run / local test

```bash
# Force legacy locally
DIRECTORY_QUERY_ENGINE=legacy npm run dev

# Force DB (default)
DIRECTORY_QUERY_ENGINE=db npm run dev

# Allow logged emergency fallback on DB hard-fail
DIRECTORY_ENGINE_LEGACY_FALLBACK=1 npm run dev
```

## SQL objects

Directory RPC/indexes from 009A.1 may remain in place during rollback.
Optional SQL rollback (engine-only): see `docs/task-009a1-rollback.sql`.
Not required to restore legacy query behavior.
