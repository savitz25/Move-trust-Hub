# MOVE-DIR-002 query composition audit

## Root cause

The accepted URL passed `search=auto transport new york` and
`services=Auto Transport`. The server first loaded the exact, source-backed
Auto Transport cohort and then passed the entire search phrase to
`filterCompanies()`. Identity scoring therefore searched company names and
identifiers for the structural words `auto transport new york`, reducing a
valid cohort to zero.

## Query contract

`parseDirectoryResearchQuery()` consumes supported evidence-class, regulatory
role, and U.S. state tokens. The remaining text alone is an identity query.
Exact USDOT/MC identifiers and strong legal-name signals take precedence over
research parsing. Direct URL loads use the same server-side interpretation as
client navigation.

Recorded geography uses the canonical `Company.headquarters` value mapped from
the public `companies` row and `extractStateCodeFromHeadquarters()`. State names
and postal abbreviations normalize to USPS codes. Missing or invalid values do
not match a recorded-HQ filter. Headquarters is never treated as service
territory, route availability, or nationwide coverage.

## Accepted read-only census (2026-08-31)

- Auto Transport cohort: 268
- Valid recorded HQ state: 263
- Missing/invalid recorded HQ state: 5
- NY: 6 (Carrier 6, Broker 0, Carrier/Broker 0, Unknown 0)
- FL: 17
- TX: 13
- CA: 22
- NJ: 7
- WA: 6
- IL: 16
- NY records with current authority: 6
- NY records with source freshness: 6

The Auto Transport evidence artifact, exact-USDOT qualification, publication
gate, and source snapshot are unchanged. Database writes and public-profile or
sitemap expansion are zero.

## Consumer semantics

Bare state phrases in a structured research query mean recorded headquarters.
Explicit `serving`, `to`, `from`, route, availability, and `near me` language
fails closed with a useful limitation: MoveTrustHub can show source-backed Auto
Transport identities and recorded company locations, but cannot prove service
territory. Structured research cohorts use neutral deterministic ordering.
