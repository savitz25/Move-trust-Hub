# MOVE-SEARCH-NET-001 integration contract

Status: additive public network adapter over accepted Move Search V1. Move owns identity, publication, identifier, duplicate-name, and source semantics. Ask owns routing and presentation.

## Invocation

- Production URL: `https://www.movetrusthub.com/api/network/identity-resolver`
- Preview URL: the same path on the immutable Preview deployment.
- Methods: `GET` and `POST`.
- Ask server timeout: 10 seconds maximum. A timeout or unavailable backend must become a handoff/temporarily-unavailable state, never an inferred identity.
- Browser credentials: none. No privileged or service-role credential may be shipped to client JavaScript.
- Successful responses: `Cache-Control: public, max-age=30, stale-while-revalidate=120`.
- Errors: `Cache-Control: no-store`.

GET parameters are `q`, optional `contract_version`, `intent`, `limit`, and `request_id`. POST accepts the JSON request below.

## Version and compatibility

- Contract version: `move-network-resolver-v1`
- Schema fingerprint: `4d6c3da40d59cb795bfb6a8bc155298f15ba1144c41f6478c3fc2c736965f284`
- Contract fingerprint: `72bbf42f66073afd945f8ff3ad5813a0a98e8e787ebff8bf8d69bb552eb1c42c`
- Ask should require the version it supports and fail closed on a version or fingerprint incompatibility.
- A mismatched supplied version returns HTTP 409 with `CONTRACT_VERSION_ERROR`.

## Request schema

```ts
type Request = {
  query: string; // trimmed/bounded by canonical Search V1; 2 characters minimum
  contractVersion?: 'move-network-resolver-v1';
  intentHint?: 'identifier' | 'company_name';
  limit?: number; // clamped to 1..8
  requestId?: string; // optional trace correlation, bounded to 80 characters
};
```

The hint cannot override canonical Move semantics. Internal database IDs are neither accepted nor required.

## Response schema

```ts
type Response = {
  contractVersion: 'move-network-resolver-v1';
  contractFingerprint: string;
  schemaFingerprint: string;
  query: string;
  normalizedQuery: string;
  resolutionClass:
    | 'EXACT_IDENTIFIER' | 'EXACT_CANONICAL_NAME' | 'EXACT_PUBLIC_NAME'
    | 'NORMALIZED_NAME' | 'AMBIGUOUS_NAME' | 'FUZZY_CANDIDATES'
    | 'NO_CONFIDENT_MATCH';
  results: Array<{
    publicDisplayName: string;
    legalName: string | null;
    canonicalSlug: string;
    canonicalUrl: string;
    usdot: string | null;
    mc: string | null;
    role: 'Carrier' | 'Broker' | 'Carrier/Broker' | 'Unknown';
    authorityState: string | null;
    recordedHq: { raw: string | null; city: string | null; state: string | null; locationMeaning: 'RECORDED_HQ' };
    sourceLastChecked: string | null;
    matchClass: string;
    matchReason: string;
  }>;
  returnedResultCount: number;
  totalMatchingIdentityCount: number;
  duplicateNameCount: number;
  sourceClock: { kind: 'FMCSA_LAST_CHECKED'; latestObserved: string | null; meaning: string };
  limitations: string[];
  trace: { sourceContract: 'move-search-v1'; resolverLatencyMs: number; fallbackPath: 'none'; requestId?: string };
};
```

No confidence score, reputation/review/Trust score, paid status, subscription status, private contact, admin flag, internal evidence, or internal company ID is exposed.

## Resolution rules

- `EXACT_IDENTIFIER`: accepted Search V1 USDOT, DOT, MC, or bare-digit identifier match.
- `EXACT_CANONICAL_NAME`: exact legal-name assertion.
- `EXACT_PUBLIC_NAME`: exact public/display-name assertion with one published identity.
- `NORMALIZED_NAME`: punctuation/casing/normalization produced an exact name assertion.
- `AMBIGUOUS_NAME`: multiple separately published regulatory identities share the asserted name. Do not select or rank one. `returnedResultCount` is the bounded page; `totalMatchingIdentityCount`/`duplicateNameCount` is the full census.
- `FUZZY_CANDIDATES`: Search V1 supplied prefix/token/typo candidates. Ask must not present any candidate as an exact identity.
- `NO_CONFIDENT_MATCH`: valid identity query with no result. `results=[]` and all returned/matching counts are zero. It never falls through to a Florida, national, alphabetical, or other market cohort.

Search V1 ordering is preserved. It is deterministic identity relevance plus neutral tie-breaks, never recommendation, reputation, reviews, payment, or customer status.

## Errors

Errors have `{ contractVersion, contractFingerprint, error: { code, message, retryable } }` and never an uninterpretable empty 200 response.

- HTTP 400 `INVALID_QUERY`: invalid JSON, too-short query, malformed labeled USDOT/MC, or unsupported hint.
- HTTP 409 `CONTRACT_VERSION_ERROR`: caller supplied an incompatible contract version.
- HTTP 503 `BACKEND_UNAVAILABLE`: canonical Search V1 could not produce a supported search path.
- HTTP 504 `TIMEOUT`: canonical resolution exceeded 10 seconds.

Ask must fail closed. For 503/504, use a temporary-unavailable handoff and specialist destination; do not synthesize a match.

## Publication and source semantics

The adapter calls the existing Search V1 resolver and returns only its accepted consumer-visible publication cohort. It performs no identity writes and cannot expand profiles or sitemap membership. Public/display name and FMCSA legal name remain separate regulatory identities.

`recordedHq.locationMeaning` is always `RECORDED_HQ`. Consumer language may say “recorded headquarters”; it must also say headquarters is not service territory. Authority is current regulatory evidence, not MoveTrustHub approval, safety, quality, verification, or recommendation. A broker is not necessarily the transporting carrier. Missing freshness does not imply inactive; recent freshness does not imply safe.

## Representative payloads

Exact USDOT:

```json
{"contractVersion":"move-network-resolver-v1","query":"USDOT 3244649","normalizedQuery":"usdot 3244649","resolutionClass":"EXACT_IDENTIFIER","results":[{"publicDisplayName":"SHIFL INC","legalName":"SHIFL INC","canonicalSlug":"shifl-inc","canonicalUrl":"https://www.movetrusthub.com/companies/shifl-inc","usdot":"3244649","mc":"1019808","recordedHq":{"locationMeaning":"RECORDED_HQ"}}],"returnedResultCount":1}
```

Exact MC uses the same identity shape with `query: "MC 1019808"`, `resolutionClass: "EXACT_IDENTIFIER"`, and `mc: "1019808"`.

SHIFL name results preserve Search V1's factual match class. If Search V1 supplies a prefix/fuzzy candidate, the network class is `FUZZY_CANDIDATES`; Ask must not upgrade it.

Duplicate public name:

```json
{"contractVersion":"move-network-resolver-v1","query":"two men and a truck","resolutionClass":"AMBIGUOUS_NAME","results":["bounded published identity objects"],"returnedResultCount":8,"totalMatchingIdentityCount":37,"duplicateNameCount":37}
```

The counts above illustrate shape only; runtime census is source-owned and must be read from the actual response.

No match:

```json
{"contractVersion":"move-network-resolver-v1","query":"Intentionally Unknown Mover XYZ","normalizedQuery":"intentionally unknown mover xyz","resolutionClass":"NO_CONFIDENT_MATCH","results":[],"returnedResultCount":0,"totalMatchingIdentityCount":0,"duplicateNameCount":0}
```

## Operational notes

Queries are bounded, identifier formats are validated, limits are capped, database operations remain parameterized through existing Search V1 primitives, and candidate work retains Search V1 bounds. The route adds short public caching. No application-specific rate limiter is added by this contract; platform/WAF rate controls remain the deployment-owner responsibility.

Ask integration should invoke this endpoint server-side, require the supported contract, map exact/ambiguous/fuzzy/no-match without semantic promotion, retain Move provenance, and keep market research on its separate capability route.
