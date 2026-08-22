# Selective-Transplant Rehearsal (FL-C010)

## Rehearsal identity

| Field | Value |
|---|---|
| Temporary branch | `rehearsal/fl-county-v1-transplant` |
| Worktree | `C:\Users\makei\move-trust-hub-c010-rehearsal` |
| Base | `origin/main` @ rehearsal time |
| Strategy | `STRATEGY_3_SELECTIVE_TRANSPLANT` |
| Pushed | **NO** |
| Production PR from rehearsal | **NO** |

## Method

1. Cut local branch from current `origin/main`.
2. Copy **allowlist INCLUDE** paths (plus REVIEW only as validator deps).
3. Do **not** cherry-pick stacked commits wholesale.
4. Preserve main app/profile/publication/visual shell code.
5. Commit locally for diff measurement only.
6. Run validators C001–C010.
7. Run production build + relevant tests.
8. Capture diff summary; delete worktree after artifacts recorded.

## Expected tree shape

**data + docs + scripts + validators + architecture** — not runtime functionality.
