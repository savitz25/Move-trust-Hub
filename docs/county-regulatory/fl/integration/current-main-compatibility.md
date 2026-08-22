# Current-main Compatibility (FL-C010)

## Observed main

Recorded in `main-compatibility-audit.json` / `current-main-path-collision-audit.json`.

Material main changes since C009 baseline `ab93c841…`:

- VISUAL-006 network shell (#63)
- FL-010A Wave 1 apply (#61) — state publication / observation

## Collision classes

| Class | Meaning |
|---|---|
| NEW_PATH_NO_CONFLICT | Path absent on main — safe add |
| EXISTING_PATH_IDENTICAL | Same bytes — no-op |
| EXISTING_PATH_SAFE_EXTENSION | Exists with different content — confirm |
| PATH_CONFLICT_REQUIRES_MANUAL_REVIEW | Shared package/catalog/helpers |
| OBSOLETE_DUE_TO_CURRENT_MAIN | Do not transplant |

C010 observation: county allowlist paths are overwhelmingly **NEW_PATH_NO_CONFLICT**. No `package.json` diff. No `supabase/migrations` from county stack.

## Avoid

- `lib/state-hhg/**` publication helpers
- company publication mutation scripts
- Trust Score
- app profile routes / layouts / middleware / sitemap
