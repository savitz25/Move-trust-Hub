# Provider identity and classification

## Task 002 national spine

Authoritative FMCSA linkage uses exact USDOT only. A USDOT receives one durable internal provider UUID; MC, MX, FF, and every authority row remain many-valued evidence and never become provider keys. The 2026 classifier is implemented in `lib/move-v2/fmcsa` with typed reason/conflict codes and immutable source-record keys. HHG freight forwarders remain a distinct product-review class. Current Motus evidence takes precedence over historical L&I only for current state; both remain visible in chronology.

## Stable identity

`move_v2.provider.provider_id` is a generated UUID and the only provider primary identity. `organization_id` is nullable for future provider-console ownership. Locations, contacts, source records, identifiers, external identities, and classifications have their own stable IDs.

Identifiers are typed. USDOT, MC, MX, and state license numbers remain separately sourced identifiers and do not replace `provider_id`. Historic identifier evidence remains attached to immutable source snapshots.

## Names

Legal, DBA, display, former, and other names are separate rows. Legal names are never overwritten by a DBA. The hard display rule is:

```text
credible official DBA present -> display DBA
otherwise                   -> display legal name
```

Profiles must still expose legal entity and regulatory identifiers.

## Versioned classification

Raw authority facts are not classification columns. `classifyProvider` writes a reason, rule version, time, and evidence IDs. New rules supersede prior classification rows without mutating source evidence.

Supported results are interstate carrier, local/intrastate carrier, local/intrastate candidate, authorized broker, dual-role carrier/broker, inactive, needs review, and unknown/unclassified.

An active carrier without federal interstate HHG authority is a local/intrastate candidate, not an invalid mover. State authority must be evaluated before it becomes a verified local/intrastate carrier. A valid broker uses broker-specific authority. Inactive broker authority never yields an active broker. Dual role requires both valid role-specific authorities.

## Move eligibility

Eligibility is computed after move type:

- Interstate: valid federal HHG carrier authority is required; broker-only entities arrange transportation and are not truck-operating carriers.
- Local/intrastate: a state-verified local carrier or federally authorized carrier may be eligible under applicable rules.
- Unknown route: no affirmative eligibility is inferred.

Classification, eligibility, and public ranking accept no billing input.

## State adapters

`provider_state_authority` supports state, license/registration number, authority type, current status, dates, source reference, and last check. State adapters return this contract and do not claim nationwide coverage. Florida is a future adapter, not part of Task 001.

## Contacts and service areas

Contacts are append/merge observations keyed by type, normalized value, source, and source record. Originals and multiple legitimate phones/emails/sites are retained. Missing emails stay missing. Service areas explicitly distinguish regulatory allowed area, provider-published area, and TrustHub-derived search area.

## Multi-service identity and auto transport

Provider identity is orthogonal to service classification. One stable `provider_id` may have an HHG classification and one current `AUTO_TRANSPORT` role. `provider_all_service_roles` composes those records without copying the provider or changing the established HHG result.

Auto roles are `AUTO_TRANSPORT_CARRIER`, `AUTO_TRANSPORT_BROKER`, `AUTO_TRANSPORT_DUAL_ROLE`, `AUTO_TRANSPORT_INACTIVE`, and `AUTO_TRANSPORT_REVIEW`. The versioned classifier requires official `CRGO_MOTOVEH` evidence before evaluating Motus property authority, financial responsibility, and chronology. Names cannot create relevance.
