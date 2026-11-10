# MOVE-PUB-CORRECTION-001 validation

Read-only computation against Move production exports and the real county evaluator.
No database writes. Headquarters strings are not listed. Business names below are the Duval listing only.

Coverage JSON on company rows adds 0 counties beyond `company_destination_assignments` (4,044 edges, 0 extra). Service-area rows in `provider_service_area`: 0. Verified discovery and verified active state authority are included.

## Counts

| Measure | Before (main rules) | After (this branch) |
|---|---:|---:|
| County pages with qualifying businesses | 3143 | 141 |
| Indexable Premium counties | 268 | 40 |
| Indexable Standard counties | 549 | 1 |
| Unpublished company listings | 725 | 0 |
| Dead profile links | 463 | 0 |
| Unsupported blanket assignments counted as coverage | 3665 | 0 |
| State-only movers shown as federally authorized | 0 | 0 |
| Sitemap URLs | 868 | 92 |

Premium after the cap is 40 (cap 400). Standard is not counted against the cap.

The before sitemap in this harness is 868 URLs. The audited live sitemap was 880. This harness does not call the Florida/Washington home-county canary RPC. The dead-link count before the change, 463, matches that audit. Unpublished listings are company-county placements, not unique companies.

Sitemap URLs added: 0. Removed: 776.

### Per state

- arizona: added 0, removed 4
- california: added 0, removed 46
- colorado: added 0, removed 60
- district-of-columbia: added 0, removed 1
- florida: added 0, removed 55
- georgia: added 0, removed 158
- hawaii: added 0, removed 1
- illinois: added 0, removed 13
- indiana: added 0, removed 3
- iowa: added 0, removed 1
- maine: added 0, removed 1
- massachusetts: added 0, removed 13
- michigan: added 0, removed 26
- minnesota: added 0, removed 2
- mississippi: added 0, removed 4
- missouri: added 0, removed 1
- nevada: added 0, removed 2
- new-hampshire: added 0, removed 1
- new-jersey: added 0, removed 21
- new-mexico: added 0, removed 1
- new-york: added 0, removed 15
- north-carolina: added 0, removed 3
- ohio: added 0, removed 2
- oklahoma: added 0, removed 2
- rhode-island: added 0, removed 5
- south-carolina: added 0, removed 41
- tennessee: added 0, removed 19
- texas: added 0, removed 249
- vermont: added 0, removed 1
- virginia: added 0, removed 20
- washington: added 0, removed 3
- wisconsin: added 0, removed 1
- wyoming: added 0, removed 1

## Duval / Jacksonville

The city hub takes Duval first, so this is the Duval county list.

### Before

- Brothers EZ Moving of Tampa — publication PUBLISHABLE; headquarters county hillsborough; evidence not_adjacent_to_headquarters (not counted)
- Flex Moving — publication PUBLISHABLE; headquarters county hillsborough; evidence not_adjacent_to_headquarters (not counted)
- Flex Moving & Storage — publication PUBLISHABLE; headquarters county orange; evidence not_adjacent_to_headquarters (not counted)
- Good Greek Moving & Storage Of Tampa — publication PUBLISHABLE; headquarters county unknown; evidence owner_selection_headquarters_unknown (not counted)
- Razorback Moving Tampa — publication REVIEW_REQUIRED; headquarters county hillsborough; evidence blanket_owner_selection (not counted)
- Solomon & Sons Relocation Services — publication PUBLISHABLE; headquarters county broward; evidence blanket_owner_selection (not counted)
- Amerisafe Van Lines — publication PUBLISHABLE; headquarters county palm-beach; evidence seed catalog
- American Van Lines — publication PUBLISHABLE; headquarters county broward; evidence seed catalog

### After

- none

## Rules applied

- Publication uses `isConsumerVisibleCompany`. `REVIEW_REQUIRED`, `INACTIVE`, `INGESTED`, and `CLASSIFIED` are excluded. Null stays visible. There is no `is_published` column.
- Blanket threshold is 50 owner-selected counties in one state. A known headquarters that is not adjacent is the other blanket signal. Headquarters, discovery, and system assignment sources still count inside a blanket. State authority does not create statewide coverage.
- Seed slots and owner selections without a resolved headquarters county do not count, unless the owner selection is under the blanket threshold and has verified state-level evidence. No company is hard-coded. The Duval list does not include the separate home-county canary RPC.
- Over-cap Premium counties fall back to Standard when the score still meets the Standard floor (48). Otherwise they are noindex.
- The existing qualifying threshold of 3 is unchanged. There is no new blanket minimum of 3 listed movers. Zero qualifying movers is noindex.
