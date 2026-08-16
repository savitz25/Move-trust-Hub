# Provider enrichment pipeline

The provider pipeline is a sequence of independently rerunnable, idempotent steps. Each run records provider, step, idempotency key, status, version, timestamps, and a non-secret error code.

1. Ingest an immutable regulatory snapshot and source record reference.
2. Normalize legal name, DBA, addresses, and typed identifiers without destroying originals.
3. Create a versioned TrustHub classification from explicit facts.
4. Query the existing Google Places API client with multiple identity signals.
5. Preserve allowed Google identity/business fields and source-specific freshness.
6. Validate a returned website as a candidate official company site.
7. On verified domains only, run bounded official-site enrichment.
8. Invoke jurisdiction-specific state authority adapters as they become available.
9. Queue ambiguous external identity candidates for human/audited review.
10. Materialize a public read model that contains no commercial state.

## Provenance and freshness

Every important value carries source type, record reference/URL when allowed, retrieved time, effective time when known, confidence when it is genuinely meaningful, and derivation rule version for derived values. UI freshness is per component: FMCSA checked, state license checked, Google business checked, and company website checked. There is no synthetic global “last updated.”

## Provider-published data

Website-derived contacts, branches, services, and service areas are `PROVIDER_PUBLISHED`. Advertising interstate service does not alter federal authority. No email is generated from a domain. Public employee/private personal information is out of scope.

## Public read model

`ProviderProfileV2` groups identity, route-aware eligibility, federal/broker/state authority, all contacts, Google/external identities, locations, published areas/services, evidence with provenance, and per-source freshness. Engagement actions use provider IDs for shortlist, compare, and later research packets.

## Analytics

The privacy-minimized taxonomy is provider impression/profile view/save/compare, website and phone click, estimate-analyzer start, and research-packet view. Dimensions are provider ID, Move vertical, state/county, move type, and timestamp. It intentionally excludes consumer PII.
