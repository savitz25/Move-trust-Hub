# ASK-SEARCH-006A — MoveTrustHub Network Discovery Pilot

**Status:** PILOT / NOT YET CONSUMED BY ASK PRODUCTION  
**Export:** `data/network-discovery/move-discovery-pilot.v1.json`  
**Schema:** `ask-network-discovery-v1`  
**Hub:** `move`

## Authoritative source (read-only)

| Item | Value |
|------|--------|
| Offline snapshot | `scripts/output/active-verified-companies.json` |
| Profile route | `/companies/[slug]` → `https://www.movetrusthub.com/companies/{slug}` |
| Classification helpers | `lib/companies/type-badges.ts`, FMCSA entity display |

### Source fields used

`id`, `slug`, `name`, `headquarters`, `usdot_number`, `mc_number`, `is_verified`, `out_of_service`, `authority_active`, `services`, `specialties` (not exported as ranking), `coverage` (rarely present).

**Not read/exported:** `email`, `phone`, `google_data`, `bbb_raw`, `fmcsa_raw`, ratings used as ranking, payment/premium.

## Eligibility predicate (fail-closed)

AND of:

1. `slug` present  
2. `name` present  
3. USDOT ≥ 5 digits  
4. `out_of_service === false`  
5. `authority_active === true`  
6. `headquarters` parses to USPS **state** (city-only HQ is insufficient)

**Not used:** payment, premium, ratings, review volume, Trust Score, `is_verified` (optional quality signal only).

## Identity mapping

```text
unique USDOT     → move:usdot-{digits}
shared USDOT     → move:usdot-{digits}--{slug}   (franchise disambiguation)
no USDOT         → move:co-{slug}                (not used in this snapshot)
```

Never uses company display name as identity.

## Entity-type mapping

| Source signals | entity_type | notes |
|----------------|-------------|-------|
| Broker only | `moving_broker` | broker ≠ carrier |
| Carrier / Full Service (+ USDOT) | `interstate_mover` | snapshot is USDOT-oriented |
| Auto Transport only | `auto_transporter` | rare in snapshot |
| Carrier/Broker mixed | `interstate_mover` + category `carrier_broker` | |

## Geography / service area

- Physical HQ parsed from existing `headquarters` text only (no Places / geocoding).  
- `service_areas` may include `state`, `city`, `zip`, and `interstate` for USDOT carriers.  
- HQ city-only strings (e.g. `Gainesville`) are **ineligible** for this pilot (92 of 129).

## Cohort algorithm

1. Evaluate eligibility on full snapshot (129).  
2. Map eligible → NetworkDiscoveryEntity.  
3. Sort by `network_entity_id` ascending.  
4. Take all eligible if ≤ 250 (target band 100–250).  

**This offline snapshot yields 34 eligible** — below 100 because most HQ values lack a parseable state. Live DB + richer geo would expand the cohort without changing the publisher contract.

## Canonical URL rules

- HTTPS  
- Host `www.movetrusthub.com`  
- Path `/companies/{slug}`  
- No query parameters  

## Trust Report availability

`trust_report_available: true` when exporting to `/companies/[slug]` research profile.

## Validation

Identity, uniqueness, Hub=move, entity type allowlist, HTTPS host/path, USPS state, forbidden fields.

## Known limitations

1. Offline snapshot, not live Supabase read (still production-quality curated extract).  
2. Pilot size 34 < 100 due to geography fail-closed.  
3. Pure broker-only rows with geo are scarce in this snapshot.  
4. County coverage tables not joined in this pilot (would require additional read-only sources).  
5. Not wired to AskTrustHub (ASK-SEARCH-006B).

## Next integration contract (006B)

Ask imports this JSON into the ASK-SEARCH-005 local discovery index shape, validates schema, and runs real Move-backed search pilots — without changing Move publication policy.
