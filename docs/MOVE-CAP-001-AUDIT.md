# MOVE-CAP-001 hard-start audit

Audit date: 2026-09-01

## Release baseline

- Repository: `savitz25/Move-trust-Hub`
- Starting `origin/main`: `03e423f5f821f45ee86dc52fb386f90c89534b30`
- Production deployment: `dpl_HyfR2UCfXN3DUqCqRkfZ2yKwF5DG`
- Production git SHA: `03e423f5f821f45ee86dc52fb386f90c89534b30`
- Production URL: `https://www.movetrusthub.com`
- Isolated branch: `move-cap-001-specialist-execution-v2`
- Database writes during audit: 0

The national homepage, Florida Intelligence, `/companies`, `/ask`, `/api/ask`,
`/api/search/movers`, `/api/network/identity-resolver`, and the SHIFL profile all
returned HTTP 200 at the accepted baseline.

## Accepted primitives

`lib/directory/parse-directory-research-query.ts` is the accepted MOVE-DIR-002
query-plan boundary. It already separates Auto Transport evidence, regulatory
role, recorded-headquarters geography, service-territory intent, route intent,
ranking intent, price intent, identifiers, and residual identity text.

`lib/directory/query-directory-page.ts` and
`lib/directory/query-db-directory-page.ts` are the accepted bounded directory
execution boundary. The Auto Transport branch uses the exact USDOT cohort derived
from FMCSA Company Census cargo flags; it does not use names or marketing copy.

`lib/search/network-resolver.ts` is the accepted identity-only resolver. It owns
USDOT/MC and name certainty, including ambiguity, fuzzy candidates, and honest
no-match results. It must not become the cohort endpoint.

## Reproduced defect and root cause

Production request:

`GET /api/ask?q=movers%20in%20New%20York`

returned 4,321 national carrier identities. The first page contained LA, NJ, SC,
MA, TX, CA, FL, MD and other states. Its provenance truthfully said
`Not geography-filtered`.

The parent parser is not the remaining defect: AskTrustHub already classifies the
request as a Move cohort. Inside Move, however, `move-ask-v1` interprets the text
as a generic carrier entity request and does not create a jurisdiction. Its
cohort executor therefore receives no state filter.

MOVE-DIR-002 can already compose state filters for source-backed Auto Transport
queries, but its parser did not yet model generic mover class-plus-state phrases.
The directory data layer also treated `state` as its legacy coverage filter,
which is not a safe substitute for recorded headquarters.

## Implementation boundary

MOVE-CAP-001 will:

1. extend the shared MOVE-DIR-002 query plan to represent generic mover cohorts;
2. add a bounded exact recorded-HQ execution path to the shared directory engine;
3. expose those primitives through `trusthub-specialist-execution-v2`;
4. delegate identity and identifier modes to `move-network-resolver-v1`;
5. preserve `/api/ask` as `move-ask-v1` for backward compatibility while sharing
   the corrected generic cohort interpretation/execution where compatible.

It will not add a second parser, second identity resolver, client-side national
materialization, ranking, scoring, publication expansion, or database writes.

## Baseline gates

Before implementation the following passed:

- `check:move-dir-002`
- `check:move-dir-001`
- `check:move-search-001`
- `check:move-search-net-001`
- `check:move-profile-001`
- `check:move-home-006`
- `check:move-ask`
- Florida Intelligence tests
- production build

The locked Search/home fingerprint was
`3f2d144f65d5ab20bd57a1536eabf44825f18f4c8501130913c0a98a7787726e`.
