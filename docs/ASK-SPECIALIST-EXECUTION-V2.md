# MoveTrustHub specialist execution V2

## Invocation

- Contract/version: `trusthub-specialist-execution-v2`
- Production endpoint: `https://www.movetrusthub.com/api/specialist-execution/v2`
- Methods: `GET`, `POST`
- Timeout: Move bounds cohort execution at 12 seconds. Timeout responses use HTTP
  504 with `resultType: "TIMEOUT"`; callers must hand off or retry and must not
  reinterpret an outage as no match.
- Cache: supported public results use `max-age=30, stale-while-revalidate=120`.
  Errors, unsupported requests and zero states use `no-store`.
- Authentication: none. This is a public-safe server contract. No service-role,
  database or browser credential is required by the caller.

`GET` accepts `q`, `page`, and `limit`. Natural text is converted through the
accepted MOVE-DIR-002 query-plan module. `POST` accepts the structured request
below. Ask should prefer `POST` once it owns a complete structured plan.

## Request

```ts
type Request = {
  contract: "trusthub-specialist-execution-v2";
  queryType: "cohort" | "identity" | "identifier" | "evidence";
  entityClass: "mover" | "auto_transport";
  role?: "Carrier" | "Broker" | "Carrier/Broker";
  geography?: {
    stateCode?: string;
    stateName?: string;
    city?: string;
    zip?: string;
    intent: "RECORDED_HQ" | "SERVICE_TERRITORY" | "ROUTE_AVAILABILITY";
  };
  identifier?: { type: "USDOT" | "MC"; value: string };
  identityName?: string;
  page?: number;
  limit?: number; // 1..50; default 20
  requestedEvidence?: string[];
  requestId?: string;
};
```

Input is validated server-side. Page is bounded to 1..10,000, limit to 1..50,
identifier syntax is validated, and unknown classes/roles/intents fail closed.

## Response

```ts
type Response = {
  contract: "trusthub-specialist-execution-v2";
  contractVersion: "trusthub-specialist-execution-v2";
  schemaFingerprint: string;
  contractFingerprint: string;
  queryInterpretation: {
    queryType: string;
    entityClass: "mover" | "auto_transport";
    role: "Carrier" | "Broker" | "Carrier/Broker" | null;
    geography: Request["geography"] | null;
    identityResolutionClass?: string;
    appliedFilters: string[];
  };
  resultType:
    | "SUPPORTED_RESULTS"
    | "ZERO_MATCHING_ROWS"
    | "UNSUPPORTED_CAPABILITY"
    | "INVALID_QUERY"
    | "BACKEND_UNAVAILABLE"
    | "TIMEOUT";
  rows: PublicRow[];
  total: number;
  pagination: { page: number; limit: number; returned: number; total: number; hasMore: boolean };
  availableRefinements: Array<{ id: string; values: string[]; meaning: string }>;
  provenance: {
    sourceFamily: string;
    sourceContract: string;
    queryGrain: string;
    geographyMeaning: string;
    officialAsOf: string | null;
    generatedAt: string;
    publicationSemantics: string;
  };
  limitations: string[];
  destinations: { research: string; verifyDot: string; profiles: string[] };
  diagnostics: {
    executionPath: string;
    elapsedMs: number;
    rowsFetched: number;
    rowsReturned: number;
    requestId?: string;
  };
};
```

`INVALID_QUERY`, `BACKEND_UNAVAILABLE`, and `TIMEOUT` use structured non-200
responses. Valid zero matches remain a 200 `ZERO_MATCHING_ROWS`. An unsupported
service-territory or route request remains a 200 `UNSUPPORTED_CAPABILITY` with a
useful recorded-HQ/Verify-DOT destination. These states are not interchangeable.

## Public row

Rows contain public display/legal name, canonical slug/profile URL, USDOT, MC,
regulatory role, authority state, recorded HQ, source-last-checked, an Auto
Transport evidence flag, and a factual match explanation. They never contain an
internal company ID, private contact, score, rating rank, paid/claimed/subscription
status, admin state, private review note, or unpublished identity.

## Geography and service-territory firewall

`RECORDED_HQ` state requests apply the exact state extracted from the accepted
public company headquarters/address field. Every returned row is rechecked after
mapping. The meaning is always **Recorded headquarters**.

Headquarters is not service territory. `SERVICE_TERRITORY` and
`ROUTE_AVAILABILITY` return `UNSUPPORTED_CAPABILITY`; they are never silently
rewritten into recorded-HQ results. City input is retained in interpretation,
but V2 currently applies the supported state filter and says when city precision
was not applied.

## Pagination and ordering

Pagination is server-side and bounded. State queries materialize only the bounded
state-candidate set (never the 5,000+ national client cohort); response pages are
stable, non-overlapping and total-reconciled. Auto Transport intersects the
accepted 268-identity exact-USDOT evidence artifact before slicing.

Order is public name followed by USDOT for state queries and accepted
MOVE-DIR-002 neutral source order for source-backed Auto Transport. Reputation,
reviews, ratings, paid, subscription and claim status are not ordering inputs.

## Identity delegation

Identifier and identity requests delegate to `move-network-resolver-v1`.
`EXACT_IDENTIFIER`, `FUZZY_CANDIDATES`, `AMBIGUOUS_NAME`, and
`NO_CONFIDENT_MATCH` remain source-owned certainty assertions; V2 does not
reimplement or upgrade them.

## Representative requests

### New York mover cohort

```json
{
  "contract": "trusthub-specialist-execution-v2",
  "queryType": "cohort",
  "entityClass": "mover",
  "geography": { "stateCode": "NY", "stateName": "New York", "intent": "RECORDED_HQ" },
  "page": 1,
  "limit": 20
}
```

The response is `SUPPORTED_RESULTS`, all rows have
`recordedHq.state: "NY"`, and provenance says headquarters is not service
territory.

### Dallas/Texas

`GET /api/specialist-execution/v2?q=moving%20company%20in%20Dallas%20Texas`

V2 preserves `city: "Dallas"` in interpretation but applies the supported Texas
recorded-HQ state filter. The limitations explicitly say Dallas was not used as a
verified service-area or city filter.

### Auto Transport + New York

```json
{
  "contract": "trusthub-specialist-execution-v2",
  "queryType": "cohort",
  "entityClass": "auto_transport",
  "role": "Carrier",
  "geography": { "stateCode": "NY", "intent": "RECORDED_HQ" }
}
```

Membership is the intersection of the public identity USDOT and FMCSA Company
Census `CRGO_MOTOVEH = X` or `CRGO_DRIVETOW = X`. Names and marketing copy do not
qualify a row.

### Unsupported service territory

```json
{
  "contract": "trusthub-specialist-execution-v2",
  "queryType": "cohort",
  "entityClass": "mover",
  "geography": { "stateCode": "NY", "intent": "SERVICE_TERRITORY" }
}
```

Returns `UNSUPPORTED_CAPABILITY`, no rows, the missing evidence explanation, a
recorded-HQ research destination, and Verify DOT. It does not say the returned
companies serve New York.

### Exact identifier

```json
{
  "contract": "trusthub-specialist-execution-v2",
  "queryType": "identifier",
  "entityClass": "mover",
  "identifier": { "type": "USDOT", "value": "3244649" }
}
```

Delegates to `move-network-resolver-v1` and returns SHIFL with
`identityResolutionClass: "EXACT_IDENTIFIER"`.

## `/api/ask` migration

`/api/ask` remains `move-ask-v1`. Generic/Auto Transport research plans now use
the shared V2 cohort executor and adapt its result into the existing payload.
Identity, aggregate, definition and comparison behavior remains on the accepted
V1 path. This removes the duplicate national cohort behavior without forcing the
current AskTrustHub parent to adopt V2 atomically.
