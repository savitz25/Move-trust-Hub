# MoveTrustHub 2.0 architecture

## Mission and boundary

MoveTrustHub is the Move vertical in Ask Trust Hub. Its position is “Research your move without being sold a mover.” Its trust principle is “We cite. You decide.” V2 is an evidence-first decision platform, not a lead marketplace.

Task 001 is additive. V1 routes and tables remain authoritative for the live site. V2 code lives in `lib/move-v2`, additive `move_v2` database schemas, and the gated `/experience-lab/v2` route. All V2 gates default off. Production rejects the lab even if a flag is accidentally enabled.

## Evidence layers

1. **Authoritative regulatory evidence** — immutable snapshots from FMCSA and state regulators. Raw meaning is never rewritten.
2. **TrustHub normalization** — correctable, audited names, entity resolution, classifications, and matches.
3. **Third-party enrichment** — Google Places and similar public business data with source-specific storage/display rules.
4. **Provider-published information** — observations from an official website, never labeled government-verified.
5. **Provider-submitted information** — future claimed-profile content, isolated from authority evidence.

## Data flow

Each step is independently rerunnable and uses an idempotency key in `move_v2.pipeline_run`:

1. Regulatory identity snapshot
2. Name/address/identifier normalization
3. Versioned classification
4. Existing Google Places matching
5. Google business enrichment
6. Official website identity validation
7. Bounded official website enrichment
8. State adapter enrichment
9. Identity review
10. Public read model

Unknown inputs stay unknown. Provider marketing claims never alter regulatory eligibility.

## Domain boundaries

- `provider_id` is the durable spine. USDOT, MC, MX, names, phones, sites, addresses, and Google Place IDs are attributes or external identities.
- Move context owns route type and shortlisted provider IDs without requiring PII.
- Move Plan owns the consumer workflow across Route, Inventory, Research, Shortlist, Estimates, Compare, Verify, Moving Day, Delivery, and Claims.
- Estimate documents resolve to the same provider spine through an explicit match/review state.
- Public provider decisions cannot import commercial subscription state.

## Deployment gate

`MOVE_ENABLE_V2`, `MOVE_ENABLE_REAL_PROVIDER_DATA`, `MOVE_ENABLE_GOOGLE_ENRICHMENT`, and `MOVE_ENABLE_WEBSITE_ENRICHMENT` are server-only and false when absent. The lab additionally returns 404 whenever `VERCEL_ENV=production`. Task 001 uses synthetic records only.

## SEO migration policy

Keep a URL when user intent remains the same. Use a 301/308 only when a resource genuinely moves. Preserve indexed V1 pages until route-by-route parity, evidence validation, monitoring, and a separately authorized production migration. Code architecture is not a reason to churn URLs.
