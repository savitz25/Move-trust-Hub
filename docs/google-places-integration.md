# Existing Google Places integration audit

## Current implementation

MoveTrustHub already uses **Google Places API (New)** from `lib/verification/google-places.ts`. It calls server-side REST endpoints `v1/places:searchText` and `v1/places/{placeId}` with `X-Goog-FieldMask` and `X-Goog-Api-Key`.

The only credential is `GOOGLE_PLACES_API_KEY`. It is read server-side and is not a `NEXT_PUBLIC_*` value. V2 reuses this client and credential.

Search requests ask for Place ID, display name, formatted address, website URI, rating, rating count, national phone, and reviews. Details additionally asks for international phone. Stored snapshots map Place ID, name, address, normalized website origin, phone, rating/count, up to three 280-character review snippets, fetch time/status, and limited match metadata. Raw API keys are never logged or persisted.

## Request and cost controls

- Text search considers at most five candidates per query.
- Query construction has a 14-attempt ceiling, with early exit at score 76 and minimum acceptance score 52.
- Requests retry 429/5xx up to three times with exponential backoff.
- Details/search use `cache: no-store`; application-level snapshots live in Supabase `verification_sources.google` and the legacy `google_data` field when present.
- A failed fetch cannot overwrite a usable Place ID/rating snapshot.

Field masks constrain billable fields, but ratings/reviews and repeated query variants have cost implications. V2 enrichment remains off by default and should add budgets, per-provider idempotency, and monitoring before scale.

## Matching reuse plan

Current name-query logic already uses normalized company input and candidate scoring. V2 adds a durable `GOOGLE_PLACE` external identity, explicit match status, score/rule version, and `IDENTITY_REVIEW`. Name-only matches cannot auto-attach. Auto-accept requires corroboration from address, phone, and/or domain; DBA participates as a first-class name signal.

## Storage and display contract

| Field | Task 001 handling |
|---|---|
| Place ID | Persisted durable external identity/snapshot |
| Match score/strategy | Persisted TrustHub-derived metadata |
| Rating/count | Existing snapshot cache and display; refresh per policy |
| Review snippets | Existing bounded snapshot/display only; terms must be rechecked before V2 expansion |
| Name/address/phone/site | Existing source snapshot; may create separately provenanced observations |
| Attribution | Preserve existing Google review UI attribution requirements |

Google Maps Platform terms can change. Before expanding persistence or display, revalidate allowed caching, retention, attribution, and refresh behavior against the then-current contract. Task 001 does not broaden national fetching.

## Task 003 terms and cost audit (2026-08-16)

Google's current official policy permits durable Place ID storage but generally prohibits permanent caching of other Places content. V2 therefore stores the accepted Place ID separately and treats name, address, phone, website, coordinates, status, type, and rating/count as an expiring 30-day cache. Review text is not requested by the Task 003 discovery mask. Any later display must retain Google Maps attribution and comply with the then-current display requirements.

The Task 003 pilot uses the existing Places API (New) `places:searchText` client and credential. It performs at most one Text Search per queued provider, returns at most five candidates, and requests a narrow explicit mask. The persistent request ledger and provider queue prevent restart lookups. Existing Place IDs are evaluated before discovery. Place Details is unnecessary when the discovery response already contains the permitted matching/display fields.

Official references: https://developers.google.com/maps/documentation/places/web-service/policies, https://developers.google.com/maps/documentation/places/web-service/place-id, and https://developers.google.com/maps/documentation/places/web-service/data-fields.
