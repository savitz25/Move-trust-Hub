# TH-SEARCH-R1-018 BLOCKER-MOVE-01 — Diagnosis

## Reproduction (R1-017 evidence, re-confirmed at the start of this ticket)

- Direct `GET /api/ask?q=JK+Moving+Services` (move-ask-v1, `lib/move-ask/`): `terminalState:
  NEEDS_CLARIFICATION`, exactly 5 candidates, all containing "JK" as a distinctive token (JK
  Moving Services x2, JK Brokerage Services, JK Forwarders Inc, JK Van Lines Inc).
- `POST /api/specialist-execution/v2` (guided-Ask execution path, `lib/specialist-execution/
  execute.ts` → `lib/search/network-resolver.ts` `resolveMoveNetworkIdentity()` →
  `lib/search/query.ts` `searchMovers()`): reports `totalMatchingIdentityCount: 34` for the bare
  query and `70` for the company+journey phrasing, surfacing companies with no textual relation to
  "JK" (Ab Moving Services, Kings Moving Services, Bb&D Moving Services, H&L Moving Services, ...).

## Root cause

`lib/search/match.ts`'s `matchCompanyIdentity()` — the client-side relevance filter that
`searchMovers()` applies to the broad SQL candidate pool before computing `resultCount` — has a
fuzzy fallback tier (`similarHit()`) that allows a bounded Levenshtein edit-distance-2 comparison
on query tokens of **any** length. For a 2-letter token like "jk", an edit distance of 2 is not a
meaningful similarity signal: nearly any other 2-letter token ("ab", "jp", "km", "h" + 1 more edit,
"bb"/"d" after "&" is stripped, ...) is already within distance 2 of "jk". Combined with "moving"
and "services" being real, exact substrings of the same candidates, `similarHit()` reported a
match for every one of them, even though none of them share any actual relationship to "JK".

Confirmed via a direct probe of `matchCompanyIdentity()` against the exact R1-017 candidate names
(see `test-results.log`'s `BLOCKER-MOVE-01` test group and the now-removed diagnostic script that
produced this table before the fix):

| Candidate | Before fix | After fix |
|---|---|---|
| JK Moving Services | `exact_display_name` tier 4 | `exact_display_name` tier 4 (unchanged) |
| Ab Moving Services | `similar_name` tier 9 | `NULL` |
| Jp Moving Services | `similar_name` tier 9 | `NULL` |
| Km Moving Services | `similar_name` tier 9 | `NULL` |
| Bb&D Moving Services | `similar_name` tier 9 | `NULL` |
| H&L Moving Services | `similar_name` tier 9 | `NULL` |
| Kings Moving Services | `NULL` (already correctly excluded — longer token, fails the length-gated Levenshtein check even before this fix) | `NULL` |

This is the R1-005-forbidden failure mode (a named-company search degrading toward a generic
directory cohort) reappearing through a second, parent-facing execution contract
(`specialist-execution/v2`) that R1-005's original hardening — which lives entirely in the
separate `lib/move-ask/` module used by the public `move-ask-v1` contract — never covered. The
two code paths implement genuinely independent name-matching algorithms; `lib/search/match.ts`'s
`similarHit()` never adopted `lib/move-ask/name.ts`'s R1-005-certified discipline of only
considering *distinctive* (non-generic-word) tokens, and additionally had no minimum-length gate
on its fuzzy-edit-distance tolerance.

## Fix

`lib/search/match.ts`'s `similarHit()`: the Levenshtein-distance-2 fuzzy branch is now only
consulted for tokens of length >= 4. Below that length, a token must actually **prefix-match** a
word in the candidate name to count — no loose edit-distance tolerance. This directly targets the
evidenced defect (short brand-initial tokens matching arbitrary other short tokens) without
touching the exact-match tiers (1-7), the token-prefix tier (8, already correctly strict — it
requires every token to prefix-match, which already excluded "Kings" for "JK"), or the fuzzy
matching of genuinely longer, real-word typos ("Colleg" -> "College", still allowed).

A shared-resolver refactor (making `specialist-execution/v2` call into `lib/move-ask/name.ts`
directly instead of `lib/search/match.ts`) was considered per the ticket's stated preference, but
rejected as unnecessarily invasive for this fix: `lib/search/match.ts` already implements the same
tiered, conservative-first matching *design* R1-005 certified (exact identifier -> exact display
-> exact legal -> prefix -> token-prefix -> fuzzy fallback -> honest miss); the defect was a single
under-constrained comparison inside the existing tiered design, not an architectural gap requiring
convergence onto a different module. The two code paths remain separate (as they serve genuinely
different contracts -- move-ask-v1's plain-text search vs. specialist-execution/v2's structured
identity resolution), but now enforce the same conservative-matching *standard*.

## Why `totalMatchingIdentityCount` needed no direct change

`lib/search/network-resolver.ts`'s `buildMoveNetworkResolverResponse()` already computes
`totalMatchingIdentityCount` from `search.resultCount`, which in turn is `matched.length` in
`lib/search/query.ts`'s `searchMovers()` -- the length of the array *after*
`matchCompanyIdentity()` filtering. Fixing the filter at its source means the count is correct
everywhere it is consumed, without needing a second, parallel change to the count computation
itself (which would have risked exactly the kind of "two independent algorithms" duplication this
ticket explicitly warns against).

## Preserved prior R1 behavior (explicitly re-verified, see test-results.log)

- **R1-001** (exact USDOT/MC integrity): `check:th-search-r1-001` 17/17 pass, unchanged.
- **R1-005** (bounded company-name/DBA search): `check:th-search-r1-005` 15/15 pass, unchanged --
  this is the *separate*, already-correct `lib/move-ask/` path and was never broken.
- **R1-006** (MC225850 source-conflict containment): `check:th-search-r1-006` 14/14 pass,
  unchanged. Also directly re-verified in the new test file that JK Moving Services does not gain
  an unqualified association with MC225850 through the fixed name-matching path.
- **R1-014** (origin/destination journey semantics): `check:th-search-r1-014` 12/12 pass,
  unchanged.
- Existing `lib/search/match.test.ts` and `lib/search/network-resolver.test.ts` (32 tests,
  including the "Two Men and a Truck" genuinely-ambiguous-common-name case and the "College
  Hunks"/"Colleg Hunks" typo-tolerance case): all still pass unchanged, confirming the fix does not
  regress legitimate fuzzy matching or genuinely large real-duplicate-name cohorts.

## Environment notes (not blockers, disclosed for completeness)

- `npm run lint` (`next lint`) has no ESLint config committed in this repository and drops into an
  interactive first-run setup wizard rather than running; this is a pre-existing condition,
  unrelated to this change, and was not run to completion locally. CI is relied on for lint/build
  verification, consistent with how this program has treated every specialist repo (no local
  Supabase credentials are available in this environment either).
- `npm run typecheck` reports 533 pre-existing errors across unrelated files (`scripts/`, `store/`,
  `supabase/functions/`) that exist on a fresh `origin/main` checkout before any change in this
  ticket. Neither `lib/search/match.ts` nor the new `lib/search/r1-018-move-01.test.ts` contribute
  any of them (confirmed by grepping the typecheck output for these two files both before and
  after the fix).
- `npm run build` requires live Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, etc.) not present
  in this local environment; the build was not completed locally. CI/Vercel (which carries the
  real project secrets) is the actual build gate for this repository.
