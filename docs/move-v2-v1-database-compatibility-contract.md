# Move V1 / V2 database compatibility contract

Task 013 keeps V1 data immutable and composes V2 through server adapters. No V1 column is dropped, renamed, or backfilled for launch.

The composed surfaces require: company/provider ID, stable slug, legal/display name, USDOT, phone, website, headquarters/physical address, `authority_active`, `out_of_service`, and the presentation value `usdot_status`. When the physical V1 table does not contain `companies.usdot_status`, the adapter derives only the read value: `OUT_OF_SERVICE`, `ACTIVE`, `INACTIVE`, or `NOT_REPORTED`, in that precedence order. The original row is not mutated.

`approved-county-movers` now uses three additive projections: current full schema, current core schema, then a V1-compatible projection without `usdot_status`. This closes the repeated missing-column failure observed in Task 012 while retaining all historical data.

Provider pages use exact USDOT mappings only. The 33 exact mappings may compose a V2 evidence summary at their historical canonical URL. The 1 review and 16 unmatched URLs remain on V1. Any adapter, release, or mapping failure returns the approved V1 surface rather than a guessed identity or 404.

Move Plan persistence, calculator state/deep links, compare slugs, and historical provider URLs remain V1-compatible. Rollback disables composition/public-read flags and restores the previous release/sitemap pointer without deleting V2 evidence.
